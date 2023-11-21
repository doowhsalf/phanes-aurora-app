import React, { Fragment, useState } from "react";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1
} from "/debug.json";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import DateFnsUtils from "@date-io/date-fns";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { usePickerState, Calendar } from "@material-ui/pickers";
import { DatePicker } from "@material-ui/pickers";
import dateFormat from "dateformat";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { flexbox } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";

const styles = theme => ({
  container: {
    width: "100%"
  },
  hideThis: {
    display: "none"
  },
  button: {
    marginTop: theme.spacing(1)
  },
  textFieldYear: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 60
  },
  textFieldMonth: {
    marginRight: theme.spacing(1),
    width: 40
  },
  textFieldDay: {
    marginRight: theme.spacing(1),
    width: 40
  }
});

/**
 * Get the number of days in any particular month
 * @link https://stackoverflow.com/a/1433119/1293256
 * @param  {integer} m The month (valid: 0-11)
 * @param  {integer} y The year
 * @return {integer}   The number of days in the month
 */
var daysInMonth = function(m, y) {
  switch (m) {
    case 1:
      return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28;
    case 8:
    case 3:
    case 5:
    case 10:
      return 30;
    default:
      return 31;
  }
};

/**
 * Check if a date is valid
 * @link https://stackoverflow.com/a/1433119/1293256
 * @param  {[type]}  d The day
 * @param  {[type]}  m The month
 * @param  {[type]}  y The year
 * @return {Boolean}   Returns true if valid
 */
var isValidDate = function(d, m, y) {
  m = parseInt(m, 10) - 1;
  return m >= 0 && m < 12 && d > 0 && d <= daysInMonth(m, y);
};

class FieldDate extends React.Component {
  constructor(props) {
    DEFCON5 && console.log("In FieldDate...");
    super(props);
    const { value, valuePrecision } = this.props;
    DEFCON5 && console.log("*** Start value is");
    DEFCON5 && console.log(value);

    let dateView = [];
    let labelVariant = i18n.__("Label_variant_default");

    let setDateY = value == undefined ? null : value.substr(0, 4);
    let setDateM = value == undefined ? null : value.substr(5, 2);
    let setDateD = value == undefined ? null : value.substr(8, 2);
    let setDate = value == undefined ? null : value.substr(0, 10);

    this.state = {
      selectedDateY: setDateY,
      selectedDateM: setDateM,
      selectedDateD: setDateD,
      selectedDate: setDate,
      datePrecision: valuePrecision,
      isOpen: false,
      setIsOpen: false,
      dateView: dateView,
      labelVariant: labelVariant,
      dateErrorLabel: i18n.__("Label_date_error"),
      dateFormat: "yyyy-MM-dd"
    };
  }

  componentWillReceiveProps(props) {
    const { resetInitState } = this.props;
    DEFCON5 && console.log("Will receive a new prop ");
    DEFCON5 && console.log(resetInitState);
    if (props.resetInitState !== resetInitState) {
      const { value } = this.props;
      let setDate = value == undefined ? null : value.substr(0, 10);
      DEFCON5 && console.log("Initate stuff ");
      this.setState({ selectedDate: setDate });
    }
  }

  handleChange = name => event => {
    DEFCON5 && console.log(name);
    DEFCON5 && console.log(event.target.value);
    this.setState({ [name]: event.target.value });
    this.concatenateDate(name, event.target.value);
    //this.handleUpdateField(name, event.target.value);
  };

  splitDate = date => {
    DEFCON5 && console.log("splitDate");

    let setDateY = date == undefined ? null : date.substr(0, 4);
    let setDateM = date == undefined ? null : date.substr(5, 2);
    let setDateD = date == undefined ? null : date.substr(8, 2);
    this.setState({ selectedDateY: setDateY });
    this.setState({ selectedDateM: setDateM });
    this.setState({ selectedDateD: setDateD });
  };

  concatenateDate = (name, value) => {
    const { fieldname, dateposition } = this.props;

    DEFCON5 && console.log("concatenateDate");
    DEFCON5 && console.log(name);
    DEFCON5 && console.log(value);

    let y = name == "selectedDateY" ? value : this.state.selectedDateY;
    let m = name == "selectedDateM" ? value : this.state.selectedDateM;
    let d = name == "selectedDateD" ? value : this.state.selectedDateD;

    let dateStr = y + "-" + m + "-" + d;
    DEFCON5 && console.log(y);
    DEFCON5 && console.log(m);
    DEFCON5 && console.log(d);

    if (!d) {
      DEFCON5 && console.log("D is null");

      if (!m) {
        DEFCON5 && console.log("M is null");

        dateStr = y;
      } else {
        DEFCON5 && console.log("Do Y + M");

        dateStr = y + "-" + m;
      }
    }

    DEFCON5 && console.log(dateStr);

    this.setState({ selectedDate: dateStr });
    this.updateDate(fieldname, dateStr);
    this.setPrecision();
  };

