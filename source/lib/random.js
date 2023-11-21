import {Meteor} from 'meteor/meteor';

export default class Random {
  static generateString = (length) => {
    if (!length) {
      length = 5;
    }
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  };

}



