import { createApp } from 'mantra-core-extra';
import initContext from './configs/context';
import createLocale from './configs/locale';
import { Meteor } from 'meteor/meteor';
//import injectTapEventPlugin from 'react-tap-event-plugin';
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

// modules
import coreModule from './modules/core';
import _usersModule from './modules/_users';
import _themeModule from './modules/_theme';
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1
} from "/debug.json";

// init context
const context = initContext();
var current_time = new Date();
var prev_time = new Date();

// create app
const app = createApp(context);
app.loadModule(_themeModule);
app.loadModule(_usersModule);
app.loadModule(coreModule);
app.init();

//init locale
const locale = createLocale();
locale.init(context);

if (!Meteor.isCordova) {
  document.addEventListener('deviceready', onDeviceReady, false);
}

// device APIs are available
//
function onDeviceReady() {
  document.addEventListener('pause', onPause, false);
  document.addEventListener('resume', onResume, false);
  // Add similar listeners for other events
}

function onPause() {
  Meteor.disconnect();
  // Handle the pause event
}

function onResume() {
  Meteor.reconnect();
}

Accounts.onEnrollmentLink((token, done) => {
  'use strict';
  console.log(token);
  FlowRouter.go('/reset-password/' + token);
});

function redirectToLogin(context, redirect) {
  if (!Meteor.userId()) {
    redirect('/login');
  }
}

function redirectToMain(context, redirect) {
  if (!Meteor.userId()) {
    redirect('/start');
  }
}
//
// FlowRouter.triggers.enter([redirectToLogin], {
//   except: [
//     'users.login',
//     'users.register',
//     'users.password',
//     'users.reset-password',
//     'content.single',
//     'clientsearchsimple',
//     'admin.users'
//   ]
// });

var heartbeatInterval =
  (Meteor.settings &&
    Meteor.settings.public &&
    Meteor.settings.public.staleSessionHeartbeatInterval) ||
  1 * 60 * 1000; // 3mins
var activityEvents =
  (Meteor.settings &&
    Meteor.settings.public &&
    Meteor.settings.public.staleSessionActivityEvents) ||
  "mousemove click keydown";

var activityDetected = false;

Meteor.startup(function () {
  //
  // periodically send a heartbeat if activity has been detected within the interval
  //
  DEFCON7 && console.log(`Set Startup sequence...`);

  Meteor.setInterval(function () {
    DEFCON7 && console.log(`Heartbeat Data...`);
    DEFCON7 && console.log(Meteor.userId());
    DEFCON7 && console.log(activityDetected);

    if (Meteor.userId() && activityDetected) {
      Meteor.call("heartbeat");
      activityDetected = false;
      DEFCON7 && console.log(`Set client heartbeat...`);
    } else {
      DEFCON7 && console.log(`No movement...`);
      DEFCON7 && console.log(Meteor.userId());
      DEFCON7 && console.log(activityDetected);
      if (!Meteor.userId()) {
        DEFCON7 && console.log(`No user id, so in this case force a logout...`);
        FlowRouter.go("/logout");
      } else {
        DEFCON4 &&
          console.log(`No movement but we wait a while until logging out...`);
        FlowRouter.reload();
      }
    }
  }, heartbeatInterval);

  //
  // detect activity and mark it as detected on any of the following events
  //
  $(document).on(activityEvents, function () {
    // To calculate the time difference of two dates

    current_time = new Date();
    var diffInSeconds = (current_time.getTime() - prev_time.getTime()) / 1000;
    DEFCON7 && console.log("Time check (Prev), (current), (diff in sec)");
    DEFCON7 && console.log(prev_time.getTime());
    DEFCON7 && console.log(current_time.getTime());
    DEFCON7 && console.log(diffInSeconds);

    prev_time = new Date();

    // if user has not performed any change in 10min, force a reload
    // TODO: move this to settings if needed. Now the requiremnt is 2hours i.e. 7200 seconds
    let autoRefreshTimerInSeconds = 7200;
    if (!Meteor.userId() && diffInSeconds > autoRefreshTimerInSeconds) {
      window.location.reload(false);
    }

    activityDetected = true;
    DEFCON7 && console.log(`Detective a movement...`);
  });
});


FlowRouter.triggers.enter([redirectToMain], {
  except: [
    "root",
    "about",
    "users.login",
    "users.register",
    "users.restore",
    "users.password",
    "users.reset-password",
    "content.single",
    "start",
  ],
});
