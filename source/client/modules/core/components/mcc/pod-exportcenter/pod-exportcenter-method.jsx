import React from "react";

import { Typography, Select, MenuItem } from "@mui/material";

function PublishComponent() {
  return (
    <>
      <Typography>Select Publish Method:</Typography>
      <Select defaultValue="">
        <MenuItem value="mqtt">MQTT</MenuItem>
        <MenuItem value="mail">Mail</MenuItem>
        <MenuItem value="webhook">Webhook</MenuItem>
        <MenuItem value="opcua">OPC/UA</MenuItem>
        <MenuItem value="graphql">GraphQL</MenuItem>
      </Select>
    </>
  );
}

export default PublishComponent;
