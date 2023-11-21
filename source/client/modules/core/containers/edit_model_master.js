import EditModelMaster from "../components/editor/edit_model_masterv2";
import Loading from "../../../loading.js";
import { useDeps, composeWithTracker, composeAll } from "mantra-core-extra";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";

DEFCON5 && console.log("In nodes component, kicknodesing stuff");

export const composer = ({ context, nodeId, embedded }, onData) => {
  const { Meteor, Collections } = context();
  DEFCON5 && console.log("Get Node Tree");

  let theNodeId = nodeId ? nodeId : "enkey-pod.pod";
  DEFCON5 && console.log("Do the request");

  if (Meteor.subscribe("nodes.getTree", theNodeId).ready()) {
    const nodes = Collections.Nodes.find().fetch();
    const links = Collections.NodeLinks.find().fetch();
    // DEFCON5 && console.log(Collections.Nodes.find().fetch());
    // DEFCON5 && console.log(Collections.NodeLinks.find().fetch());
    Meteor.call("getTreeStructure", theNodeId, (err, result) => {
      if (err) {
        console.error("Failed to get tree:", err);
      } else {
        DEFCON5 && console.log("Tree Structure:", result);
        var tree = _buildTreeFromData(theNodeId, nodes, links);
        DEFCON5 && console.log(tree);
        DEFCON5 && console.log("Using the method to get the tree");
        DEFCON5 && console.log(result);
        var tree = result;

        onData(null, { tree, embedded });
      }
    });
    // Optionally, build the tree structure using nodes and links
    // Or you can continue using your Meteor method to fetch the tree
    // For this example, I'll continue using your tree building method:
  } else {
    onData(null, { result: null });
  }
};

function _buildTreeFromData(startNodeId, nodes, links) {
  // DEFCON5 && console.log("Build Tree");
  // DEFCON5 && console.log(startNodeId);
  // DEFCON5 && console.log(nodes);
  // DEFCON5 && console.log(links);
  function getNodeById(id) {
    return nodes.find((node) => node._id === id);
  }

  function getLinksByParentId(id) {
    return links.filter((link) => link.parentId === id);
  }

  function buildNode(_id) {
    const node = getNodeById(_id);
    if (!node) return null;

    const relatedLinks = getLinksByParentId(_id);
    const children = relatedLinks
      .map((link) => buildNode(link.childId))
      .filter(Boolean);

    return {
      ...node,
      children,
    };
  }

  return buildNode(startNodeId);
}

export const depsMapper = (context, actions) => ({
  getArticle: actions.content.getArticle,
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(EditModelMaster);
