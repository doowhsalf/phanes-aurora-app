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
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import i18n from "meteor/universe:i18n";
import FormGroup from "@mui/material/FormGroup";

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

class FieldCountryListSimple extends React.Component {
  constructor(props) {
    DEFCON5 && console.log("In FieldCountryListSimple...");
    super(props);
    this.state = {
      allItemsSelected: true,
    };
  }

  render() {
    const {
      classes,
      items,
      allItemsSelected,
      onItemClicked,
      onAllClicked,
      row,
    } = this.props;

    return (
      <div className={classes.root}>
        <FormGroup row={row}>
          <FormControlLabel
            control={
              <Checkbox
                checked={allItemsSelected}
                onChange={() => onAllClicked()}
                value={"ALL"}
              />
            }
            label={i18n.__("Entity_Label_FieldCountryListSimple_All")}
          />

          {items.map((item, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={!!items[index].selected}
                  onChange={() => onItemClicked(index)}
                  value={index.toString()}
                />
              }
              label={item.name}
            />
          ))}
        </FormGroup>
      </div>
    );
  }
}

FieldCountryListSimple.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array,
  onItemClicked: PropTypes.func.isRequired,
  allItemsSelected: PropTypes.bool.isRequired,
};

export default withStyles(styles)(FieldCountryListSimple);
