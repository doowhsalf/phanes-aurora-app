import { Notices, NoticesUserStatus } from "/lib/collections";

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
  addNotice: function (notice, users) {
    ("use strict");

    const currentUser = Meteor.user()._id;
    const currentUserId = Meteor.user()._id;
    const currentDate = new Date();

    let newNotice = {};
    newNotice = {
      ...notice,
    };
    newNotice.modifiedBy = currentUser;
    newNotice.createdByName = currentUser;
    newNotice.createdBy = currentUserId;
    newNotice.modifiedAt = currentDate;
    newNotice.createdAt = currentDate;
    newNotice.status = "active";

    let noticeId = Notices.insert(newNotice);
    return noticeId;
  },

  addNoticeByFields: function (
    eventClass,
    event,
    what,
    entity,
    entityId,
    entityUri,
    entityName,
    users
  ) {
    ("use strict");
    DEFCON5 && console.log("Create a new notice");
    DEFCON5 && console.log(eventClass);

    const currentUser = Meteor.user().name;
    const currentUserId = Meteor.user()._id;
    const currentDate = new Date();
    const avatar_uri = Meteor.user().avatar_uri;
    let noticeId = null;
    let newNotice = {};
    newNotice.what = what;
    newNotice.entity = entity;
    newNotice.entityId = entityId;
    newNotice.eventClass = eventClass;
    newNotice.event = event;
    newNotice.entityName = entityName;
    newNotice.entity_uri = entityUri;
    newNotice.avatar_uri = avatar_uri;
    newNotice.modifiedBy = currentUserId;
    newNotice.createdByName = currentUser;
    newNotice.createdBy = currentUserId;
    newNotice.modifiedAt = currentDate;
    newNotice.createdAt = currentDate;
    newNotice.status = "active";
    DEFCON5 && console.log(newNotice);

    const query = { entityId: entityId, event: event };
    const update = { $set: newNotice };
    const options = { upsert: true };

    //let noticeId = Notices.insert(newNotice);
    let status = Notices.update(query, update, options);

    if (status) {
      let notices = Notices.find(query).fetch();
      DEFCON5 && console.log("Generated NotiseId");

      DEFCON5 && console.log(notices);
      noticeId = notices[0]._id ? notices[0]._id : noticeId;
      // let user_list = [];
      DEFCON5 && console.log("Checking users");
      DEFCON5 && console.log(users);

      if (users !== undefined) {
        DEFCON5 && console.log("Archive previous review ");
        const query = { noticeId: notices[0]._id };
        const update = { $set: { status: "archived" } };
        const options = { multi: true };
        let status = NoticesUserStatus.update(query, update, options);

        users.forEach((userId) => {
          DEFCON5 && console.log("Query for updating user notices");
          DEFCON5 && console.log(query);
          DEFCON5 && console.log("Add user to notice");
          DEFCON5 && console.log(userId);

          let item = {
            userId: userId,
            noticeId: notices[0]._id,
            modifiedBy: currentUserId,
            createdByName: currentUser,
            createdBy: currentUserId,
            modifiedAt: currentDate,
            createdAt: currentDate,
            readIt: false,
            readAt: null,
            status: "active",
          };
          let _statusId = NoticesUserStatus.insert(item);
        });
      }
    }

    return noticeId;
  },
};

/*
 var chatRoom = {
        status: "active",
        createdBy: article.createdBy,
        url: imageUrl,
        title: article.name,
        subtitle: article.subtitle,
        users: user_list,
        channelId: article._id,
        chatRoomType: chatRoomType,
    };

    const query = { channelId: article._id };
    const update = { $set: chatRoom };
    const options = { upsert: true };

    ChatRooms.update(query, update, options);





*/
