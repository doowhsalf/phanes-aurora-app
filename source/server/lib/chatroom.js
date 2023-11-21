import { ChatRooms, ChatLines } from "/lib/collections";
import Constants from "/lib/constants";
import { Meteor } from "meteor/meteor";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";
export default {
  /*
          Gets all active aritcles' ids for user
          */

  _upsertChatroom(activeProgram, users, userUrl, programUrl, chatRoomType) {
    let user_list = [];

    DEFCON3 && console.log("Fixing chatroom - users and program");
    DEFCON3 && console.log(users);
    DEFCON3 && console.log(activeProgram);
    const currentDate = new Date();

    users.forEach((user) => {
      item = {
        userId: user,
      };
      user_list.push(item);
    });

    // have to set subtitle to small letters
    var chatRoom = {
      createdAt: currentDate,
      modifiedAt: currentDate,
      status: "active",
      createdBy: activeProgram.createdBy,
      url: programUrl,
      userUrl: userUrl,
      title: activeProgram.title,
      subtitle: activeProgram.subTitle,
      users: user_list,
      channelId: activeProgram._id,
      chatRoomType: chatRoomType,
    };

    const query = { channelId: activeProgram.channelId };
    const update = { $set: chatRoom };
    const options = { upsert: true };

    ChatRooms.update(query, update, options);
  },

  _upsertChatroomsetActiveUser(channelId, userId) {
    const chatRooms = ChatRooms.find({
      channelId: channelId,
    }).fetch();

    DEFCON3 && console.log("Getting chatRooms");
    DEFCON3 && console.log(chatRooms);

    DEFCON3 && console.log("Update active user timestamp");
    DEFCON3 && console.log(channelId);
    DEFCON3 && console.log(userId);

    const chatLinesSelector = {
      channelId: channelId,
      status: "active",
    };

    let chatLines = ChatLines.find(chatLinesSelector).fetch();
    DEFCON3 && console.log(chatLines);

    const currentDate = new Date();

    let item = {};
    let userActiveList = [];
    let isNewUser = true;
    if (chatRooms[0].userActiveList !== undefined) {
      chatRooms[0].userActiveList.forEach((user) => {
        isNewUser = user.userId === userId ? false : isNewUser;
        let theActiveDate =
            user.userId === userId ? currentDate : user.activeDate,
          item = {
            userId: user.userId,
            activeDate: theActiveDate,
            unReadMessages: _unReadMessages(theActiveDate, chatLines),
          };
        userActiveList.push(item);
      });
    }

    if (isNewUser) {
      DEFCON3 && console.log("The new user is a new user");

      item = {
        userId: userId,
        activeDate: currentDate,
        unReadMessages: _unReadMessages(currentDate, chatLines),
      };
      userActiveList.push(item);
    }

    let index = chatLines.length - 1;
    DEFCON3 && console.log("CHATLINES LENGTH");
    DEFCON3 && console.log(index);

    // have to set subtitle to small letters
    var chatRoom = {
      modifiedAt: currentDate,
      lastAction: chatLines[index].text,
      userActiveList: userActiveList,
    };

    const query = { channelId: channelId };
    const update = { $set: chatRoom };
    const options = { upsert: true };

    ChatRooms.update(query, update, options);
  },

  _getNumOfUnreadMessages(userId) {
    const chatRoomsSelector = {
      status: "active",
      "users.userId": {
        $in: [userId],
      },
    };

    const chatRooms = ChatRooms.find(chatRoomsSelector).fetch();

    DEFCON3 && console.log("Find check chat room for user...");

    DEFCON3 && console.log(chatRooms);

    return _usersUnReadMessages(userId, chatRooms);
  },
};

function _usersUnReadMessages(userId, chatRooms) {
  let totalUnRead = 0;

  chatRooms.forEach((chatRoom) => {
    if (chatRoom.userActiveList !== undefined) {
      chatRoom.userActiveList.forEach((activeUser) => {
        if (activeUser.userId === userId) {
          totalUnRead = totalUnRead + activeUser.unReadMessages;
        }
      });
    }
  });
  DEFCON3 && console.log("Total Unread messages for user");
  DEFCON3 && console.log(userId);
  DEFCON3 && console.log(totalUnRead);
  return totalUnRead;
}

function _unReadMessages(date2check, chatLines) {
  DEFCON3 && console.log("check unread");
  DEFCON3 && console.log(date2check);
  DEFCON3 && console.log(chatLines);

  let unReadMessages = 0;
  chatLines.forEach((chatLine) => {
    if (date2check < chatLine.createdAt) {
      unReadMessages++;
    }
  });
  DEFCON3 && console.log("UnReadMessages");
  DEFCON3 && console.log(unReadMessages);
  return unReadMessages;
}
