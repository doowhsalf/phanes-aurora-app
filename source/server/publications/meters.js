// subscribe on node and node children
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Meters } from "/lib/collections";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";

//subscribe on nodes and node children
export default function () {
  // subscribe on all nodes
  Meteor.publish("meters.all", function () {
    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }
    // DEFCON5 && console.log("meters.all");

    this.autorun(function (computation) {
      const nodesSelector = {};

      DEFCON5 && console.log("Get all nodes");

      // DEFCON5 && console.log(usersWithAvatars);
      return [Meters.find(nodesSelector)];
    });
  });

  Meteor.publish("meters.access", function (nodeId) {
    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }
    check(nodeId, String);
    // DEFCON5 && console.log("In publication/meters.access");
    // DEFCON5 && console.log(nodeId);

    this.autorun(function (computation) {
      const nodesSelector = {
        _id: nodeId,
        status: "active",
      };

      DEFCON5 && console.log("Find nodes");

      // DEFCON5 && console.log(usersWithAvatars);
      return [meters.find(nodesSelector)];
    });
  });
}
