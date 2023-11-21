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
import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";
import { StyledTableCell } from "../helpers/styledTable";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { getField } from "../helpers/getField";

const styles = (theme) => ({
  root: {
    width: "100%",
    overflowX: "auto",
    paddingLeft: "20%",
    paddingRight: "20%",
    textAlign: "left",
    color: theme.palette.text.secondary,
    minHeight: 300,
    minWidth: 500,
  },
  table: {
    minWidth: 650,
  },
  paper: {
    zIndex: 1,
    position: "relative",
    margin: theme.spacing(1),
  },
  avatar: {},
  textStuff: {
    width: "100%",
    maxWidth: 500,
  },
});

/*
address: "Årstavägen 106 / Ullungen 1"
dispatchgroup: "1"
energy_delivery_method: "VP"
facility: "035_07"
facility_orginal: "035-07"
mid: "9387"
mid_uuid: "9387_01"
read_proc_status: "OK"
signalgroup: "SECONDARY"
status: "active"
sub_surcuit: "01"
sv21_manual_signal_method: "1"
ttc: "60"
valve_type: "SV21"
write_heat_proc_status: null
write_power_proc_status: "OK"

*/

class MccConfigTableData extends React.Component {
  constructor(props) {
    super(props);
    this.state = { detailsVisible: false, selectedPerson: null };
  }

  render() {
    const { classes, results, selectPerson, noResult } = this.props;
    let rows = results && results.list ? results.list : [];
    // do not render if rows are empty
    let theInfoLabel = !noResult ? "" : i18n.__("Label_NoSearchPerfomed");
    if (!rows.length)
      return (
        <Container maxWidth="sm">
          <Typography variant="subtitle2" gutterBottom align={"center"}>
            {theInfoLabel}
          </Typography>
        </Container>
      );

    return (
      <div>
        <div className={classes.root}>
          <Table className={classes.table} size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell padding="checkbox" align="left">
                  {" "}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {i18n.__("Entity_List_SSN")}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {i18n.__("Entity_List_FirstName")}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {i18n.__("Entity_List_LastName")}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {i18n.__("Entity_List_Gender")}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {i18n.__("Entity_List_PEP")}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {i18n.__("Entity_List_RCA")}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {i18n.__("Entity_List_SearchBySSN")}
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  hover
                  key={row.PersonID}
                  onClick={() => {
                    selectPerson(row);
                  }}
                >
                  <TableCell padding="checkbox" align="left">
                    {this.getPersonAvatar(row)}
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {this.getSSN(row)}
                  </TableCell>
                  <TableCell align="left">
                    {this.getNameField(row, "FirstName")}
                  </TableCell>
                  <TableCell align="left">
                    {this.getNameField(row, "LastName")}
                  </TableCell>
                  <TableCell align="left">
                    {this.getField(row, "Gender")}
                  </TableCell>
                  <TableCell align="left">
                    <Checkbox
                      disabled
                      checked={this.getField(row, "PEP") === "1"}
                      value="PEP"
                    />
                  </TableCell>
                  <TableCell align="left">
                    <Checkbox
                      disabled
                      checked={this.getField(row, "RCA") === "1"}
                      value="RCA"
                    />
                  </TableCell>
                  <TableCell align="left">
                    <Checkbox
                      disabled
                      checked={results.searchBySSN}
                      value="SearchBySSN"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  // getField = (row, field) => {
  //   if (row) {
  //     return row[field];
  //   }
  //   return "";
  // };

  getNameField = (row, field) => {
    if (row && row.Names && Array.isArray(row.Names) && row.Names.length > 0) {
      //TODO export or change to ID
      const primaryName = row.Names.find(
        (name) => name.NameType === "Primärt namn"
      );
      return primaryName[field];
    }
    return "";
  };

  getSSN = (row) => {
    if (
      row &&
      row["SSNs"] &&
      Array.isArray(row["SSNs"]) &&
      row["SSNs"].length > 0
    ) {
      return row["SSNs"][0]["CurrentSSN"];
    }
    return "";
  };

  getPersonAvatar = (person) => {
    const { classes } = this.props;
    if (person.ImageLink) {
      return (
        <Avatar
          src={person.ImageLink}
          aria-label="Person"
          className={classes.avatar}
        />
      );
    }

    const firstName = this.getNameField(person, "FirstName");
    const lastName = this.getNameField(person, "LastName");

    const avatarLetters = `${firstName ? firstName.charAt(0) : ""}${
      lastName ? lastName.charAt(0) : ""
    }`;

    return (
      <Avatar aria-label="Person" className={classes.avatar}>
        {avatarLetters}{" "}
      </Avatar>
    );
  };
}

MccConfigTableData.propTypes = {
  classes: PropTypes.object.isRequired,
  results: PropTypes.object,
  selectPerson: PropTypes.func,
};

export default withStyles(styles)(MccConfigTableData);
