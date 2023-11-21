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
import i18n from "meteor/universe:i18n";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import withStyles from "@mui/styles/withStyles";
import Input from "@mui/material/Input";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Dividier from "@mui/material/Divider";
import { red } from "@mui/material/colors";

const styles = (theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  error: {
    color: red[500],
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  link: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
});

class LoginForm extends React.Component {
  constructor() {
    super();

    this.state = {
      disabled: false,
      canSubmit: false,
      password: "",
      passwordError: "",
      email: "",
      emailError: "",
    };
  }
  onKeyDown = (event) => {
    DEFCON7 && console.log("onKeyDown");
    if (event.keyCode === 13) {
      DEFCON5 && console.log("Pressed the Enter button");
      this.validateAndLogin();
    }
  };

  isFormValid() {
    let validationPassed = true;

    if (this.state.password === "" || this.state.password.trim() === "") {
      this.setState({
        passwordError: i18n.__("Label_LoginForm_PasswordValidationError"),
      });
      validationPassed = false;
    }

    if (this.state.email === "" || this.state.email.trim() === "") {
      this.setState({
        emailError: i18n.__("Label_LoginForm_UsernameValidationError"),
      });
      validationPassed = false;
    }

    return validationPassed;
  }

  handleChange = (name) => (event) => {
    const errorField = name + "Error";
    this.setState({
      [name]: event.target.value,
      [errorField]: event.target.value !== "" ? "" : this.state[errorField],
    });
  };

  render() {
    const { error, classes } = this.props;
    DEFCON7 && console.log("Starting up login...");

    let urlForgotPassword = Meteor.settings.public.accountLostPassword;
    let urlAccountRegister = Meteor.settings.public.accountRegister;

    return (
      <form>
        <fieldset>
          {error ? (
            <Typography variant="subtitle1" gutterBottom color="error">
              {error}
            </Typography>
          ) : null}

          <TextField
            autoFocus
            onKeyDown={this.onKeyDown}
            name="email"
            value={this.state.email}
            label={i18n.__("Label_LoginForm_Username")}
            type="email"
            placeholder={i18n.__("Label_LoginForm_UsernamePlaceholder")}
            helperText={this.state.emailError}
            autoComplete="off"
            fullWidth={true}
            validations="isEmail"
            onChange={this.handleChange("email")}
            // validationError={i18n.__('Label_LoginForm_UsernameValidationError')}
          />
          <TextField
            onKeyDown={this.onKeyDown}
            name="password"
            value={this.state.password}
            label={i18n.__("Label_LoginForm_Password")}
            type="password"
            placeholder={i18n.__("Label_LoginForm_PasswordPlaceholder")}
            fullWidth={true}
            validations="minLength:4"
            onChange={this.handleChange("password")}
            // validationError={i18n.__('Label_LoginForm_PasswordValidationError')}
          />
        </fieldset>
        <Button
          onKeyDown={this.onKeyDown}
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => this.validateAndLogin()}
        >
          {i18n.__("Button_LoginForm_Login")}
        </Button>
        <Button
          variant="contained"
          href={urlForgotPassword}
          className={classes.button}
        >
          {i18n.__("Link_Login_ForgotPassword")}
        </Button>
        <Dividier className={classes.divider} />
        <div className={classes.link}>
          <Link href="/">
            <Typography>{i18n.__("Label_LoginForm_GoHome")}</Typography>
          </Link>
        </div>
      </form>
    );
  }

  validateAndLogin() {
    if (this.isFormValid() && this.props.submitAction) {
      DEFCON7 && console.log("loginWithDrupal?" + this.state.loginWithDrupal);

      this.props.submitAction(this.state.email, this.state.password);
    }
  }
}

export default withStyles(styles)(LoginForm);
