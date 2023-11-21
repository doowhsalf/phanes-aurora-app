import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
// import _ from 'lodash';
import { Random } from "meteor/random";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";

export default function () {
  Meteor.methods({
    async "agent.get4User"(userId) {
      check(userId, string);

      DEFCON5 && console.log("agent.get4User");

      const doWork = async () => {
       
        return null;
      };

      try {
        return await doWork();
      } catch (e) {
        throw new Meteor.Error(e.error, e.reason);
      }
    },
  });
}