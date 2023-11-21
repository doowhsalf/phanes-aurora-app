import mcc from "../components/mcc/mcc_master";
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

DEFCON5 && console.log("In mcc component");

export const composer = ({ context, close }, onData) => {
  const { Meteor, Collections } = context();
  DEFCON5 && console.log("In mcc component composer");

  // if (Meteor.subscribe("mccConfig.all").ready()) {
  //   const Selector = {
  //     status: "active",
  //   };
  //   const mccConfigs = Collections.MccConfig.find(Selector).fetch();
  //   DEFCON3 && console.log(mccConfigs);

  //   try {
  //     onData(null, { mccConfigs});
  //   } catch (err) {
  //     DEFCON5 && console.log(err);
  //   }
  // }
  try {
    onData(null, {});
  } catch (err) {
    DEFCON5 && console.log(err);
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
