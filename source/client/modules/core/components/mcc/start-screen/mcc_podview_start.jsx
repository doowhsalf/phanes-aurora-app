import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Agent from "../../../containers/agents";
import Sunburst from "../sunburst";
import SunburstDynamic from "../sunburst_dynamic";
import GraphDynamic from "../graph_dynamic";
import GraphDynamicFunction from "../graph_dynamic_function";
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
          <SunburstDynamic
            
          ></SunburstDynamic>
        </Grid>
        
      </Grid>
    </div>
  );
}
