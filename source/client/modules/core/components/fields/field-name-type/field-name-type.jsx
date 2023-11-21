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
import FieldNameTypeItem from "./field-name-type-item";

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

class FieldNameType extends React.Component {
  constructor(props) {
    DEFCON7 && console.log("In FieldNameType...");
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    const {
      delItem,
      addItem,
      classes,
      update_field_name,
      nametype,
      label,
      getTermsCallback,
      disabled,
    } = this.props;

    let inputProps = {
      readOnly: disabled,
    };

    // Check if data is defined and if not just return
    if (!nametype) {
      return "";
    }

    return nametype.map((nametypeitem, index) => {
      DEFCON7 && console.log(nametypeitem.field_firstname);
      DEFCON7 && console.log(index);

      return (
        <div key={index}>
          <FieldNameTypeItem
            index={index}
            disabled={disabled}
            nametypeitem={nametypeitem}
            InputProps={inputProps}
            addItem={(fieldName, value) => addItem(fieldName, value)}
            delItem={(index) => delItem(index)}
            getTermsCallback={(termtype, callback) =>
              getTermsCallback(termtype, callback)
            }
            update_field_name={(index, fieldName, value) =>
              update_field_name(index, fieldName, value)
            }
          />
        </div>
      );
    });
  }
}
FieldNameType.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FieldNameType);
