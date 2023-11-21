import ChatlineChannels from "../../components/chatcomponent/chatlinechannelsDynamic";
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

export const composer = ({ context, channelId, handleSelectEdit }, onData) => {
  const { Meteor, Collections } = context();

  let userId = Meteor.userId();

  DEFCON3 &&
    console.log("Ok, getting chatlinechannels data for User..." + userId);

  if (Meteor.subscribe("chatrooms.forUser").ready()) {
    var sort = [["modifiedAt", -1.0]];

    const chatRoomsPrel = Collections.ChatRooms.find().fetch();

    let chatRooms = [];
    chatRoomsPrel.map((listItem, index, array) => {
      listItem.modifiedAt =
        listItem.modifiedAt !== undefined
          ? new Date(listItem.modifiedAt)
          : new Date(
              new Date().getFullYear(),
              new Date().getMonth() - 1,
              new Date().getDate()
            );
      chatRooms.push(listItem);
    });

    chatRooms.sort((a, b) => (a.modifiedAt < b.modifiedAt && 1) || -1);
    DEFCON5 && console.log(chatRooms);

    var query = {
      _id: {
        $in: [userId],
      },
    };

    Meteor.call("_users.getUserList", query, (err, result) => {
      if (!err) {
        DEFCON4 && console.log("Query Error - getting user list...");
      }

      // var chatUsers = Meteor.users.find(query).fetch();

      DEFCON3 && console.log("Query to get users ");
      DEFCON3 && console.log(query);
      DEFCON3 && console.log("Users");
      DEFCON3 && console.log(result);
      let chatUser = result;
      try {
        onData(null, { chatUser, chatRooms, channelId, handleSelectEdit });
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
)(ChatlineChannels);
