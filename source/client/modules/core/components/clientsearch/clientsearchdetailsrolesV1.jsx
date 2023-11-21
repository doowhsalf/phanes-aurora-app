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
import Checkbox from "@mui/material/Checkbox";
import classNames from "classnames";
import { desc, stableSort, getSorting } from "./searchhelpers";
import { StyledTableCell } from "../helpers/styledTable";
import { red } from '@mui/material/colors';

const styles = (theme) => ({
  table: {
    minWidth: 650,
  },
  row: {
    //backgroundColor: theme.palette.common.white
  },
  row_inactive_role: {
    backgroundColor: "#d1c4e9",
    color: theme.palette.common.white,
  },
  card: { marginTop: theme.spacing(2) },
});
function getRowClassNameByStatus(prio, classes) {
  let rowClassname = classNames({
    [classes.row]: true,
  });
  DEFCON3 && console.log("Prio...");
  DEFCON3 && console.log(prio);

  switch (prio) {
    case "0":
      rowClassname = classNames({
        [classes.row_inactive_role]: true,
      });
      break;
    case "1":
    default:
      rowClassname = classNames({
        [classes.row]: true,
      });
      break;
  }

  return rowClassname;
}
class ClientSearchDetailsRoles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, roles } = this.props;
    let rows = roles ? roles : [];
    if (!rows.length) return "";

    rows = this._prepRows(rows);
    DEFCON3 && console.log("Fixed rows");
    DEFCON3 && console.log(rows);

    return (
      <Card className={classes.card}>
        <CardHeader
          title={
            <Typography variant="h5" id="personDetailsTitle">
              {i18n.__("Entity_Roles")}
            </Typography>
          }
        />
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">
                {i18n.__("Entity_List_Role")}
              </StyledTableCell>
              <StyledTableCell align="left">
                {i18n.__("Entity_List_RoleCategory")}
              </StyledTableCell>
              <StyledTableCell align="left">
                {i18n.__("Entity_List_RoleCategoryDetails")}
              </StyledTableCell>
              <StyledTableCell align="left">
                {i18n.__("Entity_List_CountryOfJurisdiction")}
              </StyledTableCell>
              <StyledTableCell align="left">
                {i18n.__("Entity_List_FromDate")}
              </StyledTableCell>
              <StyledTableCell align="left">
                {i18n.__("Entity_List_ThroughDate")}
              </StyledTableCell>
              <StyledTableCell align="left">
                {i18n.__("Entity_List_Active")}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={this.getField(row, "RoleID")}
                className={getRowClassNameByStatus(
                  this.getField(row, "IsActive"),
                  classes
                )}
              >
                <TableCell align="left">
                  {this.getField(row, "RoleDescription")}
                </TableCell>
                <TableCell align="left">
                  {this.getField(row, "BaseRoleCategoryName")}
                </TableCell>
                <TableCell align="left">
                  {this.getField(row, "DetailedRoleCategoryName")}
                </TableCell>
                <TableCell align="left">
                  {this.getField(row, "CountryOfJurisdiction")}
                </TableCell>
                <TableCell align="left" size="small">
                  {this.getFromDate(row)}
                </TableCell>
                <TableCell align="left" size="small">
                  {this.getThroughDate(row)}
                </TableCell>
                <TableCell align="left">{this.getIsActiveText(row)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    );
  }
  _prepRows = (rows) => {
    let activeRows = [];
    let inactiveRows = [];
    let newRows = [];
    rows.map((row) => {
      row.fromDateString = this.getFromDate(row);
      row.toDateString = this.getThroughDate(row);
      if (this.getField(row, "IsActive") === "1") {
        activeRows.push(row);
      } else {
        inactiveRows.push(row);
      }
    });

    stableSort(activeRows, getSorting("desc", "fromDateString")).map((row) => {
      newRows.push(row);
    });
    stableSort(inactiveRows, getSorting("asc", "toDateString")).map((row) => {
      newRows.push(row);
    });

    return newRows;
  };

  getField = (row, field) => {
    if (row) {
      return row[field];
    }
    return "";
  };

  getFromDate = (row) => {
    if (row) {
      const year = this.getField(row, "FromDateYear");
      const month = this.getField(row, "FromDateMonth");
      const day = this.getField(row, "FromDateDay");
      let date = year;
      //TODO check format of dates
      date = month ? `${year}-${month}` : date;
      date = day ? `${year}-${month}-${day}` : date;
      return date;
    }
    return "";
  };

  getThroughDate = (row) => {
    if (row) {
      const year = this.getField(row, "ThroughDateYear");
      const month = this.getField(row, "ThroughDateMonth");
      const day = this.getField(row, "ThroughDateDay");
      let date = year;
      //TODO check format of dates
      date = month ? `${year}-${month}` : date;
      date = day ? `${year}-${month}-${day}` : date;
      return date;
    }
    return "";
  };

  getIsActiveText = (person) => {
    return this.getField(person, "IsActive") === "1"
      ? i18n.__("Label_RoleIsActive")
      : i18n.__("Label_RoleIsInActive");
  };
  getIsActive = (person) => {
    return (
      <Checkbox
        disabled
        checked={this.getField(person, "IsActive") === "1"}
        value="IsActive"
      />
    );
  };
}

ClientSearchDetailsRoles.propTypes = {
  classes: PropTypes.object.isRequired,
  roles: PropTypes.array,
};

export default withStyles(styles)(ClientSearchDetailsRoles);
