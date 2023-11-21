import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1
} from "/debug.json";

import {USER_ACTION_ACTIVATE, USER_ACTION_DEACTIVATE} from "/lib/constants";

export default {

  add({
        Meteor,
        LocalState,
        FlowRouter
      }, user, callback) {
    // DEFCON7 && console.log('actions._users.add data', data);

    Meteor.call('_users.add', user, (err, response) => {
      if (callback) {
        if (err) {
          callback(err);
        } else {
          callback(null, response);
        }
      }
      if (err) {
        DEFCON3 && console.log('actions._users.add error: ' + err);
      }

    });

  },

  manage(
    {
      Meteor,
      LocalState,
      FlowRouter
    }, uid, action, callback) {

    if (!uid || (action !== USER_ACTION_ACTIVATE && action !== USER_ACTION_DEACTIVATE)) {
      if (callback) {
        callback(`actions._users.manage invalid parameters: ${uid} / ${action}`)
      }
    }

    DEFCON5 && console.log(`actions._users.manage ${uid} / ${action}`);
    Meteor.call('_users.manage', uid, action, (err, response) => {
      if (callback) {
        if (err) {
          callback(err);
        } else {
          callback(null, response);
        }
      }
      if (err) {
        DEFCON3 && console.log('actions._users.manage error: ' + err);
      }

    });

  },


  clearErrors({
                LocalState
              }) {
    LocalState.set('_users.DELETE_ERROR', null);
    return LocalState.set('_users.SAVE_ERROR', null);
  }

};
