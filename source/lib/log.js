import {Meteor} from 'meteor/meteor';

export default class Log {
  static info = (content, callback) => {
    // console.log(`Logging ${content} on server`);
    Meteor.call('log.info', content, (err, result) => {
      if (callback) {
        callback(err, result);
      }
    });
  };

}



