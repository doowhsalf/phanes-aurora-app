import React from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import makeStyles from '@mui/styles/makeStyles';
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";

const useStyles = makeStyles((theme) => ({
  root: {},
  margin: {
    height: theme.spacing(3),
  },
}));

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 10,
    label: "10",
  },
  {
    value: 20,
    label: "20",
  },
  {
    value: 30,
    label: "30",
  },
  {
    value: 40,
    label: "40",
  },
  {
    value: 60,
    label: "60",
  },
  {
    value: 100,
    label: "100",
  },
];

function valuetext(value) {
  return `${value} steg`;
}

export default function DiscreteSlider() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-always" gutterBottom>
        Steg 4
      </Typography>
      <Slider
        defaultValue={56}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-always"
        step={10}
        marks={marks}
        valueLabelDisplay="on"
      />
    </div>
  );
}
