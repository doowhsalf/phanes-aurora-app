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

/**
 * query:
 {
      firstName: "",
      lastName: "",
      ssnNumber: "",
      year: "",
      month: "",
      day: "",
}
 **/

export default {
  findPerson({
               LocalState,
               FlowRouter
             }, query, callback) {
    DEFCON5 && console.log("search.findPerson action");
    Meteor.call("search.findPerson", query, (err, result) => {
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
