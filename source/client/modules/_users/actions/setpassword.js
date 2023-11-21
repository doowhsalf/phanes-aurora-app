// import {Accounts} from 'meteor/meteor';
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";

export default {
  setPassword({ Meteor, LocalState, FlowRouter }, token, newPassword) {
    //"use strict";

    if (token) {
      Accounts.resetPassword(token, newPassword, function (err) {
        if (err) {
          DEFCON5 && console.log(err);
          return LocalState.set("SETPASSWORD_ERROR", err.reason);
        } else {
          FlowRouter.go("/start");
        }
      });
    } else {
      Meteor.call("_users.setPassword", newPassword, (err, response) => {
        if (err) {
          return LocalState.set("SETPASSWORD.ERROR", err.message);
        }
        if (response) {
          DEFCON3 && console.log(`Password set for user ${response}`);
          FlowRouter.go("/start");
        }
      });
    }
  },

  setPasswordErrorClear({ LocalState }) {
    return LocalState.set("SETPASSWORD_ERROR", null);
  },
};
