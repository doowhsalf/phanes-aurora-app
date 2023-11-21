import SetPW from "../components/account/setpw";
import Loading from "../../../loading.js";
import { useDeps, composeWithTracker, composeAll } from "mantra-core-extra";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1
} from "/debug.json";
import Constants from "/lib/constants";

DEFCON5 && console.log("In setPw component, kickstarting stuff");

export const composer = ({ context, close }, onData) => {
  const { Meteor, Collections } = context();
  DEFCON5 && console.log("In setPw component composer");

  try {
    onData(null, {});
  } catch (err) {
    DEFCON5 && console.log(err);
  }
};

export const depsMapper = (context, actions) => ({
  setPw: actions.accounts.setPw,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(SetPW);
