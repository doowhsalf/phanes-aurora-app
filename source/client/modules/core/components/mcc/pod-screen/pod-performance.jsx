import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import PerformanceChart from "./pod-performance-chart";

export default function PodPerformance({ cpu, memory, disk }) {
  const overall = Math.floor((cpu + memory + disk) / 3);

  return (
    <Card variant="none">
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>CPU Usage: {cpu} %</Typography>
            <PerformanceChart value={cpu} label="CPU" />
          </Grid>
          <Grid item xs={6}>
            <Typography>Memory Used: {memory} %</Typography>
            <PerformanceChart value={memory} label="Memory" />
          </Grid>
          <Grid item xs={6}>
            <Typography>Disk Space Used: {disk} %</Typography>
            <PerformanceChart value={disk} label="Disk" />
          </Grid>
          <Grid item xs={6}>
            <Typography>Overall Utilization: {overall} %</Typography>
            <PerformanceChart value={overall} label="Overall" />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
