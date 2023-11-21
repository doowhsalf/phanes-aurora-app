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

class FieldPepCountry extends React.Component {
  constructor(props) {
    DEFCON5 && console.log("In FieldPepCountry...");
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
        DEFCON5 && console.log("ERROR GETTING PEP");
        DEFCON5 && console.log(error);
      } else {
        DEFCON5 && console.log("%%%%% Finaly received data...");
        DEFCON5 && console.log(result);
        this.setupData(result);
      }
    });
  }

  componentWillReceiveProps(props) {
    const { resetInitState } = this.props;
    DEFCON5 && console.log("Will receive a new prop ");
    DEFCON5 && console.log(resetInitState);
    DEFCON5 && console.log(props.resetInitState);

    if (props.resetInitState !== resetInitState) {
      DEFCON5 && console.log("Initate stuff ");
      this.setState({ initSelection: this.state.orgSelection });
      this.setupData(this.state.pepTerms);
    }
  }

  setupData = (pepCountryTerms) => {
    let initSelection = [];
    let fixedCountries = [];

    const { pepcountrySelections } = this.props;
    DEFCON5 && console.log(" %%%%% Prepare data");
    DEFCON5 && console.log(pepCountryTerms);
    DEFCON5 && console.log(pepcountrySelections);

    pepCountryTerms.taxonomies.map((pepCountryTerms_item, index_outer) => {
      if (pepcountrySelections !== undefined) {
        pepcountrySelections.map((selection) => {
          DEFCON5 && console.log(selection.tid);
          DEFCON5 && console.log(pepCountryTerms_item.tid);

          if (
            selection.tid == pepCountryTerms_item.tid ||
            initSelection[index_outer]
          ) {
            initSelection[index_outer] = true;
          } else {
            initSelection[index_outer] = false;
          }
        });
      }
    });
    DEFCON5 && console.log("*** Data initated *** ");
    DEFCON5 && console.log("Data initated");
    DEFCON5 && console.log(initSelection);

    this.setState({
      currentSelection: initSelection,
      orgSelection: initSelection,
      dataSetUp: true,
      pepTerms: pepCountryTerms,
    });
    //this.setState(currentSelection: initSelection );
  };

  handleChange = () => (event) => {
    DEFCON5 && console.log("New event and current value is");
    DEFCON5 && console.log(event.target.name);
    DEFCON5 && console.log(event.target.value);
    let newSelection = this.state.currentSelection;
    newSelection[event.target.value] = newSelection[event.target.value]
      ? false
      : true;
    DEFCON5 && console.log("newSelection to set to state");
    DEFCON5 && console.log(newSelection);
    this.setState({ currentSelection: newSelection });
    this.saveData();
  };

  saveData = () => {
    const { currentSelection, pepTerms } = this.state;
    const { updateOrderStateJson } = this.props;
    DEFCON5 && console.log("<<<<<<<<< terms >>>>>>>>>>>><");
    DEFCON5 && console.log(pepTerms);

    var field_pep_countries_list = [];
    currentSelection.map((pepCountryTerms_item, index) => {
      if (pepCountryTerms_item) {
        field_pep_countries_list.push(pepTerms.taxonomies[index].name);
      }
    });
    DEFCON5 && console.log("PepCountries");
    DEFCON5 && console.log(field_pep_countries_list);
    updateOrderStateJson("field_pep_countries_list", field_pep_countries_list);
  };

  render() {
    const { classes, disabled } = this.props;

    // Check if data is defined and if not just return

    if (this.state.pepTerms.length == 0 || this.state.pepTerms == undefined) {
      DEFCON5 && console.log("Country Term still not popluated...");
      return "";
    }

    DEFCON5 && console.log("Listing all TERMS ***");
    DEFCON5 && console.log(this.state.pepTerms);
    DEFCON5 && console.log(this.state.orgSelection);

    var termrender = [];

    this.state.pepTerms.taxonomies.map((pepCountryTerms_item, index) => {
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
          label={pepCountryTerms_item.name}
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
        <FormGroup>{termrender}</FormGroup>
      </FormControl>
    );
  }
}
FieldPepCountry.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FieldPepCountry);
