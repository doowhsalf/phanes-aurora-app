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
class UserRegisterForm extends React.Component {
  constructor() {
    super();
    this.state = {
      disabled: false,
      canSubmit: false,
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
      passwordConfirmation: "",
      passwordConfirmationError: "",
      name: "",
      nameError: "",
      voucher: "",
      voucherError: "",
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
    if (this.state.email === "" || this.state.email.trim() === "") {
      this.setState({ emailError: i18n.__("Error_RegisterForm_Email") });
      formValid = false;
    }

    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(this.state.email)) {
      this.setState({ emailError: i18n.__("Error_RegisterForm_Email") });
      formValid = false;
    }

    if (this.state.name === "" || this.state.name.trim() === "") {
      this.setState({ nameError: i18n.__("Error_RegisterForm_Name") });
      formValid = false;
    }

    if (
      this.state.password === "" ||
      this.state.password.trim() === "" ||
      this.state.password.length < 8
    ) {
      this.setState({ passwordError: i18n.__("Error_RegisterForm_Password") });
      formValid = false;
    }

    if (this.state.passwordConfirmation !== this.state.password) {
      this.setState({
        passwordConfirmationError: i18n.__("Error_RegisterForm_PasswordMatch"),
      });
      formValid = false;
    }

    if (!this.props.token.token) {
      DEFCON2 &&
        console.log(
          "Token is not set so voucher must be given",
          this.props.token
        );

      if (this.state.voucher === "" || this.state.voucher.trim() === "") {
        this.setState({ voucherError: i18n.__("Error_RegisterForm_Voucher") });
        formValid = false;
      }
    }
    return formValid;
  }

  render() {
    const { error, token, classes } = this.props;
    DEFCON2 && console.log("UserRegisterForm.jsx");
    DEFCON2 && console.log("UserRegisterForm.jsx", this.props);
    DEFCON2 && console.log("Token", token);

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
              label={i18n.__("Label_RegisterForm_Email")}
              type="email"
              placeholder={i18n.__("Tooltip_RegisterForm_Email")}
              helperText={this.state.emailError}
              error={this.state.emailError !== ""}
              autoComplete="off"
              fullWidth={true}
              validations="isEmail"
              onChange={this.handleChange("email")}
            />
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

            <TextField
              name="name"
              value={this.state.name}
              label={i18n.__("Label_RegisterForm_Name")}
              type="text"
              placeholder={i18n.__("Tooltip_RegisterForm_Name")}
              helperText={this.state.nameError}
              error={this.state.nameError !== ""}
              autoComplete="off"
              fullWidth={true}
              onChange={this.handleChange("name")}
            />

            {!this.props.token.token ? (
              <TextField
                name="voucher"
                value={this.state.voucher}
                label={i18n.__("Label_RegisterForm_Voucher")}
                type="text"
                placeholder={i18n.__("Tooltip_RegisterForm_Voucher")}
                helperText={this.state.voucherError}
                error={this.state.voucherError !== ""}
                autoComplete="off"
                fullWidth={true}
                onChange={this.handleChange("voucher")}
              />
            ) : null}
          </fieldset>
        </form>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => this.validateAndSubmit()}
        >
          {i18n.__("Button_RegisterForm_Register")}
        </Button>
      </div>
    );
  }

  validateAndSubmit() {
    if (this.isFormValid() && this.props.submitAction) {
      this.props.submitAction(
        this.state.email,
        this.state.password,
        this.state.passwordConfirmation,
        this.state.voucher,
        this.state.name,
        this.props.token
      );
    }
  }
}
UserRegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(UserRegisterForm);
