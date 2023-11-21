import React from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import Slide from "@mui/material/Slide";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import withStyles from '@mui/styles/withStyles';
import PropTypes from "prop-types";
import SnackBarMessage from "../fields/snackbar-message";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Iframe from "react-iframe";
import { renderGoogleMapCompany } from "../helpers/googlemap-iframe";
import { renderLogo } from "../helpers/app-logo";
import { contactInfo } from "../helpers/contact-info";

function _uniqueKey() {
  return Math.random() * Math.random();
}

const styles = (theme) => ({
  paper: {
    // margin: theme.spacing(2),
    marginTop: theme.spacing(0),
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  dialog: {
    fullWidth: "100%",
  },
  textFieldInput: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  textField: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  iframeBox: {
    marginTop: theme.spacing(2),
    width: "100%",
    height: 600,
  },
  iframe: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    filter: "grayscale(3)",
  },
  textFieldMulti: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  button: {},
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  logo: {
    float: "right",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
});

const initialState = {
  disabled: false,
  canSubmit: false,
  password: "",
  passwordError: "",
  passwordConfirmation: "",
  passwordConfirmationError: "",
};

class SetPW extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleChange = (name) => (event) => {
    const errorField = name + "Error";
    this.setState({
      [name]: event.target.value,
      [errorField]: event.target.value !== "" ? "" : this.state[errorField],
    });
  };
  handleSnackbarClose = () => {
    this.setState({
      openSnackbar: false,
      errorSnackbar: false,
    });
  };
  isFormValid() {
    let formValid = true;
    var strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    if (
      this.state.password === "" ||
      this.state.password.trim() === "" ||
      this.state.password.length < 8 ||
      !strongRegex.test(this.state.password)
    ) {
      this.setState({
        passwordError: i18n.__("Error_RegisterForm_Password"),
        passwordConfirmationError: "",
      });
      formValid = false;
    }

    if (this.state.passwordConfirmation !== this.state.password) {
      this.setState({
        passwordConfirmationError: i18n.__("Error_RegisterForm_PasswordMatch"),
      });
      formValid = false;
    }

    return formValid;
  }

  render() {
    const { error, classes, embedded } = this.props;

    const info = [
      <Typography
        key="SetPW"
        variant="caption"
        display="block"
        gutterBottom
        key="guidelines"
      >
        {i18n.__("Label_Password_Guidelines")}
      </Typography>,
    ];

    let marginTopValue = embedded ? 0 : 100;

    let renderCard = [
      <div key="Render01">
        <Card className={classes.paper} key="CardRender">
          <CardHeader title={i18n.__("Entity_Label_SetPassWord")} />
          <CardContent>
            <TextField
              name="password"
              value={this.state.password}
              label={i18n.__("Label_RegisterForm_Password")}
              type="password"
              placeholder={i18n.__("Tooltip_RegisterForm_Password")}
              helperText={this.state.passwordError}
              error={this.state.passwordError !== ""}
              autoComplete="off"
              fullWidth={true}
              onChange={this.handleChange("password")}
            />

            <TextField
              name="passwordConfirmation"
              value={this.state.passwordConfirmation}
              label={i18n.__("Label_RegisterForm_PasswordConfirm")}
              type="password"
              placeholder={i18n.__("Tooltip_RegisterForm_PasswordConfirm")}
              helperText={this.state.passwordConfirmationError}
              error={this.state.passwordConfirmationError !== ""}
              autoComplete="off"
              fullWidth={true}
              onChange={this.handleChange("passwordConfirmation")}
            />
            {info}
          </CardContent>
          <CardActions disableSpacing>
            <Button onClick={() => this.validateAndSet()}>
              {i18n.__("Button_Password_Save")}
            </Button>
          </CardActions>
        </Card>
        <SnackBarMessage
          open={this.state.openSnackbar}
          handleSnackbarClose={this.handleSnackbarClose}
          variant="success"
          message={i18n.__("Label_PasswordChanged")}
        />
      </div>,
    ];

    return (
      <div style={{ marginTop: marginTopValue }}>
        {embedded ? (
          renderCard
        ) : (
          <Container maxWidth="md">{renderCard} </Container>
        )}
      </div>
    );
  }

  validateAndSet() {
    if (this.isFormValid()) {
      DEFCON5 && console.log("Start loading...");
      let setPwCommand = {
        new_password: this.state.password,
      };
      this.props.setPw(setPwCommand, this.theResult);
    } else {
      DEFCON5 && console.log("Validation errors...");
      //DEFCON5 && console.log(validationErrors);
    }
  }

  theResult = (error, results) => {
    DEFCON4 && console.log("Query:");
    DEFCON4 && console.log(this.state);
    DEFCON4 && console.log("New search results:");
    DEFCON4 && console.log(results);

    this.setState({
      loading: false,
      success: true,
      openSnackbar: true,
    });
  };
}

SetPW.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SetPW);
