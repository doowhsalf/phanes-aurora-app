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
import SnackBarMessage from "../fields/snackbar-message";
import HelpContent from "../content/help";

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
    height: "60%",
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
      <Typography variant="h5">{children}</Typography>
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
  snackbarMessage: "",
  snackbarMessageVariant: "warning",
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

class HelpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  close = () => {
    const { onClose } = this.props;
    onClose();
  };

  handleSnackbarClose = () => {
    this.setState({
      openSnackbar: false,
    });
  };

  render() {
    const { isOpen, onClose, getArticle, classes } = this.props;
    const {} = this.state;

    this.getErrorMessage = (error) => {
      const { validationErrors } = this.state;
      if (!error) {
        return "";
      }
      return validationErrors[error] && validationErrors[error]["msg"]
        ? validationErrors[error]["msg"]
        : "";
    };

    return (
      <div>
        <Dialog
          maxWidth={"md"}
          open={isOpen}
          onClose={onClose}
          TransitionComponent={Transition}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.close}>
            {i18n.__("Label_Content_Help")}
          </DialogTitle>

          <DialogContent dividers>
            <HelpContent getArticle={getArticle} />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.close}>
              {i18n.__("Label_Button_OK")}
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
}

HelpDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(HelpDialog);

//            <HelpContent getArticle={getArticle} />
