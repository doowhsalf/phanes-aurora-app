import React from "react";
import i18n from "meteor/universe:i18n";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import withStyles from "@mui/styles/withStyles";
import PropTypes from "prop-types";

import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";

const styles = (theme) => ({
  link: {
    marginTop: theme.spacing(2),
  },
  registration_form: {
    marginBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    background:
      "linear-gradient(to bottom, rgba(29, 30, 31, 0.89) 0%, " +
      "rgba(29, 30, 31, 0.89) 34%, rgba(0,0,0,0.79) 55%)",
  },
  login_page: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
    top: 0,
    left: 0,
    padding: 0,
    margin: "auto",
    background:
      "url(https://sycorax.tritonite.io/phanes-aurora) no-repeat center center fixed",
    backgroundSize: "cover",
  },

  login_container: {
    top: 250,
    width: 300,
    margin: "auto",
    marginTop: 100,
    // backgroundColor: "rgba(255, 255, 255, 0.66)",
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, " +
      "rgba(0,0,0,0.44) 34%, rgba(0,0,0,0.34) 55%)",
    borderRadius: 3,
    padding: 15,
    overflow: "hidden",
  },
  content: {
    top: 250,
    width: 300,
    margin: "auto",
    backgroundColor: "rgba(255, 255, 255, 0.66)",
    borderRadius: 3,
    padding: 15,
    overflow: "hidden",
  },
  color: {
    background: "rgba(255, 255, 255, 0.66)",
    width: 430,
    height: 330,
  },
  blur: {
    background:
      "url(https://sycorax.tritonite.io/phanes-aurora) no-repeat center center fixed",
    top: 250,
    width: 300,
    position: "relative",
    top: "-15px",
    left: "-15px",
    borderRadius: 3,
    padding: 15,
    overflow: "hidden",
    "-webkit-filter": "blur(8px)",
    "-moz-filter": "blur(8px)",
    filter: "blur(8px)",
  },
});
class UserSetPasswordForm extends React.Component {
  constructor() {
    super();
    this.state = {
      disabled: false,
      canSubmit: false,
      password: "",
      passwordError: "",
      passwordConfirmation: "",
      passwordConfirmationError: "",
    };
  }

  handleChange = (name) => (event) => {
    const errorField = name + "Error";
    this.setState({
      [name]: event.target.value,
      [errorField]: event.target.value !== "" ? "" : this.state[errorField],
    });
  };

  isFormValid() {
    let formValid = true;
    if (
      this.state.password === "" ||
      this.state.password.trim() === "" ||
      this.state.password.length < 8
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
    const { error, classes } = this.props;
    return (
      <form className={classes.registration_form}>
        <fieldset>
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
        </fieldset>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => this.validateAndSet()}
        >
          {i18n.__("Button_ForgotPassword_Save")}
        </Button>
      </form>
    );
  }

  validateAndSet() {
    if (this.isFormValid() && this.props.submitAction) {
      let token = this.props.token;
      this.props.submitAction(token, this.state.password);
      //log that all is ok and go to start page
      DEFCON3 && console.log("SetPassword.validateAndSet() - all is ok");
    }

    //);
  }
}

UserSetPasswordForm.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(UserSetPasswordForm);
