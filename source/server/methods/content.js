import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import Order from "../lib/order.js";
import { Contents } from "/lib/collections";
import Constants from "/lib/constants";

import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";
import DrupalServices from "../lib/drupal/services";
import notices from "../lib/notices";
import _ from "lodash";

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
    async "content.getArticle"(query) {
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
    },
  });
  Meteor.methods({
    "content.update": function (_id, context, fieldsToUpdate) {
      // Check the arguments for proper types
      check(_id, String);
      check(fieldsToUpdate, Object);
      check(context, String);
      console.log("content.update");
      console.log(_id);
      console.log(fieldsToUpdate);
      // Optional: add additional security checks here, e.g., this.userId to ensure user is logged in
      if (!this.userId) {
        throw new Meteor.Error(401, "You must be logged in to update content");
      }

      // Optional: Validate fieldsToUpdate against a schema or specific rules if necessary
      // This step depends on your application's needs and the structure of your content objects

      // Assuming you have a collection for your content objects, e.g., Contents
      // Update the content object with the provided _id and fieldsToUpdate
      const updateCount = Contents.update(
        { _id: _id },
        { $set: fieldsToUpdate }
      );

      if (updateCount === 0) {
        throw new Meteor.Error(404, "Content not found");
      }
      // stringify the fieldsToUpdate object to display the updated fields in the notice
      const message =
        i18n.__("Content_updated") + " " + JSON.stringify(fieldsToUpdate);

      notices.addNoticeByFields(
        Constants.NotiseClass.CONTENT_UPDATED,
        "Uppdating content fields",
        message,
        "contents",
        _id,
        "/content/" + _id,
        context,
        [this.userId]
      );

      return updateCount; // Returns the number of documents updated
    },
  });
  Meteor.methods({
    "content.getTypeOfArticles": function () {
      if (!this.userId) {
        throw new Meteor.Error(
          401,
          "You must be logged in to access content types"
        );
      }

      // Define the pipeline array within the method
      const pipeline = [
        {
          $group: {
            _id: null,
            distinctTypes: {
              $addToSet: "$typeOfArticle",
            },
          },
        },
        {
          $project: {
            _id: 0,
            distinctTypes: 1,
          },
        },
      ];

      const rawCollection = Contents.rawCollection();

      return new Promise((resolve, reject) => {
        rawCollection
          .aggregate(pipeline, { cursor: {} })
          .toArray((error, result) => {
            if (error) {
              reject(new Meteor.Error("aggregation-error", error.message));
            } else {
              // Assuming the result is an array with one document containing the distinctTypes array
              resolve(result.length > 0 ? result[0].distinctTypes : []);
            }
          });
      });
    },
  });
}
