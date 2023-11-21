import mcc from "../components/mcc/mcc_config_table_data_v2";
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
import MccMaster from "../components/mcc/mcc_master";
import Constants from "/lib/constants";

DEFCON5 && console.log("In mcc component, kickmccing stuff");

export const composer = ({ context, searchText }, onData) => {
  const { Meteor, Collections } = context();
  DEFCON5 && console.log("In mcc component composer");

  this.filter = (articles, searchText) => {
    if (articles) {
      const regex = new RegExp(".*" + searchText + ".*", "i");

      const filtered = articles.filter((article) => {
        const searchString = `${article.facility} ${article.mid} ${article.address}`;
        return regex.test(searchString);
      });
      return filtered;
    }
  };

  if (Meteor.subscribe("mccConfig.all").ready()) {
    const Selector = {
      status: "active",
    };

    const mccConfigsBase = Collections.MccConfig.find(Selector).fetch();

    let mccConfigs =
      searchText !== undefined
        ? filter(mccConfigsBase, searchText)
        : mccConfigsBase;
    DEFCON3 && console.log(mccConfigs);

    try {
      onData(null, { mccConfigs });
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
)(mcc);
