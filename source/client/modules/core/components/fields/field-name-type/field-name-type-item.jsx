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
import withStyles from '@mui/styles/withStyles';
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FieldNameTypeItemTerm from "./field-name-type-item-term";

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

class FieldNameTypeItem extends React.Component {
  constructor(props) {
    DEFCON9 && console.log("In FieldNameTypeItem...");
    super(props);
    this.state = {
      open: false,
      nametype: 2,
      changedData: false,
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

  handleChange = (name) => (event) => {
    this.handleUpdateField(name, event.target.value);
    this.setState(() => ({ changedData: true }));
  };

  handleUpdateField = (fieldname, value) => {
    const { index, update_field_name } = this.props;
    DEFCON7 && console.log("In HandleUpdateField");
    DEFCON7 && console.log(fieldname);
    DEFCON7 && console.log(value);

    if (update_field_name) {
      DEFCON5 &&
        console.log(
          "Ok, cool, I will update the Namemaster state and save stuff"
        );
      update_field_name(index, fieldname, value);
    } else {
      DEFCON5 &&
        console.log(
          "hm, something went wrong with the HandleUpdateField function... It was not set"
        );
    }
  };

  render() {
    const {
      nametypeitem,
      classes,
      disabled,
      update_field_name,
      index,
      getTermsCallback,
    } = this.props;

    DEFCON5 && console.log("This is the index in name item");
    DEFCON5 && console.log(index);
    DEFCON5 && console.log(this.state.nametype);
    DEFCON5 && console.log(nametypeitem);
    DEFCON5 && console.log(nametypeitem.field_name_type.tid);

    let inputProps = {
      readOnly: disabled,
    };

    // Check if data is defined and if not just return
    if (nametypeitem === undefined) {
      return "";
    }

    // Check if data is defined and if not just return
    let button_disabled =
      nametypeitem.field_name_type.tid === "2" ? true : disabled;
    return (
      <div className={classes.row}>
        <TextField
          fieldname="field_firstname"
          className={classes.textField}
          label={i18n.__("Entity_Label_Field_firstname")}
          disabled={disabled}
          value={nametypeitem.field_firstname}
          onChange={this.handleChange("field_firstname")}
          InputProps={inputProps}
        />
        <TextField
          fieldname="field_lastname"
          className={classes.textField}
          label={i18n.__("Entity_Label_Field_lastname")}
          disabled={disabled}
          value={nametypeitem.field_lastname}
          onChange={this.handleChange("field_lastname")}
          InputProps={inputProps}
        />
        <FieldNameTypeItemTerm
          fieldname="field_name_type"
          className={classes.textField}
          index={index}
          label={i18n.__("Entity_Label_Field_name_type")}
          nametypeitem={nametypeitem}
          getTermsCallback={(termtype, callback) =>
            getTermsCallback(termtype, callback)
          }
          disabled={disabled}
          update_field_name={(index, fieldName, value) =>
            update_field_name(index, fieldName, value)
          }
        />

        <IconButton
          className={classes.button}
          disabled={button_disabled}
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
            {i18n.__("Entity_Label_Field_name_type_remove_item")}
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

FieldNameTypeItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FieldNameTypeItem);

/* <TextField
          fieldname="item_id"
          className={classes.textField}
          label={i18n.__("Entity_Label_Item_id")}
          disabled={true}
          value={nametypeitem.item_id}
          InputProps={inputProps}
        />*/
