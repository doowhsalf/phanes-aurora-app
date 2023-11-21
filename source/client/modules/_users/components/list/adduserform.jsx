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

import { USER_ACTION_ACTIVATE, USER_ACTION_DEACTIVATE } from "/lib/constants";
import { Card, CardHeader } from "@mui/material";
import Typography from "@mui/material/Typography";
import DebouncedTextField from "../../../core/components/fields/debouncedtextfield";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import CircularProgress from "@mui/material/CircularProgress";
import classNames from "classnames";
import AddIcon from "@mui/icons-material/PersonAdd";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Paper from "@mui/material/Paper";
import SnackBarMessage from "../../../core/components/fields/snackbar-message";
import { green } from '@mui/material/colors';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  paper: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(0),
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  card: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  row: {
    display: "flex",
    justifyContent: "marginLeft",
  },
  title: {
    marginRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  formItem: {
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginRight: theme.spacing(1),
    width: 300,
  },
  dense: {
    marginTop: 19,
  },
  header: {
    paddingTop: theme.spacing(2),
  },
  buttonsExtra: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  buttonWrapper: {
    margin: theme.spacing(0),
    position: "relative",
    float: "right",
    top: -40,
    left: -10,
  },
  buttonWrapperCancel: {
    margin: theme.spacing(0),
    position: "relative",
    float: "right",
    top: -40,
    left: -20,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  button: {},
});

const initialState = {
  name: "",
  email: "",
  email2: "",
  validationErrors: {},
  success: false,
  loading: false,
  openSnackbar: false,
  snackbarMessage: "",
  formCounter: 0,
};

const validationErrorsToMessage = (errors) => {
  return (
    <div>
      {Object.keys(errors).map((key, index) => (
        <div key={index}>{errors[key]}</div>
      ))}
    </div>
  );
};

class AddUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  onAdd = (error, result) => {
    console.log("ON ADD:");
    console.log(error);
    console.log(result);
    console.log(this.state.formCounter);
    this.setState(
      {
        loading: false,
        success: error === null,
        formCounter:
          error === null ? this.state.formCounter + 1 : this.state.formCounter,
      },
      () => console.log(this.state)
    );
  };

  handleDebouncedChange = (name, value) => {
    this.setState({ [name]: value, success: false });
  };

  handleButtonClick = () => {
    if (!this.state.loading) {
      const query = {
        name: this.state.name,
        email: this.state.email,
        email2: this.state.email2,
      };

      const validationErrors = this.getQueryValidationErrors(query);

      if (validationErrors === null) {
        DEFCON5 && console.log("Adding new user...");
        this.props.addCompanyUser(query, this.onAdd);
      } else {
        DEFCON5 && console.log("Validation errors...");
        DEFCON5 && console.log(validationErrors);
        this.setState({
          snackbarMessage: validationErrorsToMessage(validationErrors),
          openSnackbar: true,
        });
      }

      this.setState({
        success: false,
        loading: validationErrors === null,
        validationErrors,
      });
    }
  };

  handleClearButtonClick = () => {
    let newState = initialState;
    DEFCON5 && console.log(this.state.formCounter);
    newState.formCounter = this.state.formCounter + 1;
    newState.name = "";
    this.setState(newState);
  };

  handleSnackbarClose = () => {
    this.setState({
      openSnackbar: false,
    });
  };

  getQueryValidationErrors = (query) => {
    let validationErrors = null;

    if (!query) {
      validationErrors = {};
      validationErrors["name"] = i18n.__("Entity_Validation_MandatoryField");
      validationErrors["email"] = i18n.__("Entity_Validation_MandatoryField");
      validationErrors["email2"] = i18n.__("Entity_Validation_MandatoryField");
    }

    if (!query.name || query.name.trim() === "") {
      if (validationErrors === null) {
        validationErrors = {};
      }
      validationErrors["name"] = i18n.__("Entity_Validation_MandatoryField");
    }

    if (!query.email || query.email.trim() === "") {
      if (validationErrors === null) {
        validationErrors = {};
      }
      validationErrors["email"] = i18n.__("Entity_Validation_MandatoryField");
    }

    if (!query.email2 || query.email2.trim() === "") {
      if (validationErrors === null) {
        validationErrors = {};
      }
      validationErrors["email2"] = i18n.__("Entity_Validation_MandatoryField");
    }

    if (query.email !== query.email2) {
      if (validationErrors === null) {
        validationErrors = {};
      }
      validationErrors["email2"] = i18n.__(
        "Entity_Validation_MatchErrorField",
        { field: "Email" }
      );
      validationErrors["email"] = i18n.__("Entity_Validation_MatchErrorField", {
        field: "Email",
      });
    }

    return validationErrors;
  };

  render() {
    const { classes, users } = this.props;
    const { validationErrors, formCounter } = this.state;
    const buttonClassname = classNames({
      [classes.buttonSuccess]: this.state.success,
    });

    return (
      <div style={{ marginTop: 80 }}>
        <Grid item={true} xs={12} sm={12} md={12} lg={12}>
          <Paper className={classes.paper}>
            <Typography variant="h5">
              {i18n.__("Entity_Label_AddCompanyUser")}
            </Typography>
            <Grid container={true} spacing={1}>
              <Grid item={true} xs={12} sm={12} md={12} lg={12}>
                <DebouncedTextField
                  id="name"
                  label={i18n.__("Entity_Label_AddUser_Name")}
                  className={classes.textField}
                  value={this.state.name}
                  onChange={(value) =>
                    this.handleDebouncedChange("name", value)
                  }
                  helperText={i18n.__("Entity_Label_Mandatory")}
                  error={validationErrors && !!validationErrors["name"]}
                />
              </Grid>
              <Grid item={true} xs={12} sm={12} md={12} lg={12}>
                <DebouncedTextField
                  id="email"
                  label={i18n.__("Entity_Label_AddUser_Email")}
                  className={classes.textField}
                  value={this.state.email}
                  onChange={(value) =>
                    this.handleDebouncedChange("email", value)
                  }
                  helperText={i18n.__("Entity_Label_Mandatory")}
                  error={validationErrors && !!validationErrors["email"]}
                />
                <DebouncedTextField
                  id="email2"
                  label={i18n.__("Entity_Label_AddUser_Email2")}
                  className={classes.textField}
                  value={this.state.email2}
                  onChange={(value) =>
                    this.handleDebouncedChange("email2", value)
                  }
                  helperText={i18n.__("Entity_Label_Mandatory")}
                  error={validationErrors && !!validationErrors["email2"]}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item={true} xs={12} sm={12} md={12} lg={12}>
          <div className={classes.buttonWrapper}>
            <Fab
              color="primary"
              className={buttonClassname}
              onClick={this.handleButtonClick}
            >
              {this.state.success ? <CheckIcon /> : <AddIcon />}
            </Fab>
            {this.state.loading && (
              <CircularProgress size={68} className={classes.fabProgress} />
            )}
          </div>
          <div className={classes.buttonWrapperCancel}>
            {this.state.name || this.state.email || this.state.email2 ? (
              <Fab
                className={buttonClassname}
                onClick={this.handleClearButtonClick}
              >
                <ClearIcon />
              </Fab>
            ) : null}
          </div>
        </Grid>

        <SnackBarMessage
          open={this.state.openSnackbar}
          handleSnackbarClose={this.handleSnackbarClose}
          variant="warning"
          message={this.state.snackbarMessage}
        />
      </div>
    );
  }
}

AddUserForm.propTypes = {
  classes: PropTypes.object.isRequired,
  // users: PropTypes.array.isRequired,
  addCompanyUser: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddUserForm);
