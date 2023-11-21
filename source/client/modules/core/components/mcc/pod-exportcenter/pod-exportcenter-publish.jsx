import React from "react";
import { Typography, RadioGroup, FormControlLabel, Radio } from "@mui/material";

function PublishComponent() {
  return (
    <>
      <Typography>Select Publish Method:</Typography>
      <RadioGroup defaultValue="">
        <FormControlLabel value="mqtt" control={<Radio />} label="MQTT" />
        <FormControlLabel value="mail" control={<Radio />} label="Mail" />
        <FormControlLabel value="webhook" control={<Radio />} label="Webhook" />
        <FormControlLabel value="opcua" control={<Radio />} label="OPC/UA" />
        <FormControlLabel value="graphql" control={<Radio />} label="GraphQL" />
      </RadioGroup>
    </>
  );
}

export default PublishComponent;
