Future = Npm.require('fibers/future');
// At a minimum, set up LDAP_DEFAULTS.url and .dn according to
// your needs. url should appear as 'ldap://your.url.here'
// dn should appear in normal ldap format of comma separated attribute=value
// e.g. 'uid=someuser,cn=users,dc=somevalue'
DRUPAL_DEFAULTS = {
  url: false,
  port: '389',
  dn: false,
  searchDN: false,
  searchSizeLimit: 100,
  searchCredentials: false,
  createNewUser: true,
  defaultDomain: false,
  searchResultsProfileMap: false,
  base: null,
  search: '(objectclass=*)',
  ldapsCertificate: false,
  bindToDomain: false,
  bindDomain: null
};
LDAP = {};

/**
 @class LDAP
 @constructor
 */
LDAP.create = function (options) {
  // Set options
  this.options = _.defaults(options, DRUPAL_DEFAULTS);

  // Make sure options have been set
  try {
    // check(this.options.url, String);
    // check(this.options.dn, String);
  } catch (e) {
    throw new Meteor.Error(
      'Bad Defaults',
      'Options not set. Make sure to set LDAP_DEFAULTS.url and LDAP_DEFAULTS.dn!'
    );
  }

  // // Because NPM ldapjs module has some binary builds,
  // // We had to create a wraper package for it and build for
  // // certain architectures. The package typ:ldap-js exports
  // // 'MeteorWrapperLdapjs' which is a wrapper for the npm module
  // this.ldapjs = MeteorWrapperLdapjs;
};

/**
 * Attempt to bind (authenticate) ldap
 * and perform a dn search if specified
 *
 * @method ldapCheck
 *
 * @param {Object} [options]  Object with username, ldapPass and overrides for LDAP_DEFAULTS object.
 * Additionally the searchBeforeBind parameter can be specified, which is used to search for the DN
 * if not provided.
 * @param {boolean} [bindAfterFind]  Whether or not to try to login with the supplied credentials or
 * just return whether or not the user exists.
 */
LDAP.create.prototype.drupalCheck = function (options, bindAfterFind) {
  var self = this;
  // console.log('drupalCheck');
  options = options || {};

  if (
    (options.hasOwnProperty('username') &&
      options.hasOwnProperty('ldapPass')) ||
    !bindAfterFind
  ) {
    var ldapAsyncFut = new Future();

    try {
      HTTP.get(Meteor.settings['drupalTokenUrl'], undefined, function (
        err,
        tokenResult
      ) {
        if (err) {
          ldapAsyncFut.return({
            error: err
          });
        } else {
          var user_data = {
            username: options.username,
            password: options.ldapPass
          };

          if (!tokenResult.content) {
            ldapAsyncFut.return({
              error: new Meteor.Error('500', 'missing token in response')
            });
            return;
          }

          // eslint-disable-next-line quote-props
          const headers = {
            'Content-Type': 'application/json',
            'X-CSRF-Token': tokenResult.content,
            strictSSL: 'false'
          };
          var params = { headers, data: user_data };
          HTTP.post(Meteor.settings['drupalLoginUrl'], params, function (
            err,
            loginResult
          ) {
            if (err) {
              ldapAsyncFut.return({
                error: err
              });
            } else {
              // console.log(loginResult);
              var retObject = {};
              try {
                retObject.username = loginResult.data.user.name;
                if (!retObject.username) {
                  throw new Error('user name is empty');
                }
                retObject.email = loginResult.data.user.mail;
                if (!retObject.email) {
                  throw new Error('user email is empty');
                }
                retObject.uid = loginResult.data.user.uid;
                ldapAsyncFut.return(retObject);
              } catch (err) {
                ldapAsyncFut.return({
                  error: new Meteor.Error(err.code, err.message)
                });
              }
            }
          });
        }
      });

      return ldapAsyncFut.wait();
    } catch (err) {
      ldapAsyncFut.return({
        error: new Meteor.Error(err.code, err.message)
      });
    }
  } else {
    throw new Meteor.Error(403, 'Missing Auth Parameters');
  }
};

// Register login handler with Meteor
// Here we create a new LDAP instance with options passed from
// Meteor.loginWithLDAP on client side
// @param {Object} loginRequest will consist of username, ldapPass, ldap, and ldapOptions
Accounts.registerLoginHandler('drupal', function (loginRequest) {
  // If 'ldap' isn't set in loginRequest object,
  // then this isn't the proper handler (return undefined)
  console.log('REGISTER LOGIN HANDLER REQUEST:');
  console.log(loginRequest);

  if (!loginRequest.drupal) {
    return undefined;
  }

  // Instantiate LDAP with options
  var userOptions = loginRequest.ldapOptions || {};
  Accounts.ldapObj = new LDAP.create(userOptions);

  // Call ldapCheck and get response
  var response = Accounts.ldapObj.drupalCheck(loginRequest, true);
  if (response.error) {
    return {
      userId: null,
      error: response.error
    };
  } else {
    // Set initial userId and token vals
    var userId = null;
    var stampedToken = {
      token: null
    };
    console.log('response:');
    console.log(response);

    // Look to see if user already exists
    var user = Meteor.users.findOne({
      // username: response.username
      'emails.address': response.email
    });
    if (!user) {
      user = Meteor.users.findOne({
        emails: { $elemMatch: { address: response.email, verified: true } }
      });
      if (user) user.username = response.username;
    }

    // Login user if they exist
    if (user) {
      userId = user._id;

      // Create hashed token so user stays logged in
      stampedToken = Accounts._generateStampedLoginToken();
      var hashStampedToken = Accounts._hashStampedToken(stampedToken);
      // Update the user's token in mongo
      Meteor.users.update(userId, {
        $push: {
          'services.resume.loginTokens': hashStampedToken
        }
      });
      console.log('User exists');
      Accounts.setPassword(userId, loginRequest.ldapPass);
    }
    // Otherwise create user if option is set
    else if (Accounts.ldapObj.options.createNewUser) {
      console.log('Creating new user');
      var userObject = {
        username: response.username
      };

      userId = Accounts.createUser(userObject);
      console.log(userObject);
      Meteor.users.update(userId, {
        $set: {
          emails: [
            {
              address: response.email,
              verified: true
            }
          ],
          uid: response.uid
        }
      });
      Accounts.setPassword(userId, loginRequest.ldapPass);
    } else {
      // Ldap success, but no user created
      console.log(
        'Authentication succeeded for ' +
          response.username +
          ', but no user exists in Meteor. Either create the user manually or set DRUPA_DEFAULTS.createNewUser to true'
      );
      return {
        userId: null,
        error: new Meteor.Error(
          403,
          'User found in LDAP but not in application'
        )
      };
    }

    return {
      userId,
      token: stampedToken.token
    };
  }
});
