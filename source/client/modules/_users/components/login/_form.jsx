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
import { alpha, styled } from "@mui/material/styles";

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
    color: "white",
  },
  textColor: {
    color: "white",
  },
  textField: {
    marginTop: theme.spacing(1.5),
  },
});

const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    background-color: ${({ theme, value }) =>
      !value && theme.palette.background.grey01};
  }
`;
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

          <StyledTextField
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
            className={classes.textField}
            type="email"
            autoFocus
            onKeyDown={this.onKeyDown}
            value={this.state.email}
            label={i18n.__("Label_LoginForm_Username")}
            placeholder={i18n.__("Label_LoginForm_UsernamePlaceholder")}
            helperText={this.state.emailError}
            autoComplete="off"
            fullWidth={true}
            onChange={this.handleChange("email")}
            // validationError={i18n.__('Label_LoginForm_UsernameValidationError')}
          />
          <StyledTextField
            InputLabelProps={{
              className: classes.textColor,
            }}
            className={classes.textField}
            type="password"
            autoComplete="off"
            onKeyDown={this.onKeyDown}
            value={this.state.password}
            label={i18n.__("Label_LoginForm_Password")}
            placeholder={i18n.__("Label_LoginForm_PasswordPlaceholder")}
            fullWidth={true}
            validations="minLength:4"
            onChange={this.handleChange("password")}
            // validationError={i18n.__('Label_LoginForm_PasswordValidationError')}
          />
        </fieldset>
        <Button
          fullWidth
          onKeyDown={this.onKeyDown}
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => this.validateAndLogin()}
        >
          {i18n.__("Button_LoginForm_Login")}
        </Button>{" "}
        <Dividier className={classes.divider} />
        <Button
          fullWidth
          variant="outlined"
          href={urlForgotPassword}
          className={classes.button}
        >
          {i18n.__("Link_Login_ForgotPassword")}
        </Button>
        {/* <Button
          fullWidth
          variant="outlined"
          href={urlAccountRegister}
          className={classes.button}
        >
          {i18n.__("Link_Login_Register")}
        </Button> */}
        <Dividier className={classes.divider} />
        <div className={classes.link}>
          <Link href="start">
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
