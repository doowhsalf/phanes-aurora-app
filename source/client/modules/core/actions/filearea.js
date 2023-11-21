import { Random } from "meteor/random";
import { DEFCON5, DEFCON4, DEFCON3, DEFCON2, DEFCON1 } from "/debug.json";

export default {
  fileareaQuery({ LocalState, FlowRouter }, query, callback) {
    DEFCON3 && console.log("filearea.fileareaQuery action");
    Meteor.call("filearea.fileareaQuery", query, (err, result) => {
      if (!err) {
        DEFCON3 && console.log("Result in client to handle ");
        DEFCON3 && console.log(result);
        if (callback) {
          callback(err, result);
        }
      }
    });
  },

  fileareaGetItem({ LocalState, FlowRouter }, query, callback) {
    DEFCON3 && console.log("filearea.fileareaGetItem action");
    Meteor.call("filearea.fileareaGetItem", query, (err, result) => {
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
