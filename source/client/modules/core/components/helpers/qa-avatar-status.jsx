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
import Avatar from "@mui/material/Avatar";
import Constants from "/lib/constants";
import ImageIcon from "@mui/icons-material/Image";
import EmailIcon from "@mui/icons-material/Email";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";

import UpdateIcon from "@mui/icons-material/Update";
import DoneIcon from "@mui/icons-material/Done";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Build from "@mui/icons-material/Build";

import { red, green, blue, purple, deepOrange as organge } from '@mui/material/colors';

export function renderAvtar(status) {
  const styles = {
    avatar_check: { backgroundColor: red[400] },
    avatar_ok: { backgroundColor: green[400] },
    avatar_recheck: { backgroundColor: red[600] },
    avatar_person: { backgroundColor: blue[800] },
    avatar_na: { backgroundColor: blue[100] },
    avatar_new: { backgroundColor: purple[400] },
  };

  if (status == undefined) {
    let status = Constants.CardStatus.NA;
  }
  let keyValue = Math.random() * Math.random();

  let value = [
    <Avatar key={keyValue} style={styles.avatar_person}>
      {" "}
      B{" "}
    </Avatar>,
  ];

  DEFCON5 && console.log(styles);

  switch (status) {
    case Constants.CardStatus.NA:
      value = [
        <Avatar key={keyValue} style={styles.avatar_na}>
          {" "}
          na{" "}
        </Avatar>,
      ];
      break;
    case Constants.CardStatus.QA:
      value = [
        <Avatar key={keyValue} style={styles.avatar_check}>
          {" "}
          QA{" "}
        </Avatar>,
      ];
      break;
    case Constants.CardStatus.RQA:
      value = [
        <Avatar key={keyValue} style={styles.avatar_recheck}>
          {" "}
          RQA{" "}
        </Avatar>,
      ];
      break;
    case Constants.CardStatus.NEW:
      value = [
        <Avatar key={keyValue} style={styles.avatar_new}>
          {" "}
          N{" "}
        </Avatar>,
      ];
      break;
    case Constants.CardStatus.OK:
      value = [
        <Avatar key={keyValue} style={styles.avatar_ok}>
          {" "}
          OK{" "}
        </Avatar>,
      ];
      break;
    default: // We assume for now that the avtar is a person object
      value = [
        <Avatar key={keyValue} style={styles.avatar_person}>
          {" "}
          BX{" "}
        </Avatar>,
      ];
      // TODO: Shall update the GetPerson Query and check if there are an order active for the person
      break;
  }
  return value;
}

export function cardEditMode(cardMode, editMode) {
  let value = editMode;

  DEFCON5 && console.log("editCheck");
  DEFCON5 && console.log(cardMode);
  DEFCON5 && console.log(editMode);

  switch (cardMode) {
    case Constants.CardMode.NEWORDER:
      value = true;
      break;
    default:
      value = editMode;
      break;
  }
  DEFCON5 && console.log(value);

  return value;
}

