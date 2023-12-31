import React from "react";
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
    marginBottom: theme.spacing(1),
    color: "white",
    borderColor: "white",
  },
  error: {
    color: red[500],
  },
  divider: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  link: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  textColor: {
    color: "white",
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
        emailError: i18n.__("Label_LoginForm_EmailValidationError"),
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
            InputLabelProps={{
              className: classes.textColor,
              style: {
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                width: "100%",
                color: "white",
              },
            }}
            autoFocus
            onKeyDown={this.onKeyDown}
            name="email"
            value={this.state.email}
            label={i18n.__("Label_LoginForm_Email")}
            placeholder={i18n.__("Label_LoginForm_EmailPlaceholder")}
            helperText={this.state.emailError}
            autoComplete="off"
            fullWidth={true}
            validations="isEmail"
            onChange={this.handleChange("email")}
            // validationError={i18n.__('Label_LoginForm_EmailValidationError')}
          />
          <TextField
            InputLabelProps={{
              className: classes.textColor,
              style: {
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                width: "100%",
                color: "white",
              },
            }}
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
          className={classes.button + " glass-effect"}
          variant="contained"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.21)", // Neutral, semi-transparent background
            border: "1px solid rgba(255, 255, 255, 0.5)", // Light border for a glass effect
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
            borderRadius: "8px", // Rounded corners
            padding: "4px 6px", // Padding inside the button
          }}
          onKeyDown={this.onKeyDown}
          onClick={() => this.validateAndLogin()}
        >
          {i18n.__("Button_LoginForm_Login")}
        </Button>{" "}
        <Dividier className={classes.divider} />
        <Button
          className={classes.button + " glass-effect"}
          variant="contained"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.21)", // Neutral, semi-transparent background
            border: "1px solid rgba(255, 255, 255, 0.5)", // Light border for a glass effect
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
            borderRadius: "8px", // Rounded corners
            padding: "4px 6px", // Padding inside the button
          }}
          href={urlForgotPassword}
        >
          {i18n.__("Link_Login_ForgotPassword")}
        </Button>
        <Button
          className={classes.button + " glass-effect"}
          variant="contained"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.21)", // Neutral, semi-transparent background
            border: "1px solid rgba(255, 255, 255, 0.5)", // Light border for a glass effect
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
            borderRadius: "8px", // Rounded corners
            padding: "4px 6px", // Padding inside the button
          }}
          href={urlAccountRegister}
        >
          {i18n.__("Button_RegisterForm_Register")}
        </Button>
        {/* <Dividier className={classes.divider} />
        {Meteor.settings.public.classicLoginLink ? (
          <Button
            styles={{ color: "white" }}
            fullWidth
            variant="outlined"
            href={Meteor.settings.public.classicLoginLink}
            className={classes.button}
          >
            {i18n.__("Link_Classic_Loginlink")}
          </Button>
        ) : null} */}
        <Dividier className={classes.divider} />
        <div>
          <a
            style={{ color: "white" }}
            href={Meteor.settings.public.pageTermsLink}
          >
            <small>{i18n.__("Link_Login_TermsLink")}</small>
          </a>
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
