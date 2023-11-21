import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Agent from "../../../containers/agents";
import Sunburst from "../sunburst";
import SunburstDynamic from "../sunburst_dynamic";
import GraphDynamic from "../graph_dynamic";
import GraphDynamicFunction from "../graph_dynamic_function";
import TempSensorCard from "../sensor_cards/temperature-sensor-card/temperature-sensor-card-master";
import HumiditySensorCard from "../sensor_cards/humidity-sensor-card/humidity-sensor-card-master";
import Typography from "@mui/material/Typography";

import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "auto",
  },
}));

export default function FullWidthGrid() {
  const classes = useStyles();

  DEFCON5 && console.log("Display podview start component");
  return (
    <div className={classes.root}>
      <Typography variant="h4">Dashboard</Typography>

      <Grid container spacing={3}>
        <Grid item xs={4}>
          <TempSensorCard
            nodeId={"meter_48_tvoc01_temperature_sensor"}
          ></TempSensorCard>
        </Grid>
        <Grid item xs={4}>
          <HumiditySensorCard
            nodeId={"meter_50_tvoc01_humidity_sensor"}
          ></HumiditySensorCard>
        </Grid>
        <Grid item xs={4}>
          <TempSensorCard
            nodeId={"meter_lora-ota-70b3d580a010bfa4_null"}
          ></TempSensorCard>
        </Grid>
        <Grid item xs={4}>
          <TempSensorCard
            nodeId={"meter_lora-ota-0007090000519089_null"}
          ></TempSensorCard>
        </Grid>
        <Grid item xs={4}>
          <TempSensorCard
            nodeId={"meter_25_temperature_sensor_kylskåp"}
          ></TempSensorCard>
        </Grid>
        <Grid item xs={4}>
          <TempSensorCard
            nodeId={"meter_29_temperature_sensor"}
          ></TempSensorCard>
        </Grid>
        <Grid item xs={4}>
          <HumiditySensorCard
            nodeId={"meter_lora-ota-70b3d580a010e696_null"}
          ></HumiditySensorCard>
        </Grid>
      </Grid>
    </div>
  );
}
