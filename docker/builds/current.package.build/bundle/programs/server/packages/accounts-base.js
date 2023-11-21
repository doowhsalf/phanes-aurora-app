(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var DDPRateLimiter = Package['ddp-rate-limiter'].DDPRateLimiter;
var check = Package.check.check;
var Match = Package.check.Match;
var Random = Package.random.Random;
var EJSON = Package.ejson.EJSON;
var Hook = Package['callback-hook'].Hook;
var URL = Package.url.URL;
var URLSearchParams = Package.url.URLSearchParams;
var DDP = Package['ddp-client'].DDP;
var DDPServer = Package['ddp-server'].DDPServer;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var meteorInstall = Package.modules.meteorInstall;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var Accounts, options, stampedLoginToken, handler, name, query, oldestValidDate, user;

var require = meteorInstall({"node_modules":{"meteor":{"accounts-base":{"server_main.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/accounts-base/server_main.js                                                                            //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
!function (module1) {
  module1.export({
    AccountsServer: () => AccountsServer
  });
  let AccountsServer;
  module1.link("./accounts_server.js", {
    AccountsServer(v) {
      AccountsServer = v;
    }

  }, 0);

  /**
   * @namespace Accounts
   * @summary The namespace for all server-side accounts-related methods.
   */
  Accounts = new AccountsServer(Meteor.server); // Users table. Don't use the normal autopublish, since we want to hide
  // some fields. Code to autopublish this is in accounts_server.js.
  // XXX Allow users to configure this collection name.

  /**
   * @summary A [Mongo.Collection](#collections) containing user documents.
   * @locus Anywhere
   * @type {Mongo.Collection}
   * @importFromPackage meteor
  */

  Meteor.users = Accounts.users;
}.call(this, module);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"accounts_common.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/accounts-base/accounts_common.js                                                                        //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let _objectSpread;

module.link("@babel/runtime/helpers/objectSpread2", {
  default(v) {
    _objectSpread = v;
  }

}, 0);
module.export({
  AccountsCommon: () => AccountsCommon,
  EXPIRE_TOKENS_INTERVAL_MS: () => EXPIRE_TOKENS_INTERVAL_MS,
  CONNECTION_CLOSE_DELAY_MS: () => CONNECTION_CLOSE_DELAY_MS
});

class AccountsCommon {
  constructor(options) {
    // Currently this is read directly by packages like accounts-password
    // and accounts-ui-unstyled.
    this._options = {}; // Note that setting this.connection = null causes this.users to be a
    // LocalCollection, which is not what we want.

    this.connection = undefined;

    this._initConnection(options || {}); // There is an allow call in accounts_server.js that restricts writes to
    // this collection.


    this.users = new Mongo.Collection("users", {
      _preventAutopublish: true,
      connection: this.connection
    }); // Callback exceptions are printed with Meteor._debug and ignored.

    this._onLoginHook = new Hook({
      bindEnvironment: false,
      debugPrintExceptions: "onLogin callback"
    });
    this._onLoginFailureHook = new Hook({
      bindEnvironment: false,
      debugPrintExceptions: "onLoginFailure callback"
    });
    this._onLogoutHook = new Hook({
      bindEnvironment: false,
      debugPrintExceptions: "onLogout callback"
    }); // Expose for testing.

    this.DEFAULT_LOGIN_EXPIRATION_DAYS = DEFAULT_LOGIN_EXPIRATION_DAYS;
    this.LOGIN_UNEXPIRING_TOKEN_DAYS = LOGIN_UNEXPIRING_TOKEN_DAYS; // Thrown when the user cancels the login process (eg, closes an oauth
    // popup, declines retina scan, etc)

    const lceName = 'Accounts.LoginCancelledError';
    this.LoginCancelledError = Meteor.makeErrorType(lceName, function (description) {
      this.message = description;
    });
    this.LoginCancelledError.prototype.name = lceName; // This is used to transmit specific subclass errors over the wire. We
    // should come up with a more generic way to do this (eg, with some sort of
    // symbolic error code rather than a number).

    this.LoginCancelledError.numericError = 0x8acdc2f; // loginServiceConfiguration and ConfigError are maintained for backwards compatibility

    Meteor.startup(() => {
      const {
        ServiceConfiguration
      } = Package['service-configuration'];
      this.loginServiceConfiguration = ServiceConfiguration.configurations;
      this.ConfigError = ServiceConfiguration.ConfigError;
    });
  }
  /**
   * @summary Get the current user id, or `null` if no user is logged in. A reactive data source.
   * @locus Anywhere
   */


  userId() {
    throw new Error("userId method not implemented");
  } // merge the defaultFieldSelector with an existing options object


  _addDefaultFieldSelector() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // this will be the most common case for most people, so make it quick
    if (!this._options.defaultFieldSelector) return options; // if no field selector then just use defaultFieldSelector

    if (!options.fields) return _objectSpread(_objectSpread({}, options), {}, {
      fields: this._options.defaultFieldSelector
    }); // if empty field selector then the full user object is explicitly requested, so obey

    const keys = Object.keys(options.fields);
    if (!keys.length) return options; // if the requested fields are +ve then ignore defaultFieldSelector
    // assume they are all either +ve or -ve because Mongo doesn't like mixed

    if (!!options.fields[keys[0]]) return options; // The requested fields are -ve.
    // If the defaultFieldSelector is +ve then use requested fields, otherwise merge them

    const keys2 = Object.keys(this._options.defaultFieldSelector);
    return this._options.defaultFieldSelector[keys2[0]] ? options : _objectSpread(_objectSpread({}, options), {}, {
      fields: _objectSpread(_objectSpread({}, options.fields), this._options.defaultFieldSelector)
    });
  }
  /**
   * @summary Get the current user record, or `null` if no user is logged in. A reactive data source.
   * @locus Anywhere
   * @param {Object} [options]
   * @param {MongoFieldSpecifier} options.fields Dictionary of fields to return or exclude.
   */


  user(options) {
    const userId = this.userId();
    return userId ? this.users.findOne(userId, this._addDefaultFieldSelector(options)) : null;
  } // Set up config for the accounts system. Call this on both the client
  // and the server.
  //
  // Note that this method gets overridden on AccountsServer.prototype, but
  // the overriding method calls the overridden method.
  //
  // XXX we should add some enforcement that this is called on both the
  // client and the server. Otherwise, a user can
  // 'forbidClientAccountCreation' only on the client and while it looks
  // like their app is secure, the server will still accept createUser
  // calls. https://github.com/meteor/meteor/issues/828
  //
  // @param options {Object} an object with fields:
  // - sendVerificationEmail {Boolean}
  //     Send email address verification emails to new users created from
  //     client signups.
  // - forbidClientAccountCreation {Boolean}
  //     Do not allow clients to create accounts directly.
  // - restrictCreationByEmailDomain {Function or String}
  //     Require created users to have an email matching the function or
  //     having the string as domain.
  // - loginExpirationInDays {Number}
  //     Number of days since login until a user is logged out (login token
  //     expires).
  // - passwordResetTokenExpirationInDays {Number}
  //     Number of days since password reset token creation until the
  //     token cannt be used any longer (password reset token expires).
  // - ambiguousErrorMessages {Boolean}
  //     Return ambiguous error messages from login failures to prevent
  //     user enumeration.
  // - bcryptRounds {Number}
  //     Allows override of number of bcrypt rounds (aka work factor) used
  //     to store passwords.

  /**
   * @summary Set global accounts options.
   * @locus Anywhere
   * @param {Object} options
   * @param {Boolean} options.sendVerificationEmail New users with an email address will receive an address verification email.
   * @param {Boolean} options.forbidClientAccountCreation Calls to [`createUser`](#accounts_createuser) from the client will be rejected. In addition, if you are using [accounts-ui](#accountsui), the "Create account" link will not be available.
   * @param {String | Function} options.restrictCreationByEmailDomain If set to a string, only allows new users if the domain part of their email address matches the string. If set to a function, only allows new users if the function returns true.  The function is passed the full email address of the proposed new user.  Works with password-based sign-in and external services that expose email addresses (Google, Facebook, GitHub). All existing users still can log in after enabling this option. Example: `Accounts.config({ restrictCreationByEmailDomain: 'school.edu' })`.
   * @param {Number} options.loginExpirationInDays The number of days from when a user logs in until their token expires and they are logged out. Defaults to 90. Set to `null` to disable login expiration.
   * @param {Number} options.loginExpiration The number of milliseconds from when a user logs in until their token expires and they are logged out, for a more granular control. If `loginExpirationInDays` is set, it takes precedent.
   * @param {String} options.oauthSecretKey When using the `oauth-encryption` package, the 16 byte key using to encrypt sensitive account credentials in the database, encoded in base64.  This option may only be specified on the server.  See packages/oauth-encryption/README.md for details.
   * @param {Number} options.passwordResetTokenExpirationInDays The number of days from when a link to reset password is sent until token expires and user can't reset password with the link anymore. Defaults to 3.
   * @param {Number} options.passwordResetTokenExpiration The number of milliseconds from when a link to reset password is sent until token expires and user can't reset password with the link anymore. If `passwordResetTokenExpirationInDays` is set, it takes precedent.
   * @param {Number} options.passwordEnrollTokenExpirationInDays The number of days from when a link to set initial password is sent until token expires and user can't set password with the link anymore. Defaults to 30.
   * @param {Number} options.passwordEnrollTokenExpiration The number of milliseconds from when a link to set initial password is sent until token expires and user can't set password with the link anymore. If `passwordEnrollTokenExpirationInDays` is set, it takes precedent.
   * @param {Boolean} options.ambiguousErrorMessages Return ambiguous error messages from login failures to prevent user enumeration. Defaults to false.
   * @param {MongoFieldSpecifier} options.defaultFieldSelector To exclude by default large custom fields from `Meteor.user()` and `Meteor.findUserBy...()` functions when called without a field selector, and all `onLogin`, `onLoginFailure` and `onLogout` callbacks.  Example: `Accounts.config({ defaultFieldSelector: { myBigArray: 0 }})`. Beware when using this. If, for instance, you do not include `email` when excluding the fields, you can have problems with functions like `forgotPassword` that will break because they won't have the required data available. It's recommend that you always keep the fields `_id`, `username`, and `email`.
   */


  config(options) {
    // We don't want users to accidentally only call Accounts.config on the
    // client, where some of the options will have partial effects (eg removing
    // the "create account" button from accounts-ui if forbidClientAccountCreation
    // is set, or redirecting Google login to a specific-domain page) without
    // having their full effects.
    if (Meteor.isServer) {
      __meteor_runtime_config__.accountsConfigCalled = true;
    } else if (!__meteor_runtime_config__.accountsConfigCalled) {
      // XXX would be nice to "crash" the client and replace the UI with an error
      // message, but there's no trivial way to do this.
      Meteor._debug("Accounts.config was called on the client but not on the " + "server; some configuration options may not take effect.");
    } // We need to validate the oauthSecretKey option at the time
    // Accounts.config is called. We also deliberately don't store the
    // oauthSecretKey in Accounts._options.


    if (Object.prototype.hasOwnProperty.call(options, 'oauthSecretKey')) {
      if (Meteor.isClient) {
        throw new Error("The oauthSecretKey option may only be specified on the server");
      }

      if (!Package["oauth-encryption"]) {
        throw new Error("The oauth-encryption package must be loaded to set oauthSecretKey");
      }

      Package["oauth-encryption"].OAuthEncryption.loadKey(options.oauthSecretKey);
      options = _objectSpread({}, options);
      delete options.oauthSecretKey;
    } // validate option keys


    const VALID_KEYS = ["sendVerificationEmail", "forbidClientAccountCreation", "passwordEnrollTokenExpiration", "passwordEnrollTokenExpirationInDays", "restrictCreationByEmailDomain", "loginExpirationInDays", "loginExpiration", "passwordResetTokenExpirationInDays", "passwordResetTokenExpiration", "ambiguousErrorMessages", "bcryptRounds", "defaultFieldSelector"];
    Object.keys(options).forEach(key => {
      if (!VALID_KEYS.includes(key)) {
        throw new Error("Accounts.config: Invalid key: ".concat(key));
      }
    }); // set values in Accounts._options

    VALID_KEYS.forEach(key => {
      if (key in options) {
        if (key in this._options) {
          throw new Error("Can't set `".concat(key, "` more than once"));
        }

        this._options[key] = options[key];
      }
    });
  }
  /**
   * @summary Register a callback to be called after a login attempt succeeds.
   * @locus Anywhere
   * @param {Function} func The callback to be called when login is successful.
   *                        The callback receives a single object that
   *                        holds login details. This object contains the login
   *                        result type (password, resume, etc.) on both the
   *                        client and server. `onLogin` callbacks registered
   *                        on the server also receive extra data, such
   *                        as user details, connection information, etc.
   */


  onLogin(func) {
    let ret = this._onLoginHook.register(func); // call the just registered callback if already logged in


    this._startupCallback(ret.callback);

    return ret;
  }
  /**
   * @summary Register a callback to be called after a login attempt fails.
   * @locus Anywhere
   * @param {Function} func The callback to be called after the login has failed.
   */


  onLoginFailure(func) {
    return this._onLoginFailureHook.register(func);
  }
  /**
   * @summary Register a callback to be called after a logout attempt succeeds.
   * @locus Anywhere
   * @param {Function} func The callback to be called when logout is successful.
   */


  onLogout(func) {
    return this._onLogoutHook.register(func);
  }

  _initConnection(options) {
    if (!Meteor.isClient) {
      return;
    } // The connection used by the Accounts system. This is the connection
    // that will get logged in by Meteor.login(), and this is the
    // connection whose login state will be reflected by Meteor.userId().
    //
    // It would be much preferable for this to be in accounts_client.js,
    // but it has to be here because it's needed to create the
    // Meteor.users collection.


    if (options.connection) {
      this.connection = options.connection;
    } else if (options.ddpUrl) {
      this.connection = DDP.connect(options.ddpUrl);
    } else if (typeof __meteor_runtime_config__ !== "undefined" && __meteor_runtime_config__.ACCOUNTS_CONNECTION_URL) {
      // Temporary, internal hook to allow the server to point the client
      // to a different authentication server. This is for a very
      // particular use case that comes up when implementing a oauth
      // server. Unsupported and may go away at any point in time.
      //
      // We will eventually provide a general way to use account-base
      // against any DDP connection, not just one special one.
      this.connection = DDP.connect(__meteor_runtime_config__.ACCOUNTS_CONNECTION_URL);
    } else {
      this.connection = Meteor.connection;
    }
  }

  _getTokenLifetimeMs() {
    // When loginExpirationInDays is set to null, we'll use a really high
    // number of days (LOGIN_UNEXPIRABLE_TOKEN_DAYS) to simulate an
    // unexpiring token.
    const loginExpirationInDays = this._options.loginExpirationInDays === null ? LOGIN_UNEXPIRING_TOKEN_DAYS : this._options.loginExpirationInDays;
    return this._options.loginExpiration || (loginExpirationInDays || DEFAULT_LOGIN_EXPIRATION_DAYS) * 86400000;
  }

  _getPasswordResetTokenLifetimeMs() {
    return this._options.passwordResetTokenExpiration || (this._options.passwordResetTokenExpirationInDays || DEFAULT_PASSWORD_RESET_TOKEN_EXPIRATION_DAYS) * 86400000;
  }

  _getPasswordEnrollTokenLifetimeMs() {
    return this._options.passwordEnrollTokenExpiration || (this._options.passwordEnrollTokenExpirationInDays || DEFAULT_PASSWORD_ENROLL_TOKEN_EXPIRATION_DAYS) * 86400000;
  }

  _tokenExpiration(when) {
    // We pass when through the Date constructor for backwards compatibility;
    // `when` used to be a number.
    return new Date(new Date(when).getTime() + this._getTokenLifetimeMs());
  }

  _tokenExpiresSoon(when) {
    let minLifetimeMs = .1 * this._getTokenLifetimeMs();

    const minLifetimeCapMs = MIN_TOKEN_LIFETIME_CAP_SECS * 1000;

    if (minLifetimeMs > minLifetimeCapMs) {
      minLifetimeMs = minLifetimeCapMs;
    }

    return new Date() > new Date(when) - minLifetimeMs;
  } // No-op on the server, overridden on the client.


  _startupCallback(callback) {}

}

// Note that Accounts is defined separately in accounts_client.js and
// accounts_server.js.

/**
 * @summary Get the current user id, or `null` if no user is logged in. A reactive data source.
 * @locus Anywhere but publish functions
 * @importFromPackage meteor
 */
Meteor.userId = () => Accounts.userId();
/**
 * @summary Get the current user record, or `null` if no user is logged in. A reactive data source.
 * @locus Anywhere but publish functions
 * @importFromPackage meteor
 * @param {Object} [options]
 * @param {MongoFieldSpecifier} options.fields Dictionary of fields to return or exclude.
 */


Meteor.user = options => Accounts.user(options); // how long (in days) until a login token expires


const DEFAULT_LOGIN_EXPIRATION_DAYS = 90; // how long (in days) until reset password token expires

const DEFAULT_PASSWORD_RESET_TOKEN_EXPIRATION_DAYS = 3; // how long (in days) until enrol password token expires

const DEFAULT_PASSWORD_ENROLL_TOKEN_EXPIRATION_DAYS = 30; // Clients don't try to auto-login with a token that is going to expire within
// .1 * DEFAULT_LOGIN_EXPIRATION_DAYS, capped at MIN_TOKEN_LIFETIME_CAP_SECS.
// Tries to avoid abrupt disconnects from expiring tokens.

const MIN_TOKEN_LIFETIME_CAP_SECS = 3600; // one hour
// how often (in milliseconds) we check for expired tokens

const EXPIRE_TOKENS_INTERVAL_MS = 600 * 1000;
const CONNECTION_CLOSE_DELAY_MS = 10 * 1000;
// A large number of expiration days (approximately 100 years worth) that is
// used when creating unexpiring tokens.
const LOGIN_UNEXPIRING_TOKEN_DAYS = 365 * 100;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"accounts_server.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/accounts-base/accounts_server.js                                                                        //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let _objectWithoutProperties;

module.link("@babel/runtime/helpers/objectWithoutProperties", {
  default(v) {
    _objectWithoutProperties = v;
  }

}, 0);

let _objectSpread;

module.link("@babel/runtime/helpers/objectSpread2", {
  default(v) {
    _objectSpread = v;
  }

}, 1);
module.export({
  AccountsServer: () => AccountsServer
});
let crypto;
module.link("crypto", {
  default(v) {
    crypto = v;
  }

}, 0);
let AccountsCommon, EXPIRE_TOKENS_INTERVAL_MS, CONNECTION_CLOSE_DELAY_MS;
module.link("./accounts_common.js", {
  AccountsCommon(v) {
    AccountsCommon = v;
  },

  EXPIRE_TOKENS_INTERVAL_MS(v) {
    EXPIRE_TOKENS_INTERVAL_MS = v;
  },

  CONNECTION_CLOSE_DELAY_MS(v) {
    CONNECTION_CLOSE_DELAY_MS = v;
  }

}, 1);
let URL;
module.link("meteor/url", {
  URL(v) {
    URL = v;
  }

}, 2);
const hasOwn = Object.prototype.hasOwnProperty;
/**
 * @summary Constructor for the `Accounts` namespace on the server.
 * @locus Server
 * @class AccountsServer
 * @extends AccountsCommon
 * @instancename accountsServer
 * @param {Object} server A server object such as `Meteor.server`.
 */

class AccountsServer extends AccountsCommon {
  // Note that this constructor is less likely to be instantiated multiple
  // times than the `AccountsClient` constructor, because a single server
  // can provide only one set of methods.
  constructor(server) {
    super();
    this._server = server || Meteor.server; // Set up the server's methods, as if by calling Meteor.methods.

    this._initServerMethods();

    this._initAccountDataHooks(); // If autopublish is on, publish these user fields. Login service
    // packages (eg accounts-google) add to these by calling
    // addAutopublishFields.  Notably, this isn't implemented with multiple
    // publishes since DDP only merges only across top-level fields, not
    // subfields (such as 'services.facebook.accessToken')


    this._autopublishFields = {
      loggedInUser: ['profile', 'username', 'emails'],
      otherUsers: ['profile', 'username']
    }; // use object to keep the reference when used in functions
    // where _defaultPublishFields is destructured into lexical scope
    // for publish callbacks that need `this`

    this._defaultPublishFields = {
      projection: {
        profile: 1,
        username: 1,
        emails: 1
      }
    };

    this._initServerPublications(); // connectionId -> {connection, loginToken}


    this._accountData = {}; // connection id -> observe handle for the login token that this connection is
    // currently associated with, or a number. The number indicates that we are in
    // the process of setting up the observe (using a number instead of a single
    // sentinel allows multiple attempts to set up the observe to identify which
    // one was theirs).

    this._userObservesForConnections = {};
    this._nextUserObserveNumber = 1; // for the number described above.
    // list of all registered handlers.

    this._loginHandlers = [];
    setupUsersCollection(this.users);
    setupDefaultLoginHandlers(this);
    setExpireTokensInterval(this);
    this._validateLoginHook = new Hook({
      bindEnvironment: false
    });
    this._validateNewUserHooks = [defaultValidateNewUserHook.bind(this)];

    this._deleteSavedTokensForAllUsersOnStartup();

    this._skipCaseInsensitiveChecksForTest = {};
    this.urls = {
      resetPassword: (token, extraParams) => this.buildEmailUrl("#/reset-password/".concat(token), extraParams),
      verifyEmail: (token, extraParams) => this.buildEmailUrl("#/verify-email/".concat(token), extraParams),
      enrollAccount: (token, extraParams) => this.buildEmailUrl("#/enroll-account/".concat(token), extraParams)
    };
    this.addDefaultRateLimit();

    this.buildEmailUrl = function (path) {
      let extraParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      const url = new URL(Meteor.absoluteUrl(path));
      const params = Object.entries(extraParams);

      if (params.length > 0) {
        // Add additional parameters to the url
        for (const [key, value] of params) {
          url.searchParams.append(key, value);
        }
      }

      return url.toString();
    };
  } ///
  /// CURRENT USER
  ///
  // @override of "abstract" non-implementation in accounts_common.js


  userId() {
    // This function only works if called inside a method or a pubication.
    // Using any of the information from Meteor.user() in a method or
    // publish function will always use the value from when the function first
    // runs. This is likely not what the user expects. The way to make this work
    // in a method or publish function is to do Meteor.find(this.userId).observe
    // and recompute when the user record changes.
    const currentInvocation = DDP._CurrentMethodInvocation.get() || DDP._CurrentPublicationInvocation.get();

    if (!currentInvocation) throw new Error("Meteor.userId can only be invoked in method calls or publications.");
    return currentInvocation.userId;
  } ///
  /// LOGIN HOOKS
  ///

  /**
   * @summary Validate login attempts.
   * @locus Server
   * @param {Function} func Called whenever a login is attempted (either successful or unsuccessful).  A login can be aborted by returning a falsy value or throwing an exception.
   */


  validateLoginAttempt(func) {
    // Exceptions inside the hook callback are passed up to us.
    return this._validateLoginHook.register(func);
  }
  /**
   * @summary Set restrictions on new user creation.
   * @locus Server
   * @param {Function} func Called whenever a new user is created. Takes the new user object, and returns true to allow the creation or false to abort.
   */


  validateNewUser(func) {
    this._validateNewUserHooks.push(func);
  }
  /**
   * @summary Validate login from external service
   * @locus Server
   * @param {Function} func Called whenever login/user creation from external service is attempted. Login or user creation based on this login can be aborted by passing a falsy value or throwing an exception.
   */


  beforeExternalLogin(func) {
    if (this._beforeExternalLoginHook) {
      throw new Error("Can only call beforeExternalLogin once");
    }

    this._beforeExternalLoginHook = func;
  } ///
  /// CREATE USER HOOKS
  ///

  /**
   * @summary Customize new user creation.
   * @locus Server
   * @param {Function} func Called whenever a new user is created. Return the new user object, or throw an `Error` to abort the creation.
   */


  onCreateUser(func) {
    if (this._onCreateUserHook) {
      throw new Error("Can only call onCreateUser once");
    }

    this._onCreateUserHook = func;
  }
  /**
   * @summary Customize oauth user profile updates
   * @locus Server
   * @param {Function} func Called whenever a user is logged in via oauth. Return the profile object to be merged, or throw an `Error` to abort the creation.
   */


  onExternalLogin(func) {
    if (this._onExternalLoginHook) {
      throw new Error("Can only call onExternalLogin once");
    }

    this._onExternalLoginHook = func;
  }
  /**
   * @summary Customize user selection on external logins
   * @locus Server
   * @param {Function} func Called whenever a user is logged in via oauth and a
   * user is not found with the service id. Return the user or undefined.
   */


  setAdditionalFindUserOnExternalLogin(func) {
    if (this._additionalFindUserOnExternalLogin) {
      throw new Error("Can only call setAdditionalFindUserOnExternalLogin once");
    }

    this._additionalFindUserOnExternalLogin = func;
  }

  _validateLogin(connection, attempt) {
    this._validateLoginHook.each(callback => {
      let ret;

      try {
        ret = callback(cloneAttemptWithConnection(connection, attempt));
      } catch (e) {
        attempt.allowed = false; // XXX this means the last thrown error overrides previous error
        // messages. Maybe this is surprising to users and we should make
        // overriding errors more explicit. (see
        // https://github.com/meteor/meteor/issues/1960)

        attempt.error = e;
        return true;
      }

      if (!ret) {
        attempt.allowed = false; // don't override a specific error provided by a previous
        // validator or the initial attempt (eg "incorrect password").

        if (!attempt.error) attempt.error = new Meteor.Error(403, "Login forbidden");
      }

      return true;
    });
  }

  _successfulLogin(connection, attempt) {
    this._onLoginHook.each(callback => {
      callback(cloneAttemptWithConnection(connection, attempt));
      return true;
    });
  }

  _failedLogin(connection, attempt) {
    this._onLoginFailureHook.each(callback => {
      callback(cloneAttemptWithConnection(connection, attempt));
      return true;
    });
  }

  _successfulLogout(connection, userId) {
    // don't fetch the user object unless there are some callbacks registered
    let user;

    this._onLogoutHook.each(callback => {
      if (!user && userId) user = this.users.findOne(userId, {
        fields: this._options.defaultFieldSelector
      });
      callback({
        user,
        connection
      });
      return true;
    });
  }

  ///
  /// LOGIN METHODS
  ///
  // Login methods return to the client an object containing these
  // fields when the user was logged in successfully:
  //
  //   id: userId
  //   token: *
  //   tokenExpires: *
  //
  // tokenExpires is optional and intends to provide a hint to the
  // client as to when the token will expire. If not provided, the
  // client will call Accounts._tokenExpiration, passing it the date
  // that it received the token.
  //
  // The login method will throw an error back to the client if the user
  // failed to log in.
  //
  //
  // Login handlers and service specific login methods such as
  // `createUser` internally return a `result` object containing these
  // fields:
  //
  //   type:
  //     optional string; the service name, overrides the handler
  //     default if present.
  //
  //   error:
  //     exception; if the user is not allowed to login, the reason why.
  //
  //   userId:
  //     string; the user id of the user attempting to login (if
  //     known), required for an allowed login.
  //
  //   options:
  //     optional object merged into the result returned by the login
  //     method; used by HAMK from SRP.
  //
  //   stampedLoginToken:
  //     optional object with `token` and `when` indicating the login
  //     token is already present in the database, returned by the
  //     "resume" login handler.
  //
  // For convenience, login methods can also throw an exception, which
  // is converted into an {error} result.  However, if the id of the
  // user attempting the login is known, a {userId, error} result should
  // be returned instead since the user id is not captured when an
  // exception is thrown.
  //
  // This internal `result` object is automatically converted into the
  // public {id, token, tokenExpires} object returned to the client.
  // Try a login method, converting thrown exceptions into an {error}
  // result.  The `type` argument is a default, inserted into the result
  // object if not explicitly returned.
  //
  // Log in a user on a connection.
  //
  // We use the method invocation to set the user id on the connection,
  // not the connection object directly. setUserId is tied to methods to
  // enforce clear ordering of method application (using wait methods on
  // the client, and a no setUserId after unblock restriction on the
  // server)
  //
  // The `stampedLoginToken` parameter is optional.  When present, it
  // indicates that the login token has already been inserted into the
  // database and doesn't need to be inserted again.  (It's used by the
  // "resume" login handler).
  _loginUser(methodInvocation, userId, stampedLoginToken) {
    if (!stampedLoginToken) {
      stampedLoginToken = this._generateStampedLoginToken();

      this._insertLoginToken(userId, stampedLoginToken);
    } // This order (and the avoidance of yields) is important to make
    // sure that when publish functions are rerun, they see a
    // consistent view of the world: the userId is set and matches
    // the login token on the connection (not that there is
    // currently a public API for reading the login token on a
    // connection).


    Meteor._noYieldsAllowed(() => this._setLoginToken(userId, methodInvocation.connection, this._hashLoginToken(stampedLoginToken.token)));

    methodInvocation.setUserId(userId);
    return {
      id: userId,
      token: stampedLoginToken.token,
      tokenExpires: this._tokenExpiration(stampedLoginToken.when)
    };
  }

  // After a login method has completed, call the login hooks.  Note
  // that `attemptLogin` is called for *all* login attempts, even ones
  // which aren't successful (such as an invalid password, etc).
  //
  // If the login is allowed and isn't aborted by a validate login hook
  // callback, log in the user.
  //
  _attemptLogin(methodInvocation, methodName, methodArgs, result) {
    if (!result) throw new Error("result is required"); // XXX A programming error in a login handler can lead to this occurring, and
    // then we don't call onLogin or onLoginFailure callbacks. Should
    // tryLoginMethod catch this case and turn it into an error?

    if (!result.userId && !result.error) throw new Error("A login method must specify a userId or an error");
    let user;
    if (result.userId) user = this.users.findOne(result.userId, {
      fields: this._options.defaultFieldSelector
    });
    const attempt = {
      type: result.type || "unknown",
      allowed: !!(result.userId && !result.error),
      methodName: methodName,
      methodArguments: Array.from(methodArgs)
    };

    if (result.error) {
      attempt.error = result.error;
    }

    if (user) {
      attempt.user = user;
    } // _validateLogin may mutate `attempt` by adding an error and changing allowed
    // to false, but that's the only change it can make (and the user's callbacks
    // only get a clone of `attempt`).


    this._validateLogin(methodInvocation.connection, attempt);

    if (attempt.allowed) {
      const ret = _objectSpread(_objectSpread({}, this._loginUser(methodInvocation, result.userId, result.stampedLoginToken)), result.options);

      ret.type = attempt.type;

      this._successfulLogin(methodInvocation.connection, attempt);

      return ret;
    } else {
      this._failedLogin(methodInvocation.connection, attempt);

      throw attempt.error;
    }
  }

  // All service specific login methods should go through this function.
  // Ensure that thrown exceptions are caught and that login hook
  // callbacks are still called.
  //
  _loginMethod(methodInvocation, methodName, methodArgs, type, fn) {
    return this._attemptLogin(methodInvocation, methodName, methodArgs, tryLoginMethod(type, fn));
  }

  // Report a login attempt failed outside the context of a normal login
  // method. This is for use in the case where there is a multi-step login
  // procedure (eg SRP based password login). If a method early in the
  // chain fails, it should call this function to report a failure. There
  // is no corresponding method for a successful login; methods that can
  // succeed at logging a user in should always be actual login methods
  // (using either Accounts._loginMethod or Accounts.registerLoginHandler).
  _reportLoginFailure(methodInvocation, methodName, methodArgs, result) {
    const attempt = {
      type: result.type || "unknown",
      allowed: false,
      error: result.error,
      methodName: methodName,
      methodArguments: Array.from(methodArgs)
    };

    if (result.userId) {
      attempt.user = this.users.findOne(result.userId, {
        fields: this._options.defaultFieldSelector
      });
    }

    this._validateLogin(methodInvocation.connection, attempt);

    this._failedLogin(methodInvocation.connection, attempt); // _validateLogin may mutate attempt to set a new error message. Return
    // the modified version.


    return attempt;
  }

  ///
  /// LOGIN HANDLERS
  ///
  // The main entry point for auth packages to hook in to login.
  //
  // A login handler is a login method which can return `undefined` to
  // indicate that the login request is not handled by this handler.
  //
  // @param name {String} Optional.  The service name, used by default
  // if a specific service name isn't returned in the result.
  //
  // @param handler {Function} A function that receives an options object
  // (as passed as an argument to the `login` method) and returns one of:
  // - `undefined`, meaning don't handle;
  // - a login method result object
  registerLoginHandler(name, handler) {
    if (!handler) {
      handler = name;
      name = null;
    }

    this._loginHandlers.push({
      name: name,
      handler: handler
    });
  }

  // Checks a user's credentials against all the registered login
  // handlers, and returns a login token if the credentials are valid. It
  // is like the login method, except that it doesn't set the logged-in
  // user on the connection. Throws a Meteor.Error if logging in fails,
  // including the case where none of the login handlers handled the login
  // request. Otherwise, returns {id: userId, token: *, tokenExpires: *}.
  //
  // For example, if you want to login with a plaintext password, `options` could be
  //   { user: { username: <username> }, password: <password> }, or
  //   { user: { email: <email> }, password: <password> }.
  // Try all of the registered login handlers until one of them doesn't
  // return `undefined`, meaning it handled this call to `login`. Return
  // that return value.
  _runLoginHandlers(methodInvocation, options) {
    for (let handler of this._loginHandlers) {
      const result = tryLoginMethod(handler.name, () => handler.handler.call(methodInvocation, options));

      if (result) {
        return result;
      }

      if (result !== undefined) {
        throw new Meteor.Error(400, "A login handler should return a result or undefined");
      }
    }

    return {
      type: null,
      error: new Meteor.Error(400, "Unrecognized options for login request")
    };
  }

  // Deletes the given loginToken from the database.
  //
  // For new-style hashed token, this will cause all connections
  // associated with the token to be closed.
  //
  // Any connections associated with old-style unhashed tokens will be
  // in the process of becoming associated with hashed tokens and then
  // they'll get closed.
  destroyToken(userId, loginToken) {
    this.users.update(userId, {
      $pull: {
        "services.resume.loginTokens": {
          $or: [{
            hashedToken: loginToken
          }, {
            token: loginToken
          }]
        }
      }
    });
  }

  _initServerMethods() {
    // The methods created in this function need to be created here so that
    // this variable is available in their scope.
    const accounts = this; // This object will be populated with methods and then passed to
    // accounts._server.methods further below.

    const methods = {}; // @returns {Object|null}
    //   If successful, returns {token: reconnectToken, id: userId}
    //   If unsuccessful (for example, if the user closed the oauth login popup),
    //     throws an error describing the reason

    methods.login = function (options) {
      // Login handlers should really also check whatever field they look at in
      // options, but we don't enforce it.
      check(options, Object);

      const result = accounts._runLoginHandlers(this, options);

      return accounts._attemptLogin(this, "login", arguments, result);
    };

    methods.logout = function () {
      const token = accounts._getLoginToken(this.connection.id);

      accounts._setLoginToken(this.userId, this.connection, null);

      if (token && this.userId) {
        accounts.destroyToken(this.userId, token);
      }

      accounts._successfulLogout(this.connection, this.userId);

      this.setUserId(null);
    }; // Generates a new login token with the same expiration as the
    // connection's current token and saves it to the database. Associates
    // the connection with this new token and returns it. Throws an error
    // if called on a connection that isn't logged in.
    //
    // @returns Object
    //   If successful, returns { token: <new token>, id: <user id>,
    //   tokenExpires: <expiration date> }.


    methods.getNewToken = function () {
      const user = accounts.users.findOne(this.userId, {
        fields: {
          "services.resume.loginTokens": 1
        }
      });

      if (!this.userId || !user) {
        throw new Meteor.Error("You are not logged in.");
      } // Be careful not to generate a new token that has a later
      // expiration than the curren token. Otherwise, a bad guy with a
      // stolen token could use this method to stop his stolen token from
      // ever expiring.


      const currentHashedToken = accounts._getLoginToken(this.connection.id);

      const currentStampedToken = user.services.resume.loginTokens.find(stampedToken => stampedToken.hashedToken === currentHashedToken);

      if (!currentStampedToken) {
        // safety belt: this should never happen
        throw new Meteor.Error("Invalid login token");
      }

      const newStampedToken = accounts._generateStampedLoginToken();

      newStampedToken.when = currentStampedToken.when;

      accounts._insertLoginToken(this.userId, newStampedToken);

      return accounts._loginUser(this, this.userId, newStampedToken);
    }; // Removes all tokens except the token associated with the current
    // connection. Throws an error if the connection is not logged
    // in. Returns nothing on success.


    methods.removeOtherTokens = function () {
      if (!this.userId) {
        throw new Meteor.Error("You are not logged in.");
      }

      const currentToken = accounts._getLoginToken(this.connection.id);

      accounts.users.update(this.userId, {
        $pull: {
          "services.resume.loginTokens": {
            hashedToken: {
              $ne: currentToken
            }
          }
        }
      });
    }; // Allow a one-time configuration for a login service. Modifications
    // to this collection are also allowed in insecure mode.


    methods.configureLoginService = options => {
      check(options, Match.ObjectIncluding({
        service: String
      })); // Don't let random users configure a service we haven't added yet (so
      // that when we do later add it, it's set up with their configuration
      // instead of ours).
      // XXX if service configuration is oauth-specific then this code should
      //     be in accounts-oauth; if it's not then the registry should be
      //     in this package

      if (!(accounts.oauth && accounts.oauth.serviceNames().includes(options.service))) {
        throw new Meteor.Error(403, "Service unknown");
      }

      const {
        ServiceConfiguration
      } = Package['service-configuration'];
      if (ServiceConfiguration.configurations.findOne({
        service: options.service
      })) throw new Meteor.Error(403, "Service ".concat(options.service, " already configured"));
      if (hasOwn.call(options, 'secret') && usingOAuthEncryption()) options.secret = OAuthEncryption.seal(options.secret);
      ServiceConfiguration.configurations.insert(options);
    };

    accounts._server.methods(methods);
  }

  _initAccountDataHooks() {
    this._server.onConnection(connection => {
      this._accountData[connection.id] = {
        connection: connection
      };
      connection.onClose(() => {
        this._removeTokenFromConnection(connection.id);

        delete this._accountData[connection.id];
      });
    });
  }

  _initServerPublications() {
    // Bring into lexical scope for publish callbacks that need `this`
    const {
      users,
      _autopublishFields,
      _defaultPublishFields
    } = this; // Publish all login service configuration fields other than secret.

    this._server.publish("meteor.loginServiceConfiguration", () => {
      const {
        ServiceConfiguration
      } = Package['service-configuration'];
      return ServiceConfiguration.configurations.find({}, {
        fields: {
          secret: 0
        }
      });
    }, {
      is_auto: true
    }); // not technically autopublish, but stops the warning.
    // Use Meteor.startup to give other packages a chance to call
    // setDefaultPublishFields.


    Meteor.startup(() => {
      // Publish the current user's record to the client.
      this._server.publish(null, function () {
        if (this.userId) {
          return users.find({
            _id: this.userId
          }, {
            fields: _defaultPublishFields.projection
          });
        } else {
          return null;
        }
      },
      /*suppress autopublish warning*/
      {
        is_auto: true
      });
    }); // Use Meteor.startup to give other packages a chance to call
    // addAutopublishFields.

    Package.autopublish && Meteor.startup(() => {
      // ['profile', 'username'] -> {profile: 1, username: 1}
      const toFieldSelector = fields => fields.reduce((prev, field) => _objectSpread(_objectSpread({}, prev), {}, {
        [field]: 1
      }), {});

      this._server.publish(null, function () {
        if (this.userId) {
          return users.find({
            _id: this.userId
          }, {
            fields: toFieldSelector(_autopublishFields.loggedInUser)
          });
        } else {
          return null;
        }
      },
      /*suppress autopublish warning*/
      {
        is_auto: true
      }); // XXX this publish is neither dedup-able nor is it optimized by our special
      // treatment of queries on a specific _id. Therefore this will have O(n^2)
      // run-time performance every time a user document is changed (eg someone
      // logging in). If this is a problem, we can instead write a manual publish
      // function which filters out fields based on 'this.userId'.


      this._server.publish(null, function () {
        const selector = this.userId ? {
          _id: {
            $ne: this.userId
          }
        } : {};
        return users.find(selector, {
          fields: toFieldSelector(_autopublishFields.otherUsers)
        });
      },
      /*suppress autopublish warning*/
      {
        is_auto: true
      });
    });
  }

  // Add to the list of fields or subfields to be automatically
  // published if autopublish is on. Must be called from top-level
  // code (ie, before Meteor.startup hooks run).
  //
  // @param opts {Object} with:
  //   - forLoggedInUser {Array} Array of fields published to the logged-in user
  //   - forOtherUsers {Array} Array of fields published to users that aren't logged in
  addAutopublishFields(opts) {
    this._autopublishFields.loggedInUser.push.apply(this._autopublishFields.loggedInUser, opts.forLoggedInUser);

    this._autopublishFields.otherUsers.push.apply(this._autopublishFields.otherUsers, opts.forOtherUsers);
  }

  // Replaces the fields to be automatically
  // published when the user logs in
  //
  // @param {MongoFieldSpecifier} fields Dictionary of fields to return or exclude.
  setDefaultPublishFields(fields) {
    this._defaultPublishFields.projection = fields;
  }

  ///
  /// ACCOUNT DATA
  ///
  // HACK: This is used by 'meteor-accounts' to get the loginToken for a
  // connection. Maybe there should be a public way to do that.
  _getAccountData(connectionId, field) {
    const data = this._accountData[connectionId];
    return data && data[field];
  }

  _setAccountData(connectionId, field, value) {
    const data = this._accountData[connectionId]; // safety belt. shouldn't happen. accountData is set in onConnection,
    // we don't have a connectionId until it is set.

    if (!data) return;
    if (value === undefined) delete data[field];else data[field] = value;
  }

  ///
  /// RECONNECT TOKENS
  ///
  /// support reconnecting using a meteor login token
  _hashLoginToken(loginToken) {
    const hash = crypto.createHash('sha256');
    hash.update(loginToken);
    return hash.digest('base64');
  }

  // {token, when} => {hashedToken, when}
  _hashStampedToken(stampedToken) {
    const {
      token
    } = stampedToken,
          hashedStampedToken = _objectWithoutProperties(stampedToken, ["token"]);

    return _objectSpread(_objectSpread({}, hashedStampedToken), {}, {
      hashedToken: this._hashLoginToken(token)
    });
  }

  // Using $addToSet avoids getting an index error if another client
  // logging in simultaneously has already inserted the new hashed
  // token.
  _insertHashedLoginToken(userId, hashedToken, query) {
    query = query ? _objectSpread({}, query) : {};
    query._id = userId;
    this.users.update(query, {
      $addToSet: {
        "services.resume.loginTokens": hashedToken
      }
    });
  }

  // Exported for tests.
  _insertLoginToken(userId, stampedToken, query) {
    this._insertHashedLoginToken(userId, this._hashStampedToken(stampedToken), query);
  }

  _clearAllLoginTokens(userId) {
    this.users.update(userId, {
      $set: {
        'services.resume.loginTokens': []
      }
    });
  }

  // test hook
  _getUserObserve(connectionId) {
    return this._userObservesForConnections[connectionId];
  }

  // Clean up this connection's association with the token: that is, stop
  // the observe that we started when we associated the connection with
  // this token.
  _removeTokenFromConnection(connectionId) {
    if (hasOwn.call(this._userObservesForConnections, connectionId)) {
      const observe = this._userObservesForConnections[connectionId];

      if (typeof observe === 'number') {
        // We're in the process of setting up an observe for this connection. We
        // can't clean up that observe yet, but if we delete the placeholder for
        // this connection, then the observe will get cleaned up as soon as it has
        // been set up.
        delete this._userObservesForConnections[connectionId];
      } else {
        delete this._userObservesForConnections[connectionId];
        observe.stop();
      }
    }
  }

  _getLoginToken(connectionId) {
    return this._getAccountData(connectionId, 'loginToken');
  }

  // newToken is a hashed token.
  _setLoginToken(userId, connection, newToken) {
    this._removeTokenFromConnection(connection.id);

    this._setAccountData(connection.id, 'loginToken', newToken);

    if (newToken) {
      // Set up an observe for this token. If the token goes away, we need
      // to close the connection.  We defer the observe because there's
      // no need for it to be on the critical path for login; we just need
      // to ensure that the connection will get closed at some point if
      // the token gets deleted.
      //
      // Initially, we set the observe for this connection to a number; this
      // signifies to other code (which might run while we yield) that we are in
      // the process of setting up an observe for this connection. Once the
      // observe is ready to go, we replace the number with the real observe
      // handle (unless the placeholder has been deleted or replaced by a
      // different placehold number, signifying that the connection was closed
      // already -- in this case we just clean up the observe that we started).
      const myObserveNumber = ++this._nextUserObserveNumber;
      this._userObservesForConnections[connection.id] = myObserveNumber;
      Meteor.defer(() => {
        // If something else happened on this connection in the meantime (it got
        // closed, or another call to _setLoginToken happened), just do
        // nothing. We don't need to start an observe for an old connection or old
        // token.
        if (this._userObservesForConnections[connection.id] !== myObserveNumber) {
          return;
        }

        let foundMatchingUser; // Because we upgrade unhashed login tokens to hashed tokens at
        // login time, sessions will only be logged in with a hashed
        // token. Thus we only need to observe hashed tokens here.

        const observe = this.users.find({
          _id: userId,
          'services.resume.loginTokens.hashedToken': newToken
        }, {
          fields: {
            _id: 1
          }
        }).observeChanges({
          added: () => {
            foundMatchingUser = true;
          },
          removed: connection.close // The onClose callback for the connection takes care of
          // cleaning up the observe handle and any other state we have
          // lying around.

        }, {
          nonMutatingCallbacks: true
        }); // If the user ran another login or logout command we were waiting for the
        // defer or added to fire (ie, another call to _setLoginToken occurred),
        // then we let the later one win (start an observe, etc) and just stop our
        // observe now.
        //
        // Similarly, if the connection was already closed, then the onClose
        // callback would have called _removeTokenFromConnection and there won't
        // be an entry in _userObservesForConnections. We can stop the observe.

        if (this._userObservesForConnections[connection.id] !== myObserveNumber) {
          observe.stop();
          return;
        }

        this._userObservesForConnections[connection.id] = observe;

        if (!foundMatchingUser) {
          // We've set up an observe on the user associated with `newToken`,
          // so if the new token is removed from the database, we'll close
          // the connection. But the token might have already been deleted
          // before we set up the observe, which wouldn't have closed the
          // connection because the observe wasn't running yet.
          connection.close();
        }
      });
    }
  }

  // (Also used by Meteor Accounts server and tests).
  //
  _generateStampedLoginToken() {
    return {
      token: Random.secret(),
      when: new Date()
    };
  }

  ///
  /// TOKEN EXPIRATION
  ///
  // Deletes expired password reset tokens from the database.
  //
  // Exported for tests. Also, the arguments are only used by
  // tests. oldestValidDate is simulate expiring tokens without waiting
  // for them to actually expire. userId is used by tests to only expire
  // tokens for the test user.
  _expirePasswordResetTokens(oldestValidDate, userId) {
    const tokenLifetimeMs = this._getPasswordResetTokenLifetimeMs(); // when calling from a test with extra arguments, you must specify both!


    if (oldestValidDate && !userId || !oldestValidDate && userId) {
      throw new Error("Bad test. Must specify both oldestValidDate and userId.");
    }

    oldestValidDate = oldestValidDate || new Date(new Date() - tokenLifetimeMs);
    const tokenFilter = {
      $or: [{
        "services.password.reset.reason": "reset"
      }, {
        "services.password.reset.reason": {
          $exists: false
        }
      }]
    };
    expirePasswordToken(this, oldestValidDate, tokenFilter, userId);
  } // Deletes expired password enroll tokens from the database.
  //
  // Exported for tests. Also, the arguments are only used by
  // tests. oldestValidDate is simulate expiring tokens without waiting
  // for them to actually expire. userId is used by tests to only expire
  // tokens for the test user.


  _expirePasswordEnrollTokens(oldestValidDate, userId) {
    const tokenLifetimeMs = this._getPasswordEnrollTokenLifetimeMs(); // when calling from a test with extra arguments, you must specify both!


    if (oldestValidDate && !userId || !oldestValidDate && userId) {
      throw new Error("Bad test. Must specify both oldestValidDate and userId.");
    }

    oldestValidDate = oldestValidDate || new Date(new Date() - tokenLifetimeMs);
    const tokenFilter = {
      "services.password.enroll.reason": "enroll"
    };
    expirePasswordToken(this, oldestValidDate, tokenFilter, userId);
  } // Deletes expired tokens from the database and closes all open connections
  // associated with these tokens.
  //
  // Exported for tests. Also, the arguments are only used by
  // tests. oldestValidDate is simulate expiring tokens without waiting
  // for them to actually expire. userId is used by tests to only expire
  // tokens for the test user.


  _expireTokens(oldestValidDate, userId) {
    const tokenLifetimeMs = this._getTokenLifetimeMs(); // when calling from a test with extra arguments, you must specify both!


    if (oldestValidDate && !userId || !oldestValidDate && userId) {
      throw new Error("Bad test. Must specify both oldestValidDate and userId.");
    }

    oldestValidDate = oldestValidDate || new Date(new Date() - tokenLifetimeMs);
    const userFilter = userId ? {
      _id: userId
    } : {}; // Backwards compatible with older versions of meteor that stored login token
    // timestamps as numbers.

    this.users.update(_objectSpread(_objectSpread({}, userFilter), {}, {
      $or: [{
        "services.resume.loginTokens.when": {
          $lt: oldestValidDate
        }
      }, {
        "services.resume.loginTokens.when": {
          $lt: +oldestValidDate
        }
      }]
    }), {
      $pull: {
        "services.resume.loginTokens": {
          $or: [{
            when: {
              $lt: oldestValidDate
            }
          }, {
            when: {
              $lt: +oldestValidDate
            }
          }]
        }
      }
    }, {
      multi: true
    }); // The observe on Meteor.users will take care of closing connections for
    // expired tokens.
  }

  // @override from accounts_common.js
  config(options) {
    // Call the overridden implementation of the method.
    const superResult = AccountsCommon.prototype.config.apply(this, arguments); // If the user set loginExpirationInDays to null, then we need to clear the
    // timer that periodically expires tokens.

    if (hasOwn.call(this._options, 'loginExpirationInDays') && this._options.loginExpirationInDays === null && this.expireTokenInterval) {
      Meteor.clearInterval(this.expireTokenInterval);
      this.expireTokenInterval = null;
    }

    return superResult;
  }

  // Called by accounts-password
  insertUserDoc(options, user) {
    // - clone user document, to protect from modification
    // - add createdAt timestamp
    // - prepare an _id, so that you can modify other collections (eg
    // create a first task for every new user)
    //
    // XXX If the onCreateUser or validateNewUser hooks fail, we might
    // end up having modified some other collection
    // inappropriately. The solution is probably to have onCreateUser
    // accept two callbacks - one that gets called before inserting
    // the user document (in which you can modify its contents), and
    // one that gets called after (in which you should change other
    // collections)
    user = _objectSpread({
      createdAt: new Date(),
      _id: Random.id()
    }, user);

    if (user.services) {
      Object.keys(user.services).forEach(service => pinEncryptedFieldsToUser(user.services[service], user._id));
    }

    let fullUser;

    if (this._onCreateUserHook) {
      fullUser = this._onCreateUserHook(options, user); // This is *not* part of the API. We need this because we can't isolate
      // the global server environment between tests, meaning we can't test
      // both having a create user hook set and not having one set.

      if (fullUser === 'TEST DEFAULT HOOK') fullUser = defaultCreateUserHook(options, user);
    } else {
      fullUser = defaultCreateUserHook(options, user);
    }

    this._validateNewUserHooks.forEach(hook => {
      if (!hook(fullUser)) throw new Meteor.Error(403, "User validation failed");
    });

    let userId;

    try {
      userId = this.users.insert(fullUser);
    } catch (e) {
      // XXX string parsing sucks, maybe
      // https://jira.mongodb.org/browse/SERVER-3069 will get fixed one day
      // https://jira.mongodb.org/browse/SERVER-4637
      if (!e.errmsg) throw e;
      if (e.errmsg.includes('emails.address')) throw new Meteor.Error(403, "Email already exists.");
      if (e.errmsg.includes('username')) throw new Meteor.Error(403, "Username already exists.");
      throw e;
    }

    return userId;
  }

  // Helper function: returns false if email does not match company domain from
  // the configuration.
  _testEmailDomain(email) {
    const domain = this._options.restrictCreationByEmailDomain;
    return !domain || typeof domain === 'function' && domain(email) || typeof domain === 'string' && new RegExp("@".concat(Meteor._escapeRegExp(domain), "$"), 'i').test(email);
  }

  ///
  /// CLEAN UP FOR `logoutOtherClients`
  ///
  _deleteSavedTokensForUser(userId, tokensToDelete) {
    if (tokensToDelete) {
      this.users.update(userId, {
        $unset: {
          "services.resume.haveLoginTokensToDelete": 1,
          "services.resume.loginTokensToDelete": 1
        },
        $pullAll: {
          "services.resume.loginTokens": tokensToDelete
        }
      });
    }
  }

  _deleteSavedTokensForAllUsersOnStartup() {
    // If we find users who have saved tokens to delete on startup, delete
    // them now. It's possible that the server could have crashed and come
    // back up before new tokens are found in localStorage, but this
    // shouldn't happen very often. We shouldn't put a delay here because
    // that would give a lot of power to an attacker with a stolen login
    // token and the ability to crash the server.
    Meteor.startup(() => {
      this.users.find({
        "services.resume.haveLoginTokensToDelete": true
      }, {
        fields: {
          "services.resume.loginTokensToDelete": 1
        }
      }).forEach(user => {
        this._deleteSavedTokensForUser(user._id, user.services.resume.loginTokensToDelete);
      });
    });
  }

  ///
  /// MANAGING USER OBJECTS
  ///
  // Updates or creates a user after we authenticate with a 3rd party.
  //
  // @param serviceName {String} Service name (eg, twitter).
  // @param serviceData {Object} Data to store in the user's record
  //        under services[serviceName]. Must include an "id" field
  //        which is a unique identifier for the user in the service.
  // @param options {Object, optional} Other options to pass to insertUserDoc
  //        (eg, profile)
  // @returns {Object} Object with token and id keys, like the result
  //        of the "login" method.
  //
  updateOrCreateUserFromExternalService(serviceName, serviceData, options) {
    options = _objectSpread({}, options);

    if (serviceName === "password" || serviceName === "resume") {
      throw new Error("Can't use updateOrCreateUserFromExternalService with internal service " + serviceName);
    }

    if (!hasOwn.call(serviceData, 'id')) {
      throw new Error("Service data for service ".concat(serviceName, " must include id"));
    } // Look for a user with the appropriate service user id.


    const selector = {};
    const serviceIdKey = "services.".concat(serviceName, ".id"); // XXX Temporary special case for Twitter. (Issue #629)
    //   The serviceData.id will be a string representation of an integer.
    //   We want it to match either a stored string or int representation.
    //   This is to cater to earlier versions of Meteor storing twitter
    //   user IDs in number form, and recent versions storing them as strings.
    //   This can be removed once migration technology is in place, and twitter
    //   users stored with integer IDs have been migrated to string IDs.

    if (serviceName === "twitter" && !isNaN(serviceData.id)) {
      selector["$or"] = [{}, {}];
      selector["$or"][0][serviceIdKey] = serviceData.id;
      selector["$or"][1][serviceIdKey] = parseInt(serviceData.id, 10);
    } else {
      selector[serviceIdKey] = serviceData.id;
    }

    let user = this.users.findOne(selector, {
      fields: this._options.defaultFieldSelector
    }); // Check to see if the developer has a custom way to find the user outside
    // of the general selectors above.

    if (!user && this._additionalFindUserOnExternalLogin) {
      user = this._additionalFindUserOnExternalLogin({
        serviceName,
        serviceData,
        options
      });
    } // Before continuing, run user hook to see if we should continue


    if (this._beforeExternalLoginHook && !this._beforeExternalLoginHook(serviceName, serviceData, user)) {
      throw new Meteor.Error(403, "Login forbidden");
    } // When creating a new user we pass through all options. When updating an
    // existing user, by default we only process/pass through the serviceData
    // (eg, so that we keep an unexpired access token and don't cache old email
    // addresses in serviceData.email). The onExternalLogin hook can be used when
    // creating or updating a user, to modify or pass through more options as
    // needed.


    let opts = user ? {} : options;

    if (this._onExternalLoginHook) {
      opts = this._onExternalLoginHook(options, user);
    }

    if (user) {
      pinEncryptedFieldsToUser(serviceData, user._id);
      let setAttrs = {};
      Object.keys(serviceData).forEach(key => setAttrs["services.".concat(serviceName, ".").concat(key)] = serviceData[key]); // XXX Maybe we should re-use the selector above and notice if the update
      //     touches nothing?

      setAttrs = _objectSpread(_objectSpread({}, setAttrs), opts);
      this.users.update(user._id, {
        $set: setAttrs
      });
      return {
        type: serviceName,
        userId: user._id
      };
    } else {
      // Create a new user with the service data.
      user = {
        services: {}
      };
      user.services[serviceName] = serviceData;
      return {
        type: serviceName,
        userId: this.insertUserDoc(opts, user)
      };
    }
  }

  // Removes default rate limiting rule
  removeDefaultRateLimit() {
    const resp = DDPRateLimiter.removeRule(this.defaultRateLimiterRuleId);
    this.defaultRateLimiterRuleId = null;
    return resp;
  }

  // Add a default rule of limiting logins, creating new users and password reset
  // to 5 times every 10 seconds per connection.
  addDefaultRateLimit() {
    if (!this.defaultRateLimiterRuleId) {
      this.defaultRateLimiterRuleId = DDPRateLimiter.addRule({
        userId: null,
        clientAddress: null,
        type: 'method',
        name: name => ['login', 'createUser', 'resetPassword', 'forgotPassword'].includes(name),
        connectionId: connectionId => true
      }, 5, 10000);
    }
  }

}

// Give each login hook callback a fresh cloned copy of the attempt
// object, but don't clone the connection.
//
const cloneAttemptWithConnection = (connection, attempt) => {
  const clonedAttempt = EJSON.clone(attempt);
  clonedAttempt.connection = connection;
  return clonedAttempt;
};

const tryLoginMethod = (type, fn) => {
  let result;

  try {
    result = fn();
  } catch (e) {
    result = {
      error: e
    };
  }

  if (result && !result.type && type) result.type = type;
  return result;
};

const setupDefaultLoginHandlers = accounts => {
  accounts.registerLoginHandler("resume", function (options) {
    return defaultResumeLoginHandler.call(this, accounts, options);
  });
}; // Login handler for resume tokens.


const defaultResumeLoginHandler = (accounts, options) => {
  if (!options.resume) return undefined;
  check(options.resume, String);

  const hashedToken = accounts._hashLoginToken(options.resume); // First look for just the new-style hashed login token, to avoid
  // sending the unhashed token to the database in a query if we don't
  // need to.


  let user = accounts.users.findOne({
    "services.resume.loginTokens.hashedToken": hashedToken
  }, {
    fields: {
      "services.resume.loginTokens.$": 1
    }
  });

  if (!user) {
    // If we didn't find the hashed login token, try also looking for
    // the old-style unhashed token.  But we need to look for either
    // the old-style token OR the new-style token, because another
    // client connection logging in simultaneously might have already
    // converted the token.
    user = accounts.users.findOne({
      $or: [{
        "services.resume.loginTokens.hashedToken": hashedToken
      }, {
        "services.resume.loginTokens.token": options.resume
      }]
    }, // Note: Cannot use ...loginTokens.$ positional operator with $or query.
    {
      fields: {
        "services.resume.loginTokens": 1
      }
    });
  }

  if (!user) return {
    error: new Meteor.Error(403, "You've been logged out by the server. Please log in again.")
  }; // Find the token, which will either be an object with fields
  // {hashedToken, when} for a hashed token or {token, when} for an
  // unhashed token.

  let oldUnhashedStyleToken;
  let token = user.services.resume.loginTokens.find(token => token.hashedToken === hashedToken);

  if (token) {
    oldUnhashedStyleToken = false;
  } else {
    token = user.services.resume.loginTokens.find(token => token.token === options.resume);
    oldUnhashedStyleToken = true;
  }

  const tokenExpires = accounts._tokenExpiration(token.when);

  if (new Date() >= tokenExpires) return {
    userId: user._id,
    error: new Meteor.Error(403, "Your session has expired. Please log in again.")
  }; // Update to a hashed token when an unhashed token is encountered.

  if (oldUnhashedStyleToken) {
    // Only add the new hashed token if the old unhashed token still
    // exists (this avoids resurrecting the token if it was deleted
    // after we read it).  Using $addToSet avoids getting an index
    // error if another client logging in simultaneously has already
    // inserted the new hashed token.
    accounts.users.update({
      _id: user._id,
      "services.resume.loginTokens.token": options.resume
    }, {
      $addToSet: {
        "services.resume.loginTokens": {
          "hashedToken": hashedToken,
          "when": token.when
        }
      }
    }); // Remove the old token *after* adding the new, since otherwise
    // another client trying to login between our removing the old and
    // adding the new wouldn't find a token to login with.

    accounts.users.update(user._id, {
      $pull: {
        "services.resume.loginTokens": {
          "token": options.resume
        }
      }
    });
  }

  return {
    userId: user._id,
    stampedLoginToken: {
      token: options.resume,
      when: token.when
    }
  };
};

const expirePasswordToken = (accounts, oldestValidDate, tokenFilter, userId) => {
  // boolean value used to determine if this method was called from enroll account workflow
  let isEnroll = false;
  const userFilter = userId ? {
    _id: userId
  } : {}; // check if this method was called from enroll account workflow

  if (tokenFilter['services.password.enroll.reason']) {
    isEnroll = true;
  }

  let resetRangeOr = {
    $or: [{
      "services.password.reset.when": {
        $lt: oldestValidDate
      }
    }, {
      "services.password.reset.when": {
        $lt: +oldestValidDate
      }
    }]
  };

  if (isEnroll) {
    resetRangeOr = {
      $or: [{
        "services.password.enroll.when": {
          $lt: oldestValidDate
        }
      }, {
        "services.password.enroll.when": {
          $lt: +oldestValidDate
        }
      }]
    };
  }

  const expireFilter = {
    $and: [tokenFilter, resetRangeOr]
  };

  if (isEnroll) {
    accounts.users.update(_objectSpread(_objectSpread({}, userFilter), expireFilter), {
      $unset: {
        "services.password.enroll": ""
      }
    }, {
      multi: true
    });
  } else {
    accounts.users.update(_objectSpread(_objectSpread({}, userFilter), expireFilter), {
      $unset: {
        "services.password.reset": ""
      }
    }, {
      multi: true
    });
  }
};

const setExpireTokensInterval = accounts => {
  accounts.expireTokenInterval = Meteor.setInterval(() => {
    accounts._expireTokens();

    accounts._expirePasswordResetTokens();

    accounts._expirePasswordEnrollTokens();
  }, EXPIRE_TOKENS_INTERVAL_MS);
}; ///
/// OAuth Encryption Support
///


const OAuthEncryption = Package["oauth-encryption"] && Package["oauth-encryption"].OAuthEncryption;

const usingOAuthEncryption = () => {
  return OAuthEncryption && OAuthEncryption.keyIsLoaded();
}; // OAuth service data is temporarily stored in the pending credentials
// collection during the oauth authentication process.  Sensitive data
// such as access tokens are encrypted without the user id because
// we don't know the user id yet.  We re-encrypt these fields with the
// user id included when storing the service data permanently in
// the users collection.
//


const pinEncryptedFieldsToUser = (serviceData, userId) => {
  Object.keys(serviceData).forEach(key => {
    let value = serviceData[key];
    if (OAuthEncryption && OAuthEncryption.isSealed(value)) value = OAuthEncryption.seal(OAuthEncryption.open(value), userId);
    serviceData[key] = value;
  });
}; // Encrypt unencrypted login service secrets when oauth-encryption is
// added.
//
// XXX For the oauthSecretKey to be available here at startup, the
// developer must call Accounts.config({oauthSecretKey: ...}) at load
// time, instead of in a Meteor.startup block, because the startup
// block in the app code will run after this accounts-base startup
// block.  Perhaps we need a post-startup callback?


Meteor.startup(() => {
  if (!usingOAuthEncryption()) {
    return;
  }

  const {
    ServiceConfiguration
  } = Package['service-configuration'];
  ServiceConfiguration.configurations.find({
    $and: [{
      secret: {
        $exists: true
      }
    }, {
      "secret.algorithm": {
        $exists: false
      }
    }]
  }).forEach(config => {
    ServiceConfiguration.configurations.update(config._id, {
      $set: {
        secret: OAuthEncryption.seal(config.secret)
      }
    });
  });
}); // XXX see comment on Accounts.createUser in passwords_server about adding a
// second "server options" argument.

const defaultCreateUserHook = (options, user) => {
  if (options.profile) user.profile = options.profile;
  return user;
}; // Validate new user's email or Google/Facebook/GitHub account's email


function defaultValidateNewUserHook(user) {
  const domain = this._options.restrictCreationByEmailDomain;

  if (!domain) {
    return true;
  }

  let emailIsGood = false;

  if (user.emails && user.emails.length > 0) {
    emailIsGood = user.emails.reduce((prev, email) => prev || this._testEmailDomain(email.address), false);
  } else if (user.services && Object.values(user.services).length > 0) {
    // Find any email of any service and check it
    emailIsGood = Object.values(user.services).reduce((prev, service) => service.email && this._testEmailDomain(service.email), false);
  }

  if (emailIsGood) {
    return true;
  }

  if (typeof domain === 'string') {
    throw new Meteor.Error(403, "@".concat(domain, " email required"));
  } else {
    throw new Meteor.Error(403, "Email doesn't match the criteria.");
  }
}

const setupUsersCollection = users => {
  ///
  /// RESTRICTING WRITES TO USER OBJECTS
  ///
  users.allow({
    // clients can modify the profile field of their own document, and
    // nothing else.
    update: (userId, user, fields, modifier) => {
      // make sure it is our record
      if (user._id !== userId) {
        return false;
      } // user can only modify the 'profile' field. sets to multiple
      // sub-keys (eg profile.foo and profile.bar) are merged into entry
      // in the fields list.


      if (fields.length !== 1 || fields[0] !== 'profile') {
        return false;
      }

      return true;
    },
    fetch: ['_id'] // we only look at _id.

  }); /// DEFAULT INDEXES ON USERS

  users._ensureIndex('username', {
    unique: true,
    sparse: true
  });

  users._ensureIndex('emails.address', {
    unique: true,
    sparse: true
  });

  users._ensureIndex('services.resume.loginTokens.hashedToken', {
    unique: true,
    sparse: true
  });

  users._ensureIndex('services.resume.loginTokens.token', {
    unique: true,
    sparse: true
  }); // For taking care of logoutOtherClients calls that crashed before the
  // tokens were deleted.


  users._ensureIndex('services.resume.haveLoginTokensToDelete', {
    sparse: true
  }); // For expiring login tokens


  users._ensureIndex("services.resume.loginTokens.when", {
    sparse: true
  }); // For expiring password tokens


  users._ensureIndex('services.password.reset.when', {
    sparse: true
  });

  users._ensureIndex('services.password.enroll.when', {
    sparse: true
  });
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/accounts-base/server_main.js");

/* Exports */
Package._define("accounts-base", exports, {
  Accounts: Accounts
});

})();

//# sourceURL=meteor://💻app/packages/accounts-base.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvYWNjb3VudHMtYmFzZS9zZXJ2ZXJfbWFpbi5qcyIsIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvYWNjb3VudHMtYmFzZS9hY2NvdW50c19jb21tb24uanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL2FjY291bnRzLWJhc2UvYWNjb3VudHNfc2VydmVyLmpzIl0sIm5hbWVzIjpbIm1vZHVsZTEiLCJleHBvcnQiLCJBY2NvdW50c1NlcnZlciIsImxpbmsiLCJ2IiwiQWNjb3VudHMiLCJNZXRlb3IiLCJzZXJ2ZXIiLCJ1c2VycyIsIl9vYmplY3RTcHJlYWQiLCJtb2R1bGUiLCJkZWZhdWx0IiwiQWNjb3VudHNDb21tb24iLCJFWFBJUkVfVE9LRU5TX0lOVEVSVkFMX01TIiwiQ09OTkVDVElPTl9DTE9TRV9ERUxBWV9NUyIsImNvbnN0cnVjdG9yIiwib3B0aW9ucyIsIl9vcHRpb25zIiwiY29ubmVjdGlvbiIsInVuZGVmaW5lZCIsIl9pbml0Q29ubmVjdGlvbiIsIk1vbmdvIiwiQ29sbGVjdGlvbiIsIl9wcmV2ZW50QXV0b3B1Ymxpc2giLCJfb25Mb2dpbkhvb2siLCJIb29rIiwiYmluZEVudmlyb25tZW50IiwiZGVidWdQcmludEV4Y2VwdGlvbnMiLCJfb25Mb2dpbkZhaWx1cmVIb29rIiwiX29uTG9nb3V0SG9vayIsIkRFRkFVTFRfTE9HSU5fRVhQSVJBVElPTl9EQVlTIiwiTE9HSU5fVU5FWFBJUklOR19UT0tFTl9EQVlTIiwibGNlTmFtZSIsIkxvZ2luQ2FuY2VsbGVkRXJyb3IiLCJtYWtlRXJyb3JUeXBlIiwiZGVzY3JpcHRpb24iLCJtZXNzYWdlIiwicHJvdG90eXBlIiwibmFtZSIsIm51bWVyaWNFcnJvciIsInN0YXJ0dXAiLCJTZXJ2aWNlQ29uZmlndXJhdGlvbiIsIlBhY2thZ2UiLCJsb2dpblNlcnZpY2VDb25maWd1cmF0aW9uIiwiY29uZmlndXJhdGlvbnMiLCJDb25maWdFcnJvciIsInVzZXJJZCIsIkVycm9yIiwiX2FkZERlZmF1bHRGaWVsZFNlbGVjdG9yIiwiZGVmYXVsdEZpZWxkU2VsZWN0b3IiLCJmaWVsZHMiLCJrZXlzIiwiT2JqZWN0IiwibGVuZ3RoIiwia2V5czIiLCJ1c2VyIiwiZmluZE9uZSIsImNvbmZpZyIsImlzU2VydmVyIiwiX19tZXRlb3JfcnVudGltZV9jb25maWdfXyIsImFjY291bnRzQ29uZmlnQ2FsbGVkIiwiX2RlYnVnIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiaXNDbGllbnQiLCJPQXV0aEVuY3J5cHRpb24iLCJsb2FkS2V5Iiwib2F1dGhTZWNyZXRLZXkiLCJWQUxJRF9LRVlTIiwiZm9yRWFjaCIsImtleSIsImluY2x1ZGVzIiwib25Mb2dpbiIsImZ1bmMiLCJyZXQiLCJyZWdpc3RlciIsIl9zdGFydHVwQ2FsbGJhY2siLCJjYWxsYmFjayIsIm9uTG9naW5GYWlsdXJlIiwib25Mb2dvdXQiLCJkZHBVcmwiLCJERFAiLCJjb25uZWN0IiwiQUNDT1VOVFNfQ09OTkVDVElPTl9VUkwiLCJfZ2V0VG9rZW5MaWZldGltZU1zIiwibG9naW5FeHBpcmF0aW9uSW5EYXlzIiwibG9naW5FeHBpcmF0aW9uIiwiX2dldFBhc3N3b3JkUmVzZXRUb2tlbkxpZmV0aW1lTXMiLCJwYXNzd29yZFJlc2V0VG9rZW5FeHBpcmF0aW9uIiwicGFzc3dvcmRSZXNldFRva2VuRXhwaXJhdGlvbkluRGF5cyIsIkRFRkFVTFRfUEFTU1dPUkRfUkVTRVRfVE9LRU5fRVhQSVJBVElPTl9EQVlTIiwiX2dldFBhc3N3b3JkRW5yb2xsVG9rZW5MaWZldGltZU1zIiwicGFzc3dvcmRFbnJvbGxUb2tlbkV4cGlyYXRpb24iLCJwYXNzd29yZEVucm9sbFRva2VuRXhwaXJhdGlvbkluRGF5cyIsIkRFRkFVTFRfUEFTU1dPUkRfRU5ST0xMX1RPS0VOX0VYUElSQVRJT05fREFZUyIsIl90b2tlbkV4cGlyYXRpb24iLCJ3aGVuIiwiRGF0ZSIsImdldFRpbWUiLCJfdG9rZW5FeHBpcmVzU29vbiIsIm1pbkxpZmV0aW1lTXMiLCJtaW5MaWZldGltZUNhcE1zIiwiTUlOX1RPS0VOX0xJRkVUSU1FX0NBUF9TRUNTIiwiX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzIiwiY3J5cHRvIiwiVVJMIiwiaGFzT3duIiwiX3NlcnZlciIsIl9pbml0U2VydmVyTWV0aG9kcyIsIl9pbml0QWNjb3VudERhdGFIb29rcyIsIl9hdXRvcHVibGlzaEZpZWxkcyIsImxvZ2dlZEluVXNlciIsIm90aGVyVXNlcnMiLCJfZGVmYXVsdFB1Ymxpc2hGaWVsZHMiLCJwcm9qZWN0aW9uIiwicHJvZmlsZSIsInVzZXJuYW1lIiwiZW1haWxzIiwiX2luaXRTZXJ2ZXJQdWJsaWNhdGlvbnMiLCJfYWNjb3VudERhdGEiLCJfdXNlck9ic2VydmVzRm9yQ29ubmVjdGlvbnMiLCJfbmV4dFVzZXJPYnNlcnZlTnVtYmVyIiwiX2xvZ2luSGFuZGxlcnMiLCJzZXR1cFVzZXJzQ29sbGVjdGlvbiIsInNldHVwRGVmYXVsdExvZ2luSGFuZGxlcnMiLCJzZXRFeHBpcmVUb2tlbnNJbnRlcnZhbCIsIl92YWxpZGF0ZUxvZ2luSG9vayIsIl92YWxpZGF0ZU5ld1VzZXJIb29rcyIsImRlZmF1bHRWYWxpZGF0ZU5ld1VzZXJIb29rIiwiYmluZCIsIl9kZWxldGVTYXZlZFRva2Vuc0ZvckFsbFVzZXJzT25TdGFydHVwIiwiX3NraXBDYXNlSW5zZW5zaXRpdmVDaGVja3NGb3JUZXN0IiwidXJscyIsInJlc2V0UGFzc3dvcmQiLCJ0b2tlbiIsImV4dHJhUGFyYW1zIiwiYnVpbGRFbWFpbFVybCIsInZlcmlmeUVtYWlsIiwiZW5yb2xsQWNjb3VudCIsImFkZERlZmF1bHRSYXRlTGltaXQiLCJwYXRoIiwidXJsIiwiYWJzb2x1dGVVcmwiLCJwYXJhbXMiLCJlbnRyaWVzIiwidmFsdWUiLCJzZWFyY2hQYXJhbXMiLCJhcHBlbmQiLCJ0b1N0cmluZyIsImN1cnJlbnRJbnZvY2F0aW9uIiwiX0N1cnJlbnRNZXRob2RJbnZvY2F0aW9uIiwiZ2V0IiwiX0N1cnJlbnRQdWJsaWNhdGlvbkludm9jYXRpb24iLCJ2YWxpZGF0ZUxvZ2luQXR0ZW1wdCIsInZhbGlkYXRlTmV3VXNlciIsInB1c2giLCJiZWZvcmVFeHRlcm5hbExvZ2luIiwiX2JlZm9yZUV4dGVybmFsTG9naW5Ib29rIiwib25DcmVhdGVVc2VyIiwiX29uQ3JlYXRlVXNlckhvb2siLCJvbkV4dGVybmFsTG9naW4iLCJfb25FeHRlcm5hbExvZ2luSG9vayIsInNldEFkZGl0aW9uYWxGaW5kVXNlck9uRXh0ZXJuYWxMb2dpbiIsIl9hZGRpdGlvbmFsRmluZFVzZXJPbkV4dGVybmFsTG9naW4iLCJfdmFsaWRhdGVMb2dpbiIsImF0dGVtcHQiLCJlYWNoIiwiY2xvbmVBdHRlbXB0V2l0aENvbm5lY3Rpb24iLCJlIiwiYWxsb3dlZCIsImVycm9yIiwiX3N1Y2Nlc3NmdWxMb2dpbiIsIl9mYWlsZWRMb2dpbiIsIl9zdWNjZXNzZnVsTG9nb3V0IiwiX2xvZ2luVXNlciIsIm1ldGhvZEludm9jYXRpb24iLCJzdGFtcGVkTG9naW5Ub2tlbiIsIl9nZW5lcmF0ZVN0YW1wZWRMb2dpblRva2VuIiwiX2luc2VydExvZ2luVG9rZW4iLCJfbm9ZaWVsZHNBbGxvd2VkIiwiX3NldExvZ2luVG9rZW4iLCJfaGFzaExvZ2luVG9rZW4iLCJzZXRVc2VySWQiLCJpZCIsInRva2VuRXhwaXJlcyIsIl9hdHRlbXB0TG9naW4iLCJtZXRob2ROYW1lIiwibWV0aG9kQXJncyIsInJlc3VsdCIsInR5cGUiLCJtZXRob2RBcmd1bWVudHMiLCJBcnJheSIsImZyb20iLCJfbG9naW5NZXRob2QiLCJmbiIsInRyeUxvZ2luTWV0aG9kIiwiX3JlcG9ydExvZ2luRmFpbHVyZSIsInJlZ2lzdGVyTG9naW5IYW5kbGVyIiwiaGFuZGxlciIsIl9ydW5Mb2dpbkhhbmRsZXJzIiwiZGVzdHJveVRva2VuIiwibG9naW5Ub2tlbiIsInVwZGF0ZSIsIiRwdWxsIiwiJG9yIiwiaGFzaGVkVG9rZW4iLCJhY2NvdW50cyIsIm1ldGhvZHMiLCJsb2dpbiIsImNoZWNrIiwiYXJndW1lbnRzIiwibG9nb3V0IiwiX2dldExvZ2luVG9rZW4iLCJnZXROZXdUb2tlbiIsImN1cnJlbnRIYXNoZWRUb2tlbiIsImN1cnJlbnRTdGFtcGVkVG9rZW4iLCJzZXJ2aWNlcyIsInJlc3VtZSIsImxvZ2luVG9rZW5zIiwiZmluZCIsInN0YW1wZWRUb2tlbiIsIm5ld1N0YW1wZWRUb2tlbiIsInJlbW92ZU90aGVyVG9rZW5zIiwiY3VycmVudFRva2VuIiwiJG5lIiwiY29uZmlndXJlTG9naW5TZXJ2aWNlIiwiTWF0Y2giLCJPYmplY3RJbmNsdWRpbmciLCJzZXJ2aWNlIiwiU3RyaW5nIiwib2F1dGgiLCJzZXJ2aWNlTmFtZXMiLCJ1c2luZ09BdXRoRW5jcnlwdGlvbiIsInNlY3JldCIsInNlYWwiLCJpbnNlcnQiLCJvbkNvbm5lY3Rpb24iLCJvbkNsb3NlIiwiX3JlbW92ZVRva2VuRnJvbUNvbm5lY3Rpb24iLCJwdWJsaXNoIiwiaXNfYXV0byIsIl9pZCIsImF1dG9wdWJsaXNoIiwidG9GaWVsZFNlbGVjdG9yIiwicmVkdWNlIiwicHJldiIsImZpZWxkIiwic2VsZWN0b3IiLCJhZGRBdXRvcHVibGlzaEZpZWxkcyIsIm9wdHMiLCJhcHBseSIsImZvckxvZ2dlZEluVXNlciIsImZvck90aGVyVXNlcnMiLCJzZXREZWZhdWx0UHVibGlzaEZpZWxkcyIsIl9nZXRBY2NvdW50RGF0YSIsImNvbm5lY3Rpb25JZCIsImRhdGEiLCJfc2V0QWNjb3VudERhdGEiLCJoYXNoIiwiY3JlYXRlSGFzaCIsImRpZ2VzdCIsIl9oYXNoU3RhbXBlZFRva2VuIiwiaGFzaGVkU3RhbXBlZFRva2VuIiwiX2luc2VydEhhc2hlZExvZ2luVG9rZW4iLCJxdWVyeSIsIiRhZGRUb1NldCIsIl9jbGVhckFsbExvZ2luVG9rZW5zIiwiJHNldCIsIl9nZXRVc2VyT2JzZXJ2ZSIsIm9ic2VydmUiLCJzdG9wIiwibmV3VG9rZW4iLCJteU9ic2VydmVOdW1iZXIiLCJkZWZlciIsImZvdW5kTWF0Y2hpbmdVc2VyIiwib2JzZXJ2ZUNoYW5nZXMiLCJhZGRlZCIsInJlbW92ZWQiLCJjbG9zZSIsIm5vbk11dGF0aW5nQ2FsbGJhY2tzIiwiUmFuZG9tIiwiX2V4cGlyZVBhc3N3b3JkUmVzZXRUb2tlbnMiLCJvbGRlc3RWYWxpZERhdGUiLCJ0b2tlbkxpZmV0aW1lTXMiLCJ0b2tlbkZpbHRlciIsIiRleGlzdHMiLCJleHBpcmVQYXNzd29yZFRva2VuIiwiX2V4cGlyZVBhc3N3b3JkRW5yb2xsVG9rZW5zIiwiX2V4cGlyZVRva2VucyIsInVzZXJGaWx0ZXIiLCIkbHQiLCJtdWx0aSIsInN1cGVyUmVzdWx0IiwiZXhwaXJlVG9rZW5JbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJpbnNlcnRVc2VyRG9jIiwiY3JlYXRlZEF0IiwicGluRW5jcnlwdGVkRmllbGRzVG9Vc2VyIiwiZnVsbFVzZXIiLCJkZWZhdWx0Q3JlYXRlVXNlckhvb2siLCJob29rIiwiZXJybXNnIiwiX3Rlc3RFbWFpbERvbWFpbiIsImVtYWlsIiwiZG9tYWluIiwicmVzdHJpY3RDcmVhdGlvbkJ5RW1haWxEb21haW4iLCJSZWdFeHAiLCJfZXNjYXBlUmVnRXhwIiwidGVzdCIsIl9kZWxldGVTYXZlZFRva2Vuc0ZvclVzZXIiLCJ0b2tlbnNUb0RlbGV0ZSIsIiR1bnNldCIsIiRwdWxsQWxsIiwibG9naW5Ub2tlbnNUb0RlbGV0ZSIsInVwZGF0ZU9yQ3JlYXRlVXNlckZyb21FeHRlcm5hbFNlcnZpY2UiLCJzZXJ2aWNlTmFtZSIsInNlcnZpY2VEYXRhIiwic2VydmljZUlkS2V5IiwiaXNOYU4iLCJwYXJzZUludCIsInNldEF0dHJzIiwicmVtb3ZlRGVmYXVsdFJhdGVMaW1pdCIsInJlc3AiLCJERFBSYXRlTGltaXRlciIsInJlbW92ZVJ1bGUiLCJkZWZhdWx0UmF0ZUxpbWl0ZXJSdWxlSWQiLCJhZGRSdWxlIiwiY2xpZW50QWRkcmVzcyIsImNsb25lZEF0dGVtcHQiLCJFSlNPTiIsImNsb25lIiwiZGVmYXVsdFJlc3VtZUxvZ2luSGFuZGxlciIsIm9sZFVuaGFzaGVkU3R5bGVUb2tlbiIsImlzRW5yb2xsIiwicmVzZXRSYW5nZU9yIiwiZXhwaXJlRmlsdGVyIiwiJGFuZCIsInNldEludGVydmFsIiwia2V5SXNMb2FkZWQiLCJpc1NlYWxlZCIsIm9wZW4iLCJlbWFpbElzR29vZCIsImFkZHJlc3MiLCJ2YWx1ZXMiLCJhbGxvdyIsIm1vZGlmaWVyIiwiZmV0Y2giLCJfZW5zdXJlSW5kZXgiLCJ1bmlxdWUiLCJzcGFyc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsU0FBTyxDQUFDQyxNQUFSLENBQWU7QUFBQ0Msa0JBQWMsRUFBQyxNQUFJQTtBQUFwQixHQUFmO0FBQW9ELE1BQUlBLGNBQUo7QUFBbUJGLFNBQU8sQ0FBQ0csSUFBUixDQUFhLHNCQUFiLEVBQW9DO0FBQUNELGtCQUFjLENBQUNFLENBQUQsRUFBRztBQUFDRixvQkFBYyxHQUFDRSxDQUFmO0FBQWlCOztBQUFwQyxHQUFwQyxFQUEwRSxDQUExRTs7QUFFdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsVUFBUSxHQUFHLElBQUlILGNBQUosQ0FBbUJJLE1BQU0sQ0FBQ0MsTUFBMUIsQ0FBWCxDLENBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQUQsUUFBTSxDQUFDRSxLQUFQLEdBQWVILFFBQVEsQ0FBQ0csS0FBeEI7Ozs7Ozs7Ozs7OztBQ2xCQSxJQUFJQyxhQUFKOztBQUFrQkMsTUFBTSxDQUFDUCxJQUFQLENBQVksc0NBQVosRUFBbUQ7QUFBQ1EsU0FBTyxDQUFDUCxDQUFELEVBQUc7QUFBQ0ssaUJBQWEsR0FBQ0wsQ0FBZDtBQUFnQjs7QUFBNUIsQ0FBbkQsRUFBaUYsQ0FBakY7QUFBbEJNLE1BQU0sQ0FBQ1QsTUFBUCxDQUFjO0FBQUNXLGdCQUFjLEVBQUMsTUFBSUEsY0FBcEI7QUFBbUNDLDJCQUF5QixFQUFDLE1BQUlBLHlCQUFqRTtBQUEyRkMsMkJBQXlCLEVBQUMsTUFBSUE7QUFBekgsQ0FBZDs7QUFTTyxNQUFNRixj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QixFQUNFO0FBQUVFLFVBQU0sRUFBRTtBQUFWLEdBREYsRUFsQ29DLENBb0NwQzs7O0FBQ0FyVixPQUFLLENBQUNtVixZQUFOLENBQW1CLGtDQUFuQixFQUF1RDtBQUFFRSxVQUFNLEVBQUU7QUFBVixHQUF2RCxFQXJDb0MsQ0FzQ3BDOzs7QUFDQXJWLE9BQUssQ0FBQ21WLFlBQU4sQ0FBbUIsOEJBQW5CLEVBQW1EO0FBQUVFLFVBQU0sRUFBRTtBQUFWLEdBQW5EOztBQUNBclYsT0FBSyxDQUFDbVYsWUFBTixDQUFtQiwrQkFBbkIsRUFBb0Q7QUFBRUUsVUFBTSxFQUFFO0FBQVYsR0FBcEQ7QUFDRCxDQXpDRCxDIiwiZmlsZSI6Ii9wYWNrYWdlcy9hY2NvdW50cy1iYXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWNjb3VudHNTZXJ2ZXIgfSBmcm9tIFwiLi9hY2NvdW50c19zZXJ2ZXIuanNcIjtcblxuLyoqXG4gKiBAbmFtZXNwYWNlIEFjY291bnRzXG4gKiBAc3VtbWFyeSBUaGUgbmFtZXNwYWNlIGZvciBhbGwgc2VydmVyLXNpZGUgYWNjb3VudHMtcmVsYXRlZCBtZXRob2RzLlxuICovXG5BY2NvdW50cyA9IG5ldyBBY2NvdW50c1NlcnZlcihNZXRlb3Iuc2VydmVyKTtcblxuLy8gVXNlcnMgdGFibGUuIERvbid0IHVzZSB0aGUgbm9ybWFsIGF1dG9wdWJsaXNoLCBzaW5jZSB3ZSB3YW50IHRvIGhpZGVcbi8vIHNvbWUgZmllbGRzLiBDb2RlIHRvIGF1dG9wdWJsaXNoIHRoaXMgaXMgaW4gYWNjb3VudHNfc2VydmVyLmpzLlxuLy8gWFhYIEFsbG93IHVzZXJzIHRvIGNvbmZpZ3VyZSB0aGlzIGNvbGxlY3Rpb24gbmFtZS5cblxuLyoqXG4gKiBAc3VtbWFyeSBBIFtNb25nby5Db2xsZWN0aW9uXSgjY29sbGVjdGlvbnMpIGNvbnRhaW5pbmcgdXNlciBkb2N1bWVudHMuXG4gKiBAbG9jdXMgQW55d2hlcmVcbiAqIEB0eXBlIHtNb25nby5Db2xsZWN0aW9ufVxuICogQGltcG9ydEZyb21QYWNrYWdlIG1ldGVvclxuKi9cbk1ldGVvci51c2VycyA9IEFjY291bnRzLnVzZXJzO1xuXG5leHBvcnQge1xuICAvLyBTaW5jZSB0aGlzIGZpbGUgaXMgdGhlIG1haW4gbW9kdWxlIGZvciB0aGUgc2VydmVyIHZlcnNpb24gb2YgdGhlXG4gIC8vIGFjY291bnRzLWJhc2UgcGFja2FnZSwgcHJvcGVydGllcyBvZiBub24tZW50cnktcG9pbnQgbW9kdWxlcyBuZWVkIHRvXG4gIC8vIGJlIHJlLWV4cG9ydGVkIGluIG9yZGVyIHRvIGJlIGFjY2Vzc2libGUgdG8gbW9kdWxlcyB0aGF0IGltcG9ydCB0aGVcbiAgLy8gYWNjb3VudHMtYmFzZSBwYWNrYWdlLlxuICBBY2NvdW50c1NlcnZlclxufTtcbiIsIi8qKlxuICogQHN1bW1hcnkgU3VwZXItY29uc3RydWN0b3IgZm9yIEFjY291bnRzQ2xpZW50IGFuZCBBY2NvdW50c1NlcnZlci5cbiAqIEBsb2N1cyBBbnl3aGVyZVxuICogQGNsYXNzIEFjY291bnRzQ29tbW9uXG4gKiBAaW5zdGFuY2VuYW1lIGFjY291bnRzQ2xpZW50T3JTZXJ2ZXJcbiAqIEBwYXJhbSBvcHRpb25zIHtPYmplY3R9IGFuIG9iamVjdCB3aXRoIGZpZWxkczpcbiAqIC0gY29ubmVjdGlvbiB7T2JqZWN0fSBPcHRpb25hbCBERFAgY29ubmVjdGlvbiB0byByZXVzZS5cbiAqIC0gZGRwVXJsIHtTdHJpbmd9IE9wdGlvbmFsIFVSTCBmb3IgY3JlYXRpbmcgYSBuZXcgRERQIGNvbm5lY3Rpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBBY2NvdW50c0NvbW1vbiB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAvLyBDdXJyZW50bHkgdGhpcyBpcyByZWFkIGRpcmVjdGx5IGJ5IHBhY2thZ2VzIGxpa2UgYWNjb3VudHMtcGFzc3dvcmRcbiAgICAvLyBhbmQgYWNjb3VudHMtdWktdW5zdHlsZWQuXG4gICAgdGhpcy5fb3B0aW9ucyA9IHt9O1xuXG4gICAgLy8gTm90ZSB0aGF0IHNldHRpbmcgdGhpcy5jb25uZWN0aW9uID0gbnVsbCBjYXVzZXMgdGhpcy51c2VycyB0byBiZSBhXG4gICAgLy8gTG9jYWxDb2xsZWN0aW9uLCB3aGljaCBpcyBub3Qgd2hhdCB3ZSB3YW50LlxuICAgIHRoaXMuY29ubmVjdGlvbiA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9pbml0Q29ubmVjdGlvbihvcHRpb25zIHx8IHt9KTtcblxuICAgIC8vIFRoZXJlIGlzIGFuIGFsbG93IGNhbGwgaW4gYWNjb3VudHNfc2VydmVyLmpzIHRoYXQgcmVzdHJpY3RzIHdyaXRlcyB0b1xuICAgIC8vIHRoaXMgY29sbGVjdGlvbi5cbiAgICB0aGlzLnVzZXJzID0gbmV3IE1vbmdvLkNvbGxlY3Rpb24oXCJ1c2Vyc1wiLCB7XG4gICAgICBfcHJldmVudEF1dG9wdWJsaXNoOiB0cnVlLFxuICAgICAgY29ubmVjdGlvbjogdGhpcy5jb25uZWN0aW9uXG4gICAgfSk7XG5cbiAgICAvLyBDYWxsYmFjayBleGNlcHRpb25zIGFyZSBwcmludGVkIHdpdGggTWV0ZW9yLl9kZWJ1ZyBhbmQgaWdub3JlZC5cbiAgICB0aGlzLl9vbkxvZ2luSG9vayA9IG5ldyBIb29rKHtcbiAgICAgIGJpbmRFbnZpcm9ubWVudDogZmFsc2UsXG4gICAgICBkZWJ1Z1ByaW50RXhjZXB0aW9uczogXCJvbkxvZ2luIGNhbGxiYWNrXCJcbiAgICB9KTtcblxuICAgIHRoaXMuX29uTG9naW5GYWlsdXJlSG9vayA9IG5ldyBIb29rKHtcbiAgICAgIGJpbmRFbnZpcm9ubWVudDogZmFsc2UsXG4gICAgICBkZWJ1Z1ByaW50RXhjZXB0aW9uczogXCJvbkxvZ2luRmFpbHVyZSBjYWxsYmFja1wiXG4gICAgfSk7XG5cbiAgICB0aGlzLl9vbkxvZ291dEhvb2sgPSBuZXcgSG9vayh7XG4gICAgICBiaW5kRW52aXJvbm1lbnQ6IGZhbHNlLFxuICAgICAgZGVidWdQcmludEV4Y2VwdGlvbnM6IFwib25Mb2dvdXQgY2FsbGJhY2tcIlxuICAgIH0pO1xuXG4gICAgLy8gRXhwb3NlIGZvciB0ZXN0aW5nLlxuICAgIHRoaXMuREVGQVVMVF9MT0dJTl9FWFBJUkFUSU9OX0RBWVMgPSBERUZBVUxUX0xPR0lOX0VYUElSQVRJT05fREFZUztcbiAgICB0aGlzLkxPR0lOX1VORVhQSVJJTkdfVE9LRU5fREFZUyA9IExPR0lOX1VORVhQSVJJTkdfVE9LRU5fREFZUztcblxuICAgIC8vIFRocm93biB3aGVuIHRoZSB1c2VyIGNhbmNlbHMgdGhlIGxvZ2luIHByb2Nlc3MgKGVnLCBjbG9zZXMgYW4gb2F1dGhcbiAgICAvLyBwb3B1cCwgZGVjbGluZXMgcmV0aW5hIHNjYW4sIGV0YylcbiAgICBjb25zdCBsY2VOYW1lID0gJ0FjY291bnRzLkxvZ2luQ2FuY2VsbGVkRXJyb3InO1xuICAgIHRoaXMuTG9naW5DYW5jZWxsZWRFcnJvciA9IE1ldGVvci5tYWtlRXJyb3JUeXBlKFxuICAgICAgbGNlTmFtZSxcbiAgICAgIGZ1bmN0aW9uIChkZXNjcmlwdGlvbikge1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBkZXNjcmlwdGlvbjtcbiAgICAgIH1cbiAgICApO1xuICAgIHRoaXMuTG9naW5DYW5jZWxsZWRFcnJvci5wcm90b3R5cGUubmFtZSA9IGxjZU5hbWU7XG5cbiAgICAvLyBUaGlzIGlzIHVzZWQgdG8gdHJhbnNtaXQgc3BlY2lmaWMgc3ViY2xhc3MgZXJyb3JzIG92ZXIgdGhlIHdpcmUuIFdlXG4gICAgLy8gc2hvdWxkIGNvbWUgdXAgd2l0aCBhIG1vcmUgZ2VuZXJpYyB3YXkgdG8gZG8gdGhpcyAoZWcsIHdpdGggc29tZSBzb3J0IG9mXG4gICAgLy8gc3ltYm9saWMgZXJyb3IgY29kZSByYXRoZXIgdGhhbiBhIG51bWJlcikuXG4gICAgdGhpcy5Mb2dpbkNhbmNlbGxlZEVycm9yLm51bWVyaWNFcnJvciA9IDB4OGFjZGMyZjtcblxuICAgIC8vIGxvZ2luU2VydmljZUNvbmZpZ3VyYXRpb24gYW5kIENvbmZpZ0Vycm9yIGFyZSBtYWludGFpbmVkIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuICAgIE1ldGVvci5zdGFydHVwKCgpID0+IHtcbiAgICAgIGNvbnN0IHsgU2VydmljZUNvbmZpZ3VyYXRpb24gfSA9IFBhY2thZ2VbJ3NlcnZpY2UtY29uZmlndXJhdGlvbiddO1xuICAgICAgdGhpcy5sb2dpblNlcnZpY2VDb25maWd1cmF0aW9uID0gU2VydmljZUNvbmZpZ3VyYXRpb24uY29uZmlndXJhdGlvbnM7XG4gICAgICB0aGlzLkNvbmZpZ0Vycm9yID0gU2VydmljZUNvbmZpZ3VyYXRpb24uQ29uZmlnRXJyb3I7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHN1bW1hcnkgR2V0IHRoZSBjdXJyZW50IHVzZXIgaWQsIG9yIGBudWxsYCBpZiBubyB1c2VyIGlzIGxvZ2dlZCBpbi4gQSByZWFjdGl2ZSBkYXRhIHNvdXJjZS5cbiAgICogQGxvY3VzIEFueXdoZXJlXG4gICAqL1xuICB1c2VySWQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwidXNlcklkIG1ldGhvZCBub3QgaW1wbGVtZW50ZWRcIik7XG4gIH1cblxuICAvLyBtZXJnZSB0aGUgZGVmYXVsdEZpZWxkU2VsZWN0b3Igd2l0aCBhbiBleGlzdGluZyBvcHRpb25zIG9iamVjdFxuICBfYWRkRGVmYXVsdEZpZWxkU2VsZWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgLy8gdGhpcyB3aWxsIGJlIHRoZSBtb3N0IGNvbW1vbiBjYXNlIGZvciBtb3N0IHBlb3BsZSwgc28gbWFrZSBpdCBxdWlja1xuICAgIGlmICghdGhpcy5fb3B0aW9ucy5kZWZhdWx0RmllbGRTZWxlY3RvcikgcmV0dXJuIG9wdGlvbnM7XG5cbiAgICAvLyBpZiBubyBmaWVsZCBzZWxlY3RvciB0aGVuIGp1c3QgdXNlIGRlZmF1bHRGaWVsZFNlbGVjdG9yXG4gICAgaWYgKCFvcHRpb25zLmZpZWxkcykgcmV0dXJuIHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBmaWVsZHM6IHRoaXMuX29wdGlvbnMuZGVmYXVsdEZpZWxkU2VsZWN0b3IsXG4gICAgfTtcblxuICAgIC8vIGlmIGVtcHR5IGZpZWxkIHNlbGVjdG9yIHRoZW4gdGhlIGZ1bGwgdXNlciBvYmplY3QgaXMgZXhwbGljaXRseSByZXF1ZXN0ZWQsIHNvIG9iZXlcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob3B0aW9ucy5maWVsZHMpO1xuICAgIGlmICgha2V5cy5sZW5ndGgpIHJldHVybiBvcHRpb25zO1xuXG4gICAgLy8gaWYgdGhlIHJlcXVlc3RlZCBmaWVsZHMgYXJlICt2ZSB0aGVuIGlnbm9yZSBkZWZhdWx0RmllbGRTZWxlY3RvclxuICAgIC8vIGFzc3VtZSB0aGV5IGFyZSBhbGwgZWl0aGVyICt2ZSBvciAtdmUgYmVjYXVzZSBNb25nbyBkb2Vzbid0IGxpa2UgbWl4ZWRcbiAgICBpZiAoISFvcHRpb25zLmZpZWxkc1trZXlzWzBdXSkgcmV0dXJuIG9wdGlvbnM7XG5cbiAgICAvLyBUaGUgcmVxdWVzdGVkIGZpZWxkcyBhcmUgLXZlLlxuICAgIC8vIElmIHRoZSBkZWZhdWx0RmllbGRTZWxlY3RvciBpcyArdmUgdGhlbiB1c2UgcmVxdWVzdGVkIGZpZWxkcywgb3RoZXJ3aXNlIG1lcmdlIHRoZW1cbiAgICBjb25zdCBrZXlzMiA9IE9iamVjdC5rZXlzKHRoaXMuX29wdGlvbnMuZGVmYXVsdEZpZWxkU2VsZWN0b3IpO1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zLmRlZmF1bHRGaWVsZFNlbGVjdG9yW2tleXMyWzBdXSA/IG9wdGlvbnMgOiB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgZmllbGRzOiB7XG4gICAgICAgIC4uLm9wdGlvbnMuZmllbGRzLFxuICAgICAgICAuLi50aGlzLl9vcHRpb25zLmRlZmF1bHRGaWVsZFNlbGVjdG9yLFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAc3VtbWFyeSBHZXQgdGhlIGN1cnJlbnQgdXNlciByZWNvcmQsIG9yIGBudWxsYCBpZiBubyB1c2VyIGlzIGxvZ2dlZCBpbi4gQSByZWFjdGl2ZSBkYXRhIHNvdXJjZS5cbiAgICogQGxvY3VzIEFueXdoZXJlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAgICogQHBhcmFtIHtNb25nb0ZpZWxkU3BlY2lmaWVyfSBvcHRpb25zLmZpZWxkcyBEaWN0aW9uYXJ5IG9mIGZpZWxkcyB0byByZXR1cm4gb3IgZXhjbHVkZS5cbiAgICovXG4gIHVzZXIob3B0aW9ucykge1xuICAgIGNvbnN0IHVzZXJJZCA9IHRoaXMudXNlcklkKCk7XG4gICAgcmV0dXJuIHVzZXJJZCA/IHRoaXMudXNlcnMuZmluZE9uZSh1c2VySWQsIHRoaXMuX2FkZERlZmF1bHRGaWVsZFNlbGVjdG9yKG9wdGlvbnMpKSA6IG51bGw7XG4gIH1cblxuICAvLyBTZXQgdXAgY29uZmlnIGZvciB0aGUgYWNjb3VudHMgc3lzdGVtLiBDYWxsIHRoaXMgb24gYm90aCB0aGUgY2xpZW50XG4gIC8vIGFuZCB0aGUgc2VydmVyLlxuICAvL1xuICAvLyBOb3RlIHRoYXQgdGhpcyBtZXRob2QgZ2V0cyBvdmVycmlkZGVuIG9uIEFjY291bnRzU2VydmVyLnByb3RvdHlwZSwgYnV0XG4gIC8vIHRoZSBvdmVycmlkaW5nIG1ldGhvZCBjYWxscyB0aGUgb3ZlcnJpZGRlbiBtZXRob2QuXG4gIC8vXG4gIC8vIFhYWCB3ZSBzaG91bGQgYWRkIHNvbWUgZW5mb3JjZW1lbnQgdGhhdCB0aGlzIGlzIGNhbGxlZCBvbiBib3RoIHRoZVxuICAvLyBjbGllbnQgYW5kIHRoZSBzZXJ2ZXIuIE90aGVyd2lzZSwgYSB1c2VyIGNhblxuICAvLyAnZm9yYmlkQ2xpZW50QWNjb3VudENyZWF0aW9uJyBvbmx5IG9uIHRoZSBjbGllbnQgYW5kIHdoaWxlIGl0IGxvb2tzXG4gIC8vIGxpa2UgdGhlaXIgYXBwIGlzIHNlY3VyZSwgdGhlIHNlcnZlciB3aWxsIHN0aWxsIGFjY2VwdCBjcmVhdGVVc2VyXG4gIC8vIGNhbGxzLiBodHRwczovL2dpdGh1Yi5jb20vbWV0ZW9yL21ldGVvci9pc3N1ZXMvODI4XG4gIC8vXG4gIC8vIEBwYXJhbSBvcHRpb25zIHtPYmplY3R9IGFuIG9iamVjdCB3aXRoIGZpZWxkczpcbiAgLy8gLSBzZW5kVmVyaWZpY2F0aW9uRW1haWwge0Jvb2xlYW59XG4gIC8vICAgICBTZW5kIGVtYWlsIGFkZHJlc3MgdmVyaWZpY2F0aW9uIGVtYWlscyB0byBuZXcgdXNlcnMgY3JlYXRlZCBmcm9tXG4gIC8vICAgICBjbGllbnQgc2lnbnVwcy5cbiAgLy8gLSBmb3JiaWRDbGllbnRBY2NvdW50Q3JlYXRpb24ge0Jvb2xlYW59XG4gIC8vICAgICBEbyBub3QgYWxsb3cgY2xpZW50cyB0byBjcmVhdGUgYWNjb3VudHMgZGlyZWN0bHkuXG4gIC8vIC0gcmVzdHJpY3RDcmVhdGlvbkJ5RW1haWxEb21haW4ge0Z1bmN0aW9uIG9yIFN0cmluZ31cbiAgLy8gICAgIFJlcXVpcmUgY3JlYXRlZCB1c2VycyB0byBoYXZlIGFuIGVtYWlsIG1hdGNoaW5nIHRoZSBmdW5jdGlvbiBvclxuICAvLyAgICAgaGF2aW5nIHRoZSBzdHJpbmcgYXMgZG9tYWluLlxuICAvLyAtIGxvZ2luRXhwaXJhdGlvbkluRGF5cyB7TnVtYmVyfVxuICAvLyAgICAgTnVtYmVyIG9mIGRheXMgc2luY2UgbG9naW4gdW50aWwgYSB1c2VyIGlzIGxvZ2dlZCBvdXQgKGxvZ2luIHRva2VuXG4gIC8vICAgICBleHBpcmVzKS5cbiAgLy8gLSBwYXNzd29yZFJlc2V0VG9rZW5FeHBpcmF0aW9uSW5EYXlzIHtOdW1iZXJ9XG4gIC8vICAgICBOdW1iZXIgb2YgZGF5cyBzaW5jZSBwYXNzd29yZCByZXNldCB0b2tlbiBjcmVhdGlvbiB1bnRpbCB0aGVcbiAgLy8gICAgIHRva2VuIGNhbm50IGJlIHVzZWQgYW55IGxvbmdlciAocGFzc3dvcmQgcmVzZXQgdG9rZW4gZXhwaXJlcykuXG4gIC8vIC0gYW1iaWd1b3VzRXJyb3JNZXNzYWdlcyB7Qm9vbGVhbn1cbiAgLy8gICAgIFJldHVybiBhbWJpZ3VvdXMgZXJyb3IgbWVzc2FnZXMgZnJvbSBsb2dpbiBmYWlsdXJlcyB0byBwcmV2ZW50XG4gIC8vICAgICB1c2VyIGVudW1lcmF0aW9uLlxuICAvLyAtIGJjcnlwdFJvdW5kcyB7TnVtYmVyfVxuICAvLyAgICAgQWxsb3dzIG92ZXJyaWRlIG9mIG51bWJlciBvZiBiY3J5cHQgcm91bmRzIChha2Egd29yayBmYWN0b3IpIHVzZWRcbiAgLy8gICAgIHRvIHN0b3JlIHBhc3N3b3Jkcy5cblxuICAvKipcbiAgICogQHN1bW1hcnkgU2V0IGdsb2JhbCBhY2NvdW50cyBvcHRpb25zLlxuICAgKiBAbG9jdXMgQW55d2hlcmVcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLnNlbmRWZXJpZmljYXRpb25FbWFpbCBOZXcgdXNlcnMgd2l0aCBhbiBlbWFpbCBhZGRyZXNzIHdpbGwgcmVjZWl2ZSBhbiBhZGRyZXNzIHZlcmlmaWNhdGlvbiBlbWFpbC5cbiAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmZvcmJpZENsaWVudEFjY291bnRDcmVhdGlvbiBDYWxscyB0byBbYGNyZWF0ZVVzZXJgXSgjYWNjb3VudHNfY3JlYXRldXNlcikgZnJvbSB0aGUgY2xpZW50IHdpbGwgYmUgcmVqZWN0ZWQuIEluIGFkZGl0aW9uLCBpZiB5b3UgYXJlIHVzaW5nIFthY2NvdW50cy11aV0oI2FjY291bnRzdWkpLCB0aGUgXCJDcmVhdGUgYWNjb3VudFwiIGxpbmsgd2lsbCBub3QgYmUgYXZhaWxhYmxlLlxuICAgKiBAcGFyYW0ge1N0cmluZyB8IEZ1bmN0aW9ufSBvcHRpb25zLnJlc3RyaWN0Q3JlYXRpb25CeUVtYWlsRG9tYWluIElmIHNldCB0byBhIHN0cmluZywgb25seSBhbGxvd3MgbmV3IHVzZXJzIGlmIHRoZSBkb21haW4gcGFydCBvZiB0aGVpciBlbWFpbCBhZGRyZXNzIG1hdGNoZXMgdGhlIHN0cmluZy4gSWYgc2V0IHRvIGEgZnVuY3Rpb24sIG9ubHkgYWxsb3dzIG5ldyB1c2VycyBpZiB0aGUgZnVuY3Rpb24gcmV0dXJucyB0cnVlLiAgVGhlIGZ1bmN0aW9uIGlzIHBhc3NlZCB0aGUgZnVsbCBlbWFpbCBhZGRyZXNzIG9mIHRoZSBwcm9wb3NlZCBuZXcgdXNlci4gIFdvcmtzIHdpdGggcGFzc3dvcmQtYmFzZWQgc2lnbi1pbiBhbmQgZXh0ZXJuYWwgc2VydmljZXMgdGhhdCBleHBvc2UgZW1haWwgYWRkcmVzc2VzIChHb29nbGUsIEZhY2Vib29rLCBHaXRIdWIpLiBBbGwgZXhpc3RpbmcgdXNlcnMgc3RpbGwgY2FuIGxvZyBpbiBhZnRlciBlbmFibGluZyB0aGlzIG9wdGlvbi4gRXhhbXBsZTogYEFjY291bnRzLmNvbmZpZyh7IHJlc3RyaWN0Q3JlYXRpb25CeUVtYWlsRG9tYWluOiAnc2Nob29sLmVkdScgfSlgLlxuICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5sb2dpbkV4cGlyYXRpb25JbkRheXMgVGhlIG51bWJlciBvZiBkYXlzIGZyb20gd2hlbiBhIHVzZXIgbG9ncyBpbiB1bnRpbCB0aGVpciB0b2tlbiBleHBpcmVzIGFuZCB0aGV5IGFyZSBsb2dnZWQgb3V0LiBEZWZhdWx0cyB0byA5MC4gU2V0IHRvIGBudWxsYCB0byBkaXNhYmxlIGxvZ2luIGV4cGlyYXRpb24uXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLmxvZ2luRXhwaXJhdGlvbiBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBmcm9tIHdoZW4gYSB1c2VyIGxvZ3MgaW4gdW50aWwgdGhlaXIgdG9rZW4gZXhwaXJlcyBhbmQgdGhleSBhcmUgbG9nZ2VkIG91dCwgZm9yIGEgbW9yZSBncmFudWxhciBjb250cm9sLiBJZiBgbG9naW5FeHBpcmF0aW9uSW5EYXlzYCBpcyBzZXQsIGl0IHRha2VzIHByZWNlZGVudC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMub2F1dGhTZWNyZXRLZXkgV2hlbiB1c2luZyB0aGUgYG9hdXRoLWVuY3J5cHRpb25gIHBhY2thZ2UsIHRoZSAxNiBieXRlIGtleSB1c2luZyB0byBlbmNyeXB0IHNlbnNpdGl2ZSBhY2NvdW50IGNyZWRlbnRpYWxzIGluIHRoZSBkYXRhYmFzZSwgZW5jb2RlZCBpbiBiYXNlNjQuICBUaGlzIG9wdGlvbiBtYXkgb25seSBiZSBzcGVjaWZpZWQgb24gdGhlIHNlcnZlci4gIFNlZSBwYWNrYWdlcy9vYXV0aC1lbmNyeXB0aW9uL1JFQURNRS5tZCBmb3IgZGV0YWlscy5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMucGFzc3dvcmRSZXNldFRva2VuRXhwaXJhdGlvbkluRGF5cyBUaGUgbnVtYmVyIG9mIGRheXMgZnJvbSB3aGVuIGEgbGluayB0byByZXNldCBwYXNzd29yZCBpcyBzZW50IHVudGlsIHRva2VuIGV4cGlyZXMgYW5kIHVzZXIgY2FuJ3QgcmVzZXQgcGFzc3dvcmQgd2l0aCB0aGUgbGluayBhbnltb3JlLiBEZWZhdWx0cyB0byAzLlxuICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5wYXNzd29yZFJlc2V0VG9rZW5FeHBpcmF0aW9uIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGZyb20gd2hlbiBhIGxpbmsgdG8gcmVzZXQgcGFzc3dvcmQgaXMgc2VudCB1bnRpbCB0b2tlbiBleHBpcmVzIGFuZCB1c2VyIGNhbid0IHJlc2V0IHBhc3N3b3JkIHdpdGggdGhlIGxpbmsgYW55bW9yZS4gSWYgYHBhc3N3b3JkUmVzZXRUb2tlbkV4cGlyYXRpb25JbkRheXNgIGlzIHNldCwgaXQgdGFrZXMgcHJlY2VkZW50LlxuICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5wYXNzd29yZEVucm9sbFRva2VuRXhwaXJhdGlvbkluRGF5cyBUaGUgbnVtYmVyIG9mIGRheXMgZnJvbSB3aGVuIGEgbGluayB0byBzZXQgaW5pdGlhbCBwYXNzd29yZCBpcyBzZW50IHVudGlsIHRva2VuIGV4cGlyZXMgYW5kIHVzZXIgY2FuJ3Qgc2V0IHBhc3N3b3JkIHdpdGggdGhlIGxpbmsgYW55bW9yZS4gRGVmYXVsdHMgdG8gMzAuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLnBhc3N3b3JkRW5yb2xsVG9rZW5FeHBpcmF0aW9uIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGZyb20gd2hlbiBhIGxpbmsgdG8gc2V0IGluaXRpYWwgcGFzc3dvcmQgaXMgc2VudCB1bnRpbCB0b2tlbiBleHBpcmVzIGFuZCB1c2VyIGNhbid0IHNldCBwYXNzd29yZCB3aXRoIHRoZSBsaW5rIGFueW1vcmUuIElmIGBwYXNzd29yZEVucm9sbFRva2VuRXhwaXJhdGlvbkluRGF5c2AgaXMgc2V0LCBpdCB0YWtlcyBwcmVjZWRlbnQuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5hbWJpZ3VvdXNFcnJvck1lc3NhZ2VzIFJldHVybiBhbWJpZ3VvdXMgZXJyb3IgbWVzc2FnZXMgZnJvbSBsb2dpbiBmYWlsdXJlcyB0byBwcmV2ZW50IHVzZXIgZW51bWVyYXRpb24uIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgKiBAcGFyYW0ge01vbmdvRmllbGRTcGVjaWZpZXJ9IG9wdGlvbnMuZGVmYXVsdEZpZWxkU2VsZWN0b3IgVG8gZXhjbHVkZSBieSBkZWZhdWx0IGxhcmdlIGN1c3RvbSBmaWVsZHMgZnJvbSBgTWV0ZW9yLnVzZXIoKWAgYW5kIGBNZXRlb3IuZmluZFVzZXJCeS4uLigpYCBmdW5jdGlvbnMgd2hlbiBjYWxsZWQgd2l0aG91dCBhIGZpZWxkIHNlbGVjdG9yLCBhbmQgYWxsIGBvbkxvZ2luYCwgYG9uTG9naW5GYWlsdXJlYCBhbmQgYG9uTG9nb3V0YCBjYWxsYmFja3MuICBFeGFtcGxlOiBgQWNjb3VudHMuY29uZmlnKHsgZGVmYXVsdEZpZWxkU2VsZWN0b3I6IHsgbXlCaWdBcnJheTogMCB9fSlgLiBCZXdhcmUgd2hlbiB1c2luZyB0aGlzLiBJZiwgZm9yIGluc3RhbmNlLCB5b3UgZG8gbm90IGluY2x1ZGUgYGVtYWlsYCB3aGVuIGV4Y2x1ZGluZyB0aGUgZmllbGRzLCB5b3UgY2FuIGhhdmUgcHJvYmxlbXMgd2l0aCBmdW5jdGlvbnMgbGlrZSBgZm9yZ290UGFzc3dvcmRgIHRoYXQgd2lsbCBicmVhayBiZWNhdXNlIHRoZXkgd29uJ3QgaGF2ZSB0aGUgcmVxdWlyZWQgZGF0YSBhdmFpbGFibGUuIEl0J3MgcmVjb21tZW5kIHRoYXQgeW91IGFsd2F5cyBrZWVwIHRoZSBmaWVsZHMgYF9pZGAsIGB1c2VybmFtZWAsIGFuZCBgZW1haWxgLlxuICAgKi9cbiAgY29uZmlnKG9wdGlvbnMpIHtcbiAgICAvLyBXZSBkb24ndCB3YW50IHVzZXJzIHRvIGFjY2lkZW50YWxseSBvbmx5IGNhbGwgQWNjb3VudHMuY29uZmlnIG9uIHRoZVxuICAgIC8vIGNsaWVudCwgd2hlcmUgc29tZSBvZiB0aGUgb3B0aW9ucyB3aWxsIGhhdmUgcGFydGlhbCBlZmZlY3RzIChlZyByZW1vdmluZ1xuICAgIC8vIHRoZSBcImNyZWF0ZSBhY2NvdW50XCIgYnV0dG9uIGZyb20gYWNjb3VudHMtdWkgaWYgZm9yYmlkQ2xpZW50QWNjb3VudENyZWF0aW9uXG4gICAgLy8gaXMgc2V0LCBvciByZWRpcmVjdGluZyBHb29nbGUgbG9naW4gdG8gYSBzcGVjaWZpYy1kb21haW4gcGFnZSkgd2l0aG91dFxuICAgIC8vIGhhdmluZyB0aGVpciBmdWxsIGVmZmVjdHMuXG4gICAgaWYgKE1ldGVvci5pc1NlcnZlcikge1xuICAgICAgX19tZXRlb3JfcnVudGltZV9jb25maWdfXy5hY2NvdW50c0NvbmZpZ0NhbGxlZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmICghX19tZXRlb3JfcnVudGltZV9jb25maWdfXy5hY2NvdW50c0NvbmZpZ0NhbGxlZCkge1xuICAgICAgLy8gWFhYIHdvdWxkIGJlIG5pY2UgdG8gXCJjcmFzaFwiIHRoZSBjbGllbnQgYW5kIHJlcGxhY2UgdGhlIFVJIHdpdGggYW4gZXJyb3JcbiAgICAgIC8vIG1lc3NhZ2UsIGJ1dCB0aGVyZSdzIG5vIHRyaXZpYWwgd2F5IHRvIGRvIHRoaXMuXG4gICAgICBNZXRlb3IuX2RlYnVnKFwiQWNjb3VudHMuY29uZmlnIHdhcyBjYWxsZWQgb24gdGhlIGNsaWVudCBidXQgbm90IG9uIHRoZSBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwic2VydmVyOyBzb21lIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyBtYXkgbm90IHRha2UgZWZmZWN0LlwiKTtcbiAgICB9XG5cbiAgICAvLyBXZSBuZWVkIHRvIHZhbGlkYXRlIHRoZSBvYXV0aFNlY3JldEtleSBvcHRpb24gYXQgdGhlIHRpbWVcbiAgICAvLyBBY2NvdW50cy5jb25maWcgaXMgY2FsbGVkLiBXZSBhbHNvIGRlbGliZXJhdGVseSBkb24ndCBzdG9yZSB0aGVcbiAgICAvLyBvYXV0aFNlY3JldEtleSBpbiBBY2NvdW50cy5fb3B0aW9ucy5cbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9wdGlvbnMsICdvYXV0aFNlY3JldEtleScpKSB7XG4gICAgICBpZiAoTWV0ZW9yLmlzQ2xpZW50KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBvYXV0aFNlY3JldEtleSBvcHRpb24gbWF5IG9ubHkgYmUgc3BlY2lmaWVkIG9uIHRoZSBzZXJ2ZXJcIik7XG4gICAgICB9XG4gICAgICBpZiAoISBQYWNrYWdlW1wib2F1dGgtZW5jcnlwdGlvblwiXSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgb2F1dGgtZW5jcnlwdGlvbiBwYWNrYWdlIG11c3QgYmUgbG9hZGVkIHRvIHNldCBvYXV0aFNlY3JldEtleVwiKTtcbiAgICAgIH1cbiAgICAgIFBhY2thZ2VbXCJvYXV0aC1lbmNyeXB0aW9uXCJdLk9BdXRoRW5jcnlwdGlvbi5sb2FkS2V5KG9wdGlvbnMub2F1dGhTZWNyZXRLZXkpO1xuICAgICAgb3B0aW9ucyA9IHsgLi4ub3B0aW9ucyB9O1xuICAgICAgZGVsZXRlIG9wdGlvbnMub2F1dGhTZWNyZXRLZXk7XG4gICAgfVxuXG4gICAgLy8gdmFsaWRhdGUgb3B0aW9uIGtleXNcbiAgICBjb25zdCBWQUxJRF9LRVlTID0gW1wic2VuZFZlcmlmaWNhdGlvbkVtYWlsXCIsIFwiZm9yYmlkQ2xpZW50QWNjb3VudENyZWF0aW9uXCIsIFwicGFzc3dvcmRFbnJvbGxUb2tlbkV4cGlyYXRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgICBcInBhc3N3b3JkRW5yb2xsVG9rZW5FeHBpcmF0aW9uSW5EYXlzXCIsIFwicmVzdHJpY3RDcmVhdGlvbkJ5RW1haWxEb21haW5cIiwgXCJsb2dpbkV4cGlyYXRpb25JbkRheXNcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImxvZ2luRXhwaXJhdGlvblwiLCBcInBhc3N3b3JkUmVzZXRUb2tlbkV4cGlyYXRpb25JbkRheXNcIiwgXCJwYXNzd29yZFJlc2V0VG9rZW5FeHBpcmF0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhbWJpZ3VvdXNFcnJvck1lc3NhZ2VzXCIsIFwiYmNyeXB0Um91bmRzXCIsIFwiZGVmYXVsdEZpZWxkU2VsZWN0b3JcIl07XG5cbiAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAoIVZBTElEX0tFWVMuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEFjY291bnRzLmNvbmZpZzogSW52YWxpZCBrZXk6ICR7a2V5fWApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gc2V0IHZhbHVlcyBpbiBBY2NvdW50cy5fb3B0aW9uc1xuICAgIFZBTElEX0tFWVMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKGtleSBpbiBvcHRpb25zKSB7XG4gICAgICAgIGlmIChrZXkgaW4gdGhpcy5fb3B0aW9ucykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2FuJ3Qgc2V0IFxcYCR7a2V5fVxcYCBtb3JlIHRoYW4gb25jZWApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX29wdGlvbnNba2V5XSA9IG9wdGlvbnNba2V5XTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAc3VtbWFyeSBSZWdpc3RlciBhIGNhbGxiYWNrIHRvIGJlIGNhbGxlZCBhZnRlciBhIGxvZ2luIGF0dGVtcHQgc3VjY2VlZHMuXG4gICAqIEBsb2N1cyBBbnl3aGVyZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBjYWxsYmFjayB0byBiZSBjYWxsZWQgd2hlbiBsb2dpbiBpcyBzdWNjZXNzZnVsLlxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBjYWxsYmFjayByZWNlaXZlcyBhIHNpbmdsZSBvYmplY3QgdGhhdFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgIGhvbGRzIGxvZ2luIGRldGFpbHMuIFRoaXMgb2JqZWN0IGNvbnRhaW5zIHRoZSBsb2dpblxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCB0eXBlIChwYXNzd29yZCwgcmVzdW1lLCBldGMuKSBvbiBib3RoIHRoZVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudCBhbmQgc2VydmVyLiBgb25Mb2dpbmAgY2FsbGJhY2tzIHJlZ2lzdGVyZWRcbiAgICogICAgICAgICAgICAgICAgICAgICAgICBvbiB0aGUgc2VydmVyIGFsc28gcmVjZWl2ZSBleHRyYSBkYXRhLCBzdWNoXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgYXMgdXNlciBkZXRhaWxzLCBjb25uZWN0aW9uIGluZm9ybWF0aW9uLCBldGMuXG4gICAqL1xuICBvbkxvZ2luKGZ1bmMpIHtcbiAgICBsZXQgcmV0ID0gdGhpcy5fb25Mb2dpbkhvb2sucmVnaXN0ZXIoZnVuYyk7XG4gICAgLy8gY2FsbCB0aGUganVzdCByZWdpc3RlcmVkIGNhbGxiYWNrIGlmIGFscmVhZHkgbG9nZ2VkIGluXG4gICAgdGhpcy5fc3RhcnR1cENhbGxiYWNrKHJldC5jYWxsYmFjayk7XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAc3VtbWFyeSBSZWdpc3RlciBhIGNhbGxiYWNrIHRvIGJlIGNhbGxlZCBhZnRlciBhIGxvZ2luIGF0dGVtcHQgZmFpbHMuXG4gICAqIEBsb2N1cyBBbnl3aGVyZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBjYWxsYmFjayB0byBiZSBjYWxsZWQgYWZ0ZXIgdGhlIGxvZ2luIGhhcyBmYWlsZWQuXG4gICAqL1xuICBvbkxvZ2luRmFpbHVyZShmdW5jKSB7XG4gICAgcmV0dXJuIHRoaXMuX29uTG9naW5GYWlsdXJlSG9vay5yZWdpc3RlcihmdW5jKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAc3VtbWFyeSBSZWdpc3RlciBhIGNhbGxiYWNrIHRvIGJlIGNhbGxlZCBhZnRlciBhIGxvZ291dCBhdHRlbXB0IHN1Y2NlZWRzLlxuICAgKiBAbG9jdXMgQW55d2hlcmVcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgY2FsbGJhY2sgdG8gYmUgY2FsbGVkIHdoZW4gbG9nb3V0IGlzIHN1Y2Nlc3NmdWwuXG4gICAqL1xuICBvbkxvZ291dChmdW5jKSB7XG4gICAgcmV0dXJuIHRoaXMuX29uTG9nb3V0SG9vay5yZWdpc3RlcihmdW5jKTtcbiAgfVxuXG4gIF9pbml0Q29ubmVjdGlvbihvcHRpb25zKSB7XG4gICAgaWYgKCEgTWV0ZW9yLmlzQ2xpZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gVGhlIGNvbm5lY3Rpb24gdXNlZCBieSB0aGUgQWNjb3VudHMgc3lzdGVtLiBUaGlzIGlzIHRoZSBjb25uZWN0aW9uXG4gICAgLy8gdGhhdCB3aWxsIGdldCBsb2dnZWQgaW4gYnkgTWV0ZW9yLmxvZ2luKCksIGFuZCB0aGlzIGlzIHRoZVxuICAgIC8vIGNvbm5lY3Rpb24gd2hvc2UgbG9naW4gc3RhdGUgd2lsbCBiZSByZWZsZWN0ZWQgYnkgTWV0ZW9yLnVzZXJJZCgpLlxuICAgIC8vXG4gICAgLy8gSXQgd291bGQgYmUgbXVjaCBwcmVmZXJhYmxlIGZvciB0aGlzIHRvIGJlIGluIGFjY291bnRzX2NsaWVudC5qcyxcbiAgICAvLyBidXQgaXQgaGFzIHRvIGJlIGhlcmUgYmVjYXVzZSBpdCdzIG5lZWRlZCB0byBjcmVhdGUgdGhlXG4gICAgLy8gTWV0ZW9yLnVzZXJzIGNvbGxlY3Rpb24uXG4gICAgaWYgKG9wdGlvbnMuY29ubmVjdGlvbikge1xuICAgICAgdGhpcy5jb25uZWN0aW9uID0gb3B0aW9ucy5jb25uZWN0aW9uO1xuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5kZHBVcmwpIHtcbiAgICAgIHRoaXMuY29ubmVjdGlvbiA9IEREUC5jb25uZWN0KG9wdGlvbnMuZGRwVXJsKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBfX21ldGVvcl9ydW50aW1lX2NvbmZpZ19fICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICAgICAgICBfX21ldGVvcl9ydW50aW1lX2NvbmZpZ19fLkFDQ09VTlRTX0NPTk5FQ1RJT05fVVJMKSB7XG4gICAgICAvLyBUZW1wb3JhcnksIGludGVybmFsIGhvb2sgdG8gYWxsb3cgdGhlIHNlcnZlciB0byBwb2ludCB0aGUgY2xpZW50XG4gICAgICAvLyB0byBhIGRpZmZlcmVudCBhdXRoZW50aWNhdGlvbiBzZXJ2ZXIuIFRoaXMgaXMgZm9yIGEgdmVyeVxuICAgICAgLy8gcGFydGljdWxhciB1c2UgY2FzZSB0aGF0IGNvbWVzIHVwIHdoZW4gaW1wbGVtZW50aW5nIGEgb2F1dGhcbiAgICAgIC8vIHNlcnZlci4gVW5zdXBwb3J0ZWQgYW5kIG1heSBnbyBhd2F5IGF0IGFueSBwb2ludCBpbiB0aW1lLlxuICAgICAgLy9cbiAgICAgIC8vIFdlIHdpbGwgZXZlbnR1YWxseSBwcm92aWRlIGEgZ2VuZXJhbCB3YXkgdG8gdXNlIGFjY291bnQtYmFzZVxuICAgICAgLy8gYWdhaW5zdCBhbnkgRERQIGNvbm5lY3Rpb24sIG5vdCBqdXN0IG9uZSBzcGVjaWFsIG9uZS5cbiAgICAgIHRoaXMuY29ubmVjdGlvbiA9XG4gICAgICAgIEREUC5jb25uZWN0KF9fbWV0ZW9yX3J1bnRpbWVfY29uZmlnX18uQUNDT1VOVFNfQ09OTkVDVElPTl9VUkwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbm5lY3Rpb24gPSBNZXRlb3IuY29ubmVjdGlvbjtcbiAgICB9XG4gIH1cblxuICBfZ2V0VG9rZW5MaWZldGltZU1zKCkge1xuICAgIC8vIFdoZW4gbG9naW5FeHBpcmF0aW9uSW5EYXlzIGlzIHNldCB0byBudWxsLCB3ZSdsbCB1c2UgYSByZWFsbHkgaGlnaFxuICAgIC8vIG51bWJlciBvZiBkYXlzIChMT0dJTl9VTkVYUElSQUJMRV9UT0tFTl9EQVlTKSB0byBzaW11bGF0ZSBhblxuICAgIC8vIHVuZXhwaXJpbmcgdG9rZW4uXG4gICAgY29uc3QgbG9naW5FeHBpcmF0aW9uSW5EYXlzID1cbiAgICAgICh0aGlzLl9vcHRpb25zLmxvZ2luRXhwaXJhdGlvbkluRGF5cyA9PT0gbnVsbClcbiAgICAgICAgPyBMT0dJTl9VTkVYUElSSU5HX1RPS0VOX0RBWVNcbiAgICAgICAgOiB0aGlzLl9vcHRpb25zLmxvZ2luRXhwaXJhdGlvbkluRGF5cztcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9ucy5sb2dpbkV4cGlyYXRpb24gfHwgKGxvZ2luRXhwaXJhdGlvbkluRGF5c1xuICAgICAgICB8fCBERUZBVUxUX0xPR0lOX0VYUElSQVRJT05fREFZUykgKiA4NjQwMDAwMDtcbiAgfVxuXG4gIF9nZXRQYXNzd29yZFJlc2V0VG9rZW5MaWZldGltZU1zKCkge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zLnBhc3N3b3JkUmVzZXRUb2tlbkV4cGlyYXRpb24gfHwgKHRoaXMuX29wdGlvbnMucGFzc3dvcmRSZXNldFRva2VuRXhwaXJhdGlvbkluRGF5cyB8fFxuICAgICAgICAgICAgREVGQVVMVF9QQVNTV09SRF9SRVNFVF9UT0tFTl9FWFBJUkFUSU9OX0RBWVMpICogODY0MDAwMDA7XG4gIH1cblxuICBfZ2V0UGFzc3dvcmRFbnJvbGxUb2tlbkxpZmV0aW1lTXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnMucGFzc3dvcmRFbnJvbGxUb2tlbkV4cGlyYXRpb24gfHwgKHRoaXMuX29wdGlvbnMucGFzc3dvcmRFbnJvbGxUb2tlbkV4cGlyYXRpb25JbkRheXMgfHxcbiAgICAgICAgREVGQVVMVF9QQVNTV09SRF9FTlJPTExfVE9LRU5fRVhQSVJBVElPTl9EQVlTKSAqIDg2NDAwMDAwO1xuICB9XG5cbiAgX3Rva2VuRXhwaXJhdGlvbih3aGVuKSB7XG4gICAgLy8gV2UgcGFzcyB3aGVuIHRocm91Z2ggdGhlIERhdGUgY29uc3RydWN0b3IgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5O1xuICAgIC8vIGB3aGVuYCB1c2VkIHRvIGJlIGEgbnVtYmVyLlxuICAgIHJldHVybiBuZXcgRGF0ZSgobmV3IERhdGUod2hlbikpLmdldFRpbWUoKSArIHRoaXMuX2dldFRva2VuTGlmZXRpbWVNcygpKTtcbiAgfVxuXG4gIF90b2tlbkV4cGlyZXNTb29uKHdoZW4pIHtcbiAgICBsZXQgbWluTGlmZXRpbWVNcyA9IC4xICogdGhpcy5fZ2V0VG9rZW5MaWZldGltZU1zKCk7XG4gICAgY29uc3QgbWluTGlmZXRpbWVDYXBNcyA9IE1JTl9UT0tFTl9MSUZFVElNRV9DQVBfU0VDUyAqIDEwMDA7XG4gICAgaWYgKG1pbkxpZmV0aW1lTXMgPiBtaW5MaWZldGltZUNhcE1zKSB7XG4gICAgICBtaW5MaWZldGltZU1zID0gbWluTGlmZXRpbWVDYXBNcztcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBEYXRlKCkgPiAobmV3IERhdGUod2hlbikgLSBtaW5MaWZldGltZU1zKTtcbiAgfVxuXG4gIC8vIE5vLW9wIG9uIHRoZSBzZXJ2ZXIsIG92ZXJyaWRkZW4gb24gdGhlIGNsaWVudC5cbiAgX3N0YXJ0dXBDYWxsYmFjayhjYWxsYmFjaykge31cbn1cblxuLy8gTm90ZSB0aGF0IEFjY291bnRzIGlzIGRlZmluZWQgc2VwYXJhdGVseSBpbiBhY2NvdW50c19jbGllbnQuanMgYW5kXG4vLyBhY2NvdW50c19zZXJ2ZXIuanMuXG5cbi8qKlxuICogQHN1bW1hcnkgR2V0IHRoZSBjdXJyZW50IHVzZXIgaWQsIG9yIGBudWxsYCBpZiBubyB1c2VyIGlzIGxvZ2dlZCBpbi4gQSByZWFjdGl2ZSBkYXRhIHNvdXJjZS5cbiAqIEBsb2N1cyBBbnl3aGVyZSBidXQgcHVibGlzaCBmdW5jdGlvbnNcbiAqIEBpbXBvcnRGcm9tUGFja2FnZSBtZXRlb3JcbiAqL1xuTWV0ZW9yLnVzZXJJZCA9ICgpID0+IEFjY291bnRzLnVzZXJJZCgpO1xuXG4vKipcbiAqIEBzdW1tYXJ5IEdldCB0aGUgY3VycmVudCB1c2VyIHJlY29yZCwgb3IgYG51bGxgIGlmIG5vIHVzZXIgaXMgbG9nZ2VkIGluLiBBIHJlYWN0aXZlIGRhdGEgc291cmNlLlxuICogQGxvY3VzIEFueXdoZXJlIGJ1dCBwdWJsaXNoIGZ1bmN0aW9uc1xuICogQGltcG9ydEZyb21QYWNrYWdlIG1ldGVvclxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQHBhcmFtIHtNb25nb0ZpZWxkU3BlY2lmaWVyfSBvcHRpb25zLmZpZWxkcyBEaWN0aW9uYXJ5IG9mIGZpZWxkcyB0byByZXR1cm4gb3IgZXhjbHVkZS5cbiAqL1xuTWV0ZW9yLnVzZXIgPSAob3B0aW9ucykgPT4gQWNjb3VudHMudXNlcihvcHRpb25zKTtcblxuLy8gaG93IGxvbmcgKGluIGRheXMpIHVudGlsIGEgbG9naW4gdG9rZW4gZXhwaXJlc1xuY29uc3QgREVGQVVMVF9MT0dJTl9FWFBJUkFUSU9OX0RBWVMgPSA5MDtcbi8vIGhvdyBsb25nIChpbiBkYXlzKSB1bnRpbCByZXNldCBwYXNzd29yZCB0b2tlbiBleHBpcmVzXG5jb25zdCBERUZBVUxUX1BBU1NXT1JEX1JFU0VUX1RPS0VOX0VYUElSQVRJT05fREFZUyA9IDM7XG4vLyBob3cgbG9uZyAoaW4gZGF5cykgdW50aWwgZW5yb2wgcGFzc3dvcmQgdG9rZW4gZXhwaXJlc1xuY29uc3QgREVGQVVMVF9QQVNTV09SRF9FTlJPTExfVE9LRU5fRVhQSVJBVElPTl9EQVlTID0gMzA7XG4vLyBDbGllbnRzIGRvbid0IHRyeSB0byBhdXRvLWxvZ2luIHdpdGggYSB0b2tlbiB0aGF0IGlzIGdvaW5nIHRvIGV4cGlyZSB3aXRoaW5cbi8vIC4xICogREVGQVVMVF9MT0dJTl9FWFBJUkFUSU9OX0RBWVMsIGNhcHBlZCBhdCBNSU5fVE9LRU5fTElGRVRJTUVfQ0FQX1NFQ1MuXG4vLyBUcmllcyB0byBhdm9pZCBhYnJ1cHQgZGlzY29ubmVjdHMgZnJvbSBleHBpcmluZyB0b2tlbnMuXG5jb25zdCBNSU5fVE9LRU5fTElGRVRJTUVfQ0FQX1NFQ1MgPSAzNjAwOyAvLyBvbmUgaG91clxuLy8gaG93IG9mdGVuIChpbiBtaWxsaXNlY29uZHMpIHdlIGNoZWNrIGZvciBleHBpcmVkIHRva2Vuc1xuZXhwb3J0IGNvbnN0IEVYUElSRV9UT0tFTlNfSU5URVJWQUxfTVMgPSA2MDAgKiAxMDAwOyAvLyAxMCBtaW51dGVzXG4vLyBob3cgbG9uZyB3ZSB3YWl0IGJlZm9yZSBsb2dnaW5nIG91dCBjbGllbnRzIHdoZW4gTWV0ZW9yLmxvZ291dE90aGVyQ2xpZW50cyBpc1xuLy8gY2FsbGVkXG5leHBvcnQgY29uc3QgQ09OTkVDVElPTl9DTE9TRV9ERUxBWV9NUyA9IDEwICogMTAwMDtcbi8vIEEgbGFyZ2UgbnVtYmVyIG9mIGV4cGlyYXRpb24gZGF5cyAoYXBwcm94aW1hdGVseSAxMDAgeWVhcnMgd29ydGgpIHRoYXQgaXNcbi8vIHVzZWQgd2hlbiBjcmVhdGluZyB1bmV4cGlyaW5nIHRva2Vucy5cbmNvbnN0IExPR0lOX1VORVhQSVJJTkdfVE9LRU5fREFZUyA9IDM2NSAqIDEwMDtcbiIsImltcG9ydCBjcnlwdG8gZnJvbSAnY3J5cHRvJztcbmltcG9ydCB7XG4gIEFjY291bnRzQ29tbW9uLFxuICBFWFBJUkVfVE9LRU5TX0lOVEVSVkFMX01TLFxuICBDT05ORUNUSU9OX0NMT1NFX0RFTEFZX01TXG59IGZyb20gJy4vYWNjb3VudHNfY29tbW9uLmpzJztcbmltcG9ydCB7IFVSTCB9IGZyb20gJ21ldGVvci91cmwnO1xuXG5jb25zdCBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEBzdW1tYXJ5IENvbnN0cnVjdG9yIGZvciB0aGUgYEFjY291bnRzYCBuYW1lc3BhY2Ugb24gdGhlIHNlcnZlci5cbiAqIEBsb2N1cyBTZXJ2ZXJcbiAqIEBjbGFzcyBBY2NvdW50c1NlcnZlclxuICogQGV4dGVuZHMgQWNjb3VudHNDb21tb25cbiAqIEBpbnN0YW5jZW5hbWUgYWNjb3VudHNTZXJ2ZXJcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXJ2ZXIgQSBzZXJ2ZXIgb2JqZWN0IHN1Y2ggYXMgYE1ldGVvci5zZXJ2ZXJgLlxuICovXG5leHBvcnQgY2xhc3MgQWNjb3VudHNTZXJ2ZXIgZXh0ZW5kcyBBY2NvdW50c0NvbW1vbiB7XG4gIC8vIE5vdGUgdGhhdCB0aGlzIGNvbnN0cnVjdG9yIGlzIGxlc3MgbGlrZWx5IHRvIGJlIGluc3RhbnRpYXRlZCBtdWx0aXBsZVxuICAvLyB0aW1lcyB0aGFuIHRoZSBgQWNjb3VudHNDbGllbnRgIGNvbnN0cnVjdG9yLCBiZWNhdXNlIGEgc2luZ2xlIHNlcnZlclxuICAvLyBjYW4gcHJvdmlkZSBvbmx5IG9uZSBzZXQgb2YgbWV0aG9kcy5cbiAgY29uc3RydWN0b3Ioc2VydmVyKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX3NlcnZlciA9IHNlcnZlciB8fCBNZXRlb3Iuc2VydmVyO1xuICAgIC8vIFNldCB1cCB0aGUgc2VydmVyJ3MgbWV0aG9kcywgYXMgaWYgYnkgY2FsbGluZyBNZXRlb3IubWV0aG9kcy5cbiAgICB0aGlzLl9pbml0U2VydmVyTWV0aG9kcygpO1xuXG4gICAgdGhpcy5faW5pdEFjY291bnREYXRhSG9va3MoKTtcblxuICAgIC8vIElmIGF1dG9wdWJsaXNoIGlzIG9uLCBwdWJsaXNoIHRoZXNlIHVzZXIgZmllbGRzLiBMb2dpbiBzZXJ2aWNlXG4gICAgLy8gcGFja2FnZXMgKGVnIGFjY291bnRzLWdvb2dsZSkgYWRkIHRvIHRoZXNlIGJ5IGNhbGxpbmdcbiAgICAvLyBhZGRBdXRvcHVibGlzaEZpZWxkcy4gIE5vdGFibHksIHRoaXMgaXNuJ3QgaW1wbGVtZW50ZWQgd2l0aCBtdWx0aXBsZVxuICAgIC8vIHB1Ymxpc2hlcyBzaW5jZSBERFAgb25seSBtZXJnZXMgb25seSBhY3Jvc3MgdG9wLWxldmVsIGZpZWxkcywgbm90XG4gICAgLy8gc3ViZmllbGRzIChzdWNoIGFzICdzZXJ2aWNlcy5mYWNlYm9vay5hY2Nlc3NUb2tlbicpXG4gICAgdGhpcy5fYXV0b3B1Ymxpc2hGaWVsZHMgPSB7XG4gICAgICBsb2dnZWRJblVzZXI6IFsncHJvZmlsZScsICd1c2VybmFtZScsICdlbWFpbHMnXSxcbiAgICAgIG90aGVyVXNlcnM6IFsncHJvZmlsZScsICd1c2VybmFtZSddXG4gICAgfTtcblxuICAgIC8vIHVzZSBvYmplY3QgdG8ga2VlcCB0aGUgcmVmZXJlbmNlIHdoZW4gdXNlZCBpbiBmdW5jdGlvbnNcbiAgICAvLyB3aGVyZSBfZGVmYXVsdFB1Ymxpc2hGaWVsZHMgaXMgZGVzdHJ1Y3R1cmVkIGludG8gbGV4aWNhbCBzY29wZVxuICAgIC8vIGZvciBwdWJsaXNoIGNhbGxiYWNrcyB0aGF0IG5lZWQgYHRoaXNgXG4gICAgdGhpcy5fZGVmYXVsdFB1Ymxpc2hGaWVsZHMgPSB7XG4gICAgICBwcm9qZWN0aW9uOiB7XG4gICAgICAgIHByb2ZpbGU6IDEsXG4gICAgICAgIHVzZXJuYW1lOiAxLFxuICAgICAgICBlbWFpbHM6IDEsXG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuX2luaXRTZXJ2ZXJQdWJsaWNhdGlvbnMoKTtcblxuICAgIC8vIGNvbm5lY3Rpb25JZCAtPiB7Y29ubmVjdGlvbiwgbG9naW5Ub2tlbn1cbiAgICB0aGlzLl9hY2NvdW50RGF0YSA9IHt9O1xuXG4gICAgLy8gY29ubmVjdGlvbiBpZCAtPiBvYnNlcnZlIGhhbmRsZSBmb3IgdGhlIGxvZ2luIHRva2VuIHRoYXQgdGhpcyBjb25uZWN0aW9uIGlzXG4gICAgLy8gY3VycmVudGx5IGFzc29jaWF0ZWQgd2l0aCwgb3IgYSBudW1iZXIuIFRoZSBudW1iZXIgaW5kaWNhdGVzIHRoYXQgd2UgYXJlIGluXG4gICAgLy8gdGhlIHByb2Nlc3Mgb2Ygc2V0dGluZyB1cCB0aGUgb2JzZXJ2ZSAodXNpbmcgYSBudW1iZXIgaW5zdGVhZCBvZiBhIHNpbmdsZVxuICAgIC8vIHNlbnRpbmVsIGFsbG93cyBtdWx0aXBsZSBhdHRlbXB0cyB0byBzZXQgdXAgdGhlIG9ic2VydmUgdG8gaWRlbnRpZnkgd2hpY2hcbiAgICAvLyBvbmUgd2FzIHRoZWlycykuXG4gICAgdGhpcy5fdXNlck9ic2VydmVzRm9yQ29ubmVjdGlvbnMgPSB7fTtcbiAgICB0aGlzLl9uZXh0VXNlck9ic2VydmVOdW1iZXIgPSAxOyAgLy8gZm9yIHRoZSBudW1iZXIgZGVzY3JpYmVkIGFib3ZlLlxuXG4gICAgLy8gbGlzdCBvZiBhbGwgcmVnaXN0ZXJlZCBoYW5kbGVycy5cbiAgICB0aGlzLl9sb2dpbkhhbmRsZXJzID0gW107XG5cbiAgICBzZXR1cFVzZXJzQ29sbGVjdGlvbih0aGlzLnVzZXJzKTtcbiAgICBzZXR1cERlZmF1bHRMb2dpbkhhbmRsZXJzKHRoaXMpO1xuICAgIHNldEV4cGlyZVRva2Vuc0ludGVydmFsKHRoaXMpO1xuXG4gICAgdGhpcy5fdmFsaWRhdGVMb2dpbkhvb2sgPSBuZXcgSG9vayh7IGJpbmRFbnZpcm9ubWVudDogZmFsc2UgfSk7XG4gICAgdGhpcy5fdmFsaWRhdGVOZXdVc2VySG9va3MgPSBbXG4gICAgICBkZWZhdWx0VmFsaWRhdGVOZXdVc2VySG9vay5iaW5kKHRoaXMpXG4gICAgXTtcblxuICAgIHRoaXMuX2RlbGV0ZVNhdmVkVG9rZW5zRm9yQWxsVXNlcnNPblN0YXJ0dXAoKTtcblxuICAgIHRoaXMuX3NraXBDYXNlSW5zZW5zaXRpdmVDaGVja3NGb3JUZXN0ID0ge307XG5cbiAgICB0aGlzLnVybHMgPSB7XG4gICAgICByZXNldFBhc3N3b3JkOiAodG9rZW4sIGV4dHJhUGFyYW1zKSA9PiB0aGlzLmJ1aWxkRW1haWxVcmwoYCMvcmVzZXQtcGFzc3dvcmQvJHt0b2tlbn1gLCBleHRyYVBhcmFtcyksXG4gICAgICB2ZXJpZnlFbWFpbDogKHRva2VuLCBleHRyYVBhcmFtcykgPT4gdGhpcy5idWlsZEVtYWlsVXJsKGAjL3ZlcmlmeS1lbWFpbC8ke3Rva2VufWAsIGV4dHJhUGFyYW1zKSxcbiAgICAgIGVucm9sbEFjY291bnQ6ICh0b2tlbiwgZXh0cmFQYXJhbXMpID0+IHRoaXMuYnVpbGRFbWFpbFVybChgIy9lbnJvbGwtYWNjb3VudC8ke3Rva2VufWAsIGV4dHJhUGFyYW1zKSxcbiAgICB9O1xuXG4gICAgdGhpcy5hZGREZWZhdWx0UmF0ZUxpbWl0KCk7XG5cbiAgICB0aGlzLmJ1aWxkRW1haWxVcmwgPSAocGF0aCwgZXh0cmFQYXJhbXMgPSB7fSkgPT4ge1xuICAgICAgY29uc3QgdXJsID0gbmV3IFVSTChNZXRlb3IuYWJzb2x1dGVVcmwocGF0aCkpO1xuICAgICAgY29uc3QgcGFyYW1zID0gT2JqZWN0LmVudHJpZXMoZXh0cmFQYXJhbXMpO1xuICAgICAgaWYgKHBhcmFtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIEFkZCBhZGRpdGlvbmFsIHBhcmFtZXRlcnMgdG8gdGhlIHVybFxuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBwYXJhbXMpIHtcbiAgICAgICAgICB1cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChrZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHVybC50b1N0cmluZygpO1xuICAgIH07XG4gIH1cblxuICAvLy9cbiAgLy8vIENVUlJFTlQgVVNFUlxuICAvLy9cblxuICAvLyBAb3ZlcnJpZGUgb2YgXCJhYnN0cmFjdFwiIG5vbi1pbXBsZW1lbnRhdGlvbiBpbiBhY2NvdW50c19jb21tb24uanNcbiAgdXNlcklkKCkge1xuICAgIC8vIFRoaXMgZnVuY3Rpb24gb25seSB3b3JrcyBpZiBjYWxsZWQgaW5zaWRlIGEgbWV0aG9kIG9yIGEgcHViaWNhdGlvbi5cbiAgICAvLyBVc2luZyBhbnkgb2YgdGhlIGluZm9ybWF0aW9uIGZyb20gTWV0ZW9yLnVzZXIoKSBpbiBhIG1ldGhvZCBvclxuICAgIC8vIHB1Ymxpc2ggZnVuY3Rpb24gd2lsbCBhbHdheXMgdXNlIHRoZSB2YWx1ZSBmcm9tIHdoZW4gdGhlIGZ1bmN0aW9uIGZpcnN0XG4gICAgLy8gcnVucy4gVGhpcyBpcyBsaWtlbHkgbm90IHdoYXQgdGhlIHVzZXIgZXhwZWN0cy4gVGhlIHdheSB0byBtYWtlIHRoaXMgd29ya1xuICAgIC8vIGluIGEgbWV0aG9kIG9yIHB1Ymxpc2ggZnVuY3Rpb24gaXMgdG8gZG8gTWV0ZW9yLmZpbmQodGhpcy51c2VySWQpLm9ic2VydmVcbiAgICAvLyBhbmQgcmVjb21wdXRlIHdoZW4gdGhlIHVzZXIgcmVjb3JkIGNoYW5nZXMuXG4gICAgY29uc3QgY3VycmVudEludm9jYXRpb24gPSBERFAuX0N1cnJlbnRNZXRob2RJbnZvY2F0aW9uLmdldCgpIHx8IEREUC5fQ3VycmVudFB1YmxpY2F0aW9uSW52b2NhdGlvbi5nZXQoKTtcbiAgICBpZiAoIWN1cnJlbnRJbnZvY2F0aW9uKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWV0ZW9yLnVzZXJJZCBjYW4gb25seSBiZSBpbnZva2VkIGluIG1ldGhvZCBjYWxscyBvciBwdWJsaWNhdGlvbnMuXCIpO1xuICAgIHJldHVybiBjdXJyZW50SW52b2NhdGlvbi51c2VySWQ7XG4gIH1cblxuICAvLy9cbiAgLy8vIExPR0lOIEhPT0tTXG4gIC8vL1xuXG4gIC8qKlxuICAgKiBAc3VtbWFyeSBWYWxpZGF0ZSBsb2dpbiBhdHRlbXB0cy5cbiAgICogQGxvY3VzIFNlcnZlclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIENhbGxlZCB3aGVuZXZlciBhIGxvZ2luIGlzIGF0dGVtcHRlZCAoZWl0aGVyIHN1Y2Nlc3NmdWwgb3IgdW5zdWNjZXNzZnVsKS4gIEEgbG9naW4gY2FuIGJlIGFib3J0ZWQgYnkgcmV0dXJuaW5nIGEgZmFsc3kgdmFsdWUgb3IgdGhyb3dpbmcgYW4gZXhjZXB0aW9uLlxuICAgKi9cbiAgdmFsaWRhdGVMb2dpbkF0dGVtcHQoZnVuYykge1xuICAgIC8vIEV4Y2VwdGlvbnMgaW5zaWRlIHRoZSBob29rIGNhbGxiYWNrIGFyZSBwYXNzZWQgdXAgdG8gdXMuXG4gICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRlTG9naW5Ib29rLnJlZ2lzdGVyKGZ1bmMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBzdW1tYXJ5IFNldCByZXN0cmljdGlvbnMgb24gbmV3IHVzZXIgY3JlYXRpb24uXG4gICAqIEBsb2N1cyBTZXJ2ZXJcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBDYWxsZWQgd2hlbmV2ZXIgYSBuZXcgdXNlciBpcyBjcmVhdGVkLiBUYWtlcyB0aGUgbmV3IHVzZXIgb2JqZWN0LCBhbmQgcmV0dXJucyB0cnVlIHRvIGFsbG93IHRoZSBjcmVhdGlvbiBvciBmYWxzZSB0byBhYm9ydC5cbiAgICovXG4gIHZhbGlkYXRlTmV3VXNlcihmdW5jKSB7XG4gICAgdGhpcy5fdmFsaWRhdGVOZXdVc2VySG9va3MucHVzaChmdW5jKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAc3VtbWFyeSBWYWxpZGF0ZSBsb2dpbiBmcm9tIGV4dGVybmFsIHNlcnZpY2VcbiAgICogQGxvY3VzIFNlcnZlclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIENhbGxlZCB3aGVuZXZlciBsb2dpbi91c2VyIGNyZWF0aW9uIGZyb20gZXh0ZXJuYWwgc2VydmljZSBpcyBhdHRlbXB0ZWQuIExvZ2luIG9yIHVzZXIgY3JlYXRpb24gYmFzZWQgb24gdGhpcyBsb2dpbiBjYW4gYmUgYWJvcnRlZCBieSBwYXNzaW5nIGEgZmFsc3kgdmFsdWUgb3IgdGhyb3dpbmcgYW4gZXhjZXB0aW9uLlxuICAgKi9cbiAgYmVmb3JlRXh0ZXJuYWxMb2dpbihmdW5jKSB7XG4gICAgaWYgKHRoaXMuX2JlZm9yZUV4dGVybmFsTG9naW5Ib29rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4gb25seSBjYWxsIGJlZm9yZUV4dGVybmFsTG9naW4gb25jZVwiKTtcbiAgICB9XG5cbiAgICB0aGlzLl9iZWZvcmVFeHRlcm5hbExvZ2luSG9vayA9IGZ1bmM7XG4gIH1cblxuICAvLy9cbiAgLy8vIENSRUFURSBVU0VSIEhPT0tTXG4gIC8vL1xuXG4gIC8qKlxuICAgKiBAc3VtbWFyeSBDdXN0b21pemUgbmV3IHVzZXIgY3JlYXRpb24uXG4gICAqIEBsb2N1cyBTZXJ2ZXJcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBDYWxsZWQgd2hlbmV2ZXIgYSBuZXcgdXNlciBpcyBjcmVhdGVkLiBSZXR1cm4gdGhlIG5ldyB1c2VyIG9iamVjdCwgb3IgdGhyb3cgYW4gYEVycm9yYCB0byBhYm9ydCB0aGUgY3JlYXRpb24uXG4gICAqL1xuICBvbkNyZWF0ZVVzZXIoZnVuYykge1xuICAgIGlmICh0aGlzLl9vbkNyZWF0ZVVzZXJIb29rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4gb25seSBjYWxsIG9uQ3JlYXRlVXNlciBvbmNlXCIpO1xuICAgIH1cblxuICAgIHRoaXMuX29uQ3JlYXRlVXNlckhvb2sgPSBmdW5jO1xuICB9XG5cbiAgLyoqXG4gICAqIEBzdW1tYXJ5IEN1c3RvbWl6ZSBvYXV0aCB1c2VyIHByb2ZpbGUgdXBkYXRlc1xuICAgKiBAbG9jdXMgU2VydmVyXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgQ2FsbGVkIHdoZW5ldmVyIGEgdXNlciBpcyBsb2dnZWQgaW4gdmlhIG9hdXRoLiBSZXR1cm4gdGhlIHByb2ZpbGUgb2JqZWN0IHRvIGJlIG1lcmdlZCwgb3IgdGhyb3cgYW4gYEVycm9yYCB0byBhYm9ydCB0aGUgY3JlYXRpb24uXG4gICAqL1xuICBvbkV4dGVybmFsTG9naW4oZnVuYykge1xuICAgIGlmICh0aGlzLl9vbkV4dGVybmFsTG9naW5Ib29rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4gb25seSBjYWxsIG9uRXh0ZXJuYWxMb2dpbiBvbmNlXCIpO1xuICAgIH1cblxuICAgIHRoaXMuX29uRXh0ZXJuYWxMb2dpbkhvb2sgPSBmdW5jO1xuICB9XG5cbiAgLyoqXG4gICAqIEBzdW1tYXJ5IEN1c3RvbWl6ZSB1c2VyIHNlbGVjdGlvbiBvbiBleHRlcm5hbCBsb2dpbnNcbiAgICogQGxvY3VzIFNlcnZlclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIENhbGxlZCB3aGVuZXZlciBhIHVzZXIgaXMgbG9nZ2VkIGluIHZpYSBvYXV0aCBhbmQgYVxuICAgKiB1c2VyIGlzIG5vdCBmb3VuZCB3aXRoIHRoZSBzZXJ2aWNlIGlkLiBSZXR1cm4gdGhlIHVzZXIgb3IgdW5kZWZpbmVkLlxuICAgKi9cbiAgIHNldEFkZGl0aW9uYWxGaW5kVXNlck9uRXh0ZXJuYWxMb2dpbihmdW5jKSB7XG4gICAgaWYgKHRoaXMuX2FkZGl0aW9uYWxGaW5kVXNlck9uRXh0ZXJuYWxMb2dpbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuIG9ubHkgY2FsbCBzZXRBZGRpdGlvbmFsRmluZFVzZXJPbkV4dGVybmFsTG9naW4gb25jZVwiKTtcbiAgICB9XG4gICAgdGhpcy5fYWRkaXRpb25hbEZpbmRVc2VyT25FeHRlcm5hbExvZ2luID0gZnVuYztcbiAgfVxuXG4gIF92YWxpZGF0ZUxvZ2luKGNvbm5lY3Rpb24sIGF0dGVtcHQpIHtcbiAgICB0aGlzLl92YWxpZGF0ZUxvZ2luSG9vay5lYWNoKGNhbGxiYWNrID0+IHtcbiAgICAgIGxldCByZXQ7XG4gICAgICB0cnkge1xuICAgICAgICByZXQgPSBjYWxsYmFjayhjbG9uZUF0dGVtcHRXaXRoQ29ubmVjdGlvbihjb25uZWN0aW9uLCBhdHRlbXB0KSk7XG4gICAgICB9XG4gICAgICBjYXRjaCAoZSkge1xuICAgICAgICBhdHRlbXB0LmFsbG93ZWQgPSBmYWxzZTtcbiAgICAgICAgLy8gWFhYIHRoaXMgbWVhbnMgdGhlIGxhc3QgdGhyb3duIGVycm9yIG92ZXJyaWRlcyBwcmV2aW91cyBlcnJvclxuICAgICAgICAvLyBtZXNzYWdlcy4gTWF5YmUgdGhpcyBpcyBzdXJwcmlzaW5nIHRvIHVzZXJzIGFuZCB3ZSBzaG91bGQgbWFrZVxuICAgICAgICAvLyBvdmVycmlkaW5nIGVycm9ycyBtb3JlIGV4cGxpY2l0LiAoc2VlXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tZXRlb3IvbWV0ZW9yL2lzc3Vlcy8xOTYwKVxuICAgICAgICBhdHRlbXB0LmVycm9yID0gZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoISByZXQpIHtcbiAgICAgICAgYXR0ZW1wdC5hbGxvd2VkID0gZmFsc2U7XG4gICAgICAgIC8vIGRvbid0IG92ZXJyaWRlIGEgc3BlY2lmaWMgZXJyb3IgcHJvdmlkZWQgYnkgYSBwcmV2aW91c1xuICAgICAgICAvLyB2YWxpZGF0b3Igb3IgdGhlIGluaXRpYWwgYXR0ZW1wdCAoZWcgXCJpbmNvcnJlY3QgcGFzc3dvcmRcIikuXG4gICAgICAgIGlmICghYXR0ZW1wdC5lcnJvcilcbiAgICAgICAgICBhdHRlbXB0LmVycm9yID0gbmV3IE1ldGVvci5FcnJvcig0MDMsIFwiTG9naW4gZm9yYmlkZGVuXCIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG4gIH07XG5cbiAgX3N1Y2Nlc3NmdWxMb2dpbihjb25uZWN0aW9uLCBhdHRlbXB0KSB7XG4gICAgdGhpcy5fb25Mb2dpbkhvb2suZWFjaChjYWxsYmFjayA9PiB7XG4gICAgICBjYWxsYmFjayhjbG9uZUF0dGVtcHRXaXRoQ29ubmVjdGlvbihjb25uZWN0aW9uLCBhdHRlbXB0KSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgfTtcblxuICBfZmFpbGVkTG9naW4oY29ubmVjdGlvbiwgYXR0ZW1wdCkge1xuICAgIHRoaXMuX29uTG9naW5GYWlsdXJlSG9vay5lYWNoKGNhbGxiYWNrID0+IHtcbiAgICAgIGNhbGxiYWNrKGNsb25lQXR0ZW1wdFdpdGhDb25uZWN0aW9uKGNvbm5lY3Rpb24sIGF0dGVtcHQpKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICB9O1xuXG4gIF9zdWNjZXNzZnVsTG9nb3V0KGNvbm5lY3Rpb24sIHVzZXJJZCkge1xuICAgIC8vIGRvbid0IGZldGNoIHRoZSB1c2VyIG9iamVjdCB1bmxlc3MgdGhlcmUgYXJlIHNvbWUgY2FsbGJhY2tzIHJlZ2lzdGVyZWRcbiAgICBsZXQgdXNlcjtcbiAgICB0aGlzLl9vbkxvZ291dEhvb2suZWFjaChjYWxsYmFjayA9PiB7XG4gICAgICBpZiAoIXVzZXIgJiYgdXNlcklkKSB1c2VyID0gdGhpcy51c2Vycy5maW5kT25lKHVzZXJJZCwge2ZpZWxkczogdGhpcy5fb3B0aW9ucy5kZWZhdWx0RmllbGRTZWxlY3Rvcn0pO1xuICAgICAgY2FsbGJhY2soeyB1c2VyLCBjb25uZWN0aW9uIH0pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8vXG4gIC8vLyBMT0dJTiBNRVRIT0RTXG4gIC8vL1xuXG4gIC8vIExvZ2luIG1ldGhvZHMgcmV0dXJuIHRvIHRoZSBjbGllbnQgYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlc2VcbiAgLy8gZmllbGRzIHdoZW4gdGhlIHVzZXIgd2FzIGxvZ2dlZCBpbiBzdWNjZXNzZnVsbHk6XG4gIC8vXG4gIC8vICAgaWQ6IHVzZXJJZFxuICAvLyAgIHRva2VuOiAqXG4gIC8vICAgdG9rZW5FeHBpcmVzOiAqXG4gIC8vXG4gIC8vIHRva2VuRXhwaXJlcyBpcyBvcHRpb25hbCBhbmQgaW50ZW5kcyB0byBwcm92aWRlIGEgaGludCB0byB0aGVcbiAgLy8gY2xpZW50IGFzIHRvIHdoZW4gdGhlIHRva2VuIHdpbGwgZXhwaXJlLiBJZiBub3QgcHJvdmlkZWQsIHRoZVxuICAvLyBjbGllbnQgd2lsbCBjYWxsIEFjY291bnRzLl90b2tlbkV4cGlyYXRpb24sIHBhc3NpbmcgaXQgdGhlIGRhdGVcbiAgLy8gdGhhdCBpdCByZWNlaXZlZCB0aGUgdG9rZW4uXG4gIC8vXG4gIC8vIFRoZSBsb2dpbiBtZXRob2Qgd2lsbCB0aHJvdyBhbiBlcnJvciBiYWNrIHRvIHRoZSBjbGllbnQgaWYgdGhlIHVzZXJcbiAgLy8gZmFpbGVkIHRvIGxvZyBpbi5cbiAgLy9cbiAgLy9cbiAgLy8gTG9naW4gaGFuZGxlcnMgYW5kIHNlcnZpY2Ugc3BlY2lmaWMgbG9naW4gbWV0aG9kcyBzdWNoIGFzXG4gIC8vIGBjcmVhdGVVc2VyYCBpbnRlcm5hbGx5IHJldHVybiBhIGByZXN1bHRgIG9iamVjdCBjb250YWluaW5nIHRoZXNlXG4gIC8vIGZpZWxkczpcbiAgLy9cbiAgLy8gICB0eXBlOlxuICAvLyAgICAgb3B0aW9uYWwgc3RyaW5nOyB0aGUgc2VydmljZSBuYW1lLCBvdmVycmlkZXMgdGhlIGhhbmRsZXJcbiAgLy8gICAgIGRlZmF1bHQgaWYgcHJlc2VudC5cbiAgLy9cbiAgLy8gICBlcnJvcjpcbiAgLy8gICAgIGV4Y2VwdGlvbjsgaWYgdGhlIHVzZXIgaXMgbm90IGFsbG93ZWQgdG8gbG9naW4sIHRoZSByZWFzb24gd2h5LlxuICAvL1xuICAvLyAgIHVzZXJJZDpcbiAgLy8gICAgIHN0cmluZzsgdGhlIHVzZXIgaWQgb2YgdGhlIHVzZXIgYXR0ZW1wdGluZyB0byBsb2dpbiAoaWZcbiAgLy8gICAgIGtub3duKSwgcmVxdWlyZWQgZm9yIGFuIGFsbG93ZWQgbG9naW4uXG4gIC8vXG4gIC8vICAgb3B0aW9uczpcbiAgLy8gICAgIG9wdGlvbmFsIG9iamVjdCBtZXJnZWQgaW50byB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBsb2dpblxuICAvLyAgICAgbWV0aG9kOyB1c2VkIGJ5IEhBTUsgZnJvbSBTUlAuXG4gIC8vXG4gIC8vICAgc3RhbXBlZExvZ2luVG9rZW46XG4gIC8vICAgICBvcHRpb25hbCBvYmplY3Qgd2l0aCBgdG9rZW5gIGFuZCBgd2hlbmAgaW5kaWNhdGluZyB0aGUgbG9naW5cbiAgLy8gICAgIHRva2VuIGlzIGFscmVhZHkgcHJlc2VudCBpbiB0aGUgZGF0YWJhc2UsIHJldHVybmVkIGJ5IHRoZVxuICAvLyAgICAgXCJyZXN1bWVcIiBsb2dpbiBoYW5kbGVyLlxuICAvL1xuICAvLyBGb3IgY29udmVuaWVuY2UsIGxvZ2luIG1ldGhvZHMgY2FuIGFsc28gdGhyb3cgYW4gZXhjZXB0aW9uLCB3aGljaFxuICAvLyBpcyBjb252ZXJ0ZWQgaW50byBhbiB7ZXJyb3J9IHJlc3VsdC4gIEhvd2V2ZXIsIGlmIHRoZSBpZCBvZiB0aGVcbiAgLy8gdXNlciBhdHRlbXB0aW5nIHRoZSBsb2dpbiBpcyBrbm93biwgYSB7dXNlcklkLCBlcnJvcn0gcmVzdWx0IHNob3VsZFxuICAvLyBiZSByZXR1cm5lZCBpbnN0ZWFkIHNpbmNlIHRoZSB1c2VyIGlkIGlzIG5vdCBjYXB0dXJlZCB3aGVuIGFuXG4gIC8vIGV4Y2VwdGlvbiBpcyB0aHJvd24uXG4gIC8vXG4gIC8vIFRoaXMgaW50ZXJuYWwgYHJlc3VsdGAgb2JqZWN0IGlzIGF1dG9tYXRpY2FsbHkgY29udmVydGVkIGludG8gdGhlXG4gIC8vIHB1YmxpYyB7aWQsIHRva2VuLCB0b2tlbkV4cGlyZXN9IG9iamVjdCByZXR1cm5lZCB0byB0aGUgY2xpZW50LlxuXG4gIC8vIFRyeSBhIGxvZ2luIG1ldGhvZCwgY29udmVydGluZyB0aHJvd24gZXhjZXB0aW9ucyBpbnRvIGFuIHtlcnJvcn1cbiAgLy8gcmVzdWx0LiAgVGhlIGB0eXBlYCBhcmd1bWVudCBpcyBhIGRlZmF1bHQsIGluc2VydGVkIGludG8gdGhlIHJlc3VsdFxuICAvLyBvYmplY3QgaWYgbm90IGV4cGxpY2l0bHkgcmV0dXJuZWQuXG4gIC8vXG4gIC8vIExvZyBpbiBhIHVzZXIgb24gYSBjb25uZWN0aW9uLlxuICAvL1xuICAvLyBXZSB1c2UgdGhlIG1ldGhvZCBpbnZvY2F0aW9uIHRvIHNldCB0aGUgdXNlciBpZCBvbiB0aGUgY29ubmVjdGlvbixcbiAgLy8gbm90IHRoZSBjb25uZWN0aW9uIG9iamVjdCBkaXJlY3RseS4gc2V0VXNlcklkIGlzIHRpZWQgdG8gbWV0aG9kcyB0b1xuICAvLyBlbmZvcmNlIGNsZWFyIG9yZGVyaW5nIG9mIG1ldGhvZCBhcHBsaWNhdGlvbiAodXNpbmcgd2FpdCBtZXRob2RzIG9uXG4gIC8vIHRoZSBjbGllbnQsIGFuZCBhIG5vIHNldFVzZXJJZCBhZnRlciB1bmJsb2NrIHJlc3RyaWN0aW9uIG9uIHRoZVxuICAvLyBzZXJ2ZXIpXG4gIC8vXG4gIC8vIFRoZSBgc3RhbXBlZExvZ2luVG9rZW5gIHBhcmFtZXRlciBpcyBvcHRpb25hbC4gIFdoZW4gcHJlc2VudCwgaXRcbiAgLy8gaW5kaWNhdGVzIHRoYXQgdGhlIGxvZ2luIHRva2VuIGhhcyBhbHJlYWR5IGJlZW4gaW5zZXJ0ZWQgaW50byB0aGVcbiAgLy8gZGF0YWJhc2UgYW5kIGRvZXNuJ3QgbmVlZCB0byBiZSBpbnNlcnRlZCBhZ2Fpbi4gIChJdCdzIHVzZWQgYnkgdGhlXG4gIC8vIFwicmVzdW1lXCIgbG9naW4gaGFuZGxlcikuXG4gIF9sb2dpblVzZXIobWV0aG9kSW52b2NhdGlvbiwgdXNlcklkLCBzdGFtcGVkTG9naW5Ub2tlbikge1xuICAgIGlmICghIHN0YW1wZWRMb2dpblRva2VuKSB7XG4gICAgICBzdGFtcGVkTG9naW5Ub2tlbiA9IHRoaXMuX2dlbmVyYXRlU3RhbXBlZExvZ2luVG9rZW4oKTtcbiAgICAgIHRoaXMuX2luc2VydExvZ2luVG9rZW4odXNlcklkLCBzdGFtcGVkTG9naW5Ub2tlbik7XG4gICAgfVxuXG4gICAgLy8gVGhpcyBvcmRlciAoYW5kIHRoZSBhdm9pZGFuY2Ugb2YgeWllbGRzKSBpcyBpbXBvcnRhbnQgdG8gbWFrZVxuICAgIC8vIHN1cmUgdGhhdCB3aGVuIHB1Ymxpc2ggZnVuY3Rpb25zIGFyZSByZXJ1biwgdGhleSBzZWUgYVxuICAgIC8vIGNvbnNpc3RlbnQgdmlldyBvZiB0aGUgd29ybGQ6IHRoZSB1c2VySWQgaXMgc2V0IGFuZCBtYXRjaGVzXG4gICAgLy8gdGhlIGxvZ2luIHRva2VuIG9uIHRoZSBjb25uZWN0aW9uIChub3QgdGhhdCB0aGVyZSBpc1xuICAgIC8vIGN1cnJlbnRseSBhIHB1YmxpYyBBUEkgZm9yIHJlYWRpbmcgdGhlIGxvZ2luIHRva2VuIG9uIGFcbiAgICAvLyBjb25uZWN0aW9uKS5cbiAgICBNZXRlb3IuX25vWWllbGRzQWxsb3dlZCgoKSA9PlxuICAgICAgdGhpcy5fc2V0TG9naW5Ub2tlbihcbiAgICAgICAgdXNlcklkLFxuICAgICAgICBtZXRob2RJbnZvY2F0aW9uLmNvbm5lY3Rpb24sXG4gICAgICAgIHRoaXMuX2hhc2hMb2dpblRva2VuKHN0YW1wZWRMb2dpblRva2VuLnRva2VuKVxuICAgICAgKVxuICAgICk7XG5cbiAgICBtZXRob2RJbnZvY2F0aW9uLnNldFVzZXJJZCh1c2VySWQpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiB1c2VySWQsXG4gICAgICB0b2tlbjogc3RhbXBlZExvZ2luVG9rZW4udG9rZW4sXG4gICAgICB0b2tlbkV4cGlyZXM6IHRoaXMuX3Rva2VuRXhwaXJhdGlvbihzdGFtcGVkTG9naW5Ub2tlbi53aGVuKVxuICAgIH07XG4gIH07XG5cbiAgLy8gQWZ0ZXIgYSBsb2dpbiBtZXRob2QgaGFzIGNvbXBsZXRlZCwgY2FsbCB0aGUgbG9naW4gaG9va3MuICBOb3RlXG4gIC8vIHRoYXQgYGF0dGVtcHRMb2dpbmAgaXMgY2FsbGVkIGZvciAqYWxsKiBsb2dpbiBhdHRlbXB0cywgZXZlbiBvbmVzXG4gIC8vIHdoaWNoIGFyZW4ndCBzdWNjZXNzZnVsIChzdWNoIGFzIGFuIGludmFsaWQgcGFzc3dvcmQsIGV0YykuXG4gIC8vXG4gIC8vIElmIHRoZSBsb2dpbiBpcyBhbGxvd2VkIGFuZCBpc24ndCBhYm9ydGVkIGJ5IGEgdmFsaWRhdGUgbG9naW4gaG9va1xuICAvLyBjYWxsYmFjaywgbG9nIGluIHRoZSB1c2VyLlxuICAvL1xuICBfYXR0ZW1wdExvZ2luKFxuICAgIG1ldGhvZEludm9jYXRpb24sXG4gICAgbWV0aG9kTmFtZSxcbiAgICBtZXRob2RBcmdzLFxuICAgIHJlc3VsdFxuICApIHtcbiAgICBpZiAoIXJlc3VsdClcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInJlc3VsdCBpcyByZXF1aXJlZFwiKTtcblxuICAgIC8vIFhYWCBBIHByb2dyYW1taW5nIGVycm9yIGluIGEgbG9naW4gaGFuZGxlciBjYW4gbGVhZCB0byB0aGlzIG9jY3VycmluZywgYW5kXG4gICAgLy8gdGhlbiB3ZSBkb24ndCBjYWxsIG9uTG9naW4gb3Igb25Mb2dpbkZhaWx1cmUgY2FsbGJhY2tzLiBTaG91bGRcbiAgICAvLyB0cnlMb2dpbk1ldGhvZCBjYXRjaCB0aGlzIGNhc2UgYW5kIHR1cm4gaXQgaW50byBhbiBlcnJvcj9cbiAgICBpZiAoIXJlc3VsdC51c2VySWQgJiYgIXJlc3VsdC5lcnJvcilcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkEgbG9naW4gbWV0aG9kIG11c3Qgc3BlY2lmeSBhIHVzZXJJZCBvciBhbiBlcnJvclwiKTtcblxuICAgIGxldCB1c2VyO1xuICAgIGlmIChyZXN1bHQudXNlcklkKVxuICAgICAgdXNlciA9IHRoaXMudXNlcnMuZmluZE9uZShyZXN1bHQudXNlcklkLCB7ZmllbGRzOiB0aGlzLl9vcHRpb25zLmRlZmF1bHRGaWVsZFNlbGVjdG9yfSk7XG5cbiAgICBjb25zdCBhdHRlbXB0ID0ge1xuICAgICAgdHlwZTogcmVzdWx0LnR5cGUgfHwgXCJ1bmtub3duXCIsXG4gICAgICBhbGxvd2VkOiAhISAocmVzdWx0LnVzZXJJZCAmJiAhcmVzdWx0LmVycm9yKSxcbiAgICAgIG1ldGhvZE5hbWU6IG1ldGhvZE5hbWUsXG4gICAgICBtZXRob2RBcmd1bWVudHM6IEFycmF5LmZyb20obWV0aG9kQXJncylcbiAgICB9O1xuICAgIGlmIChyZXN1bHQuZXJyb3IpIHtcbiAgICAgIGF0dGVtcHQuZXJyb3IgPSByZXN1bHQuZXJyb3I7XG4gICAgfVxuICAgIGlmICh1c2VyKSB7XG4gICAgICBhdHRlbXB0LnVzZXIgPSB1c2VyO1xuICAgIH1cblxuICAgIC8vIF92YWxpZGF0ZUxvZ2luIG1heSBtdXRhdGUgYGF0dGVtcHRgIGJ5IGFkZGluZyBhbiBlcnJvciBhbmQgY2hhbmdpbmcgYWxsb3dlZFxuICAgIC8vIHRvIGZhbHNlLCBidXQgdGhhdCdzIHRoZSBvbmx5IGNoYW5nZSBpdCBjYW4gbWFrZSAoYW5kIHRoZSB1c2VyJ3MgY2FsbGJhY2tzXG4gICAgLy8gb25seSBnZXQgYSBjbG9uZSBvZiBgYXR0ZW1wdGApLlxuICAgIHRoaXMuX3ZhbGlkYXRlTG9naW4obWV0aG9kSW52b2NhdGlvbi5jb25uZWN0aW9uLCBhdHRlbXB0KTtcblxuICAgIGlmIChhdHRlbXB0LmFsbG93ZWQpIHtcbiAgICAgIGNvbnN0IHJldCA9IHtcbiAgICAgICAgLi4udGhpcy5fbG9naW5Vc2VyKFxuICAgICAgICAgIG1ldGhvZEludm9jYXRpb24sXG4gICAgICAgICAgcmVzdWx0LnVzZXJJZCxcbiAgICAgICAgICByZXN1bHQuc3RhbXBlZExvZ2luVG9rZW5cbiAgICAgICAgKSxcbiAgICAgICAgLi4ucmVzdWx0Lm9wdGlvbnNcbiAgICAgIH07XG4gICAgICByZXQudHlwZSA9IGF0dGVtcHQudHlwZTtcbiAgICAgIHRoaXMuX3N1Y2Nlc3NmdWxMb2dpbihtZXRob2RJbnZvY2F0aW9uLmNvbm5lY3Rpb24sIGF0dGVtcHQpO1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLl9mYWlsZWRMb2dpbihtZXRob2RJbnZvY2F0aW9uLmNvbm5lY3Rpb24sIGF0dGVtcHQpO1xuICAgICAgdGhyb3cgYXR0ZW1wdC5lcnJvcjtcbiAgICB9XG4gIH07XG5cbiAgLy8gQWxsIHNlcnZpY2Ugc3BlY2lmaWMgbG9naW4gbWV0aG9kcyBzaG91bGQgZ28gdGhyb3VnaCB0aGlzIGZ1bmN0aW9uLlxuICAvLyBFbnN1cmUgdGhhdCB0aHJvd24gZXhjZXB0aW9ucyBhcmUgY2F1Z2h0IGFuZCB0aGF0IGxvZ2luIGhvb2tcbiAgLy8gY2FsbGJhY2tzIGFyZSBzdGlsbCBjYWxsZWQuXG4gIC8vXG4gIF9sb2dpbk1ldGhvZChcbiAgICBtZXRob2RJbnZvY2F0aW9uLFxuICAgIG1ldGhvZE5hbWUsXG4gICAgbWV0aG9kQXJncyxcbiAgICB0eXBlLFxuICAgIGZuXG4gICkge1xuICAgIHJldHVybiB0aGlzLl9hdHRlbXB0TG9naW4oXG4gICAgICBtZXRob2RJbnZvY2F0aW9uLFxuICAgICAgbWV0aG9kTmFtZSxcbiAgICAgIG1ldGhvZEFyZ3MsXG4gICAgICB0cnlMb2dpbk1ldGhvZCh0eXBlLCBmbilcbiAgICApO1xuICB9O1xuXG5cbiAgLy8gUmVwb3J0IGEgbG9naW4gYXR0ZW1wdCBmYWlsZWQgb3V0c2lkZSB0aGUgY29udGV4dCBvZiBhIG5vcm1hbCBsb2dpblxuICAvLyBtZXRob2QuIFRoaXMgaXMgZm9yIHVzZSBpbiB0aGUgY2FzZSB3aGVyZSB0aGVyZSBpcyBhIG11bHRpLXN0ZXAgbG9naW5cbiAgLy8gcHJvY2VkdXJlIChlZyBTUlAgYmFzZWQgcGFzc3dvcmQgbG9naW4pLiBJZiBhIG1ldGhvZCBlYXJseSBpbiB0aGVcbiAgLy8gY2hhaW4gZmFpbHMsIGl0IHNob3VsZCBjYWxsIHRoaXMgZnVuY3Rpb24gdG8gcmVwb3J0IGEgZmFpbHVyZS4gVGhlcmVcbiAgLy8gaXMgbm8gY29ycmVzcG9uZGluZyBtZXRob2QgZm9yIGEgc3VjY2Vzc2Z1bCBsb2dpbjsgbWV0aG9kcyB0aGF0IGNhblxuICAvLyBzdWNjZWVkIGF0IGxvZ2dpbmcgYSB1c2VyIGluIHNob3VsZCBhbHdheXMgYmUgYWN0dWFsIGxvZ2luIG1ldGhvZHNcbiAgLy8gKHVzaW5nIGVpdGhlciBBY2NvdW50cy5fbG9naW5NZXRob2Qgb3IgQWNjb3VudHMucmVnaXN0ZXJMb2dpbkhhbmRsZXIpLlxuICBfcmVwb3J0TG9naW5GYWlsdXJlKFxuICAgIG1ldGhvZEludm9jYXRpb24sXG4gICAgbWV0aG9kTmFtZSxcbiAgICBtZXRob2RBcmdzLFxuICAgIHJlc3VsdFxuICApIHtcbiAgICBjb25zdCBhdHRlbXB0ID0ge1xuICAgICAgdHlwZTogcmVzdWx0LnR5cGUgfHwgXCJ1bmtub3duXCIsXG4gICAgICBhbGxvd2VkOiBmYWxzZSxcbiAgICAgIGVycm9yOiByZXN1bHQuZXJyb3IsXG4gICAgICBtZXRob2ROYW1lOiBtZXRob2ROYW1lLFxuICAgICAgbWV0aG9kQXJndW1lbnRzOiBBcnJheS5mcm9tKG1ldGhvZEFyZ3MpXG4gICAgfTtcblxuICAgIGlmIChyZXN1bHQudXNlcklkKSB7XG4gICAgICBhdHRlbXB0LnVzZXIgPSB0aGlzLnVzZXJzLmZpbmRPbmUocmVzdWx0LnVzZXJJZCwge2ZpZWxkczogdGhpcy5fb3B0aW9ucy5kZWZhdWx0RmllbGRTZWxlY3Rvcn0pO1xuICAgIH1cblxuICAgIHRoaXMuX3ZhbGlkYXRlTG9naW4obWV0aG9kSW52b2NhdGlvbi5jb25uZWN0aW9uLCBhdHRlbXB0KTtcbiAgICB0aGlzLl9mYWlsZWRMb2dpbihtZXRob2RJbnZvY2F0aW9uLmNvbm5lY3Rpb24sIGF0dGVtcHQpO1xuXG4gICAgLy8gX3ZhbGlkYXRlTG9naW4gbWF5IG11dGF0ZSBhdHRlbXB0IHRvIHNldCBhIG5ldyBlcnJvciBtZXNzYWdlLiBSZXR1cm5cbiAgICAvLyB0aGUgbW9kaWZpZWQgdmVyc2lvbi5cbiAgICByZXR1cm4gYXR0ZW1wdDtcbiAgfTtcblxuICAvLy9cbiAgLy8vIExPR0lOIEhBTkRMRVJTXG4gIC8vL1xuXG4gIC8vIFRoZSBtYWluIGVudHJ5IHBvaW50IGZvciBhdXRoIHBhY2thZ2VzIHRvIGhvb2sgaW4gdG8gbG9naW4uXG4gIC8vXG4gIC8vIEEgbG9naW4gaGFuZGxlciBpcyBhIGxvZ2luIG1ldGhvZCB3aGljaCBjYW4gcmV0dXJuIGB1bmRlZmluZWRgIHRvXG4gIC8vIGluZGljYXRlIHRoYXQgdGhlIGxvZ2luIHJlcXVlc3QgaXMgbm90IGhhbmRsZWQgYnkgdGhpcyBoYW5kbGVyLlxuICAvL1xuICAvLyBAcGFyYW0gbmFtZSB7U3RyaW5nfSBPcHRpb25hbC4gIFRoZSBzZXJ2aWNlIG5hbWUsIHVzZWQgYnkgZGVmYXVsdFxuICAvLyBpZiBhIHNwZWNpZmljIHNlcnZpY2UgbmFtZSBpc24ndCByZXR1cm5lZCBpbiB0aGUgcmVzdWx0LlxuICAvL1xuICAvLyBAcGFyYW0gaGFuZGxlciB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZWNlaXZlcyBhbiBvcHRpb25zIG9iamVjdFxuICAvLyAoYXMgcGFzc2VkIGFzIGFuIGFyZ3VtZW50IHRvIHRoZSBgbG9naW5gIG1ldGhvZCkgYW5kIHJldHVybnMgb25lIG9mOlxuICAvLyAtIGB1bmRlZmluZWRgLCBtZWFuaW5nIGRvbid0IGhhbmRsZTtcbiAgLy8gLSBhIGxvZ2luIG1ldGhvZCByZXN1bHQgb2JqZWN0XG5cbiAgcmVnaXN0ZXJMb2dpbkhhbmRsZXIobmFtZSwgaGFuZGxlcikge1xuICAgIGlmICghIGhhbmRsZXIpIHtcbiAgICAgIGhhbmRsZXIgPSBuYW1lO1xuICAgICAgbmFtZSA9IG51bGw7XG4gICAgfVxuXG4gICAgdGhpcy5fbG9naW5IYW5kbGVycy5wdXNoKHtcbiAgICAgIG5hbWU6IG5hbWUsXG4gICAgICBoYW5kbGVyOiBoYW5kbGVyXG4gICAgfSk7XG4gIH07XG5cblxuICAvLyBDaGVja3MgYSB1c2VyJ3MgY3JlZGVudGlhbHMgYWdhaW5zdCBhbGwgdGhlIHJlZ2lzdGVyZWQgbG9naW5cbiAgLy8gaGFuZGxlcnMsIGFuZCByZXR1cm5zIGEgbG9naW4gdG9rZW4gaWYgdGhlIGNyZWRlbnRpYWxzIGFyZSB2YWxpZC4gSXRcbiAgLy8gaXMgbGlrZSB0aGUgbG9naW4gbWV0aG9kLCBleGNlcHQgdGhhdCBpdCBkb2Vzbid0IHNldCB0aGUgbG9nZ2VkLWluXG4gIC8vIHVzZXIgb24gdGhlIGNvbm5lY3Rpb24uIFRocm93cyBhIE1ldGVvci5FcnJvciBpZiBsb2dnaW5nIGluIGZhaWxzLFxuICAvLyBpbmNsdWRpbmcgdGhlIGNhc2Ugd2hlcmUgbm9uZSBvZiB0aGUgbG9naW4gaGFuZGxlcnMgaGFuZGxlZCB0aGUgbG9naW5cbiAgLy8gcmVxdWVzdC4gT3RoZXJ3aXNlLCByZXR1cm5zIHtpZDogdXNlcklkLCB0b2tlbjogKiwgdG9rZW5FeHBpcmVzOiAqfS5cbiAgLy9cbiAgLy8gRm9yIGV4YW1wbGUsIGlmIHlvdSB3YW50IHRvIGxvZ2luIHdpdGggYSBwbGFpbnRleHQgcGFzc3dvcmQsIGBvcHRpb25zYCBjb3VsZCBiZVxuICAvLyAgIHsgdXNlcjogeyB1c2VybmFtZTogPHVzZXJuYW1lPiB9LCBwYXNzd29yZDogPHBhc3N3b3JkPiB9LCBvclxuICAvLyAgIHsgdXNlcjogeyBlbWFpbDogPGVtYWlsPiB9LCBwYXNzd29yZDogPHBhc3N3b3JkPiB9LlxuXG4gIC8vIFRyeSBhbGwgb2YgdGhlIHJlZ2lzdGVyZWQgbG9naW4gaGFuZGxlcnMgdW50aWwgb25lIG9mIHRoZW0gZG9lc24ndFxuICAvLyByZXR1cm4gYHVuZGVmaW5lZGAsIG1lYW5pbmcgaXQgaGFuZGxlZCB0aGlzIGNhbGwgdG8gYGxvZ2luYC4gUmV0dXJuXG4gIC8vIHRoYXQgcmV0dXJuIHZhbHVlLlxuICBfcnVuTG9naW5IYW5kbGVycyhtZXRob2RJbnZvY2F0aW9uLCBvcHRpb25zKSB7XG4gICAgZm9yIChsZXQgaGFuZGxlciBvZiB0aGlzLl9sb2dpbkhhbmRsZXJzKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSB0cnlMb2dpbk1ldGhvZChcbiAgICAgICAgaGFuZGxlci5uYW1lLFxuICAgICAgICAoKSA9PiBoYW5kbGVyLmhhbmRsZXIuY2FsbChtZXRob2RJbnZvY2F0aW9uLCBvcHRpb25zKVxuICAgICAgKTtcblxuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuXG4gICAgICBpZiAocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDAsIFwiQSBsb2dpbiBoYW5kbGVyIHNob3VsZCByZXR1cm4gYSByZXN1bHQgb3IgdW5kZWZpbmVkXCIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBudWxsLFxuICAgICAgZXJyb3I6IG5ldyBNZXRlb3IuRXJyb3IoNDAwLCBcIlVucmVjb2duaXplZCBvcHRpb25zIGZvciBsb2dpbiByZXF1ZXN0XCIpXG4gICAgfTtcbiAgfTtcblxuICAvLyBEZWxldGVzIHRoZSBnaXZlbiBsb2dpblRva2VuIGZyb20gdGhlIGRhdGFiYXNlLlxuICAvL1xuICAvLyBGb3IgbmV3LXN0eWxlIGhhc2hlZCB0b2tlbiwgdGhpcyB3aWxsIGNhdXNlIGFsbCBjb25uZWN0aW9uc1xuICAvLyBhc3NvY2lhdGVkIHdpdGggdGhlIHRva2VuIHRvIGJlIGNsb3NlZC5cbiAgLy9cbiAgLy8gQW55IGNvbm5lY3Rpb25zIGFzc29jaWF0ZWQgd2l0aCBvbGQtc3R5bGUgdW5oYXNoZWQgdG9rZW5zIHdpbGwgYmVcbiAgLy8gaW4gdGhlIHByb2Nlc3Mgb2YgYmVjb21pbmcgYXNzb2NpYXRlZCB3aXRoIGhhc2hlZCB0b2tlbnMgYW5kIHRoZW5cbiAgLy8gdGhleSdsbCBnZXQgY2xvc2VkLlxuICBkZXN0cm95VG9rZW4odXNlcklkLCBsb2dpblRva2VuKSB7XG4gICAgdGhpcy51c2Vycy51cGRhdGUodXNlcklkLCB7XG4gICAgICAkcHVsbDoge1xuICAgICAgICBcInNlcnZpY2VzLnJlc3VtZS5sb2dpblRva2Vuc1wiOiB7XG4gICAgICAgICAgJG9yOiBbXG4gICAgICAgICAgICB7IGhhc2hlZFRva2VuOiBsb2dpblRva2VuIH0sXG4gICAgICAgICAgICB7IHRva2VuOiBsb2dpblRva2VuIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBfaW5pdFNlcnZlck1ldGhvZHMoKSB7XG4gICAgLy8gVGhlIG1ldGhvZHMgY3JlYXRlZCBpbiB0aGlzIGZ1bmN0aW9uIG5lZWQgdG8gYmUgY3JlYXRlZCBoZXJlIHNvIHRoYXRcbiAgICAvLyB0aGlzIHZhcmlhYmxlIGlzIGF2YWlsYWJsZSBpbiB0aGVpciBzY29wZS5cbiAgICBjb25zdCBhY2NvdW50cyA9IHRoaXM7XG5cblxuICAgIC8vIFRoaXMgb2JqZWN0IHdpbGwgYmUgcG9wdWxhdGVkIHdpdGggbWV0aG9kcyBhbmQgdGhlbiBwYXNzZWQgdG9cbiAgICAvLyBhY2NvdW50cy5fc2VydmVyLm1ldGhvZHMgZnVydGhlciBiZWxvdy5cbiAgICBjb25zdCBtZXRob2RzID0ge307XG5cbiAgICAvLyBAcmV0dXJucyB7T2JqZWN0fG51bGx9XG4gICAgLy8gICBJZiBzdWNjZXNzZnVsLCByZXR1cm5zIHt0b2tlbjogcmVjb25uZWN0VG9rZW4sIGlkOiB1c2VySWR9XG4gICAgLy8gICBJZiB1bnN1Y2Nlc3NmdWwgKGZvciBleGFtcGxlLCBpZiB0aGUgdXNlciBjbG9zZWQgdGhlIG9hdXRoIGxvZ2luIHBvcHVwKSxcbiAgICAvLyAgICAgdGhyb3dzIGFuIGVycm9yIGRlc2NyaWJpbmcgdGhlIHJlYXNvblxuICAgIG1ldGhvZHMubG9naW4gPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgLy8gTG9naW4gaGFuZGxlcnMgc2hvdWxkIHJlYWxseSBhbHNvIGNoZWNrIHdoYXRldmVyIGZpZWxkIHRoZXkgbG9vayBhdCBpblxuICAgICAgLy8gb3B0aW9ucywgYnV0IHdlIGRvbid0IGVuZm9yY2UgaXQuXG4gICAgICBjaGVjayhvcHRpb25zLCBPYmplY3QpO1xuXG4gICAgICBjb25zdCByZXN1bHQgPSBhY2NvdW50cy5fcnVuTG9naW5IYW5kbGVycyh0aGlzLCBvcHRpb25zKTtcblxuICAgICAgcmV0dXJuIGFjY291bnRzLl9hdHRlbXB0TG9naW4odGhpcywgXCJsb2dpblwiLCBhcmd1bWVudHMsIHJlc3VsdCk7XG4gICAgfTtcblxuICAgIG1ldGhvZHMubG9nb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgdG9rZW4gPSBhY2NvdW50cy5fZ2V0TG9naW5Ub2tlbih0aGlzLmNvbm5lY3Rpb24uaWQpO1xuICAgICAgYWNjb3VudHMuX3NldExvZ2luVG9rZW4odGhpcy51c2VySWQsIHRoaXMuY29ubmVjdGlvbiwgbnVsbCk7XG4gICAgICBpZiAodG9rZW4gJiYgdGhpcy51c2VySWQpIHtcbiAgICAgICAgYWNjb3VudHMuZGVzdHJveVRva2VuKHRoaXMudXNlcklkLCB0b2tlbik7XG4gICAgICB9XG4gICAgICBhY2NvdW50cy5fc3VjY2Vzc2Z1bExvZ291dCh0aGlzLmNvbm5lY3Rpb24sIHRoaXMudXNlcklkKTtcbiAgICAgIHRoaXMuc2V0VXNlcklkKG51bGwpO1xuICAgIH07XG5cbiAgICAvLyBHZW5lcmF0ZXMgYSBuZXcgbG9naW4gdG9rZW4gd2l0aCB0aGUgc2FtZSBleHBpcmF0aW9uIGFzIHRoZVxuICAgIC8vIGNvbm5lY3Rpb24ncyBjdXJyZW50IHRva2VuIGFuZCBzYXZlcyBpdCB0byB0aGUgZGF0YWJhc2UuIEFzc29jaWF0ZXNcbiAgICAvLyB0aGUgY29ubmVjdGlvbiB3aXRoIHRoaXMgbmV3IHRva2VuIGFuZCByZXR1cm5zIGl0LiBUaHJvd3MgYW4gZXJyb3JcbiAgICAvLyBpZiBjYWxsZWQgb24gYSBjb25uZWN0aW9uIHRoYXQgaXNuJ3QgbG9nZ2VkIGluLlxuICAgIC8vXG4gICAgLy8gQHJldHVybnMgT2JqZWN0XG4gICAgLy8gICBJZiBzdWNjZXNzZnVsLCByZXR1cm5zIHsgdG9rZW46IDxuZXcgdG9rZW4+LCBpZDogPHVzZXIgaWQ+LFxuICAgIC8vICAgdG9rZW5FeHBpcmVzOiA8ZXhwaXJhdGlvbiBkYXRlPiB9LlxuICAgIG1ldGhvZHMuZ2V0TmV3VG9rZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCB1c2VyID0gYWNjb3VudHMudXNlcnMuZmluZE9uZSh0aGlzLnVzZXJJZCwge1xuICAgICAgICBmaWVsZHM6IHsgXCJzZXJ2aWNlcy5yZXN1bWUubG9naW5Ub2tlbnNcIjogMSB9XG4gICAgICB9KTtcbiAgICAgIGlmICghIHRoaXMudXNlcklkIHx8ICEgdXNlcikge1xuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKFwiWW91IGFyZSBub3QgbG9nZ2VkIGluLlwiKTtcbiAgICAgIH1cbiAgICAgIC8vIEJlIGNhcmVmdWwgbm90IHRvIGdlbmVyYXRlIGEgbmV3IHRva2VuIHRoYXQgaGFzIGEgbGF0ZXJcbiAgICAgIC8vIGV4cGlyYXRpb24gdGhhbiB0aGUgY3VycmVuIHRva2VuLiBPdGhlcndpc2UsIGEgYmFkIGd1eSB3aXRoIGFcbiAgICAgIC8vIHN0b2xlbiB0b2tlbiBjb3VsZCB1c2UgdGhpcyBtZXRob2QgdG8gc3RvcCBoaXMgc3RvbGVuIHRva2VuIGZyb21cbiAgICAgIC8vIGV2ZXIgZXhwaXJpbmcuXG4gICAgICBjb25zdCBjdXJyZW50SGFzaGVkVG9rZW4gPSBhY2NvdW50cy5fZ2V0TG9naW5Ub2tlbih0aGlzLmNvbm5lY3Rpb24uaWQpO1xuICAgICAgY29uc3QgY3VycmVudFN0YW1wZWRUb2tlbiA9IHVzZXIuc2VydmljZXMucmVzdW1lLmxvZ2luVG9rZW5zLmZpbmQoXG4gICAgICAgIHN0YW1wZWRUb2tlbiA9PiBzdGFtcGVkVG9rZW4uaGFzaGVkVG9rZW4gPT09IGN1cnJlbnRIYXNoZWRUb2tlblxuICAgICAgKTtcbiAgICAgIGlmICghIGN1cnJlbnRTdGFtcGVkVG9rZW4pIHsgLy8gc2FmZXR5IGJlbHQ6IHRoaXMgc2hvdWxkIG5ldmVyIGhhcHBlblxuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKFwiSW52YWxpZCBsb2dpbiB0b2tlblwiKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5ld1N0YW1wZWRUb2tlbiA9IGFjY291bnRzLl9nZW5lcmF0ZVN0YW1wZWRMb2dpblRva2VuKCk7XG4gICAgICBuZXdTdGFtcGVkVG9rZW4ud2hlbiA9IGN1cnJlbnRTdGFtcGVkVG9rZW4ud2hlbjtcbiAgICAgIGFjY291bnRzLl9pbnNlcnRMb2dpblRva2VuKHRoaXMudXNlcklkLCBuZXdTdGFtcGVkVG9rZW4pO1xuICAgICAgcmV0dXJuIGFjY291bnRzLl9sb2dpblVzZXIodGhpcywgdGhpcy51c2VySWQsIG5ld1N0YW1wZWRUb2tlbik7XG4gICAgfTtcblxuICAgIC8vIFJlbW92ZXMgYWxsIHRva2VucyBleGNlcHQgdGhlIHRva2VuIGFzc29jaWF0ZWQgd2l0aCB0aGUgY3VycmVudFxuICAgIC8vIGNvbm5lY3Rpb24uIFRocm93cyBhbiBlcnJvciBpZiB0aGUgY29ubmVjdGlvbiBpcyBub3QgbG9nZ2VkXG4gICAgLy8gaW4uIFJldHVybnMgbm90aGluZyBvbiBzdWNjZXNzLlxuICAgIG1ldGhvZHMucmVtb3ZlT3RoZXJUb2tlbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoISB0aGlzLnVzZXJJZCkge1xuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKFwiWW91IGFyZSBub3QgbG9nZ2VkIGluLlwiKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGN1cnJlbnRUb2tlbiA9IGFjY291bnRzLl9nZXRMb2dpblRva2VuKHRoaXMuY29ubmVjdGlvbi5pZCk7XG4gICAgICBhY2NvdW50cy51c2Vycy51cGRhdGUodGhpcy51c2VySWQsIHtcbiAgICAgICAgJHB1bGw6IHtcbiAgICAgICAgICBcInNlcnZpY2VzLnJlc3VtZS5sb2dpblRva2Vuc1wiOiB7IGhhc2hlZFRva2VuOiB7ICRuZTogY3VycmVudFRva2VuIH0gfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gQWxsb3cgYSBvbmUtdGltZSBjb25maWd1cmF0aW9uIGZvciBhIGxvZ2luIHNlcnZpY2UuIE1vZGlmaWNhdGlvbnNcbiAgICAvLyB0byB0aGlzIGNvbGxlY3Rpb24gYXJlIGFsc28gYWxsb3dlZCBpbiBpbnNlY3VyZSBtb2RlLlxuICAgIG1ldGhvZHMuY29uZmlndXJlTG9naW5TZXJ2aWNlID0gKG9wdGlvbnMpID0+IHtcbiAgICAgIGNoZWNrKG9wdGlvbnMsIE1hdGNoLk9iamVjdEluY2x1ZGluZyh7c2VydmljZTogU3RyaW5nfSkpO1xuICAgICAgLy8gRG9uJ3QgbGV0IHJhbmRvbSB1c2VycyBjb25maWd1cmUgYSBzZXJ2aWNlIHdlIGhhdmVuJ3QgYWRkZWQgeWV0IChzb1xuICAgICAgLy8gdGhhdCB3aGVuIHdlIGRvIGxhdGVyIGFkZCBpdCwgaXQncyBzZXQgdXAgd2l0aCB0aGVpciBjb25maWd1cmF0aW9uXG4gICAgICAvLyBpbnN0ZWFkIG9mIG91cnMpLlxuICAgICAgLy8gWFhYIGlmIHNlcnZpY2UgY29uZmlndXJhdGlvbiBpcyBvYXV0aC1zcGVjaWZpYyB0aGVuIHRoaXMgY29kZSBzaG91bGRcbiAgICAgIC8vICAgICBiZSBpbiBhY2NvdW50cy1vYXV0aDsgaWYgaXQncyBub3QgdGhlbiB0aGUgcmVnaXN0cnkgc2hvdWxkIGJlXG4gICAgICAvLyAgICAgaW4gdGhpcyBwYWNrYWdlXG4gICAgICBpZiAoIShhY2NvdW50cy5vYXV0aFxuICAgICAgICAmJiBhY2NvdW50cy5vYXV0aC5zZXJ2aWNlTmFtZXMoKS5pbmNsdWRlcyhvcHRpb25zLnNlcnZpY2UpKSkge1xuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMywgXCJTZXJ2aWNlIHVua25vd25cIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgU2VydmljZUNvbmZpZ3VyYXRpb24gfSA9IFBhY2thZ2VbJ3NlcnZpY2UtY29uZmlndXJhdGlvbiddO1xuICAgICAgaWYgKFNlcnZpY2VDb25maWd1cmF0aW9uLmNvbmZpZ3VyYXRpb25zLmZpbmRPbmUoe3NlcnZpY2U6IG9wdGlvbnMuc2VydmljZX0pKVxuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMywgYFNlcnZpY2UgJHtvcHRpb25zLnNlcnZpY2V9IGFscmVhZHkgY29uZmlndXJlZGApO1xuXG4gICAgICBpZiAoaGFzT3duLmNhbGwob3B0aW9ucywgJ3NlY3JldCcpICYmIHVzaW5nT0F1dGhFbmNyeXB0aW9uKCkpXG4gICAgICAgIG9wdGlvbnMuc2VjcmV0ID0gT0F1dGhFbmNyeXB0aW9uLnNlYWwob3B0aW9ucy5zZWNyZXQpO1xuXG4gICAgICBTZXJ2aWNlQ29uZmlndXJhdGlvbi5jb25maWd1cmF0aW9ucy5pbnNlcnQob3B0aW9ucyk7XG4gICAgfTtcblxuICAgIGFjY291bnRzLl9zZXJ2ZXIubWV0aG9kcyhtZXRob2RzKTtcbiAgfTtcblxuICBfaW5pdEFjY291bnREYXRhSG9va3MoKSB7XG4gICAgdGhpcy5fc2VydmVyLm9uQ29ubmVjdGlvbihjb25uZWN0aW9uID0+IHtcbiAgICAgIHRoaXMuX2FjY291bnREYXRhW2Nvbm5lY3Rpb24uaWRdID0ge1xuICAgICAgICBjb25uZWN0aW9uOiBjb25uZWN0aW9uXG4gICAgICB9O1xuXG4gICAgICBjb25uZWN0aW9uLm9uQ2xvc2UoKCkgPT4ge1xuICAgICAgICB0aGlzLl9yZW1vdmVUb2tlbkZyb21Db25uZWN0aW9uKGNvbm5lY3Rpb24uaWQpO1xuICAgICAgICBkZWxldGUgdGhpcy5fYWNjb3VudERhdGFbY29ubmVjdGlvbi5pZF07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBfaW5pdFNlcnZlclB1YmxpY2F0aW9ucygpIHtcbiAgICAvLyBCcmluZyBpbnRvIGxleGljYWwgc2NvcGUgZm9yIHB1Ymxpc2ggY2FsbGJhY2tzIHRoYXQgbmVlZCBgdGhpc2BcbiAgICBjb25zdCB7IHVzZXJzLCBfYXV0b3B1Ymxpc2hGaWVsZHMsIF9kZWZhdWx0UHVibGlzaEZpZWxkcyB9ID0gdGhpcztcblxuICAgIC8vIFB1Ymxpc2ggYWxsIGxvZ2luIHNlcnZpY2UgY29uZmlndXJhdGlvbiBmaWVsZHMgb3RoZXIgdGhhbiBzZWNyZXQuXG4gICAgdGhpcy5fc2VydmVyLnB1Ymxpc2goXCJtZXRlb3IubG9naW5TZXJ2aWNlQ29uZmlndXJhdGlvblwiLCAoKSA9PiB7XG4gICAgICBjb25zdCB7IFNlcnZpY2VDb25maWd1cmF0aW9uIH0gPSBQYWNrYWdlWydzZXJ2aWNlLWNvbmZpZ3VyYXRpb24nXTtcbiAgICAgIHJldHVybiBTZXJ2aWNlQ29uZmlndXJhdGlvbi5jb25maWd1cmF0aW9ucy5maW5kKHt9LCB7ZmllbGRzOiB7c2VjcmV0OiAwfX0pO1xuICAgIH0sIHtpc19hdXRvOiB0cnVlfSk7IC8vIG5vdCB0ZWNobmljYWxseSBhdXRvcHVibGlzaCwgYnV0IHN0b3BzIHRoZSB3YXJuaW5nLlxuXG4gICAgLy8gVXNlIE1ldGVvci5zdGFydHVwIHRvIGdpdmUgb3RoZXIgcGFja2FnZXMgYSBjaGFuY2UgdG8gY2FsbFxuICAgIC8vIHNldERlZmF1bHRQdWJsaXNoRmllbGRzLlxuICAgIE1ldGVvci5zdGFydHVwKCgpID0+IHtcbiAgICAgIC8vIFB1Ymxpc2ggdGhlIGN1cnJlbnQgdXNlcidzIHJlY29yZCB0byB0aGUgY2xpZW50LlxuICAgICAgdGhpcy5fc2VydmVyLnB1Ymxpc2gobnVsbCwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy51c2VySWQpIHtcbiAgICAgICAgICByZXR1cm4gdXNlcnMuZmluZCh7XG4gICAgICAgICAgICBfaWQ6IHRoaXMudXNlcklkXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgZmllbGRzOiBfZGVmYXVsdFB1Ymxpc2hGaWVsZHMucHJvamVjdGlvbixcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSwgLypzdXBwcmVzcyBhdXRvcHVibGlzaCB3YXJuaW5nKi97aXNfYXV0bzogdHJ1ZX0pO1xuICAgIH0pO1xuXG4gICAgLy8gVXNlIE1ldGVvci5zdGFydHVwIHRvIGdpdmUgb3RoZXIgcGFja2FnZXMgYSBjaGFuY2UgdG8gY2FsbFxuICAgIC8vIGFkZEF1dG9wdWJsaXNoRmllbGRzLlxuICAgIFBhY2thZ2UuYXV0b3B1Ymxpc2ggJiYgTWV0ZW9yLnN0YXJ0dXAoKCkgPT4ge1xuICAgICAgLy8gWydwcm9maWxlJywgJ3VzZXJuYW1lJ10gLT4ge3Byb2ZpbGU6IDEsIHVzZXJuYW1lOiAxfVxuICAgICAgY29uc3QgdG9GaWVsZFNlbGVjdG9yID0gZmllbGRzID0+IGZpZWxkcy5yZWR1Y2UoKHByZXYsIGZpZWxkKSA9PiAoXG4gICAgICAgICAgeyAuLi5wcmV2LCBbZmllbGRdOiAxIH0pLFxuICAgICAgICB7fVxuICAgICAgKTtcbiAgICAgIHRoaXMuX3NlcnZlci5wdWJsaXNoKG51bGwsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMudXNlcklkKSB7XG4gICAgICAgICAgcmV0dXJuIHVzZXJzLmZpbmQoeyBfaWQ6IHRoaXMudXNlcklkIH0sIHtcbiAgICAgICAgICAgIGZpZWxkczogdG9GaWVsZFNlbGVjdG9yKF9hdXRvcHVibGlzaEZpZWxkcy5sb2dnZWRJblVzZXIpLFxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0sIC8qc3VwcHJlc3MgYXV0b3B1Ymxpc2ggd2FybmluZyove2lzX2F1dG86IHRydWV9KTtcblxuICAgICAgLy8gWFhYIHRoaXMgcHVibGlzaCBpcyBuZWl0aGVyIGRlZHVwLWFibGUgbm9yIGlzIGl0IG9wdGltaXplZCBieSBvdXIgc3BlY2lhbFxuICAgICAgLy8gdHJlYXRtZW50IG9mIHF1ZXJpZXMgb24gYSBzcGVjaWZpYyBfaWQuIFRoZXJlZm9yZSB0aGlzIHdpbGwgaGF2ZSBPKG5eMilcbiAgICAgIC8vIHJ1bi10aW1lIHBlcmZvcm1hbmNlIGV2ZXJ5IHRpbWUgYSB1c2VyIGRvY3VtZW50IGlzIGNoYW5nZWQgKGVnIHNvbWVvbmVcbiAgICAgIC8vIGxvZ2dpbmcgaW4pLiBJZiB0aGlzIGlzIGEgcHJvYmxlbSwgd2UgY2FuIGluc3RlYWQgd3JpdGUgYSBtYW51YWwgcHVibGlzaFxuICAgICAgLy8gZnVuY3Rpb24gd2hpY2ggZmlsdGVycyBvdXQgZmllbGRzIGJhc2VkIG9uICd0aGlzLnVzZXJJZCcuXG4gICAgICB0aGlzLl9zZXJ2ZXIucHVibGlzaChudWxsLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdG9yID0gdGhpcy51c2VySWQgPyB7IF9pZDogeyAkbmU6IHRoaXMudXNlcklkIH0gfSA6IHt9O1xuICAgICAgICByZXR1cm4gdXNlcnMuZmluZChzZWxlY3Rvciwge1xuICAgICAgICAgIGZpZWxkczogdG9GaWVsZFNlbGVjdG9yKF9hdXRvcHVibGlzaEZpZWxkcy5vdGhlclVzZXJzKSxcbiAgICAgICAgfSlcbiAgICAgIH0sIC8qc3VwcHJlc3MgYXV0b3B1Ymxpc2ggd2FybmluZyove2lzX2F1dG86IHRydWV9KTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBBZGQgdG8gdGhlIGxpc3Qgb2YgZmllbGRzIG9yIHN1YmZpZWxkcyB0byBiZSBhdXRvbWF0aWNhbGx5XG4gIC8vIHB1Ymxpc2hlZCBpZiBhdXRvcHVibGlzaCBpcyBvbi4gTXVzdCBiZSBjYWxsZWQgZnJvbSB0b3AtbGV2ZWxcbiAgLy8gY29kZSAoaWUsIGJlZm9yZSBNZXRlb3Iuc3RhcnR1cCBob29rcyBydW4pLlxuICAvL1xuICAvLyBAcGFyYW0gb3B0cyB7T2JqZWN0fSB3aXRoOlxuICAvLyAgIC0gZm9yTG9nZ2VkSW5Vc2VyIHtBcnJheX0gQXJyYXkgb2YgZmllbGRzIHB1Ymxpc2hlZCB0byB0aGUgbG9nZ2VkLWluIHVzZXJcbiAgLy8gICAtIGZvck90aGVyVXNlcnMge0FycmF5fSBBcnJheSBvZiBmaWVsZHMgcHVibGlzaGVkIHRvIHVzZXJzIHRoYXQgYXJlbid0IGxvZ2dlZCBpblxuICBhZGRBdXRvcHVibGlzaEZpZWxkcyhvcHRzKSB7XG4gICAgdGhpcy5fYXV0b3B1Ymxpc2hGaWVsZHMubG9nZ2VkSW5Vc2VyLnB1c2guYXBwbHkoXG4gICAgICB0aGlzLl9hdXRvcHVibGlzaEZpZWxkcy5sb2dnZWRJblVzZXIsIG9wdHMuZm9yTG9nZ2VkSW5Vc2VyKTtcbiAgICB0aGlzLl9hdXRvcHVibGlzaEZpZWxkcy5vdGhlclVzZXJzLnB1c2guYXBwbHkoXG4gICAgICB0aGlzLl9hdXRvcHVibGlzaEZpZWxkcy5vdGhlclVzZXJzLCBvcHRzLmZvck90aGVyVXNlcnMpO1xuICB9O1xuXG4gIC8vIFJlcGxhY2VzIHRoZSBmaWVsZHMgdG8gYmUgYXV0b21hdGljYWxseVxuICAvLyBwdWJsaXNoZWQgd2hlbiB0aGUgdXNlciBsb2dzIGluXG4gIC8vXG4gIC8vIEBwYXJhbSB7TW9uZ29GaWVsZFNwZWNpZmllcn0gZmllbGRzIERpY3Rpb25hcnkgb2YgZmllbGRzIHRvIHJldHVybiBvciBleGNsdWRlLlxuICBzZXREZWZhdWx0UHVibGlzaEZpZWxkcyhmaWVsZHMpIHtcbiAgICB0aGlzLl9kZWZhdWx0UHVibGlzaEZpZWxkcy5wcm9qZWN0aW9uID0gZmllbGRzO1xuICB9O1xuXG4gIC8vL1xuICAvLy8gQUNDT1VOVCBEQVRBXG4gIC8vL1xuXG4gIC8vIEhBQ0s6IFRoaXMgaXMgdXNlZCBieSAnbWV0ZW9yLWFjY291bnRzJyB0byBnZXQgdGhlIGxvZ2luVG9rZW4gZm9yIGFcbiAgLy8gY29ubmVjdGlvbi4gTWF5YmUgdGhlcmUgc2hvdWxkIGJlIGEgcHVibGljIHdheSB0byBkbyB0aGF0LlxuICBfZ2V0QWNjb3VudERhdGEoY29ubmVjdGlvbklkLCBmaWVsZCkge1xuICAgIGNvbnN0IGRhdGEgPSB0aGlzLl9hY2NvdW50RGF0YVtjb25uZWN0aW9uSWRdO1xuICAgIHJldHVybiBkYXRhICYmIGRhdGFbZmllbGRdO1xuICB9O1xuXG4gIF9zZXRBY2NvdW50RGF0YShjb25uZWN0aW9uSWQsIGZpZWxkLCB2YWx1ZSkge1xuICAgIGNvbnN0IGRhdGEgPSB0aGlzLl9hY2NvdW50RGF0YVtjb25uZWN0aW9uSWRdO1xuXG4gICAgLy8gc2FmZXR5IGJlbHQuIHNob3VsZG4ndCBoYXBwZW4uIGFjY291bnREYXRhIGlzIHNldCBpbiBvbkNvbm5lY3Rpb24sXG4gICAgLy8gd2UgZG9uJ3QgaGF2ZSBhIGNvbm5lY3Rpb25JZCB1bnRpbCBpdCBpcyBzZXQuXG4gICAgaWYgKCFkYXRhKVxuICAgICAgcmV0dXJuO1xuXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICBkZWxldGUgZGF0YVtmaWVsZF07XG4gICAgZWxzZVxuICAgICAgZGF0YVtmaWVsZF0gPSB2YWx1ZTtcbiAgfTtcblxuICAvLy9cbiAgLy8vIFJFQ09OTkVDVCBUT0tFTlNcbiAgLy8vXG4gIC8vLyBzdXBwb3J0IHJlY29ubmVjdGluZyB1c2luZyBhIG1ldGVvciBsb2dpbiB0b2tlblxuXG4gIF9oYXNoTG9naW5Ub2tlbihsb2dpblRva2VuKSB7XG4gICAgY29uc3QgaGFzaCA9IGNyeXB0by5jcmVhdGVIYXNoKCdzaGEyNTYnKTtcbiAgICBoYXNoLnVwZGF0ZShsb2dpblRva2VuKTtcbiAgICByZXR1cm4gaGFzaC5kaWdlc3QoJ2Jhc2U2NCcpO1xuICB9O1xuXG4gIC8vIHt0b2tlbiwgd2hlbn0gPT4ge2hhc2hlZFRva2VuLCB3aGVufVxuICBfaGFzaFN0YW1wZWRUb2tlbihzdGFtcGVkVG9rZW4pIHtcbiAgICBjb25zdCB7IHRva2VuLCAuLi5oYXNoZWRTdGFtcGVkVG9rZW4gfSA9IHN0YW1wZWRUb2tlbjtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uaGFzaGVkU3RhbXBlZFRva2VuLFxuICAgICAgaGFzaGVkVG9rZW46IHRoaXMuX2hhc2hMb2dpblRva2VuKHRva2VuKVxuICAgIH07XG4gIH07XG5cbiAgLy8gVXNpbmcgJGFkZFRvU2V0IGF2b2lkcyBnZXR0aW5nIGFuIGluZGV4IGVycm9yIGlmIGFub3RoZXIgY2xpZW50XG4gIC8vIGxvZ2dpbmcgaW4gc2ltdWx0YW5lb3VzbHkgaGFzIGFscmVhZHkgaW5zZXJ0ZWQgdGhlIG5ldyBoYXNoZWRcbiAgLy8gdG9rZW4uXG4gIF9pbnNlcnRIYXNoZWRMb2dpblRva2VuKHVzZXJJZCwgaGFzaGVkVG9rZW4sIHF1ZXJ5KSB7XG4gICAgcXVlcnkgPSBxdWVyeSA/IHsgLi4ucXVlcnkgfSA6IHt9O1xuICAgIHF1ZXJ5Ll9pZCA9IHVzZXJJZDtcbiAgICB0aGlzLnVzZXJzLnVwZGF0ZShxdWVyeSwge1xuICAgICAgJGFkZFRvU2V0OiB7XG4gICAgICAgIFwic2VydmljZXMucmVzdW1lLmxvZ2luVG9rZW5zXCI6IGhhc2hlZFRva2VuXG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gRXhwb3J0ZWQgZm9yIHRlc3RzLlxuICBfaW5zZXJ0TG9naW5Ub2tlbih1c2VySWQsIHN0YW1wZWRUb2tlbiwgcXVlcnkpIHtcbiAgICB0aGlzLl9pbnNlcnRIYXNoZWRMb2dpblRva2VuKFxuICAgICAgdXNlcklkLFxuICAgICAgdGhpcy5faGFzaFN0YW1wZWRUb2tlbihzdGFtcGVkVG9rZW4pLFxuICAgICAgcXVlcnlcbiAgICApO1xuICB9O1xuXG4gIF9jbGVhckFsbExvZ2luVG9rZW5zKHVzZXJJZCkge1xuICAgIHRoaXMudXNlcnMudXBkYXRlKHVzZXJJZCwge1xuICAgICAgJHNldDoge1xuICAgICAgICAnc2VydmljZXMucmVzdW1lLmxvZ2luVG9rZW5zJzogW11cbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICAvLyB0ZXN0IGhvb2tcbiAgX2dldFVzZXJPYnNlcnZlKGNvbm5lY3Rpb25JZCkge1xuICAgIHJldHVybiB0aGlzLl91c2VyT2JzZXJ2ZXNGb3JDb25uZWN0aW9uc1tjb25uZWN0aW9uSWRdO1xuICB9O1xuXG4gIC8vIENsZWFuIHVwIHRoaXMgY29ubmVjdGlvbidzIGFzc29jaWF0aW9uIHdpdGggdGhlIHRva2VuOiB0aGF0IGlzLCBzdG9wXG4gIC8vIHRoZSBvYnNlcnZlIHRoYXQgd2Ugc3RhcnRlZCB3aGVuIHdlIGFzc29jaWF0ZWQgdGhlIGNvbm5lY3Rpb24gd2l0aFxuICAvLyB0aGlzIHRva2VuLlxuICBfcmVtb3ZlVG9rZW5Gcm9tQ29ubmVjdGlvbihjb25uZWN0aW9uSWQpIHtcbiAgICBpZiAoaGFzT3duLmNhbGwodGhpcy5fdXNlck9ic2VydmVzRm9yQ29ubmVjdGlvbnMsIGNvbm5lY3Rpb25JZCkpIHtcbiAgICAgIGNvbnN0IG9ic2VydmUgPSB0aGlzLl91c2VyT2JzZXJ2ZXNGb3JDb25uZWN0aW9uc1tjb25uZWN0aW9uSWRdO1xuICAgICAgaWYgKHR5cGVvZiBvYnNlcnZlID09PSAnbnVtYmVyJykge1xuICAgICAgICAvLyBXZSdyZSBpbiB0aGUgcHJvY2VzcyBvZiBzZXR0aW5nIHVwIGFuIG9ic2VydmUgZm9yIHRoaXMgY29ubmVjdGlvbi4gV2VcbiAgICAgICAgLy8gY2FuJ3QgY2xlYW4gdXAgdGhhdCBvYnNlcnZlIHlldCwgYnV0IGlmIHdlIGRlbGV0ZSB0aGUgcGxhY2Vob2xkZXIgZm9yXG4gICAgICAgIC8vIHRoaXMgY29ubmVjdGlvbiwgdGhlbiB0aGUgb2JzZXJ2ZSB3aWxsIGdldCBjbGVhbmVkIHVwIGFzIHNvb24gYXMgaXQgaGFzXG4gICAgICAgIC8vIGJlZW4gc2V0IHVwLlxuICAgICAgICBkZWxldGUgdGhpcy5fdXNlck9ic2VydmVzRm9yQ29ubmVjdGlvbnNbY29ubmVjdGlvbklkXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLl91c2VyT2JzZXJ2ZXNGb3JDb25uZWN0aW9uc1tjb25uZWN0aW9uSWRdO1xuICAgICAgICBvYnNlcnZlLnN0b3AoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgX2dldExvZ2luVG9rZW4oY29ubmVjdGlvbklkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldEFjY291bnREYXRhKGNvbm5lY3Rpb25JZCwgJ2xvZ2luVG9rZW4nKTtcbiAgfTtcblxuICAvLyBuZXdUb2tlbiBpcyBhIGhhc2hlZCB0b2tlbi5cbiAgX3NldExvZ2luVG9rZW4odXNlcklkLCBjb25uZWN0aW9uLCBuZXdUb2tlbikge1xuICAgIHRoaXMuX3JlbW92ZVRva2VuRnJvbUNvbm5lY3Rpb24oY29ubmVjdGlvbi5pZCk7XG4gICAgdGhpcy5fc2V0QWNjb3VudERhdGEoY29ubmVjdGlvbi5pZCwgJ2xvZ2luVG9rZW4nLCBuZXdUb2tlbik7XG5cbiAgICBpZiAobmV3VG9rZW4pIHtcbiAgICAgIC8vIFNldCB1cCBhbiBvYnNlcnZlIGZvciB0aGlzIHRva2VuLiBJZiB0aGUgdG9rZW4gZ29lcyBhd2F5LCB3ZSBuZWVkXG4gICAgICAvLyB0byBjbG9zZSB0aGUgY29ubmVjdGlvbi4gIFdlIGRlZmVyIHRoZSBvYnNlcnZlIGJlY2F1c2UgdGhlcmUnc1xuICAgICAgLy8gbm8gbmVlZCBmb3IgaXQgdG8gYmUgb24gdGhlIGNyaXRpY2FsIHBhdGggZm9yIGxvZ2luOyB3ZSBqdXN0IG5lZWRcbiAgICAgIC8vIHRvIGVuc3VyZSB0aGF0IHRoZSBjb25uZWN0aW9uIHdpbGwgZ2V0IGNsb3NlZCBhdCBzb21lIHBvaW50IGlmXG4gICAgICAvLyB0aGUgdG9rZW4gZ2V0cyBkZWxldGVkLlxuICAgICAgLy9cbiAgICAgIC8vIEluaXRpYWxseSwgd2Ugc2V0IHRoZSBvYnNlcnZlIGZvciB0aGlzIGNvbm5lY3Rpb24gdG8gYSBudW1iZXI7IHRoaXNcbiAgICAgIC8vIHNpZ25pZmllcyB0byBvdGhlciBjb2RlICh3aGljaCBtaWdodCBydW4gd2hpbGUgd2UgeWllbGQpIHRoYXQgd2UgYXJlIGluXG4gICAgICAvLyB0aGUgcHJvY2VzcyBvZiBzZXR0aW5nIHVwIGFuIG9ic2VydmUgZm9yIHRoaXMgY29ubmVjdGlvbi4gT25jZSB0aGVcbiAgICAgIC8vIG9ic2VydmUgaXMgcmVhZHkgdG8gZ28sIHdlIHJlcGxhY2UgdGhlIG51bWJlciB3aXRoIHRoZSByZWFsIG9ic2VydmVcbiAgICAgIC8vIGhhbmRsZSAodW5sZXNzIHRoZSBwbGFjZWhvbGRlciBoYXMgYmVlbiBkZWxldGVkIG9yIHJlcGxhY2VkIGJ5IGFcbiAgICAgIC8vIGRpZmZlcmVudCBwbGFjZWhvbGQgbnVtYmVyLCBzaWduaWZ5aW5nIHRoYXQgdGhlIGNvbm5lY3Rpb24gd2FzIGNsb3NlZFxuICAgICAgLy8gYWxyZWFkeSAtLSBpbiB0aGlzIGNhc2Ugd2UganVzdCBjbGVhbiB1cCB0aGUgb2JzZXJ2ZSB0aGF0IHdlIHN0YXJ0ZWQpLlxuICAgICAgY29uc3QgbXlPYnNlcnZlTnVtYmVyID0gKyt0aGlzLl9uZXh0VXNlck9ic2VydmVOdW1iZXI7XG4gICAgICB0aGlzLl91c2VyT2JzZXJ2ZXNGb3JDb25uZWN0aW9uc1tjb25uZWN0aW9uLmlkXSA9IG15T2JzZXJ2ZU51bWJlcjtcbiAgICAgIE1ldGVvci5kZWZlcigoKSA9PiB7XG4gICAgICAgIC8vIElmIHNvbWV0aGluZyBlbHNlIGhhcHBlbmVkIG9uIHRoaXMgY29ubmVjdGlvbiBpbiB0aGUgbWVhbnRpbWUgKGl0IGdvdFxuICAgICAgICAvLyBjbG9zZWQsIG9yIGFub3RoZXIgY2FsbCB0byBfc2V0TG9naW5Ub2tlbiBoYXBwZW5lZCksIGp1c3QgZG9cbiAgICAgICAgLy8gbm90aGluZy4gV2UgZG9uJ3QgbmVlZCB0byBzdGFydCBhbiBvYnNlcnZlIGZvciBhbiBvbGQgY29ubmVjdGlvbiBvciBvbGRcbiAgICAgICAgLy8gdG9rZW4uXG4gICAgICAgIGlmICh0aGlzLl91c2VyT2JzZXJ2ZXNGb3JDb25uZWN0aW9uc1tjb25uZWN0aW9uLmlkXSAhPT0gbXlPYnNlcnZlTnVtYmVyKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZvdW5kTWF0Y2hpbmdVc2VyO1xuICAgICAgICAvLyBCZWNhdXNlIHdlIHVwZ3JhZGUgdW5oYXNoZWQgbG9naW4gdG9rZW5zIHRvIGhhc2hlZCB0b2tlbnMgYXRcbiAgICAgICAgLy8gbG9naW4gdGltZSwgc2Vzc2lvbnMgd2lsbCBvbmx5IGJlIGxvZ2dlZCBpbiB3aXRoIGEgaGFzaGVkXG4gICAgICAgIC8vIHRva2VuLiBUaHVzIHdlIG9ubHkgbmVlZCB0byBvYnNlcnZlIGhhc2hlZCB0b2tlbnMgaGVyZS5cbiAgICAgICAgY29uc3Qgb2JzZXJ2ZSA9IHRoaXMudXNlcnMuZmluZCh7XG4gICAgICAgICAgX2lkOiB1c2VySWQsXG4gICAgICAgICAgJ3NlcnZpY2VzLnJlc3VtZS5sb2dpblRva2Vucy5oYXNoZWRUb2tlbic6IG5ld1Rva2VuXG4gICAgICAgIH0sIHsgZmllbGRzOiB7IF9pZDogMSB9IH0pLm9ic2VydmVDaGFuZ2VzKHtcbiAgICAgICAgICBhZGRlZDogKCkgPT4ge1xuICAgICAgICAgICAgZm91bmRNYXRjaGluZ1VzZXIgPSB0cnVlO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVtb3ZlZDogY29ubmVjdGlvbi5jbG9zZSxcbiAgICAgICAgICAvLyBUaGUgb25DbG9zZSBjYWxsYmFjayBmb3IgdGhlIGNvbm5lY3Rpb24gdGFrZXMgY2FyZSBvZlxuICAgICAgICAgIC8vIGNsZWFuaW5nIHVwIHRoZSBvYnNlcnZlIGhhbmRsZSBhbmQgYW55IG90aGVyIHN0YXRlIHdlIGhhdmVcbiAgICAgICAgICAvLyBseWluZyBhcm91bmQuXG4gICAgICAgIH0sIHsgbm9uTXV0YXRpbmdDYWxsYmFja3M6IHRydWUgfSk7XG5cbiAgICAgICAgLy8gSWYgdGhlIHVzZXIgcmFuIGFub3RoZXIgbG9naW4gb3IgbG9nb3V0IGNvbW1hbmQgd2Ugd2VyZSB3YWl0aW5nIGZvciB0aGVcbiAgICAgICAgLy8gZGVmZXIgb3IgYWRkZWQgdG8gZmlyZSAoaWUsIGFub3RoZXIgY2FsbCB0byBfc2V0TG9naW5Ub2tlbiBvY2N1cnJlZCksXG4gICAgICAgIC8vIHRoZW4gd2UgbGV0IHRoZSBsYXRlciBvbmUgd2luIChzdGFydCBhbiBvYnNlcnZlLCBldGMpIGFuZCBqdXN0IHN0b3Agb3VyXG4gICAgICAgIC8vIG9ic2VydmUgbm93LlxuICAgICAgICAvL1xuICAgICAgICAvLyBTaW1pbGFybHksIGlmIHRoZSBjb25uZWN0aW9uIHdhcyBhbHJlYWR5IGNsb3NlZCwgdGhlbiB0aGUgb25DbG9zZVxuICAgICAgICAvLyBjYWxsYmFjayB3b3VsZCBoYXZlIGNhbGxlZCBfcmVtb3ZlVG9rZW5Gcm9tQ29ubmVjdGlvbiBhbmQgdGhlcmUgd29uJ3RcbiAgICAgICAgLy8gYmUgYW4gZW50cnkgaW4gX3VzZXJPYnNlcnZlc0ZvckNvbm5lY3Rpb25zLiBXZSBjYW4gc3RvcCB0aGUgb2JzZXJ2ZS5cbiAgICAgICAgaWYgKHRoaXMuX3VzZXJPYnNlcnZlc0ZvckNvbm5lY3Rpb25zW2Nvbm5lY3Rpb24uaWRdICE9PSBteU9ic2VydmVOdW1iZXIpIHtcbiAgICAgICAgICBvYnNlcnZlLnN0b3AoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl91c2VyT2JzZXJ2ZXNGb3JDb25uZWN0aW9uc1tjb25uZWN0aW9uLmlkXSA9IG9ic2VydmU7XG5cbiAgICAgICAgaWYgKCEgZm91bmRNYXRjaGluZ1VzZXIpIHtcbiAgICAgICAgICAvLyBXZSd2ZSBzZXQgdXAgYW4gb2JzZXJ2ZSBvbiB0aGUgdXNlciBhc3NvY2lhdGVkIHdpdGggYG5ld1Rva2VuYCxcbiAgICAgICAgICAvLyBzbyBpZiB0aGUgbmV3IHRva2VuIGlzIHJlbW92ZWQgZnJvbSB0aGUgZGF0YWJhc2UsIHdlJ2xsIGNsb3NlXG4gICAgICAgICAgLy8gdGhlIGNvbm5lY3Rpb24uIEJ1dCB0aGUgdG9rZW4gbWlnaHQgaGF2ZSBhbHJlYWR5IGJlZW4gZGVsZXRlZFxuICAgICAgICAgIC8vIGJlZm9yZSB3ZSBzZXQgdXAgdGhlIG9ic2VydmUsIHdoaWNoIHdvdWxkbid0IGhhdmUgY2xvc2VkIHRoZVxuICAgICAgICAgIC8vIGNvbm5lY3Rpb24gYmVjYXVzZSB0aGUgb2JzZXJ2ZSB3YXNuJ3QgcnVubmluZyB5ZXQuXG4gICAgICAgICAgY29ubmVjdGlvbi5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgLy8gKEFsc28gdXNlZCBieSBNZXRlb3IgQWNjb3VudHMgc2VydmVyIGFuZCB0ZXN0cykuXG4gIC8vXG4gIF9nZW5lcmF0ZVN0YW1wZWRMb2dpblRva2VuKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0b2tlbjogUmFuZG9tLnNlY3JldCgpLFxuICAgICAgd2hlbjogbmV3IERhdGVcbiAgICB9O1xuICB9O1xuXG4gIC8vL1xuICAvLy8gVE9LRU4gRVhQSVJBVElPTlxuICAvLy9cblxuICAvLyBEZWxldGVzIGV4cGlyZWQgcGFzc3dvcmQgcmVzZXQgdG9rZW5zIGZyb20gdGhlIGRhdGFiYXNlLlxuICAvL1xuICAvLyBFeHBvcnRlZCBmb3IgdGVzdHMuIEFsc28sIHRoZSBhcmd1bWVudHMgYXJlIG9ubHkgdXNlZCBieVxuICAvLyB0ZXN0cy4gb2xkZXN0VmFsaWREYXRlIGlzIHNpbXVsYXRlIGV4cGlyaW5nIHRva2VucyB3aXRob3V0IHdhaXRpbmdcbiAgLy8gZm9yIHRoZW0gdG8gYWN0dWFsbHkgZXhwaXJlLiB1c2VySWQgaXMgdXNlZCBieSB0ZXN0cyB0byBvbmx5IGV4cGlyZVxuICAvLyB0b2tlbnMgZm9yIHRoZSB0ZXN0IHVzZXIuXG4gIF9leHBpcmVQYXNzd29yZFJlc2V0VG9rZW5zKG9sZGVzdFZhbGlkRGF0ZSwgdXNlcklkKSB7XG4gICAgY29uc3QgdG9rZW5MaWZldGltZU1zID0gdGhpcy5fZ2V0UGFzc3dvcmRSZXNldFRva2VuTGlmZXRpbWVNcygpO1xuXG4gICAgLy8gd2hlbiBjYWxsaW5nIGZyb20gYSB0ZXN0IHdpdGggZXh0cmEgYXJndW1lbnRzLCB5b3UgbXVzdCBzcGVjaWZ5IGJvdGghXG4gICAgaWYgKChvbGRlc3RWYWxpZERhdGUgJiYgIXVzZXJJZCkgfHwgKCFvbGRlc3RWYWxpZERhdGUgJiYgdXNlcklkKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmFkIHRlc3QuIE11c3Qgc3BlY2lmeSBib3RoIG9sZGVzdFZhbGlkRGF0ZSBhbmQgdXNlcklkLlwiKTtcbiAgICB9XG5cbiAgICBvbGRlc3RWYWxpZERhdGUgPSBvbGRlc3RWYWxpZERhdGUgfHxcbiAgICAgIChuZXcgRGF0ZShuZXcgRGF0ZSgpIC0gdG9rZW5MaWZldGltZU1zKSk7XG5cbiAgICBjb25zdCB0b2tlbkZpbHRlciA9IHtcbiAgICAgICRvcjogW1xuICAgICAgICB7IFwic2VydmljZXMucGFzc3dvcmQucmVzZXQucmVhc29uXCI6IFwicmVzZXRcIn0sXG4gICAgICAgIHsgXCJzZXJ2aWNlcy5wYXNzd29yZC5yZXNldC5yZWFzb25cIjogeyRleGlzdHM6IGZhbHNlfX1cbiAgICAgIF1cbiAgICB9O1xuXG4gICAgZXhwaXJlUGFzc3dvcmRUb2tlbih0aGlzLCBvbGRlc3RWYWxpZERhdGUsIHRva2VuRmlsdGVyLCB1c2VySWQpO1xuICB9XG5cbiAgLy8gRGVsZXRlcyBleHBpcmVkIHBhc3N3b3JkIGVucm9sbCB0b2tlbnMgZnJvbSB0aGUgZGF0YWJhc2UuXG4gIC8vXG4gIC8vIEV4cG9ydGVkIGZvciB0ZXN0cy4gQWxzbywgdGhlIGFyZ3VtZW50cyBhcmUgb25seSB1c2VkIGJ5XG4gIC8vIHRlc3RzLiBvbGRlc3RWYWxpZERhdGUgaXMgc2ltdWxhdGUgZXhwaXJpbmcgdG9rZW5zIHdpdGhvdXQgd2FpdGluZ1xuICAvLyBmb3IgdGhlbSB0byBhY3R1YWxseSBleHBpcmUuIHVzZXJJZCBpcyB1c2VkIGJ5IHRlc3RzIHRvIG9ubHkgZXhwaXJlXG4gIC8vIHRva2VucyBmb3IgdGhlIHRlc3QgdXNlci5cbiAgX2V4cGlyZVBhc3N3b3JkRW5yb2xsVG9rZW5zKG9sZGVzdFZhbGlkRGF0ZSwgdXNlcklkKSB7XG4gICAgY29uc3QgdG9rZW5MaWZldGltZU1zID0gdGhpcy5fZ2V0UGFzc3dvcmRFbnJvbGxUb2tlbkxpZmV0aW1lTXMoKTtcblxuICAgIC8vIHdoZW4gY2FsbGluZyBmcm9tIGEgdGVzdCB3aXRoIGV4dHJhIGFyZ3VtZW50cywgeW91IG11c3Qgc3BlY2lmeSBib3RoIVxuICAgIGlmICgob2xkZXN0VmFsaWREYXRlICYmICF1c2VySWQpIHx8ICghb2xkZXN0VmFsaWREYXRlICYmIHVzZXJJZCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkJhZCB0ZXN0LiBNdXN0IHNwZWNpZnkgYm90aCBvbGRlc3RWYWxpZERhdGUgYW5kIHVzZXJJZC5cIik7XG4gICAgfVxuXG4gICAgb2xkZXN0VmFsaWREYXRlID0gb2xkZXN0VmFsaWREYXRlIHx8XG4gICAgICAobmV3IERhdGUobmV3IERhdGUoKSAtIHRva2VuTGlmZXRpbWVNcykpO1xuXG4gICAgY29uc3QgdG9rZW5GaWx0ZXIgPSB7XG4gICAgICBcInNlcnZpY2VzLnBhc3N3b3JkLmVucm9sbC5yZWFzb25cIjogXCJlbnJvbGxcIlxuICAgIH07XG5cbiAgICBleHBpcmVQYXNzd29yZFRva2VuKHRoaXMsIG9sZGVzdFZhbGlkRGF0ZSwgdG9rZW5GaWx0ZXIsIHVzZXJJZCk7XG4gIH1cblxuICAvLyBEZWxldGVzIGV4cGlyZWQgdG9rZW5zIGZyb20gdGhlIGRhdGFiYXNlIGFuZCBjbG9zZXMgYWxsIG9wZW4gY29ubmVjdGlvbnNcbiAgLy8gYXNzb2NpYXRlZCB3aXRoIHRoZXNlIHRva2Vucy5cbiAgLy9cbiAgLy8gRXhwb3J0ZWQgZm9yIHRlc3RzLiBBbHNvLCB0aGUgYXJndW1lbnRzIGFyZSBvbmx5IHVzZWQgYnlcbiAgLy8gdGVzdHMuIG9sZGVzdFZhbGlkRGF0ZSBpcyBzaW11bGF0ZSBleHBpcmluZyB0b2tlbnMgd2l0aG91dCB3YWl0aW5nXG4gIC8vIGZvciB0aGVtIHRvIGFjdHVhbGx5IGV4cGlyZS4gdXNlcklkIGlzIHVzZWQgYnkgdGVzdHMgdG8gb25seSBleHBpcmVcbiAgLy8gdG9rZW5zIGZvciB0aGUgdGVzdCB1c2VyLlxuICBfZXhwaXJlVG9rZW5zKG9sZGVzdFZhbGlkRGF0ZSwgdXNlcklkKSB7XG4gICAgY29uc3QgdG9rZW5MaWZldGltZU1zID0gdGhpcy5fZ2V0VG9rZW5MaWZldGltZU1zKCk7XG5cbiAgICAvLyB3aGVuIGNhbGxpbmcgZnJvbSBhIHRlc3Qgd2l0aCBleHRyYSBhcmd1bWVudHMsIHlvdSBtdXN0IHNwZWNpZnkgYm90aCFcbiAgICBpZiAoKG9sZGVzdFZhbGlkRGF0ZSAmJiAhdXNlcklkKSB8fCAoIW9sZGVzdFZhbGlkRGF0ZSAmJiB1c2VySWQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCYWQgdGVzdC4gTXVzdCBzcGVjaWZ5IGJvdGggb2xkZXN0VmFsaWREYXRlIGFuZCB1c2VySWQuXCIpO1xuICAgIH1cblxuICAgIG9sZGVzdFZhbGlkRGF0ZSA9IG9sZGVzdFZhbGlkRGF0ZSB8fFxuICAgICAgKG5ldyBEYXRlKG5ldyBEYXRlKCkgLSB0b2tlbkxpZmV0aW1lTXMpKTtcbiAgICBjb25zdCB1c2VyRmlsdGVyID0gdXNlcklkID8ge19pZDogdXNlcklkfSA6IHt9O1xuXG5cbiAgICAvLyBCYWNrd2FyZHMgY29tcGF0aWJsZSB3aXRoIG9sZGVyIHZlcnNpb25zIG9mIG1ldGVvciB0aGF0IHN0b3JlZCBsb2dpbiB0b2tlblxuICAgIC8vIHRpbWVzdGFtcHMgYXMgbnVtYmVycy5cbiAgICB0aGlzLnVzZXJzLnVwZGF0ZSh7IC4uLnVzZXJGaWx0ZXIsXG4gICAgICAkb3I6IFtcbiAgICAgICAgeyBcInNlcnZpY2VzLnJlc3VtZS5sb2dpblRva2Vucy53aGVuXCI6IHsgJGx0OiBvbGRlc3RWYWxpZERhdGUgfSB9LFxuICAgICAgICB7IFwic2VydmljZXMucmVzdW1lLmxvZ2luVG9rZW5zLndoZW5cIjogeyAkbHQ6ICtvbGRlc3RWYWxpZERhdGUgfSB9XG4gICAgICBdXG4gICAgfSwge1xuICAgICAgJHB1bGw6IHtcbiAgICAgICAgXCJzZXJ2aWNlcy5yZXN1bWUubG9naW5Ub2tlbnNcIjoge1xuICAgICAgICAgICRvcjogW1xuICAgICAgICAgICAgeyB3aGVuOiB7ICRsdDogb2xkZXN0VmFsaWREYXRlIH0gfSxcbiAgICAgICAgICAgIHsgd2hlbjogeyAkbHQ6ICtvbGRlc3RWYWxpZERhdGUgfSB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgeyBtdWx0aTogdHJ1ZSB9KTtcbiAgICAvLyBUaGUgb2JzZXJ2ZSBvbiBNZXRlb3IudXNlcnMgd2lsbCB0YWtlIGNhcmUgb2YgY2xvc2luZyBjb25uZWN0aW9ucyBmb3JcbiAgICAvLyBleHBpcmVkIHRva2Vucy5cbiAgfTtcblxuICAvLyBAb3ZlcnJpZGUgZnJvbSBhY2NvdW50c19jb21tb24uanNcbiAgY29uZmlnKG9wdGlvbnMpIHtcbiAgICAvLyBDYWxsIHRoZSBvdmVycmlkZGVuIGltcGxlbWVudGF0aW9uIG9mIHRoZSBtZXRob2QuXG4gICAgY29uc3Qgc3VwZXJSZXN1bHQgPSBBY2NvdW50c0NvbW1vbi5wcm90b3R5cGUuY29uZmlnLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICAvLyBJZiB0aGUgdXNlciBzZXQgbG9naW5FeHBpcmF0aW9uSW5EYXlzIHRvIG51bGwsIHRoZW4gd2UgbmVlZCB0byBjbGVhciB0aGVcbiAgICAvLyB0aW1lciB0aGF0IHBlcmlvZGljYWxseSBleHBpcmVzIHRva2Vucy5cbiAgICBpZiAoaGFzT3duLmNhbGwodGhpcy5fb3B0aW9ucywgJ2xvZ2luRXhwaXJhdGlvbkluRGF5cycpICYmXG4gICAgICB0aGlzLl9vcHRpb25zLmxvZ2luRXhwaXJhdGlvbkluRGF5cyA9PT0gbnVsbCAmJlxuICAgICAgdGhpcy5leHBpcmVUb2tlbkludGVydmFsKSB7XG4gICAgICBNZXRlb3IuY2xlYXJJbnRlcnZhbCh0aGlzLmV4cGlyZVRva2VuSW50ZXJ2YWwpO1xuICAgICAgdGhpcy5leHBpcmVUb2tlbkludGVydmFsID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gc3VwZXJSZXN1bHQ7XG4gIH07XG5cbiAgLy8gQ2FsbGVkIGJ5IGFjY291bnRzLXBhc3N3b3JkXG4gIGluc2VydFVzZXJEb2Mob3B0aW9ucywgdXNlcikge1xuICAgIC8vIC0gY2xvbmUgdXNlciBkb2N1bWVudCwgdG8gcHJvdGVjdCBmcm9tIG1vZGlmaWNhdGlvblxuICAgIC8vIC0gYWRkIGNyZWF0ZWRBdCB0aW1lc3RhbXBcbiAgICAvLyAtIHByZXBhcmUgYW4gX2lkLCBzbyB0aGF0IHlvdSBjYW4gbW9kaWZ5IG90aGVyIGNvbGxlY3Rpb25zIChlZ1xuICAgIC8vIGNyZWF0ZSBhIGZpcnN0IHRhc2sgZm9yIGV2ZXJ5IG5ldyB1c2VyKVxuICAgIC8vXG4gICAgLy8gWFhYIElmIHRoZSBvbkNyZWF0ZVVzZXIgb3IgdmFsaWRhdGVOZXdVc2VyIGhvb2tzIGZhaWwsIHdlIG1pZ2h0XG4gICAgLy8gZW5kIHVwIGhhdmluZyBtb2RpZmllZCBzb21lIG90aGVyIGNvbGxlY3Rpb25cbiAgICAvLyBpbmFwcHJvcHJpYXRlbHkuIFRoZSBzb2x1dGlvbiBpcyBwcm9iYWJseSB0byBoYXZlIG9uQ3JlYXRlVXNlclxuICAgIC8vIGFjY2VwdCB0d28gY2FsbGJhY2tzIC0gb25lIHRoYXQgZ2V0cyBjYWxsZWQgYmVmb3JlIGluc2VydGluZ1xuICAgIC8vIHRoZSB1c2VyIGRvY3VtZW50IChpbiB3aGljaCB5b3UgY2FuIG1vZGlmeSBpdHMgY29udGVudHMpLCBhbmRcbiAgICAvLyBvbmUgdGhhdCBnZXRzIGNhbGxlZCBhZnRlciAoaW4gd2hpY2ggeW91IHNob3VsZCBjaGFuZ2Ugb3RoZXJcbiAgICAvLyBjb2xsZWN0aW9ucylcbiAgICB1c2VyID0ge1xuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpLFxuICAgICAgX2lkOiBSYW5kb20uaWQoKSxcbiAgICAgIC4uLnVzZXIsXG4gICAgfTtcblxuICAgIGlmICh1c2VyLnNlcnZpY2VzKSB7XG4gICAgICBPYmplY3Qua2V5cyh1c2VyLnNlcnZpY2VzKS5mb3JFYWNoKHNlcnZpY2UgPT5cbiAgICAgICAgcGluRW5jcnlwdGVkRmllbGRzVG9Vc2VyKHVzZXIuc2VydmljZXNbc2VydmljZV0sIHVzZXIuX2lkKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBsZXQgZnVsbFVzZXI7XG4gICAgaWYgKHRoaXMuX29uQ3JlYXRlVXNlckhvb2spIHtcbiAgICAgIGZ1bGxVc2VyID0gdGhpcy5fb25DcmVhdGVVc2VySG9vayhvcHRpb25zLCB1c2VyKTtcblxuICAgICAgLy8gVGhpcyBpcyAqbm90KiBwYXJ0IG9mIHRoZSBBUEkuIFdlIG5lZWQgdGhpcyBiZWNhdXNlIHdlIGNhbid0IGlzb2xhdGVcbiAgICAgIC8vIHRoZSBnbG9iYWwgc2VydmVyIGVudmlyb25tZW50IGJldHdlZW4gdGVzdHMsIG1lYW5pbmcgd2UgY2FuJ3QgdGVzdFxuICAgICAgLy8gYm90aCBoYXZpbmcgYSBjcmVhdGUgdXNlciBob29rIHNldCBhbmQgbm90IGhhdmluZyBvbmUgc2V0LlxuICAgICAgaWYgKGZ1bGxVc2VyID09PSAnVEVTVCBERUZBVUxUIEhPT0snKVxuICAgICAgICBmdWxsVXNlciA9IGRlZmF1bHRDcmVhdGVVc2VySG9vayhvcHRpb25zLCB1c2VyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZnVsbFVzZXIgPSBkZWZhdWx0Q3JlYXRlVXNlckhvb2sob3B0aW9ucywgdXNlcik7XG4gICAgfVxuXG4gICAgdGhpcy5fdmFsaWRhdGVOZXdVc2VySG9va3MuZm9yRWFjaChob29rID0+IHtcbiAgICAgIGlmICghIGhvb2soZnVsbFVzZXIpKVxuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMywgXCJVc2VyIHZhbGlkYXRpb24gZmFpbGVkXCIpO1xuICAgIH0pO1xuXG4gICAgbGV0IHVzZXJJZDtcbiAgICB0cnkge1xuICAgICAgdXNlcklkID0gdGhpcy51c2Vycy5pbnNlcnQoZnVsbFVzZXIpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIFhYWCBzdHJpbmcgcGFyc2luZyBzdWNrcywgbWF5YmVcbiAgICAgIC8vIGh0dHBzOi8vamlyYS5tb25nb2RiLm9yZy9icm93c2UvU0VSVkVSLTMwNjkgd2lsbCBnZXQgZml4ZWQgb25lIGRheVxuICAgICAgLy8gaHR0cHM6Ly9qaXJhLm1vbmdvZGIub3JnL2Jyb3dzZS9TRVJWRVItNDYzN1xuICAgICAgaWYgKCFlLmVycm1zZykgdGhyb3cgZTtcbiAgICAgIGlmIChlLmVycm1zZy5pbmNsdWRlcygnZW1haWxzLmFkZHJlc3MnKSlcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDMsIFwiRW1haWwgYWxyZWFkeSBleGlzdHMuXCIpO1xuICAgICAgaWYgKGUuZXJybXNnLmluY2x1ZGVzKCd1c2VybmFtZScpKVxuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMywgXCJVc2VybmFtZSBhbHJlYWR5IGV4aXN0cy5cIik7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgICByZXR1cm4gdXNlcklkO1xuICB9O1xuXG4gIC8vIEhlbHBlciBmdW5jdGlvbjogcmV0dXJucyBmYWxzZSBpZiBlbWFpbCBkb2VzIG5vdCBtYXRjaCBjb21wYW55IGRvbWFpbiBmcm9tXG4gIC8vIHRoZSBjb25maWd1cmF0aW9uLlxuICBfdGVzdEVtYWlsRG9tYWluKGVtYWlsKSB7XG4gICAgY29uc3QgZG9tYWluID0gdGhpcy5fb3B0aW9ucy5yZXN0cmljdENyZWF0aW9uQnlFbWFpbERvbWFpbjtcblxuICAgIHJldHVybiAhZG9tYWluIHx8XG4gICAgICAodHlwZW9mIGRvbWFpbiA9PT0gJ2Z1bmN0aW9uJyAmJiBkb21haW4oZW1haWwpKSB8fFxuICAgICAgKHR5cGVvZiBkb21haW4gPT09ICdzdHJpbmcnICYmXG4gICAgICAgIChuZXcgUmVnRXhwKGBAJHtNZXRlb3IuX2VzY2FwZVJlZ0V4cChkb21haW4pfSRgLCAnaScpKS50ZXN0KGVtYWlsKSk7XG4gIH07XG5cbiAgLy8vXG4gIC8vLyBDTEVBTiBVUCBGT1IgYGxvZ291dE90aGVyQ2xpZW50c2BcbiAgLy8vXG5cbiAgX2RlbGV0ZVNhdmVkVG9rZW5zRm9yVXNlcih1c2VySWQsIHRva2Vuc1RvRGVsZXRlKSB7XG4gICAgaWYgKHRva2Vuc1RvRGVsZXRlKSB7XG4gICAgICB0aGlzLnVzZXJzLnVwZGF0ZSh1c2VySWQsIHtcbiAgICAgICAgJHVuc2V0OiB7XG4gICAgICAgICAgXCJzZXJ2aWNlcy5yZXN1bWUuaGF2ZUxvZ2luVG9rZW5zVG9EZWxldGVcIjogMSxcbiAgICAgICAgICBcInNlcnZpY2VzLnJlc3VtZS5sb2dpblRva2Vuc1RvRGVsZXRlXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgJHB1bGxBbGw6IHtcbiAgICAgICAgICBcInNlcnZpY2VzLnJlc3VtZS5sb2dpblRva2Vuc1wiOiB0b2tlbnNUb0RlbGV0ZVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgX2RlbGV0ZVNhdmVkVG9rZW5zRm9yQWxsVXNlcnNPblN0YXJ0dXAoKSB7XG4gICAgLy8gSWYgd2UgZmluZCB1c2VycyB3aG8gaGF2ZSBzYXZlZCB0b2tlbnMgdG8gZGVsZXRlIG9uIHN0YXJ0dXAsIGRlbGV0ZVxuICAgIC8vIHRoZW0gbm93LiBJdCdzIHBvc3NpYmxlIHRoYXQgdGhlIHNlcnZlciBjb3VsZCBoYXZlIGNyYXNoZWQgYW5kIGNvbWVcbiAgICAvLyBiYWNrIHVwIGJlZm9yZSBuZXcgdG9rZW5zIGFyZSBmb3VuZCBpbiBsb2NhbFN0b3JhZ2UsIGJ1dCB0aGlzXG4gICAgLy8gc2hvdWxkbid0IGhhcHBlbiB2ZXJ5IG9mdGVuLiBXZSBzaG91bGRuJ3QgcHV0IGEgZGVsYXkgaGVyZSBiZWNhdXNlXG4gICAgLy8gdGhhdCB3b3VsZCBnaXZlIGEgbG90IG9mIHBvd2VyIHRvIGFuIGF0dGFja2VyIHdpdGggYSBzdG9sZW4gbG9naW5cbiAgICAvLyB0b2tlbiBhbmQgdGhlIGFiaWxpdHkgdG8gY3Jhc2ggdGhlIHNlcnZlci5cbiAgICBNZXRlb3Iuc3RhcnR1cCgoKSA9PiB7XG4gICAgICB0aGlzLnVzZXJzLmZpbmQoe1xuICAgICAgICBcInNlcnZpY2VzLnJlc3VtZS5oYXZlTG9naW5Ub2tlbnNUb0RlbGV0ZVwiOiB0cnVlXG4gICAgICB9LCB7ZmllbGRzOiB7XG4gICAgICAgIFwic2VydmljZXMucmVzdW1lLmxvZ2luVG9rZW5zVG9EZWxldGVcIjogMVxuICAgICAgfX0pLmZvckVhY2godXNlciA9PiB7XG4gICAgICAgIHRoaXMuX2RlbGV0ZVNhdmVkVG9rZW5zRm9yVXNlcihcbiAgICAgICAgICB1c2VyLl9pZCxcbiAgICAgICAgICB1c2VyLnNlcnZpY2VzLnJlc3VtZS5sb2dpblRva2Vuc1RvRGVsZXRlXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICAvLy9cbiAgLy8vIE1BTkFHSU5HIFVTRVIgT0JKRUNUU1xuICAvLy9cblxuICAvLyBVcGRhdGVzIG9yIGNyZWF0ZXMgYSB1c2VyIGFmdGVyIHdlIGF1dGhlbnRpY2F0ZSB3aXRoIGEgM3JkIHBhcnR5LlxuICAvL1xuICAvLyBAcGFyYW0gc2VydmljZU5hbWUge1N0cmluZ30gU2VydmljZSBuYW1lIChlZywgdHdpdHRlcikuXG4gIC8vIEBwYXJhbSBzZXJ2aWNlRGF0YSB7T2JqZWN0fSBEYXRhIHRvIHN0b3JlIGluIHRoZSB1c2VyJ3MgcmVjb3JkXG4gIC8vICAgICAgICB1bmRlciBzZXJ2aWNlc1tzZXJ2aWNlTmFtZV0uIE11c3QgaW5jbHVkZSBhbiBcImlkXCIgZmllbGRcbiAgLy8gICAgICAgIHdoaWNoIGlzIGEgdW5pcXVlIGlkZW50aWZpZXIgZm9yIHRoZSB1c2VyIGluIHRoZSBzZXJ2aWNlLlxuICAvLyBAcGFyYW0gb3B0aW9ucyB7T2JqZWN0LCBvcHRpb25hbH0gT3RoZXIgb3B0aW9ucyB0byBwYXNzIHRvIGluc2VydFVzZXJEb2NcbiAgLy8gICAgICAgIChlZywgcHJvZmlsZSlcbiAgLy8gQHJldHVybnMge09iamVjdH0gT2JqZWN0IHdpdGggdG9rZW4gYW5kIGlkIGtleXMsIGxpa2UgdGhlIHJlc3VsdFxuICAvLyAgICAgICAgb2YgdGhlIFwibG9naW5cIiBtZXRob2QuXG4gIC8vXG4gIHVwZGF0ZU9yQ3JlYXRlVXNlckZyb21FeHRlcm5hbFNlcnZpY2UoXG4gICAgc2VydmljZU5hbWUsXG4gICAgc2VydmljZURhdGEsXG4gICAgb3B0aW9uc1xuICApIHtcbiAgICBvcHRpb25zID0geyAuLi5vcHRpb25zIH07XG5cbiAgICBpZiAoc2VydmljZU5hbWUgPT09IFwicGFzc3dvcmRcIiB8fCBzZXJ2aWNlTmFtZSA9PT0gXCJyZXN1bWVcIikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIkNhbid0IHVzZSB1cGRhdGVPckNyZWF0ZVVzZXJGcm9tRXh0ZXJuYWxTZXJ2aWNlIHdpdGggaW50ZXJuYWwgc2VydmljZSBcIlxuICAgICAgICArIHNlcnZpY2VOYW1lKTtcbiAgICB9XG4gICAgaWYgKCFoYXNPd24uY2FsbChzZXJ2aWNlRGF0YSwgJ2lkJykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFNlcnZpY2UgZGF0YSBmb3Igc2VydmljZSAke3NlcnZpY2VOYW1lfSBtdXN0IGluY2x1ZGUgaWRgKTtcbiAgICB9XG5cbiAgICAvLyBMb29rIGZvciBhIHVzZXIgd2l0aCB0aGUgYXBwcm9wcmlhdGUgc2VydmljZSB1c2VyIGlkLlxuICAgIGNvbnN0IHNlbGVjdG9yID0ge307XG4gICAgY29uc3Qgc2VydmljZUlkS2V5ID0gYHNlcnZpY2VzLiR7c2VydmljZU5hbWV9LmlkYDtcblxuICAgIC8vIFhYWCBUZW1wb3Jhcnkgc3BlY2lhbCBjYXNlIGZvciBUd2l0dGVyLiAoSXNzdWUgIzYyOSlcbiAgICAvLyAgIFRoZSBzZXJ2aWNlRGF0YS5pZCB3aWxsIGJlIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGFuIGludGVnZXIuXG4gICAgLy8gICBXZSB3YW50IGl0IHRvIG1hdGNoIGVpdGhlciBhIHN0b3JlZCBzdHJpbmcgb3IgaW50IHJlcHJlc2VudGF0aW9uLlxuICAgIC8vICAgVGhpcyBpcyB0byBjYXRlciB0byBlYXJsaWVyIHZlcnNpb25zIG9mIE1ldGVvciBzdG9yaW5nIHR3aXR0ZXJcbiAgICAvLyAgIHVzZXIgSURzIGluIG51bWJlciBmb3JtLCBhbmQgcmVjZW50IHZlcnNpb25zIHN0b3JpbmcgdGhlbSBhcyBzdHJpbmdzLlxuICAgIC8vICAgVGhpcyBjYW4gYmUgcmVtb3ZlZCBvbmNlIG1pZ3JhdGlvbiB0ZWNobm9sb2d5IGlzIGluIHBsYWNlLCBhbmQgdHdpdHRlclxuICAgIC8vICAgdXNlcnMgc3RvcmVkIHdpdGggaW50ZWdlciBJRHMgaGF2ZSBiZWVuIG1pZ3JhdGVkIHRvIHN0cmluZyBJRHMuXG4gICAgaWYgKHNlcnZpY2VOYW1lID09PSBcInR3aXR0ZXJcIiAmJiAhaXNOYU4oc2VydmljZURhdGEuaWQpKSB7XG4gICAgICBzZWxlY3RvcltcIiRvclwiXSA9IFt7fSx7fV07XG4gICAgICBzZWxlY3RvcltcIiRvclwiXVswXVtzZXJ2aWNlSWRLZXldID0gc2VydmljZURhdGEuaWQ7XG4gICAgICBzZWxlY3RvcltcIiRvclwiXVsxXVtzZXJ2aWNlSWRLZXldID0gcGFyc2VJbnQoc2VydmljZURhdGEuaWQsIDEwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZWN0b3Jbc2VydmljZUlkS2V5XSA9IHNlcnZpY2VEYXRhLmlkO1xuICAgIH1cblxuICAgIGxldCB1c2VyID0gdGhpcy51c2Vycy5maW5kT25lKHNlbGVjdG9yLCB7ZmllbGRzOiB0aGlzLl9vcHRpb25zLmRlZmF1bHRGaWVsZFNlbGVjdG9yfSk7XG5cbiAgICAvLyBDaGVjayB0byBzZWUgaWYgdGhlIGRldmVsb3BlciBoYXMgYSBjdXN0b20gd2F5IHRvIGZpbmQgdGhlIHVzZXIgb3V0c2lkZVxuICAgIC8vIG9mIHRoZSBnZW5lcmFsIHNlbGVjdG9ycyBhYm92ZS5cbiAgICBpZiAoIXVzZXIgJiYgdGhpcy5fYWRkaXRpb25hbEZpbmRVc2VyT25FeHRlcm5hbExvZ2luKSB7XG4gICAgICB1c2VyID0gdGhpcy5fYWRkaXRpb25hbEZpbmRVc2VyT25FeHRlcm5hbExvZ2luKHtzZXJ2aWNlTmFtZSwgc2VydmljZURhdGEsIG9wdGlvbnN9KVxuICAgIH1cblxuICAgIC8vIEJlZm9yZSBjb250aW51aW5nLCBydW4gdXNlciBob29rIHRvIHNlZSBpZiB3ZSBzaG91bGQgY29udGludWVcbiAgICBpZiAodGhpcy5fYmVmb3JlRXh0ZXJuYWxMb2dpbkhvb2sgJiYgIXRoaXMuX2JlZm9yZUV4dGVybmFsTG9naW5Ib29rKHNlcnZpY2VOYW1lLCBzZXJ2aWNlRGF0YSwgdXNlcikpIHtcbiAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAzLCBcIkxvZ2luIGZvcmJpZGRlblwiKTtcbiAgICB9XG5cbiAgICAvLyBXaGVuIGNyZWF0aW5nIGEgbmV3IHVzZXIgd2UgcGFzcyB0aHJvdWdoIGFsbCBvcHRpb25zLiBXaGVuIHVwZGF0aW5nIGFuXG4gICAgLy8gZXhpc3RpbmcgdXNlciwgYnkgZGVmYXVsdCB3ZSBvbmx5IHByb2Nlc3MvcGFzcyB0aHJvdWdoIHRoZSBzZXJ2aWNlRGF0YVxuICAgIC8vIChlZywgc28gdGhhdCB3ZSBrZWVwIGFuIHVuZXhwaXJlZCBhY2Nlc3MgdG9rZW4gYW5kIGRvbid0IGNhY2hlIG9sZCBlbWFpbFxuICAgIC8vIGFkZHJlc3NlcyBpbiBzZXJ2aWNlRGF0YS5lbWFpbCkuIFRoZSBvbkV4dGVybmFsTG9naW4gaG9vayBjYW4gYmUgdXNlZCB3aGVuXG4gICAgLy8gY3JlYXRpbmcgb3IgdXBkYXRpbmcgYSB1c2VyLCB0byBtb2RpZnkgb3IgcGFzcyB0aHJvdWdoIG1vcmUgb3B0aW9ucyBhc1xuICAgIC8vIG5lZWRlZC5cbiAgICBsZXQgb3B0cyA9IHVzZXIgPyB7fSA6IG9wdGlvbnM7XG4gICAgaWYgKHRoaXMuX29uRXh0ZXJuYWxMb2dpbkhvb2spIHtcbiAgICAgIG9wdHMgPSB0aGlzLl9vbkV4dGVybmFsTG9naW5Ib29rKG9wdGlvbnMsIHVzZXIpO1xuICAgIH1cblxuICAgIGlmICh1c2VyKSB7XG4gICAgICBwaW5FbmNyeXB0ZWRGaWVsZHNUb1VzZXIoc2VydmljZURhdGEsIHVzZXIuX2lkKTtcblxuICAgICAgbGV0IHNldEF0dHJzID0ge307XG4gICAgICBPYmplY3Qua2V5cyhzZXJ2aWNlRGF0YSkuZm9yRWFjaChrZXkgPT5cbiAgICAgICAgc2V0QXR0cnNbYHNlcnZpY2VzLiR7c2VydmljZU5hbWV9LiR7a2V5fWBdID0gc2VydmljZURhdGFba2V5XVxuICAgICAgKTtcblxuICAgICAgLy8gWFhYIE1heWJlIHdlIHNob3VsZCByZS11c2UgdGhlIHNlbGVjdG9yIGFib3ZlIGFuZCBub3RpY2UgaWYgdGhlIHVwZGF0ZVxuICAgICAgLy8gICAgIHRvdWNoZXMgbm90aGluZz9cbiAgICAgIHNldEF0dHJzID0geyAuLi5zZXRBdHRycywgLi4ub3B0cyB9O1xuICAgICAgdGhpcy51c2Vycy51cGRhdGUodXNlci5faWQsIHtcbiAgICAgICAgJHNldDogc2V0QXR0cnNcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBzZXJ2aWNlTmFtZSxcbiAgICAgICAgdXNlcklkOiB1c2VyLl9pZFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQ3JlYXRlIGEgbmV3IHVzZXIgd2l0aCB0aGUgc2VydmljZSBkYXRhLlxuICAgICAgdXNlciA9IHtzZXJ2aWNlczoge319O1xuICAgICAgdXNlci5zZXJ2aWNlc1tzZXJ2aWNlTmFtZV0gPSBzZXJ2aWNlRGF0YTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IHNlcnZpY2VOYW1lLFxuICAgICAgICB1c2VySWQ6IHRoaXMuaW5zZXJ0VXNlckRvYyhvcHRzLCB1c2VyKVxuICAgICAgfTtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmVtb3ZlcyBkZWZhdWx0IHJhdGUgbGltaXRpbmcgcnVsZVxuICByZW1vdmVEZWZhdWx0UmF0ZUxpbWl0KCkge1xuICAgIGNvbnN0IHJlc3AgPSBERFBSYXRlTGltaXRlci5yZW1vdmVSdWxlKHRoaXMuZGVmYXVsdFJhdGVMaW1pdGVyUnVsZUlkKTtcbiAgICB0aGlzLmRlZmF1bHRSYXRlTGltaXRlclJ1bGVJZCA9IG51bGw7XG4gICAgcmV0dXJuIHJlc3A7XG4gIH07XG5cbiAgLy8gQWRkIGEgZGVmYXVsdCBydWxlIG9mIGxpbWl0aW5nIGxvZ2lucywgY3JlYXRpbmcgbmV3IHVzZXJzIGFuZCBwYXNzd29yZCByZXNldFxuICAvLyB0byA1IHRpbWVzIGV2ZXJ5IDEwIHNlY29uZHMgcGVyIGNvbm5lY3Rpb24uXG4gIGFkZERlZmF1bHRSYXRlTGltaXQoKSB7XG4gICAgaWYgKCF0aGlzLmRlZmF1bHRSYXRlTGltaXRlclJ1bGVJZCkge1xuICAgICAgdGhpcy5kZWZhdWx0UmF0ZUxpbWl0ZXJSdWxlSWQgPSBERFBSYXRlTGltaXRlci5hZGRSdWxlKHtcbiAgICAgICAgdXNlcklkOiBudWxsLFxuICAgICAgICBjbGllbnRBZGRyZXNzOiBudWxsLFxuICAgICAgICB0eXBlOiAnbWV0aG9kJyxcbiAgICAgICAgbmFtZTogbmFtZSA9PiBbJ2xvZ2luJywgJ2NyZWF0ZVVzZXInLCAncmVzZXRQYXNzd29yZCcsICdmb3Jnb3RQYXNzd29yZCddXG4gICAgICAgICAgLmluY2x1ZGVzKG5hbWUpLFxuICAgICAgICBjb25uZWN0aW9uSWQ6IChjb25uZWN0aW9uSWQpID0+IHRydWUsXG4gICAgICB9LCA1LCAxMDAwMCk7XG4gICAgfVxuICB9O1xuXG59XG5cbi8vIEdpdmUgZWFjaCBsb2dpbiBob29rIGNhbGxiYWNrIGEgZnJlc2ggY2xvbmVkIGNvcHkgb2YgdGhlIGF0dGVtcHRcbi8vIG9iamVjdCwgYnV0IGRvbid0IGNsb25lIHRoZSBjb25uZWN0aW9uLlxuLy9cbmNvbnN0IGNsb25lQXR0ZW1wdFdpdGhDb25uZWN0aW9uID0gKGNvbm5lY3Rpb24sIGF0dGVtcHQpID0+IHtcbiAgY29uc3QgY2xvbmVkQXR0ZW1wdCA9IEVKU09OLmNsb25lKGF0dGVtcHQpO1xuICBjbG9uZWRBdHRlbXB0LmNvbm5lY3Rpb24gPSBjb25uZWN0aW9uO1xuICByZXR1cm4gY2xvbmVkQXR0ZW1wdDtcbn07XG5cbmNvbnN0IHRyeUxvZ2luTWV0aG9kID0gKHR5cGUsIGZuKSA9PiB7XG4gIGxldCByZXN1bHQ7XG4gIHRyeSB7XG4gICAgcmVzdWx0ID0gZm4oKTtcbiAgfVxuICBjYXRjaCAoZSkge1xuICAgIHJlc3VsdCA9IHtlcnJvcjogZX07XG4gIH1cblxuICBpZiAocmVzdWx0ICYmICFyZXN1bHQudHlwZSAmJiB0eXBlKVxuICAgIHJlc3VsdC50eXBlID0gdHlwZTtcblxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuY29uc3Qgc2V0dXBEZWZhdWx0TG9naW5IYW5kbGVycyA9IGFjY291bnRzID0+IHtcbiAgYWNjb3VudHMucmVnaXN0ZXJMb2dpbkhhbmRsZXIoXCJyZXN1bWVcIiwgZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gZGVmYXVsdFJlc3VtZUxvZ2luSGFuZGxlci5jYWxsKHRoaXMsIGFjY291bnRzLCBvcHRpb25zKTtcbiAgfSk7XG59O1xuXG4vLyBMb2dpbiBoYW5kbGVyIGZvciByZXN1bWUgdG9rZW5zLlxuY29uc3QgZGVmYXVsdFJlc3VtZUxvZ2luSGFuZGxlciA9IChhY2NvdW50cywgb3B0aW9ucykgPT4ge1xuICBpZiAoIW9wdGlvbnMucmVzdW1lKVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG5cbiAgY2hlY2sob3B0aW9ucy5yZXN1bWUsIFN0cmluZyk7XG5cbiAgY29uc3QgaGFzaGVkVG9rZW4gPSBhY2NvdW50cy5faGFzaExvZ2luVG9rZW4ob3B0aW9ucy5yZXN1bWUpO1xuXG4gIC8vIEZpcnN0IGxvb2sgZm9yIGp1c3QgdGhlIG5ldy1zdHlsZSBoYXNoZWQgbG9naW4gdG9rZW4sIHRvIGF2b2lkXG4gIC8vIHNlbmRpbmcgdGhlIHVuaGFzaGVkIHRva2VuIHRvIHRoZSBkYXRhYmFzZSBpbiBhIHF1ZXJ5IGlmIHdlIGRvbid0XG4gIC8vIG5lZWQgdG8uXG4gIGxldCB1c2VyID0gYWNjb3VudHMudXNlcnMuZmluZE9uZShcbiAgICB7XCJzZXJ2aWNlcy5yZXN1bWUubG9naW5Ub2tlbnMuaGFzaGVkVG9rZW5cIjogaGFzaGVkVG9rZW59LFxuICAgIHtmaWVsZHM6IHtcInNlcnZpY2VzLnJlc3VtZS5sb2dpblRva2Vucy4kXCI6IDF9fSk7XG5cbiAgaWYgKCEgdXNlcikge1xuICAgIC8vIElmIHdlIGRpZG4ndCBmaW5kIHRoZSBoYXNoZWQgbG9naW4gdG9rZW4sIHRyeSBhbHNvIGxvb2tpbmcgZm9yXG4gICAgLy8gdGhlIG9sZC1zdHlsZSB1bmhhc2hlZCB0b2tlbi4gIEJ1dCB3ZSBuZWVkIHRvIGxvb2sgZm9yIGVpdGhlclxuICAgIC8vIHRoZSBvbGQtc3R5bGUgdG9rZW4gT1IgdGhlIG5ldy1zdHlsZSB0b2tlbiwgYmVjYXVzZSBhbm90aGVyXG4gICAgLy8gY2xpZW50IGNvbm5lY3Rpb24gbG9nZ2luZyBpbiBzaW11bHRhbmVvdXNseSBtaWdodCBoYXZlIGFscmVhZHlcbiAgICAvLyBjb252ZXJ0ZWQgdGhlIHRva2VuLlxuICAgIHVzZXIgPSBhY2NvdW50cy51c2Vycy5maW5kT25lKHtcbiAgICAgICRvcjogW1xuICAgICAgICB7XCJzZXJ2aWNlcy5yZXN1bWUubG9naW5Ub2tlbnMuaGFzaGVkVG9rZW5cIjogaGFzaGVkVG9rZW59LFxuICAgICAgICB7XCJzZXJ2aWNlcy5yZXN1bWUubG9naW5Ub2tlbnMudG9rZW5cIjogb3B0aW9ucy5yZXN1bWV9XG4gICAgICBdXG4gICAgfSxcbiAgICAvLyBOb3RlOiBDYW5ub3QgdXNlIC4uLmxvZ2luVG9rZW5zLiQgcG9zaXRpb25hbCBvcGVyYXRvciB3aXRoICRvciBxdWVyeS5cbiAgICB7ZmllbGRzOiB7XCJzZXJ2aWNlcy5yZXN1bWUubG9naW5Ub2tlbnNcIjogMX19KTtcbiAgfVxuXG4gIGlmICghIHVzZXIpXG4gICAgcmV0dXJuIHtcbiAgICAgIGVycm9yOiBuZXcgTWV0ZW9yLkVycm9yKDQwMywgXCJZb3UndmUgYmVlbiBsb2dnZWQgb3V0IGJ5IHRoZSBzZXJ2ZXIuIFBsZWFzZSBsb2cgaW4gYWdhaW4uXCIpXG4gICAgfTtcblxuICAvLyBGaW5kIHRoZSB0b2tlbiwgd2hpY2ggd2lsbCBlaXRoZXIgYmUgYW4gb2JqZWN0IHdpdGggZmllbGRzXG4gIC8vIHtoYXNoZWRUb2tlbiwgd2hlbn0gZm9yIGEgaGFzaGVkIHRva2VuIG9yIHt0b2tlbiwgd2hlbn0gZm9yIGFuXG4gIC8vIHVuaGFzaGVkIHRva2VuLlxuICBsZXQgb2xkVW5oYXNoZWRTdHlsZVRva2VuO1xuICBsZXQgdG9rZW4gPSB1c2VyLnNlcnZpY2VzLnJlc3VtZS5sb2dpblRva2Vucy5maW5kKHRva2VuID0+XG4gICAgdG9rZW4uaGFzaGVkVG9rZW4gPT09IGhhc2hlZFRva2VuXG4gICk7XG4gIGlmICh0b2tlbikge1xuICAgIG9sZFVuaGFzaGVkU3R5bGVUb2tlbiA9IGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIHRva2VuID0gdXNlci5zZXJ2aWNlcy5yZXN1bWUubG9naW5Ub2tlbnMuZmluZCh0b2tlbiA9PlxuICAgICAgdG9rZW4udG9rZW4gPT09IG9wdGlvbnMucmVzdW1lXG4gICAgKTtcbiAgICBvbGRVbmhhc2hlZFN0eWxlVG9rZW4gPSB0cnVlO1xuICB9XG5cbiAgY29uc3QgdG9rZW5FeHBpcmVzID0gYWNjb3VudHMuX3Rva2VuRXhwaXJhdGlvbih0b2tlbi53aGVuKTtcbiAgaWYgKG5ldyBEYXRlKCkgPj0gdG9rZW5FeHBpcmVzKVxuICAgIHJldHVybiB7XG4gICAgICB1c2VySWQ6IHVzZXIuX2lkLFxuICAgICAgZXJyb3I6IG5ldyBNZXRlb3IuRXJyb3IoNDAzLCBcIllvdXIgc2Vzc2lvbiBoYXMgZXhwaXJlZC4gUGxlYXNlIGxvZyBpbiBhZ2Fpbi5cIilcbiAgICB9O1xuXG4gIC8vIFVwZGF0ZSB0byBhIGhhc2hlZCB0b2tlbiB3aGVuIGFuIHVuaGFzaGVkIHRva2VuIGlzIGVuY291bnRlcmVkLlxuICBpZiAob2xkVW5oYXNoZWRTdHlsZVRva2VuKSB7XG4gICAgLy8gT25seSBhZGQgdGhlIG5ldyBoYXNoZWQgdG9rZW4gaWYgdGhlIG9sZCB1bmhhc2hlZCB0b2tlbiBzdGlsbFxuICAgIC8vIGV4aXN0cyAodGhpcyBhdm9pZHMgcmVzdXJyZWN0aW5nIHRoZSB0b2tlbiBpZiBpdCB3YXMgZGVsZXRlZFxuICAgIC8vIGFmdGVyIHdlIHJlYWQgaXQpLiAgVXNpbmcgJGFkZFRvU2V0IGF2b2lkcyBnZXR0aW5nIGFuIGluZGV4XG4gICAgLy8gZXJyb3IgaWYgYW5vdGhlciBjbGllbnQgbG9nZ2luZyBpbiBzaW11bHRhbmVvdXNseSBoYXMgYWxyZWFkeVxuICAgIC8vIGluc2VydGVkIHRoZSBuZXcgaGFzaGVkIHRva2VuLlxuICAgIGFjY291bnRzLnVzZXJzLnVwZGF0ZShcbiAgICAgIHtcbiAgICAgICAgX2lkOiB1c2VyLl9pZCxcbiAgICAgICAgXCJzZXJ2aWNlcy5yZXN1bWUubG9naW5Ub2tlbnMudG9rZW5cIjogb3B0aW9ucy5yZXN1bWVcbiAgICAgIH0sXG4gICAgICB7JGFkZFRvU2V0OiB7XG4gICAgICAgICAgXCJzZXJ2aWNlcy5yZXN1bWUubG9naW5Ub2tlbnNcIjoge1xuICAgICAgICAgICAgXCJoYXNoZWRUb2tlblwiOiBoYXNoZWRUb2tlbixcbiAgICAgICAgICAgIFwid2hlblwiOiB0b2tlbi53aGVuXG4gICAgICAgICAgfVxuICAgICAgICB9fVxuICAgICk7XG5cbiAgICAvLyBSZW1vdmUgdGhlIG9sZCB0b2tlbiAqYWZ0ZXIqIGFkZGluZyB0aGUgbmV3LCBzaW5jZSBvdGhlcndpc2VcbiAgICAvLyBhbm90aGVyIGNsaWVudCB0cnlpbmcgdG8gbG9naW4gYmV0d2VlbiBvdXIgcmVtb3ZpbmcgdGhlIG9sZCBhbmRcbiAgICAvLyBhZGRpbmcgdGhlIG5ldyB3b3VsZG4ndCBmaW5kIGEgdG9rZW4gdG8gbG9naW4gd2l0aC5cbiAgICBhY2NvdW50cy51c2Vycy51cGRhdGUodXNlci5faWQsIHtcbiAgICAgICRwdWxsOiB7XG4gICAgICAgIFwic2VydmljZXMucmVzdW1lLmxvZ2luVG9rZW5zXCI6IHsgXCJ0b2tlblwiOiBvcHRpb25zLnJlc3VtZSB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHVzZXJJZDogdXNlci5faWQsXG4gICAgc3RhbXBlZExvZ2luVG9rZW46IHtcbiAgICAgIHRva2VuOiBvcHRpb25zLnJlc3VtZSxcbiAgICAgIHdoZW46IHRva2VuLndoZW5cbiAgICB9XG4gIH07XG59O1xuXG5jb25zdCBleHBpcmVQYXNzd29yZFRva2VuID0gKFxuICBhY2NvdW50cyxcbiAgb2xkZXN0VmFsaWREYXRlLFxuICB0b2tlbkZpbHRlcixcbiAgdXNlcklkXG4pID0+IHtcbiAgLy8gYm9vbGVhbiB2YWx1ZSB1c2VkIHRvIGRldGVybWluZSBpZiB0aGlzIG1ldGhvZCB3YXMgY2FsbGVkIGZyb20gZW5yb2xsIGFjY291bnQgd29ya2Zsb3dcbiAgbGV0IGlzRW5yb2xsID0gZmFsc2U7XG4gIGNvbnN0IHVzZXJGaWx0ZXIgPSB1c2VySWQgPyB7X2lkOiB1c2VySWR9IDoge307XG4gIC8vIGNoZWNrIGlmIHRoaXMgbWV0aG9kIHdhcyBjYWxsZWQgZnJvbSBlbnJvbGwgYWNjb3VudCB3b3JrZmxvd1xuICBpZih0b2tlbkZpbHRlclsnc2VydmljZXMucGFzc3dvcmQuZW5yb2xsLnJlYXNvbiddKSB7XG4gICAgaXNFbnJvbGwgPSB0cnVlO1xuICB9XG4gIGxldCByZXNldFJhbmdlT3IgPSB7XG4gICAgJG9yOiBbXG4gICAgICB7IFwic2VydmljZXMucGFzc3dvcmQucmVzZXQud2hlblwiOiB7ICRsdDogb2xkZXN0VmFsaWREYXRlIH0gfSxcbiAgICAgIHsgXCJzZXJ2aWNlcy5wYXNzd29yZC5yZXNldC53aGVuXCI6IHsgJGx0OiArb2xkZXN0VmFsaWREYXRlIH0gfVxuICAgIF1cbiAgfTtcbiAgaWYoaXNFbnJvbGwpIHtcbiAgICByZXNldFJhbmdlT3IgPSB7XG4gICAgICAkb3I6IFtcbiAgICAgICAgeyBcInNlcnZpY2VzLnBhc3N3b3JkLmVucm9sbC53aGVuXCI6IHsgJGx0OiBvbGRlc3RWYWxpZERhdGUgfSB9LFxuICAgICAgICB7IFwic2VydmljZXMucGFzc3dvcmQuZW5yb2xsLndoZW5cIjogeyAkbHQ6ICtvbGRlc3RWYWxpZERhdGUgfSB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxuICBjb25zdCBleHBpcmVGaWx0ZXIgPSB7ICRhbmQ6IFt0b2tlbkZpbHRlciwgcmVzZXRSYW5nZU9yXSB9O1xuICBpZihpc0Vucm9sbCkge1xuICAgIGFjY291bnRzLnVzZXJzLnVwZGF0ZSh7Li4udXNlckZpbHRlciwgLi4uZXhwaXJlRmlsdGVyfSwge1xuICAgICAgJHVuc2V0OiB7XG4gICAgICAgIFwic2VydmljZXMucGFzc3dvcmQuZW5yb2xsXCI6IFwiXCJcbiAgICAgIH1cbiAgICB9LCB7IG11bHRpOiB0cnVlIH0pO1xuICB9IGVsc2Uge1xuICAgIGFjY291bnRzLnVzZXJzLnVwZGF0ZSh7Li4udXNlckZpbHRlciwgLi4uZXhwaXJlRmlsdGVyfSwge1xuICAgICAgJHVuc2V0OiB7XG4gICAgICAgIFwic2VydmljZXMucGFzc3dvcmQucmVzZXRcIjogXCJcIlxuICAgICAgfVxuICAgIH0sIHsgbXVsdGk6IHRydWUgfSk7XG4gIH1cblxufTtcblxuY29uc3Qgc2V0RXhwaXJlVG9rZW5zSW50ZXJ2YWwgPSBhY2NvdW50cyA9PiB7XG4gIGFjY291bnRzLmV4cGlyZVRva2VuSW50ZXJ2YWwgPSBNZXRlb3Iuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgIGFjY291bnRzLl9leHBpcmVUb2tlbnMoKTtcbiAgICBhY2NvdW50cy5fZXhwaXJlUGFzc3dvcmRSZXNldFRva2VucygpO1xuICAgIGFjY291bnRzLl9leHBpcmVQYXNzd29yZEVucm9sbFRva2VucygpO1xuICB9LCBFWFBJUkVfVE9LRU5TX0lOVEVSVkFMX01TKTtcbn07XG5cbi8vL1xuLy8vIE9BdXRoIEVuY3J5cHRpb24gU3VwcG9ydFxuLy8vXG5cbmNvbnN0IE9BdXRoRW5jcnlwdGlvbiA9XG4gIFBhY2thZ2VbXCJvYXV0aC1lbmNyeXB0aW9uXCJdICYmXG4gIFBhY2thZ2VbXCJvYXV0aC1lbmNyeXB0aW9uXCJdLk9BdXRoRW5jcnlwdGlvbjtcblxuY29uc3QgdXNpbmdPQXV0aEVuY3J5cHRpb24gPSAoKSA9PiB7XG4gIHJldHVybiBPQXV0aEVuY3J5cHRpb24gJiYgT0F1dGhFbmNyeXB0aW9uLmtleUlzTG9hZGVkKCk7XG59O1xuXG4vLyBPQXV0aCBzZXJ2aWNlIGRhdGEgaXMgdGVtcG9yYXJpbHkgc3RvcmVkIGluIHRoZSBwZW5kaW5nIGNyZWRlbnRpYWxzXG4vLyBjb2xsZWN0aW9uIGR1cmluZyB0aGUgb2F1dGggYXV0aGVudGljYXRpb24gcHJvY2Vzcy4gIFNlbnNpdGl2ZSBkYXRhXG4vLyBzdWNoIGFzIGFjY2VzcyB0b2tlbnMgYXJlIGVuY3J5cHRlZCB3aXRob3V0IHRoZSB1c2VyIGlkIGJlY2F1c2Vcbi8vIHdlIGRvbid0IGtub3cgdGhlIHVzZXIgaWQgeWV0LiAgV2UgcmUtZW5jcnlwdCB0aGVzZSBmaWVsZHMgd2l0aCB0aGVcbi8vIHVzZXIgaWQgaW5jbHVkZWQgd2hlbiBzdG9yaW5nIHRoZSBzZXJ2aWNlIGRhdGEgcGVybWFuZW50bHkgaW5cbi8vIHRoZSB1c2VycyBjb2xsZWN0aW9uLlxuLy9cbmNvbnN0IHBpbkVuY3J5cHRlZEZpZWxkc1RvVXNlciA9IChzZXJ2aWNlRGF0YSwgdXNlcklkKSA9PiB7XG4gIE9iamVjdC5rZXlzKHNlcnZpY2VEYXRhKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgbGV0IHZhbHVlID0gc2VydmljZURhdGFba2V5XTtcbiAgICBpZiAoT0F1dGhFbmNyeXB0aW9uICYmIE9BdXRoRW5jcnlwdGlvbi5pc1NlYWxlZCh2YWx1ZSkpXG4gICAgICB2YWx1ZSA9IE9BdXRoRW5jcnlwdGlvbi5zZWFsKE9BdXRoRW5jcnlwdGlvbi5vcGVuKHZhbHVlKSwgdXNlcklkKTtcbiAgICBzZXJ2aWNlRGF0YVtrZXldID0gdmFsdWU7XG4gIH0pO1xufTtcblxuXG4vLyBFbmNyeXB0IHVuZW5jcnlwdGVkIGxvZ2luIHNlcnZpY2Ugc2VjcmV0cyB3aGVuIG9hdXRoLWVuY3J5cHRpb24gaXNcbi8vIGFkZGVkLlxuLy9cbi8vIFhYWCBGb3IgdGhlIG9hdXRoU2VjcmV0S2V5IHRvIGJlIGF2YWlsYWJsZSBoZXJlIGF0IHN0YXJ0dXAsIHRoZVxuLy8gZGV2ZWxvcGVyIG11c3QgY2FsbCBBY2NvdW50cy5jb25maWcoe29hdXRoU2VjcmV0S2V5OiAuLi59KSBhdCBsb2FkXG4vLyB0aW1lLCBpbnN0ZWFkIG9mIGluIGEgTWV0ZW9yLnN0YXJ0dXAgYmxvY2ssIGJlY2F1c2UgdGhlIHN0YXJ0dXBcbi8vIGJsb2NrIGluIHRoZSBhcHAgY29kZSB3aWxsIHJ1biBhZnRlciB0aGlzIGFjY291bnRzLWJhc2Ugc3RhcnR1cFxuLy8gYmxvY2suICBQZXJoYXBzIHdlIG5lZWQgYSBwb3N0LXN0YXJ0dXAgY2FsbGJhY2s/XG5cbk1ldGVvci5zdGFydHVwKCgpID0+IHtcbiAgaWYgKCEgdXNpbmdPQXV0aEVuY3J5cHRpb24oKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHsgU2VydmljZUNvbmZpZ3VyYXRpb24gfSA9IFBhY2thZ2VbJ3NlcnZpY2UtY29uZmlndXJhdGlvbiddO1xuXG4gIFNlcnZpY2VDb25maWd1cmF0aW9uLmNvbmZpZ3VyYXRpb25zLmZpbmQoe1xuICAgICRhbmQ6IFt7XG4gICAgICBzZWNyZXQ6IHsgJGV4aXN0czogdHJ1ZSB9XG4gICAgfSwge1xuICAgICAgXCJzZWNyZXQuYWxnb3JpdGhtXCI6IHsgJGV4aXN0czogZmFsc2UgfVxuICAgIH1dXG4gIH0pLmZvckVhY2goY29uZmlnID0+IHtcbiAgICBTZXJ2aWNlQ29uZmlndXJhdGlvbi5jb25maWd1cmF0aW9ucy51cGRhdGUoY29uZmlnLl9pZCwge1xuICAgICAgJHNldDoge1xuICAgICAgICBzZWNyZXQ6IE9BdXRoRW5jcnlwdGlvbi5zZWFsKGNvbmZpZy5zZWNyZXQpXG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufSk7XG5cbi8vIFhYWCBzZWUgY29tbWVudCBvbiBBY2NvdW50cy5jcmVhdGVVc2VyIGluIHBhc3N3b3Jkc19zZXJ2ZXIgYWJvdXQgYWRkaW5nIGFcbi8vIHNlY29uZCBcInNlcnZlciBvcHRpb25zXCIgYXJndW1lbnQuXG5jb25zdCBkZWZhdWx0Q3JlYXRlVXNlckhvb2sgPSAob3B0aW9ucywgdXNlcikgPT4ge1xuICBpZiAob3B0aW9ucy5wcm9maWxlKVxuICAgIHVzZXIucHJvZmlsZSA9IG9wdGlvbnMucHJvZmlsZTtcbiAgcmV0dXJuIHVzZXI7XG59O1xuXG4vLyBWYWxpZGF0ZSBuZXcgdXNlcidzIGVtYWlsIG9yIEdvb2dsZS9GYWNlYm9vay9HaXRIdWIgYWNjb3VudCdzIGVtYWlsXG5mdW5jdGlvbiBkZWZhdWx0VmFsaWRhdGVOZXdVc2VySG9vayh1c2VyKSB7XG4gIGNvbnN0IGRvbWFpbiA9IHRoaXMuX29wdGlvbnMucmVzdHJpY3RDcmVhdGlvbkJ5RW1haWxEb21haW47XG4gIGlmICghZG9tYWluKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBsZXQgZW1haWxJc0dvb2QgPSBmYWxzZTtcbiAgaWYgKHVzZXIuZW1haWxzICYmIHVzZXIuZW1haWxzLmxlbmd0aCA+IDApIHtcbiAgICBlbWFpbElzR29vZCA9IHVzZXIuZW1haWxzLnJlZHVjZShcbiAgICAgIChwcmV2LCBlbWFpbCkgPT4gcHJldiB8fCB0aGlzLl90ZXN0RW1haWxEb21haW4oZW1haWwuYWRkcmVzcyksIGZhbHNlXG4gICAgKTtcbiAgfSBlbHNlIGlmICh1c2VyLnNlcnZpY2VzICYmIE9iamVjdC52YWx1ZXModXNlci5zZXJ2aWNlcykubGVuZ3RoID4gMCkge1xuICAgIC8vIEZpbmQgYW55IGVtYWlsIG9mIGFueSBzZXJ2aWNlIGFuZCBjaGVjayBpdFxuICAgIGVtYWlsSXNHb29kID0gT2JqZWN0LnZhbHVlcyh1c2VyLnNlcnZpY2VzKS5yZWR1Y2UoXG4gICAgICAocHJldiwgc2VydmljZSkgPT4gc2VydmljZS5lbWFpbCAmJiB0aGlzLl90ZXN0RW1haWxEb21haW4oc2VydmljZS5lbWFpbCksXG4gICAgICBmYWxzZSxcbiAgICApO1xuICB9XG5cbiAgaWYgKGVtYWlsSXNHb29kKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAodHlwZW9mIGRvbWFpbiA9PT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMywgYEAke2RvbWFpbn0gZW1haWwgcmVxdWlyZWRgKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMywgXCJFbWFpbCBkb2Vzbid0IG1hdGNoIHRoZSBjcml0ZXJpYS5cIik7XG4gIH1cbn1cblxuY29uc3Qgc2V0dXBVc2Vyc0NvbGxlY3Rpb24gPSB1c2VycyA9PiB7XG4gIC8vL1xuICAvLy8gUkVTVFJJQ1RJTkcgV1JJVEVTIFRPIFVTRVIgT0JKRUNUU1xuICAvLy9cbiAgdXNlcnMuYWxsb3coe1xuICAgIC8vIGNsaWVudHMgY2FuIG1vZGlmeSB0aGUgcHJvZmlsZSBmaWVsZCBvZiB0aGVpciBvd24gZG9jdW1lbnQsIGFuZFxuICAgIC8vIG5vdGhpbmcgZWxzZS5cbiAgICB1cGRhdGU6ICh1c2VySWQsIHVzZXIsIGZpZWxkcywgbW9kaWZpZXIpID0+IHtcbiAgICAgIC8vIG1ha2Ugc3VyZSBpdCBpcyBvdXIgcmVjb3JkXG4gICAgICBpZiAodXNlci5faWQgIT09IHVzZXJJZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIHVzZXIgY2FuIG9ubHkgbW9kaWZ5IHRoZSAncHJvZmlsZScgZmllbGQuIHNldHMgdG8gbXVsdGlwbGVcbiAgICAgIC8vIHN1Yi1rZXlzIChlZyBwcm9maWxlLmZvbyBhbmQgcHJvZmlsZS5iYXIpIGFyZSBtZXJnZWQgaW50byBlbnRyeVxuICAgICAgLy8gaW4gdGhlIGZpZWxkcyBsaXN0LlxuICAgICAgaWYgKGZpZWxkcy5sZW5ndGggIT09IDEgfHwgZmllbGRzWzBdICE9PSAncHJvZmlsZScpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIGZldGNoOiBbJ19pZCddIC8vIHdlIG9ubHkgbG9vayBhdCBfaWQuXG4gIH0pO1xuXG4gIC8vLyBERUZBVUxUIElOREVYRVMgT04gVVNFUlNcbiAgdXNlcnMuX2Vuc3VyZUluZGV4KCd1c2VybmFtZScsIHsgdW5pcXVlOiB0cnVlLCBzcGFyc2U6IHRydWUgfSk7XG4gIHVzZXJzLl9lbnN1cmVJbmRleCgnZW1haWxzLmFkZHJlc3MnLCB7IHVuaXF1ZTogdHJ1ZSwgc3BhcnNlOiB0cnVlIH0pO1xuICB1c2Vycy5fZW5zdXJlSW5kZXgoJ3NlcnZpY2VzLnJlc3VtZS5sb2dpblRva2Vucy5oYXNoZWRUb2tlbicsXG4gICAgeyB1bmlxdWU6IHRydWUsIHNwYXJzZTogdHJ1ZSB9KTtcbiAgdXNlcnMuX2Vuc3VyZUluZGV4KCdzZXJ2aWNlcy5yZXN1bWUubG9naW5Ub2tlbnMudG9rZW4nLFxuICAgIHsgdW5pcXVlOiB0cnVlLCBzcGFyc2U6IHRydWUgfSk7XG4gIC8vIEZvciB0YWtpbmcgY2FyZSBvZiBsb2dvdXRPdGhlckNsaWVudHMgY2FsbHMgdGhhdCBjcmFzaGVkIGJlZm9yZSB0aGVcbiAgLy8gdG9rZW5zIHdlcmUgZGVsZXRlZC5cbiAgdXNlcnMuX2Vuc3VyZUluZGV4KCdzZXJ2aWNlcy5yZXN1bWUuaGF2ZUxvZ2luVG9rZW5zVG9EZWxldGUnLFxuICAgIHsgc3BhcnNlOiB0cnVlIH0pO1xuICAvLyBGb3IgZXhwaXJpbmcgbG9naW4gdG9rZW5zXG4gIHVzZXJzLl9lbnN1cmVJbmRleChcInNlcnZpY2VzLnJlc3VtZS5sb2dpblRva2Vucy53aGVuXCIsIHsgc3BhcnNlOiB0cnVlIH0pO1xuICAvLyBGb3IgZXhwaXJpbmcgcGFzc3dvcmQgdG9rZW5zXG4gIHVzZXJzLl9lbnN1cmVJbmRleCgnc2VydmljZXMucGFzc3dvcmQucmVzZXQud2hlbicsIHsgc3BhcnNlOiB0cnVlIH0pO1xuICB1c2Vycy5fZW5zdXJlSW5kZXgoJ3NlcnZpY2VzLnBhc3N3b3JkLmVucm9sbC53aGVuJywgeyBzcGFyc2U6IHRydWUgfSk7XG59O1xuIl19
