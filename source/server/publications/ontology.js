// subscribe on node and node children
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Ontology } from "/lib/collections";
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
  Meteor.publish("ontology.all", function () {
    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }
    DEFCON5 && console.log("ontology.all");

    this.autorun(function (computation) {
      const dataSelector = {
      };

      DEFCON5 && console.log("Get all nodes");
      /*      */
      // DEFCON5 && console.log(usersWithAvatars);
      var sort = [["timestamp_read", -1.0]];
      let nodes = Ontology.find(dataSelector, {
        sort,
        limit: 1500,
      });
      return [nodes];
    });
  });

}

// function that reads the node and returns the node and all children based on the links collection
function _getNodesAndChildren(nodeId, deepth, maxDeepth) {
  // get the node
  const node = Nodes.findOne({ _id: nodeId });
  // get the children of the node based on the links collection
  const children = Links.find({ source: nodeId }).fetch();

  // if the deepth is less than the maxDeepth, get the next level of nodes
    if (deepth < maxDeepth) {
        // loop through the children
        for (let i = 0; i < children.length; i++) {
            // get the children of the children
            const child = _getNodesAndChildren(children[i].target, deepth + 1, maxDeepth);
            // add the children to the children array
            children[i].children = child;
        }
    }
  // return the node and the children
  return { node, children };
}
