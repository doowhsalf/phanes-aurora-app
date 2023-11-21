import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1
} from "/debug.json";
export default function() {
  Meteor.publish('users.all', function() {
    if (!this.userId) {
      throw new Meteor.Error(401, 'Access denied');
    }

    const selector = {
      status: 'active'
    };
    const options = {};
    const response = Meteor.users.find(selector, options);
    // DEFCON5 && console.log('Users.Collection');
    return response;
  });

  Meteor.publish('users.single', function(_id) {
    if (!this.userId) {
      throw new Meteor.Error(401, 'Access denied');
    }
    check(_id, String);
    const selector = {
      _id,
      status: 'active'
    };
    const response = Meteor.users.find(selector);
     DEFCON5 && console.log('Users.Single');
    return response;
  });

  Meteor.publish('users.single.uid', function(uid) {
    if (!this.userId) {
      throw new Meteor.Error(401, 'Access denied');
    }
    check(uid, String);
    const selector = {
      uid
    };
    const response = Meteor.users.find(selector);
     DEFCON5 && console.log('Users.Single.Uid');
    return response;
  });

  Meteor.publish('users.current', function() {
    if (!this.userId) {
      throw new Meteor.Error(401, 'Access denied');
    }
    // check(_id, String);
    // if (this.userId) {
    const selector = {
      _id: this.userId
    };
    const response = Meteor.users.find(selector);
    //  DEFCON5 && console.log ('publish users.current _id', _id);
    //  DEFCON5 && console.log ('publish users.current this.userId', this.userId);
    return response;
  });
}
