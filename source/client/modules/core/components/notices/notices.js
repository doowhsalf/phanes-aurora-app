import Notices from "./notis-list";
import Loading from "../../../../loading.js";
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

export const composer = ({ context }, onData) => {
  const { Meteor, Collections } = context();
  if (Meteor.subscribe("notices.forUser").ready()) {
    DEFCON3 && console.log("In Notices component, kickNewsRooming stuff");
    const notices = Collections.Notices.find(
      {},
      { sort: { modifiedAt: -1 }, limit: 5 }
    ).fetch();
    onData(null, { notices });
  }
};
export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(Notices);
