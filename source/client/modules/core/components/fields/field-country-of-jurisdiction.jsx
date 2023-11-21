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
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

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

class FieldCountryOfJurisdiction extends React.Component {
  constructor(props) {
    DEFCON7 && console.log("In FieldCountryOfJurisdiction...");
    super(props);

    this.state = {
      open: false,
      dataSetUp: false,
      currentSelection: [],
      pepTerms: [],
      orgSelection: [],
    };
  }
  componentDidMount() {
    const { getTermsService } = this.props;
    getTermsService("pep_country", (error, result) => {
      if (error) {
        DEFCON7 && console.log("ERROR GETTING FieldCountryOfJurisdiction");
        DEFCON7 && console.log(error);
      } else {
        DEFCON7 && console.log("%%%%% Finaly received data...");
        DEFCON7 && console.log(result);
        this.setupData(result);
      }
    });
  }

  componentWillReceiveProps(props) {
    const { resetInitState } = this.props;
    DEFCON7 && console.log("Will receive a new prop ");
    DEFCON7 && console.log(resetInitState);
    if (props.resetInitState !== resetInitState) {
      DEFCON7 && console.log("Initate stuff ");
      this.setState({ initSelection: this.state.orgSelection });
      this.setupData(this.state.pepTerms);
    }
  }

  setupData = (cojCountryTerms) => {
    let initSelection = [];
    const { cojCountrySelections } = this.props;
    DEFCON7 && console.log(" %%%%% Prepare data");
    DEFCON7 && console.log(cojCountryTerms);
    DEFCON7 && console.log(cojCountrySelections);

    cojCountryTerms.taxonomies.map((cojCountryTerms_item, index_outer) => {
      cojCountrySelections.map((selection) => {
        DEFCON7 && console.log(selection.tid);
        DEFCON7 && console.log(cojCountryTerms_item.tid);

        if (
          selection.tid == cojCountryTerms_item.tid ||
          initSelection[index_outer]
        ) {
          initSelection[index_outer] = true;
        } else {
          initSelection[index_outer] = false;
        }
      });
    });
    DEFCON7 && console.log("*** Data initated *** ");
    DEFCON7 && console.log("Data initated");
    DEFCON7 && console.log(initSelection);

    this.setState({ currentSelection: initSelection });
    this.setState({ orgSelection: initSelection });
    this.setState({ dataSetUp: true });
    this.setState({ pepTerms: cojCountryTerms });
    //this.setState(currentSelection: initSelection );
  };

  handleChange = () => (event) => {
    DEFCON7 && console.log("New event and current value is");
    DEFCON7 && console.log(event.target.name);
    DEFCON7 && console.log(event.target.value);
    let newSelection = this.state.currentSelection;
    newSelection[event.target.value] = newSelection[event.target.value]
      ? false
      : true;
    DEFCON7 && console.log("newSelection to set to state");
    DEFCON7 && console.log(newSelection);
    this.setState({ currentSelection: newSelection });
    this.saveData();
  };

  saveData = () => {
    const { currentSelection, pepTerms } = this.state;
    const { updateOrderStateJson } = this.props;
    DEFCON7 && console.log("<<<<<<<<< terms >>>>>>>>>>>><");
    DEFCON7 && console.log(pepTerms);

    var field_pep_countries_list = [];
    currentSelection.map((cojCountryTerms_item, index) => {
      if (cojCountryTerms_item) {
        field_pep_countries_list.push(pepTerms.taxonomies[index].tid);
      }
    });
    DEFCON7 && console.log("PepCountries");
    DEFCON7 && console.log(field_pep_countries_list);
    updateOrderStateJson("field_pep_countries_list", field_pep_countries_list);
  };

  render() {
    const { classes, disabled } = this.props;

    // Check if data is defined and if not just return

    if (this.state.pepTerms.length == 0 || this.state.pepTerms == undefined) {
      DEFCON7 && console.log("Country Term still not popluated...");
      return "";
    }

    DEFCON7 && console.log("Listing all TERMS ***");
    DEFCON7 && console.log(this.state.pepTerms);

    var termrender = [];

    this.state.pepTerms.taxonomies.map((cojCountryTerms_item, index) => {
      DEFCON9 && console.log("Getting the index");
      DEFCON9 && console.log(index);

      let newtermrender = [
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              checked={this.state.currentSelection[index]}
              onChange={this.handleChange(index)}
              value={index.toString()}
            />
          }
          label={cojCountryTerms_item.name}
        />,
      ];
      termrender.push(newtermrender);
    });

    return (
      <FormControl
        disabled={disabled}
        component={"fieldset"}
        className={classes.formControl}
      >
        <FormLabel component={"legend"}>
          {i18n.__("Entity_Label_Field_cojCountry")}
        </FormLabel>
        <FormGroup row>{termrender}</FormGroup>
      </FormControl>
    );
  }
}
FieldCountryOfJurisdiction.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FieldCountryOfJurisdiction);
