import React from "react";
import i18n from "meteor/universe:i18n";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
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
      "url(https://sycorax.tritonite.io/titania_common) no-repeat center center fixed",
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
      "url(https://sycorax.tritonite.io/titania_common) no-repeat center center fixed",
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
class UserPasswordForm extends React.Component {
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
        emailError: i18n.__("Label_LoginForm_EmailValidationError"),
      });
      return false;
    }

    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(this.state.email)) {
      this.setState({
        emailError: i18n.__("Label_LoginForm_EmailValidationError"),
      });
      return false;
    }
    return true;
  }

  render() {
    const { error, classes } = this.props;
    return (
      <div>
        <form className={classes.registration_form}>
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
              placeholder={i18n.__("Label_LoginForm_EmailPlaceholder")}
              helperText={this.state.emailError}
              autoComplete="off"
              fullWidth={true}
              validations="isEmail"
              onChange={this.handleChange("email")}
              // validationError={i18n.__('Label_LoginForm_EmailValidationError')}
            />
          </fieldset>
        </form>{" "}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => this.validateAndReset()}
        >
          {i18n.__("Button_ForgotPassword_Login")}
        </Button>
      </div>
    );
  }

  validateAndReset() {
    if (this.isFormValid() && this.props.submitAction) {
      this.props.submitAction(this.state.email);
    }
  }
}
UserPasswordForm.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(UserPasswordForm);
