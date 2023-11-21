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
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import { CardHeader } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { StyledTableCell } from "../helpers/styledTable";
import { Tooltip } from "@mui/material";
import HelpIcon from "@mui/icons-material/HelpTwoTone";
const styles = (theme) => ({
  table: {
    minWidth: 650,
  },
  card: { marginTop: theme.spacing(2) },
});

class ClientSearchDetailsRelations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, selectPerson, relatedPersons } = this.props;
    let rows = relatedPersons ? relatedPersons : [];
    if (!rows.length) return null;

    return (
      <Card className={classes.card}>
        <CardHeader
          title={
            <Typography variant="h5" id="personDetailsTitle">
              {i18n.__("Entity_Relations")}{" "}
            </Typography>
          }
        />
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell padding="checkbox" align="left" />
              <StyledTableCell align="left">
                {i18n.__("Entity_List_RelationType")}
              </StyledTableCell>
              <StyledTableCell align="left">
                {i18n.__("Entity_List_Name")}
              </StyledTableCell>
              <StyledTableCell align="left">
                {i18n.__("Entity_List_RelationDescription")}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((relatedPerson) => {
              return (
                <TableRow
                  hover
                  key={this.getField(relatedPerson, "RelationID")}
                  onClick={() => {
                    selectPerson(relatedPerson);
                  }}
                >
                  <TableCell padding="checkbox" align="left">
                    <Tooltip
                      id="help"
                      title={i18n.__("Entity_List_OpenRelation")}
                    >
                      {this.getPersonAvatar(relatedPerson)}
                    </Tooltip>
                  </TableCell>
                  <TableCell align="left">
                    {this.getField(relatedPerson, "RelationType")}
                  </TableCell>
                  <TableCell align="left">
                    {`${this.getPersonName(
                      relatedPerson
                    )} ${this.getAttributesString(relatedPerson)} `}
                  </TableCell>
                  <TableCell align="left">
                    {this.getField(relatedPerson, "RelationDescription")}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    );
  }

  getField = (row, field) => {
    if (row) {
      return row[field];
    }
    return "";
  };

  getPersonName = (person) => {
    const name = person && person.Names ? person.Names[0] : null;
    if (name) {
      return `${name.FirstName} ${name.LastName}`;
    }
    return "";
  };

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

  getAttributesString = (person) => {
    let result = "";
    if (this.getField(person, "RCA") === "1") {
      result = "(RCA)";
    }
    if (this.getField(person, "PEP") === "1") {
      if (result === "") {
        result = "(PEP)";
      }
      if (result === "(RCA)") {
        result = "(PEP, RCA)";
      }
    }

    return result;
  };

  getPersonAvatar = (person) => {
    const { classes } = this.props;

    if (!person) {
      return null;
    }

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

ClientSearchDetailsRelations.propTypes = {
  classes: PropTypes.object.isRequired,
  relations: PropTypes.array,
  selectPerson: PropTypes.func,
};

export default withStyles(styles)(ClientSearchDetailsRelations);
