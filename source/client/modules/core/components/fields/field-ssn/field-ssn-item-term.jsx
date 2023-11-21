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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

const styles = (theme) => ({
  formControl: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    maxWidth: 160,
    width: 160,
  },
  selectField: {},
});

class FieldSSNItemTerm extends React.Component {
  constructor(props) {
    DEFCON5 && console.log("In FieldSSNItemTerm...");
    super(props);
    const { field_ssnitem } = this.props;
    DEFCON5 && console.log(field_ssnitem);
    let selection = null;
    if (field_ssnitem.field_ssntype !== undefined) {
      selection = field_ssnitem.field_ssntype.tid;
    }

    this.state = {
      ssn: selection,
      open: false,
    };
  }

  handleChange = (event) => {
    DEFCON5 && console.log("New event and current value is");
    DEFCON5 && console.log(event.target.name);
    DEFCON5 && console.log(event.target.value);

    this.setState({ ssn: event.target.value });
    this.handleUpdateField(event.target.value);
  };

  handleUpdateField = (value) => {
    const { index, update_field_ssntype } = this.props;
    DEFCON7 && console.log("In HandleUpdateField4Terms");
    DEFCON7 && console.log(value);

    if (update_field_ssntype) {
      DEFCON5 &&
        console.log(
          "Ok, cool, I will update the Namemaster state and save stuff"
        );
      update_field_ssntype(index, "field_ssntype", value);
    } else {
      DEFCON5 &&
        console.log(
          "hm, something went wrong with the HandleUpdateField function... It was not set"
        );
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { field_ssnitem, classes, label, disabled, index, ssnTerms } =
      this.props;

    DEFCON5 && console.log("*************** Check term-value");
    DEFCON5 && console.log(ssnTerms);
    DEFCON5 && console.log("**** curreent selection ****");
    DEFCON5 && console.log(this.state.ssn);

    if (ssnTerms.length == 0 || ssnTerms == undefined) {
      DEFCON7 && console.log("Term still not popluated...");
      return "";
    }

    var termrender = [];
    if (ssnTerms !== undefined) {
      ssnTerms.taxonomies.map((ssnitem, index) => {
        DEFCON5 && console.log("Getting the index");
        DEFCON5 && console.log(ssnitem);
        DEFCON5 && console.log(index);

        let newtermrender = [
          <MenuItem value={ssnitem.tid}>{ssnitem.name}</MenuItem>,
        ];
        termrender.push(newtermrender);
      });
    }

    DEFCON5 && console.log("TERM RENDER RESULT");
    DEFCON5 && console.log(termrender);

    let inputProps = {
      readOnly: disabled,
      name: "name",
    };
    return (
      <form autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="ssn">{label}</InputLabel>
          <Select
            className={classes.selectField}
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={field_ssnitem.field_ssntype.tid}
            onChange={this.handleChange}
            disabled={disabled}
          >
            {termrender}
          </Select>
        </FormControl>
      </form>
    );
  }
}

FieldSSNItemTerm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FieldSSNItemTerm);
