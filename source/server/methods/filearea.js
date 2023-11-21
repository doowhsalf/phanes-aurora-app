import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import Order from "../lib/order.js";
import { Persons, SearchLog } from "/lib/collections";

import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1
} from "/debug.json";
import Constants from "/lib/constants";
import DrupalServices from "../lib/drupal/services";

DEFCON3 && console.log("In Search server part");

/**
 * query:
 {
    name,
    email,
    email2,
    phone,
    content
}
 **/

export default function() {
  Meteor.methods({
    async "filearea.fileareaQuery"(query) {
      check(query, Object);

      DEFCON3 && console.log("filearea.fileareaQuery");

      const doWork = async () => {
        if (!this.userId) {
          DEFCON3 && console.log("filearea.fileareaQuery - Access denied");
          throw new Meteor.Error(401, "Access denied");
        }
        DEFCON3 && console.log("Get Current user");
        let userObj = Meteor.users.findOne(this.userId);
        query.meta_acting_user = userObj.uid;
        DEFCON3 && console.log(`Doing request`);
        DEFCON3 && console.log(query);
        const services = new DrupalServices();
        const response = await services.fileareaQuery(query);
        DEFCON3 && console.log(`Method fileareaQuery successful`);
        return response;
      };

      try {
        return await doWork();
      } catch (e) {
        throw new Meteor.Error(e.error, e.reason);
      }
    }
  });

  Meteor.methods({
    async "filearea.fileareaGetItem"(query) {
      check(query, Object);

      DEFCON3 && console.log("filearea.fileareaGetItem");

      const doWork = async () => {
        if (!this.userId) {
          DEFCON3 && console.log("filearea.fileareaGetItem - Access denied");
          throw new Meteor.Error(401, "Access denied");
        }

        DEFCON3 && console.log("Get Current user");
        let userObj = Meteor.users.findOne(this.userId);
        query.meta_acting_user = userObj.uid;
        const services = new DrupalServices();
        DEFCON3 && console.log(`Doing request`);
        DEFCON3 && console.log(query);

        const response = await services.fileareaGetFile(query);
        DEFCON3 && console.log(`Method fileareaGetItem successful`);
        DEFCON3 && console.log(response);

        return response;
      };

      try {
        return await doWork();
      } catch (e) {
        throw new Meteor.Error(e.error, e.reason);
      }
    }
  });
}
