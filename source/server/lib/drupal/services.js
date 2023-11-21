import { HTTP } from "meteor/http";
import { Meteor } from "meteor/meteor";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";

import util from "util";
import { USER_ACTION_ACTIVATE } from "../../../lib/constants";

export default class GudrunContentServices {
  constructor() {
    const asyncHttp = util.promisify(HTTP.post);

    this.sendRequest = (url, query, async = false) => {
      DEFCON3 && console.log(url);
      DEFCON3 && console.log("Query string...");
      DEFCON3 && console.log(JSON.stringify(query, null, 2));
      const startTime = new Date().getTime();

      if (query) {
        if (query.headers) {
          query.headers["APIKEY"] = Meteor.settings.apiKey;
          query.headers["strictSSL"] = false;
        } else {
          query.headers = {
            APIKEY: Meteor.settings.apiKey,
            strictSSL: false,
          };
        }
      } else {
        query = {
          headers: {
            APIKEY: Meteor.settings.apiKey,
            strictSSL: false,
          },
        };
      }

      const response = HTTP.post(url, query);
      const executionTime = new Date().getTime() - startTime;
      DEFCON3 && console.log("Call to server took: " + executionTime);

      if (response.statusCode === 200) {
        DEFCON5 && console.log(response.data);
        return response.data;
      } else {
        let localError = new Meteor.Error(
          "Invalid response status code: " + response.statusCode
        );
        DEFCON1 && console.log(response.data);
        DEFCON1 && console.log(localError);
        throw localError;
      }
    };

    this.sendRequestAsync = async (url, query) => {
      DEFCON3 && console.log(url);
      DEFCON3 && console.log("Query string...");
      DEFCON3 && console.log(JSON.stringify(query, null, 2));
      const startTime = new Date().getTime();

      if (query) {
        if (query.headers) {
          query.headers["APIKEY"] = Meteor.settings.apiKey;
          query.headers["strictSSL"] = false;
        } else {
          query.headers = {
            APIKEY: Meteor.settings.apiKey,
            strictSSL: false,
          };
        }
      } else {
        query = {
          headers: {
            APIKEY: Meteor.settings.apiKey,
            strictSSL: false,
          },
        };
      }

      const response = await asyncHttp(url, query);
      const executionTime = new Date().getTime() - startTime;
      DEFCON3 && console.log("Call to server took: " + executionTime);

      if (response.statusCode === 200) {
        DEFCON5 && console.log(response.data);
        return response.data;
      } else {
        if (response.statusCode === 400) {
          DEFCON5 && console.log(response.data);
          return response.data;
        } else {
          let localError = new Meteor.Error(
            "Invalid response status code: " + response.statusCode
          );
          DEFCON1 && console.log(response.data);
          DEFCON1 && console.log(localError);
          throw localError;
        }
      }
    };
  }

  test_connection() {
    let serviceUrl = `${Meteor.settings.drupalTestConnection}`;
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    return this.sendRequest(serviceUrl, {});
  }

  queryOrder(searchText) {
    let serviceUrl = `${Meteor.settings.drupalOrderQuery}`;
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    //let orderstate = '391';
    let query = {
      data: {
        query: searchText,
      },
    };
    return this.sendRequest(serviceUrl, query);
  }

  queryOrderState(state, limit) {
    let serviceUrl = `${Meteor.settings.drupalOrderQuery}`;
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    //let orderstate = '391';
    let query = {
      data: {
        field_order_state: state,
        query_limit: limit,
      },
    };
    return this.sendRequest(serviceUrl, query);
  }

  queryOrderByPersonId(searchText) {
    let serviceUrl = `${Meteor.settings.drupalOrderQuery}`;
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    //let orderstate = '391';
    let query = {
      data: {
        field_personid: searchText,
      },
    };
    return this.sendRequest(serviceUrl, query);
  }

