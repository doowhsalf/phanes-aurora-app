var require = meteorInstall({"server":{"lib":{"drupal":{"services.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// server/lib/drupal/services.js                                                                                    //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.export({
  default: () => GudrunContentServices
});
let HTTP;
module.link("meteor/http", {
  HTTP(v) {
    HTTP = v;
  }

}, 0);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 1);
let DEFCON9, DEFCON7, DEFCON5, DEFCON4, DEFCON3, DEFCON2, DEFCON1;
module.link("/debug.json", {
  DEFCON9(v) {
    DEFCON9 = v;
  },

  DEFCON7(v) {
    DEFCON7 = v;
  },

  DEFCON5(v) {
    DEFCON5 = v;
  },

  DEFCON4(v) {
    DEFCON4 = v;
  },

  DEFCON3(v) {
    DEFCON3 = v;
  },

  DEFCON2(v) {
    DEFCON2 = v;
  },

  DEFCON1(v) {
    DEFCON1 = v;
  }

}, 2);
let util;
module.link("util", {
  default(v) {
    util = v;
  }

}, 3);
let USER_ACTION_ACTIVATE;
module.link("../../../lib/constants", {
  USER_ACTION_ACTIVATE(v) {
    USER_ACTION_ACTIVATE = v;
  }

}, 4);

class GudrunContentServices {
  constructor() {
    const asyncHttp = util.promisify(HTTP.post);

    this.sendRequest = function (url, query) {
      let async = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
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
            strictSSL: false
          };
        }
      } else {
        query = {
          headers: {
            APIKEY: Meteor.settings.apiKey,
            strictSSL: false
          }
        };
      }

      const response = HTTP.post(url, query);
      const executionTime = new Date().getTime() - startTime;
      DEFCON3 && console.log("Call to server took: " + executionTime);

      if (response.statusCode === 200) {
        DEFCON5 && console.log(response.data);
        return response.data;
      } else {
        let localError = new Meteor.Error("Invalid response status code: " + response.statusCode);
        DEFCON1 && console.log(response.data);
        DEFCON1 && console.log(localError);
        throw localError;
      }
    };

    this.sendRequestAsync = (url, query) => Promise.asyncApply(() => {
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
            strictSSL: false
          };
        }
      } else {
        query = {
          headers: {
            APIKEY: Meteor.settings.apiKey,
            strictSSL: false
          }
        };
      }

      const response = Promise.await(asyncHttp(url, query));
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
          let localError = new Meteor.Error("Invalid response status code: " + response.statusCode);
          DEFCON1 && console.log(response.data);
          DEFCON1 && console.log(localError);
          throw localError;
        }
      }
    });
  }

  test_connection() {
    let serviceUrl = "".concat(Meteor.settings.drupalTestConnection);
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    return this.sendRequest(serviceUrl, {});
  }

  queryOrder(searchText) {
    let serviceUrl = "".concat(Meteor.settings.drupalOrderQuery);
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1"); //let orderstate = '391';

    let query = {
      data: {
        query: searchText
      }
    };
    return this.sendRequest(serviceUrl, query);
  }

  queryOrderState(state, limit) {
    let serviceUrl = "".concat(Meteor.settings.drupalOrderQuery);
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1"); //let orderstate = '391';

    let query = {
      data: {
        field_order_state: state,
        query_limit: limit
      }
    };
    return this.sendRequest(serviceUrl, query);
  }

  queryOrderByPersonId(searchText) {
    let serviceUrl = "".concat(Meteor.settings.drupalOrderQuery);
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1"); //let orderstate = '391';

    let query = {
      data: {
        field_personid: searchText
      }
    };
    return this.sendRequest(serviceUrl, query);
  }

  queryRecentOrders() {
    let serviceUrl = "".concat(Meteor.settings.drupalOrderQuery);
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1"); //let orderstate = '391';

    let query = {
      data: {
        query_limit: "50"
      }
    };
    return this.sendRequest(serviceUrl, query);
  }

  motherchecks() {
    let serviceUrl = "".concat(Meteor.settings.drupalMotherCheck);
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1"); //let orderstate = '391';

    let query = {
      data: {}
    };
    return this.sendRequest(serviceUrl, query);
  }

  queryOrderByOrderId(searchText) {
    let serviceUrl = "".concat(Meteor.settings.drupalOrderQuery);
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1"); //let orderstate = '391';

    let query = {
      data: {
        field_orderid: searchText
      }
    };
    return this.sendRequest(serviceUrl, query);
  }

  updateOrderByOrderId(order) {
    let serviceUrl = "".concat(Meteor.settings.drupalOrderUpdate);
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1"); // just pass the order

    DEFCON3 && console.log("Checking data in updateOrderByOrderId");
    DEFCON3 && console.log(order); //order.acting_uid = userObj.uid;

    DEFCON3 && console.log("After...");
    DEFCON3 && console.log(order);
    DEFCON3 && console.log(order);
    let updateStream = {
      order
    };
    updateStream.data = updateStream.order;
    return this.sendRequest(serviceUrl, updateStream);
  }

  createPersonOrder(order) {
    let serviceUrl = "".concat(Meteor.settings.drupalOrderCreate);
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    let updateStream = {
      order
    };
    updateStream.data = updateStream.order;
    DEFCON3 && console.log(updateStream.order);
    let dataReply = this.sendRequest(serviceUrl, updateStream);
    DEFCON3 && console.log(dataReply);
    return dataReply;
  }

  getTerms(termtype) {
    let serviceUrl = "".concat(Meteor.settings.drupalGetTax);
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    let query = {
      data: {
        taxonomy_type: termtype
      }
    };
    return this.sendRequest(serviceUrl, query);
  }

  queryTerms(termtype, searchText) {
    let serviceUrl = "".concat(Meteor.settings.drupalQueryTax);
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    let query = {
      data: {
        taxonomy_type: termtype,
        taxonomy_autosearch: searchText
      }
    };
    return this.sendRequest(serviceUrl, query);
  }

  queryTermsCountry(dataContext) {
    let serviceUrl = "".concat(Meteor.settings.drupalQueryTax);
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    let termtype = "countries";
    let query = {
      data: {
        taxonomy_type: termtype,
        taxonomy_query_country: dataContext
      }
    };
    return this.sendRequest(serviceUrl, query);
  }

  queryPersonById(searchText) {
    let serviceUrl = "".concat(Meteor.settings.drupalEntityQuery);
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    let query = {
      data: {
        field_personid: searchText,
        query_domain: ["person"]
      }
    };
    return this.sendRequest(serviceUrl, query);
  }

  queryPerson(searchText, meta) {
    let serviceUrl = "".concat(Meteor.settings.drupalEntityQuery);
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    let query = {
      data: {
        query: searchText,
        query_domain: ["person"],
        query_limit: "1000",
        meta_responcemode: "querymode",
        meta_query_engine: "fulltext",
        meta_query_args: meta
      }
    };
    return this.sendRequest(serviceUrl, query);
  }

  queryPersonAdvanced(searchText) {
    let serviceUrl = "".concat(Meteor.settings.drupalEntityQuery);
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    let query = {
      data: {
        query: searchText,
        query_domain: ["person"],
        query_limit: "2000",
        meta_responcemode: "querymode",
        meta_query_engine: "personadvanced",
        personadvanced_distinct: "1"
      }
    };
    return this.sendRequest(serviceUrl, query);
  }

  queryRoleAdvanced(searchText, queryRoles) {
    let serviceUrl = "".concat(Meteor.settings.drupalEntityQuery);
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
        advancedrole_detailedcategoryrole: queryRoles.advancedrole_detailedcategoryrole,
        advancedrole_basecategoryrole: queryRoles.advancedrole_basecategoryrole,
        advancedrole_organisation: queryRoles.advancedrole_organisation,
        advancedrole_countryofjurisdiction: queryRoles.advancedrole_countryofjurisdiction
      }
    };
    return this.sendRequest(serviceUrl, query);
  }

  livestream(searchText) {
    let serviceUrl = "".concat(Meteor.settings.drupalEntityQuery);
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1"); //let orderstate = '391';

    let query = {
      data: {
        field_parent_reference: searchText,
        query_domain: ["livestream"],
        query_limit: "50",
        meta_responcemode: "querymode",
        meta_query_engine: "livestream"
      }
    };
    DEFCON3 && console.log(query);
    return this.sendRequest(serviceUrl, query);
  }

  processOrder(request) {
    let serviceUrl = "".concat(Meteor.settings.drupalProcess);
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    let query = {
      data: {
        field_orderid: request.field_orderid,
        field_order_state_request_next: request.field_order_state_request_next
      }
    };
    return this.sendRequest(serviceUrl, query);
  }

  getUserRoles(uid) {
    return Promise.asyncApply(() => {
      let serviceUrl = "".concat(Meteor.settings.drupalUserUrl);
      serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");

      if (!uid) {
        return null;
      }

      let query = {
        data: {
          uid
        }
      };

      try {
        const response = Promise.await(this.sendRequestAsync(serviceUrl, query)); //roles contain arrays of company ids

        const roles = {
          admin: response && response.admin_in_companies,
          member: response && response.member_in_companies
        };
        return roles;
      } catch (e) {
        DEFCON3 && console.log("Error in getUserRoles");
        DEFCON3 && console.log(e);
      }
    });
  }

  getCompanyUsers(companyId) {
    return Promise.asyncApply(() => {
      let serviceUrl = "".concat(Meteor.settings.drupalCompanyUsersUrl);
      serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
      let query = {
        data: {
          field_company_id: companyId
        }
      };

      try {
        const company = Promise.await(this.sendRequestAsync(serviceUrl, query));
        DEFCON5 && console.log("Company users returned:");
        let administrators = [];

        if (company && company.field_company_administrators) {
          let temp = company.field_company_administrators.map(user => {
            return user;
          });
          administrators = administrators.concat(temp);
        }

        let members = [];

        if (company && company.field_company_members) {
          let temp = company.field_company_members.map(user => {
            user.status = "active";
            return user;
          });
          members = members.concat(temp);
        }

        if (company && company.field_company_members_inactive) {
          let temp = company.field_company_members_inactive.map(user => {
            user.status = "inactive";
            return user;
          });
          members = members.concat(temp);
        }

        const users = {
          companyId,
          admins: administrators,
          members: members
        };
        DEFCON5 && console.log(users);
        return users;
      } catch (e) {
        DEFCON3 && console.log("Error in getCompanyUsers");
        DEFCON3 && console.log(e);
      }
    });
  }

  manageUser(uid, action, companyId) {
    return Promise.asyncApply(() => {
      let serviceUrl = "".concat(Meteor.settings.drupalManageUserUrl);
      serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
      const contentServerAction = action === USER_ACTION_ACTIVATE ? "activateUser" : "disableUser";
      let query = {
        data: {
          uid,
          action: contentServerAction,
          field_company_id: companyId
        }
      };

      try {
        const response = Promise.await(this.sendRequestAsync(serviceUrl, query));
        return response;
      } catch (e) {
        DEFCON3 && console.log("Error in manageUser");
        DEFCON3 && console.log(e);
      }
    });
  }

  drupalInsertUser(user) {
    return Promise.asyncApply(() => {
      let serviceUrl = "".concat(Meteor.settings.drupalInsertUser);
      serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
      let query = {
        data: {
          user_mail: user.mail,
          user_name: user.name,
          secretQuestion: user.secretQuestion,
          secretAnswer: user.secretAnswer,
          pw: user.pw,
          action: "newUser"
        }
      };

      try {
        const response = Promise.await(this.sendRequestAsync(serviceUrl, query));
        return response;
      } catch (e) {
        DEFCON3 && console.log("Error in insertUser");
        DEFCON3 && console.log(e);
      }
    });
  }

  addUser(user, companyId) {
    return Promise.asyncApply(() => {
      let serviceUrl = "".concat(Meteor.settings.drupalManageUserUrl);
      serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
      let query = {
        data: {
          user_mail: user.mail,
          user_name: user.name,
          action: "newUser",
          field_company_id: companyId
        }
      };

      try {
        const response = Promise.await(this.sendRequestAsync(serviceUrl, query));
        return response;
      } catch (e) {
        DEFCON3 && console.log("Error in manageUser");
        DEFCON3 && console.log(e);
      }
    });
  }

  sendQuestion(query) {
    return Promise.asyncApply(() => {
      let serviceUrl = "".concat(Meteor.settings.drupalContactUrl);
      serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
      let queryOptions = {
        data: query
      };

      try {
        const response = Promise.await(this.sendRequestAsync(serviceUrl, queryOptions));
        return response;
      } catch (e) {
        DEFCON3 && console.log("Error in sendQuestion");
        DEFCON3 && console.log(e);
      }
    });
  }

  getArticle(query) {
    return Promise.asyncApply(() => {
      let serviceUrl = "".concat(Meteor.settings.drupalGetArticleUrl);
      serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
      let queryOptions = {
        data: query
      };

      try {
        const response = Promise.await(this.sendRequestAsync(serviceUrl, queryOptions));
        return response;
      } catch (e) {
        DEFCON3 && console.log("Error in getArticle");
        DEFCON3 && console.log(e);
      }
    });
  } // async getArticle(query) {
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


  fileareaGetFile(query) {
    return Promise.asyncApply(() => {
      let serviceUrl = "".concat(Meteor.settings.drupalFileareaGetFile);
      serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
      let queryOptions = {
        data: query
      };
      DEFCON3 && console.log("Preparing to get the file...!");
      DEFCON3 && console.log(query);

      try {
        DEFCON3 && console.log("Sending Request...!");
        const response = Promise.await(this.sendRequestAsync(serviceUrl, queryOptions));
        DEFCON3 && console.log("Get Item back from Request");
        return response;
      } catch (e) {
        DEFCON3 && console.log("Error in fileareaGetItem");
        DEFCON3 && console.log(e);
      }
    });
  }

  fileareaQuery(query) {
    return Promise.asyncApply(() => {
      let serviceUrl = "".concat(Meteor.settings.drupalFileareaQuery);
      serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
      let queryOptions = {
        data: query
      };
      DEFCON3 && console.log("fileareaQuery Getting content...!");

      try {
        const response = Promise.await(this.sendRequestAsync(serviceUrl, queryOptions));
        return response;
      } catch (e) {
        DEFCON3 && console.log("Error in fileareaQuery");
        DEFCON3 && console.log(e);
      }
    });
  }

  drupalGetUser(uid) {
    return Promise.asyncApply(() => {
      let serviceUrl = "".concat(Meteor.settings.drupalGetUser);
      serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
      let query = {
        data: {
          method: "uid",
          value: uid
        }
      };

      try {
        const response = Promise.await(this.sendRequestAsync(serviceUrl, query));
        return response;
      } catch (e) {
        DEFCON3 && console.log("Error in getUser");
        DEFCON3 && console.log(e);
      }
    });
  }

  getUserByAttribute(method, value) {
    return Promise.asyncApply(() => {
      let serviceUrl = "".concat(Meteor.settings.drupalGetUser);
      serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
      let query = {
        data: {
          method: method,
          value: value
        }
      };

      try {
        const response = Promise.await(this.sendRequestAsync(serviceUrl, query));
        return response;
      } catch (e) {
        DEFCON3 && console.log("Error in getUser");
        DEFCON3 && console.log(e);
      }
    });
  }

}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"fileManager":{"filemanager.js":function module(require){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// server/lib/fileManager/filemanager.js                                                                            //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
/**
 * Created by kacper on 6/8/16.
 */

/*
"use strict";

export default function FileManager(baseDirectory) {
  var path = Npm.require('path');
  var fs = Npm.require('fs');
  baseDirectory = baseDirectory.trim('/');
  let filesRootPath = Meteor.settings.filesRootPath;
  var basePath = `${filesRootPath}/${baseDirectory}/`;
  basePath = basePath.replace('//', '/');

  this.readInputFileAsBuffer = function (fileName) {
    try {
      var fileBuffer = fs.readFileSync(basePath + fileName);
      return fileBuffer;
    }
    catch (error) {
      throw new Error(`File ${fileName} not found`);
    }
  };

  this.readOutputFileAsBuffer = function (fileName) {
    var fileBuffer = fs.readFileSync(basePath + 'out/' + fileName);
    return fileBuffer;
  };

  this.writeBufferAsInputFile = function (fileName, writeBuffer) {
    createPathIfDoesNotExist(basePath);
    fs.writeFileSync(basePath + fileName, writeBuffer);
  };

  this.writeBufferAsOutputFile = function (fileName, writeBuffer) {
    let outPath = basePath + 'out/';
    createPathIfDoesNotExist(outPath);
    fs.writeFileSync(outPath + fileName, writeBuffer);
  };

  this.setBaseDirectory = function (baseDirectory) {
    baseDirectory = baseDirectory.trim('/');
    basePath = `${filesRootPath}/${baseDirectory}/`;
  };

  this.getBasePath = function () {
    return basePath;
  };

  this.getBaseOutPath = function () {
    return basePath + 'out';
  };

  this.listFiles = function () {
    return fs.readdirSync(basePath).reduce(function (list, file) {
      var name = path.join(basePath, file);
      if (!fs.statSync(name).isDirectory()) {
        list.push(file);
      }
      return list;
    }, []);
  };

  var createPathIfDoesNotExist = function (path) {
    var getParentPath = function (path) {
      //   root/dir1/dir2/ -> root/dir1/dir2 -> root/dir1
      path = path.replace(/\/+$/, '');
      let lastSlashIndex = path.lastIndexOf('/');
      return path.substring(0, lastSlashIndex);

    };

    if (!fs.existsSync(path)) {
       DEFCON5 && console.log(`Creating path ${path}`);
      let parentPath = getParentPath(path);
      if (!fs.existsSync(parentPath)) {
        createPathIfDoesNotExist(parentPath)
      }
      fs.mkdirSync(path);
    }
  }

}
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"chat.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// server/lib/chat.js                                                                                               //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let ChatRooms, ChatLines;
module.link("/lib/collections", {
  ChatRooms(v) {
    ChatRooms = v;
  },

  ChatLines(v) {
    ChatLines = v;
  }

}, 0);
let Constants;
module.link("/lib/constants", {
  default(v) {
    Constants = v;
  }

}, 1);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 2);

const groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

module.exportDefault({
  getChatRoomById: function (id) {
    return null;
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"order.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// server/lib/order.js                                                                                              //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.export({
  default: () => Order
});
let GudrunContentServices;
module.link("../lib/drupal/services.js", {
  default(v) {
    GudrunContentServices = v;
  }

}, 0);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 1);
let Constants;
module.link("/lib/constants", {
  default(v) {
    Constants = v;
  }

}, 2);
let dateFormat;
module.link("dateformat", {
  default(v) {
    dateFormat = v;
  }

}, 3);
let DEFCON9, DEFCON7, DEFCON5, DEFCON4, DEFCON3, DEFCON2, DEFCON1;
module.link("/debug.json", {
  DEFCON9(v) {
    DEFCON9 = v;
  },

  DEFCON7(v) {
    DEFCON7 = v;
  },

  DEFCON5(v) {
    DEFCON5 = v;
  },

  DEFCON4(v) {
    DEFCON4 = v;
  },

  DEFCON3(v) {
    DEFCON3 = v;
  },

  DEFCON2(v) {
    DEFCON2 = v;
  },

  DEFCON1(v) {
    DEFCON1 = v;
  }

}, 4);

class Order {
  constructor() {
    let Meteor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
    this.user = Meteor.user();
  }

  testConnectionContent() {
    try {
      let services = new GudrunContentServices();
      DEFCON5 && console.log("Sending notification to Gundrun");
      services.test_connection();
    } catch (error) {
      DEFCON5 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }

  orderQuery(searchText) {
    try {
      let services = new GudrunContentServices();
      DEFCON5 && console.log("Sending notification to Gundrun");
      let orders = services.queryOrder(searchText);
      DEFCON5 && console.log("Ok, get something from order ");
      return orders;
    } catch (error) {
      DEFCON5 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }

  queryOrderByPersonId(searchText) {
    try {
      let services = new GudrunContentServices();
      DEFCON5 && console.log("Sending notification to Gundrun");
      let orders = services.queryOrderByPersonId(searchText);
      DEFCON5 && console.log("Ok, get something from order ");
      return orders;
    } catch (error) {
      DEFCON5 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }

  process(request) {
    try {
      let services = new GudrunContentServices();
      DEFCON3 && console.log("Request process of order");
      let orders = services.processOrder(request);
      DEFCON3 && console.log("Ok, get some reply");
      return orders;
    } catch (error) {
      DEFCON3 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }

  queryRecentOrders() {
    try {
      let services = new GudrunContentServices();
      DEFCON5 && console.log("Sending notification to Gundrun");
      let orders = services.queryRecentOrders();
      DEFCON5 && console.log("Ok, get something from order ");
      return orders;
    } catch (error) {
      DEFCON5 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }

  queryOrderState(state, limit) {
    try {
      let services = new GudrunContentServices();
      DEFCON3 && console.log("queryOrderState");
      let orders = services.queryOrderState(state, limit);
      DEFCON3 && console.log("Ok, get something from order ");
      return orders;
    } catch (error) {
      DEFCON5 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }

  motherchecks() {
    try {
      let services = new GudrunContentServices();
      DEFCON3 && console.log("Sending motherchecks Gundrun");
      let orders = services.motherchecks();
      DEFCON3 && console.log("Ok, get something from motherchecks ");
      return orders;
    } catch (error) {
      DEFCON3 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }

  queryOrderByOrderId(searchText) {
    try {
      let services = new GudrunContentServices();
      DEFCON5 && console.log("Sending notification to Gundrun");
      let orders = services.queryOrderByOrderId(searchText);
      DEFCON5 && console.log("Ok, get something from order ");
      return orders;
    } catch (error) {
      DEFCON5 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }

  updateOrderByOrderId(order) {
    try {
      let services = new GudrunContentServices();
      DEFCON5 && console.log("Sending notification to Gundrun");
      let result = services.updateOrderByOrderId(order);
      DEFCON5 && console.log("Ok, update done - check result... ");
      return result;
    } catch (error) {
      DEFCON5 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }

  createUpdatePersonOrder(order) {
    try {
      let services = new GudrunContentServices();
      DEFCON5 && console.log("Sending notification to Gundrun"); // DEFCON5 && console.log(this.user);

      var now = new Date();
      order['field_order_state'] = 271;
      order['field_orderid'] = '';
      order['field_creator'] = this.user.uid;
      order['field_responsible'] = this.user.uid;
      order['field_order_process_method'] = order['field_order_process_method'] ? order['field_order_process_method'] : Constants.OrderProcessMethod.EXPRESS;
      order['field_effective_date'] = dateFormat(now, "yyyy-mm-dd");
      let result = services.createPersonOrder(order);
      DEFCON5 && console.log("Ok, update done - check result... ");
      return result;
    } catch (error) {
      DEFCON5 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }

  getNameTypes() {
    try {
      let services = new GudrunContentServices();
      DEFCON5 && console.log("Getting getNameTypes");
      let result = services.getTerms("nametype");
      DEFCON5 && console.log("Ok, update done - check result... ");
      return result;
    } catch (error) {
      DEFCON5 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }

  getTerms(termtype) {
    try {
      let services = new GudrunContentServices();
      DEFCON5 && console.log("Getting getTerms");
      let result = services.getTerms(termtype);
      DEFCON5 && console.log("Ok, update done - check result... ");
      return result;
    } catch (error) {
      DEFCON5 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }

  queryTerms(termtype, searchText) {
    try {
      let services = new GudrunContentServices();
      DEFCON5 && console.log("Getting queryTerms");
      let result = services.queryTerms(termtype, searchText);
      DEFCON5 && console.log("Ok, update done - check result... ");
      return result;
    } catch (error) {
      DEFCON5 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }

  queryTermsCountry(dataContext) {
    try {
      let services = new GudrunContentServices();
      DEFCON5 && console.log("Getting queryTermsCountry");
      let result = services.queryTermsCountry(dataContext);
      DEFCON5 && console.log("Ok, update done - check result... ");
      return result;
    } catch (error) {
      DEFCON5 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }

  queryPersonById(searchText) {
    try {
      let services = new GudrunContentServices();
      DEFCON5 && console.log("Sending notification to Gundrun");
      let orders = services.queryPersonById(searchText);
      DEFCON5 && console.log("Ok, get something from person-object ");
      return orders;
    } catch (error) {
      DEFCON5 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }

  queryPerson(searchText, meta) {
    try {
      let services = new GudrunContentServices();
      DEFCON5 && console.log("Query stuff from Gudrun");
      DEFCON5 && console.log("Check Meta structure");
      DEFCON5 && console.log(meta);
      let orders = services.queryPerson(searchText, meta);
      DEFCON5 && console.log("Ok, get something from person-object ");
      return orders;
    } catch (error) {
      DEFCON5 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }

  queryRoleAdvanced(searchText, queryRoles) {
    try {
      let services = new GudrunContentServices();
      DEFCON5 && console.log("Query stuff ADVANCED ROLE from Gudrun");
      DEFCON5 && console.log("Check queryRoles structure");
      DEFCON5 && console.log(queryRoles);
      let orders = services.queryRoleAdvanced(searchText, queryRoles);
      DEFCON5 && console.log("Ok, get something from ROLE person-object ");
      DEFCON5 && console.log(orders);
      return orders;
    } catch (error) {
      DEFCON5 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }

  queryPersonAdvanced(searchText) {
    try {
      let services = new GudrunContentServices();
      DEFCON5 && console.log("Query stuff from Gudrun");
      let orders = services.queryPersonAdvanced(searchText);
      DEFCON5 && console.log("Ok, get something from person-object ");
      DEFCON5 && console.log(orders);
      return orders;
    } catch (error) {
      DEFCON5 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }

  livestream(searchText) {
    try {
      let services = new GudrunContentServices();
      DEFCON5 && console.log("Get livestream");
      let orders = services.livestream(searchText);
      DEFCON5 && console.log("Ok, get something from order ");
      return orders;
    } catch (error) {
      DEFCON5 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }

}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"configs":{"initial_adds.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// server/configs/initial_adds.js                                                                                   //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let chatlines;
module.link("/lib/collections", {
  chatlines(v) {
    chatlines = v;
  }

}, 0);
module.exportDefault(function () {});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"initial_users.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// server/configs/initial_users.js                                                                                  //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
module.exportDefault(() => {
  if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
      email: 'test@test.com',
      password: 'test1234'
    });
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"methods":{"_users.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// server/methods/_users.js                                                                                         //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let check;
module.link("meteor/check", {
  check(v) {
    check = v;
  }

}, 1);
let Random;
module.link("meteor/random", {
  Random(v) {
    Random = v;
  }

}, 2);
let DrupalServices;
module.link("../lib/drupal/services.js", {
  default(v) {
    DrupalServices = v;
  }

}, 3);
let DEFCON9, DEFCON7, DEFCON5, DEFCON4, DEFCON3, DEFCON2, DEFCON1;
module.link("/debug.json", {
  DEFCON9(v) {
    DEFCON9 = v;
  },

  DEFCON7(v) {
    DEFCON7 = v;
  },

  DEFCON5(v) {
    DEFCON5 = v;
  },

  DEFCON4(v) {
    DEFCON4 = v;
  },

  DEFCON3(v) {
    DEFCON3 = v;
  },

  DEFCON2(v) {
    DEFCON2 = v;
  },

  DEFCON1(v) {
    DEFCON1 = v;
  }

}, 4);
module.exportDefault(function () {
  Meteor.methods({
    "_users.getUserList"(query) {
      check(query, Object);
      DEFCON5 && console.log("Running Query to get Users");
      DEFCON5 && console.log(query);
      var chatUsers = Meteor.users.find(query).fetch();
      return chatUsers;
    },

    "_users.getLanguagePreference"(_id) {
      check(_id, String);
      let record = Meteor.users.findOne(_id);
      if (record && record.get("language")) return record.get("language");
      const locale = Meteor.settings["public"].defaultLocale;
      return locale ? locale : "sv";
    },

    "_users.setLanguagePreference"(_id, lang) {
      check(_id, String);
      check(lang, String); // Meteor.users.update({_id: _id}, {set: {language: lang}})

      let record = Meteor.users.findOne(_id);

      if (record) {
        record.set("language", lang);
        record.save();
      }
    },

    "_users.getTheme"(_id) {
      check(_id, String);
      let record = Meteor.users.findOne(_id);
      if (record && record.get("theme")) return record.get("theme");
      return true;
    },

    "_users.setTheme"(_id, theme) {
      check(_id, String);
      check(theme, Boolean);
      DEFCON5 && console.log("Set Theme for user " + _id);
      DEFCON5 && console.log("Theme value " + theme);
      let record = Meteor.users.findOne(_id);

      if (record) {
        record.set("theme", theme);
        record.save();
      }
    },

    "_users.updateProfileDescription"(userId, text) {
      check(userId, String);
      check(text, String);

      if (!this.userId || this.userId !== userId) {
        throw new Meteor.Error(401, "Access denied");
      }

      let updated = Meteor.users.update({
        _id: userId
      }, {
        $set: {
          profile: text
        }
      });

      if (updated) {
        return "Description updated";
      } else {
        return "Description not updated! Please try again.";
      }
    },

    "_users.updateName"(userId, text) {
      check(userId, String);
      check(text, String);

      if (!this.userId || this.userId !== userId) {
        throw new Meteor.Error(401, "Access denied");
      }

      let updated = Meteor.users.update({
        _id: userId
      }, {
        $set: {
          name: text
        }
      });

      if (updated) {
        return "Name updated";
      } else {
        return "Name not updated! Please try again.";
      }
    },

    "_users.anonymize"(userId) {
      check(userId, String);

      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }

      if (false) {
        const newUser = {
          name: Random.id(),
          "emails.0.address": Random.id(),
          avatar_uri: ""
        };
        let updated = Meteor.users.update({
          _id: userId
        }, {
          $set: newUser
        });

        if (updated) {
          return "User anonymize successful";
        } else {
          return "User anonymize failure! Please try again.";
        }
      } else {
        throw new Meteor.Error(401, "Access denied - administrator role required");
      }
    },

    "_users.isAdmin"() {
      return Promise.asyncApply(() => {
        //this allows catching exceptions properly:
        const doWork = () => Promise.asyncApply(() => {
          //TODO: Create a proper Get User Role function for Miclab here... atm all users are the same base user
          // let adminsCompanyId = await getAdministratedCompanyId();
          DEFCON5 && console.log("Is admin returned:");
          DEFCON5 && console.log(adminsCompanyId);
          return adminsCompanyId && adminsCompanyId > 0;
        });

        try {
          return Promise.await(doWork());
        } catch (e) {
          throw new Meteor.Error(e.error, e.reason);
        }
      });
    },

    "_users.getRoles"() {
      return Promise.asyncApply(() => {
        if (!this.userId) {
          DEFCON5 && console.log("_users.getRoles - Access denied");
          throw new Meteor.Error(401, "Access denied");
        }

        const services = new DrupalServices(); //TODO: Create a proper Get User Role function for Miclab here... atm all users are the same base user
        // let adminsCompanyId = await getAdministratedCompanyId();
        //const roles = await services.getUserRoles(Meteor.user().uid);

        let roles = [];
        DEFCON5 && console.log("Roles returned:");
        DEFCON5 && console.log(roles);
        return roles;
      });
    },

    "_users.getCompanyUsers"() {
      return Promise.asyncApply(() => {
        if (!this.userId) {
          throw new Meteor.Error(401, "Access denied");
        }

        return getCompanyUsers();
      });
    },

    "_users.manage"(uid, action) {
      return Promise.asyncApply(() => {
        check(uid, String);
        check(action, String); //this allows catching exceptions properly:

        const doWork = () => Promise.asyncApply(() => {
          if (!this.userId) {
            DEFCON5 && console.log("_users.activate - Access denied");
            throw new Meteor.Error(401, "Access denied");
          }

          const services = new DrupalServices();
          const administratedCompanyId = Promise.await(getAdministratedCompanyId());

          if (administratedCompanyId) {
            const response = Promise.await(services.manageUser(uid, action, administratedCompanyId));
            DEFCON5 && console.log("Action ".concat(action, " for user ").concat(uid, " successful"));
            return response;
          }

          DEFCON5 && console.log("Action ".concat(action, " for user ").concat(uid, " failed"));
          DEFCON5 && console.log("User ".concat(this.userId, " is not an admin"));
          return null;
        });

        try {
          return Promise.await(doWork());
        } catch (e) {
          throw new Meteor.Error(e.error, e.reason);
        }
      });
    },

    "_users.createMyAccount"(user) {
      return Promise.asyncApply(() => {
        check(user, Object);
        DEFCON3 && console.log("_users.createMyAccount - start");
        DEFCON3 && console.log(user); //this allows catching exceptions properly:

        const doWork = () => Promise.asyncApply(() => {
          const services = new DrupalServices();
          const response = Promise.await(services.drupalInsertUser(user));

          try {
            DEFCON5 && console.log("Action addUser for user ".concat(user, " successful"));
            DEFCON3 && console.log("The response...");
            DEFCON3 && console.log(response);
            return response;
          } catch (e) {
            DEFCON3 && console.log("Action drupalInsertUser for user ".concat(user, " failed"));
            DEFCON3 && console.log(e);
            return null;
          }
        });

        try {
          return Promise.await(doWork());
        } catch (e) {
          DEFCON5 && console.log("Action addUser for user ".concat(user, " failed"));
          throw new Meteor.Error(e.error, e.reason);
        }
      });
    },

    "_users.add"(user) {
      return Promise.asyncApply(() => {
        check(user, Object); //this allows catching exceptions properly:

        const doWork = () => Promise.asyncApply(() => {
          if (!this.userId) {
            DEFCON5 && console.log("_users.activate - Access denied");
            throw new Meteor.Error(401, "Access denied");
          }

          const services = new DrupalServices();
          const administratedCompanyId = Promise.await(getAdministratedCompanyId());

          if (administratedCompanyId) {
            const response = Promise.await(services.addUser(user, administratedCompanyId));
            DEFCON5 && console.log("Action addUser for user ".concat(user, " successful"));
            return response;
          }

          DEFCON5 && console.log("Action addUser for user ".concat(user, " failed"));
          DEFCON5 && console.log("User ".concat(this.userId, " is not an admin"));
          return null;
        });

        try {
          return Promise.await(doWork());
        } catch (e) {
          throw new Meteor.Error(e.error, e.reason);
        }
      });
    },

    "_users.syncDrupalUser"(userid, uid) {
      return Promise.asyncApply(() => {
        check(uid, String);
        check(userid, String);
        return syncDrupalUser(userid, uid);
      });
    },

    "_users.syncDrupalUserOld"(userid, uid) {
      return Promise.asyncApply(() => {
        DEFCON3 && console.log("_users.syncDrupalUser");
        DEFCON3 && console.log("Sync and update user " + uid);
        check(uid, String); //this allows catching exceptions properly:

        const doWork = () => Promise.asyncApply(() => {
          // if (!this.userId) {
          //   DEFCON5 && console.log("_users.syncDrupalUser - Access denied");
          //   throw new Meteor.Error(401, "Access denied");
          // }
          const services = new DrupalServices();
          const response = Promise.await(services.getDrupalUser(uid));
          Meteor.users.update(this.userId, {
            $set: {
              avatar_uri: response.uri,
              first_name: response.field_first_name,
              last_name: response.field_last_name,
              information: response.field_information,
              telephone: response.field_telephone_number
            }
          });
          return response;
        });

        try {
          return Promise.await(doWork());
        } catch (e) {
          throw new Meteor.Error(e.error, e.reason);
        }
      });
    },

    "_users.getUserByAttribute"(method, value) {
      return Promise.asyncApply(() => {
        check(method, String);
        check(value, String);
        return getUserByAttribute(method, value);
      });
    },

    "_users.userWithNameExist"(method, value) {
      return Promise.asyncApply(() => {
        check(method, String);
        check(value, String);
        result = Promise.await(getUserByAttribute(method, value));
        DEFCON3 && console.log("Checking result ");
        DEFCON3 && console.log(result);
        return result !== undefined ? result.value !== "" ? true : false : false;
      });
    }

  });
});

const getAdministratedCompanyId = () => Promise.asyncApply(() => {
  const currentUid = Meteor.user() && Meteor.user().uid;
  const services = new DrupalServices();
  const roles = Promise.await(services.getUserRoles(currentUid)); //get a company that user is admin for?

  return roles && roles.admin && roles.admin[0];
});

const getCompanyUsers = () => Promise.asyncApply(() => {
  const services = new DrupalServices();
  const administratedCompanyId = Promise.await(getAdministratedCompanyId());

  if (administratedCompanyId) {
    const users = Promise.await(services.getCompanyUsers(administratedCompanyId));
    return users;
  }

  return [];
});

const syncDrupalUser = (userid, uid) => Promise.asyncApply(() => {
  DEFCON3 && console.log("_users.syncDrupalUser");
  DEFCON3 && console.log("Sync and update user " + uid); //this allows catching exceptions properly:
  // if (!this.userId) {
  //   DEFCON5 && console.log("_users.syncDrupalUser - Access denied");
  //   throw new Meteor.Error(401, "Access denied");
  // }

  const services = new DrupalServices();
  const response = Promise.await(services.drupalGetUser(uid));
  Meteor.users.update(userid, {
    $set: {
      avatar_uri: response.uri,
      first_name: response.field_first_name,
      last_name: response.field_last_name,
      information: response.field_information,
      telephone: response.field_telephone_number
    }
  });
  return response;
});

const getUserByAttribute = (method, value) => Promise.asyncApply(() => {
  DEFCON3 && console.log("getUserByAttribute");
  DEFCON3 && console.log("Getting a user with method and value ".concat(method, " ").concat(value));
  const services = new DrupalServices();
  const response = Promise.await(services.getUserByAttribute(method, value));
  return response;
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"account.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// server/methods/account.js                                                                                        //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
!function (module1) {
  let Meteor;
  module1.link("meteor/meteor", {
    Meteor(v) {
      Meteor = v;
    }

  }, 0);
  let check, Match;
  module1.link("meteor/check", {
    check(v) {
      check = v;
    },

    Match(v) {
      Match = v;
    }

  }, 1);
  let Order;
  module1.link("../lib/order.js", {
    default(v) {
      Order = v;
    }

  }, 2);
  let Persons, SearchLog;
  module1.link("/lib/collections", {
    Persons(v) {
      Persons = v;
    },

    SearchLog(v) {
      SearchLog = v;
    }

  }, 3);
  let DEFCON9, DEFCON7, DEFCON5, DEFCON4, DEFCON3, DEFCON2, DEFCON1;
  module1.link("/debug.json", {
    DEFCON9(v) {
      DEFCON9 = v;
    },

    DEFCON7(v) {
      DEFCON7 = v;
    },

    DEFCON5(v) {
      DEFCON5 = v;
    },

    DEFCON4(v) {
      DEFCON4 = v;
    },

    DEFCON3(v) {
      DEFCON3 = v;
    },

    DEFCON2(v) {
      DEFCON2 = v;
    },

    DEFCON1(v) {
      DEFCON1 = v;
    }

  }, 4);
  let Constants;
  module1.link("/lib/constants", {
    default(v) {
      Constants = v;
    }

  }, 5);
  let DrupalServices;
  module1.link("../lib/drupal/services", {
    default(v) {
      DrupalServices = v;
    }

  }, 6);
  DEFCON5 && console.log("In Account");
  var staleSessionPurgeInterval = Meteor.settings && Meteor.settings.public && Meteor.settings.public.staleSessionPurgeInterval || 1 * 60 * 1000; // 1min

  var inactivityTimeout = Meteor.settings && Meteor.settings.public && Meteor.settings.public.staleSessionInactivityTimeout || 30 * 60 * 1000; // 30mins

  var forceLogout = Meteor.settings && Meteor.settings.public && Meteor.set;
  module1.exportDefault(function () {
    Meteor.methods({
      "account.setPw"(query) {
        return Promise.asyncApply(() => {
          check(query, Object);
          let userObj = Meteor.users.findOne(this.userId);
          query.uid = userObj.uid;
          DEFCON5 && console.log("Account setPw");

          const doWork = () => Promise.asyncApply(() => {
            const services = new DrupalServices();
            const response = Promise.await(services.accountSetPw(query));
            DEFCON5 && console.log("Method Account setPw");
            return response;
          });

          try {
            return Promise.await(doWork());
          } catch (e) {
            throw new Meteor.Error(e.error, e.reason);
          }
        });
      },

      heartbeat: function (options) {
        DEFCON5 && console.log("Heartbeat check - if user should reConnect");
        var user = Meteor.users.findOne(this.userId);
        DEFCON5 && console.log(this.userId);

        if (user) {
          DEFCON5 && console.log("Get user and update heartbeat...");
          DEFCON5 && console.log(user.uid + " " + user.name);
          Meteor.users.update(user._id, {
            $set: {
              heartbeat: new Date()
            }
          });
        } else {
          DEFCON5 && console.log("This userid is not set...");
        } // if (user) {
        //   DEFCON5 && console.log(`Get user and update heartbeat...`);
        //   DEFCON5 && console.log(user.uid + " " + user.username);
        //   Meteor.users.update(user._id, { $set: { heartbeat: new Date() } });
        // }

      } //

    });
  });

  //
  // periodically purge any stale sessions, removing their login tokens and clearing out the stale heartbeat.
  //
  if (forceLogout !== false) {
    DEFCON5 && console.log("HeartBeatCheck Setup...");
    DEFCON5 && console.log(staleSessionPurgeInterval);
    Meteor.setInterval(function () {
      DEFCON5 && console.log("HeartBeatCheck Server Check...");
      var now = new Date(),
          overdueTimestamp = new Date(now - inactivityTimeout);
      DEFCON5 && console.log(inactivityTimeout);
      DEFCON5 && console.log(overdueTimestamp);
      DEFCON5 && console.log(staleSessionPurgeInterval);
      Meteor.users.update({
        heartbeat: {
          $lt: overdueTimestamp
        }
      }, {
        $set: {
          "services.resume.loginTokens": []
        },
        $unset: {
          heartbeat: 1
        }
      }, {
        multi: true
      });
    }, staleSessionPurgeInterval);
  }

  Future = Npm.require("fibers/future"); // At a minimum, set up LDAP_DEFAULTS.url and .dn according to
  // your needs. url should appear as 'ldap://your.url.here'
  // dn should appear in normal ldap format of comma separated attribute=value
  // e.g. 'uid=someuser,cn=users,dc=somevalue'

  DRUPAL_DEFAULTS = {
    url: false,
    port: "389",
    dn: false,
    searchDN: false,
    searchSizeLimit: 100,
    searchCredentials: false,
    createNewUser: true,
    defaultDomain: false,
    searchResultsProfileMap: false,
    base: null,
    search: "(objectclass=*)",
    ldapsCertificate: false,
    bindToDomain: false,
    bindDomain: null
  };
  LDAP = {};
  /**
   @class LDAP
   @constructor
   */

  LDAP.create = function (options) {
    // Set options
    this.options = _.defaults(options, DRUPAL_DEFAULTS); // Make sure options have been set

    try {// check(this.options.url, String);
      // check(this.options.dn, String);
    } catch (e) {
      throw new Meteor.Error("Bad Defaults", "Options not set. Make sure to set LDAP_DEFAULTS.url and LDAP_DEFAULTS.dn!");
    } // // Because NPM ldapjs module has some binary builds,
    // // We had to create a wraper package for it and build for
    // // certain architectures. The package typ:ldap-js exports
    // // 'MeteorWrapperLdapjs' which is a wrapper for the npm module
    // this.ldapjs = MeteorWrapperLdapjs;

  };
  /**
   * Attempt to bind (authenticate) ldap
   * and perform a dn search if specified
   *
   * @method ldapCheck
   *
   * @param {Object} [options]  Object with username, ldapPass and overrides for LDAP_DEFAULTS object.
   * Additionally the searchBeforeBind parameter can be specified, which is used to search for the DN
   * if not provided.
   * @param {boolean} [bindAfterFind]  Whether or not to try to login with the supplied credentials or
   * just return whether or not the user exists.
   */


  LDAP.create.prototype.drupalCheck = function (options, bindAfterFind) {
    var self = this;
    DEFCON3 && console.log("Login Check Drupal (NEW)"); // DEFCON3 && console.log('drupalCheck');

    options = options || {};

    if (options.hasOwnProperty("username") && options.hasOwnProperty("ldapPass") || !bindAfterFind) {
      var ldapAsyncFut = new Future();

      try {
        HTTP.get(Meteor.settings["drupalTokenUrl"], undefined, function (err, tokenResult) {
          if (err) {
            ldapAsyncFut.return({
              error: err
            });
          } else {
            var user_data = {
              username: options.username,
              password: options.ldapPass
            };

            if (!tokenResult.content) {
              ldapAsyncFut.return({
                error: new Meteor.Error("500", "missing token in response")
              });
              return;
            } // eslint-disable-next-line quote-props


            const headers = {
              "Content-Type": "application/json",
              "X-CSRF-Token": tokenResult.content,
              strictSSL: "false"
            };
            var params = {
              headers,
              data: user_data
            };
            HTTP.post(Meteor.settings["drupalLoginUrl"], params, function (err, loginResult) {
              if (err) {
                ldapAsyncFut.return({
                  error: err
                });
              } else {
                // DEFCON3 && console.log(loginResult);
                var retObject = {};

                try {
                  retObject.username = loginResult.data.user.name;

                  if (!retObject.username) {
                    throw new Error("user name is empty");
                  }

                  retObject.email = loginResult.data.user.mail;

                  if (!retObject.email) {
                    throw new Error("user email is empty");
                  }

                  retObject.uid = loginResult.data.user.uid;
                  ldapAsyncFut.return(retObject);
                } catch (err) {
                  ldapAsyncFut.return({
                    error: new Meteor.Error(err.code, err.message)
                  });
                }
              }
            });
          }
        });
        return ldapAsyncFut.wait();
      } catch (err) {
        ldapAsyncFut.return({
          error: new Meteor.Error(err.code, err.message)
        });
      }
    } else {
      throw new Meteor.Error(403, "Missing Auth Parameters");
    }
  }; // Register login handler with Meteor
  // Here we create a new LDAP instance with options passed from
  // Meteor.loginWithLDAP on client side
  // @param {Object} loginRequest will consist of username, ldapPass, ldap, and ldapOptions


  Accounts.registerLoginHandler("drupal", function (loginRequest) {
    // If 'ldap' isn't set in loginRequest object,
    // then this isn't the proper handler (return undefined)
    DEFCON3 && console.log("REGISTER LOGIN HANDLER REQUEST (NEW):");
    DEFCON3 && console.log(loginRequest);

    if (!loginRequest.drupal) {
      return undefined;
    } // Instantiate LDAP with options


    var userOptions = loginRequest.ldapOptions || {};
    Accounts.ldapObj = new LDAP.create(userOptions); // Call ldapCheck and get response

    var response = Accounts.ldapObj.drupalCheck(loginRequest, true);

    if (response.error) {
      return {
        userId: null,
        error: response.error
      };
    } // Set initial userId and token vals


    var userId = null;
    var stampedToken = {
      token: null
    };
    DEFCON3 && console.log("response:");
    DEFCON3 && console.log(response); // Look to see if user already exists

    var user = Meteor.users.findOne({
      // username: response.username
      "emails.address": response.email
    });

    if (!user) {
      user = Meteor.users.findOne({
        emails: {
          $elemMatch: {
            address: response.email,
            verified: true
          }
        }
      });

      if (user) {
        user.username = response.username;
      }
    } // Login user if they exist


    if (user) {
      userId = user._id; // Create hashed token so user stays logged in

      stampedToken = Accounts._generateStampedLoginToken();

      var hashStampedToken = Accounts._hashStampedToken(stampedToken); // Update the user's token in mongo


      Meteor.users.update(userId, {
        $push: {
          "services.resume.loginTokens": hashStampedToken
        }
      });
      DEFCON3 && console.log("User exists!");
      Accounts.setPassword(userId, loginRequest.ldapPass);
      Meteor.call("_users.syncDrupalUser", userId, response.uid, (err, response) => {
        // if (callback) {
        //   if (err) {
        //     callback(err);
        //   } else {
        //     callback(null, response);
        //   }
        // }
        if (err) {
          DEFCON3 && console.log("actions._users.manage error: " + err);
        }
      });
    } // Otherwise create user if option is set
    else if (Accounts.ldapObj.options.createNewUser) {
        DEFCON3 && console.log("Creating new user");
        var userObject = {
          username: response.username
        };
        userId = Accounts.createUser(userObject);
        DEFCON3 && console.log(userObject);
        Meteor.users.update(userId, {
          $set: {
            emails: [{
              address: response.email,
              verified: true
            }],
            uid: response.uid
          }
        });
        Accounts.setPassword(userId, loginRequest.ldapPass);
        Meteor.call("_users.syncDrupalUser", userId, response.uid, (err, response) => {
          // if (callback) {
          //   if (err) {
          //     callback(err);
          //   } else {
          //     callback(null, response);
          //   }
          // }
          if (err) {
            DEFCON3 && console.log("actions._users.manage error: " + err);
          }
        });
      } else {
        // Ldap success, but no user created
        DEFCON3 && console.log("Authentication succeeded for " + response.username + ", but no user exists in Meteor. Either create the user manually or set DRUPA_DEFAULTS.createNewUser to true");
        return {
          userId: null,
          error: new Meteor.Error(403, "User found in LDAP but not in application")
        };
      }

    return {
      userId,
      token: stampedToken.token
    };
  });
}.call(this, module);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"chatlinelists.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// server/methods/chatlinelists.js                                                                                  //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let ChatLineLists, ChatLines;
module.link("/lib/collections", {
  ChatLineLists(v) {
    ChatLineLists = v;
  },

  ChatLines(v) {
    ChatLines = v;
  }

}, 0);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 1);
let check, Match;
module.link("meteor/check", {
  check(v) {
    check = v;
  },

  Match(v) {
    Match = v;
  }

}, 2);
let DEFCON9, DEFCON7, DEFCON5, DEFCON4, DEFCON3, DEFCON2, DEFCON1;
module.link("/debug.json", {
  DEFCON9(v) {
    DEFCON9 = v;
  },

  DEFCON7(v) {
    DEFCON7 = v;
  },

  DEFCON5(v) {
    DEFCON5 = v;
  },

  DEFCON4(v) {
    DEFCON4 = v;
  },

  DEFCON3(v) {
    DEFCON3 = v;
  },

  DEFCON2(v) {
    DEFCON2 = v;
  },

  DEFCON1(v) {
    DEFCON1 = v;
  }

}, 3);
let Constants;
module.link("/lib/constants", {
  default(v) {
    Constants = v;
  }

}, 4);
DEFCON5 && console.log('In chatlinelists server, getting the stuff');
module.exportDefault(function () {
  Meteor.methods({
    'chatlinelists.addChatLine'(channelId, line) {
      if (!this.userId) {
        throw new Meteor.Error(401, 'Access denied');
      }

      check(channelId, String);
      check(line, String);

      const currentUser = Meteor.user()._id;

      const currentUserId = Meteor.user()._id;

      const currentDate = new Date();
      let chatLine = {};
      chatLine.text = line;
      chatLine.channelId = channelId;
      chatLine.modifiedBy = currentUser;
      chatLine.createdByName = currentUser;
      chatLine.createdBy = currentUserId;
      chatLine.modifiedAt = currentDate;
      chatLine.createdAt = currentDate;
      chatLine.status = 'active';
      let lineId = ChatLines.insert(chatLine);
      DEFCON5 && console.log('In chatlinelists.addChatLine method returning ' + lineId);
      return lineId;
    }

  });
  Meteor.methods({
    'chatlinelists.removeChatLine'(containerId, lineId) {
      if (!this.userId) {
        throw new Meteor.Error(401, 'Access denied');
      }

      check(containerId, String);
      check(lineId, String);
      /*
      if (ArticleStatus.isContainerTypeReadOnly(channelId, Constants.ContainerTypes.CHATLINES)) {
         DEFCON5 && console.log('In chatlinelists.removeChatLine method and read only channel: ' + channelId);
        throw new Meteor.Error("Line cannot be removed because of channel's state");
      }
      */

      const currentUser = Meteor.user()._id;

      const currentDate = new Date();
      ChatLines.update(lineId, {
        $set: {
          status: 'deleted',
          modifiedBy: currentUser,
          modifiedAt: currentDate
        }
      });
      DEFCON5 && console.log('In chatlinelists.removeChatLine method returning ' + lineId);
      return lineId;
    }

  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"contact.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// server/methods/contact.js                                                                                        //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let check, Match;
module.link("meteor/check", {
  check(v) {
    check = v;
  },

  Match(v) {
    Match = v;
  }

}, 1);
let Order;
module.link("../lib/order.js", {
  default(v) {
    Order = v;
  }

}, 2);
let Persons, SearchLog;
module.link("/lib/collections", {
  Persons(v) {
    Persons = v;
  },

  SearchLog(v) {
    SearchLog = v;
  }

}, 3);
let DEFCON9, DEFCON7, DEFCON5, DEFCON4, DEFCON3, DEFCON2, DEFCON1;
module.link("/debug.json", {
  DEFCON9(v) {
    DEFCON9 = v;
  },

  DEFCON7(v) {
    DEFCON7 = v;
  },

  DEFCON5(v) {
    DEFCON5 = v;
  },

  DEFCON4(v) {
    DEFCON4 = v;
  },

  DEFCON3(v) {
    DEFCON3 = v;
  },

  DEFCON2(v) {
    DEFCON2 = v;
  },

  DEFCON1(v) {
    DEFCON1 = v;
  }

}, 4);
let Constants;
module.link("/lib/constants", {
  default(v) {
    Constants = v;
  }

}, 5);
let DrupalServices;
module.link("../lib/drupal/services", {
  default(v) {
    DrupalServices = v;
  }

}, 6);
DEFCON5 && console.log("In Search server part");
/**
 * query:
 {
    name,
    email,
    email2,
    phone,
    content
}
 **/

module.exportDefault(function () {
  Meteor.methods({
    'contact.sendQuestion'(query) {
      return Promise.asyncApply(() => {
        check(query, Object);
        DEFCON5 && console.log("contact.sendQuestion");

        const doWork = () => Promise.asyncApply(() => {
          // any user Can send message - guest as logged in users...
          // if (!this.userId) {
          //   DEFCON5 && console.log('contact.sendQuestion - Access denied');
          //   throw new Meteor.Error(401, 'Access denied');
          // }
          const services = new DrupalServices();
          const response = Promise.await(services.sendQuestion(query));
          DEFCON5 && console.log("Method sendQuestion successful");
          return null;
        });

        try {
          return Promise.await(doWork());
        } catch (e) {
          throw new Meteor.Error(e.error, e.reason);
        }
      });
    }

  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"content.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// server/methods/content.js                                                                                        //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let check, Match;
module.link("meteor/check", {
  check(v) {
    check = v;
  },

  Match(v) {
    Match = v;
  }

}, 1);
let Order;
module.link("../lib/order.js", {
  default(v) {
    Order = v;
  }

}, 2);
let Persons, SearchLog;
module.link("/lib/collections", {
  Persons(v) {
    Persons = v;
  },

  SearchLog(v) {
    SearchLog = v;
  }

}, 3);
let DEFCON9, DEFCON7, DEFCON5, DEFCON4, DEFCON3, DEFCON2, DEFCON1;
module.link("/debug.json", {
  DEFCON9(v) {
    DEFCON9 = v;
  },

  DEFCON7(v) {
    DEFCON7 = v;
  },

  DEFCON5(v) {
    DEFCON5 = v;
  },

  DEFCON4(v) {
    DEFCON4 = v;
  },

  DEFCON3(v) {
    DEFCON3 = v;
  },

  DEFCON2(v) {
    DEFCON2 = v;
  },

  DEFCON1(v) {
    DEFCON1 = v;
  }

}, 4);
let Constants;
module.link("/lib/constants", {
  default(v) {
    Constants = v;
  }

}, 5);
let DrupalServices;
module.link("../lib/drupal/services", {
  default(v) {
    DrupalServices = v;
  }

}, 6);
DEFCON5 && console.log("In Search server part");
/**
 * query:
 {
    name,
    email,
    email2,
    phone,
    content
}
 **/

module.exportDefault(function () {
  Meteor.methods({
    'content.getArticle'(query) {
      return Promise.asyncApply(() => {
        check(query, Object);
        DEFCON5 && console.log("content.getArticle");

        const doWork = () => Promise.asyncApply(() => {
          //TODO: Articles should be possible to access anytime
          // if (!this.userId) {
          //   DEFCON5 && console.log("content.getArticle - Access denied");
          //   throw new Meteor.Error(401, 'Access denied');
          // }
          const services = new DrupalServices();
          const response = Promise.await(services.getArticle(query));
          DEFCON5 && console.log("Method getArticle successful");
          return response;
        });

        try {
          return Promise.await(doWork());
        } catch (e) {
          throw new Meteor.Error(e.error, e.reason);
        }
      });
    }

  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"filearea.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// server/methods/filearea.js                                                                                       //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let check, Match;
module.link("meteor/check", {
  check(v) {
    check = v;
  },

  Match(v) {
    Match = v;
  }

}, 1);
let Order;
module.link("../lib/order.js", {
  default(v) {
    Order = v;
  }

}, 2);
let Persons, SearchLog;
module.link("/lib/collections", {
  Persons(v) {
    Persons = v;
  },

  SearchLog(v) {
    SearchLog = v;
  }

}, 3);
let DEFCON9, DEFCON7, DEFCON5, DEFCON4, DEFCON3, DEFCON2, DEFCON1;
module.link("/debug.json", {
  DEFCON9(v) {
    DEFCON9 = v;
  },

  DEFCON7(v) {
    DEFCON7 = v;
  },

  DEFCON5(v) {
    DEFCON5 = v;
  },

  DEFCON4(v) {
    DEFCON4 = v;
  },

  DEFCON3(v) {
    DEFCON3 = v;
  },

  DEFCON2(v) {
    DEFCON2 = v;
  },

  DEFCON1(v) {
    DEFCON1 = v;
  }

}, 4);
let Constants;
module.link("/lib/constants", {
  default(v) {
    Constants = v;
  }

}, 5);
let DrupalServices;
module.link("../lib/drupal/services", {
  default(v) {
    DrupalServices = v;
  }

}, 6);
DEFCON3 && console.log("In Search server part");
/**
 * query:
 {
    name,
    email,
    email2,
    phone,
    content
}
 **/

module.exportDefault(function () {
  Meteor.methods({
    "filearea.fileareaQuery"(query) {
      return Promise.asyncApply(() => {
        check(query, Object);
        DEFCON3 && console.log("filearea.fileareaQuery");

        const doWork = () => Promise.asyncApply(() => {
          if (!this.userId) {
            DEFCON3 && console.log("filearea.fileareaQuery - Access denied");
            throw new Meteor.Error(401, "Access denied");
          }

          DEFCON3 && console.log("Get Current user");
          let userObj = Meteor.users.findOne(this.userId);
          query.meta_acting_user = userObj.uid;
          DEFCON3 && console.log("Doing request");
          DEFCON3 && console.log(query);
          const services = new DrupalServices();
          const response = Promise.await(services.fileareaQuery(query));
          DEFCON3 && console.log("Method fileareaQuery successful");
          return response;
        });

        try {
          return Promise.await(doWork());
        } catch (e) {
          throw new Meteor.Error(e.error, e.reason);
        }
      });
    }

  });
  Meteor.methods({
    "filearea.fileareaGetItem"(query) {
      return Promise.asyncApply(() => {
        check(query, Object);
        DEFCON3 && console.log("filearea.fileareaGetItem");

        const doWork = () => Promise.asyncApply(() => {
          if (!this.userId) {
            DEFCON3 && console.log("filearea.fileareaGetItem - Access denied");
            throw new Meteor.Error(401, "Access denied");
          }

          DEFCON3 && console.log("Get Current user");
          let userObj = Meteor.users.findOne(this.userId);
          query.meta_acting_user = userObj.uid;
          const services = new DrupalServices();
          DEFCON3 && console.log("Doing request");
          DEFCON3 && console.log(query);
          const response = Promise.await(services.fileareaGetFile(query));
          DEFCON3 && console.log("Method fileareaGetItem successful");
          DEFCON3 && console.log(response);
          return response;
        });

        try {
          return Promise.await(doWork());
        } catch (e) {
          throw new Meteor.Error(e.error, e.reason);
        }
      });
    }

  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// server/methods/index.js                                                                                          //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let _users;

module.link("./_users", {
  default(v) {
    _users = v;
  }

}, 0);
let chatlinelists;
module.link("./chatlinelists", {
  default(v) {
    chatlinelists = v;
  }

}, 1);
let orders;
module.link("./orders", {
  default(v) {
    orders = v;
  }

}, 2);
let search;
module.link("./search", {
  default(v) {
    search = v;
  }

}, 3);
let log;
module.link("./log", {
  default(v) {
    log = v;
  }

}, 4);
let contact;
module.link("./contact", {
  default(v) {
    contact = v;
  }

}, 5);
let content;
module.link("./content", {
  default(v) {
    content = v;
  }

}, 6);
let filearea;
module.link("./filearea", {
  default(v) {
    filearea = v;
  }

}, 7);
let account;
module.link("./account", {
  default(v) {
    account = v;
  }

}, 8);
module.exportDefault(function () {
  _users();

  chatlinelists();
  orders();
  search();
  contact();
  content();
  filearea();
  account();
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"log.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// server/methods/log.js                                                                                            //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let Articles;
module.link("/lib/collections", {
  Articles(v) {
    Articles = v;
  }

}, 0);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 1);
let check, Match;
module.link("meteor/check", {
  check(v) {
    check = v;
  },

  Match(v) {
    Match = v;
  }

}, 2);
let Constants;
module.link("/lib/constants", {
  default(v) {
    Constants = v;
  }

}, 3);
let DEFCON9, DEFCON7, DEFCON5, DEFCON4, DEFCON3, DEFCON2, DEFCON1;
module.link("/debug.json", {
  DEFCON9(v) {
    DEFCON9 = v;
  },

  DEFCON7(v) {
    DEFCON7 = v;
  },

  DEFCON5(v) {
    DEFCON5 = v;
  },

  DEFCON4(v) {
    DEFCON4 = v;
  },

  DEFCON3(v) {
    DEFCON3 = v;
  },

  DEFCON2(v) {
    DEFCON2 = v;
  },

  DEFCON1(v) {
    DEFCON1 = v;
  }

}, 4);
module.exportDefault(function () {
  Meteor.methods({
    'log.info'(content) {
      if (!this.userId) {
        throw new Meteor.Error(401, 'Access denied');
      }

      check(content, Match.OneOf(String, Object));

      if (typeof content === 'string') {
        DEFCON5 && console.log("INFO: ".concat(content));
      }

      if (typeof content === 'object') {
        DEFCON5 && console.log("INFO:");
        DEFCON5 && console.log(JSON.stringify(content));
      }

      return 'OK';
    }

  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"orders.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// server/methods/orders.js                                                                                         //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let check, Match;
module.link("meteor/check", {
  check(v) {
    check = v;
  },

  Match(v) {
    Match = v;
  }

}, 1);
let Order;
module.link("../lib/order.js", {
  default(v) {
    Order = v;
  }

}, 2);
let Users;
module.link("/lib/collections", {
  Users(v) {
    Users = v;
  }

}, 3);
let DEFCON9, DEFCON7, DEFCON5, DEFCON4, DEFCON3, DEFCON2, DEFCON1;
module.link("/debug.json", {
  DEFCON9(v) {
    DEFCON9 = v;
  },

  DEFCON7(v) {
    DEFCON7 = v;
  },

  DEFCON5(v) {
    DEFCON5 = v;
  },

  DEFCON4(v) {
    DEFCON4 = v;
  },

  DEFCON3(v) {
    DEFCON3 = v;
  },

  DEFCON2(v) {
    DEFCON2 = v;
  },

  DEFCON1(v) {
    DEFCON1 = v;
  }

}, 4);
let Constants;
module.link("/lib/constants", {
  default(v) {
    Constants = v;
  }

}, 5);
DEFCON5 && console.log("In Order server part");
module.exportDefault(function () {
  Meteor.methods({
    "orders.testconnection"() {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }

      DEFCON5 && console.log("orders.testconnection ");
      const order = new Order(Meteor);
      this.unblock();
      order.testConnectionContent();
      DEFCON5 && console.log("testConnectionSent");
      return true;
    }

  });
  Meteor.methods({
    "orders.orderquery"(searchText) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }

      check(searchText, String);
      DEFCON5 && console.log("orders.Query stuff");
      const order = new Order(Meteor);
      this.unblock();
      const orders = order.orderQuery(searchText);
      DEFCON5 && console.log("OrderQuery sent with search string : ".searchText);
      return orders;
    }

  });
  Meteor.methods({
    "orders.queryOrderByOrderId"(searchText) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }

      check(searchText, String);
      DEFCON5 && console.log("orders.Query stuff");
      const order = new Order(Meteor);
      this.unblock();
      const orders = order.queryOrderByOrderId(searchText);
      DEFCON5 && console.log("OrderQuery sent with search string : ".searchText);
      return orders;
    }

  });
  Meteor.methods({
    "orders.queryOrderByPersonId"(searchText) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }

      check(searchText, String);
      DEFCON5 && console.log("orders.Query stuff");
      const order = new Order(Meteor);
      this.unblock();
      const orders = order.queryOrderByPersonId(searchText);
      DEFCON5 && console.log("OrderQuery for Personid sent with search string : ".searchText);
      return orders;
    }

  });
  Meteor.methods({
    "orders.queryRecentOrders"() {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      } //check(searchText, String);


      DEFCON5 && console.log("orders.Query stuff");
      const order = new Order(Meteor);
      this.unblock();
      const orders = order.queryRecentOrders();
      DEFCON5 && console.log("OrderQuery for Personid sent with search string : ".searchText);
      return orders;
    }

  });
  Meteor.methods({
    "orders.updateOrderByOrderId"(content_order) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }

      DEFCON5 && console.log(content_order);
      check(content_order, Object); //check(content_order.field_orderid, String);

      let userObj = Meteor.users.findOne(this.userId);
      DEFCON5 && console.log("orders.update stuff");
      DEFCON5 && console.log(content_order);
      DEFCON5 && console.log(userObj);
      const order = new Order(Meteor);
      content_order.meta_acting_user = userObj.uid;
      this.unblock();
      const response = order.updateOrderByOrderId(content_order);
      DEFCON5 && console.log("Called drupal service and received response");
      DEFCON5 && console.log(response);
      return response;
    }

  });
  Meteor.methods({
    "orders.createUpdatePersonOrder"(content_order) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }

      DEFCON5 && console.log("Create Order");
      DEFCON5 && console.log(content_order);
      check(content_order, Object);
      const order = new Order(Meteor);
      this.unblock();
      const response = order.createUpdatePersonOrder(content_order);
      DEFCON5 && console.log("Called drupal service and received response");
      DEFCON5 && console.log(response);
      return response;
    }

  });
  Meteor.methods({
    "orders.getNameTypes"() {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }

      DEFCON5 && console.log("Server orders.getNameTypes");
      const order = new Order(Meteor);
      this.unblock();
      const response = order.getNameTypes();
      DEFCON5 && console.log("Called drupal service and received Nametypes");
      DEFCON5 && console.log(response);
      return response;
    }

  });
  Meteor.methods({
    "orders.getTerms"(termtype) {
      check(termtype, String);
      DEFCON5 && console.log("Server orders.getTerms");
      const order = new Order(Meteor);
      this.unblock();
      const response = order.getTerms(termtype);
      DEFCON5 && console.log("Called drupal service and received getTerms");
      return response;
    }

  });
  Meteor.methods({
    "orders.queryTerms"(termtype, searchText) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }

      check(termtype, String);
      check(searchText, String);
      DEFCON5 && console.log("Server orders.queryTerms");
      const order = new Order(Meteor);
      this.unblock();
      const response = order.queryTerms(termtype, searchText);
      DEFCON5 && console.log("Called drupal service and received queryTerms");
      DEFCON5 && console.log(response);
      return response;
    }

  });
  Meteor.methods({
    "orders.queryTermsCountry"(dataContext) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }

      check(dataContext, String);
      DEFCON5 && console.log("Server orders.queryTerms");
      const order = new Order(Meteor);
      this.unblock();
      const response = order.queryTermsCountry(dataContext);
      DEFCON5 && console.log("Called drupal service and received queryTerms");
      DEFCON5 && console.log(response);
      return response;
    }

  });
  Meteor.methods({
    "orders.queryPersonById"(searchText) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }

      check(searchText, String);
      DEFCON5 && console.log("Person.Query stuff");
      const order = new Order(Meteor);
      this.unblock();
      const orders = order.queryPersonById(searchText);
      DEFCON5 && console.log("queryPersonById sent with search string : ".searchText);
      return orders;
    }

  });
  Meteor.methods({
    "orders.queryPerson"(searchText, meta) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }

      check(searchText, String);
      check(meta, String);
      DEFCON5 && console.log("Person.Query stuff");
      const order = new Order(Meteor);
      this.unblock();
      const orders = order.queryPerson(searchText, meta);
      DEFCON5 && console.log("queryPerson sent with search string : ".searchText);
      return orders;
    }

  });
  Meteor.methods({
    "orders.queryPersonAdvanced"(searchText) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }

      check(searchText, String);
      DEFCON5 && console.log("Person.Query stuff");
      const order = new Order(Meteor);
      this.unblock();
      const orders = order.queryPersonAdvanced(searchText);
      DEFCON5 && console.log("queryPerson sent with search string : ".searchText);
      return orders;
    }

  });
  Meteor.methods({
    "orders.queryRoleAdvanced"(searchText, queryRoles) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }

      check(searchText, String);
      check(queryRoles, Object);
      DEFCON5 && console.log("Person.Query stuff");
      const order = new Order(Meteor);
      this.unblock();
      const orders = order.queryRoleAdvanced(searchText, queryRoles);
      DEFCON5 && console.log("queryPerson sent with search string : ".searchText);
      return orders;
    }

  });
  Meteor.methods({
    "orders.livestream"(searchText) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }

      check(searchText, String); //let userObj = Meteor.users.findOne(this.userId);

      DEFCON3 && console.log("Livestream check");
      DEFCON3 && console.log(this.userId); //DEFCON3 && console.log(userObj);

      const order = new Order(Meteor);
      this.unblock();
      const orders = order.livestream(searchText);
      DEFCON5 && console.log("livestream sent with search string : ".searchText);
      return orders;
    }

  });
  Meteor.methods({
    "orders.motherchecks"() {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      } //check(searchText, String);
      //let userObj = Meteor.users.findOne(this.userId);


      DEFCON3 && console.log("motherchecks check");
      DEFCON3 && console.log(this.userId); //DEFCON3 && console.log(userObj);

      const order = new Order(Meteor);
      this.unblock();
      const orders = order.motherchecks();
      DEFCON5 && console.log("motherchecks sent");
      return orders;
    }

  });
  Meteor.methods({
    "orders.process"(query) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }

      check(query, Object);
      DEFCON3 && console.log("Order Process ServerSide");
      const order = new Order(Meteor);
      this.unblock();
      const orders = order.process(query);
      DEFCON3 && console.log("Process Order Request: ");
      DEFCON3 && console.log(query);
      return orders;
    }

  });
  Meteor.methods({
    "orders.queryOrderState"(state, limit) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }

      DEFCON3 && console.log("Query Orderstate");
      check(state, String);
      check(limit, String);
      const order = new Order(Meteor);
      this.unblock();
      const orders = order.queryOrderState(state, limit);
      DEFCON3 && console.log("state, limit: ");
      DEFCON3 && console.log(state);
      DEFCON3 && console.log(limit);
      return orders;
    }

  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"search.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// server/methods/search.js                                                                                         //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let check, Match;
module.link("meteor/check", {
  check(v) {
    check = v;
  },

  Match(v) {
    Match = v;
  }

}, 1);
let Order;
module.link("../lib/order.js", {
  default(v) {
    Order = v;
  }

}, 2);
let Persons, SearchLog;
module.link("/lib/collections", {
  Persons(v) {
    Persons = v;
  },

  SearchLog(v) {
    SearchLog = v;
  }

}, 3);
let DEFCON9, DEFCON7, DEFCON5, DEFCON4, DEFCON3, DEFCON2, DEFCON1;
module.link("/debug.json", {
  DEFCON9(v) {
    DEFCON9 = v;
  },

  DEFCON7(v) {
    DEFCON7 = v;
  },

  DEFCON5(v) {
    DEFCON5 = v;
  },

  DEFCON4(v) {
    DEFCON4 = v;
  },

  DEFCON3(v) {
    DEFCON3 = v;
  },

  DEFCON2(v) {
    DEFCON2 = v;
  },

  DEFCON1(v) {
    DEFCON1 = v;
  }

}, 4);
let Constants;
module.link("/lib/constants", {
  default(v) {
    Constants = v;
  }

}, 5);
DEFCON5 && console.log("In Search server part");
/**
 * query:
 {
      firstName: "",
      lastName: "",
      ssnNumber: "",
      year: "",
      month: "",
      day: "",
      field_pep_countries_list,
      field_pep
      field_rca

}
 **/

module.exportDefault(function () {
  Meteor.methods({
    "search.findPerson"(query) {
      check(query, Object);

      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }

      DEFCON5 && console.log("search.findPerson ");
      let dbQuery = {};
      const nameElemMatch = {
        NameType: "Primärt namn"
      }; // const rStart = /.*\b/;
      //const rEnd = /\b/;
      // const rStart = /^/;
      //const rEnd = /$/;

      const rStart = /\A/;
      const rStartLastName = /\b/; //const rEnd = /\Z.*/;
      //const rStart = /\b/;

      const rEnd = /\b/;

      if (query.firstName) {
        const regex = new RegExp(rStart.source + query.firstName.toLowerCase().trim() + rEnd.source, "i");
        DEFCON3 && console.dir(JSON.stringify(rStart.source + query.firstName.toLowerCase().trim() + rEnd.source));
        nameElemMatch["FirstName"] = {
          $regex: regex
        };
      }

      if (query.lastName) {
        const regex = new RegExp(rStartLastName.source + query.lastName.toLowerCase() + rEnd.source, "i");
        nameElemMatch["LastName"] = {
          $regex: regex
        };
        DEFCON3 && console.dir(JSON.stringify(rStart.source + query.lastName.toLowerCase() + rEnd.source));
      }

      DEFCON3 && console.dir(JSON.stringify(nameElemMatch));
      dbQuery["Names"] = {
        $elemMatch: nameElemMatch
      };

      if (query.field_pep === false || query.field_pep === 0) {
        dbQuery["PEP"] = "0";
      }

      if (query.field_rca === false || query.field_rca === 0) {
        dbQuery["RCA"] = "0";
      }

      if (query.year) {
        dbQuery["BirthDateYear"] = query.year;
      }

      if (query.month) {
        dbQuery["BirthDateMonth"] = query.month;
      }

      if (query.day) {
        dbQuery["BirthDateDay"] = query.day;
      }

      if (Array.isArray(query.field_pep_countries_list) && query.field_pep_countries_list.length > 0) {
        const filteredCountries = query.field_pep_countries_list.filter((item, index) => query.field_pep_countries_list[index] && query.field_pep_countries_list[index].selected === true).map(item => item.name);
        dbQuery["PEPCountries.PEPCountryName"] = {
          $in: filteredCountries
        };
      } else {
        //no results if no countries selected
        return [];
      }

      let searchBySSN = false;

      if (query.ssnNumber) {
        //the rest doesn't matter if we use ssn
        dbQuery = {
          "SSNs.CurrentSSN": query.ssnNumber
        };
        searchBySSN = true;
      }

      if (Object.keys(dbQuery).length === 0) {
        return [];
      }

      DEFCON3 && console.log("DebQuery");
      DEFCON3 && console.dir(JSON.stringify(dbQuery));
      DEFCON3 && console.dir(dbQuery);
      const result = Persons.find(dbQuery).fetch();
      SearchLog.insert({
        UserId: this.userId,
        DateTime: new Date(),
        ResultsReturned: result.length > 0
      });
      DEFCON3 && console.log("search.findPerson done yo");
      DEFCON3 && console.log(JSON.stringify(dbQuery));
      return {
        list: result,
        searchBySSN
      };
    }

  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"publications":{"_users.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// server/publications/_users.js                                                                                    //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let check;
module.link("meteor/check", {
  check(v) {
    check = v;
  }

}, 1);
let DEFCON9, DEFCON7, DEFCON5, DEFCON4, DEFCON3, DEFCON2, DEFCON1;
module.link("/debug.json", {
  DEFCON9(v) {
    DEFCON9 = v;
  },

  DEFCON7(v) {
    DEFCON7 = v;
  },

  DEFCON5(v) {
    DEFCON5 = v;
  },

  DEFCON4(v) {
    DEFCON4 = v;
  },

  DEFCON3(v) {
    DEFCON3 = v;
  },

  DEFCON2(v) {
    DEFCON2 = v;
  },

  DEFCON1(v) {
    DEFCON1 = v;
  }

}, 2);
module.exportDefault(function () {
  Meteor.publish('users.all', function () {
    if (!this.userId) {
      throw new Meteor.Error(401, 'Access denied');
    }

    const selector = {
      status: 'active'
    };
    const options = {};
    const response = Meteor.users.find(selector, options); // DEFCON5 && console.log('Users.Collection');

    return response;
  });
  Meteor.publish('users.single', function (_id) {
    if (!this.userId) {
      throw new Meteor.Error(401, 'Access denied');
    }

    check(_id, String);
    const selector = {
      _id,
      status: 'active'
    };
    const response = Meteor.users.find(selector);
    DEFCON5 && console.log('Users.Single');
    return response;
  });
  Meteor.publish('users.single.uid', function (uid) {
    if (!this.userId) {
      throw new Meteor.Error(401, 'Access denied');
    }

    check(uid, String);
    const selector = {
      uid
    };
    const response = Meteor.users.find(selector);
    DEFCON5 && console.log('Users.Single.Uid');
    return response;
  });
  Meteor.publish('users.current', function () {
    if (!this.userId) {
      throw new Meteor.Error(401, 'Access denied');
    } // check(_id, String);
    // if (this.userId) {


    const selector = {
      _id: this.userId
    };
    const response = Meteor.users.find(selector); //  DEFCON5 && console.log ('publish users.current _id', _id);
    //  DEFCON5 && console.log ('publish users.current this.userId', this.userId);

    return response;
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"articles.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// server/publications/articles.js                                                                                  //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let check;
module.link("meteor/check", {
  check(v) {
    check = v;
  }

}, 1);
let Articles;
module.link("/lib/collections", {
  Articles(v) {
    Articles = v;
  }

}, 2);
let DEFCON9, DEFCON7, DEFCON5, DEFCON4, DEFCON3, DEFCON2, DEFCON1;
module.link("/debug.json", {
  DEFCON9(v) {
    DEFCON9 = v;
  },

  DEFCON7(v) {
    DEFCON7 = v;
  },

  DEFCON5(v) {
    DEFCON5 = v;
  },

  DEFCON4(v) {
    DEFCON4 = v;
  },

  DEFCON3(v) {
    DEFCON3 = v;
  },

  DEFCON2(v) {
    DEFCON2 = v;
  },

  DEFCON1(v) {
    DEFCON1 = v;
  }

}, 3);
module.exportDefault(function () {
  DEFCON3 && console.log("Setting up Article stuff");
  Meteor.publish("articles.one", function (articleId) {
    DEFCON3 && console.log("In article  subscribe function");
    check(articleId, String); // if (!this.userId) {
    //   throw new Meteor.Error(401, "Access denied");
    // }

    this.autorun(function (computation) {
      DEFCON3 && console.log("Subscribing Article");
      const Selector = {
        "field_article_id.value": articleId,
        status: "active"
      };
      let article = Articles.find(Selector);
      DEFCON3 && console.log(article.fetch());
      return article;
    });
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"chatlines.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// server/publications/chatlines.js                                                                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let check;
module.link("meteor/check", {
  check(v) {
    check = v;
  }

}, 1);
let ChatLines, Users;
module.link("/lib/collections", {
  ChatLines(v) {
    ChatLines = v;
  },

  Users(v) {
    Users = v;
  }

}, 2);
let DEFCON9, DEFCON7, DEFCON5, DEFCON4, DEFCON3, DEFCON2, DEFCON1;
module.link("/debug.json", {
  DEFCON9(v) {
    DEFCON9 = v;
  },

  DEFCON7(v) {
    DEFCON7 = v;
  },

  DEFCON5(v) {
    DEFCON5 = v;
  },

  DEFCON4(v) {
    DEFCON4 = v;
  },

  DEFCON3(v) {
    DEFCON3 = v;
  },

  DEFCON2(v) {
    DEFCON2 = v;
  },

  DEFCON1(v) {
    DEFCON1 = v;
  }

}, 3);
module.exportDefault(function () {
  Meteor.publish('chatlines.forchannel', function (channelId) {
    if (!this.userId) {
      throw new Meteor.Error(401, 'Access denied');
    }

    check(channelId, String);
    DEFCON5 && console.log('In publication/chatlines.forchannel');
    DEFCON5 && console.log(channelId);
    this.autorun(function (computation) {
      const chatLinesSelector = {
        channelId: channelId,
        status: 'active'
      };
      let chatLinesUserIds = ChatLines.find(chatLinesSelector).fetch().map(line => line.createdBy);
      DEFCON5 && console.log('Find chatLinesUserIds');
      const usersWithAvatars = Meteor.users.find({
        _id: {
          $in: chatLinesUserIds
        }
      }, {
        avatar_uri: 1
      }); // DEFCON5 && console.log(usersWithAvatars);

      return [ChatLines.find(chatLinesSelector), usersWithAvatars];
    });
  });
  Meteor.publish('chatlines.forUser', function () {
    if (!this.userId) {
      throw new Meteor.Error(401, 'Access denied');
    }

    const chatLinesSelector = {
      createdBy: this.userId
    };
    let chatLinesUserIds = ChatLines.find(chatLinesSelector); // DEFCON5 && console.log("Find users");
    // DEFCON5 && console.log(chatLinesUserIds);

    return chatLinesUserIds;
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"chatrooms.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// server/publications/chatrooms.js                                                                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let check;
module.link("meteor/check", {
  check(v) {
    check = v;
  }

}, 1);
let ChatRooms, Users;
module.link("/lib/collections", {
  ChatRooms(v) {
    ChatRooms = v;
  },

  Users(v) {
    Users = v;
  }

}, 2);
let DEFCON9, DEFCON7, DEFCON5, DEFCON4, DEFCON3, DEFCON2, DEFCON1;
module.link("/debug.json", {
  DEFCON9(v) {
    DEFCON9 = v;
  },

  DEFCON7(v) {
    DEFCON7 = v;
  },

  DEFCON5(v) {
    DEFCON5 = v;
  },

  DEFCON4(v) {
    DEFCON4 = v;
  },

  DEFCON3(v) {
    DEFCON3 = v;
  },

  DEFCON2(v) {
    DEFCON2 = v;
  },

  DEFCON1(v) {
    DEFCON1 = v;
  }

}, 3);
module.exportDefault(function () {
  Meteor.publish("chatrooms.access", function (chatroomId) {
    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }

    check(chatroomId, String);
    DEFCON5 && console.log("In publication/chatRooms.forchannel");
    DEFCON5 && console.log(chatroomId);
    this.autorun(function (computation) {
      const chatRoomsSelector = {
        _id: chatroomId,
        status: "active"
      };
      DEFCON5 && console.log("Find chatRoomsUserIds"); // DEFCON5 && console.log(usersWithAvatars);

      return [ChatRooms.find(chatRoomsSelector)];
    });
  });
  Meteor.publish("chatrooms.forUser", function () {
    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }

    const chatRoomsSelector = {
      "users.userId": {
        $in: [this.userId]
      }
    };
    let chatRoomsUserIds = ChatRooms.find(chatRoomsSelector); // DEFCON5 && console.log("Find users");
    // DEFCON5 && console.log(chatRoomsUserIds);

    return chatRoomsUserIds;
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// server/publications/index.js                                                                                     //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let _users;

module.link("./_users", {
  default(v) {
    _users = v;
  }

}, 0);
let chatlines;
module.link("./chatlines", {
  default(v) {
    chatlines = v;
  }

}, 1);
let chatrooms;
module.link("./chatrooms", {
  default(v) {
    chatrooms = v;
  }

}, 2);
let secrets;
module.link("./secrets", {
  default(v) {
    secrets = v;
  }

}, 3);
let articles;
module.link("./articles", {
  default(v) {
    articles = v;
  }

}, 4);
let mcc;
module.link("./mcc_config", {
  default(v) {
    mcc = v;
  }

}, 5);
let signalstate;
module.link("./signalstate", {
  default(v) {
    signalstate = v;
  }

}, 6);
module.exportDefault(function () {
  _users();

  chatlines();
  chatrooms();
  secrets();
  articles();
  mcc();
  signalstate();
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"mcc_config.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// server/publications/mcc_config.js                                                                                //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let check;
module.link("meteor/check", {
  check(v) {
    check = v;
  }

}, 1);
let MccConfig;
module.link("/lib/collections", {
  MccConfig(v) {
    MccConfig = v;
  }

}, 2);
let DEFCON9, DEFCON7, DEFCON5, DEFCON4, DEFCON3, DEFCON2, DEFCON1;
module.link("/debug.json", {
  DEFCON9(v) {
    DEFCON9 = v;
  },

  DEFCON7(v) {
    DEFCON7 = v;
  },

  DEFCON5(v) {
    DEFCON5 = v;
  },

  DEFCON4(v) {
    DEFCON4 = v;
  },

  DEFCON3(v) {
    DEFCON3 = v;
  },

  DEFCON2(v) {
    DEFCON2 = v;
  },

  DEFCON1(v) {
    DEFCON1 = v;
  }

}, 3);
module.exportDefault(function () {
  DEFCON7 && console.log("Setting up mcc -config");
  Meteor.publish("mccConfig.all", function () {
    DEFCON7 && console.log("In the subscribe function"); // if (!this.userId) {
    //   throw new Meteor.Error(401, "Access denied");
    // }

    this.autorun(function (computation) {
      DEFCON7 && console.log("Subscribing MCC Configs");
      const Selector = {
        status: "active"
      };
      let mccConfig = MccConfig.find(Selector);
      DEFCON7 && console.log(mccConfig);
      return mccConfig;
    });
  });
  Meteor.publish("mccConfig.one", function (facility) {
    DEFCON7 && console.log("In mccConfig.one  subscribe function");
    check(facility, String); // if (!this.userId) {
    //   throw new Meteor.Error(401, "Access denied");
    // }

    this.autorun(function (computation) {
      DEFCON7 && console.log("Subscribing mccConfig");
      const Selector = {
        facility: facility,
        status: "active"
      };
      let mccConfig = MccConfig.find(Selector);
      DEFCON7 && console.log(mccConfig);
      return mccConfig;
    });
  });
  Meteor.publish("mccConfig.CountRead", function (facility) {
    DEFCON7 && console.log("In mccConfig.CountRead  subscribe function");
    check(facility, String); // if (!this.userId) {
    //   throw new Meteor.Error(401, "Access denied");
    // }

    this.autorun(function (computation) {
      DEFCON7 && console.log("Subscribing CountRead");
      var options = {
        allowDiskUse: true
      };
      var pipeline = [{
        $match: {
          read_proc_status: "OK"
        }
      }, {
        $group: {
          _id: {},
          numOfRead: {
            $sum: 1
          }
        }
      }, {
        $project: {
          numOfRead: "$numOfRead",
          _id: 0
        }
      }];
      let mccConfig = MccConfig.aggregate(pipeline, options);
      DEFCON7 && console.log(mccConfig);
      return mccConfig;
    });
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"programs.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// server/publications/programs.js                                                                                  //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let check;
module.link("meteor/check", {
  check(v) {
    check = v;
  }

}, 1);
let Programs, Modules;
module.link("/lib/collections", {
  Programs(v) {
    Programs = v;
  },

  Modules(v) {
    Modules = v;
  }

}, 2);
let DEFCON9, DEFCON7, DEFCON5, DEFCON4, DEFCON3, DEFCON2, DEFCON1;
module.link("/debug.json", {
  DEFCON9(v) {
    DEFCON9 = v;
  },

  DEFCON7(v) {
    DEFCON7 = v;
  },

  DEFCON5(v) {
    DEFCON5 = v;
  },

  DEFCON4(v) {
    DEFCON4 = v;
  },

  DEFCON3(v) {
    DEFCON3 = v;
  },

  DEFCON2(v) {
    DEFCON2 = v;
  },

  DEFCON1(v) {
    DEFCON1 = v;
  }

}, 3);
module.exportDefault(function () {
  Meteor.publish('program.get', function (programId) {
    if (!this.userId) {
      throw new Meteor.Error(401, 'Access denied');
    }

    check(channelId, String);
    DEFCON5 && console.log('In publication/program.get');
    DEFCON5 && console.log(channelId);
    this.autorun(function (computation) {
      const chatLinesSelector = {
        channelId: channelId,
        status: 'active'
      };
      let chatLinesUserIds = ChatLines.find(chatLinesSelector).fetch().map(line => line.createdBy);
      DEFCON5 && console.log('Find chatLinesUserIds');
      const usersWithAvatars = Meteor.users.find({
        _id: {
          $in: chatLinesUserIds
        }
      }, {
        avatar_uri: 1
      }); // DEFCON5 && console.log(usersWithAvatars);

      return [ChatLines.find(chatLinesSelector), usersWithAvatars];
    });
  });
  Meteor.publish('chatlines.forUser', function () {
    if (!this.userId) {
      throw new Meteor.Error(401, 'Access denied');
    }

    const chatLinesSelector = {
      createdBy: this.userId
    };
    let chatLinesUserIds = ChatLines.find(chatLinesSelector); // DEFCON5 && console.log("Find users");
    // DEFCON5 && console.log(chatLinesUserIds);

    return chatLinesUserIds;
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"secrets.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// server/publications/secrets.js                                                                                   //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let check;
module.link("meteor/check", {
  check(v) {
    check = v;
  }

}, 1);
let Secrets;
module.link("/lib/collections", {
  Secrets(v) {
    Secrets = v;
  }

}, 2);
let DEFCON9, DEFCON7, DEFCON5, DEFCON4, DEFCON3, DEFCON2, DEFCON1;
module.link("/debug.json", {
  DEFCON9(v) {
    DEFCON9 = v;
  },

  DEFCON7(v) {
    DEFCON7 = v;
  },

  DEFCON5(v) {
    DEFCON5 = v;
  },

  DEFCON4(v) {
    DEFCON4 = v;
  },

  DEFCON3(v) {
    DEFCON3 = v;
  },

  DEFCON2(v) {
    DEFCON2 = v;
  },

  DEFCON1(v) {
    DEFCON1 = v;
  }

}, 3);
module.exportDefault(function () {
  DEFCON3 && console.log("Setting up secrets");
  Meteor.publish("secrets.all", function () {
    DEFCON3 && console.log("In the subscribe function"); // if (!this.userId) {
    //   throw new Meteor.Error(401, "Access denied");
    // }

    this.autorun(function (computation) {
      DEFCON3 && console.log("Subscribing secrets");
      const Selector = {
        status: "active"
      };
      let secrets = Secrets.find(Selector);
      DEFCON3 && console.log(secrets);
      return secrets;
    });
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"signalstate.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// server/publications/signalstate.js                                                                               //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let check;
module.link("meteor/check", {
  check(v) {
    check = v;
  }

}, 1);
let SignalState, SignalHistory;
module.link("/lib/collections", {
  SignalState(v) {
    SignalState = v;
  },

  SignalHistory(v) {
    SignalHistory = v;
  }

}, 2);
let DEFCON9, DEFCON7, DEFCON5, DEFCON4, DEFCON3, DEFCON2, DEFCON1;
module.link("/debug.json", {
  DEFCON9(v) {
    DEFCON9 = v;
  },

  DEFCON7(v) {
    DEFCON7 = v;
  },

  DEFCON5(v) {
    DEFCON5 = v;
  },

  DEFCON4(v) {
    DEFCON4 = v;
  },

  DEFCON3(v) {
    DEFCON3 = v;
  },

  DEFCON2(v) {
    DEFCON2 = v;
  },

  DEFCON1(v) {
    DEFCON1 = v;
  }

}, 3);
module.exportDefault(function () {
  DEFCON3 && console.log("Setting up signalState");
  Meteor.publish("signalState.all", function () {
    DEFCON7 && console.log("In the subscribe function"); // if (!this.userId) {
    //   throw new Meteor.Error(401, "Access denied");
    // }

    this.autorun(function (computation) {
      DEFCON7 && console.log("Subscribing SignalState");
      const Selector = {};
      let signalState = SignalState.find(Selector);
      DEFCON7 && console.log(signalState);
      return signalState;
    });
  });
  Meteor.publish("signalState.facility", function (facility) {
    DEFCON3 && console.log("In facility  subscribe function");
    check(facility, String); // if (!this.userId) {
    //   throw new Meteor.Error(401, "Access denied");
    // }

    this.autorun(function (computation) {
      DEFCON3 && console.log("*** Subscribing facility");
      const Selector = {
        _id: new RegExp(facility, "i")
      };
      var sort = [["route", 1.0]];
      DEFCON3 && console.log(Selector);
      let signalState = SignalState.find(Selector, {
        sort: sort
      });
      DEFCON3 && console.log(signalState.fetch());
      return signalState;
    });
  });
  Meteor.publish("signalState.History", function (signalId) {
    DEFCON3 && console.log("In signalState  subscribe function");
    check(signalId, String); // if (!this.userId) {
    //   throw new Meteor.Error(401, "Access denied");
    // }

    this.autorun(function (computation) {
      DEFCON3 && console.log("Subscribing signalId");
      const Selector = {
        entityId: signalId
      };
      var sort = [["time", -1.0]];
      DEFCON3 && console.log(Selector);
      let SignalHistoryData = SignalHistory.find(Selector, {
        sort: sort,
        limit: 400
      }); // DEFCON3 && console.log(SignalHistoryData.fetch());

      return SignalHistoryData;
    });
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"routes.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// server/routes.js                                                                                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let FileManager;
module.link("./lib/fileManager/filemanager", {
  default(v) {
    FileManager = v;
  }

}, 1);
Picker.route('/file/:fileType/:fileId', function (params, req, res, next) {
  let {
    fileType,
    fileId
  } = params;

  try {
    let fileName = decodeURIComponent(fileId);
    var fileData = new FileManager(fileType).readOutputFileAsBuffer(fileName);
    res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
    res.end(fileData);
  } catch (e) {
    res.end('File not found!');
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"main.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// server/main.js                                                                                                   //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let publications;
module.link("./publications", {
  default(v) {
    publications = v;
  }

}, 1);
let methods;
module.link("./methods", {
  default(v) {
    methods = v;
  }

}, 2);
let addInitialData;
module.link("./configs/initial_adds.js", {
  default(v) {
    addInitialData = v;
  }

}, 3);
let i18n;
module.link("meteor/universe:i18n", {
  default(v) {
    i18n = v;
  }

}, 4);
let DEFCON9, DEFCON7, DEFCON5, DEFCON4, DEFCON3, DEFCON2, DEFCON1;
module.link("/debug.json", {
  DEFCON9(v) {
    DEFCON9 = v;
  },

  DEFCON7(v) {
    DEFCON7 = v;
  },

  DEFCON5(v) {
    DEFCON5 = v;
  },

  DEFCON4(v) {
    DEFCON4 = v;
  },

  DEFCON3(v) {
    DEFCON3 = v;
  },

  DEFCON2(v) {
    DEFCON2 = v;
  },

  DEFCON1(v) {
    DEFCON1 = v;
  }

}, 5);
publications();
methods();
addInitialData(); //

Meteor.startup(() => {
  // WebApp.rawConnectHandlers.use(function(req, res, next) {
  //     res.setHeader("Access-Control-Allow-Origin", "*");
  //     res.setHeader("Access-Control-Allow-Headers", "Authorization,Content-Type");
  //     return next();
  // });
  Accounts.urls.resetPassword = function (token) {
    return Meteor.absoluteUrl('reset-password/' + token);
  };

  Accounts.emailTemplates.siteName = i18n.__('Email_SiteName_Text');
  Accounts.emailTemplates.from = i18n.__('Email_From_Text');
  Accounts.emailTemplates.resetPassword = {
    subject(user) {
      return i18n.__('Email_ResetPassword_Subject');
    },

    html(user, url) {
      let urlTag = "<a href=\"".concat(url, "\">").concat(url, "</a>");
      return i18n.__('Email_ResetPassword_Text', {
        urlTag
      });
    }

  };
  Accounts.onCreateUser((options, user) => {
    DEFCON5 && console.log('Creating user x');
    user.status = 'active';
    user.name = options.name;
    return user;
  });
  Accounts.validateLoginAttempt(function (loginRequest) {
    if (loginRequest.user) {
      if (!loginRequest.user.status || loginRequest.user.status != 'active') throw new Meteor.Error(403, i18n.__('Error_Account_NotActive'));
    }

    return true;
  });
  Accounts.onLogin(loginInfo => {
    if (loginInfo && loginInfo.allowed === true && loginInfo.type !== 'resume') {}
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"lib":{"transformers":{"dateStringTransformer.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// lib/transformers/dateStringTransformer.js                                                                        //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let t;
module.link("tcomb-form", {
  default(v) {
    t = v;
  }

}, 0);
let moment;
module.link("moment", {
  default(v) {
    moment = v;
  }

}, 1);

const DateStringTransformer = function (formatString) {
  return {
    format: value => {
      if (t.Date.is(value)) {
        let momentDate = moment(value);
        return momentDate.format(formatString);
      }

      return value;
    },
    parse: str => {
      "use strict";

      return str ? moment.parse(str).toDate() : null;
    }
  };
};

module.exportDefault(DateStringTransformer);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"collections.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// lib/collections.js                                                                                               //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.export({
  Users: () => Users,
  ChatLines: () => ChatLines,
  ChatRooms: () => ChatRooms,
  Programs: () => Programs,
  Modules: () => Modules,
  Secrets: () => Secrets,
  Articles: () => Articles,
  SignalState: () => SignalState,
  SignalMeta: () => SignalMeta,
  MccConfig: () => MccConfig,
  SignalHistory: () => SignalHistory
});
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
let DEFCON9, DEFCON7, DEFCON5, DEFCON4, DEFCON3, DEFCON2, DEFCON1;
module.link("/package.json", {
  DEFCON9(v) {
    DEFCON9 = v;
  },

  DEFCON7(v) {
    DEFCON7 = v;
  },

  DEFCON5(v) {
    DEFCON5 = v;
  },

  DEFCON4(v) {
    DEFCON4 = v;
  },

  DEFCON3(v) {
    DEFCON3 = v;
  },

  DEFCON2(v) {
    DEFCON2 = v;
  },

  DEFCON1(v) {
    DEFCON1 = v;
  }

}, 1);
const Users = new Mongo.Collection("Users");
const ChatLines = new Mongo.Collection("chatlines");
const ChatRooms = new Mongo.Collection("chatrooms");
const Programs = new Mongo.Collection("dm_node_program");
const Modules = new Mongo.Collection("dm_node_module");
const Secrets = new Mongo.Collection("dm_node_secrets");
const Articles = new Mongo.Collection("dm_node_article");
const SignalState = new Mongo.Collection("signal_state");
const SignalMeta = new Mongo.Collection("signal_meta");
const MccConfig = new Mongo.Collection("sunhill_config");
const SignalHistory = new Mongo.Collection("signal_state_history");
DEFCON5 && console.log("Fixing collections...");
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"constants.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// lib/constants.js                                                                                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.export({
  USER_ACTION_ACTIVATE: () => USER_ACTION_ACTIVATE,
  USER_ACTION_DEACTIVATE: () => USER_ACTION_DEACTIVATE,
  USER_ACTION_ADD: () => USER_ACTION_ADD,
  USER_STATUS_ACTIVE: () => USER_STATUS_ACTIVE,
  USER_STATUS_INACTIVE: () => USER_STATUS_INACTIVE,
  default: () => Constants
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
const USER_ACTION_ACTIVATE = "activate";
const USER_ACTION_DEACTIVATE = "deactivate";
const USER_ACTION_ADD = "add";
const USER_STATUS_ACTIVE = "active";
const USER_STATUS_INACTIVE = "inactive";

class Constants {}

Constants.CardMode = {
  PERSON: '100',
  NEWORDER: '200',
  ORDER: '300'
};
Constants.CardStatus = {
  NA: '0',
  QA: '1000',
  RQA: '2000',
  NEW: '5000',
  FUTURE: '6000',
  OK: '8000'
};
Constants.OrderProcessStatuses = {
  INIT: '0',
  PENDING: '10',
  OPEN100: '100',
  OPEN110: '110',
  OPEN500: '500',
  FUTURE: '600',
  TIMECHECK: '1000',
  QACHECK: '4000',
  PUBLISH: '5000',
  COMPLETED: '8000',
  SUSPENCE910: '910',
  SUSPENCE950: '950',
  SUSPENCE990: '990',
  CANCELLED: '999'
};
Constants.OrderType = {
  NEW_PERSON: '100',
  MIGRATION: '188',
  RELATION_UPDATE: '189',
  RELATION_INSERT: '190',
  CORE: '200',
  URI: '201',
  SSN: '202',
  ADDRESS: '203',
  NAME: '205',
  ROLE_INSERT: '206',
  ROLE_UPDATE: '207'
};
Constants.activeCard = {
  RELATION_UPDATE: 'RELATION_UPDATE',
  RELATION_INSERT: 'RELATION_INSERT',
  ROLE_UPDATE: 'ROLE_UPDATE',
  ROLE_INSERT: 'ROLE_INSERT',
  CORE: 'CORE',
  URI: 'URI',
  SSN: 'SSN',
  NAME: 'NAME',
  ADDRESS: 'ADDRESS',
  ROLES: 'ROLES'
};
Constants.Gender = {
  FEMALE: 'K',
  MALE: 'M'
};
Constants.OrderProcessMethod = {
  EXPRESS: 'E',
  DEFAULT: 'D'
};
Constants.datePrecision = {
  UNDEF: 'u',
  YEAR: 'Y',
  MONTH: 'M',
  DAY: 'D'
};
Constants.orderTypeTechnical = {
  NEW_PERSON_ORDER: '384'
};
Constants.defaultValues = {
  ORDERID: '99999999'
};
Constants.motherCheckState = {
  OK: 0,
  WARNING: 100,
  ERROR_GENERIC: 999,
  ERROR: 999
};
Constants.personNameTypes = {
  PREVIOUS_NAMES: '1',
  ALTERNATIVE_NAMES: '2',
  PRIMARY_NAME: '3',
  REGISTRED_NAME: '4'
};

Constants.LoadingComponent = () => /*#__PURE__*/React.createElement("div", null, " ... ");

;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"log.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// lib/log.js                                                                                                       //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.export({
  default: () => Log
});
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);

class Log {}

Log.info = (content, callback) => {
  // console.log(`Logging ${content} on server`);
  Meteor.call('log.info', content, (err, result) => {
    if (callback) {
      callback(err, result);
    }
  });
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"random.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// lib/random.js                                                                                                    //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.export({
  default: () => Random
});
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);

class Random {}

Random.generateString = length => {
  if (!length) {
    length = 5;
  }

  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"user.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// lib/user.js                                                                                                      //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.export({
  Phone: () => Phone,
  Email: () => Email,
  UserProfile: () => UserProfile
});

let _;

module.link("lodash", {
  default(v) {
    _ = v;
  }

}, 0);
const Phone = Astro.Class({
  name: 'Phone',
  fields: {
    name: {
      type: 'string',
      validator: [Validators.minLength(3)]
    },
    number: {
      type: 'string',
      validator: [Validators.minLength(9)]
    },
    uuid: {
      type: 'string'
    }
  }
});
const Email = Astro.Class({
  name: 'Email',
  fields: {
    address: {
      type: 'string' // validator: [
      //   Validators.minLength(3)
      // ]

    },
    verified: {
      type: 'string' // validator: [
      //   Validators.minLength(9)
      // ]

    }
  }
});
const UserProfile = Astro.Class({
  name: 'UserProfile',
  fields: {
    /* Any fields you want to be published to the client */
    description: {
      type: 'string'
    } // lastName: {
    //   type: 'string',
    // },
    // 'phones': {
    //   type: 'array',
    //   nested: 'Phone',
    //   default: function() {
    //     return [];
    //   }
    // },
    // nickname

  }
});
const User = Astro.Class({
  name: 'User',
  collection: Meteor.users,
  fields: {
    // emails: {
    //   type: 'array',
    //   default: function() {
    //     return [];
    //   }
    // },
    emails: {
      type: 'array',
      nested: 'Email',
      default: function () {
        return [];
      }
    },
    createdAt: 'date',
    profile: {
      type: 'string'
    },
    roles: {
      type: 'array',
      default: function () {
        return {};
      }
    },
    _iss: {
      type: 'boolean'
    },
    _isa: {
      type: 'boolean'
    },
    avatar_uri: {
      type: 'string'
    },
    status: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    uid: {
      type: 'string'
    }
  },
  methods: {
    firstEmail: function () {
      return _.get(this, 'emails[0].address', null);
    } // ,aclIs : function(roleSlug) {
    //    console.log ('UUser->aclIsInRole role-slug', roleSlug);
    //    console.log(this.roles)
    //   return _.contains(this.roles, roleSlug);
    // }

  }
});

if (Meteor.isServer) {
  User.extend({
    fields: {
      services: "object",
      language: "string",
      avatar_uri: "string",
      name: "string",
      uid: "string",
      theme: "boolean"
    }
  });
}

module.exportDefault(User);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"i18n":{"core":{"da.i18n.yml.js":function module(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// i18n/core/da.i18n.yml.js                                                                                         //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
Package['universe:i18n'].i18n.addTranslations('da','',{"Header_Login_Login":"Log på","Nav_DropDownItem_English":"Engelsk","Nav_DropDownItem_Swedish":"Svensk","Nav_DropDownItem_Help":"Hjælp","Nav_DropDownItem_Chat":"Intercom","Nav_DropDownItem_Logout":"Log ud","Nav_DropDownItem_Profile":"Profil","Nav_DropDownItem_Orders":"Ordrer","Header_Login_EnterHint":"Skriv brugernavn og adgangskode","Link_Login_ForgotPassword":"Glemt kodeord?","Link_Login_CreateAccount":"Opret en konto","Label_LoginForm_Email":"E-mail","Label_LoginForm_EmailPlaceholder":"E-mail","Label_LoginForm_EmailValidationError":"Indtast en gyldig e-mail adresse","Label_LoginForm_Password":"Adgangskode","Label_LoginForm_PasswordPlaceholder":"Skriv dit kodeord","Label_LoginForm_PasswordValidationError":"Adgangskoden er for kort","Button_LoginForm_Login":"Log på","Header_ForgotPassword_Password":"Glemt kodeord","Header_ForgotPassword_EnterHint":"Indtast din e-mail-adresse og en ny adgangskode vil blive sendt til dig.","Header_ForgotPassword_Remember":"Kan du huske din adgangskode?","Link_ForgotPassword_Login":"Log på","Label_ForgotPassword_Email":"E-mail-adresse","Label_ForgotPassword_EmailPlaceholder":"Her indtaster du din e-mailadresse.","Label_ForgotPassword_EmailValidationError":"Indtast venligst en gyldig e-mailadresse.","Button_ForgotPassword_Login":"Send en ny adgangskode","Button_ForgotPassword_Save":"Send en ny adgangskode","Header_SetPassword_Password":"Indtast et nyt kodeord","Header_SetPassword_EnterHint":"Indtast din adgangskode to gange","Link_SetPassword_Cancel":"Afbryd","Label_SetPassword_Label":"Adgangskode","Label_SetPassword_ConfirmLabel":"Bekræft kodeord","Label_SetPassword_MinLengthValidationError":"Password er for kort (minimum {$ MINLENGTH} tegn)","Label_SetPassword_MismatchValidationError":"Adgangskoden passer ikke","Button_SetPassword_Save":"Gem","Email_SiteName_Text":"Gudrun","Email_From_Text":"Hello@Oss.se","Email_ResetPassword_Subject":"Nulstil din adgangskode","Label_List_Month":"Sidste 30 dage","Label_List_Old":"Ældre end 30 dage","Label_List_Today":"I dag","Label_List_Week":"Sidste 7 dage","Label_List_Yesterday":"I går","Label_Chat_Placeholder_Send":"Besked","Label_Chat_Placeholder_Send_Label":"Ny besked","Label_Ordercard_Meta":"Meta værdier","Label_Ordercard_Persondata":"Persondata","Label_Ordercard_Persondata_url":"Billede af personen","Label_Ordercard_Postaddress":"Postaddress","Label_Ordercard_Roles":"Roller","Label_Ordercard_Relation":"Relation","Label_Ordercard_Notes":"Noter","Label_Ordercard_Audit":"Revidere","Entity_Label_Field_order_process_method":"Proces metode","Entity_Label_Field_order_type_name":"Ordretype","Entity_Label_state_name":"Ordre status","Entity_Label_state_description":"Ordre status","Entity_Label_Orderid":"Ordre ID","Entity_Label_Title":"Titel","Entity_Label_Nid":"ID","Entity_Label_Created":"Oprettet","Entity_Label_Changed":"Ændret","Entity_Label_Field_pep":"Is PEP","Entity_Label_Field_current_ssn":"SSN","Entity_Label_Field_ssntype":"SSN type","Entity_Label_Field_Birth date":"Fødselsdato","Entity_Label_Field_postaladdress":"Postal adresse","Entity_Label_Field_postaladdress2":"Postal adresse 2","Entity_Label_Field_housenumber":"Husnummer","Entity_Label_Field_postalcity":"By","Entity_Label_Field_zipcode":"Postnummer","Entity_Label_Field_firstname":"Fornavn","Entity_Label_Field_lastname":"Efternavn","Entity_Label_Field_name_type":"Navnetype","Entity_Label_Field_postalcountry":"Land","Entity_Label_Field_personid":"Person-ID (Classic)","Entity_Label_Field_person":"Person Reference (nid)","Entity_Label_Field_person_relation":"Personrelation","Entity_Label_Field_relation_description":"Beskrivelse","Entity_Label_Field_period_value":"Start dato","Entity_Label_Field_period_value2":"Gennem Dato","Entity_Label_Field_country_of_jurisdiction":"Jurisdiktion i landet","Entity_Label_Field_is_active":"Er aktiv person","Entity_Label_Field_role_description":"Rollebeskrivelse","Entity_Label_Field_organisation":"Organisation","Entity_Label_Field_organisation_number":"Organisation nummer","Entity_Label_Field_notes":"Bemærk","Entity_Label_Field_detailed_role_categories":"Detaljekategori","Entity_Label_Field_gender":"Køn","Entity_Label_Field_whom":"Hvem","Entity_Label_Field_what":"Hvad","Entity_Label_Field_when":"Hvornår","Entity_Label_Field_url":"URL","Entity_Label_Field_pepcountryid":"PEP land id","Entity_Label_Field_country_iso":"PEP land ISO-kode","Entity_Label_Field_pepcountry_name":"PEP land","Entity_Label_Tid":"PEP TID","Entity_Label_Description":"Beskrivelse","Entity_Label_Field_image_url":"Billede URL","Entity_Label_Field_alternate_postaladdress":"Postadresse (alternativ)","Entity_Label_Field_alternate_postaladdress2":"Postadresse 2 (alternativ)","Entity_Label_Field_alternate_postalcity":"By (alternativ)","Entity_Label_Field_postaladdresssource":"Postal adresse kilde","Entity_Label_Field_alternate_postaladdresssou":"Postal adresse kilde (alternativ)","Entity_Label_Field_alternate_housenumber":"Husnummer (alternativ)","Entity_Label_Field_alternate_zipcode":"Postnummer (alternativ)","Entity_Label_Field_alternate_postalcountry":"Lans (alternativ)","Entity_Label_Field_bornafter":"Født efter","Entity_Label_Field_source_of_update":"Opdateringskilde","Entity_Label_Field_last_date_of_verification":"Senest kontrolleret ","Entity_Label_Field_bornbefore":"Født før","Entity_Label_Field_cvrpersonid":"CVR Personid","Entity_Label_Field_probabledata":"Mulige data","Entity_Label_Field_effective_date":"Ikrafttrædelsesdato","Entity_Label_Field_creator":"Oprettet af","Entity_Label_Field_responsible":"Ansvarlig","Entity_Label_Field_Gender_Female":"Kvinde","Entity_Label_Field_Gender_Male":"Mand","Entity_Label_Field_rca":"Is RCA","Entity_Label_Field_order_nametype_1":"Tidligere navn","Entity_Label_Field_order_nametype_2":"Alternativ stavning","Entity_Label_Field_order_nametype_3":"Primært navn","Entity_Label_Field_order_nametype_4":"Folder Posting Name","Entity_Label_Segment_Postaddress":"Adresseoplysninger","Nav_DropDownItem_Persons":"Søg person","Label_Button_Edit":"Redigere","Label_Button_Create":"Opret","Label_Button_Save":"Gem","Label_Button_Delete":"Slet","Label_Button_Update":"Opdatere","Label_Button_Cancel":"Afbryd","Label_Autoupdate":"Live opdatering","Label_Button_Add":"Tilføj","Label_Button_Remove":"Fjern","Label_Ordercard_Personnames":"Navne","Label_Ordercard_Personssn":"SSN","Entity_Label_Field_description":"Om denne ordre","Label_Button_UpdateOrderState":"Opdatere order status","Label_Button_CancelOrder":"Afbryd ordre","Entity_Label_Field_deactivationdate":"Deaktiveringsdato","Entity_Label_Field_is_deceased":"Afdød","Entity_Label_Field_deceased_date":"Afdøde dato","Entity_Label_Field_name_type_remove_item":"Fjern navneelement?","Entity_Label_Field_remove_item_text":"Er du sikker på at du vil fjerne dette element?","Label_Ordercard_PersonSSN":"Person SSN numre","Entity_Label_Field_ssn_remove_item":"Fjern SSN element?","Entity_Label_Field_pepcountry":"PEP Land","Entity_Label_FieldCountryOfJurisdiction_Denmark":"Danmark","Entity_Label_FieldCountryOfJurisdiction_Sweden":"Sverige","Entity_Label_FieldCountryOfJurisdiction_Norway":"Norge","Entity_Label_FieldCountryOfJurisdiction_Finland":"Finland","Entity_Label_Field_is_active_role":"Er aktiv rolle","Label_Button_NewRole":"Tilføj en ny rolle","Label_Button_RemoveRole":"Slet","Entity_Label_Item_id":"Id","Entity_Label_Field_Role_remove_item":"Fjern rolle fra ordre?","Label_Button_NewRelation":"Tilføj ny relation","Entity_Label_Field_Relation_remove_item":"Fjern relation fra ordre?","Label_Button_RemoveRelation":"Fjern relation","Label_Ordercard_Relations":"Relation","Entity_Label_Field_relation":"Relationstype","Entity_Label_Field_Category":"Rollekategori","Entity_Label_Role_description_type":"Rollebeskrivelsestype","Entity_Label_Search":"Søg","Label_Orders_Search":"Søg person eller ordre","Table_OrderList_Column_Name":"Ordre ID","Table_OrderList_Column_Status":"Status","Table_OrderList_Column_OrderType":"Type","Table_OrderList_Column_ModifiedBy":"Ændret","Entity_Label_Person_Card":"Persondata","Entity_Label_Personid":"Person-ID Classic","Label_OpenOrderListItem_Languages":"Vælg sprog","Label_Button_ChangeData":"Skift data","Label_Ordercard_PersonOrders":"Order på person","Label_Button_Create_Order":"Opret ordre","Label_Person_Save_Order":"Venligst indtast en kommentar til ordren og tryk på Gem","TIMEAGO_INIT_STRING":"Til","Entity_Create_Order":"Opret ordre","Table_searchpersonList_Column_ID":"ID","Table_searchpersonList_Column_FirstName":"Fornavn","Table_searchpersonList_Column_LastName":"Efternavn","Table_searchpersonList_Column_PEPRCA":"PEP / RCA","Table_searchpersonList_Column_Country":"Land","Table_searchpersonList_Column_Role":"Detaljeret rolle","Table_searchpersonList_Column_Relation":"Relation","Table_searchpersonList_Column_Organisation":"Organisation","RelationshipWithPersonIs":"Til","Label_searchpersons_Search":"Indtast værdi og tryk enter","Label_PersonView":"Personoversigt","Label_RoleView":"Rolleoversigt","RelationshipWithPersonIsDaughterInLaw":"Svigerdatter til","RelationshipWithPersonIsSonInLaw":"Svigersøn til","RelationshipWithPersonIsDoughter":"Datter til","RelationshipWithPersonIsSon":"Søn til","RelationshipWithPersonIsMotherInLaw":"Svigermor til ","RelationshipWithPersonIsFatherInLaw":"Svigerfar til ","RelationshipWithPersonIsMother":"Mor til","RelationshipWithPersonIsFather":"Far til","RelationshipWithPersonIsPartner":"Partner med","RelationshipWithPersonIsCoworker":"Kollega med","Table_SearchResultForString":"Resultat efter searchstring","Table_SearchResultTimeLaps":"Søgt i","Table_searchpersonList_Column_RoleDescription":"Rollebeskrivelse","Table_searchpersonList_Column_MainRole":"Primære rolle","Label_LoginForm_LdapError":"Dit bruger-id eller adgangskode er ikke korrekt. Prøv igen","Table_searchpersonList_Column_SSN":"Født","Label_ShowAllRoles":"Vis alle roller","Entity_Label_Version_Card":"Versioner","Table_searchpersonList_Column_Birth date":"Fødselsdato","Label_DistinctRoles":"Distinkt rollepræsentation","Form_Current_RoleSearch":"Rolle søg nøgle (Taxonomy)","Form_NumberOfActivePersons":"Antal aktive personer","Form_NumberOfNoneActivePersons":"Antal inaktive personer","Form_NumberOfPersons":"Antal personer","Form_NumberOfActiveRoles":"Antal aktive roller","Label_ResetSearch":"Ny søgning","Entity_Label_Field_SSN":"CPR-nummer","Entity_Label_field_names":"Navne","Label_Button_Create_NewPersonOrder":"Opret ny person","Entity_Label_Field_personname":"Person","Entity_Label_field_type_label":"Person type label","Entity_Label_field_personid":"PersonId (klassisk)","Entity_Label_GoTo_Person":"Go to person","Entity_Label_Field_is_active_relation":"Aktiv forhold","Form_NumberOfTotalRoles":"Rækker i tabel","Form_NumberOfNoneActive":"Inaktive rækker","Label_variant_yy":"Å","Label_variant_mm":"M","Label_variant_dd":"D","Label_date_error":"Check dato","Label_Invalid_date":"Ugyldig dato","Label_variant_hh":"TT","Label_variant_min":"MM","Label_Person_QueryNewOrder":"Bekræft venligst for at oprette en ny order","Label_Button_CreateNewOrder":"Opret ny Person ordre","Label_Snackbar_DataSaved":"Data er gemt","Label_Snackbar_Error":"En systemfejl opstod!","Nav_DropDownItem_NewOrder":"Ny ordre","Entity_Label_Field_countryofjurisdiction":"Jurisdiktion i landet","Entity_Label_Motherboard":"Motherboard","Label_Livestream":"Live stream","Label_Order_Entity":"Livestream Order","Label_Person_Entity":"Livestream person","Label_Livestream_Last":"Sidste begivenheder","Label_PerformedBy":"Udført af","Label_All_Livestream":"Seneste","Label_Ordercard_CurrentOrders":"Ordrer","Label_Ordercard_Subheader":"Aktuelle ordrer","Label_MothercheckPerformed":"Mothercheck udført","Label_Motherchecks":"Overvågning nøgleværdier i Gudrun platform","Label_Motherchecks_sublabel":"Mothercheck liste","Label_mothercheck_details":"Mothercheck Detaljer","Label_Mothercheck_info":"Mothercheck info","Label_Button_OK":"OK","Entity_Label_Field_current_ssn_error":"Organisationsnummer er forkert","Label_Search_Toolbar":"PersonID","Label_MessageCheck":"Beskeder","Label_MessageCheck_sublabel":"Valideringsstatus liste","Label_messagePerformed":"Udførte kontroller","Validate_mandatory_field":"Obligatorisk felt","Validate_mandatory_field_objective":"Dette felt skal udfyldes","Validate_mandatory_field_resolution":"Udfyld feltet","Label_Snackbar_ValidationOrderError":"Valideringsfejl i order","Label_Snackbar_OrderProcessed":"Ordren er blevet behandlet","Validate_Birth date_ok_title":"Fødselsdato felt ok","Validate_Birth date_error_title":"Fødselsdato felt har en fejl","Validate_gender_ok_title":"Køn felt ok","Validate_gender_error_title":"Køn felt har en fejl","Validate_name_error_title":"Mindst et navn skal være ifyldt i ordren","Validate_name_ok_title":"Navnekontrol ok","Label_Person_RestoreThisOrder":"Gendan sidste sæt ændringer","Label_Button_RestoreOrder":"Genopret","Entity_Restore_Order":"Genopret order","Entity_Process_Order":"Behandle order","Label_message_details":"Beskrivelse","Validate_pepcountry_ok_title":"PEP land kontrol ok","Validate_pepcountry_error_title":"Mindst et PEP-land skal vælges","Validate_SSN_ok_title":"SSN ok","Validate_SSN_error_title":"SSN mangler","Label_Card_Role":"Rolle","Label_Card_Relation":"Relation","Label_Card_Core":"Core","Label_Card_SSN":"SSN","Label_Card_Address":"Adresse","Label_Card_URI":"Uri","Label_Card_Name":"Navn","Label_Card_Order":"Order","Validate_nametype_primary_objective":"En order skal indeholde et primært navn","Nav_DropDownItem_Orderdashboard":"Instrumentbræt Order","Entity_Label_SearchPerson":"Søg person","Entity_Label_SearchPerson_Firstname":"Fornavn","Entity_Label_SearchPerson_Lastname":"Efternavn","Entity_Label_SearchPerson_SSNNumber":"Svensk SSN","Entity_Label_SearchPerson_Birth date":"Fødselsdato","Entity_Label_SearchPerson_Year":"År","Entity_Label_SearchPerson_Month":"Måned","Entity_Label_SearchPerson_Day":"Dag","Entity_Label_NameValues":"Navne","Entity_Label_SearchDates":"Datoer","Entity_Label_PEPRCA":"Definer PEP og / eller RCA","Entity_Label_Button_Find":"Søg","Entity_Label_SelectListCountries":"Vælg Liste lande","Entity_List_Link":"Person","Entity_List_SSN":"CPR-nummer","Entity_List_FirstName":"Fornavn","Entity_List_LastName":"Efternavn","Entity_List_Gender":"Køn","Entity_List_PEP":"PEP","Entity_List_RCA":"RCA","Entity_List_Details":"Vis mere","Entity_Label_Mandatory":"Obligatorisk felt","Entity_Label_Button_Back":"Tilbage","Entity_Label_Button_Close":"Luk","Entity_List_Birth date":"Fødselsdato","Entity_List_NameType":"Navnetype","Entity_List_Role":"Rolle","Entity_List_RoleCategory":"Rollekategori","Entity_List_RoleCategoryDetails":"Detaljekategori","Entity_List_FromDate":"Start dato","Entity_List_ThroughDate":"Til dato","Entity_List_Active":"Rolle status","Entity_List_Type":"Navnetype","Entity_List_Name":"Navn","Entity_List_Description":"Beskrivelse","Entity_List_CountryOfJurisdiction":"Jurisdiktion i landet","Label_Snackbar_NoData":"Ingen person matcher forespørgslen","Entity_Label_FieldCountryListSimple_All":"Alle lande","Entity_List_SearchBySSN":"SSN match","Entity_Details":"Detaljer","Entity_Names":"Navne","Entity_Roles":"Roller","Entity_Relations":"Relationer","Entity_Label_AddCompanyUser":"Tilføj bruger","Entity_Label_AddUser_Email2":"Genintast E-mail","Entity_Label_AddUser_Email":"E-mail","Entity_Label_AddUser_Name":"Navn","Entity_UsersList_InactiveMembersTitle":"Inaktive medlemmer","Entity_UsersList_MembersTitle":"Medlemmer","Entity_UsersList_AdminsTitle":"Admins","Entity_UsersList_Deactivate":"Deaktiver","Entity_UsersList_Activate":"Aktiver","Entity_UsersList_Name":"Navn","Entity_UsersList_Email":"E-mail","Entity_UsersList_Dialog_Activate":"Aktiver bruger?","Entity_UsersList_Dialog_Deactivate":"Deaktiver bruger?","Entity_UsersList_Dialog_Cancel":"Afbryd","Entity_UsersList_Dialog_Confirm":"Bekræfte","Entity_Validation_MandatoryField":"Udfyld venligst et obligatorisk felt","Entity_Validation_MatchErrorField":"Værdier er ikke ens for {$ felt}","Entity_UsersList_Active":"Status","Entity_UserList_Pic":"Profil","Nav_DropDownItem_AdminCompanyPersons":"Administrer virksomhedskonti","Entity_List_Avatar":"#","Nav_DropDownItem_Finnish":"Finsk","Nav_DropDownItem_Danish":"Dansk","Nav_DropDownItem_Norweigan":"Norsk","Label_ordersbystate_sublabel":"Ordrer sorterede efter status","Entity_Delete_Relation":"Slet denne relation","Entity_Delete_Role":"Slet denne rolle","Label_Person_Delete_Orde":"Bekræft venligst, for at delete element","Label_Button_ConfirmDelete":"Slet ordre","Nav_DropDownItem_Icleandic":"Island","Entity_Label_Field_ContactUs_Title":"Kontakt os","Entity_Label_Field_ContactUs_Name":"Navn","Entity_Label_Field_ContactUs_Email":"E-mail","Entity_Label_Field_ContactUs_Email2":"Gentag E-mail","Entity_Label_Field_ContactUs_Phone":"Telefon","Entity_Label_Field_ContactUs_Content":"Besked","Entity_Label_Button_ContactUs_Submit":"Send","Entity_Label_Button_ContactUs_Cancel":"Afbryd","Entity_Label_Field_ContactUs_Waltercheck":"Svar på spørgsmålet","Entity_Validation_MandatoryField_Name":"Navn","Entity_Validation_MandatoryField_Email":"E-mail","Entity_Validation_MandatoryField_Message":"Besked","Nav_DropDownItem_About":"Om Oss","Entity_FileareaList_AdminsTitle":"Filområde","Entity_FileareaList_Download":"Hent","Entity_FileareaList_Name":"Filnavn","Nav_DropDownItem_Filearea":"Filområde","Entity_Label_Field_ContactUs_Success":"Din besked er blevet sendt. Tak!","Entity_Label_Field_ContactUs_Fail":"Vi har problemer med at sende beskeden. Prøv venligst igen senere.","Entity_Label_Download_Success":"Filoverførsel påbegyndt","Label_LoginForm_GoHome":"Tilbage til hovedsiden","Nav_DropDownItem_Login":"Log på","Label_Content_Help":"Hjælp med søgning?","Entity_Details_Address":"Adresse","Entity_List_Address":"Vejnavn","Entity_List_Address2":" ","Entity_List_HouseNumber":"Husnummer","Entity_List_PostalCity":"By","Entity_List_ZipCode":"Postnummer","Entity_List_PostalCountry":"Land","Label_Person_Delete_Order":"Slet ordre","Entity_List_RelationType":"Forhold type","Entity_List_RelationDescription":"Relation beskrivelse","Entity_List_BirthDate":"Fødselsdato","Label_EntityIsUpdated":"Sidst ændret","Entity_OssID":"Oss id","Label_RoleIsActive":"Aktiv","Label_RoleIsInActive":"Inaktive","Label_Button_Clear":"Rensa","Label_Button_Filter":"Filter","Label_Button_Search":"Søg","Label_NoSearchPerfomed":"Undlad venligst en ny søgning"});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"en.i18n.yml.js":function module(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// i18n/core/en.i18n.yml.js                                                                                         //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
Package['universe:i18n'].i18n.addTranslations('en','',{"CURRENT-LANGUGE":"ENGLISH","LINE02":"LINE02","Header_Login_Login":"Log in","Nav_DropDownItem_English":"English","Nav_DropDownItem_Swedish":"Swedish","Nav_DropDownItem_Help":"Help","Nav_DropDownItem_Chat":"Intercom","Nav_DropDownItem_Logout":"Log out","Nav_DropDownItem_Profile":"Profile","Nav_DropDownItem_Orders":"Orders","Header_Login_EnterHint":"Enter your user name and password","Link_Login_ForgotPassword":"Forgot password?","Link_Login_CreateAccount":"Create an account","Label_LoginForm_Email":"Email","Label_LoginForm_EmailPlaceholder":"Email","Label_LoginForm_EmailValidationError":"Enter a valid email address.","Label_LoginForm_Password":"Password","Label_LoginForm_PasswordPlaceholder":"Enter your password","Label_LoginForm_PasswordValidationError":"That password is too short","Button_LoginForm_Login":"Login","Header_ForgotPassword_Password":"Forgot password","Header_ForgotPassword_EnterHint":"Enter your e-mail address and a new password will be sent to you.","Header_ForgotPassword_Remember":"Do you remember your password?","Link_ForgotPassword_Login":"Login","Label_ForgotPassword_Email":"Email address","Label_ForgotPassword_EmailPlaceholder":"Enter your email address here","Label_ForgotPassword_EmailValidationError":"Please enter a valid email address.","Button_ForgotPassword_Login":"Send a new password","Button_ForgotPassword_Save":"Send a new password","Header_SetPassword_Password":"Enter a new password","Header_SetPassword_EnterHint":"Enter your password twice","Link_SetPassword_Cancel":"Cancel","Label_SetPassword_Label":"Password","Label_SetPassword_ConfirmLabel":"Confirm password","Label_SetPassword_MinLengthValidationError":"Password is too short (minimum {$ minLength} characters)","Label_SetPassword_MismatchValidationError":"The passwords do not match","Button_SetPassword_Save":"Save","Email_SiteName_Text":"Sunhill Dashboard","Email_From_Text":"Hello@EStod.se","Email_ResetPassword_Subject":"Reset your password","Label_List_Month":"Last 30 days","Label_List_Old":"Older than 30 days","Label_List_Today":"Today","Label_List_Week":"Last 7 days","Label_List_Yesterday":"Yesterday","Label_Chat_Placeholder_Send":"Message","Label_Chat_Placeholder_Send_Label":"New message","Label_Ordercard_Meta":"Meta values","Label_Ordercard_Persondata":"Person data","Label_Ordercard_Persondata_url":"Picture of the person","Label_Ordercard_Postaddress":"Postaddress","Label_Ordercard_Roles":"Roles","Label_Ordercard_Relation":"Relation","Label_Ordercard_Notes":"Notes","Label_Ordercard_Audit":"Audit","Entity_Label_Field_order_process_method":"Process method","Entity_Label_Field_order_type_name":"Order type","Entity_Label_state_name":"Order status","Entity_Label_state_description":"Order status","Entity_Label_Orderid":"Order ID","Entity_Label_Title":"Titel","Entity_Label_Nid":"ID","Entity_Label_Created":"Created","Entity_Label_Changed":"Changed","Entity_Label_Field_pep":"Is a PEP","Entity_Label_Field_current_ssn":"SSN","Entity_Label_Field_ssntype":"SSN Type","Entity_Label_Field_Birth date":"Birth date","Entity_Label_Field_postaladdress":"Postal adress","Entity_Label_Field_postaladdress2":"Postal adress 2","Entity_Label_Field_housenumber":"House number","Entity_Label_Field_postalcity":"Postal city","Entity_Label_Field_zipcode":"Zip code","Entity_Label_Field_firstname":"First name","Entity_Label_Field_lastname":"Last name","Entity_Label_Field_name_type":"Name type","Entity_Label_Field_postalcountry":"Postal Country","Entity_Label_Field_personid":"Person ID (Classic)","Entity_Label_Field_person":"Person Reference (nid)","Entity_Label_Field_person_relation":"Person relationship","Entity_Label_Field_relation_description":"Description","Entity_Label_Field_period_value":"Start date","Entity_Label_Field_period_value2":"Through Date","Entity_Label_Field_country_of_jurisdiction":"Country of jurisdiction","Entity_Label_Field_is_active":"Is active person","Entity_Label_Field_role_description":"Role description","Entity_Label_Field_organisation":"Organisation","Entity_Label_Field_organisation_number":"Organisation number","Entity_Label_Field_notes":"Note","Entity_Label_Field_detailed_role_categories":"Detailed category","Entity_Label_Field_gender":"Gender","Entity_Label_Field_whom":"Whom","Entity_Label_Field_what":"What","Entity_Label_Field_when":"When","Entity_Label_Field_url":"URL","Entity_Label_Field_pepcountryid":"PEP country ID","Entity_Label_Field_country_iso":"PEP country iso code","Entity_Label_Field_pepcountry_name":"PEP country","Entity_Label_Tid":"PEP TID","Entity_Label_Description":"Description","Entity_Label_Field_image_url":"Image URL","Entity_Label_Field_alternate_postaladdress":"Postal address (alternate)","Entity_Label_Field_alternate_postaladdress2":"Postal address 2 (alternate)","Entity_Label_Field_alternate_postalcity":"Postal City (alternate)","Entity_Label_Field_postaladdresssource":"Postal adress source","Entity_Label_Field_alternate_postaladdresssou":"Postal adress source (alternate)","Entity_Label_Field_alternate_housenumber":"House number (alternate)","Entity_Label_Field_alternate_zipcode":"Zip code (alternate)","Entity_Label_Field_alternate_postalcountry":"Postal country (alternate)","Entity_Label_Field_bornafter":"Born after","Entity_Label_Field_source_of_update":"Source of update","Entity_Label_Field_last_date_of_verification":"Last date of verification","Entity_Label_Field_bornbefore":"Born before","Entity_Label_Field_cvrpersonid":"CVR Personid","Entity_Label_Field_probabledata":"Probable data","Entity_Label_Field_effective_date":"Effective Date","Entity_Label_Field_creator":"Created by","Entity_Label_Field_responsible":"Responsible","Entity_Label_Field_Gender_Female":"Female","Entity_Label_Field_Gender_Male":"Male","Entity_Label_Field_rca":"Is a RCA","Entity_Label_Field_order_nametype_1":"Previous Name","Entity_Label_Field_order_nametype_2":"Alternate Spelling","Entity_Label_Field_order_nametype_3":"Primary Name","Entity_Label_Field_order_nametype_4":"Folder Posting Name","Entity_Label_Segment_Postaddress":"Address information","Nav_DropDownItem_Persons":"Search person","Label_Button_Edit":"Edit","Label_Button_Create":"Create","Label_Button_Save":"Save","Label_Button_Delete":"Delete","Label_Button_Update":"Update","Label_Button_Cancel":"Cancel","Label_Autoupdate":"Live update","Label_Button_Add":"Add","Label_Button_Remove":"Remove","Label_Ordercard_Personnames":"Names","Label_Ordercard_Personssn":"SSN","Entity_Label_Field_description":"About this order","Label_Button_UpdateOrderState":"Update order state","Label_Button_CancelOrder":"Cancel order","Entity_Label_Field_deactivationdate":"Deactivation date","Entity_Label_Field_is_deceased":"Deceased","Entity_Label_Field_deceased_date":"Deceased date","Entity_Label_Field_name_type_remove_item":"Remove name item?","Entity_Label_Field_remove_item_text":"Do you really want to remove this item?","Label_Ordercard_PersonSSN":"Person SSN numbers","Entity_Label_Field_ssn_remove_item":"Remove SSN item?","Entity_Label_Field_pepcountry":"PEP Country","Entity_Label_FieldCountryOfJurisdiction_Denmark":"Denmark","Entity_Label_FieldCountryOfJurisdiction_Sweden":"Sweden","Entity_Label_FieldCountryOfJurisdiction_Norway":"Norway","Entity_Label_FieldCountryOfJurisdiction_Finland":"Finland","Entity_Label_Field_is_active_role":"Is active role","Label_Button_NewRole":"Add a new role","Label_Button_RemoveRole":"Delete","Entity_Label_Item_id":"Id","Entity_Label_Field_Role_remove_item":"Remove role from order?","Label_Button_NewRelation":"Add new relation","Entity_Label_Field_Relation_remove_item":"Remove relation from order?","Label_Button_RemoveRelation":"Remove relation","Label_Ordercard_Relations":"Relationship","Entity_Label_Field_relation":"Relationship type","Entity_Label_Field_Category":"Role category","Entity_Label_Role_description_type":"Role description type","Entity_Label_Search":"Search","Label_Orders_Search":"Search person or order","Table_OrderList_Column_Name":"Order id","Table_OrderList_Column_Status":"Status","Table_OrderList_Column_OrderType":"Type","Table_OrderList_Column_ModifiedBy":"Changed","Entity_Label_Person_Card":"Person data","Entity_Label_Personid":"Person ID Classic","Label_OpenOrderListItem_Languages":"Select language","Label_Button_ChangeData":"Change data","Label_Ordercard_PersonOrders":"Order for person","Label_Button_Create_Order":"Create order","Label_Person_Save_Order":"Please enter a comment for the order and press Save","TIMEAGO_INIT_STRING":"For","Entity_Create_Order":"Create Order","Table_searchpersonList_Column_ID":"ID","Table_searchpersonList_Column_FirstName":"First name","Table_searchpersonList_Column_LastName":"Last name","Table_searchpersonList_Column_PEPRCA":"PEP / RCA","Table_searchpersonList_Column_Country":"Country","Table_searchpersonList_Column_Role":"Detailed role","Table_searchpersonList_Column_Relation":"Relation","Table_searchpersonList_Column_Organisation":"Organisation","RelationshipWithPersonIs":"To","Label_searchpersons_Search":"Enter value and press enter","Label_PersonView":"Person view","Label_RoleView":"Role view","RelationshipWithPersonIsDaughterInLaw":"Daughter-in-law to","RelationshipWithPersonIsSonInLaw":"Son-in-law to","RelationshipWithPersonIsDoughter":"Daughter to","RelationshipWithPersonIsSon":"Son to","RelationshipWithPersonIsMotherInLaw":"Mother-in-law to","RelationshipWithPersonIsFatherInLaw":"Father-in-law to","RelationshipWithPersonIsMother":"Mother to","RelationshipWithPersonIsFather":"Father to","RelationshipWithPersonIsPartner":"Partner with","RelationshipWithPersonIsCoworker":"Coworker with","Table_SearchResultForString":"Result for searchstring","Table_SearchResultTimeLaps":"Searched in","Table_searchpersonList_Column_RoleDescription":"Role description","Table_searchpersonList_Column_MainRole":"Main role","Label_LoginForm_LdapError":"Your userid or password is not correct. Please try again","Table_searchpersonList_Column_SSN":"Born","Label_ShowAllRoles":"Show all roles","Entity_Label_Version_Card":"Versions","Table_searchpersonList_Column_Birth date":"Birth date","Label_DistinctRoles":"Distinct role presentation","Form_Current_RoleSearch":"Role search key (Taxonomy)","Form_NumberOfActivePersons":"Number of active persons","Form_NumberOfNoneActivePersons":"Number of inactive persons","Form_NumberOfPersons":"Number of persons","Form_NumberOfActiveRoles":"Number of active roles","Label_ResetSearch":"New search","Entity_Label_Field_SSN":"Swedish personnumber","Entity_Label_field_names":"Names","Label_Button_Create_NewPersonOrder":"Create new person","Entity_Label_Field_personname":"Person","Entity_Label_field_type_label":"Person type label","Entity_Label_field_personid":"PersonId (classic)","Entity_Label_GoTo_Person":"Go to person","Entity_Label_Field_is_active_relation":"Active relation","Form_NumberOfTotalRoles":"Rows in table","Form_NumberOfNoneActive":"None active rows","Label_variant_yy":"Y","Label_variant_mm":"M","Label_variant_dd":"D","Label_date_error":"Check date","Label_Invalid_date":"Invalid date","Label_variant_hh":"HH","Label_variant_min":"MM","Label_Person_QueryNewOrder":"Please confirm to create a new order","Label_Button_CreateNewOrder":"Create new Person order","Label_Snackbar_DataSaved":"Data is saved","Label_Snackbar_Error":"A system-error occured!","Nav_DropDownItem_NewOrder":"New order","Entity_Label_Field_countryofjurisdiction":"Country of jurisdiction","Entity_Label_Motherboard":"Motherboard","Label_Livestream":"Livestream","Label_Order_Entity":"Livestream Order","Label_Person_Entity":"Livestream Person","Label_Livestream_Last":"Last events","Label_PerformedBy":"Performed by","Label_All_Livestream":"Most recent","Label_Ordercard_CurrentOrders":"Orders","Label_Ordercard_Subheader":"Current orders","Label_MothercheckPerformed":"Mother check performed","Label_Motherchecks":"Monitoring key values in EStod platform","Label_Motherchecks_sublabel":"Mothercheck list","Label_mothercheck_details":"Mothercheck Details","Label_Mothercheck_info":"Mothercheck info","Label_Button_OK":"OK","Entity_Label_Field_current_ssn_error":"Personnumber is incorrect","Label_Search_Toolbar":"PersonID","Label_MessageCheck":"Messages","Label_MessageCheck_sublabel":"Validation status list","Label_messagePerformed":"Performed checks","Validate_mandatory_field":"Mandatory field","Validate_mandatory_field_objective":"This field must be filled in","Validate_mandatory_field_resolution":"Fill in the field","Label_Snackbar_ValidationOrderError":"Validation error in Order","Label_Snackbar_OrderProcessed":"The order has been processed","Validate_Birth date_ok_title":"Birth date field ok","Validate_Birth date_error_title":"Birth date has an error","Validate_gender_ok_title":"Gender field ok","Validate_gender_error_title":"Gender field has an error","Validate_name_error_title":"At least one name must be present in order","Validate_name_ok_title":"Name check ok","Label_Person_RestoreThisOrder":"Restore last set of changes","Label_Button_RestoreOrder":"Restore","Entity_Restore_Order":"Restore order","Entity_Process_Order":"Process order","Label_message_details":"Description","Validate_pepcountry_ok_title":"PEP country check ok","Validate_pepcountry_error_title":"At least one PEP country must be selected","Validate_SSN_ok_title":"SSN ok","Validate_SSN_error_title":"SSN missing","Label_Card_Role":"Role","Label_Card_Relation":"Relation","Label_Card_Core":"Core","Label_Card_SSN":"SSN","Label_Card_Address":"Address","Label_Card_URI":"Uri","Label_Card_Name":"Name","Label_Card_Order":"Order","Validate_nametype_primary_objective":"An order must contain one primary name","Nav_DropDownItem_Orderdashboard":"Order dashboard","Entity_Label_SearchPerson":"Search person","Entity_Label_SearchPerson_Firstname":"First name","Entity_Label_SearchPerson_Lastname":"Last name","Entity_Label_SearchPerson_SSNNumber":"Swedish personnumber","Entity_Label_SearchPerson_Birth date":"Birth date","Entity_Label_SearchPerson_Year":"Year","Entity_Label_SearchPerson_Month":"Month","Entity_Label_SearchPerson_Day":"Day","Entity_Label_NameValues":"Names","Entity_Label_SearchDates":"Dates","Entity_Label_PEPRCA":"PEP/RCA","Entity_Label_Button_Find":"Search","Entity_Label_SelectListCountries":"Select countries","Entity_List_Link":"Person","Entity_List_SSN":"Swedish personnumber","Entity_List_FirstName":"First name","Entity_List_LastName":"Last name","Entity_List_Gender":"Gender","Entity_List_PEP":"PEP","Entity_List_RCA":"RCA","Entity_List_Details":"Show more","Entity_Label_Mandatory":"Mandatory field","Entity_Label_Button_Back":"Back","Entity_Label_Button_Close":"Close","Entity_List_Birth date":"Birth date","Entity_List_NameType":"Name type","Entity_List_Role":"Role","Entity_List_RoleCategory":"Role category","Entity_List_RoleCategoryDetails":"Detailed category","Entity_List_FromDate":"Start date","Entity_List_ThroughDate":"Through date","Entity_List_Active":"Role status","Entity_List_Type":"Name type","Entity_List_Name":"Name","Entity_List_Description":"Description","Entity_List_CountryOfJurisdiction":"Country of Jurisdiction","Label_Snackbar_NoData":"No person matches the query","Entity_Label_FieldCountryListSimple_All":"All countries","Entity_List_SearchBySSN":"Personnumber match","Entity_Details":"Details","Entity_Names":"Names","Entity_Roles":"Roles","Entity_Relations":"Relations","Entity_Label_AddCompanyUser":"Add user","Entity_Label_AddUser_Email2":"Re-enter email address","Entity_Label_AddUser_Email":"Email","Entity_Label_AddUser_Name":"Name","Entity_UsersList_InactiveMembersTitle":"Inactive members","Entity_UsersList_MembersTitle":"Members","Entity_UsersList_AdminsTitle":"Administratörer","Entity_UsersList_Deactivate":"Deactivate","Entity_UsersList_Activate":"Activate","Entity_UsersList_Name":"Name","Entity_UsersList_Email":"Email","Entity_UsersList_Dialog_Activate":"Activate user?","Entity_UsersList_Dialog_Deactivate":"Deactivate user?","Entity_UsersList_Dialog_Cancel":"Cancel","Entity_UsersList_Dialog_Confirm":"Confirm","Entity_Validation_MandatoryField":"Please fill in all mandatory fields","Entity_Validation_MatchErrorField":"Values do not match for {$field}","Entity_UsersList_Active":"Status","Entity_UserList_Pic":"Profile","Nav_DropDownItem_AdminCompanyPersons":"Manage user accounts","Entity_List_Avatar":"#","Nav_DropDownItem_Finnish":"Finnish","Nav_DropDownItem_Danish":"Danish","Nav_DropDownItem_Norweigan":"Norweigan","Label_ordersbystate_sublabel":"Orders by state","Entity_Delete_Relation":"Delete this relation","Entity_Delete_Role":"Delete this role","Label_Person_Delete_Orde":"Please confirm in order to delete item","Label_Button_ConfirmDelete":"Delete order","Nav_DropDownItem_Icleandic":"Iceland","Entity_Label_Field_ContactUs_Title":"Contact us","Entity_Label_Field_ContactUs_Name":"Name","Entity_Label_Field_ContactUs_Email":"E-mail address","Entity_Label_Field_ContactUs_Email2":"Repeat e-mail address","Entity_Label_Field_ContactUs_Phone":"Phone","Entity_Label_Field_ContactUs_Content":"Message","Entity_Label_Button_ContactUs_Submit":"Send","Entity_Label_Button_ContactUs_Cancel":"Cancel","Entity_Label_Field_ContactUs_Waltercheck":"Answer the question","Entity_Validation_MandatoryField_Name":"Name","Entity_Validation_MandatoryField_Email":"E-mail","Entity_Validation_MandatoryField_Message":"Message","Nav_DropDownItem_About":"About EStod","Entity_FileareaList_AdminsTitle":"File area","Entity_FileareaList_Download":"Download","Entity_FileareaList_Name":"File name","Nav_DropDownItem_Filearea":"File area","Entity_Label_Field_ContactUs_Success":"Your message has been sent. Thank you.","Entity_Label_Field_ContactUs_Fail":"There was a problem sending the message. Please try again later or contact us directly at support@EStod.se. Thank you.","Entity_Label_Download_Success":"File transfer started","Label_LoginForm_GoHome":"Back to main page","Nav_DropDownItem_Login":"Log in","Label_Content_Help":"How the search works","Entity_Details_Address":"Address ","Entity_List_Address":"Postal address","Entity_List_Address2":"Postal address 2","Entity_List_HouseNumber":"House number","Entity_List_PostalCity":"City","Entity_List_ZipCode":"Zip Code","Entity_List_PostalCountry":"Country","Label_Person_Delete_Order":"Delete order","Entity_List_RelationType":"Relation type","Entity_List_RelationDescription":"Relation description ","Entity_List_BirthDate":"Birth date","Label_EntityIsUpdated":"Last changed","Entity_EStodID":"EStod ID","Label_RoleIsActive":"Active","Label_RoleIsInActive":"Inactive ","Label_Button_Clear":"Clear","Label_Button_Filter":"Filter","Label_Button_Search":"Search","Label_NoSearchPerfomed":"No search results. Search was performed","Entity_List_OpenRelation":"Go to related person","Label_Welcome":"Welcome","Label_Country_Sweden":"Sweden","Label_Country_Denmark":"Denmark","Label_Country_Finland":"Finland","Label_Country_Norway":"Norway","Nav_DropDownItem_Settings":"Settings","Nav_DropDownItem_ChangePassword":"Change password","Nav_DropDownItem_Darkmode":"Change theme","Nav_DropDownItem_Contact":"Contact us","Label_AppName":"Sunhill Dashboard","Label_Tooltip_ThemeDark":"Change theme","Label_Tooltip_ThemeLight":"Change theme","Label_Tooltip_Settings":"Settings","Label_Tooltip_Contact":"Contact us","Label_Tooltip_Filearea":"File area","Label_Tooltip_HandleUsers":"Manage user accounts","Entity_Label_SetPassWord":"Save new password","Label_RegisterForm_Password":"Password","Tooltip_RegisterForm_Password":"At least 8 characters","Label_RegisterForm_PasswordConfirm":"Confirm password","Tooltip_RegisterForm_PasswordConfirm":"Please reenter the password","Label_PasswordChanged":"Password changed","Label_Password_Guidelines":"The string must contain at least 1 lowercase alphabetical character,  at least 1 uppercase alphabetical character, at least 1 numeric character and at least one special character. The string must be eight characters or longer","Button_Password_Save":"Save new password","Error_RegisterForm_Password":"Password format error","Error_RegisterForm_PasswordMatch":"The passwords do not match","Label_LoginForm_Account":"Account name","Label_LoginForm_AccountPlaceholder":"Enter your account name","Denmark":"Denmark","Sweden":"Sweden","Finlan":"Finland","Norway":"Norway","Entity_Label_Error_canPerformSSNSearchFalse":"You need to combine the personnumber with a first and last name","Confirm_you_want_to_remove_user_from_Company":"Confirm that you want to remove the user from the company.","ButtonRemoveUser":"Remove user","ButtonCancel":"Cancel","Titel_Delete_User":"Remove user ","User_already_exists_Contact_support":"User already exists. Please contact support if you need help to relate this user to this company.","SSN_format_error":"Enter social security number in the format YYYYMMDD-XXXX","Label_Content_Cookie":"About cookies","time_indicator":"At","January":"January","February":"February","March":"March","April":"April","May":"May","June":"June","July":"July","August":"August","September":"September","October":"October","November":"November","December":"December","Entity_Label_Field_birthdate":"Birth date","Table_searchpersonList_Column_Birthdate":"Birth date","Tooltip_ChatLineListComponent_Text":"Message","Label_Button_EditPersonMode":"Edit person","Label_Button_ViewPersonMode":"View person","Nav_DropDownItem_Livestream":"Intercom","Label_MyChatChannels":"Channels","Label_MyChatChannelsMostRecent":"Most recent","Link_Login_Register":"Join","Label_Onboarding_Password":"Enter password","Label_Onboarding_PasswordAgain":"Enter password again","Nav_DropDownItem_MCC":"Dashboard","Table_searchpersonList_Column_facility":"Facility","Table_searchpersonList_Column_mid":"MID","Table_searchpersonList_Column_mid_uuid":"MID-uuid","Table_searchpersonList_Column_address":"Address","Table_searchpersonList_Column_energy_delivery_method":"Energy delivery method","Table_searchpersonList_Column_valve_type":"Valve type","Table_searchpersonList_Column_sv21_manual_signal_method":"Manual signal","Table_searchpersonList_Column_write_power_proc_status":"Power proc. status","Table_searchpersonList_Column_write_heat_proc_status":"Heat proc. status","Table_searchpersonList_Column_write_read_proc_status":"Read proc. status","Table_searchpersonList_Column_subcircuit":"Subcircuit","Entity_Label_Filter":"Filter table","Nav_DropDownItem_SignalsSettings":"Signals","Nav_DropDownItem_MCCFacilities":"Facilities","write_heat_proc_status":"Heat process enabled","read_proc_status":"Read process","write_power_proc_status":"Power process enabled","facility_orginal":"Facility Original value","mid_uuid":"MID Unique id (uuid)","Address":"Address","subcircuit":"Subcircuit","energy_delivery_method":"Energy delivery method","valve_type":"Valve type","sv21_manual_signal_method":"SV21 manual signal method","ttc":"Time to check in seconds (used with frequence i.e. 1, 3, 5 min)","dispatchgroup":"Internal use in GW","Nav_DropDownItem_MCCDashBoard":"Dashboard"});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"fi.i18n.yml.js":function module(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// i18n/core/fi.i18n.yml.js                                                                                         //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
Package['universe:i18n'].i18n.addTranslations('fi','',{"Header_Login_Login":"Kirjaudu sisään","Nav_DropDownItem_English":"Englanti","Nav_DropDownItem_Swedish":"Ruotsin kieli","Nav_DropDownItem_Help":"Auta","Nav_DropDownItem_Chat":"Intercom","Nav_DropDownItem_Logout":"Kirjautua ulos","Nav_DropDownItem_Profile":"Profiili","Nav_DropDownItem_Orders":"Tilaukset","Header_Login_EnterHint":"Kirjoita käyttäjätunnus ja salasana","Link_Login_ForgotPassword":"Unohtuiko salasana?","Link_Login_CreateAccount":"Luo tili","Label_LoginForm_Email":"Sähköposti","Label_LoginForm_EmailPlaceholder":"Sähköposti","Label_LoginForm_EmailValidationError":"Syötä voimassa oleva sähköpostiosoite.","Label_LoginForm_Password":"Salasana","Label_LoginForm_PasswordPlaceholder":"Syötä salasanasi","Label_LoginForm_PasswordValidationError":"Että salasana on liian lyhyt","Button_LoginForm_Login":"Kirjaudu sisään","Header_ForgotPassword_Password":"Unohtuiko salasana","Header_ForgotPassword_EnterHint":"Anna sähköpostiosoite ja uusi salasana lähetetään sinulle.","Header_ForgotPassword_Remember":"Muistatko salasana?","Link_ForgotPassword_Login":"Kirjaudu sisään","Label_ForgotPassword_Email":"Sähköpostiosoite","Label_ForgotPassword_EmailPlaceholder":"Tässä voit syöttää sähköpostiosoitteesi.","Label_ForgotPassword_EmailValidationError":"Ole hyvä ja syötä toimiva sähköpostiosoite.","Button_ForgotPassword_Login":"Lähetä uusi salasana","Button_ForgotPassword_Save":"Lähetä uusi salasana","Header_SetPassword_Password":"Syötä uusi salasana","Header_SetPassword_EnterHint":"Anna salasana kahdesti","Link_SetPassword_Cancel":"Peruuttaa","Label_SetPassword_Label":"Salasana","Label_SetPassword_ConfirmLabel":"Vahvista salasana","Label_SetPassword_MinLengthValidationError":"Salasana on liian lyhyt (minimi {$ MINLENGTH} merkkiä)","Label_SetPassword_MismatchValidationError":"Salasana ei täsmää","Button_SetPassword_Save":"Tallentaa","Email_SiteName_Text":"Gudrun","Email_From_Text":"Hello@Oss.se","Email_ResetPassword_Subject":"Nollaa salasana","Label_List_Month":"Viimeiset 30 päivää","Label_List_Old":"Yli 30 päivää","Label_List_Today":"Tänään","Label_List_Week":"Viimeiset 7 päivää","Label_List_Yesterday":"Eilen","Label_Chat_Placeholder_Send":"Viesti","Label_Chat_Placeholder_Send_Label":"Uusi viesti","Label_Ordercard_Meta":"Meta-arvot","Label_Ordercard_Persondata":"Person tiedot","Label_Ordercard_Persondata_url":"Kuva on henkilö","Label_Ordercard_Postaddress":"Postiosoite","Label_Ordercard_Roles":"Roolit","Label_Ordercard_Relation":"Suhde","Label_Ordercard_Notes":"Huomautuksia","Label_Ordercard_Audit":"Tarkastaa","Entity_Label_Field_order_process_method":"Prosessi menetelmä","Entity_Label_Field_order_type_name":"Tilaustapa","Entity_Label_state_name":"Tilauksen tila","Entity_Label_state_description":"Tilauksen tila","Entity_Label_Orderid":"Tilausnumero","Entity_Label_Title":"Otsikko","Entity_Label_Nid":"ID","Entity_Label_Created":"Luotu","Entity_Label_Changed":"Muuttunut","Entity_Label_Field_pep":"Is PEP","Entity_Label_Field_current_ssn":"SSN","Entity_Label_Field_ssntype":"SSN Tyyppi","Entity_Label_Field_Birth date":"Syntymäpäivä","Entity_Label_Field_postaladdress":"Postiosoite","Entity_Label_Field_postaladdress2":"Postal adress 2","Entity_Label_Field_housenumber":"Talonumero","Entity_Label_Field_postalcity":"Posti- kaupunki","Entity_Label_Field_zipcode":"Postinumero","Entity_Label_Field_firstname":"Etunimi","Entity_Label_Field_lastname":"Sukunimi","Entity_Label_Field_name_type":"Tyyppi","Entity_Label_Field_postalcountry":"Posti- Maa","Entity_Label_Field_personid":"Henkilötunnus (Classic)","Entity_Label_Field_person":"Henkilöviittaustaulukko (nid)","Entity_Label_Field_person_relation":"Person suhde","Entity_Label_Field_relation_description":"Kuvaus","Entity_Label_Field_period_value":"Aloituspäivämäärä","Entity_Label_Field_period_value2":"DATE","Entity_Label_Field_country_of_jurisdiction":"Maa toimivalta","Entity_Label_Field_is_active":"On aktiivinen henkilö","Entity_Label_Field_role_description":"Rooli kuvaus","Entity_Label_Field_organisation":"Organisaatio","Entity_Label_Field_organisation_number":"Organisaatio numero","Entity_Label_Field_notes":"Huomautus","Entity_Label_Field_detailed_role_categories":"Yksityiskohtainen luokka","Entity_Label_Field_gender":"Sukupuoli","Entity_Label_Field_whom":"Ketä","Entity_Label_Field_what":"Mitä","Entity_Label_Field_when":"Kun","Entity_Label_Field_url":"URL-","Entity_Label_Field_pepcountryid":"PEP maan tunnus","Entity_Label_Field_country_iso":"PEP maa ISO-koodi","Entity_Label_Field_pepcountry_name":"PEP maa","Entity_Label_Tid":"PEP TID","Entity_Label_Description":"Kuvaus","Entity_Label_Field_image_url":"Kuvan URL","Entity_Label_Field_alternate_postaladdress":"Postiosoite (vaihtoehtoinen)","Entity_Label_Field_alternate_postaladdress2":"Postiosoite 2 (vaihtoehtoinen)","Entity_Label_Field_alternate_postalcity":"Posti- Kaupunki (varajäsen)","Entity_Label_Field_postaladdresssource":"Postal adress lähde","Entity_Label_Field_alternate_postaladdresssou":"Postin adress lähde (vaihtoehtoinen)","Entity_Label_Field_alternate_housenumber":"Talon numero (varajäsen)","Entity_Label_Field_alternate_zipcode":"Postinumero (vaihtoehtoinen)","Entity_Label_Field_alternate_postalcountry":"Posti- maa (varajäsen)","Entity_Label_Field_bornafter":"Jälkeen syntyneet","Entity_Label_Field_source_of_update":"Lähde päivitys","Entity_Label_Field_last_date_of_verification":"Viimeinen vahvistus","Entity_Label_Field_bornbefore":"Syntynyt ennen","Entity_Label_Field_cvrpersonid":"CVR Personid","Entity_Label_Field_probabledata":"Todennäköinen tiedot","Entity_Label_Field_effective_date":"Voimaanastumispäivä","Entity_Label_Field_creator":"Luonut","Entity_Label_Field_responsible":"Vastuullinen","Entity_Label_Field_Gender_Female":"Nainen","Entity_Label_Field_Gender_Male":"Uros","Entity_Label_Field_rca":"Is RCA","Entity_Label_Field_order_nametype_1":"Edellinen nimi","Entity_Label_Field_order_nametype_2":"Eri kirjoitusasuilla","Entity_Label_Field_order_nametype_3":"Ensisijainen nimi","Entity_Label_Field_order_nametype_4":"Kansio Kirjoittamisen Name","Entity_Label_Segment_Postaddress":"Osoitetietoja","Nav_DropDownItem_Persons":"Hae henkilöitä","Label_Button_Edit":"Muokata","Label_Button_Create":"Luoda","Label_Button_Save":"Tallentaa","Label_Button_Delete":"Poistaa","Label_Button_Update":"Päivittää","Label_Button_Cancel":"Peruuttaa","Label_Autoupdate":"Live päivitys","Label_Button_Add":"Lisätä","Label_Button_Remove":"Poistaa","Label_Ordercard_Personnames":"Nimet","Label_Ordercard_Personssn":"SSN","Entity_Label_Field_description":"Tästä tilauksesta","Label_Button_UpdateOrderState":"Päivitä tilauksen tila","Label_Button_CancelOrder":"Peruuta tilaus","Entity_Label_Field_deactivationdate":"Deaktivointi päivämäärä","Entity_Label_Field_is_deceased":"Kuollut","Entity_Label_Field_deceased_date":"Kuolleen päivämäärä","Entity_Label_Field_name_type_remove_item":"Poista nimi kohteen?","Entity_Label_Field_remove_item_text":"Haluatko todella poistaa tämän kohteen?","Label_Ordercard_PersonSSN":"Person SSN numeroita","Entity_Label_Field_ssn_remove_item":"Poista SSN kohteen?","Entity_Label_Field_pepcountry":"PEP Maa","Entity_Label_FieldCountryOfJurisdiction_Denmark":"Tanska","Entity_Label_FieldCountryOfJurisdiction_Sweden":"Ruotsi","Entity_Label_FieldCountryOfJurisdiction_Norway":"Norja","Entity_Label_FieldCountryOfJurisdiction_Finland":"Suomi","Entity_Label_Field_is_active_role":"On aktiivinen rooli","Label_Button_NewRole":"Lisää uusi rooli","Label_Button_RemoveRole":"Poistaa","Entity_Label_Item_id":"Id","Entity_Label_Field_Role_remove_item":"Poista rooli tilauksesta?","Label_Button_NewRelation":"Lisää releation","Entity_Label_Field_Relation_remove_item":"Poista suhteessa tilauksesta?","Label_Button_RemoveRelation":"Poista suhde","Label_Ordercard_Relations":"Yhteys","Entity_Label_Field_relation":"Suhde tyyppi","Entity_Label_Field_Category":"Rooli luokka","Entity_Label_Role_description_type":"Rooli kuvaus tyyppi","Entity_Label_Search":"Hae","Label_Orders_Search":"Hae henkilö tai tilata","Table_OrderList_Column_Name":"Tilausnumero","Table_OrderList_Column_Status":"Status","Table_OrderList_Column_OrderType":"Tyyppi","Table_OrderList_Column_ModifiedBy":"Muuttunut","Entity_Label_Person_Card":"Person tiedot","Entity_Label_Personid":"Henkilön ID Classic","Label_OpenOrderListItem_Languages":"Valitse kieli","Label_Button_ChangeData":"Muuta tietoa","Label_Ordercard_PersonOrders":"Jotta henkilö","Label_Button_Create_Order":"Luo tilaus","Label_Person_Save_Order":"Plese lisätä kommentin tilaukselle ja paina Tallenna","TIMEAGO_INIT_STRING":"Varten","Entity_Create_Order":"Luo tilaus","Table_searchpersonList_Column_ID":"ID","Table_searchpersonList_Column_FirstName":"Etunimi","Table_searchpersonList_Column_LastName":"Sukunimi","Table_searchpersonList_Column_PEPRCA":"PEP / RCA","Table_searchpersonList_Column_Country":"Maa","Table_searchpersonList_Column_Role":"Tarkemmat rooli","Table_searchpersonList_Column_Relation":"Suhde","Table_searchpersonList_Column_Organisation":"Organisaatio","RelationshipWithPersonIs":"Että","Label_searchpersons_Search":"Anna arvo ja paina Enter","Label_PersonView":"Persoonan näkymä","Label_RoleView":"Rooli näkymä","RelationshipWithPersonIsDaughterInLaw":"Miniä lain","RelationshipWithPersonIsSonInLaw":"Vävy lain","RelationshipWithPersonIsDoughter":"Doughter kohteeseen","RelationshipWithPersonIsSon":"Poikansa","RelationshipWithPersonIsMotherInLaw":"Äiti-in-lain","RelationshipWithPersonIsFatherInLaw":"Appensa lain","RelationshipWithPersonIsMother":"Äiti","RelationshipWithPersonIsFather":"Isä","RelationshipWithPersonIsPartner":"Yhteistyökumppaniksi","RelationshipWithPersonIsCoworker":"Työtoveri kanssa","Table_SearchResultForString":"Tulos searchstring","Table_SearchResultTimeLaps":"Etsitään","Table_searchpersonList_Column_RoleDescription":"Rooli kuvaus","Table_searchpersonList_Column_MainRole":"Päärooli","Label_LoginForm_LdapError":"Oman käyttäjätunnus tai salasana on väärä. Yritä uudelleen","Table_searchpersonList_Column_SSN":"Syntynyt","Label_ShowAllRoles":"Kaikki roolit","Entity_Label_Version_Card":"Versiot","Table_searchpersonList_Column_Birth date":"Syntymäpäivä","Label_DistinctRoles":"Erityinen tehtävänsä presenation","Form_Current_RoleSearch":"Rooli hakunäppäin (taksonomia)","Form_NumberOfActivePersons":"Määrä aktiivisia henkilöitä","Form_NumberOfNoneActivePersons":"Määrä työelämän ulkopuolella oleville","Form_NumberOfPersons":"Henkilöiden määrä","Form_NumberOfActiveRoles":"Määrä aktiivisia rooleja","Label_ResetSearch":"Uusi haku","Entity_Label_Field_SSN":"Sosiaaliturvatunnus","Entity_Label_field_names":"Nimet","Label_Button_Create_NewPersonOrder":"Luo uusi henkilö","Entity_Label_Field_personname":"Henkilö","Entity_Label_field_type_label":"Person tyyppitarra","Entity_Label_field_personid":"PersonId (klassinen)","Entity_Label_GoTo_Person":"Go to person","Entity_Label_Field_is_active_relation":"Aktiivinen suhde","Form_NumberOfTotalRoles":"Rivit taulukossa","Form_NumberOfNoneActive":"None aktiivinen rivit","Label_variant_yy":"Y","Label_variant_mm":"M","Label_variant_dd":"D","Label_date_error":"Tarkista päivämäärä","Label_Invalid_date":"Väärä päivämäärä","Label_variant_hh":"HH","Label_variant_min":"MM","Label_Person_QueryNewOrder":"Vahvista luoda uusi tilaus","Label_Button_CreateNewOrder":"Luo uusi henkilö tilaus","Label_Snackbar_DataSaved":"Tiedot tallentuvat","Label_Snackbar_Error":"Järjestelmä-virhe!","Nav_DropDownItem_NewOrder":"Uusi järjestys","Entity_Label_Field_countryofjurisdiction":"Maa Toimivalta","Entity_Label_Motherboard":"Emolevy","Label_Livestream":"Livestream","Label_Order_Entity":"Livestream Tilaa","Label_Person_Entity":"Livestream Henkilö","Label_Livestream_Last":"Viime tapahtumia","Label_PerformedBy":"Esittäjä","Label_All_Livestream":"Viimeisin","Label_Ordercard_CurrentOrders":"Tilaukset","Label_Ordercard_Subheader":"Nykyinen tilauksia","Label_MothercheckPerformed":"Äiti tarkistus suoritettu","Label_Motherchecks":"Seuranta keskeiset arvot Gudrun alustalle","Label_Motherchecks_sublabel":"Mothercheck lista","Label_mothercheck_details":"Mothercheck tiedot","Label_Mothercheck_info":"Mothercheck info","Label_Button_OK":"Kunnossa","Entity_Label_Field_current_ssn_error":"Organisaatio numero on virhe","Label_Search_Toolbar":"PersonID","Label_MessageCheck":"Viestien","Label_MessageCheck_sublabel":"Kelpoistustila lista","Label_messagePerformed":"Tarkastettiin","Validate_mandatory_field":"Pakollinen kenttä","Validate_mandatory_field_objective":"Tämä kenttä on täytettävä","Validate_mandatory_field_resolution":"Täytä alalla","Label_Snackbar_ValidationOrderError":"Validointi virhe Tilaus","Label_Snackbar_OrderProcessed":"Tilaus on käsitelty","Validate_Birth date_ok_title":"Syntymäaika kenttään ok","Validate_Birth date_error_title":"Syntymäaika on virhe","Validate_gender_ok_title":"Sukupuolikenttiä ok","Validate_gender_error_title":"Sukupuoli on virhe","Validate_name_error_title":"Ainakin yksi nimen on oltava läsnä, jotta","Validate_name_ok_title":"Name tarkistaa ok","Label_Person_RestoreThisOrder":"Palauta viimeiset muutokset","Label_Button_RestoreOrder":"Palauttaa","Entity_Restore_Order":"Palauttaa järjestys","Entity_Process_Order":"Prosessin tilaus","Label_message_details":"Kuvaus","Validate_pepcountry_ok_title":"PEP maa tarkistaa ok","Validate_pepcountry_error_title":"Ainakin yksi POR maata on valittava","Validate_SSN_ok_title":"SSN ok","Validate_SSN_error_title":"SSN puuttuu","Label_Card_Role":"Rooli","Label_Card_Relation":"Suhde","Label_Card_Core":"Ydin","Label_Card_SSN":"SSN","Label_Card_Address":"Osoite","Label_Card_URI":"Uri","Label_Card_Name":"Nimi","Label_Card_Order":"Tilata","Validate_nametype_primary_objective":"En järjestys måste ha ett Primärt namn","Nav_DropDownItem_Orderdashboard":"Jotta kojelauta","Entity_Label_SearchPerson":"Hae henkilöitä","Entity_Label_SearchPerson_Firstname":"Etunimi","Entity_Label_SearchPerson_Lastname":"Sukunimi","Entity_Label_SearchPerson_SSNNumber":"Ruotsin ssn","Entity_Label_SearchPerson_Birth date":"Syntymäpäivä","Entity_Label_SearchPerson_Year":"Vuosi","Entity_Label_SearchPerson_Month":"Kuukausi","Entity_Label_SearchPerson_Day":"Päivä","Entity_Label_NameValues":"Nimet","Entity_Label_SearchDates":"Päivämäärät","Entity_Label_PEPRCA":"Määritellä PEP ja / tai RCA","Entity_Label_Button_Find":"Hae","Entity_Label_SelectListCountries":"Valitse lista maista","Entity_List_Link":"Henkilö","Entity_List_SSN":"Sosiaaliturvatunnus","Entity_List_FirstName":"Etunimi","Entity_List_LastName":"Sukunimi","Entity_List_Gender":"Sukupuoli","Entity_List_PEP":"PEP","Entity_List_RCA":"RCA","Entity_List_Details":"Näytä lisää","Entity_Label_Mandatory":"Pakollinen kenttä","Entity_Label_Button_Back":"Takaisin","Entity_Label_Button_Close":"Kiinni","Entity_List_Birth date":"Syntymäpäivä","Entity_List_NameType":"Tyyppi","Entity_List_Role":"Rooli","Entity_List_RoleCategory":"Rooli luokka","Entity_List_RoleCategoryDetails":"Yksityiskohtainen luokka","Entity_List_FromDate":"Aloituspäivämäärä","Entity_List_ThroughDate":"DATE","Entity_List_Active":"Rooli tila","Entity_List_Type":"Tyyppi","Entity_List_Name":"Nimi","Entity_List_Description":"Kuvaus","Entity_List_CountryOfJurisdiction":"Maa Toimivalta","Label_Snackbar_NoData":"Ketään vastaavat kyselyä","Entity_Label_FieldCountryListSimple_All":"Kaikki maat","Entity_List_SearchBySSN":"SSN ottelu","Entity_Details":"Yksityiskohdat","Entity_Names":"Nimet","Entity_Roles":"Roolit","Entity_Relations":"Suhteet","Entity_Label_AddCompanyUser":"Lisää käyttäjä","Entity_Label_AddUser_Email2":"Syötä sähköpostiosoite uudestaan","Entity_Label_AddUser_Email":"Sähköposti","Entity_Label_AddUser_Name":"Nimi","Entity_UsersList_InactiveMembersTitle":"Toimeton jäsentä","Entity_UsersList_MembersTitle":"Jäsenet","Entity_UsersList_AdminsTitle":"Ylläpitäjät","Entity_UsersList_Deactivate":"Poista käytöstä","Entity_UsersList_Activate":"Aktivoida","Entity_UsersList_Name":"Nimi","Entity_UsersList_Email":"Sähköposti","Entity_UsersList_Dialog_Activate":"Aktivoi käyttäjä?","Entity_UsersList_Dialog_Deactivate":"Deaktivoi käyttäjä?","Entity_UsersList_Dialog_Cancel":"Peruuttaa","Entity_UsersList_Dialog_Confirm":"Vahvistaa","Entity_Validation_MandatoryField":"Täytä pakollinen kenttä","Entity_Validation_MatchErrorField":"Arvot eivät vastaa {$ kentän}","Entity_UsersList_Active":"Status","Entity_UserList_Pic":"Profiili","Nav_DropDownItem_AdminCompanyPersons":"Hallitse Yritystilit","Entity_List_Avatar":"#","Nav_DropDownItem_Finnish":"Suomalainen","Nav_DropDownItem_Danish":"Tanskan kieli","Nav_DropDownItem_Norweigan":"Norja","Label_ordersbystate_sublabel":"Tilaukset valtion","Entity_Delete_Relation":"Poista tämä suhde","Entity_Delete_Role":"Poista tämä rooli","Label_Person_Delete_Orde":"Vahvista jotta Poista paikka","Label_Button_ConfirmDelete":"Poista järjestys","Nav_DropDownItem_Icleandic":"Islanti","Entity_Label_Field_ContactUs_Title":"Ota meihin yhteyttä","Entity_Label_Field_ContactUs_Name":"Nimi","Entity_Label_Field_ContactUs_Email":"Sähköpostiosoite","Entity_Label_Field_ContactUs_Email2":"Toista sähköpostiosoitteeseen","Entity_Label_Field_ContactUs_Phone":"Puhelin","Entity_Label_Field_ContactUs_Content":"Viesti","Entity_Label_Button_ContactUs_Submit":"Lähettää","Entity_Label_Button_ContactUs_Cancel":"Peruuttaa","Entity_Label_Field_ContactUs_Waltercheck":"Vastaa kysymykseen","Entity_Validation_MandatoryField_Name":"Nimi","Entity_Validation_MandatoryField_Email":"Sähköposti","Entity_Validation_MandatoryField_Message":"Viesti","Nav_DropDownItem_About":"Tietoja Oss","Entity_FileareaList_AdminsTitle":"Tiedostoalueen","Entity_FileareaList_Download":"Ladata","Entity_FileareaList_Name":"Tiedoston nimi","Nav_DropDownItem_Filearea":"Tiedostoalueen","Entity_Label_Field_ContactUs_Success":"Viestisi on lähetetty. Kiitos.","Entity_Label_Field_ContactUs_Fail":"Ongelmana viestin lähettämistä. Yritä uudelleen myöhemmin.","Entity_Label_Download_Success":"Tiedostonsiirto aloitettiin","Label_LoginForm_GoHome":"Takaisin etusivulle","Nav_DropDownItem_Login":"Kirjaudu sisään","Label_Content_Help":"Hae ohje?","Entity_Details_Address":"Osoite","Entity_List_Address":"Katuosoite","Entity_List_Address2":"Katuosoite ylimääräistä","Entity_List_HouseNumber":"Talonumero","Entity_List_PostalCity":"Kaupunki","Entity_List_ZipCode":"Postinumero","Entity_List_PostalCountry":"Maa","Label_Person_Delete_Order":"Poista järjestys","Entity_List_RelationType":"Liittyy tyyppi","Entity_List_RelationDescription":"Liittyy kuvaus","Entity_List_BirthDate":"Syntymäpäivä","Label_EntityIsUpdated":"Viimeksi muokattu","Entity_OssID":"Oss tunnus","Label_RoleIsActive":"Aktiivinen","Label_RoleIsInActive":"Epäaktiivinen","Label_Button_Clear":"Asia selvä","Label_Button_Filter":"Suodattaa","Label_Button_Search":"Hae","Label_NoSearchPerfomed":"Ole hyvä ja tee uusi haku"});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"is.i18n.yml.js":function module(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// i18n/core/is.i18n.yml.js                                                                                         //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
Package['universe:i18n'].i18n.addTranslations('is','',{"Header_Login_Login":"Logga in","Nav_DropDownItem_English":"Engelska","Nav_DropDownItem_Swedish":"Svenska","Nav_DropDownItem_Help":"Hjälp","Nav_DropDownItem_Chat":"Intercomt","Nav_DropDownItem_Logout":"Logga ut","Nav_DropDownItem_Profile":"Profil","Nav_DropDownItem_Orders":"Order","Header_Login_EnterHint":"Skriv användarnamn och lösenord","Link_Login_ForgotPassword":"Glömt ditt lösenord?","Link_Login_CreateAccount":"Skapa ett konto","Label_LoginForm_Email":"E-post","Label_LoginForm_EmailPlaceholder":"E-post","Label_LoginForm_EmailValidationError":"Ange en giltig e-postadress.","Label_LoginForm_Password":"Lösenord","Label_LoginForm_PasswordPlaceholder":"Ange ditt lösenord","Label_LoginForm_PasswordValidationError":"Lösenordet är för kort","Button_LoginForm_Login":"Logga in","Header_ForgotPassword_Password":"Glömt ditt lösenord","Header_ForgotPassword_EnterHint":"Fyll i din e-postadress för att få ett nytt lösenord per e-post","Header_ForgotPassword_Remember":"Kommer du ihåg ditt lösenord?","Link_ForgotPassword_Login":"Logga in","Label_ForgotPassword_Email":"E-postadress","Label_ForgotPassword_EmailPlaceholder":"Här anger du din e-postadress.","Label_ForgotPassword_EmailValidationError":"Ange en giltig e-postadress.","Button_ForgotPassword_Login":"Skicka ett nytt lösenord","Button_ForgotPassword_Save":"Skicka ett nytt lösenord","Header_SetPassword_Password":"Ange ett nytt lösenord","Header_SetPassword_EnterHint":"Ange ditt lösenord två gånger","Link_SetPassword_Cancel":"Avbryt","Label_SetPassword_Label":"Lösenord","Label_SetPassword_ConfirmLabel":"Bekräfta lösenord","Label_SetPassword_MinLengthValidationError":"Lösenordet är för kort (minst {$ MINLENGTH} tecken)","Label_SetPassword_MismatchValidationError":"Lösenordet matchar inte","Button_SetPassword_Save":"Spara","Email_SiteName_Text":"Gudrun","Email_From_Text":"Hello@Oss.se","Email_ResetPassword_Subject":"Återställ ditt lösenord","Label_List_Month":"Senaste 30 dagarna","Label_List_Old":"Äldre än 30 dagar","Label_List_Today":"I dag","Label_List_Week":"Senaste 7 dagarna","Label_List_Yesterday":"I går","Label_Chat_Placeholder_Send":"Meddelande","Label_Chat_Placeholder_Send_Label":"Nytt meddelande","Label_Ordercard_Meta":"Meta värden","Label_Ordercard_Persondata":"Personuppgifter","Label_Ordercard_Persondata_url":"Bild på personen","Label_Ordercard_Postaddress":"Postadress","Label_Ordercard_Roles":"Roller","Label_Ordercard_Relation":"Relation","Label_Ordercard_Notes":"Anteckningar","Label_Ordercard_Audit":"Granska","Entity_Label_Field_order_process_method":"Processmetod","Entity_Label_Field_order_type_name":"Ordertyp","Entity_Label_state_name":"Orderstatus","Entity_Label_state_description":"Orderstatus","Entity_Label_Orderid":"Order ID","Entity_Label_Title":"Titel","Entity_Label_Nid":"ID","Entity_Label_Created":"Skapad","Entity_Label_Changed":"Ändrats","Entity_Label_Field_pep":"Is PEP","Entity_Label_Field_current_ssn":"SSN","Entity_Label_Field_ssntype":"SSN Typ","Entity_Label_Field_Birth date":"Födelsedatum","Entity_Label_Field_postaladdress":"Postadress","Entity_Label_Field_postaladdress2":"Postadress 2","Entity_Label_Field_housenumber":"Hus nummer","Entity_Label_Field_postalcity":"Stad","Entity_Label_Field_zipcode":"Postnummer","Entity_Label_Field_firstname":"Förnamn","Entity_Label_Field_lastname":"Efternamn","Entity_Label_Field_name_type":"Namntyp","Entity_Label_Field_postalcountry":"Land","Entity_Label_Field_personid":"Person-ID (Classic)","Entity_Label_Field_person":"Personreferens (nid)","Entity_Label_Field_person_relation":"Personrelation","Entity_Label_Field_relation_description":"Beskrivning","Entity_Label_Field_period_value":"Startdatum","Entity_Label_Field_period_value2":"Slutdatum","Entity_Label_Field_country_of_jurisdiction":"Land jurisdiktion","Entity_Label_Field_is_active":"Är aktiv person","Entity_Label_Field_role_description":"Rollbeskrivning","Entity_Label_Field_organisation":"Organisation","Entity_Label_Field_organisation_number":"Organisationsnummer","Entity_Label_Field_notes":"Notera","Entity_Label_Field_detailed_role_categories":"Detaljkategori","Entity_Label_Field_gender":"Kön","Entity_Label_Field_whom":"Vem","Entity_Label_Field_what":"Vad","Entity_Label_Field_when":"När","Entity_Label_Field_url":"URL","Entity_Label_Field_pepcountryid":"PEP land ID","Entity_Label_Field_country_iso":"PEP land ISO-kod","Entity_Label_Field_pepcountry_name":"PEP land","Entity_Label_Tid":"PEP TID","Entity_Label_Description":"Beskrivning","Entity_Label_Field_image_url":"Bild URL","Entity_Label_Field_alternate_postaladdress":"Postadress (alternativ)","Entity_Label_Field_alternate_postaladdress2":"Postadress 2 (alternativ)","Entity_Label_Field_alternate_postalcity":"Stad (alternativ)","Entity_Label_Field_postaladdresssource":"Postadress källa","Entity_Label_Field_alternate_postaladdresssou":"Postadress källa (alternativ)","Entity_Label_Field_alternate_housenumber":"Husnummer (alternativ)","Entity_Label_Field_alternate_zipcode":"Postnummer (alternativ)","Entity_Label_Field_alternate_postalcountry":"Land (alternativ)","Entity_Label_Field_bornafter":"Född efter","Entity_Label_Field_source_of_update":"Uppdateringskälla","Entity_Label_Field_last_date_of_verification":"Senast kontrollerad","Entity_Label_Field_bornbefore":"Född före","Entity_Label_Field_cvrpersonid":"CVR Personid","Entity_Label_Field_probabledata":"Sannolika uppgifter","Entity_Label_Field_effective_date":"Giltighetsdatum","Entity_Label_Field_creator":"Skapad av","Entity_Label_Field_responsible":"Ansvarig","Entity_Label_Field_Gender_Female":"Kvinna","Entity_Label_Field_Gender_Male":"Man","Entity_Label_Field_rca":"Is RCA","Entity_Label_Field_order_nametype_1":"Tidigare namn","Entity_Label_Field_order_nametype_2":"Alternativ stavning","Entity_Label_Field_order_nametype_3":"Primärt namn","Entity_Label_Field_order_nametype_4":"Folder Posting Name","Entity_Label_Segment_Postaddress":"Adressuppgifter","Nav_DropDownItem_Persons":"Sök personen","Label_Button_Edit":"Redigera","Label_Button_Create":"Skapa","Label_Button_Save":"Spara","Label_Button_Delete":"Radera","Label_Button_Update":"Uppdatera","Label_Button_Cancel":"Avbryt","Label_Autoupdate":"Live uppdatering","Label_Button_Add":"Lägg till","Label_Button_Remove":"Avlägsna","Label_Ordercard_Personnames":"Namn","Label_Ordercard_Personssn":"SSN","Entity_Label_Field_description":"Om denna order","Label_Button_UpdateOrderState":"Uppdatera order status","Label_Button_CancelOrder":"Annullera order","Entity_Label_Field_deactivationdate":"Inaktiveringsdatum","Entity_Label_Field_is_deceased":"Avliden","Entity_Label_Field_deceased_date":"Avliden datum","Entity_Label_Field_name_type_remove_item":"Ta bort namnobjekt?","Entity_Label_Field_remove_item_text":"Vill du verkligen ta bort denna post?","Label_Ordercard_PersonSSN":"Person SSN nummer","Entity_Label_Field_ssn_remove_item":"Ta bort SSN objekt?","Entity_Label_Field_pepcountry":"PEP Land","Entity_Label_FieldCountryOfJurisdiction_Denmark":"Danmark","Entity_Label_FieldCountryOfJurisdiction_Sweden":"Sverige","Entity_Label_FieldCountryOfJurisdiction_Norway":"Norge","Entity_Label_FieldCountryOfJurisdiction_Finland":"Finland","Entity_Label_Field_is_active_role":"Är aktiv roll","Label_Button_NewRole":"Lägg till en ny roll","Label_Button_RemoveRole":"Radera","Entity_Label_Item_id":"Id","Entity_Label_Field_Role_remove_item":"Ta bort roll från order?","Label_Button_NewRelation":"Lägg till ny releation","Entity_Label_Field_Relation_remove_item":"Ta bort relation från order?","Label_Button_RemoveRelation":"Ta bort relation","Label_Ordercard_Relations":"Relation","Entity_Label_Field_relation":"Relationstyp","Entity_Label_Field_Category":"Rollkategori","Entity_Label_Role_description_type":"Rollbeskrivningstyp","Entity_Label_Search":"Sök","Label_Orders_Search":"Sök person eller order","Table_OrderList_Column_Name":"Order-id","Table_OrderList_Column_Status":"Status","Table_OrderList_Column_OrderType":"Typ","Table_OrderList_Column_ModifiedBy":"Ändrats","Entity_Label_Person_Card":"Personuppgifter","Entity_Label_Personid":"Person ID Classic","Label_OpenOrderListItem_Languages":"Välj språk","Label_Button_ChangeData":"Ändra uppgifter","Label_Ordercard_PersonOrders":"Order på personen","Label_Button_Create_Order":"Skapa order","Label_Person_Save_Order":"Vänligen ange en kommentar för orderen och tryck Spara","TIMEAGO_INIT_STRING":"För","Entity_Create_Order":"Skapa order","Table_searchpersonList_Column_ID":"ID","Table_searchpersonList_Column_FirstName":"Förnamn","Table_searchpersonList_Column_LastName":"Efternamn","Table_searchpersonList_Column_PEPRCA":"PEP / RCA","Table_searchpersonList_Column_Country":"Land","Table_searchpersonList_Column_Role":"Detaljerad roll","Table_searchpersonList_Column_Relation":"Relation","Table_searchpersonList_Column_Organisation":"Organisation","RelationshipWithPersonIs":"Till","Label_searchpersons_Search":"Ange värde och tryck enter","Label_PersonView":"Personvy","Label_RoleView":"Rollvy","RelationshipWithPersonIsDaughterInLaw":"Svärdotter till","RelationshipWithPersonIsSonInLaw":"Svärson till","RelationshipWithPersonIsDoughter":"Dotter till","RelationshipWithPersonIsSon":"Son till","RelationshipWithPersonIsMotherInLaw":"Svärmor till","RelationshipWithPersonIsFatherInLaw":"Svärfar till","RelationshipWithPersonIsMother":"Mor till","RelationshipWithPersonIsFather":"Fadern till","RelationshipWithPersonIsPartner":"Partner med","RelationshipWithPersonIsCoworker":"Medarbetare med","Table_SearchResultForString":"Resultat för Search","Table_SearchResultTimeLaps":"Sök i","Table_searchpersonList_Column_RoleDescription":"Rollbeskrivning","Table_searchpersonList_Column_MainRole":"Primär roll","Label_LoginForm_LdapError":"Ditt användarnamn eller lösenord är inte korrekt. Var god försök igen","Table_searchpersonList_Column_SSN":"Född","Label_ShowAllRoles":"Visa alla roller","Entity_Label_Version_Card":"Versioner","Table_searchpersonList_Column_Birth date":"Födelsedatum","Label_DistinctRoles":"Distinkt rollpresentation","Form_Current_RoleSearch":"Role söknyckel (taxonomi)","Form_NumberOfActivePersons":"Antal aktiva personer","Form_NumberOfNoneActivePersons":"Antal inaktiva personer","Form_NumberOfPersons":"Antal personer","Form_NumberOfActiveRoles":"Antal aktiva roller","Label_ResetSearch":"Ny sökning","Entity_Label_Field_SSN":"Svenskt personnummer","Entity_Label_field_names":"Namn","Label_Button_Create_NewPersonOrder":"Skapa ny person","Entity_Label_Field_personname":"Person","Entity_Label_field_type_label":"Person typ etikett","Entity_Label_field_personid":"PersonId (klassisk)","Entity_Label_GoTo_Person":"Go to person","Entity_Label_Field_is_active_relation":"Aktiv relation","Form_NumberOfTotalRoles":"Rader i tabellen","Form_NumberOfNoneActive":"Inaktiva rader","Label_variant_yy":"Å","Label_variant_mm":"M","Label_variant_dd":"D","Label_date_error":"Kontrollera datum","Label_Invalid_date":"Ogiltigt datum","Label_variant_hh":"TT","Label_variant_min":"MM","Label_Person_QueryNewOrder":"Vänligen bekräfta för att skapa en ny order","Label_Button_CreateNewOrder":"Skapa ny personorder","Label_Snackbar_DataSaved":"Data sparad","Label_Snackbar_Error":"Ett system-fel uppstod!","Nav_DropDownItem_NewOrder":"Ny order","Entity_Label_Field_countryofjurisdiction":"Land jurisdiktion","Entity_Label_Motherboard":"Motherboard","Label_Livestream":"Livestream","Label_Order_Entity":"Livestream Order","Label_Person_Entity":"Livestream Person","Label_Livestream_Last":"Senaste händelser","Label_PerformedBy":"Utfört av","Label_All_Livestream":"Senaste","Label_Ordercard_CurrentOrders":"Order","Label_Ordercard_Subheader":"Nuvarande order","Label_MothercheckPerformed":"Mothercheck utfört","Label_Motherchecks":"Övervakning nyckelvärden i Gudrun plattform","Label_Motherchecks_sublabel":"Mothercheck listan","Label_mothercheck_details":"Mothercheck Detaljer","Label_Mothercheck_info":"Mothercheck info","Label_Button_OK":"OK","Entity_Label_Field_current_ssn_error":"Organisationsnummer är fel","Label_Search_Toolbar":"PersonID","Label_MessageCheck":"Meddelanden","Label_MessageCheck_sublabel":"Valideringsstatus lista","Label_messagePerformed":"Utförda kontroller","Validate_mandatory_field":"Obligatoriskt fält","Validate_mandatory_field_objective":"Detta fält måste fyllas i","Validate_mandatory_field_resolution":"Fyll i fältet","Label_Snackbar_ValidationOrderError":"Valideringsfel i Order","Label_Snackbar_OrderProcessed":"Ordern har bearbetats","Validate_Birth date_ok_title":"Födelsedatum fält ok","Validate_Birth date_error_title":"Födelsedatum har ett fel","Validate_gender_ok_title":"Kön fält OK","Validate_gender_error_title":"Kön felt har ett fel","Validate_name_error_title":"Minst ett namn måste var ifylld i ordern","Validate_name_ok_title":"Namnkontroll ok","Label_Person_RestoreThisOrder":"Återställ senaste set av förändringar","Label_Button_RestoreOrder":"Återställ","Entity_Restore_Order":"Återställ order","Entity_Process_Order":"Behandla order","Label_message_details":"Beskrivning","Validate_pepcountry_ok_title":"PEP-land check ok","Validate_pepcountry_error_title":"Minst ett PEP-land måste väljas","Validate_SSN_ok_title":"SSN OK","Validate_SSN_error_title":"SSN saknas","Label_Card_Role":"Roll","Label_Card_Relation":"Relation","Label_Card_Core":"Core","Label_Card_SSN":"SSN","Label_Card_Address":"Adress","Label_Card_URI":"Uri","Label_Card_Name":"Namn","Label_Card_Order":"Order","Validate_nametype_primary_objective":"En order måste ha ett primärt namn","Nav_DropDownItem_Orderdashboard":"Order instrumentpanelen","Entity_Label_SearchPerson":"Sök person","Entity_Label_SearchPerson_Firstname":"Förnamn","Entity_Label_SearchPerson_Lastname":"Efternamn","Entity_Label_SearchPerson_SSNNumber":"Svenskt personnummer","Entity_Label_SearchPerson_Birth date":"Födelsedatum","Entity_Label_SearchPerson_Year":"År","Entity_Label_SearchPerson_Month":"Månad","Entity_Label_SearchPerson_Day":"Dag","Entity_Label_NameValues":"Namn","Entity_Label_SearchDates":"Datum","Entity_Label_PEPRCA":"Definiera PEP och / eller RCA","Entity_Label_Button_Find":"Sök","Entity_Label_SelectListCountries":"Listland","Entity_List_Link":"Person","Entity_List_SSN":"Svenskt personnummer","Entity_List_FirstName":"Förnamn","Entity_List_LastName":"Efternamn","Entity_List_Gender":"Kön","Entity_List_PEP":"PEP","Entity_List_RCA":"RCA","Entity_List_Details":"Visa mer","Entity_Label_Mandatory":"Obligatoriskt fält","Entity_Label_Button_Back":"Tillbaka","Entity_Label_Button_Close":"Stäng","Entity_List_Birth date":"Födelsedatum","Entity_List_NameType":"Namntyp","Entity_List_Role":"Roll","Entity_List_RoleCategory":"Rollkategori","Entity_List_RoleCategoryDetails":"Detaljkategori","Entity_List_FromDate":"Startdatum","Entity_List_ThroughDate":"Slutdatum","Entity_List_Active":"Rollstatus","Entity_List_Type":"Namntyp","Entity_List_Name":"Namn","Entity_List_Description":"Beskrivning","Entity_List_CountryOfJurisdiction":"Jurisdiktion","Label_Snackbar_NoData":"Ingen person matchar din förfrågan","Entity_Label_FieldCountryListSimple_All":"Alla länder","Entity_List_SearchBySSN":"Personnummerträff","Entity_Details":"Detaljer","Entity_Names":"Namn","Entity_Roles":"Roller","Entity_Relations":"Relationer","Entity_Label_AddCompanyUser":"Lägg till användare","Entity_Label_AddUser_Email2":"Ange e-post igen","Entity_Label_AddUser_Email":"E-post","Entity_Label_AddUser_Name":"Namn","Entity_UsersList_InactiveMembersTitle":"Inaktiva medlemmar","Entity_UsersList_MembersTitle":"Medlemmar","Entity_UsersList_AdminsTitle":"Admins","Entity_UsersList_Deactivate":"Inaktivera","Entity_UsersList_Activate":"Aktivera","Entity_UsersList_Name":"Namn","Entity_UsersList_Email":"E-post","Entity_UsersList_Dialog_Activate":"Aktivera användare?","Entity_UsersList_Dialog_Deactivate":"Inaktivera användare?","Entity_UsersList_Dialog_Cancel":"Avbryt","Entity_UsersList_Dialog_Confirm":"Bekräfta","Entity_Validation_MandatoryField":"Fyll i alla obligatoriska fält","Entity_Validation_MatchErrorField":"Värdena matchar inte för {$ fält}","Entity_UsersList_Active":"Status","Entity_UserList_Pic":"Profil","Nav_DropDownItem_AdminCompanyPersons":"Hantera användare","Entity_List_Avatar":"#","Nav_DropDownItem_Finnish":"Finska","Nav_DropDownItem_Danish":"Danska","Nav_DropDownItem_Norweigan":"Norska","Label_ordersbystate_sublabel":"Beställningar av staten","Entity_Delete_Relation":"Ta bort denna relation","Entity_Delete_Role":"Ta bort denna roll","Label_Person_Delete_Orde":"Bekräfta för att radera posten","Label_Button_ConfirmDelete":"Delete order","Nav_DropDownItem_Icleandic":"Island","Entity_Label_Field_ContactUs_Title":"Kontakta oss","Entity_Label_Field_ContactUs_Name":"Namn","Entity_Label_Field_ContactUs_Email":"E-postadress","Entity_Label_Field_ContactUs_Email2":"Upprepa e-post","Entity_Label_Field_ContactUs_Phone":"Telefon","Entity_Label_Field_ContactUs_Content":"Meddelande","Entity_Label_Button_ContactUs_Submit":"Skicka","Entity_Label_Button_ContactUs_Cancel":"Avbryt","Entity_Label_Field_ContactUs_Waltercheck":"Svara på frågan","Entity_Validation_MandatoryField_Name":"Namn","Entity_Validation_MandatoryField_Email":"E-post","Entity_Validation_MandatoryField_Message":"Meddelande","Nav_DropDownItem_About":"Om Oss","Entity_FileareaList_AdminsTitle":"Filarea","Entity_FileareaList_Download":"Ladda ner","Entity_FileareaList_Name":"Filnamn","Nav_DropDownItem_Filearea":"Filarea","Entity_Label_Field_ContactUs_Success":"Tack för ditt meddelande. Vi återkommer så snart som möjligt!","Entity_Label_Field_ContactUs_Fail":"Meddelandet kunde inte skickas. Vänligen skicka ett mail till support@Oss.se istället, så lovar vi att återkomma så snart som möjligt.","Entity_Label_Download_Success":"Filöverföring påbörjades","Label_LoginForm_GoHome":"Tillbaka till huvudsidan","Nav_DropDownItem_Login":"Logga in","Label_Content_Help":"Hjälp med sök","Entity_Details_Address":"Adress","Entity_List_Address":"Gatuadress","Entity_List_Address2":"","Entity_List_HouseNumber":"Husnummer","Entity_List_PostalCity":"Stad","Entity_List_ZipCode":"Postnummer","Entity_List_PostalCountry":"Land","Label_Person_Delete_Order":"Delete order","Entity_List_RelationType":"Relationstyp","Entity_List_RelationDescription":"Relationsbeskrivning","Entity_List_BirthDate":"Födelsedatum","Label_EntityIsUpdated":"Senast ändrad","Entity_OssID":"Oss Id","Label_RoleIsActive":"Aktiv","Label_RoleIsInActive":"Inaktiv","Label_Button_Clear":"Rensa","Label_Button_Filter":"Filtrera","Label_Button_Search":"Sök","Label_NoSearchPerfomed":"Inget resultat vid sökning."});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"no.i18n.yml.js":function module(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// i18n/core/no.i18n.yml.js                                                                                         //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
Package['universe:i18n'].i18n.addTranslations('no','',{"Header_Login_Login":"Logg Inn","Nav_DropDownItem_English":"Engelsk","Nav_DropDownItem_Swedish":"Svensk","Nav_DropDownItem_Help":"Hjelp","Nav_DropDownItem_Chat":"Intercom","Nav_DropDownItem_Logout":"Logg ut","Nav_DropDownItem_Profile":"Profil","Nav_DropDownItem_Orders":"Bestillinger","Header_Login_EnterHint":"Skriv inn brukernavn og passord","Link_Login_ForgotPassword":"Glemt passord?","Link_Login_CreateAccount":"Opprett en konto","Label_LoginForm_Email":"E-post","Label_LoginForm_EmailPlaceholder":"E-post","Label_LoginForm_EmailValidationError":"Oppgi en gyldig e-post-adresse.","Label_LoginForm_Password":"Passord","Label_LoginForm_PasswordPlaceholder":"Skriv inn passordet ditt","Label_LoginForm_PasswordValidationError":"Passordet er for kort","Button_LoginForm_Login":"Logg Inn","Header_ForgotPassword_Password":"Glemt passord","Header_ForgotPassword_EnterHint":"Skriv inn din e-postadresse og et nytt passord vil bli sendt til deg.","Header_ForgotPassword_Remember":"Husker du passordet ditt?","Link_ForgotPassword_Login":"Logg Inn","Label_ForgotPassword_Email":"Epostadresse","Label_ForgotPassword_EmailPlaceholder":"Her legger du inn din e-postadresse.","Label_ForgotPassword_EmailValidationError":"Vennligst skriv inn en gyldig e-post adresse.","Button_ForgotPassword_Login":"Send nytt passord","Button_ForgotPassword_Save":"Send nytt passord","Header_SetPassword_Password":"Skriv inn et nytt passord","Header_SetPassword_EnterHint":"Skriv inn passordet ditt to ganger","Link_SetPassword_Cancel":"Avbryt","Label_SetPassword_Label":"Passord","Label_SetPassword_ConfirmLabel":"Bekreft passord","Label_SetPassword_MinLengthValidationError":"Passordet er for kort (minimum {$ MINLENGTH} tegn)","Label_SetPassword_MismatchValidationError":"Passordet stemmer ikke","Button_SetPassword_Save":"Lagre","Email_SiteName_Text":"Gudrun","Email_From_Text":"Hello@Oss.se","Email_ResetPassword_Subject":"Tilbakestille passordet ditt","Label_List_Month":"Siste 30 dager","Label_List_Old":"Eldre enn 30 dager","Label_List_Today":"I dag","Label_List_Week":"Siste 7 dager","Label_List_Yesterday":"I går","Label_Chat_Placeholder_Send":"Budskap","Label_Chat_Placeholder_Send_Label":"Ny melding","Label_Ordercard_Meta":"Meta verdier","Label_Ordercard_Persondata":"Person data","Label_Ordercard_Persondata_url":"Bilde på person","Label_Ordercard_Postaddress":"Postadresse","Label_Ordercard_Roles":"Roller","Label_Ordercard_Relation":"Relasjon","Label_Ordercard_Notes":"Merknader","Label_Ordercard_Audit":"Revidere","Entity_Label_Field_order_process_method":"Prosess metode","Entity_Label_Field_order_type_name":"Ordretype","Entity_Label_state_name":"Ordre status","Entity_Label_state_description":"Ordre status","Entity_Label_Orderid":"Bestillings ID","Entity_Label_Title":"Titel","Entity_Label_Nid":"ID","Entity_Label_Created":"Laget","Entity_Label_Changed":"Endret","Entity_Label_Field_pep":"Is PEP","Entity_Label_Field_current_ssn":"SSN","Entity_Label_Field_ssntype":"SSN Type","Entity_Label_Field_Birth date":"Bursdag","Entity_Label_Field_postaladdress":"Postadresse","Entity_Label_Field_postaladdress2":"Postadresse 2","Entity_Label_Field_housenumber":"Husnummer","Entity_Label_Field_postalcity":"Postal byen","Entity_Label_Field_zipcode":"Post kode","Entity_Label_Field_firstname":"Fornavn","Entity_Label_Field_lastname":"Etternavn","Entity_Label_Field_name_type":"Navn Type","Entity_Label_Field_postalcountry":"Postal Land","Entity_Label_Field_personid":"Person ID (Classic)","Entity_Label_Field_person":"Person Referanse (nid)","Entity_Label_Field_person_relation":"Person forholdet","Entity_Label_Field_relation_description":"Beskrivelse","Entity_Label_Field_period_value":"Startdato","Entity_Label_Field_period_value2":"Gjennom Dato","Entity_Label_Field_country_of_jurisdiction":"Land jurisdiksjon","Entity_Label_Field_is_active":"Er aktiv person","Entity_Label_Field_role_description":"Rollebeskrivelsen","Entity_Label_Field_organisation":"Organisasjon","Entity_Label_Field_organisation_number":"Organisasjonsnummer","Entity_Label_Field_notes":"Merk","Entity_Label_Field_detailed_role_categories":"Detaljert kategori","Entity_Label_Field_gender":"Kjønn","Entity_Label_Field_whom":"Hvem","Entity_Label_Field_what":"Hva","Entity_Label_Field_when":"Når","Entity_Label_Field_url":"URL","Entity_Label_Field_pepcountryid":"PEP landet ID","Entity_Label_Field_country_iso":"PEP landet iso-kode","Entity_Label_Field_pepcountry_name":"PEP landet","Entity_Label_Tid":"PEP TID","Entity_Label_Description":"Beskrivelse","Entity_Label_Field_image_url":"Bilde URL","Entity_Label_Field_alternate_postaladdress":"Postadresse (alternative)","Entity_Label_Field_alternate_postaladdress2":"Postadresse 2 (alternativt)","Entity_Label_Field_alternate_postalcity":"Postal City (varamedlem)","Entity_Label_Field_postaladdresssource":"Postadresse kilde","Entity_Label_Field_alternate_postaladdresssou":"Postadresse kilde (alternative)","Entity_Label_Field_alternate_housenumber":"Husnummer (varamedlem)","Entity_Label_Field_alternate_zipcode":"Postnummer (alternative)","Entity_Label_Field_alternate_postalcountry":"Postal landet (varamedlem)","Entity_Label_Field_bornafter":"Født etter","Entity_Label_Field_source_of_update":"Kilde oppdatering","Entity_Label_Field_last_date_of_verification":"Siste dato for verifisering","Entity_Label_Field_bornbefore":"Født før","Entity_Label_Field_cvrpersonid":"CVR personId","Entity_Label_Field_probabledata":"Sann~~POS=TRUNC synlige~~POS=HEADCOMP data","Entity_Label_Field_effective_date":"Effektiv dato","Entity_Label_Field_creator":"Laget av","Entity_Label_Field_responsible":"Ansvarlig","Entity_Label_Field_Gender_Female":"Hunn","Entity_Label_Field_Gender_Male":"Mann","Entity_Label_Field_rca":"Is RCA","Entity_Label_Field_order_nametype_1":"Forrige navn","Entity_Label_Field_order_nametype_2":"Alternativ stavemåte","Entity_Label_Field_order_nametype_3":"Primær Name","Entity_Label_Field_order_nametype_4":"Folder Posting Navn","Entity_Label_Segment_Postaddress":"Adresse~~POS=TRUNC","Nav_DropDownItem_Persons":"Søk person","Label_Button_Edit":"Redigere","Label_Button_Create":"Skape","Label_Button_Save":"Lagre","Label_Button_Delete":"Slett","Label_Button_Update":"Oppdater","Label_Button_Cancel":"Avbryt","Label_Autoupdate":"Live oppdatering","Label_Button_Add":"Legg til","Label_Button_Remove":"Ta bort","Label_Ordercard_Personnames":"Navnene","Label_Ordercard_Personssn":"SSN","Entity_Label_Field_description":"Om denne rekkefølgen","Label_Button_UpdateOrderState":"Oppdatering for staten","Label_Button_CancelOrder":"Avbryt ordre","Entity_Label_Field_deactivationdate":"Deaktivering dato","Entity_Label_Field_is_deceased":"Avdød","Entity_Label_Field_deceased_date":"Avdøde dato","Entity_Label_Field_name_type_remove_item":"Fjern navn element?","Entity_Label_Field_remove_item_text":"Har du virkelig ønsker å fjerne dette?","Label_Ordercard_PersonSSN":"Person SSN tall","Entity_Label_Field_ssn_remove_item":"Fjern SSN element?","Entity_Label_Field_pepcountry":"PEP Land","Entity_Label_FieldCountryOfJurisdiction_Denmark":"Danmark","Entity_Label_FieldCountryOfJurisdiction_Sweden":"Sverige","Entity_Label_FieldCountryOfJurisdiction_Norway":"Norge","Entity_Label_FieldCountryOfJurisdiction_Finland":"Finland","Entity_Label_Field_is_active_role":"Er aktiv rolle","Label_Button_NewRole":"Legg til en ny rolle","Label_Button_RemoveRole":"Slett","Entity_Label_Item_id":"Id","Entity_Label_Field_Role_remove_item":"Fjern rolle fra bestilling?","Label_Button_NewRelation":"Legg til ny releation","Entity_Label_Field_Relation_remove_item":"Fjern forhold fra bestilling?","Label_Button_RemoveRelation":"Fjern forhold","Label_Ordercard_Relations":"Forhold","Entity_Label_Field_relation":"Forholdet Type","Entity_Label_Field_Category":"Rolle kategori","Entity_Label_Role_description_type":"Rollebeskrivelsen typen","Entity_Label_Search":"Søke","Label_Orders_Search":"Søk person eller ordre","Table_OrderList_Column_Name":"Bestillings ID","Table_OrderList_Column_Status":"Status","Table_OrderList_Column_OrderType":"Type","Table_OrderList_Column_ModifiedBy":"Endret","Entity_Label_Person_Card":"Person data","Entity_Label_Personid":"Person ID Classic","Label_OpenOrderListItem_Languages":"Velg språk","Label_Button_ChangeData":"Endre data","Label_Ordercard_PersonOrders":"For at person","Label_Button_Create_Order":"Skape orden","Label_Person_Save_Order":"Plese skriv en kommentar til ordren og trykk på Lagre","TIMEAGO_INIT_STRING":"Til","Entity_Create_Order":"Opprett ordre","Table_searchpersonList_Column_ID":"ID","Table_searchpersonList_Column_FirstName":"Fornavn","Table_searchpersonList_Column_LastName":"Etternavn","Table_searchpersonList_Column_PEPRCA":"PEP / RCA","Table_searchpersonList_Column_Country":"Land","Table_searchpersonList_Column_Role":"Detaljert rolle","Table_searchpersonList_Column_Relation":"Relasjon","Table_searchpersonList_Column_Organisation":"Organisasjon","RelationshipWithPersonIs":"Til","Label_searchpersons_Search":"Skriv inn verdien og trykk enter","Label_PersonView":"Perspektiv","Label_RoleView":"Rolle utsikt","RelationshipWithPersonIsDaughterInLaw":"Datter svigersønn til","RelationshipWithPersonIsSonInLaw":"Son-in-law å","RelationshipWithPersonIsDoughter":"Datter til","RelationshipWithPersonIsSon":"Sønnen til","RelationshipWithPersonIsMotherInLaw":"Mor-i-lov til","RelationshipWithPersonIsFatherInLaw":"Far svigersønn til","RelationshipWithPersonIsMother":"Mor til","RelationshipWithPersonIsFather":"Far til","RelationshipWithPersonIsPartner":"Partner med","RelationshipWithPersonIsCoworker":"Medarbeider med","Table_SearchResultForString":"Resultat for search","Table_SearchResultTimeLaps":"Søkte i","Table_searchpersonList_Column_RoleDescription":"Rollebeskrivelsen","Table_searchpersonList_Column_MainRole":"Hovedrolle","Label_LoginForm_LdapError":"Din brukerid eller passord er ikke riktig. Vær så snill, prøv på nytt","Table_searchpersonList_Column_SSN":"Født","Label_ShowAllRoles":"Vis alle roller","Entity_Label_Version_Card":"Versjoner","Table_searchpersonList_Column_Birth date":"Bursdag","Label_DistinctRoles":"Tydelig rolle prese","Form_Current_RoleSearch":"Rolle søketasten (taksonomi)","Form_NumberOfActivePersons":"Antall aktive personer","Form_NumberOfNoneActivePersons":"Antall inaktive personer","Form_NumberOfPersons":"Antall personer","Form_NumberOfActiveRoles":"Antall aktive roller","Label_ResetSearch":"Nytt søk","Entity_Label_Field_SSN":"Personnummer","Entity_Label_field_names":"Navnene","Label_Button_Create_NewPersonOrder":"Opprett ny person","Entity_Label_Field_personname":"Person","Entity_Label_field_type_label":"Person merkelapp","Entity_Label_field_personid":"PersonId (klassisk)","Entity_Label_GoTo_Person":"Go to person","Entity_Label_Field_is_active_relation":"Aktiv forhold","Form_NumberOfTotalRoles":"Rader i tabellen","Form_NumberOfNoneActive":"Ingen aktive rader","Label_variant_yy":"Y","Label_variant_mm":"M","Label_variant_dd":"D","Label_date_error":"Sjekk dato","Label_Invalid_date":"Ugyldig dato","Label_variant_hh":"HH","Label_variant_min":"MM","Label_Person_QueryNewOrder":"Bekreft for å opprette en ny ordre","Label_Button_CreateNewOrder":"Opprett ny Person ordre","Label_Snackbar_DataSaved":"Dataene lagres","Label_Snackbar_Error":"En systemfeil har oppstått!","Nav_DropDownItem_NewOrder":"Ny bestilling","Entity_Label_Field_countryofjurisdiction":"Land jurisdiksjon","Entity_Label_Motherboard":"Hovedkort","Label_Livestream":"Direktestrømming","Label_Order_Entity":"Livestream Bestill","Label_Person_Entity":"Livestream person","Label_Livestream_Last":"Siste hendelser","Label_PerformedBy":"Fremført av","Label_All_Livestream":"Senest","Label_Ordercard_CurrentOrders":"Bestillinger","Label_Ordercard_Subheader":"Nåværende bestillinger","Label_MothercheckPerformed":"Mor sjekk utført","Label_Motherchecks":"Overvåking sentrale verdier i Gudrun-plattformen","Label_Motherchecks_sublabel":"Mothercheck liste","Label_mothercheck_details":"Mothercheck Detaljer","Label_Mothercheck_info":"Mothercheck info","Label_Button_OK":"OK","Entity_Label_Field_current_ssn_error":"Organisasjonsnummer er feil","Label_Search_Toolbar":"PersonId","Label_MessageCheck":"Meldinger","Label_MessageCheck_sublabel":"Validering statusliste","Label_messagePerformed":"Utførte kontroller","Validate_mandatory_field":"Obligatoriske felt","Validate_mandatory_field_objective":"Dette feltet må fylles ut","Validate_mandatory_field_resolution":"Fyll ut feltet","Label_Snackbar_ValidationOrderError":"Valideringsfeil i rekkefølge","Label_Snackbar_OrderProcessed":"Rekkefølgen er bearbeidet","Validate_Birth date_ok_title":"Fødselsdato feltet ok","Validate_Birth date_error_title":"Fødselsdato har en feil","Validate_gender_ok_title":"Kjønn feltet ok","Validate_gender_error_title":"Kjønn har en feil","Validate_name_error_title":"Minst ett navn må være til stede for","Validate_name_ok_title":"Navn sjekk ok","Label_Person_RestoreThisOrder":"Gjenopprett siste sett med endringer","Label_Button_RestoreOrder":"Restaurere","Entity_Restore_Order":"Gjenopprette orden","Entity_Process_Order":"Prosess~~POS=TRUNC orden","Label_message_details":"Beskrivelse","Validate_pepcountry_ok_title":"PEP landet sjekk ok","Validate_pepcountry_error_title":"Minst en PEP landet må velges","Validate_SSN_ok_title":"SSN ok","Validate_SSN_error_title":"SSN mangler","Label_Card_Role":"Rolle","Label_Card_Relation":"Relasjon","Label_Card_Core":"Kjerne","Label_Card_SSN":"SSN","Label_Card_Address":"Adresse","Label_Card_URI":"Uri","Label_Card_Name":"Navn","Label_Card_Order":"Rekkefølge","Validate_nametype_primary_objective":"En ordre måste ha Ett Primärt namn","Nav_DropDownItem_Orderdashboard":"For dashbordet","Entity_Label_SearchPerson":"Søk person","Entity_Label_SearchPerson_Firstname":"Fornavn","Entity_Label_SearchPerson_Lastname":"Etternavn","Entity_Label_SearchPerson_SSNNumber":"Svenske SSN","Entity_Label_SearchPerson_Birth date":"Bursdag","Entity_Label_SearchPerson_Year":"År","Entity_Label_SearchPerson_Month":"Måned","Entity_Label_SearchPerson_Day":"Dag","Entity_Label_NameValues":"Navnene","Entity_Label_SearchDates":"Datoer","Entity_Label_PEPRCA":"Definer PEP og / eller RCA","Entity_Label_Button_Find":"Søke","Entity_Label_SelectListCountries":"Velg liste land","Entity_List_Link":"Person","Entity_List_SSN":"Personnummer","Entity_List_FirstName":"Fornavn","Entity_List_LastName":"Etternavn","Entity_List_Gender":"Kjønn","Entity_List_PEP":"PEP","Entity_List_RCA":"RCA","Entity_List_Details":"Vis mer","Entity_Label_Mandatory":"Obligatoriske felt","Entity_Label_Button_Back":"Tilbake","Entity_Label_Button_Close":"Lukk","Entity_List_Birth date":"Bursdag","Entity_List_NameType":"Navn Type","Entity_List_Role":"Rolle","Entity_List_RoleCategory":"Rolle kategori","Entity_List_RoleCategoryDetails":"Detaljert kategori","Entity_List_FromDate":"Startdato","Entity_List_ThroughDate":"Gjennom Dato","Entity_List_Active":"Rolle status","Entity_List_Type":"Navn Type","Entity_List_Name":"Navn","Entity_List_Description":"Beskrivelse","Entity_List_CountryOfJurisdiction":"Land jurisdiksjon","Label_Snackbar_NoData":"Ingen person samsvarer med søket","Entity_Label_FieldCountryListSimple_All":"Alle land","Entity_List_SearchBySSN":"SSN kamp","Entity_Details":"Detaljer","Entity_Names":"Navnene","Entity_Roles":"Roller","Entity_Relations":"Relasjoner","Entity_Label_AddCompanyUser":"Legg til bruker","Entity_Label_AddUser_Email2":"Skriv inn e-post på nytt","Entity_Label_AddUser_Email":"E-post","Entity_Label_AddUser_Name":"Navn","Entity_UsersList_InactiveMembersTitle":"Inaktive medlemmer","Entity_UsersList_MembersTitle":"Medlemmer","Entity_UsersList_AdminsTitle":"Admins","Entity_UsersList_Deactivate":"Deaktiver","Entity_UsersList_Activate":"Aktiver","Entity_UsersList_Name":"Navn","Entity_UsersList_Email":"E-post","Entity_UsersList_Dialog_Activate":"Aktiver bruker?","Entity_UsersList_Dialog_Deactivate":"Deaktiver bruker?","Entity_UsersList_Dialog_Cancel":"Avbryt","Entity_UsersList_Dialog_Confirm":"Bekrefte","Entity_Validation_MandatoryField":"Fyll inn et obligatorisk felt","Entity_Validation_MatchErrorField":"Verdier tilsvarer ikke for {$ feltet}","Entity_UsersList_Active":"Status","Entity_UserList_Pic":"Profil","Nav_DropDownItem_AdminCompanyPersons":"Administrer forretningskontoer","Entity_List_Avatar":"#","Nav_DropDownItem_Finnish":"Finsk","Nav_DropDownItem_Danish":"Dansk","Nav_DropDownItem_Norweigan":"Norweigan","Label_ordersbystate_sublabel":"Bestillinger av staten","Entity_Delete_Relation":"Slett relasjon","Entity_Delete_Role":"Slett denne rollen","Label_Person_Delete_Orde":"Bekreft for å slette elementet","Label_Button_ConfirmDelete":"Slett ordre","Nav_DropDownItem_Icleandic":"Island","Entity_Label_Field_ContactUs_Title":"Kontakt oss","Entity_Label_Field_ContactUs_Name":"Navn","Entity_Label_Field_ContactUs_Email":"Epost adresse","Entity_Label_Field_ContactUs_Email2":"Gjenta e-post adresse","Entity_Label_Field_ContactUs_Phone":"Telefon","Entity_Label_Field_ContactUs_Content":"Budskap","Entity_Label_Button_ContactUs_Submit":"Sende","Entity_Label_Button_ContactUs_Cancel":"Avbryt","Entity_Label_Field_ContactUs_Waltercheck":"Svar på spørsmålet","Entity_Validation_MandatoryField_Name":"Navn","Entity_Validation_MandatoryField_Email":"E-post","Entity_Validation_MandatoryField_Message":"Budskap","Nav_DropDownItem_About":"Om Oss","Entity_FileareaList_AdminsTitle":"Filområdet","Entity_FileareaList_Download":"Nedlasting","Entity_FileareaList_Name":"Filnavn","Nav_DropDownItem_Filearea":"Filområdet","Entity_Label_Field_ContactUs_Success":"Din melding har blitt sendt. Takk skal du ha.","Entity_Label_Field_ContactUs_Fail":"Problem sender meldingen. Prøv igjen senere.","Entity_Label_Download_Success":"Filoverføring startet","Label_LoginForm_GoHome":"Tilbake til hovedsiden","Nav_DropDownItem_Login":"Logg Inn","Label_Content_Help":"Hjelp med søk?","Entity_Details_Address":"Adresse","Entity_List_Address":"Gateadresse","Entity_List_Address2":"Gateadresse ekstra","Entity_List_HouseNumber":"Husnummer","Entity_List_PostalCity":"By","Entity_List_ZipCode":"Post kode","Entity_List_PostalCountry":"Land","Label_Person_Delete_Order":"Slett ordre","Entity_List_RelationType":"Forhold typen","Entity_List_RelationDescription":"Forhold beskrivelse","Entity_List_BirthDate":"Bursdag","Label_EntityIsUpdated":"Sist endret","Entity_OssID":"Oss ID","Label_RoleIsActive":"Aktiv","Label_RoleIsInActive":"Uvirksom","Label_Button_Clear":"Klar","Label_Button_Filter":"Filter","Label_Button_Search":"Søke","Label_NoSearchPerfomed":"Vennligst gjør et nytt søk"});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"sv.i18n.yml.js":function module(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// i18n/core/sv.i18n.yml.js                                                                                         //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
Package['universe:i18n'].i18n.addTranslations('sv','',{"Header_Login_Login":"Logga in","Nav_DropDownItem_English":"Engelska","Nav_DropDownItem_Swedish":"Svenska","Nav_DropDownItem_Help":"Hjälp","Nav_DropDownItem_Chat":"Intercomt","Nav_DropDownItem_Logout":"Logga ut","Nav_DropDownItem_Profile":"Profil","Nav_DropDownItem_Orders":"Order","Header_Login_EnterHint":"Skriv användarnamn och lösenord","Link_Login_ForgotPassword":"Glömt ditt lösenord?","Link_Login_CreateAccount":"Skapa ett konto","Label_LoginForm_Email":"E-post","Label_LoginForm_EmailPlaceholder":"E-post","Label_LoginForm_EmailValidationError":"Ange en giltig e-postadress.","Label_LoginForm_Password":"Lösenord","Label_LoginForm_PasswordPlaceholder":"Ange ditt lösenord","Label_LoginForm_PasswordValidationError":"Lösenordet är för kort","Button_LoginForm_Login":"Logga in","Header_ForgotPassword_Password":"Glömt ditt lösenord","Header_ForgotPassword_EnterHint":"Fyll i din e-postadress för att få ett nytt lösenord per e-post","Header_ForgotPassword_Remember":"Kommer du ihåg ditt lösenord?","Link_ForgotPassword_Login":"Logga in","Label_ForgotPassword_Email":"E-postadress","Label_ForgotPassword_EmailPlaceholder":"Här anger du din e-postadress.","Label_ForgotPassword_EmailValidationError":"Ange en giltig e-postadress.","Button_ForgotPassword_Login":"Skicka ett nytt lösenord","Button_ForgotPassword_Save":"Skicka ett nytt lösenord","Header_SetPassword_Password":"Ange ett nytt lösenord","Header_SetPassword_EnterHint":"Ange ditt lösenord två gånger","Link_SetPassword_Cancel":"Avbryt","Label_SetPassword_Label":"Lösenord","Label_SetPassword_ConfirmLabel":"Bekräfta lösenord","Label_SetPassword_MinLengthValidationError":"Lösenordet är för kort (minst {$MINLENGTH} tecken)","Label_SetPassword_MismatchValidationError":"Lösenordet matchar inte","Button_SetPassword_Save":"Spara","Email_SiteName_Text":"Gudrun","Email_From_Text":"Hello@Oss.se","Email_ResetPassword_Subject":"Återställ ditt lösenord","Label_List_Month":"Senaste 30 dagarna","Label_List_Old":"Äldre än 30 dagar","Label_List_Today":"I dag","Label_List_Week":"Senaste 7 dagarna","Label_List_Yesterday":"I går","Label_Chat_Placeholder_Send":"Meddelande","Label_Chat_Placeholder_Send_Label":"Nytt meddelande","Label_Ordercard_Meta":"Meta värden","Label_Ordercard_Persondata":"Personuppgifter","Label_Ordercard_Persondata_url":"Bild på personen","Label_Ordercard_Postaddress":"Postadress","Label_Ordercard_Roles":"Roller","Label_Ordercard_Relation":"Relation","Label_Ordercard_Notes":"Anteckningar","Label_Ordercard_Audit":"Granska","Entity_Label_Field_order_process_method":"Processmetod","Entity_Label_Field_order_type_name":"Ordertyp","Entity_Label_state_name":"Orderstatus","Entity_Label_state_description":"Orderstatus","Entity_Label_Orderid":"Order ID","Entity_Label_Title":"Titel","Entity_Label_Nid":"ID","Entity_Label_Created":"Skapad","Entity_Label_Changed":"Ändrats","Entity_Label_Field_pep":"Is PEP","Entity_Label_Field_current_ssn":"SSN","Entity_Label_Field_ssntype":"SSN Typ","Entity_Label_Field_Birth date":"Födelsedatum","Entity_Label_Field_postaladdress":"Postadress","Entity_Label_Field_postaladdress2":"Postadress 2","Entity_Label_Field_housenumber":"Hus nummer","Entity_Label_Field_postalcity":"Stad","Entity_Label_Field_zipcode":"Postnummer","Entity_Label_Field_firstname":"Förnamn","Entity_Label_Field_lastname":"Efternamn","Entity_Label_Field_name_type":"Namntyp","Entity_Label_Field_postalcountry":"Land","Entity_Label_Field_personid":"Person-ID (Classic)","Entity_Label_Field_person":"Personreferens (nid)","Entity_Label_Field_person_relation":"Personrelation","Entity_Label_Field_relation_description":"Beskrivning","Entity_Label_Field_period_value":"Startdatum","Entity_Label_Field_period_value2":"Slutdatum","Entity_Label_Field_country_of_jurisdiction":"Land jurisdiktion","Entity_Label_Field_is_active":"Är aktiv person","Entity_Label_Field_role_description":"Rollbeskrivning","Entity_Label_Field_organisation":"Organisation","Entity_Label_Field_organisation_number":"Organisationsnummer","Entity_Label_Field_notes":"Notera","Entity_Label_Field_detailed_role_categories":"Detaljkategori","Entity_Label_Field_gender":"Kön","Entity_Label_Field_whom":"Vem","Entity_Label_Field_what":"Vad","Entity_Label_Field_when":"När","Entity_Label_Field_url":"URL","Entity_Label_Field_pepcountryid":"PEP land ID","Entity_Label_Field_country_iso":"PEP land ISO-kod","Entity_Label_Field_pepcountry_name":"PEP land","Entity_Label_Tid":"PEP TID","Entity_Label_Description":"Beskrivning","Entity_Label_Field_image_url":"Bild URL","Entity_Label_Field_alternate_postaladdress":"Postadress (alternativ)","Entity_Label_Field_alternate_postaladdress2":"Postadress 2 (alternativ)","Entity_Label_Field_alternate_postalcity":"Stad (alternativ)","Entity_Label_Field_postaladdresssource":"Postadress källa","Entity_Label_Field_alternate_postaladdresssou":"Postadress källa (alternativ)","Entity_Label_Field_alternate_housenumber":"Husnummer (alternativ)","Entity_Label_Field_alternate_zipcode":"Postnummer (alternativ)","Entity_Label_Field_alternate_postalcountry":"Land (alternativ)","Entity_Label_Field_bornafter":"Född efter","Entity_Label_Field_source_of_update":"Uppdateringskälla","Entity_Label_Field_last_date_of_verification":"Senast kontrollerad","Entity_Label_Field_bornbefore":"Född före","Entity_Label_Field_cvrpersonid":"CVR Personid","Entity_Label_Field_probabledata":"Sannolika uppgifter","Entity_Label_Field_effective_date":"Giltighetsdatum","Entity_Label_Field_creator":"Skapad av","Entity_Label_Field_responsible":"Ansvarig","Entity_Label_Field_Gender_Female":"Kvinna","Entity_Label_Field_Gender_Male":"Man","Entity_Label_Field_rca":"Is RCA","Entity_Label_Field_order_nametype_1":"Tidigare namn","Entity_Label_Field_order_nametype_2":"Alternativ stavning","Entity_Label_Field_order_nametype_3":"Primärt namn","Entity_Label_Field_order_nametype_4":"Folder Posting Name","Entity_Label_Segment_Postaddress":"Adressuppgifter","Nav_DropDownItem_Persons":"Sök personen","Label_Button_Edit":"Redigera","Label_Button_Create":"Skapa","Label_Button_Save":"Spara","Label_Button_Delete":"Radera","Label_Button_Update":"Uppdatera","Label_Button_Cancel":"Avbryt","Label_Autoupdate":"Live uppdatering","Label_Button_Add":"Lägg till","Label_Button_Remove":"Avlägsna","Label_Ordercard_Personnames":"Namn","Label_Ordercard_Personssn":"SSN","Entity_Label_Field_description":"Om denna order","Label_Button_UpdateOrderState":"Uppdatera order status","Label_Button_CancelOrder":"Annullera order","Entity_Label_Field_deactivationdate":"Inaktiveringsdatum","Entity_Label_Field_is_deceased":"Avliden","Entity_Label_Field_deceased_date":"Avliden datum","Entity_Label_Field_name_type_remove_item":"Ta bort namnobjekt?","Entity_Label_Field_remove_item_text":"Vill du verkligen ta bort denna post?","Label_Ordercard_PersonSSN":"Person SSN nummer","Entity_Label_Field_ssn_remove_item":"Ta bort SSN objekt?","Entity_Label_Field_pepcountry":"PEP Land","Entity_Label_FieldCountryOfJurisdiction_Denmark":"Danmark","Entity_Label_FieldCountryOfJurisdiction_Sweden":"Sverige","Entity_Label_FieldCountryOfJurisdiction_Norway":"Norge","Entity_Label_FieldCountryOfJurisdiction_Finland":"Finland","Entity_Label_Field_is_active_role":"Är aktiv roll","Label_Button_NewRole":"Lägg till en ny roll","Label_Button_RemoveRole":"Radera","Entity_Label_Item_id":"Id","Entity_Label_Field_Role_remove_item":"Ta bort roll från order?","Label_Button_NewRelation":"Lägg till ny releation","Entity_Label_Field_Relation_remove_item":"Ta bort relation från order?","Label_Button_RemoveRelation":"Ta bort relation","Label_Ordercard_Relations":"Relation","Entity_Label_Field_relation":"Relationstyp","Entity_Label_Field_Category":"Rollkategori","Entity_Label_Role_description_type":"Rollbeskrivningstyp","Entity_Label_Search":"Sök","Label_Orders_Search":"Sök person eller order","Table_OrderList_Column_Name":"Order-id","Table_OrderList_Column_Status":"Status","Table_OrderList_Column_OrderType":"Typ","Table_OrderList_Column_ModifiedBy":"Ändrats","Entity_Label_Person_Card":"Personuppgifter","Entity_Label_Personid":"Person ID Classic","Label_OpenOrderListItem_Languages":"Välj språk","Label_Button_ChangeData":"Ändra uppgifter","Label_Ordercard_PersonOrders":"Order på personen","Label_Button_Create_Order":"Skapa order","Label_Person_Save_Order":"Vänligen ange en kommentar för orderen och tryck Spara","TIMEAGO_INIT_STRING":"För","Entity_Create_Order":"Skapa order","Table_searchpersonList_Column_ID":"ID","Table_searchpersonList_Column_FirstName":"Förnamn","Table_searchpersonList_Column_LastName":"Efternamn","Table_searchpersonList_Column_PEPRCA":"PEP / RCA","Table_searchpersonList_Column_Country":"Land","Table_searchpersonList_Column_Role":"Detaljerad roll","Table_searchpersonList_Column_Relation":"Relation","Table_searchpersonList_Column_Organisation":"Organisation","RelationshipWithPersonIs":"Till","Label_searchpersons_Search":"Ange värde och tryck enter","Label_PersonView":"Personvy","Label_RoleView":"Rollvy","RelationshipWithPersonIsDaughterInLaw":"Svärdotter till","RelationshipWithPersonIsSonInLaw":"Svärson till","RelationshipWithPersonIsDoughter":"Dotter till","RelationshipWithPersonIsSon":"Son till","RelationshipWithPersonIsMotherInLaw":"Svärmor till","RelationshipWithPersonIsFatherInLaw":"Svärfar till","RelationshipWithPersonIsMother":"Mor till","RelationshipWithPersonIsFather":"Fadern till","RelationshipWithPersonIsPartner":"Partner med","RelationshipWithPersonIsCoworker":"Medarbetare med","Table_SearchResultForString":"Resultat för Search","Table_SearchResultTimeLaps":"Sök i","Table_searchpersonList_Column_RoleDescription":"Rollbeskrivning","Table_searchpersonList_Column_MainRole":"Primär roll","Label_LoginForm_LdapError":"Ditt användarnamn eller lösenord är inte korrekt. Var god försök igen","Table_searchpersonList_Column_SSN":"Född","Label_ShowAllRoles":"Visa alla roller","Entity_Label_Version_Card":"Versioner","Table_searchpersonList_Column_Birth date":"Födelsedatum","Label_DistinctRoles":"Distinkt rollpresentation","Form_Current_RoleSearch":"Role söknyckel (taxonomi)","Form_NumberOfActivePersons":"Antal aktiva personer","Form_NumberOfNoneActivePersons":"Antal inaktiva personer","Form_NumberOfPersons":"Antal personer","Form_NumberOfActiveRoles":"Antal aktiva roller","Label_ResetSearch":"Ny sökning","Entity_Label_Field_SSN":"Svenskt personnummer","Entity_Label_field_names":"Namn","Label_Button_Create_NewPersonOrder":"Skapa ny person","Entity_Label_Field_personname":"Person","Entity_Label_field_type_label":"Person typ etikett","Entity_Label_field_personid":"PersonId (klassisk)","Entity_Label_GoTo_Person":"Go to person","Entity_Label_Field_is_active_relation":"Aktiv relation","Form_NumberOfTotalRoles":"Rader i tabellen","Form_NumberOfNoneActive":"Inaktiva rader","Label_variant_yy":"Å","Label_variant_mm":"M","Label_variant_dd":"D","Label_date_error":"Kontrollera datum","Label_Invalid_date":"Ogiltigt datum","Label_variant_hh":"TT","Label_variant_min":"MM","Label_Person_QueryNewOrder":"Vänligen bekräfta för att skapa en ny order","Label_Button_CreateNewOrder":"Skapa ny personorder","Label_Snackbar_DataSaved":"Data sparad","Label_Snackbar_Error":"Ett system-fel uppstod!","Nav_DropDownItem_NewOrder":"Ny order","Entity_Label_Field_countryofjurisdiction":"Land jurisdiktion","Entity_Label_Motherboard":"Motherboard","Label_Livestream":"Livestream","Label_Order_Entity":"Livestream Order","Label_Person_Entity":"Livestream Person","Label_Livestream_Last":"Senaste händelser","Label_PerformedBy":"Utfört av","Label_All_Livestream":"Senaste","Label_Ordercard_CurrentOrders":"Order","Label_Ordercard_Subheader":"Nuvarande order","Label_MothercheckPerformed":"Mothercheck utfört","Label_Motherchecks":"Övervakning nyckelvärden i Gudrun plattform","Label_Motherchecks_sublabel":"Mothercheck listan","Label_mothercheck_details":"Mothercheck Detaljer","Label_Mothercheck_info":"Mothercheck info","Label_Button_OK":"OK","Entity_Label_Field_current_ssn_error":"Organisationsnummer är fel","Label_Search_Toolbar":"PersonID","Label_MessageCheck":"Meddelanden","Label_MessageCheck_sublabel":"Valideringsstatus lista","Label_messagePerformed":"Utförda kontroller","Validate_mandatory_field":"Obligatoriskt fält","Validate_mandatory_field_objective":"Detta fält måste fyllas i","Validate_mandatory_field_resolution":"Fyll i fältet","Label_Snackbar_ValidationOrderError":"Valideringsfel i Order","Label_Snackbar_OrderProcessed":"Ordern har bearbetats","Validate_Birth date_ok_title":"Födelsedatum fält ok","Validate_Birth date_error_title":"Födelsedatum har ett fel","Validate_gender_ok_title":"Kön fält OK","Validate_gender_error_title":"Kön felt har ett fel","Validate_name_error_title":"Minst ett namn måste var ifylld i ordern","Validate_name_ok_title":"Namnkontroll ok","Label_Person_RestoreThisOrder":"Återställ senaste set av förändringar","Label_Button_RestoreOrder":"Återställ","Entity_Restore_Order":"Återställ order","Entity_Process_Order":"Behandla order","Label_message_details":"Beskrivning","Validate_pepcountry_ok_title":"PEP-land check ok","Validate_pepcountry_error_title":"Minst ett PEP-land måste väljas","Validate_SSN_ok_title":"SSN OK","Validate_SSN_error_title":"SSN saknas","Label_Card_Role":"Roll","Label_Card_Relation":"Relation","Label_Card_Core":"Core","Label_Card_SSN":"SSN","Label_Card_Address":"Adress","Label_Card_URI":"Uri","Label_Card_Name":"Namn","Label_Card_Order":"Order","Validate_nametype_primary_objective":"En order måste ha ett primärt namn","Nav_DropDownItem_Orderdashboard":"Order instrumentpanelen","Entity_Label_SearchPerson":"Sök person","Entity_Label_SearchPerson_Firstname":"Förnamn","Entity_Label_SearchPerson_Lastname":"Efternamn","Entity_Label_SearchPerson_SSNNumber":"Svenskt personnummer","Entity_Label_SearchPerson_Birth date":"Födelsedatum","Entity_Label_SearchPerson_Year":"År","Entity_Label_SearchPerson_Month":"Månad","Entity_Label_SearchPerson_Day":"Dag","Entity_Label_NameValues":"Namn","Entity_Label_SearchDates":"Datum","Entity_Label_PEPRCA":"Definiera PEP och / eller RCA","Entity_Label_Button_Find":"Sök","Entity_Label_SelectListCountries":"Listland","Entity_List_Link":"Person","Entity_List_SSN":"Svenskt personnummer","Entity_List_FirstName":"Förnamn","Entity_List_LastName":"Efternamn","Entity_List_Gender":"Kön","Entity_List_PEP":"PEP","Entity_List_RCA":"RCA","Entity_List_Details":"Visa mer","Entity_Label_Mandatory":"Obligatoriskt fält","Entity_Label_Button_Back":"Tillbaka","Entity_Label_Button_Close":"Stäng","Entity_List_Birth date":"Födelsedatum","Entity_List_NameType":"Namntyp","Entity_List_Role":"Roll","Entity_List_RoleCategory":"Rollkategori","Entity_List_RoleCategoryDetails":"Detaljkategori","Entity_List_FromDate":"Startdatum","Entity_List_ThroughDate":"Slutdatum","Entity_List_Active":"Rollstatus","Entity_List_Type":"Namntyp","Entity_List_Name":"Namn","Entity_List_Description":"Beskrivning","Entity_List_CountryOfJurisdiction":"Jurisdiktion","Label_Snackbar_NoData":"Ingen person matchar din förfrågan","Entity_Label_FieldCountryListSimple_All":"Alla länder","Entity_List_SearchBySSN":"Personnummerträff","Entity_Details":"Detaljer","Entity_Names":"Namn","Entity_Roles":"Roller","Entity_Relations":"Relationer","Entity_Label_AddCompanyUser":"Lägg till användare","Entity_Label_AddUser_Email2":"Ange e-post igen","Entity_Label_AddUser_Email":"E-post","Entity_Label_AddUser_Name":"Namn","Entity_UsersList_InactiveMembersTitle":"Inaktiva medlemmar","Entity_UsersList_MembersTitle":"Medlemmar","Entity_UsersList_AdminsTitle":"Admins","Entity_UsersList_Deactivate":"Inaktivera","Entity_UsersList_Activate":"Aktivera","Entity_UsersList_Name":"Namn","Entity_UsersList_Email":"E-post","Entity_UsersList_Dialog_Activate":"Aktivera användare?","Entity_UsersList_Dialog_Deactivate":"Inaktivera användare?","Entity_UsersList_Dialog_Cancel":"Avbryt","Entity_UsersList_Dialog_Confirm":"Bekräfta","Entity_Validation_MandatoryField":"Fyll i alla obligatoriska fält","Entity_Validation_MatchErrorField":"Värdena matchar inte för {$fält}","Entity_UsersList_Active":"Status","Entity_UserList_Pic":"Profil","Nav_DropDownItem_AdminCompanyPersons":"Hantera användare","Entity_List_Avatar":"#","Nav_DropDownItem_Finnish":"Finska","Nav_DropDownItem_Danish":"Danska","Nav_DropDownItem_Norweigan":"Norska","Label_ordersbystate_sublabel":"Beställningar av staten","Entity_Delete_Relation":"Ta bort denna relation","Entity_Delete_Role":"Ta bort denna roll","Label_Person_Delete_Orde":"Bekräfta för att radera posten","Label_Button_ConfirmDelete":"Delete order","Nav_DropDownItem_Icleandic":"Island","Entity_Label_Field_ContactUs_Title":"Boka telefontid","Entity_Label_Field_ContactUs_Name":"Namn","Entity_Label_Field_ContactUs_Email":"E-postadress","Entity_Label_Field_ContactUs_Email2":"Upprepa e-post","Entity_Label_Field_ContactUs_Phone":"Telefon","Entity_Label_Field_ContactUs_Content":"Meddelande","Entity_Label_Button_ContactUs_Submit":"Skicka","Entity_Label_Button_ContactUs_Cancel":"Avbryt","Entity_Label_Field_ContactUs_Waltercheck":"Svara på frågan","Entity_Validation_MandatoryField_Name":"Namn","Entity_Validation_MandatoryField_Email":"E-post","Entity_Validation_MandatoryField_Message":"Meddelande","Nav_DropDownItem_About":"Om Oss","Entity_FileareaList_AdminsTitle":"Filarea","Entity_FileareaList_Download":"Ladda ner","Entity_FileareaList_Name":"Filnamn","Nav_DropDownItem_Filearea":"Filarea","Entity_Label_Field_ContactUs_Success":"Tack för ditt meddelande. Vi återkommer så snart som möjligt!","Entity_Label_Field_ContactUs_Fail":"Meddelandet kunde inte skickas. Vänligen skicka ett mail till support@Oss.se istället, så lovar vi att återkomma så snart som möjligt.","Entity_Label_Download_Success":"Filöverföring påbörjades","Label_LoginForm_GoHome":"Tillbaka till huvudsidan","Nav_DropDownItem_Login":"Logga in","Label_Content_Help":"Hjälp med sök","Entity_Details_Address":"Adress","Entity_List_Address":"Gatuadress","Entity_List_Address2":"","Entity_List_HouseNumber":"Husnummer","Entity_List_PostalCity":"Stad","Entity_List_ZipCode":"Postnummer","Entity_List_PostalCountry":"Land","Label_Person_Delete_Order":"Delete order","Entity_List_RelationType":"Relationstyp","Entity_List_RelationDescription":"Relationsbeskrivning","Entity_List_BirthDate":"Födelsedatum","Label_EntityIsUpdated":"Senast ändrad","Entity_OssID":"Oss Id","Label_RoleIsActive":"Aktiv","Label_RoleIsInActive":"Inaktiv","Label_Button_Clear":"Rensa","Label_Button_Filter":"Filtrera","Label_Button_Search":"Sök","Label_NoSearchPerfomed":"Inget resultat vid sökning.","Entity_List_OpenRelation":"Gå till person","Tooltip_ChatLineListComponent_Text":"Meddelande","Nav_DropDownItem_Livestream":"InterCom","Nav_DropDownItem_Clients":"Klienter","Label_Onboarding_EnterUserName":"Välj ett namn för ditt konto","Header_onboarding_onboarding":"Registrering","Header_onboarding_EnterHint":"Välj ett namn ni kommer ihåg","Label_Onboarding_UserName":"Användarnamn","Label_EnterUserName":"Användarnamn","Button_Onboarding_Step1":"Välj namn","Label_Onboarding_Secret":"Hemligt svar","Button_Onboarding_Step1_Back":"Tillbaka","Button_Onboarding_Step2":"Nästa","Label_Onboarding_Password":"Ange lösenord","Label_Onboarding_PasswordAgain":"Ange lösenord igen","Label_Onboarding_PasswordRules":"Lösenordet måste vara minst 8 tecken långt.","Header_onboarding_reset":"Återställ lösenord","Label_Reset_EnterUserName":"Ange kontonamn","Label_Reset_UserName":"Kontonamn","Button_Reset_Step1":"Skriv in PUK-kod","Label_Reset_PUK":"Ange PUK-kod","Label_Password_Guidelines":"Strängen måste innehålla minst en stor bokstav, minst en liten bokstav, minst en siffra och minst ett specialtecken. Strängen måste vara åtta tecken eller längre.","Label_UserNameError":"Användarnamn måste vara minst 4 tecken lång","Label_SecretIsNotIdentical":"Du har inte skrivit in samma hemliga ord","Button_Onboarding_Accept":"Skapa ditt konto","Button_Onboarding_SetPw":"Ange lösenord","Label_Summary_CreateAccount":"Summering"});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"tcomb":{"en.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// i18n/tcomb/en.js                                                                                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.exportDefault({
  optional: ' (optional)',
  required: '',
  add: 'Add',
  remove: 'Remove',
  up: 'Up',
  down: 'Down'
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"sv.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// i18n/tcomb/sv.js                                                                                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.exportDefault({
  optional: ' (valfri)',
  required: '',
  add: 'Foga',
  remove: 'Avlägsna',
  up: 'Upp',
  down: 'Ned'
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"wallaby.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// wallaby.js                                                                                                       //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
!function (module1) {
  module.exports = function (wallaby) {
    // There is a weird error with the mui and mantra.
    // See: https://goo.gl/cLH8ib
    // Using require here seems to be the error.
    // Renaming it into `load` just fixed the issue.
    var load = require;
    return {
      files: ['client/modules/**/components/*.jsx', 'client/modules/**/actions/*.js', 'client/modules/**/containers/*.js', 'client/modules/**/libs/*.js'],
      tests: ['client/**/tests/*.js'],
      compilers: {
        '**/*.js*': wallaby.compilers.babel({
          babel: load('babel-core'),
          presets: ['es2015', 'stage-2', 'react']
        })
      },
      env: {
        type: 'node'
      },
      testFramework: 'mocha'
    };
  };
}.call(this, module);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"debug.json":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// debug.json                                                                                                       //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.exports = {
  "DEFCON9": false,
  "DEFCON8": false,
  "DEFCON7": false,
  "DEFCON6": false,
  "DEFCON5": true,
  "DEFCON4": true,
  "DEFCON3": true,
  "DEFCON2": true,
  "DEFCON1": true
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"package.json":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// package.json                                                                                                     //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.exports = {
  "name": "neptune-sunhill",
  "version": "0.6.77",
  "version_focus": "Signal limits",
  "version_build_date": "20210823",
  "description": "Sunhill - Mission Control Center",
  "scripts": {
    "lint": "eslint ./lib ./client ./server --ext .js --ext .jsx",
    "lintfix": "npm run lint -- --fix",
    "testonly": "mocha .scripts/mocha_boot.js client/**/tests/**/*.js --compilers js:babel-core/register",
    "test": "npm run lint && npm run testonly",
    "test-watch": "npm run testonly -- --watch --watch-extensions js,jsx",
    "dsstore": "find . -name '*.DS_Store' -type f -delete",
    "storybook": "start-storybook -p 9003"
  },
  "dependencies": {
    "@babel/runtime": "^7.15.3",
    "@date-io/date-fns": "^2.11.0",
    "@date-io/luxon": "^1.3.6",
    "@date-io/moment": "^1.0.2",
    "@material-ui/core": "^4.12.3",
    "@material-ui/icons": "^4.11.2",
    "@material-ui/lab": "^4.0.0-alpha.60",
    "@material-ui/pickers": "^3.2.6",
    "animate.css": "^4.1.1",
    "babel-core": "^6.26.0",
    "babel-polyfill": "^6.26.0",
    "chalk": "^2.4.2",
    "classnames": "^2.3.1",
    "create-react-class": "^15.6.3",
    "date-fns": "^2.23.0",
    "dateformat": "^4.5.1",
    "domready": "^1.0.8",
    "echarts": "^4.7.0",
    "echarts-for-react": "^3.0.1",
    "es6-promisify": "^7.0.0",
    "immutability-helper": "^3.0.1",
    "intl": "^1.2.5",
    "intl-locales-supported": "^1.0.0",
    "javascript-time-ago": "^2.3.8",
    "linq": "^3.1.1",
    "lodash": "^4.17.21",
    "ltxml": "github:jthuraisamy/ltxml",
    "luxon": "^1.8.2",
    "mantra-core-extra": "^1.8.2",
    "material-ui-image": "^3.2.2",
    "material-ui-pickers": "^2.2.4",
    "meteor-babel": "^7.1.6",
    "meteor-node-stubs": "^0.4.1",
    "moment": "^2.29.1",
    "pixl-xml": "^1.0.7",
    "prop-types": "^15.7.2",
    "react": "^17.0.2",
    "react-autosuggest": "^9.3.4",
    "react-bootstrap": "^0.30.2",
    "react-clock": "^3.0.0",
    "react-country-flag": "^2.3.1",
    "react-dom": "^17.0.2",
    "react-draggable-list": "^3.4.0",
    "react-gravatar": "^2.6.3",
    "react-iframe": "^1.8.0",
    "react-input-mask": "^2.0.4",
    "react-komposer": "1.13.1",
    "react-mounter": "^1.2.0",
    "react-select": "^4.3.1",
    "react-simple-di-extra": "^1.3.4",
    "react-speech": "^1.0.2",
    "react-sticky": "^6.0.3",
    "react-swipeable-views": "^0.12.8",
    "react-tagsinput": "3.8.1",
    "react-text-mask": "^5.4.3",
    "react-timer-mixin": "^0.13.4",
    "react-transition-group": "^4.1.1",
    "react-world-flags": "^1.4.0",
    "require": "^2.4.20",
    "tcomb-form": "^0.9.21",
    "throttle-debounce": "^1.0.1",
    "xmldom": "^0.1.22",
    "yarn": "^1.22.0"
  },
  "devDependencies": {
    "babel-core": "6.x.x",
    "babel-plugin-react-require": "2.x.x",
    "babel-plugin-transform-react-jsx-source": "^6.22.0",
    "babel-polyfill": "6.x.x",
    "babel-preset-es2015": "6.x.x",
    "babel-preset-react": "6.x.x",
    "babel-preset-stage-2": "6.x.x",
    "babel-root-slash-import": "^1.1.0",
    "chai": "3.x.x",
    "enzyme": "^2.0.0",
    "eslint": "4.18.x",
    "eslint-plugin-react": "5.2.x",
    "jsdom": "^9.2.1",
    "mocha": "2.x.x",
    "raw-loader": "^0.5.1",
    "react-addons-test-utils": "^15.0.0",
    "sinon": "1.17.x",
    "style-loader": "^0.13.1"
  },
  "private": true
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},{
  "extensions": [
    ".js",
    ".json",
    ".jsx",
    ".mjs",
    ".i18n.yml"
  ]
});

require("/server/lib/drupal/services.js");
require("/server/lib/fileManager/filemanager.js");
require("/lib/transformers/dateStringTransformer.js");
require("/server/lib/chat.js");
require("/server/lib/order.js");
require("/lib/collections.js");
require("/lib/constants.js");
require("/lib/log.js");
require("/lib/random.js");
require("/lib/user.js");
require("/i18n/core/da.i18n.yml.js");
require("/i18n/core/en.i18n.yml.js");
require("/i18n/core/fi.i18n.yml.js");
require("/i18n/core/is.i18n.yml.js");
require("/i18n/core/no.i18n.yml.js");
require("/i18n/core/sv.i18n.yml.js");
require("/i18n/tcomb/en.js");
require("/i18n/tcomb/sv.js");
require("/server/configs/initial_adds.js");
require("/server/configs/initial_users.js");
require("/server/methods/_users.js");
require("/server/methods/account.js");
require("/server/methods/chatlinelists.js");
require("/server/methods/contact.js");
require("/server/methods/content.js");
require("/server/methods/filearea.js");
require("/server/methods/index.js");
require("/server/methods/log.js");
require("/server/methods/orders.js");
require("/server/methods/search.js");
require("/server/publications/_users.js");
require("/server/publications/articles.js");
require("/server/publications/chatlines.js");
require("/server/publications/chatrooms.js");
require("/server/publications/index.js");
require("/server/publications/mcc_config.js");
require("/server/publications/programs.js");
require("/server/publications/secrets.js");
require("/server/publications/signalstate.js");
require("/server/routes.js");
require("/wallaby.js");
require("/server/main.js");
//# sourceURL=meteor://💻app/app/app.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL2xpYi9kcnVwYWwvc2VydmljZXMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9saWIvZmlsZU1hbmFnZXIvZmlsZW1hbmFnZXIuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9saWIvY2hhdC5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL2xpYi9vcmRlci5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL2NvbmZpZ3MvaW5pdGlhbF9hZGRzLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvY29uZmlncy9pbml0aWFsX3VzZXJzLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWV0aG9kcy9fdXNlcnMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9tZXRob2RzL2FjY291bnQuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9tZXRob2RzL2NoYXRsaW5lbGlzdHMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9tZXRob2RzL2NvbnRhY3QuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9tZXRob2RzL2NvbnRlbnQuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9tZXRob2RzL2ZpbGVhcmVhLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWV0aG9kcy9pbmRleC5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL21ldGhvZHMvbG9nLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWV0aG9kcy9vcmRlcnMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9tZXRob2RzL3NlYXJjaC5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL3B1YmxpY2F0aW9ucy9fdXNlcnMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9wdWJsaWNhdGlvbnMvYXJ0aWNsZXMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9wdWJsaWNhdGlvbnMvY2hhdGxpbmVzLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvcHVibGljYXRpb25zL2NoYXRyb29tcy5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL3B1YmxpY2F0aW9ucy9pbmRleC5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL3B1YmxpY2F0aW9ucy9tY2NfY29uZmlnLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvcHVibGljYXRpb25zL3Byb2dyYW1zLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvcHVibGljYXRpb25zL3NlY3JldHMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9wdWJsaWNhdGlvbnMvc2lnbmFsc3RhdGUuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9yb3V0ZXMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9tYWluLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9saWIvdHJhbnNmb3JtZXJzL2RhdGVTdHJpbmdUcmFuc2Zvcm1lci5qcyIsIm1ldGVvcjovL/CfkrthcHAvbGliL2NvbGxlY3Rpb25zLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9saWIvY29uc3RhbnRzLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9saWIvbG9nLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9saWIvcmFuZG9tLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9saWIvdXNlci5qcyIsIm1ldGVvcjovL/CfkrthcHAvaTE4bi90Y29tYi9lbi5qcyIsIm1ldGVvcjovL/CfkrthcHAvaTE4bi90Y29tYi9zdi5qcyIsIm1ldGVvcjovL/CfkrthcHAvd2FsbGFieS5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnQiLCJkZWZhdWx0IiwiR3VkcnVuQ29udGVudFNlcnZpY2VzIiwiSFRUUCIsImxpbmsiLCJ2IiwiTWV0ZW9yIiwiREVGQ09OOSIsIkRFRkNPTjciLCJERUZDT041IiwiREVGQ09ONCIsIkRFRkNPTjMiLCJERUZDT04yIiwiREVGQ09OMSIsInV0aWwiLCJVU0VSX0FDVElPTl9BQ1RJVkFURSIsImNvbnN0cnVjdG9yIiwiYXN5bmNIdHRwIiwicHJvbWlzaWZ5IiwicG9zdCIsInNlbmRSZXF1ZXN0IiwidXJsIiwicXVlcnkiLCJhc3luYyIsImNvbnNvbGUiLCJsb2ciLCJKU09OIiwic3RyaW5naWZ5Iiwic3RhcnRUaW1lIiwiRGF0ZSIsImdldFRpbWUiLCJoZWFkZXJzIiwic2V0dGluZ3MiLCJhcGlLZXkiLCJBUElLRVkiLCJzdHJpY3RTU0wiLCJyZXNwb25zZSIsImV4ZWN1dGlvblRpbWUiLCJzdGF0dXNDb2RlIiwiZGF0YSIsImxvY2FsRXJyb3IiLCJFcnJvciIsInNlbmRSZXF1ZXN0QXN5bmMiLCJ0ZXN0X2Nvbm5lY3Rpb24iLCJzZXJ2aWNlVXJsIiwiZHJ1cGFsVGVzdENvbm5lY3Rpb24iLCJyZXBsYWNlIiwicXVlcnlPcmRlciIsInNlYXJjaFRleHQiLCJkcnVwYWxPcmRlclF1ZXJ5IiwicXVlcnlPcmRlclN0YXRlIiwic3RhdGUiLCJsaW1pdCIsImZpZWxkX29yZGVyX3N0YXRlIiwicXVlcnlfbGltaXQiLCJxdWVyeU9yZGVyQnlQZXJzb25JZCIsImZpZWxkX3BlcnNvbmlkIiwicXVlcnlSZWNlbnRPcmRlcnMiLCJtb3RoZXJjaGVja3MiLCJkcnVwYWxNb3RoZXJDaGVjayIsInF1ZXJ5T3JkZXJCeU9yZGVySWQiLCJmaWVsZF9vcmRlcmlkIiwidXBkYXRlT3JkZXJCeU9yZGVySWQiLCJvcmRlciIsImRydXBhbE9yZGVyVXBkYXRlIiwidXBkYXRlU3RyZWFtIiwiY3JlYXRlUGVyc29uT3JkZXIiLCJkcnVwYWxPcmRlckNyZWF0ZSIsImRhdGFSZXBseSIsImdldFRlcm1zIiwidGVybXR5cGUiLCJkcnVwYWxHZXRUYXgiLCJ0YXhvbm9teV90eXBlIiwicXVlcnlUZXJtcyIsImRydXBhbFF1ZXJ5VGF4IiwidGF4b25vbXlfYXV0b3NlYXJjaCIsInF1ZXJ5VGVybXNDb3VudHJ5IiwiZGF0YUNvbnRleHQiLCJ0YXhvbm9teV9xdWVyeV9jb3VudHJ5IiwicXVlcnlQZXJzb25CeUlkIiwiZHJ1cGFsRW50aXR5UXVlcnkiLCJxdWVyeV9kb21haW4iLCJxdWVyeVBlcnNvbiIsIm1ldGEiLCJtZXRhX3Jlc3BvbmNlbW9kZSIsIm1ldGFfcXVlcnlfZW5naW5lIiwibWV0YV9xdWVyeV9hcmdzIiwicXVlcnlQZXJzb25BZHZhbmNlZCIsInBlcnNvbmFkdmFuY2VkX2Rpc3RpbmN0IiwicXVlcnlSb2xlQWR2YW5jZWQiLCJxdWVyeVJvbGVzIiwiYWR2YW5jZWRyb2xlX3JvbGVzIiwiYWR2YW5jZWRyb2xlX2RldGFpbGVkY2F0ZWdvcnlyb2xlIiwiYWR2YW5jZWRyb2xlX2Jhc2VjYXRlZ29yeXJvbGUiLCJhZHZhbmNlZHJvbGVfb3JnYW5pc2F0aW9uIiwiYWR2YW5jZWRyb2xlX2NvdW50cnlvZmp1cmlzZGljdGlvbiIsImxpdmVzdHJlYW0iLCJmaWVsZF9wYXJlbnRfcmVmZXJlbmNlIiwicHJvY2Vzc09yZGVyIiwicmVxdWVzdCIsImRydXBhbFByb2Nlc3MiLCJmaWVsZF9vcmRlcl9zdGF0ZV9yZXF1ZXN0X25leHQiLCJnZXRVc2VyUm9sZXMiLCJ1aWQiLCJkcnVwYWxVc2VyVXJsIiwicm9sZXMiLCJhZG1pbiIsImFkbWluX2luX2NvbXBhbmllcyIsIm1lbWJlciIsIm1lbWJlcl9pbl9jb21wYW5pZXMiLCJlIiwiZ2V0Q29tcGFueVVzZXJzIiwiY29tcGFueUlkIiwiZHJ1cGFsQ29tcGFueVVzZXJzVXJsIiwiZmllbGRfY29tcGFueV9pZCIsImNvbXBhbnkiLCJhZG1pbmlzdHJhdG9ycyIsImZpZWxkX2NvbXBhbnlfYWRtaW5pc3RyYXRvcnMiLCJ0ZW1wIiwibWFwIiwidXNlciIsImNvbmNhdCIsIm1lbWJlcnMiLCJmaWVsZF9jb21wYW55X21lbWJlcnMiLCJzdGF0dXMiLCJmaWVsZF9jb21wYW55X21lbWJlcnNfaW5hY3RpdmUiLCJ1c2VycyIsImFkbWlucyIsIm1hbmFnZVVzZXIiLCJhY3Rpb24iLCJkcnVwYWxNYW5hZ2VVc2VyVXJsIiwiY29udGVudFNlcnZlckFjdGlvbiIsImRydXBhbEluc2VydFVzZXIiLCJ1c2VyX21haWwiLCJtYWlsIiwidXNlcl9uYW1lIiwibmFtZSIsInNlY3JldFF1ZXN0aW9uIiwic2VjcmV0QW5zd2VyIiwicHciLCJhZGRVc2VyIiwic2VuZFF1ZXN0aW9uIiwiZHJ1cGFsQ29udGFjdFVybCIsInF1ZXJ5T3B0aW9ucyIsImdldEFydGljbGUiLCJkcnVwYWxHZXRBcnRpY2xlVXJsIiwiZmlsZWFyZWFHZXRGaWxlIiwiZHJ1cGFsRmlsZWFyZWFHZXRGaWxlIiwiZmlsZWFyZWFRdWVyeSIsImRydXBhbEZpbGVhcmVhUXVlcnkiLCJkcnVwYWxHZXRVc2VyIiwibWV0aG9kIiwidmFsdWUiLCJnZXRVc2VyQnlBdHRyaWJ1dGUiLCJDaGF0Um9vbXMiLCJDaGF0TGluZXMiLCJDb25zdGFudHMiLCJncm91cEJ5IiwieHMiLCJrZXkiLCJyZWR1Y2UiLCJydiIsIngiLCJwdXNoIiwiZXhwb3J0RGVmYXVsdCIsImdldENoYXRSb29tQnlJZCIsImlkIiwiT3JkZXIiLCJkYXRlRm9ybWF0IiwidW5kZWZpbmVkIiwidGVzdENvbm5lY3Rpb25Db250ZW50Iiwic2VydmljZXMiLCJlcnJvciIsIm9yZGVyUXVlcnkiLCJvcmRlcnMiLCJwcm9jZXNzIiwicmVzdWx0IiwiY3JlYXRlVXBkYXRlUGVyc29uT3JkZXIiLCJub3ciLCJPcmRlclByb2Nlc3NNZXRob2QiLCJFWFBSRVNTIiwiZ2V0TmFtZVR5cGVzIiwiY2hhdGxpbmVzIiwiZmluZCIsImNvdW50IiwiQWNjb3VudHMiLCJjcmVhdGVVc2VyIiwiZW1haWwiLCJwYXNzd29yZCIsImNoZWNrIiwiUmFuZG9tIiwiRHJ1cGFsU2VydmljZXMiLCJtZXRob2RzIiwiT2JqZWN0IiwiY2hhdFVzZXJzIiwiZmV0Y2giLCJfaWQiLCJTdHJpbmciLCJyZWNvcmQiLCJmaW5kT25lIiwiZ2V0IiwibG9jYWxlIiwiZGVmYXVsdExvY2FsZSIsImxhbmciLCJzZXQiLCJzYXZlIiwidGhlbWUiLCJCb29sZWFuIiwidXNlcklkIiwidGV4dCIsInVwZGF0ZWQiLCJ1cGRhdGUiLCIkc2V0IiwicHJvZmlsZSIsIm5ld1VzZXIiLCJhdmF0YXJfdXJpIiwiZG9Xb3JrIiwiYWRtaW5zQ29tcGFueUlkIiwicmVhc29uIiwiYWRtaW5pc3RyYXRlZENvbXBhbnlJZCIsImdldEFkbWluaXN0cmF0ZWRDb21wYW55SWQiLCJ1c2VyaWQiLCJzeW5jRHJ1cGFsVXNlciIsImdldERydXBhbFVzZXIiLCJ1cmkiLCJmaXJzdF9uYW1lIiwiZmllbGRfZmlyc3RfbmFtZSIsImxhc3RfbmFtZSIsImZpZWxkX2xhc3RfbmFtZSIsImluZm9ybWF0aW9uIiwiZmllbGRfaW5mb3JtYXRpb24iLCJ0ZWxlcGhvbmUiLCJmaWVsZF90ZWxlcGhvbmVfbnVtYmVyIiwiY3VycmVudFVpZCIsIm1vZHVsZTEiLCJNYXRjaCIsIlBlcnNvbnMiLCJTZWFyY2hMb2ciLCJzdGFsZVNlc3Npb25QdXJnZUludGVydmFsIiwicHVibGljIiwiaW5hY3Rpdml0eVRpbWVvdXQiLCJzdGFsZVNlc3Npb25JbmFjdGl2aXR5VGltZW91dCIsImZvcmNlTG9nb3V0IiwidXNlck9iaiIsImFjY291bnRTZXRQdyIsImhlYXJ0YmVhdCIsIm9wdGlvbnMiLCJzZXRJbnRlcnZhbCIsIm92ZXJkdWVUaW1lc3RhbXAiLCIkbHQiLCIkdW5zZXQiLCJtdWx0aSIsIkZ1dHVyZSIsIk5wbSIsInJlcXVpcmUiLCJEUlVQQUxfREVGQVVMVFMiLCJwb3J0IiwiZG4iLCJzZWFyY2hETiIsInNlYXJjaFNpemVMaW1pdCIsInNlYXJjaENyZWRlbnRpYWxzIiwiY3JlYXRlTmV3VXNlciIsImRlZmF1bHREb21haW4iLCJzZWFyY2hSZXN1bHRzUHJvZmlsZU1hcCIsImJhc2UiLCJzZWFyY2giLCJsZGFwc0NlcnRpZmljYXRlIiwiYmluZFRvRG9tYWluIiwiYmluZERvbWFpbiIsIkxEQVAiLCJjcmVhdGUiLCJfIiwiZGVmYXVsdHMiLCJwcm90b3R5cGUiLCJkcnVwYWxDaGVjayIsImJpbmRBZnRlckZpbmQiLCJzZWxmIiwiaGFzT3duUHJvcGVydHkiLCJsZGFwQXN5bmNGdXQiLCJlcnIiLCJ0b2tlblJlc3VsdCIsInJldHVybiIsInVzZXJfZGF0YSIsInVzZXJuYW1lIiwibGRhcFBhc3MiLCJjb250ZW50IiwicGFyYW1zIiwibG9naW5SZXN1bHQiLCJyZXRPYmplY3QiLCJjb2RlIiwibWVzc2FnZSIsIndhaXQiLCJyZWdpc3RlckxvZ2luSGFuZGxlciIsImxvZ2luUmVxdWVzdCIsImRydXBhbCIsInVzZXJPcHRpb25zIiwibGRhcE9wdGlvbnMiLCJsZGFwT2JqIiwic3RhbXBlZFRva2VuIiwidG9rZW4iLCJlbWFpbHMiLCIkZWxlbU1hdGNoIiwiYWRkcmVzcyIsInZlcmlmaWVkIiwiX2dlbmVyYXRlU3RhbXBlZExvZ2luVG9rZW4iLCJoYXNoU3RhbXBlZFRva2VuIiwiX2hhc2hTdGFtcGVkVG9rZW4iLCIkcHVzaCIsInNldFBhc3N3b3JkIiwiY2FsbCIsInVzZXJPYmplY3QiLCJDaGF0TGluZUxpc3RzIiwiY2hhbm5lbElkIiwibGluZSIsImN1cnJlbnRVc2VyIiwiY3VycmVudFVzZXJJZCIsImN1cnJlbnREYXRlIiwiY2hhdExpbmUiLCJtb2RpZmllZEJ5IiwiY3JlYXRlZEJ5TmFtZSIsImNyZWF0ZWRCeSIsIm1vZGlmaWVkQXQiLCJjcmVhdGVkQXQiLCJsaW5lSWQiLCJpbnNlcnQiLCJjb250YWluZXJJZCIsIm1ldGFfYWN0aW5nX3VzZXIiLCJfdXNlcnMiLCJjaGF0bGluZWxpc3RzIiwiY29udGFjdCIsImZpbGVhcmVhIiwiYWNjb3VudCIsIkFydGljbGVzIiwiT25lT2YiLCJVc2VycyIsInVuYmxvY2siLCJjb250ZW50X29yZGVyIiwiZGJRdWVyeSIsIm5hbWVFbGVtTWF0Y2giLCJOYW1lVHlwZSIsInJTdGFydCIsInJTdGFydExhc3ROYW1lIiwickVuZCIsImZpcnN0TmFtZSIsInJlZ2V4IiwiUmVnRXhwIiwic291cmNlIiwidG9Mb3dlckNhc2UiLCJ0cmltIiwiZGlyIiwiJHJlZ2V4IiwibGFzdE5hbWUiLCJmaWVsZF9wZXAiLCJmaWVsZF9yY2EiLCJ5ZWFyIiwibW9udGgiLCJkYXkiLCJBcnJheSIsImlzQXJyYXkiLCJmaWVsZF9wZXBfY291bnRyaWVzX2xpc3QiLCJsZW5ndGgiLCJmaWx0ZXJlZENvdW50cmllcyIsImZpbHRlciIsIml0ZW0iLCJpbmRleCIsInNlbGVjdGVkIiwiJGluIiwic2VhcmNoQnlTU04iLCJzc25OdW1iZXIiLCJrZXlzIiwiVXNlcklkIiwiRGF0ZVRpbWUiLCJSZXN1bHRzUmV0dXJuZWQiLCJsaXN0IiwicHVibGlzaCIsInNlbGVjdG9yIiwiYXJ0aWNsZUlkIiwiYXV0b3J1biIsImNvbXB1dGF0aW9uIiwiU2VsZWN0b3IiLCJhcnRpY2xlIiwiY2hhdExpbmVzU2VsZWN0b3IiLCJjaGF0TGluZXNVc2VySWRzIiwidXNlcnNXaXRoQXZhdGFycyIsImNoYXRyb29tSWQiLCJjaGF0Um9vbXNTZWxlY3RvciIsImNoYXRSb29tc1VzZXJJZHMiLCJjaGF0cm9vbXMiLCJzZWNyZXRzIiwiYXJ0aWNsZXMiLCJtY2MiLCJzaWduYWxzdGF0ZSIsIk1jY0NvbmZpZyIsIm1jY0NvbmZpZyIsImZhY2lsaXR5IiwiYWxsb3dEaXNrVXNlIiwicGlwZWxpbmUiLCIkbWF0Y2giLCJyZWFkX3Byb2Nfc3RhdHVzIiwiJGdyb3VwIiwibnVtT2ZSZWFkIiwiJHN1bSIsIiRwcm9qZWN0IiwiYWdncmVnYXRlIiwiUHJvZ3JhbXMiLCJNb2R1bGVzIiwicHJvZ3JhbUlkIiwiU2VjcmV0cyIsIlNpZ25hbFN0YXRlIiwiU2lnbmFsSGlzdG9yeSIsInNpZ25hbFN0YXRlIiwic29ydCIsInNpZ25hbElkIiwiZW50aXR5SWQiLCJTaWduYWxIaXN0b3J5RGF0YSIsIkZpbGVNYW5hZ2VyIiwiUGlja2VyIiwicm91dGUiLCJyZXEiLCJyZXMiLCJuZXh0IiwiZmlsZVR5cGUiLCJmaWxlSWQiLCJmaWxlTmFtZSIsImRlY29kZVVSSUNvbXBvbmVudCIsImZpbGVEYXRhIiwicmVhZE91dHB1dEZpbGVBc0J1ZmZlciIsInNldEhlYWRlciIsImVuZCIsInB1YmxpY2F0aW9ucyIsImFkZEluaXRpYWxEYXRhIiwiaTE4biIsInN0YXJ0dXAiLCJ1cmxzIiwicmVzZXRQYXNzd29yZCIsImFic29sdXRlVXJsIiwiZW1haWxUZW1wbGF0ZXMiLCJzaXRlTmFtZSIsIl9fIiwiZnJvbSIsInN1YmplY3QiLCJodG1sIiwidXJsVGFnIiwib25DcmVhdGVVc2VyIiwidmFsaWRhdGVMb2dpbkF0dGVtcHQiLCJvbkxvZ2luIiwibG9naW5JbmZvIiwiYWxsb3dlZCIsInR5cGUiLCJ0IiwibW9tZW50IiwiRGF0ZVN0cmluZ1RyYW5zZm9ybWVyIiwiZm9ybWF0U3RyaW5nIiwiZm9ybWF0IiwiaXMiLCJtb21lbnREYXRlIiwicGFyc2UiLCJzdHIiLCJ0b0RhdGUiLCJTaWduYWxNZXRhIiwiTW9uZ28iLCJDb2xsZWN0aW9uIiwiVVNFUl9BQ1RJT05fREVBQ1RJVkFURSIsIlVTRVJfQUNUSU9OX0FERCIsIlVTRVJfU1RBVFVTX0FDVElWRSIsIlVTRVJfU1RBVFVTX0lOQUNUSVZFIiwiUmVhY3QiLCJDYXJkTW9kZSIsIlBFUlNPTiIsIk5FV09SREVSIiwiT1JERVIiLCJDYXJkU3RhdHVzIiwiTkEiLCJRQSIsIlJRQSIsIk5FVyIsIkZVVFVSRSIsIk9LIiwiT3JkZXJQcm9jZXNzU3RhdHVzZXMiLCJJTklUIiwiUEVORElORyIsIk9QRU4xMDAiLCJPUEVOMTEwIiwiT1BFTjUwMCIsIlRJTUVDSEVDSyIsIlFBQ0hFQ0siLCJQVUJMSVNIIiwiQ09NUExFVEVEIiwiU1VTUEVOQ0U5MTAiLCJTVVNQRU5DRTk1MCIsIlNVU1BFTkNFOTkwIiwiQ0FOQ0VMTEVEIiwiT3JkZXJUeXBlIiwiTkVXX1BFUlNPTiIsIk1JR1JBVElPTiIsIlJFTEFUSU9OX1VQREFURSIsIlJFTEFUSU9OX0lOU0VSVCIsIkNPUkUiLCJVUkkiLCJTU04iLCJBRERSRVNTIiwiTkFNRSIsIlJPTEVfSU5TRVJUIiwiUk9MRV9VUERBVEUiLCJhY3RpdmVDYXJkIiwiUk9MRVMiLCJHZW5kZXIiLCJGRU1BTEUiLCJNQUxFIiwiREVGQVVMVCIsImRhdGVQcmVjaXNpb24iLCJVTkRFRiIsIllFQVIiLCJNT05USCIsIkRBWSIsIm9yZGVyVHlwZVRlY2huaWNhbCIsIk5FV19QRVJTT05fT1JERVIiLCJkZWZhdWx0VmFsdWVzIiwiT1JERVJJRCIsIm1vdGhlckNoZWNrU3RhdGUiLCJXQVJOSU5HIiwiRVJST1JfR0VORVJJQyIsIkVSUk9SIiwicGVyc29uTmFtZVR5cGVzIiwiUFJFVklPVVNfTkFNRVMiLCJBTFRFUk5BVElWRV9OQU1FUyIsIlBSSU1BUllfTkFNRSIsIlJFR0lTVFJFRF9OQU1FIiwiTG9hZGluZ0NvbXBvbmVudCIsIkxvZyIsImluZm8iLCJjYWxsYmFjayIsImdlbmVyYXRlU3RyaW5nIiwicG9zc2libGUiLCJpIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiUGhvbmUiLCJFbWFpbCIsIlVzZXJQcm9maWxlIiwiQXN0cm8iLCJDbGFzcyIsImZpZWxkcyIsInZhbGlkYXRvciIsIlZhbGlkYXRvcnMiLCJtaW5MZW5ndGgiLCJudW1iZXIiLCJ1dWlkIiwiZGVzY3JpcHRpb24iLCJVc2VyIiwiY29sbGVjdGlvbiIsIm5lc3RlZCIsIl9pc3MiLCJfaXNhIiwiZmlyc3RFbWFpbCIsImlzU2VydmVyIiwiZXh0ZW5kIiwibGFuZ3VhZ2UiLCJvcHRpb25hbCIsInJlcXVpcmVkIiwiYWRkIiwicmVtb3ZlIiwidXAiLCJkb3duIiwiZXhwb3J0cyIsIndhbGxhYnkiLCJsb2FkIiwiZmlsZXMiLCJ0ZXN0cyIsImNvbXBpbGVycyIsImJhYmVsIiwicHJlc2V0cyIsImVudiIsInRlc3RGcmFtZXdvcmsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjO0FBQUNDLFNBQU8sRUFBQyxNQUFJQztBQUFiLENBQWQ7QUFBbUQsSUFBSUMsSUFBSjtBQUFTSixNQUFNLENBQUNLLElBQVAsQ0FBWSxhQUFaLEVBQTBCO0FBQUNELE1BQUksQ0FBQ0UsQ0FBRCxFQUFHO0FBQUNGLFFBQUksR0FBQ0UsQ0FBTDtBQUFPOztB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QjtBQUZ5QixTQUF4QjtBQURKLE9BVk47QUFnQkxDLFNBQUcsRUFBRTtBQUNIOUgsWUFBSSxFQUFFO0FBREgsT0FoQkE7QUFtQkwrSCxtQkFBYSxFQUFFO0FBbkJWLEtBQVA7QUFxQkQsR0E1QkQiLCJmaWxlIjoiL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhUVFAgfSBmcm9tIFwibWV0ZW9yL2h0dHBcIjtcbmltcG9ydCB7IE1ldGVvciB9IGZyb20gXCJtZXRlb3IvbWV0ZW9yXCI7XG5pbXBvcnQge1xuICBERUZDT045LFxuICBERUZDT043LFxuICBERUZDT041LFxuICBERUZDT040LFxuICBERUZDT04zLFxuICBERUZDT04yLFxuICBERUZDT04xLFxufSBmcm9tIFwiL2RlYnVnLmpzb25cIjtcblxuaW1wb3J0IHV0aWwgZnJvbSBcInV0aWxcIjtcbmltcG9ydCB7IFVTRVJfQUNUSU9OX0FDVElWQVRFIH0gZnJvbSBcIi4uLy4uLy4uL2xpYi9jb25zdGFudHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3VkcnVuQ29udGVudFNlcnZpY2VzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3QgYXN5bmNIdHRwID0gdXRpbC5wcm9taXNpZnkoSFRUUC5wb3N0KTtcblxuICAgIHRoaXMuc2VuZFJlcXVlc3QgPSAodXJsLCBxdWVyeSwgYXN5bmMgPSBmYWxzZSkgPT4ge1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyh1cmwpO1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIlF1ZXJ5IHN0cmluZy4uLlwiKTtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocXVlcnksIG51bGwsIDIpKTtcbiAgICAgIGNvbnN0IHN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgICBpZiAocXVlcnkpIHtcbiAgICAgICAgaWYgKHF1ZXJ5LmhlYWRlcnMpIHtcbiAgICAgICAgICBxdWVyeS5oZWFkZXJzW1wiQVBJS0VZXCJdID0gTWV0ZW9yLnNldHRpbmdzLmFwaUtleTtcbiAgICAgICAgICBxdWVyeS5oZWFkZXJzW1wic3RyaWN0U1NMXCJdID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcXVlcnkuaGVhZGVycyA9IHtcbiAgICAgICAgICAgIEFQSUtFWTogTWV0ZW9yLnNldHRpbmdzLmFwaUtleSxcbiAgICAgICAgICAgIHN0cmljdFNTTDogZmFsc2UsXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcXVlcnkgPSB7XG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgQVBJS0VZOiBNZXRlb3Iuc2V0dGluZ3MuYXBpS2V5LFxuICAgICAgICAgICAgc3RyaWN0U1NMOiBmYWxzZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZXNwb25zZSA9IEhUVFAucG9zdCh1cmwsIHF1ZXJ5KTtcbiAgICAgIGNvbnN0IGV4ZWN1dGlvblRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHN0YXJ0VGltZTtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJDYWxsIHRvIHNlcnZlciB0b29rOiBcIiArIGV4ZWN1dGlvblRpbWUpO1xuXG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gMjAwKSB7XG4gICAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGxvY2FsRXJyb3IgPSBuZXcgTWV0ZW9yLkVycm9yKFxuICAgICAgICAgIFwiSW52YWxpZCByZXNwb25zZSBzdGF0dXMgY29kZTogXCIgKyByZXNwb25zZS5zdGF0dXNDb2RlXG4gICAgICAgICk7XG4gICAgICAgIERFRkNPTjEgJiYgY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgIERFRkNPTjEgJiYgY29uc29sZS5sb2cobG9jYWxFcnJvcik7XG4gICAgICAgIHRocm93IGxvY2FsRXJyb3I7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuc2VuZFJlcXVlc3RBc3luYyA9IGFzeW5jICh1cmwsIHF1ZXJ5KSA9PiB7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKHVybCk7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiUXVlcnkgc3RyaW5nLi4uXCIpO1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShxdWVyeSwgbnVsbCwgMikpO1xuICAgICAgY29uc3Qgc3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAgIGlmIChxdWVyeSkge1xuICAgICAgICBpZiAocXVlcnkuaGVhZGVycykge1xuICAgICAgICAgIHF1ZXJ5LmhlYWRlcnNbXCJBUElLRVlcIl0gPSBNZXRlb3Iuc2V0dGluZ3MuYXBpS2V5O1xuICAgICAgICAgIHF1ZXJ5LmhlYWRlcnNbXCJzdHJpY3RTU0xcIl0gPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBxdWVyeS5oZWFkZXJzID0ge1xuICAgICAgICAgICAgQVBJS0VZOiBNZXRlb3Iuc2V0dGluZ3MuYXBpS2V5LFxuICAgICAgICAgICAgc3RyaWN0U1NMOiBmYWxzZSxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBxdWVyeSA9IHtcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICBBUElLRVk6IE1ldGVvci5zZXR0aW5ncy5hcGlLZXksXG4gICAgICAgICAgICBzdHJpY3RTU0w6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXN5bmNIdHRwKHVybCwgcXVlcnkpO1xuICAgICAgY29uc3QgZXhlY3V0aW9uVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gc3RhcnRUaW1lO1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIkNhbGwgdG8gc2VydmVyIHRvb2s6IFwiICsgZXhlY3V0aW9uVGltZSk7XG5cbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gNDAwKSB7XG4gICAgICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgbG9jYWxFcnJvciA9IG5ldyBNZXRlb3IuRXJyb3IoXG4gICAgICAgICAgICBcIkludmFsaWQgcmVzcG9uc2Ugc3RhdHVzIGNvZGU6IFwiICsgcmVzcG9uc2Uuc3RhdHVzQ29kZVxuICAgICAgICAgICk7XG4gICAgICAgICAgREVGQ09OMSAmJiBjb25zb2xlLmxvZyhyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICBERUZDT04xICYmIGNvbnNvbGUubG9nKGxvY2FsRXJyb3IpO1xuICAgICAgICAgIHRocm93IGxvY2FsRXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgdGVzdF9jb25uZWN0aW9uKCkge1xuICAgIGxldCBzZXJ2aWNlVXJsID0gYCR7TWV0ZW9yLnNldHRpbmdzLmRydXBhbFRlc3RDb25uZWN0aW9ufWA7XG4gICAgc2VydmljZVVybCA9IHNlcnZpY2VVcmwucmVwbGFjZSgvKFteOl1cXC8pXFwvKy9nLCBcIiQxXCIpO1xuICAgIHJldHVybiB0aGlzLnNlbmRSZXF1ZXN0KHNlcnZpY2VVcmwsIHt9KTtcbiAgfVxuXG4gIHF1ZXJ5T3JkZXIoc2VhcmNoVGV4dCkge1xuICAgIGxldCBzZXJ2aWNlVXJsID0gYCR7TWV0ZW9yLnNldHRpbmdzLmRydXBhbE9yZGVyUXVlcnl9YDtcbiAgICBzZXJ2aWNlVXJsID0gc2VydmljZVVybC5yZXBsYWNlKC8oW146XVxcLylcXC8rL2csIFwiJDFcIik7XG4gICAgLy9sZXQgb3JkZXJzdGF0ZSA9ICczOTEnO1xuICAgIGxldCBxdWVyeSA9IHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgcXVlcnk6IHNlYXJjaFRleHQsXG4gICAgICB9LFxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMuc2VuZFJlcXVlc3Qoc2VydmljZVVybCwgcXVlcnkpO1xuICB9XG5cbiAgcXVlcnlPcmRlclN0YXRlKHN0YXRlLCBsaW1pdCkge1xuICAgIGxldCBzZXJ2aWNlVXJsID0gYCR7TWV0ZW9yLnNldHRpbmdzLmRydXBhbE9yZGVyUXVlcnl9YDtcbiAgICBzZXJ2aWNlVXJsID0gc2VydmljZVVybC5yZXBsYWNlKC8oW146XVxcLylcXC8rL2csIFwiJDFcIik7XG4gICAgLy9sZXQgb3JkZXJzdGF0ZSA9ICczOTEnO1xuICAgIGxldCBxdWVyeSA9IHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZmllbGRfb3JkZXJfc3RhdGU6IHN0YXRlLFxuICAgICAgICBxdWVyeV9saW1pdDogbGltaXQsXG4gICAgICB9LFxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMuc2VuZFJlcXVlc3Qoc2VydmljZVVybCwgcXVlcnkpO1xuICB9XG5cbiAgcXVlcnlPcmRlckJ5UGVyc29uSWQoc2VhcmNoVGV4dCkge1xuICAgIGxldCBzZXJ2aWNlVXJsID0gYCR7TWV0ZW9yLnNldHRpbmdzLmRydXBhbE9yZGVyUXVlcnl9YDtcbiAgICBzZXJ2aWNlVXJsID0gc2VydmljZVVybC5yZXBsYWNlKC8oW146XVxcLylcXC8rL2csIFwiJDFcIik7XG4gICAgLy9sZXQgb3JkZXJzdGF0ZSA9ICczOTEnO1xuICAgIGxldCBxdWVyeSA9IHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZmllbGRfcGVyc29uaWQ6IHNlYXJjaFRleHQsXG4gICAgICB9LFxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMuc2VuZFJlcXVlc3Qoc2VydmljZVVybCwgcXVlcnkpO1xuICB9XG5cbiAgcXVlcnlSZWNlbnRPcmRlcnMoKSB7XG4gICAgbGV0IHNlcnZpY2VVcmwgPSBgJHtNZXRlb3Iuc2V0dGluZ3MuZHJ1cGFsT3JkZXJRdWVyeX1gO1xuICAgIHNlcnZpY2VVcmwgPSBzZXJ2aWNlVXJsLnJlcGxhY2UoLyhbXjpdXFwvKVxcLysvZywgXCIkMVwiKTtcbiAgICAvL2xldCBvcmRlcnN0YXRlID0gJzM5MSc7XG4gICAgbGV0IHF1ZXJ5ID0ge1xuICAgICAgZGF0YToge1xuICAgICAgICBxdWVyeV9saW1pdDogXCI1MFwiLFxuICAgICAgfSxcbiAgICB9O1xuICAgIHJldHVybiB0aGlzLnNlbmRSZXF1ZXN0KHNlcnZpY2VVcmwsIHF1ZXJ5KTtcbiAgfVxuXG4gIG1vdGhlcmNoZWNrcygpIHtcbiAgICBsZXQgc2VydmljZVVybCA9IGAke01ldGVvci5zZXR0aW5ncy5kcnVwYWxNb3RoZXJDaGVja31gO1xuICAgIHNlcnZpY2VVcmwgPSBzZXJ2aWNlVXJsLnJlcGxhY2UoLyhbXjpdXFwvKVxcLysvZywgXCIkMVwiKTtcbiAgICAvL2xldCBvcmRlcnN0YXRlID0gJzM5MSc7XG4gICAgbGV0IHF1ZXJ5ID0ge1xuICAgICAgZGF0YToge30sXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5zZW5kUmVxdWVzdChzZXJ2aWNlVXJsLCBxdWVyeSk7XG4gIH1cblxuICBxdWVyeU9yZGVyQnlPcmRlcklkKHNlYXJjaFRleHQpIHtcbiAgICBsZXQgc2VydmljZVVybCA9IGAke01ldGVvci5zZXR0aW5ncy5kcnVwYWxPcmRlclF1ZXJ5fWA7XG4gICAgc2VydmljZVVybCA9IHNlcnZpY2VVcmwucmVwbGFjZSgvKFteOl1cXC8pXFwvKy9nLCBcIiQxXCIpO1xuICAgIC8vbGV0IG9yZGVyc3RhdGUgPSAnMzkxJztcbiAgICBsZXQgcXVlcnkgPSB7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIGZpZWxkX29yZGVyaWQ6IHNlYXJjaFRleHQsXG4gICAgICB9LFxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMuc2VuZFJlcXVlc3Qoc2VydmljZVVybCwgcXVlcnkpO1xuICB9XG5cbiAgdXBkYXRlT3JkZXJCeU9yZGVySWQob3JkZXIpIHtcbiAgICBsZXQgc2VydmljZVVybCA9IGAke01ldGVvci5zZXR0aW5ncy5kcnVwYWxPcmRlclVwZGF0ZX1gO1xuICAgIHNlcnZpY2VVcmwgPSBzZXJ2aWNlVXJsLnJlcGxhY2UoLyhbXjpdXFwvKVxcLysvZywgXCIkMVwiKTtcbiAgICAvLyBqdXN0IHBhc3MgdGhlIG9yZGVyXG5cbiAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiQ2hlY2tpbmcgZGF0YSBpbiB1cGRhdGVPcmRlckJ5T3JkZXJJZFwiKTtcbiAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKG9yZGVyKTtcblxuICAgIC8vb3JkZXIuYWN0aW5nX3VpZCA9IHVzZXJPYmoudWlkO1xuICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJBZnRlci4uLlwiKTtcbiAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKG9yZGVyKTtcblxuICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2cob3JkZXIpO1xuXG4gICAgbGV0IHVwZGF0ZVN0cmVhbSA9IHtcbiAgICAgIG9yZGVyLFxuICAgIH07XG4gICAgdXBkYXRlU3RyZWFtLmRhdGEgPSB1cGRhdGVTdHJlYW0ub3JkZXI7XG4gICAgcmV0dXJuIHRoaXMuc2VuZFJlcXVlc3Qoc2VydmljZVVybCwgdXBkYXRlU3RyZWFtKTtcbiAgfVxuXG4gIGNyZWF0ZVBlcnNvbk9yZGVyKG9yZGVyKSB7XG4gICAgbGV0IHNlcnZpY2VVcmwgPSBgJHtNZXRlb3Iuc2V0dGluZ3MuZHJ1cGFsT3JkZXJDcmVhdGV9YDtcbiAgICBzZXJ2aWNlVXJsID0gc2VydmljZVVybC5yZXBsYWNlKC8oW146XVxcLylcXC8rL2csIFwiJDFcIik7XG4gICAgbGV0IHVwZGF0ZVN0cmVhbSA9IHtcbiAgICAgIG9yZGVyLFxuICAgIH07XG4gICAgdXBkYXRlU3RyZWFtLmRhdGEgPSB1cGRhdGVTdHJlYW0ub3JkZXI7XG4gICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyh1cGRhdGVTdHJlYW0ub3JkZXIpO1xuXG4gICAgbGV0IGRhdGFSZXBseSA9IHRoaXMuc2VuZFJlcXVlc3Qoc2VydmljZVVybCwgdXBkYXRlU3RyZWFtKTtcbiAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKGRhdGFSZXBseSk7XG4gICAgcmV0dXJuIGRhdGFSZXBseTtcbiAgfVxuXG4gIGdldFRlcm1zKHRlcm10eXBlKSB7XG4gICAgbGV0IHNlcnZpY2VVcmwgPSBgJHtNZXRlb3Iuc2V0dGluZ3MuZHJ1cGFsR2V0VGF4fWA7XG4gICAgc2VydmljZVVybCA9IHNlcnZpY2VVcmwucmVwbGFjZSgvKFteOl1cXC8pXFwvKy9nLCBcIiQxXCIpO1xuICAgIGxldCBxdWVyeSA9IHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgdGF4b25vbXlfdHlwZTogdGVybXR5cGUsXG4gICAgICB9LFxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMuc2VuZFJlcXVlc3Qoc2VydmljZVVybCwgcXVlcnkpO1xuICB9XG5cbiAgcXVlcnlUZXJtcyh0ZXJtdHlwZSwgc2VhcmNoVGV4dCkge1xuICAgIGxldCBzZXJ2aWNlVXJsID0gYCR7TWV0ZW9yLnNldHRpbmdzLmRydXBhbFF1ZXJ5VGF4fWA7XG4gICAgc2VydmljZVVybCA9IHNlcnZpY2VVcmwucmVwbGFjZSgvKFteOl1cXC8pXFwvKy9nLCBcIiQxXCIpO1xuICAgIGxldCBxdWVyeSA9IHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgdGF4b25vbXlfdHlwZTogdGVybXR5cGUsXG4gICAgICAgIHRheG9ub215X2F1dG9zZWFyY2g6IHNlYXJjaFRleHQsXG4gICAgICB9LFxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMuc2VuZFJlcXVlc3Qoc2VydmljZVVybCwgcXVlcnkpO1xuICB9XG5cbiAgcXVlcnlUZXJtc0NvdW50cnkoZGF0YUNvbnRleHQpIHtcbiAgICBsZXQgc2VydmljZVVybCA9IGAke01ldGVvci5zZXR0aW5ncy5kcnVwYWxRdWVyeVRheH1gO1xuICAgIHNlcnZpY2VVcmwgPSBzZXJ2aWNlVXJsLnJlcGxhY2UoLyhbXjpdXFwvKVxcLysvZywgXCIkMVwiKTtcbiAgICBsZXQgdGVybXR5cGUgPSBcImNvdW50cmllc1wiO1xuICAgIGxldCBxdWVyeSA9IHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgdGF4b25vbXlfdHlwZTogdGVybXR5cGUsXG4gICAgICAgIHRheG9ub215X3F1ZXJ5X2NvdW50cnk6IGRhdGFDb250ZXh0LFxuICAgICAgfSxcbiAgICB9O1xuICAgIHJldHVybiB0aGlzLnNlbmRSZXF1ZXN0KHNlcnZpY2VVcmwsIHF1ZXJ5KTtcbiAgfVxuXG4gIHF1ZXJ5UGVyc29uQnlJZChzZWFyY2hUZXh0KSB7XG4gICAgbGV0IHNlcnZpY2VVcmwgPSBgJHtNZXRlb3Iuc2V0dGluZ3MuZHJ1cGFsRW50aXR5UXVlcnl9YDtcbiAgICBzZXJ2aWNlVXJsID0gc2VydmljZVVybC5yZXBsYWNlKC8oW146XVxcLylcXC8rL2csIFwiJDFcIik7XG4gICAgbGV0IHF1ZXJ5ID0ge1xuICAgICAgZGF0YToge1xuICAgICAgICBmaWVsZF9wZXJzb25pZDogc2VhcmNoVGV4dCxcbiAgICAgICAgcXVlcnlfZG9tYWluOiBbXCJwZXJzb25cIl0sXG4gICAgICB9LFxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMuc2VuZFJlcXVlc3Qoc2VydmljZVVybCwgcXVlcnkpO1xuICB9XG5cbiAgcXVlcnlQZXJzb24oc2VhcmNoVGV4dCwgbWV0YSkge1xuICAgIGxldCBzZXJ2aWNlVXJsID0gYCR7TWV0ZW9yLnNldHRpbmdzLmRydXBhbEVudGl0eVF1ZXJ5fWA7XG4gICAgc2VydmljZVVybCA9IHNlcnZpY2VVcmwucmVwbGFjZSgvKFteOl1cXC8pXFwvKy9nLCBcIiQxXCIpO1xuICAgIGxldCBxdWVyeSA9IHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgcXVlcnk6IHNlYXJjaFRleHQsXG4gICAgICAgIHF1ZXJ5X2RvbWFpbjogW1wicGVyc29uXCJdLFxuICAgICAgICBxdWVyeV9saW1pdDogXCIxMDAwXCIsXG4gICAgICAgIG1ldGFfcmVzcG9uY2Vtb2RlOiBcInF1ZXJ5bW9kZVwiLFxuICAgICAgICBtZXRhX3F1ZXJ5X2VuZ2luZTogXCJmdWxsdGV4dFwiLFxuICAgICAgICBtZXRhX3F1ZXJ5X2FyZ3M6IG1ldGEsXG4gICAgICB9LFxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMuc2VuZFJlcXVlc3Qoc2VydmljZVVybCwgcXVlcnkpO1xuICB9XG5cbiAgcXVlcnlQZXJzb25BZHZhbmNlZChzZWFyY2hUZXh0KSB7XG4gICAgbGV0IHNlcnZpY2VVcmwgPSBgJHtNZXRlb3Iuc2V0dGluZ3MuZHJ1cGFsRW50aXR5UXVlcnl9YDtcbiAgICBzZXJ2aWNlVXJsID0gc2VydmljZVVybC5yZXBsYWNlKC8oW146XVxcLylcXC8rL2csIFwiJDFcIik7XG4gICAgbGV0IHF1ZXJ5ID0ge1xuICAgICAgZGF0YToge1xuICAgICAgICBxdWVyeTogc2VhcmNoVGV4dCxcbiAgICAgICAgcXVlcnlfZG9tYWluOiBbXCJwZXJzb25cIl0sXG4gICAgICAgIHF1ZXJ5X2xpbWl0OiBcIjIwMDBcIixcbiAgICAgICAgbWV0YV9yZXNwb25jZW1vZGU6IFwicXVlcnltb2RlXCIsXG4gICAgICAgIG1ldGFfcXVlcnlfZW5naW5lOiBcInBlcnNvbmFkdmFuY2VkXCIsXG4gICAgICAgIHBlcnNvbmFkdmFuY2VkX2Rpc3RpbmN0OiBcIjFcIixcbiAgICAgIH0sXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5zZW5kUmVxdWVzdChzZXJ2aWNlVXJsLCBxdWVyeSk7XG4gIH1cblxuICBxdWVyeVJvbGVBZHZhbmNlZChzZWFyY2hUZXh0LCBxdWVyeVJvbGVzKSB7XG4gICAgbGV0IHNlcnZpY2VVcmwgPSBgJHtNZXRlb3Iuc2V0dGluZ3MuZHJ1cGFsRW50aXR5UXVlcnl9YDtcbiAgICBzZXJ2aWNlVXJsID0gc2VydmljZVVybC5yZXBsYWNlKC8oW146XVxcLylcXC8rL2csIFwiJDFcIik7XG4gICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhxdWVyeVJvbGVzKTtcbiAgICBsZXQgcXVlcnkgPSB7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIHF1ZXJ5OiBzZWFyY2hUZXh0LFxuICAgICAgICBxdWVyeV9kb21haW46IFtcInBlcnNvblwiXSxcbiAgICAgICAgcXVlcnlfbGltaXQ6IFwiMjAwMFwiLFxuICAgICAgICBtZXRhX3Jlc3BvbmNlbW9kZTogXCJxdWVyeW1vZGVcIixcbiAgICAgICAgbWV0YV9xdWVyeV9lbmdpbmU6IFwicm9sZWFkdmFuY2VkXCIsXG4gICAgICAgIGFkdmFuY2Vkcm9sZV9yb2xlczogcXVlcnlSb2xlcy5hZHZhbmNlZHJvbGVfcm9sZXMsXG4gICAgICAgIGFkdmFuY2Vkcm9sZV9kZXRhaWxlZGNhdGVnb3J5cm9sZTpcbiAgICAgICAgICBxdWVyeVJvbGVzLmFkdmFuY2Vkcm9sZV9kZXRhaWxlZGNhdGVnb3J5cm9sZSxcbiAgICAgICAgYWR2YW5jZWRyb2xlX2Jhc2VjYXRlZ29yeXJvbGU6IHF1ZXJ5Um9sZXMuYWR2YW5jZWRyb2xlX2Jhc2VjYXRlZ29yeXJvbGUsXG4gICAgICAgIGFkdmFuY2Vkcm9sZV9vcmdhbmlzYXRpb246IHF1ZXJ5Um9sZXMuYWR2YW5jZWRyb2xlX29yZ2FuaXNhdGlvbixcbiAgICAgICAgYWR2YW5jZWRyb2xlX2NvdW50cnlvZmp1cmlzZGljdGlvbjpcbiAgICAgICAgICBxdWVyeVJvbGVzLmFkdmFuY2Vkcm9sZV9jb3VudHJ5b2ZqdXJpc2RpY3Rpb24sXG4gICAgICB9LFxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMuc2VuZFJlcXVlc3Qoc2VydmljZVVybCwgcXVlcnkpO1xuICB9XG5cbiAgbGl2ZXN0cmVhbShzZWFyY2hUZXh0KSB7XG4gICAgbGV0IHNlcnZpY2VVcmwgPSBgJHtNZXRlb3Iuc2V0dGluZ3MuZHJ1cGFsRW50aXR5UXVlcnl9YDtcbiAgICBzZXJ2aWNlVXJsID0gc2VydmljZVVybC5yZXBsYWNlKC8oW146XVxcLylcXC8rL2csIFwiJDFcIik7XG4gICAgLy9sZXQgb3JkZXJzdGF0ZSA9ICczOTEnO1xuICAgIGxldCBxdWVyeSA9IHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZmllbGRfcGFyZW50X3JlZmVyZW5jZTogc2VhcmNoVGV4dCxcbiAgICAgICAgcXVlcnlfZG9tYWluOiBbXCJsaXZlc3RyZWFtXCJdLFxuICAgICAgICBxdWVyeV9saW1pdDogXCI1MFwiLFxuICAgICAgICBtZXRhX3Jlc3BvbmNlbW9kZTogXCJxdWVyeW1vZGVcIixcbiAgICAgICAgbWV0YV9xdWVyeV9lbmdpbmU6IFwibGl2ZXN0cmVhbVwiLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhxdWVyeSk7XG5cbiAgICByZXR1cm4gdGhpcy5zZW5kUmVxdWVzdChzZXJ2aWNlVXJsLCBxdWVyeSk7XG4gIH1cblxuICBwcm9jZXNzT3JkZXIocmVxdWVzdCkge1xuICAgIGxldCBzZXJ2aWNlVXJsID0gYCR7TWV0ZW9yLnNldHRpbmdzLmRydXBhbFByb2Nlc3N9YDtcbiAgICBzZXJ2aWNlVXJsID0gc2VydmljZVVybC5yZXBsYWNlKC8oW146XVxcLylcXC8rL2csIFwiJDFcIik7XG4gICAgbGV0IHF1ZXJ5ID0ge1xuICAgICAgZGF0YToge1xuICAgICAgICBmaWVsZF9vcmRlcmlkOiByZXF1ZXN0LmZpZWxkX29yZGVyaWQsXG4gICAgICAgIGZpZWxkX29yZGVyX3N0YXRlX3JlcXVlc3RfbmV4dDogcmVxdWVzdC5maWVsZF9vcmRlcl9zdGF0ZV9yZXF1ZXN0X25leHQsXG4gICAgICB9LFxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMuc2VuZFJlcXVlc3Qoc2VydmljZVVybCwgcXVlcnkpO1xuICB9XG5cbiAgYXN5bmMgZ2V0VXNlclJvbGVzKHVpZCkge1xuICAgIGxldCBzZXJ2aWNlVXJsID0gYCR7TWV0ZW9yLnNldHRpbmdzLmRydXBhbFVzZXJVcmx9YDtcbiAgICBzZXJ2aWNlVXJsID0gc2VydmljZVVybC5yZXBsYWNlKC8oW146XVxcLylcXC8rL2csIFwiJDFcIik7XG5cbiAgICBpZiAoIXVpZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgbGV0IHF1ZXJ5ID0ge1xuICAgICAgZGF0YTogeyB1aWQgfSxcbiAgICB9O1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuc2VuZFJlcXVlc3RBc3luYyhzZXJ2aWNlVXJsLCBxdWVyeSk7XG4gICAgICAvL3JvbGVzIGNvbnRhaW4gYXJyYXlzIG9mIGNvbXBhbnkgaWRzXG4gICAgICBjb25zdCByb2xlcyA9IHtcbiAgICAgICAgYWRtaW46IHJlc3BvbnNlICYmIHJlc3BvbnNlLmFkbWluX2luX2NvbXBhbmllcyxcbiAgICAgICAgbWVtYmVyOiByZXNwb25zZSAmJiByZXNwb25zZS5tZW1iZXJfaW5fY29tcGFuaWVzLFxuICAgICAgfTtcbiAgICAgIHJldHVybiByb2xlcztcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiRXJyb3IgaW4gZ2V0VXNlclJvbGVzXCIpO1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhlKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBnZXRDb21wYW55VXNlcnMoY29tcGFueUlkKSB7XG4gICAgbGV0IHNlcnZpY2VVcmwgPSBgJHtNZXRlb3Iuc2V0dGluZ3MuZHJ1cGFsQ29tcGFueVVzZXJzVXJsfWA7XG4gICAgc2VydmljZVVybCA9IHNlcnZpY2VVcmwucmVwbGFjZSgvKFteOl1cXC8pXFwvKy9nLCBcIiQxXCIpO1xuICAgIGxldCBxdWVyeSA9IHtcbiAgICAgIGRhdGE6IHsgZmllbGRfY29tcGFueV9pZDogY29tcGFueUlkIH0sXG4gICAgfTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBjb21wYW55ID0gYXdhaXQgdGhpcy5zZW5kUmVxdWVzdEFzeW5jKHNlcnZpY2VVcmwsIHF1ZXJ5KTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJDb21wYW55IHVzZXJzIHJldHVybmVkOlwiKTtcblxuICAgICAgbGV0IGFkbWluaXN0cmF0b3JzID0gW107XG4gICAgICBpZiAoY29tcGFueSAmJiBjb21wYW55LmZpZWxkX2NvbXBhbnlfYWRtaW5pc3RyYXRvcnMpIHtcbiAgICAgICAgbGV0IHRlbXAgPSBjb21wYW55LmZpZWxkX2NvbXBhbnlfYWRtaW5pc3RyYXRvcnMubWFwKCh1c2VyKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHVzZXI7XG4gICAgICAgIH0pO1xuICAgICAgICBhZG1pbmlzdHJhdG9ycyA9IGFkbWluaXN0cmF0b3JzLmNvbmNhdCh0ZW1wKTtcbiAgICAgIH1cblxuICAgICAgbGV0IG1lbWJlcnMgPSBbXTtcbiAgICAgIGlmIChjb21wYW55ICYmIGNvbXBhbnkuZmllbGRfY29tcGFueV9tZW1iZXJzKSB7XG4gICAgICAgIGxldCB0ZW1wID0gY29tcGFueS5maWVsZF9jb21wYW55X21lbWJlcnMubWFwKCh1c2VyKSA9PiB7XG4gICAgICAgICAgdXNlci5zdGF0dXMgPSBcImFjdGl2ZVwiO1xuICAgICAgICAgIHJldHVybiB1c2VyO1xuICAgICAgICB9KTtcbiAgICAgICAgbWVtYmVycyA9IG1lbWJlcnMuY29uY2F0KHRlbXApO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29tcGFueSAmJiBjb21wYW55LmZpZWxkX2NvbXBhbnlfbWVtYmVyc19pbmFjdGl2ZSkge1xuICAgICAgICBsZXQgdGVtcCA9IGNvbXBhbnkuZmllbGRfY29tcGFueV9tZW1iZXJzX2luYWN0aXZlLm1hcCgodXNlcikgPT4ge1xuICAgICAgICAgIHVzZXIuc3RhdHVzID0gXCJpbmFjdGl2ZVwiO1xuICAgICAgICAgIHJldHVybiB1c2VyO1xuICAgICAgICB9KTtcbiAgICAgICAgbWVtYmVycyA9IG1lbWJlcnMuY29uY2F0KHRlbXApO1xuICAgICAgfVxuICAgICAgY29uc3QgdXNlcnMgPSB7XG4gICAgICAgIGNvbXBhbnlJZCxcbiAgICAgICAgYWRtaW5zOiBhZG1pbmlzdHJhdG9ycyxcbiAgICAgICAgbWVtYmVyczogbWVtYmVycyxcbiAgICAgIH07XG5cbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2codXNlcnMpO1xuICAgICAgcmV0dXJuIHVzZXJzO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJFcnJvciBpbiBnZXRDb21wYW55VXNlcnNcIik7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKGUpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIG1hbmFnZVVzZXIodWlkLCBhY3Rpb24sIGNvbXBhbnlJZCkge1xuICAgIGxldCBzZXJ2aWNlVXJsID0gYCR7TWV0ZW9yLnNldHRpbmdzLmRydXBhbE1hbmFnZVVzZXJVcmx9YDtcbiAgICBzZXJ2aWNlVXJsID0gc2VydmljZVVybC5yZXBsYWNlKC8oW146XVxcLylcXC8rL2csIFwiJDFcIik7XG4gICAgY29uc3QgY29udGVudFNlcnZlckFjdGlvbiA9XG4gICAgICBhY3Rpb24gPT09IFVTRVJfQUNUSU9OX0FDVElWQVRFID8gXCJhY3RpdmF0ZVVzZXJcIiA6IFwiZGlzYWJsZVVzZXJcIjtcbiAgICBsZXQgcXVlcnkgPSB7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIHVpZCxcbiAgICAgICAgYWN0aW9uOiBjb250ZW50U2VydmVyQWN0aW9uLFxuICAgICAgICBmaWVsZF9jb21wYW55X2lkOiBjb21wYW55SWQsXG4gICAgICB9LFxuICAgIH07XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5zZW5kUmVxdWVzdEFzeW5jKHNlcnZpY2VVcmwsIHF1ZXJ5KTtcbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiRXJyb3IgaW4gbWFuYWdlVXNlclwiKTtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coZSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZHJ1cGFsSW5zZXJ0VXNlcih1c2VyKSB7XG4gICAgbGV0IHNlcnZpY2VVcmwgPSBgJHtNZXRlb3Iuc2V0dGluZ3MuZHJ1cGFsSW5zZXJ0VXNlcn1gO1xuICAgIHNlcnZpY2VVcmwgPSBzZXJ2aWNlVXJsLnJlcGxhY2UoLyhbXjpdXFwvKVxcLysvZywgXCIkMVwiKTtcbiAgICBsZXQgcXVlcnkgPSB7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIHVzZXJfbWFpbDogdXNlci5tYWlsLFxuICAgICAgICB1c2VyX25hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgc2VjcmV0UXVlc3Rpb246IHVzZXIuc2VjcmV0UXVlc3Rpb24sXG4gICAgICAgIHNlY3JldEFuc3dlcjogdXNlci5zZWNyZXRBbnN3ZXIsXG4gICAgICAgIHB3OiB1c2VyLnB3LFxuICAgICAgICBhY3Rpb246IFwibmV3VXNlclwiLFxuICAgICAgfSxcbiAgICB9O1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuc2VuZFJlcXVlc3RBc3luYyhzZXJ2aWNlVXJsLCBxdWVyeSk7XG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIkVycm9yIGluIGluc2VydFVzZXJcIik7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKGUpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGFkZFVzZXIodXNlciwgY29tcGFueUlkKSB7XG4gICAgbGV0IHNlcnZpY2VVcmwgPSBgJHtNZXRlb3Iuc2V0dGluZ3MuZHJ1cGFsTWFuYWdlVXNlclVybH1gO1xuICAgIHNlcnZpY2VVcmwgPSBzZXJ2aWNlVXJsLnJlcGxhY2UoLyhbXjpdXFwvKVxcLysvZywgXCIkMVwiKTtcbiAgICBsZXQgcXVlcnkgPSB7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIHVzZXJfbWFpbDogdXNlci5tYWlsLFxuICAgICAgICB1c2VyX25hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgYWN0aW9uOiBcIm5ld1VzZXJcIixcbiAgICAgICAgZmllbGRfY29tcGFueV9pZDogY29tcGFueUlkLFxuICAgICAgfSxcbiAgICB9O1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuc2VuZFJlcXVlc3RBc3luYyhzZXJ2aWNlVXJsLCBxdWVyeSk7XG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIkVycm9yIGluIG1hbmFnZVVzZXJcIik7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKGUpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHNlbmRRdWVzdGlvbihxdWVyeSkge1xuICAgIGxldCBzZXJ2aWNlVXJsID0gYCR7TWV0ZW9yLnNldHRpbmdzLmRydXBhbENvbnRhY3RVcmx9YDtcbiAgICBzZXJ2aWNlVXJsID0gc2VydmljZVVybC5yZXBsYWNlKC8oW146XVxcLylcXC8rL2csIFwiJDFcIik7XG4gICAgbGV0IHF1ZXJ5T3B0aW9ucyA9IHtcbiAgICAgIGRhdGE6IHF1ZXJ5LFxuICAgIH07XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5zZW5kUmVxdWVzdEFzeW5jKHNlcnZpY2VVcmwsIHF1ZXJ5T3B0aW9ucyk7XG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIkVycm9yIGluIHNlbmRRdWVzdGlvblwiKTtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coZSk7XG4gICAgfVxuICB9XG4gIGFzeW5jIGdldEFydGljbGUocXVlcnkpIHtcbiAgICBsZXQgc2VydmljZVVybCA9IGAke01ldGVvci5zZXR0aW5ncy5kcnVwYWxHZXRBcnRpY2xlVXJsfWA7XG4gICAgc2VydmljZVVybCA9IHNlcnZpY2VVcmwucmVwbGFjZSgvKFteOl1cXC8pXFwvKy9nLCBcIiQxXCIpO1xuICAgIGxldCBxdWVyeU9wdGlvbnMgPSB7XG4gICAgICBkYXRhOiBxdWVyeSxcbiAgICB9O1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuc2VuZFJlcXVlc3RBc3luYyhzZXJ2aWNlVXJsLCBxdWVyeU9wdGlvbnMpO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJFcnJvciBpbiBnZXRBcnRpY2xlXCIpO1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhlKTtcbiAgICB9XG4gIH1cbiAgLy8gYXN5bmMgZ2V0QXJ0aWNsZShxdWVyeSkge1xuICAvLyAgIGxldCBzZXJ2aWNlVXJsID0gYCR7TWV0ZW9yLnNldHRpbmdzLmRydXBhbEdldEFydGljbGVVcmx9YDtcbiAgLy8gICBzZXJ2aWNlVXJsID0gc2VydmljZVVybC5yZXBsYWNlKC8oW146XVxcLylcXC8rL2csIFwiJDFcIik7XG4gIC8vICAgbGV0IHF1ZXJ5T3B0aW9ucyA9IHtcbiAgLy8gICAgIGRhdGE6IHF1ZXJ5XG4gIC8vICAgfTtcbiAgLy8gICB0cnkge1xuICAvLyAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnNlbmRSZXF1ZXN0QXN5bmMoc2VydmljZVVybCwgcXVlcnlPcHRpb25zKTtcbiAgLy8gICAgIHJldHVybiByZXNwb25zZTtcbiAgLy8gICB9IGNhdGNoIChlKSB7XG4gIC8vICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiRXJyb3IgaW4gZ2V0QXJ0aWNsZVwiKTtcbiAgLy8gICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coZSk7XG4gIC8vICAgfVxuICAvLyB9XG4gIGFzeW5jIGZpbGVhcmVhR2V0RmlsZShxdWVyeSkge1xuICAgIGxldCBzZXJ2aWNlVXJsID0gYCR7TWV0ZW9yLnNldHRpbmdzLmRydXBhbEZpbGVhcmVhR2V0RmlsZX1gO1xuICAgIHNlcnZpY2VVcmwgPSBzZXJ2aWNlVXJsLnJlcGxhY2UoLyhbXjpdXFwvKVxcLysvZywgXCIkMVwiKTtcbiAgICBsZXQgcXVlcnlPcHRpb25zID0ge1xuICAgICAgZGF0YTogcXVlcnksXG4gICAgfTtcbiAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiUHJlcGFyaW5nIHRvIGdldCB0aGUgZmlsZS4uLiFcIik7XG4gICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhxdWVyeSk7XG5cbiAgICB0cnkge1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIlNlbmRpbmcgUmVxdWVzdC4uLiFcIik7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuc2VuZFJlcXVlc3RBc3luYyhzZXJ2aWNlVXJsLCBxdWVyeU9wdGlvbnMpO1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIkdldCBJdGVtIGJhY2sgZnJvbSBSZXF1ZXN0XCIpO1xuXG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIkVycm9yIGluIGZpbGVhcmVhR2V0SXRlbVwiKTtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coZSk7XG4gICAgfVxuICB9XG4gIGFzeW5jIGZpbGVhcmVhUXVlcnkocXVlcnkpIHtcbiAgICBsZXQgc2VydmljZVVybCA9IGAke01ldGVvci5zZXR0aW5ncy5kcnVwYWxGaWxlYXJlYVF1ZXJ5fWA7XG4gICAgc2VydmljZVVybCA9IHNlcnZpY2VVcmwucmVwbGFjZSgvKFteOl1cXC8pXFwvKy9nLCBcIiQxXCIpO1xuICAgIGxldCBxdWVyeU9wdGlvbnMgPSB7XG4gICAgICBkYXRhOiBxdWVyeSxcbiAgICB9O1xuICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJmaWxlYXJlYVF1ZXJ5IEdldHRpbmcgY29udGVudC4uLiFcIik7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnNlbmRSZXF1ZXN0QXN5bmMoc2VydmljZVVybCwgcXVlcnlPcHRpb25zKTtcbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiRXJyb3IgaW4gZmlsZWFyZWFRdWVyeVwiKTtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coZSk7XG4gICAgfVxuICB9XG4gIGFzeW5jIGRydXBhbEdldFVzZXIodWlkKSB7XG4gICAgbGV0IHNlcnZpY2VVcmwgPSBgJHtNZXRlb3Iuc2V0dGluZ3MuZHJ1cGFsR2V0VXNlcn1gO1xuICAgIHNlcnZpY2VVcmwgPSBzZXJ2aWNlVXJsLnJlcGxhY2UoLyhbXjpdXFwvKVxcLysvZywgXCIkMVwiKTtcbiAgICBsZXQgcXVlcnkgPSB7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIG1ldGhvZDogXCJ1aWRcIixcbiAgICAgICAgdmFsdWU6IHVpZCxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuc2VuZFJlcXVlc3RBc3luYyhzZXJ2aWNlVXJsLCBxdWVyeSk7XG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIkVycm9yIGluIGdldFVzZXJcIik7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKGUpO1xuICAgIH1cbiAgfVxuICBhc3luYyBnZXRVc2VyQnlBdHRyaWJ1dGUobWV0aG9kLCB2YWx1ZSkge1xuICAgIGxldCBzZXJ2aWNlVXJsID0gYCR7TWV0ZW9yLnNldHRpbmdzLmRydXBhbEdldFVzZXJ9YDtcbiAgICBzZXJ2aWNlVXJsID0gc2VydmljZVVybC5yZXBsYWNlKC8oW146XVxcLylcXC8rL2csIFwiJDFcIik7XG4gICAgbGV0IHF1ZXJ5ID0ge1xuICAgICAgZGF0YToge1xuICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5zZW5kUmVxdWVzdEFzeW5jKHNlcnZpY2VVcmwsIHF1ZXJ5KTtcbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiRXJyb3IgaW4gZ2V0VXNlclwiKTtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coZSk7XG4gICAgfVxuICB9XG59XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkga2FjcGVyIG9uIDYvOC8xNi5cbiAqL1xuLypcblwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBGaWxlTWFuYWdlcihiYXNlRGlyZWN0b3J5KSB7XG4gIHZhciBwYXRoID0gTnBtLnJlcXVpcmUoJ3BhdGgnKTtcbiAgdmFyIGZzID0gTnBtLnJlcXVpcmUoJ2ZzJyk7XG4gIGJhc2VEaXJlY3RvcnkgPSBiYXNlRGlyZWN0b3J5LnRyaW0oJy8nKTtcbiAgbGV0IGZpbGVzUm9vdFBhdGggPSBNZXRlb3Iuc2V0dGluZ3MuZmlsZXNSb290UGF0aDtcbiAgdmFyIGJhc2VQYXRoID0gYCR7ZmlsZXNSb290UGF0aH0vJHtiYXNlRGlyZWN0b3J5fS9gO1xuICBiYXNlUGF0aCA9IGJhc2VQYXRoLnJlcGxhY2UoJy8vJywgJy8nKTtcblxuICB0aGlzLnJlYWRJbnB1dEZpbGVBc0J1ZmZlciA9IGZ1bmN0aW9uIChmaWxlTmFtZSkge1xuICAgIHRyeSB7XG4gICAgICB2YXIgZmlsZUJ1ZmZlciA9IGZzLnJlYWRGaWxlU3luYyhiYXNlUGF0aCArIGZpbGVOYW1lKTtcbiAgICAgIHJldHVybiBmaWxlQnVmZmVyO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRmlsZSAke2ZpbGVOYW1lfSBub3QgZm91bmRgKTtcbiAgICB9XG4gIH07XG5cbiAgdGhpcy5yZWFkT3V0cHV0RmlsZUFzQnVmZmVyID0gZnVuY3Rpb24gKGZpbGVOYW1lKSB7XG4gICAgdmFyIGZpbGVCdWZmZXIgPSBmcy5yZWFkRmlsZVN5bmMoYmFzZVBhdGggKyAnb3V0LycgKyBmaWxlTmFtZSk7XG4gICAgcmV0dXJuIGZpbGVCdWZmZXI7XG4gIH07XG5cbiAgdGhpcy53cml0ZUJ1ZmZlckFzSW5wdXRGaWxlID0gZnVuY3Rpb24gKGZpbGVOYW1lLCB3cml0ZUJ1ZmZlcikge1xuICAgIGNyZWF0ZVBhdGhJZkRvZXNOb3RFeGlzdChiYXNlUGF0aCk7XG4gICAgZnMud3JpdGVGaWxlU3luYyhiYXNlUGF0aCArIGZpbGVOYW1lLCB3cml0ZUJ1ZmZlcik7XG4gIH07XG5cbiAgdGhpcy53cml0ZUJ1ZmZlckFzT3V0cHV0RmlsZSA9IGZ1bmN0aW9uIChmaWxlTmFtZSwgd3JpdGVCdWZmZXIpIHtcbiAgICBsZXQgb3V0UGF0aCA9IGJhc2VQYXRoICsgJ291dC8nO1xuICAgIGNyZWF0ZVBhdGhJZkRvZXNOb3RFeGlzdChvdXRQYXRoKTtcbiAgICBmcy53cml0ZUZpbGVTeW5jKG91dFBhdGggKyBmaWxlTmFtZSwgd3JpdGVCdWZmZXIpO1xuICB9O1xuXG4gIHRoaXMuc2V0QmFzZURpcmVjdG9yeSA9IGZ1bmN0aW9uIChiYXNlRGlyZWN0b3J5KSB7XG4gICAgYmFzZURpcmVjdG9yeSA9IGJhc2VEaXJlY3RvcnkudHJpbSgnLycpO1xuICAgIGJhc2VQYXRoID0gYCR7ZmlsZXNSb290UGF0aH0vJHtiYXNlRGlyZWN0b3J5fS9gO1xuICB9O1xuXG4gIHRoaXMuZ2V0QmFzZVBhdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGJhc2VQYXRoO1xuICB9O1xuXG4gIHRoaXMuZ2V0QmFzZU91dFBhdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGJhc2VQYXRoICsgJ291dCc7XG4gIH07XG5cbiAgdGhpcy5saXN0RmlsZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZzLnJlYWRkaXJTeW5jKGJhc2VQYXRoKS5yZWR1Y2UoZnVuY3Rpb24gKGxpc3QsIGZpbGUpIHtcbiAgICAgIHZhciBuYW1lID0gcGF0aC5qb2luKGJhc2VQYXRoLCBmaWxlKTtcbiAgICAgIGlmICghZnMuc3RhdFN5bmMobmFtZSkuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICBsaXN0LnB1c2goZmlsZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbGlzdDtcbiAgICB9LCBbXSk7XG4gIH07XG5cbiAgdmFyIGNyZWF0ZVBhdGhJZkRvZXNOb3RFeGlzdCA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgdmFyIGdldFBhcmVudFBhdGggPSBmdW5jdGlvbiAocGF0aCkge1xuICAgICAgLy8gICByb290L2RpcjEvZGlyMi8gLT4gcm9vdC9kaXIxL2RpcjIgLT4gcm9vdC9kaXIxXG4gICAgICBwYXRoID0gcGF0aC5yZXBsYWNlKC9cXC8rJC8sICcnKTtcbiAgICAgIGxldCBsYXN0U2xhc2hJbmRleCA9IHBhdGgubGFzdEluZGV4T2YoJy8nKTtcbiAgICAgIHJldHVybiBwYXRoLnN1YnN0cmluZygwLCBsYXN0U2xhc2hJbmRleCk7XG5cbiAgICB9O1xuXG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKHBhdGgpKSB7XG4gICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhgQ3JlYXRpbmcgcGF0aCAke3BhdGh9YCk7XG4gICAgICBsZXQgcGFyZW50UGF0aCA9IGdldFBhcmVudFBhdGgocGF0aCk7XG4gICAgICBpZiAoIWZzLmV4aXN0c1N5bmMocGFyZW50UGF0aCkpIHtcbiAgICAgICAgY3JlYXRlUGF0aElmRG9lc05vdEV4aXN0KHBhcmVudFBhdGgpXG4gICAgICB9XG4gICAgICBmcy5ta2RpclN5bmMocGF0aCk7XG4gICAgfVxuICB9XG5cbn1cbiovXG4iLCJpbXBvcnQge0NoYXRSb29tcywgQ2hhdExpbmVzfSBmcm9tICcvbGliL2NvbGxlY3Rpb25zJztcbmltcG9ydCBDb25zdGFudHMgZnJvbSAnL2xpYi9jb25zdGFudHMnO1xuaW1wb3J0IHtNZXRlb3J9IGZyb20gXCJtZXRlb3IvbWV0ZW9yXCI7XG5cbmNvbnN0IGdyb3VwQnkgPSBmdW5jdGlvbih4cywga2V5KSB7XG4gIHJldHVybiB4cy5yZWR1Y2UoZnVuY3Rpb24ocnYsIHgpIHtcbiAgICAocnZbeFtrZXldXSA9IHJ2W3hba2V5XV0gfHwgW10pLnB1c2goeCk7XG4gICAgcmV0dXJuIHJ2O1xuICB9LCB7fSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgZ2V0Q2hhdFJvb21CeUlkOiBmdW5jdGlvbihpZCkge1xuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBHdWRydW5Db250ZW50U2VydmljZXMgZnJvbSBcIi4uL2xpYi9kcnVwYWwvc2VydmljZXMuanNcIjtcbmltcG9ydCB7XG4gIE1ldGVvclxufSBmcm9tIFwibWV0ZW9yL21ldGVvclwiO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tIFwiL2xpYi9jb25zdGFudHNcIjtcbmltcG9ydCBkYXRlRm9ybWF0IGZyb20gXCJkYXRlZm9ybWF0XCI7XG5pbXBvcnQge1xuICBERUZDT045LFxuICBERUZDT043LFxuICBERUZDT041LFxuICBERUZDT040LFxuICBERUZDT04zLFxuICBERUZDT04yLFxuICBERUZDT04xXG59IGZyb20gXCIvZGVidWcuanNvblwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXIge1xuICBjb25zdHJ1Y3RvcihNZXRlb3IgPSB1bmRlZmluZWQpIHtcbiAgICB0aGlzLnVzZXIgPSBNZXRlb3IudXNlcigpO1xuICB9XG5cbiAgdGVzdENvbm5lY3Rpb25Db250ZW50KCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgc2VydmljZXMgPSBuZXcgR3VkcnVuQ29udGVudFNlcnZpY2VzKCk7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiU2VuZGluZyBub3RpZmljYXRpb24gdG8gR3VuZHJ1blwiKTtcbiAgICAgIHNlcnZpY2VzLnRlc3RfY29ubmVjdGlvbigpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoXCJcIiwgXCJcIiwgSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICB9XG4gIH1cbiAgb3JkZXJRdWVyeShzZWFyY2hUZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBzZXJ2aWNlcyA9IG5ldyBHdWRydW5Db250ZW50U2VydmljZXMoKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJTZW5kaW5nIG5vdGlmaWNhdGlvbiB0byBHdW5kcnVuXCIpO1xuICAgICAgbGV0IG9yZGVycyA9IHNlcnZpY2VzLnF1ZXJ5T3JkZXIoc2VhcmNoVGV4dCk7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiT2ssIGdldCBzb21ldGhpbmcgZnJvbSBvcmRlciBcIik7XG5cbiAgICAgIHJldHVybiBvcmRlcnM7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcihcIlwiLCBcIlwiLCBKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgIH1cbiAgfVxuXG4gIHF1ZXJ5T3JkZXJCeVBlcnNvbklkKHNlYXJjaFRleHQpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IHNlcnZpY2VzID0gbmV3IEd1ZHJ1bkNvbnRlbnRTZXJ2aWNlcygpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIlNlbmRpbmcgbm90aWZpY2F0aW9uIHRvIEd1bmRydW5cIik7XG4gICAgICBsZXQgb3JkZXJzID0gc2VydmljZXMucXVlcnlPcmRlckJ5UGVyc29uSWQoc2VhcmNoVGV4dCk7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiT2ssIGdldCBzb21ldGhpbmcgZnJvbSBvcmRlciBcIik7XG5cbiAgICAgIHJldHVybiBvcmRlcnM7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcihcIlwiLCBcIlwiLCBKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgIH1cbiAgfVxuXG4gIHByb2Nlc3MocmVxdWVzdCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgc2VydmljZXMgPSBuZXcgR3VkcnVuQ29udGVudFNlcnZpY2VzKCk7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiUmVxdWVzdCBwcm9jZXNzIG9mIG9yZGVyXCIpO1xuICAgICAgbGV0IG9yZGVycyA9IHNlcnZpY2VzLnByb2Nlc3NPcmRlcihyZXF1ZXN0KTtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJPaywgZ2V0IHNvbWUgcmVwbHlcIik7XG5cbiAgICAgIHJldHVybiBvcmRlcnM7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcihcIlwiLCBcIlwiLCBKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgIH1cbiAgfVxuXG4gIHF1ZXJ5UmVjZW50T3JkZXJzKCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgc2VydmljZXMgPSBuZXcgR3VkcnVuQ29udGVudFNlcnZpY2VzKCk7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiU2VuZGluZyBub3RpZmljYXRpb24gdG8gR3VuZHJ1blwiKTtcbiAgICAgIGxldCBvcmRlcnMgPSBzZXJ2aWNlcy5xdWVyeVJlY2VudE9yZGVycygpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIk9rLCBnZXQgc29tZXRoaW5nIGZyb20gb3JkZXIgXCIpO1xuXG4gICAgICByZXR1cm4gb3JkZXJzO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoXCJcIiwgXCJcIiwgSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICB9XG4gIH1cblxuICBxdWVyeU9yZGVyU3RhdGUoc3RhdGUsIGxpbWl0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBzZXJ2aWNlcyA9IG5ldyBHdWRydW5Db250ZW50U2VydmljZXMoKTtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJxdWVyeU9yZGVyU3RhdGVcIik7XG4gICAgICBsZXQgb3JkZXJzID0gc2VydmljZXMucXVlcnlPcmRlclN0YXRlKHN0YXRlLCBsaW1pdCk7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiT2ssIGdldCBzb21ldGhpbmcgZnJvbSBvcmRlciBcIik7XG5cbiAgICAgIHJldHVybiBvcmRlcnM7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcihcIlwiLCBcIlwiLCBKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgIH1cbiAgfVxuXG4gIG1vdGhlcmNoZWNrcygpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IHNlcnZpY2VzID0gbmV3IEd1ZHJ1bkNvbnRlbnRTZXJ2aWNlcygpO1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIlNlbmRpbmcgbW90aGVyY2hlY2tzIEd1bmRydW5cIik7XG4gICAgICBsZXQgb3JkZXJzID0gc2VydmljZXMubW90aGVyY2hlY2tzKCk7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiT2ssIGdldCBzb21ldGhpbmcgZnJvbSBtb3RoZXJjaGVja3MgXCIpO1xuXG4gICAgICByZXR1cm4gb3JkZXJzO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoXCJcIiwgXCJcIiwgSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICB9XG4gIH1cblxuXG5cbiAgcXVlcnlPcmRlckJ5T3JkZXJJZChzZWFyY2hUZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBzZXJ2aWNlcyA9IG5ldyBHdWRydW5Db250ZW50U2VydmljZXMoKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJTZW5kaW5nIG5vdGlmaWNhdGlvbiB0byBHdW5kcnVuXCIpO1xuICAgICAgbGV0IG9yZGVycyA9IHNlcnZpY2VzLnF1ZXJ5T3JkZXJCeU9yZGVySWQoc2VhcmNoVGV4dCk7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiT2ssIGdldCBzb21ldGhpbmcgZnJvbSBvcmRlciBcIik7XG5cbiAgICAgIHJldHVybiBvcmRlcnM7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcihcIlwiLCBcIlwiLCBKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgIH1cbiAgfVxuICB1cGRhdGVPcmRlckJ5T3JkZXJJZChvcmRlcikge1xuICAgIHRyeSB7XG4gICAgICBsZXQgc2VydmljZXMgPSBuZXcgR3VkcnVuQ29udGVudFNlcnZpY2VzKCk7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiU2VuZGluZyBub3RpZmljYXRpb24gdG8gR3VuZHJ1blwiKTtcbiAgICAgIGxldCByZXN1bHQgPSBzZXJ2aWNlcy51cGRhdGVPcmRlckJ5T3JkZXJJZChvcmRlcik7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiT2ssIHVwZGF0ZSBkb25lIC0gY2hlY2sgcmVzdWx0Li4uIFwiKTtcblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKFwiXCIsIFwiXCIsIEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XG4gICAgfVxuICB9XG4gIGNyZWF0ZVVwZGF0ZVBlcnNvbk9yZGVyKG9yZGVyKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBzZXJ2aWNlcyA9IG5ldyBHdWRydW5Db250ZW50U2VydmljZXMoKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJTZW5kaW5nIG5vdGlmaWNhdGlvbiB0byBHdW5kcnVuXCIpO1xuICAgICAgLy8gREVGQ09ONSAmJiBjb25zb2xlLmxvZyh0aGlzLnVzZXIpO1xuICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICBvcmRlclsnZmllbGRfb3JkZXJfc3RhdGUnXSA9IDI3MTtcbiAgICAgIG9yZGVyWydmaWVsZF9vcmRlcmlkJ10gPSAnJztcbiAgICAgIG9yZGVyWydmaWVsZF9jcmVhdG9yJ10gPSB0aGlzLnVzZXIudWlkO1xuICAgICAgb3JkZXJbJ2ZpZWxkX3Jlc3BvbnNpYmxlJ10gPSB0aGlzLnVzZXIudWlkO1xuICAgICAgb3JkZXJbJ2ZpZWxkX29yZGVyX3Byb2Nlc3NfbWV0aG9kJ10gPSBvcmRlclsnZmllbGRfb3JkZXJfcHJvY2Vzc19tZXRob2QnXSA/IG9yZGVyWydmaWVsZF9vcmRlcl9wcm9jZXNzX21ldGhvZCddIDogQ29uc3RhbnRzLk9yZGVyUHJvY2Vzc01ldGhvZC5FWFBSRVNTO1xuICAgICAgb3JkZXJbJ2ZpZWxkX2VmZmVjdGl2ZV9kYXRlJ10gPSBkYXRlRm9ybWF0KG5vdywgXCJ5eXl5LW1tLWRkXCIpO1xuXG5cblxuICAgICAgbGV0IHJlc3VsdCA9IHNlcnZpY2VzLmNyZWF0ZVBlcnNvbk9yZGVyKG9yZGVyKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJPaywgdXBkYXRlIGRvbmUgLSBjaGVjayByZXN1bHQuLi4gXCIpO1xuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoXCJcIiwgXCJcIiwgSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICB9XG4gIH1cblxuXG4gIGdldE5hbWVUeXBlcygpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IHNlcnZpY2VzID0gbmV3IEd1ZHJ1bkNvbnRlbnRTZXJ2aWNlcygpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIkdldHRpbmcgZ2V0TmFtZVR5cGVzXCIpO1xuICAgICAgbGV0IHJlc3VsdCA9IHNlcnZpY2VzLmdldFRlcm1zKFwibmFtZXR5cGVcIik7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiT2ssIHVwZGF0ZSBkb25lIC0gY2hlY2sgcmVzdWx0Li4uIFwiKTtcblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKFwiXCIsIFwiXCIsIEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XG4gICAgfVxuICB9XG4gIGdldFRlcm1zKHRlcm10eXBlKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBzZXJ2aWNlcyA9IG5ldyBHdWRydW5Db250ZW50U2VydmljZXMoKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJHZXR0aW5nIGdldFRlcm1zXCIpO1xuICAgICAgbGV0IHJlc3VsdCA9IHNlcnZpY2VzLmdldFRlcm1zKHRlcm10eXBlKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJPaywgdXBkYXRlIGRvbmUgLSBjaGVjayByZXN1bHQuLi4gXCIpO1xuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoXCJcIiwgXCJcIiwgSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICB9XG4gIH1cbiAgcXVlcnlUZXJtcyh0ZXJtdHlwZSwgc2VhcmNoVGV4dCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgc2VydmljZXMgPSBuZXcgR3VkcnVuQ29udGVudFNlcnZpY2VzKCk7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiR2V0dGluZyBxdWVyeVRlcm1zXCIpO1xuICAgICAgbGV0IHJlc3VsdCA9IHNlcnZpY2VzLnF1ZXJ5VGVybXModGVybXR5cGUsIHNlYXJjaFRleHQpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIk9rLCB1cGRhdGUgZG9uZSAtIGNoZWNrIHJlc3VsdC4uLiBcIik7XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcihcIlwiLCBcIlwiLCBKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgIH1cbiAgfVxuICBxdWVyeVRlcm1zQ291bnRyeShkYXRhQ29udGV4dCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgc2VydmljZXMgPSBuZXcgR3VkcnVuQ29udGVudFNlcnZpY2VzKCk7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiR2V0dGluZyBxdWVyeVRlcm1zQ291bnRyeVwiKTtcbiAgICAgIGxldCByZXN1bHQgPSBzZXJ2aWNlcy5xdWVyeVRlcm1zQ291bnRyeShkYXRhQ29udGV4dCk7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiT2ssIHVwZGF0ZSBkb25lIC0gY2hlY2sgcmVzdWx0Li4uIFwiKTtcblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKFwiXCIsIFwiXCIsIEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XG4gICAgfVxuICB9XG4gIHF1ZXJ5UGVyc29uQnlJZChzZWFyY2hUZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBzZXJ2aWNlcyA9IG5ldyBHdWRydW5Db250ZW50U2VydmljZXMoKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJTZW5kaW5nIG5vdGlmaWNhdGlvbiB0byBHdW5kcnVuXCIpO1xuICAgICAgbGV0IG9yZGVycyA9IHNlcnZpY2VzLnF1ZXJ5UGVyc29uQnlJZChzZWFyY2hUZXh0KTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJPaywgZ2V0IHNvbWV0aGluZyBmcm9tIHBlcnNvbi1vYmplY3QgXCIpO1xuXG4gICAgICByZXR1cm4gb3JkZXJzO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoXCJcIiwgXCJcIiwgSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICB9XG4gIH1cbiAgcXVlcnlQZXJzb24oc2VhcmNoVGV4dCwgbWV0YSkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgc2VydmljZXMgPSBuZXcgR3VkcnVuQ29udGVudFNlcnZpY2VzKCk7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiUXVlcnkgc3R1ZmYgZnJvbSBHdWRydW5cIik7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiQ2hlY2sgTWV0YSBzdHJ1Y3R1cmVcIik7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKG1ldGEpO1xuICAgICAgbGV0IG9yZGVycyA9IHNlcnZpY2VzLnF1ZXJ5UGVyc29uKHNlYXJjaFRleHQsIG1ldGEpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIk9rLCBnZXQgc29tZXRoaW5nIGZyb20gcGVyc29uLW9iamVjdCBcIik7XG5cbiAgICAgIHJldHVybiBvcmRlcnM7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcihcIlwiLCBcIlwiLCBKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgIH1cbiAgfVxuICBxdWVyeVJvbGVBZHZhbmNlZChzZWFyY2hUZXh0LCBxdWVyeVJvbGVzKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBzZXJ2aWNlcyA9IG5ldyBHdWRydW5Db250ZW50U2VydmljZXMoKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJRdWVyeSBzdHVmZiBBRFZBTkNFRCBST0xFIGZyb20gR3VkcnVuXCIpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIkNoZWNrIHF1ZXJ5Um9sZXMgc3RydWN0dXJlXCIpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhxdWVyeVJvbGVzKTtcbiAgICAgIGxldCBvcmRlcnMgPSBzZXJ2aWNlcy5xdWVyeVJvbGVBZHZhbmNlZChcbiAgICAgICAgc2VhcmNoVGV4dCxcbiAgICAgICAgcXVlcnlSb2xlcyk7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiT2ssIGdldCBzb21ldGhpbmcgZnJvbSBST0xFIHBlcnNvbi1vYmplY3QgXCIpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhvcmRlcnMpO1xuICAgICAgcmV0dXJuIG9yZGVycztcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKFwiXCIsIFwiXCIsIEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XG4gICAgfVxuICB9XG4gIHF1ZXJ5UGVyc29uQWR2YW5jZWQoc2VhcmNoVGV4dCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgc2VydmljZXMgPSBuZXcgR3VkcnVuQ29udGVudFNlcnZpY2VzKCk7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiUXVlcnkgc3R1ZmYgZnJvbSBHdWRydW5cIik7XG4gICAgICBsZXQgb3JkZXJzID0gc2VydmljZXMucXVlcnlQZXJzb25BZHZhbmNlZChzZWFyY2hUZXh0KTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJPaywgZ2V0IHNvbWV0aGluZyBmcm9tIHBlcnNvbi1vYmplY3QgXCIpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhvcmRlcnMpO1xuICAgICAgcmV0dXJuIG9yZGVycztcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKFwiXCIsIFwiXCIsIEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XG4gICAgfVxuICB9XG4gIGxpdmVzdHJlYW0oc2VhcmNoVGV4dCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgc2VydmljZXMgPSBuZXcgR3VkcnVuQ29udGVudFNlcnZpY2VzKCk7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiR2V0IGxpdmVzdHJlYW1cIik7XG4gICAgICBsZXQgb3JkZXJzID0gc2VydmljZXMubGl2ZXN0cmVhbShzZWFyY2hUZXh0KTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJPaywgZ2V0IHNvbWV0aGluZyBmcm9tIG9yZGVyIFwiKTtcblxuICAgICAgcmV0dXJuIG9yZGVycztcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKFwiXCIsIFwiXCIsIEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge2NoYXRsaW5lc30gZnJvbSAnL2xpYi9jb2xsZWN0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge30iLCJpbXBvcnQgeyBNZXRlb3IgfSBmcm9tICdtZXRlb3IvbWV0ZW9yJztcblxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xuICBpZiAoTWV0ZW9yLnVzZXJzLmZpbmQoKS5jb3VudCgpID09PSAwKSB7XG4gICAgQWNjb3VudHMuY3JlYXRlVXNlcih7IGVtYWlsOiAndGVzdEB0ZXN0LmNvbScsIHBhc3N3b3JkOiAndGVzdDEyMzQnIH0pO1xuICB9XG59O1xuIiwiaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSBcIm1ldGVvci9tZXRlb3JcIjtcbmltcG9ydCB7IGNoZWNrIH0gZnJvbSBcIm1ldGVvci9jaGVja1wiO1xuLy8gaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IFJhbmRvbSB9IGZyb20gXCJtZXRlb3IvcmFuZG9tXCI7XG5pbXBvcnQgRHJ1cGFsU2VydmljZXMgZnJvbSBcIi4uL2xpYi9kcnVwYWwvc2VydmljZXMuanNcIjtcbmltcG9ydCB7XG4gIERFRkNPTjksXG4gIERFRkNPTjcsXG4gIERFRkNPTjUsXG4gIERFRkNPTjQsXG4gIERFRkNPTjMsXG4gIERFRkNPTjIsXG4gIERFRkNPTjEsXG59IGZyb20gXCIvZGVidWcuanNvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIE1ldGVvci5tZXRob2RzKHtcbiAgICBcIl91c2Vycy5nZXRVc2VyTGlzdFwiKHF1ZXJ5KSB7XG4gICAgICBjaGVjayhxdWVyeSwgT2JqZWN0KTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJSdW5uaW5nIFF1ZXJ5IHRvIGdldCBVc2Vyc1wiKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2cocXVlcnkpO1xuXG4gICAgICB2YXIgY2hhdFVzZXJzID0gTWV0ZW9yLnVzZXJzLmZpbmQocXVlcnkpLmZldGNoKCk7XG5cbiAgICAgIHJldHVybiBjaGF0VXNlcnM7XG4gICAgfSxcbiAgICBcIl91c2Vycy5nZXRMYW5ndWFnZVByZWZlcmVuY2VcIihfaWQpIHtcbiAgICAgIGNoZWNrKF9pZCwgU3RyaW5nKTtcbiAgICAgIGxldCByZWNvcmQgPSBNZXRlb3IudXNlcnMuZmluZE9uZShfaWQpO1xuXG4gICAgICBpZiAocmVjb3JkICYmIHJlY29yZC5nZXQoXCJsYW5ndWFnZVwiKSkgcmV0dXJuIHJlY29yZC5nZXQoXCJsYW5ndWFnZVwiKTtcblxuICAgICAgY29uc3QgbG9jYWxlID0gTWV0ZW9yLnNldHRpbmdzW1wicHVibGljXCJdLmRlZmF1bHRMb2NhbGU7XG4gICAgICByZXR1cm4gbG9jYWxlID8gbG9jYWxlIDogXCJzdlwiO1xuICAgIH0sXG5cbiAgICBcIl91c2Vycy5zZXRMYW5ndWFnZVByZWZlcmVuY2VcIihfaWQsIGxhbmcpIHtcbiAgICAgIGNoZWNrKF9pZCwgU3RyaW5nKTtcbiAgICAgIGNoZWNrKGxhbmcsIFN0cmluZyk7XG4gICAgICAvLyBNZXRlb3IudXNlcnMudXBkYXRlKHtfaWQ6IF9pZH0sIHtzZXQ6IHtsYW5ndWFnZTogbGFuZ319KVxuICAgICAgbGV0IHJlY29yZCA9IE1ldGVvci51c2Vycy5maW5kT25lKF9pZCk7XG4gICAgICBpZiAocmVjb3JkKSB7XG4gICAgICAgIHJlY29yZC5zZXQoXCJsYW5ndWFnZVwiLCBsYW5nKTtcbiAgICAgICAgcmVjb3JkLnNhdmUoKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJfdXNlcnMuZ2V0VGhlbWVcIihfaWQpIHtcbiAgICAgIGNoZWNrKF9pZCwgU3RyaW5nKTtcbiAgICAgIGxldCByZWNvcmQgPSBNZXRlb3IudXNlcnMuZmluZE9uZShfaWQpO1xuXG4gICAgICBpZiAocmVjb3JkICYmIHJlY29yZC5nZXQoXCJ0aGVtZVwiKSkgcmV0dXJuIHJlY29yZC5nZXQoXCJ0aGVtZVwiKTtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIFwiX3VzZXJzLnNldFRoZW1lXCIoX2lkLCB0aGVtZSkge1xuICAgICAgY2hlY2soX2lkLCBTdHJpbmcpO1xuICAgICAgY2hlY2sodGhlbWUsIEJvb2xlYW4pO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIlNldCBUaGVtZSBmb3IgdXNlciBcIiArIF9pZCk7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiVGhlbWUgdmFsdWUgXCIgKyB0aGVtZSk7XG5cbiAgICAgIGxldCByZWNvcmQgPSBNZXRlb3IudXNlcnMuZmluZE9uZShfaWQpO1xuICAgICAgaWYgKHJlY29yZCkge1xuICAgICAgICByZWNvcmQuc2V0KFwidGhlbWVcIiwgdGhlbWUpO1xuICAgICAgICByZWNvcmQuc2F2ZSgpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBcIl91c2Vycy51cGRhdGVQcm9maWxlRGVzY3JpcHRpb25cIih1c2VySWQsIHRleHQpIHtcbiAgICAgIGNoZWNrKHVzZXJJZCwgU3RyaW5nKTtcbiAgICAgIGNoZWNrKHRleHQsIFN0cmluZyk7XG5cbiAgICAgIGlmICghdGhpcy51c2VySWQgfHwgdGhpcy51c2VySWQgIT09IHVzZXJJZCkge1xuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgICAgfVxuXG4gICAgICBsZXQgdXBkYXRlZCA9IE1ldGVvci51c2Vycy51cGRhdGUoXG4gICAgICAgIHtcbiAgICAgICAgICBfaWQ6IHVzZXJJZCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICRzZXQ6IHtcbiAgICAgICAgICAgIHByb2ZpbGU6IHRleHQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIGlmICh1cGRhdGVkKSB7XG4gICAgICAgIHJldHVybiBcIkRlc2NyaXB0aW9uIHVwZGF0ZWRcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBcIkRlc2NyaXB0aW9uIG5vdCB1cGRhdGVkISBQbGVhc2UgdHJ5IGFnYWluLlwiO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBcIl91c2Vycy51cGRhdGVOYW1lXCIodXNlcklkLCB0ZXh0KSB7XG4gICAgICBjaGVjayh1c2VySWQsIFN0cmluZyk7XG4gICAgICBjaGVjayh0ZXh0LCBTdHJpbmcpO1xuXG4gICAgICBpZiAoIXRoaXMudXNlcklkIHx8IHRoaXMudXNlcklkICE9PSB1c2VySWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiQWNjZXNzIGRlbmllZFwiKTtcbiAgICAgIH1cblxuICAgICAgbGV0IHVwZGF0ZWQgPSBNZXRlb3IudXNlcnMudXBkYXRlKFxuICAgICAgICB7XG4gICAgICAgICAgX2lkOiB1c2VySWQsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAkc2V0OiB7XG4gICAgICAgICAgICBuYW1lOiB0ZXh0LFxuICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICBpZiAodXBkYXRlZCkge1xuICAgICAgICByZXR1cm4gXCJOYW1lIHVwZGF0ZWRcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBcIk5hbWUgbm90IHVwZGF0ZWQhIFBsZWFzZSB0cnkgYWdhaW4uXCI7XG4gICAgICB9XG4gICAgfSxcbiAgICBcIl91c2Vycy5hbm9ueW1pemVcIih1c2VySWQpIHtcbiAgICAgIGNoZWNrKHVzZXJJZCwgU3RyaW5nKTtcblxuICAgICAgaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmFsc2UpIHtcbiAgICAgICAgY29uc3QgbmV3VXNlciA9IHtcbiAgICAgICAgICBuYW1lOiBSYW5kb20uaWQoKSxcbiAgICAgICAgICBcImVtYWlscy4wLmFkZHJlc3NcIjogUmFuZG9tLmlkKCksXG4gICAgICAgICAgYXZhdGFyX3VyaTogXCJcIixcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHVwZGF0ZWQgPSBNZXRlb3IudXNlcnMudXBkYXRlKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIF9pZDogdXNlcklkLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgeyAkc2V0OiBuZXdVc2VyIH1cbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHVwZGF0ZWQpIHtcbiAgICAgICAgICByZXR1cm4gXCJVc2VyIGFub255bWl6ZSBzdWNjZXNzZnVsXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFwiVXNlciBhbm9ueW1pemUgZmFpbHVyZSEgUGxlYXNlIHRyeSBhZ2Fpbi5cIjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcihcbiAgICAgICAgICA0MDEsXG4gICAgICAgICAgXCJBY2Nlc3MgZGVuaWVkIC0gYWRtaW5pc3RyYXRvciByb2xlIHJlcXVpcmVkXCJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYXN5bmMgXCJfdXNlcnMuaXNBZG1pblwiKCkge1xuICAgICAgLy90aGlzIGFsbG93cyBjYXRjaGluZyBleGNlcHRpb25zIHByb3Blcmx5OlxuICAgICAgY29uc3QgZG9Xb3JrID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAvL1RPRE86IENyZWF0ZSBhIHByb3BlciBHZXQgVXNlciBSb2xlIGZ1bmN0aW9uIGZvciBNaWNsYWIgaGVyZS4uLiBhdG0gYWxsIHVzZXJzIGFyZSB0aGUgc2FtZSBiYXNlIHVzZXJcbiAgICAgICAgLy8gbGV0IGFkbWluc0NvbXBhbnlJZCA9IGF3YWl0IGdldEFkbWluaXN0cmF0ZWRDb21wYW55SWQoKTtcbiAgICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIklzIGFkbWluIHJldHVybmVkOlwiKTtcbiAgICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhhZG1pbnNDb21wYW55SWQpO1xuICAgICAgICByZXR1cm4gYWRtaW5zQ29tcGFueUlkICYmIGFkbWluc0NvbXBhbnlJZCA+IDA7XG4gICAgICB9O1xuXG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gYXdhaXQgZG9Xb3JrKCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoZS5lcnJvciwgZS5yZWFzb24pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBhc3luYyBcIl91c2Vycy5nZXRSb2xlc1wiKCkge1xuICAgICAgaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiX3VzZXJzLmdldFJvbGVzIC0gQWNjZXNzIGRlbmllZFwiKTtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiQWNjZXNzIGRlbmllZFwiKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHNlcnZpY2VzID0gbmV3IERydXBhbFNlcnZpY2VzKCk7XG4gICAgICAvL1RPRE86IENyZWF0ZSBhIHByb3BlciBHZXQgVXNlciBSb2xlIGZ1bmN0aW9uIGZvciBNaWNsYWIgaGVyZS4uLiBhdG0gYWxsIHVzZXJzIGFyZSB0aGUgc2FtZSBiYXNlIHVzZXJcbiAgICAgIC8vIGxldCBhZG1pbnNDb21wYW55SWQgPSBhd2FpdCBnZXRBZG1pbmlzdHJhdGVkQ29tcGFueUlkKCk7XG4gICAgICAvL2NvbnN0IHJvbGVzID0gYXdhaXQgc2VydmljZXMuZ2V0VXNlclJvbGVzKE1ldGVvci51c2VyKCkudWlkKTtcbiAgICAgIGxldCByb2xlcyA9IFtdO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIlJvbGVzIHJldHVybmVkOlwiKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2cocm9sZXMpO1xuICAgICAgcmV0dXJuIHJvbGVzO1xuICAgIH0sXG5cbiAgICBhc3luYyBcIl91c2Vycy5nZXRDb21wYW55VXNlcnNcIigpIHtcbiAgICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiQWNjZXNzIGRlbmllZFwiKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBnZXRDb21wYW55VXNlcnMoKTtcbiAgICB9LFxuXG4gICAgYXN5bmMgXCJfdXNlcnMubWFuYWdlXCIodWlkLCBhY3Rpb24pIHtcbiAgICAgIGNoZWNrKHVpZCwgU3RyaW5nKTtcbiAgICAgIGNoZWNrKGFjdGlvbiwgU3RyaW5nKTtcblxuICAgICAgLy90aGlzIGFsbG93cyBjYXRjaGluZyBleGNlcHRpb25zIHByb3Blcmx5OlxuICAgICAgY29uc3QgZG9Xb3JrID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIl91c2Vycy5hY3RpdmF0ZSAtIEFjY2VzcyBkZW5pZWRcIik7XG4gICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiQWNjZXNzIGRlbmllZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNlcnZpY2VzID0gbmV3IERydXBhbFNlcnZpY2VzKCk7XG4gICAgICAgIGNvbnN0IGFkbWluaXN0cmF0ZWRDb21wYW55SWQgPSBhd2FpdCBnZXRBZG1pbmlzdHJhdGVkQ29tcGFueUlkKCk7XG4gICAgICAgIGlmIChhZG1pbmlzdHJhdGVkQ29tcGFueUlkKSB7XG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBzZXJ2aWNlcy5tYW5hZ2VVc2VyKFxuICAgICAgICAgICAgdWlkLFxuICAgICAgICAgICAgYWN0aW9uLFxuICAgICAgICAgICAgYWRtaW5pc3RyYXRlZENvbXBhbnlJZFxuICAgICAgICAgICk7XG4gICAgICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhgQWN0aW9uICR7YWN0aW9ufSBmb3IgdXNlciAke3VpZH0gc3VjY2Vzc2Z1bGApO1xuICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfVxuXG4gICAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coYEFjdGlvbiAke2FjdGlvbn0gZm9yIHVzZXIgJHt1aWR9IGZhaWxlZGApO1xuICAgICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGBVc2VyICR7dGhpcy51c2VySWR9IGlzIG5vdCBhbiBhZG1pbmApO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH07XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBhd2FpdCBkb1dvcmsoKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcihlLmVycm9yLCBlLnJlYXNvbik7XG4gICAgICB9XG4gICAgfSxcbiAgICBhc3luYyBcIl91c2Vycy5jcmVhdGVNeUFjY291bnRcIih1c2VyKSB7XG4gICAgICBjaGVjayh1c2VyLCBPYmplY3QpO1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIl91c2Vycy5jcmVhdGVNeUFjY291bnQgLSBzdGFydFwiKTtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2codXNlcik7XG5cbiAgICAgIC8vdGhpcyBhbGxvd3MgY2F0Y2hpbmcgZXhjZXB0aW9ucyBwcm9wZXJseTpcbiAgICAgIGNvbnN0IGRvV29yayA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3Qgc2VydmljZXMgPSBuZXcgRHJ1cGFsU2VydmljZXMoKTtcblxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHNlcnZpY2VzLmRydXBhbEluc2VydFVzZXIodXNlcik7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhgQWN0aW9uIGFkZFVzZXIgZm9yIHVzZXIgJHt1c2VyfSBzdWNjZXNzZnVsYCk7XG4gICAgICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIlRoZSByZXNwb25zZS4uLlwiKTtcbiAgICAgICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBERUZDT04zICYmXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgQWN0aW9uIGRydXBhbEluc2VydFVzZXIgZm9yIHVzZXIgJHt1c2VyfSBmYWlsZWRgKTtcbiAgICAgICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gYXdhaXQgZG9Xb3JrKCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coYEFjdGlvbiBhZGRVc2VyIGZvciB1c2VyICR7dXNlcn0gZmFpbGVkYCk7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoZS5lcnJvciwgZS5yZWFzb24pO1xuICAgICAgfVxuICAgIH0sXG4gICAgYXN5bmMgXCJfdXNlcnMuYWRkXCIodXNlcikge1xuICAgICAgY2hlY2sodXNlciwgT2JqZWN0KTtcblxuICAgICAgLy90aGlzIGFsbG93cyBjYXRjaGluZyBleGNlcHRpb25zIHByb3Blcmx5OlxuICAgICAgY29uc3QgZG9Xb3JrID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIl91c2Vycy5hY3RpdmF0ZSAtIEFjY2VzcyBkZW5pZWRcIik7XG4gICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiQWNjZXNzIGRlbmllZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNlcnZpY2VzID0gbmV3IERydXBhbFNlcnZpY2VzKCk7XG4gICAgICAgIGNvbnN0IGFkbWluaXN0cmF0ZWRDb21wYW55SWQgPSBhd2FpdCBnZXRBZG1pbmlzdHJhdGVkQ29tcGFueUlkKCk7XG4gICAgICAgIGlmIChhZG1pbmlzdHJhdGVkQ29tcGFueUlkKSB7XG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBzZXJ2aWNlcy5hZGRVc2VyKHVzZXIsIGFkbWluaXN0cmF0ZWRDb21wYW55SWQpO1xuICAgICAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coYEFjdGlvbiBhZGRVc2VyIGZvciB1c2VyICR7dXNlcn0gc3VjY2Vzc2Z1bGApO1xuICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfVxuXG4gICAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coYEFjdGlvbiBhZGRVc2VyIGZvciB1c2VyICR7dXNlcn0gZmFpbGVkYCk7XG4gICAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coYFVzZXIgJHt0aGlzLnVzZXJJZH0gaXMgbm90IGFuIGFkbWluYCk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IGRvV29yaygpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKGUuZXJyb3IsIGUucmVhc29uKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGFzeW5jIFwiX3VzZXJzLnN5bmNEcnVwYWxVc2VyXCIodXNlcmlkLCB1aWQpIHtcbiAgICAgIGNoZWNrKHVpZCwgU3RyaW5nKTtcbiAgICAgIGNoZWNrKHVzZXJpZCwgU3RyaW5nKTtcblxuICAgICAgcmV0dXJuIHN5bmNEcnVwYWxVc2VyKHVzZXJpZCwgdWlkKTtcbiAgICB9LFxuICAgIGFzeW5jIFwiX3VzZXJzLnN5bmNEcnVwYWxVc2VyT2xkXCIodXNlcmlkLCB1aWQpIHtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJfdXNlcnMuc3luY0RydXBhbFVzZXJcIik7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiU3luYyBhbmQgdXBkYXRlIHVzZXIgXCIgKyB1aWQpO1xuXG4gICAgICBjaGVjayh1aWQsIFN0cmluZyk7XG5cbiAgICAgIC8vdGhpcyBhbGxvd3MgY2F0Y2hpbmcgZXhjZXB0aW9ucyBwcm9wZXJseTpcbiAgICAgIGNvbnN0IGRvV29yayA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgLy8gaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgICAvLyAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJfdXNlcnMuc3luY0RydXBhbFVzZXIgLSBBY2Nlc3MgZGVuaWVkXCIpO1xuICAgICAgICAvLyAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCBcIkFjY2VzcyBkZW5pZWRcIik7XG4gICAgICAgIC8vIH1cbiAgICAgICAgY29uc3Qgc2VydmljZXMgPSBuZXcgRHJ1cGFsU2VydmljZXMoKTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBzZXJ2aWNlcy5nZXREcnVwYWxVc2VyKHVpZCk7XG4gICAgICAgIE1ldGVvci51c2Vycy51cGRhdGUodGhpcy51c2VySWQsIHtcbiAgICAgICAgICAkc2V0OiB7XG4gICAgICAgICAgICBhdmF0YXJfdXJpOiByZXNwb25zZS51cmksXG4gICAgICAgICAgICBmaXJzdF9uYW1lOiByZXNwb25zZS5maWVsZF9maXJzdF9uYW1lLFxuICAgICAgICAgICAgbGFzdF9uYW1lOiByZXNwb25zZS5maWVsZF9sYXN0X25hbWUsXG4gICAgICAgICAgICBpbmZvcm1hdGlvbjogcmVzcG9uc2UuZmllbGRfaW5mb3JtYXRpb24sXG4gICAgICAgICAgICB0ZWxlcGhvbmU6IHJlc3BvbnNlLmZpZWxkX3RlbGVwaG9uZV9udW1iZXIsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgIH07XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBhd2FpdCBkb1dvcmsoKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcihlLmVycm9yLCBlLnJlYXNvbik7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFzeW5jIFwiX3VzZXJzLmdldFVzZXJCeUF0dHJpYnV0ZVwiKG1ldGhvZCwgdmFsdWUpIHtcbiAgICAgIGNoZWNrKG1ldGhvZCwgU3RyaW5nKTtcbiAgICAgIGNoZWNrKHZhbHVlLCBTdHJpbmcpO1xuXG4gICAgICByZXR1cm4gZ2V0VXNlckJ5QXR0cmlidXRlKG1ldGhvZCwgdmFsdWUpO1xuICAgIH0sXG5cbiAgICBhc3luYyBcIl91c2Vycy51c2VyV2l0aE5hbWVFeGlzdFwiKG1ldGhvZCwgdmFsdWUpIHtcbiAgICAgIGNoZWNrKG1ldGhvZCwgU3RyaW5nKTtcbiAgICAgIGNoZWNrKHZhbHVlLCBTdHJpbmcpO1xuXG4gICAgICByZXN1bHQgPSBhd2FpdCBnZXRVc2VyQnlBdHRyaWJ1dGUobWV0aG9kLCB2YWx1ZSk7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKGBDaGVja2luZyByZXN1bHQgYCk7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKHJlc3VsdCk7XG5cbiAgICAgIHJldHVybiByZXN1bHQgIT09IHVuZGVmaW5lZFxuICAgICAgICA/IHJlc3VsdC52YWx1ZSAhPT0gXCJcIlxuICAgICAgICAgID8gdHJ1ZVxuICAgICAgICAgIDogZmFsc2VcbiAgICAgICAgOiBmYWxzZTtcbiAgICB9LFxuICB9KTtcbn1cblxuY29uc3QgZ2V0QWRtaW5pc3RyYXRlZENvbXBhbnlJZCA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgY3VycmVudFVpZCA9IE1ldGVvci51c2VyKCkgJiYgTWV0ZW9yLnVzZXIoKS51aWQ7XG4gIGNvbnN0IHNlcnZpY2VzID0gbmV3IERydXBhbFNlcnZpY2VzKCk7XG4gIGNvbnN0IHJvbGVzID0gYXdhaXQgc2VydmljZXMuZ2V0VXNlclJvbGVzKGN1cnJlbnRVaWQpO1xuICAvL2dldCBhIGNvbXBhbnkgdGhhdCB1c2VyIGlzIGFkbWluIGZvcj9cbiAgcmV0dXJuIHJvbGVzICYmIHJvbGVzLmFkbWluICYmIHJvbGVzLmFkbWluWzBdO1xufTtcblxuY29uc3QgZ2V0Q29tcGFueVVzZXJzID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBzZXJ2aWNlcyA9IG5ldyBEcnVwYWxTZXJ2aWNlcygpO1xuICBjb25zdCBhZG1pbmlzdHJhdGVkQ29tcGFueUlkID0gYXdhaXQgZ2V0QWRtaW5pc3RyYXRlZENvbXBhbnlJZCgpO1xuICBpZiAoYWRtaW5pc3RyYXRlZENvbXBhbnlJZCkge1xuICAgIGNvbnN0IHVzZXJzID0gYXdhaXQgc2VydmljZXMuZ2V0Q29tcGFueVVzZXJzKGFkbWluaXN0cmF0ZWRDb21wYW55SWQpO1xuICAgIHJldHVybiB1c2VycztcbiAgfVxuICByZXR1cm4gW107XG59O1xuXG5jb25zdCBzeW5jRHJ1cGFsVXNlciA9IGFzeW5jICh1c2VyaWQsIHVpZCkgPT4ge1xuICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiX3VzZXJzLnN5bmNEcnVwYWxVc2VyXCIpO1xuICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiU3luYyBhbmQgdXBkYXRlIHVzZXIgXCIgKyB1aWQpO1xuXG4gIC8vdGhpcyBhbGxvd3MgY2F0Y2hpbmcgZXhjZXB0aW9ucyBwcm9wZXJseTpcblxuICAvLyBpZiAoIXRoaXMudXNlcklkKSB7XG4gIC8vICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIl91c2Vycy5zeW5jRHJ1cGFsVXNlciAtIEFjY2VzcyBkZW5pZWRcIik7XG4gIC8vICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiQWNjZXNzIGRlbmllZFwiKTtcbiAgLy8gfVxuICBjb25zdCBzZXJ2aWNlcyA9IG5ldyBEcnVwYWxTZXJ2aWNlcygpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHNlcnZpY2VzLmRydXBhbEdldFVzZXIodWlkKTtcbiAgTWV0ZW9yLnVzZXJzLnVwZGF0ZSh1c2VyaWQsIHtcbiAgICAkc2V0OiB7XG4gICAgICBhdmF0YXJfdXJpOiByZXNwb25zZS51cmksXG4gICAgICBmaXJzdF9uYW1lOiByZXNwb25zZS5maWVsZF9maXJzdF9uYW1lLFxuICAgICAgbGFzdF9uYW1lOiByZXNwb25zZS5maWVsZF9sYXN0X25hbWUsXG4gICAgICBpbmZvcm1hdGlvbjogcmVzcG9uc2UuZmllbGRfaW5mb3JtYXRpb24sXG4gICAgICB0ZWxlcGhvbmU6IHJlc3BvbnNlLmZpZWxkX3RlbGVwaG9uZV9udW1iZXIsXG4gICAgfSxcbiAgfSk7XG4gIHJldHVybiByZXNwb25zZTtcbn07XG5cbmNvbnN0IGdldFVzZXJCeUF0dHJpYnV0ZSA9IGFzeW5jIChtZXRob2QsIHZhbHVlKSA9PiB7XG4gIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJnZXRVc2VyQnlBdHRyaWJ1dGVcIik7XG4gIERFRkNPTjMgJiZcbiAgICBjb25zb2xlLmxvZyhgR2V0dGluZyBhIHVzZXIgd2l0aCBtZXRob2QgYW5kIHZhbHVlICR7bWV0aG9kfSAke3ZhbHVlfWApO1xuXG4gIGNvbnN0IHNlcnZpY2VzID0gbmV3IERydXBhbFNlcnZpY2VzKCk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgc2VydmljZXMuZ2V0VXNlckJ5QXR0cmlidXRlKG1ldGhvZCwgdmFsdWUpO1xuICByZXR1cm4gcmVzcG9uc2U7XG59O1xuIiwiaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSBcIm1ldGVvci9tZXRlb3JcIjtcbmltcG9ydCB7IGNoZWNrLCBNYXRjaCB9IGZyb20gXCJtZXRlb3IvY2hlY2tcIjtcbmltcG9ydCBPcmRlciBmcm9tIFwiLi4vbGliL29yZGVyLmpzXCI7XG5pbXBvcnQgeyBQZXJzb25zLCBTZWFyY2hMb2cgfSBmcm9tIFwiL2xpYi9jb2xsZWN0aW9uc1wiO1xuXG5pbXBvcnQge1xuICBERUZDT045LFxuICBERUZDT043LFxuICBERUZDT041LFxuICBERUZDT040LFxuICBERUZDT04zLFxuICBERUZDT04yLFxuICBERUZDT04xLFxufSBmcm9tIFwiL2RlYnVnLmpzb25cIjtcbmltcG9ydCBDb25zdGFudHMgZnJvbSBcIi9saWIvY29uc3RhbnRzXCI7XG5pbXBvcnQgRHJ1cGFsU2VydmljZXMgZnJvbSBcIi4uL2xpYi9kcnVwYWwvc2VydmljZXNcIjtcblxuREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIkluIEFjY291bnRcIik7XG5cbnZhciBzdGFsZVNlc3Npb25QdXJnZUludGVydmFsID1cbiAgKE1ldGVvci5zZXR0aW5ncyAmJlxuICAgIE1ldGVvci5zZXR0aW5ncy5wdWJsaWMgJiZcbiAgICBNZXRlb3Iuc2V0dGluZ3MucHVibGljLnN0YWxlU2Vzc2lvblB1cmdlSW50ZXJ2YWwpIHx8XG4gIDEgKiA2MCAqIDEwMDA7IC8vIDFtaW5cbnZhciBpbmFjdGl2aXR5VGltZW91dCA9XG4gIChNZXRlb3Iuc2V0dGluZ3MgJiZcbiAgICBNZXRlb3Iuc2V0dGluZ3MucHVibGljICYmXG4gICAgTWV0ZW9yLnNldHRpbmdzLnB1YmxpYy5zdGFsZVNlc3Npb25JbmFjdGl2aXR5VGltZW91dCkgfHxcbiAgMzAgKiA2MCAqIDEwMDA7IC8vIDMwbWluc1xudmFyIGZvcmNlTG9nb3V0ID0gTWV0ZW9yLnNldHRpbmdzICYmIE1ldGVvci5zZXR0aW5ncy5wdWJsaWMgJiYgTWV0ZW9yLnNldDtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBNZXRlb3IubWV0aG9kcyh7XG4gICAgYXN5bmMgXCJhY2NvdW50LnNldFB3XCIocXVlcnkpIHtcbiAgICAgIGNoZWNrKHF1ZXJ5LCBPYmplY3QpO1xuICAgICAgbGV0IHVzZXJPYmogPSBNZXRlb3IudXNlcnMuZmluZE9uZSh0aGlzLnVzZXJJZCk7XG4gICAgICBxdWVyeS51aWQgPSB1c2VyT2JqLnVpZDtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJBY2NvdW50IHNldFB3XCIpO1xuXG4gICAgICBjb25zdCBkb1dvcmsgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNlcnZpY2VzID0gbmV3IERydXBhbFNlcnZpY2VzKCk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgc2VydmljZXMuYWNjb3VudFNldFB3KHF1ZXJ5KTtcbiAgICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhgTWV0aG9kIEFjY291bnQgc2V0UHdgKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgfTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IGRvV29yaygpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKGUuZXJyb3IsIGUucmVhc29uKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGhlYXJ0YmVhdDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coYEhlYXJ0YmVhdCBjaGVjayAtIGlmIHVzZXIgc2hvdWxkIHJlQ29ubmVjdGApO1xuICAgICAgdmFyIHVzZXIgPSBNZXRlb3IudXNlcnMuZmluZE9uZSh0aGlzLnVzZXJJZCk7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKHRoaXMudXNlcklkKTtcblxuICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhgR2V0IHVzZXIgYW5kIHVwZGF0ZSBoZWFydGJlYXQuLi5gKTtcbiAgICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyh1c2VyLnVpZCArIFwiIFwiICsgdXNlci5uYW1lKTtcbiAgICAgICAgTWV0ZW9yLnVzZXJzLnVwZGF0ZSh1c2VyLl9pZCwgeyAkc2V0OiB7IGhlYXJ0YmVhdDogbmV3IERhdGUoKSB9IH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhgVGhpcyB1c2VyaWQgaXMgbm90IHNldC4uLmApO1xuICAgICAgfVxuICAgICAgLy8gaWYgKHVzZXIpIHtcbiAgICAgIC8vICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhgR2V0IHVzZXIgYW5kIHVwZGF0ZSBoZWFydGJlYXQuLi5gKTtcbiAgICAgIC8vICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyh1c2VyLnVpZCArIFwiIFwiICsgdXNlci51c2VybmFtZSk7XG4gICAgICAvLyAgIE1ldGVvci51c2Vycy51cGRhdGUodXNlci5faWQsIHsgJHNldDogeyBoZWFydGJlYXQ6IG5ldyBEYXRlKCkgfSB9KTtcbiAgICAgIC8vIH1cbiAgICB9LFxuICAgIC8vXG4gIH0pO1xufVxuXG4vL1xuLy8gcGVyaW9kaWNhbGx5IHB1cmdlIGFueSBzdGFsZSBzZXNzaW9ucywgcmVtb3ZpbmcgdGhlaXIgbG9naW4gdG9rZW5zIGFuZCBjbGVhcmluZyBvdXQgdGhlIHN0YWxlIGhlYXJ0YmVhdC5cbi8vXG5pZiAoZm9yY2VMb2dvdXQgIT09IGZhbHNlKSB7XG4gIERFRkNPTjUgJiYgY29uc29sZS5sb2coYEhlYXJ0QmVhdENoZWNrIFNldHVwLi4uYCk7XG4gIERFRkNPTjUgJiYgY29uc29sZS5sb2coc3RhbGVTZXNzaW9uUHVyZ2VJbnRlcnZhbCk7XG5cbiAgTWV0ZW9yLnNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGBIZWFydEJlYXRDaGVjayBTZXJ2ZXIgQ2hlY2suLi5gKTtcblxuICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLFxuICAgICAgb3ZlcmR1ZVRpbWVzdGFtcCA9IG5ldyBEYXRlKG5vdyAtIGluYWN0aXZpdHlUaW1lb3V0KTtcbiAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGluYWN0aXZpdHlUaW1lb3V0KTtcbiAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKG92ZXJkdWVUaW1lc3RhbXApO1xuICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coc3RhbGVTZXNzaW9uUHVyZ2VJbnRlcnZhbCk7XG5cbiAgICBNZXRlb3IudXNlcnMudXBkYXRlKFxuICAgICAgeyBoZWFydGJlYXQ6IHsgJGx0OiBvdmVyZHVlVGltZXN0YW1wIH0gfSxcbiAgICAgIHsgJHNldDogeyBcInNlcnZpY2VzLnJlc3VtZS5sb2dpblRva2Vuc1wiOiBbXSB9LCAkdW5zZXQ6IHsgaGVhcnRiZWF0OiAxIH0gfSxcbiAgICAgIHsgbXVsdGk6IHRydWUgfVxuICAgICk7XG4gIH0sIHN0YWxlU2Vzc2lvblB1cmdlSW50ZXJ2YWwpO1xufVxuXG5GdXR1cmUgPSBOcG0ucmVxdWlyZShcImZpYmVycy9mdXR1cmVcIik7XG4vLyBBdCBhIG1pbmltdW0sIHNldCB1cCBMREFQX0RFRkFVTFRTLnVybCBhbmQgLmRuIGFjY29yZGluZyB0b1xuLy8geW91ciBuZWVkcy4gdXJsIHNob3VsZCBhcHBlYXIgYXMgJ2xkYXA6Ly95b3VyLnVybC5oZXJlJ1xuLy8gZG4gc2hvdWxkIGFwcGVhciBpbiBub3JtYWwgbGRhcCBmb3JtYXQgb2YgY29tbWEgc2VwYXJhdGVkIGF0dHJpYnV0ZT12YWx1ZVxuLy8gZS5nLiAndWlkPXNvbWV1c2VyLGNuPXVzZXJzLGRjPXNvbWV2YWx1ZSdcbkRSVVBBTF9ERUZBVUxUUyA9IHtcbiAgdXJsOiBmYWxzZSxcbiAgcG9ydDogXCIzODlcIixcbiAgZG46IGZhbHNlLFxuICBzZWFyY2hETjogZmFsc2UsXG4gIHNlYXJjaFNpemVMaW1pdDogMTAwLFxuICBzZWFyY2hDcmVkZW50aWFsczogZmFsc2UsXG4gIGNyZWF0ZU5ld1VzZXI6IHRydWUsXG4gIGRlZmF1bHREb21haW46IGZhbHNlLFxuICBzZWFyY2hSZXN1bHRzUHJvZmlsZU1hcDogZmFsc2UsXG4gIGJhc2U6IG51bGwsXG4gIHNlYXJjaDogXCIob2JqZWN0Y2xhc3M9KilcIixcbiAgbGRhcHNDZXJ0aWZpY2F0ZTogZmFsc2UsXG4gIGJpbmRUb0RvbWFpbjogZmFsc2UsXG4gIGJpbmREb21haW46IG51bGwsXG59O1xuTERBUCA9IHt9O1xuXG4vKipcbiBAY2xhc3MgTERBUFxuIEBjb25zdHJ1Y3RvclxuICovXG5MREFQLmNyZWF0ZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIC8vIFNldCBvcHRpb25zXG4gIHRoaXMub3B0aW9ucyA9IF8uZGVmYXVsdHMob3B0aW9ucywgRFJVUEFMX0RFRkFVTFRTKTtcblxuICAvLyBNYWtlIHN1cmUgb3B0aW9ucyBoYXZlIGJlZW4gc2V0XG4gIHRyeSB7XG4gICAgLy8gY2hlY2sodGhpcy5vcHRpb25zLnVybCwgU3RyaW5nKTtcbiAgICAvLyBjaGVjayh0aGlzLm9wdGlvbnMuZG4sIFN0cmluZyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKFxuICAgICAgXCJCYWQgRGVmYXVsdHNcIixcbiAgICAgIFwiT3B0aW9ucyBub3Qgc2V0LiBNYWtlIHN1cmUgdG8gc2V0IExEQVBfREVGQVVMVFMudXJsIGFuZCBMREFQX0RFRkFVTFRTLmRuIVwiXG4gICAgKTtcbiAgfVxuXG4gIC8vIC8vIEJlY2F1c2UgTlBNIGxkYXBqcyBtb2R1bGUgaGFzIHNvbWUgYmluYXJ5IGJ1aWxkcyxcbiAgLy8gLy8gV2UgaGFkIHRvIGNyZWF0ZSBhIHdyYXBlciBwYWNrYWdlIGZvciBpdCBhbmQgYnVpbGQgZm9yXG4gIC8vIC8vIGNlcnRhaW4gYXJjaGl0ZWN0dXJlcy4gVGhlIHBhY2thZ2UgdHlwOmxkYXAtanMgZXhwb3J0c1xuICAvLyAvLyAnTWV0ZW9yV3JhcHBlckxkYXBqcycgd2hpY2ggaXMgYSB3cmFwcGVyIGZvciB0aGUgbnBtIG1vZHVsZVxuICAvLyB0aGlzLmxkYXBqcyA9IE1ldGVvcldyYXBwZXJMZGFwanM7XG59O1xuXG4vKipcbiAqIEF0dGVtcHQgdG8gYmluZCAoYXV0aGVudGljYXRlKSBsZGFwXG4gKiBhbmQgcGVyZm9ybSBhIGRuIHNlYXJjaCBpZiBzcGVjaWZpZWRcbiAqXG4gKiBAbWV0aG9kIGxkYXBDaGVja1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gIE9iamVjdCB3aXRoIHVzZXJuYW1lLCBsZGFwUGFzcyBhbmQgb3ZlcnJpZGVzIGZvciBMREFQX0RFRkFVTFRTIG9iamVjdC5cbiAqIEFkZGl0aW9uYWxseSB0aGUgc2VhcmNoQmVmb3JlQmluZCBwYXJhbWV0ZXIgY2FuIGJlIHNwZWNpZmllZCwgd2hpY2ggaXMgdXNlZCB0byBzZWFyY2ggZm9yIHRoZSBETlxuICogaWYgbm90IHByb3ZpZGVkLlxuICogQHBhcmFtIHtib29sZWFufSBbYmluZEFmdGVyRmluZF0gIFdoZXRoZXIgb3Igbm90IHRvIHRyeSB0byBsb2dpbiB3aXRoIHRoZSBzdXBwbGllZCBjcmVkZW50aWFscyBvclxuICoganVzdCByZXR1cm4gd2hldGhlciBvciBub3QgdGhlIHVzZXIgZXhpc3RzLlxuICovXG5MREFQLmNyZWF0ZS5wcm90b3R5cGUuZHJ1cGFsQ2hlY2sgPSBmdW5jdGlvbiAob3B0aW9ucywgYmluZEFmdGVyRmluZCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJMb2dpbiBDaGVjayBEcnVwYWwgKE5FVylcIik7XG5cbiAgLy8gREVGQ09OMyAmJiBjb25zb2xlLmxvZygnZHJ1cGFsQ2hlY2snKTtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgaWYgKFxuICAgIChvcHRpb25zLmhhc093blByb3BlcnR5KFwidXNlcm5hbWVcIikgJiZcbiAgICAgIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoXCJsZGFwUGFzc1wiKSkgfHxcbiAgICAhYmluZEFmdGVyRmluZFxuICApIHtcbiAgICB2YXIgbGRhcEFzeW5jRnV0ID0gbmV3IEZ1dHVyZSgpO1xuXG4gICAgdHJ5IHtcbiAgICAgIEhUVFAuZ2V0KE1ldGVvci5zZXR0aW5nc1tcImRydXBhbFRva2VuVXJsXCJdLCB1bmRlZmluZWQsIGZ1bmN0aW9uIChcbiAgICAgICAgZXJyLFxuICAgICAgICB0b2tlblJlc3VsdFxuICAgICAgKSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICBsZGFwQXN5bmNGdXQucmV0dXJuKHtcbiAgICAgICAgICAgIGVycm9yOiBlcnIsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHVzZXJfZGF0YSA9IHtcbiAgICAgICAgICAgIHVzZXJuYW1lOiBvcHRpb25zLnVzZXJuYW1lLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IG9wdGlvbnMubGRhcFBhc3MsXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmICghdG9rZW5SZXN1bHQuY29udGVudCkge1xuICAgICAgICAgICAgbGRhcEFzeW5jRnV0LnJldHVybih7XG4gICAgICAgICAgICAgIGVycm9yOiBuZXcgTWV0ZW9yLkVycm9yKFwiNTAwXCIsIFwibWlzc2luZyB0b2tlbiBpbiByZXNwb25zZVwiKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBxdW90ZS1wcm9wc1xuICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSB7XG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIFwiWC1DU1JGLVRva2VuXCI6IHRva2VuUmVzdWx0LmNvbnRlbnQsXG4gICAgICAgICAgICBzdHJpY3RTU0w6IFwiZmFsc2VcIixcbiAgICAgICAgICB9O1xuICAgICAgICAgIHZhciBwYXJhbXMgPSB7IGhlYWRlcnMsIGRhdGE6IHVzZXJfZGF0YSB9O1xuICAgICAgICAgIEhUVFAucG9zdChNZXRlb3Iuc2V0dGluZ3NbXCJkcnVwYWxMb2dpblVybFwiXSwgcGFyYW1zLCBmdW5jdGlvbiAoXG4gICAgICAgICAgICBlcnIsXG4gICAgICAgICAgICBsb2dpblJlc3VsdFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICBsZGFwQXN5bmNGdXQucmV0dXJuKHtcbiAgICAgICAgICAgICAgICBlcnJvcjogZXJyLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIERFRkNPTjMgJiYgY29uc29sZS5sb2cobG9naW5SZXN1bHQpO1xuICAgICAgICAgICAgICB2YXIgcmV0T2JqZWN0ID0ge307XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0T2JqZWN0LnVzZXJuYW1lID0gbG9naW5SZXN1bHQuZGF0YS51c2VyLm5hbWU7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXRPYmplY3QudXNlcm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInVzZXIgbmFtZSBpcyBlbXB0eVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0T2JqZWN0LmVtYWlsID0gbG9naW5SZXN1bHQuZGF0YS51c2VyLm1haWw7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXRPYmplY3QuZW1haWwpIHtcbiAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInVzZXIgZW1haWwgaXMgZW1wdHlcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldE9iamVjdC51aWQgPSBsb2dpblJlc3VsdC5kYXRhLnVzZXIudWlkO1xuICAgICAgICAgICAgICAgIGxkYXBBc3luY0Z1dC5yZXR1cm4ocmV0T2JqZWN0KTtcbiAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgbGRhcEFzeW5jRnV0LnJldHVybih7XG4gICAgICAgICAgICAgICAgICBlcnJvcjogbmV3IE1ldGVvci5FcnJvcihlcnIuY29kZSwgZXJyLm1lc3NhZ2UpLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gbGRhcEFzeW5jRnV0LndhaXQoKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxkYXBBc3luY0Z1dC5yZXR1cm4oe1xuICAgICAgICBlcnJvcjogbmV3IE1ldGVvci5FcnJvcihlcnIuY29kZSwgZXJyLm1lc3NhZ2UpLFxuICAgICAgfSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAzLCBcIk1pc3NpbmcgQXV0aCBQYXJhbWV0ZXJzXCIpO1xuICB9XG59O1xuXG4vLyBSZWdpc3RlciBsb2dpbiBoYW5kbGVyIHdpdGggTWV0ZW9yXG4vLyBIZXJlIHdlIGNyZWF0ZSBhIG5ldyBMREFQIGluc3RhbmNlIHdpdGggb3B0aW9ucyBwYXNzZWQgZnJvbVxuLy8gTWV0ZW9yLmxvZ2luV2l0aExEQVAgb24gY2xpZW50IHNpZGVcbi8vIEBwYXJhbSB7T2JqZWN0fSBsb2dpblJlcXVlc3Qgd2lsbCBjb25zaXN0IG9mIHVzZXJuYW1lLCBsZGFwUGFzcywgbGRhcCwgYW5kIGxkYXBPcHRpb25zXG5BY2NvdW50cy5yZWdpc3RlckxvZ2luSGFuZGxlcihcImRydXBhbFwiLCBmdW5jdGlvbiAobG9naW5SZXF1ZXN0KSB7XG4gIC8vIElmICdsZGFwJyBpc24ndCBzZXQgaW4gbG9naW5SZXF1ZXN0IG9iamVjdCxcbiAgLy8gdGhlbiB0aGlzIGlzbid0IHRoZSBwcm9wZXIgaGFuZGxlciAocmV0dXJuIHVuZGVmaW5lZClcbiAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIlJFR0lTVEVSIExPR0lOIEhBTkRMRVIgUkVRVUVTVCAoTkVXKTpcIik7XG4gIERFRkNPTjMgJiYgY29uc29sZS5sb2cobG9naW5SZXF1ZXN0KTtcblxuICBpZiAoIWxvZ2luUmVxdWVzdC5kcnVwYWwpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgLy8gSW5zdGFudGlhdGUgTERBUCB3aXRoIG9wdGlvbnNcbiAgdmFyIHVzZXJPcHRpb25zID0gbG9naW5SZXF1ZXN0LmxkYXBPcHRpb25zIHx8IHt9O1xuICBBY2NvdW50cy5sZGFwT2JqID0gbmV3IExEQVAuY3JlYXRlKHVzZXJPcHRpb25zKTtcblxuICAvLyBDYWxsIGxkYXBDaGVjayBhbmQgZ2V0IHJlc3BvbnNlXG4gIHZhciByZXNwb25zZSA9IEFjY291bnRzLmxkYXBPYmouZHJ1cGFsQ2hlY2sobG9naW5SZXF1ZXN0LCB0cnVlKTtcbiAgaWYgKHJlc3BvbnNlLmVycm9yKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVzZXJJZDogbnVsbCxcbiAgICAgIGVycm9yOiByZXNwb25zZS5lcnJvcixcbiAgICB9O1xuICB9XG4gIC8vIFNldCBpbml0aWFsIHVzZXJJZCBhbmQgdG9rZW4gdmFsc1xuICB2YXIgdXNlcklkID0gbnVsbDtcbiAgdmFyIHN0YW1wZWRUb2tlbiA9IHtcbiAgICB0b2tlbjogbnVsbCxcbiAgfTtcbiAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcInJlc3BvbnNlOlwiKTtcbiAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG5cbiAgLy8gTG9vayB0byBzZWUgaWYgdXNlciBhbHJlYWR5IGV4aXN0c1xuICB2YXIgdXNlciA9IE1ldGVvci51c2Vycy5maW5kT25lKHtcbiAgICAvLyB1c2VybmFtZTogcmVzcG9uc2UudXNlcm5hbWVcbiAgICBcImVtYWlscy5hZGRyZXNzXCI6IHJlc3BvbnNlLmVtYWlsLFxuICB9KTtcbiAgaWYgKCF1c2VyKSB7XG4gICAgdXNlciA9IE1ldGVvci51c2Vycy5maW5kT25lKHtcbiAgICAgIGVtYWlsczogeyAkZWxlbU1hdGNoOiB7IGFkZHJlc3M6IHJlc3BvbnNlLmVtYWlsLCB2ZXJpZmllZDogdHJ1ZSB9IH0sXG4gICAgfSk7XG4gICAgaWYgKHVzZXIpIHtcbiAgICAgIHVzZXIudXNlcm5hbWUgPSByZXNwb25zZS51c2VybmFtZTtcbiAgICB9XG4gIH1cblxuICAvLyBMb2dpbiB1c2VyIGlmIHRoZXkgZXhpc3RcbiAgaWYgKHVzZXIpIHtcbiAgICB1c2VySWQgPSB1c2VyLl9pZDtcblxuICAgIC8vIENyZWF0ZSBoYXNoZWQgdG9rZW4gc28gdXNlciBzdGF5cyBsb2dnZWQgaW5cbiAgICBzdGFtcGVkVG9rZW4gPSBBY2NvdW50cy5fZ2VuZXJhdGVTdGFtcGVkTG9naW5Ub2tlbigpO1xuICAgIHZhciBoYXNoU3RhbXBlZFRva2VuID0gQWNjb3VudHMuX2hhc2hTdGFtcGVkVG9rZW4oc3RhbXBlZFRva2VuKTtcbiAgICAvLyBVcGRhdGUgdGhlIHVzZXIncyB0b2tlbiBpbiBtb25nb1xuICAgIE1ldGVvci51c2Vycy51cGRhdGUodXNlcklkLCB7XG4gICAgICAkcHVzaDoge1xuICAgICAgICBcInNlcnZpY2VzLnJlc3VtZS5sb2dpblRva2Vuc1wiOiBoYXNoU3RhbXBlZFRva2VuLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiVXNlciBleGlzdHMhXCIpO1xuICAgIEFjY291bnRzLnNldFBhc3N3b3JkKHVzZXJJZCwgbG9naW5SZXF1ZXN0LmxkYXBQYXNzKTtcbiAgICBNZXRlb3IuY2FsbChcbiAgICAgIFwiX3VzZXJzLnN5bmNEcnVwYWxVc2VyXCIsXG4gICAgICB1c2VySWQsXG4gICAgICByZXNwb25zZS51aWQsXG4gICAgICAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAvLyBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgLy8gICBpZiAoZXJyKSB7XG4gICAgICAgIC8vICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAvLyAgIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG4gICAgICAgIC8vICAgfVxuICAgICAgICAvLyB9XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiYWN0aW9ucy5fdXNlcnMubWFuYWdlIGVycm9yOiBcIiArIGVycik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICB9XG4gIC8vIE90aGVyd2lzZSBjcmVhdGUgdXNlciBpZiBvcHRpb24gaXMgc2V0XG4gIGVsc2UgaWYgKEFjY291bnRzLmxkYXBPYmoub3B0aW9ucy5jcmVhdGVOZXdVc2VyKSB7XG4gICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIkNyZWF0aW5nIG5ldyB1c2VyXCIpO1xuICAgIHZhciB1c2VyT2JqZWN0ID0ge1xuICAgICAgdXNlcm5hbWU6IHJlc3BvbnNlLnVzZXJuYW1lLFxuICAgIH07XG5cbiAgICB1c2VySWQgPSBBY2NvdW50cy5jcmVhdGVVc2VyKHVzZXJPYmplY3QpO1xuICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2codXNlck9iamVjdCk7XG4gICAgTWV0ZW9yLnVzZXJzLnVwZGF0ZSh1c2VySWQsIHtcbiAgICAgICRzZXQ6IHtcbiAgICAgICAgZW1haWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgYWRkcmVzczogcmVzcG9uc2UuZW1haWwsXG4gICAgICAgICAgICB2ZXJpZmllZDogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICB1aWQ6IHJlc3BvbnNlLnVpZCxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgQWNjb3VudHMuc2V0UGFzc3dvcmQodXNlcklkLCBsb2dpblJlcXVlc3QubGRhcFBhc3MpO1xuICAgIE1ldGVvci5jYWxsKFxuICAgICAgXCJfdXNlcnMuc3luY0RydXBhbFVzZXJcIixcbiAgICAgIHVzZXJJZCxcbiAgICAgIHJlc3BvbnNlLnVpZCxcbiAgICAgIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIC8vIGlmIChjYWxsYmFjaykge1xuICAgICAgICAvLyAgIGlmIChlcnIpIHtcbiAgICAgICAgLy8gICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgIC8vICAgfSBlbHNlIHtcbiAgICAgICAgLy8gICAgIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbiAgICAgICAgLy8gICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJhY3Rpb25zLl91c2Vycy5tYW5hZ2UgZXJyb3I6IFwiICsgZXJyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gTGRhcCBzdWNjZXNzLCBidXQgbm8gdXNlciBjcmVhdGVkXG4gICAgREVGQ09OMyAmJlxuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIFwiQXV0aGVudGljYXRpb24gc3VjY2VlZGVkIGZvciBcIiArXG4gICAgICAgICAgcmVzcG9uc2UudXNlcm5hbWUgK1xuICAgICAgICAgIFwiLCBidXQgbm8gdXNlciBleGlzdHMgaW4gTWV0ZW9yLiBFaXRoZXIgY3JlYXRlIHRoZSB1c2VyIG1hbnVhbGx5IG9yIHNldCBEUlVQQV9ERUZBVUxUUy5jcmVhdGVOZXdVc2VyIHRvIHRydWVcIlxuICAgICAgKTtcbiAgICByZXR1cm4ge1xuICAgICAgdXNlcklkOiBudWxsLFxuICAgICAgZXJyb3I6IG5ldyBNZXRlb3IuRXJyb3IoNDAzLCBcIlVzZXIgZm91bmQgaW4gTERBUCBidXQgbm90IGluIGFwcGxpY2F0aW9uXCIpLFxuICAgIH07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHVzZXJJZCxcbiAgICB0b2tlbjogc3RhbXBlZFRva2VuLnRva2VuLFxuICB9O1xufSk7XG4iLCJpbXBvcnQgeyBDaGF0TGluZUxpc3RzLCBDaGF0TGluZXMgfSBmcm9tICcvbGliL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuaW1wb3J0IHsgY2hlY2ssIE1hdGNoIH0gZnJvbSAnbWV0ZW9yL2NoZWNrJztcbmltcG9ydCB7XG4gIERFRkNPTjksXG4gIERFRkNPTjcsXG4gIERFRkNPTjUsXG4gIERFRkNPTjQsXG4gIERFRkNPTjMsXG4gIERFRkNPTjIsXG4gIERFRkNPTjFcbn0gZnJvbSBcIi9kZWJ1Zy5qc29uXCI7XG5pbXBvcnQgQ29uc3RhbnRzIGZyb20gJy9saWIvY29uc3RhbnRzJztcbiBERUZDT041ICYmIGNvbnNvbGUubG9nKCdJbiBjaGF0bGluZWxpc3RzIHNlcnZlciwgZ2V0dGluZyB0aGUgc3R1ZmYnKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIE1ldGVvci5tZXRob2RzKHtcbiAgICAnY2hhdGxpbmVsaXN0cy5hZGRDaGF0TGluZScoY2hhbm5lbElkLCBsaW5lKSB7XG4gICAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCAnQWNjZXNzIGRlbmllZCcpO1xuICAgICAgfVxuICAgICAgY2hlY2soY2hhbm5lbElkLCBTdHJpbmcpO1xuICAgICAgY2hlY2sobGluZSwgU3RyaW5nKTtcblxuICAgICAgY29uc3QgY3VycmVudFVzZXIgPSBNZXRlb3IudXNlcigpLl9pZDtcbiAgICAgIGNvbnN0IGN1cnJlbnRVc2VySWQgPSBNZXRlb3IudXNlcigpLl9pZDtcbiAgICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcblxuICAgICAgbGV0IGNoYXRMaW5lID0ge307XG4gICAgICBjaGF0TGluZS50ZXh0ID0gbGluZTtcbiAgICAgIGNoYXRMaW5lLmNoYW5uZWxJZCA9IGNoYW5uZWxJZDtcbiAgICAgIGNoYXRMaW5lLm1vZGlmaWVkQnkgPSBjdXJyZW50VXNlcjtcbiAgICAgIGNoYXRMaW5lLmNyZWF0ZWRCeU5hbWUgPSBjdXJyZW50VXNlcjtcbiAgICAgIGNoYXRMaW5lLmNyZWF0ZWRCeSA9IGN1cnJlbnRVc2VySWQ7XG4gICAgICBjaGF0TGluZS5tb2RpZmllZEF0ID0gY3VycmVudERhdGU7XG4gICAgICBjaGF0TGluZS5jcmVhdGVkQXQgPSBjdXJyZW50RGF0ZTtcbiAgICAgIGNoYXRMaW5lLnN0YXR1cyA9ICdhY3RpdmUnO1xuXG4gICAgICBsZXQgbGluZUlkID0gQ2hhdExpbmVzLmluc2VydChjaGF0TGluZSk7XG5cbiAgICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKCdJbiBjaGF0bGluZWxpc3RzLmFkZENoYXRMaW5lIG1ldGhvZCByZXR1cm5pbmcgJyArIGxpbmVJZCk7XG4gICAgICByZXR1cm4gbGluZUlkO1xuICAgIH1cbiAgfSk7XG5cbiAgTWV0ZW9yLm1ldGhvZHMoe1xuICAgICdjaGF0bGluZWxpc3RzLnJlbW92ZUNoYXRMaW5lJyhjb250YWluZXJJZCwgbGluZUlkKSB7XG4gICAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCAnQWNjZXNzIGRlbmllZCcpO1xuICAgICAgfVxuICAgICAgY2hlY2soY29udGFpbmVySWQsIFN0cmluZyk7XG4gICAgICBjaGVjayhsaW5lSWQsIFN0cmluZyk7XG5cbiAgICAgIC8qXG4gICAgICBpZiAoQXJ0aWNsZVN0YXR1cy5pc0NvbnRhaW5lclR5cGVSZWFkT25seShjaGFubmVsSWQsIENvbnN0YW50cy5Db250YWluZXJUeXBlcy5DSEFUTElORVMpKSB7XG4gICAgICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKCdJbiBjaGF0bGluZWxpc3RzLnJlbW92ZUNoYXRMaW5lIG1ldGhvZCBhbmQgcmVhZCBvbmx5IGNoYW5uZWw6ICcgKyBjaGFubmVsSWQpO1xuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKFwiTGluZSBjYW5ub3QgYmUgcmVtb3ZlZCBiZWNhdXNlIG9mIGNoYW5uZWwncyBzdGF0ZVwiKTtcbiAgICAgIH1cbiovXG4gICAgICBjb25zdCBjdXJyZW50VXNlciA9IE1ldGVvci51c2VyKCkuX2lkO1xuICAgICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICBDaGF0TGluZXMudXBkYXRlKGxpbmVJZCwge1xuICAgICAgICAkc2V0OiB7XG4gICAgICAgICAgc3RhdHVzOiAnZGVsZXRlZCcsXG4gICAgICAgICAgbW9kaWZpZWRCeTogY3VycmVudFVzZXIsXG4gICAgICAgICAgbW9kaWZpZWRBdDogY3VycmVudERhdGVcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKCdJbiBjaGF0bGluZWxpc3RzLnJlbW92ZUNoYXRMaW5lIG1ldGhvZCByZXR1cm5pbmcgJyArIGxpbmVJZCk7XG4gICAgICByZXR1cm4gbGluZUlkO1xuICAgIH1cbiAgfSk7XG59XG4iLCJpbXBvcnQge1xuICBNZXRlb3Jcbn0gZnJvbSBcIm1ldGVvci9tZXRlb3JcIjtcbmltcG9ydCB7XG4gIGNoZWNrLFxuICBNYXRjaFxufSBmcm9tIFwibWV0ZW9yL2NoZWNrXCI7XG5pbXBvcnQgT3JkZXIgZnJvbSBcIi4uL2xpYi9vcmRlci5qc1wiO1xuaW1wb3J0IHtcbiAgUGVyc29ucyxcbiAgU2VhcmNoTG9nXG59IGZyb20gJy9saWIvY29sbGVjdGlvbnMnO1xuXG5pbXBvcnQge1xuICBERUZDT045LFxuICBERUZDT043LFxuICBERUZDT041LFxuICBERUZDT040LFxuICBERUZDT04zLFxuICBERUZDT04yLFxuICBERUZDT04xXG59IGZyb20gXCIvZGVidWcuanNvblwiO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tIFwiL2xpYi9jb25zdGFudHNcIjtcbmltcG9ydCBEcnVwYWxTZXJ2aWNlcyBmcm9tIFwiLi4vbGliL2RydXBhbC9zZXJ2aWNlc1wiO1xuXG5ERUZDT041ICYmIGNvbnNvbGUubG9nKFwiSW4gU2VhcmNoIHNlcnZlciBwYXJ0XCIpO1xuXG5cbi8qKlxuICogcXVlcnk6XG4ge1xuICAgIG5hbWUsXG4gICAgZW1haWwsXG4gICAgZW1haWwyLFxuICAgIHBob25lLFxuICAgIGNvbnRlbnRcbn1cbiAqKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBNZXRlb3IubWV0aG9kcyh7XG4gICAgYXN5bmMgJ2NvbnRhY3Quc2VuZFF1ZXN0aW9uJyhxdWVyeSkge1xuICAgICAgY2hlY2socXVlcnksIE9iamVjdCk7XG5cbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJjb250YWN0LnNlbmRRdWVzdGlvblwiKTtcblxuICAgICAgY29uc3QgZG9Xb3JrID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAvLyBhbnkgdXNlciBDYW4gc2VuZCBtZXNzYWdlIC0gZ3Vlc3QgYXMgbG9nZ2VkIGluIHVzZXJzLi4uXG4gICAgICAgIFxuICAgICAgICAvLyBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICAgIC8vICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZygnY29udGFjdC5zZW5kUXVlc3Rpb24gLSBBY2Nlc3MgZGVuaWVkJyk7XG4gICAgICAgIC8vICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsICdBY2Nlc3MgZGVuaWVkJyk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgY29uc3Qgc2VydmljZXMgPSBuZXcgRHJ1cGFsU2VydmljZXMoKTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBzZXJ2aWNlcy5zZW5kUXVlc3Rpb24ocXVlcnkpO1xuICAgICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGBNZXRob2Qgc2VuZFF1ZXN0aW9uIHN1Y2Nlc3NmdWxgKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9O1xuXG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gYXdhaXQgZG9Xb3JrKCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoZS5lcnJvciwgZS5yZWFzb24pO1xuICAgICAgfVxuXG4gICAgfVxuICB9KTtcbn1cbiIsImltcG9ydCB7XG4gIE1ldGVvclxufSBmcm9tIFwibWV0ZW9yL21ldGVvclwiO1xuaW1wb3J0IHtcbiAgY2hlY2ssXG4gIE1hdGNoXG59IGZyb20gXCJtZXRlb3IvY2hlY2tcIjtcbmltcG9ydCBPcmRlciBmcm9tIFwiLi4vbGliL29yZGVyLmpzXCI7XG5pbXBvcnQge1xuICBQZXJzb25zLFxuICBTZWFyY2hMb2dcbn0gZnJvbSAnL2xpYi9jb2xsZWN0aW9ucyc7XG5cbmltcG9ydCB7XG4gIERFRkNPTjksXG4gIERFRkNPTjcsXG4gIERFRkNPTjUsXG4gIERFRkNPTjQsXG4gIERFRkNPTjMsXG4gIERFRkNPTjIsXG4gIERFRkNPTjFcbn0gZnJvbSBcIi9kZWJ1Zy5qc29uXCI7XG5pbXBvcnQgQ29uc3RhbnRzIGZyb20gXCIvbGliL2NvbnN0YW50c1wiO1xuaW1wb3J0IERydXBhbFNlcnZpY2VzIGZyb20gXCIuLi9saWIvZHJ1cGFsL3NlcnZpY2VzXCI7XG5cbkRFRkNPTjUgJiYgY29uc29sZS5sb2coXCJJbiBTZWFyY2ggc2VydmVyIHBhcnRcIik7XG5cblxuLyoqXG4gKiBxdWVyeTpcbiB7XG4gICAgbmFtZSxcbiAgICBlbWFpbCxcbiAgICBlbWFpbDIsXG4gICAgcGhvbmUsXG4gICAgY29udGVudFxufVxuICoqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIE1ldGVvci5tZXRob2RzKHtcbiAgICBhc3luYyAnY29udGVudC5nZXRBcnRpY2xlJyhxdWVyeSkge1xuICAgICAgY2hlY2socXVlcnksIE9iamVjdCk7XG5cbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJjb250ZW50LmdldEFydGljbGVcIik7XG5cbiAgICAgIGNvbnN0IGRvV29yayA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgLy9UT0RPOiBBcnRpY2xlcyBzaG91bGQgYmUgcG9zc2libGUgdG8gYWNjZXNzIGFueXRpbWVcbiAgICAgICAgLy8gaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgICAvLyAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJjb250ZW50LmdldEFydGljbGUgLSBBY2Nlc3MgZGVuaWVkXCIpO1xuICAgICAgICAvLyAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCAnQWNjZXNzIGRlbmllZCcpO1xuICAgICAgICAvLyB9XG4gICAgICAgIGNvbnN0IHNlcnZpY2VzID0gbmV3IERydXBhbFNlcnZpY2VzKCk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgc2VydmljZXMuZ2V0QXJ0aWNsZShxdWVyeSk7XG4gICAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coYE1ldGhvZCBnZXRBcnRpY2xlIHN1Y2Nlc3NmdWxgKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgfTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IGRvV29yaygpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKGUuZXJyb3IsIGUucmVhc29uKTtcbiAgICAgIH1cblxuICAgIH1cbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBNZXRlb3IgfSBmcm9tIFwibWV0ZW9yL21ldGVvclwiO1xuaW1wb3J0IHsgY2hlY2ssIE1hdGNoIH0gZnJvbSBcIm1ldGVvci9jaGVja1wiO1xuaW1wb3J0IE9yZGVyIGZyb20gXCIuLi9saWIvb3JkZXIuanNcIjtcbmltcG9ydCB7IFBlcnNvbnMsIFNlYXJjaExvZyB9IGZyb20gXCIvbGliL2NvbGxlY3Rpb25zXCI7XG5cbmltcG9ydCB7XG4gIERFRkNPTjksXG4gIERFRkNPTjcsXG4gIERFRkNPTjUsXG4gIERFRkNPTjQsXG4gIERFRkNPTjMsXG4gIERFRkNPTjIsXG4gIERFRkNPTjFcbn0gZnJvbSBcIi9kZWJ1Zy5qc29uXCI7XG5pbXBvcnQgQ29uc3RhbnRzIGZyb20gXCIvbGliL2NvbnN0YW50c1wiO1xuaW1wb3J0IERydXBhbFNlcnZpY2VzIGZyb20gXCIuLi9saWIvZHJ1cGFsL3NlcnZpY2VzXCI7XG5cbkRFRkNPTjMgJiYgY29uc29sZS5sb2coXCJJbiBTZWFyY2ggc2VydmVyIHBhcnRcIik7XG5cbi8qKlxuICogcXVlcnk6XG4ge1xuICAgIG5hbWUsXG4gICAgZW1haWwsXG4gICAgZW1haWwyLFxuICAgIHBob25lLFxuICAgIGNvbnRlbnRcbn1cbiAqKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIE1ldGVvci5tZXRob2RzKHtcbiAgICBhc3luYyBcImZpbGVhcmVhLmZpbGVhcmVhUXVlcnlcIihxdWVyeSkge1xuICAgICAgY2hlY2socXVlcnksIE9iamVjdCk7XG5cbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJmaWxlYXJlYS5maWxlYXJlYVF1ZXJ5XCIpO1xuXG4gICAgICBjb25zdCBkb1dvcmsgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiZmlsZWFyZWEuZmlsZWFyZWFRdWVyeSAtIEFjY2VzcyBkZW5pZWRcIik7XG4gICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiQWNjZXNzIGRlbmllZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiR2V0IEN1cnJlbnQgdXNlclwiKTtcbiAgICAgICAgbGV0IHVzZXJPYmogPSBNZXRlb3IudXNlcnMuZmluZE9uZSh0aGlzLnVzZXJJZCk7XG4gICAgICAgIHF1ZXJ5Lm1ldGFfYWN0aW5nX3VzZXIgPSB1c2VyT2JqLnVpZDtcbiAgICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhgRG9pbmcgcmVxdWVzdGApO1xuICAgICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKHF1ZXJ5KTtcbiAgICAgICAgY29uc3Qgc2VydmljZXMgPSBuZXcgRHJ1cGFsU2VydmljZXMoKTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBzZXJ2aWNlcy5maWxlYXJlYVF1ZXJ5KHF1ZXJ5KTtcbiAgICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhgTWV0aG9kIGZpbGVhcmVhUXVlcnkgc3VjY2Vzc2Z1bGApO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9O1xuXG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gYXdhaXQgZG9Xb3JrKCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoZS5lcnJvciwgZS5yZWFzb24pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgTWV0ZW9yLm1ldGhvZHMoe1xuICAgIGFzeW5jIFwiZmlsZWFyZWEuZmlsZWFyZWFHZXRJdGVtXCIocXVlcnkpIHtcbiAgICAgIGNoZWNrKHF1ZXJ5LCBPYmplY3QpO1xuXG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiZmlsZWFyZWEuZmlsZWFyZWFHZXRJdGVtXCIpO1xuXG4gICAgICBjb25zdCBkb1dvcmsgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiZmlsZWFyZWEuZmlsZWFyZWFHZXRJdGVtIC0gQWNjZXNzIGRlbmllZFwiKTtcbiAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIkdldCBDdXJyZW50IHVzZXJcIik7XG4gICAgICAgIGxldCB1c2VyT2JqID0gTWV0ZW9yLnVzZXJzLmZpbmRPbmUodGhpcy51c2VySWQpO1xuICAgICAgICBxdWVyeS5tZXRhX2FjdGluZ191c2VyID0gdXNlck9iai51aWQ7XG4gICAgICAgIGNvbnN0IHNlcnZpY2VzID0gbmV3IERydXBhbFNlcnZpY2VzKCk7XG4gICAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coYERvaW5nIHJlcXVlc3RgKTtcbiAgICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhxdWVyeSk7XG5cbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBzZXJ2aWNlcy5maWxlYXJlYUdldEZpbGUocXVlcnkpO1xuICAgICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKGBNZXRob2QgZmlsZWFyZWFHZXRJdGVtIHN1Y2Nlc3NmdWxgKTtcbiAgICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgfTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IGRvV29yaygpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKGUuZXJyb3IsIGUucmVhc29uKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuIiwiaW1wb3J0IF91c2VycyBmcm9tIFwiLi9fdXNlcnNcIjtcbmltcG9ydCBjaGF0bGluZWxpc3RzIGZyb20gXCIuL2NoYXRsaW5lbGlzdHNcIjtcbmltcG9ydCBvcmRlcnMgZnJvbSBcIi4vb3JkZXJzXCI7XG5pbXBvcnQgc2VhcmNoIGZyb20gXCIuL3NlYXJjaFwiO1xuaW1wb3J0IGxvZyBmcm9tIFwiLi9sb2dcIjtcbmltcG9ydCBjb250YWN0IGZyb20gXCIuL2NvbnRhY3RcIjtcbmltcG9ydCBjb250ZW50IGZyb20gXCIuL2NvbnRlbnRcIjtcbmltcG9ydCBmaWxlYXJlYSBmcm9tIFwiLi9maWxlYXJlYVwiO1xuaW1wb3J0IGFjY291bnQgZnJvbSBcIi4vYWNjb3VudFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgX3VzZXJzKCk7XG4gIGNoYXRsaW5lbGlzdHMoKTtcbiAgb3JkZXJzKCk7XG4gIHNlYXJjaCgpO1xuICBjb250YWN0KCk7XG4gIGNvbnRlbnQoKTtcbiAgZmlsZWFyZWEoKTtcbiAgYWNjb3VudCgpO1xufVxuIiwiaW1wb3J0IHtBcnRpY2xlc30gZnJvbSAnL2xpYi9jb2xsZWN0aW9ucyc7XG5pbXBvcnQge01ldGVvcn0gZnJvbSAnbWV0ZW9yL21ldGVvcic7XG5pbXBvcnQge2NoZWNrLCBNYXRjaH0gZnJvbSAnbWV0ZW9yL2NoZWNrJztcbmltcG9ydCBDb25zdGFudHMgZnJvbSAnL2xpYi9jb25zdGFudHMnO1xuaW1wb3J0IHtcbiAgREVGQ09OOSxcbiAgREVGQ09ONyxcbiAgREVGQ09ONSxcbiAgREVGQ09ONCxcbiAgREVGQ09OMyxcbiAgREVGQ09OMixcbiAgREVGQ09OMVxufSBmcm9tIFwiL2RlYnVnLmpzb25cIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICBNZXRlb3IubWV0aG9kcyh7XG4gICAgJ2xvZy5pbmZvJyAoY29udGVudCkge1xuICAgICAgaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgJ0FjY2VzcyBkZW5pZWQnKVxuICAgICAgfVxuICAgICAgY2hlY2soY29udGVudCwgTWF0Y2guT25lT2YoU3RyaW5nLCBPYmplY3QpKTtcblxuICAgICAgaWYgKHR5cGVvZihjb250ZW50KSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coYElORk86ICR7Y29udGVudH1gKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZihjb250ZW50KSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coYElORk86YCk7XG4gICAgICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGNvbnRlbnQpKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICdPSyc7XG5cbiAgICB9XG4gIH0pO1xuXG59XG4iLCJpbXBvcnQge1xuICBNZXRlb3Jcbn0gZnJvbSBcIm1ldGVvci9tZXRlb3JcIjtcbmltcG9ydCB7XG4gIGNoZWNrLFxuICBNYXRjaFxufSBmcm9tIFwibWV0ZW9yL2NoZWNrXCI7XG5pbXBvcnQgT3JkZXIgZnJvbSBcIi4uL2xpYi9vcmRlci5qc1wiO1xuaW1wb3J0IHtcbiAgVXNlcnNcbn0gZnJvbSAnL2xpYi9jb2xsZWN0aW9ucyc7XG5cbmltcG9ydCB7XG4gIERFRkNPTjksXG4gIERFRkNPTjcsXG4gIERFRkNPTjUsXG4gIERFRkNPTjQsXG4gIERFRkNPTjMsXG4gIERFRkNPTjIsXG4gIERFRkNPTjFcbn0gZnJvbSBcIi9kZWJ1Zy5qc29uXCI7XG5pbXBvcnQgQ29uc3RhbnRzIGZyb20gXCIvbGliL2NvbnN0YW50c1wiO1xuREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIkluIE9yZGVyIHNlcnZlciBwYXJ0XCIpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIE1ldGVvci5tZXRob2RzKHtcbiAgICBcIm9yZGVycy50ZXN0Y29ubmVjdGlvblwiKCkge1xuICAgICAgaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgICAgfVxuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIm9yZGVycy50ZXN0Y29ubmVjdGlvbiBcIik7XG4gICAgICBjb25zdCBvcmRlciA9IG5ldyBPcmRlcihNZXRlb3IpO1xuXG4gICAgICB0aGlzLnVuYmxvY2soKTtcbiAgICAgIG9yZGVyLnRlc3RDb25uZWN0aW9uQ29udGVudCgpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcInRlc3RDb25uZWN0aW9uU2VudFwiKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSk7XG4gIE1ldGVvci5tZXRob2RzKHtcbiAgICBcIm9yZGVycy5vcmRlcnF1ZXJ5XCIoc2VhcmNoVGV4dCkge1xuICAgICAgaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgICAgfVxuICAgICAgY2hlY2soc2VhcmNoVGV4dCwgU3RyaW5nKTtcblxuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIm9yZGVycy5RdWVyeSBzdHVmZlwiKTtcbiAgICAgIGNvbnN0IG9yZGVyID0gbmV3IE9yZGVyKE1ldGVvcik7XG5cbiAgICAgIHRoaXMudW5ibG9jaygpO1xuICAgICAgY29uc3Qgb3JkZXJzID0gb3JkZXIub3JkZXJRdWVyeShzZWFyY2hUZXh0KTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJPcmRlclF1ZXJ5IHNlbnQgd2l0aCBzZWFyY2ggc3RyaW5nIDogXCIuc2VhcmNoVGV4dCk7XG5cbiAgICAgIHJldHVybiBvcmRlcnM7XG4gICAgfVxuICB9KTtcbiAgTWV0ZW9yLm1ldGhvZHMoe1xuICAgIFwib3JkZXJzLnF1ZXJ5T3JkZXJCeU9yZGVySWRcIihzZWFyY2hUZXh0KSB7XG4gICAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCBcIkFjY2VzcyBkZW5pZWRcIik7XG4gICAgICB9XG4gICAgICBjaGVjayhzZWFyY2hUZXh0LCBTdHJpbmcpO1xuXG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwib3JkZXJzLlF1ZXJ5IHN0dWZmXCIpO1xuICAgICAgY29uc3Qgb3JkZXIgPSBuZXcgT3JkZXIoTWV0ZW9yKTtcblxuICAgICAgdGhpcy51bmJsb2NrKCk7XG4gICAgICBjb25zdCBvcmRlcnMgPSBvcmRlci5xdWVyeU9yZGVyQnlPcmRlcklkKHNlYXJjaFRleHQpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIk9yZGVyUXVlcnkgc2VudCB3aXRoIHNlYXJjaCBzdHJpbmcgOiBcIi5zZWFyY2hUZXh0KTtcblxuICAgICAgcmV0dXJuIG9yZGVycztcbiAgICB9XG4gIH0pO1xuXG4gIE1ldGVvci5tZXRob2RzKHtcbiAgICBcIm9yZGVycy5xdWVyeU9yZGVyQnlQZXJzb25JZFwiKHNlYXJjaFRleHQpIHtcbiAgICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiQWNjZXNzIGRlbmllZFwiKTtcbiAgICAgIH1cbiAgICAgIGNoZWNrKHNlYXJjaFRleHQsIFN0cmluZyk7XG5cbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJvcmRlcnMuUXVlcnkgc3R1ZmZcIik7XG4gICAgICBjb25zdCBvcmRlciA9IG5ldyBPcmRlcihNZXRlb3IpO1xuXG4gICAgICB0aGlzLnVuYmxvY2soKTtcbiAgICAgIGNvbnN0IG9yZGVycyA9IG9yZGVyLnF1ZXJ5T3JkZXJCeVBlcnNvbklkKHNlYXJjaFRleHQpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIk9yZGVyUXVlcnkgZm9yIFBlcnNvbmlkIHNlbnQgd2l0aCBzZWFyY2ggc3RyaW5nIDogXCIuc2VhcmNoVGV4dCk7XG5cbiAgICAgIHJldHVybiBvcmRlcnM7XG4gICAgfVxuICB9KTtcblxuICBNZXRlb3IubWV0aG9kcyh7XG4gICAgXCJvcmRlcnMucXVlcnlSZWNlbnRPcmRlcnNcIigpIHtcbiAgICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiQWNjZXNzIGRlbmllZFwiKTtcbiAgICAgIH1cbiAgICAgIC8vY2hlY2soc2VhcmNoVGV4dCwgU3RyaW5nKTtcblxuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIm9yZGVycy5RdWVyeSBzdHVmZlwiKTtcbiAgICAgIGNvbnN0IG9yZGVyID0gbmV3IE9yZGVyKE1ldGVvcik7XG5cbiAgICAgIHRoaXMudW5ibG9jaygpO1xuICAgICAgY29uc3Qgb3JkZXJzID0gb3JkZXIucXVlcnlSZWNlbnRPcmRlcnMoKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJPcmRlclF1ZXJ5IGZvciBQZXJzb25pZCBzZW50IHdpdGggc2VhcmNoIHN0cmluZyA6IFwiLnNlYXJjaFRleHQpO1xuXG4gICAgICByZXR1cm4gb3JkZXJzO1xuICAgIH1cbiAgfSk7XG5cbiAgTWV0ZW9yLm1ldGhvZHMoe1xuICAgIFwib3JkZXJzLnVwZGF0ZU9yZGVyQnlPcmRlcklkXCIoY29udGVudF9vcmRlcikge1xuICAgICAgaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgICAgfVxuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhjb250ZW50X29yZGVyKTtcblxuICAgICAgY2hlY2soY29udGVudF9vcmRlciwgT2JqZWN0KTtcbiAgICAgIC8vY2hlY2soY29udGVudF9vcmRlci5maWVsZF9vcmRlcmlkLCBTdHJpbmcpO1xuICAgICAgbGV0IHVzZXJPYmogPSBNZXRlb3IudXNlcnMuZmluZE9uZSh0aGlzLnVzZXJJZCk7XG5cbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJvcmRlcnMudXBkYXRlIHN0dWZmXCIpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhjb250ZW50X29yZGVyKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2codXNlck9iaik7XG5cbiAgICAgIGNvbnN0IG9yZGVyID0gbmV3IE9yZGVyKE1ldGVvcik7XG4gICAgICBjb250ZW50X29yZGVyLm1ldGFfYWN0aW5nX3VzZXIgPSB1c2VyT2JqLnVpZDtcbiAgICAgIHRoaXMudW5ibG9jaygpO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBvcmRlci51cGRhdGVPcmRlckJ5T3JkZXJJZChjb250ZW50X29yZGVyKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJDYWxsZWQgZHJ1cGFsIHNlcnZpY2UgYW5kIHJlY2VpdmVkIHJlc3BvbnNlXCIpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG5cbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG4gIH0pO1xuICBNZXRlb3IubWV0aG9kcyh7XG4gICAgXCJvcmRlcnMuY3JlYXRlVXBkYXRlUGVyc29uT3JkZXJcIihjb250ZW50X29yZGVyKSB7XG4gICAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCBcIkFjY2VzcyBkZW5pZWRcIik7XG4gICAgICB9XG5cbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJDcmVhdGUgT3JkZXJcIik7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGNvbnRlbnRfb3JkZXIpO1xuICAgICAgY2hlY2soY29udGVudF9vcmRlciwgT2JqZWN0KTtcblxuICAgICAgY29uc3Qgb3JkZXIgPSBuZXcgT3JkZXIoTWV0ZW9yKTtcblxuICAgICAgdGhpcy51bmJsb2NrKCk7XG4gICAgICBjb25zdCByZXNwb25zZSA9IG9yZGVyLmNyZWF0ZVVwZGF0ZVBlcnNvbk9yZGVyKGNvbnRlbnRfb3JkZXIpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIkNhbGxlZCBkcnVwYWwgc2VydmljZSBhbmQgcmVjZWl2ZWQgcmVzcG9uc2VcIik7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcblxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cbiAgfSk7XG4gIE1ldGVvci5tZXRob2RzKHtcbiAgICBcIm9yZGVycy5nZXROYW1lVHlwZXNcIigpIHtcbiAgICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiQWNjZXNzIGRlbmllZFwiKTtcbiAgICAgIH1cblxuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIlNlcnZlciBvcmRlcnMuZ2V0TmFtZVR5cGVzXCIpO1xuICAgICAgY29uc3Qgb3JkZXIgPSBuZXcgT3JkZXIoTWV0ZW9yKTtcbiAgICAgIHRoaXMudW5ibG9jaygpO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBvcmRlci5nZXROYW1lVHlwZXMoKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJDYWxsZWQgZHJ1cGFsIHNlcnZpY2UgYW5kIHJlY2VpdmVkIE5hbWV0eXBlc1wiKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuXG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuICB9KTtcbiAgTWV0ZW9yLm1ldGhvZHMoe1xuICAgIFwib3JkZXJzLmdldFRlcm1zXCIodGVybXR5cGUpIHtcbiAgICAgIGNoZWNrKHRlcm10eXBlLCBTdHJpbmcpO1xuXG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiU2VydmVyIG9yZGVycy5nZXRUZXJtc1wiKTtcbiAgICAgIGNvbnN0IG9yZGVyID0gbmV3IE9yZGVyKE1ldGVvcik7XG4gICAgICB0aGlzLnVuYmxvY2soKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gb3JkZXIuZ2V0VGVybXModGVybXR5cGUpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIkNhbGxlZCBkcnVwYWwgc2VydmljZSBhbmQgcmVjZWl2ZWQgZ2V0VGVybXNcIik7XG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuICB9KTtcbiAgTWV0ZW9yLm1ldGhvZHMoe1xuICAgIFwib3JkZXJzLnF1ZXJ5VGVybXNcIih0ZXJtdHlwZSwgc2VhcmNoVGV4dCkge1xuICAgICAgaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgICAgfVxuICAgICAgY2hlY2sodGVybXR5cGUsIFN0cmluZyk7XG4gICAgICBjaGVjayhzZWFyY2hUZXh0LCBTdHJpbmcpO1xuXG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiU2VydmVyIG9yZGVycy5xdWVyeVRlcm1zXCIpO1xuICAgICAgY29uc3Qgb3JkZXIgPSBuZXcgT3JkZXIoTWV0ZW9yKTtcbiAgICAgIHRoaXMudW5ibG9jaygpO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBvcmRlci5xdWVyeVRlcm1zKHRlcm10eXBlLCBzZWFyY2hUZXh0KTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJDYWxsZWQgZHJ1cGFsIHNlcnZpY2UgYW5kIHJlY2VpdmVkIHF1ZXJ5VGVybXNcIik7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcblxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cbiAgfSk7XG4gIE1ldGVvci5tZXRob2RzKHtcbiAgICBcIm9yZGVycy5xdWVyeVRlcm1zQ291bnRyeVwiKGRhdGFDb250ZXh0KSB7XG4gICAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCBcIkFjY2VzcyBkZW5pZWRcIik7XG4gICAgICB9XG4gICAgICBjaGVjayhkYXRhQ29udGV4dCwgU3RyaW5nKTtcblxuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIlNlcnZlciBvcmRlcnMucXVlcnlUZXJtc1wiKTtcbiAgICAgIGNvbnN0IG9yZGVyID0gbmV3IE9yZGVyKE1ldGVvcik7XG4gICAgICB0aGlzLnVuYmxvY2soKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gb3JkZXIucXVlcnlUZXJtc0NvdW50cnkoZGF0YUNvbnRleHQpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIkNhbGxlZCBkcnVwYWwgc2VydmljZSBhbmQgcmVjZWl2ZWQgcXVlcnlUZXJtc1wiKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuXG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuICB9KTtcbiAgTWV0ZW9yLm1ldGhvZHMoe1xuICAgIFwib3JkZXJzLnF1ZXJ5UGVyc29uQnlJZFwiKHNlYXJjaFRleHQpIHtcbiAgICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiQWNjZXNzIGRlbmllZFwiKTtcbiAgICAgIH1cbiAgICAgIGNoZWNrKHNlYXJjaFRleHQsIFN0cmluZyk7XG5cbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJQZXJzb24uUXVlcnkgc3R1ZmZcIik7XG4gICAgICBjb25zdCBvcmRlciA9IG5ldyBPcmRlcihNZXRlb3IpO1xuXG4gICAgICB0aGlzLnVuYmxvY2soKTtcbiAgICAgIGNvbnN0IG9yZGVycyA9IG9yZGVyLnF1ZXJ5UGVyc29uQnlJZChzZWFyY2hUZXh0KTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJxdWVyeVBlcnNvbkJ5SWQgc2VudCB3aXRoIHNlYXJjaCBzdHJpbmcgOiBcIi5zZWFyY2hUZXh0KTtcblxuICAgICAgcmV0dXJuIG9yZGVycztcbiAgICB9XG4gIH0pO1xuICBNZXRlb3IubWV0aG9kcyh7XG4gICAgXCJvcmRlcnMucXVlcnlQZXJzb25cIihzZWFyY2hUZXh0LCBtZXRhKSB7XG4gICAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCBcIkFjY2VzcyBkZW5pZWRcIik7XG4gICAgICB9XG4gICAgICBjaGVjayhzZWFyY2hUZXh0LCBTdHJpbmcpO1xuICAgICAgY2hlY2sobWV0YSwgU3RyaW5nKTtcblxuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIlBlcnNvbi5RdWVyeSBzdHVmZlwiKTtcbiAgICAgIGNvbnN0IG9yZGVyID0gbmV3IE9yZGVyKE1ldGVvcik7XG5cbiAgICAgIHRoaXMudW5ibG9jaygpO1xuICAgICAgY29uc3Qgb3JkZXJzID0gb3JkZXIucXVlcnlQZXJzb24oc2VhcmNoVGV4dCwgbWV0YSk7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwicXVlcnlQZXJzb24gc2VudCB3aXRoIHNlYXJjaCBzdHJpbmcgOiBcIi5zZWFyY2hUZXh0KTtcblxuICAgICAgcmV0dXJuIG9yZGVycztcbiAgICB9XG4gIH0pO1xuICBNZXRlb3IubWV0aG9kcyh7XG4gICAgXCJvcmRlcnMucXVlcnlQZXJzb25BZHZhbmNlZFwiKHNlYXJjaFRleHQpIHtcbiAgICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiQWNjZXNzIGRlbmllZFwiKTtcbiAgICAgIH1cbiAgICAgIGNoZWNrKHNlYXJjaFRleHQsIFN0cmluZyk7XG5cbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJQZXJzb24uUXVlcnkgc3R1ZmZcIik7XG4gICAgICBjb25zdCBvcmRlciA9IG5ldyBPcmRlcihNZXRlb3IpO1xuXG4gICAgICB0aGlzLnVuYmxvY2soKTtcbiAgICAgIGNvbnN0IG9yZGVycyA9IG9yZGVyLnF1ZXJ5UGVyc29uQWR2YW5jZWQoc2VhcmNoVGV4dCk7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwicXVlcnlQZXJzb24gc2VudCB3aXRoIHNlYXJjaCBzdHJpbmcgOiBcIi5zZWFyY2hUZXh0KTtcblxuICAgICAgcmV0dXJuIG9yZGVycztcbiAgICB9XG4gIH0pO1xuICBNZXRlb3IubWV0aG9kcyh7XG4gICAgXCJvcmRlcnMucXVlcnlSb2xlQWR2YW5jZWRcIihzZWFyY2hUZXh0LCBxdWVyeVJvbGVzKSB7XG4gICAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCBcIkFjY2VzcyBkZW5pZWRcIik7XG4gICAgICB9XG4gICAgICBjaGVjayhzZWFyY2hUZXh0LCBTdHJpbmcpO1xuICAgICAgY2hlY2socXVlcnlSb2xlcywgT2JqZWN0KTtcblxuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIlBlcnNvbi5RdWVyeSBzdHVmZlwiKTtcbiAgICAgIGNvbnN0IG9yZGVyID0gbmV3IE9yZGVyKE1ldGVvcik7XG5cbiAgICAgIHRoaXMudW5ibG9jaygpO1xuICAgICAgY29uc3Qgb3JkZXJzID0gb3JkZXIucXVlcnlSb2xlQWR2YW5jZWQoc2VhcmNoVGV4dCwgcXVlcnlSb2xlcyk7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwicXVlcnlQZXJzb24gc2VudCB3aXRoIHNlYXJjaCBzdHJpbmcgOiBcIi5zZWFyY2hUZXh0KTtcblxuICAgICAgcmV0dXJuIG9yZGVycztcbiAgICB9XG4gIH0pO1xuICBNZXRlb3IubWV0aG9kcyh7XG4gICAgXCJvcmRlcnMubGl2ZXN0cmVhbVwiKHNlYXJjaFRleHQpIHtcbiAgICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiQWNjZXNzIGRlbmllZFwiKTtcbiAgICAgIH1cbiAgICAgIGNoZWNrKHNlYXJjaFRleHQsIFN0cmluZyk7XG4gICAgICAvL2xldCB1c2VyT2JqID0gTWV0ZW9yLnVzZXJzLmZpbmRPbmUodGhpcy51c2VySWQpO1xuXG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiTGl2ZXN0cmVhbSBjaGVja1wiKTtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2codGhpcy51c2VySWQpO1xuICAgICAgLy9ERUZDT04zICYmIGNvbnNvbGUubG9nKHVzZXJPYmopO1xuXG5cbiAgICAgIGNvbnN0IG9yZGVyID0gbmV3IE9yZGVyKE1ldGVvcik7XG5cbiAgICAgIHRoaXMudW5ibG9jaygpO1xuICAgICAgY29uc3Qgb3JkZXJzID0gb3JkZXIubGl2ZXN0cmVhbShzZWFyY2hUZXh0KTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJsaXZlc3RyZWFtIHNlbnQgd2l0aCBzZWFyY2ggc3RyaW5nIDogXCIuc2VhcmNoVGV4dCk7XG5cbiAgICAgIHJldHVybiBvcmRlcnM7XG4gICAgfVxuICB9KTtcbiAgTWV0ZW9yLm1ldGhvZHMoe1xuICAgIFwib3JkZXJzLm1vdGhlcmNoZWNrc1wiKCkge1xuICAgICAgaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgICAgfVxuICAgICAgLy9jaGVjayhzZWFyY2hUZXh0LCBTdHJpbmcpO1xuICAgICAgLy9sZXQgdXNlck9iaiA9IE1ldGVvci51c2Vycy5maW5kT25lKHRoaXMudXNlcklkKTtcblxuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIm1vdGhlcmNoZWNrcyBjaGVja1wiKTtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2codGhpcy51c2VySWQpO1xuICAgICAgLy9ERUZDT04zICYmIGNvbnNvbGUubG9nKHVzZXJPYmopO1xuXG5cbiAgICAgIGNvbnN0IG9yZGVyID0gbmV3IE9yZGVyKE1ldGVvcik7XG5cbiAgICAgIHRoaXMudW5ibG9jaygpO1xuICAgICAgY29uc3Qgb3JkZXJzID0gb3JkZXIubW90aGVyY2hlY2tzKCk7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwibW90aGVyY2hlY2tzIHNlbnRcIik7XG5cbiAgICAgIHJldHVybiBvcmRlcnM7XG4gICAgfVxuICB9KTtcbiAgTWV0ZW9yLm1ldGhvZHMoe1xuICAgIFwib3JkZXJzLnByb2Nlc3NcIihxdWVyeSkge1xuICAgICAgaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgICAgfVxuICAgICAgY2hlY2socXVlcnksIE9iamVjdCk7XG5cbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJPcmRlciBQcm9jZXNzIFNlcnZlclNpZGVcIik7XG4gICAgICBjb25zdCBvcmRlciA9IG5ldyBPcmRlcihNZXRlb3IpO1xuXG4gICAgICB0aGlzLnVuYmxvY2soKTtcbiAgICAgIGNvbnN0IG9yZGVycyA9IG9yZGVyLnByb2Nlc3MocXVlcnkpO1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIlByb2Nlc3MgT3JkZXIgUmVxdWVzdDogXCIpO1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhxdWVyeSk7XG5cbiAgICAgIHJldHVybiBvcmRlcnM7XG4gICAgfVxuICB9KTtcbiAgTWV0ZW9yLm1ldGhvZHMoe1xuICAgIFwib3JkZXJzLnF1ZXJ5T3JkZXJTdGF0ZVwiKHN0YXRlLCBsaW1pdCkge1xuICAgICAgaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgICAgfVxuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIlF1ZXJ5IE9yZGVyc3RhdGVcIik7XG5cbiAgICAgIGNoZWNrKHN0YXRlLCBTdHJpbmcpO1xuICAgICAgY2hlY2sobGltaXQsIFN0cmluZyk7XG5cbiAgICAgIGNvbnN0IG9yZGVyID0gbmV3IE9yZGVyKE1ldGVvcik7XG5cbiAgICAgIHRoaXMudW5ibG9jaygpO1xuICAgICAgY29uc3Qgb3JkZXJzID0gb3JkZXIucXVlcnlPcmRlclN0YXRlKHN0YXRlLCBsaW1pdCk7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwic3RhdGUsIGxpbWl0OiBcIik7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKHN0YXRlKTtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2cobGltaXQpO1xuXG4gICAgICByZXR1cm4gb3JkZXJzO1xuICAgIH1cbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBNZXRlb3IgfSBmcm9tIFwibWV0ZW9yL21ldGVvclwiO1xuaW1wb3J0IHsgY2hlY2ssIE1hdGNoIH0gZnJvbSBcIm1ldGVvci9jaGVja1wiO1xuaW1wb3J0IE9yZGVyIGZyb20gXCIuLi9saWIvb3JkZXIuanNcIjtcbmltcG9ydCB7IFBlcnNvbnMsIFNlYXJjaExvZyB9IGZyb20gXCIvbGliL2NvbGxlY3Rpb25zXCI7XG5cbmltcG9ydCB7XG4gIERFRkNPTjksXG4gIERFRkNPTjcsXG4gIERFRkNPTjUsXG4gIERFRkNPTjQsXG4gIERFRkNPTjMsXG4gIERFRkNPTjIsXG4gIERFRkNPTjFcbn0gZnJvbSBcIi9kZWJ1Zy5qc29uXCI7XG5pbXBvcnQgQ29uc3RhbnRzIGZyb20gXCIvbGliL2NvbnN0YW50c1wiO1xuXG5ERUZDT041ICYmIGNvbnNvbGUubG9nKFwiSW4gU2VhcmNoIHNlcnZlciBwYXJ0XCIpO1xuXG4vKipcbiAqIHF1ZXJ5OlxuIHtcbiAgICAgIGZpcnN0TmFtZTogXCJcIixcbiAgICAgIGxhc3ROYW1lOiBcIlwiLFxuICAgICAgc3NuTnVtYmVyOiBcIlwiLFxuICAgICAgeWVhcjogXCJcIixcbiAgICAgIG1vbnRoOiBcIlwiLFxuICAgICAgZGF5OiBcIlwiLFxuICAgICAgZmllbGRfcGVwX2NvdW50cmllc19saXN0LFxuICAgICAgZmllbGRfcGVwXG4gICAgICBmaWVsZF9yY2FcblxufVxuICoqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgTWV0ZW9yLm1ldGhvZHMoe1xuICAgIFwic2VhcmNoLmZpbmRQZXJzb25cIihxdWVyeSkge1xuICAgICAgY2hlY2socXVlcnksIE9iamVjdCk7XG4gICAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCBcIkFjY2VzcyBkZW5pZWRcIik7XG4gICAgICB9XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwic2VhcmNoLmZpbmRQZXJzb24gXCIpO1xuXG4gICAgICBsZXQgZGJRdWVyeSA9IHt9O1xuXG4gICAgICBjb25zdCBuYW1lRWxlbU1hdGNoID0geyBOYW1lVHlwZTogXCJQcmltw6RydCBuYW1uXCIgfTtcbiAgICAgIC8vIGNvbnN0IHJTdGFydCA9IC8uKlxcYi87XG4gICAgICAvL2NvbnN0IHJFbmQgPSAvXFxiLztcbiAgICAgIC8vIGNvbnN0IHJTdGFydCA9IC9eLztcbiAgICAgIC8vY29uc3QgckVuZCA9IC8kLztcbiAgICAgIGNvbnN0IHJTdGFydCA9IC9cXEEvO1xuICAgICAgY29uc3QgclN0YXJ0TGFzdE5hbWUgPSAvXFxiLztcbiAgICAgIC8vY29uc3QgckVuZCA9IC9cXFouKi87XG4gICAgICAvL2NvbnN0IHJTdGFydCA9IC9cXGIvO1xuICAgICAgY29uc3QgckVuZCA9IC9cXGIvO1xuICAgICAgaWYgKHF1ZXJ5LmZpcnN0TmFtZSkge1xuICAgICAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgclN0YXJ0LnNvdXJjZSArIHF1ZXJ5LmZpcnN0TmFtZS50b0xvd2VyQ2FzZSgpLnRyaW0oKSArIHJFbmQuc291cmNlLFxuICAgICAgICAgIFwiaVwiXG4gICAgICAgICk7XG4gICAgICAgIERFRkNPTjMgJiZcbiAgICAgICAgICBjb25zb2xlLmRpcihcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KFxuICAgICAgICAgICAgICByU3RhcnQuc291cmNlICsgcXVlcnkuZmlyc3ROYW1lLnRvTG93ZXJDYXNlKCkudHJpbSgpICsgckVuZC5zb3VyY2VcbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgICBuYW1lRWxlbU1hdGNoW1wiRmlyc3ROYW1lXCJdID0geyAkcmVnZXg6IHJlZ2V4IH07XG4gICAgICB9XG5cbiAgICAgIGlmIChxdWVyeS5sYXN0TmFtZSkge1xuICAgICAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgclN0YXJ0TGFzdE5hbWUuc291cmNlICsgcXVlcnkubGFzdE5hbWUudG9Mb3dlckNhc2UoKSArIHJFbmQuc291cmNlLFxuICAgICAgICAgIFwiaVwiXG4gICAgICAgICk7XG4gICAgICAgIG5hbWVFbGVtTWF0Y2hbXCJMYXN0TmFtZVwiXSA9IHsgJHJlZ2V4OiByZWdleCB9O1xuICAgICAgICBERUZDT04zICYmXG4gICAgICAgICAgY29uc29sZS5kaXIoXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgICAgclN0YXJ0LnNvdXJjZSArIHF1ZXJ5Lmxhc3ROYW1lLnRvTG93ZXJDYXNlKCkgKyByRW5kLnNvdXJjZVxuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5kaXIoSlNPTi5zdHJpbmdpZnkobmFtZUVsZW1NYXRjaCkpO1xuXG4gICAgICBkYlF1ZXJ5W1wiTmFtZXNcIl0gPSB7ICRlbGVtTWF0Y2g6IG5hbWVFbGVtTWF0Y2ggfTtcblxuICAgICAgaWYgKHF1ZXJ5LmZpZWxkX3BlcCA9PT0gZmFsc2UgfHwgcXVlcnkuZmllbGRfcGVwID09PSAwKSB7XG4gICAgICAgIGRiUXVlcnlbXCJQRVBcIl0gPSBcIjBcIjtcbiAgICAgIH1cblxuICAgICAgaWYgKHF1ZXJ5LmZpZWxkX3JjYSA9PT0gZmFsc2UgfHwgcXVlcnkuZmllbGRfcmNhID09PSAwKSB7XG4gICAgICAgIGRiUXVlcnlbXCJSQ0FcIl0gPSBcIjBcIjtcbiAgICAgIH1cblxuICAgICAgaWYgKHF1ZXJ5LnllYXIpIHtcbiAgICAgICAgZGJRdWVyeVtcIkJpcnRoRGF0ZVllYXJcIl0gPSBxdWVyeS55ZWFyO1xuICAgICAgfVxuXG4gICAgICBpZiAocXVlcnkubW9udGgpIHtcbiAgICAgICAgZGJRdWVyeVtcIkJpcnRoRGF0ZU1vbnRoXCJdID0gcXVlcnkubW9udGg7XG4gICAgICB9XG5cbiAgICAgIGlmIChxdWVyeS5kYXkpIHtcbiAgICAgICAgZGJRdWVyeVtcIkJpcnRoRGF0ZURheVwiXSA9IHF1ZXJ5LmRheTtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBBcnJheS5pc0FycmF5KHF1ZXJ5LmZpZWxkX3BlcF9jb3VudHJpZXNfbGlzdCkgJiZcbiAgICAgICAgcXVlcnkuZmllbGRfcGVwX2NvdW50cmllc19saXN0Lmxlbmd0aCA+IDBcbiAgICAgICkge1xuICAgICAgICBjb25zdCBmaWx0ZXJlZENvdW50cmllcyA9IHF1ZXJ5LmZpZWxkX3BlcF9jb3VudHJpZXNfbGlzdFxuICAgICAgICAgIC5maWx0ZXIoXG4gICAgICAgICAgICAoaXRlbSwgaW5kZXgpID0+XG4gICAgICAgICAgICAgIHF1ZXJ5LmZpZWxkX3BlcF9jb3VudHJpZXNfbGlzdFtpbmRleF0gJiZcbiAgICAgICAgICAgICAgcXVlcnkuZmllbGRfcGVwX2NvdW50cmllc19saXN0W2luZGV4XS5zZWxlY3RlZCA9PT0gdHJ1ZVxuICAgICAgICAgIClcbiAgICAgICAgICAubWFwKGl0ZW0gPT4gaXRlbS5uYW1lKTtcblxuICAgICAgICBkYlF1ZXJ5W1wiUEVQQ291bnRyaWVzLlBFUENvdW50cnlOYW1lXCJdID0geyAkaW46IGZpbHRlcmVkQ291bnRyaWVzIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvL25vIHJlc3VsdHMgaWYgbm8gY291bnRyaWVzIHNlbGVjdGVkXG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cblxuICAgICAgbGV0IHNlYXJjaEJ5U1NOID0gZmFsc2U7XG5cbiAgICAgIGlmIChxdWVyeS5zc25OdW1iZXIpIHtcbiAgICAgICAgLy90aGUgcmVzdCBkb2Vzbid0IG1hdHRlciBpZiB3ZSB1c2Ugc3NuXG4gICAgICAgIGRiUXVlcnkgPSB7IFwiU1NOcy5DdXJyZW50U1NOXCI6IHF1ZXJ5LnNzbk51bWJlciB9O1xuICAgICAgICBzZWFyY2hCeVNTTiA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChPYmplY3Qua2V5cyhkYlF1ZXJ5KS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuXG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiRGViUXVlcnlcIik7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUuZGlyKEpTT04uc3RyaW5naWZ5KGRiUXVlcnkpKTtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5kaXIoZGJRdWVyeSk7XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IFBlcnNvbnMuZmluZChkYlF1ZXJ5KS5mZXRjaCgpO1xuXG4gICAgICBTZWFyY2hMb2cuaW5zZXJ0KHtcbiAgICAgICAgVXNlcklkOiB0aGlzLnVzZXJJZCxcbiAgICAgICAgRGF0ZVRpbWU6IG5ldyBEYXRlKCksXG4gICAgICAgIFJlc3VsdHNSZXR1cm5lZDogcmVzdWx0Lmxlbmd0aCA+IDBcbiAgICAgIH0pO1xuXG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwic2VhcmNoLmZpbmRQZXJzb24gZG9uZSB5b1wiKTtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZGJRdWVyeSkpO1xuICAgICAgcmV0dXJuIHsgbGlzdDogcmVzdWx0LCBzZWFyY2hCeVNTTiB9O1xuICAgIH1cbiAgfSk7XG59XG4iLCJpbXBvcnQge01ldGVvcn0gZnJvbSAnbWV0ZW9yL21ldGVvcic7XG5pbXBvcnQge2NoZWNrfSBmcm9tICdtZXRlb3IvY2hlY2snO1xuaW1wb3J0IHtcbiAgREVGQ09OOSxcbiAgREVGQ09ONyxcbiAgREVGQ09ONSxcbiAgREVGQ09ONCxcbiAgREVGQ09OMyxcbiAgREVGQ09OMixcbiAgREVGQ09OMVxufSBmcm9tIFwiL2RlYnVnLmpzb25cIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICBNZXRlb3IucHVibGlzaCgndXNlcnMuYWxsJywgZnVuY3Rpb24oKSB7XG4gICAgaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsICdBY2Nlc3MgZGVuaWVkJyk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2VsZWN0b3IgPSB7XG4gICAgICBzdGF0dXM6ICdhY3RpdmUnXG4gICAgfTtcbiAgICBjb25zdCBvcHRpb25zID0ge307XG4gICAgY29uc3QgcmVzcG9uc2UgPSBNZXRlb3IudXNlcnMuZmluZChzZWxlY3Rvciwgb3B0aW9ucyk7XG4gICAgLy8gREVGQ09ONSAmJiBjb25zb2xlLmxvZygnVXNlcnMuQ29sbGVjdGlvbicpO1xuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSk7XG5cbiAgTWV0ZW9yLnB1Ymxpc2goJ3VzZXJzLnNpbmdsZScsIGZ1bmN0aW9uKF9pZCkge1xuICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCAnQWNjZXNzIGRlbmllZCcpO1xuICAgIH1cbiAgICBjaGVjayhfaWQsIFN0cmluZyk7XG4gICAgY29uc3Qgc2VsZWN0b3IgPSB7XG4gICAgICBfaWQsXG4gICAgICBzdGF0dXM6ICdhY3RpdmUnXG4gICAgfTtcbiAgICBjb25zdCByZXNwb25zZSA9IE1ldGVvci51c2Vycy5maW5kKHNlbGVjdG9yKTtcbiAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZygnVXNlcnMuU2luZ2xlJyk7XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9KTtcblxuICBNZXRlb3IucHVibGlzaCgndXNlcnMuc2luZ2xlLnVpZCcsIGZ1bmN0aW9uKHVpZCkge1xuICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCAnQWNjZXNzIGRlbmllZCcpO1xuICAgIH1cbiAgICBjaGVjayh1aWQsIFN0cmluZyk7XG4gICAgY29uc3Qgc2VsZWN0b3IgPSB7XG4gICAgICB1aWRcbiAgICB9O1xuICAgIGNvbnN0IHJlc3BvbnNlID0gTWV0ZW9yLnVzZXJzLmZpbmQoc2VsZWN0b3IpO1xuICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKCdVc2Vycy5TaW5nbGUuVWlkJyk7XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9KTtcblxuICBNZXRlb3IucHVibGlzaCgndXNlcnMuY3VycmVudCcsIGZ1bmN0aW9uKCkge1xuICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCAnQWNjZXNzIGRlbmllZCcpO1xuICAgIH1cbiAgICAvLyBjaGVjayhfaWQsIFN0cmluZyk7XG4gICAgLy8gaWYgKHRoaXMudXNlcklkKSB7XG4gICAgY29uc3Qgc2VsZWN0b3IgPSB7XG4gICAgICBfaWQ6IHRoaXMudXNlcklkXG4gICAgfTtcbiAgICBjb25zdCByZXNwb25zZSA9IE1ldGVvci51c2Vycy5maW5kKHNlbGVjdG9yKTtcbiAgICAvLyAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyAoJ3B1Ymxpc2ggdXNlcnMuY3VycmVudCBfaWQnLCBfaWQpO1xuICAgIC8vICBERUZDT041ICYmIGNvbnNvbGUubG9nICgncHVibGlzaCB1c2Vycy5jdXJyZW50IHRoaXMudXNlcklkJywgdGhpcy51c2VySWQpO1xuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBNZXRlb3IgfSBmcm9tIFwibWV0ZW9yL21ldGVvclwiO1xuaW1wb3J0IHsgY2hlY2sgfSBmcm9tIFwibWV0ZW9yL2NoZWNrXCI7XG5pbXBvcnQgeyBBcnRpY2xlcyB9IGZyb20gXCIvbGliL2NvbGxlY3Rpb25zXCI7XG5cbmltcG9ydCB7XG4gIERFRkNPTjksXG4gIERFRkNPTjcsXG4gIERFRkNPTjUsXG4gIERFRkNPTjQsXG4gIERFRkNPTjMsXG4gIERFRkNPTjIsXG4gIERFRkNPTjEsXG59IGZyb20gXCIvZGVidWcuanNvblwiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiU2V0dGluZyB1cCBBcnRpY2xlIHN0dWZmXCIpO1xuXG4gIE1ldGVvci5wdWJsaXNoKFwiYXJ0aWNsZXMub25lXCIsIGZ1bmN0aW9uIChhcnRpY2xlSWQpIHtcbiAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiSW4gYXJ0aWNsZSAgc3Vic2NyaWJlIGZ1bmN0aW9uXCIpO1xuICAgIGNoZWNrKGFydGljbGVJZCwgU3RyaW5nKTtcbiAgICAvLyBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgLy8gICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgIC8vIH1cbiAgICB0aGlzLmF1dG9ydW4oZnVuY3Rpb24gKGNvbXB1dGF0aW9uKSB7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiU3Vic2NyaWJpbmcgQXJ0aWNsZVwiKTtcblxuICAgICAgY29uc3QgU2VsZWN0b3IgPSB7XG4gICAgICAgIFwiZmllbGRfYXJ0aWNsZV9pZC52YWx1ZVwiOiBhcnRpY2xlSWQsXG4gICAgICAgIHN0YXR1czogXCJhY3RpdmVcIixcbiAgICAgIH07XG5cbiAgICAgIGxldCBhcnRpY2xlID0gQXJ0aWNsZXMuZmluZChTZWxlY3Rvcik7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKGFydGljbGUuZmV0Y2goKSk7XG5cbiAgICAgIHJldHVybiBhcnRpY2xlO1xuICAgIH0pO1xuICB9KTtcbn1cbiIsImltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuaW1wb3J0IHsgY2hlY2sgfSBmcm9tICdtZXRlb3IvY2hlY2snO1xuaW1wb3J0IHsgQ2hhdExpbmVzLCBVc2VycyB9IGZyb20gJy9saWIvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHtcbiAgREVGQ09OOSxcbiAgREVGQ09ONyxcbiAgREVGQ09ONSxcbiAgREVGQ09ONCxcbiAgREVGQ09OMyxcbiAgREVGQ09OMixcbiAgREVGQ09OMVxufSBmcm9tIFwiL2RlYnVnLmpzb25cIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICBNZXRlb3IucHVibGlzaCgnY2hhdGxpbmVzLmZvcmNoYW5uZWwnLCBmdW5jdGlvbihjaGFubmVsSWQpIHtcbiAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgJ0FjY2VzcyBkZW5pZWQnKTtcbiAgICB9XG4gICAgY2hlY2soY2hhbm5lbElkLCBTdHJpbmcpO1xuICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKCdJbiBwdWJsaWNhdGlvbi9jaGF0bGluZXMuZm9yY2hhbm5lbCcpO1xuICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGNoYW5uZWxJZCk7XG5cbiAgICB0aGlzLmF1dG9ydW4oZnVuY3Rpb24oY29tcHV0YXRpb24pIHtcbiAgICAgIGNvbnN0IGNoYXRMaW5lc1NlbGVjdG9yID0ge1xuICAgICAgICBjaGFubmVsSWQ6IGNoYW5uZWxJZCxcbiAgICAgICAgc3RhdHVzOiAnYWN0aXZlJ1xuICAgICAgfTtcbiAgICAgIGxldCBjaGF0TGluZXNVc2VySWRzID0gQ2hhdExpbmVzLmZpbmQoY2hhdExpbmVzU2VsZWN0b3IpXG4gICAgICAgIC5mZXRjaCgpXG4gICAgICAgIC5tYXAobGluZSA9PiBsaW5lLmNyZWF0ZWRCeSk7XG5cbiAgICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKCdGaW5kIGNoYXRMaW5lc1VzZXJJZHMnKTtcblxuICAgICAgY29uc3QgdXNlcnNXaXRoQXZhdGFycyA9IE1ldGVvci51c2Vycy5maW5kKFxuICAgICAgICB7XG4gICAgICAgICAgX2lkOiB7XG4gICAgICAgICAgICAkaW46IGNoYXRMaW5lc1VzZXJJZHNcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHsgYXZhdGFyX3VyaTogMSB9XG4gICAgICApO1xuICAgICAgLy8gREVGQ09ONSAmJiBjb25zb2xlLmxvZyh1c2Vyc1dpdGhBdmF0YXJzKTtcbiAgICAgIHJldHVybiBbQ2hhdExpbmVzLmZpbmQoY2hhdExpbmVzU2VsZWN0b3IpLCB1c2Vyc1dpdGhBdmF0YXJzXTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgTWV0ZW9yLnB1Ymxpc2goJ2NoYXRsaW5lcy5mb3JVc2VyJywgZnVuY3Rpb24oKSB7XG4gICAgaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsICdBY2Nlc3MgZGVuaWVkJyk7XG4gICAgfVxuICAgIGNvbnN0IGNoYXRMaW5lc1NlbGVjdG9yID0ge1xuICAgICAgY3JlYXRlZEJ5OiB0aGlzLnVzZXJJZFxuICAgIH07XG4gICAgbGV0IGNoYXRMaW5lc1VzZXJJZHMgPSBDaGF0TGluZXMuZmluZChjaGF0TGluZXNTZWxlY3Rvcik7XG4gICAgLy8gREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIkZpbmQgdXNlcnNcIik7XG4gICAgLy8gREVGQ09ONSAmJiBjb25zb2xlLmxvZyhjaGF0TGluZXNVc2VySWRzKTtcbiAgICByZXR1cm4gY2hhdExpbmVzVXNlcklkcztcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBNZXRlb3IgfSBmcm9tIFwibWV0ZW9yL21ldGVvclwiO1xuaW1wb3J0IHsgY2hlY2sgfSBmcm9tIFwibWV0ZW9yL2NoZWNrXCI7XG5pbXBvcnQgeyBDaGF0Um9vbXMsIFVzZXJzIH0gZnJvbSBcIi9saWIvY29sbGVjdGlvbnNcIjtcbmltcG9ydCB7XG4gIERFRkNPTjksXG4gIERFRkNPTjcsXG4gIERFRkNPTjUsXG4gIERFRkNPTjQsXG4gIERFRkNPTjMsXG4gIERFRkNPTjIsXG4gIERFRkNPTjEsXG59IGZyb20gXCIvZGVidWcuanNvblwiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBNZXRlb3IucHVibGlzaChcImNoYXRyb29tcy5hY2Nlc3NcIiwgZnVuY3Rpb24gKGNoYXRyb29tSWQpIHtcbiAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgIH1cbiAgICBjaGVjayhjaGF0cm9vbUlkLCBTdHJpbmcpO1xuICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJJbiBwdWJsaWNhdGlvbi9jaGF0Um9vbXMuZm9yY2hhbm5lbFwiKTtcbiAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGNoYXRyb29tSWQpO1xuXG4gICAgdGhpcy5hdXRvcnVuKGZ1bmN0aW9uIChjb21wdXRhdGlvbikge1xuICAgICAgY29uc3QgY2hhdFJvb21zU2VsZWN0b3IgPSB7XG4gICAgICAgIF9pZDogY2hhdHJvb21JZCxcbiAgICAgICAgc3RhdHVzOiBcImFjdGl2ZVwiLFxuICAgICAgfTtcblxuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIkZpbmQgY2hhdFJvb21zVXNlcklkc1wiKTtcblxuICAgICAgLy8gREVGQ09ONSAmJiBjb25zb2xlLmxvZyh1c2Vyc1dpdGhBdmF0YXJzKTtcbiAgICAgIHJldHVybiBbQ2hhdFJvb21zLmZpbmQoY2hhdFJvb21zU2VsZWN0b3IpXTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgTWV0ZW9yLnB1Ymxpc2goXCJjaGF0cm9vbXMuZm9yVXNlclwiLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiQWNjZXNzIGRlbmllZFwiKTtcbiAgICB9XG4gICAgY29uc3QgY2hhdFJvb21zU2VsZWN0b3IgPSB7XG4gICAgICBcInVzZXJzLnVzZXJJZFwiOiB7XG4gICAgICAgICRpbjogW3RoaXMudXNlcklkXSxcbiAgICAgIH0sXG4gICAgfTtcbiAgICBsZXQgY2hhdFJvb21zVXNlcklkcyA9IENoYXRSb29tcy5maW5kKGNoYXRSb29tc1NlbGVjdG9yKTtcbiAgICAvLyBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiRmluZCB1c2Vyc1wiKTtcbiAgICAvLyBERUZDT041ICYmIGNvbnNvbGUubG9nKGNoYXRSb29tc1VzZXJJZHMpO1xuICAgIHJldHVybiBjaGF0Um9vbXNVc2VySWRzO1xuICB9KTtcbn1cbiIsImltcG9ydCBfdXNlcnMgZnJvbSBcIi4vX3VzZXJzXCI7XG5pbXBvcnQgY2hhdGxpbmVzIGZyb20gXCIuL2NoYXRsaW5lc1wiO1xuaW1wb3J0IGNoYXRyb29tcyBmcm9tIFwiLi9jaGF0cm9vbXNcIjtcbmltcG9ydCBzZWNyZXRzIGZyb20gXCIuL3NlY3JldHNcIjtcbmltcG9ydCBhcnRpY2xlcyBmcm9tIFwiLi9hcnRpY2xlc1wiO1xuaW1wb3J0IG1jYyBmcm9tIFwiLi9tY2NfY29uZmlnXCI7XG5pbXBvcnQgc2lnbmFsc3RhdGUgZnJvbSBcIi4vc2lnbmFsc3RhdGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBfdXNlcnMoKTtcbiAgY2hhdGxpbmVzKCk7XG4gIGNoYXRyb29tcygpO1xuICBzZWNyZXRzKCk7XG4gIGFydGljbGVzKCk7XG4gIG1jYygpO1xuICBzaWduYWxzdGF0ZSgpO1xufVxuIiwiaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSBcIm1ldGVvci9tZXRlb3JcIjtcbmltcG9ydCB7IGNoZWNrIH0gZnJvbSBcIm1ldGVvci9jaGVja1wiO1xuaW1wb3J0IHsgTWNjQ29uZmlnIH0gZnJvbSBcIi9saWIvY29sbGVjdGlvbnNcIjtcbmltcG9ydCB7XG4gIERFRkNPTjksXG4gIERFRkNPTjcsXG4gIERFRkNPTjUsXG4gIERFRkNPTjQsXG4gIERFRkNPTjMsXG4gIERFRkNPTjIsXG4gIERFRkNPTjEsXG59IGZyb20gXCIvZGVidWcuanNvblwiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBERUZDT043ICYmIGNvbnNvbGUubG9nKFwiU2V0dGluZyB1cCBtY2MgLWNvbmZpZ1wiKTtcblxuICBNZXRlb3IucHVibGlzaChcIm1jY0NvbmZpZy5hbGxcIiwgZnVuY3Rpb24gKCkge1xuICAgIERFRkNPTjcgJiYgY29uc29sZS5sb2coXCJJbiB0aGUgc3Vic2NyaWJlIGZ1bmN0aW9uXCIpO1xuXG4gICAgLy8gaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgIC8vICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiQWNjZXNzIGRlbmllZFwiKTtcbiAgICAvLyB9XG4gICAgdGhpcy5hdXRvcnVuKGZ1bmN0aW9uIChjb21wdXRhdGlvbikge1xuICAgICAgREVGQ09ONyAmJiBjb25zb2xlLmxvZyhcIlN1YnNjcmliaW5nIE1DQyBDb25maWdzXCIpO1xuXG4gICAgICBjb25zdCBTZWxlY3RvciA9IHtcbiAgICAgICAgc3RhdHVzOiBcImFjdGl2ZVwiLFxuICAgICAgfTtcblxuICAgICAgbGV0IG1jY0NvbmZpZyA9IE1jY0NvbmZpZy5maW5kKFNlbGVjdG9yKTtcbiAgICAgIERFRkNPTjcgJiYgY29uc29sZS5sb2cobWNjQ29uZmlnKTtcblxuICAgICAgcmV0dXJuIG1jY0NvbmZpZztcbiAgICB9KTtcbiAgfSk7XG5cbiAgTWV0ZW9yLnB1Ymxpc2goXCJtY2NDb25maWcub25lXCIsIGZ1bmN0aW9uIChmYWNpbGl0eSkge1xuICAgIERFRkNPTjcgJiYgY29uc29sZS5sb2coXCJJbiBtY2NDb25maWcub25lICBzdWJzY3JpYmUgZnVuY3Rpb25cIik7XG4gICAgY2hlY2soZmFjaWxpdHksIFN0cmluZyk7XG4gICAgLy8gaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgIC8vICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiQWNjZXNzIGRlbmllZFwiKTtcbiAgICAvLyB9XG4gICAgdGhpcy5hdXRvcnVuKGZ1bmN0aW9uIChjb21wdXRhdGlvbikge1xuICAgICAgREVGQ09ONyAmJiBjb25zb2xlLmxvZyhcIlN1YnNjcmliaW5nIG1jY0NvbmZpZ1wiKTtcblxuICAgICAgY29uc3QgU2VsZWN0b3IgPSB7XG4gICAgICAgIGZhY2lsaXR5OiBmYWNpbGl0eSxcbiAgICAgICAgc3RhdHVzOiBcImFjdGl2ZVwiLFxuICAgICAgfTtcblxuICAgICAgbGV0IG1jY0NvbmZpZyA9IE1jY0NvbmZpZy5maW5kKFNlbGVjdG9yKTtcbiAgICAgIERFRkNPTjcgJiYgY29uc29sZS5sb2cobWNjQ29uZmlnKTtcblxuICAgICAgcmV0dXJuIG1jY0NvbmZpZztcbiAgICB9KTtcbiAgfSk7XG5cbiAgTWV0ZW9yLnB1Ymxpc2goXCJtY2NDb25maWcuQ291bnRSZWFkXCIsIGZ1bmN0aW9uIChmYWNpbGl0eSkge1xuICAgIERFRkNPTjcgJiYgY29uc29sZS5sb2coXCJJbiBtY2NDb25maWcuQ291bnRSZWFkICBzdWJzY3JpYmUgZnVuY3Rpb25cIik7XG4gICAgY2hlY2soZmFjaWxpdHksIFN0cmluZyk7XG4gICAgLy8gaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgIC8vICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiQWNjZXNzIGRlbmllZFwiKTtcbiAgICAvLyB9XG4gICAgdGhpcy5hdXRvcnVuKGZ1bmN0aW9uIChjb21wdXRhdGlvbikge1xuICAgICAgREVGQ09ONyAmJiBjb25zb2xlLmxvZyhcIlN1YnNjcmliaW5nIENvdW50UmVhZFwiKTtcblxuICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgIGFsbG93RGlza1VzZTogdHJ1ZSxcbiAgICAgIH07XG5cbiAgICAgIHZhciBwaXBlbGluZSA9IFtcbiAgICAgICAge1xuICAgICAgICAgICRtYXRjaDoge1xuICAgICAgICAgICAgcmVhZF9wcm9jX3N0YXR1czogXCJPS1wiLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAkZ3JvdXA6IHtcbiAgICAgICAgICAgIF9pZDoge30sXG4gICAgICAgICAgICBudW1PZlJlYWQ6IHtcbiAgICAgICAgICAgICAgJHN1bTogMSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICRwcm9qZWN0OiB7XG4gICAgICAgICAgICBudW1PZlJlYWQ6IFwiJG51bU9mUmVhZFwiLFxuICAgICAgICAgICAgX2lkOiAwLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICBdO1xuXG4gICAgICBsZXQgbWNjQ29uZmlnID0gTWNjQ29uZmlnLmFnZ3JlZ2F0ZShwaXBlbGluZSwgb3B0aW9ucyk7XG4gICAgICBERUZDT043ICYmIGNvbnNvbGUubG9nKG1jY0NvbmZpZyk7XG5cbiAgICAgIHJldHVybiBtY2NDb25maWc7XG4gICAgfSk7XG4gIH0pO1xufVxuIiwiaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSAnbWV0ZW9yL21ldGVvcic7XG5pbXBvcnQgeyBjaGVjayB9IGZyb20gJ21ldGVvci9jaGVjayc7XG5pbXBvcnQgeyBQcm9ncmFtcywgTW9kdWxlcyB9IGZyb20gJy9saWIvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHtcbiAgREVGQ09OOSxcbiAgREVGQ09ONyxcbiAgREVGQ09ONSxcbiAgREVGQ09ONCxcbiAgREVGQ09OMyxcbiAgREVGQ09OMixcbiAgREVGQ09OMVxufSBmcm9tIFwiL2RlYnVnLmpzb25cIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICBNZXRlb3IucHVibGlzaCgncHJvZ3JhbS5nZXQnLCBmdW5jdGlvbihwcm9ncmFtSWQpIHtcbiAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgJ0FjY2VzcyBkZW5pZWQnKTtcbiAgICB9XG4gICAgY2hlY2soY2hhbm5lbElkLCBTdHJpbmcpO1xuICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKCdJbiBwdWJsaWNhdGlvbi9wcm9ncmFtLmdldCcpO1xuICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGNoYW5uZWxJZCk7XG5cbiAgICB0aGlzLmF1dG9ydW4oZnVuY3Rpb24oY29tcHV0YXRpb24pIHtcbiAgICAgIGNvbnN0IGNoYXRMaW5lc1NlbGVjdG9yID0ge1xuICAgICAgICBjaGFubmVsSWQ6IGNoYW5uZWxJZCxcbiAgICAgICAgc3RhdHVzOiAnYWN0aXZlJ1xuICAgICAgfTtcbiAgICAgIGxldCBjaGF0TGluZXNVc2VySWRzID0gQ2hhdExpbmVzLmZpbmQoY2hhdExpbmVzU2VsZWN0b3IpXG4gICAgICAgIC5mZXRjaCgpXG4gICAgICAgIC5tYXAobGluZSA9PiBsaW5lLmNyZWF0ZWRCeSk7XG5cbiAgICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKCdGaW5kIGNoYXRMaW5lc1VzZXJJZHMnKTtcblxuICAgICAgY29uc3QgdXNlcnNXaXRoQXZhdGFycyA9IE1ldGVvci51c2Vycy5maW5kKFxuICAgICAgICB7XG4gICAgICAgICAgX2lkOiB7XG4gICAgICAgICAgICAkaW46IGNoYXRMaW5lc1VzZXJJZHNcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHsgYXZhdGFyX3VyaTogMSB9XG4gICAgICApO1xuICAgICAgLy8gREVGQ09ONSAmJiBjb25zb2xlLmxvZyh1c2Vyc1dpdGhBdmF0YXJzKTtcbiAgICAgIHJldHVybiBbQ2hhdExpbmVzLmZpbmQoY2hhdExpbmVzU2VsZWN0b3IpLCB1c2Vyc1dpdGhBdmF0YXJzXTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgTWV0ZW9yLnB1Ymxpc2goJ2NoYXRsaW5lcy5mb3JVc2VyJywgZnVuY3Rpb24oKSB7XG4gICAgaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsICdBY2Nlc3MgZGVuaWVkJyk7XG4gICAgfVxuICAgIGNvbnN0IGNoYXRMaW5lc1NlbGVjdG9yID0ge1xuICAgICAgY3JlYXRlZEJ5OiB0aGlzLnVzZXJJZFxuICAgIH07XG4gICAgbGV0IGNoYXRMaW5lc1VzZXJJZHMgPSBDaGF0TGluZXMuZmluZChjaGF0TGluZXNTZWxlY3Rvcik7XG4gICAgLy8gREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIkZpbmQgdXNlcnNcIik7XG4gICAgLy8gREVGQ09ONSAmJiBjb25zb2xlLmxvZyhjaGF0TGluZXNVc2VySWRzKTtcbiAgICByZXR1cm4gY2hhdExpbmVzVXNlcklkcztcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBNZXRlb3IgfSBmcm9tIFwibWV0ZW9yL21ldGVvclwiO1xuaW1wb3J0IHsgY2hlY2sgfSBmcm9tIFwibWV0ZW9yL2NoZWNrXCI7XG5pbXBvcnQgeyBTZWNyZXRzIH0gZnJvbSBcIi9saWIvY29sbGVjdGlvbnNcIjtcbmltcG9ydCB7XG4gIERFRkNPTjksXG4gIERFRkNPTjcsXG4gIERFRkNPTjUsXG4gIERFRkNPTjQsXG4gIERFRkNPTjMsXG4gIERFRkNPTjIsXG4gIERFRkNPTjEsXG59IGZyb20gXCIvZGVidWcuanNvblwiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiU2V0dGluZyB1cCBzZWNyZXRzXCIpO1xuXG4gIE1ldGVvci5wdWJsaXNoKFwic2VjcmV0cy5hbGxcIiwgZnVuY3Rpb24gKCkge1xuICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJJbiB0aGUgc3Vic2NyaWJlIGZ1bmN0aW9uXCIpO1xuXG4gICAgLy8gaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgIC8vICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiQWNjZXNzIGRlbmllZFwiKTtcbiAgICAvLyB9XG4gICAgdGhpcy5hdXRvcnVuKGZ1bmN0aW9uIChjb21wdXRhdGlvbikge1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIlN1YnNjcmliaW5nIHNlY3JldHNcIik7XG5cbiAgICAgIGNvbnN0IFNlbGVjdG9yID0ge1xuICAgICAgICBzdGF0dXM6IFwiYWN0aXZlXCIsXG4gICAgICB9O1xuXG4gICAgICBsZXQgc2VjcmV0cyA9IFNlY3JldHMuZmluZChTZWxlY3Rvcik7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKHNlY3JldHMpO1xuXG4gICAgICByZXR1cm4gc2VjcmV0cztcbiAgICB9KTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBNZXRlb3IgfSBmcm9tIFwibWV0ZW9yL21ldGVvclwiO1xuaW1wb3J0IHsgY2hlY2sgfSBmcm9tIFwibWV0ZW9yL2NoZWNrXCI7XG5pbXBvcnQgeyBTaWduYWxTdGF0ZSwgU2lnbmFsSGlzdG9yeSB9IGZyb20gXCIvbGliL2NvbGxlY3Rpb25zXCI7XG5pbXBvcnQge1xuICAgIERFRkNPTjksXG4gICAgREVGQ09ONyxcbiAgICBERUZDT041LFxuICAgIERFRkNPTjQsXG4gICAgREVGQ09OMyxcbiAgICBERUZDT04yLFxuICAgIERFRkNPTjEsXG59IGZyb20gXCIvZGVidWcuanNvblwiO1xuXG4vLyBjXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJTZXR0aW5nIHVwIHNpZ25hbFN0YXRlXCIpO1xuXG4gICAgTWV0ZW9yLnB1Ymxpc2goXCJzaWduYWxTdGF0ZS5hbGxcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIERFRkNPTjcgJiYgY29uc29sZS5sb2coXCJJbiB0aGUgc3Vic2NyaWJlIGZ1bmN0aW9uXCIpO1xuXG4gICAgICAgIC8vIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgICAgLy8gICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgICAgICAvLyB9XG4gICAgICAgIHRoaXMuYXV0b3J1bihmdW5jdGlvbihjb21wdXRhdGlvbikge1xuICAgICAgICAgICAgREVGQ09ONyAmJiBjb25zb2xlLmxvZyhcIlN1YnNjcmliaW5nIFNpZ25hbFN0YXRlXCIpO1xuXG4gICAgICAgICAgICBjb25zdCBTZWxlY3RvciA9IHt9O1xuXG4gICAgICAgICAgICBsZXQgc2lnbmFsU3RhdGUgPSBTaWduYWxTdGF0ZS5maW5kKFNlbGVjdG9yKTtcbiAgICAgICAgICAgIERFRkNPTjcgJiYgY29uc29sZS5sb2coc2lnbmFsU3RhdGUpO1xuXG4gICAgICAgICAgICByZXR1cm4gc2lnbmFsU3RhdGU7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgTWV0ZW9yLnB1Ymxpc2goXCJzaWduYWxTdGF0ZS5mYWNpbGl0eVwiLCBmdW5jdGlvbihmYWNpbGl0eSkge1xuICAgICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiSW4gZmFjaWxpdHkgIHN1YnNjcmliZSBmdW5jdGlvblwiKTtcbiAgICAgICAgY2hlY2soZmFjaWxpdHksIFN0cmluZyk7XG4gICAgICAgIC8vIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgICAgLy8gICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgICAgICAvLyB9XG4gICAgICAgIHRoaXMuYXV0b3J1bihmdW5jdGlvbihjb21wdXRhdGlvbikge1xuICAgICAgICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIioqKiBTdWJzY3JpYmluZyBmYWNpbGl0eVwiKTtcblxuICAgICAgICAgICAgY29uc3QgU2VsZWN0b3IgPSB7XG4gICAgICAgICAgICBfaWQ6IG5ldyBSZWdFeHAoZmFjaWxpdHksIFwiaVwiKSAgICAgXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgc29ydCA9IFtcbiAgICAgICAgICAgICAgICBbXCJyb3V0ZVwiLCAxLjBdXG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFNlbGVjdG9yKTtcblxuICAgICAgICAgICAgbGV0IHNpZ25hbFN0YXRlID0gU2lnbmFsU3RhdGUuZmluZChTZWxlY3RvciwgeyBzb3J0OiBzb3J0IH0pO1xuICAgICAgICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhzaWduYWxTdGF0ZS5mZXRjaCgpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNpZ25hbFN0YXRlO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIE1ldGVvci5wdWJsaXNoKFwic2lnbmFsU3RhdGUuSGlzdG9yeVwiLCBmdW5jdGlvbihzaWduYWxJZCkge1xuICAgICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiSW4gc2lnbmFsU3RhdGUgIHN1YnNjcmliZSBmdW5jdGlvblwiKTtcbiAgICAgICAgY2hlY2soc2lnbmFsSWQsIFN0cmluZyk7XG4gICAgICAgIC8vIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgICAgLy8gICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgICAgICAvLyB9XG4gICAgICAgIHRoaXMuYXV0b3J1bihmdW5jdGlvbihjb21wdXRhdGlvbikge1xuICAgICAgICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIlN1YnNjcmliaW5nIHNpZ25hbElkXCIpO1xuXG4gICAgICAgICAgICBjb25zdCBTZWxlY3RvciA9IHtcbiAgICAgICAgICAgICAgICBlbnRpdHlJZDogc2lnbmFsSWQsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgc29ydCA9IFtcbiAgICAgICAgICAgICAgICBbXCJ0aW1lXCIsIC0xLjBdXG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFNlbGVjdG9yKTtcblxuICAgICAgICAgICAgbGV0IFNpZ25hbEhpc3RvcnlEYXRhID0gU2lnbmFsSGlzdG9yeS5maW5kKFNlbGVjdG9yLCB7XG4gICAgICAgICAgICAgICAgc29ydDogc29ydCxcbiAgICAgICAgICAgICAgICBsaW1pdDogNDAwLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBERUZDT04zICYmIGNvbnNvbGUubG9nKFNpZ25hbEhpc3RvcnlEYXRhLmZldGNoKCkpO1xuXG4gICAgICAgICAgICByZXR1cm4gU2lnbmFsSGlzdG9yeURhdGE7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSIsImltcG9ydCB7TWV0ZW9yfSBmcm9tICdtZXRlb3IvbWV0ZW9yJztcbmltcG9ydCBGaWxlTWFuYWdlciBmcm9tICcuL2xpYi9maWxlTWFuYWdlci9maWxlbWFuYWdlcic7XG5cblBpY2tlci5yb3V0ZSgnL2ZpbGUvOmZpbGVUeXBlLzpmaWxlSWQnLCBmdW5jdGlvbiAocGFyYW1zLCByZXEsIHJlcywgbmV4dCkge1xuICBsZXQge2ZpbGVUeXBlLCBmaWxlSWR9ID0gcGFyYW1zO1xuICB0cnkge1xuICAgIGxldCBmaWxlTmFtZSA9IGRlY29kZVVSSUNvbXBvbmVudChmaWxlSWQpO1xuICAgIHZhciBmaWxlRGF0YSA9IG5ldyBGaWxlTWFuYWdlcihmaWxlVHlwZSkucmVhZE91dHB1dEZpbGVBc0J1ZmZlcihmaWxlTmFtZSk7XG4gICAgcmVzLnNldEhlYWRlcignQ29udGVudC1kaXNwb3NpdGlvbicsICdhdHRhY2htZW50OyBmaWxlbmFtZT0nICsgZmlsZU5hbWUpO1xuICAgIHJlcy5lbmQoZmlsZURhdGEpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmVzLmVuZCgnRmlsZSBub3QgZm91bmQhJyk7XG4gIH1cblxuXG59KTtcbiIsImltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuaW1wb3J0IHB1YmxpY2F0aW9ucyBmcm9tICcuL3B1YmxpY2F0aW9ucyc7XG5pbXBvcnQgbWV0aG9kcyBmcm9tICcuL21ldGhvZHMnO1xuaW1wb3J0IGFkZEluaXRpYWxEYXRhIGZyb20gJy4vY29uZmlncy9pbml0aWFsX2FkZHMuanMnO1xuaW1wb3J0IGkxOG4gZnJvbSAnbWV0ZW9yL3VuaXZlcnNlOmkxOG4nO1xuaW1wb3J0IHtcbiAgICBERUZDT045LFxuICAgIERFRkNPTjcsXG4gICAgREVGQ09ONSxcbiAgICBERUZDT040LFxuICAgIERFRkNPTjMsXG4gICAgREVGQ09OMixcbiAgICBERUZDT04xXG59IGZyb20gXCIvZGVidWcuanNvblwiO1xuXG5wdWJsaWNhdGlvbnMoKTtcbm1ldGhvZHMoKTtcbmFkZEluaXRpYWxEYXRhKCk7XG5cbi8vXG5NZXRlb3Iuc3RhcnR1cCgoKSA9PiB7XG4gICAgLy8gV2ViQXBwLnJhd0Nvbm5lY3RIYW5kbGVycy51c2UoZnVuY3Rpb24ocmVxLCByZXMsIG5leHQpIHtcbiAgICAvLyAgICAgcmVzLnNldEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiLCBcIipcIik7XG4gICAgLy8gICAgIHJlcy5zZXRIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzXCIsIFwiQXV0aG9yaXphdGlvbixDb250ZW50LVR5cGVcIik7XG4gICAgLy8gICAgIHJldHVybiBuZXh0KCk7XG4gICAgLy8gfSk7XG5cbiAgICBBY2NvdW50cy51cmxzLnJlc2V0UGFzc3dvcmQgPSBmdW5jdGlvbih0b2tlbikge1xuICAgICAgICByZXR1cm4gTWV0ZW9yLmFic29sdXRlVXJsKCdyZXNldC1wYXNzd29yZC8nICsgdG9rZW4pO1xuICAgIH07XG5cbiAgICBBY2NvdW50cy5lbWFpbFRlbXBsYXRlcy5zaXRlTmFtZSA9IGkxOG4uX18oJ0VtYWlsX1NpdGVOYW1lX1RleHQnKTtcbiAgICBBY2NvdW50cy5lbWFpbFRlbXBsYXRlcy5mcm9tID0gaTE4bi5fXygnRW1haWxfRnJvbV9UZXh0Jyk7XG5cbiAgICBBY2NvdW50cy5lbWFpbFRlbXBsYXRlcy5yZXNldFBhc3N3b3JkID0ge1xuICAgICAgICBzdWJqZWN0KHVzZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBpMThuLl9fKCdFbWFpbF9SZXNldFBhc3N3b3JkX1N1YmplY3QnKVxuICAgICAgICB9LFxuXG4gICAgICAgIGh0bWwodXNlciwgdXJsKSB7XG4gICAgICAgICAgICBsZXQgdXJsVGFnID0gYDxhIGhyZWY9XCIke3VybH1cIj4ke3VybH08L2E+YDtcbiAgICAgICAgICAgIHJldHVybiBpMThuLl9fKCdFbWFpbF9SZXNldFBhc3N3b3JkX1RleHQnLCB7IHVybFRhZyB9KVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIEFjY291bnRzLm9uQ3JlYXRlVXNlcigob3B0aW9ucywgdXNlcikgPT4ge1xuICAgICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKCdDcmVhdGluZyB1c2VyIHgnKTtcblxuICAgICAgICB1c2VyLnN0YXR1cyA9ICdhY3RpdmUnO1xuICAgICAgICB1c2VyLm5hbWUgPSBvcHRpb25zLm5hbWU7XG4gICAgICAgIHJldHVybiB1c2VyO1xuXG4gICAgfSk7XG5cbiAgICBBY2NvdW50cy52YWxpZGF0ZUxvZ2luQXR0ZW1wdChmdW5jdGlvbihsb2dpblJlcXVlc3QpIHtcbiAgICAgICAgaWYgKGxvZ2luUmVxdWVzdC51c2VyKSB7XG4gICAgICAgICAgICBpZiAoIWxvZ2luUmVxdWVzdC51c2VyLnN0YXR1cyB8fCBsb2dpblJlcXVlc3QudXNlci5zdGF0dXMgIT0gJ2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDMsIGkxOG4uX18oJ0Vycm9yX0FjY291bnRfTm90QWN0aXZlJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuXG4gICAgQWNjb3VudHMub25Mb2dpbigobG9naW5JbmZvKSA9PiB7XG5cbiAgICAgICAgaWYgKGxvZ2luSW5mbyAmJiBsb2dpbkluZm8uYWxsb3dlZCA9PT0gdHJ1ZSAmJiBsb2dpbkluZm8udHlwZSAhPT0gJ3Jlc3VtZScpIHt9XG4gICAgfSk7XG5cbn0pOyIsImltcG9ydCB0IGZyb20gJ3Rjb21iLWZvcm0nXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCdcblxuY29uc3QgRGF0ZVN0cmluZ1RyYW5zZm9ybWVyID0gZnVuY3Rpb24gKGZvcm1hdFN0cmluZykge1xuXG4gIHJldHVybiB7XG4gICAgZm9ybWF0OiAodmFsdWUpID0+IHtcbiAgICAgIGlmICh0LkRhdGUuaXModmFsdWUpKSB7XG4gICAgICAgIGxldCBtb21lbnREYXRlID0gbW9tZW50KHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG1vbWVudERhdGUuZm9ybWF0KGZvcm1hdFN0cmluZyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSxcbiAgICBwYXJzZTogKHN0cikgPT4ge1xuICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICByZXR1cm4gc3RyID8gbW9tZW50LnBhcnNlKHN0cikudG9EYXRlKCkgOiBudWxsXG4gICAgfVxuICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IERhdGVTdHJpbmdUcmFuc2Zvcm1lcjtcbiIsImltcG9ydCB7IE1vbmdvIH0gZnJvbSBcIm1ldGVvci9tb25nb1wiO1xuaW1wb3J0IHtcbiAgREVGQ09OOSxcbiAgREVGQ09ONyxcbiAgREVGQ09ONSxcbiAgREVGQ09ONCxcbiAgREVGQ09OMyxcbiAgREVGQ09OMixcbiAgREVGQ09OMSxcbn0gZnJvbSBcIi9wYWNrYWdlLmpzb25cIjtcblxuZXhwb3J0IGNvbnN0IFVzZXJzID0gbmV3IE1vbmdvLkNvbGxlY3Rpb24oXCJVc2Vyc1wiKTtcbi8qZXhwb3J0IGNvbnN0IFBlcnNvbnMgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbihcIlBlcnNvbnNcIik7XG5leHBvcnQgY29uc3QgQ291bnRyaWVzID0gbmV3IE1vbmdvLkNvbGxlY3Rpb24oXCJjb3VudHJpZXNcIiwge1xuICBjb25uZWN0aW9uOiBudWxsLFxufSk7XG5leHBvcnQgY29uc3QgU2VhcmNoTG9nID0gbmV3IE1vbmdvLkNvbGxlY3Rpb24oXCJTZWFyY2hMb2dcIik7Ki9cbmV4cG9ydCBjb25zdCBDaGF0TGluZXMgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbihcImNoYXRsaW5lc1wiKTtcbmV4cG9ydCBjb25zdCBDaGF0Um9vbXMgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbihcImNoYXRyb29tc1wiKTtcbmV4cG9ydCBjb25zdCBQcm9ncmFtcyA9IG5ldyBNb25nby5Db2xsZWN0aW9uKFwiZG1fbm9kZV9wcm9ncmFtXCIpO1xuZXhwb3J0IGNvbnN0IE1vZHVsZXMgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbihcImRtX25vZGVfbW9kdWxlXCIpO1xuZXhwb3J0IGNvbnN0IFNlY3JldHMgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbihcImRtX25vZGVfc2VjcmV0c1wiKTtcbmV4cG9ydCBjb25zdCBBcnRpY2xlcyA9IG5ldyBNb25nby5Db2xsZWN0aW9uKFwiZG1fbm9kZV9hcnRpY2xlXCIpO1xuZXhwb3J0IGNvbnN0IFNpZ25hbFN0YXRlID0gbmV3IE1vbmdvLkNvbGxlY3Rpb24oXCJzaWduYWxfc3RhdGVcIik7XG5leHBvcnQgY29uc3QgU2lnbmFsTWV0YSA9IG5ldyBNb25nby5Db2xsZWN0aW9uKFwic2lnbmFsX21ldGFcIik7XG5leHBvcnQgY29uc3QgTWNjQ29uZmlnID0gbmV3IE1vbmdvLkNvbGxlY3Rpb24oXCJzdW5oaWxsX2NvbmZpZ1wiKTtcbmV4cG9ydCBjb25zdCBTaWduYWxIaXN0b3J5ID0gbmV3IE1vbmdvLkNvbGxlY3Rpb24oXCJzaWduYWxfc3RhdGVfaGlzdG9yeVwiKTtcbkRFRkNPTjUgJiYgY29uc29sZS5sb2coXCJGaXhpbmcgY29sbGVjdGlvbnMuLi5cIik7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgY29uc3QgVVNFUl9BQ1RJT05fQUNUSVZBVEUgPSBcImFjdGl2YXRlXCI7XG5leHBvcnQgY29uc3QgVVNFUl9BQ1RJT05fREVBQ1RJVkFURSA9IFwiZGVhY3RpdmF0ZVwiO1xuZXhwb3J0IGNvbnN0IFVTRVJfQUNUSU9OX0FERCA9IFwiYWRkXCI7XG5leHBvcnQgY29uc3QgVVNFUl9TVEFUVVNfQUNUSVZFID0gXCJhY3RpdmVcIjtcbmV4cG9ydCBjb25zdCBVU0VSX1NUQVRVU19JTkFDVElWRSA9IFwiaW5hY3RpdmVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uc3RhbnRzIHtcbiAgc3RhdGljIENhcmRNb2RlID0ge1xuICAgIFBFUlNPTjogJzEwMCcsXG4gICAgTkVXT1JERVI6ICcyMDAnLFxuICAgIE9SREVSOiAnMzAwJ1xuICB9O1xuXG4gIHN0YXRpYyBDYXJkU3RhdHVzID0ge1xuICAgIE5BOiAnMCcsXG4gICAgUUE6ICcxMDAwJyxcbiAgICBSUUE6ICcyMDAwJyxcbiAgICBORVc6ICc1MDAwJyxcbiAgICBGVVRVUkU6ICc2MDAwJyxcbiAgICBPSzogJzgwMDAnXG4gIH07XG5cbiAgc3RhdGljIE9yZGVyUHJvY2Vzc1N0YXR1c2VzID0ge1xuICAgIElOSVQ6ICcwJyxcbiAgICBQRU5ESU5HOiAnMTAnLFxuICAgIE9QRU4xMDA6ICcxMDAnLFxuICAgIE9QRU4xMTA6ICcxMTAnLFxuICAgIE9QRU41MDA6ICc1MDAnLFxuICAgIEZVVFVSRTogJzYwMCcsXG4gICAgVElNRUNIRUNLOiAnMTAwMCcsXG4gICAgUUFDSEVDSzogJzQwMDAnLFxuICAgIFBVQkxJU0g6ICc1MDAwJyxcbiAgICBDT01QTEVURUQ6ICc4MDAwJyxcbiAgICBTVVNQRU5DRTkxMDogJzkxMCcsXG4gICAgU1VTUEVOQ0U5NTA6ICc5NTAnLFxuICAgIFNVU1BFTkNFOTkwOiAnOTkwJyxcbiAgICBDQU5DRUxMRUQ6ICc5OTknXG4gIH07XG5cbiAgc3RhdGljIE9yZGVyVHlwZSA9IHtcbiAgICBORVdfUEVSU09OOiAnMTAwJyxcbiAgICBNSUdSQVRJT046ICcxODgnLFxuICAgIFJFTEFUSU9OX1VQREFURTogJzE4OScsXG4gICAgUkVMQVRJT05fSU5TRVJUOiAnMTkwJyxcbiAgICBDT1JFOiAnMjAwJyxcbiAgICBVUkk6ICcyMDEnLFxuICAgIFNTTjogJzIwMicsXG4gICAgQUREUkVTUzogJzIwMycsXG4gICAgTkFNRTogJzIwNScsXG4gICAgUk9MRV9JTlNFUlQ6ICcyMDYnLFxuICAgIFJPTEVfVVBEQVRFOiAnMjA3J1xuICB9O1xuXG4gIHN0YXRpYyBhY3RpdmVDYXJkID0ge1xuICAgIFJFTEFUSU9OX1VQREFURTogJ1JFTEFUSU9OX1VQREFURScsXG4gICAgUkVMQVRJT05fSU5TRVJUOiAnUkVMQVRJT05fSU5TRVJUJyxcbiAgICBST0xFX1VQREFURTogJ1JPTEVfVVBEQVRFJyxcbiAgICBST0xFX0lOU0VSVDogJ1JPTEVfSU5TRVJUJyxcbiAgICBDT1JFOiAnQ09SRScsXG4gICAgVVJJOiAnVVJJJyxcbiAgICBTU046ICdTU04nLFxuICAgIE5BTUU6ICdOQU1FJyxcbiAgICBBRERSRVNTOiAnQUREUkVTUycsXG4gICAgUk9MRVM6ICdST0xFUydcbiAgfTtcblxuICBzdGF0aWMgR2VuZGVyID0ge1xuICAgIEZFTUFMRTogJ0snLFxuICAgIE1BTEU6ICdNJyxcbiAgfTtcblxuICBzdGF0aWMgT3JkZXJQcm9jZXNzTWV0aG9kID0ge1xuICAgIEVYUFJFU1M6ICdFJyxcbiAgICBERUZBVUxUOiAnRCcsXG4gIH07XG5cbiAgc3RhdGljIGRhdGVQcmVjaXNpb24gPSB7XG4gICAgVU5ERUY6ICd1JyxcbiAgICBZRUFSOiAnWScsXG4gICAgTU9OVEg6ICdNJyxcbiAgICBEQVk6ICdEJ1xuICB9O1xuXG4gIHN0YXRpYyBvcmRlclR5cGVUZWNobmljYWwgPSB7XG4gICAgTkVXX1BFUlNPTl9PUkRFUjogJzM4NCdcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFZhbHVlcyA9IHtcbiAgICBPUkRFUklEOiAnOTk5OTk5OTknXG4gIH07XG5cbiAgc3RhdGljIG1vdGhlckNoZWNrU3RhdGUgPSB7XG4gICAgT0s6IDAsXG4gICAgV0FSTklORzogMTAwLFxuICAgIEVSUk9SX0dFTkVSSUM6IDk5OSxcbiAgICBFUlJPUjogOTk5XG4gIH07XG5cbiAgc3RhdGljIHBlcnNvbk5hbWVUeXBlcyA9IHtcbiAgICBQUkVWSU9VU19OQU1FUzogJzEnLFxuICAgIEFMVEVSTkFUSVZFX05BTUVTOiAnMicsXG4gICAgUFJJTUFSWV9OQU1FOiAnMycsXG4gICAgUkVHSVNUUkVEX05BTUU6ICc0J1xuICB9O1xuXG5cbiAgc3RhdGljIExvYWRpbmdDb21wb25lbnQgPSAoKSA9PiA8ZGl2PiAuLi4gPC9kaXY+O1xuXG59O1xuIiwiaW1wb3J0IHtNZXRlb3J9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2cge1xuICBzdGF0aWMgaW5mbyA9IChjb250ZW50LCBjYWxsYmFjaykgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKGBMb2dnaW5nICR7Y29udGVudH0gb24gc2VydmVyYCk7XG4gICAgTWV0ZW9yLmNhbGwoJ2xvZy5pbmZvJywgY29udGVudCwgKGVyciwgcmVzdWx0KSA9PiB7XG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2soZXJyLCByZXN1bHQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG59XG5cblxuXG4iLCJpbXBvcnQge01ldGVvcn0gZnJvbSAnbWV0ZW9yL21ldGVvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhbmRvbSB7XG4gIHN0YXRpYyBnZW5lcmF0ZVN0cmluZyA9IChsZW5ndGgpID0+IHtcbiAgICBpZiAoIWxlbmd0aCkge1xuICAgICAgbGVuZ3RoID0gNTtcbiAgICB9XG4gICAgbGV0IHRleHQgPSBcIlwiO1xuICAgIGNvbnN0IHBvc3NpYmxlID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OVwiO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKylcbiAgICAgIHRleHQgKz0gcG9zc2libGUuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlLmxlbmd0aCkpO1xuXG4gICAgcmV0dXJuIHRleHQ7XG4gIH07XG5cbn1cblxuXG5cbiIsIi8vIE1ldGVvci51c2Vycy5kZW55ICh7XG4vLyAgIGluc2VydDogKHVzZXJJZCwgZG9jLCBmaWVsZHMsIG1vZGlmaWVyKSA9PiB0cnVlLFxuLy8gICB1cGRhdGU6ICh1c2VySWQsIGRvYywgZmllbGRzLCBtb2RpZmllcikgPT4gdHJ1ZSxcbi8vICAgcmVtb3ZlOiAodXNlcklkLCBkb2MsIGZpZWxkcywgbW9kaWZpZXIpID0+IHRydWUsXG4vLyB9KVxuXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgY29uc3QgUGhvbmUgPSBBc3Ryby5DbGFzcyh7XG4gIG5hbWU6ICdQaG9uZScsXG4gIGZpZWxkczoge1xuICAgIG5hbWU6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgdmFsaWRhdG9yOiBbVmFsaWRhdG9ycy5taW5MZW5ndGgoMyldXG4gICAgfSxcbiAgICBudW1iZXI6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgdmFsaWRhdG9yOiBbVmFsaWRhdG9ycy5taW5MZW5ndGgoOSldXG4gICAgfSxcbiAgICB1dWlkOiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgIH1cbiAgfVxufSk7XG5cbmV4cG9ydCBjb25zdCBFbWFpbCA9IEFzdHJvLkNsYXNzKHtcbiAgbmFtZTogJ0VtYWlsJyxcbiAgZmllbGRzOiB7XG4gICAgYWRkcmVzczoge1xuICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgIC8vIHZhbGlkYXRvcjogW1xuICAgICAgLy8gICBWYWxpZGF0b3JzLm1pbkxlbmd0aCgzKVxuICAgICAgLy8gXVxuICAgIH0sXG4gICAgdmVyaWZpZWQ6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAvLyB2YWxpZGF0b3I6IFtcbiAgICAgIC8vICAgVmFsaWRhdG9ycy5taW5MZW5ndGgoOSlcbiAgICAgIC8vIF1cbiAgICB9XG4gIH1cbn0pO1xuXG5leHBvcnQgY29uc3QgVXNlclByb2ZpbGUgPSBBc3Ryby5DbGFzcyh7XG4gIG5hbWU6ICdVc2VyUHJvZmlsZScsXG4gIGZpZWxkczoge1xuICAgIC8qIEFueSBmaWVsZHMgeW91IHdhbnQgdG8gYmUgcHVibGlzaGVkIHRvIHRoZSBjbGllbnQgKi9cbiAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgdHlwZTogJ3N0cmluZydcbiAgICB9XG4gICAgLy8gbGFzdE5hbWU6IHtcbiAgICAvLyAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIC8vIH0sXG4gICAgLy8gJ3Bob25lcyc6IHtcbiAgICAvLyAgIHR5cGU6ICdhcnJheScsXG4gICAgLy8gICBuZXN0ZWQ6ICdQaG9uZScsXG4gICAgLy8gICBkZWZhdWx0OiBmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgcmV0dXJuIFtdO1xuICAgIC8vICAgfVxuICAgIC8vIH0sXG4gICAgLy8gbmlja25hbWVcbiAgfVxufSk7XG5cbmNvbnN0IFVzZXIgPSBBc3Ryby5DbGFzcyh7XG4gIG5hbWU6ICdVc2VyJyxcbiAgY29sbGVjdGlvbjogTWV0ZW9yLnVzZXJzLFxuICBmaWVsZHM6IHtcbiAgICAvLyBlbWFpbHM6IHtcbiAgICAvLyAgIHR5cGU6ICdhcnJheScsXG4gICAgLy8gICBkZWZhdWx0OiBmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgcmV0dXJuIFtdO1xuICAgIC8vICAgfVxuICAgIC8vIH0sXG5cbiAgICBlbWFpbHM6IHtcbiAgICAgIHR5cGU6ICdhcnJheScsXG4gICAgICBuZXN0ZWQ6ICdFbWFpbCcsXG4gICAgICBkZWZhdWx0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgIH0sXG4gICAgY3JlYXRlZEF0OiAnZGF0ZScsXG4gICAgcHJvZmlsZToge1xuICAgICAgdHlwZTogJ3N0cmluZydcbiAgICB9LFxuICAgIHJvbGVzOiB7XG4gICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgZGVmYXVsdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICAgIH1cbiAgICB9LFxuICAgIF9pc3M6IHtcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgIH0sXG4gICAgX2lzYToge1xuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgfSxcblxuICAgIGF2YXRhcl91cmk6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgfSxcbiAgICBzdGF0dXM6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgfSxcbiAgICBuYW1lOiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgIH0sXG4gICAgdWlkOiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGZpcnN0RW1haWw6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIF8uZ2V0KHRoaXMsICdlbWFpbHNbMF0uYWRkcmVzcycsIG51bGwpO1xuICAgIH1cbiAgICAvLyAsYWNsSXMgOiBmdW5jdGlvbihyb2xlU2x1Zykge1xuICAgIC8vICAgIGNvbnNvbGUubG9nICgnVVVzZXItPmFjbElzSW5Sb2xlIHJvbGUtc2x1ZycsIHJvbGVTbHVnKTtcbiAgICAvLyAgICBjb25zb2xlLmxvZyh0aGlzLnJvbGVzKVxuICAgIC8vICAgcmV0dXJuIF8uY29udGFpbnModGhpcy5yb2xlcywgcm9sZVNsdWcpO1xuICAgIC8vIH1cbiAgfVxufSk7XG5cbmlmIChNZXRlb3IuaXNTZXJ2ZXIpIHtcbiAgVXNlci5leHRlbmQoe1xuICAgIGZpZWxkczoge1xuICAgICAgc2VydmljZXM6IFwib2JqZWN0XCIsXG4gICAgICBsYW5ndWFnZTogXCJzdHJpbmdcIixcbiAgICAgIGF2YXRhcl91cmk6IFwic3RyaW5nXCIsXG4gICAgICBuYW1lOiBcInN0cmluZ1wiLFxuICAgICAgdWlkOiBcInN0cmluZ1wiLFxuICAgICAgdGhlbWU6IFwiYm9vbGVhblwiXG4gICAgfSxcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFVzZXI7XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIG9wdGlvbmFsOiAnIChvcHRpb25hbCknLFxuICByZXF1aXJlZDogJycsXG4gIGFkZDogJ0FkZCcsXG4gIHJlbW92ZTogJ1JlbW92ZScsXG4gIHVwOiAnVXAnLFxuICBkb3duOiAnRG93bidcbn1cbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgb3B0aW9uYWw6ICcgKHZhbGZyaSknLFxuICByZXF1aXJlZDogJycsXG4gIGFkZDogJ0ZvZ2EnLFxuICByZW1vdmU6ICdBdmzDpGdzbmEnLFxuICB1cDogJ1VwcCcsXG4gIGRvd246ICdOZWQnXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh3YWxsYWJ5KSB7XG4gIC8vIFRoZXJlIGlzIGEgd2VpcmQgZXJyb3Igd2l0aCB0aGUgbXVpIGFuZCBtYW50cmEuXG4gIC8vIFNlZTogaHR0cHM6Ly9nb28uZ2wvY0xIOGliXG4gIC8vIFVzaW5nIHJlcXVpcmUgaGVyZSBzZWVtcyB0byBiZSB0aGUgZXJyb3IuXG4gIC8vIFJlbmFtaW5nIGl0IGludG8gYGxvYWRgIGp1c3QgZml4ZWQgdGhlIGlzc3VlLlxuICB2YXIgbG9hZCA9IHJlcXVpcmU7XG5cbiAgcmV0dXJuIHtcbiAgICBmaWxlczogW1xuICAgICAgJ2NsaWVudC9tb2R1bGVzLyoqL2NvbXBvbmVudHMvKi5qc3gnLFxuICAgICAgJ2NsaWVudC9tb2R1bGVzLyoqL2FjdGlvbnMvKi5qcycsXG4gICAgICAnY2xpZW50L21vZHVsZXMvKiovY29udGFpbmVycy8qLmpzJyxcbiAgICAgICdjbGllbnQvbW9kdWxlcy8qKi9saWJzLyouanMnXG4gICAgXSxcbiAgICB0ZXN0czogW1xuICAgICAgJ2NsaWVudC8qKi90ZXN0cy8qLmpzJ1xuICAgIF0sXG4gICAgY29tcGlsZXJzOiB7XG4gICAgICAgJyoqLyouanMqJzogd2FsbGFieS5jb21waWxlcnMuYmFiZWwoe1xuICAgICAgICAgYmFiZWw6IGxvYWQoJ2JhYmVsLWNvcmUnKSxcbiAgICAgICAgIHByZXNldHM6IFsnZXMyMDE1JywgJ3N0YWdlLTInLCAncmVhY3QnXVxuICAgICAgIH0pXG4gICAgfSxcbiAgICBlbnY6IHtcbiAgICAgIHR5cGU6ICdub2RlJ1xuICAgIH0sXG4gICAgdGVzdEZyYW1ld29yazogJ21vY2hhJ1xuICB9O1xufTtcbiJdfQ==
