// subscribe on node and node children
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Nodes, NodeLinks } from "/lib/collections";
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
  Meteor.publish("nodes.all", function () {
    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }
    // DEFCON5 && console.log("nodes.all");

    this.autorun(function (computation) {
      const nodesSelector = {
        status: "active",
      };

      DEFCON5 && console.log("Get all nodes");

      // DEFCON5 && console.log(usersWithAvatars);
      return [Nodes.find(nodesSelector)];
    });
  });

  Meteor.publish("nodes.access", function (nodeId) {
    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }
    check(nodeId, String);
    // DEFCON5 && console.log("In publication/nodes.access");
    // DEFCON5 && console.log(nodeId);

    this.autorun(function (computation) {
      const nodesSelector = {
        _id: nodeId,
        status: "active",
      };

      DEFCON5 && console.log("Find nodes");

      // DEFCON5 && console.log(usersWithAvatars);
      return [Nodes.find(nodesSelector)];
    });
  });
  Meteor.publish("nodes.getTree", function (nodeId) {
    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }
    check(nodeId, String);
    // DEFCON5 && console.log("In publication/nodes.getTree");
    // DEFCON5 && console.log(nodeId);

    const queue = [nodeId];
    const seenNodeIds = new Set();
    const seenLinkIds = new Set();

    while (queue.length) {
      const currentId = queue.shift();

      if (seenNodeIds.has(currentId)) continue;

      seenNodeIds.add(currentId);

      const links = NodeLinks.find({ parentId: currentId }).fetch();

      for (const link of links) {
        if (!seenLinkIds.has(link._id)) {
          seenLinkIds.add(link._id);
          queue.push(link.childId);
        }
      }
    }

    

    // DEFCON5 && console.log("Found nodes and links:", seenNodeIds, seenLinkIds);

    return [
      Nodes.find({ _id: { $in: [...seenNodeIds] } }),
      NodeLinks.find({ _id: { $in: [...seenLinkIds] } }),
    ];


  });
}

// function that reads the node and returns the node and all children based on the NodeLinks collection
function _getNodesAndChildren(nodeId, deepth, maxDeepth) {
  // get the node
  const node = Nodes.findOne({ _id: nodeId });
  // get the children of the node based on the NodeLinks collection
  const children = NodeLinks.find({ source: nodeId }).fetch();

  // if the deepth is less than the maxDeepth, get the next level of nodes
  if (deepth < maxDeepth) {
    // loop through the children
    for (let i = 0; i < children.length; i++) {
      // get the children of the children
      const child = _getNodesAndChildren(
        children[i].target,
        deepth + 1,
        maxDeepth
      );
      // add the children to the children array
      children[i].children = child;
    }
  }
  // return the node and the children
  return { node, children };
}
