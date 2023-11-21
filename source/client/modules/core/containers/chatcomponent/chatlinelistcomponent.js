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
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

DEFCON5 && console.log("In chatLine list component, kickstarting stuff");

export const composer = ({ context, channelId, close, embedded }, onData) => {
  const { Meteor, Collections } = context();

  DEFCON3 &&
    console.log(
      "In chatLine list component composer with channelId: " + channelId
    );
  if (channelId === undefined || channelId === false) {
    console.log("Need to Query for users channels");
    Meteor.call("chatroom.get4user", (error, result) => {
      "use strict";
      if (result.length > 0) {
        DEFCON5 && console.log("Channels");
        DEFCON5 && console.log(result);
        let requestChannelId = result[0].channelId;
        DEFCON5 && console.log("Stored channel ");
        DEFCON5 && console.log(requestChannelId);
        FlowRouter.go("/chatlines/" + requestChannelId);
      } else {
        DEFCON5 && console.log("User has no Channels");
        //TODO: ADD A PAGE TO DISPLAY THAT USER HAS NO CHANNELS
        FlowRouter.go("/chatlines/" + 'open-alfa');
      }
    });
  }

  DEFCON5 && console.log("Ok, getting chatline data for Channel: " + channelId);
  DEFCON5 && console.log(channelId);

  Meteor.call("chatlinelists.checkAccess", channelId, (error, result) => {
    "use strict";
    if (result === 0) {
      DEFCON5 && console.log("No access to channel!");
      FlowRouter.go("/");
    } else {
      DEFCON5 && console.log("Validation check " + result);
    }
  });
  DEFCON5 && console.log("User has access to channel ");

  if (Meteor.subscribe("chatlines.forchannel", channelId).ready()) {
    const chatLineList = Collections.ChatLines.find(
      {
        channelId: channelId,
        status: "active",
      },
      {
        sort: {
          createdAt: 1,
        },
      }
    ).fetch();
    DEFCON5 && console.log("Search for channelId ");
    DEFCON5 && console.log(channelId);
    let readOnly = false;

    // const chatRoom = Collections.ChatRooms.find({
    //   channelId: channelId,
    // }).fetch();

    Meteor.call("chatroom.get4channel", channelId, (error, result) => {
      "use strict";
      let readOnlyDefinition = {};
      if (!error) {
        readOnlyDefinition = result;
      }
      try {
        let chatRooms = result;
        let userArray = [];
        if (chatRooms[0] !== undefined) {
          DEFCON3 && console.log("We have a chatRooms and users ");
          DEFCON3 && console.log(chatRooms[0]);
          if (chatRooms[0].users !== undefined) {
            chatRooms[0].users.map((listItem, index, array) => {
              let item = listItem.userId;
              DEFCON5 && console.log("A user ");
              DEFCON5 && console.log(item);

              userArray.push(item);
            });
          }
        } else {
          DEFCON3 &&
            console.log(
              "No chatRooms users, but this is an error. We should have... "
            );
        }

        var query = {
          _id: {
            $in: userArray,
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
          let chatUsers = result;
          try {
            onData(null, {
              channelId,
              chatLineList,
              chatUsers,
              close,
              readOnly,
              chatRooms,
              embedded,
            });
          } catch (err) {
            DEFCON5 && console.log(err);
          }
        });
      } catch (err) {
        console.log(err);
      }
    });
  }
};
export const depsMapper = (context, actions) => ({
  removeChatLine: actions.chatlinelists.removeChatLine,
  addChatLine: actions.chatlinelists.addChatLine,
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(ChatLineListComponent);
