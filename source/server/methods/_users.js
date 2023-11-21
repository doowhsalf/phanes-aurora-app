import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
// import _ from 'lodash';
import { Random } from "meteor/random";
import DrupalServices from "../lib/drupal/services.js";
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

      if (!this.userId || this.userId !== userId) {
        throw new Meteor.Error(401, "Access denied");
      }

      let updated = Meteor.users.update(
        {
          _id: userId,
        },
        {
          $set: {
            profile: text,
          },
        }
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

      if (!this.userId || this.userId !== userId) {
        throw new Meteor.Error(401, "Access denied");
      }

      let updated = Meteor.users.update(
        {
          _id: userId,
        },
        {
          $set: {
            name: text,
          },
        }
      );
      if (updated) {
        return "Name updated";
      } else {
        return "Name not updated! Please try again.";
      }
    },
    "_users.anonymize"(userId) {
      check(userId, String);

      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }

      if (false) {
        const newUser = {
          name: Random.id(),
          "emails.0.address": Random.id(),
          avatar_uri: "",
        };
        let updated = Meteor.users.update(
          {
            _id: userId,
          },
          { $set: newUser }
        );
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

    async "_users.isAdmin"() {
      //this allows catching exceptions properly:
      const doWork = async () => {
        //TODO: Create a proper Get User Role function for Miclab here... atm all users are the same base user
        // let adminsCompanyId = await getAdministratedCompanyId();
        DEFCON5 && console.log("Is admin returned:");
        DEFCON5 && console.log(adminsCompanyId);
        return adminsCompanyId && adminsCompanyId > 0;
      };

      try {
        return await doWork();
      } catch (e) {
        throw new Meteor.Error(e.error, e.reason);
      }
    },

    async "_users.getRoles"() {
      if (!this.userId) {
        DEFCON5 && console.log("_users.getRoles - Access denied");
        throw new Meteor.Error(401, "Access denied");
      }
      const services = new DrupalServices();
      //TODO: Create a proper Get User Role function for Miclab here... atm all users are the same base user
      // let adminsCompanyId = await getAdministratedCompanyId();
      //const roles = await services.getUserRoles(Meteor.user().uid);
      let roles = [];
      DEFCON5 && console.log("Roles returned:");
      DEFCON5 && console.log(roles);
      return roles;
    },

    async "_users.getCompanyUsers"() {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      return getCompanyUsers();
    },

    async "_users.manage"(uid, action) {
      check(uid, String);
      check(action, String);

      //this allows catching exceptions properly:
      const doWork = async () => {
        if (!this.userId) {
          DEFCON5 && console.log("_users.activate - Access denied");
          throw new Meteor.Error(401, "Access denied");
        }

        const services = new DrupalServices();
        const administratedCompanyId = await getAdministratedCompanyId();
        if (administratedCompanyId) {
          const response = await services.manageUser(
            uid,
            action,
            administratedCompanyId
          );
          DEFCON5 && console.log(`Action ${action} for user ${uid} successful`);
          return response;
        }

        DEFCON5 && console.log(`Action ${action} for user ${uid} failed`);
        DEFCON5 && console.log(`User ${this.userId} is not an admin`);
        return null;
      };

      try {
        return await doWork();
      } catch (e) {
        throw new Meteor.Error(e.error, e.reason);
      }
    },
    async "_users.createMyAccount"(user) {
      check(user, Object);
      DEFCON3 && console.log("_users.createMyAccount - start");
      DEFCON3 && console.log(user);

      //this allows catching exceptions properly:
      const doWork = async () => {
        const services = new DrupalServices();

        const response = await services.drupalInsertUser(user);
        try {
          DEFCON5 && console.log(`Action addUser for user ${user} successful`);
          DEFCON3 && console.log("The response...");
          DEFCON3 && console.log(response);
          return response;
        } catch (e) {
          DEFCON3 &&
            console.log(`Action drupalInsertUser for user ${user} failed`);
          DEFCON3 && console.log(e);
          return null;
        }
      };

      try {
        return await doWork();
      } catch (e) {
        DEFCON5 && console.log(`Action addUser for user ${user} failed`);
        throw new Meteor.Error(e.error, e.reason);
      }
    },
    async "_users.add"(user) {
      check(user, Object);

      //this allows catching exceptions properly:
      const doWork = async () => {
        if (!this.userId) {
          DEFCON5 && console.log("_users.activate - Access denied");
          throw new Meteor.Error(401, "Access denied");
        }

        const services = new DrupalServices();
        const administratedCompanyId = await getAdministratedCompanyId();
        if (administratedCompanyId) {
          const response = await services.addUser(user, administratedCompanyId);
          DEFCON5 && console.log(`Action addUser for user ${user} successful`);
          return response;
        }

        DEFCON5 && console.log(`Action addUser for user ${user} failed`);
        DEFCON5 && console.log(`User ${this.userId} is not an admin`);
        return null;
      };

      try {
        return await doWork();
      } catch (e) {
        throw new Meteor.Error(e.error, e.reason);
      }
    },
    async "_users.syncDrupalUser"(userid, uid) {
      check(uid, String);
      check(userid, String);

      return syncDrupalUser(userid, uid);
    },
    async "_users.syncDrupalUserOld"(userid, uid) {
      DEFCON3 && console.log("_users.syncDrupalUser");
      DEFCON3 && console.log("Sync and update user " + uid);

      check(uid, String);

      //this allows catching exceptions properly:
      const doWork = async () => {
        // if (!this.userId) {
        //   DEFCON5 && console.log("_users.syncDrupalUser - Access denied");
        //   throw new Meteor.Error(401, "Access denied");
        // }
        const services = new DrupalServices();
        const response = await services.getDrupalUser(uid);
        Meteor.users.update(this.userId, {
          $set: {
            avatar_uri: response.uri,
            first_name: response.field_first_name,
            last_name: response.field_last_name,
            information: response.field_information,
            telephone: response.field_telephone_number,
          },
        });
        return response;
      };

      try {
        return await doWork();
      } catch (e) {
        throw new Meteor.Error(e.error, e.reason);
      }
    },

    async "_users.getUserByAttribute"(method, value) {
      check(method, String);
      check(value, String);

      return getUserByAttribute(method, value);
    },

    async "_users.userWithNameExist"(method, value) {
      check(method, String);
      check(value, String);

      result = await getUserByAttribute(method, value);
      DEFCON3 && console.log(`Checking result `);
      DEFCON3 && console.log(result);

      return result !== undefined
        ? result.value !== ""
          ? true
          : false
        : false;
    },
  });
}

