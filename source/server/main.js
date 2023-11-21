import { Meteor } from 'meteor/meteor';
import publications from './publications';
import methods from './methods';
import addInitialData from './configs/initial_adds.js';
import i18n from 'meteor/universe:i18n';
import {
    DEFCON9,
    DEFCON7,
    DEFCON5,
    DEFCON4,
    DEFCON3,
    DEFCON2,
    DEFCON1
} from "/debug.json";
import AppConfig from "./configs/app";

publications();
methods();
addInitialData();

//
Meteor.startup(() => {
  // WebApp.rawConnectHandlers.use(function(req, res, next) {
  //     res.setHeader("Access-Control-Allow-Origin", "*");
  //     res.setHeader("Access-Control-Allow-Headers", "Authorization,Content-Type");
  //     return next();
  // });
  // });
  DEFCON2 && console.log("* * * * * * * * * * * * * * * * * * * * ");
  DEFCON2 && console.log("Starting Neptune POD Meteor server sequence");
  DEFCON2 && console.log(AppConfig.name);
  DEFCON2 && console.log(AppConfig.version_build_date);
  DEFCON2 && console.log("Running on " + Meteor.release);
  DEFCON2 && console.log("* * * * * * * * * * * * * * * * * * * * ");
  Accounts.urls.resetPassword = function (token) {
    return Meteor.absoluteUrl("reset-password/" + token);
  };

  Accounts.emailTemplates.siteName = i18n.__("Email_SiteName_Text");
  Accounts.emailTemplates.from = i18n.__("Email_From_Text");

  Accounts.emailTemplates.resetPassword = {
    subject(user) {
      return i18n.__("Email_ResetPassword_Subject");
    },

    html(user, url) {
      let urlTag = `<a href="${url}">${url}</a>`;
      return i18n.__("Email_ResetPassword_Text", { urlTag });
    },
  };

  Accounts.onCreateUser((options, user) => {
    DEFCON5 && console.log("Creating user x");

    user.status = "active";
    user.name = options.name;
    return user;
  });

  Accounts.validateLoginAttempt(function (loginRequest) {
    if (loginRequest.user) {
      if (!loginRequest.user.status || loginRequest.user.status != "active")
        throw new Meteor.Error(403, i18n.__("Error_Account_NotActive"));
    }
    return true;
  });

  Accounts.onLogin((loginInfo) => {
    if (
      loginInfo &&
      loginInfo.allowed === true &&
      loginInfo.type !== "resume"
    ) {
    }
  });
});