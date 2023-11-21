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
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export function renderLabel(fieldTitle, value, classes) {
  let label = [
    <div className={classes.textField}>
      <Typography variant="caption" display="block" component="div">
        {i18n.__(fieldTitle)}
      </Typography>
      <Typography component="div">
        <Box fontSize="block.fontSize" fontStyle="normal" component="span">
          {value}
        </Box>
      </Typography>
      <Divider className={classes.divider} />
    </div>,
  ];
  return label;
}