  queryRecentOrders() {
    let serviceUrl = `${Meteor.settings.drupalOrderQuery}`;
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    //let orderstate = '391';
    let query = {
      data: {
        query_limit: "50",
      },
    };
    return this.sendRequest(serviceUrl, query);
  }

  motherchecks() {
    let serviceUrl = `${Meteor.settings.drupalMotherCheck}`;
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    //let orderstate = '391';
    let query = {
      data: {},
    };
    return this.sendRequest(serviceUrl, query);
  }

  queryOrderByOrderId(searchText) {
    let serviceUrl = `${Meteor.settings.drupalOrderQuery}`;
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    //let orderstate = '391';
    let query = {
      data: {
        field_orderid: searchText,
      },
    };
    return this.sendRequest(serviceUrl, query);
  }

  updateOrderByOrderId(order) {
    let serviceUrl = `${Meteor.settings.drupalOrderUpdate}`;
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    // just pass the order

    DEFCON3 && console.log("Checking data in updateOrderByOrderId");
    DEFCON3 && console.log(order);

    //order.acting_uid = userObj.uid;
    DEFCON3 && console.log("After...");
    DEFCON3 && console.log(order);

    DEFCON3 && console.log(order);

    let updateStream = {
      order,
    };
    updateStream.data = updateStream.order;
    return this.sendRequest(serviceUrl, updateStream);
  }

  createPersonOrder(order) {
    let serviceUrl = `${Meteor.settings.drupalOrderCreate}`;
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    let updateStream = {
      order,
    };
    updateStream.data = updateStream.order;
    DEFCON3 && console.log(updateStream.order);

    let dataReply = this.sendRequest(serviceUrl, updateStream);
    DEFCON3 && console.log(dataReply);
    return dataReply;
  }

  getTerms(termtype) {
    let serviceUrl = `${Meteor.settings.drupalGetTax}`;
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    let query = {
      data: {
        taxonomy_type: termtype,
      },
    };
    return this.sendRequest(serviceUrl, query);
  }

  queryTerms(termtype, searchText) {
    let serviceUrl = `${Meteor.settings.drupalQueryTax}`;
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    let query = {
      data: {
        taxonomy_type: termtype,
        taxonomy_autosearch: searchText,
      },
    };
    return this.sendRequest(serviceUrl, query);
  }

  queryTermsCountry(dataContext) {
    let serviceUrl = `${Meteor.settings.drupalQueryTax}`;
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    let termtype = "countries";
    let query = {
      data: {
        taxonomy_type: termtype,
        taxonomy_query_country: dataContext,
      },
    };
    return this.sendRequest(serviceUrl, query);
  }

  queryPersonById(searchText) {
    let serviceUrl = `${Meteor.settings.drupalEntityQuery}`;
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    let query = {
      data: {
        field_personid: searchText,
        query_domain: ["person"],
      },
    };
    return this.sendRequest(serviceUrl, query);
  }

  queryPerson(searchText, meta) {
    let serviceUrl = `${Meteor.settings.drupalEntityQuery}`;
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    let query = {
      data: {
        query: searchText,
        query_domain: ["person"],
        query_limit: "1000",
        meta_responcemode: "querymode",
        meta_query_engine: "fulltext",
        meta_query_args: meta,
      },
    };
    return this.sendRequest(serviceUrl, query);
  }

  queryPersonAdvanced(searchText) {
    let serviceUrl = `${Meteor.settings.drupalEntityQuery}`;
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    let query = {
      data: {
        query: searchText,
        query_domain: ["person"],
        query_limit: "2000",
        meta_responcemode: "querymode",
        meta_query_engine: "personadvanced",
        personadvanced_distinct: "1",
      },
    };
    return this.sendRequest(serviceUrl, query);
  }

