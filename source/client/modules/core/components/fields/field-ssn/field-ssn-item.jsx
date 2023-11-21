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
import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from '@mui/styles/withStyles';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FieldSSNItemTerm from "./field-ssn-item-term";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { isValidSwedishSSN } from "../../helpers/ssn-swedish";

const styles = (theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing(1),
  },
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  row: {
    display: "flex",
    justifyContent: "marginLeft",
    marginTop: 19,
  },
});

function ssnIsOK(validation_method, value) {
  DEFCON5 && console.log("validation...");
  DEFCON5 && console.log(validation_method);
  DEFCON5 && console.log(value);

  if (validation_method === "swe") {
    return isValidSwedishSSN(value);
  } else return true;
}

class FieldSSNItem extends React.Component {
  constructor(props) {
    DEFCON9 && console.log("In FieldSSNItem...");
    super(props);
    this.state = {
      open: false,
      nametype: 2,
      changedData: false,
      error: false,
      value: this.props.field_ssnitem.field_current_ssn,
      validation_method: this.props.field_ssnitem.field_ssntype
        .field_validation_method
        ? this.props.field_ssnitem.field_ssntype.field_validation_method
        : "swe",
    };
  }

  handleClickDlgOpen = () => {
    this.setState({ open: true });
  };

  handleDlgClose = () => {
    this.setState({ open: false });
  };

  handleDelete = () => {
    this.setState({ open: false });
    const { delItem, index } = this.props;
    DEFCON9 && console.log("delete item");
    DEFCON9 && console.log(index);
    delItem(index);
  };

  /*handleChange = name => event => {
    this.setState({[name]: event.target.value});
  };

  handleNameType = name => event => {
    this.setState({[name]: event.target.value});
    DEFCON9 && console.log("Clicked the ");
  };*/

  handleChange = (name) => (event) => {
    this.handleUpdateField(name, event.target.value);
    this.setState((state) => ({
      changedData: true,
    }));
  };

  handleUpdateField = (fieldname, value) => {
    const { index, update_field_ssntype } = this.props;
    DEFCON5 && console.log("In HandleUpdateField");
    DEFCON5 && console.log(fieldname);
    DEFCON5 && console.log(value);
    this.setState((state) => ({
      value: value,
    }));

    if (ssnIsOK(this.state.validation_method, value)) {
      this.setState((state) => ({
        error: false,
      }));
      if (update_field_ssntype) {
        DEFCON5 &&
          console.log(
            "Ok, cool, I will update the Namemaster state and save stuff"
          );
        update_field_ssntype(index, fieldname, value);
      } else {
        DEFCON5 &&
          console.log(
            "hm, something went wrong with the HandleUpdateField function... It was not set"
          );
      }
    } else {
      this.setState((state) => ({
        error: true,
      }));
    }
  };

  render() {
    const {
      field_ssnitem,
      classes,
      label,
      disabled,
      update_field_ssntype,
      index,
      ssnTerms,
    } = this.props;

    DEFCON9 && console.log("This is the index in name item");
    DEFCON9 && console.log(index);
    DEFCON9 && console.log(this.state.nametype);

    let inputProps = {
      readOnly: disabled,
    };

    // Check if data is defined and if not just return
    if (field_ssnitem === undefined) {
      return "";
    }

    DEFCON5 && console.log("***** Checking the Item Type");
    DEFCON5 && console.log(field_ssnitem);
    DEFCON5 && console.log(ssnTerms);
    let errorText = this.state.error
      ? i18n.__("Entity_Label_Field_current_ssn_error")
      : " ";

    return (
      <div className={classes.row}>
        <TextField
          error={this.state.error}
          fieldname="field_current_ssn"
          className={classes.textField}
          label={i18n.__("Entity_Label_Field_current_ssn")}
          disabled={disabled}
          value={this.state.value}
          onChange={this.handleChange("field_current_ssn")}
          InputProps={inputProps}
          helperText={errorText}
        />
        <FieldSSNItemTerm
          fieldname="field_ssntype.tid"
          className={classes.textField}
          index={index}
          label={i18n.__("Entity_Label_Field_ssntype")}
          InputProps={inputProps}
          field_ssnitem={field_ssnitem}
          ssnTerms={ssnTerms}
          disabled={disabled}
          update_field_ssntype={(index, fieldSSN, value) =>
            update_field_ssntype(index, fieldSSN, value)
          }
        />

        <IconButton
          className={classes.button}
          disabled={disabled}
          onClick={this.handleClickDlgOpen}
          size="large">
          <DeleteIcon />
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleDlgClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {i18n.__("Entity_Label_Field_ssn_remove_item")}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {i18n.__("Entity_Label_Field_remove_item_text")}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDelete} color="primary">
              Delete
            </Button>
            <Button
              onClick={this.handleDlgClose}
              color="primary"
              autoFocus="autoFocus"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

FieldSSNItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FieldSSNItem);
