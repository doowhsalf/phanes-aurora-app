import React from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
//import DialogTitle from "@mui/material/DialogTitle";
import MuiDialogTitle from "@mui/material/DialogTitle";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogActions from "@mui/material/DialogActions";

import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import PropTypes from "prop-types";
import SnackBarMessage from "../../core/components/fields/snackbar-message";
import { renderGoogleMapCompany } from "../../core/components/helpers/googlemap-iframe";
import { contactInfo } from "../../core/components/helpers/contact-info";

import Iframe from "react-iframe";

import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";

function _uniqueKey() {
  return Math.random() * Math.random();
}

const styles = (theme) => ({
  paper: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(0),
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  dialog: {
    fullWidth: "100%",
  },
  textFieldInput: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  textField: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  iframeBox: {
    marginTop: theme.spacing(2),
    width: "90%",
    height: "44%",
  },
  iframe: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    filter: "grayscale(1)",
  },
  textFieldMulti: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  button: {},
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
          size="large">
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const initialState = {
  contact_name: "",
  contact_mail: "",
  contact_mail2: "",
  contact_phone: "",
  contact_message: "",
  validationErrors: {},
  openSnackbar: false,
  snackbarMessage: "",
  snackbarMessageVariant: "warning",
  walter_test: "",
  challenge: Math.floor(Math.random() * 600000) + 100000,
};

const validationErrorsToMessage = (errors) => {
  return (
    <div>
      {Object.keys(errors).map((key, index) => (
        <div key={index}>{`${errors[key] && errors[key]["msg"]} (${
          errors[key] && errors[key]["field"]
        }) `}</div>
      ))}
    </div>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class ContactDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  submit = () => {
    const { onClose, submitQuestion } = this.props;
    const {
      contact_name,
      contact_mail,
      contact_mail2,
      contact_phone,
      contact_message,
    } = this.state;

    let user_logged_in = !!Meteor.userId() ? true : false;

    const query = {
      contact_name,
      contact_mail,
      contact_mail2,
      contact_phone,
      contact_message,
      user_logged_in,
    };
    const validationErrors = this.getQueryValidationErrors(query);

    if (validationErrors === null) {
      DEFCON5 && console.log("Submitting new question...");
      this.setState(initialState);
      submitQuestion(query, this.onSubmitCallback);
    } else {
      DEFCON5 && console.log("Validation errors...");
      DEFCON5 && console.log(validationErrors);
      this.setState({
        snackbarMessage: validationErrorsToMessage(validationErrors),
        openSnackbar: true,
        validationErrors,
      });
    }
  };

  onSubmitCallback = (err, result) => {
    const { onClose } = this.props;

    if (err) {
      this.setState(
        {
          snackbarMessage: i18n.__("Entity_Label_Field_ContactUs_Fail"),
          openSnackbar: true,
          snackbarMessageVariant: "error",
        },
        () => onClose()
      );
    } else {
      this.setState(
        {
          snackbarMessage: i18n.__("Entity_Label_Field_ContactUs_Success"),
          openSnackbar: true,
          snackbarMessageVariant: "success",
        },
        () => onClose()
      );
    }
  };

  close = () => {
    const { onClose } = this.props;
    onClose();
  };

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleSnackbarClose = () => {
    this.setState({
      openSnackbar: false,
    });
  };

  render() {
    const { isOpen, onClose, classes } = this.props;
    const {
      contact_name,
      contact_mail,
      contact_mail2,
      contact_phone,
      contact_message,
      walter_test,
      validationErrors,
    } = this.state;

    const userLoggedIn = !!Meteor.userId();

    const iframeGoogle = [
      <div key={_uniqueKey()} className={classes.iframeBox}>
        <Iframe
          url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12614.335394111002!2d-122.41927649386653!3d37.77635494130429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20Kalifornien%2C%20USA!5e0!3m2!1ssv!2sse!4v1666110403105!5m2!1ssv!2sse"
          width="100%"
          height="auto"
          id="googlemaps"
          className={classes.iframe}
          display="initial"
          position="relative"
          frameborder="0"
          style="border:0, filter: grayscale(1)"
          allowfullscreen="false"
        />
      </div>,
    ];

    this.getErrorMessage = (error) => {
      const { validationErrors } = this.state;
      if (!error) {
        return "";
      }
      return validationErrors[error] && validationErrors[error]["msg"]
        ? validationErrors[error]["msg"]
        : "";
    };

    let dialogGrid = !userLoggedIn ? 6 : 12;

    return (
      <div>
        <Dialog
          maxWidth={"md"}
          open={isOpen}
          onClose={onClose}
          TransitionComponent={Transition}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.close}>
            {i18n.__("Entity_Label_Field_ContactUs_Title")}
          </DialogTitle>

          <DialogContent dividers>
            <Grid container={true} spacing={2}>
              {!userLoggedIn ? (
                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                  {contactInfo()}
                  {renderGoogleMapCompany(classes)}
                </Grid>
              ) : (
                ""
              )}

              <Grid
                item={true}
                xs={dialogGrid}
                sm={dialogGrid}
                md={dialogGrid}
                lg={dialogGrid}
              >
                <TextField
                  label={i18n.__("Entity_Label_Field_ContactUs_Name")}
                  value={contact_name}
                  fullWidth
                  variant="filled"
                  className={classes.textField}
                  onChange={this.handleChange("contact_name")}
                  helperText={this.getErrorMessage("contact_name")}
                  error={!!this.getErrorMessage("contact_name")}
                />

                <TextField
                  label={i18n.__("Entity_Label_Field_ContactUs_Email")}
                  value={contact_mail}
                  fullWidth
                  variant="filled"
                  className={classes.textField}
                  onChange={this.handleChange("contact_mail")}
                  helperText={this.getErrorMessage("contact_mail")}
                  error={!!this.getErrorMessage("contact_mail")}
                />

                <TextField
                  label={i18n.__("Entity_Label_Field_ContactUs_Email2")}
                  value={contact_mail2}
                  fullWidth
                  variant="filled"
                  className={classes.textField}
                  onChange={this.handleChange("contact_mail2")}
                  helperText={this.getErrorMessage("contact_mail2")}
                  error={!!this.getErrorMessage("contact_mail2")}
                />

                <TextField
                  label={i18n.__("Entity_Label_Field_ContactUs_Phone")}
                  value={contact_phone}
                  fullWidth
                  variant="filled"
                  className={classes.textField}
                  onChange={this.handleChange("contact_phone")}
                  helperText={this.getErrorMessage("contact_phone")}
                  error={!!this.getErrorMessage("contact_phone")}
                />

                <TextField
                  label={i18n.__("Entity_Label_Field_ContactUs_Content")}
                  value={contact_message}
                  multiline
                  variant="filled"
                  fullWidth
                  rows={8}
                  className={classes.textFieldMulti}
                  onChange={this.handleChange("contact_message")}
                  helperText={this.getErrorMessage("contact_message")}
                  error={!!this.getErrorMessage("contact_message")}
                />
                {/* <TextField
                  label={i18n.__("Entity_Label_Field_ContactUs_Waltercheck")}
                  value={walter_test}
                  variant="filled"
                  fullWidth
                  rows={8}
                  className={classes.textField}
                  onChange={this.handleChange("walter_test")}
                  helperText={this.state.challenge}
                  error={!!this.getErrorMessage("walter_test")}
                /> */}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.close}>
              {i18n.__("Entity_Label_Button_ContactUs_Cancel")}
            </Button>
            <Button onClick={this.submit} color="primary" autoFocus="autoFocus">
              {i18n.__("Entity_Label_Button_ContactUs_Submit")}
            </Button>
          </DialogActions>
        </Dialog>
        <SnackBarMessage
          open={this.state.openSnackbar}
          handleSnackbarClose={this.handleSnackbarClose}
          variant={
            this.state.snackbarMessageVariant
              ? this.state.snackbarMessageVariant
              : "warning"
          }
          message={this.state.snackbarMessage}
        />
      </div>
    );
  }

  getQueryValidationErrors = (query) => {
    let validationErrors = null;

    if (!query) {
      validationErrors = {};
      validationErrors["contact_name"] = {
        msg: i18n.__("Entity_Validation_MandatoryField"),
        field: i18n.__("Entity_Validation_MandatoryField_Name"),
      };
      validationErrors["contact_mail"] = {
        msg: i18n.__("Entity_Validation_MandatoryField"),
        field: i18n.__("Entity_Validation_MandatoryField_Email"),
      };
      validationErrors["contact_mail2"] = {
        msg: i18n.__("Entity_Validation_MandatoryField"),
        field: i18n.__("Entity_Validation_MandatoryField_Email"),
      };
    }

    if (!query.contact_name || query.contact_name.trim() === "") {
      if (validationErrors === null) {
        validationErrors = {};
      }
      validationErrors["contact_name"] = {
        msg: i18n.__("Entity_Validation_MandatoryField"),
        field: i18n.__("Entity_Validation_MandatoryField_Name"),
      };
    }

    if (!query.contact_mail || query.contact_mail.trim() === "") {
      if (validationErrors === null) {
        validationErrors = {};
      }
      validationErrors["contact_mail"] = {
        msg: i18n.__("Entity_Validation_MandatoryField"),
        field: i18n.__("Entity_Validation_MandatoryField_Email"),
      };
    }

    if (!query.contact_mail2 || query.contact_mail2.trim() === "") {
      if (validationErrors === null) {
        validationErrors = {};
      }
      validationErrors["contact_mail2"] = {
        msg: i18n.__("Entity_Validation_MandatoryField"),
        field: i18n.__("Entity_Validation_MandatoryField_Email"),
      };
    }

    if (query.contact_mail !== query.contact_mail2) {
      if (validationErrors === null) {
        validationErrors = {};
      }
      validationErrors["contact_mail2"] = {
        msg: i18n.__("Entity_Validation_MatchErrorField", {
          field: "contact_mail2",
        }),
        field: i18n.__("Entity_Validation_MandatoryField_Email"),
      };

      validationErrors["contact_mail"] = {
        msg: i18n.__("Entity_Validation_MatchErrorField", {
          field: "contact_mail",
        }),
        field: i18n.__("Entity_Validation_MandatoryField_Email"),
      };
    }

    if (!query.contact_message || query.contact_message.trim() === "") {
      if (validationErrors === null) {
        validationErrors = {};
      }
      validationErrors["contact_message"] = {
        msg: i18n.__("Entity_Validation_MandatoryField"),
        field: i18n.__("Entity_Validation_MandatoryField_Message"),
      };
    }

    return validationErrors;
  };
}

ContactDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(ContactDialog);
