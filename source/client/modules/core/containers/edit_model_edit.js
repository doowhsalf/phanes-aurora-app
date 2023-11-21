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
import Constants from "/lib/constants";

DEFCON5 && console.log("In EditModel component, kickstarting stuff");

export const composer = ({ context, nodeId }, onData) => {
  const { Meteor, Collections } = context();
  DEFCON2 && console.log("Doing the request");

  let theNodeId = nodeId ? nodeId : "enkey-pod.pod";
  DEFCON2 && console.log("Do the request");

  if (Meteor.subscribe("nodes.getTree", theNodeId).ready()) {
    const nodeTree = Collections.Nodes.find({ _id: nodeId });
    onData(null, { nodeTree });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(EditModelMaster);