  queryRoleAdvanced(searchText, queryRoles) {
    let serviceUrl = `${Meteor.settings.drupalEntityQuery}`;
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    DEFCON3 && console.log(queryRoles);
    let query = {
      data: {
        query: searchText,
        query_domain: ["person"],
        query_limit: "2000",
        meta_responcemode: "querymode",
        meta_query_engine: "roleadvanced",
        advancedrole_roles: queryRoles.advancedrole_roles,
        advancedrole_detailedcategoryrole:
          queryRoles.advancedrole_detailedcategoryrole,
        advancedrole_basecategoryrole: queryRoles.advancedrole_basecategoryrole,
        advancedrole_organisation: queryRoles.advancedrole_organisation,
        advancedrole_countryofjurisdiction:
          queryRoles.advancedrole_countryofjurisdiction,
      },
    };
    return this.sendRequest(serviceUrl, query);
  }

  livestream(searchText) {
    let serviceUrl = `${Meteor.settings.drupalEntityQuery}`;
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    //let orderstate = '391';
    let query = {
      data: {
        field_parent_reference: searchText,
        query_domain: ["livestream"],
        query_limit: "50",
        meta_responcemode: "querymode",
        meta_query_engine: "livestream",
      },
    };

    DEFCON3 && console.log(query);

    return this.sendRequest(serviceUrl, query);
  }

  processOrder(request) {
    let serviceUrl = `${Meteor.settings.drupalProcess}`;
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    let query = {
      data: {
        field_orderid: request.field_orderid,
        field_order_state_request_next: request.field_order_state_request_next,
      },
    };
    return this.sendRequest(serviceUrl, query);
  }

  async getUserRoles(uid) {
    let serviceUrl = `${Meteor.settings.drupalUserUrl}`;
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");

    if (!uid) {
      return null;
    }

    let query = {
      data: { uid },
    };
    try {
      const response = await this.sendRequestAsync(serviceUrl, query);
      //roles contain arrays of company ids
      const roles = {
        admin: response && response.admin_in_companies,
        member: response && response.member_in_companies,
      };
      return roles;
    } catch (e) {
      DEFCON3 && console.log("Error in getUserRoles");
      DEFCON3 && console.log(e);
    }
  }

  async getCompanyUsers(companyId) {
    let serviceUrl = `${Meteor.settings.drupalCompanyUsersUrl}`;
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    let query = {
      data: { field_company_id: companyId },
    };

    try {
      const company = await this.sendRequestAsync(serviceUrl, query);
      DEFCON5 && console.log("Company users returned:");

      let administrators = [];
      if (company && company.field_company_administrators) {
        let temp = company.field_company_administrators.map((user) => {
          return user;
        });
        administrators = administrators.concat(temp);
      }

      let members = [];
      if (company && company.field_company_members) {
        let temp = company.field_company_members.map((user) => {
          user.status = "active";
          return user;
        });
        members = members.concat(temp);
      }

      if (company && company.field_company_members_inactive) {
        let temp = company.field_company_members_inactive.map((user) => {
          user.status = "inactive";
          return user;
        });
        members = members.concat(temp);
      }
      const users = {
        companyId,
        admins: administrators,
        members: members,
      };

      DEFCON5 && console.log(users);
      return users;
    } catch (e) {
      DEFCON3 && console.log("Error in getCompanyUsers");
      DEFCON3 && console.log(e);
    }
  }

  async manageUser(uid, action, companyId) {
    let serviceUrl = `${Meteor.settings.drupalManageUserUrl}`;
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    const contentServerAction =
      action === USER_ACTION_ACTIVATE ? "activateUser" : "disableUser";
    let query = {
      data: {
        uid,
        action: contentServerAction,
        field_company_id: companyId,
      },
    };
    try {
      const response = await this.sendRequestAsync(serviceUrl, query);
      return response;
    } catch (e) {
      DEFCON3 && console.log("Error in manageUser");
      DEFCON3 && console.log(e);
    }
  }

  async drupalInsertUser(user) {
    let serviceUrl = `${Meteor.settings.drupalInsertUser}`;
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    let query = {
      data: {
        user_mail: user.mail,
        user_name: user.name,
        secretQuestion: user.secretQuestion,
        secretAnswer: user.secretAnswer,
        pw: user.pw,
        action: "newUser",
      },
    };
    try {
      const response = await this.sendRequestAsync(serviceUrl, query);
      return response;
    } catch (e) {
      DEFCON3 && console.log("Error in insertUser");
      DEFCON3 && console.log(e);
    }
  }

