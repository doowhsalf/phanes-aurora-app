import { Random } from "meteor/random";
import { DEFCON5, DEFCON4, DEFCON3, DEFCON2, DEFCON1 } from "/debug.json";

export default {
  setPw({ LocalState, FlowRouter }, query, callback) {
    DEFCON4 && console.log("setPW for user");
    Meteor.call("account.setPw", query, (err, result) => {
      if (!err) {
        DEFCON4 && console.log("Result in client to handle ");
        DEFCON4 && console.log(result);
        if (callback) {
          callback(err, result);
        }
      }
    });
  },

  setLang({ LocalState, FlowRouter }, language, callback) {
    DEFCON4 && console.log("setLanguagePreference for user");
    DEFCON4 && console.log(language);

    Meteor.call(
      "_users.setLanguagePreference",
      Meteor.userId(),
      language,
      (err, result) => {
        if (!err) {
          DEFCON4 && console.log("Set Lang without errors...");
          if (callback) {
            callback(err, result);
          }
        }
      }
    );
  },

  clearErrors({ LocalState }) {
    return LocalState.set("account.setpw", null);
  }
};
