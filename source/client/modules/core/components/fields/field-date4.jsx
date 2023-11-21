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
import { Calendar } from '@material-ui/pickers'
import { DatePicker } from "material-ui-pickers";
import dateFormat from "dateformat";
import TextField from "@mui/material/TextField";

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200
    }
});

class FieldDate extends React.Component {
    constructor(props) {
        DEFCON5 && console.log("In FieldDate...");
        super(props);
        const { value } = this.props;
        DEFCON5 && console.log("*** Start value is");
        DEFCON5 && console.log(value);

        let dateView = [];
        let labelVariant = i18n.__("Label_variant_default");

        let setDate = value == undefined ? null : value.substr(0, 10);
        this.state = {
            selectedDateY: setDate,
            selectedDateM: setDate,
            selectedDateD: setDate,
            precisionDate: "u",
            dateView: dateView,
            labelVariant: labelVariant,
            dateErrorLabel: i18n.__("Label_date_error"),
            dateFormat: "yyyy-MM-dd"
        };
    }

    componentWillReceiveProps(props) {
        const { resetInitState } = this.props;
        DEFCON7 && console.log("Will receive a new prop ");
        DEFCON7 && console.log(resetInitState);
        if (props.resetInitState !== resetInitState) {
            const { value } = this.props;
            let setDate = value == undefined ? null : value.substr(0, 10);
            DEFCON7 && console.log("Initate stuff ");
            this.setState({ selectedDate: setDate });
        }
    }

    handleDateChange = (date, value) => {
        const { fieldname } = this.props;
        DEFCON5 && console.log("Handle date");
        DEFCON5 && console.log(fieldname);
        DEFCON5 && console.log("And date is now");
        DEFCON5 && console.log(date);
        DEFCON5 && console.log(value);
        let fixedValue = value.toString();
        DEFCON5 && console.log(fixedValue);
        DEFCON5 && console.log(fixedValue.indexOf("_"));

        if (fixedValue.indexOf("_") > 0) {
            var myValue = fixedValue.match(new RegExp("_", "g") || []).length;
        }
        myValue = myValue !== null ? myValue : 0;
        DEFCON5 && console.log(myValue);

        if (date !== null) {
            if (date.toString().indexOf("Invalid")) {
                date = dateFormat(date, "yyyy-mm-dd");
            } else {
            }
            DEFCON5 && console.log("Updated date");
            DEFCON5 && console.log(date);
            DEFCON5 && console.log("Date length");
            DEFCON5 && console.log(date.toString().length);

            this.updateDate(fieldname, date);

            if (myValue == 3 || myValue == 4) {
                DEFCON5 && console.log("Datestring is 3 or 4 (year+month)");

                let dateView = [];
                let dateViewElement = "year";
                dateView.push(dateViewElement);
                this.setState({ labelVariant: i18n.__("Label_variant_yy") });

                this.setState({ dateView: dateView });
            } else {
                if (myValue == 1 || myValue == 2) {
                    DEFCON5 && console.log("Datestring is 1 or 2 (year)");

                    let dateView = [];

                    let dateViewElement = "year";
                    dateView.push(dateViewElement);
                    dateViewElement = "month";
                    dateView.push(dateViewElement);
                    this.setState({ dateView: dateView });
                    this.setState({ labelVariant: i18n.__("Label_variant_yymm") });

                } else {
                    DEFCON5 && console.log("Date is ok");
                    this.setState({ labelVariant: i18n.__("Label_variant_default") });
                    let dateView = [];
                    this.setState({ dateView: dateView });
                }
            }
        }
        this.setState({ selectedDate: date });

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
            <Fragment>
                <TextField
                    disabled={disabled}
                    label={label}
                    value={selectedDateY}
                    className={classes.textField}
                    placeholder="År"
                />
                <TextField
                    disabled={disabled}
                    label={label}
                    value={selectedDateY}
                    className={classes.textField}
                    placeholder="Månad"
                />
                <TextField
                    disabled={disabled}
                    label={label}
                    value={selectedDateY}
                    className={classes.textField}
                    placeholder="Dag"
                />

                <Calendar
                    autoOk
                    label={label + " " + this.state.labelVariant}
                    disabled={disabled}
                    date={"2018-01-01"}

                    minDate="1800-01-01"
                    onChange={this.handleDateChange}
                    className={classes.textField}
                />
            </Fragment>
        );
    }

    renderDate() { }
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
