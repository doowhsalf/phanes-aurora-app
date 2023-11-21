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
import { red } from '@mui/material/colors';

const styles = (theme) => ({
  contentContainer: {
    overflow: "auto",
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
  actions: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const options = [
  "Vilken stad föddes din mamma i",
  "Vilket lag gillar du i fotboll?",
];

class ResetForm extends React.Component {
  constructor(props) {
    super();

    let secretOptions = [];
    props.secrets.forEach(function (value, key) {
      secretOptions.push(value.title);
      console.log(key);
      console.log(value);
    });

    // const [value, setValue] = React.useState(options[0]);
    // const [inputValue, setInputValue] = React.useState('')
    this.state = {
      disabled: false,
      canSubmit: false,
      puk: "",
      passwordCheck: "",
      passwordError: true,
      email: "",
      username: "",
      secret: "",
      secret2: "",
      usernameError: "",
      pwError: "",
      inputValue: "",
      value: secretOptions[0],
      secretOptions: secretOptions,

      step: 1,
    };
    DEFCON3 && console.log(this.state.puk);
  }
  onKeyDown = (event) => {
    DEFCON7 && console.log("onKeyDown");
    if (event.keyCode === 13) {
      DEFCON5 && console.log("Pressed the Enter button");
      this.validateUsernameNextStep();
    }
  };

  isFormPwIdentical() {
    let validationError = false;
    DEFCON3 && console.log("Validating password");
    DEFCON3 && console.log(validationError);
    DEFCON3 && console.log(this.state.puk);
    DEFCON3 && console.log(this.state.pukCheck);

    validationError = this.state.puk.length < 16 ? true : validationError;

    return validationError;
  }

  isFormValid() {
    let validationPassed = true;

    if (this.state.puk === "" || this.state.puk.trim() === "") {
      this.setState({
        passwordError: i18n.__("Label_Onboarding_PasswordValidationError"),
      });
      validationPassed = false;
    }
    if (this.state.puk.trim() !== this.state.pukAgain.trim()) {
      this.setState({
        passwordError: i18n.__("Label_Onboarding_PasswordValidationError"),
      });
      validationPassed = false;
    }

    if (this.state.secret.trim() !== this.state.secret2.trim()) {
      this.setState({
        passwordError: i18n.__("Label_Onboarding_SecretValidationError"),
      });
      validationPassed = false;
    }

    // if (this.state.email === "" || this.state.email.trim() === "") {
    //   this.setState({
    //     usernameError: i18n.__("Label_EnterUserName"),
    //   });
    //   validationPassed = false;
    // }

    return validationPassed;
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
    DEFCON3 && console.log("checking password");
    DEFCON3 && console.log(name);
    DEFCON3 && console.log(event.target.value);
    DEFCON3 && console.log(this.state.puk);
    DEFCON3 && console.log(this.state.pukCheck);
    this.isFormPwIdentical();
  };

  validateUsernameNextStep() {
    this.setState({ step: 3 });
  }
  stepBack() {
    this.setState({ step: this.state.step - 1 });
  }
  stepForward() {
    this.setState({ step: this.state.step + 1 });
  }

  render() {
    const { error, classes } = this.props;
    DEFCON3 && console.log("Starting up Reset process...");

    let step = [];

    switch (this.state.step) {
      case 1:
        step = this.intro();
        break;

      case 2:
        step = this.enterUserName();
        break;

      case 3:
        step = this.enterPUK();
        break;

      case 4:
        step = this.enterSecretQuestion();
        break;

      case 5:
        step = this.PUK_is_OK();
        break;

      case 6:
        step = this.enterPw();
        break;

      case 7:
        step = this.final();
        break;

      default:
        break;
    }

    return (
      <div>
        <Container className={classes.contentContainer} maxWidth="md">
          {step}
        </Container>
      </div>
    );
  }

  intro() {
    const { error, classes } = this.props;
    let code = [
      <form>
        {/* <Typography variant="body1" gutterBottom>
          För att åteställa ditt lösenord behvöer du din PUK-kod. Följ
          instruktionerna nedan för att återställa lösenordet. Om du inte har
          din PUK-kod, vänligen kontakta XXXX
        </Typography> */}
        <Article articleId={"restore.intro"} />

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
    let code = [
      <form>
        <fieldset>
          <Typography variant="body1" gutterBottom>
            Skriv in ditt användarnamn
          </Typography>
          <Dividier className={classes.divider} />
          {error ? (
            <Typography variant="body1" gutterBottom color="error">
              {error}
            </Typography>
          ) : null}

          <TextField
            autoFocus
            className={classes.textField}
            onKeyDown={this.onKeyDown}
            name="email"
            value={this.state.username}
            label={i18n.__("Label_Reset_EnterUserName")}
            type="email"
            placeholder={i18n.__("Label_Reset_UserName")}
            autoComplete="off"
            fullWidth={true}
            validations="isEmail"
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
          >
            {i18n.__("Button_Reset_Step1")}
          </Button>
        </div>

        <Dividier className={classes.divider} />
      </form>,
    ];
    return code;
  }

  enterPUK() {
    const { error, classes } = this.props;

    let hasError = this.isFormPwIdentical();

    let code = [
      <form>
        <Typography variant="body1" gutterBottom>
          Skriv in din PUK-kod
        </Typography>
        <Dividier className={classes.divider} />
        {error ? (
          <Typography variant="body1" gutterBottom color="error">
            {error}
          </Typography>
        ) : null}
        <TextField
          autoFocus
          className={classes.divider}
          // onKeyDown={this.onKeyDown}
          name="puk"
          value={this.state.puk}
          label={i18n.__("Label_Reset_PUK")}
          // type="password"
          placeholder={i18n.__("Label_Reset_PUK")}
          // helperText={i18n.__("Label_Onboarding_PasswordRules")}
          autoComplete="off"
          fullWidth={true}
          onChange={this.handleChange("puk")}
          // validationError={i18n.__('Label_Onboarding_EmailValidationError')}
        />

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
          <Dividier className={classes.divider} />
        </div>
      </form>,
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
        {error ? (
          <Typography variant="body1" gutterBottom color="error">
            {error}
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
          <Dividier className={classes.divider} />
        </div>
      </form>,
    ];
    return code;
  }
  PUK_is_OK() {
    const { error, classes } = this.props;
    let code = [
      <form>
        <Typography variant="subtitle1" gutterBottom>
          PUK-koden är rätt. Vänligen skriv in ditt nya lösenord och trycker på
          spara.
        </Typography>
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
          <Dividier className={classes.divider} />
        </div>
      </form>,
    ];
    return code;
  }

  enterSecretQuestionx() {
    const { error, classes } = this.props;
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
            type="email"
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
          <Dividier className={classes.divider} />
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

  final() {
    const { error, classes } = this.props;
    let code = [
      <form>
        {/* <Typography variant="subtitle1" gutterBottom>
          Välkommen. Lösenord är återställt. Tryck på nästa för att Logga in
          igen.
        </Typography> */}
        <Article articleId={"restore.final"} />

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

export default withStyles(styles)(ResetForm);