  setPrecision = () => {
    const { handleUpdateField, fieldnamePrecision } = this.props;

    DEFCON5 && console.log("setPrecision");
    let precision = Constants.datePrecision.DAY;

    DEFCON5 && console.log("xxxx");

    precision =
      this.state.selectedDateD.length == 0
        ? Constants.datePrecision.MONTH
        : precision;
    precision =
      this.state.selectedDateM.length == 0
        ? Constants.datePrecision.YEAR
        : precision;

    DEFCON5 && console.log(precision);

    //handleUpdateField(fieldnamePrecision, precision);
  };

  handleDateChange = (date, value) => {
    const { fieldname, dateposition } = this.props;
    DEFCON5 && console.log("Handle date");
    DEFCON5 && console.log(fieldname);
    DEFCON5 && console.log("And date is now");
    DEFCON5 && console.log(date);
    DEFCON5 && console.log(value);

    if (date !== null) {
      if (date.toString().indexOf("Invalid")) {
        date = dateFormat(date, "yyyy-mm-dd");
        this.updateDate(fieldname, date);
        this.setState({ selectedDate: date });
        this.splitDate(date);
      } else {
      }
      DEFCON5 && console.log("Updated date");
      DEFCON5 && console.log(date);
    }

    //this.updateDate(fieldname, dateFormat(date, "yyyy-MM-dd"));
  };

  updateDate(fieldName, date) {
    const { handleUpdateField } = this.props;
    DEFCON5 &&
      console.log("**** Checking date - where is the change done ****");
    DEFCON5 && console.log(date);
    handleUpdateField(fieldName, date);
  }

  render() {
    const { classes, label, disabled, format } = this.props;
    const { selectedDateD, selectedDateM, selectedDateY } = this.state;

    let disableOpenOnEnter = true;
    var useFormat = format !== undefined ? format : "yyyy-MM-dd";
    DEFCON5 && console.log("Render stuff with view");
    DEFCON5 && console.log(this.state.dateView);

    return (
      <div>
        <div className={classes.container}>
          <TextField
            disabled={disabled}
            label={i18n.__("Label_variant_yy")}
            value={selectedDateY}
            className={classes.textFieldYear}
            placeholder="År"
            onChange={this.handleChange("selectedDateY")}
          />
          <TextField
            disabled={disabled}
            label={i18n.__("Label_variant_mm")}
            value={selectedDateM}
            className={classes.textFieldMonth}
            placeholder="Månad"
            onChange={this.handleChange("selectedDateM")}
          />
          <TextField
            disabled={disabled}
            label={i18n.__("Label_variant_dd")}
            value={selectedDateD}
            className={classes.textFieldDay}
            placeholder="Dag"
            onChange={this.handleChange("selectedDateD")}
          />
          <IconButton
            disabled={disabled}
            color="secondary"
            className={classes.button}
            aria-label="Add an alarm"
            onClick={() => this.setState({ isOpen: true })}
            size="large">
            <Icon>date_range</Icon>
          </IconButton>
        </div>
        <div>
          <DatePicker
            hidden
            autoOk
            open={this.state.isOpen}
            onOpen={() => this.setState({ isOpen: true })}
            onClose={() => this.setState({ isOpen: false })}
            disabled={disabled}
            value={this.state.selectedDate}
            minDate="1800-01-01"
            invalidDateMessage={this.state.dateErrorLabel}
            onChange={this.handleDateChange}
            format={"yyyy-MM-yy"}
            className={classes.hideThis}
          />
        </div>
      </div>
    );
  }

  renderDate() {}
}
FieldDate.propTypes = { classes: PropTypes.object.isRequired };
export default withStyles(styles)(FieldDate);

/*
    
    
    
    
    <TextField disabled={disabled} label={label} type="date" value={selectedDate} defaultValue="2017-05-24" className={classes.textField} onChange={this.handleChange} InputLabelProps={{
        shrink: true
      }}/>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>

      <DatePicker label={label} disabled={disabled} format="YYYY-MM-DD" placeholder="1946-02-03"
        // handle clearing outside => pass plain array if you are not controlling value outside
        mask={value => (
          value
          ? [
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            '-',
            /\d/,
            /\d/,
            '-',
            /\d/,
            /\d/
          ]
          : [])} value={selectedDate} onChange={this.handleDateChange} disableOpenOnEnter={disableOpenOnEnter} animateYearScrolling={false}/>
    </MuiPickersUtilsProvider>*/
