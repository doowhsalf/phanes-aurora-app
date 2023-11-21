import UnreadMessages from "../../components/chatcomponent/chatunreadmessages";
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

DEFCON5 &&
  console.log("In chatlinechannels list component, kickstarting stuff");

export const composer = ({ context, openChatOnClick }, onData) => {
  const { Meteor, Collections } = context();

  let userId = Meteor.userId();

  DEFCON3 && console.log("Ok, getting unreadmessages for user..." + userId);

  if (Meteor.subscribe("chatrooms.forUser").ready()) {
    const chatRooms = Collections.ChatRooms.find().fetch();

    DEFCON5 && console.log("Chatlines for user ");

    Meteor.call("chatlinelists.unreadMessages", (err, result) => {
      if (!err) {
        DEFCON4 && console.log("Query Error - getting unReadMessages...");
      }

      // var chatUsers = Meteor.users.find(query).fetch();

      DEFCON5 && console.log("UnreadMessages");
      DEFCON5 && console.log(result);
      let unreadMessages = result;
      try {
        onData(null, {
          unreadMessages,
          openChatOnClick,
        });
      } catch (err) {
        DEFCON5 && console.log(err);
      }
    });
  }
};
export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(UnreadMessages);
