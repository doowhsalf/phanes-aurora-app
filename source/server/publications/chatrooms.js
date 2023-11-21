import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { ChatRooms, Users } from "/lib/collections";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";
export default function () {
  Meteor.publish("chatrooms.access", function (chatroomId) {
    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }
    check(chatroomId, String);
    DEFCON5 && console.log("In publication/chatRooms.forchannel");
    DEFCON5 && console.log(chatroomId);

    this.autorun(function (computation) {
      const chatRoomsSelector = {
        _id: chatroomId,
        status: "active",
      };

      DEFCON5 && console.log("Find chatRoomsUserIds");

      // DEFCON5 && console.log(usersWithAvatars);
      return [ChatRooms.find(chatRoomsSelector)];
    });
  });

  Meteor.publish("chatrooms.forUser", function () {
    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }
    const chatRoomsSelector = {
      "users.userId": {
        $in: [this.userId],
      },
    };
    let chatRoomsUserIds = ChatRooms.find(chatRoomsSelector);
    // DEFCON5 && console.log("Find users");
    // DEFCON5 && console.log(chatRoomsUserIds);
    return chatRoomsUserIds;
  });
}
