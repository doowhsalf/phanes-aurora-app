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
import classNames from "classnames";
import update from "immutability-helper";
import MuiDialogTitle from "@mui/material/DialogTitle";

import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpIcon from "@mui/icons-material/HelpTwoTone";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FieldCheckbox from "../fields/field-checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FieldPepCountryList from "../fields/field-country-list/field-country-list-simple";
import ClientSearchResults from "./clientsearchresults";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import CloseIcon from "@mui/icons-material/Close";
import ClientSearchDetails from "./clientsearchdetails";
import Slide from "@mui/material/Slide";
import InputMask from "react-input-mask";
import FormGroup from "@mui/material/FormGroup";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import SnackBarMessage from "../fields/snackbar-message";
import DebouncedTextField from "../fields/debouncedtextfield";
import HelpDialog from "./HelpDialog";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import clsx from "clsx";
import { _fixZero } from "../helpers/date-helpers";
import MaskedInput from "react-text-mask";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import ArrowLeft from "@mui/icons-material/ArrowLeft";

import { red, green } from '@mui/material/colors';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  inline: {
    display: "inline",
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  paper: {
    paddingLeft: "20%",
    paddingRight: "20%",
    textAlign: "left",
    color: theme.palette.text.secondary,
    minHeight: 300,
    minWidth: 500,
  },
  card: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  row: {
    display: "flex",
    justifyContent: "marginLeft",
  },
  title: {
    marginRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  formItem: {
    marginRight: theme.spacing(2),
  },
  textField: {
    marginRight: theme.spacing(1),
    width: 200,
  },
  textFieldSSN: {
    marginRight: theme.spacing(1),
    width: 200,
    display: "block",
  },
  textFieldDate: {
    marginRight: theme.spacing(1),
    width: 50,
  },
  dense: {
    marginTop: 19,
  },
  header: {
    paddingTop: theme.spacing(2),
  },
  checkboxPEPRCA: {
    marginLeft: -theme.spacing(1),
  },
  buttonsExtra: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  buttonWrapper: {
    margin: theme.spacing(0),
    position: "relative",
    float: "right",
    top: -40,
    left: 10,
  },
  buttonStandard: {
    marginLeft: theme.spacing(2),
    float: "right",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  buttonWrapperCancel: {
    margin: theme.spacing(0),
    position: "relative",
    float: "right",
    top: -40,
    left: -5,
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  button: {},
  helpWanted: {
    Color: red[400],
  },
  dialogTitle: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  floatRight: {
    float: "right",
  },
});

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

const initialState = {
  searchResults: { list: [] },
  firstName: "",
  lastName: "",
  ssnNumber: "",
  year: "",
  month: "",
  day: "",
  age: "",
  multiline: "Controlled",
  currency: "EUR",
  allCountriesSelected: true,
  field_pep: true,
  field_rca: true,
  selectedPerson: null,
  relatedPersonStack: [],
  success: false,
  loading: false,
  helpClickedState: false,
  openSnackbar: false,
  errorSnackbar: false,
  validationErrorSnackbar: false,
  validationErrors: {},
  expanded: false,
  noResult: false,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle
      disableTypography
      className={classes.dialogTitle}
      {...other}
    >
      <Typography variant="h5">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
          size="large">
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

class ClientSearch extends React.Component {
  constructor(props) {
    DEFCON7 && console.log("In FieldDateTextfield...");
    super(props);
    this.state = initialState;
    this.state["searchCounter"] = 0;
    let countriesObjects = [];

    if (
      props.countries &&
      Array.isArray(props.countries) &&
      props.countries.length !== 0
    ) {
      countriesObjects = props.countries.map((c) => ({
        name: c.name,
        selected: true,
      }));
    }
    //fallback:
    else {
      DEFCON1 &&
        console.log("ClientSearch countries not retrieved properly!!!");
      countriesObjects = [
        { name: "Finland", selected: true },
        { name: "Norge", selected: true },
        { name: "Sverige", selected: true },
        { name: "Danmark", selected: true },
      ];
    }
    this.state["field_pep_countries_list"] = countriesObjects;
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value, success: false });
  };

  handleDebouncedChange = (name, value) => {
    // // Fix leading zero in month and day
    // let fieldValue = value;
    // switch (name) {
    //   case "month":
    //   case "year":
    //     fieldValue = _fixZero(fieldValue);
    //     break;

    //   default:
    //     break;
    // }

    this.setState({ [name]: value, success: true });
  };

  onKeyDown = (event) => {
    DEFCON7 && console.log("onKeyDown");
    if (event.keyCode === 13) {
      DEFCON5 && console.log("Pressed the Enter button");
      this.handleButtonClick();
    }
  };

  onFind = (error, results) => {
    DEFCON3 && console.log("Query:");
    DEFCON3 && console.log(this.state);
    DEFCON3 && console.log("New search results:");
    DEFCON3 && console.log(results);

    this.setState({
      loading: false,
      success: true,
      searchResults: results,
      openSnackbar: results.list.length == 0,
      noResult: results.list.length == 0,
    });
  };

  handleSnackbarClose = () => {
    this.setState({
      openSnackbar: false,
      errorSnackbar: false,
    });
  };

  handleButtonClick = () => {
    if (!this.state.loading) {
      const query = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        ssnNumber: this.state.ssnNumber,
        year: this.state.year,
        month: _fixZero(this.state.month),
        day: _fixZero(this.state.day),
        field_pep_countries_list: this.state.field_pep_countries_list,
        field_pep: this.state.field_pep,
        field_rca: this.state.field_rca,
      };

      const validationErrors = this.getQueryValidationErrors(query);

      if (validationErrors === null) {
        DEFCON5 && console.log("Start loading...");
        this.props.findPerson(query, this.onFind);
      } else {
        DEFCON5 && console.log("Validation errors...");
        DEFCON5 && console.log(validationErrors);
      }

      this.setState({
        success: false,
        month: _fixZero(this.state.month),
        day: _fixZero(this.state.day),
        loading: validationErrors === null,
        validationErrors,
      });
    }
  };

  handleClearButtonClick = () => {
    let newState = initialState;
    newState["searchCounter"] = this.state.searchCounter + 1;
    this.setState(newState);
  };

  getQueryValidationErrors = (query) => {
    let validationErrors = null;

    if (!query) {
      validationErrors = {};
      validationErrors["firstName"] = i18n.__(
        "Entity_Validation_MandatoryField"
      );
      validationErrors["lastName"] = i18n.__(
        "Entity_Validation_MandatoryField"
      );
      validationErrors["ssnNumber"] = i18n.__(
        "Entity_Validation_MandatoryField"
      );
    }

    if (!query.ssnNumber) {
      if (!query.firstName || query.firstName.trim() === "") {
        if (validationErrors === null) {
          validationErrors = {};
        }
        validationErrors["firstName"] = i18n.__(
          "Entity_Validation_MandatoryField"
        );
      }

      if (!query.lastName || query.lastName.trim() === "") {
        if (validationErrors === null) {
          validationErrors = {};
        }
        validationErrors["lastName"] = i18n.__(
          "Entity_Validation_MandatoryField"
        );
      }
    }

    return validationErrors;
  };

  selectPerson = (person) => {
    this.setState((state) => {
      const relatedPersonStack = [person];
      return { relatedPersonStack, selectedPerson: person };
    });
  };

  close = () => {
    this.setState({
      selectedPerson: null,
      relatedPersonStack: [],
    });
  };

  countrySelected = (index) => {
    const currentValue = this.state.field_pep_countries_list[index];
    const newState = update(this.state, {
      field_pep_countries_list: {
        [index]: {
          $set: { name: currentValue.name, selected: !currentValue.selected },
        },
      },
    });
    this.setState((state) => newState);
  };

  allCountriesSelected = () => {
    this.setState({
      ...this.state,
      field_pep_countries_list: this.state.field_pep_countries_list.map(
        (item) => ({
          ...item,
          name: item.name,
          selected: !this.state.allCountriesSelected,
        })
      ),
      allCountriesSelected: !this.state.allCountriesSelected,
    });
  };

  helpClicked = () => {
    this.setState({ helpClickedState: true });
  };

  helpClickedClose = () => {
    this.setState({ helpClickedState: false });
  };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  popRelatedPersonStack = () => {
    DEFCON3 && console.log("Navigating back...");
    const lastIndex = this.state.relatedPersonStack.length - 1;
    DEFCON3 && console.log("Index " + lastIndex);

    const selectedPerson = this.state.relatedPersonStack[lastIndex - 1];
    const relatedPersonStack = this.state.relatedPersonStack.filter(
      (_, i) => i !== lastIndex
    );
    DEFCON3 && console.log(relatedPersonStack);
    DEFCON3 && console.log(selectedPerson);

    this.setState({
      relatedPersonStack: relatedPersonStack,
      selectedPerson: selectedPerson,
    });
  };

  render() {
    const { classes, getArticle } = this.props;
    let inputProps = { readOnly: true };
    const buttonClassname = classNames({
      [classes.buttonSuccess]: this.state.success,
    });

    const { validationErrors } = this.state;
    return (
      <div style={{ marginTop: 74 }}>
        <div className={classes.root}>
          <Grid container={true} spacing={2}>
            <Grid item={true} xs={12} sm={12} md={12} lg={12}>
              <Card className={classes.paper}>
                <CardHeader
                  action={
                    <IconButton onClick={this.helpClicked} size="large">
                      <HelpIcon className={classes.helpWanted} />
                    </IconButton>
                  }
                  title={i18n.__("Entity_Label_SearchPerson")}
                />
                <CardContent>
                  <Grid container={true} spacing={1}>
                    <Grid item={true} key={this.state.searchCounter}>
                      {/* <Typography variant="h5">
                        {i18n.__("Entity_Label_NameValues")}
                      </Typography> */}
                      <FormGroup row>
                        <DebouncedTextField
                          id="first-name"
                          label={i18n.__("Entity_Label_SearchPerson_Firstname")}
                          className={classes.textField}
                          value={this.state.firstName}
                          onChange={(value) =>
                            this.handleDebouncedChange("firstName", value)
                          }
                          helperText={i18n.__("Entity_Label_Mandatory")}
                          onKeyDown={this.onKeyDown}
                          error={
                            validationErrors && !!validationErrors["firstName"]
                          }
                        />
                        <DebouncedTextField
                          id="last-name"
                          label={i18n.__("Entity_Label_SearchPerson_Lastname")}
                          className={classes.textField}
                          value={this.state.lastName}
                          onChange={(value) =>
                            this.handleDebouncedChange("lastName", value)
                          }
                          helperText={i18n.__("Entity_Label_Mandatory")}
                          onKeyDown={this.onKeyDown}
                          error={
                            validationErrors && !!validationErrors["lastName"]
                          }
                        />
                        <FormControl className={classes.formControl}>
                          <InputLabel htmlFor="formatted-text-mask-input">
                            {i18n.__("Entity_List_SSN")}
                          </InputLabel>
                          <Input
                            value={this.state.ssnNumber}
                            onChange={this.handleChange("ssnNumber")}
                            id="ssnNumber"
                            inputComponent={TextMaskCustom}
                            onKeyDown={this.onKeyDown}
                          />
                        </FormControl>
                        {/* <MaskedInput
                          mask="99999999-9999"
                          maskChar=" "
                          value={this.state.ssnNumber}
                          onChange={this.handleChange("ssnNumber")}
                          disabled={false}
                          error={
                            validationErrors && !!validationErrors["ssnNumber"]
                          }
                        >
                          {() => (
                            <TextField
                              id="ssnNumber"
                              label={i18n.__("Entity_List_SSN")}
                              className={classes.textFieldSSN}
                              onKeyDown={this.onKeyDown}
                              helperText="yyyymmdd"
                            />
                          )}
                        </MaskedInput> */}
                      </FormGroup>
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider variant="fullWidth" />
                <CardActions disableSpacing>
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: this.state.expanded,
                    })}
                    onClick={this.handleExpandClick}
                    aria-expanded={this.state.expanded}
                    aria-label="show more"
                    size="large">
                    <ExpandMoreIcon />
                  </IconButton>
                  <div className={classes.floatRight}>
                    <Typography>{i18n.__("Label_Button_Filter")}</Typography>
                  </div>
                </CardActions>
                <div className={classes.floatRight}>
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.buttonStandard}
                    onClick={this.handleButtonClick}
                  >
                    {i18n.__("Label_Button_Search")}

                    {this.state.success ? <CheckIcon /> : <SearchIcon />}
                  </Button>
                  {!this.state.success ? (
                    ""
                  ) : (
                    <Button
                      variant="outlined"
                      className={classes.buttonStandard}
                      onClick={this.handleClearButtonClick}
                    >
                      {i18n.__("Label_Button_Clear")}

                      <ClearIcon />
                    </Button>
                  )}
                </div>

                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <FormGroup row>
                      <Grid item={true} xs={12} sm={12} md={4} lg={4}>
                        <Typography variant="h5">
                          {i18n.__("Entity_List_BirthDate")}
                        </Typography>
                        <DebouncedTextField
                          id="year"
                          label={i18n.__("Entity_Label_SearchPerson_Year")}
                          className={classes.textFieldDate}
                          value={this.state.year}
                          onChange={(value) =>
                            this.handleDebouncedChange("year", value)
                          }
                          onKeyDown={this.onKeyDown}
                        />
                        <DebouncedTextField
                          id="month"
                          label={i18n.__("Entity_Label_SearchPerson_Month")}
                          className={classes.textFieldDate}
                          value={this.state.month}
                          onChange={(value) =>
                            this.handleDebouncedChange("month", value)
                          }
                          onKeyDown={this.onKeyDown}
                        />
                        <DebouncedTextField
                          id="day"
                          label={i18n.__("Entity_Label_SearchPerson_Day")}
                          className={classes.textFieldDate}
                          value={this.state.day}
                          onChange={(value) =>
                            this.handleDebouncedChange("day", value)
                          }
                          onKeyDown={this.onKeyDown}
                        />
                      </Grid>
                      <Grid item={true} xs={12} sm={12} md={4} lg={4}>
                        <Typography variant="h5">
                          {i18n.__("Entity_Label_PEPRCA")}
                        </Typography>
                        <FormGroup className={classes.checkboxPEPRCA}>
                          <FormControlLabel
                            control={
                              <FieldCheckbox
                                resetInitState={this.state.resetInitState}
                                fieldname={"field_pep"}
                                value={this.state.field_pep}
                                handleUpdateField={(fieldName, value) =>
                                  this.setState({ [fieldName]: value })
                                }
                              />
                            }
                            label={i18n.__("Entity_Label_Field_pep")}
                            inputprops={inputProps}
                          />
                          <FormControlLabel
                            control={
                              <FieldCheckbox
                                resetInitState={this.state.resetInitState}
                                fieldname={"field_rca"}
                                value={this.state.field_rca}
                                handleUpdateField={(fieldName, value) =>
                                  this.setState({ [fieldName]: value })
                                }
                              />
                            }
                            label={i18n.__("Entity_Label_Field_rca")}
                            inputprops={inputProps}
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item={true} xs={12} sm={12} md={4} lg={4}>
                        <Typography variant="h5">
                          {i18n.__("Entity_Label_SelectListCountries")}
                        </Typography>
                        <FormGroup>
                          <FieldPepCountryList
                            items={this.state.field_pep_countries_list}
                            allItemsSelected={this.state.allCountriesSelected}
                            onItemClicked={(index) =>
                              this.countrySelected(index)
                            }
                            onAllClicked={() => this.allCountriesSelected()}
                          />
                        </FormGroup>
                      </Grid>
                    </FormGroup>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
            {/* <Grid item={true} xs={12} sm={12} md={12} lg={12}>
              <div className={classes.buttonWrapper}>
                <Fab
                  color="primary"
                  className={buttonClassname}
                  onClick={this.handleButtonClick}
                >
                  {this.state.success ? <CheckIcon /> : <SearchIcon />}
                </Fab>
                {this.state.loading && (
                  <CircularProgress size={68} className={classes.fabProgress} />
                )}
              </div>
              <div className={classes.buttonWrapperCancel}>
                <Fab
                  className={buttonClassname}
                  onClick={this.handleClearButtonClick}
                >
                  <ClearIcon />
                </Fab>
              </div>
            </Grid> */}
            <Grid item={true} xs={12} sm={12} md={12} lg={12}>
              <ClientSearchResults
                className={classes.paper}
                selectPerson={this.selectPerson}
                results={this.state.searchResults}
                noResult={this.state.noResult}
              />
            </Grid>
          </Grid>
          <Dialog
            maxWidth={"xl"}
            fullWidth={true}
            open={this.state.selectedPerson != null}
            onClose={() => this.setState({ selectedPerson: null })}
            TransitionComponent={Transition}
          >
            <DialogTitle id="customized-dialog-title" onClose={this.close}>
              {this.renderDialogTitle(this.state.selectedPerson)}
            </DialogTitle>
            <DialogContent dividers>
              <ClientSearchDetails
                person={this.state.selectedPerson}
                closeDetails={() =>
                  this.setState({
                    selectedPerson: null,
                    relatedPersonStack: [],
                  })
                }
                selectRelatedPerson={(person) => {
                  DEFCON5 && console.log("Selecting related person");
                  DEFCON5 && console.log(person);
                  this.setState((state) => {
                    const relatedPersonStack = [
                      ...state.relatedPersonStack,
                      person,
                    ];
                    return { relatedPersonStack, selectedPerson: person };
                  });
                }}
                popRelatedPersonStack={() => {
                  this.setState((state) => {
                    const lastIndex = state.relatedPersonStack.length - 1;
                    if (lastIndex === 0) {
                      return state;
                    }
                    const selectedPerson =
                      state.relatedPersonStack[lastIndex - 1];
                    const relatedPersonStack = state.relatedPersonStack.filter(
                      (_, i) => i !== lastIndex
                    );

                    return { relatedPersonStack, selectedPerson };
                  });
                }}
              />
            </DialogContent>
            <DialogActions>
              {this.state.relatedPersonStack.length - 1 > 0 ? (
                <Button
                  variant="outlined"
                  className={classes.buttonLeft}
                  onClick={() => {
                    this.popRelatedPersonStack();
                  }}
                >
                  <ArrowLeft
                    className={clsx(classes.leftIcon, classes.iconSmall)}
                  />
                  {i18n.__("Entity_Label_Button_Back")}
                </Button>
              ) : (
                ""
              )}
              <Button
                variant="outlined"
                color="primary"
                className={classes.buttonRight}
                onClick={() => {
                  this.close();
                }}
              >
                {i18n.__("Label_Button_OK")}
                <CloseIcon
                  className={clsx(classes.leftIcon, classes.iconSmall)}
                />
              </Button>
            </DialogActions>
          </Dialog>
          <HelpDialog
            isOpen={this.state.helpClickedState}
            onClose={this.helpClickedClose}
            getArticle={getArticle}
          />

          <SnackBarMessage
            open={this.state.openSnackbar}
            handleSnackbarClose={this.handleSnackbarClose}
            variant="warning"
            message={i18n.__("Label_Snackbar_NoData")}
          />
        </div>
      </div>
    );
  }
  renderDialogTitle(person) {
    const names = person && person.Names ? person.Names : [];

    //TODO: Print first-name instead of label "Person information" below
    if (names) {
      var titleFromName =
        this.getNameField(names[0], "FirstName") +
        " " +
        this.getNameField(names[0], "LastName");
    }
    return titleFromName;
  }

  getNameField = (list, field) => {
    if (list) {
      return list[field];
    }
    return "???";
  };
}

ClientSearch.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClientSearch);
