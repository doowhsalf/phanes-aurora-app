import { ChatRooms, ChatLines } from "/lib/collections";
import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
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
import ChatRoom from "../lib/chatroom";

DEFCON5 && console.log("In chatlinelists server, getting the stuff");

export default function () {
  Meteor.methods({
    "chatlinelists.unreadMessages"() {
      DEFCON5 && console.log("chatlinelists.unreadMessages for current user ");

      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }

      let result = ChatRoom._getNumOfUnreadMessages(this.userId);
      return result;
    },
  });
  Meteor.methods({
    "chatlinelists.focusChatline"(channelId) {
      DEFCON5 && console.log("chatlinelists.focusChatline " + channelId);

      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      check(channelId, String);

      const currentUser = Meteor.user()._id;
      const currentUserId = Meteor.user()._id;
      const currentDate = new Date();

      ChatRoom._upsertChatroomsetActiveUser(channelId, currentUserId);

      return true;
    },
  });

  Meteor.methods({
    "chatlinelists.addChatLine"(channelId, line) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      check(channelId, String);
      check(line, String);

      const currentUser = Meteor.user()._id;
      const currentUserId = Meteor.user()._id;
      const currentDate = new Date();

      let chatLine = {};
      chatLine.text = line;
      chatLine.channelId = channelId;
      chatLine.modifiedBy = currentUser;
      chatLine.createdByName = currentUser;
      chatLine.createdBy = currentUserId;
      chatLine.modifiedAt = currentDate;
      chatLine.createdAt = currentDate;
      chatLine.status = "active";

      let lineId = ChatLines.insert(chatLine);
      ChatRoom._upsertChatroomsetActiveUser(channelId, currentUserId);

      DEFCON5 &&
        console.log("In chatlinelists.addChatLine method returning " + lineId);
      return lineId;
    },
  });

  Meteor.methods({
    "chatlinelists.removeChatLine"(containerId, lineId) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      check(containerId, String);
      check(lineId, String);

      /*
      if (ArticleStatus.isContainerTypeReadOnly(channelId, Constants.ContainerTypes.CHATLINES)) {
         DEFCON5 && console.log('In chatlinelists.removeChatLine method and read only channel: ' + channelId);
        throw new Meteor.Error("Line cannot be removed because of channel's state");
      }
*/
      const currentUser = Meteor.user()._id;
      const currentDate = new Date();

      ChatLines.update(lineId, {
        $set: {
          status: "deleted",
          modifiedBy: currentUser,
          modifiedAt: currentDate,
        },
      });

      DEFCON5 &&
        console.log(
          "In chatlinelists.removeChatLine method returning " + lineId
        );
      return lineId;
    },
  });

  Meteor.methods({
    "chatlinelists.checkAccess"(channelId) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      check(channelId, String);
      DEFCON3 && console.log("Check if use has access to chatroom");
      DEFCON3 && console.log(channelId);

      const chatRoomsSelector = {
        "users.userId": {
          $in: [this.userId],
        },
        channelId: channelId,
      };
      let chatRoomsUserIds = ChatRooms.find(chatRoomsSelector);
      DEFCON3 && console.log(chatRoomsUserIds.fetch());
      let hasAccessToChatlines = chatRoomsUserIds.fetch().length;
      DEFCON3 && console.log("User has access if next value > 0");
      DEFCON3 && console.log(hasAccessToChatlines);
      return hasAccessToChatlines;
    },
  });
}

async function _checkAccess4User(channelId, userId) {
  DEFCON3 && console.log("Check if user has access to chatroom");
  DEFCON3 && console.log(channelId);
  DEFCON3 && console.log(userId);

  const chatRoomsSelector = {
    "users.userId": {
      $in: [userId],
    },
    channelId: channelId,
  };
  let chatRoomsUserIds = ChatRooms.find(chatRoomsSelector);
  DEFCON3 && console.log(chatRoomsUserIds.fetch());
  let hasAccessToChatlines = chatRoomsUserIds.fetch().length;
  DEFCON3 && console.log("User has access if next value > 0");
  DEFCON3 && console.log(hasAccessToChatlines);
  return hasAccessToChatlines;
}