export function renderOrderAvtar(status) {
  const styles = {
    process_pending: { backgroundColor: red[200] },
    process_open: { backgroundColor: blue[400] },
    process_qa: { backgroundColor: red[300] },
    process_suspence900: { backgroundColor: red[400] },
    process_suspence910: { backgroundColor: red[500] },
    process_suspence950: { backgroundColor: red[600] },
    process_future: { backgroundColor: red[600] },
    process_completed: { backgroundColor: green[300] },
    process_process: { backgroundColor: purple[400] },
    proccss_publish: { backgroundColor: purple[600] },
    proccss_cancelled: { backgroundColor: red[900] },
    proccss_undefined: { backgroundColor: blue[200] },
  };

  if (status == undefined) {
    let status = Constants.OrderProcessStatuses.NA;
  }
  let keyValue = Math.random() * Math.random();

  let value = [
    <Avatar key={keyValue} style={styles.process_pending}>
      {" "}
      B{" "}
    </Avatar>,
  ];

  DEFCON5 && console.log(keyValue);
  /*
    PENDING: '0',
    OPEN100: '100',
    OPEN110: '110',
    OPEN500: '500',
    FUTURE: '600',
    TIMECHECK: '1000',
    QACHECK: '4000',
    INPUBLISH: '5000',
    COMPLETED: '8000',
    SUSPENCE910: '910',
    SUSPENCE950: '950',
    CANCELED: '999'

    */

  let item = [
    <Avatar key={keyValue} style={styles.process_pending}>
      {value}
    </Avatar>,
  ];

  switch (status) {
    case Constants.OrderProcessStatuses.PENDING:
      value = [
        <EmailIcon key={keyValue} style={styles.process_pending}>
          10
        </EmailIcon>,
      ];
      item = [
        <Avatar key={keyValue} style={styles.process_pending}>
          {value}
        </Avatar>,
      ];
      break;
    case Constants.OrderProcessStatuses.OPEN100:
    case Constants.OrderProcessStatuses.OPEN110:
      value = [
        <EmailIcon key={keyValue} style={styles.process_open}>
          100
        </EmailIcon>,
      ];
      item = [
        <Avatar key={keyValue} style={styles.process_open}>
          {value}
        </Avatar>,
      ];
      break;
    case Constants.OrderProcessStatuses.OPEN500:
      value = [
        <EmailIcon key={keyValue} style={styles.process_open}>
          500
        </EmailIcon>,
      ];
      item = [
        <Avatar key={keyValue} style={styles.process_open}>
          {value}
        </Avatar>,
      ];

      break;
    case Constants.OrderProcessStatuses.FUTURE:
      value = [
        <UpdateIcon key={keyValue} style={styles.process_future}>
          {" "}
          600{" "}
        </UpdateIcon>,
      ];
      item = [
        <Avatar key={keyValue} style={styles.process_future}>
          {value}
        </Avatar>,
      ];

      break;
    case Constants.OrderProcessStatuses.TIMECHECK:
      value = [
        <EmailIcon key={keyValue} style={styles.process_process}>
          {" "}
          1000{" "}
        </EmailIcon>,
      ];
      item = [
        <Avatar key={keyValue} style={styles.process_process}>
          {value}
        </Avatar>,
      ];

      break;
    case Constants.OrderProcessStatuses.QACHECK:
      value = [
        <EmailIcon key={keyValue} style={styles.process_qa}>
          {" "}
          4000{" "}
        </EmailIcon>,
      ];
      item = [
        <Avatar key={keyValue} style={styles.process_qa}>
          {value}
        </Avatar>,
      ];

      break;
    case Constants.OrderProcessStatuses.PUBLISH:
      value = [
        <EmailIcon key={keyValue} style={styles.process_publish}>
          {" "}
          5000{" "}
        </EmailIcon>,
      ];
      item = [
        <Avatar key={keyValue} style={styles.process_publish}>
          {value}
        </Avatar>,
      ];

      break;
    case Constants.OrderProcessStatuses.SUSPENCE910:
    case Constants.OrderProcessStatuses.SUSPENCE950:
    case Constants.OrderProcessStatuses.SUSPENCE990:
      value = [
        <ErrorIcon key={keyValue} style={styles.process_suspence900}>
          {" "}
          900{" "}
        </ErrorIcon>,
      ];
      item = [
        <Avatar key={keyValue} style={styles.process_suspence900}>
          {value}
        </Avatar>,
      ];

      break;
    case Constants.OrderProcessStatuses.CANCELLED:
      value = [
        <DeleteForeverIcon key={keyValue} style={styles.process_cancelled}>
          999
        </DeleteForeverIcon>,
      ];
      item = [
        <Avatar key={keyValue} style={styles.process_cancelled}>
          {value}
        </Avatar>,
      ];

      break;
    case Constants.OrderProcessStatuses.COMPLETED:
      value = [
        <DoneIcon key={keyValue} style={styles.process_completed}>
          {" "}
          8000{" "}
        </DoneIcon>,
      ];
      item = [
        <Avatar key={keyValue} style={styles.process_completed}>
          {value}
        </Avatar>,
      ];

      break;
    default:
      value = [
        <Build key={keyValue} style={styles.proccss_undefined}>
          {" "}
          {status}{" "}
        </Build>,
      ];
      item = [
        <Avatar key={keyValue} style={styles.proccss_undefined}>
          {value}
        </Avatar>,
      ];
      // We assume for now that the avtar is a person object
      // TODO: Shall update the GetPerson Query and check if there are an order active for the person
      break;
  }

  DEFCON5 && console.log(value);
  DEFCON5 && console.log(status);
  return item;
}

export function renderMotherCheck(status) {
  const styles = {
    check_ok: { backgroundColor: green[300] },
    check_warning: { backgroundColor: organge[300] },
    check_error: { backgroundColor: red[300] },
    check_undefined: { backgroundColor: blue[200] },
  };

  if (status == undefined) {
    let status = Constants.OrderProcessStatuses.NA;
  }
  let keyValue = Math.random() * Math.random();

  let value = [
    <Avatar key={keyValue} style={styles.process_pending}>
      B
    </Avatar>,
  ];

  DEFCON5 && console.log(styles);

  let item = [<Avatar style={styles.check_undefined}>{value}</Avatar>];

  switch (status) {
    case Constants.motherCheckState.OK:
      value = [
        <DoneIcon key="MotherCheckOK" style={styles.check_ok}>
          {i18n.__("MotherCheckOK")}
        </DoneIcon>,
      ];
      item = [
        <Avatar key="AMotherCheckOK" style={styles.check_ok}>
          {value}
        </Avatar>,
      ];
      break;
    case Constants.motherCheckState.WARNING:
      value = [
        <WarningIcon key="MotherCheckWarning" style={styles.check_warning}>
          {i18n.__("MotherCheckWarning")}
        </WarningIcon>,
      ];
      item = [
        <Avatar key="AMotherCheckWarning" style={styles.check_warning}>
          {value}
        </Avatar>,
      ];
      break;
    case Constants.motherCheckState.ERROR:
      value = [
        <ErrorIcon key="MotherCheckError" style={styles.check_error}>
          {i18n.__("MotherCheckError")}
        </ErrorIcon>,
      ];
      item = [
        <Avatar key="AMotherCheckError" style={styles.check_error}>
          {value}
        </Avatar>,
      ];
      break;
    default:
      value = [
        <Build key="Build" style={styles.check_undefined}>
          {status}
        </Build>,
      ];
      item = [
        <Avatar key="aBuild" style={styles.check_undefined}>
          {value}
        </Avatar>,
      ];
      // We assume for now that the avtar is a person object
      // TODO: Shall update the GetPerson Query and check if there are an order active for the person
      break;
  }

  DEFCON5 && console.log(value);
  DEFCON5 && console.log(status);
  return item;
}

export function renderCheck(status) {
  return renderMotherCheck(status);
}
