import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { MccConfig } from "/lib/collections";
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
  DEFCON7 && console.log("Setting up mcc -config");

  Meteor.publish("mccConfig.all", function () {
    DEFCON7 && console.log("In the subscribe function");

    // if (!this.userId) {
    //   throw new Meteor.Error(401, "Access denied");
    // }
    this.autorun(function (computation) {
      DEFCON7 && console.log("Subscribing MCC Configs");

      const Selector = {
        status: "active",
      };

      let mccConfig = MccConfig.find(Selector);
      DEFCON7 && console.log(mccConfig);

      return mccConfig;
    });
  });

  Meteor.publish("mccConfig.one", function (facility) {
    DEFCON7 && console.log("In mccConfig.one  subscribe function");
    check(facility, String);
    // if (!this.userId) {
    //   throw new Meteor.Error(401, "Access denied");
    // }
    this.autorun(function (computation) {
      DEFCON7 && console.log("Subscribing mccConfig");

      const Selector = {
        facility: facility,
        status: "active",
      };

      let mccConfig = MccConfig.find(Selector);
      DEFCON7 && console.log(mccConfig);

      return mccConfig;
    });
  });

  Meteor.publish("mccConfig.CountRead", function (facility) {
    DEFCON7 && console.log("In mccConfig.CountRead  subscribe function");
    check(facility, String);
    // if (!this.userId) {
    //   throw new Meteor.Error(401, "Access denied");
    // }
    this.autorun(function (computation) {
      DEFCON7 && console.log("Subscribing CountRead");

      var options = {
        allowDiskUse: true,
      };

      var pipeline = [
        {
          $match: {
            read_proc_status: "OK",
          },
        },
        {
          $group: {
            _id: {},
            numOfRead: {
              $sum: 1,
            },
          },
        },
        {
          $project: {
            numOfRead: "$numOfRead",
            _id: 0,
          },
        },
      ];

      let mccConfig = MccConfig.aggregate(pipeline, options);
      DEFCON7 && console.log(mccConfig);

      return mccConfig;
    });
  });
}
