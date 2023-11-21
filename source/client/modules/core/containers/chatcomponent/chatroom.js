import ChatLineListComponent from "../../components/chatcomponent/chatMaster";
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
import Constants from "/lib/constants";

DEFCON3 && console.log("In CHAT-ROOM list component, kickstarting stuff");

export const composer = ({ context }, onData) => {
  const { Meteor, Collections } = context();
  DEFCON3 && console.log("In CHAT-ROOM container ");

  DEFCON3 && console.log("Ok, getting chatlinechannels data for User...");

  let userId = Meteor.userId();

  if (Meteor.subscribe("chatrooms.forUser").ready()) {
    const chatRooms = Collections.ChatRooms.find().fetch();
    DEFCON3 && console.log("chatRooms");
    DEFCON3 && console.log(chatRooms);
    try {
      onData(null, { chatRooms });
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
)(ChatLineListComponent);
