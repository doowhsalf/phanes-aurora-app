import { Random } from "meteor/random";
import { DEFCON5, DEFCON4, DEFCON3, DEFCON2, DEFCON1 } from "/debug.json";

export default {
  getArticle({ LocalState, FlowRouter }, query, callback) {
    DEFCON5 && console.log("contact.getArticle action");
    Meteor.call("content.getArticle", query, (err, result) => {
      if (!err) {
        DEFCON3 && console.log("Result in client to handle ");
        DEFCON3 && console.log(result);
        if (callback) {
          callback(err, result);
        }
      }
    });
  },

  clearErrors({ LocalState }) {
    return LocalState.set("FILES_ERROR", null);
  }
};
