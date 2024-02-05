import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { WorkOrders } from "/lib/collections";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";
import { object } from "prop-types";
export default function () {
  Meteor.publish("workorders.open.search", function (dataSelector, limit) {
    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }

    DEFCON5 && console.log("workorders.open.search");
    DEFCON5 && console.log(dataSelector);
    DEFCON5 && console.log(limit);
    check(dataSelector, Object);
    check(limit, Number);

    this.autorun(function (computation) {
      var projection = {};

      var sort = [["Created", -1]];

      let myLimit = limit ? limit : 200;

      DEFCON5 && console.log("Get the node");
      // make a time to calculate the time it takes to get the node
      let start = new Date().getTime();
      // DEFCON5 && console.log(usersWithAvatars);
      let nodes = WorkOrders.find(dataSelector, {
        projection,
        sort,
        limit: myLimit,
      });
      let end = new Date().getTime();
      let execution = end - start;
      DEFCON5 && console.log("Execution time: " + execution);
      DEFCON5 && console.log("DONE Get the node");
      DEFCON5 && console.log("Number of nodes: " + nodes.count());
      // DEFCON5 && console.log(nodes.fetch());
      return [nodes];
    });
  });
  Meteor.publish("workorders.search", function () {
    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }

    DEFCON5 && console.log("workorders.search");

    this.autorun(function (computation) {
      var projection = {};
      var dataSelector = {};
      var sort = [["created", -1]];
      var limit = 200;

      let myLimit = limit ? limit : 200;

      DEFCON5 && console.log("Get the node");
      // make a time to calculate the time it takes to get the node
      let start = new Date().getTime();
      // DEFCON5 && console.log(usersWithAvatars);
      let nodes = WorkOrders.find(dataSelector, {
        projection,
        sort,
        limit: myLimit,
      });
      let end = new Date().getTime();
      let execution = end - start;
      DEFCON5 && console.log("Execution time: " + execution);
      DEFCON5 && console.log("DONE Get the node");
      DEFCON5 && console.log("Number of nodes: " + nodes.count());
      // DEFCON5 && console.log(nodes.fetch());
      return [nodes];
    });
  });
}
