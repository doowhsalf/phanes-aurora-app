import Agent from "../components/mcc/start-screen/agents";
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

DEFCON5 && console.log("Getting all agent obejct connect to user");

export const composer = ({ context, userId }, onData) => {
  const { Meteor, Collections } = context();
  DEFCON5 && console.log("In user agents component composer");

  let activeUserId = userId === undefined ? Meteor.userId() : userId;
  DEFCON3 && console.log("Active user id is..." + activeUserId);

  if (Meteor.subscribe("agents.for.user", activeUserId).ready()) {
    const Selector = {
      status: "active",
    };
    const agents = Collections.Agents.find(Selector).fetch();
    DEFCON3 && console.log("The agent list are...");
    DEFCON3 && console.log(agents);

    // for each agent get the name of the user that changed and modified the agent
    // agents.forEach((agent) => {
    //   agent.modifiedByUser = _getUser(agent.modifiedBy);
    //   agent.createdByUser = _getUser(agent.createdBy);
    // });
    DEFCON3 && console.log(agents);

    try {
      onData(null, { agents });
    } catch (err) {
      DEFCON5 && console.log(err);
    }
  } else {
    DEFCON3 && console.log("No Agents found in subscription...");
  }
};

export const depsMapper = (context, actions) => ({
  getAgent: actions.content.getAgent,
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(Agent);
