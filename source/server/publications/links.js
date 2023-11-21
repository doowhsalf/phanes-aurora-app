// subscribe on link children
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Nodes, Links } from "/lib/collections";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";

//subscribe on links and link children
export default function () {
  // subscribe on all links
  Meteor.publish("links.all", function () {
    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }
    DEFCON5 && console.log("links.all");
    DEFCON5 && console.log(linkId);

    this.autorun(function (computation) {
      const linksSelector = {
        status: "active",
      };

      DEFCON5 && console.log("Get all links");

      // DEFCON5 && console.log(usersWithAvatars);
      return [Nodes.find(linksSelector)];
    });
  });

  Meteor.publish("links.access", function (linkId) {
    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }
    check(linkId, String);
    DEFCON5 && console.log("In publication/links.access");
    DEFCON5 && console.log(linkId);

    this.autorun(function (computation) {
      const linksSelector = {
        _id: linkId,
        status: "active",
      };

      DEFCON5 && console.log("Find links");

      // DEFCON5 && console.log(usersWithAvatars);
      return [Nodes.find(linksSelector)];
    });
  });
}

// function that reads the link and returns the link and all children based on the links collection
function _getNodesAndChildren(linkId, deepth, maxDeepth) {
  // get the link
  const link = Nodes.findOne({ _id: linkId });
  // get the children of the link based on the links collection
  const children = Links.find({ source: linkId }).fetch();

  // if the deepth is less than the maxDeepth, get the next level of links
    if (deepth < maxDeepth) {
        // loop through the children
        for (let i = 0; i < children.length; i++) {
            // get the children of the children
            const child = _getNodesAndChildren(children[i].target, deepth + 1, maxDeepth);
            // add the children to the children array
            children[i].children = child;
        }
    }
  // return the link and the children
  return { link, children };
}
