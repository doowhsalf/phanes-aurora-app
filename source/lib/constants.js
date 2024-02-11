import React from "react";

export const USER_ACTION_ACTIVATE = "activate";
export const USER_ACTION_DEACTIVATE = "deactivate";
export const USER_ACTION_ADD = "add";
export const USER_STATUS_ACTIVE = "active";
export const USER_STATUS_INACTIVE = "inactive";

export default class Constants {
  static CardMode = {
    PERSON: "100",
    NEWORDER: "200",
    ORDER: "300",
  };

  static CardStatus = {
    NA: "0",
    QA: "1000",
    RQA: "2000",
    NEW: "5000",
    FUTURE: "6000",
    OK: "8000",
  };

  static OrderProcessStatuses = {
    INIT: "0",
    PENDING: "10",
    OPEN100: "100",
    OPEN110: "110",
    OPEN500: "500",
    FUTURE: "600",
    TIMECHECK: "1000",
    QACHECK: "4000",
    PUBLISH: "5000",
    COMPLETED: "8000",
    SUSPENCE910: "910",
    SUSPENCE950: "950",
    SUSPENCE990: "990",
    CANCELLED: "999",
  };

  static OrderType = {
    NEW_PERSON: "100",
    MIGRATION: "188",
    RELATION_UPDATE: "189",
    RELATION_INSERT: "190",
    CORE: "200",
    URI: "201",
    SSN: "202",
    ADDRESS: "203",
    NAME: "205",
    ROLE_INSERT: "206",
    ROLE_UPDATE: "207",
  };

  static activeCard = {
    RELATION_UPDATE: "RELATION_UPDATE",
    RELATION_INSERT: "RELATION_INSERT",
    ROLE_UPDATE: "ROLE_UPDATE",
    ROLE_INSERT: "ROLE_INSERT",
    CORE: "CORE",
    URI: "URI",
    SSN: "SSN",
    NAME: "NAME",
    ADDRESS: "ADDRESS",
    ROLES: "ROLES",
  };

  static Gender = {
    FEMALE: "K",
    MALE: "M",
  };

  static OrderProcessMethod = {
    EXPRESS: "E",
    DEFAULT: "D",
  };

  static datePrecision = {
    UNDEF: "u",
    YEAR: "Y",
    MONTH: "M",
    DAY: "D",
  };

  static orderTypeTechnical = {
    NEW_PERSON_ORDER: "384",
  };

  static defaultValues = {
    ORDERID: "99999999",
  };

  static motherCheckState = {
    OK: 0,
    WARNING: 100,
    ERROR_GENERIC: 999,
    ERROR: 999,
  };

  static personNameTypes = {
    PREVIOUS_NAMES: "1",
    ALTERNATIVE_NAMES: "2",
    PRIMARY_NAME: "3",
    REGISTRED_NAME: "4",
  };

  static NotiseClass = {
    CONTENT_UPDATED: "content_updated",
    ARTICLE_ACTION_CONTENT_UPDATE: "article_action_content_update",
    ARTICLE_STATUS_OPEN: "article_status_open",
    ARTICLE_STATUS_REVIEW: "article_status_review",
    ARTICLE_STATUS_REQUEST_FOR_PUBLICATION:
      "article_status_request_for_publication",
    ARTICLE_STATUS_APPROVED_FOR_PUBLICATION:
      "article_status_approved_for_publication",
    ARTICLE_STATUS_PUBLISHED: "article_status_published",
    CHAT_ACTION_NEW_MESSAGE: "chat_action_new_message",
    GROUP_ACTION_NEW_MEMBER: "group_action_new_member",
  };

  static LoadingComponent = () => <div> ... </div>;
}
