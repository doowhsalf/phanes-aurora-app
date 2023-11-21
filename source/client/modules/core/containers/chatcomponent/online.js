import Chatsearch from "../../components/chatcomponent/chatsearch";
import Loading from "/client/loading.js";
import { useDeps, composeWithTracker, composeAll } from "mantra-core-extra";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";
import Constants from "/lib/constants";

DEFCON3 && console.log("In CHAT-ROOM list component, kickstarting stuff");

export const composer = ({ context }, onData) => {
  const { Meteor, Collections } = context();
  DEFCON3 && console.log("Log online users ");

  DEFCON3 && console.log("Ok, all online-users...");

  let userId = Meteor.userId();

  if (Meteor.subscribe("users.online").ready()) {
    let userIds = [];
    userIds.push(userId);
    // const users = Online.find().fetch();

    // DEFCON3 && console.log("users");
    // DEFCON3 && console.log(users);
    // users.map((user, index, array) => {
    //   userIds.push(user.userId);
    // });
    var query = {
      _id: {
        $in: userIds,
      },
    };

    Meteor.call("_users.getUserList", query, (err, result) => {
      if (!err) {
        DEFCON4 && console.log("Query Error - getting user list...");
      }

      // var chatUsers = Meteor.users.find(query).fetch();

      DEFCON3 && console.log("Query to get users ");
      DEFCON3 && console.log(query);
      DEFCON3 && console.log("Users");
      DEFCON3 && console.log(result);
      let chatUsers = result;
      try {
        onData(null, { chatUsers });
      } catch (err) {
        DEFCON3 && console.log(err);
      }
    });
  }
};
export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(Chatsearch);
