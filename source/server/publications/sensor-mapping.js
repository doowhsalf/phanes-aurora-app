// subscribe on node and node children
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { SensorMapping } from "/lib/collections";
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
  Meteor.publish("sensormapping.all", function () {
    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }
    DEFCON5 && console.log("sensormapping.all");

    this.autorun(function (computation) {
      const dataSelector = {
      };

      DEFCON3 && console.log("Get all SensorMapping");
      // var sort = [["timestamp_read", -1.0]];
      let nodes = SensorMapping.find(dataSelector, {
        limit: 1500,
      });
      return [nodes];
    });
  });
}

