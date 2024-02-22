import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { SystemConfig } from "/lib/collections";
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
  Meteor.methods({
    "systemconfig.get"(key) {
      check(key, String); // Corrected to check the 'key' parameter

      DEFCON5 && console.log("Method systemconfig.get");

      const response = SystemConfig.findOne({ _id: key });
      // if there is no response the key is not founb but we don't throw an error just return null

      if (!response) {
        DEFCON5 && console.log(`No system config found with key: ${key}`);
      }

      return response;
    },
    "systemconfig.put"(key, fieldsToUpdate) {
      check(key, String);
      check(fieldsToUpdate, Object);
      DEFCON5 && console.log("systemconfig.put");

      if (!this.userId) {
        throw new Meteor.Error(
          401,
          "You must be logged in to update system config"
        );
      }

      // user and when the record was updated
      fieldsToUpdate.updatedBy = this.userId;
      fieldsToUpdate.updatedAt = new Date();

      // Using the upsert option
      const result = SystemConfig.update(
        { _id: key },
        { $set: fieldsToUpdate },
        { upsert: true } // This is the key change
      );

      if (result) {
        if (result.insertedId) {
          DEFCON5 &&
            console.log(
              `New system config created with ID: ${result.insertedId}`
            );
        } else {
          DEFCON5 &&
            console.log(
              `System config updated. Number of documents affected: ${result.numberAffected}`
            );
        }
      } else {
        throw new Meteor.Error(
          "update-failed",
          "Failed to update or insert system config"
        );
      }

      return result; // Returns the result of the update operation
    },
  });
}
