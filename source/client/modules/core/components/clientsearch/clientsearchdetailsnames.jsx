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

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { CardHeader } from "@mui/material";
import { StyledTableCell } from "../helpers/styledTable";

const styles = (theme) => ({
  root: {
    maxWidth: 250,
    padding: theme.spacing(1),
  },
  table: {
    minWidth: 250,
    // marginLeft: theme.spacing(2)
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
    return (
      <div className={classes.root}>
        <Typography variant="h5" id="personDetailsTitle">
          {i18n.__("Entity_Names")}
        </Typography>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">
                {i18n.__("Entity_List_NameType")}
              </StyledTableCell>
              <StyledTableCell align="left">
                {i18n.__("Entity_List_FirstName")}
              </StyledTableCell>
              <StyledTableCell align="left">
                {i18n.__("Entity_List_LastName")}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={this.getNameField(row, "NameID")}>
                <TableCell align="left" component="th" scope="row">
                  {this.getNameField(row, "NameType")}
                </TableCell>
                <TableCell align="left">
                  {this.getNameField(row, "FirstName")}
                </TableCell>
                <TableCell align="left">
                  {this.getNameField(row, "LastName")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