  async addUser(user, companyId) {
    let serviceUrl = `${Meteor.settings.drupalManageUserUrl}`;
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    let query = {
      data: {
        user_mail: user.mail,
        user_name: user.name,
        action: "newUser",
        field_company_id: companyId,
      },
    };
    try {
      const response = await this.sendRequestAsync(serviceUrl, query);
      return response;
    } catch (e) {
      DEFCON3 && console.log("Error in manageUser");
      DEFCON3 && console.log(e);
    }
  }

  async sendQuestion(query) {
    let serviceUrl = `${Meteor.settings.drupalContactUrl}`;
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    let queryOptions = {
      data: query,
    };
    try {
      const response = await this.sendRequestAsync(serviceUrl, queryOptions);
      return response;
    } catch (e) {
      DEFCON3 && console.log("Error in sendQuestion");
      DEFCON3 && console.log(e);
    }
  }
  async getArticle(query) {
    let serviceUrl = `${Meteor.settings.drupalGetArticleUrl}`;
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    let queryOptions = {
      data: query,
    };
    try {
      const response = await this.sendRequestAsync(serviceUrl, queryOptions);
      return response;
    } catch (e) {
      DEFCON3 && console.log("Error in getArticle");
      DEFCON3 && console.log(e);
    }
  }
  // async getArticle(query) {
  //   let serviceUrl = `${Meteor.settings.drupalGetArticleUrl}`;
  //   serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
  //   let queryOptions = {
  //     data: query
  //   };
  //   try {
  //     const response = await this.sendRequestAsync(serviceUrl, queryOptions);
  //     return response;
  //   } catch (e) {
  //     DEFCON3 && console.log("Error in getArticle");
  //     DEFCON3 && console.log(e);
  //   }
  // }
  async fileareaGetFile(query) {
    let serviceUrl = `${Meteor.settings.drupalFileareaGetFile}`;
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    let queryOptions = {
      data: query,
    };
    DEFCON3 && console.log("Preparing to get the file...!");
    DEFCON3 && console.log(query);

    try {
      DEFCON3 && console.log("Sending Request...!");
      const response = await this.sendRequestAsync(serviceUrl, queryOptions);
      DEFCON3 && console.log("Get Item back from Request");

      return response;
    } catch (e) {
      DEFCON3 && console.log("Error in fileareaGetItem");
      DEFCON3 && console.log(e);
    }
  }
  async fileareaQuery(query) {
    let serviceUrl = `${Meteor.settings.drupalFileareaQuery}`;
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    let queryOptions = {
      data: query,
    };
    DEFCON3 && console.log("fileareaQuery Getting content...!");

    try {
      const response = await this.sendRequestAsync(serviceUrl, queryOptions);
      return response;
    } catch (e) {
      DEFCON3 && console.log("Error in fileareaQuery");
      DEFCON3 && console.log(e);
    }
  }
  async drupalGetUser(uid) {
    let serviceUrl = `${Meteor.settings.drupalGetUser}`;
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    let query = {
      data: {
        method: "uid",
        value: uid,
      },
    };

    try {
      const response = await this.sendRequestAsync(serviceUrl, query);
      return response;
    } catch (e) {
      DEFCON3 && console.log("Error in getUser");
      DEFCON3 && console.log(e);
    }
  }
  async getUserByAttribute(method, value) {
    let serviceUrl = `${Meteor.settings.drupalGetUser}`;
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    let query = {
      data: {
        method: method,
        value: value,
      },
    };

    try {
      const response = await this.sendRequestAsync(serviceUrl, query);
      return response;
    } catch (e) {
      DEFCON3 && console.log("Error in getUser");
      DEFCON3 && console.log(e);
    }
  }
}
