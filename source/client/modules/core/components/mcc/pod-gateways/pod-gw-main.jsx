import React from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";
import PodGateways from "./pod-gw-details";

const gateways = [
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
  {
    _id: "64ea63421e3e58744ef3309d",
    description: "Proxima SouthEast",
    gatewayClassId: "fibaro-home3",
    gatewayId: "fibaro-tritonite-proxima-southeast",
    created: "2023-08-26T15:55:20.000Z",
    createdBy: "system",
    updated: "2023-08-26T15:55:20.000Z",
    updatedBy: "system",
    status: "active",
    matchString: "fibaro-tritonite-proxima-southeast/",
  },
  {
    _id: "64ea63eb1e3e58744ef3309e",
    description: "P1IB - P1 Interface Bridge - Proxima SouthEast",
    gatewayClassId: "p1ib",
    gatewayId: "p1ib-tritonite-proxima-southeast",
    created: "2023-08-26T15:55:20.000Z",
    createdBy: "system",
    updated: "2023-08-26T15:55:20.000Z",
    updatedBy: "system",
    status: "active",
    matchString: "p1ib/",
  },
  {
    _id: "64ea69c41e3e58744ef330a0",
    description: "KW4AL76310 - Demo Gateway at Ambiductor",
    gatewayClassId: "cloudgate",
    gatewayId: "KW4AL76310",
    created: "2023-08-26T15:55:20.000Z",
    createdBy: "system",
    updated: "2023-08-26T15:55:20.000Z",
    updatedBy: "system",
    status: "active",
    matchString: "data/KW4AL76310/lora/",
  },
  {
    _id: "64eddadf1e3e58744ef333e6",
    description: "Fibaro home system, Robert Rennel, Alpvägen",
    gatewayClassId: "fibaro-home3",
    gatewayId: "fibaro-alpvagen",
    created: "2023-08-29T13:47:20.000Z",
    createdBy: "system",
    updated: "2023-08-29T13:47:20.000Z",
    updatedBy: "system",
    status: "active",
    matchString: "fibaro-alpvagen/",
  },
];

export default function PodScreen() {
  return (
    <>
      <Typography variant="h4">Gateways</Typography>

      <Grid container spacing={2} direction="row">
        {gateways.map((gw) => (
          <Grid item xs={3}>
            <Paper
              variant="outlined"
              style={{ padding: "20px", minHeight: "450px" }}
            >
              <PodGateways gw={gw} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
