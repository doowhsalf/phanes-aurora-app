import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1
} from "/debug.json";
import Constants from "/lib/constants";

var hasError = false;

export function orderValidate(order) {
  DEFCON3 && console.log("validateOrder");
  DEFCON3 && console.log(order);

  let structure = {
    hasError: false,
    messages: []
  };

  
  // do specific test based on order-type
  switch (order.field_order_type.name) {
    case Constants.OrderType.NEW_PERSON:
      structure.messages.push(_validateBirthdate(order));
      structure.messages.push(_validateGender(order));
      structure.messages.push(_validatePepCountry(order));
      structure.messages.push(_validateSSN(order));
      structure.messages.push(_validateName(order));
      break;

    default:
      break;
  }

  structure.hasError = hasError; // ugly temp fix to set error flag
  DEFCON5 && console.log("validateOrder-processed");
  DEFCON5 && console.log(structure);

  return structure;
}

function _validateBirthdate(order) {
  let item = {
    title: "",
    field_expected_result: "",
    field_objective: "",
    field_resolution: null,
    field_message_code: "",
    field_absolute_value: "",
    status: 0,
    result: 0
  };

  // TODO: This test might be done on the server-side instead or in a separate function
  // check 01 - Check that birth-date is filled in
  if (order.field_birthdate) {
    item = {
      title: i18n.__("Validate_birthdate_ok_title"),
      field_expected_result: i18n.__("Validate_mandatory_field"),
      field_objective: i18n.__("Validate_mandatory_field_objective"),
      field_resolution: i18n.__("Validate_mandatory_field_resolution"),
      field_message_code: "ORDCHKBD001",
      field_absolute_value: "",
      status: Constants.motherCheckState.OK,
      result: Constants.motherCheckState.OK
    };
  } else {
    hasError = true;
    item = {
      title: i18n.__("Validate_birthdate_error_title"),
      field_expected_result: i18n.__("Validate_mandatory_field"),
      field_objective: i18n.__("Validate_mandatory_field_objective"),
      field_resolution: i18n.__("Validate_mandatory_field_resolution"),
      field_message_code: "ORDCHKBD001",
      field_absolute_value: "",
      status: Constants.motherCheckState.ERROR,
      result: Constants.motherCheckState.ERROR
    };
  }

  return item;
}

function _validateGender(order) {
  let item = {
    title: "",
    field_expected_result: "",
    field_objective: "",
    field_resolution: null,
    field_message_code: "",
    field_absolute_value: "",
    status: 0,
    result: 0
  };

  // TODO: This test might be done on the server-side instead or in a separate function
  // check 01 - Check that birth-date is filled in
  if (order.field_gender) {
    item = {
      title: i18n.__("Validate_gender_ok_title"),
      field_expected_result: i18n.__("Validate_mandatory_field"),
      field_objective: i18n.__("Validate_mandatory_field_objective"),
      field_resolution: i18n.__("Validate_mandatory_field_resolution"),
      field_message_code: "ORDCHKGE001",
      field_absolute_value: "",
      status: Constants.motherCheckState.OK,
      result: Constants.motherCheckState.OK
    };
  } else {
    hasError = true;
    item = {
      title: i18n.__("Validate_gender_error_title"),
      field_expected_result: i18n.__("Validate_mandatory_field"),
      field_objective: i18n.__("Validate_mandatory_field_objective"),
      field_resolution: i18n.__("Validate_mandatory_field_resolution"),
      field_message_code: "ORDCHKGE001",
      field_absolute_value: "",
      status: Constants.motherCheckState.ERROR,
      result: Constants.motherCheckState.ERROR
    };
  }
  return item;
}

function _validatePepCountry(order) {
  let item = {
    title: "",
    field_expected_result: "",
    field_objective: "",
    field_resolution: null,
    field_message_code: "",
    field_absolute_value: "",
    status: 0,
    result: 0
  };
  let countryError = false;
  // TODO: This test might be done on the server-side instead or in a separate function
  // check 01 - Check that birth-date is filled in
  if (order.field_pep_countries_list !== undefined) {
    if (order.field_pep_countries_list.length > 0) {
      item = {
        title: i18n.__("Validate_pepcountry_ok_title"),
        field_expected_result: i18n.__("Validate_mandatory_field"),
        field_objective: i18n.__("Validate_mandatory_field_objective"),
        field_resolution: i18n.__("Validate_mandatory_field_resolution"),
        field_message_code: "ORDCHKPEPC001",
        field_absolute_value: "",
        status: Constants.motherCheckState.OK,
        result: Constants.motherCheckState.OK
      };
    } else {
      countryError = true;
    }
  } else {
    countryError = true;
  }

  if (countryError) {
    item = {
      title: i18n.__("Validate_pepcountry_error_title"),
      field_expected_result: i18n.__("Validate_mandatory_field"),
      field_objective: i18n.__("Validate_mandatory_field_objective"),
      field_resolution: i18n.__("Validate_mandatory_field_resolution"),
      field_message_code: "ORDCHKPEPC001",
      field_absolute_value: "",
      status: Constants.motherCheckState.ERROR,
      result: Constants.motherCheckState.ERROR
    };
    hasError = true;
  }

  return item;
}

