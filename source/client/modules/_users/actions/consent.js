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
  saveArticles({ LocalState, FlowRouter }, articles, callback) {
    Meteor.call("consent.saveArticles", articles, (err, result) => {
      if (err) {
        DEFCON5 && console.log(err);
      }

      if (callback) {
        callback(err, result);
      }
    });
  },
};
