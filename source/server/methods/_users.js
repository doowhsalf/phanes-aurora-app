import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
// import _ from 'lodash';
import AdminRole from "../lib/adminrole";
import { Random } from "meteor/random";
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
    "_users.getUserList"(query) {
      check(query, Object);
      DEFCON5 && console.log("Running Query to get Users");
      DEFCON5 && console.log(query);

      var chatUsers = Meteor.users.find(query).fetch();
      DEFCON5 && console.log(chatUsers);

      return chatUsers;
    },
    "_users.getLanguagePreference"(_id) {
      check(_id, String);
      let record = Meteor.users.findOne(_id);

      if (record && record.get("language")) return record.get("language");

      const locale = Meteor.settings["public"].defaultLocale;
      return locale ? locale : "sv";
    },

    "_users.setLanguagePreference"(_id, lang) {
      check(_id, String);
      check(lang, String);
      // Meteor.users.update({_id: _id}, {set: {language: lang}})
      let record = Meteor.users.findOne(_id);
      if (record) {
        record.set("language", lang);
        record.save();
      }
    },

    "_users.getTheme"(_id) {
      check(_id, String);
      let record = Meteor.users.findOne(_id);

      if (record && record.get("theme")) return record.get("theme");

      return true;
    },

    "_users.setTheme"(_id, theme) {
      check(_id, String);
      check(theme, Boolean);
      DEFCON5 && console.log("Set Theme for user " + _id);
      DEFCON5 && console.log("Theme value " + theme);

      let record = Meteor.users.findOne(_id);
      if (record) {
        record.set("theme", theme);
        record.save();
      }
    },

    "_users.updateProfileDescription"(userId, text) {
      check(userId, String);
      check(text, String);

      if (
        !this.userId ||
        (this.userId !== userId && !AdminRole.isSuperAdmin(this.userId))
      ) {
        throw new Meteor.Error(401, "Access denied");
      }

      let updated = Meteor.users.update(
        { _id: userId },
        { $set: { profile: text } }
      );
      if (updated) {
        return "Description updated";
      } else {
        return "Description not updated! Please try again.";
      }
    },

    "_users.updateName"(userId, text) {
      check(userId, String);
      check(text, String);

      if (
        !this.userId ||
        (this.userId !== userId && !AdminRole.isSuperAdmin(this.userId))
      ) {
        throw new Meteor.Error(401, "Access denied");
      }

      let updated = Meteor.users.update(
        { _id: userId },
        { $set: { name: text } }
      );
      if (updated) {
        return "Name updated";
      } else {
        return "Name not updated! Please try again.";
      }
    },

    "_users.updateEmail"(userId, email) {
      check(userId, String);
      check(email, String);

      if (
        !this.userId ||
        (this.userId !== userId && !AdminRole.isSuperAdmin(this.userId))
      ) {
        throw new Meteor.Error(401, "Access denied");
      }

      let updated = Meteor.users.update(
        { _id: userId },
        { $set: { "emails.0.address": email } }
      );
      if (updated) {
        return "Email updated";
      } else {
        return "Email not updated! Please try again.";
      }
    },

    "_users.anonymize"(userId) {
      check(userId, String);

      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }

      if (AdminRole.isSuperAdmin(this.userId)) {
        const newUser = {
          name: Random.id(),
          "emails.0.address": Random.id() + "@" + Random.id() + ".weylan.yt",
          avatar_uri: "",
        };
        let updated = Meteor.users.update({ _id: userId }, { $set: newUser });
        if (updated) {
          return "User anonymize successful";
        } else {
          return "User anonymize failure! Please try again.";
        }
      } else {
        throw new Meteor.Error(
          401,
          "Access denied - administrator role required"
        );
      }
    },
  });
}
