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
    zIndex: 1000,
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

class FieldRoleDescription extends React.Component {
  constructor(props) {
    DEFCON9 && console.log("In FieldDetailedRoleCategories...");
    super(props);
    let item = { label: this.props.fieldLabel, value: this.props.value };
    let drcTerms = [];
    drcTerms.push(item);
    this.state = {
      open: false,
      dataSetUp: false,
      value: item,
      listDrcTerms: drcTerms,
    };
  }
  query = (name) => (event) => {
    const { queryTermsCallback } = this.props;
    DEFCON7 && console.log("New query...");
    DEFCON7 && console.log(name);
    DEFCON7 && console.log(event.target.value);
    var myValue = event.target.value;
    DEFCON7 && console.log(event.target.value.length);
    if (event.target.value.length > 3) {
      queryTermsCallback(
        "role_description_type",
        event.target.value,
        (error, result) => {
          if (error) {
            DEFCON7 && console.log("ERROR GETTING DetailedRoleCategories");
            DEFCON7 && console.log(error);
          } else {
            DEFCON7 &&
              console.log("%%%%% queryTermsCallback Finaly received data...");
            DEFCON7 && console.log(result);
            let drcterms = [];
            if (result.taxonomies == undefined) {
              let item = { label: myValue, value: myValue };
              drcterms.push(item);
            } else {
              result.taxonomies.map(
                (detailedRoleCategoriesTerms_item, index) => {
                  let item = { label: "", value: null };
                  item.label = detailedRoleCategoriesTerms_item.name;
                  item.value = detailedRoleCategoriesTerms_item.name;
                  drcterms.push(item);
                }
              );
            }
            DEFCON9 && console.log("drcterms");
            DEFCON9 && console.log(drcterms);
            this.setupData(drcterms);
          }
        }
      );
    }
  };

  setupData = (drcterms) => {
    this.setState({ listDrcTerms: drcterms });
  };

  handleChange = (name) => (value) => {
    DEFCON7 && console.log("Field update");
    DEFCON7 && console.log(name);
    DEFCON7 && console.log(value.value);
    //this.query(value);
    this.setState({ value: value });
    this.updateEntity(name, value.value);
  };

  updateEntity(fieldname, value) {
    const { handleUpdateField } = this.props;
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
      DEFCON7 && console.log("No terms yet...");
    }

    const selectStyles = {
      input: (base) => ({
        ...base,
        color: theme.palette.text.primary,
        "& input": { font: "inherit" },
      }),
    };

    // Check if data is defined and if not just return
    DEFCON9 && console.log("Listing all TERMS ***");
    DEFCON9 && console.log(this.state.listDrcTerms);

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
              label: i18n.__("Entity_Label_Role_description_type"),
              InputLabelProps: { shrink: true },
              onChange: this.query(fieldname),
            }}
          />
        </NoSsr>
      </div>
    );
  }
}
FieldRoleDescription.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FieldRoleDescription);
