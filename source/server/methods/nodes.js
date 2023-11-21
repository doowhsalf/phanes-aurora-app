import { Nodes, NodeLinks } from "/lib/collections";
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

DEFCON3 && console.log("In Nodes server, getting the stuff");

// This is the server side method for adding a node
// make methods for adding a node, deleting a node, and updating a node

export default function () {
  Meteor.methods({
    "nodes.addNode"(nodeObject) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      check(nodeObject, Object);

      const currentUser = Meteor.user()._id;
      const currentUserId = Meteor.user()._id;
      const currentDate = new Date();

      DEFCON4 && console.log("In nodes.addNode, Upsert node: ", nodeObject);

      // if the nodeObject has an _id, then we are updating an existing node
      if (nodeObject._id) {
        // if the nodeObject has an _id, then we are updating an existing node
        // so we need to check if the user is the owner of the node
        const node = Nodes.findOne({ _id: nodeObject._id });

        // we dont need to check if owner is same as current user
        // if (node.owner !== currentUserId) {
        //   throw new Meteor.Error(401, "Access denied");
        // }
        // upsert the node
        Nodes.upsert(
          { _id: nodeObject._id },
          { $set: { ...nodeObject, lastUpdated: currentDate } }
        );
      } else {
        // if the nodeObject does not have an _id, then we are adding a new node
        // so we need to add the owner and created fields
        Nodes.insert({
          ...nodeObject,
          owner: currentUser,
          created: currentDate,
          lastUpdated: currentDate,
        });
      }
    },
  });

  Meteor.methods({
    "nodes.removeNode"(nodeId) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      check(nodeId, String);

      const currentUser = Meteor.user()._id;
      const currentDate = new Date();

      Nodes.update(nodeId, {
        $set: {
          status: "archived",
          modifiedBy: currentUser,
          modifiedAt: currentDate,
        },
      });

      DEFCON5 &&
        console.log(
          "In removeNode method on server, removed node with id: " + nodeId
        );
      return nodeId;
    },
  });
  // store a link between two nodes
  Meteor.methods({
    "nodes.addLink"(linkObject) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      check(linkObject, Object);

      const currentUser = Meteor.user()._id;
      const currentUserId = Meteor.user()._id;
      const currentDate = new Date();

      DEFCON4 && console.log("In nodes.addLink, Upsert link: ", linkObject);

      // if the linkObject has an _id, then we are updating an existing link
      if (linkObject._id) {
        // if the linkObject has an _id, then we are updating an existing link
        // so we need to check if the user is the owner of the link
        const link = NodeLinks.findOne({ _id: linkObject._id });
        // we dont need to check if owner is same as current user
        // if (link.owner !== currentUserId) {
        //   throw new Meteor.Error(401, "Access denied");
        // }
        // upsert the link
        NodeLinks.upsert(
          { _id: linkObject._id },
          { $set: { ...linkObject, lastUpdated: currentDate } }
        );
      } else {
        // if the linkObject does not have an _id, then we are adding a new link
        // so we need to add the owner and created fields
        NodeLinks.insert({
          ...linkObject,
          owner: currentUser,
          created: currentDate,
          lastUpdated: currentDate,
        });
      }
    },
  });
  Meteor.methods({
    getTreeStructurev1: function (startNodeId) {
      check(startNodeId, String);
      DEFCON2 && console.log("In getTreeStructure method on server");
      DEFCON2 && console.log(" startNodeId: " + startNodeId);

      const nodeCollection = Nodes; // Assuming you've defined Nodes as your collection
      const nodeLinksCollection = NodeLinks;

      function buildNode(_id) {
        const node = nodeCollection.findOne({ _id });
        if (!node) {
          return null;
        }

        const links = nodeLinksCollection.find({ parentId: _id }).fetch();

        const children = [];
        for (const link of links) {
          const childNode = buildNode(link.childId);
          if (childNode) {
            children.push(childNode);
          }
        }

        return {
          ...node,
          children,
        };
      }
      console.log("buildNode(startNodeId)");
      console.log(buildNode(startNodeId));
      return buildNode(startNodeId);
    },
  });
  Meteor.methods({
    getTreeStructure: function (startNodeId) {
      check(startNodeId, String);
      // DEFCON2 && console.log("In getTreeStructure method on server");
      // DEFCON2 && console.log(" startNodeId: " + startNodeId);

      const nodeCollection = Nodes; // Assuming you've defined Nodes as your collection
      const nodeLinksCollection = NodeLinks;

      function buildNode(_id) {
        // DEFCON2 && console.log("Building node for _id: " + _id);

        const node = nodeCollection.findOne({ _id });
        if (!node) {
          return null;
        }

        const links = nodeLinksCollection.find({ parentId: _id }).fetch();

        // DEFCON2 && console.log(`Found ${links.length} links for node ${_id}`);

        const children = [];
        for (const link of links) {
          /*DEFCON2 &&
            console.log(`Processing link with childId: ${link.childId}`);*/
          const childNode = buildNode(link.childId); // Removed await because Meteor's Mongo API is synchronous
          if (childNode) {
            children.push(childNode);
          }
        }

        return {
          ...node,
          children,
        };
      }
      //DEFCON2 && console.log("buildNode(startNodeId)");
      //DEFCON2 && console.log(buildNode(startNodeId));
      return buildNode(startNodeId);
    },
  });
}
