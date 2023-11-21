import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";

import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";
import Constants from "/lib/constants";

DEFCON5 && console.log("In Account");

var staleSessionPurgeInterval =
  (Meteor.settings &&
    Meteor.settings.public &&
    Meteor.settings.public.staleSessionPurgeInterval) ||
  1 * 60 * 1000; // 1min
var inactivityTimeout =
  (Meteor.settings &&
    Meteor.settings.public &&
    Meteor.settings.public.staleSessionInactivityTimeout) ||
  30 * 60 * 1000; // 30mins
var forceLogout = Meteor.settings && Meteor.settings.public && Meteor.set;

export default function () {
  Meteor.methods({
    heartbeat: function (options) {
      DEFCON5 && console.log(`Heartbeat check - if user should reConnect`);
      var user = Meteor.users.findOne(this.userId);
      DEFCON5 && console.log(this.userId);

      if (user) {
        DEFCON5 && console.log(`Get user and update heartbeat...`);
        DEFCON5 && console.log(user._id + " " + user.name);
        let updated = Meteor.users.update(
          { _id: this.userId },
          {
            $set: { heartbeat: new Date(), isOnline: true },
          },
          function (error) {
            DEFCON5 && console.log(`Some error occured.`);
            DEFCON5 && console.log(error);
          }
        );

        DEFCON5 && console.log(`Result after update is...`);
        DEFCON5 && console.log(updated);
      } else {
        DEFCON5 && console.log(`This userid is not set...`);
      }
      // if (user) {
      //   DEFCON5 && console.log(`Get user and update heartbeat...`);
      //   DEFCON5 && console.log(user.uid + " " + user.username);
      //   Meteor.users.update(user._id, { $set: { heartbeat: new Date() } });
      // }
    },
    //
  });
}

//
// periodically purge any stale sessions, removing their login tokens and clearing out the stale heartbeat.
//
if (forceLogout !== false) {
  DEFCON5 && console.log(`HeartBeatChec Check if users still online...`);
  DEFCON5 && console.log(staleSessionPurgeInterval);

  Meteor.setInterval(function () {
    DEFCON5 && console.log(`HeartBeatCheck Server Check...`);

    var now = new Date(),
      overdueTimestamp = new Date(now - inactivityTimeout);
    DEFCON5 && console.log(inactivityTimeout);
    DEFCON5 && console.log(overdueTimestamp);
    DEFCON5 && console.log(staleSessionPurgeInterval);
    Meteor.users.update(
      { heartbeat: { $lt: overdueTimestamp } },
      {
        $set: { "services.resume.loginTokens": [] },
        $set: { heartbeat: 1, isOnline: false },
      },
      { multi: true },
      function (error) {
        DEFCON5 && console.log(`Some error occured.`);
        DEFCON5 && console.log(error);
      }
    );
    Meteor.users.update(
      { heartbeat: { $gt: overdueTimestamp } },
      {
        $set: { isOnline: true },
      },
      { multi: true },
      function (error) {
        DEFCON5 && console.log(`Some error occured.`);
        DEFCON5 && console.log(error);
      }
    );
  }, staleSessionPurgeInterval);
}
