// import {Accounts} from 'meteor/meteor';
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1
} from "/debug.json";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

export default {
  login({
    Meteor,
    LocalState,
    FlowRouter
  }, email, password, loginWithDrupal) {
    loginWithDrupal = true;

    if (!email || !password) {
      return LocalState.set('LOGIN_ERROR', 'Login & Password are required!');
    }

    const onLoginResult = function (err) {
      if (err) {
        DEFCON7 && console.log('login failed');
        DEFCON7 && console.log(err.reason);
        if (err.reason) {
          return LocalState.set('LOGIN_ERROR', i18n.__('Label_LoginForm_LdapError'));
        }
      } else {
        DEFCON7 && console.log("Ok, all set. Let's login");
        FlowRouter.go("/mcc");
      }
    };
    LocalState.set('LOGIN_ERROR', null);
    if (loginWithDrupal) {
      let user;
      DEFCON7 && console.log('ok, will login with Drupal');
      if (email.indexOf('@') > 0) {
        user = email.substr(0, email.indexOf('@'));
      } else {
        user = email;
      }

      Meteor.loginWithDrupal(user, password, undefined, onLoginResult);
    } else {
      Meteor.loginWithPassword(email, password, onLoginResult);
    }
  },

  loginErrorClear({
    LocalState
  }) {
    return LocalState.set('LOGIN_ERROR', null);
  },

  register({
    Meteor,
    LocalState,
    FlowRouter
  }, email, password1, password2) {
    if (!email || !password1 || !password2) {
      return LocalState.set('REGISTER_ERROR', 'Please fill out all the required fields!');
    }

    if (password1 !== password2) {
      return LocalState.set('REGISTER_ERROR', 'Passwords do not match!');
    }

    Accounts.createUser({
      email,
      password: password1
    }, err => {
      if (err && err.reason) {
        return LocalState.set('REGISTER_ERROR', err.reason);
      }
      FlowRouter.go('/');
    });
  },

  registerErrorClear({
    LocalState
  }) {
    return LocalState.set('REGISTER_ERROR', null);
  }
};
Meteor.loginWithDrupal = function (
  user,
  password,
  customLdapOptions,
  callback
) {
  let DEFCON3 = true;
  // Retrieve arguments as array
  DEFCON3 && console.log("loginWithDrupal1");
  var args = [];
  for (var i = 0; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  // Pull username and password
  user = args.shift();
  password = args.shift();
  DEFCON3 && console.log("Step New 2");

  // Check if last argument is a function
  // if it is, pop it off and set callback to it
  if (typeof args[args.length - 1] === "function") {
    callback = args.pop();
  } else {
    callback = null;
  }

  DEFCON3 && console.log("Step New 3");

  // if args still holds options item, grab it
  if (args.length > 0) {
    customLdapOptions = args.shift();
  } else {
    customLdapOptions = {};
  }

  DEFCON3 && console.log("Step New 4");
  DEFCON3 && console.log(args);
  // Set up loginRequest object
  var loginRequest = _.defaults(
    {
      username: user,
      ldapPass: password,
    },
    {
      drupal: true,
      ldapOptions: customLdapOptions,
    }
  );
  DEFCON3 && console.log("Step New 4");
  DEFCON3 && console.log(args);
  Accounts.callLoginMethod({
    // Call login method with ldap = true
    // This will hook into our login handler for ldap
    methodArguments: [loginRequest],
    userCallback(error, result) {
      if (error) {
        DEFCON3 && console.log("login error");
        callback && callback(error);
      } else {
        DEFCON3 && console.log("login ok");
        DEFCON3 && console.log(result);
        callback && callback();
      }
    },
  });
};