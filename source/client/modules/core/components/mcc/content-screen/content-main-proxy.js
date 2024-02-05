import NodesTableData from "./content-main.jsx";
import Loading from "/client/loading.js";
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

DEFCON5 && console.log("In meters component, kicknodesing stuff");
/* 
    "_id" : "fibaro-tritonite-proxima-east/switch/33/events/fibaro => home assistant/power",
    "topic" : "fibaro-tritonite-proxima-east/switch/33/events/fibaro => home assistant/power",
    "sensorClass" : "power_sensor",
    "created" : "2023-09-10T14:53:54.928Z",
    "status" : "proposed",
    "context" : "CONTEXT: fibaro-tritonite-proxima-east/switch/33/events/fibaro => home assistant/power Device information: drencher.television with a value of 167.7"
}*/
export const composer = ({ context, nodeId }, onData) => {
  const { Meteor, Collections } = context();
  DEFCON5 && console.log("In nodes contents get composer");

  if (Meteor.subscribe("contents.get", nodeId).ready()) {
    const Selector = {_id: nodeId};

    const nodes = Collections.Contents.find(Selector).fetch();
    let contentNode = nodes[0];


    try {
      onData(null, { contentNode });
    } catch (err) {
      DEFCON5 && console.log(err);
    }
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(NodesTableData);
