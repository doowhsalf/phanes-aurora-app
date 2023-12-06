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
import Divider from "@mui/material/Divider";
import { red } from "@mui/material/colors";
import { alpha, styled } from "@mui/material/styles";

// make a light bright white with hex code #ffffff
const frontColor = "#ffffff";

const styles = (theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    "& .MuiInputBase-input": {
      color: `${frontColor} !important`, // Input text color with increased specificity
    },
    "& .MuiInputLabel-root": {
      color: `${frontColor} !important`, // Label color with increased specificity
    },
    "& .MuiFormHelperText-root": {
      color: `${frontColor} !important`, // Helper text color with increased specificity
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: `${frontColor} !important`, // Border color with increased specificity
      },
      "&:hover fieldset": {
        borderColor: `${frontColor} !important`, // Border hover color with increased specificity
      },
      "&.Mui-focused fieldset": {
        borderColor: `${frontColor} !important`, // Border color when focused with increased specificity
      },
    },
  },
  inputLabel: {
    color: frontColor + " !important", // Force yellow color
    "&.Mui-focused": {
      color: frontColor + " !important", // Force yellow color when focused
    },
  },
  helperText: {
    color: frontColor + " !important", // Force yellow color
  },
  // inputLabel: {
  //   color: frontColor + " !important", // Force yellow color
  //   "&.Mui-focused": {
  //     color: frontColor + " !important", // Force yellow color when focused
  //   },
  // },
  // helperText: {
  //   color: frontColor + " !important", // Force yellow color
  // },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    color: frontColor,
    borderColor: frontColor,
    "&:hover": {
      backgroundColor: alpha(frontColor, 0.08), // Slight background on hover
    },
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  // button: {
  //   marginTop: theme.spacing(1),
  //   marginRight: theme.spacing(1),
  //   color: "white",
  // },
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
  textColor: {
    color: "white",
  },
  input: {},
  textField: {
    marginTop: theme.spacing(1),
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
    DEFCON4 && console.log("Starting up login...");

    let urlForgotPassword = Meteor.settings.public.accountLostPassword;
    let urlAccountRegister = Meteor.settings.public.accountRegister;
    DEFCON4 && console.log("Url for register and restore");
    DEFCON4 && console.log(urlForgotPassword);
    DEFCON4 && console.log(urlAccountRegister);

    return (
      <form className={classes.container} noValidate autoComplete="off">
        {error ? (
          <Typography
            style={{ color: frontColor }}
            variant="subtitle1"
            gutterBottom
          >
            {error}
          </Typography>
        ) : null}

        <TextField
          className={classes.textField}
          InputLabelProps={{
            style: { color: frontColor },
          }}
          FormHelperTextProps={{
            style: { color: frontColor },
          }}
          sx={{
            input: { color: frontColor },

            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: frontColor, // Your desired color
              },
              "&:hover fieldset": {
                borderColor: frontColor, // On hover
              },
              "&.Mui-focused fieldset": {
                borderColor: frontColor, // When the field is focused
              },
            },
          }}
          autoComplete="off"
          autoFocus
          onKeyDown={this.onKeyDown}
          name="email"
          value={this.state.email}
          label={i18n.__("Label_LoginForm_Username")}
          placeholder={i18n.__("Label_LoginForm_UsernamePlaceholder")}
          helperText={this.state.emailError}
          fullWidth={true}
          onChange={this.handleChange("email")}
          variant="outlined"
          margin="normal"
        />

        <TextField
          className={classes.textField}
          InputLabelProps={{
            style: { color: frontColor },
          }}
          FormHelperTextProps={{
            style: { color: frontColor },
          }}
          sx={{
            input: { color: frontColor },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: frontColor, // Your desired color
              },
              "&:hover fieldset": {
                borderColor: frontColor, // On hover
              },
              "&.Mui-focused fieldset": {
                borderColor: frontColor, // When the field is focused
              },
            },
          }}
          onKeyDown={this.onKeyDown}
          name="password"
          value={this.state.password}
          label={i18n.__("Label_LoginForm_Password")}
          type="password"
          placeholder={i18n.__("Label_LoginForm_PasswordPlaceholder")}
          helperText={this.state.passwordError}
          fullWidth={true}
          onChange={this.handleChange("password")}
          variant="outlined"
          margin="normal"
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            onKeyDown={this.onKeyDown}
            className={classes.button+' glass-effect'}
            variant="contained"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.21)", // Neutral, semi-transparent background
              width: "48%",
              border: "1px solid rgba(255, 255, 255, 0.5)", // Light border for a glass effect
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
              borderRadius: "8px", // Rounded corners
              padding: "4px 6px", // Padding inside the button
            }}
            onClick={() => this.validateAndLogin()}
          >
            {i18n.__("Button_LoginForm_Login")}
          </Button>

          <Button
            variant="contained"
            href={urlForgotPassword}
            className={classes.button}
            style={{
              color: frontColor,
              backgroundColor: "transparent",
              boxShadow: "none",
              width: "48%",
            }}
          >
            {i18n.__("Link_Login_ForgotPassword")}
          </Button>
        </div>

        {/* This button has been commented out in your provided code, but if you want to include it:
        <Button
          fullWidth
          variant="outlined"
          href={urlAccountRegister}
          className={classes.button}
          style={{ color: frontColor, borderColor: frontColor }}
        >
          {i18n.__("Link_Login_Register")}
        </Button>
        */}

        <Divider
          className={classes.divider}
          style={{ backgroundColor: frontColor }}
        />
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
