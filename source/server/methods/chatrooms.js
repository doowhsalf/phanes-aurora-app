import {
  ChatRooms,
} from "/lib/collections";
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
DEFCON5 && console.log("In chatlinelists server, getting the stuff");

export default function () {
  Meteor.methods({
    "chatroom.get4channel"(channelId) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      check(channelId, String);
      const chatRooms = ChatRooms.find({
        channelId: channelId,
      }).fetch();
      DEFCON5 && console.log("Getting chatRooms");
      DEFCON5 && console.log(chatRooms);

      return chatRooms;
    },
  });
  Meteor.methods({
    "chatroom.get4user"() {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      const chatRoomsSelector = {
        "users.userId": {
          $in: [this.userId],
        },
      };
      let chatRooms = ChatRooms.find(chatRoomsSelector).fetch();
      DEFCON3 && console.log("Getting chatRooms for User");
      DEFCON3 && console.log(chatRooms);

      // if there are no chatRooms for this user, create his personal chatRoom for him and his agent.
      

      return chatRooms;
    },
  });

  Meteor.methods({
    "chatroom.setActiveUser"(channelId) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      const chatRoomsSelector = {
        "users.userId": {
          $in: [this.userId],
        },
      };
      let chatRooms = ChatRooms.find(chatRoomsSelector).fetch();
      DEFCON3 && console.log("Getting chatRooms for User");
      DEFCON3 && console.log(chatRooms);

      return chatRooms;
    },
  });
}
