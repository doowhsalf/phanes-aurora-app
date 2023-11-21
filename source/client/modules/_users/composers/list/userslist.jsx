import UsersList from "../../components/list/userslist"
import {useDeps, composeWithTracker, composeAll} from "mantra-core-extra";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1
} from "/debug.json";
import Loading from "../../../../loading.js";
import Error from "../../../../error.js";

export const composer = ({context, clearErrors}, onData) => {
  const { Meteor, Collections } = context();
  onData(null, {});

  // clearErrors when unmounting the component
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  manageUser: actions._users.manage,
  addUser: actions._users.add,
  context: () => context

});

export default composeAll(
  composeWithTracker(composer, Loading, Error),
  useDeps(depsMapper)
)(UsersList);


