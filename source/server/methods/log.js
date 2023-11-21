import {Articles} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';
import Constants from '/lib/constants';
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
  Meteor.methods({
    'log.info' (content) {
      if (!this.userId) {
        throw new Meteor.Error(401, 'Access denied')
      }
      check(content, Match.OneOf(String, Object));

      if (typeof(content) === 'string') {
         DEFCON5 && console.log(`INFO: ${content}`);
      }

      if (typeof(content) === 'object') {
         DEFCON5 && console.log(`INFO:`);
         DEFCON5 && console.log(JSON.stringify(content));
      }

      return 'OK';

    }
  });

}
