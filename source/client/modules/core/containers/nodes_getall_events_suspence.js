import NodesTableDataEvents from "../components/mcc/nodes_table_data_events";
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

export const composer = ({ context, searchText }, onData) => {
  const { Meteor, Collections } = context();
  DEFCON5 && console.log("In nodes_getall_events component composer");

  this.filter = (articles, searchText) => {
    if (articles) {
      const regex = new RegExp(".*" + searchText + ".*", "i");

      const filtered = articles.filter((article) => {
        const searchString = `${article.gatewayClassId} ${article.brickSensorClass} ${article.gatewayId} ${article.processStatus} ${article.point_id} ${article._id}`;
        return regex.test(searchString);
      });
      return filtered;
    }
  };

  if (Meteor.subscribe("events.all.suspence").ready()) {
    const Selector = {
      status: "active",
    };

    var sort = [["timestamp_read", -1.0]];

    const nodes = Collections.Events.find(Selector, {
      sort,
      limt: 200,
    }).fetch();

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
  getArticle: actions.content.getArticle,
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(NodesTableDataEvents);
