import NodesTableData from "./mcc_podview_meters_table.jsx";
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
export const composer = ({ context, searchText }, onData) => {
  const { Meteor, Collections } = context();
  DEFCON5 && console.log("In nodes meters composer");

  this.filter = (articles, searchText) => {
    if (articles) {
      const regex = new RegExp(".*" + searchText + ".*", "i");

      const filtered = articles.filter((article) => {
        DEFCON5 && console.log(article);
        // check if description is defined, if not set to empty string

        // let descriptionSearch =
        //   article.description !== undefined
        //     ? article.description.en !== undefined
        //       ? article.description.en
        //       : ""
        //     : "";
        // let nameSearch = article.name.en !== undefined ? article.name.en : "";

        const searchString = `${article._id} ${article.topic} ${article.sensorClass} ${article.status} ${article.context} `;
        return regex.test(searchString);
      });
      return filtered;
    }
  };

  if (Meteor.subscribe("meters.all").ready()) {
    const Selector = {};

    const nodes = Collections.Meters.find(Selector).fetch();

    let nodeConfigs =
      searchText !== undefined ? filter(nodes, searchText) : nodes;
    DEFCON3 && console.log(nodeConfigs);

    try {
      onData(null, { nodeConfigs });
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
