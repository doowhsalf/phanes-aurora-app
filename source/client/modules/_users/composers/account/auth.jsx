import {useDeps} from 'react-simple-di-extra';
import {composeWithTracker, composeAll} from 'react-komposer';
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

const composer = ({context}, onData) => {

  const {Meteor} = context();

  if (Meteor.subscribe('users.current').ready()) {
    // const loggedIn = Meteor.userId() ? true : false;
    // const loggedIn = Meteor.userId() === true;
    const loggedIn = Meteor.userId() || false;
    const user = Meteor.users.findOne(Meteor.userId());
    const email = _.get(user, 'emails[0].address', null);
    // const email = user.firstEmail();
    onData(null, {loggedIn, user, email});
  }

};

export default (component) => composeAll(
    composeWithTracker(composer),
    useDeps()
  )(component);
