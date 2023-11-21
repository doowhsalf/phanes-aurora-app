import { Events } from "/lib/collections";
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

DEFCON3 && console.log("In Nodes server, getting the stuff");

// This is the server side method for adding a node
// make methods for adding a node, deleting a node, and updating a node

export default function () {
  Meteor.methods({
    "events.getEventsForNode"(point_id, startDate, endDate) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      check(point_id, String);

      const currentUser = Meteor.user()._id;
      const currentUserId = Meteor.user()._id;
      const currentDate = new Date();

      // use startDate and endDate and set to default if not provided (for endDate set to 20 years from now)
      startDate = startDate ? startDate : new Date();
      endDate = endDate ? endDate : new Date() + 631152000000;

      var query = {
        point_id: point_id,
      };

      // if the nodeObject has an _id, then we are updating an existing node
      // so we need to check if the user is the owner of the node
      const nodes = Events.find(query).fetch();
      DEFCON4 &&
        console.log("NODE: ", point_id, " - ", startDate, " - ", endDate);
      DEFCON4 && console.log("Found nodes: ", processRawData(nodes));

      return processRawData(nodes, startDate, endDate);
    },
  });
}

const processRawData = (rawData, startDate = null) => {
  const currentDate = startDate ? new Date(startDate) : new Date();
  const oneDayAgo = new Date(currentDate - 24 * 60 * 60 * 1000);
  const oneWeekAgo = new Date(currentDate - 7 * 24 * 60 * 60 * 1000);
  const oneMonthAgo = new Date(currentDate - 30 * 24 * 60 * 60 * 1000); // Assuming 30 days for simplicity
  const oneYearAgo = new Date(currentDate - 365 * 24 * 60 * 60 * 1000); // Assuming 365 days for simplicity

  const historyData = rawData.reduce((acc, doc) => {
    const date = new Date(parseInt(doc.timestamp_write) * 1000);
    const dateString = date.toISOString().split("T")[0];
    const timeString = date.toISOString().split("T")[1].substring(0, 5);

    // Helper function to initialize accumulator keys
    const initializeKey = (key) => {
      if (!acc[key]) {
        acc[key] = {
          dates: [],
          values: [],
        };
      }
    };

    initializeKey("24h");
    initializeKey("1day");
    initializeKey("1week");
    initializeKey("1month");
    initializeKey("1year");

    // Filter data into different time intervals
    if (date > oneDayAgo) {
      acc["24h"].dates.push(`${dateString} ${timeString}`);
      acc["24h"].values.push(parseFloat(doc.value));
    }
    if (
      date.toISOString().split("T")[0] ===
      currentDate.toISOString().split("T")[0]
    ) {
      acc["1day"].dates.push(timeString);
      acc["1day"].values.push(parseFloat(doc.value));
    }
    if (date > oneWeekAgo) {
      acc["1week"].dates.push(`${dateString} ${timeString}`);
      acc["1week"].values.push(parseFloat(doc.value));
    }
    if (date > oneMonthAgo) {
      acc["1month"].dates.push(`${dateString} ${timeString}`);
      acc["1month"].values.push(parseFloat(doc.value));
    }
    if (date > oneYearAgo) {
      acc["1year"].dates.push(`${dateString} ${timeString}`);
      acc["1year"].values.push(parseFloat(doc.value));
    }

    return acc;
  }, {});

  return historyData;
};

const processRawDataOld = (rawData, startDate, endDate) => {
  const historyData = rawData.reduce((acc, doc) => {
    const date = new Date(parseInt(doc.timestamp_write) * 1000);
    const dateString = date.toISOString().split("T")[0];
    const timeString = date.toISOString().split("T")[1].substring(0, 5);

    if (!acc["1day"]) {
      acc["1day"] = {
        dates: [],
        values: [],
      };
    }

    if (!acc["24h"]) {
      acc["24h"] = {
        dates: [],
        values: [],
      };
    }

    acc["1day"].dates.push(timeString);
    acc["1day"].values.push(parseFloat(doc.value));

    acc["24h"].dates.push(`${dateString} ${timeString}`);
    acc["24h"].values.push(parseFloat(doc.value));

    return acc;
  }, {});

  return historyData;
};
