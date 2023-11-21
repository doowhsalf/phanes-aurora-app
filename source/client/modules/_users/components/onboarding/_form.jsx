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
import withStyles from '@mui/styles/withStyles';
import Input from "@mui/material/Input";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Dividier from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Autocomplete from '@mui/material/Autocomplete';
import NavigateBackIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Container from "@mui/material/Container";
import Article from "../../../core/containers/article";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@mui/material";
import { red } from '@mui/material/colors';
const styles = (theme) => ({
  contentContainer: {
    // overflow: "auto",
    padding: theme.spacing(2),
    fontFamily: [
      "Raleway",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
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
  actions: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const options = [
  "Vilken stad föddes din mamma i",
  "Vilket lag gillar du i fotboll?",
];

class Onboarding extends React.Component {
  constructor(props) {
    super();
    // const [value, setValue] = React.useState(options[0]);
    // const [inputValue, setInputValue] = React.useState('')

    let secretOptions = [];
    props.secrets.forEach(function (value, key) {
      secretOptions.push(value.title);
      console.log(key);
      console.log(value);
    });

    this.state = {
      disabled: false,
      canSubmit: false,
      password: "",
      passwordCheck: "",
      passwordError: true,
      email: "",
      username: "",
      secret: "",
      secret2: "",
      usernameError: "",
      pwError: "",
      inputValue: "",
      secretOptions: secretOptions,
      value: secretOptions[0],
      currentStepp: 1,
      differentSecrets: false,
      userNameExists: false,
    };
  }

  onKeyDown = (event) => {
    DEFCON7 && console.log("onKeyDown");
    if (event.keyCode === 13) {
      DEFCON5 && console.log("Pressed the Enter button");
      // this.validateUsernameNextStep();
    }
  };

  isUserNameOk() {
    let validationError = false;
    DEFCON3 && console.log("Validating username");
    validationError = this.state.username.length < 4 ? true : validationError;

    return validationError;
  }

  isFormPwIdentical() {
    let validationError = false;
    DEFCON3 && console.log("Validating UserName");
    DEFCON3 && console.log(validationError);

    var strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    if (
      this.state.password === "" ||
      this.state.password.trim() === "" ||
      this.state.password.length < 8 ||
      !strongRegex.test(this.state.password)
    ) {
      validationError = true;
    }

    // validationError = this.state.password.length < 8 ? true : validationError;

    validationError =
      this.state.password !== this.state.passwordCheck ? true : validationError;

    return validationError;
  }

  isSecretNotIdentical() {
    let validationError = false;
    DEFCON3 && console.log("Validating Secret");

    // validationError = this.state.password.length < 8 ? true : validationError;

    validationError =
      this.state.secret.toLowerCase() !== this.state.secret2.toLowerCase()
        ? true
        : validationError;

    return validationError;
  }

  // isFormValid() {
  //   let validationPassed = true;

  //   var strongRegex = new RegExp(
  //     "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  //   );

  //   if (
  //     this.state.password === "" ||
  //     this.state.password.trim() === "" ||
  //     this.state.password.length < 8 ||
  //     !strongRegex.test(this.state.password)
  //   ) {
  //     this.setState({
  //       passwordError: i18n.__("Label_Onboarding_PasswordValidationError"),
  //     });
  //     validationPassed = false;
  //   }
  //   if (this.state.password.trim() !== this.state.passwordAgain.trim()) {
  //     this.setState({
  //       passwordError: i18n.__("Label_Onboarding_PasswordValidationError"),
  //     });
  //     validationPassed = false;
  //   }

  //   if (this.state.secret.trim() !== this.state.secret2.trim()) {
  //     this.setState({
  //       passwordError: i18n.__("Label_Onboarding_SecretValidationError"),
  //     });
  //     validationPassed = false;
  //   }

  //   // if (this.state.email === "" || this.state.email.trim() === "") {
  //   //   this.setState({
  //   //     usernameError: i18n.__("Label_EnterUserName"),
  //   //   });
  //   //   validationPassed = false;
  //   // }

  //   return validationPassed;
  // }

  isUserNameFree() {
    Meteor.call(
      "_users.userWithNameExist",
      "username",
      this.state.username,
      (err, result) => {
        if (!err) {
          DEFCON3 && console.log("Is Username already used ? ");
          DEFCON3 && console.log(result);
          this.setState({
            userNameExists: result,
            currentStepp: result ? 2 : 3, // if result is true stop and let user enter a new username, if not go to next which is nr 3
          });
        }
      }
    );
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
    DEFCON3 && console.log("checking password");
    DEFCON3 && console.log(name);
    DEFCON3 && console.log(event.target.value);
    DEFCON3 && console.log(this.state.password);
    DEFCON3 && console.log(this.state.passwordCheck);
    this.isFormPwIdentical();
  };

  stepBack() {
    this.setState({ currentStepp: this.state.currentStepp - 1 });
  }
  stepForward() {
    switch (this.state.currentStepp) {
      case 2:
        this.isUserNameFree();
        break;
      case 6:
        !this.isSecretNotIdentical()
          ? this.setState({
              currentStepp: this.state.currentStepp + 1,
              differentSecrets: false,
            })
          : this.setState({ differentSecrets: true }); // do nada...;
        break;

      default:
        this.setState({ currentStepp: this.state.currentStepp + 1 });
        break;
    }
    // if (this.state.currentStepp === 2) {
    //   this.isUserNameFree();
    // } else {
    //   this.setState({ currentStepp: this.state.currentStepp + 1 });
    // }
  }

  createUser() {
    const createStatement = {
      name: this.state.username,
      mail: this.state.username.toLowerCase() + ".neptune@neptune.se",
      pw: this.state.password,
      secretQuestion: this.state.inputValue,
      secretAnswer: this.state.secret,
    };
    DEFCON3 && console.log("Create user query");
    DEFCON3 && console.log(createStatement);
    Meteor.call("_users.createMyAccount", createStatement, (err, response) => {
      if (err) {
        DEFCON3 && console.log("_users.createMyAccount error: ");
        DEFCON3 && console.log(err);
      } else {
        DEFCON3 && console.log(response);

        this.stepForward();
      }
    });
  }

  render() {
    const { error, classes } = this.props;
    DEFCON7 && console.log("Starting up Onboarding process...");

    let renderStep = [];

    switch (this.state.currentStepp) {
      case 1:
        renderStep = this.intro();
        break;

      case 2:
        renderStep = this.enterUserName();
        break;

      case 3:
        renderStep = this.userNameOk();
        break;

      case 4:
        renderStep = this.enterPw();
        break;

      case 5:
        renderStep = this.enterSecretQuestion();
        break;

      case 6:
        renderStep = this.enterSecretQuestionAgain();
        break;

      case 7:
        renderStep = this.confirmAndCreate();
        break;

      case 8:
        renderStep = this.final();
        break;

      default:
        break;
    }

    return (
      <div>
        <Container className={classes.contentContainer} maxWidth="md">
          {renderStep}
        </Container>
      </div>
    );
  }

  intro() {
    const { error, classes } = this.props;
    let code = [
      <form>
        {/* <Typography variant="subtitle1" gutterBottom>
           Välkommen!. Här skapar du ditt konto. Först behöver du skapa ett
          användarnamn som du använder för att logga in i tjänsten.
          Användarnamnet måste vara unikt och du kommer inte kunna gå vidare
          förän du har valt ett unikt användarnamn. 
        </Typography> */}
        <Article articleId={"onboarding.intro"} />
        <Dividier className={classes.divider} />
        <Button
          onKeyDown={this.onKeyDown}
          className={classes.button}
          variant="contained"
          fullWidth
          color="primary"
          onClick={() => this.stepForward()}
          endIcon={<NavigateNextIcon />}
        >
          {i18n.__("Button_Onboarding_Step2")}
        </Button>
        <Dividier className={classes.divider} />
        <div className={classes.link}>
          <Link href="/">
            <Typography>{i18n.__("Label_LoginForm_GoHome")}</Typography>
          </Link>
        </div>
      </form>,
    ];
    return code;
  }

  enterUserName() {
    const { error, classes } = this.props;

    let hasError = this.isUserNameOk();

    let code = [
      <form>
        <fieldset>
          <Typography variant="body1" gutterBottom>
            Välj ett användarnamn
          </Typography>
          <Dividier className={classes.divider} />
          {this.state.userNameExists ? (
            <Typography variant="body1" gutterBottom color="error">
              {"This username is already used, please use an other combination"}
            </Typography>
          ) : null}

          <TextField
            autoFocus
            fullWidth
            className={classes.textField}
            onKeyDown={this.onKeyDown}
            value={this.state.username}
            label={i18n.__("Label_Onboarding_EnterUserName")}
            type="email"
            placeholder={i18n.__("Label_Onboarding_UserName")}
            autoComplete="off"
            helperText={hasError ? i18n.__("Label_UserNameError") : ""}
            onChange={this.handleChange("username")}
            // validationError={i18n.__('Label_Onboarding_EmailValidationError')}
          />
        </fieldset>
        <div className={classes.actions}>
          <Button
            onKeyDown={this.onKeyDown}
            className={classes.button}
            variant="contained"
            fullWidth
            color="primary"
            onClick={() => this.stepBack()}
            startIcon={<NavigateBackIcon />}
          >
            {i18n.__("Button_Onboarding_Step1_Back")}
          </Button>
          <Button
            onKeyDown={this.onKeyDown}
            className={classes.button}
            variant="contained"
            fullWidth
            color="primary"
            onClick={() => this.stepForward()}
            endIcon={<NavigateNextIcon />}
            disabled={hasError}
          >
            {i18n.__("Button_Onboarding_Step1")}
          </Button>
        </div>

        <Dividier className={classes.divider} />
        <div className={classes.link}>
          <Link href="/">
            <Typography>{i18n.__("Label_LoginForm_GoHome")}</Typography>
          </Link>
        </div>
      </form>,
    ];
    return code;
  }

  userNameOk() {
    const { error, classes } = this.props;
    let code = [
      <div>
        <Article
          contentpart={"media.mainimage"}
          articleId={"onboarding.usernameOK"}
        />
        <Article articleId={"onboarding.usernameOK"} />
        <Dividier className={classes.divider} />
        <div className={classes.actions}>
          <Button
            onKeyDown={this.onKeyDown}
            className={classes.button}
            variant="contained"
            fullWidth
            color="primary"
            onClick={() => this.stepBack()}
            startIcon={<NavigateBackIcon />}
          >
            {i18n.__("Button_Onboarding_Step1_Back")}
          </Button>
          <Button
            onKeyDown={this.onKeyDown}
            className={classes.button}
            variant="contained"
            fullWidth
            color="primary"
            onClick={() => this.stepForward()}
            endIcon={<NavigateNextIcon />}
          >
            {i18n.__("Button_Onboarding_SetPw")}
          </Button>
        </div>
        <Dividier className={classes.divider} />
        <div className={classes.link}>
          <Link href="/">
            <Typography>{i18n.__("Label_LoginForm_GoHome")}</Typography>
          </Link>
        </div>
      </div>,
    ];
    return code;
  }

  enterPw() {
    const { error, classes } = this.props;

    let hasError = this.isFormPwIdentical();

    let code = [
      <form>
        <Typography variant="body1" gutterBottom>
          Ange ett lösenorde för ditt konto
        </Typography>
        <Dividier className={classes.divider} />
        {hasError ? (
          <Typography variant="body1" gutterBottom>
            {i18n.__("Label_Password_Guidelines")}
          </Typography>
        ) : null}
        <div>
          <TextField
            autoFocus
            className={classes.divider}
            // onKeyDown={this.onKeyDown}
            name="password"
            value={this.state.password}
            label={i18n.__("Label_Onboarding_Password")}
            type="password"
            placeholder={i18n.__("Label_Onboarding_Password")}
            helperText={i18n.__("Label_Onboarding_PasswordRules")}
            autoComplete="off"
            fullWidth={true}
            onChange={this.handleChange("password")}
            // validationError={i18n.__('Label_Onboarding_EmailValidationError')}
          />
          <TextField
            className={classes.divider}
            // onKeyDown={this.onKeyDown}
            name="passwordcheck"
            value={this.state.passwordCheck}
            label={i18n.__("Label_Onboarding_PasswordAgain")}
            type="password"
            placeholder={i18n.__("Label_Onboarding_PasswordAgain")}
            helperText={
              hasError
                ? i18n.__("Label_SetPassword_MismatchValidationError")
                : ""
            }
            error={hasError}
            autoComplete="off"
            fullWidth={true}
            onChange={this.handleChange("passwordCheck")}
            // validationError={i18n.__('Label_Onboarding_EmailValidationError')}
          />
        </div>
        <Dividier className={classes.divider} />
        <div className={classes.actions}>
          <Button
            onKeyDown={this.onKeyDown}
            className={classes.button}
            variant="contained"
            fullWidth
            color="primary"
            onClick={() => this.stepBack()}
            startIcon={<NavigateBackIcon />}
          >
            {i18n.__("Button_Onboarding_Step1_Back")}
          </Button>
          <Button
            onKeyDown={this.onKeyDown}
            className={classes.button}
            variant="contained"
            fullWidth
            color="primary"
            onClick={() => this.stepForward()}
            endIcon={<NavigateNextIcon />}
            disabled={hasError}
          >
            {i18n.__("Button_Onboarding_Step2")}
          </Button>
        </div>
        <Dividier className={classes.divider} />
        <div className={classes.link}>
          <Link href="/">
            <Typography>{i18n.__("Label_LoginForm_GoHome")}</Typography>
          </Link>
        </div>
      </form>,
    ];
    return code;
  }

  enterSecretQuestion() {
    const { error, classes, secrets } = this.props;

    // let secretOptions = [];
    // secrets.forEach(function (value, key) {
    //   secretOptions.push(value.title);
    //   console.log(key);
    //   console.log(value);
    // });

    let code = [
      <form>
        <div>
          <Autocomplete
            autoFocus
            fullWidth
            // style={{ width: "100%" }}
            value={this.state.value}
            onChange={(event, newValue) => {
              this.setState({ value: newValue });
            }}
            inputValue={this.state.inputValue}
            onInputChange={(event, newInputValue) => {
              this.setState({ inputValue: newInputValue });
            }}
            id="controllable-states-demo"
            options={this.state.secretOptions}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Välj en hemlig fråga"
                variant="outlined"
              />
            )}
          />
          <TextField
            className={classes.divider}
            onKeyDown={this.onKeyDown}
            name="email"
            value={this.state.secret}
            label={i18n.__("Label_Onboarding_Secret")}
            placeholder={i18n.__("Label_Onboarding_Secret")}
            helperText={this.state.usernameError}
            autoComplete="off"
            fullWidth={true}
            validations="isEmail"
            onChange={this.handleChange("secret")}
            // validationError={i18n.__('Label_Onboarding_EmailValidationError')}
          />
        </div>
        <Dividier className={classes.divider} />
        <div className={classes.actions}>
          <Button
            onKeyDown={this.onKeyDown}
            className={classes.button}
            variant="contained"
            fullWidth
            color="primary"
            onClick={() => this.stepBack()}
            startIcon={<NavigateBackIcon />}
          >
            {i18n.__("Button_Onboarding_Step1_Back")}
          </Button>
          <Button
            onKeyDown={this.onKeyDown}
            className={classes.button}
            variant="contained"
            fullWidth
            color="primary"
            onClick={() => this.stepForward()}
            endIcon={<NavigateNextIcon />}
          >
            {i18n.__("Button_Onboarding_Step2")}
          </Button>
        </div>
        <Dividier className={classes.divider} />
        <div className={classes.link}>
          <Link href="/">
            <Typography>{i18n.__("Label_LoginForm_GoHome")}</Typography>
          </Link>
        </div>
      </form>,
    ];
    return code;
  }

  enterSecretQuestionAgain() {
    const { error, classes } = this.props;

    let hasError = this.state.differentSecrets;

    let code = [
      <form>
        <div>
          <Article articleId={"onboarding.secret2"} />
          <Dividier className={classes.divider} />
          {hasError ? (
            <Typography variant="body1" gutterBottom color="error">
              {i18n.__("Label_SecretIsNotIdentical")}
            </Typography>
          ) : null}
          <TextField
            autoFocus
            className={classes.divider}
            onKeyDown={this.onKeyDown}
            name="email"
            value={this.state.secret2}
            label={i18n.__("Label_Onboarding_Secret")}
            placeholder={i18n.__("Label_Onboarding_Secret")}
            helperText={this.state.usernameError}
            autoComplete="off"
            fullWidth
            validations="isEmail"
            onChange={this.handleChange("secret2")}
          />
        </div>
        <Dividier className={classes.divider} />{" "}
        <div className={classes.actions}>
          <Button
            onKeyDown={this.onKeyDown}
            className={classes.button}
            variant="contained"
            fullWidth
            color="primary"
            onClick={() => this.stepBack()}
            startIcon={<NavigateBackIcon />}
          >
            {i18n.__("Button_Onboarding_Step1_Back")}
          </Button>
          <Button
            onKeyDown={this.onKeyDown}
            className={classes.button}
            variant="contained"
            fullWidth
            color="primary"
            // disabled={hasError}
            onClick={() => this.stepForward()}
            endIcon={<NavigateNextIcon />}
          >
            {i18n.__("Button_Onboarding_Step2")}
          </Button>
        </div>
        <Dividier className={classes.divider} />
        <div className={classes.link}>
          <Link href="/">
            <Typography>{i18n.__("Label_LoginForm_GoHome")}</Typography>
          </Link>
        </div>
      </form>,
    ];
    return code;
  }
  confirmAndCreate() {
    const { error, classes } = this.props;
    let code = [
      <div>
        <Article
          contentpart={"media.mainimage"}
          articleId={"onboarding.confirm"}
        />
        <Article articleId={"onboarding.confirm"} />
        <div>
          <Typography>{i18n.__("Label_Summary_CreateAccount")}</Typography>
          <TextField
            fullWidth
            className={classes.textField}
            disable={true}
            variant="outlined"
            value={this.state.username}
            label={i18n.__("Label_Onboarding_UserName")}
          />

          <TextField
            fullWidth
            className={classes.textField}
            disable={true}
            variant="outlined"
            value={this.state.secret}
            label={this.state.inputValue}
          />
        </div>

        <div className={classes.actions}>
          <Button
            onKeyDown={this.onKeyDown}
            className={classes.button}
            variant="contained"
            fullWidth
            color="primary"
            onClick={() => this.stepBack()}
            startIcon={<NavigateBackIcon />}
          >
            {i18n.__("Button_Onboarding_Step1_Back")}
          </Button>
          <Button
            onKeyDown={this.onKeyDown}
            className={classes.button}
            variant="contained"
            fullWidth
            color="primary"
            // disabled={hasError}
            onClick={() => this.createUser()}
            endIcon={<NavigateNextIcon />}
          >
            {i18n.__("Button_Onboarding_Accept")}
          </Button>
          <Dividier className={classes.divider} />
        </div>
      </div>,
    ];
    return code;
  }
  final() {
    const { error, classes } = this.props;
    let code = [
      <form>
        {/* Välkommen. Ditt konto är skapat och du kan nu logga in i tjänsten. När
          du loggar första gången kommer du att få din PUK-kod presenterad i din
          Profilbild. PUK koden använder du för att återställa ditt konto om du
          inte kommer igår ditt lösenord. */}
        <Article articleId={"onboarding.final"} />
        <Dividier className={classes.divider} />

        <Button
          onKeyDown={this.onKeyDown}
          className={classes.button}
          variant="contained"
          fullWidth
          color="primary"
          onClick={() => FlowRouter.go("/")}
          endIcon={<NavigateNextIcon />}
        >
          {i18n.__("Button_Onboarding_Step2")}
        </Button>
        <Dividier className={classes.divider} />
      </form>,
    ];
    return code;
  }
}

export default withStyles(styles)(Onboarding);
