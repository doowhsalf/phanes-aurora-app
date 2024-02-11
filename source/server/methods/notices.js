import { NoticesUserStatus } from "/lib/collections";
import { addNotice } from "../lib/notices";

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
    "notices.add"(notice, users) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      check(notice, Object);
      check(users, Object);

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
      // let noticeId = Notices.insert(newNotice);

      DEFCON5 && console.log("Inserted a new notice");
      DEFCON5 && console.log(newNotice);
      return addNotice(newNotice, users);
    },
  });
  Meteor.methods({
    "notices.updateReadStatus"(noticeStatus) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      DEFCON5 && console.log("****** notices.updateReadStatus");
      DEFCON5 && console.log(noticeStatus);
      check(noticeStatus, Object);
      const currentDate = new Date();
      let updateStatus = NoticesUserStatus.update(
        { _id: noticeStatus._id },
        {
          $set: {
            readIt: noticeStatus.readIt,
            readAt: currentDate,
            modifiedAt: currentDate,
          },
        }
      );
      return updateStatus;
    },
  });
}
