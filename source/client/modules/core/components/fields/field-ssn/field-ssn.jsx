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
import FieldSSNItem from "./field-ssn-item";
import { isValidSwedishSSN } from "../../helpers/ssn-swedish";

const styles = (theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 100,
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
  row: {
    display: "flex",
    justifyContent: "marginLeft",
    marginTop: 19,
  },
});

class FieldSSN extends React.Component {
  constructor(props) {
    DEFCON9 && console.log("In FieldSSN...");
    super(props);
    this.state = { open: false, ssnTerms: [] };
  }

  componentDidMount() {
    const { getTermsCallback } = this.props;
    getTermsCallback("ssntype", (error, result) => {
      if (error) {
        DEFCON7 && console.log("ERROR GETTING SSN");
        DEFCON7 && console.log(error);
      } else {
        DEFCON7 && console.log("%%%%% Finaly received data...");
        DEFCON7 && console.log(result);
        this.setState({ ssnTerms: result });
      }
    });
  }

  render() {
    const {
      delItem,
      addItem,
      classes,
      update_field_ssntype,
      field_ssn,
      label,
      disabled,
    } = this.props;

    let inputProps = {
      readOnly: disabled,
    };

    if (field_ssn === undefined || field_ssn === false) {
      // Check if data is defined and if not just return
      DEFCON7 && console.log("field_ssn is not present...");
      return "";
    }

    if (this.state.ssnTerms == undefined) {
      // Check if terms are defined
      DEFCON7 && console.log("Terms not loaded..");
      return "";
    }

    DEFCON5 && console.log("field_ssn ***");
    DEFCON5 && console.log(field_ssn);

    return field_ssn.map((field_ssnitem, index) => {
      DEFCON9 && console.log(field_ssnitem);
      DEFCON9 && console.log(index);

      return (
        <div key={index}>
          <FieldSSNItem
            index={index}
            disabled={disabled}
            field_ssnitem={field_ssnitem}
            InputProps={inputProps}
            addItem={(field, value) => addItem(fieldSSN, value)}
            delItem={(index) => delItem(index)}
            ssnTerms={this.state.ssnTerms}
            update_field_ssntype={(index, fieldSSN, value) =>
              update_field_ssntype(index, fieldSSN, value)
            }
          />
        </div>
      );
    });
  }
}
FieldSSN.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FieldSSN);
