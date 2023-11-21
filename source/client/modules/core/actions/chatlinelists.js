import {
  Random
} from 'meteor/random';
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
  addChatLine({
    LocalState,
    FlowRouter
  }, channelId, chatLine, callback) {

    DEFCON5 && console.log("In chatlinelists.addChatLine action " + channelId);
    Meteor.call('chatlinelists.addChatLine', channelId, chatLine, (err, result) => {
      if (callback) {
        callback(err, result);
      }
    });
  },

  removeChatLine({
    LocalState,
    FlowRouter
  }, channelId, chatLineId, callback) {

    DEFCON5 && console.log("In chatlinelists.removeChatLine action " + chatLineId);
    Meteor.call('chatlinelists.removeChatLine', channelId, chatLineId, (err, result) => {
      if (callback) {
        callback(err, result);
      }
    });
  },


  clearErrors({
    LocalState
  }) {
    return LocalState.set('FILES_ERROR', null);
  }
};
