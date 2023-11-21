import * as Collections from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import {ReactiveDict} from 'meteor/reactive-dict';
import {Tracker} from 'meteor/tracker';
import _ from 'lodash';

import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1
} from "/debug.json";

const authCommon = function () {
  let userSubReady = Meteor.subscribe('users.current').ready();
  const userId = Meteor.userId() || null;
  const user = Meteor.user();
  const profile = _.get(Meteor.user(), 'profile', {});
  const email = _.get(Meteor.user(), 'emails[0].address', {});

  return {
    userSubReady,
    userId,
    user,
    email,
    profile
  };

};

export default function () {
  return {
    Meteor,
    FlowRouter,
    Collections,
    LocalState: new ReactiveDict(),
    Tracker,
    authCommon
  };
}
