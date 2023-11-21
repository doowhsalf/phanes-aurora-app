import React from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { DEFCON5, DEFCON3 } from "/debug.json";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import { DatePicker } from "@material-ui/pickers";
import dateFormat from "dateformat";
import TextField from "@mui/material/TextField";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Constants from "/lib/constants";

const styles = (theme) => ({
  container: {
    width: "100%",
  },
  hideThis: {
    display: "none",
  },
  button: {
    marginTop: theme.spacing(1),
  },
  textFieldYear: {
    marginRight: theme.spacing(1),
    width: 60,
  },
  textFieldMonth: {
    marginRight: theme.spacing(1),
    width: 40,
  },
  textFieldDay: {
    marginRight: theme.spacing(1),
    width: 40,
  },
  label: {
    color: "grey",
  },
});

class FieldDate extends React.Component {
  constructor(props) {
    DEFCON3 && console.log("In FieldDate...");
    super(props);
    const { value, valuePrecision } = this.props;
    DEFCON3 && console.log("*** Start value is");
    DEFCON3 && console.log(value);

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
      orgValue: value,
      labelVariant: labelVariant,
      validationError: false,
      dateErrorLabel: i18n.__("Label_date_error"),
      dateFormat: "yyyy-MM-dd",
    };
  }

  componentWillReceiveProps(props) {
    const { resetInitState } = this.props;
    DEFCON3 && console.log("Will receive a new prop ");
    DEFCON3 && console.log(resetInitState);
    if (props.resetInitState !== resetInitState) {
      const { value } = this.props;

      let setDateY = value == undefined ? null : value.substr(0, 4);
      let setDateM = value == undefined ? null : value.substr(5, 2);
      let setDateD = value == undefined ? null : value.substr(8, 2);
      let setDate = value == undefined ? null : value.substr(0, 10);
      DEFCON3 && console.log("Initate stuff ");
      this.setState({
        selectedDate: setDate,
        selectedDateY: setDateY,
        selectedDateM: setDateM,
        selectedDateD: setDateD,
      });
    }
  }

  _fixZero(n) {
    // special case if the field is "", in that case the return shall be empty
    if (n == "") return n;
    return n.length > 1 ? "" + n : "0" + n;
  }

  handleChange = (name) => (event) => {
    DEFCON3 && console.log(name);
    DEFCON3 && console.log(event.target.value);

    // validate stuff
    this.setState({ [name]: event.target.value });

    if (!this.validateField(name, event.target.value)) {
      this.concatenateDate(name, event.target.value);
    }

    //this.handleUpdateField(name, event.target.value);
  };

  validateField(name, value) {
    let isError = false;
    DEFCON3 && console.log("Error check: " + name);
    DEFCON3 && console.log("Value check: " + value);
    var day = this.state.selectedDateD,
      month = this.state.selectedDateM,
      year = this.state.selectedDateY;

    if (name === "selectedDateY") {
      // do nada
    }

    if (value !== "") {
      if (name === "selectedDateM") {
        if (value < 1 || value > 12) {
          isError = true;
        } else {
          month = value;
        }
      }
      if (name === "selectedDateD") {
        if (value < 1 || value > 31) {
          isError = true;
        } else {
          day = value;
        }
      }
    }

    // check if date is ok if day field is set
    if (!isError) {
      DEFCON3 && console.log("Validate full date");

      isError = !this.isValidFullDate(year, month, day);
    }

    DEFCON3 && console.log("Error state: " + isError);
    this.setState({ validationError: isError });
    return isError;
  }

  xisValidFullDate() {
    let dateStr =
      this.state.selectedDateY +
      "-" +
      this.state.selectedDateM +
      "-" +
      this.state.selectedDateD;
    var d = new Date(dateStr);
    DEFCON3 && console.log("Fulldate check is: " + d.isValid());

    return d.isValid();
  }

  isValidFullDate(year, month, day) {
    const { allowEmpty, fulldate } = this.props;

    DEFCON3 && console.log("*** isValidFullDate check");
    var isValidDate = true;
    // var day = this.state.selectedDateD,
    //   month = this.state.selectedDateM,
    //   year = this.state.selectedDateY;

    DEFCON3 && console.log("Fields are");
    DEFCON3 && console.log(year);
    DEFCON3 && console.log(month);
    DEFCON3 && console.log(day);
    DEFCON3 && console.log(allowEmpty);

    if (allowEmpty) {
      if (year === "" && month === "" && day === "") {
        // if allowEmpty return ok if all fields are blank
        DEFCON3 &&
          console.log("*** Dates are empty and flas allowEmpty is set");

        return true;
      }
    }

    if (year !== "" && month !== "" && day !== "") {
      const date = new Date(Number(year), +Number(month) - 1, Number(day));
      isValidDate = Boolean(+date) && date.getDate() == day;
    } else {
      if (fulldate || (month === "" && day !== "")) {
        isValidDate = false;
      }
    }

    DEFCON3 && console.log("*** Check for date is " + isValidDate);
    return isValidDate;
  }

  splitDate = (date) => {
    DEFCON3 && console.log("splitDate");

    let setDateY = date == undefined ? null : date.substr(0, 4);
    let setDateM = date == undefined ? null : date.substr(5, 2);
    let setDateD = date == undefined ? null : date.substr(8, 2);
    this.setState({
      selectedDateY: setDateY,
      selectedDateM: setDateM,
      selectedDateD: setDateD,
    });
  };

  concatenateDate = (name, value) => {
    const { fieldname } = this.props;

    DEFCON3 && console.log("concatenateDate");
    DEFCON3 && console.log(name);
    DEFCON3 && console.log(value);

    let y = name == "selectedDateY" ? value : this.state.selectedDateY;
    let m = name == "selectedDateM" ? value : this.state.selectedDateM;
    let d = name == "selectedDateD" ? value : this.state.selectedDateD;

    let dateStr = y + "-" + this._fixZero(m) + "-" + this._fixZero(d);
    DEFCON3 && console.log(y);
    DEFCON3 && console.log(m);
    DEFCON3 && console.log(d);

    if (!d) {
      DEFCON3 && console.log("D is null");

      if (!m) {
        DEFCON3 && console.log("M is null");

        dateStr = y;
      } else {
        DEFCON3 && console.log("Do Y + M");
        dateStr = y + "-" + this._fixZero(m);
      }
    }

    if (!y) {
      DEFCON3 && console.log("y is null so set all values to blank");
      m = "";
      d = "";
      dateStr = "";
      this.setState({
        selectedDateY: "",
        selectedDateM: "",
        selectedDateD: "",
      });
    }
    DEFCON3 && console.log(dateStr);
    this.updateDate(fieldname, dateStr);
    this.setState({
      selectedDate: dateStr,
      validationError: !this.isValidFullDate(y, m, d),
    });
    this.setPrecision();
  };

  setPrecision = () => {
    DEFCON3 && console.log("setPrecision");
    let precision = Constants.datePrecision.DAY;

    DEFCON3 && console.log("xxxx");

    precision =
      this.state.selectedDateD.length == 0
        ? Constants.datePrecision.MONTH
        : precision;
    precision =
      this.state.selectedDateM.length == 0
        ? Constants.datePrecision.YEAR
        : precision;

    DEFCON3 && console.log(precision);

    //handleUpdateField(fieldnamePrecision, precision);
  };

  handleDateChange = (date, value) => {
    const { fieldname } = this.props;
    DEFCON3 && console.log("Handle date");
    DEFCON3 && console.log(fieldname);
    DEFCON3 && console.log("And date is now");
    DEFCON3 && console.log(date);
    DEFCON3 && console.log(value);

    if (date !== null) {
      if (date.toString().indexOf("Invalid") === -1) {
        date = dateFormat(date, "yyyy-mm-dd");
        this.updateDate(fieldname, date);
        this.setState({ selectedDate: date });
        this.splitDate(date);
      } else {
      }
      DEFCON3 && console.log("Updated date");
      DEFCON3 && console.log(date);
    }

    //this.updateDate(fieldname, dateFormat(date, "yyyy-MM-dd"));
  };

  updateDate(fieldName, date) {
    const { handleUpdateField, fulldate } = this.props;
    let dateIsOk = true;
    DEFCON3 && console.log("**** Checking date ");
    DEFCON3 && console.log(date);

    if (fulldate) {
      DEFCON3 && console.log("**** date must be a fulldate ");
      let setDateY = date == undefined ? null : date.substr(0, 4);
      let setDateM = date == undefined ? null : date.substr(5, 2);
      let setDateD = date == undefined ? null : date.substr(8, 2);
      if (this.isValidFullDate(setDateY, setDateM, setDateD)) {
        DEFCON3 && console.log("**** Checking date - and it seems ok ****");
      } else {
        dateIsOk = false;
      }
    }
    if (dateIsOk) {
      DEFCON3 && console.log("**** Date is updated and is ok ****");
      DEFCON3 && console.log(date);
      handleUpdateField(fieldName, date);
    } else {
      DEFCON3 && console.log("**** Date has an error due to validation ****");
      handleUpdateField(fieldName, null);
    }
  }

  render() {
    const { classes, disabled, label, error } = this.props;
    const { selectedDateD, selectedDateM, selectedDateY } = this.state;

    DEFCON3 && console.log("Render stuff with view");
    DEFCON3 && console.log(this.state.dateView);

    return (
      <div>
        <div className={classes.container}>
          <Typography className={classes.label} display="block" variant="body1">
            {label}
          </Typography>
          <TextField
            error={error ? error : this.state.validationError}
            disabled={disabled}
            label={i18n.__("Label_variant_yy")}
            value={selectedDateY}
            className={classes.textFieldYear}
            placeholder="År"
            type="number"
            InputProps={{ inputProps: { min: 1900, max: 2030 } }}
            maxLength={4}
            onChange={this.handleChange("selectedDateY")}
          />
          <TextField
            error={error ? error : this.state.validationError}
            disabled={disabled}
            label={i18n.__("Label_variant_mm")}
            value={selectedDateM}
            maxLength={2}
            InputProps={{ inputProps: { min: 1, max: 12 } }}
            type="number"
            className={classes.textFieldMonth}
            placeholder="Månad"
            onChange={this.handleChange("selectedDateM")}
          />
          <TextField
            error={error ? error : this.state.validationError}
            disabled={disabled}
            label={i18n.__("Label_variant_dd")}
            value={selectedDateD}
            maxLength={2}
            InputProps={{ inputProps: { min: 1, max: 31 } }}
            type="number"
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
