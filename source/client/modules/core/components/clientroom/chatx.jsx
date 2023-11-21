import React from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import Skeleton from '@mui/material/Skeleton';
import Chat from "../../containers/chatcomponent/chatlinelistcomponent";

export function Variants(channel) {
  console.log("in variants");
  console.log(channel);
  return (
    <div>
      <Chat channelId={channel} close={false} />
      {/* <Skeleton animation="wave" />

      <Skeleton />
      <Skeleton animation={false} /> */}
    </div>
  );
}
