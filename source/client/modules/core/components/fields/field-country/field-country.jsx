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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

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
  formControl: {
    marginTop: theme.spacing(2),
  },
});

class FieldCountry extends React.Component {
  constructor(props) {
    DEFCON5 && console.log("In FieldCountry...");
    super(props);

    this.state = {
      open: false,
      dataSetUp: false,
      currentSelection: [],
      countryTerms: [],
      orgSelection: [],
    };
  }
  componentDidMount() {
    const { queryTermsCountry, dataSegment } = this.props;
    DEFCON5 && console.log("In Getting Country");
    DEFCON5 && console.log(dataSegment);
    queryTermsCountry(dataSegment, (error, result) => {
      if (error) {
        DEFCON5 && console.log("ERROR - Country list");
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
    if (props.resetInitState !== resetInitState) {
      DEFCON5 && console.log("Initate stuff ");
      this.setState({ initSelection: this.state.orgSelection });
      this.setupData(this.state.countryTerms);
    }
  }

  setupData = (countryTerms) => {
    let initSelection = [];
    const { countrySelections } = this.props;
    DEFCON5 && console.log("Country Selections - Prepare data");
    DEFCON5 && console.log(countryTerms);
    DEFCON5 && console.log(countrySelections);
    //TODO: This is a fix since we are moveing to version 2 of the country type
    if (countrySelections == undefined) {
      var countrySelections2 = [];
      let item = {
        tid: 10452,
      };
      countrySelections2.push(item);
    }

    countryTerms.taxonomies.map((countryTerms_item, index_outer) => {
      if (countrySelections == undefined) {
        countrySelections2.map((selection) => {
          DEFCON5 && console.log(selection.tid);
          DEFCON5 && console.log(countryTerms_item.tid);

          if (
            selection.tid == countryTerms_item.tid ||
            initSelection[index_outer]
          ) {
            initSelection[index_outer] = true;
          } else {
            initSelection[index_outer] = false;
          }
        });
      } else {
        countrySelections.map((selection) => {
          DEFCON5 && console.log(selection.tid);
          DEFCON5 && console.log(countryTerms_item.tid);

          if (
            selection.tid == countryTerms_item.tid ||
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
      countryTerms: countryTerms,
    });
    //this.setState(currentSelection: initSelection );
  };

  handleChangeSingle = () => (event) => {
    DEFCON5 && console.log("New event and current value is");
    DEFCON5 && console.log(event.target.name);
    DEFCON5 && console.log(event.target.value);
    let newSelection = [];
    newSelection[event.target.value] = newSelection[event.target.value]
      ? false
      : true;
    DEFCON5 && console.log("newSelection to set to state");
    DEFCON5 && console.log(newSelection);
    this.setState({ currentSelection: newSelection });
    this.saveData(newSelection);
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
    this.saveData(newSelection);
  };

  saveData = (newSelection) => {
    const { currentSelection, countryTerms } = this.state;
    const { updateOrderStateJson, countrySelection, fieldname } = this.props;
    DEFCON5 && console.log("<<<<<<<<< terms >>>>>>>>>>>><");
    DEFCON5 && console.log(countryTerms);

    var field_countries_list = [];
    newSelection.map((countryTerms_item, index) => {
      if (countryTerms_item) {
        field_countries_list.push(countryTerms.taxonomies[index].tid);
      }
    });
    DEFCON5 && console.log("Countries");
    DEFCON5 && console.log(field_countries_list);
    updateOrderStateJson(fieldname, field_countries_list);
  };

  render() {
    const { classes, disabled, label } = this.props;

    // Check if data is defined and if not just return

    if (
      this.state.countryTerms.length == 0 ||
      this.state.countryTerms == undefined
    ) {
      DEFCON5 && console.log("Country Term still not popluated...");
      return "";
    }

    DEFCON5 && console.log("Listing all TERMS ***");
    DEFCON5 && console.log(this.state.countryTerms);

    return this.renderSingle();
  }

  renderSingle() {
    const { classes, disabled, label } = this.props;
    var termrender = [];

    this.state.countryTerms.taxonomies.map((countryTerms_item, index) => {
      DEFCON5 && console.log("Getting the index");
      DEFCON5 && console.log(index);

      let newtermrender = [
        <FormControlLabel
          key={index}
          value={index.toString()}
          control={<Radio checked={this.state.currentSelection[index]} />}
          label={countryTerms_item.name}
          onChange={this.handleChangeSingle(index)}
        />,
      ];
      termrender.push(newtermrender);
    });

    let renderSingle = [
      <FormControl
        key="renderSingle"
        label={label}
        disabled={disabled}
        component="fieldset"
        className={classes.formControl}
      >
        <RadioGroup
          row
          aria-label="country"
          className={classes.group}
          value={this.state.value}
        >
          {termrender}
        </RadioGroup>
      </FormControl>,
    ];
    return renderSingle;
  }

  renderMulti() {
    const { classes, disabled, label } = this.props;

    var termrender = [];

    this.state.countryTerms.taxonomies.map((countryTerms_item, index) => {
      DEFCON5 && console.log("Getting the index");
      DEFCON5 && console.log(index);

      let newtermrender = [
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              checked={this.state.currentSelection[index]}
              onChange={this.handleChangeSingle(index)}
              value={index.toString()}
            />
          }
          label={countryTerms_item.name}
        />,
      ];
      termrender.push(newtermrender);
    });

    let renderMulti = [
      <FormControl
        disabled={disabled}
        component={"fieldset"}
        label={label}
        className={classes.formControl}
      >
        <FormLabel component={"legend"}>{label}</FormLabel>
        <FormGroup key="countryitem" row>
          {termrender}
        </FormGroup>
      </FormControl>,
    ];

    return renderMulti;
  }
}
FieldCountry.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FieldCountry);
