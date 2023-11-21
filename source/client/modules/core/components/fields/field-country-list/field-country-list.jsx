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
import { emphasize } from "@mui/material/styles";
import withStyles from '@mui/styles/withStyles';
import Select from "react-select";
import Typography from "@mui/material/Typography";
import NoSsr from "@mui/material/NoSsr";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import CancelIcon from "@mui/icons-material/Cancel";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(2),
  },
  input: {
    display: "flex",
    paddingBottom: theme.spacing(1),
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
  },

  noOptionsMessage: {
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: "absolute",
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: "absolute",
    zIndex: 100030,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing(2),
  },
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

class FieldCountryList extends React.Component {
  constructor(props) {
    DEFCON5 && console.log("In FieldCountryList...");
    super(props);
    let item = { label: this.props.fieldLabel, value: this.props.value };
    DEFCON5 && console.log(item);
    DEFCON5 && console.log(this.props.value);

    this.state = {
      open: false,
      dataSetUp: false,
      value: item,
      listDrcTerms: [],
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
        let drcterms = [];
        result.taxonomies.map((termItem, index) => {
          let item = {
            label: "",
            value: null,
          };
          item.label = termItem.name;
          item.value = termItem.tid;
          drcterms.push(item);
        });
        DEFCON5 && console.log("drcterms");
        DEFCON5 && console.log(drcterms);
        this.setupData(drcterms);
      }
    });
  }

  oldcomponentDidMount() {
    const { getTermsCallback } = this.props;
    getTermsCallback("detailedrolecategories", (error, result) => {
      if (error) {
        DEFCON5 && console.log("ERROR GETTING CountryList");
        DEFCON5 && console.log(error);
      } else {
        DEFCON5 && console.log("%%%%% Finaly received data...");
        DEFCON5 && console.log(result);

        let drcterms = [];
        result.taxonomies.map((termItem, index) => {
          let item = {
            label: "",
            value: null,
          };
          item.label = termItem.name;
          item.value = termItem.tid;
          drcterms.push(item);
        });
        DEFCON5 && console.log("drcterms");
        DEFCON5 && console.log(drcterms);
        this.setupData(drcterms);
      }
    });
  }

  setupData = (drcterms) => {
    this.setState({ listDrcTerms: drcterms });
  };

  handleChange = (name) => (value) => {
    DEFCON5 && console.log("Field update");
    DEFCON5 && console.log(name);
    DEFCON5 && console.log(value.value);
    this.setState({ value: value });
    this.updateEntity(name, value.value);
  };

  updateEntity(fieldname, value) {
    const { handleUpdateField } = this.props;
    DEFCON5 && console.log(value);
    handleUpdateField(fieldname, value);
  }

  render() {
    const { classes, theme, label, disabled, fieldname } = this.props;

    let inputProps = {
      readOnly: disabled,
    };

    if (
      this.state.listDrcTerms.length == 0 ||
      this.state.listDrcTerms == undefined
    ) {
      DEFCON5 && console.log("No terms yet...");
      return "";
    }

    const selectStyles = {
      input: (base) => ({
        ...base,
        color: theme.palette.text.primary,
        "& input": { font: "inherit" },
      }),
    };

    // Check if data is defined and if not just return
    DEFCON5 && console.log("Listing all TERMS ***");
    DEFCON5 && console.log(this.state.listDrcTerms);

    return (
      <div className={classes.root}>
        <NoSsr>
          <Select
            classes={classes}
            options={this.state.listDrcTerms}
            components={components}
            isDisabled={disabled}
            value={this.state.value}
            onChange={this.handleChange(fieldname)}
            placeholder={i18n.__("Entity_Label_Search")}
            InputProps={inputProps}
            textFieldProps={{
              label: label,
              InputLabelProps: { shrink: true },
            }}
          />
        </NoSsr>
      </div>
    );
  }
}
FieldCountryList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FieldCountryList);
