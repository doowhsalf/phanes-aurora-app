import React from "react";
import i18n from "meteor/universe:i18n";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import withStyles from "@mui/styles/withStyles";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      disabled: false,
      canSubmit: false,
      email: "",
      emailError: "",
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
    if (this.state.email === "" || this.state.email.trim() === "") {
      this.setState({
        emailError: i18n.__("Label_LoginForm_UsernameValidationError"),
      });
      return false;
    }

    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(this.state.email)) {
      this.setState({
        emailError: i18n.__("Label_LoginForm_UsernameValidationError"),
      });
      return false;
    }
    return true;
  }

  render() {
    const { error } = this.props;
    return (
      <form>
        <fieldset>
          {error ? (
            <div className="alert alert-danger">
              <span className="octicon octicon-megaphone" />
              {error}
            </div>
          ) : null}

          <TextField
            name="email"
            value={this.state.email}
            label={i18n.__("Label_ForgotPassword_Email")}
            type="email"
            placeholder={i18n.__("Label_LoginForm_UsernamePlaceholder")}
            helperText={this.state.emailError}
            autoComplete="off"
            fullWidth={true}
            validations="isEmail"
            onChange={this.handleChange("email")}
            // validationError={i18n.__('Label_LoginForm_UsernameValidationError')}
          />
        </fieldset>
        <Button
          className="btn btn-primary block full-width m-b"
          onClick={() => this.validateAndReset()}
        >
          {i18n.__("Button_ForgotPassword_Login")}
        </Button>
      </form>
    );
  }

  validateAndReset() {
    if (this.isFormValid() && this.props.submitAction) {
      this.props.submitAction(this.state.email);
    }
  }
}
