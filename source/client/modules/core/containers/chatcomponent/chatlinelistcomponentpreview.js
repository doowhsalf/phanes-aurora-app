import ChatLineListComponentPreview from "../../components/chatcomponent/chatlinelistcomponentpreview";
import Loading from "../../../../loading.js";
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
export const composer = ({ context, channelId, limit }, onData) => {
  const { Meteor, Collections } = context();
  DEFCON5 &&
    console.log(
      "In chatLine list component preview composer with channelId: " + channelId
    );
  if (!channelId) {
    onData(null, { channelId });
  } else {
    if (Meteor.subscribe("chatlines.forchannel", channelId).ready()) {
      let queryLimit = limit ? limit : 5;

      let chatLineList = Collections.ChatLines.find(
        {
          channelId: channelId,
          status: "active",
        },
        { sort: { createdAt: -1 }, limit: queryLimit }
      ).fetch();
      const chatUsers = Meteor.users.find({}).fetch();
      chatLineList.reverse();
      onData(null, { channelId, chatLineList, chatUsers });
    }
  }
};

export const depsMapper = (context, actions) => ({
  removeChatLine: actions.chatlinelists.removeChatLine,
  addChatLine: actions.chatlinelists.addChatLine,
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(ChatLineListComponentPreview);
