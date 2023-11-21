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

import Image from "material-ui-image";
import { maxWidth } from "@mui/system";
import withStyles from '@mui/styles/withStyles';
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export const StyledTableCell = withStyles((theme) => ({
  head: {
    //  backgroundColor: theme.palette.grey[100],
    //  color: theme.palette.common.black,
    fontSize: 16,
    fontWeight: "bold",
  },
  body: {
    fontSize: 28,
    fontWeight: "bold",
  },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);
