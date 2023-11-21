import ClientRoom from "../components/clientroom/clientroom";
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

DEFCON5 && console.log("In ClientRoom component, kickClientRooming stuff");
export const composer = ({ context, clientId }, onData) => {
  const { Meteor, Collections } = context();
  DEFCON5 && console.log("In ClientRoom component composer");

  try {
    onData(null, {
      clientId,
    });
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
)(ClientRoom);
