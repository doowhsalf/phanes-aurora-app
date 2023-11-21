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
export default {
  resetPassword({
    Meteor,
    LocalState,
    FlowRouter
  }, email) {
    //"use strict";
    Accounts.forgotPassword({
      email: email
    }, function (err) {
      if (err) {
        if (err.message === 'User not found [403]') {
          let msg = 'This email does not exist.';
          DEFCON7 && console.log(msg);
          return LocalState.set('PASSWORD_ERROR', msg);
        } else {
          let msg = 'We are sorry but something went wrong.';
          DEFCON7 && console.log(msg);
          return LocalState.set('PASSWORD_ERROR', msg);
        }
      } else {
        DEFCON7 && console.log('Email Sent. Check your mailbox.');
        FlowRouter.go('/');
      }
    });
  },

  passwordErrorClear({
    LocalState
  }) {
    return LocalState.set('PASSWORD_ERROR', null);
  },

};
