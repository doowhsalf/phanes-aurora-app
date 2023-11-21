import {
  Meteor
} from "meteor/meteor";
import {
  check,
  Match
} from "meteor/check";
import Order from "../lib/order.js";
import {
  Persons,
  SearchLog
} from '/lib/collections';

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

DEFCON5 && console.log("In Search server part");


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

export default function () {
  Meteor.methods({
    async 'content.getArticle'(query) {
      check(query, Object);

      DEFCON5 && console.log("content.getArticle");

      const doWork = async () => {
        //TODO: Articles should be possible to access anytime
        // if (!this.userId) {
        //   DEFCON5 && console.log("content.getArticle - Access denied");
        //   throw new Meteor.Error(401, 'Access denied');
        // }
        const services = new DrupalServices();
        const response = await services.getArticle(query);
        DEFCON5 && console.log(`Method getArticle successful`);
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
