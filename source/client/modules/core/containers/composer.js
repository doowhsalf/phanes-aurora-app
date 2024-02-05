import { DEFCON2 } from "/debug.json";

export const composer = ({ context, nodeId }, onData) => {
  const { Meteor, Collections } = context();
  DEFCON2 && console.log("Get Node Tree");

  let theNodeId = nodeId ? nodeId : "Aurora-pod.pod";
  DEFCON2 && console.log("Do the request");

  if (Meteor.subscribe("nodes.getTree", theNodeId).ready()) {
    const nodeTree = Collections.Nodes.find({ _id: nodeId });
    DEFCON2 && console.log(nodeTree);
    onData(null, { nodeTree });
  }
};
