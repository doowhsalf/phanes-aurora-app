import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ChatLines, Users } from '/lib/collections';
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1
} from "/debug.json";
export default function() {
  Meteor.publish('chatlines.forchannel', function(channelId) {
    if (!this.userId) {
      throw new Meteor.Error(401, 'Access denied');
    }
    check(channelId, String);
     DEFCON5 && console.log('In publication/chatlines.forchannel');
     DEFCON5 && console.log(channelId);

    this.autorun(function(computation) {
      const chatLinesSelector = {
        channelId: channelId,
        status: 'active'
      };
      let chatLinesUserIds = ChatLines.find(chatLinesSelector)
        .fetch()
        .map(line => line.createdBy);

       DEFCON5 && console.log('Find chatLinesUserIds');

      const usersWithAvatars = Meteor.users.find(
        {
          _id: {
            $in: chatLinesUserIds
          }
        },
        { avatar_uri: 1 }
      );
      // DEFCON5 && console.log(usersWithAvatars);
      return [ChatLines.find(chatLinesSelector), usersWithAvatars];
    });
  });

  Meteor.publish('chatlines.forUser', function() {
    if (!this.userId) {
      throw new Meteor.Error(401, 'Access denied');
    }
    const chatLinesSelector = {
      createdBy: this.userId
    };
    let chatLinesUserIds = ChatLines.find(chatLinesSelector);
    // DEFCON5 && console.log("Find users");
    // DEFCON5 && console.log(chatLinesUserIds);
    return chatLinesUserIds;
  });
}
