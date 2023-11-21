import {
  Random
} from "meteor/random";
import {
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1
} from "/debug.json";


export default {
  sendQuestion({
                 LocalState, FlowRouter
               }, query, callback) {
    DEFCON5 && console.log("contact.sendQuestion action");
    Meteor.call("contact.sendQuestion", query, (err, result) => {
      if (!err) {
        DEFCON5 && console.log("Result in client to handle ");
        DEFCON5 && console.log(result);
        if (callback) {
          callback(err, result);
        }

      }
    });
  },


  clearErrors({
                LocalState
              }) {
    return LocalState.set("FILES_ERROR", null);
  }
};
