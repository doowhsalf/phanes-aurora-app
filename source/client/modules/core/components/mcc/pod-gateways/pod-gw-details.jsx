import React from "react";
import { Typography } from "@mui/material";
/*
{
    _id: "64ea61631e3e58744ef33090",
    description: "Proxima East - Fibaro",
    gatewayClassId: "fibaro-home3",
    gatewayId: "fibaro-tritonite-proxima-east",
    created: "2023-08-26T15:55:20.000Z",
    createdBy: "system",
    updated: "2023-08-26T15:55:20.000Z",
    updatedBy: "system",
    status: "active",
    matchString: "fibaro-tritonite-proxima-east/",
  },

*/
export default PodGateways = ({ gw }) => {
  return (
    <div>
      <Typography variant="h6">{gw.description}</Typography>
      <Typography color="textSecondary">Status: {gw.status}</Typography>
      <Typography color="textSecondary">ID: {gw.gatewayId}</Typography>
      <Typography color="textSecondary">
        Class: {gw.gatewayClassId}
      </Typography>
      <Typography color="textSecondary">Created: {gw.created}</Typography>
      <Typography color="textSecondary">
        Created By: {gw.createdBy}
      </Typography>
      <Typography color="textSecondary">Updated: {gw.updated}</Typography>
      <Typography color="textSecondary">
        Updated By: {gw.updatedBy}
      </Typography>
      <Typography color="textSecondary">
        Match String: {gw.matchString}
      </Typography>
    </div>
  );
};
