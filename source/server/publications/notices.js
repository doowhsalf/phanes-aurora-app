import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { NoticesUserStatus, Notices, Users } from "/lib/collections";
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
  Meteor.publish("notices.forUser", function () {
    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }
    // check(userId, String);
    DEFCON5 && console.log("notices.forUser");

    this.autorun(function (computation) {
      const noticeSelector = {
        status: "active",
        userId: this.userId,
      };
      DEFCON5 && console.log("Query");
      DEFCON5 && console.log(noticeSelector);

      const notices4User = NoticesUserStatus.find(noticeSelector)
        .fetch()
        .map((line) => line.noticeId);

      DEFCON5 && console.log(notices4User);

      const notices = Notices.find(
        {
          _id: {
            $in: notices4User,
          },
        },
        { avatar_uri: 1 }
      );

      const notices_userstatus = NoticesUserStatus.find(noticeSelector);

      DEFCON5 && console.log("Find notices");
      DEFCON5 && console.log(notices.fetch());

      // DEFCON5 && console.log(usersWithAvatars);
      return [notices, notices_userstatus];
    });
  });
  Meteor.publish("notices.forUserAndArticle", function (articleId) {
    check(articleId, String);

    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }
    // check(userId, String);
    DEFCON5 && console.log("notices.forUserAndArticle");

    this.autorun(function (computation) {
      const noticeSelector = {
        status: "active",
        userId: this.userId,
      };
      DEFCON5 && console.log("Query");
      DEFCON5 && console.log(noticeSelector);

      const notices4User = NoticesUserStatus.find(noticeSelector)
        .fetch()
        .map((line) => line.noticeId);

      DEFCON5 && console.log(notices4User);

      const notices = Notices.find(
        {
          status: "active",
          entity: "article",
          entityId: articleId,
          _id: {
            $in: notices4User,
          },
        },
        { avatar_uri: 1 }
      );

      const notices_userstatus = NoticesUserStatus.find(noticeSelector);

      DEFCON5 && console.log("Find notices");
      DEFCON5 && console.log(notices.fetch());

      // DEFCON5 && console.log(usersWithAvatars);
      return [notices, notices_userstatus];
    });
  });

  Meteor.publish("notices.forAllUsersAndArticle", function (articleId) {
    check(articleId, String);

    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }
    // check(userId, String);
    DEFCON5 && console.log("notices.forUserAndArticle");

    this.autorun(function (computation) {
      let notices4users = Notices.find(
        {
          status: "active",
          entity: "article",
          entityId: articleId,
        },
        { avatar_uri: 1 }
      )
        .fetch()
        .map((line) => line._id);

      const noticeSelector = {
        status: "active",
        noticeId: {
          $in: notices4users,
        },
      };

      const notices_userstatus = NoticesUserStatus.find(noticeSelector);
      const notices = Notices.find(
        {
          status: "active",
          entity: "article",
          entityId: articleId,
        },
        { avatar_uri: 1 }
      );
      DEFCON5 && console.log("Find notices");
      DEFCON5 && console.log(notices.fetch());

      // DEFCON5 && console.log(usersWithAvatars);
      return [notices, notices_userstatus];
    });
  });

  Meteor.publish("notices.forArticle", function (articleId) {
    check(articleId, String);

    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }
    // check(userId, String);
    DEFCON5 && console.log("notices.forArticle");

    this.autorun(function (computation) {
      const notices = Notices.find(
        {
          entity: "article",
          entityId: articleId,
          status: "active",
        },
        { avatar_uri: 1 }
      );

      DEFCON5 && console.log("Find notices");
      DEFCON5 && console.log(notices.fetch());

      // DEFCON5 && console.log(usersWithAvatars);
      return [notices];
    });
  });
}
