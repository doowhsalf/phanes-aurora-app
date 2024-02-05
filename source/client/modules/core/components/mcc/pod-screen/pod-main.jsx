import React from "react";

import { Container, Grid, Paper, Typography } from "@mui/material";

import PodDetails from "./pod-details";
import PodStatistics from "./pod-statistics";
import PodPerformance from "./pod-performance-main";

const samplePod = {
  name: "Aurora Demo POD",
  description:
    "This is the Aurora Demo POD used to prototype the usage of the Aurora platform.",
  activationDate: "2023-10-08 12:48:08",
};

const sampleEntityStats = [
  { label: "Aurora-pod", category: "Entity class", kpi: 1 },
  { label: "System", category: "Entity class", kpi: 1 },
  { label: "Gateway", category: "Entity class", kpi: 5 },
  { label: "Meter", category: "Entity class", kpi: 161 },
  { label: "Temperature Meter", category: "Entity class", kpi: 2 },
  { label: "Combined Meter", category: "Entity class", kpi: 2 },
  { label: "Humidity Meter", category: "Entity class", kpi: 1 },
  { label: "Points", category: "Entity class", kpi: 443 },
  { label: "Portfolio", category: "Entity class", kpi: 1 },
  { label: "Building", category: "Entity class", kpi: 7 },
  { label: "Transactions per hour last 3h", category: "Events", kpi: 312 },
  { label: "Transactions per day", category: "Events", kpi: 7454 },
  { label: "Transactions per week", category: "Events", kpi: 55400 },
  { label: "Transactions per month", category: "Events", kpi: 221600 },
];

const samplePerformance = {
  cpu: 60,
  memory: 40,
  disk: 75,
  overall: 58,
};

export default function PodScreen() {
  return (
    <>
      <Typography variant="h4">POD Panel</Typography>
      <Grid container spacing={2} direction="row">
        {/* Main POD Details */}
        <Grid item xs={3}>
          <Paper
            variant="outlined"
            style={{ padding: "20px", minHeight: "450px" }}
          >
            <PodDetails pod={samplePod} />
          </Paper>
        </Grid>

        {/* Statistics and Performance Details */}
        <Grid item xs={3}>
          <Paper variant="outlined" style={{ padding: "20px" }}>
            <PodStatistics stats={sampleEntityStats} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper variant="outlined" style={{ padding: "20px" }}>
            <PodPerformance />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
