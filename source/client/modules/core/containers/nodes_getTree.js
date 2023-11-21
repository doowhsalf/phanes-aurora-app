import EditModelMaster from "../components/mcc/nodes_table_data";
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

export const composer = ({ context, nodeId }, onData) => {
  const { Meteor, Collections } = context();

  if (Meteor.subscribe("nodes.getTree", nodeId).ready()) {
    const nodeTree = Collections.Nodes.findOne({ _id: nodeId });
    onData(null, { nodeTree });
  }
};

export const depsMapper = (context, actions) => ({
  getArticle: actions.content.getArticle,
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(EditModelMaster);
