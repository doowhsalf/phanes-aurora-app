import React from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import withStyles from "@mui/styles/withStyles";
import PropTypes from "prop-types";
import SnackBarMessage from "../fields/snackbar-message";
import Container from "@mui/material/Container";

import Iframe from "react-iframe";
function _uniqueKey() {
  return Math.random() * Math.random();
}
export function contactInfo(classes) {
  // calculate the current year
  const currentYear = new Date().getFullYear();
  const copyRight = `© ${currentYear} Tritonite AB. All rights reserved.`;

  const contactInfo = [
    <div key={_uniqueKey()}>
      <br />
      <Typography variant={"h4"}>Aurora</Typography>
      <br /> <hr />
      <Typography variant={"body1"}>
        <strong>Adress:</strong> <br />
        <br />
        Fleminggatan 23 <br />
        112 26 Stockholm
        <br />
        Sweden&nbsp;
        <br />
        hello@tritonite.io <br />
        <br />
        {copyRight}
        <br />
        <br />
        <br />
      </Typography>
      <hr />
      <Typography variant={"body2"}></Typography>
    </div>,
  ];

  return contactInfo;
}
