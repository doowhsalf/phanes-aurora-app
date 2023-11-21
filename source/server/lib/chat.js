import {ChatRooms, ChatLines} from '/lib/collections';
import Constants from '/lib/constants';
import {Meteor} from "meteor/meteor";

const groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export default {

  getChatRoomById: function(id) {

    return null;
  }
}
