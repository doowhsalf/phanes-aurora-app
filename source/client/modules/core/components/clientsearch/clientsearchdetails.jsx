import React from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import clsx from "clsx";

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
import ClientSearchDetailsNames from "./clientsearchdetailsnamesV2";
import ClientSearchDetailsRoles from "./clientsearchdetailsroles";
import ClientSearchDetailsRelations from "../../containers/clientsearchdetailsrelations";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import { CardHeader } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Icon from "@mui/material/Icon";
import CloseIcon from "@mui/icons-material/Close";
import ArrowLeft from "@mui/icons-material/ArrowLeft";
import FormGroup from "@mui/material/FormGroup";
import { inherits } from "util";
//import Image from "material-ui-image";

const styles = (theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(1),
    overflowX: "auto",
  },
  card: {},
  table: {
    minWidth: 650,
  },
  details: {
    padding: theme.spacing(1),
  },
  imageCard: {
    margin: theme.spacing(0.5),
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(2),
    width: 250,
    height: "auto",
    maxHeight: 250,
    textAlign: "center",
  },
  image: {
    borderRadius: 4,
    maxWidth: "100%",
    height: "auto",
    padding: "4%",
    objectFit: "contain",
  },
  bigAvatar: {
    margin: theme.spacing(1),
    width: 150,
    height: 150,
    marginRight: theme.spacing(2),
  },
  textField: {
    marginTop: theme.spacing(1),
    display: "block",
  },
  buttonLeft: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(0),
    marginBottom: theme.spacing(2),
    float: "left",
  },

  buttonRight: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(0),
    marginBottom: theme.spacing(2),
    float: "right",
  },
});

class ClientSearchDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { relatedPersonStack: [] };
  }

  render() {
    const {
      classes,
      person,
      closeDetails,
      popRelatedPersonStack,
      selectRelatedPerson,
    } = this.props;

    if (!person) {
      return <div />;
    }
    let inputProps = { readOnly: true, disabled: true };

    const names = person && person.Names ? person.Names : [];
    const roles = person && person.Roles ? person.Roles : [];
    const relations = person && person.Relations ? person.Relations : [];

    //TODO: Print first-name instead of label "Person information" below
    if (names) {
      var titleFromName =
        this.getNameField(names[0], "FirstName") +
        " " +
        this.getNameField(names[0], "LastName");
    }

    //  "PostalAddress" : "818 McLaughlin Center",
    // "PostalAddress2" : "Apt. 510",
    // "HouseNumber" : NumberInt(26),
    // "PostalCity" : "Lake Maxime",
    // "ZipCode" : "79004",
    // "PostalCountry" : "France",

    let hasAdress =
      this.getField(person, "PostalAddress") ||
      this.getField(person, "PostalAddress2") ||
      this.getField(person, "PostalCity") ||
      this.getField(person, "HouseNumber") ||
      this.getField(person, "ZipCode") ||
      this.getField(person, "PostalCountry")
        ? true
        : false;

    let renderAdress = !hasAdress
      ? []
      : [
          <div className={classes.details}>
            <Typography variant="h5" id="personDetailsAddressTitle">
              {i18n.__("Entity_Details_Address")}
            </Typography>
            <FormGroup row>
              <TextField
                disabled
                id="Address"
                label={i18n.__("Entity_List_Address")}
                className={classes.textField}
                value={this.getField(person, "PostalAddress")}
                inputprops={inputProps}
              />
              <TextField
                disabled
                id="Entity_List_HouseNumber"
                label={i18n.__("Entity_List_HouseNumber")}
                className={classes.textField}
                value={this.getField(person, "HouseNumber")}
                inputprops={inputProps}
              />
            </FormGroup>
            <FormGroup row>
              <TextField
                disabled
                id="Entity_List_Address2"
                label={i18n.__("Entity_List_Address2")}
                className={classes.textField}
                value={this.getField(person, "PostalAddress2")}
                inputprops={inputProps}
              />
            </FormGroup>

            <FormGroup row>
              <TextField
                disabled
                id="Entity_List_PostalCity"
                label={i18n.__("Entity_List_PostalCity")}
                className={classes.textField}
                value={this.getField(person, "PostalCity")}
                inputprops={inputProps}
              />
              <TextField
                disabled
                id="Entity_List_ZipCode"
                label={i18n.__("Entity_List_ZipCode")}
                className={classes.textField}
                value={this.getField(person, "ZipCode")}
                inputprops={inputProps}
              />
            </FormGroup>

            <TextField
              disabled
              id="Entity_List_PostalCountry"
              label={i18n.__("Entity_List_PostalCountry")}
              className={classes.textField}
              value={this.getField(person, "PostalCountry")}
              inputprops={inputProps}
            />
          </div>,
        ];

    let ImageCard = person.ImageLink
      ? [
          <Grid item={true}>
            <Card className={classes.imageCard}>
              <img className={classes.image} src={person.ImageLink}></img>
            </Card>
          </Grid>,
        ]
      : [];

    return (
      <div>
        <Card className={classes.card}>
          <Grid container spacing={2}>
            <Grid item={true}>{ImageCard}</Grid>
            <Grid item={true}>
              <div className={classes.details}>
                <Typography variant="h5" id="personDetailsTitle">
                  {i18n.__("Entity_Details")}
                </Typography>
                <TextField
                  disabled
                  id="SSN"
                  label={i18n.__("Entity_appID")}
                  className={classes.textField}
                  value={this.getField(person, "PersonID")}
                  inputprops={inputProps}
                />
                {person["SSNs"].length ? (
                  <TextField
                    disabled
                    id="SSN"
                    label={i18n.__("Entity_List_SSN")}
                    className={classes.textField}
                    value={this.getSSN(person)}
                    inputprops={inputProps}
                  />
                ) : (
                  ""
                )}
                <TextField
                  disabled
                  id="Entity_List_Gender"
                  label={i18n.__("Entity_List_Gender")}
                  className={classes.textField}
                  value={this.getField(person, "Gender")}
                  inputprops={inputProps}
                />
                <TextField
                  disabled
                  id="Entity_List_BirthDate"
                  label={i18n.__("Entity_List_BirthDate")}
                  className={classes.textField}
                  value={this.getBirthDate(person)}
                  inputprops={inputProps}
                />
                <FormControlLabel
                  className={classes.textField}
                  control={
                    <Checkbox
                      disabled
                      checked={this.getField(person, "PEP") === "1"}
                      value="PEP"
                    />
                  }
                  label={i18n.__("Entity_Label_Field_pep")}
                  inputprops={inputProps}
                />

                <FormControlLabel
                  className={classes.textField}
                  control={
                    <Checkbox
                      disabled
                      checked={this.getField(person, "RCA") === "1"}
                      value="RCA"
                    />
                  }
                  label={i18n.__("Entity_Label_Field_rca")}
                  inputprops={inputProps}
                />
                <Typography id="updated" variant="body2" gutterBottom>
                  {i18n.__("Label_EntityIsUpdated") +
                    ":   " +
                    this.getLastUpdated(person)}
                </Typography>
              </div>
            </Grid>
            <Grid item={true} item={true} xs={12} sm={12} md={2} lg={2}>
              <ClientSearchDetailsNames names={names} />
            </Grid>
            <Grid item={true}>{renderAdress}</Grid>
          </Grid>
        </Card>
        <ClientSearchDetailsRoles roles={roles} />
        <ClientSearchDetailsRelations
          relations={relations}
          selectPerson={selectRelatedPerson}
        />
        {/* <Button
          variant="outlined"
          className={classes.buttonLeft}
          onClick={() => {
            popRelatedPersonStack();
          }}
        >
          <ArrowLeft className={clsx(classes.leftIcon, classes.iconSmall)} />
          {i18n.__("Entity_Label_Button_Back")}
        </Button> */}
        {/* <Button
          variant="outlined"
          color="primary"
          className={classes.buttonRight}
          onClick={() => {
            closeDetails();
          }}
        >
          {i18n.__("Label_Button_OK")}
          <CloseIcon className={clsx(classes.leftIcon, classes.iconSmall)} />
        </Button> */}
      </div>
    );
  }

  getNameField = (list, field) => {
    if (list) {
      return list[field];
    }
    return "???";
  };

  getSSN = (person) => {
    if (
      person &&
      person["SSNs"] &&
      Array.isArray(person["SSNs"]) &&
      person["SSNs"].length > 0
    ) {
      return person["SSNs"][0]["CurrentSSN"];
    }
    return " ";
  };

  getField = (object, field) => {
    if (object) {
      return object[field];
    }
    return " ";
  };

  getBirthDate = (person) => {
    if (person) {
      const year = this.getField(person, "BirthDateYear");
      const month = this.getField(person, "BirthDateMonth");
      const day = this.getField(person, "BirthDateDay");
      let date = year;
      //TODO check format of dates
      date = month ? `${year}-${month}` : date;
      date = day ? `${year}-${month}-${day}` : date;
      return " " + date;
    }
    return " ";
  };

  getLastUpdated = (person) => {
    if (person) {
      if (this.getField(person, "personUpdated")) {
        let dateStr = this.getField(person, "personUpdated");
        DEFCON3 && console.log("dateStr:");
        DEFCON3 && console.log(dateStr);
        return dateStr.toISOString().slice(0, 10);
      }
    }
    return "2019-01-01";
  };
}

ClientSearchDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  person: PropTypes.object,
  selectRelatedPerson: PropTypes.func,
  popRelatedPersonStack: PropTypes.func,
  closeDetails: PropTypes.func,
};

export default withStyles(styles)(ClientSearchDetails);

/*

<Avatar
                  src={person.ImageLink}
                  aria-label="bigAvatar"
                  className={classes.bigAvatar}
                />



                <Table dense className={classes.table} size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell align="left">
                        {i18n.__("Entity_List_SSN")}
                      </TableCell>
                      <TableCell align="left">{this.getSSN(person)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">
                        {" "}
                        {i18n.__("Entity_List_Gender")}
                      </TableCell>
                      <TableCell align="left">
                        {this.getField(person, "Gender")}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">
                        {" "}
                        {i18n.__("Entity_List_BirthDate")}
                      </TableCell>
                      <TableCell align="left">
                        {this.getBirthDate(person)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">
                        {" "}
                        {i18n.__("Entity_List_PEP")}
                      </TableCell>
                      <TableCell align="left">
                        <Checkbox
                          checked={this.getField(person, "PEP") === "1"}
                          value="PEP"
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">
                        {" "}
                        {i18n.__("Entity_List_RCA")}
                      </TableCell>
                      <TableCell align="left">
                        <Checkbox
                          checked={this.getField(person, "RCA") === "1"}
                          value="RCA"
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                */
