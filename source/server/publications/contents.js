// subscribe on node and node children
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Contents } from "/lib/collections";
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
  Meteor.publish("contents.all", function () {
    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }
    DEFCON5 && console.log("Contents.all");

    this.autorun(function (computation) {
      const nodesSelector = {
        
      };

      DEFCON5 && console.log("Get all nodes");

      return [Contents.find(nodesSelector)];
    });
  });

  Meteor.publish("contents.get", function (nodeId) {
    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }
    check(nodeId, String);
    DEFCON5 && console.log("In publication/Content.get");
    DEFCON5 && console.log(nodeId);

    this.autorun(function (computation) {
      const nodesSelector = {
        _id: nodeId,
      };

      DEFCON5 && console.log("Find node with id: ", nodeId);
      return [Contents.find(nodesSelector)];
    });
  });
  Meteor.publish("Contents.getTree", function (nodeId) {
    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }
    check(nodeId, String);
    DEFCON5 && console.log("In publication/Contents.getTree");
    DEFCON5 && console.log(nodeId);

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

    

    DEFCON5 && console.log("Found nodes and links:", seenNodeIds, seenLinkIds);

    return [
      Contents.find({ _id: { $in: [...seenNodeIds] } }),
      NodeLinks.find({ _id: { $in: [...seenLinkIds] } }),
    ];


  });
}

// function that reads the node and returns the node and all children based on the NodeLinks collection
function _getNodesAndChildren(nodeId, deepth, maxDeepth) {
  // get the node
  const node = Contents.findOne({ _id: nodeId });
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
