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

class FieldPersonRelation extends React.Component {
  constructor(props) {
    DEFCON5 && console.log("In FieldPersonRelation...");
    super(props);
    let item = { label: this.props.label, value: this.props.value };

    this.state = {
      open: false,
      dataSetUp: false,
      value: item,
      listRelationTerms: [],
    };
  }
  componentDidMount() {
    const { getTermsCallback } = this.props;
    getTermsCallback("relationtype", (error, result) => {
      if (error) {
        DEFCON5 && console.log("ERROR GETTING PersonRelation");
        DEFCON5 && console.log(error);
      } else {
        DEFCON5 && console.log("%%%%% Finaly received data...");
        DEFCON5 && console.log(result);

        let relationTerms = [];
        result.taxonomies.map((relation_item, index) => {
          let item = { label: "", value: null };
          item.label = relation_item.name;
          item.value = relation_item.tid;
          relationTerms.push(item);
        });
        DEFCON5 && console.log("relationTerms");
        DEFCON5 && console.log(relationTerms);
        this.setupData(relationTerms);
      }
    });
  }

  setupData = (relationTerms) => {
    this.setState({ listRelationTerms: relationTerms });
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
    handleUpdateField(fieldname, value);
  }

  render() {
    const { classes, theme, label, value, disabled, fieldname } = this.props;

    let inputProps = {
      readOnly: disabled,
    };

    if (
      this.state.listRelationTerms.length == 0 ||
      this.state.listRelationTerms == undefined
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
    DEFCON5 && console.log("ListItem Check");
    DEFCON5 && console.log(value);

    var listLabel = "";
    this.state.listRelationTerms.map((relation_item, index) => {
      DEFCON5 && console.log(relation_item);
      if (relation_item.value == value) {
        DEFCON5 && console.log("Yo");

        listLabel = relation_item.label;
      }
    });

    let item = { label: listLabel, value: value };

    // Check if data is defined and if not just return
    DEFCON5 && console.log("Listing all TERMS ***");
    DEFCON5 && console.log(this.state.listRelationTerms);

    return (
      <div className={classes.root}>
        <NoSsr>
          <Select
            classes={classes}
            options={this.state.listRelationTerms}
            components={components}
            isDisabled={disabled}
            value={item}
            onChange={this.handleChange(fieldname)}
            placeholder={i18n.__("Entity_Label_Search")}
            textFieldProps={{
              label: i18n.__("Entity_Label_Field_relation"),
              InputLabelProps: { shrink: true },
            }}
          />
        </NoSsr>
      </div>
    );
  }
}
FieldPersonRelation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FieldPersonRelation);
