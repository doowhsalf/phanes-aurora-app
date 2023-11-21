// Pass in username, password as normal
// customLdapOptions should be passed in if you want to override LDAP_DEFAULTS
// on any particular call (if you have multiple ldap servers you'd like to connect to)
// You'll likely want to set the dn value here {dn: "..."}
Meteor.loginWithDrupal = function(user, password, customLdapOptions, callback) {
  // Retrieve arguments as array
  console.log('loginWithDrupal1');
  var args = [];
  for (var i = 0; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  // Pull username and password
  user = args.shift();
  password = args.shift();
  console.log('Step 2');

  // Check if last argument is a function
  // if it is, pop it off and set callback to it
  if (typeof args[args.length - 1] == 'function') 
    callback = args.pop();
  else 
    callback = null;
  
  console.log('Step 3');

  // if args still holds options item, grab it
  if (args.length > 0) 
    customLdapOptions = args.shift();
  else 
    customLdapOptions = {};
  
  console.log('Step 4');
  console.log(args);
  // Set up loginRequest object
  var loginRequest = _.defaults({
    username: user,
    ldapPass: password
  }, {
    drupal: true,
    ldapOptions: customLdapOptions
  });

  Accounts.callLoginMethod({
    // Call login method with ldap = true
    // This will hook into our login handler for ldap
    methodArguments: [loginRequest],
    userCallback: function(error, result) {
      if (error) {
        callback && callback(error);
      } else {
        console.log('login callback');
        console.log(result);
        callback && callback();
      }
    }
  });
};
