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

class FieldNameTypeItemTerm extends React.Component {
  constructor(props) {
    DEFCON9 && console.log("In FieldNameTypeItemTerm...");
    super(props);
    const { nametypeitem } = this.props;
    DEFCON9 && console.log(nametypeitem);
    let selection = null;
    if (nametypeitem.field_name_type !== undefined) {
      selection = nametypeitem.field_name_type.tid;
    }

    this.state = {
      nametype: selection,
      open: false,
      nametypeTerms: [],
    };
  }

  componentDidMount = () => {
    const { getTermsCallback } = this.props;
    getTermsCallback("nametype", (error, result) => {
      if (error) {
        DEFCON7 && console.log("ERROR GETTING nametype");
        DEFCON7 && console.log(error);
      } else {
        DEFCON7 && console.log(" !!! Finaly received data for nametype...");
        DEFCON7 && console.log(result);
        this.setupData(result);
      }
    });
  };

  setupData = (result) => {
    this.setState((state) => ({ nametypeTerms: result }));
  };

  handleChange = (event) => {
    DEFCON9 && console.log("New event and current value is");
    DEFCON9 && console.log(event.target.name);
    DEFCON9 && console.log(event.target.value);

    this.setState({ nametype: event.target.value });
    this.handleUpdateField(event.target.value);
  };

  handleUpdateField = (value) => {
    const { index, update_field_name } = this.props;
    DEFCON7 && console.log("In HandleUpdateField4Terms");
    DEFCON7 && console.log(value);

    if (update_field_name) {
      DEFCON5 &&
        console.log(
          "Ok, cool, I will update the Namemaster state and save stuff"
        );
      update_field_name(index, "field_name_type", value);
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
    const { classes, label, disabled, index, nametypeitem } = this.props;

    if (
      this.state.nametypeTerms.length == 0 ||
      this.state.nametypeTerms == undefined
    ) {
      DEFCON7 && console.log("No terms (nametype) yet...");
      return "";
    }

    DEFCON7 && console.log("**** curreent selection ****");
    DEFCON7 && console.log(this.state.nametype);

    var termrender = [];
    if (this.state.nametypeTerms !== undefined) {
      DEFCON7 && console.log(this.state.nametypeTerms);
      this.state.nametypeTerms.taxonomies.map((nametypeitem, index) => {
        DEFCON7 && console.log("Getting the index");
        DEFCON7 && console.log(nametypeitem);
        DEFCON7 && console.log(index);

        let newtermrender = [
          <MenuItem value={nametypeitem.tid}>{nametypeitem.name}</MenuItem>,
        ];
        termrender.push(newtermrender);
      });
    }

    DEFCON9 && console.log("TERM RENDER RESULT");
    DEFCON9 && console.log(termrender);

    let inputProps = {
      readOnly: disabled,
      name: "name",
    };
    return (
      <form autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="nametype">{label}</InputLabel>
          <Select
            className={classes.selectField}
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={nametypeitem.field_name_type.tid}
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

FieldNameTypeItemTerm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FieldNameTypeItemTerm);
