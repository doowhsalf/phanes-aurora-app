import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Agents, AgentUserConnections } from "/lib/collections";
import { Mongo } from "meteor/mongo";

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
  DEFCON3 && console.log("Setting up Agent stuff");

  Meteor.publish("agents.for.user", function (userId) {
    DEFCON3 && console.log("In agent  subscribe function");
    check(userId, String);
    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }
    this.autorun(function (computation) {
      DEFCON3 && console.log("Subscribing agent");
      DEFCON3 && console.log("Searching for agents for user " + userId);

      const Selector = {
        user_id: userId,
      };

      let agents_connections = AgentUserConnections.find(Selector);
      DEFCON3 && console.log("Agent list");

      DEFCON3 && console.log(agents_connections.fetch());
      // subscribe for all agents that are connected to this user where id is object id and stored with ObjectId("641717047908426fab3d9497"
      const objectIdArray = agents_connections
        .fetch()
        .map((connection) => {
          // Check that the _id field is a valid ObjectId string
          if (
            typeof connection.agent_id === "string" &&
            connection.agent_id.length === 24
          ) {
            // Convert the string to an ObjectId instance
            return new Mongo.ObjectID(connection.agent_id);
          } else {
            // Return null if the _id field is not a valid ObjectId string
            return null;
          }
        })
        .filter((objectId) => objectId !== null);

      // Find documents where the _id field matches any value in the objectIdArray

      let agents = Agents.find({ _id: { $in: objectIdArray } });

      DEFCON3 && console.log("Agent connections");
      DEFCON3 && console.log(agents.fetch());

      return agents;
    });
  });
}