function _validateName(order) {
  let item = {
    title: "",
    field_expected_result: "",
    field_objective: "",
    field_resolution: null,
    field_message_code: "",
    field_absolute_value: "",
    status: 0,
    result: 0
  };
  let nameError = false;
  let nameCheckFail = true;
  // TODO: This test might be done on the server-side instead or in a separate function
  // check 01 - Check that birth-date is filled in
  if (order.field_names !== undefined) {
    if (order.field_names.length > 0) {
      order.field_names.map((name, index) => {
        DEFCON5 && console.log("Check name");
        DEFCON5 && console.log(name);
        if (
          name.field_name_type.field_personnametypeid ===
          Constants.personNameTypes.PRIMARY_NAME
        ) {
          item = {
            title: i18n.__("Validate_name_ok_title"),
            field_expected_result: i18n.__("Validate_mandatory_field"),
            field_objective: i18n.__("Validate_mandatory_field_objective"),
            field_resolution: i18n.__("Validate_mandatory_field_resolution"),
            field_message_code: "ORDCHKNAME001",
            field_absolute_value: "",
            status: Constants.motherCheckState.OK,
            result: Constants.motherCheckState.OK
          };
          nameCheckFail = false;
        } else {
          DEFCON5 && console.log("No Match" + name.field_personnametypeid);
        }
      });
      nameError = nameCheckFail;
    } else {
      nameError = true;
    }
  } else {
    nameError = true;
  }

  if (nameError) {
    if (nameCheckFail) {
      item = {
        title: i18n.__("Validate_name_error_title"),
        field_expected_result: i18n.__("Validate_mandatory_field"),
        field_objective: i18n.__("Validate_nametype_primary_objective"),
        field_resolution: i18n.__("Validate_mandatory_field_resolution"),
        field_message_code: "ORDCHKNAME001",
        field_absolute_value: "",
        status: Constants.motherCheckState.ERROR,
        result: Constants.motherCheckState.ERROR
      };
    } else {
      item = {
        title: i18n.__("Validate_name_error_title"),
        field_expected_result: i18n.__("Validate_mandatory_field"),
        field_objective: i18n.__("Validate_mandatory_field_objective"),
        field_resolution: i18n.__("Validate_mandatory_field_resolution"),
        field_message_code: "ORDCHKNAME002",
        field_absolute_value: "",
        status: Constants.motherCheckState.ERROR,
        result: Constants.motherCheckState.ERROR
      };
    }
    hasError = true;
  }

  return item;
}

function _validateSSN(order) {
  let item = {
    title: "",
    field_expected_result: "",
    field_objective: "",
    field_resolution: null,
    field_message_code: "",
    field_absolute_value: "",
    status: 0,
    result: 0
  };
  let SSNError = false;
  // TODO: This test might be done on the server-side instead or in a separate function
  // check 01 - Check that birth-date is filled in
  if (order.field_ssn !== undefined) {
    if (order.field_ssn.length > 0) {
      item = {
        title: i18n.__("Validate_SSN_ok_title"),
        field_expected_result: i18n.__("Validate_mandatory_field"),
        field_objective: i18n.__("Validate_mandatory_field_objective"),
        field_resolution: i18n.__("Validate_mandatory_field_resolution"),
        field_message_code: "ORDCHKSSN001",
        field_absolute_value: "",
        status: Constants.motherCheckState.OK,
        result: Constants.motherCheckState.OK
      };
    } else {
      SSNError = true;
    }
  } else {
    SSNError = true;
  }

  if (SSNError) {
    item = {
      title: i18n.__("Validate_SSN_error_title"),
      field_expected_result: i18n.__("Validate_mandatory_field"),
      field_objective: i18n.__("Validate_mandatory_field_objective"),
      field_resolution: i18n.__("Validate_mandatory_field_resolution"),
      field_message_code: "ORDCHKSSN001",
      field_absolute_value: "",
      status: Constants.motherCheckState.WARNING,
      result: Constants.motherCheckState.WARNING
    };
    //hasError = true;
  }

  return item;
}