const getAdministratedCompanyId = async () => {
  const currentUid = Meteor.user() && Meteor.user().uid;
  const services = new DrupalServices();
  const roles = await services.getUserRoles(currentUid);
  //get a company that user is admin for?
  return roles && roles.admin && roles.admin[0];
};

const getCompanyUsers = async () => {
  const services = new DrupalServices();
  const administratedCompanyId = await getAdministratedCompanyId();
  if (administratedCompanyId) {
    const users = await services.getCompanyUsers(administratedCompanyId);
    return users;
  }
  return [];
};

const syncDrupalUser = async (userid, uid) => {
  DEFCON3 && console.log("_users.syncDrupalUser");
  DEFCON3 && console.log("Sync and update user " + uid);

  //this allows catching exceptions properly:

  // if (!this.userId) {
  //   DEFCON5 && console.log("_users.syncDrupalUser - Access denied");
  //   throw new Meteor.Error(401, "Access denied");
  // }
  const services = new DrupalServices();
  const response = await services.drupalGetUser(uid);
  Meteor.users.update(userid, {
    $set: {
      avatar_uri: response.uri,
      first_name: response.field_first_name,
      last_name: response.field_last_name,
      information: response.field_information,
      telephone: response.field_telephone_number,
    },
  });
  return response;
};

const getUserByAttribute = async (method, value) => {
  DEFCON3 && console.log("getUserByAttribute");
  DEFCON3 &&
    console.log(`Getting a user with method and value ${method} ${value}`);

  const services = new DrupalServices();
  const response = await services.getUserByAttribute(method, value);
  return response;
};
