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
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import FormGroup from "@mui/material/FormGroup";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { CardHeader } from "@mui/material";
import { StyledTableCell } from "../helpers/styledTable";
import TextField from "@mui/material/TextField";

const styles = (theme) => ({
  root: {
    maxWidth: 250,
    padding: theme.spacing(1),
  },
  table: {
    minWidth: 250,
    // marginLeft: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(1),
    display: "block",
  },
});

class ClientSearchDetailsNames extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, names } = this.props;
    let rows = names ? names : [];
    let inputProps = { readOnly: true, disabled: true };

    let data = [];
    rows.map((row) => {
      // let item = [
      //   <FormGroup inline>
      //     <Typography variant={"body1"}>
      //       {this.getNameField(row, "NameType")}
      //     </Typography>
      //     <Typography variant={"body1"}>
      //       {this.getNameField(row, "FirstName")}
      //     </Typography>
      //     <Typography variant={"body1"}>
      //       {this.getNameField(row, "LastName")}
      //     </Typography>
      //   </FormGroup>
      // ];

      let item = [
        <TextField
          fullWidth
          disabled
          id={this.getNameField(row, "NameType")}
          label={this.getNameField(row, "NameType")}
          className={classes.textField}
          value={
            this.getNameField(row, "FirstName") +
            " " +
            this.getNameField(row, "LastName")
          }
          inputprops={inputProps}
        />,
      ];

      data.push(item);
    });

    return (
      <div className={classes.root}>
        <Typography variant="h5" id="personDetailsTitle">
          {i18n.__("Entity_Names")}
        </Typography>
        {data}
      </div>
    );
  }

  getNameField = (row, field) => {
    if (row) {
      return row[field];
    }
    return "???";
  };
}

ClientSearchDetailsNames.propTypes = {
  classes: PropTypes.object.isRequired,
  names: PropTypes.array,
};

export default withStyles(styles)(ClientSearchDetailsNames);
