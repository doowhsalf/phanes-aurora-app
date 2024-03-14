var require = meteorInstall({"server":{"lib":{"drupal":{"services.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/lib/drupal/services.js                                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    //let orderstate = '391';
    let query = {
      data: {
        query: searchText
      }
    };
    return this.sendRequest(serviceUrl, query);
  }
  queryOrderState(state, limit) {
    let serviceUrl = "".concat(Meteor.settings.drupalOrderQuery);
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    //let orderstate = '391';
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
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    //let orderstate = '391';
    let query = {
      data: {
        field_personid: searchText
      }
    };
    return this.sendRequest(serviceUrl, query);
  }
  queryRecentOrders() {
    let serviceUrl = "".concat(Meteor.settings.drupalOrderQuery);
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    //let orderstate = '391';
    let query = {
      data: {
        query_limit: "50"
      }
    };
    return this.sendRequest(serviceUrl, query);
  }
  motherchecks() {
    let serviceUrl = "".concat(Meteor.settings.drupalMotherCheck);
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    //let orderstate = '391';
    let query = {
      data: {}
    };
    return this.sendRequest(serviceUrl, query);
  }
  queryOrderByOrderId(searchText) {
    let serviceUrl = "".concat(Meteor.settings.drupalOrderQuery);
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    //let orderstate = '391';
    let query = {
      data: {
        field_orderid: searchText
      }
    };
    return this.sendRequest(serviceUrl, query);
  }
  updateOrderByOrderId(order) {
    let serviceUrl = "".concat(Meteor.settings.drupalOrderUpdate);
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    // just pass the order

    DEFCON3 && console.log("Checking data in updateOrderByOrderId");
    DEFCON3 && console.log(order);

    //order.acting_uid = userObj.uid;
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
    serviceUrl = serviceUrl.replace(/([^:]\/)\/+/g, "$1");
    //let orderstate = '391';
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
        const response = Promise.await(this.sendRequestAsync(serviceUrl, query));
        //roles contain arrays of company ids
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"fileManager":{"filemanager.js":function module(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/lib/fileManager/filemanager.js                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"adminrole.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/lib/adminrole.js                                                                                            //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let Admins, Workgroups, WorkgroupUsers, PublishingRegions, Articles;
module.link("/lib/collections", {
  Admins(v) {
    Admins = v;
  },
  Workgroups(v) {
    Workgroups = v;
  },
  WorkgroupUsers(v) {
    WorkgroupUsers = v;
  },
  PublishingRegions(v) {
    PublishingRegions = v;
  },
  Articles(v) {
    Articles = v;
  }
}, 0);
let Constants;
module.link("/lib/constants", {
  default(v) {
    Constants = v;
  }
}, 1);
let Workgroup;
module.link("./workgroup", {
  default(v) {
    Workgroup = v;
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
module.exportDefault({
  isSuperAdmin: function (userId) {
    const admin = Admins.findOne({
      status: 'active',
      userId,
      roleId: Constants.UserRoles.SUPER_ADMIN
    });
    return !!admin;
  },
  isRegionAdmin: function (userId, regionId) {
    if (!regionId || !userId) {
      return false;
    }
    let regionIds = [];
    if (Array.isArray(regionId)) {
      regionIds = regionId;
    } else {
      regionIds.push(regionId);
    }
    const regionAdmin = Admins.findOne({
      status: 'active',
      userId,
      regionId: {
        $in: regionIds
      },
      roleId: Constants.UserRoles.REGION_ADMIN
    });
    return !!regionAdmin || this.isSuperAdmin(userId);
  },
  isAnyRegionAdmin: function (userId) {
    if (!userId) {
      return false;
    }
    const regionAdmin = Admins.findOne({
      status: 'active',
      userId,
      roleId: Constants.UserRoles.REGION_ADMIN
    });
    return !!regionAdmin || this.isSuperAdmin(userId);
  },
  isWorkgroupRegionAdmin: function (userId, workgroupId) {
    if (!workgroupId || !userId) {
      return false;
    }
    const workgroup = Workgroups.findOne({
      status: 'active',
      '_id': workgroupId
    });
    const regionIds = workgroup && workgroup.field_publishing_region ? workgroup.field_publishing_region : [];
    const regionAdmin = Admins.findOne({
      status: 'active',
      userId,
      regionId: {
        $in: regionIds
      },
      roleId: Constants.UserRoles.REGION_ADMIN
    });
    return !!regionAdmin || this.isSuperAdmin(userId);
  },
  isArticlesRegionAdmin: function (userId, articleId) {
    if (!articleId || !userId) {
      return false;
    }
    const article = Articles.findOne({
      status: 'active',
      '_id': articleId
    });
    const regionIds = article && article.publishingRegions ? article.publishingRegions : [];
    const regionAdmin = Admins.findOne({
      status: 'active',
      userId,
      regionId: {
        $in: regionIds
      },
      roleId: Constants.UserRoles.REGION_ADMIN
    });
    return !!regionAdmin || this.isSuperAdmin(userId);
  },
  isArticlesWorkgroupAdmin: function (userId, articleId) {
    if (!articleId || !userId) {
      return false;
    }
    const article = Articles.findOne({
      status: 'active',
      _id: articleId
    });
    if (!article || !article.workgroupId) {
      return false;
    }
    return this.isWorkgroupAdmin(userId, article.workgroupId);
  },
  isWorkgroupAdmin: function (userId, workgroupId) {
    if (!workgroupId || !userId) {
      return false;
    }
    const workgroupAdmin = WorkgroupUsers.findOne({
      status: 'active',
      user_id: userId,
      workgroup_id: workgroupId,
      user_group_role: Constants.UserRoles.WORKGROUP_ADMIN
    });
    const isWorkgroupAdmin = !!workgroupAdmin;
    const workgroup = Workgroups.findOne({
      status: 'active',
      '_id': workgroupId
    });
    const regionIds = workgroup && workgroup.field_publishing_region ? workgroup.field_publishing_region : [];
    const result = isWorkgroupAdmin || this.isRegionAdmin(userId, regionIds) || this.isSuperAdmin(userId);
    return result;
  },
  getAdminRegionIds: function (userId) {
    if (this.isSuperAdmin(userId)) {
      return PublishingRegions.find({
        status: 'active'
      }).fetch().map(region => region._id);
    }
    const regionsFromRole = Admins.find({
      status: 'active',
      userId,
      roleId: Constants.UserRoles.REGION_ADMIN
    }).fetch().map(adminRole => adminRole.regionId);
    return regionsFromRole ? regionsFromRole : [];
  },
  getAdminWorkgroupIds: function (userId) {
    const regionIds = this.getAdminRegionIds(userId);
    const workgroupIds = Workgroups.find({
      status: 'active',
      'field_publishing_region': {
        $in: regionIds
      }
    }).fetch().map(workgroup => workgroup._id);
    return workgroupIds;
  },
  getRegionAdminsIds: function (regionId) {
    const adminsForRegion = Admins.find({
      status: 'active',
      roleId: Constants.UserRoles.REGION_ADMIN,
      regionId
    }).fetch().map(adminRole => adminRole.userId);
    return adminsForRegion ? adminsForRegion : [];
  },
  getRegionAdminsCursor: function (regionId) {
    return Admins.find({
      status: 'active',
      roleId: Constants.UserRoles.REGION_ADMIN,
      regionId
    });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"chat.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/lib/chat.js                                                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"chatroom.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/lib/chatroom.js                                                                                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
module.exportDefault({
  /*
          Gets all active aritcles' ids for user
          */

  _upsertChatroom(activeProgram, users, userUrl, programUrl, chatRoomType) {
    let user_list = [];
    DEFCON3 && console.log("Fixing chatroom - users and program");
    DEFCON3 && console.log(users);
    DEFCON3 && console.log(activeProgram);
    const currentDate = new Date();
    users.forEach(user => {
      item = {
        userId: user
      };
      user_list.push(item);
    });

    // have to set subtitle to small letters
    var chatRoom = {
      createdAt: currentDate,
      modifiedAt: currentDate,
      status: "active",
      createdBy: activeProgram.createdBy,
      url: programUrl,
      userUrl: userUrl,
      title: activeProgram.title,
      subtitle: activeProgram.subTitle,
      users: user_list,
      channelId: activeProgram._id,
      chatRoomType: chatRoomType
    };
    const query = {
      channelId: activeProgram.channelId
    };
    const update = {
      $set: chatRoom
    };
    const options = {
      upsert: true
    };
    ChatRooms.update(query, update, options);
  },
  _upsertChatroomsetActiveUser(channelId, userId) {
    const chatRooms = ChatRooms.find({
      channelId: channelId
    }).fetch();
    DEFCON3 && console.log("Getting chatRooms");
    DEFCON3 && console.log(chatRooms);
    DEFCON3 && console.log("Update active user timestamp");
    DEFCON3 && console.log(channelId);
    DEFCON3 && console.log(userId);
    const chatLinesSelector = {
      channelId: channelId,
      status: "active"
    };
    let chatLines = ChatLines.find(chatLinesSelector).fetch();
    DEFCON3 && console.log(chatLines);
    const currentDate = new Date();
    let item = {};
    let userActiveList = [];
    let isNewUser = true;
    if (chatRooms[0].userActiveList !== undefined) {
      chatRooms[0].userActiveList.forEach(user => {
        isNewUser = user.userId === userId ? false : isNewUser;
        let theActiveDate = user.userId === userId ? currentDate : user.activeDate,
          item = {
            userId: user.userId,
            activeDate: theActiveDate,
            unReadMessages: _unReadMessages(theActiveDate, chatLines)
          };
        userActiveList.push(item);
      });
    }
    if (isNewUser) {
      DEFCON3 && console.log("The new user is a new user");
      item = {
        userId: userId,
        activeDate: currentDate,
        unReadMessages: _unReadMessages(currentDate, chatLines)
      };
      userActiveList.push(item);
    }
    let index = chatLines.length - 1;
    DEFCON3 && console.log("CHATLINES LENGTH");
    DEFCON3 && console.log(index);

    // have to set subtitle to small letters
    var chatRoom = {
      modifiedAt: currentDate,
      lastAction: chatLines[index].text,
      userActiveList: userActiveList
    };
    const query = {
      channelId: channelId
    };
    const update = {
      $set: chatRoom
    };
    const options = {
      upsert: true
    };
    ChatRooms.update(query, update, options);
  },
  _getNumOfUnreadMessages(userId) {
    const chatRoomsSelector = {
      status: "active",
      "users.userId": {
        $in: [userId]
      }
    };
    const chatRooms = ChatRooms.find(chatRoomsSelector).fetch();
    DEFCON3 && console.log("Find check chat room for user...");
    DEFCON3 && console.log(chatRooms);
    return _usersUnReadMessages(userId, chatRooms);
  }
});
function _usersUnReadMessages(userId, chatRooms) {
  let totalUnRead = 0;
  chatRooms.forEach(chatRoom => {
    if (chatRoom.userActiveList !== undefined) {
      chatRoom.userActiveList.forEach(activeUser => {
        if (activeUser.userId === userId) {
          totalUnRead = totalUnRead + activeUser.unReadMessages;
        }
      });
    }
  });
  DEFCON3 && console.log("Total Unread messages for user");
  DEFCON3 && console.log(userId);
  DEFCON3 && console.log(totalUnRead);
  return totalUnRead;
}
function _unReadMessages(date2check, chatLines) {
  DEFCON3 && console.log("check unread");
  DEFCON3 && console.log(date2check);
  DEFCON3 && console.log(chatLines);
  let unReadMessages = 0;
  chatLines.forEach(chatLine => {
    if (date2check < chatLine.createdAt) {
      unReadMessages++;
    }
  });
  DEFCON3 && console.log("UnReadMessages");
  DEFCON3 && console.log(unReadMessages);
  return unReadMessages;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"notices.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/lib/notices.js                                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let _objectSpread;
module.link("@babel/runtime/helpers/objectSpread2", {
  default(v) {
    _objectSpread = v;
  }
}, 0);
let Notices, NoticesUserStatus;
module.link("/lib/collections", {
  Notices(v) {
    Notices = v;
  },
  NoticesUserStatus(v) {
    NoticesUserStatus = v;
  }
}, 0);
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
}, 1);
module.exportDefault({
  addNotice: function (notice, users) {
    "use strict";
    const currentUser = Meteor.user()._id;
    const currentUserId = Meteor.user()._id;
    const currentDate = new Date();
    let newNotice = {};
    newNotice = _objectSpread({}, notice);
    newNotice.modifiedBy = currentUser;
    newNotice.createdByName = currentUser;
    newNotice.createdBy = currentUserId;
    newNotice.modifiedAt = currentDate;
    newNotice.createdAt = currentDate;
    newNotice.status = "active";
    let noticeId = Notices.insert(newNotice);
    return noticeId;
  },
  addNoticeByFields: function (eventClass, event, what, entity, entityId, entityUri, entityName, users) {
    "use strict";
    DEFCON5 && console.log("Create a new notice");
    DEFCON5 && console.log(eventClass);
    const currentUser = Meteor.user().name;
    const currentUserId = Meteor.user()._id;
    const currentDate = new Date();
    const avatar_uri = Meteor.user().avatar_uri;
    let noticeId = null;
    let newNotice = {};
    newNotice.what = what;
    newNotice.entity = entity;
    newNotice.entityId = entityId;
    newNotice.eventClass = eventClass;
    newNotice.event = event;
    newNotice.entityName = entityName;
    newNotice.entity_uri = entityUri;
    newNotice.avatar_uri = avatar_uri;
    newNotice.modifiedBy = currentUserId;
    newNotice.createdByName = currentUser;
    newNotice.createdBy = currentUserId;
    newNotice.modifiedAt = currentDate;
    newNotice.createdAt = currentDate;
    newNotice.status = "active";
    DEFCON5 && console.log(newNotice);
    const query = {
      entityId: entityId,
      event: event
    };
    const update = {
      $set: newNotice
    };
    const options = {
      upsert: true
    };

    //let noticeId = Notices.insert(newNotice);
    let status = Notices.update(query, update, options);
    if (status) {
      let notices = Notices.find(query).fetch();
      DEFCON5 && console.log("Generated NotiseId");
      DEFCON5 && console.log(notices);
      noticeId = notices[0]._id ? notices[0]._id : noticeId;
      // let user_list = [];
      DEFCON5 && console.log("Checking users");
      DEFCON5 && console.log(users);
      if (users !== undefined) {
        DEFCON5 && console.log("Archive previous review ");
        const query = {
          noticeId: notices[0]._id
        };
        const update = {
          $set: {
            status: "archived"
          }
        };
        const options = {
          multi: true
        };
        let status = NoticesUserStatus.update(query, update, options);
        users.forEach(userId => {
          DEFCON5 && console.log("Query for updating user notices");
          DEFCON5 && console.log(query);
          DEFCON5 && console.log("Add user to notice");
          DEFCON5 && console.log(userId);
          let item = {
            userId: userId,
            noticeId: notices[0]._id,
            modifiedBy: currentUserId,
            createdByName: currentUser,
            createdBy: currentUserId,
            modifiedAt: currentDate,
            createdAt: currentDate,
            readIt: false,
            readAt: null,
            status: "active"
          };
          let _statusId = NoticesUserStatus.insert(item);
        });
      }
    }
    return noticeId;
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"order.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/lib/order.js                                                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
      DEFCON5 && console.log("Sending notification to Gundrun");
      // DEFCON5 && console.log(this.user);
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"workgroup.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/lib/workgroup.js                                                                                            //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({
  default: () => Workgroup
});
let check;
module.link("meteor/check", {
  check(v) {
    check = v;
  }
}, 0);
let Workgroups, WorkgroupUsers, UserWorkgroupRoles, WorkgroupVouchers;
module.link("/lib/collections", {
  Workgroups(v) {
    Workgroups = v;
  },
  WorkgroupUsers(v) {
    WorkgroupUsers = v;
  },
  UserWorkgroupRoles(v) {
    UserWorkgroupRoles = v;
  },
  WorkgroupVouchers(v) {
    WorkgroupVouchers = v;
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
const ADMIN_ROLE_NAME = 'Admin';
const MEMBER_ROLE_NAME = 'Member';
class Workgroup {
  constructor(workgroupId, userId) {
    this.workgroupId = workgroupId;
    this.userId = userId;
    this.workgroup = null;
  }
  static getUserWorkgroupIds(userId, asAdmin) {
    const role = UserWorkgroupRoles.findOne({
      name: asAdmin ? ADMIN_ROLE_NAME : MEMBER_ROLE_NAME
    });
    return WorkgroupUsers.find({
      status: 'active',
      user_id: userId,
      user_group_role: role._id
    }).fetch().map(wu => wu.workgroup_id);
  }
  static getRegionsWorkgroupIds(regionIds) {
    const ids = [];
    if (regionIds) {
      if (Array.isArray(regionIds)) {
        ids.concat(regionIds);
      } else {
        ids.push(regionIds);
      }
    }
    const workgroupIds = Workgroups.find({
      status: 'active',
      field_publishing_region: {
        $in: ids
      }
    }).fetch().map(w => w._id);

    //DEFCON5 && console.log ('WORKGROUPS FOR REGIONS: ');
    //DEFCON5 && console.log (regionIds);
    //DEFCON5 && console.log (workgroupIds);
    return workgroupIds;
  }
  getWorkgroupEntity() {
    if (!this.workgroup) {
      const workgroup = Workgroups.findOne({
        _id: this.workgroupId,
        status: 'active'
      });
      this.workgroup = workgroup;
    }
    return this.workgroup;
  }
  getWorkgroupRegionIds() {
    const workgroupEntity = this.getWorkgroupEntity();
    if (!workgroupEntity) {
      return [];
    }
    return workgroupEntity.field_publishing_region;
  }
  addWorkgroupRegion(regionId) {
    if (this.workgroupId && regionId) {
      Workgroups.update({
        _id: this.workgroupId
      }, {
        $addToSet: {
          field_publishing_region: regionId
        }
      });
      Workgroups.update({
        _id: this.workgroupId
      }, {
        $set: {
          modifiedBy: this.userId,
          modifiedAt: new Date()
        }
      });
    }
  }
  removeWorkgroupRegion(regionId) {
    if (this.workgroupId && regionId) {
      Workgroups.update({
        _id: this.workgroupId
      }, {
        $pull: {
          field_publishing_region: regionId
        }
      });
      Workgroups.update({
        _id: this.workgroupId
      }, {
        $set: {
          modifiedBy: this.userId,
          modifiedAt: new Date()
        }
      });
    }
  }
  updateField(fieldName, value) {
    const currentUser = this.userId;
    const currentDate = new Date();
    if (this.workgroupId) {
      const values = {
        modifiedBy: currentUser,
        modifiedAt: currentDate
      };
      values[fieldName] = value;
      Workgroups.update({
        _id: this.workgroupId
      }, {
        $set: values
      });
    }
  }
  isUserAdminInWorkgroup(workgroupId) {
    if (!workgroupId) {
      //console.log(`Checking if user ${this.userId} is admin for workgroup ${this.workgroupId}`);
    } else {
      //console.log(`Checking if user ${this.userId} is admin for workgroup ${workgroupId}`);
    }
    const adminRole = UserWorkgroupRoles.findOne({
      name: ADMIN_ROLE_NAME
    });
    if (adminRole) {
      const selectedWorkgroups = WorkgroupUsers.find({
        workgroup_id: workgroupId ? workgroupId : this.workgroupId,
        status: 'active',
        user_id: this.userId,
        user_group_role: adminRole._id
      }).fetch();
      return selectedWorkgroups.length === 1;
    }
    return false;
  }
  isOtherUserAdminInWorkgroup(userId) {
    //console.log(`Checking if user ${userId} is admin for workgroup ${this.workgroupId}`);
    const adminRole = UserWorkgroupRoles.findOne({
      name: ADMIN_ROLE_NAME
    });
    if (adminRole) {
      const selectedWorkgroups = WorkgroupUsers.find({
        workgroup_id: this.workgroupId,
        status: 'active',
        user_id: userId,
        user_group_role: adminRole._id
      }).fetch();
      //console.log(selectedWorkgroups.length);
      return selectedWorkgroups.length === 1;
    }
    return false;
  }
  isUserWorkgroupUserAdmin(workgroupUserId) {
    //console.log(`Checking if user ${this.userId} is admin for workgroupUser ${workgroupUserId}`);

    let workgroupId = '';
    // get workgroupId from workgroupUser
    const workgroupUser = WorkgroupUsers.findOne(workgroupUserId);
    if (workgroupUser) {
      workgroupId = workgroupUser.workgroup_id;
    }
    return this.isUserAdminInWorkgroup(workgroupId);
  }
  isUserAdminInAnyGroup() {
    //console.log(`Checking if user ${this.userId} is admin in any workgroup`);
    const adminRole = UserWorkgroupRoles.findOne({
      name: ADMIN_ROLE_NAME
    });
    if (adminRole) {
      const selectedWorkgroups = WorkgroupUsers.find({
        status: 'active',
        user_id: this.userId,
        user_group_role: adminRole._id
      }).fetch();
      return selectedWorkgroups.length > 0;
    }
    return false;
  }
  getWorkgroupAdminsIds() {
    let admins = [];
    const adminRole = UserWorkgroupRoles.findOne({
      name: ADMIN_ROLE_NAME
    });
    if (adminRole) {
      const adminWorkgroupUsers = WorkgroupUsers.find({
        workgroup_id: this.workgroupId,
        status: 'active',
        user_group_role: adminRole._id
      }).fetch();
      adminWorkgroupUsers.forEach(workgroupUser => admins.push(workgroupUser.user_id));
    }
    return admins;
  }
  addUser(userId) {
    let asAdmin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    let addedWorkgroupUserId = '';
    let currentWorkgroupUserEntity = WorkgroupUsers.findOne({
      workgroup_id: this.workgroupId,
      user_id: userId
    });
    const currentUser = this.userId;
    const currentDate = new Date();

    //if we have one just change the status - dont need to store all the changes
    if (currentWorkgroupUserEntity) {
      addedWorkgroupUserId = currentWorkgroupUserEntity._id;
      WorkgroupUsers.update({
        _id: currentWorkgroupUserEntity._id
      }, {
        $set: {
          status: 'active',
          modifiedBy: currentUser,
          modifiedAt: currentDate
        }
      });
    } else {
      const memberRole = asAdmin ? UserWorkgroupRoles.findOne({
        name: ADMIN_ROLE_NAME
      }) : UserWorkgroupRoles.findOne({
        name: MEMBER_ROLE_NAME
      });
      const workgroupUser = {
        workgroup_id: this.workgroupId,
        user_id: userId,
        user_group_role: memberRole._id,
        modifiedBy: currentUser,
        createdBy: currentUser,
        modifiedAt: currentDate,
        createdAt: currentDate,
        status: 'active'
      };
      addedWorkgroupUserId = WorkgroupUsers.insert(workgroupUser);
    }
    return addedWorkgroupUserId;
  }
  static addUserAsSystem(workgroupId, userId) {
    let activate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    //console.log("Adding user to workgroup");
    //console.log(userId + " | " + workgroupId);
    let addedWorkgroupUserId = '';
    let currentWorkgroupUserEntity = WorkgroupUsers.findOne({
      workgroup_id: workgroupId,
      user_id: userId
    });
    const currentUser = 'SYSTEM';
    const currentDate = new Date();

    //if we have one just change the status - dont need to store all the changes
    if (currentWorkgroupUserEntity) {
      addedWorkgroupUserId = currentWorkgroupUserEntity._id;
      WorkgroupUsers.update({
        _id: currentWorkgroupUserEntity._id
      }, {
        $set: {
          status: activate ? 'active' : 'pending',
          modifiedBy: currentUser,
          modifiedAt: currentDate
        }
      });
    } else {
      const memberRole = UserWorkgroupRoles.findOne({
        name: MEMBER_ROLE_NAME
      });
      const workgroupUser = {
        workgroup_id: workgroupId,
        user_id: userId,
        user_group_role: memberRole._id,
        modifiedBy: currentUser,
        createdBy: currentUser,
        modifiedAt: currentDate,
        createdAt: currentDate,
        status: activate ? 'active' : 'pending'
      };
      addedWorkgroupUserId = WorkgroupUsers.insert(workgroupUser);
    }
    return addedWorkgroupUserId;
  }
  getWorkgroupPublishingName() {
    const workgroup = this.getWorkgroupEntity();
    return workgroup && workgroup.publishingName || '???';
  }
  getWorkgroupVoucher() {
    return WorkgroupVouchers.findOne({
      workgroupId: this.workgroupId,
      status: 'active'
    });
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"configs":{"app.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/configs/app.js                                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let version, version_focus, version_build_date;
module.link("../../package.json", {
  version(v) {
    version = v;
  },
  version_focus(v) {
    version_focus = v;
  },
  version_build_date(v) {
    version_build_date = v;
  }
}, 0);
module.exportDefault({
  name: "v" + version + " " + version_focus,
  version: "v" + version,
  version_build_date: version_build_date
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"initial_adds.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/configs/initial_adds.js                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let chatlines;
module.link("/lib/collections", {
  chatlines(v) {
    chatlines = v;
  }
}, 0);
module.exportDefault(function () {});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"initial_users.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/configs/initial_users.js                                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"methods":{"_users.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/methods/_users.js                                                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
let AdminRole;
module.link("../lib/adminrole", {
  default(v) {
    AdminRole = v;
  }
}, 2);
let Random;
module.link("meteor/random", {
  Random(v) {
    Random = v;
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
      DEFCON5 && console.log(chatUsers);
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
      check(lang, String);
      // Meteor.users.update({_id: _id}, {set: {language: lang}})
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
      if (!this.userId || this.userId !== userId && !AdminRole.isSuperAdmin(this.userId)) {
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
      if (!this.userId || this.userId !== userId && !AdminRole.isSuperAdmin(this.userId)) {
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
    "_users.updateEmail"(userId, email) {
      check(userId, String);
      check(email, String);
      if (!this.userId || this.userId !== userId && !AdminRole.isSuperAdmin(this.userId)) {
        throw new Meteor.Error(401, "Access denied");
      }
      let updated = Meteor.users.update({
        _id: userId
      }, {
        $set: {
          "emails.0.address": email
        }
      });
      if (updated) {
        return "Email updated";
      } else {
        return "Email not updated! Please try again.";
      }
    },
    "_users.anonymize"(userId) {
      check(userId, String);
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      if (AdminRole.isSuperAdmin(this.userId)) {
        const newUser = {
          name: Random.id(),
          "emails.0.address": Random.id() + "@" + Random.id() + ".weylan.yt",
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
    }
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"account.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/methods/account.js                                                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
        }
        // if (user) {
        //   DEFCON5 && console.log(`Get user and update heartbeat...`);
        //   DEFCON5 && console.log(user.uid + " " + user.username);
        //   Meteor.users.update(user._id, { $set: { heartbeat: new Date() } });
        // }
      }
      //
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
  Future = Npm.require("fibers/future");
  // At a minimum, set up LDAP_DEFAULTS.url and .dn according to
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
    this.options = _.defaults(options, DRUPAL_DEFAULTS);

    // Make sure options have been set
    try {
      // check(this.options.url, String);
      // check(this.options.dn, String);
    } catch (e) {
      throw new Meteor.Error("Bad Defaults", "Options not set. Make sure to set LDAP_DEFAULTS.url and LDAP_DEFAULTS.dn!");
    }

    // // Because NPM ldapjs module has some binary builds,
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
    DEFCON3 && console.log("Login Check Drupal (NEW)");

    // DEFCON3 && console.log('drupalCheck');
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
            }

            // eslint-disable-next-line quote-props
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
  };

  // Register login handler with Meteor
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
    }

    // Instantiate LDAP with options
    var userOptions = loginRequest.ldapOptions || {};
    Accounts.ldapObj = new LDAP.create(userOptions);

    // Call ldapCheck and get response
    var response = Accounts.ldapObj.drupalCheck(loginRequest, true);
    if (response.error) {
      return {
        userId: null,
        error: response.error
      };
    }
    // Set initial userId and token vals
    var userId = null;
    var stampedToken = {
      token: null
    };
    DEFCON3 && console.log("response:");
    DEFCON3 && console.log(response);

    // Look to see if user already exists
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
    }

    // Login user if they exist
    if (user) {
      userId = user._id;

      // Create hashed token so user stays logged in
      stampedToken = Accounts._generateStampedLoginToken();
      var hashStampedToken = Accounts._hashStampedToken(stampedToken);
      // Update the user's token in mongo
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
    }
    // Otherwise create user if option is set
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"agents.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/methods/agents.js                                                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
let Constants;
module.link("/lib/constants", {
  default(v) {
    Constants = v;
  }
}, 3);
DEFCON5 && console.log("In Account");
var staleSessionPurgeInterval = Meteor.settings && Meteor.settings.public && Meteor.settings.public.staleSessionPurgeInterval || 1 * 60 * 1000; // 1min
var inactivityTimeout = Meteor.settings && Meteor.settings.public && Meteor.settings.public.staleSessionInactivityTimeout || 30 * 60 * 1000; // 30mins
var forceLogout = Meteor.settings && Meteor.settings.public && Meteor.set;
module.exportDefault(function () {
  Meteor.methods({
    heartbeat: function (options) {
      DEFCON5 && console.log("Heartbeat check - if user should reConnect");
      var user = Meteor.users.findOne(this.userId);
      DEFCON5 && console.log(this.userId);
      if (user) {
        DEFCON5 && console.log("Get user and update heartbeat...");
        DEFCON5 && console.log(user._id + " " + user.name);
        let updated = Meteor.users.update({
          _id: this.userId
        }, {
          $set: {
            heartbeat: new Date(),
            isOnline: true
          }
        }, function (error) {
          DEFCON5 && console.log("Some error occured.");
          DEFCON5 && console.log(error);
        });
        DEFCON5 && console.log("Result after update is...");
        DEFCON5 && console.log(updated);
      } else {
        DEFCON5 && console.log("This userid is not set...");
      }
      // if (user) {
      //   DEFCON5 && console.log(`Get user and update heartbeat...`);
      //   DEFCON5 && console.log(user.uid + " " + user.username);
      //   Meteor.users.update(user._id, { $set: { heartbeat: new Date() } });
      // }
    }
    //
  });
});
//
// periodically purge any stale sessions, removing their login tokens and clearing out the stale heartbeat.
//
if (forceLogout !== false) {
  DEFCON5 && console.log("HeartBeatChec Check if users still online...");
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
      $set: {
        heartbeat: 1,
        isOnline: false
      }
    }, {
      multi: true
    }, function (error) {
      DEFCON5 && console.log("Some error occured.");
      DEFCON5 && console.log(error);
    });
    Meteor.users.update({
      heartbeat: {
        $gt: overdueTimestamp
      }
    }, {
      $set: {
        isOnline: true
      }
    }, {
      multi: true
    }, function (error) {
      DEFCON5 && console.log("Some error occured.");
      DEFCON5 && console.log(error);
    });
  }, staleSessionPurgeInterval);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"chatlinelists.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/methods/chatlinelists.js                                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
let ChatRoom;
module.link("../lib/chatroom", {
  default(v) {
    ChatRoom = v;
  }
}, 5);
DEFCON5 && console.log("In chatlinelists server, getting the stuff");
module.exportDefault(function () {
  Meteor.methods({
    "chatlinelists.unreadMessages"() {
      DEFCON5 && console.log("chatlinelists.unreadMessages for current user ");
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      let result = ChatRoom._getNumOfUnreadMessages(this.userId);
      return result;
    }
  });
  Meteor.methods({
    "chatlinelists.focusChatline"(channelId) {
      DEFCON5 && console.log("chatlinelists.focusChatline " + channelId);
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      check(channelId, String);
      const currentUser = Meteor.user()._id;
      const currentUserId = Meteor.user()._id;
      const currentDate = new Date();
      ChatRoom._upsertChatroomsetActiveUser(channelId, currentUserId);
      return true;
    }
  });
  Meteor.methods({
    "chatlinelists.addChatLine"(channelId, line) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
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
      chatLine.status = "active";
      let lineId = ChatLines.insert(chatLine);
      ChatRoom._upsertChatroomsetActiveUser(channelId, currentUserId);
      DEFCON5 && console.log("In chatlinelists.addChatLine method returning " + lineId);
      return lineId;
    }
  });
  Meteor.methods({
    "chatlinelists.removeChatLine"(containerId, lineId) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
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
          status: "deleted",
          modifiedBy: currentUser,
          modifiedAt: currentDate
        }
      });
      DEFCON5 && console.log("In chatlinelists.removeChatLine method returning " + lineId);
      return lineId;
    }
  });
  Meteor.methods({
    "chatlinelists.checkAccess"(channelId) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      check(channelId, String);
      DEFCON3 && console.log("Check if use has access to chatroom");
      DEFCON3 && console.log(channelId);
      const chatRoomsSelector = {
        "users.userId": {
          $in: [this.userId]
        },
        channelId: channelId
      };
      let chatRoomsUserIds = ChatRooms.find(chatRoomsSelector);
      DEFCON3 && console.log(chatRoomsUserIds.fetch());
      let hasAccessToChatlines = chatRoomsUserIds.fetch().length;
      DEFCON3 && console.log("User has access if next value > 0");
      DEFCON3 && console.log(hasAccessToChatlines);
      return hasAccessToChatlines;
    }
  });
});
function _checkAccess4User(channelId, userId) {
  return Promise.asyncApply(() => {
    DEFCON3 && console.log("Check if user has access to chatroom");
    DEFCON3 && console.log(channelId);
    DEFCON3 && console.log(userId);
    const chatRoomsSelector = {
      "users.userId": {
        $in: [userId]
      },
      channelId: channelId
    };
    let chatRoomsUserIds = ChatRooms.find(chatRoomsSelector);
    DEFCON3 && console.log(chatRoomsUserIds.fetch());
    let hasAccessToChatlines = chatRoomsUserIds.fetch().length;
    DEFCON3 && console.log("User has access if next value > 0");
    DEFCON3 && console.log(hasAccessToChatlines);
    return hasAccessToChatlines;
  });
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"chatrooms.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/methods/chatrooms.js                                                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let ChatRooms;
module.link("/lib/collections", {
  ChatRooms(v) {
    ChatRooms = v;
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
DEFCON5 && console.log("In chatlinelists server, getting the stuff");
module.exportDefault(function () {
  Meteor.methods({
    "chatroom.get4channel"(channelId) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      check(channelId, String);
      const chatRooms = ChatRooms.find({
        channelId: channelId
      }).fetch();
      DEFCON5 && console.log("Getting chatRooms");
      DEFCON5 && console.log(chatRooms);
      return chatRooms;
    }
  });
  Meteor.methods({
    "chatroom.get4user"() {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      const chatRoomsSelector = {
        "users.userId": {
          $in: [this.userId]
        }
      };
      let chatRooms = ChatRooms.find(chatRoomsSelector).fetch();
      DEFCON3 && console.log("Getting chatRooms for User");
      DEFCON3 && console.log(chatRooms);

      // if there are no chatRooms for this user, create his personal chatRoom for him and his agent.

      return chatRooms;
    }
  });
  Meteor.methods({
    "chatroom.setActiveUser"(channelId) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      const chatRoomsSelector = {
        "users.userId": {
          $in: [this.userId]
        }
      };
      let chatRooms = ChatRooms.find(chatRoomsSelector).fetch();
      DEFCON3 && console.log("Getting chatRooms for User");
      DEFCON3 && console.log(chatRooms);
      return chatRooms;
    }
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"contact.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/methods/contact.js                                                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"content.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/methods/content.js                                                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let _objectSpread;
module.link("@babel/runtime/helpers/objectSpread2", {
  default(v) {
    _objectSpread = v;
  }
}, 0);
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
let Contents;
module.link("/lib/collections", {
  Contents(v) {
    Contents = v;
  }
}, 3);
let Constants;
module.link("/lib/constants", {
  default(v) {
    Constants = v;
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
let DrupalServices;
module.link("../lib/drupal/services", {
  default(v) {
    DrupalServices = v;
  }
}, 6);
let notices;
module.link("../lib/notices", {
  default(v) {
    notices = v;
  }
}, 7);
let _;
module.link("lodash", {
  default(v) {
    _ = v;
  }
}, 8);
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
    "content.cloneArticle": function (_id, context) {
      check(_id, String);
      check(context, String);
      console.log("content.cloneArticle");

      // Optional: Add additional security checks here, e.g., this.userId to ensure user is logged in
      if (!this.userId) {
        throw new Meteor.Error(401, "You must be logged in to clone content");
      }

      // Assuming you have a collection for your content objects, e.g., Contents
      const documentToClone = Contents.findOne({
        _id: _id
      });
      if (!documentToClone) {
        throw new Meteor.Error(404, "Document not found");
      }

      // Ensure revisions exist
      if (documentToClone.revisions && documentToClone.revisions.length > 0) {
        documentToClone.revisions = documentToClone.revisions.map(revision => {
          // Check if masterLanguage is equal to the language of the revision
          if (documentToClone.masterLanguage === revision.language) {
            // Prepend "Clone of " to the title of the matching revision
            return _objectSpread(_objectSpread({}, revision), {}, {
              title: "Clone of ".concat(revision.title)
            });
          }
          return revision;
        });
      }

      // Remove the _id property to ensure MongoDB generates a new one for the clone
      delete documentToClone._id;
      // get the highest number of the id and add 1

      // Clone the document
      const cloneId = Contents.insert(documentToClone);

      // Optional: Log the cloning action or notify the user
      const message = "Document cloned successfully. New document ID: " + cloneId;
      console.log(message);

      // Add a notice about the cloning action
      notices.addNoticeByFields(Constants.NotiseClass.CONTENT_CLONED, "Cloned content", message, "contents", cloneId,
      // Use cloneId for the link to the cloned content
      "/content/" + cloneId, context, [this.userId]);
      return cloneId; // Returns the _id of the cloned document
    }
  });
  Meteor.methods({
    "content.getArticle"(query) {
      return Promise.asyncApply(() => {
        check(query, Object);
        DEFCON5 && console.log("content.getArticle");
        const doWork = () => Promise.asyncApply(() => {
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
  Meteor.methods({
    "content.update": function (_id, context, fieldsToUpdate) {
      // Check the arguments for proper types
      check(_id, String);
      check(fieldsToUpdate, Object);
      check(context, String);
      console.log("content.update");
      console.log(_id);
      console.log(fieldsToUpdate);
      // Optional: add additional security checks here, e.g., this.userId to ensure user is logged in
      if (!this.userId) {
        throw new Meteor.Error(401, "You must be logged in to update content");
      }

      // Optional: Validate fieldsToUpdate against a schema or specific rules if necessary
      // This step depends on your application's needs and the structure of your content objects

      // Assuming you have a collection for your content objects, e.g., Contents
      // Update the content object with the provided _id and fieldsToUpdate
      const updateCount = Contents.update({
        _id: _id
      }, {
        $set: fieldsToUpdate
      });
      if (updateCount === 0) {
        throw new Meteor.Error(404, "Content not found");
      }
      // stringify the fieldsToUpdate object to display the updated fields in the notice
      const message = i18n.__("Content_updated") + " " + JSON.stringify(fieldsToUpdate);
      notices.addNoticeByFields(Constants.NotiseClass.CONTENT_UPDATED, "Uppdating content fields", message, "contents", _id, "/content/" + _id, context, [this.userId]);
      return updateCount; // Returns the number of documents updated
    }
  });
  Meteor.methods({
    "content.getTypeOfArticles": function () {
      if (!this.userId) {
        throw new Meteor.Error(401, "You must be logged in to access content types");
      }

      // Define the pipeline array within the method
      const pipeline = [{
        $group: {
          _id: null,
          distinctTypes: {
            $addToSet: "$typeOfArticle"
          }
        }
      }, {
        $project: {
          _id: 0,
          distinctTypes: 1
        }
      }];
      const rawCollection = Contents.rawCollection();
      return new Promise((resolve, reject) => {
        rawCollection.aggregate(pipeline, {
          cursor: {}
        }).toArray((error, result) => {
          if (error) {
            reject(new Meteor.Error("aggregation-error", error.message));
          } else {
            // Assuming the result is an array with one document containing the distinctTypes array
            resolve(result.length > 0 ? result[0].distinctTypes : []);
          }
        });
      });
    }
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"events.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/methods/events.js                                                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let Events;
module.link("/lib/collections", {
  Events(v) {
    Events = v;
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
DEFCON3 && console.log("In Nodes server, getting the stuff");

// This is the server side method for adding a node
// make methods for adding a node, deleting a node, and updating a node
module.exportDefault(function () {
  Meteor.methods({
    "events.getEventsForNode"(point_id, startDate, endDate) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      check(point_id, String);
      const currentUser = Meteor.user()._id;
      const currentUserId = Meteor.user()._id;
      const currentDate = new Date();

      // use startDate and endDate and set to default if not provided (for endDate set to 20 years from now)
      startDate = startDate ? startDate : new Date();
      endDate = endDate ? endDate : new Date() + 631152000000;
      var query = {
        point_id: point_id
      };

      // if the nodeObject has an _id, then we are updating an existing node
      // so we need to check if the user is the owner of the node
      const nodes = Events.find(query).fetch();
      DEFCON4 && console.log("NODE: ", point_id, " - ", startDate, " - ", endDate);
      DEFCON4 && console.log("Found nodes: ", processRawData(nodes));
      return processRawData(nodes, startDate, endDate);
    }
  });
});
const processRawData = function (rawData) {
  let startDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  const currentDate = startDate ? new Date(startDate) : new Date();
  const oneDayAgo = new Date(currentDate - 24 * 60 * 60 * 1000);
  const oneWeekAgo = new Date(currentDate - 7 * 24 * 60 * 60 * 1000);
  const oneMonthAgo = new Date(currentDate - 30 * 24 * 60 * 60 * 1000); // Assuming 30 days for simplicity
  const oneYearAgo = new Date(currentDate - 365 * 24 * 60 * 60 * 1000); // Assuming 365 days for simplicity

  const historyData = rawData.reduce((acc, doc) => {
    const date = new Date(parseInt(doc.timestamp_write) * 1000);
    const dateString = date.toISOString().split("T")[0];
    const timeString = date.toISOString().split("T")[1].substring(0, 5);

    // Helper function to initialize accumulator keys
    const initializeKey = key => {
      if (!acc[key]) {
        acc[key] = {
          dates: [],
          values: []
        };
      }
    };
    initializeKey("24h");
    initializeKey("1day");
    initializeKey("1week");
    initializeKey("1month");
    initializeKey("1year");

    // Filter data into different time intervals
    if (date > oneDayAgo) {
      acc["24h"].dates.push("".concat(dateString, " ").concat(timeString));
      acc["24h"].values.push(parseFloat(doc.value));
    }
    if (date.toISOString().split("T")[0] === currentDate.toISOString().split("T")[0]) {
      acc["1day"].dates.push(timeString);
      acc["1day"].values.push(parseFloat(doc.value));
    }
    if (date > oneWeekAgo) {
      acc["1week"].dates.push("".concat(dateString, " ").concat(timeString));
      acc["1week"].values.push(parseFloat(doc.value));
    }
    if (date > oneMonthAgo) {
      acc["1month"].dates.push("".concat(dateString, " ").concat(timeString));
      acc["1month"].values.push(parseFloat(doc.value));
    }
    if (date > oneYearAgo) {
      acc["1year"].dates.push("".concat(dateString, " ").concat(timeString));
      acc["1year"].values.push(parseFloat(doc.value));
    }
    return acc;
  }, {});
  return historyData;
};
const processRawDataOld = (rawData, startDate, endDate) => {
  const historyData = rawData.reduce((acc, doc) => {
    const date = new Date(parseInt(doc.timestamp_write) * 1000);
    const dateString = date.toISOString().split("T")[0];
    const timeString = date.toISOString().split("T")[1].substring(0, 5);
    if (!acc["1day"]) {
      acc["1day"] = {
        dates: [],
        values: []
      };
    }
    if (!acc["24h"]) {
      acc["24h"] = {
        dates: [],
        values: []
      };
    }
    acc["1day"].dates.push(timeString);
    acc["1day"].values.push(parseFloat(doc.value));
    acc["24h"].dates.push("".concat(dateString, " ").concat(timeString));
    acc["24h"].values.push(parseFloat(doc.value));
    return acc;
  }, {});
  return historyData;
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"filearea.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/methods/filearea.js                                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/methods/index.js                                                                                            //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
let sycorax;
module.link("./sycorax", {
  default(v) {
    sycorax = v;
  }
}, 9);
let nodes;
module.link("./nodes", {
  default(v) {
    nodes = v;
  }
}, 10);
let chatrooms;
module.link("./chatrooms", {
  default(v) {
    chatrooms = v;
  }
}, 11);
let events;
module.link("./events", {
  default(v) {
    events = v;
  }
}, 12);
let workorders;
module.link("./workorders", {
  default(v) {
    workorders = v;
  }
}, 13);
let notices;
module.link("./notices", {
  default(v) {
    notices = v;
  }
}, 14);
let systemconfig;
module.link("./systemconfig", {
  default(v) {
    systemconfig = v;
  }
}, 15);
module.exportDefault(function () {
  _users();
  chatlinelists();
  orders();
  search();
  contact();
  content();
  filearea();
  account();
  sycorax();
  nodes();
  chatrooms();
  events();
  workorders();
  notices();
  systemconfig();
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"log.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/methods/log.js                                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"nodes.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/methods/nodes.js                                                                                            //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let _objectSpread;
module.link("@babel/runtime/helpers/objectSpread2", {
  default(v) {
    _objectSpread = v;
  }
}, 0);
let Nodes, NodeLinks;
module.link("/lib/collections", {
  Nodes(v) {
    Nodes = v;
  },
  NodeLinks(v) {
    NodeLinks = v;
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
DEFCON3 && console.log("In Nodes server, getting the stuff");

// This is the server side method for adding a node
// make methods for adding a node, deleting a node, and updating a node
module.exportDefault(function () {
  Meteor.methods({
    "nodes.addNode"(nodeObject) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      check(nodeObject, Object);
      const currentUser = Meteor.user()._id;
      const currentUserId = Meteor.user()._id;
      const currentDate = new Date();
      DEFCON4 && console.log("In nodes.addNode, Upsert node: ", nodeObject);

      // if the nodeObject has an _id, then we are updating an existing node
      if (nodeObject._id) {
        // if the nodeObject has an _id, then we are updating an existing node
        // so we need to check if the user is the owner of the node
        const node = Nodes.findOne({
          _id: nodeObject._id
        });

        // we dont need to check if owner is same as current user
        // if (node.owner !== currentUserId) {
        //   throw new Meteor.Error(401, "Access denied");
        // }
        // upsert the node
        Nodes.upsert({
          _id: nodeObject._id
        }, {
          $set: _objectSpread(_objectSpread({}, nodeObject), {}, {
            lastUpdated: currentDate
          })
        });
      } else {
        // if the nodeObject does not have an _id, then we are adding a new node
        // so we need to add the owner and created fields
        Nodes.insert(_objectSpread(_objectSpread({}, nodeObject), {}, {
          owner: currentUser,
          created: currentDate,
          lastUpdated: currentDate
        }));
      }
    }
  });
  Meteor.methods({
    "nodes.removeNode"(nodeId) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      check(nodeId, String);
      const currentUser = Meteor.user()._id;
      const currentDate = new Date();
      Nodes.update(nodeId, {
        $set: {
          status: "archived",
          modifiedBy: currentUser,
          modifiedAt: currentDate
        }
      });
      DEFCON5 && console.log("In removeNode method on server, removed node with id: " + nodeId);
      return nodeId;
    }
  });
  // store a link between two nodes
  Meteor.methods({
    "nodes.addLink"(linkObject) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      check(linkObject, Object);
      const currentUser = Meteor.user()._id;
      const currentUserId = Meteor.user()._id;
      const currentDate = new Date();
      DEFCON4 && console.log("In nodes.addLink, Upsert link: ", linkObject);

      // if the linkObject has an _id, then we are updating an existing link
      if (linkObject._id) {
        // if the linkObject has an _id, then we are updating an existing link
        // so we need to check if the user is the owner of the link
        const link = NodeLinks.findOne({
          _id: linkObject._id
        });
        // we dont need to check if owner is same as current user
        // if (link.owner !== currentUserId) {
        //   throw new Meteor.Error(401, "Access denied");
        // }
        // upsert the link
        NodeLinks.upsert({
          _id: linkObject._id
        }, {
          $set: _objectSpread(_objectSpread({}, linkObject), {}, {
            lastUpdated: currentDate
          })
        });
      } else {
        // if the linkObject does not have an _id, then we are adding a new link
        // so we need to add the owner and created fields
        NodeLinks.insert(_objectSpread(_objectSpread({}, linkObject), {}, {
          owner: currentUser,
          created: currentDate,
          lastUpdated: currentDate
        }));
      }
    }
  });
  Meteor.methods({
    getTreeStructurev1: function (startNodeId) {
      check(startNodeId, String);
      DEFCON2 && console.log("In getTreeStructure method on server");
      DEFCON2 && console.log(" startNodeId: " + startNodeId);
      const nodeCollection = Nodes; // Assuming you've defined Nodes as your collection
      const nodeLinksCollection = NodeLinks;
      function buildNode(_id) {
        const node = nodeCollection.findOne({
          _id
        });
        if (!node) {
          return null;
        }
        const links = nodeLinksCollection.find({
          parentId: _id
        }).fetch();
        const children = [];
        for (const link of links) {
          const childNode = buildNode(link.childId);
          if (childNode) {
            children.push(childNode);
          }
        }
        return _objectSpread(_objectSpread({}, node), {}, {
          children
        });
      }
      console.log("buildNode(startNodeId)");
      console.log(buildNode(startNodeId));
      return buildNode(startNodeId);
    }
  });
  Meteor.methods({
    getTreeStructure: function (startNodeId) {
      check(startNodeId, String);
      // DEFCON2 && console.log("In getTreeStructure method on server");
      // DEFCON2 && console.log(" startNodeId: " + startNodeId);

      const nodeCollection = Nodes; // Assuming you've defined Nodes as your collection
      const nodeLinksCollection = NodeLinks;
      function buildNode(_id) {
        // DEFCON2 && console.log("Building node for _id: " + _id);

        const node = nodeCollection.findOne({
          _id
        });
        if (!node) {
          return null;
        }
        const links = nodeLinksCollection.find({
          parentId: _id
        }).fetch();

        // DEFCON2 && console.log(`Found ${links.length} links for node ${_id}`);

        const children = [];
        for (const link of links) {
          /*DEFCON2 &&
            console.log(`Processing link with childId: ${link.childId}`);*/
          const childNode = buildNode(link.childId); // Removed await because Meteor's Mongo API is synchronous
          if (childNode) {
            children.push(childNode);
          }
        }
        return _objectSpread(_objectSpread({}, node), {}, {
          children
        });
      }
      //DEFCON2 && console.log("buildNode(startNodeId)");
      //DEFCON2 && console.log(buildNode(startNodeId));
      return buildNode(startNodeId);
    }
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"notices.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/methods/notices.js                                                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let _objectSpread;
module.link("@babel/runtime/helpers/objectSpread2", {
  default(v) {
    _objectSpread = v;
  }
}, 0);
let NoticesUserStatus;
module.link("/lib/collections", {
  NoticesUserStatus(v) {
    NoticesUserStatus = v;
  }
}, 0);
let addNotice;
module.link("../lib/notices", {
  addNotice(v) {
    addNotice = v;
  }
}, 1);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }
}, 2);
let check, Match;
module.link("meteor/check", {
  check(v) {
    check = v;
  },
  Match(v) {
    Match = v;
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
DEFCON5 && console.log("In chatlinelists server, getting the stuff");
module.exportDefault(function () {
  Meteor.methods({
    "notices.add"(notice, users) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      check(notice, Object);
      check(users, Object);
      const currentUser = Meteor.user()._id;
      const currentUserId = Meteor.user()._id;
      const currentDate = new Date();
      let newNotice = {};
      newNotice = _objectSpread({}, notice);
      newNotice.modifiedBy = currentUser;
      newNotice.createdByName = currentUser;
      newNotice.createdBy = currentUserId;
      newNotice.modifiedAt = currentDate;
      newNotice.createdAt = currentDate;
      newNotice.status = "active";
      // let noticeId = Notices.insert(newNotice);

      DEFCON5 && console.log("Inserted a new notice");
      DEFCON5 && console.log(newNotice);
      return addNotice(newNotice, users);
    }
  });
  Meteor.methods({
    "notices.updateReadStatus"(noticeStatus) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      DEFCON5 && console.log("****** notices.updateReadStatus");
      DEFCON5 && console.log(noticeStatus);
      check(noticeStatus, Object);
      const currentDate = new Date();
      let updateStatus = NoticesUserStatus.update({
        _id: noticeStatus._id
      }, {
        $set: {
          readIt: noticeStatus.readIt,
          readAt: currentDate,
          modifiedAt: currentDate
        }
      });
      return updateStatus;
    }
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"orders.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/methods/orders.js                                                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
      }
      //check(searchText, String);

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
      check(content_order, Object);
      //check(content_order.field_orderid, String);
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
      check(searchText, String);
      //let userObj = Meteor.users.findOne(this.userId);

      DEFCON3 && console.log("Livestream check");
      DEFCON3 && console.log(this.userId);
      //DEFCON3 && console.log(userObj);

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
      }
      //check(searchText, String);
      //let userObj = Meteor.users.findOne(this.userId);

      DEFCON3 && console.log("motherchecks check");
      DEFCON3 && console.log(this.userId);
      //DEFCON3 && console.log(userObj);

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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"search.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/methods/search.js                                                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
      };
      // const rStart = /.*\b/;
      //const rEnd = /\b/;
      // const rStart = /^/;
      //const rEnd = /$/;
      const rStart = /\A/;
      const rStartLastName = /\b/;
      //const rEnd = /\Z.*/;
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"sycorax.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/methods/sycorax.js                                                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
let fetch;
module.link("node-fetch", {
  default(v) {
    fetch = v;
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
  Meteor.methods({
    "sycorax.dynamic.async": function (context) {
      check(context, String);
      DEFCON3 && console.log("sycorax.dynamic.async");
      DEFCON3 && console.log(context);

      // Assuming "processLdapLogin" exists somewhere else ...
      var _doFetchSync = Meteor.wrapAsync(_doFetch2);
      var data = _doFetch(context);
      DEFCON3 && console.log("Reply data to Host");
      DEFCON3 && console.log(data);
      return data;
    },
    "sycorax.dynamic"(context) {
      // if (!this.userId) {
      //   throw new Meteor.Error(401, "Access denied");
      // }
      check(context, String);
      DEFCON3 && console.log("sycorax.dynamic");
      DEFCON3 && console.log(context);
      DEFCON3 && console.log("Making request to Sycorax");
      _doFetch(context).then(data => {
        DEFCON3 && console.log("Reply data to Host");
        DEFCON3 && console.log(data);
        return data;
      });
      DEFCON3 && console.log("Did the request to Sycorax");
    }
  });
});
function _doFetch(url) {
  return Promise.asyncApply(() => {
    const response = Promise.await(fetch(url));
    const data = Promise.await(response.json());
    return data;
  });
}
function _doFetch2(context) {
  fetch(context, {}).then(response => response.json()).then(data => {
    DEFCON3 && console.log("Reply data");
    DEFCON3 && console.log(data);
    return data;
  });
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"systemconfig.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/methods/systemconfig.js                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
let SystemConfig;
module.link("/lib/collections", {
  SystemConfig(v) {
    SystemConfig = v;
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
  Meteor.methods({
    "systemconfig.get"(key) {
      check(key, String); // Corrected to check the 'key' parameter

      DEFCON5 && console.log("Method systemconfig.get");
      const response = SystemConfig.findOne({
        _id: key
      });
      // if there is no response the key is not founb but we don't throw an error just return null

      if (!response) {
        DEFCON5 && console.log("No system config found with key: ".concat(key));
      }
      return response;
    },
    "systemconfig.put"(key, fieldsToUpdate) {
      check(key, String);
      check(fieldsToUpdate, Object);
      DEFCON5 && console.log("systemconfig.put");
      if (!this.userId) {
        throw new Meteor.Error(401, "You must be logged in to update system config");
      }

      // user and when the record was updated
      fieldsToUpdate.updatedBy = this.userId;
      fieldsToUpdate.updatedAt = new Date();

      // Using the upsert option
      const result = SystemConfig.update({
        _id: key
      }, {
        $set: fieldsToUpdate
      }, {
        upsert: true
      } // This is the key change
      );
      if (result) {
        if (result.insertedId) {
          DEFCON5 && console.log("New system config created with ID: ".concat(result.insertedId));
        } else {
          DEFCON5 && console.log("System config updated. Number of documents affected: ".concat(result.numberAffected));
        }
      } else {
        throw new Meteor.Error("update-failed", "Failed to update or insert system config");
      }
      return result; // Returns the result of the update operation
    }
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"workorders.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/methods/workorders.js                                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
let WorkOrders;
module.link("/lib/collections", {
  WorkOrders(v) {
    WorkOrders = v;
  }
}, 4);
module.exportDefault(function () {
  Meteor.methods({
    "workorder.new"(customerOrderId, workorderclass, payload) {
      return Promise.asyncApply(() => {
        check(customerOrderId, String);
        check(workorderclass, String);
        check(payload, Object);
        DEFCON5 && console.log("workorder.new");
        const doWork = () => Promise.asyncApply(() => {
          // create a new mongo document with the payload and the workorderclass
          // also create a readable workorderId created by yyyymmddhhmmss + the first 4 chars of the workorderclass
          // use the workorderId as the _id of the mongo document
          // return the workorderId

          // first make the workoreder id string

          // get agent information from collection bil_agent based on customerId in the payload
          let query = {
            _id: payload.customerId
          };
          let workorderId = new Date().toISOString().replace(/[^0-9]/g, "").substring(0, 14) + workorderclass.substring(0, 6);

          // now create the mongo document
          let workorder = {
            _id: workorderId,
            contentId: customerOrderId,
            workorderclass: workorderclass,
            payload: payload,
            status: 1000,
            created: new Date(),
            modified: new Date(),
            createdBy: Meteor.userId(),
            modifiedBy: Meteor.userId()
          };
          DEFCON5 && console.log(workorder);

          // now insert the document
          let result = WorkOrders.insert(workorder);
          DEFCON5 && console.log("workorder.new result: ");
          DEFCON5 && console.log(result);

          // now return the workorderId
          return workorderId;
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"publications":{"_users.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/publications/_users.js                                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
    const response = Meteor.users.find(selector, options);
    // DEFCON5 && console.log('Users.Collection');
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
    }
    // check(_id, String);
    // if (this.userId) {
    const selector = {
      _id: this.userId
    };
    const response = Meteor.users.find(selector);
    //  DEFCON5 && console.log ('publish users.current _id', _id);
    //  DEFCON5 && console.log ('publish users.current this.userId', this.userId);
    return response;
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"agents.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/publications/agents.js                                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
let Agents, AgentUserConnections;
module.link("/lib/collections", {
  Agents(v) {
    Agents = v;
  },
  AgentUserConnections(v) {
    AgentUserConnections = v;
  }
}, 2);
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
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
  DEFCON3 && console.log("Setting up Agent stuff");
  Meteor.publish("agents.for.user", function (userId) {
    DEFCON3 && console.log("In agent  subscribe function");
    check(userId, String);
    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }
    this.autorun(function (computation) {
      DEFCON3 && console.log("Subscribing agent");
      DEFCON3 && console.log("Searching for agents for user " + userId);
      const Selector = {
        user_id: userId
      };
      let agents_connections = AgentUserConnections.find(Selector);
      DEFCON3 && console.log("Agent list");
      DEFCON3 && console.log(agents_connections.fetch());
      // subscribe for all agents that are connected to this user where id is object id and stored with ObjectId("641717047908426fab3d9497"
      const objectIdArray = agents_connections.fetch().map(connection => {
        // Check that the _id field is a valid ObjectId string
        if (typeof connection.agent_id === "string" && connection.agent_id.length === 24) {
          // Convert the string to an ObjectId instance
          return new Mongo.ObjectID(connection.agent_id);
        } else {
          // Return null if the _id field is not a valid ObjectId string
          return null;
        }
      }).filter(objectId => objectId !== null);

      // Find documents where the _id field matches any value in the objectIdArray

      let agents = Agents.find({
        _id: {
          $in: objectIdArray
        }
      });
      DEFCON3 && console.log("Agent connections");
      DEFCON3 && console.log(agents.fetch());
      return agents;
    });
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"articles.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/publications/articles.js                                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
    check(articleId, String);
    // if (!this.userId) {
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"chatlines.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/publications/chatlines.js                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
      });
      // DEFCON5 && console.log(usersWithAvatars);
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
    let chatLinesUserIds = ChatLines.find(chatLinesSelector);
    // DEFCON5 && console.log("Find users");
    // DEFCON5 && console.log(chatLinesUserIds);
    return chatLinesUserIds;
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"chatrooms.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/publications/chatrooms.js                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
      DEFCON5 && console.log("Find chatRoomsUserIds");

      // DEFCON5 && console.log(usersWithAvatars);
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
    let chatRoomsUserIds = ChatRooms.find(chatRoomsSelector);
    // DEFCON5 && console.log("Find users");
    // DEFCON5 && console.log(chatRoomsUserIds);
    return chatRoomsUserIds;
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"contents.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/publications/contents.js                                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
let Contents;
module.link("/lib/collections", {
  Contents(v) {
    Contents = v;
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
  // subscribe on all nodes
  Meteor.publish("contents.all", function () {
    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }
    DEFCON5 && console.log("Contents.all");
    this.autorun(function (computation) {
      const nodesSelector = {};
      DEFCON5 && console.log("Get all nodes");
      return [Contents.find(nodesSelector)];
    });
  });
  Meteor.publish("contents.get", function (nodeId) {
    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }
    check(nodeId, String);
    DEFCON5 && console.log("In publication/Content.get");
    DEFCON5 && console.log(nodeId);
    this.autorun(function (computation) {
      const nodesSelector = {
        _id: nodeId
      };
      DEFCON5 && console.log("Find node with id: ", nodeId);
      return [Contents.find(nodesSelector)];
    });
  });
  Meteor.publish("Contents.getTree", function (nodeId) {
    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }
    check(nodeId, String);
    DEFCON5 && console.log("In publication/Contents.getTree");
    DEFCON5 && console.log(nodeId);
    const queue = [nodeId];
    const seenNodeIds = new Set();
    const seenLinkIds = new Set();
    while (queue.length) {
      const currentId = queue.shift();
      if (seenNodeIds.has(currentId)) continue;
      seenNodeIds.add(currentId);
      const links = NodeLinks.find({
        parentId: currentId
      }).fetch();
      for (const link of links) {
        if (!seenLinkIds.has(link._id)) {
          seenLinkIds.add(link._id);
          queue.push(link.childId);
        }
      }
    }
    DEFCON5 && console.log("Found nodes and links:", seenNodeIds, seenLinkIds);
    return [Contents.find({
      _id: {
        $in: [...seenNodeIds]
      }
    }), NodeLinks.find({
      _id: {
        $in: [...seenLinkIds]
      }
    })];
  });
});
// function that reads the node and returns the node and all children based on the NodeLinks collection
function _getNodesAndChildren(nodeId, deepth, maxDeepth) {
  // get the node
  const node = Contents.findOne({
    _id: nodeId
  });
  // get the children of the node based on the NodeLinks collection
  const children = NodeLinks.find({
    source: nodeId
  }).fetch();

  // if the deepth is less than the maxDeepth, get the next level of nodes
  if (deepth < maxDeepth) {
    // loop through the children
    for (let i = 0; i < children.length; i++) {
      // get the children of the children
      const child = _getNodesAndChildren(children[i].target, deepth + 1, maxDeepth);
      // add the children to the children array
      children[i].children = child;
    }
  }
  // return the node and the children
  return {
    node,
    children
  };
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/publications/index.js                                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
let contents;
module.link("./contents", {
  default(v) {
    contents = v;
  }
}, 5);
let workorders;
module.link("./workorders", {
  default(v) {
    workorders = v;
  }
}, 6);
let notices;
module.link("./notices", {
  default(v) {
    notices = v;
  }
}, 7);
let mcc;
module.link("./mcc_config", {
  default(v) {
    mcc = v;
  }
}, 8);
module.exportDefault(function () {
  _users();
  chatlines();
  chatrooms();
  secrets();
  articles();
  mcc();
  contents();
  workorders();
  notices();
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"links.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/publications/links.js                                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
let Nodes, Links;
module.link("/lib/collections", {
  Nodes(v) {
    Nodes = v;
  },
  Links(v) {
    Links = v;
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
  // subscribe on all links
  Meteor.publish("links.all", function () {
    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }
    DEFCON5 && console.log("links.all");
    DEFCON5 && console.log(linkId);
    this.autorun(function (computation) {
      const linksSelector = {
        status: "active"
      };
      DEFCON5 && console.log("Get all links");

      // DEFCON5 && console.log(usersWithAvatars);
      return [Nodes.find(linksSelector)];
    });
  });
  Meteor.publish("links.access", function (linkId) {
    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }
    check(linkId, String);
    DEFCON5 && console.log("In publication/links.access");
    DEFCON5 && console.log(linkId);
    this.autorun(function (computation) {
      const linksSelector = {
        _id: linkId,
        status: "active"
      };
      DEFCON5 && console.log("Find links");

      // DEFCON5 && console.log(usersWithAvatars);
      return [Nodes.find(linksSelector)];
    });
  });
});
// function that reads the link and returns the link and all children based on the links collection
function _getNodesAndChildren(linkId, deepth, maxDeepth) {
  // get the link
  const link = Nodes.findOne({
    _id: linkId
  });
  // get the children of the link based on the links collection
  const children = Links.find({
    source: linkId
  }).fetch();

  // if the deepth is less than the maxDeepth, get the next level of links
  if (deepth < maxDeepth) {
    // loop through the children
    for (let i = 0; i < children.length; i++) {
      // get the children of the children
      const child = _getNodesAndChildren(children[i].target, deepth + 1, maxDeepth);
      // add the children to the children array
      children[i].children = child;
    }
  }
  // return the link and the children
  return {
    link,
    children
  };
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"mcc_config.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/publications/mcc_config.js                                                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
    DEFCON7 && console.log("In the subscribe function");

    // if (!this.userId) {
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
    check(facility, String);
    // if (!this.userId) {
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
    check(facility, String);
    // if (!this.userId) {
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"notices.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/publications/notices.js                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
let NoticesUserStatus, Notices, Users;
module.link("/lib/collections", {
  NoticesUserStatus(v) {
    NoticesUserStatus = v;
  },
  Notices(v) {
    Notices = v;
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
  Meteor.publish("notices.forUser", function () {
    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }
    // check(userId, String);
    DEFCON5 && console.log("notices.forUser");
    this.autorun(function (computation) {
      const noticeSelector = {
        status: "active",
        userId: this.userId
      };
      DEFCON5 && console.log("Query");
      DEFCON5 && console.log(noticeSelector);
      const notices4User = NoticesUserStatus.find(noticeSelector).fetch().map(line => line.noticeId);
      DEFCON5 && console.log(notices4User);
      const notices = Notices.find({
        _id: {
          $in: notices4User
        }
      }, {
        avatar_uri: 1
      });
      const notices_userstatus = NoticesUserStatus.find(noticeSelector);
      DEFCON5 && console.log("Find notices");
      DEFCON5 && console.log(notices.fetch());

      // DEFCON5 && console.log(usersWithAvatars);
      return [notices, notices_userstatus];
    });
  });
  Meteor.publish("notices.forUserAndArticle", function (articleId) {
    check(articleId, String);
    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }
    // check(userId, String);
    DEFCON5 && console.log("notices.forUserAndArticle");
    this.autorun(function (computation) {
      const noticeSelector = {
        status: "active",
        userId: this.userId
      };
      DEFCON5 && console.log("Query");
      DEFCON5 && console.log(noticeSelector);
      const notices4User = NoticesUserStatus.find(noticeSelector).fetch().map(line => line.noticeId);
      DEFCON5 && console.log(notices4User);
      const notices = Notices.find({
        status: "active",
        entity: "article",
        entityId: articleId,
        _id: {
          $in: notices4User
        }
      }, {
        avatar_uri: 1
      });
      const notices_userstatus = NoticesUserStatus.find(noticeSelector);
      DEFCON5 && console.log("Find notices");
      DEFCON5 && console.log(notices.fetch());

      // DEFCON5 && console.log(usersWithAvatars);
      return [notices, notices_userstatus];
    });
  });
  Meteor.publish("notices.forAllUsersAndArticle", function (articleId) {
    check(articleId, String);
    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }
    // check(userId, String);
    DEFCON5 && console.log("notices.forUserAndArticle");
    this.autorun(function (computation) {
      let notices4users = Notices.find({
        status: "active",
        entity: "article",
        entityId: articleId
      }, {
        avatar_uri: 1
      }).fetch().map(line => line._id);
      const noticeSelector = {
        status: "active",
        noticeId: {
          $in: notices4users
        }
      };
      const notices_userstatus = NoticesUserStatus.find(noticeSelector);
      const notices = Notices.find({
        status: "active",
        entity: "article",
        entityId: articleId
      }, {
        avatar_uri: 1
      });
      DEFCON5 && console.log("Find notices");
      DEFCON5 && console.log(notices.fetch());

      // DEFCON5 && console.log(usersWithAvatars);
      return [notices, notices_userstatus];
    });
  });
  Meteor.publish("notices.forArticle", function (articleId) {
    check(articleId, String);
    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }
    // check(userId, String);
    DEFCON5 && console.log("notices.forArticle");
    this.autorun(function (computation) {
      const notices = Notices.find({
        entity: "article",
        entityId: articleId,
        status: "active"
      }, {
        avatar_uri: 1
      });
      DEFCON5 && console.log("Find notices");
      DEFCON5 && console.log(notices.fetch());

      // DEFCON5 && console.log(usersWithAvatars);
      return [notices];
    });
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"programs.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/publications/programs.js                                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
      });
      // DEFCON5 && console.log(usersWithAvatars);
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
    let chatLinesUserIds = ChatLines.find(chatLinesSelector);
    // DEFCON5 && console.log("Find users");
    // DEFCON5 && console.log(chatLinesUserIds);
    return chatLinesUserIds;
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"secrets.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/publications/secrets.js                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
    DEFCON3 && console.log("In the subscribe function");

    // if (!this.userId) {
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"sensor-mapping.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/publications/sensor-mapping.js                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
let SensorMapping;
module.link("/lib/collections", {
  SensorMapping(v) {
    SensorMapping = v;
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
  // subscribe on all nodes
  Meteor.publish("sensormapping.all", function () {
    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }
    DEFCON5 && console.log("sensormapping.all");
    this.autorun(function (computation) {
      const dataSelector = {};
      DEFCON3 && console.log("Get all SensorMapping");
      // var sort = [["timestamp_read", -1.0]];
      let nodes = SensorMapping.find(dataSelector, {
        limit: 1500
      });
      return [nodes];
    });
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"signalstate.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/publications/signalstate.js                                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
    DEFCON7 && console.log("In the subscribe function");

    // if (!this.userId) {
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
    check(facility, String);
    // if (!this.userId) {
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
    check(signalId, String);
    // if (!this.userId) {
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
      });
      // DEFCON3 && console.log(SignalHistoryData.fetch());

      return SignalHistoryData;
    });
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"workorders.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/publications/workorders.js                                                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
let WorkOrders;
module.link("/lib/collections", {
  WorkOrders(v) {
    WorkOrders = v;
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
let object;
module.link("prop-types", {
  object(v) {
    object = v;
  }
}, 4);
module.exportDefault(function () {
  Meteor.publish("workorders.open.search", function (dataSelector, limit) {
    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }
    DEFCON5 && console.log("workorders.open.search");
    DEFCON5 && console.log(dataSelector);
    DEFCON5 && console.log(limit);
    check(dataSelector, Object);
    check(limit, Number);
    this.autorun(function (computation) {
      var projection = {};
      var sort = [["Created", -1]];
      let myLimit = limit ? limit : 200;
      DEFCON5 && console.log("Get the node");
      // make a time to calculate the time it takes to get the node
      let start = new Date().getTime();
      // DEFCON5 && console.log(usersWithAvatars);
      let nodes = WorkOrders.find(dataSelector, {
        projection,
        sort,
        limit: myLimit
      });
      let end = new Date().getTime();
      let execution = end - start;
      DEFCON5 && console.log("Execution time: " + execution);
      DEFCON5 && console.log("DONE Get the node");
      DEFCON5 && console.log("Number of nodes: " + nodes.count());
      // DEFCON5 && console.log(nodes.fetch());
      return [nodes];
    });
  });
  Meteor.publish("workorders.search", function () {
    if (!this.userId) {
      throw new Meteor.Error(401, "Access denied");
    }
    DEFCON5 && console.log("workorders.search");
    this.autorun(function (computation) {
      var projection = {};
      var dataSelector = {};
      var sort = [["created", -1]];
      var limit = 200;
      let myLimit = limit ? limit : 200;
      DEFCON5 && console.log("Get the node");
      // make a time to calculate the time it takes to get the node
      let start = new Date().getTime();
      // DEFCON5 && console.log(usersWithAvatars);
      let nodes = WorkOrders.find(dataSelector, {
        projection,
        sort,
        limit: myLimit
      });
      let end = new Date().getTime();
      let execution = end - start;
      DEFCON5 && console.log("Execution time: " + execution);
      DEFCON5 && console.log("DONE Get the node");
      DEFCON5 && console.log("Number of nodes: " + nodes.count());
      // DEFCON5 && console.log(nodes.fetch());
      return [nodes];
    });
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"routes.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/routes.js                                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"main.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/main.js                                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
let AppConfig;
module.link("./configs/app", {
  default(v) {
    AppConfig = v;
  }
}, 6);
publications();
methods();
addInitialData();

//
Meteor.startup(() => {
  // WebApp.rawConnectHandlers.use(function(req, res, next) {
  //     res.setHeader("Access-Control-Allow-Origin", "*");
  //     res.setHeader("Access-Control-Allow-Headers", "Authorization,Content-Type");
  //     return next();
  // });
  // });
  DEFCON2 && console.log("* * * * * * * * * * * * * * * * * * * * ");
  DEFCON2 && console.log("Starting Neptune POD Meteor server sequence");
  DEFCON2 && console.log(AppConfig.name);
  DEFCON2 && console.log(AppConfig.version_build_date);
  DEFCON2 && console.log("Running on " + Meteor.release);
  DEFCON2 && console.log("* * * * * * * * * * * * * * * * * * * * ");
  Accounts.urls.resetPassword = function (token) {
    return Meteor.absoluteUrl("reset-password/" + token);
  };
  Accounts.emailTemplates.siteName = i18n.__("Email_SiteName_Text");
  Accounts.emailTemplates.from = i18n.__("Email_From_Text");
  Accounts.emailTemplates.resetPassword = {
    subject(user) {
      return i18n.__("Email_ResetPassword_Subject");
    },
    html(user, url) {
      let urlTag = "<a href=\"".concat(url, "\">").concat(url, "</a>");
      return i18n.__("Email_ResetPassword_Text", {
        urlTag
      });
    }
  };
  Accounts.onCreateUser((options, user) => {
    DEFCON5 && console.log("Creating user x");
    user.status = "active";
    user.name = options.name;
    return user;
  });
  Accounts.validateLoginAttempt(function (loginRequest) {
    if (loginRequest.user) {
      if (!loginRequest.user.status || loginRequest.user.status != "active") throw new Meteor.Error(403, i18n.__("Error_Account_NotActive"));
    }
    return true;
  });
  Accounts.onLogin(loginInfo => {
    if (loginInfo && loginInfo.allowed === true && loginInfo.type !== "resume") {}
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"lib":{"transformers":{"dateStringTransformer.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// lib/transformers/dateStringTransformer.js                                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"collections.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// lib/collections.js                                                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({
  Users: () => Users,
  SystemConfig: () => SystemConfig,
  ActionLog: () => ActionLog,
  TextsVersions: () => TextsVersions,
  Notices: () => Notices,
  NoticesUserStatus: () => NoticesUserStatus,
  ChatLines: () => ChatLines,
  ChatRooms: () => ChatRooms,
  KeyValues: () => KeyValues,
  KeyValueClasses: () => KeyValueClasses,
  KeyValueGroups: () => KeyValueGroups,
  KeyValueContexts: () => KeyValueContexts,
  Contents: () => Contents,
  WorkOrders: () => WorkOrders,
  TagClasses: () => TagClasses,
  Tags: () => Tags
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
const SystemConfig = new Mongo.Collection("systemconfig");
const ActionLog = new Mongo.Collection("actionLog");
const TextsVersions = new Mongo.Collection("textsversions");
const Notices = new Mongo.Collection("notices");
const NoticesUserStatus = new Mongo.Collection("notices_userstatus");
const ChatLines = new Mongo.Collection("chatlines");
const ChatRooms = new Mongo.Collection("chatrooms");
const KeyValues = new Mongo.Collection("keyvalues");
const KeyValueClasses = new Mongo.Collection("keyvalueClasses");
const KeyValueGroups = new Mongo.Collection("keyvalueGroups");
const KeyValueContexts = new Mongo.Collection("keyvalueContexts");
const Contents = new Mongo.Collection("contents");
const WorkOrders = new Mongo.Collection("workorders");
const TagClasses = new Mongo.Collection("tagclasses");
const Tags = new Mongo.Collection("tags");
DEFCON5 && console.log("Fixing collections...");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"constants.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// lib/constants.js                                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
  PERSON: "100",
  NEWORDER: "200",
  ORDER: "300"
};
Constants.CardStatus = {
  NA: "0",
  QA: "1000",
  RQA: "2000",
  NEW: "5000",
  FUTURE: "6000",
  OK: "8000"
};
Constants.OrderProcessStatuses = {
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
  CANCELLED: "999"
};
Constants.OrderType = {
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
  ROLE_UPDATE: "207"
};
Constants.activeCard = {
  RELATION_UPDATE: "RELATION_UPDATE",
  RELATION_INSERT: "RELATION_INSERT",
  ROLE_UPDATE: "ROLE_UPDATE",
  ROLE_INSERT: "ROLE_INSERT",
  CORE: "CORE",
  URI: "URI",
  SSN: "SSN",
  NAME: "NAME",
  ADDRESS: "ADDRESS",
  ROLES: "ROLES"
};
Constants.Gender = {
  FEMALE: "K",
  MALE: "M"
};
Constants.OrderProcessMethod = {
  EXPRESS: "E",
  DEFAULT: "D"
};
Constants.datePrecision = {
  UNDEF: "u",
  YEAR: "Y",
  MONTH: "M",
  DAY: "D"
};
Constants.orderTypeTechnical = {
  NEW_PERSON_ORDER: "384"
};
Constants.defaultValues = {
  ORDERID: "99999999"
};
Constants.motherCheckState = {
  OK: 0,
  WARNING: 100,
  ERROR_GENERIC: 999,
  ERROR: 999
};
Constants.personNameTypes = {
  PREVIOUS_NAMES: "1",
  ALTERNATIVE_NAMES: "2",
  PRIMARY_NAME: "3",
  REGISTRED_NAME: "4"
};
Constants.NotiseClass = {
  CONTENT_UPDATED: "content_updated",
  CONTENT_CLONED: "content_cloned",
  ARTICLE_ACTION_CONTENT_UPDATE: "article_action_content_update",
  ARTICLE_STATUS_OPEN: "article_status_open",
  ARTICLE_STATUS_REVIEW: "article_status_review",
  ARTICLE_STATUS_REQUEST_FOR_PUBLICATION: "article_status_request_for_publication",
  ARTICLE_STATUS_APPROVED_FOR_PUBLICATION: "article_status_approved_for_publication",
  ARTICLE_STATUS_PUBLISHED: "article_status_published",
  CHAT_ACTION_NEW_MESSAGE: "chat_action_new_message",
  GROUP_ACTION_NEW_MEMBER: "group_action_new_member"
};
Constants.LoadingComponent = () => /*#__PURE__*/React.createElement("div", null, " ... ");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"log.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// lib/log.js                                                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"random.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// lib/random.js                                                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"user.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// lib/user.js                                                                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
      type: 'string'
      // validator: [
      //   Validators.minLength(3)
      // ]
    },
    verified: {
      type: 'string'
      // validator: [
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
    }
    // lastName: {
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
    }
    // ,aclIs : function(roleSlug) {
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"i18n":{"core":{"da.i18n.yml.js":function module(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// i18n/core/da.i18n.yml.js                                                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Package['universe:i18n'].i18n.addTranslations('da','',{"language":"da","LINE02":"LINE02","Header_Login_Login":"Log på","Nav_DropDownItem_English":"Engelsk","Nav_DropDownItem_Swedish":"Svensk","Nav_DropDownItem_Help":"Hjælp","Nav_DropDownItem_Chat":"Snak","Nav_DropDownItem_Logout":"Log ud","Nav_DropDownItem_Profile":"Profil","Nav_DropDownItem_Orders":"Ordre:% s","Header_Login_EnterHint":"Skriv brugernavn og adgangskode","Link_Login_ForgotPassword":"Glemt kodeord?","Link_Login_CreateAccount":"Opret en konto","Label_LoginForm_Email":"E -mail","Label_LoginForm_EmailPlaceholder":"E -mail","Label_LoginForm_EmailValidationError":"Indtast en gyldig email addresse.","Label_LoginForm_Password":"Adgangskode","Label_LoginForm_PasswordPlaceholder":"Skriv dit kodeord","Label_LoginForm_PasswordValidationError":"Denne adgangskode er for kort","Button_LoginForm_Login":"Log på","Header_ForgotPassword_Password":"Glemt kodeord","Header_ForgotPassword_EnterHint":"Indtast din e-mail-adresse, og en ny adgangskode sendes til dig.","Header_ForgotPassword_Remember":"Kan du huske din adgangskode?","Link_ForgotPassword_Login":"Log på","Label_ForgotPassword_Email":"Email adresse","Label_ForgotPassword_EmailPlaceholder":"Her indtaster du din e -mail -adresse.","Label_ForgotPassword_EmailValidationError":"Indtast venligst en gyldig e-mailadresse.","Button_ForgotPassword_Login":"Send en ny adgangskode","Button_ForgotPassword_Save":"Send en ny adgangskode","Header_SetPassword_Password":"Indtast et nyt kodeord","Header_SetPassword_EnterHint":"Indtast din adgangskode to gange","Link_SetPassword_Cancel":"Afbestille","Label_SetPassword_Label":"Adgangskode","Label_SetPassword_ConfirmLabel":"Bekræft kodeord","Label_SetPassword_MinLengthValidationError":"Adgangskode er for kort (minimum {$minlength} tegn)","Label_SetPassword_MismatchValidationError":"Adgangskoden passer ikke","Button_SetPassword_Save":"Gemme","Email_SiteName_Text":"Aurora","Email_From_Text":"Hej@tritonite.io","Email_ResetPassword_Subject":"Nulstil din adgangskode","Label_List_Month":"Sidste 30 dage","Label_List_Old":"Ældre end 30 dage","Label_List_Today":"I dag","Label_List_Week":"Sidste 7 dage","Label_List_Yesterday":"I går","Label_Chat_Placeholder_Send":"Besked","Label_Chat_Placeholder_Send_Label":"Ny besked","Label_Ordercard_Meta":"Metaværdier","Label_Ordercard_Persondata":"Persondata","Label_Ordercard_Persondata_url":"Billede på person","Label_Ordercard_Postaddress":"Postaddress","Label_Ordercard_Roles":"Roller","Label_Ordercard_Relation":"Relation","Label_Ordercard_Notes":"Noter","Label_Ordercard_Audit":"Revidere","Entity_Label_Field_order_process_method":"Processmetode","Entity_Label_Field_order_type_name":"Ordretype","Entity_Label_state_name":"Ordre status","Entity_Label_state_description":"Ordre status","Entity_Label_Orderid":"Ordre ID","Entity_Label_Title":"Titel","Entity_Label_Nid":"Id","Entity_Label_Created":"Oprettet","Entity_Label_Changed":"Ændret","Entity_Label_Field_pep":"Er en pep","Entity_Label_Field_current_ssn":"SSN","Entity_Label_Field_ssntype":"SSN -type","Entity_Label_Field_Birth date":"Fødselsdato","Entity_Label_Field_postaladdress":"Postadresse","Entity_Label_Field_postaladdress2":"Postadresse 2","Entity_Label_Field_housenumber":"Husnummer","Entity_Label_Field_postalcity":"Postby","Entity_Label_Field_zipcode":"Postnummer","Entity_Label_Field_firstname":"Fornavn","Entity_Label_Field_lastname":"Efternavn","Entity_Label_Field_name_type":"Navnetype","Entity_Label_Field_postalcountry":"Postland","Entity_Label_Field_personid":"Person ID (klassisk)","Entity_Label_Field_person":"Personreference (NID)","Entity_Label_Field_person_relation":"Personforhold","Entity_Label_Field_relation_description":"Beskrivelse","Entity_Label_Field_period_value":"Start dato","Entity_Label_Field_period_value2":"Til dato","Entity_Label_Field_country_of_jurisdiction":"Jurisdiktionsland","Entity_Label_Field_is_active":"Er aktiv person","Entity_Label_Field_role_description":"Rollebeskrivelse","Entity_Label_Field_organisation":"Organisation","Entity_Label_Field_organisation_number":"Organisationsnummer","Entity_Label_Field_notes":"Bemærk","Entity_Label_Field_detailed_role_categories":"Detaljeret kategori","Entity_Label_Field_gender":"Køn","Entity_Label_Field_whom":"Hvem","Entity_Label_Field_what":"Hvad","Entity_Label_Field_when":"Hvornår","Entity_Label_Field_url":"URL","Nav_DropDownItem_Articles":"Artikler","Nav_DropDownItem_Snippets":"Uddrag","Nav_DropDownItem_Labels":"Etiketter","Nav_DropDownItem_Configuration":"Konfiguration","Label_podview_articles_master_title":"Artikler","Label_podview_articles_master_id":"Id","Label_podview_articles_master_typeOfArticle":"Type artikel","Label_podview_articles_master_title1":"Titel","Label_podview_articles_master_ingress":"Ingress","Label_podview_articles_master_language":"Sprog","Label_podview_articles_master_revision":"Revision","Label_podview_articles_master_status":"Dokumentstatus","Label_podview_articles_master_updatedAt":"Opdateret kl","Label_podview_articles_master_version":"Version","Label_podview_articles_master_publish_status":"Udgiv status","Nav_DropDownItem_Tags":"Tags","Nav_DropDownItem_NewDocument":"Nyt dokument","Label_podview_articles_master_status6":"Status","Label_podview_articles_master_status7":"Status","Label_podview_articles_master_status8":"Status","Label_podview_articles_master_status9":"Status","Label_podview_articles_master_status10":"Status","Label_podview_articles_master_status11":"Status","Label_podview_articles_master_status12":"Status","Label_podview_articles_master_status13":"Status","Label_podview_articles_master_status14":"Status","Label_podview_articles_master_status15":"Status","Label_podview_articles_master_status16":"Status","Label_podview_articles_master_status17":"Status","Label_podview_articles_master_status18":"Status","Label_podview_articles_master_status19":"Status","Nav_DropDownItem_Persons":"Søg person","Label_Button_Edit":"Redigere","Label_Button_Create":"Skab","Label_Button_Save":"Gemme","Label_Button_Delete":"Slet","Label_Button_Update":"Opdatering","Label_Button_Cancel":"Afbestille","Label_Autoupdate":"Live opdatering","Label_Button_Add":"Tilføje","Label_Button_Remove":"Fjerne","Label_Ordercard_Personnames":"Navne","Label_Ordercard_Personssn":"SSN","Entity_Label_Field_description":"Om denne ordre","Label_Button_UpdateOrderState":"Opdater ordretilstand","Label_Button_CancelOrder":"Aflys ordre","Entity_Label_Field_deactivationdate":"Deaktiveringsdato","Entity_Label_Field_is_deceased":"Afdød","Entity_Label_Field_deceased_date":"Afdød dato","Entity_Label_Field_name_type_remove_item":"Fjern navnelementet?","Entity_Label_Field_remove_item_text":"Vil du virkelig fjerne denne vare?","Label_Ordercard_PersonSSN":"Person SSN -numre","Entity_Label_Field_ssn_remove_item":"Fjern SSN -varen?","Entity_Label_Field_pepcountry":"Pep land","Entity_Label_FieldCountryOfJurisdiction_Denmark":"Danmark","Entity_Label_FieldCountryOfJurisdiction_Sweden":"Sverige","Entity_Label_FieldCountryOfJurisdiction_Norway":"Norge","Entity_Label_FieldCountryOfJurisdiction_Finland":"Finland","Entity_Label_Field_is_active_role":"Er aktiv rolle","Label_Button_RemoveRole":"Slet","Entity_Label_Item_id":"Id","Entity_Label_Field_Role_remove_item":"Fjerne rolle fra orden?","Label_Button_NewRelation":"Tilføj ny relation","Entity_Label_Field_Relation_remove_item":"Fjerne forholdet fra rækkefølge?","Label_Button_RemoveRelation":"Fjern forholdet","Label_Ordercard_Relations":"Forhold","Entity_Label_Field_relation":"Forholdstype","Entity_Label_Field_Category":"Rollekategori","Entity_Label_Role_description_type":"Rollebeskrivelse Type","Entity_Label_Search":"Søg","Label_Orders_Search":"Søg person eller ordre","Table_OrderList_Column_Name":"Ordre ID","Table_OrderList_Column_Status":"Status","Table_OrderList_Column_OrderType":"Type","Table_OrderList_Column_ModifiedBy":"Ændret","Entity_Label_Person_Card":"Persondata","Entity_Label_Personid":"Person ID Classic","Label_OpenOrderListItem_Languages":"Vælg sprog","Label_Button_ChangeData":"Skift data","Label_Ordercard_PersonOrders":"Ordre til person","Label_Button_Create_Order":"Opret ordre","Label_Person_Save_Order":"Indtast en kommentar til ordren og tryk på gem","TIMEAGO_INIT_STRING":"Til","Entity_Create_Order":"Opret ordre","Table_searchpersonList_Column_ID":"Id","Table_searchpersonList_Column_FirstName":"Fornavn","Table_searchpersonList_Column_LastName":"Efternavn","Table_searchpersonList_Column_PEPRCA":"PEP / RCA","Table_searchpersonList_Column_Country":"Land","Table_searchpersonList_Column_Role":"Detaljeret rolle","Table_searchpersonList_Column_Relation":"Relation","Table_searchpersonList_Column_Organisation":"Organisation","RelationshipWithPersonIs":"Til","Label_searchpersons_Search":"Indtast værdi og tryk på Enter","Label_PersonView":"Personvisning","Label_RoleView":"Rollevisning","RelationshipWithPersonIsDaughterInLaw":"Svigerdatter til","RelationshipWithPersonIsSonInLaw":"Svigersøn til","RelationshipWithPersonIsDoughter":"Doughter til","RelationshipWithPersonIsSon":"Søn til","RelationshipWithPersonIsMotherInLaw":"Svigermor til","RelationshipWithPersonIsFatherInLaw":"Svigerfar til","RelationshipWithPersonIsMother":"Mor til","RelationshipWithPersonIsFather":"Far til","RelationshipWithPersonIsPartner":"Partner med","RelationshipWithPersonIsCoworker":"Kollega med","Table_SearchResultForString":"Resultat til søgestreng","Table_SearchResultTimeLaps":"Søgte i","Table_searchpersonList_Column_RoleDescription":"Rollebeskrivelse","Table_searchpersonList_Column_MainRole":"Hovedrolle","Label_LoginForm_LdapError":"Din brugerid eller adgangskode er ikke korrekt. Prøv igen","Table_searchpersonList_Column_SSN":"Født","Label_ShowAllRoles":"Vis alle roller","Entity_Label_Version_Card":"Versioner","Table_searchpersonList_Column_Birth date":"Fødselsdato","Label_DistinctRoles":"Særskilt rolle","Form_Current_RoleSearch":"Rollesøgningstast (taksonomi)","Form_NumberOfActivePersons":"Antal aktive personer","Form_NumberOfNoneActivePersons":"Antal inaktive personer","Form_NumberOfPersons":"Antal personer","Form_NumberOfActiveRoles":"Antal aktive roller","Label_ResetSearch":"Ny søgning","Entity_Label_Field_SSN":"CPR-nummer","Entity_Label_field_names":"Navne","Label_Button_Create_NewPersonOrder":"Opret ny person","Entity_Label_Field_personname":"Person","Entity_Label_field_type_label":"Persontype -etiket","Entity_Label_field_personid":"Personid (klassisk)","Entity_Label_GoTo_Person":"Goto person","Entity_Label_Field_is_active_relation":"Aktiv relation","Form_NumberOfTotalRoles":"Rækker i tabel","Form_NumberOfNoneActive":"Ingen aktive rækker","Label_variant_yy":"Y","Label_variant_mm":"M","Label_variant_dd":"D","Label_date_error":"Kontroller dato","Label_Invalid_date":"Ugyldig dato","Label_variant_hh":"HH","Label_variant_min":"Mm","Label_Person_QueryNewOrder":"Bekræft venligst at oprette en ny ordre","Label_Button_CreateNewOrder":"Opret ny personordre","Label_Snackbar_DataSaved":"Data gemmes","Label_Snackbar_Error":"En system-fejl forekom!","Nav_DropDownItem_NewOrder":"Ny ordre","Entity_Label_Field_countryofjurisdiction":"Jurisdiktionsland","Entity_Label_Motherboard":"Bundkort","Label_Livestream":"Live stream","Label_Order_Entity":"Livestream -orden","Label_Person_Entity":"Livestream person","Label_Livestream_Last":"Sidste begivenheder","Label_PerformedBy":"Udført af","Label_All_Livestream":"Seneste","Label_Ordercard_CurrentOrders":"Ordre:% s","Label_Ordercard_Subheader":"Aktuelle ordrer","Label_MothercheckPerformed":"Mor check udført","Label_Motherchecks":"Overvågning af nøgleværdier i Aurora -platformen","Label_Motherchecks_sublabel":"Mothercheck -liste","Label_mothercheck_details":"Mothercheck detaljer","Label_Mothercheck_info":"Mothercheck info","Label_Button_OK":"Okay","Entity_Label_Field_current_ssn_error":"Organisationsnummer er fejl","Label_Search_Toolbar":"Personid","Label_MessageCheck":"Beskeder","Label_MessageCheck_sublabel":"Valideringsstatusliste","Label_messagePerformed":"Udførte kontroller","Validate_mandatory_field":"Obligatorisk felt","Validate_mandatory_field_objective":"Dette felt skal udfyldes","Validate_mandatory_field_resolution":"Udfyld marken","Label_Snackbar_ValidationOrderError":"Valideringsfejl i orden","Label_Snackbar_OrderProcessed":"Ordren er behandlet","Validate_Birth date_ok_title":"Fødselsdato Field OK","Validate_Birth date_error_title":"Fødselsdato har en fejl","Validate_gender_ok_title":"Kønsfelt ok","Validate_gender_error_title":"Køn har en fejl","Validate_name_error_title":"Mindst et navn skal være til stede i orden","Validate_name_ok_title":"Navn Kontroller OK","Label_Person_RestoreThisOrder":"Gendan sidste sæt ændringer","Label_Button_RestoreOrder":"Gendanne","Entity_Restore_Order":"Gendan rækkefølge","Entity_Process_Order":"Procesordre","Label_message_details":"Beskrivelse","Validate_pepcountry_ok_title":"Pep country check ok","Validate_pepcountry_error_title":"Mindst et PEP -land skal vælges","Validate_SSN_ok_title":"SSN OK","Validate_SSN_error_title":"SSN mangler","Label_Card_Role":"Rolle","Label_Card_Relation":"Relation","Label_Card_Core":"Kerne","Label_Card_SSN":"SSN","Label_Card_Address":"Adresse","Label_Card_URI":"Uri","Label_Card_Name":"Navn","Label_Card_Order":"Bestille","Validate_nametype_primary_objective":"En ordre måste ha ett primärt namn","Nav_DropDownItem_Orderdashboard":"Bestil dashboard","Entity_Label_SearchPerson":"Søg person","Entity_Label_SearchPerson_Firstname":"Fornavn","Entity_Label_SearchPerson_Lastname":"Efternavn","Entity_Label_SearchPerson_SSNNumber":"Svensk ssn","Entity_Label_SearchPerson_Birth date":"Fødselsdato","Entity_Label_SearchPerson_Year":"År","Entity_Label_SearchPerson_Month":"Måned","Entity_Label_SearchPerson_Day":"Dag","Entity_Label_NameValues":"Navne","Entity_Label_SearchDates":"Datoer","Entity_Label_PEPRCA":"Definer PEP og/eller RCA","Entity_Label_Button_Find":"Søg","Entity_Label_SelectListCountries":"Vælg listelande","Entity_List_Link":"Person","Entity_List_SSN":"CPR-nummer","Entity_List_FirstName":"Fornavn","Entity_List_LastName":"Efternavn","Entity_List_Gender":"Køn","Entity_List_PEP":"Pep","Entity_List_RCA":"RCA","Entity_List_Details":"Vis mere","Entity_Label_Mandatory":"Obligatorisk felt","Entity_Label_Button_Back":"Tilbage","Entity_Label_Button_Close":"Tæt","Entity_List_Birth date":"Fødselsdato","Entity_List_NameType":"Navnetype","Entity_List_Role":"Rolle","Entity_List_RoleCategory":"Rollekategori","Entity_List_RoleCategoryDetails":"Detaljeret kategori","Entity_List_FromDate":"Start dato","Entity_List_ThroughDate":"Til dato","Entity_List_Active":"Rollestatus","Entity_List_Type":"Navnetype","Entity_List_Name":"Navn","Entity_List_Description":"Beskrivelse","Entity_List_CountryOfJurisdiction":"Jurisdiktionsland","Label_Snackbar_NoData":"Ingen personer matcher forespørgslen","Entity_Label_FieldCountryListSimple_All":"Alle lande","Entity_List_SearchBySSN":"SSN -kamp","Entity_Details":"Detaljer","Entity_Names":"Navne","Entity_Roles":"Roller","Entity_Relations":"Forhold","Entity_Label_AddCompanyUser":"Tilføj bruger","Entity_Label_AddUser_Email2":"Genindtast email","Entity_Label_AddUser_Email":"E -mail","Entity_Label_AddUser_Name":"Navn","Entity_UsersList_InactiveMembersTitle":"Inaktive medlemmer","Entity_UsersList_MembersTitle":"Medlemmer","Entity_UsersList_AdminsTitle":"Administratorer","Entity_UsersList_Deactivate":"Deaktiver","Entity_UsersList_Activate":"Aktivér","Entity_UsersList_Name":"Navn","Entity_UsersList_Email":"E -mail","Entity_UsersList_Dialog_Activate":"Aktivere brugeren?","Entity_UsersList_Dialog_Deactivate":"Deaktiver brugeren?","Entity_UsersList_Dialog_Cancel":"Afbestille","Entity_UsersList_Dialog_Confirm":"Bekræfte","Entity_Validation_MandatoryField":"Udfyld venligst et obligatorisk felt","Entity_Validation_MatchErrorField":"Værdier stemmer ikke overens for {$felt}","Entity_UsersList_Active":"Status","Entity_UserList_Pic":"Profil","Nav_DropDownItem_AdminCompanyPersons":"Administrer forretningskonti","Entity_List_Avatar":"#","Nav_DropDownItem_Finnish":"Finsk","Nav_DropDownItem_Danish":"Dansk","Nav_DropDownItem_Norweigan":"Norweigan","Label_ordersbystate_sublabel":"Ordrer efter stat","Entity_Delete_Relation":"Slet dette forhold","Entity_Delete_Role":"Slet denne rolle","Label_Person_Delete_Orde":"Bekræft venligst for at slette varen","Label_Button_ConfirmDelete":"Slet ordre","Nav_DropDownItem_Icleandic":"Island","Entity_Label_Field_ContactUs_Title":"Kontakt os","Entity_Label_Field_ContactUs_Name":"Navn","Entity_Label_Field_ContactUs_Email":"Email adresse","Entity_Label_Field_ContactUs_Email2":"Gentag e-mail-adressen","Entity_Label_Field_ContactUs_Phone":"Telefon","Entity_Label_Field_ContactUs_Content":"Besked","Entity_Label_Button_ContactUs_Submit":"Sende","Entity_Label_Button_ContactUs_Cancel":"Afbestille","Entity_Label_Field_ContactUs_Waltercheck":"Svar på spørgsmålet","Entity_Validation_MandatoryField_Name":"Navn","Entity_Validation_MandatoryField_Email":"E-mail","Entity_Validation_MandatoryField_Message":"Besked","Nav_DropDownItem_About":"Om Aurora","Entity_FileareaList_AdminsTitle":"Filområde","Entity_FileareaList_Download":"Hent","Entity_FileareaList_Name":"Filnavn","Nav_DropDownItem_Filearea":"Filområde","Entity_Label_Field_ContactUs_Success":"Din besked er blevet sendt. Tak skal du have.","Entity_Label_Field_ContactUs_Fail":"Problem med at sende beskeden. Prøv igen senere.","Entity_Label_Download_Success":"Filoverførsel begyndte","Label_LoginForm_GoHome":"Tilbage til hovedsiden","Nav_DropDownItem_Login":"Log på","Label_Content_Help":"Hjælp med søgning?","Entity_Details_Address":"Adresse","Entity_List_Address":"Postadresse","Entity_List_Address2":"Postadresse 2","Entity_List_HouseNumber":"Husnummer","Entity_List_PostalCity":"By","Entity_List_ZipCode":"Postnummer","Entity_List_PostalCountry":"Land","Label_Person_Delete_Order":"Slet ordre","Entity_List_RelationType":"Forholdstype","Entity_List_RelationDescription":"Forholdsbeskrivelse","Entity_List_BirthDate":"Fødselsdato","Label_EntityIsUpdated":"Sidst ændret","Entity_AuroraID":"Aurora ID","Label_RoleIsActive":"Aktiv","Label_RoleIsInActive":"Inaktiv","Label_Button_Clear":"Klar","Label_Button_Filter":"Filter","Label_Button_Search":"Søg","Label_NoSearchPerfomed":"Intet søgeresultat. Søgningen blev udført","Entity_List_OpenRelation":"Gå til beslægtet person","Label_Welcome":"Velkommen","Label_Country_Sweden":"Sverige","Label_Country_Denmark":"Danmark","Label_Country_Finland":"Finland","Label_Country_Norway":"Norge","Nav_DropDownItem_Settings":"Indstillinger","Nav_DropDownItem_ChangePassword":"Skift kodeord","Nav_DropDownItem_Darkmode":"Skift tema","Nav_DropDownItem_Contact":"Kontakt os","Label_SearchAppName":"Aurora Pod","Label_Tooltip_ThemeDark":"Brug mørkt tema","Label_Tooltip_ThemeLight":"Brug let tema","Label_Tooltip_Settings":"Indstillinger","Label_Tooltip_Contact":"Kontakt os","Label_Tooltip_Filearea":"Filearea","Label_Tooltip_HandleUsers":"Administrer forretningskonti","Entity_Label_SetPassWord":"Gem nyt adgangskode","Label_RegisterForm_Password":"Adgangskode","Tooltip_RegisterForm_Password":"Mindst 8 tegn","Label_RegisterForm_PasswordConfirm":"Bekræft kodeord","Tooltip_RegisterForm_PasswordConfirm":"Skriv igen for at bekræfte adgangskoden","Label_PasswordChanged":"Adgangskode ændret","Label_Password_Guidelines":"Strengen skal indeholde mindst 1 alfabetisk karakter af små bogstaver, mindst 1 store alfabetiske karakter, mindst 1 numerisk karakter og mindst en speciel karakter. Strengen skal være otte tegn eller længere","Button_Password_Save":"Gem nyt adgangskode","Error_RegisterForm_Password":"Fejl for adgangskodeformat","Error_RegisterForm_PasswordMatch":"Adgangskoden passer ikke","Label_LoginForm_Account":"Kontonavn","Label_LoginForm_AccountPlaceholder":"Indtast dit kontonavn","Denmark":"Danmark","Sweden":"Sverige","Finlan":"Finlan","Norway":"Norge","Entity_Label_Error_canPerformSSNSearchFalse":"Du skal kombinere SSN -søgning med for- og efternavn","Confirm_you_want_to_remove_user_from_Company":"Bekræft, at du vil fjerne brugeren fra virksomheden.","ButtonRemoveUser":"Fjern brugeren","ButtonCancel":"Afbestille","Titel_Delete_User":"Fjern brugeren","User_already_exists_Contact_support":"Bruger eksistere allerede. Kontakt support, hvis du har brug for hjælp til at relatere denne bruger til dette firma.","SSN_format_error":"Indtast personnummer i formatet yyyymmdd-xxxx","Label_Content_Cookie":"Om cookies","time_indicator":"På tidspunktet","January":"Januar","February":"Februar","March":"Marts","April":"April","May":"Kan","June":"Juni","July":"Juli","August":"August","September":"September","October":"Oktober","November":"November","December":"December","Nav_DropDownItem_Livestream":"Intercom","Label_MyChatChannels":"Kanaler","Label_MyChatChannelsMostRecent":"Seneste","Link_Login_Registe":"Tilslutte","Label_Onboarding_Password":"Indtast adgangskode","Label_Onboarding_PasswordAgain":"Indtast adgangskode igen","Nav_DropDownItem_MCC":"Dashboard","Entity_Label_Filter":"Filter","Nav_DropDownItem_MCCDashBoard":"Dashboard","Nav_DropDownItem_PODView":"POD view","Label_AppName":"Aurora","Nav_DropDownItem_Profilesettings":"Profilindstillinger","Nav_DropDownItem_Databrowser":"Databrowser","Nav_DropDownItem_Suspence":"Suspence","Nav_DropDownItem_OrderHistory":"Ordre historik","Nav_DropDownItem_Alarmlist":"Alarmliste","Label_LoginForm_UsernamePlaceholder":"Brugernavn","Label_LoginForm_Username":"Brugernavn","Nav_DropDownItem_MCCPOD":"POD","Nav_DropDownItem_MCCGateways":"Gateways","Nav_DropDownItem_MCCSensors":"Sensorer","Nav_DropDownItem_MCCEnergy":"Energi","Nav_DropDownItem_MCCPower":"Strøm","Nav_DropDownItem_MCCVolume":"Bind","Table_Column_entity_class":"Enhed","Table_Column_point_class":"Punkt","Table_Column_brickSensorClass":"Brick sensor class","Table_Column_gatewayClassId":"Gateway class","Table_Column_time_read_string":"Læs tidsstempel","Table_Column_gatewayId":"Gateway ID","Table_Column_lastKnownValue":"Sidst kendte værdi","Table_Column_write_time_string":"Data blev gemt","Table_Column_point_id":"Punkt","Table_Column_brickSensorClassQuantity":"Brick sensor Quantity","Table_Column_timestamp_read":"Læs tidsstempel","Table_Column_transformedElement":"Enhedsobjektparameter","Table_Column_processStatus":"Processtatus","Table_Column_command":"Kommando","Nav_DropDownItem_Agents":"Agents","Nav_DropDownItem_Events":"Data","Nav_DropDownItem_Ontology":"Ontologi","Table_Column_Ontotology_Name":"Navn","Table_Column_Ontotology_Description":"Beskrivelse","Table_Column_Ontotology_Foldername":"Mappenavn","Table_Column_Ontotology_Ontology":"Ontologi","Table_Column_Ontotology_Superclass":"Superclass","Table_Column_Ontotology_Type":"Type","Table_Column_Ontotology_Updated":"Opdateret","Table_Column_Ontotology_UpdatedAsDateString":"Opdateret som streng","Table_Column_topic":"Topic","Nav_DropDownItem_Edit":"Redigere","Nav_DropDownItem_SensorMapping":"Sensorkortlægning","Nav_DropDownItem_EditModel":"Data tree","Nav_DropDownItem_ExportCenter":"Export center","Nav_DropDownItem_Meters":"Meter","Button_RegisterForm_Register":"Registrer en ny konto","Label_iHaveAnAccount_Login":"Jeg har allerede en konto","Label_RegisterForm_Register":"Registrer en ny konto","Label_RegisterForm_RegisterInfo":"Registrer en ny konto for at bruge tjenesten","Label_RegisterForm_Name":"Navngiv din konto","Tooltip_RegisterForm_Name":"Navnet på din konto","Label_RegisterForm_Voucher":"Rabatkupon","Tooltip_RegisterForm_Voucher":"Indtast den kupon, du har modtaget, for at registrere kontoen","Label_RegisterForm_Email":"E-mail","Tooltip_RegisterForm_Email":"Indtast e-mail til din konto","Error_RegisterForm_Name":"Du skal give din konto et navn","Error_RegisterForm_Voucher":"Indtast voucheren for at oprette kontoen","Error_RegisterForm_Email":"Indtast venligst en e-mail til kontoen"});Package['universe:i18n'].i18n._ts = Math.max(Package['universe:i18n'].i18n._ts, 1708695287702);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"en.i18n.yml.js":function module(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// i18n/core/en.i18n.yml.js                                                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Package['universe:i18n'].i18n.addTranslations('en','',{"language":"en","LINE02":"LINE02","Header_Login_Login":"Log in","Nav_DropDownItem_English":"English","Nav_DropDownItem_Swedish":"Swedish","Nav_DropDownItem_Help":"Help","Nav_DropDownItem_Chat":"Chat","Nav_DropDownItem_Logout":"Log Out","Nav_DropDownItem_Profile":"Profile","Nav_DropDownItem_Orders":"Orders","Header_Login_EnterHint":"Write username and password","Link_Login_ForgotPassword":"Forgot password?","Link_Login_CreateAccount":"Create an account","Label_LoginForm_Email":"Email","Label_LoginForm_EmailPlaceholder":"Email","Label_LoginForm_EmailValidationError":"Enter a valid email address.","Label_LoginForm_Password":"Password","Label_LoginForm_PasswordPlaceholder":"Enter your password","Label_LoginForm_PasswordValidationError":"That password is too short","Button_LoginForm_Login":"Login","Header_ForgotPassword_Password":"Forgot password","Header_ForgotPassword_EnterHint":"Enter your e-mail address and a new password will be sent to you.","Header_ForgotPassword_Remember":"Do you remember your password?","Link_ForgotPassword_Login":"Login","Label_ForgotPassword_Email":"Email Address","Label_ForgotPassword_EmailPlaceholder":"Here you enter your email address.","Label_ForgotPassword_EmailValidationError":"Please enter a valid email address.","Button_ForgotPassword_Login":"Send a new password","Button_ForgotPassword_Save":"Send a new password","Header_SetPassword_Password":"Enter a new password","Header_SetPassword_EnterHint":"Enter your password twice","Link_SetPassword_Cancel":"Cancel","Label_SetPassword_Label":"Password","Label_SetPassword_ConfirmLabel":"Confirm Password","Label_SetPassword_MinLengthValidationError":"Password is too short (minimum {$minLength} characters)","Label_SetPassword_MismatchValidationError":"Password does not match","Button_SetPassword_Save":"Save","Email_SiteName_Text":"Aurora","Email_From_Text":"Hello@tritonite.io","Email_ResetPassword_Subject":"Reset your password","Label_List_Month":"Last 30 days","Label_List_Old":"Older than 30 days","Label_List_Today":"Today","Label_List_Week":"Last 7 days","Label_List_Yesterday":"Yesterday","Label_Chat_Placeholder_Send":"Message","Label_Chat_Placeholder_Send_Label":"New message","Label_Ordercard_Meta":"Meta values","Label_Ordercard_Persondata":"Person data","Label_Ordercard_Persondata_url":"Picture at person","Label_Ordercard_Postaddress":"Postaddress","Label_Ordercard_Roles":"Roles","Label_Ordercard_Relation":"Relation","Label_Ordercard_Notes":"Notes","Label_Ordercard_Audit":"Audit","Entity_Label_Field_order_process_method":"Process method","Entity_Label_Field_order_type_name":"Order type","Entity_Label_state_name":"Order status","Entity_Label_state_description":"Order status","Entity_Label_Orderid":"Order ID","Entity_Label_Title":"Titel","Entity_Label_Nid":"ID","Entity_Label_Created":"Created","Entity_Label_Changed":"Changed","Entity_Label_Field_pep":"Is a PEP","Entity_Label_Field_current_ssn":"SSN","Entity_Label_Field_ssntype":"SSN Type","Entity_Label_Field_Birth date":"Birth date","Entity_Label_Field_postaladdress":"Postal adress","Entity_Label_Field_postaladdress2":"Postal adress 2","Entity_Label_Field_housenumber":"House number","Entity_Label_Field_postalcity":"Postal city","Entity_Label_Field_zipcode":"Zip code","Entity_Label_Field_firstname":"First name","Entity_Label_Field_lastname":"Last name","Entity_Label_Field_name_type":"Name type","Entity_Label_Field_postalcountry":"Postal Country","Entity_Label_Field_personid":"Person ID (Classic)","Entity_Label_Field_person":"Person Reference (nid)","Entity_Label_Field_person_relation":"Person relationship","Entity_Label_Field_relation_description":"Description","Entity_Label_Field_period_value":"Start date","Entity_Label_Field_period_value2":"Through Date","Entity_Label_Field_country_of_jurisdiction":"Country of jurisdiction","Entity_Label_Field_is_active":"Is active person","Entity_Label_Field_role_description":"Role description","Entity_Label_Field_organisation":"Organisation","Entity_Label_Field_organisation_number":"Organisation number","Entity_Label_Field_notes":"Note","Entity_Label_Field_detailed_role_categories":"Detailed category","Entity_Label_Field_gender":"Gender","Entity_Label_Field_whom":"Whom","Entity_Label_Field_what":"What","Entity_Label_Field_when":"When","Entity_Label_Field_url":"URL","Nav_DropDownItem_Articles":"Articles","Nav_DropDownItem_Snippets":"Snippets","Nav_DropDownItem_Labels":"Labels","Nav_DropDownItem_Configuration":"Configuration","Label_podview_articles_master_title":"Articles","Label_podview_articles_master_id":"Id","Label_podview_articles_master_typeOfArticle":"Type of article","Label_podview_articles_master_title1":"Titel","Label_podview_articles_master_ingress":"Ingress","Label_podview_articles_master_language":"Language","Label_podview_articles_master_revision":"Revision","Label_podview_articles_master_status":"Document status","Label_podview_articles_master_updatedAt":"Updatede at","Label_podview_articles_master_version":"Version","Label_podview_articles_master_publish_status":"Publish status","Nav_DropDownItem_Tags":"Tags","Nav_DropDownItem_NewDocument":"New document","Label_podview_articles_master_status6":"Status","Label_podview_articles_master_status7":"Status","Label_podview_articles_master_status8":"Status","Label_podview_articles_master_status9":"Status","Label_podview_articles_master_status10":"Status","Label_podview_articles_master_status11":"Status","Label_podview_articles_master_status12":"Status","Label_podview_articles_master_status13":"Status","Label_podview_articles_master_status14":"Status","Label_podview_articles_master_status15":"Status","Label_podview_articles_master_status16":"Status","Label_podview_articles_master_status17":"Status","Label_podview_articles_master_status18":"Status","Label_podview_articles_master_status19":"Status","Nav_DropDownItem_Persons":"Search person","Label_Button_Edit":"Edit","Label_Button_Create":"Create","Label_Button_Save":"Save","Label_Button_Delete":"Delete","Label_Button_Update":"Update","Label_Button_Cancel":"Cancel","Label_Autoupdate":"Live update","Label_Button_Add":"Add","Label_Button_Remove":"Remove","Label_Ordercard_Personnames":"Names","Label_Ordercard_Personssn":"SSN","Entity_Label_Field_description":"About this order","Label_Button_UpdateOrderState":"Update order state","Label_Button_CancelOrder":"Cancel order","Entity_Label_Field_deactivationdate":"Deactivation date","Entity_Label_Field_is_deceased":"Deceased","Entity_Label_Field_deceased_date":"Deceased date","Entity_Label_Field_name_type_remove_item":"Remove name item?","Entity_Label_Field_remove_item_text":"Do you really want to remove this item?","Label_Ordercard_PersonSSN":"Person SSN numbers","Entity_Label_Field_ssn_remove_item":"Remove SSN item?","Entity_Label_Field_pepcountry":"PEP Country","Entity_Label_FieldCountryOfJurisdiction_Denmark":"Denmark","Entity_Label_FieldCountryOfJurisdiction_Sweden":"Sweden","Entity_Label_FieldCountryOfJurisdiction_Norway":"Norway","Entity_Label_FieldCountryOfJurisdiction_Finland":"Finland","Entity_Label_Field_is_active_role":"Is active role","Label_Button_NewRole":"Add a new role","Label_Button_RemoveRole":"Delete","Entity_Label_Item_id":"Id","Entity_Label_Field_Role_remove_item":"Remove role from order?","Label_Button_NewRelation":"Add new releation","Entity_Label_Field_Relation_remove_item":"Remove relation from order?","Label_Button_RemoveRelation":"Remove relation","Label_Ordercard_Relations":"Relationship","Entity_Label_Field_relation":"Relationship type","Entity_Label_Field_Category":"Role category","Entity_Label_Role_description_type":"Role description type","Entity_Label_Search":"Search","Label_Orders_Search":"Search person or order","Table_OrderList_Column_Name":"Order id","Table_OrderList_Column_Status":"Status","Table_OrderList_Column_OrderType":"Type","Table_OrderList_Column_ModifiedBy":"Changed","Entity_Label_Person_Card":"Person data","Entity_Label_Personid":"Person ID Classic","Label_OpenOrderListItem_Languages":"Select language","Label_Button_ChangeData":"Change data","Label_Ordercard_PersonOrders":"Order for person","Label_Button_Create_Order":"Create order","Label_Person_Save_Order":"Plese enter a comment for the order and press Save","TIMEAGO_INIT_STRING":"For","Entity_Create_Order":"Create Order","Table_searchpersonList_Column_ID":"ID","Table_searchpersonList_Column_FirstName":"First name","Table_searchpersonList_Column_LastName":"Last name","Table_searchpersonList_Column_PEPRCA":"PEP / RCA","Table_searchpersonList_Column_Country":"Country","Table_searchpersonList_Column_Role":"Detailed role","Table_searchpersonList_Column_Relation":"Relation","Table_searchpersonList_Column_Organisation":"Organisation","RelationshipWithPersonIs":"To","Label_searchpersons_Search":"Enter value and press enter","Label_PersonView":"Person view","Label_RoleView":"Role view","RelationshipWithPersonIsDaughterInLaw":"Daughter-in-law to","RelationshipWithPersonIsSonInLaw":"Son-in-law to","RelationshipWithPersonIsDoughter":"Doughter to","RelationshipWithPersonIsSon":"Son to","RelationshipWithPersonIsMotherInLaw":"Mother-in-law to","RelationshipWithPersonIsFatherInLaw":"Father-in-law to","RelationshipWithPersonIsMother":"Mother to","RelationshipWithPersonIsFather":"Father to","RelationshipWithPersonIsPartner":"Partner with","RelationshipWithPersonIsCoworker":"Coworker with","Table_SearchResultForString":"Result for searchstring","Table_SearchResultTimeLaps":"Searched in","Table_searchpersonList_Column_RoleDescription":"Role description","Table_searchpersonList_Column_MainRole":"Main role","Label_LoginForm_LdapError":"Your userid or password is not correct. Please try again","Table_searchpersonList_Column_SSN":"Born","Label_ShowAllRoles":"Show all roles","Entity_Label_Version_Card":"Versions","Table_searchpersonList_Column_Birth date":"Birth date","Label_DistinctRoles":"Distinct role presenation","Form_Current_RoleSearch":"Role search key (Taxonomy)","Form_NumberOfActivePersons":"Number of active persons","Form_NumberOfNoneActivePersons":"Number of inactive persons","Form_NumberOfPersons":"Number of persons","Form_NumberOfActiveRoles":"Number of active roles","Label_ResetSearch":"New search","Entity_Label_Field_SSN":"Social Security number","Entity_Label_field_names":"Names","Label_Button_Create_NewPersonOrder":"Create new person","Entity_Label_Field_personname":"Person","Entity_Label_field_type_label":"Person type label","Entity_Label_field_personid":"PersonId (classic)","Entity_Label_GoTo_Person":"Goto person","Entity_Label_Field_is_active_relation":"Active relation","Form_NumberOfTotalRoles":"Rows in table","Form_NumberOfNoneActive":"None active rows","Label_variant_yy":"Y","Label_variant_mm":"M","Label_variant_dd":"D","Label_date_error":"Check date","Label_Invalid_date":"Invalid date","Label_variant_hh":"HH","Label_variant_min":"MM","Label_Person_QueryNewOrder":"Please confirm to create a new order","Label_Button_CreateNewOrder":"Create new Person order","Label_Snackbar_DataSaved":"Data is saved","Label_Snackbar_Error":"A system-error occured!","Nav_DropDownItem_NewOrder":"New order","Entity_Label_Field_countryofjurisdiction":"Country of Jurisdiction","Entity_Label_Motherboard":"Motherboard","Label_Livestream":"Livestream","Label_Order_Entity":"Livestream Order","Label_Person_Entity":"Livestream Person","Label_Livestream_Last":"Last events","Label_PerformedBy":"Performed by","Label_All_Livestream":"Most recent","Label_Ordercard_CurrentOrders":"Orders","Label_Ordercard_Subheader":"Current orders","Label_MothercheckPerformed":"Mother check performed","Label_Motherchecks":"Monitoring key values in Aurora platform","Label_Motherchecks_sublabel":"Mothercheck list","Label_mothercheck_details":"Mothercheck Details","Label_Mothercheck_info":"Mothercheck info","Label_Button_OK":"OK","Entity_Label_Field_current_ssn_error":"Organisation number is error","Label_Search_Toolbar":"PersonID","Label_MessageCheck":"Messages","Label_MessageCheck_sublabel":"Validation status list","Label_messagePerformed":"Performed checks","Validate_mandatory_field":"Mandatory field","Validate_mandatory_field_objective":"This field must be filled in","Validate_mandatory_field_resolution":"Fill in the field","Label_Snackbar_ValidationOrderError":"Validation error in Order","Label_Snackbar_OrderProcessed":"The order has been processed","Validate_Birth date_ok_title":"Birth date field ok","Validate_Birth date_error_title":"Birth date has an error","Validate_gender_ok_title":"Gender field ok","Validate_gender_error_title":"Gender has an error","Validate_name_error_title":"At least one name must be present in order","Validate_name_ok_title":"Name check ok","Label_Person_RestoreThisOrder":"Restore last set of changes","Label_Button_RestoreOrder":"Restore","Entity_Restore_Order":"Restore order","Entity_Process_Order":"Process order","Label_message_details":"Description","Validate_pepcountry_ok_title":"PEP country check ok","Validate_pepcountry_error_title":"At least one PEP country must be selected","Validate_SSN_ok_title":"SSN ok","Validate_SSN_error_title":"SSN missing","Label_Card_Role":"Role","Label_Card_Relation":"Relation","Label_Card_Core":"Core","Label_Card_SSN":"SSN","Label_Card_Address":"Address","Label_Card_URI":"Uri","Label_Card_Name":"Name","Label_Card_Order":"Order","Validate_nametype_primary_objective":"En order måste ha ett Primärt namn","Nav_DropDownItem_Orderdashboard":"Order dashboard","Entity_Label_SearchPerson":"Search person","Entity_Label_SearchPerson_Firstname":"First name","Entity_Label_SearchPerson_Lastname":"Last name","Entity_Label_SearchPerson_SSNNumber":"Swedish ssn","Entity_Label_SearchPerson_Birth date":"Birth date","Entity_Label_SearchPerson_Year":"Year","Entity_Label_SearchPerson_Month":"Month","Entity_Label_SearchPerson_Day":"Day","Entity_Label_NameValues":"Names","Entity_Label_SearchDates":"Dates","Entity_Label_PEPRCA":"Define PEP and/or RCA","Entity_Label_Button_Find":"Search","Entity_Label_SelectListCountries":"Select list countries","Entity_List_Link":"Person","Entity_List_SSN":"Social security number","Entity_List_FirstName":"Firstname","Entity_List_LastName":"Surname","Entity_List_Gender":"Gender","Entity_List_PEP":"PEP","Entity_List_RCA":"RCA","Entity_List_Details":"Show more","Entity_Label_Mandatory":"Mandatory field","Entity_Label_Button_Back":"Back","Entity_Label_Button_Close":"Close","Entity_List_Birth date":"Birth date","Entity_List_NameType":"Name type","Entity_List_Role":"Role","Entity_List_RoleCategory":"Role category","Entity_List_RoleCategoryDetails":"Detailed category","Entity_List_FromDate":"Start date","Entity_List_ThroughDate":"Through Date","Entity_List_Active":"Role status","Entity_List_Type":"Name type","Entity_List_Name":"Name","Entity_List_Description":"Description","Entity_List_CountryOfJurisdiction":"Country of Jurisdiction","Label_Snackbar_NoData":"No person match the query","Entity_Label_FieldCountryListSimple_All":"All countries","Entity_List_SearchBySSN":"SSN match","Entity_Details":"Details","Entity_Names":"Names","Entity_Roles":"Roles","Entity_Relations":"Relations","Entity_Label_AddCompanyUser":"Add user","Entity_Label_AddUser_Email2":"Re- enter Email","Entity_Label_AddUser_Email":"Email","Entity_Label_AddUser_Name":"Name","Entity_UsersList_InactiveMembersTitle":"Inactive members","Entity_UsersList_MembersTitle":"Members","Entity_UsersList_AdminsTitle":"Admins","Entity_UsersList_Deactivate":"Deactivate","Entity_UsersList_Activate":"Activate","Entity_UsersList_Name":"Name","Entity_UsersList_Email":"Email","Entity_UsersList_Dialog_Activate":"Activate user?","Entity_UsersList_Dialog_Deactivate":"Deactivate user?","Entity_UsersList_Dialog_Cancel":"Cancel","Entity_UsersList_Dialog_Confirm":"Confirm","Entity_Validation_MandatoryField":"Please fill in a mandatory field","Entity_Validation_MatchErrorField":"Values don't match for {$field}","Entity_UsersList_Active":"Status","Entity_UserList_Pic":"Profile","Nav_DropDownItem_AdminCompanyPersons":"Manage Business Accounts","Entity_List_Avatar":"#","Nav_DropDownItem_Finnish":"Finnish","Nav_DropDownItem_Danish":"Danish","Nav_DropDownItem_Norweigan":"Norweigan","Label_ordersbystate_sublabel":"Orders by state","Entity_Delete_Relation":"Delete this relation","Entity_Delete_Role":"Delete this role","Label_Person_Delete_Orde":"Please confirm in order to delete item","Label_Button_ConfirmDelete":"Delete order","Nav_DropDownItem_Icleandic":"Iceland","Entity_Label_Field_ContactUs_Title":"Contact us","Entity_Label_Field_ContactUs_Name":"Name","Entity_Label_Field_ContactUs_Email":"E-Mail adress","Entity_Label_Field_ContactUs_Email2":"Repeat e-mail adress","Entity_Label_Field_ContactUs_Phone":"Phone","Entity_Label_Field_ContactUs_Content":"Message","Entity_Label_Button_ContactUs_Submit":"Send","Entity_Label_Button_ContactUs_Cancel":"Cancel","Entity_Label_Field_ContactUs_Waltercheck":"Answer the question","Entity_Validation_MandatoryField_Name":"Name","Entity_Validation_MandatoryField_Email":"E-mail","Entity_Validation_MandatoryField_Message":"Message","Nav_DropDownItem_About":"About Aurora","Entity_FileareaList_AdminsTitle":"File area","Entity_FileareaList_Download":"Download","Entity_FileareaList_Name":"File name","Nav_DropDownItem_Filearea":"File area","Entity_Label_Field_ContactUs_Success":"Your message has been sent. Thank you.","Entity_Label_Field_ContactUs_Fail":"Problem sending the message. Please try again later.","Entity_Label_Download_Success":"File transfer commenced","Label_LoginForm_GoHome":"Back to main page","Nav_DropDownItem_Login":"Log In","Label_Content_Help":"Help with search?","Entity_Details_Address":"Address","Entity_List_Address":"Postal address","Entity_List_Address2":"Postal address 2","Entity_List_HouseNumber":"House number","Entity_List_PostalCity":"City","Entity_List_ZipCode":"Zip Code","Entity_List_PostalCountry":"Country","Label_Person_Delete_Order":"Delete order","Entity_List_RelationType":"Relation type","Entity_List_RelationDescription":"Relation description","Entity_List_BirthDate":"Birth date","Label_EntityIsUpdated":"Last changed","Entity_AuroraID":"Aurora ID","Label_RoleIsActive":"Active","Label_RoleIsInActive":"Inactive","Label_Button_Clear":"Clear","Label_Button_Filter":"Filter","Label_Button_Search":"Search","Label_NoSearchPerfomed":"No search result. The search was performed","Entity_List_OpenRelation":"Go to related person","Label_Welcome":"Welcome","Label_Country_Sweden":"Sweden","Label_Country_Denmark":"Denmark","Label_Country_Finland":"Finland","Label_Country_Norway":"Norway","Nav_DropDownItem_Settings":"Settings","Nav_DropDownItem_ChangePassword":"Change password","Nav_DropDownItem_Darkmode":"Change theme","Nav_DropDownItem_Contact":"Contact us","Label_SearchAppName":"Aurora POD","Label_Tooltip_ThemeDark":"Use dark theme","Label_Tooltip_ThemeLight":"Use light theme","Label_Tooltip_Settings":"Settings","Label_Tooltip_Contact":"Contact us","Label_Tooltip_Filearea":"Filearea","Label_Tooltip_HandleUsers":"Manage Business Accounts","Entity_Label_SetPassWord":"Save new password","Label_RegisterForm_Password":"Password","Tooltip_RegisterForm_Password":"At least 8 characters","Label_RegisterForm_PasswordConfirm":"Confirm password","Tooltip_RegisterForm_PasswordConfirm":"Write again in order to confirm the password","Label_PasswordChanged":"Password changed","Label_Password_Guidelines":"The string must contain at least 1 lowercase alphabetical character,  at least 1 uppercase alphabetical character, at least 1 numeric character and at least one special character. The string must be eight characters or longer","Button_Password_Save":"Save new password","Error_RegisterForm_Password":"Password format error","Error_RegisterForm_PasswordMatch":"Password does not match","Label_LoginForm_Account":"Account name","Label_LoginForm_AccountPlaceholder":"Enter your account name","Denmark":"Denmark","Sweden":"Sweden","Finlan":"Finlan","Norway":"Norway","Entity_Label_Error_canPerformSSNSearchFalse":"You need to combine SSN search with first and last name","Confirm_you_want_to_remove_user_from_Company":"Confirm that you want to remove the user from the company.","ButtonRemoveUser":"Remove user","ButtonCancel":"Cancel","Titel_Delete_User":"Remove user","User_already_exists_Contact_support":"User already exists. Please contact support if you need help to relate this user to this company.","SSN_format_error":"Enter social security number in the format YYYYMMDD-XXXX","Label_Content_Cookie":"About cookies","time_indicator":"At time","January":"January","February":"February","March":"March","April":"April","May":"May","June":"June","July":"July","August":"August","September":"September","October":"October","November":"November","December":"December","Nav_DropDownItem_Livestream":"Intercom","Label_MyChatChannels":"Channels","Label_MyChatChannelsMostRecent":"Most recent","Link_Login_Registe":"Join","Label_Onboarding_Password":"Enter password","Label_Onboarding_PasswordAgain":"Enter password again","Nav_DropDownItem_MCC":"Dashboard","Entity_Label_Filter":"Filter","Nav_DropDownItem_MCCDashBoard":"Dashboard","Nav_DropDownItem_PODView":"POD view","Label_AppName":"Aurora","Nav_DropDownItem_Profilesettings":"Profile settings","Nav_DropDownItem_Databrowser":"Data browser","Nav_DropDownItem_Suspence":"Suspence","Nav_DropDownItem_OrderHistory":"Order history","Nav_DropDownItem_Alarmlist":"Alarm list","Label_LoginForm_UsernamePlaceholder":"User name ","Label_LoginForm_Username":"User name ","Nav_DropDownItem_MCCPOD":"POD","Nav_DropDownItem_MCCGateways":"Gateways","Nav_DropDownItem_MCCSensors":"Sensors","Nav_DropDownItem_MCCEnergy":"Energy","Nav_DropDownItem_MCCPower":"Power","Nav_DropDownItem_MCCVolume":"Volume","Table_Column_entity_class":"Entity","Table_Column_point_class":"Point","Table_Column_brickSensorClass":"Brick sensor class","Table_Column_gatewayClassId":"Gateway class","Table_Column_time_read_string":"Read timestamp","Table_Column_gatewayId":"Gateway ID","Table_Column_lastKnownValue":"Last known value","Table_Column_write_time_string":"Data was saved","Table_Column_point_id":"Point","Table_Column_brickSensorClassQuantity":"Brick sensor Quantity","Table_Column_timestamp_read":"Read timestamp","Table_Column_transformedElement":"Device object parameter","Table_Column_processStatus":"Process status","Table_Column_command":"Command","Nav_DropDownItem_Agents":"Agents","Nav_DropDownItem_Events":"Data","Nav_DropDownItem_Ontology":"Ontology","Table_Column_Ontotology_Name":"Name","Table_Column_Ontotology_Description":"Description","Table_Column_Ontotology_Foldername":"Foldername","Table_Column_Ontotology_Ontology":"Ontology","Table_Column_Ontotology_Superclass":"Superclass","Table_Column_Ontotology_Type":"Type","Table_Column_Ontotology_Updated":"Updated","Table_Column_Ontotology_UpdatedAsDateString":"Updated as string","Table_Column_topic":"Topic","Nav_DropDownItem_Edit":"Edit","Nav_DropDownItem_SensorMapping":"Sensor mapping","Nav_DropDownItem_EditModel":"Data tree","Nav_DropDownItem_ExportCenter":"Export center","Nav_DropDownItem_Meters":"Meters","Button_RegisterForm_Register":"Register a new account","Label_iHaveAnAccount_Login":"I already have an account","Label_RegisterForm_Register":"Register a new account","Label_RegisterForm_RegisterInfo":"Register a new account in order to use the service","Label_RegisterForm_Name":"Name you account","Tooltip_RegisterForm_Name":"The name of your account","Label_RegisterForm_Voucher":"Voucher","Tooltip_RegisterForm_Voucher":"Enter the voucher you received in order register the account","Label_RegisterForm_Email":"E-mail","Tooltip_RegisterForm_Email":"Enter e-mail for your account","Error_RegisterForm_Name":"You need to give your account a name","Error_RegisterForm_Voucher":"Please enter the voucher in order to create the account","Error_RegisterForm_Email":"Please enter an e-mail for the account"});Package['universe:i18n'].i18n._ts = Math.max(Package['universe:i18n'].i18n._ts, 1708695287705);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"es.i18n.yml.js":function module(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// i18n/core/es.i18n.yml.js                                                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Package['universe:i18n'].i18n.addTranslations('es','',{"language":"es","LINE02":"LINE02","Header_Login_Login":"Acceso","Nav_DropDownItem_English":"Inglés","Nav_DropDownItem_Swedish":"Sueco","Nav_DropDownItem_Help":"Ayuda","Nav_DropDownItem_Chat":"Charlar","Nav_DropDownItem_Logout":"Cerrar sesión","Nav_DropDownItem_Profile":"Perfil","Nav_DropDownItem_Orders":"Pedidos","Header_Login_EnterHint":"Escribir nombre de usuario y contraseña","Link_Login_ForgotPassword":"¿Has olvidado tu contraseña?","Link_Login_CreateAccount":"Crea una cuenta","Label_LoginForm_Email":"Correo electrónico","Label_LoginForm_EmailPlaceholder":"Correo electrónico","Label_LoginForm_EmailValidationError":"Introduzca una dirección de correo electrónico válida.","Label_LoginForm_Password":"Contraseña","Label_LoginForm_PasswordPlaceholder":"Ingresa tu contraseña","Label_LoginForm_PasswordValidationError":"Esa contraseña es demasiado corta","Button_LoginForm_Login":"Acceso","Header_ForgotPassword_Password":"Has olvidado tu contraseña","Header_ForgotPassword_EnterHint":"Ingrese su dirección de correo electrónico y se le enviará una nueva contraseña.","Header_ForgotPassword_Remember":"¿Recuerdas tu contraseña?","Link_ForgotPassword_Login":"Acceso","Label_ForgotPassword_Email":"Dirección de correo electrónico","Label_ForgotPassword_EmailPlaceholder":"Aquí ingresa su dirección de correo electrónico.","Label_ForgotPassword_EmailValidationError":"Por favor, introduce una dirección de correo electrónico válida.","Button_ForgotPassword_Login":"Enviar una nueva contraseña","Button_ForgotPassword_Save":"Enviar una nueva contraseña","Header_SetPassword_Password":"Introduzca una nueva contraseña","Header_SetPassword_EnterHint":"Ingrese su contraseña dos veces","Link_SetPassword_Cancel":"Cancelar","Label_SetPassword_Label":"Contraseña","Label_SetPassword_ConfirmLabel":"Confirmar Contraseña","Label_SetPassword_MinLengthValidationError":"La contraseña es demasiado corta (mínimo {$ minlength} caracteres)","Label_SetPassword_MismatchValidationError":"Las contraseñas no coinciden","Button_SetPassword_Save":"Ahorrar","Email_SiteName_Text":"Aurora","Email_From_Text":"Hola@tritonite.io","Email_ResetPassword_Subject":"Restablecer su contraseña","Label_List_Month":"Últimos 30 días","Label_List_Old":"Más de 30 días","Label_List_Today":"Hoy","Label_List_Week":"Los últimos 7 días","Label_List_Yesterday":"Ayer","Label_Chat_Placeholder_Send":"Mensaje","Label_Chat_Placeholder_Send_Label":"Nuevo mensaje","Label_Ordercard_Meta":"Meta valores","Label_Ordercard_Persondata":"Datos de la persona","Label_Ordercard_Persondata_url":"Imagen en la persona","Label_Ordercard_Postaddress":"Dirección postal","Label_Ordercard_Roles":"Roles","Label_Ordercard_Relation":"Relación","Label_Ordercard_Notes":"Notas","Label_Ordercard_Audit":"Auditoría","Entity_Label_Field_order_process_method":"Método de proceso","Entity_Label_Field_order_type_name":"Tipo de orden","Entity_Label_state_name":"Estado de pedido","Entity_Label_state_description":"Estado de pedido","Entity_Label_Orderid":"Solicitar ID","Entity_Label_Title":"Titelo","Entity_Label_Nid":"IDENTIFICACIÓN","Entity_Label_Created":"Creado","Entity_Label_Changed":"Cambió","Entity_Label_Field_pep":"Es un pep","Entity_Label_Field_current_ssn":"Ssn","Entity_Label_Field_ssntype":"Tipo SSN","Entity_Label_Field_Birth date":"Fecha de nacimiento","Entity_Label_Field_postaladdress":"Dirección postal","Entity_Label_Field_postaladdress2":"Dirección postal 2","Entity_Label_Field_housenumber":"Número de casa","Entity_Label_Field_postalcity":"Ciudad postal","Entity_Label_Field_zipcode":"Código postal","Entity_Label_Field_firstname":"Nombre de pila","Entity_Label_Field_lastname":"Apellido","Entity_Label_Field_name_type":"Tipo de nombre","Entity_Label_Field_postalcountry":"País postal","Entity_Label_Field_personid":"ID de persona (clásico)","Entity_Label_Field_person":"Referencia de persona (NID)","Entity_Label_Field_person_relation":"Relación de persona","Entity_Label_Field_relation_description":"Descripción","Entity_Label_Field_period_value":"Fecha de inicio","Entity_Label_Field_period_value2":"A través de la fecha","Entity_Label_Field_country_of_jurisdiction":"País de jurisdicción","Entity_Label_Field_is_active":"Es persona activa","Entity_Label_Field_role_description":"Descripción del rol","Entity_Label_Field_organisation":"Organización","Entity_Label_Field_organisation_number":"Número de organización","Entity_Label_Field_notes":"Nota","Entity_Label_Field_detailed_role_categories":"Categoría detallada","Entity_Label_Field_gender":"Género","Entity_Label_Field_whom":"A quien","Entity_Label_Field_what":"Qué","Entity_Label_Field_when":"Cuando","Entity_Label_Field_url":"Url","Nav_DropDownItem_Articles":"Artículos","Nav_DropDownItem_Snippets":"Fragmentos","Nav_DropDownItem_Labels":"Etiquetas","Nav_DropDownItem_Configuration":"Configuración","Label_podview_articles_master_title":"Artículos","Label_podview_articles_master_id":"Identificación","Label_podview_articles_master_typeOfArticle":"Tipo de artículo","Label_podview_articles_master_title1":"Titelo","Label_podview_articles_master_ingress":"Ingreso","Label_podview_articles_master_language":"Idioma","Label_podview_articles_master_revision":"Revisión","Label_podview_articles_master_status":"Estado del documento","Label_podview_articles_master_updatedAt":"Actualizado en","Label_podview_articles_master_version":"Versión","Label_podview_articles_master_publish_status":"Publicar el estado","Nav_DropDownItem_Tags":"Etiquetas","Nav_DropDownItem_NewDocument":"Nuevo documento","Label_podview_articles_master_status6":"Estado","Label_podview_articles_master_status7":"Estado","Label_podview_articles_master_status8":"Estado","Label_podview_articles_master_status9":"Estado","Label_podview_articles_master_status10":"Estado","Label_podview_articles_master_status11":"Estado","Label_podview_articles_master_status12":"Estado","Label_podview_articles_master_status13":"Estado","Label_podview_articles_master_status14":"Estado","Label_podview_articles_master_status15":"Estado","Label_podview_articles_master_status16":"Estado","Label_podview_articles_master_status17":"Estado","Label_podview_articles_master_status18":"Estado","Label_podview_articles_master_status19":"Estado","Nav_DropDownItem_Persons":"Persona de búsqueda","Label_Button_Edit":"Editar","Label_Button_Create":"Crear","Label_Button_Save":"Ahorrar","Label_Button_Delete":"Borrar","Label_Button_Update":"Actualizar","Label_Button_Cancel":"Cancelar","Label_Autoupdate":"Actualización en vivo","Label_Button_Add":"Agregar","Label_Button_Remove":"Eliminar","Label_Ordercard_Personnames":"Nombres","Label_Ordercard_Personssn":"Ssn","Entity_Label_Field_description":"Sobre este orden","Label_Button_UpdateOrderState":"Actualizar el estado del pedido","Label_Button_CancelOrder":"Cancelar orden","Entity_Label_Field_deactivationdate":"Fecha de desactivación","Entity_Label_Field_is_deceased":"Fallecido","Entity_Label_Field_deceased_date":"Fecha fallecida","Entity_Label_Field_name_type_remove_item":"Eliminar el elemento de nombre?","Entity_Label_Field_remove_item_text":"¿Realmente quieres eliminar este artículo?","Label_Ordercard_PersonSSN":"Números de persona SSN","Entity_Label_Field_ssn_remove_item":"Eliminar el artículo SSN?","Entity_Label_Field_pepcountry":"Pep Country","Entity_Label_FieldCountryOfJurisdiction_Denmark":"Dinamarca","Entity_Label_FieldCountryOfJurisdiction_Sweden":"Suecia","Entity_Label_FieldCountryOfJurisdiction_Norway":"Noruega","Entity_Label_FieldCountryOfJurisdiction_Finland":"Finlandia","Entity_Label_Field_is_active_role":"Es un papel activo","Label_Button_NewRole":"Agregar un nuevo rol","Label_Button_RemoveRole":"Borrar","Entity_Label_Item_id":"Identificación","Entity_Label_Field_Role_remove_item":"Eliminar el papel del orden?","Label_Button_NewRelation":"Agregar nueva releato","Entity_Label_Field_Relation_remove_item":"Eliminar la relación del orden?","Label_Button_RemoveRelation":"Eliminar la relación","Label_Ordercard_Relations":"Relación","Entity_Label_Field_relation":"Tipo de relación","Entity_Label_Field_Category":"Categoría de roles","Entity_Label_Role_description_type":"Tipo de descripción de rol","Entity_Label_Search":"Buscar","Label_Orders_Search":"Persona de búsqueda u orden","Table_OrderList_Column_Name":"Solicitar ID","Table_OrderList_Column_Status":"Estado","Table_OrderList_Column_OrderType":"Tipo","Table_OrderList_Column_ModifiedBy":"Cambió","Entity_Label_Person_Card":"Datos de la persona","Entity_Label_Personid":"Persona ID Classic","Label_OpenOrderListItem_Languages":"Seleccione el idioma","Label_Button_ChangeData":"Cambiar datos","Label_Ordercard_PersonOrders":"Pedido de persona","Label_Button_Create_Order":"Crear orden","Label_Person_Save_Order":"Por favor ingrese un comentario para el pedido y presione Guardar","TIMEAGO_INIT_STRING":"Para","Entity_Create_Order":"Crear orden","Table_searchpersonList_Column_ID":"IDENTIFICACIÓN","Table_searchpersonList_Column_FirstName":"Nombre de pila","Table_searchpersonList_Column_LastName":"Apellido","Table_searchpersonList_Column_PEPRCA":"PEP / RCA","Table_searchpersonList_Column_Country":"País","Table_searchpersonList_Column_Role":"Papel detallado","Table_searchpersonList_Column_Relation":"Relación","Table_searchpersonList_Column_Organisation":"Organización","RelationshipWithPersonIs":"A","Label_searchpersons_Search":"Ingrese el valor y presione Entrar","Label_PersonView":"Vista de persona","Label_RoleView":"Vista de roles","RelationshipWithPersonIsDaughterInLaw":"Nuera a","RelationshipWithPersonIsSonInLaw":"Yerno a","RelationshipWithPersonIsDoughter":"Pasado para","RelationshipWithPersonIsSon":"Hijo a","RelationshipWithPersonIsMotherInLaw":"Suegra","RelationshipWithPersonIsFatherInLaw":"Suegro","RelationshipWithPersonIsMother":"Madre a","RelationshipWithPersonIsFather":"Padre a","RelationshipWithPersonIsPartner":"Asociarse con","RelationshipWithPersonIsCoworker":"Compañero de trabajo con","Table_SearchResultForString":"Resultado para SearchString","Table_SearchResultTimeLaps":"Buscado en","Table_searchpersonList_Column_RoleDescription":"Descripción del rol","Table_searchpersonList_Column_MainRole":"Rol principal","Label_LoginForm_LdapError":"Su ID de usuario o contraseña no es correcto. Inténtalo de nuevo","Table_searchpersonList_Column_SSN":"Nacido","Label_ShowAllRoles":"Mostrar todos los roles","Entity_Label_Version_Card":"Versiones","Table_searchpersonList_Column_Birth date":"Fecha de nacimiento","Label_DistinctRoles":"Presenación de papel distintivo","Form_Current_RoleSearch":"Clave de búsqueda de roles (taxonomía)","Form_NumberOfActivePersons":"Número de personas activas","Form_NumberOfNoneActivePersons":"Número de personas inactivas","Form_NumberOfPersons":"Número de personas","Form_NumberOfActiveRoles":"Número de roles activos","Label_ResetSearch":"Nueva búsqueda","Entity_Label_Field_SSN":"Número de seguro social","Entity_Label_field_names":"Nombres","Label_Button_Create_NewPersonOrder":"Crea una nueva persona","Entity_Label_Field_personname":"Persona","Entity_Label_field_type_label":"Etiqueta de tipo de persona","Entity_Label_field_personid":"Personido (clásico)","Entity_Label_GoTo_Person":"Persona de goto","Entity_Label_Field_is_active_relation":"Relación activa","Form_NumberOfTotalRoles":"Filas en la mesa","Form_NumberOfNoneActive":"Ninguna fila activa","Label_variant_yy":"Y","Label_variant_mm":"METRO","Label_variant_dd":"D","Label_date_error":"Comprobar Fecha","Label_Invalid_date":"Fecha invalida","Label_variant_hh":"S.S","Label_variant_min":"Mm","Label_Person_QueryNewOrder":"Confirme para crear un nuevo pedido","Label_Button_CreateNewOrder":"Crear nuevo pedido de persona","Label_Snackbar_DataSaved":"Los datos se guardan","Label_Snackbar_Error":"¡Se produjo un sistema de sistema!","Nav_DropDownItem_NewOrder":"Nuevo orden","Entity_Label_Field_countryofjurisdiction":"País de jurisdicción","Entity_Label_Motherboard":"Tarjeta madre","Label_Livestream":"Transmisión en vivo","Label_Order_Entity":"Orden de transmisión en vivo","Label_Person_Entity":"Persona en vivo","Label_Livestream_Last":"Últimos eventos","Label_PerformedBy":"Interpretado por","Label_All_Livestream":"Más reciente","Label_Ordercard_CurrentOrders":"Pedidos","Label_Ordercard_Subheader":"Órdenes actuales","Label_MothercheckPerformed":"Cheque de madre realizado","Label_Motherchecks":"Monitoreo de valores clave en la plataforma Aurora","Label_Motherchecks_sublabel":"Lista de patrón","Label_mothercheck_details":"Detalles de patria","Label_Mothercheck_info":"Información de patria","Label_Button_OK":"DE ACUERDO","Entity_Label_Field_current_ssn_error":"El número de organización es un error","Label_Search_Toolbar":"Personificado","Label_MessageCheck":"Mensajes","Label_MessageCheck_sublabel":"Lista de estado de validación","Label_messagePerformed":"Cheques realizados","Validate_mandatory_field":"Campo obligatorio","Validate_mandatory_field_objective":"Este campo debe completarse","Validate_mandatory_field_resolution":"Llenar el campo","Label_Snackbar_ValidationOrderError":"Error de validación en orden","Label_Snackbar_OrderProcessed":"El pedido ha sido procesado","Validate_Birth date_ok_title":"Campo de fecha de nacimiento OK","Validate_Birth date_error_title":"La fecha de nacimiento tiene un error","Validate_gender_ok_title":"Campo de género OK","Validate_gender_error_title":"El género tiene un error","Validate_name_error_title":"Al menos un nombre debe estar presente en orden","Validate_name_ok_title":"Check Name OK","Label_Person_RestoreThisOrder":"Restaurar el último conjunto de cambios","Label_Button_RestoreOrder":"Restaurar","Entity_Restore_Order":"Reestablecer el orden","Entity_Process_Order":"Orden de proceso","Label_message_details":"Descripción","Validate_pepcountry_ok_title":"Pep Country Check OK","Validate_pepcountry_error_title":"Al menos se debe seleccionar un país de PEP","Validate_SSN_ok_title":"Ssn ok","Validate_SSN_error_title":"SSN Falta","Label_Card_Role":"Role","Label_Card_Relation":"Relación","Label_Card_Core":"Centro","Label_Card_SSN":"Ssn","Label_Card_Address":"DIRECCIÓN","Label_Card_URI":"Uri","Label_Card_Name":"Nombre","Label_Card_Order":"Orden","Validate_nametype_primary_objective":"En orden måste ha ett primärt namn","Nav_DropDownItem_Orderdashboard":"Orden de orden","Entity_Label_SearchPerson":"Persona de búsqueda","Entity_Label_SearchPerson_Firstname":"Nombre de pila","Entity_Label_SearchPerson_Lastname":"Apellido","Entity_Label_SearchPerson_SSNNumber":"SSN sueco","Entity_Label_SearchPerson_Birth date":"Fecha de nacimiento","Entity_Label_SearchPerson_Year":"Año","Entity_Label_SearchPerson_Month":"Mes","Entity_Label_SearchPerson_Day":"Día","Entity_Label_NameValues":"Nombres","Entity_Label_SearchDates":"Fechas","Entity_Label_PEPRCA":"Definir PEP y/o RCA","Entity_Label_Button_Find":"Buscar","Entity_Label_SelectListCountries":"Seleccionar países de la lista","Entity_List_Link":"Persona","Entity_List_SSN":"Número de seguro social","Entity_List_FirstName":"Nombre de pila","Entity_List_LastName":"Apellido","Entity_List_Gender":"Género","Entity_List_PEP":"ENERGÍA","Entity_List_RCA":"RCA","Entity_List_Details":"Mostrar más","Entity_Label_Mandatory":"Campo obligatorio","Entity_Label_Button_Back":"Atrás","Entity_Label_Button_Close":"Cerca","Entity_List_Birth date":"Fecha de nacimiento","Entity_List_NameType":"Tipo de nombre","Entity_List_Role":"Role","Entity_List_RoleCategory":"Categoría de roles","Entity_List_RoleCategoryDetails":"Categoría detallada","Entity_List_FromDate":"Fecha de inicio","Entity_List_ThroughDate":"A través de la fecha","Entity_List_Active":"Estado de rol","Entity_List_Type":"Tipo de nombre","Entity_List_Name":"Nombre","Entity_List_Description":"Descripción","Entity_List_CountryOfJurisdiction":"País de jurisdicción","Label_Snackbar_NoData":"Ninguna persona coincide con la consulta","Entity_Label_FieldCountryListSimple_All":"Todos los países","Entity_List_SearchBySSN":"Match SSN","Entity_Details":"Detalles","Entity_Names":"Nombres","Entity_Roles":"Roles","Entity_Relations":"Relaciones","Entity_Label_AddCompanyUser":"Agregar usuario","Entity_Label_AddUser_Email2":"Volver a introducir correo electrónico","Entity_Label_AddUser_Email":"Correo electrónico","Entity_Label_AddUser_Name":"Nombre","Entity_UsersList_InactiveMembersTitle":"Miembros inactivos","Entity_UsersList_MembersTitle":"Miembros","Entity_UsersList_AdminsTitle":"Administradores","Entity_UsersList_Deactivate":"Desactivar","Entity_UsersList_Activate":"Activar","Entity_UsersList_Name":"Nombre","Entity_UsersList_Email":"Correo electrónico","Entity_UsersList_Dialog_Activate":"Activar el usuario?","Entity_UsersList_Dialog_Deactivate":"Desactivar el usuario?","Entity_UsersList_Dialog_Cancel":"Cancelar","Entity_UsersList_Dialog_Confirm":"Confirmar","Entity_Validation_MandatoryField":"Complete un campo obligatorio","Entity_Validation_MatchErrorField":"Los valores no coinciden para {$ campo}","Entity_UsersList_Active":"Estado","Entity_UserList_Pic":"Perfil","Nav_DropDownItem_AdminCompanyPersons":"Administrar cuentas comerciales","Entity_List_Avatar":"#","Nav_DropDownItem_Finnish":"Finlandés","Nav_DropDownItem_Danish":"Danés","Nav_DropDownItem_Norweigan":"Norweigan","Label_ordersbystate_sublabel":"Órdenes por estado","Entity_Delete_Relation":"Eliminar esta relación","Entity_Delete_Role":"Eliminar este papel","Label_Person_Delete_Orde":"Confirme para eliminar el artículo","Label_Button_ConfirmDelete":"Eliminar pedido","Nav_DropDownItem_Icleandic":"Islandia","Entity_Label_Field_ContactUs_Title":"Contáctenos","Entity_Label_Field_ContactUs_Name":"Nombre","Entity_Label_Field_ContactUs_Email":"Dirección de correo electrónico","Entity_Label_Field_ContactUs_Email2":"Repita la dirección de correo electrónico","Entity_Label_Field_ContactUs_Phone":"Teléfono","Entity_Label_Field_ContactUs_Content":"Mensaje","Entity_Label_Button_ContactUs_Submit":"Enviar","Entity_Label_Button_ContactUs_Cancel":"Cancelar","Entity_Label_Field_ContactUs_Waltercheck":"Responder a la pregunta","Entity_Validation_MandatoryField_Name":"Nombre","Entity_Validation_MandatoryField_Email":"Correo electrónico","Entity_Validation_MandatoryField_Message":"Mensaje","Nav_DropDownItem_About":"Sobre aurora","Entity_FileareaList_AdminsTitle":"Área de archivo","Entity_FileareaList_Download":"Descargar","Entity_FileareaList_Name":"Nombre del archivo","Nav_DropDownItem_Filearea":"Área de archivo","Entity_Label_Field_ContactUs_Success":"Tu mensaje ha sido enviado. Gracias.","Entity_Label_Field_ContactUs_Fail":"Problema enviar el mensaje. Por favor, inténtelo de nuevo más tarde.","Entity_Label_Download_Success":"Se inició la transferencia de archivos","Label_LoginForm_GoHome":"Volver a la página principal","Nav_DropDownItem_Login":"Acceso","Label_Content_Help":"Ayuda con la búsqueda?","Entity_Details_Address":"DIRECCIÓN","Entity_List_Address":"Direccion postal","Entity_List_Address2":"Dirección postal 2","Entity_List_HouseNumber":"Número de casa","Entity_List_PostalCity":"Ciudad","Entity_List_ZipCode":"Código postal","Entity_List_PostalCountry":"País","Label_Person_Delete_Order":"Eliminar pedido","Entity_List_RelationType":"Tipo de relación","Entity_List_RelationDescription":"Descripción de la relación","Entity_List_BirthDate":"Fecha de nacimiento","Label_EntityIsUpdated":"Último cambio","Entity_AuroraID":"Aurora ID","Label_RoleIsActive":"Activo","Label_RoleIsInActive":"Inactivo","Label_Button_Clear":"Claro","Label_Button_Filter":"Filtrar","Label_Button_Search":"Buscar","Label_NoSearchPerfomed":"Sin resultado de la búsqueda. La búsqueda se realizó","Entity_List_OpenRelation":"Ir a la persona relacionada","Label_Welcome":"Bienvenido","Label_Country_Sweden":"Suecia","Label_Country_Denmark":"Dinamarca","Label_Country_Finland":"Finlandia","Label_Country_Norway":"Noruega","Nav_DropDownItem_Settings":"Ajustes","Nav_DropDownItem_ChangePassword":"Cambiar la contraseña","Nav_DropDownItem_Darkmode":"Cambiar de tema","Nav_DropDownItem_Contact":"Contáctenos","Label_SearchAppName":"Aurora Pod","Label_Tooltip_ThemeDark":"Usar tema oscuro","Label_Tooltip_ThemeLight":"Use el tema de la luz","Label_Tooltip_Settings":"Ajustes","Label_Tooltip_Contact":"Contáctenos","Label_Tooltip_Filearea":"Filearea","Label_Tooltip_HandleUsers":"Administrar cuentas comerciales","Entity_Label_SetPassWord":"Guardar una nueva contraseña","Label_RegisterForm_Password":"Contraseña","Tooltip_RegisterForm_Password":"Al menos 8 carácteres","Label_RegisterForm_PasswordConfirm":"Confirmar Contraseña","Tooltip_RegisterForm_PasswordConfirm":"Escriba nuevamente para confirmar la contraseña","Label_PasswordChanged":"Contraseña cambiada","Label_Password_Guidelines":"La cadena debe contener al menos 1 carácter alfabético en minúsculas, al menos 1 carácter alfabético en mayúsculas, al menos 1 carácter numérico y al menos un personaje especial. La cadena debe ser de ocho caracteres o más","Button_Password_Save":"Guardar una nueva contraseña","Error_RegisterForm_Password":"Error de formato de contraseña","Error_RegisterForm_PasswordMatch":"Las contraseñas no coinciden","Label_LoginForm_Account":"Nombre de la cuenta","Label_LoginForm_AccountPlaceholder":"Ingrese el nombre de su cuenta","Denmark":"Dinamarca","Sweden":"Suecia","Finlan":"Finlan","Norway":"Noruega","Entity_Label_Error_canPerformSSNSearchFalse":"Necesitas combinar la búsqueda SSN con el primer y apellido","Confirm_you_want_to_remove_user_from_Company":"Confirme que desea eliminar al usuario de la empresa.","ButtonRemoveUser":"Eliminar usuario","ButtonCancel":"Cancelar","Titel_Delete_User":"Eliminar usuario","User_already_exists_Contact_support":"El usuario ya existe. Póngase en contacto con el soporte si necesita ayuda para relacionar a este usuario con esta empresa.","SSN_format_error":"Ingrese el número de Seguro Social en el formato YYYYMMDD-XXXX","Label_Content_Cookie":"Acerca de las galletas","time_indicator":"En el momento","January":"Enero","February":"Febrero","March":"Marzo","April":"Abril","May":"Puede","June":"Junio","July":"Julio","August":"Agosto","September":"Septiembre","October":"Octubre","November":"Noviembre","December":"Diciembre","Nav_DropDownItem_Livestream":"Intercom","Label_MyChatChannels":"Canales","Label_MyChatChannelsMostRecent":"Más reciente","Link_Login_Registe":"Unirse","Label_Onboarding_Password":"Introducir la contraseña","Label_Onboarding_PasswordAgain":"Ingrese de nuevo la contraseña","Nav_DropDownItem_MCC":"Panel","Entity_Label_Filter":"Filtrar","Nav_DropDownItem_MCCDashBoard":"Dashboard","Nav_DropDownItem_PODView":"POD view","Label_AppName":"Aurora","Nav_DropDownItem_Profilesettings":"Configuración de perfil","Nav_DropDownItem_Databrowser":"Navegador de datos","Nav_DropDownItem_Suspence":"Suspence","Nav_DropDownItem_OrderHistory":"Historial de pedidos","Nav_DropDownItem_Alarmlist":"Lista de alarmas","Label_LoginForm_UsernamePlaceholder":"Nombre de usuario","Label_LoginForm_Username":"Nombre de usuario","Nav_DropDownItem_MCCPOD":"POD","Nav_DropDownItem_MCCGateways":"Gateways","Nav_DropDownItem_MCCSensors":"Sensores","Nav_DropDownItem_MCCEnergy":"Energía","Nav_DropDownItem_MCCPower":"Fuerza","Nav_DropDownItem_MCCVolume":"Volumen","Table_Column_entity_class":"Entidad","Table_Column_point_class":"Punto","Table_Column_brickSensorClass":"Brick sensor class","Table_Column_gatewayClassId":"Gateway class","Table_Column_time_read_string":"Leer la marca de tiempo","Table_Column_gatewayId":"Gateway ID","Table_Column_lastKnownValue":"Último valor conocido","Table_Column_write_time_string":"Se guardaron los datos","Table_Column_point_id":"Punto","Table_Column_brickSensorClassQuantity":"Brick sensor Quantity","Table_Column_timestamp_read":"Leer la marca de tiempo","Table_Column_transformedElement":"Parámetro del objeto del dispositivo","Table_Column_processStatus":"Estado de proceso","Table_Column_command":"Dominio","Nav_DropDownItem_Agents":"Agents","Nav_DropDownItem_Events":"Datos","Nav_DropDownItem_Ontology":"Ontología","Table_Column_Ontotology_Name":"Nombre","Table_Column_Ontotology_Description":"Descripción","Table_Column_Ontotology_Foldername":"Nombre de la carpeta","Table_Column_Ontotology_Ontology":"Ontología","Table_Column_Ontotology_Superclass":"Superclase","Table_Column_Ontotology_Type":"Tipo","Table_Column_Ontotology_Updated":"Actualizado","Table_Column_Ontotology_UpdatedAsDateString":"Actualizado como cadena","Table_Column_topic":"Topic","Nav_DropDownItem_Edit":"Editar","Nav_DropDownItem_SensorMapping":"Mapeo de sensores","Nav_DropDownItem_EditModel":"Data tree","Nav_DropDownItem_ExportCenter":"Export center","Nav_DropDownItem_Meters":"Medidores","Button_RegisterForm_Register":"Registre una nueva cuenta","Label_iHaveAnAccount_Login":"Ya tengo una cuenta","Label_RegisterForm_Register":"Registre una nueva cuenta","Label_RegisterForm_RegisterInfo":"Registre una nueva cuenta para usar el servicio","Label_RegisterForm_Name":"Nombra tu cuenta","Tooltip_RegisterForm_Name":"El nombre de su cuenta","Label_RegisterForm_Voucher":"Vale","Tooltip_RegisterForm_Voucher":"Ingrese el comprobante que recibió para registrar la cuenta","Label_RegisterForm_Email":"Correo electrónico","Tooltip_RegisterForm_Email":"Ingrese el correo electrónico para su cuenta","Error_RegisterForm_Name":"Necesitas darle un nombre a tu cuenta","Error_RegisterForm_Voucher":"Ingrese el comprobante para crear la cuenta","Error_RegisterForm_Email":"Ingrese un correo electrónico para la cuenta"});Package['universe:i18n'].i18n._ts = Math.max(Package['universe:i18n'].i18n._ts, 1708695287707);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"fi.i18n.yml.js":function module(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// i18n/core/fi.i18n.yml.js                                                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Package['universe:i18n'].i18n.addTranslations('fi','',{"language":"fi","LINE02":"LINE02","Header_Login_Login":"Kirjaudu sisään","Nav_DropDownItem_English":"Englanti","Nav_DropDownItem_Swedish":"Ruotsin kieli","Nav_DropDownItem_Help":"Auta","Nav_DropDownItem_Chat":"Keskustella","Nav_DropDownItem_Logout":"Kirjautua ulos","Nav_DropDownItem_Profile":"Profiili","Nav_DropDownItem_Orders":"Määräys","Header_Login_EnterHint":"Kirjoita käyttäjänimi ja salasana","Link_Login_ForgotPassword":"Unohtuiko salasana?","Link_Login_CreateAccount":"Luo tili","Label_LoginForm_Email":"Sähköposti","Label_LoginForm_EmailPlaceholder":"Sähköposti","Label_LoginForm_EmailValidationError":"Syötä voimassa oleva sähköpostiosoite.","Label_LoginForm_Password":"Salasana","Label_LoginForm_PasswordPlaceholder":"Syötä salasanasi","Label_LoginForm_PasswordValidationError":"Tämä salasana on liian lyhyt","Button_LoginForm_Login":"Kirjaudu sisään","Header_ForgotPassword_Password":"Unohtuiko salasana","Header_ForgotPassword_EnterHint":"Syötä sähköpostiosoitteesi ja uusi salasana lähetetään sinulle.","Header_ForgotPassword_Remember":"Muistatko salasanasi?","Link_ForgotPassword_Login":"Kirjaudu sisään","Label_ForgotPassword_Email":"Sähköpostiosoite","Label_ForgotPassword_EmailPlaceholder":"Tässä kirjoitat sähköpostiosoitteesi.","Label_ForgotPassword_EmailValidationError":"Ole hyvä ja syötä toimiva sähköpostiosoite.","Button_ForgotPassword_Login":"Lähetä uusi salasana","Button_ForgotPassword_Save":"Lähetä uusi salasana","Header_SetPassword_Password":"Syötä uusi salasana","Header_SetPassword_EnterHint":"Kirjoita salasanasi kahdesti","Link_SetPassword_Cancel":"Peruuttaa","Label_SetPassword_Label":"Salasana","Label_SetPassword_ConfirmLabel":"Vahvista salasana","Label_SetPassword_MinLengthValidationError":"Salasana on liian lyhyt (vähintään {$minlength} -merkit)","Label_SetPassword_MismatchValidationError":"Salasana ei täsmää","Button_SetPassword_Save":"Tallentaa","Email_SiteName_Text":"Aurora","Email_From_Text":"Hello@tritonite.io","Email_ResetPassword_Subject":"Nollaa salasana","Label_List_Month":"Viimeiset 30 päivää","Label_List_Old":"Yli 30 päivää","Label_List_Today":"Tänään","Label_List_Week":"Viimeiset 7 päivää","Label_List_Yesterday":"Eilen","Label_Chat_Placeholder_Send":"Viesti","Label_Chat_Placeholder_Send_Label":"Uusi viesti","Label_Ordercard_Meta":"Meta -arvot","Label_Ordercard_Persondata":"Henkilötiedot","Label_Ordercard_Persondata_url":"Kuva","Label_Ordercard_Postaddress":"Postiosoite","Label_Ordercard_Roles":"Roolit","Label_Ordercard_Relation":"Suhde","Label_Ordercard_Notes":"Muistiinpanot","Label_Ordercard_Audit":"Tarkastaa","Entity_Label_Field_order_process_method":"Prosessimenetelmä","Entity_Label_Field_order_type_name":"Tilaustapa","Entity_Label_state_name":"Tilauksen tila","Entity_Label_state_description":"Tilauksen tila","Entity_Label_Orderid":"Tilausnumero","Entity_Label_Title":"Titteli","Entity_Label_Nid":"Henkilöllisyystodistus","Entity_Label_Created":"Luotu","Entity_Label_Changed":"Muuttunut","Entity_Label_Field_pep":"On pep","Entity_Label_Field_current_ssn":"SSN","Entity_Label_Field_ssntype":"SSN -tyyppi","Entity_Label_Field_Birth date":"Syntymäpäivä","Entity_Label_Field_postaladdress":"Postiosoite","Entity_Label_Field_postaladdress2":"Postitoiminta 2","Entity_Label_Field_housenumber":"Talonumero","Entity_Label_Field_postalcity":"Postikaupunki","Entity_Label_Field_zipcode":"Postinumero","Entity_Label_Field_firstname":"Etunimi","Entity_Label_Field_lastname":"Sukunimi","Entity_Label_Field_name_type":"Nimityyppi","Entity_Label_Field_postalcountry":"Postimaa","Entity_Label_Field_personid":"Henkilötunnus (klassinen)","Entity_Label_Field_person":"Henkilöviite (NID)","Entity_Label_Field_person_relation":"Henkilösuhde","Entity_Label_Field_relation_description":"Kuvaus","Entity_Label_Field_period_value":"Aloituspäivämäärä","Entity_Label_Field_period_value2":"Päivämäärän kautta","Entity_Label_Field_country_of_jurisdiction":"Lainkäyttöalue","Entity_Label_Field_is_active":"On aktiivinen henkilö","Entity_Label_Field_role_description":"Roolikuvaus","Entity_Label_Field_organisation":"Organisaatio","Entity_Label_Field_organisation_number":"Organisaation numero","Entity_Label_Field_notes":"Huomautus","Entity_Label_Field_detailed_role_categories":"Yksityiskohtainen luokka","Entity_Label_Field_gender":"Sukupuoli","Entity_Label_Field_whom":"Kenen","Entity_Label_Field_what":"Mitä","Entity_Label_Field_when":"Kun","Entity_Label_Field_url":"URL -osoite","Nav_DropDownItem_Articles":"Artikkelit","Nav_DropDownItem_Snippets":"Katkelma","Nav_DropDownItem_Labels":"Merkinnät","Nav_DropDownItem_Configuration":"Kokoonpano","Label_podview_articles_master_title":"Artikkelit","Label_podview_articles_master_id":"Henkilöllisyystodistus","Label_podview_articles_master_typeOfArticle":"Artikkelin tyyppi","Label_podview_articles_master_title1":"Titteli","Label_podview_articles_master_ingress":"Pääsy","Label_podview_articles_master_language":"Kieli","Label_podview_articles_master_revision":"Tarkistaminen","Label_podview_articles_master_status":"Asiakirjan tila","Label_podview_articles_master_updatedAt":"Päivittää jtk","Label_podview_articles_master_version":"Versio","Label_podview_articles_master_publish_status":"Julkaista tila","Nav_DropDownItem_Tags":"Tunnisteet","Nav_DropDownItem_NewDocument":"Uusi asiakirja","Label_podview_articles_master_status6":"Tila","Label_podview_articles_master_status7":"Tila","Label_podview_articles_master_status8":"Tila","Label_podview_articles_master_status9":"Tila","Label_podview_articles_master_status10":"Tila","Label_podview_articles_master_status11":"Tila","Label_podview_articles_master_status12":"Tila","Label_podview_articles_master_status13":"Tila","Label_podview_articles_master_status14":"Tila","Label_podview_articles_master_status15":"Tila","Label_podview_articles_master_status16":"Tila","Label_podview_articles_master_status17":"Tila","Label_podview_articles_master_status18":"Tila","Label_podview_articles_master_status19":"Tila","Nav_DropDownItem_Persons":"Hakuhenkilö","Label_Button_Edit":"Muokata","Label_Button_Create":"Luoda","Label_Button_Save":"Tallentaa","Label_Button_Delete":"Poistaa","Label_Button_Update":"Päivittää","Label_Button_Cancel":"Peruuttaa","Label_Autoupdate":"Live päivitys","Label_Button_Add":"Lisätä","Label_Button_Remove":"Poista","Label_Ordercard_Personnames":"Nimeä","Label_Ordercard_Personssn":"SSN","Entity_Label_Field_description":"Tästä järjestyksestä","Label_Button_UpdateOrderState":"Päivitä tilaustila","Label_Button_CancelOrder":"Peruuta tilaus","Entity_Label_Field_deactivationdate":"Deaktivointipäivä","Entity_Label_Field_is_deceased":"Kuollut","Entity_Label_Field_deceased_date":"Kuollut päivämäärä","Entity_Label_Field_name_type_remove_item":"Poista nimikohde?","Entity_Label_Field_remove_item_text":"Haluatko todella poistaa tämän kohteen?","Label_Ordercard_PersonSSN":"Henkilö SSN -numerot","Entity_Label_Field_ssn_remove_item":"Poista SSN -kohde?","Entity_Label_Field_pepcountry":"Pep -maa","Entity_Label_FieldCountryOfJurisdiction_Denmark":"Tanska","Entity_Label_FieldCountryOfJurisdiction_Sweden":"Ruotsi","Entity_Label_FieldCountryOfJurisdiction_Norway":"Norja","Entity_Label_FieldCountryOfJurisdiction_Finland":"Suomi","Entity_Label_Field_is_active_role":"On aktiivinen rooli","Label_Button_NewRole":"Lisää uusi rooli","Label_Button_RemoveRole":"Poistaa","Entity_Label_Item_id":"Henkilöllisyystodistus","Entity_Label_Field_Role_remove_item":"Poista rooli tilauksesta?","Label_Button_NewRelation":"Lisää uusi tulos","Entity_Label_Field_Relation_remove_item":"Poista suhde tilauksesta?","Label_Button_RemoveRelation":"Poista suhde","Label_Ordercard_Relations":"Suhteet","Entity_Label_Field_relation":"Suhdetyyppi","Entity_Label_Field_Category":"Rooliryhmä","Entity_Label_Role_description_type":"Roolikuvaus tyyppi","Entity_Label_Search":"Hae","Label_Orders_Search":"Hakuhenkilö tai tilaus","Table_OrderList_Column_Name":"Tilausnumero","Table_OrderList_Column_Status":"Tila","Table_OrderList_Column_OrderType":"Tyyppi","Table_OrderList_Column_ModifiedBy":"Muuttunut","Entity_Label_Person_Card":"Henkilötiedot","Entity_Label_Personid":"Henkilötunnusklassikko","Label_OpenOrderListItem_Languages":"Valitse kieli","Label_Button_ChangeData":"Muuttaa tietoja","Label_Ordercard_PersonOrders":"Henkilö","Label_Button_Create_Order":"Luo järjestys","Label_Person_Save_Order":"Kirjoita kommentti tilauksesta ja paina Tallenna","TIMEAGO_INIT_STRING":"Puolesta","Entity_Create_Order":"Luo järjestys","Table_searchpersonList_Column_ID":"Henkilöllisyystodistus","Table_searchpersonList_Column_FirstName":"Etunimi","Table_searchpersonList_Column_LastName":"Sukunimi","Table_searchpersonList_Column_PEPRCA":"PEP / RCA","Table_searchpersonList_Column_Country":"Maa","Table_searchpersonList_Column_Role":"Yksityiskohtainen rooli","Table_searchpersonList_Column_Relation":"Suhde","Table_searchpersonList_Column_Organisation":"Organisaatio","RelationshipWithPersonIs":"-lla","Label_searchpersons_Search":"Kirjoita arvo ja paina Enter","Label_PersonView":"Henkilönäkymä","Label_RoleView":"Näkymä","RelationshipWithPersonIsDaughterInLaw":"Tytär","RelationshipWithPersonIsSonInLaw":"Poika","RelationshipWithPersonIsDoughter":"Tyrmätä jhk","RelationshipWithPersonIsSon":"Poika","RelationshipWithPersonIsMotherInLaw":"Äiti","RelationshipWithPersonIsFatherInLaw":"Isäntä jhk","RelationshipWithPersonIsMother":"Äiti","RelationshipWithPersonIsFather":"Olla jnk peräin","RelationshipWithPersonIsPartner":"Kumppania jkn kanssa","RelationshipWithPersonIsCoworker":"Työtoveri","Table_SearchResultForString":"Tulos hakujohdoille","Table_SearchResultTimeLaps":"Etsiä jtk","Table_searchpersonList_Column_RoleDescription":"Roolikuvaus","Table_searchpersonList_Column_MainRole":"Päärooli","Label_LoginForm_LdapError":"Käyttäjätunnuksesi tai salasanasi ei ole oikea. Yritä uudelleen","Table_searchpersonList_Column_SSN":"Syntynyt","Label_ShowAllRoles":"Näytä kaikki roolit","Entity_Label_Version_Card":"Versiot","Table_searchpersonList_Column_Birth date":"Syntymäpäivä","Label_DistinctRoles":"Selkeä roolin esitys","Form_Current_RoleSearch":"Roolihaku avain (taksonomia)","Form_NumberOfActivePersons":"Aktiivisten henkilöiden lukumäärä","Form_NumberOfNoneActivePersons":"Passiivisten henkilöiden lukumäärä","Form_NumberOfPersons":"Henkilöiden lukumäärä","Form_NumberOfActiveRoles":"Aktiivisten roolien lukumäärä","Label_ResetSearch":"Uusi haku","Entity_Label_Field_SSN":"Sosiaaliturvatunnus","Entity_Label_field_names":"Nimeä","Label_Button_Create_NewPersonOrder":"Luo uusi henkilö","Entity_Label_Field_personname":"Henkilö","Entity_Label_field_type_label":"Henkilötyyppinen tarra","Entity_Label_field_personid":"Personid (klassinen)","Entity_Label_GoTo_Person":"Goto -henkilö","Entity_Label_Field_is_active_relation":"Aktiivinen suhde","Form_NumberOfTotalRoles":"Rivit pöydässä","Form_NumberOfNoneActive":"Ei mitään aktiivisia rivejä","Label_variant_yy":"Y","Label_variant_mm":"M","Label_variant_dd":"D -d","Label_date_error":"Tarkista päivämäärä","Label_Invalid_date":"Väärä päivämäärä","Label_variant_hh":"HH","Label_variant_min":"Mm","Label_Person_QueryNewOrder":"Vahvista luoda uusi tilaus","Label_Button_CreateNewOrder":"Luo uuden henkilön tilaus","Label_Snackbar_DataSaved":"Tiedot tallennetaan","Label_Snackbar_Error":"Järjestelmävirhe tapahtui!","Nav_DropDownItem_NewOrder":"Uusi järjestys","Entity_Label_Field_countryofjurisdiction":"Lainkäyttöalue","Entity_Label_Motherboard":"Emolevy","Label_Livestream":"Livestream","Label_Order_Entity":"LiveStream -järjestys","Label_Person_Entity":"Livestream -henkilö","Label_Livestream_Last":"Viimeiset tapahtumat","Label_PerformedBy":"Esittäjä","Label_All_Livestream":"Viimeisin","Label_Ordercard_CurrentOrders":"Määräys","Label_Ordercard_Subheader":"Nykyiset tilaukset","Label_MothercheckPerformed":"Äidin tarkistus suoritettu","Label_Motherchecks":"Avainarvojen seuranta Aurora -alustalla","Label_Motherchecks_sublabel":"Äitiluettelo","Label_mothercheck_details":"Äititaulun yksityiskohdat","Label_Mothercheck_info":"Äidinmahdollisuustiedot","Label_Button_OK":"Hyvä","Entity_Label_Field_current_ssn_error":"Organisaation numero on virhe","Label_Search_Toolbar":"Henkilöstö","Label_MessageCheck":"Viestit","Label_MessageCheck_sublabel":"Validointitilan luettelo","Label_messagePerformed":"Suoritetut tarkastukset","Validate_mandatory_field":"Pakollinen kenttä","Validate_mandatory_field_objective":"Tämä kenttä on täytettävä","Validate_mandatory_field_resolution":"Täyttää","Label_Snackbar_ValidationOrderError":"Validointivirhe järjestyksessä","Label_Snackbar_OrderProcessed":"Tilaus on käsitelty","Validate_Birth date_ok_title":"Syntymäpäiväkenttä OK","Validate_Birth date_error_title":"Syntymäpäivänä on virhe","Validate_gender_ok_title":"Sukupuolen kenttä ok","Validate_gender_error_title":"Sukupuolella on virhe","Validate_name_error_title":"Ainakin yhden nimen on oltava läsnä järjestyksessä","Validate_name_ok_title":"Nimi tarkista ok","Label_Person_RestoreThisOrder":"Palauta viimeinen muutosjoukko","Label_Button_RestoreOrder":"Palauttaa","Entity_Restore_Order":"Palauttaa tilaus","Entity_Process_Order":"Prosessitilaus","Label_message_details":"Kuvaus","Validate_pepcountry_ok_title":"Pep Country Check OK","Validate_pepcountry_error_title":"Ainakin yksi PEP -maa on valittava","Validate_SSN_ok_title":"SSN OK","Validate_SSN_error_title":"SSN puuttuu","Label_Card_Role":"Rooli","Label_Card_Relation":"Suhde","Label_Card_Core":"Ydin","Label_Card_SSN":"SSN","Label_Card_Address":"Osoite","Label_Card_URI":"Uri","Label_Card_Name":"Nimi","Label_Card_Order":"Tilaus","Validate_nametype_primary_objective":"Fi order måste ha eett primärt namn","Nav_DropDownItem_Orderdashboard":"Tilata kojelauta","Entity_Label_SearchPerson":"Hakuhenkilö","Entity_Label_SearchPerson_Firstname":"Etunimi","Entity_Label_SearchPerson_Lastname":"Sukunimi","Entity_Label_SearchPerson_SSNNumber":"Ruotsin SSN","Entity_Label_SearchPerson_Birth date":"Syntymäpäivä","Entity_Label_SearchPerson_Year":"Vuosi","Entity_Label_SearchPerson_Month":"Kuukausi","Entity_Label_SearchPerson_Day":"Päivä","Entity_Label_NameValues":"Nimeä","Entity_Label_SearchDates":"Päivämäärät","Entity_Label_PEPRCA":"Määritä PEP ja/tai RCA","Entity_Label_Button_Find":"Hae","Entity_Label_SelectListCountries":"Valitse Lista -maat","Entity_List_Link":"Henkilö","Entity_List_SSN":"Sosiaaliturvatunnus","Entity_List_FirstName":"Etunimi","Entity_List_LastName":"Sukunimi","Entity_List_Gender":"Sukupuoli","Entity_List_PEP":"Petrit","Entity_List_RCA":"RCA","Entity_List_Details":"Näytä lisää","Entity_Label_Mandatory":"Pakollinen kenttä","Entity_Label_Button_Back":"Takaisin","Entity_Label_Button_Close":"Kiinni","Entity_List_Birth date":"Syntymäpäivä","Entity_List_NameType":"Nimityyppi","Entity_List_Role":"Rooli","Entity_List_RoleCategory":"Rooliryhmä","Entity_List_RoleCategoryDetails":"Yksityiskohtainen luokka","Entity_List_FromDate":"Aloituspäivämäärä","Entity_List_ThroughDate":"Päivämäärän kautta","Entity_List_Active":"Rooli","Entity_List_Type":"Nimityyppi","Entity_List_Name":"Nimi","Entity_List_Description":"Kuvaus","Entity_List_CountryOfJurisdiction":"Lainkäyttöalue","Label_Snackbar_NoData":"Kukaan henkilö ei vastaa kyselyä","Entity_Label_FieldCountryListSimple_All":"Kaikki maat","Entity_List_SearchBySSN":"SSN -ottelu","Entity_Details":"Yksityiskohdat","Entity_Names":"Nimeä","Entity_Roles":"Roolit","Entity_Relations":"Suhteet","Entity_Label_AddCompanyUser":"Lisää käyttäjä","Entity_Label_AddUser_Email2":"Syötä sähköpostiosoite uudestaan","Entity_Label_AddUser_Email":"Sähköposti","Entity_Label_AddUser_Name":"Nimi","Entity_UsersList_InactiveMembersTitle":"Passiiviset jäsenet","Entity_UsersList_MembersTitle":"Jäsenet","Entity_UsersList_AdminsTitle":"Järjestelmänvalvojat","Entity_UsersList_Deactivate":"Deaktivoida","Entity_UsersList_Activate":"Aktivoida","Entity_UsersList_Name":"Nimi","Entity_UsersList_Email":"Sähköposti","Entity_UsersList_Dialog_Activate":"Aktivoi käyttäjä?","Entity_UsersList_Dialog_Deactivate":"Deaktivointi käyttäjä?","Entity_UsersList_Dialog_Cancel":"Peruuttaa","Entity_UsersList_Dialog_Confirm":"Vahvistaa","Entity_Validation_MandatoryField":"Täytä pakollinen kenttä","Entity_Validation_MatchErrorField":"Arvot eivät vastaa {$-kenttää}","Entity_UsersList_Active":"Tila","Entity_UserList_Pic":"Profiili","Nav_DropDownItem_AdminCompanyPersons":"Hallitse yritystilejä","Entity_List_Avatar":"Hio","Nav_DropDownItem_Finnish":"Suomalainen","Nav_DropDownItem_Danish":"Tanskan kieli","Nav_DropDownItem_Norweigan":"Norweigan","Label_ordersbystate_sublabel":"Valtion tilaukset","Entity_Delete_Relation":"Poista tämä suhde","Entity_Delete_Role":"Poista tämä rooli","Label_Person_Delete_Orde":"Vahvista, että kohde poistaisi","Label_Button_ConfirmDelete":"Poistaa tilaus","Nav_DropDownItem_Icleandic":"Islanti","Entity_Label_Field_ContactUs_Title":"Ota meihin yhteyttä","Entity_Label_Field_ContactUs_Name":"Nimi","Entity_Label_Field_ContactUs_Email":"Sähköpostiosoite","Entity_Label_Field_ContactUs_Email2":"Toista sähköpostiosoite","Entity_Label_Field_ContactUs_Phone":"Puhelin","Entity_Label_Field_ContactUs_Content":"Viesti","Entity_Label_Button_ContactUs_Submit":"Lähettää","Entity_Label_Button_ContactUs_Cancel":"Peruuttaa","Entity_Label_Field_ContactUs_Waltercheck":"Vastaa kysymykseen","Entity_Validation_MandatoryField_Name":"Nimi","Entity_Validation_MandatoryField_Email":"Sähköposti","Entity_Validation_MandatoryField_Message":"Viesti","Nav_DropDownItem_About":"Tietoja Aurorasta","Entity_FileareaList_AdminsTitle":"Tiedostoalue","Entity_FileareaList_Download":"Ladata","Entity_FileareaList_Name":"Tiedoston nimi","Nav_DropDownItem_Filearea":"Tiedostoalue","Entity_Label_Field_ContactUs_Success":"Viestisi on lähetetty. Kiitos.","Entity_Label_Field_ContactUs_Fail":"Viestin lähettäminen. Yritä uudelleen myöhemmin.","Entity_Label_Download_Success":"Tiedostonsiirto alkoi","Label_LoginForm_GoHome":"Takaisin pääsivulle","Nav_DropDownItem_Login":"Kirjaudu sisään","Label_Content_Help":"Apua etsinnässä?","Entity_Details_Address":"Osoite","Entity_List_Address":"Postiosoite","Entity_List_Address2":"Postiosoite 2","Entity_List_HouseNumber":"Talonumero","Entity_List_PostalCity":"Kaupunki","Entity_List_ZipCode":"Postinumero","Entity_List_PostalCountry":"Maa","Label_Person_Delete_Order":"Poistaa tilaus","Entity_List_RelationType":"Suhdetyyppi","Entity_List_RelationDescription":"Suhteiden kuvaus","Entity_List_BirthDate":"Syntymäpäivä","Label_EntityIsUpdated":"Viimeksi muuttunut","Entity_AuroraID":"Aurora -tunnus","Label_RoleIsActive":"Aktiivinen","Label_RoleIsInActive":"Epäaktiivinen","Label_Button_Clear":"Asia selvä","Label_Button_Filter":"Suodattaa","Label_Button_Search":"Hae","Label_NoSearchPerfomed":"Ei hakutuloksia. Haku suoritettiin","Entity_List_OpenRelation":"Mennä sukulaiseen","Label_Welcome":"Tervetuloa","Label_Country_Sweden":"Ruotsi","Label_Country_Denmark":"Tanska","Label_Country_Finland":"Suomi","Label_Country_Norway":"Norja","Nav_DropDownItem_Settings":"Asetukset","Nav_DropDownItem_ChangePassword":"Vaihda salasana","Nav_DropDownItem_Darkmode":"Vaihda teema","Nav_DropDownItem_Contact":"Ota meihin yhteyttä","Label_SearchAppName":"Aurora Pod","Label_Tooltip_ThemeDark":"Käytä tummaa teemaa","Label_Tooltip_ThemeLight":"Käytä kevytteemaa","Label_Tooltip_Settings":"Asetukset","Label_Tooltip_Contact":"Ota meihin yhteyttä","Label_Tooltip_Filearea":"Filearea","Label_Tooltip_HandleUsers":"Hallitse yritystilejä","Entity_Label_SetPassWord":"Tallenna uusi salasana","Label_RegisterForm_Password":"Salasana","Tooltip_RegisterForm_Password":"Ainakin 8 merkkiä","Label_RegisterForm_PasswordConfirm":"Vahvista salasana","Tooltip_RegisterForm_PasswordConfirm":"Kirjoita uudelleen salasanan vahvistamiseksi","Label_PasswordChanged":"Salasana vaihdettu","Label_Password_Guidelines":"Merkkijonon on sisällettävä vähintään 1 pienet aakkoset, vähintään 1 isot aakkosellinen merkki, vähintään yksi numeerinen merkki ja ainakin yksi erikoishahmo. Merkkijonon on oltava kahdeksan merkkiä tai pidempi","Button_Password_Save":"Tallenna uusi salasana","Error_RegisterForm_Password":"Salasanamuotovirhe","Error_RegisterForm_PasswordMatch":"Salasana ei täsmää","Label_LoginForm_Account":"Tilin nimi","Label_LoginForm_AccountPlaceholder":"Kirjoita tilisi nimi","Denmark":"Tanska","Sweden":"Ruotsi","Finlan":"Finlan","Norway":"Norja","Entity_Label_Error_canPerformSSNSearchFalse":"Sinun on yhdistettävä SSN -haku ensimmäiseen ja sukunimeen","Confirm_you_want_to_remove_user_from_Company":"Varmista, että haluat poistaa käyttäjän yrityksestä.","ButtonRemoveUser":"Poista käyttäjä","ButtonCancel":"Peruuttaa","Titel_Delete_User":"Poista käyttäjä","User_already_exists_Contact_support":"Käyttäjä on jo olemassa. Ota yhteyttä tukeen, jos tarvitset apua tämän käyttäjän yhdistämiseksi tähän yritykseen.","SSN_format_error":"Syötä sosiaaliturvatunnus muodossa vvvmmdd-xxxx","Label_Content_Cookie":"Tietoja evästeistä","time_indicator":"Ajallaan","January":"Tammikuu","February":"Helmikuu","March":"Maaliskuu","April":"Huhtikuu","May":"Saattaa","June":"Kesäkuu","July":"Heinäkuu","August":"Elokuu","September":"Syyskuu","October":"Lokakuu","November":"Marraskuu","December":"Joulukuu","Nav_DropDownItem_Livestream":"Intercom","Label_MyChatChannels":"Kanavat","Label_MyChatChannelsMostRecent":"Viimeisin","Link_Login_Registe":"Liittyä seuraan","Label_Onboarding_Password":"Kirjoita salasana","Label_Onboarding_PasswordAgain":"Kirjoita salasana uudelleen","Nav_DropDownItem_MCC":"Kojelauta","Entity_Label_Filter":"Suodattaa","Nav_DropDownItem_MCCDashBoard":"Dashboard","Nav_DropDownItem_PODView":"POD view","Label_AppName":"Aurora","Nav_DropDownItem_Profilesettings":"Profiiliasetukset","Nav_DropDownItem_Databrowser":"Dataselain","Nav_DropDownItem_Suspence":"Suspence","Nav_DropDownItem_OrderHistory":"Tilaushistoria","Nav_DropDownItem_Alarmlist":"Hälytysluettelo","Label_LoginForm_UsernamePlaceholder":"Käyttäjänimi","Label_LoginForm_Username":"Käyttäjänimi","Nav_DropDownItem_MCCPOD":"POD","Nav_DropDownItem_MCCGateways":"Gateways","Nav_DropDownItem_MCCSensors":"Anturit","Nav_DropDownItem_MCCEnergy":"Energia","Nav_DropDownItem_MCCPower":"Voima","Nav_DropDownItem_MCCVolume":"Tilavuus","Table_Column_entity_class":"Kokonaisuus","Table_Column_point_class":"Kohta","Table_Column_brickSensorClass":"Brick sensor class","Table_Column_gatewayClassId":"Gateway class","Table_Column_time_read_string":"Lue aikaleima","Table_Column_gatewayId":"Gateway ID","Table_Column_lastKnownValue":"Viimeksi tunnettu arvo","Table_Column_write_time_string":"Tiedot tallennettiin","Table_Column_point_id":"Kohta","Table_Column_brickSensorClassQuantity":"Brick sensor Quantity","Table_Column_timestamp_read":"Lue aikaleima","Table_Column_transformedElement":"Laiteobjektiparametri","Table_Column_processStatus":"Prosessitila","Table_Column_command":"Komento","Nav_DropDownItem_Agents":"Agents","Nav_DropDownItem_Events":"Tiedot","Nav_DropDownItem_Ontology":"Ontologia","Table_Column_Ontotology_Name":"Nimi","Table_Column_Ontotology_Description":"Kuvaus","Table_Column_Ontotology_Foldername":"Kansion nimi","Table_Column_Ontotology_Ontology":"Ontologia","Table_Column_Ontotology_Superclass":"Superluokka","Table_Column_Ontotology_Type":"Tyyppi","Table_Column_Ontotology_Updated":"Päivitetty","Table_Column_Ontotology_UpdatedAsDateString":"Päivitetty merkkijonona","Table_Column_topic":"Topic","Nav_DropDownItem_Edit":"Muokata","Nav_DropDownItem_SensorMapping":"Anturin kartoitus","Nav_DropDownItem_EditModel":"Data tree","Nav_DropDownItem_ExportCenter":"Export center","Nav_DropDownItem_Meters":"Metri","Button_RegisterForm_Register":"Rekisteröi uusi tili","Label_iHaveAnAccount_Login":"Minulla on jo tunnus","Label_RegisterForm_Register":"Rekisteröi uusi tili","Label_RegisterForm_RegisterInfo":"Rekisteröi uusi tili palvelun käyttämiseksi","Label_RegisterForm_Name":"Nimeä tili","Tooltip_RegisterForm_Name":"Tilisi nimi","Label_RegisterForm_Voucher":"Kuponki","Tooltip_RegisterForm_Voucher":"Kirjoita saamasi tositteet Rekisteröidy tili","Label_RegisterForm_Email":"Sähköposti","Tooltip_RegisterForm_Email":"Kirjoita tilillesi sähköposti","Error_RegisterForm_Name":"Sinun on annettava tilillesi nimi","Error_RegisterForm_Voucher":"Kirjoita tosite tilin luomiseksi","Error_RegisterForm_Email":"Anna tilille sähköpostiosoite"});Package['universe:i18n'].i18n._ts = Math.max(Package['universe:i18n'].i18n._ts, 1708695287710);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"no.i18n.yml.js":function module(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// i18n/core/no.i18n.yml.js                                                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Package['universe:i18n'].i18n.addTranslations('no','',{"language":"no","LINE02":"LINE02","Header_Login_Login":"Logg Inn","Nav_DropDownItem_English":"Engelsk","Nav_DropDownItem_Swedish":"Svensk","Nav_DropDownItem_Help":"Hjelp","Nav_DropDownItem_Chat":"Chat","Nav_DropDownItem_Logout":"Logg ut","Nav_DropDownItem_Profile":"Profil","Nav_DropDownItem_Orders":"Bestillinger","Header_Login_EnterHint":"Skriv brukernavn og passord","Link_Login_ForgotPassword":"Glemt passord?","Link_Login_CreateAccount":"Opprett en konto","Label_LoginForm_Email":"E -post","Label_LoginForm_EmailPlaceholder":"E -post","Label_LoginForm_EmailValidationError":"Oppgi en gyldig e-post-adresse.","Label_LoginForm_Password":"Passord","Label_LoginForm_PasswordPlaceholder":"Skriv inn passordet ditt","Label_LoginForm_PasswordValidationError":"Det passordet er for kort","Button_LoginForm_Login":"Logg Inn","Header_ForgotPassword_Password":"Glemt passord","Header_ForgotPassword_EnterHint":"Skriv inn e-postadressen din, og et nytt passord vil bli sendt til deg.","Header_ForgotPassword_Remember":"Husker du passordet ditt?","Link_ForgotPassword_Login":"Logg Inn","Label_ForgotPassword_Email":"Epostadresse","Label_ForgotPassword_EmailPlaceholder":"Her skriver du inn e -postadressen din.","Label_ForgotPassword_EmailValidationError":"Vennligst skriv inn en gyldig e-post adresse.","Button_ForgotPassword_Login":"Send et nytt passord","Button_ForgotPassword_Save":"Send et nytt passord","Header_SetPassword_Password":"Skriv inn et nytt passord","Header_SetPassword_EnterHint":"Skriv inn passordet ditt to ganger","Link_SetPassword_Cancel":"Avbryt","Label_SetPassword_Label":"Passord","Label_SetPassword_ConfirmLabel":"Bekreft passord","Label_SetPassword_MinLengthValidationError":"Passordet er for kort (minimum {$minlength} tegn)","Label_SetPassword_MismatchValidationError":"Passordet stemmer ikke","Button_SetPassword_Save":"Lagre","Email_SiteName_Text":"Aurora","Email_From_Text":"Hello@tritonite.io","Email_ResetPassword_Subject":"Tilbakestill passordet ditt","Label_List_Month":"Siste 30 dager","Label_List_Old":"Eldre enn 30 dager","Label_List_Today":"I dag","Label_List_Week":"Siste 7 dager","Label_List_Yesterday":"I går","Label_Chat_Placeholder_Send":"Beskjed","Label_Chat_Placeholder_Send_Label":"Ny melding","Label_Ordercard_Meta":"Metaverdier","Label_Ordercard_Persondata":"Persondata","Label_Ordercard_Persondata_url":"Bilde på personen","Label_Ordercard_Postaddress":"Postadresse","Label_Ordercard_Roles":"Roller","Label_Ordercard_Relation":"Forhold","Label_Ordercard_Notes":"Merknader","Label_Ordercard_Audit":"Revidere","Entity_Label_Field_order_process_method":"Prosessmetode","Entity_Label_Field_order_type_name":"Bestillingstype","Entity_Label_state_name":"Ordre status","Entity_Label_state_description":"Ordre status","Entity_Label_Orderid":"Bestillings ID","Entity_Label_Title":"Titel","Entity_Label_Nid":"Id","Entity_Label_Created":"Opprettet","Entity_Label_Changed":"Endret","Entity_Label_Field_pep":"Er en pep","Entity_Label_Field_current_ssn":"SSN","Entity_Label_Field_ssntype":"SSN -type","Entity_Label_Field_Birth date":"Bursdag","Entity_Label_Field_postaladdress":"Postadresse","Entity_Label_Field_postaladdress2":"Post Adress 2","Entity_Label_Field_housenumber":"Husnummer","Entity_Label_Field_postalcity":"Postby","Entity_Label_Field_zipcode":"Post kode","Entity_Label_Field_firstname":"Fornavn","Entity_Label_Field_lastname":"Etternavn","Entity_Label_Field_name_type":"Navntype","Entity_Label_Field_postalcountry":"Postland","Entity_Label_Field_personid":"Person ID (klassisk)","Entity_Label_Field_person":"Person Reference (NID)","Entity_Label_Field_person_relation":"Personforhold","Entity_Label_Field_relation_description":"Beskrivelse","Entity_Label_Field_period_value":"Startdato","Entity_Label_Field_period_value2":"Gjennom dato","Entity_Label_Field_country_of_jurisdiction":"Land for jurisdiksjon","Entity_Label_Field_is_active":"Er aktiv person","Entity_Label_Field_role_description":"Rollebeskrivelse","Entity_Label_Field_organisation":"Organisasjon","Entity_Label_Field_organisation_number":"Organisasjonsnummer","Entity_Label_Field_notes":"Merk","Entity_Label_Field_detailed_role_categories":"Detaljert kategori","Entity_Label_Field_gender":"Kjønn","Entity_Label_Field_whom":"Hvem","Entity_Label_Field_what":"Hva","Entity_Label_Field_when":"Når","Entity_Label_Field_url":"URL","Nav_DropDownItem_Articles":"Artikler","Nav_DropDownItem_Snippets":"Utdrag","Nav_DropDownItem_Labels":"Etiketter","Nav_DropDownItem_Configuration":"Konfigurasjon","Label_podview_articles_master_title":"Artikler","Label_podview_articles_master_id":"Id","Label_podview_articles_master_typeOfArticle":"Type artikkel","Label_podview_articles_master_title1":"Titel","Label_podview_articles_master_ingress":"Inntrengning","Label_podview_articles_master_language":"Språk","Label_podview_articles_master_revision":"Revisjon","Label_podview_articles_master_status":"Dokumentstatus","Label_podview_articles_master_updatedAt":"Oppdaterte på","Label_podview_articles_master_version":"Versjon","Label_podview_articles_master_publish_status":"Publisere status","Nav_DropDownItem_Tags":"Tagger","Nav_DropDownItem_NewDocument":"Nytt dokument","Label_podview_articles_master_status6":"Status","Label_podview_articles_master_status7":"Status","Label_podview_articles_master_status8":"Status","Label_podview_articles_master_status9":"Status","Label_podview_articles_master_status10":"Status","Label_podview_articles_master_status11":"Status","Label_podview_articles_master_status12":"Status","Label_podview_articles_master_status13":"Status","Label_podview_articles_master_status14":"Status","Label_podview_articles_master_status15":"Status","Label_podview_articles_master_status16":"Status","Label_podview_articles_master_status17":"Status","Label_podview_articles_master_status18":"Status","Label_podview_articles_master_status19":"Status","Nav_DropDownItem_Persons":"Søkeperson","Label_Button_Edit":"Redigere","Label_Button_Create":"Skape","Label_Button_Save":"Lagre","Label_Button_Delete":"Slett","Label_Button_Update":"Oppdater","Label_Button_Cancel":"Avbryt","Label_Autoupdate":"Live oppdatering","Label_Button_Add":"Legg til","Label_Button_Remove":"Fjerne","Label_Ordercard_Personnames":"Navn","Label_Ordercard_Personssn":"SSN","Entity_Label_Field_description":"Om denne ordren","Label_Button_UpdateOrderState":"Oppdateringsordrestat","Label_Button_CancelOrder":"Avbryt bestillingen","Entity_Label_Field_deactivationdate":"Deaktiveringsdato","Entity_Label_Field_is_deceased":"Avdød","Entity_Label_Field_deceased_date":"Avdøde dato","Entity_Label_Field_name_type_remove_item":"Fjern navnelementet?","Entity_Label_Field_remove_item_text":"Vil du virkelig fjerne denne varen?","Label_Ordercard_PersonSSN":"Person SSN -tall","Entity_Label_Field_ssn_remove_item":"Fjern SSN -varen?","Entity_Label_Field_pepcountry":"Pep land","Entity_Label_FieldCountryOfJurisdiction_Denmark":"Danmark","Entity_Label_FieldCountryOfJurisdiction_Sweden":"Sverige","Entity_Label_FieldCountryOfJurisdiction_Norway":"Norge","Entity_Label_FieldCountryOfJurisdiction_Finland":"Finland","Entity_Label_Field_is_active_role":"Er aktiv rolle","Label_Button_NewRole":"Legg til en ny rolle","Label_Button_RemoveRole":"Slett","Entity_Label_Item_id":"Id","Entity_Label_Field_Role_remove_item":"Fjerne rolle fra orden?","Label_Button_NewRelation":"Legg til ny relasjon","Entity_Label_Field_Relation_remove_item":"Fjerne forholdet fra orden?","Label_Button_RemoveRelation":"Fjern forholdet","Label_Ordercard_Relations":"Forhold","Entity_Label_Field_relation":"Forholdstype","Entity_Label_Field_Category":"Rollekategori","Entity_Label_Role_description_type":"Rollebeskrivelse Type","Entity_Label_Search":"Søk","Label_Orders_Search":"Søkeperson eller bestill","Table_OrderList_Column_Name":"Bestillings ID","Table_OrderList_Column_Status":"Status","Table_OrderList_Column_OrderType":"Type","Table_OrderList_Column_ModifiedBy":"Endret","Entity_Label_Person_Card":"Persondata","Entity_Label_Personid":"Person ID Classic","Label_OpenOrderListItem_Languages":"Velg språk","Label_Button_ChangeData":"Endre data","Label_Ordercard_PersonOrders":"Bestill for person","Label_Button_Create_Order":"Lag ordre","Label_Person_Save_Order":"Plese angi en kommentar for bestillingen og trykk lagre","TIMEAGO_INIT_STRING":"Til","Entity_Create_Order":"Lag ordre","Table_searchpersonList_Column_ID":"Id","Table_searchpersonList_Column_FirstName":"Fornavn","Table_searchpersonList_Column_LastName":"Etternavn","Table_searchpersonList_Column_PEPRCA":"Pep / rca","Table_searchpersonList_Column_Country":"Land","Table_searchpersonList_Column_Role":"Detaljert rolle","Table_searchpersonList_Column_Relation":"Forhold","Table_searchpersonList_Column_Organisation":"Organisasjon","RelationshipWithPersonIs":"Til","Label_searchpersons_Search":"Angi verdi og trykk Enter","Label_PersonView":"Personens syn","Label_RoleView":"Rollvisning","RelationshipWithPersonIsDaughterInLaw":"Svigerdatter til","RelationshipWithPersonIsSonInLaw":"Svigersønn til","RelationshipWithPersonIsDoughter":"Doughter til","RelationshipWithPersonIsSon":"Sønn til","RelationshipWithPersonIsMotherInLaw":"Svigermor til","RelationshipWithPersonIsFatherInLaw":"Svigerfar til","RelationshipWithPersonIsMother":"Mor til","RelationshipWithPersonIsFather":"Far til","RelationshipWithPersonIsPartner":"Samarbeide med","RelationshipWithPersonIsCoworker":"Kollega med","Table_SearchResultForString":"Resultat for SearchString","Table_SearchResultTimeLaps":"Søkte inn","Table_searchpersonList_Column_RoleDescription":"Rollebeskrivelse","Table_searchpersonList_Column_MainRole":"Hovedrolle","Label_LoginForm_LdapError":"Din UserID eller passord er ikke riktig. Vær så snill, prøv på nytt","Table_searchpersonList_Column_SSN":"Født","Label_ShowAllRoles":"Vis alle roller","Entity_Label_Version_Card":"Versjoner","Table_searchpersonList_Column_Birth date":"Bursdag","Label_DistinctRoles":"Distinkt rollepresenasjon","Form_Current_RoleSearch":"Rollesøknøkkel (taksonomi)","Form_NumberOfActivePersons":"Antall aktive personer","Form_NumberOfNoneActivePersons":"Antall inaktive personer","Form_NumberOfPersons":"Antall personer","Form_NumberOfActiveRoles":"Antall aktive roller","Label_ResetSearch":"Nytt søk","Entity_Label_Field_SSN":"Personnummer","Entity_Label_field_names":"Navn","Label_Button_Create_NewPersonOrder":"Skape ny person","Entity_Label_Field_personname":"Person","Entity_Label_field_type_label":"Person -type etikett","Entity_Label_field_personid":"PersonId (klassisk)","Entity_Label_GoTo_Person":"Goto person","Entity_Label_Field_is_active_relation":"Aktiv relasjon","Form_NumberOfTotalRoles":"Rader i bordet","Form_NumberOfNoneActive":"Ingen aktive rader","Label_variant_yy":"Y","Label_variant_mm":"M","Label_variant_dd":"D","Label_date_error":"Kontroller dato","Label_Invalid_date":"Ugyldig dato","Label_variant_hh":"Hh","Label_variant_min":"Mm","Label_Person_QueryNewOrder":"Bekreft for å opprette en ny ordre","Label_Button_CreateNewOrder":"Lag ny personsordre","Label_Snackbar_DataSaved":"Data lagres","Label_Snackbar_Error":"En systemfeil oppsto!","Nav_DropDownItem_NewOrder":"Ny bestilling","Entity_Label_Field_countryofjurisdiction":"Land for jurisdiksjon","Entity_Label_Motherboard":"Hovedkort","Label_Livestream":"Direktestrømming","Label_Order_Entity":"Livestream Order","Label_Person_Entity":"Livestream person","Label_Livestream_Last":"Siste hendelser","Label_PerformedBy":"Fremført av","Label_All_Livestream":"Senest","Label_Ordercard_CurrentOrders":"Bestillinger","Label_Ordercard_Subheader":"Gjeldende bestillinger","Label_MothercheckPerformed":"Morsjekk utført","Label_Motherchecks":"Overvåking av nøkkelverdier i Aurora -plattformen","Label_Motherchecks_sublabel":"Mothercheck List","Label_mothercheck_details":"Mothercheck detaljer","Label_Mothercheck_info":"Mothercheck Info","Label_Button_OK":"Ok","Entity_Label_Field_current_ssn_error":"Organisasjonsnummer er feil","Label_Search_Toolbar":"PersonId","Label_MessageCheck":"Meldinger","Label_MessageCheck_sublabel":"Valideringsstatusliste","Label_messagePerformed":"Utførte sjekker","Validate_mandatory_field":"Obligatoriske felt","Validate_mandatory_field_objective":"Dette feltet må fylles ut","Validate_mandatory_field_resolution":"Fyll ut feltet","Label_Snackbar_ValidationOrderError":"Valideringsfeil i orden","Label_Snackbar_OrderProcessed":"Bestillingen er behandlet","Validate_Birth date_ok_title":"Fødselsdato felt OK","Validate_Birth date_error_title":"Fødselsdato har en feil","Validate_gender_ok_title":"Kjønnsfelt OK","Validate_gender_error_title":"Kjønn har en feil","Validate_name_error_title":"Minst ett navn må være til stede i orden","Validate_name_ok_title":"Navn sjekk ok","Label_Person_RestoreThisOrder":"Gjenopprett siste sett med endringer","Label_Button_RestoreOrder":"Restaurere","Entity_Restore_Order":"Gjenopprett ordre","Entity_Process_Order":"Prosessordre","Label_message_details":"Beskrivelse","Validate_pepcountry_ok_title":"Pep Country Sjekk ok","Validate_pepcountry_error_title":"Minst ett Pep -land må velges","Validate_SSN_ok_title":"SSN OK","Validate_SSN_error_title":"SSN mangler","Label_Card_Role":"Rolle","Label_Card_Relation":"Forhold","Label_Card_Core":"Kjerne","Label_Card_SSN":"SSN","Label_Card_Address":"Adresse","Label_Card_URI":"Uri","Label_Card_Name":"Navn","Label_Card_Order":"Rekkefølge","Validate_nametype_primary_objective":"En ordre måste ha ett primärt namn","Nav_DropDownItem_Orderdashboard":"Bestill dashbord","Entity_Label_SearchPerson":"Søkeperson","Entity_Label_SearchPerson_Firstname":"Fornavn","Entity_Label_SearchPerson_Lastname":"Etternavn","Entity_Label_SearchPerson_SSNNumber":"Svensk SSN","Entity_Label_SearchPerson_Birth date":"Bursdag","Entity_Label_SearchPerson_Year":"År","Entity_Label_SearchPerson_Month":"Måned","Entity_Label_SearchPerson_Day":"Dag","Entity_Label_NameValues":"Navn","Entity_Label_SearchDates":"Datoer","Entity_Label_PEPRCA":"Definere pep og/eller rca","Entity_Label_Button_Find":"Søk","Entity_Label_SelectListCountries":"Velg listeland","Entity_List_Link":"Person","Entity_List_SSN":"Personnummer","Entity_List_FirstName":"Fornavn","Entity_List_LastName":"Etternavn","Entity_List_Gender":"Kjønn","Entity_List_PEP":"Pep","Entity_List_RCA":"RCA","Entity_List_Details":"Vis mer","Entity_Label_Mandatory":"Obligatoriske felt","Entity_Label_Button_Back":"Tilbake","Entity_Label_Button_Close":"Lukk","Entity_List_Birth date":"Bursdag","Entity_List_NameType":"Navntype","Entity_List_Role":"Rolle","Entity_List_RoleCategory":"Rollekategori","Entity_List_RoleCategoryDetails":"Detaljert kategori","Entity_List_FromDate":"Startdato","Entity_List_ThroughDate":"Gjennom dato","Entity_List_Active":"Rollestatus","Entity_List_Type":"Navntype","Entity_List_Name":"Navn","Entity_List_Description":"Beskrivelse","Entity_List_CountryOfJurisdiction":"Land for jurisdiksjon","Label_Snackbar_NoData":"Ingen personer samsvarer med spørringen","Entity_Label_FieldCountryListSimple_All":"Alle land","Entity_List_SearchBySSN":"SSN -kamp","Entity_Details":"Detaljer","Entity_Names":"Navn","Entity_Roles":"Roller","Entity_Relations":"Forhold","Entity_Label_AddCompanyUser":"Legg til bruker","Entity_Label_AddUser_Email2":"Skriv inn e-post på nytt","Entity_Label_AddUser_Email":"E -post","Entity_Label_AddUser_Name":"Navn","Entity_UsersList_InactiveMembersTitle":"Inaktive medlemmer","Entity_UsersList_MembersTitle":"Medlemmer","Entity_UsersList_AdminsTitle":"Administratorer","Entity_UsersList_Deactivate":"Deaktiver","Entity_UsersList_Activate":"Aktivere","Entity_UsersList_Name":"Navn","Entity_UsersList_Email":"E -post","Entity_UsersList_Dialog_Activate":"Aktivere bruker?","Entity_UsersList_Dialog_Deactivate":"Deaktiver bruker?","Entity_UsersList_Dialog_Cancel":"Avbryt","Entity_UsersList_Dialog_Confirm":"Bekrefte","Entity_Validation_MandatoryField":"Vennligst fyll ut et obligatorisk felt","Entity_Validation_MatchErrorField":"Verdiene stemmer ikke overens for {$felt}","Entity_UsersList_Active":"Status","Entity_UserList_Pic":"Profil","Nav_DropDownItem_AdminCompanyPersons":"Administrer forretningskontoer","Entity_List_Avatar":"#","Nav_DropDownItem_Finnish":"Finsk","Nav_DropDownItem_Danish":"Dansk","Nav_DropDownItem_Norweigan":"Norweigan","Label_ordersbystate_sublabel":"Bestillinger fra staten","Entity_Delete_Relation":"Slett dette forholdet","Entity_Delete_Role":"Slett denne rollen","Label_Person_Delete_Orde":"Bekreft for å slette elementet","Label_Button_ConfirmDelete":"Slett rekkefølge","Nav_DropDownItem_Icleandic":"Island","Entity_Label_Field_ContactUs_Title":"Kontakt oss","Entity_Label_Field_ContactUs_Name":"Navn","Entity_Label_Field_ContactUs_Email":"Epost adresse","Entity_Label_Field_ContactUs_Email2":"Gjenta e-postadresse","Entity_Label_Field_ContactUs_Phone":"Telefon","Entity_Label_Field_ContactUs_Content":"Beskjed","Entity_Label_Button_ContactUs_Submit":"Sende","Entity_Label_Button_ContactUs_Cancel":"Avbryt","Entity_Label_Field_ContactUs_Waltercheck":"Svar på spørsmålet","Entity_Validation_MandatoryField_Name":"Navn","Entity_Validation_MandatoryField_Email":"E-post","Entity_Validation_MandatoryField_Message":"Beskjed","Nav_DropDownItem_About":"Om Aurora","Entity_FileareaList_AdminsTitle":"Filområde","Entity_FileareaList_Download":"Nedlasting","Entity_FileareaList_Name":"Filnavn","Nav_DropDownItem_Filearea":"Filområde","Entity_Label_Field_ContactUs_Success":"Din melding har blitt sendt. Takk skal du ha.","Entity_Label_Field_ContactUs_Fail":"Problem å sende meldingen. Prøv igjen senere.","Entity_Label_Download_Success":"Filoverføring startet","Label_LoginForm_GoHome":"Tilbake til hovedsiden","Nav_DropDownItem_Login":"Logg Inn","Label_Content_Help":"Hjelp med søk?","Entity_Details_Address":"Adresse","Entity_List_Address":"Postadresse","Entity_List_Address2":"Postadresse 2","Entity_List_HouseNumber":"Husnummer","Entity_List_PostalCity":"By","Entity_List_ZipCode":"Post kode","Entity_List_PostalCountry":"Land","Label_Person_Delete_Order":"Slett rekkefølge","Entity_List_RelationType":"Relasjonstype","Entity_List_RelationDescription":"Relasjonsbeskrivelse","Entity_List_BirthDate":"Bursdag","Label_EntityIsUpdated":"Sist endret seg","Entity_AuroraID":"Aurora id","Label_RoleIsActive":"Aktiv","Label_RoleIsInActive":"Inaktiv","Label_Button_Clear":"Klar","Label_Button_Filter":"Filter","Label_Button_Search":"Søk","Label_NoSearchPerfomed":"Ingen søkeresultat. Søket ble utført","Entity_List_OpenRelation":"Gå til relatert person","Label_Welcome":"Velkommen","Label_Country_Sweden":"Sverige","Label_Country_Denmark":"Danmark","Label_Country_Finland":"Finland","Label_Country_Norway":"Norge","Nav_DropDownItem_Settings":"Innstillinger","Nav_DropDownItem_ChangePassword":"Bytt passord","Nav_DropDownItem_Darkmode":"Endre tema","Nav_DropDownItem_Contact":"Kontakt oss","Label_SearchAppName":"Aurora Pod","Label_Tooltip_ThemeDark":"Bruk mørkt tema","Label_Tooltip_ThemeLight":"Bruk lett tema","Label_Tooltip_Settings":"Innstillinger","Label_Tooltip_Contact":"Kontakt oss","Label_Tooltip_Filearea":"FileArea","Label_Tooltip_HandleUsers":"Administrer forretningskontoer","Entity_Label_SetPassWord":"Lagre nytt passord","Label_RegisterForm_Password":"Passord","Tooltip_RegisterForm_Password":"Minst 8 tegn","Label_RegisterForm_PasswordConfirm":"Bekreft passord","Tooltip_RegisterForm_PasswordConfirm":"Skriv igjen for å bekrefte passordet","Label_PasswordChanged":"Passord endret","Label_Password_Guidelines":"Strengen må inneholde minst 1 små bokstaver, minst 1 store alfabetisk tegn, minst 1 numerisk tegn og minst en spesiell karakter. Strengen må være åtte tegn eller lenger","Button_Password_Save":"Lagre nytt passord","Error_RegisterForm_Password":"Passordformatfeil","Error_RegisterForm_PasswordMatch":"Passordet stemmer ikke","Label_LoginForm_Account":"Brukernavn","Label_LoginForm_AccountPlaceholder":"Skriv inn kontonavnet ditt","Denmark":"Danmark","Sweden":"Sverige","Finlan":"Finlan","Norway":"Norge","Entity_Label_Error_canPerformSSNSearchFalse":"Du må kombinere SSN -søk med første og etternavn","Confirm_you_want_to_remove_user_from_Company":"Bekreft at du vil fjerne brukeren fra selskapet.","ButtonRemoveUser":"Fjern brukeren","ButtonCancel":"Avbryt","Titel_Delete_User":"Fjern brukeren","User_already_exists_Contact_support":"Brukeren eksisterer allerede. Kontakt support hvis du trenger hjelp til å relatere denne brukeren til dette selskapet.","SSN_format_error":"Skriv inn personnummer i formatet yyyymmdd-xxxx","Label_Content_Cookie":"Om informasjonskapsler","time_indicator":"På tidspunktet","January":"Januar","February":"Februar","March":"Mars","April":"April","May":"Kan","June":"Juni","July":"Juli","August":"August","September":"September","October":"Oktober","November":"November","December":"Desember","Nav_DropDownItem_Livestream":"Intercom","Label_MyChatChannels":"Kanaler","Label_MyChatChannelsMostRecent":"Senest","Link_Login_Registe":"Bli med","Label_Onboarding_Password":"Oppgi passord","Label_Onboarding_PasswordAgain":"Skriv inn passord igjen","Nav_DropDownItem_MCC":"Dashbord","Entity_Label_Filter":"Filter","Nav_DropDownItem_MCCDashBoard":"Dashboard","Nav_DropDownItem_PODView":"POD view","Label_AppName":"Aurora","Nav_DropDownItem_Profilesettings":"Profilinnstillinger","Nav_DropDownItem_Databrowser":"Dataleser","Nav_DropDownItem_Suspence":"Suspence","Nav_DropDownItem_OrderHistory":"Ordrehistorikk","Nav_DropDownItem_Alarmlist":"Alarmliste","Label_LoginForm_UsernamePlaceholder":"Brukernavn","Label_LoginForm_Username":"Brukernavn","Nav_DropDownItem_MCCPOD":"POD","Nav_DropDownItem_MCCGateways":"Gateways","Nav_DropDownItem_MCCSensors":"Sensorer","Nav_DropDownItem_MCCEnergy":"Energi","Nav_DropDownItem_MCCPower":"Makt","Nav_DropDownItem_MCCVolume":"Volum","Table_Column_entity_class":"Enhet","Table_Column_point_class":"Punkt","Table_Column_brickSensorClass":"Brick sensor class","Table_Column_gatewayClassId":"Gateway class","Table_Column_time_read_string":"Les tidsstempel","Table_Column_gatewayId":"Gateway ID","Table_Column_lastKnownValue":"Sist kjent verdi","Table_Column_write_time_string":"Data ble lagret","Table_Column_point_id":"Punkt","Table_Column_brickSensorClassQuantity":"Brick sensor Quantity","Table_Column_timestamp_read":"Les tidsstempel","Table_Column_transformedElement":"Enhetsobjektparameter","Table_Column_processStatus":"Prosessstatus","Table_Column_command":"Kommando","Nav_DropDownItem_Agents":"Agents","Nav_DropDownItem_Events":"Data","Nav_DropDownItem_Ontology":"Ontologi","Table_Column_Ontotology_Name":"Navn","Table_Column_Ontotology_Description":"Beskrivelse","Table_Column_Ontotology_Foldername":"Mappenavn","Table_Column_Ontotology_Ontology":"Ontologi","Table_Column_Ontotology_Superclass":"Superklasse","Table_Column_Ontotology_Type":"Type","Table_Column_Ontotology_Updated":"Oppdatert","Table_Column_Ontotology_UpdatedAsDateString":"Oppdatert som streng","Table_Column_topic":"Topic","Nav_DropDownItem_Edit":"Redigere","Nav_DropDownItem_SensorMapping":"Sensorkartlegging","Nav_DropDownItem_EditModel":"Data tree","Nav_DropDownItem_ExportCenter":"Export center","Nav_DropDownItem_Meters":"Meter","Button_RegisterForm_Register":"Registrer en ny konto","Label_iHaveAnAccount_Login":"Jeg har allerede en konto","Label_RegisterForm_Register":"Registrer en ny konto","Label_RegisterForm_RegisterInfo":"Registrer en ny konto for å bruke tjenesten","Label_RegisterForm_Name":"Navngi kontoen din","Tooltip_RegisterForm_Name":"Navnet på kontoen din","Label_RegisterForm_Voucher":"Kupong","Tooltip_RegisterForm_Voucher":"Skriv inn kupongen du mottok for å registrere kontoen","Label_RegisterForm_Email":"E-post","Tooltip_RegisterForm_Email":"Skriv inn e-post for kontoen din","Error_RegisterForm_Name":"Du må gi kontoen din et navn","Error_RegisterForm_Voucher":"Vennligst skriv inn kupongen for å opprette kontoen","Error_RegisterForm_Email":"Vennligst skriv inn en e-post for kontoen"});Package['universe:i18n'].i18n._ts = Math.max(Package['universe:i18n'].i18n._ts, 1708695287712);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pt.i18n.yml.js":function module(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// i18n/core/pt.i18n.yml.js                                                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Package['universe:i18n'].i18n.addTranslations('pt','',{"language":"pt","LINE02":"LINE02","Header_Login_Login":"Conecte-se","Nav_DropDownItem_English":"Inglês","Nav_DropDownItem_Swedish":"Sueco","Nav_DropDownItem_Help":"Ajuda","Nav_DropDownItem_Chat":"Bater papo","Nav_DropDownItem_Logout":"Sair","Nav_DropDownItem_Profile":"Perfil","Nav_DropDownItem_Orders":"Ordens","Header_Login_EnterHint":"Escreva nome de usuário e senha","Link_Login_ForgotPassword":"Esqueceu sua senha?","Link_Login_CreateAccount":"Crie a sua conta aqui","Label_LoginForm_Email":"E-mail","Label_LoginForm_EmailPlaceholder":"E-mail","Label_LoginForm_EmailValidationError":"Digite um endereço de e-mail válido.","Label_LoginForm_Password":"Senha","Label_LoginForm_PasswordPlaceholder":"Coloque sua senha","Label_LoginForm_PasswordValidationError":"Essa senha é muito curta","Button_LoginForm_Login":"Conecte-se","Header_ForgotPassword_Password":"Esqueceu sua senha","Header_ForgotPassword_EnterHint":"Digite seu endereço de e-mail e uma nova senha será enviada a você.","Header_ForgotPassword_Remember":"Você se lembra da sua senha?","Link_ForgotPassword_Login":"Conecte-se","Label_ForgotPassword_Email":"Endereço de email","Label_ForgotPassword_EmailPlaceholder":"Aqui você insere seu endereço de e -mail.","Label_ForgotPassword_EmailValidationError":"Por favor insira um endereço de e-mail válido.","Button_ForgotPassword_Login":"Envie uma nova senha","Button_ForgotPassword_Save":"Envie uma nova senha","Header_SetPassword_Password":"Insira uma nova senha","Header_SetPassword_EnterHint":"Digite sua senha duas vezes","Link_SetPassword_Cancel":"Cancelar","Label_SetPassword_Label":"Senha","Label_SetPassword_ConfirmLabel":"Confirme sua senha","Label_SetPassword_MinLengthValidationError":"A senha é muito curta (mínimo {$ minlength} caracteres)","Label_SetPassword_MismatchValidationError":"Senha não corresponde","Button_SetPassword_Save":"Salvar","Email_SiteName_Text":"Aurora","Email_From_Text":"Hello@tritonite.io","Email_ResetPassword_Subject":"Redefina sua senha","Label_List_Month":"Últimos 30 dias","Label_List_Old":"Com mais de 30 dias","Label_List_Today":"Hoje","Label_List_Week":"Últimos 7 dias","Label_List_Yesterday":"Ontem","Label_Chat_Placeholder_Send":"Mensagem","Label_Chat_Placeholder_Send_Label":"Nova mensagem","Label_Ordercard_Meta":"Meta valores","Label_Ordercard_Persondata":"Dados da pessoa","Label_Ordercard_Persondata_url":"Foto em pessoa","Label_Ordercard_Postaddress":"Endereço postal","Label_Ordercard_Roles":"Papéis","Label_Ordercard_Relation":"Relação","Label_Ordercard_Notes":"Notas","Label_Ordercard_Audit":"Auditoria","Entity_Label_Field_order_process_method":"Método de processo","Entity_Label_Field_order_type_name":"Tipo de pedido","Entity_Label_state_name":"Status do pedido","Entity_Label_state_description":"Status do pedido","Entity_Label_Orderid":"ID do pedido","Entity_Label_Title":"Titel","Entity_Label_Nid":"EU IA","Entity_Label_Created":"Criada","Entity_Label_Changed":"Mudado","Entity_Label_Field_pep":"É um pep","Entity_Label_Field_current_ssn":"Ssn","Entity_Label_Field_ssntype":"Tipo SSN","Entity_Label_Field_Birth date":"Data de nascimento","Entity_Label_Field_postaladdress":"Endereço postal","Entity_Label_Field_postaladdress2":"Cortido postal 2","Entity_Label_Field_housenumber":"Número da casa","Entity_Label_Field_postalcity":"Cidade Postal","Entity_Label_Field_zipcode":"CEP","Entity_Label_Field_firstname":"Primeiro nome","Entity_Label_Field_lastname":"Sobrenome","Entity_Label_Field_name_type":"Tipo de nome","Entity_Label_Field_postalcountry":"País postal","Entity_Label_Field_personid":"ID da pessoa (clássico)","Entity_Label_Field_person":"Referência da pessoa (NID)","Entity_Label_Field_person_relation":"Relacionamento de pessoa","Entity_Label_Field_relation_description":"Descrição","Entity_Label_Field_period_value":"Data de início","Entity_Label_Field_period_value2":"Até a data","Entity_Label_Field_country_of_jurisdiction":"País de jurisdição","Entity_Label_Field_is_active":"É uma pessoa ativa","Entity_Label_Field_role_description":"Descrição do papel","Entity_Label_Field_organisation":"Organização","Entity_Label_Field_organisation_number":"Número da organização","Entity_Label_Field_notes":"Observação","Entity_Label_Field_detailed_role_categories":"Categoria detalhada","Entity_Label_Field_gender":"Gênero","Entity_Label_Field_whom":"A quem","Entity_Label_Field_what":"O que","Entity_Label_Field_when":"Quando","Entity_Label_Field_url":"Url","Nav_DropDownItem_Articles":"Artigos","Nav_DropDownItem_Snippets":"Trechos","Nav_DropDownItem_Labels":"Etiquetas","Nav_DropDownItem_Configuration":"Configuração","Label_podview_articles_master_title":"Artigos","Label_podview_articles_master_id":"Eu ia","Label_podview_articles_master_typeOfArticle":"Tipo de artigo","Label_podview_articles_master_title1":"Titel","Label_podview_articles_master_ingress":"Entrada","Label_podview_articles_master_language":"Linguagem","Label_podview_articles_master_revision":"Revisão","Label_podview_articles_master_status":"Status do documento","Label_podview_articles_master_updatedAt":"Atualizado em","Label_podview_articles_master_version":"Versão","Label_podview_articles_master_publish_status":"Publicar status","Nav_DropDownItem_Tags":"Tag","Nav_DropDownItem_NewDocument":"Novo Documento","Label_podview_articles_master_status6":"Status","Label_podview_articles_master_status7":"Status","Label_podview_articles_master_status8":"Status","Label_podview_articles_master_status9":"Status","Label_podview_articles_master_status10":"Status","Label_podview_articles_master_status11":"Status","Label_podview_articles_master_status12":"Status","Label_podview_articles_master_status13":"Status","Label_podview_articles_master_status14":"Status","Label_podview_articles_master_status15":"Status","Label_podview_articles_master_status16":"Status","Label_podview_articles_master_status17":"Status","Label_podview_articles_master_status18":"Status","Label_podview_articles_master_status19":"Status","Nav_DropDownItem_Persons":"Pessoa de pesquisa","Label_Button_Edit":"Editar","Label_Button_Create":"Criar","Label_Button_Save":"Salvar","Label_Button_Delete":"Excluir","Label_Button_Update":"Atualizar","Label_Button_Cancel":"Cancelar","Label_Autoupdate":"Atualização ao vivo","Label_Button_Add":"Adicionar","Label_Button_Remove":"Remover","Label_Ordercard_Personnames":"Nomes","Label_Ordercard_Personssn":"Ssn","Entity_Label_Field_description":"Sobre este pedido","Label_Button_UpdateOrderState":"Atualizar o estado do pedido","Label_Button_CancelOrder":"Cancelar pedido","Entity_Label_Field_deactivationdate":"Data de desativação","Entity_Label_Field_is_deceased":"Morto","Entity_Label_Field_deceased_date":"Data falecida","Entity_Label_Field_name_type_remove_item":"Remover o item de nome?","Entity_Label_Field_remove_item_text":"Você realmente deseja remover este item?","Label_Ordercard_PersonSSN":"Pessoa SSN números","Entity_Label_Field_ssn_remove_item":"Remover item SSN?","Entity_Label_Field_pepcountry":"País pep","Entity_Label_FieldCountryOfJurisdiction_Denmark":"Dinamarca","Entity_Label_FieldCountryOfJurisdiction_Sweden":"Suécia","Entity_Label_FieldCountryOfJurisdiction_Norway":"Noruega","Entity_Label_FieldCountryOfJurisdiction_Finland":"Finlândia","Entity_Label_Field_is_active_role":"É um papel ativo","Label_Button_NewRole":"Adicione um novo papel","Label_Button_RemoveRole":"Excluir","Entity_Label_Item_id":"Eu ia","Entity_Label_Field_Role_remove_item":"Remover a função do pedido?","Label_Button_NewRelation":"Adicione nova Relação","Entity_Label_Field_Relation_remove_item":"Remover a relação da ordem?","Label_Button_RemoveRelation":"Remova a relação","Label_Ordercard_Relations":"Relação","Entity_Label_Field_relation":"Tipo de relacionamento","Entity_Label_Field_Category":"Categoria de função","Entity_Label_Role_description_type":"Tipo de descrição de função","Entity_Label_Search":"Procurar","Label_Orders_Search":"Pessoa de pesquisa ou ordem","Table_OrderList_Column_Name":"ID do pedido","Table_OrderList_Column_Status":"Status","Table_OrderList_Column_OrderType":"Tipo","Table_OrderList_Column_ModifiedBy":"Mudado","Entity_Label_Person_Card":"Dados da pessoa","Entity_Label_Personid":"Pessoa ID Classic","Label_OpenOrderListItem_Languages":"Selecione o idioma","Label_Button_ChangeData":"Alterar dados","Label_Ordercard_PersonOrders":"Ordem para pessoa","Label_Button_Create_Order":"Criar ordem","Label_Person_Save_Order":"Por favor, insira um comentário para o pedido e pressione salvar","TIMEAGO_INIT_STRING":"Para","Entity_Create_Order":"Criar ordem","Table_searchpersonList_Column_ID":"EU IA","Table_searchpersonList_Column_FirstName":"Primeiro nome","Table_searchpersonList_Column_LastName":"Sobrenome","Table_searchpersonList_Column_PEPRCA":"PEP / RCA","Table_searchpersonList_Column_Country":"País","Table_searchpersonList_Column_Role":"Papel detalhado","Table_searchpersonList_Column_Relation":"Relação","Table_searchpersonList_Column_Organisation":"Organização","RelationshipWithPersonIs":"Para","Label_searchpersons_Search":"Digite o valor e pressione Enter","Label_PersonView":"Visualização da pessoa","Label_RoleView":"Visualização de função","RelationshipWithPersonIsDaughterInLaw":"Nora para","RelationshipWithPersonIsSonInLaw":"Genro para","RelationshipWithPersonIsDoughter":"Doughter para","RelationshipWithPersonIsSon":"Filho para","RelationshipWithPersonIsMotherInLaw":"Sogra para","RelationshipWithPersonIsFatherInLaw":"Sogro para","RelationshipWithPersonIsMother":"Mãe para","RelationshipWithPersonIsFather":"Pai para","RelationshipWithPersonIsPartner":"Parceiro com","RelationshipWithPersonIsCoworker":"Colega de trabalho com","Table_SearchResultForString":"Resultado para pesquisa de pesquisa","Table_SearchResultTimeLaps":"Pesquisado","Table_searchpersonList_Column_RoleDescription":"Descrição do papel","Table_searchpersonList_Column_MainRole":"Papel principal","Label_LoginForm_LdapError":"Seu ID ou senha do usuário não está correto. Por favor, tente novamente","Table_searchpersonList_Column_SSN":"Nascer","Label_ShowAllRoles":"Mostrar todos os papéis","Entity_Label_Version_Card":"Versões","Table_searchpersonList_Column_Birth date":"Data de nascimento","Label_DistinctRoles":"Presenação distinta do papel","Form_Current_RoleSearch":"Chave de pesquisa de função (taxonomia)","Form_NumberOfActivePersons":"Número de pessoas ativas","Form_NumberOfNoneActivePersons":"Número de pessoas inativas","Form_NumberOfPersons":"Número de pessoas","Form_NumberOfActiveRoles":"Número de papéis ativos","Label_ResetSearch":"Nova pesquisa","Entity_Label_Field_SSN":"Número da Segurança Social","Entity_Label_field_names":"Nomes","Label_Button_Create_NewPersonOrder":"Criar nova pessoa","Entity_Label_Field_personname":"Pessoa","Entity_Label_field_type_label":"Etiqueta do tipo de pessoa","Entity_Label_field_personid":"PersonId (clássico)","Entity_Label_GoTo_Person":"Pessoa goto","Entity_Label_Field_is_active_relation":"Relação ativa","Form_NumberOfTotalRoles":"Linhas na tabela","Form_NumberOfNoneActive":"Nenhuma linhas ativas","Label_variant_yy":"Y","Label_variant_mm":"M","Label_variant_dd":"D","Label_date_error":"Verifique a data","Label_Invalid_date":"Data inválida","Label_variant_hh":"Hh","Label_variant_min":"MILÍMETROS","Label_Person_QueryNewOrder":"Confirme para criar um novo pedido","Label_Button_CreateNewOrder":"Crie uma nova pessoa à Ordem","Label_Snackbar_DataSaved":"Os dados são salvos","Label_Snackbar_Error":"Um erro de sistema ocorreu!","Nav_DropDownItem_NewOrder":"Nova ordem","Entity_Label_Field_countryofjurisdiction":"País de jurisdição","Entity_Label_Motherboard":"Placa -mãe","Label_Livestream":"Transmissão ao vivo","Label_Order_Entity":"Ordem ao vivo da transmissão","Label_Person_Entity":"Pessoa ao vivo","Label_Livestream_Last":"Últimos eventos","Label_PerformedBy":"Executado por","Label_All_Livestream":"Mais recente","Label_Ordercard_CurrentOrders":"Ordens","Label_Ordercard_Subheader":"Ordens atuais","Label_MothercheckPerformed":"Verificação da mãe realizada","Label_Motherchecks":"Monitorando os valores -chave na plataforma Aurora","Label_Motherchecks_sublabel":"Lista de verificação da mãe","Label_mothercheck_details":"Os detalhes da verificação da mãe","Label_Mothercheck_info":"Informações da verificação da mãe","Label_Button_OK":"OK","Entity_Label_Field_current_ssn_error":"Número da organização é erro","Label_Search_Toolbar":"PersonId","Label_MessageCheck":"Mensagens","Label_MessageCheck_sublabel":"Lista de status de validação","Label_messagePerformed":"Realizou cheques","Validate_mandatory_field":"Campo obrigatório","Validate_mandatory_field_objective":"Este campo deve ser preenchido","Validate_mandatory_field_resolution":"Preencha o campo","Label_Snackbar_ValidationOrderError":"Erro de validação em ordem","Label_Snackbar_OrderProcessed":"O pedido foi processado","Validate_Birth date_ok_title":"Data de nascimento Campo OK","Validate_Birth date_error_title":"A data de nascimento tem um erro","Validate_gender_ok_title":"Campo de gênero OK","Validate_gender_error_title":"Gênero tem um erro","Validate_name_error_title":"Pelo menos um nome deve estar presente em ordem","Validate_name_ok_title":"Nome Verifique ok","Label_Person_RestoreThisOrder":"Restaurar o último conjunto de mudanças","Label_Button_RestoreOrder":"Restaurar","Entity_Restore_Order":"Restaurar a ordem","Entity_Process_Order":"Ordem do processo","Label_message_details":"Descrição","Validate_pepcountry_ok_title":"Cheque de país pep ok","Validate_pepcountry_error_title":"Pelo menos um país pep deve ser selecionado","Validate_SSN_ok_title":"Ssn ok","Validate_SSN_error_title":"SSN ausente","Label_Card_Role":"Papel","Label_Card_Relation":"Relação","Label_Card_Core":"Essencial","Label_Card_SSN":"Ssn","Label_Card_Address":"Endereço","Label_Card_URI":"Uri","Label_Card_Name":"Nome","Label_Card_Order":"Ordem","Validate_nametype_primary_objective":"EN Order måste ha ett primärt namn","Nav_DropDownItem_Orderdashboard":"Order Painel","Entity_Label_SearchPerson":"Pessoa de pesquisa","Entity_Label_SearchPerson_Firstname":"Primeiro nome","Entity_Label_SearchPerson_Lastname":"Sobrenome","Entity_Label_SearchPerson_SSNNumber":"SSN sueco","Entity_Label_SearchPerson_Birth date":"Data de nascimento","Entity_Label_SearchPerson_Year":"Ano","Entity_Label_SearchPerson_Month":"Mês","Entity_Label_SearchPerson_Day":"Dia","Entity_Label_NameValues":"Nomes","Entity_Label_SearchDates":"Datas","Entity_Label_PEPRCA":"Defina Pep e/ou RCA","Entity_Label_Button_Find":"Procurar","Entity_Label_SelectListCountries":"Selecione os países da lista","Entity_List_Link":"Pessoa","Entity_List_SSN":"Número da Segurança Social","Entity_List_FirstName":"Primeiro nome","Entity_List_LastName":"Sobrenome","Entity_List_Gender":"Gênero","Entity_List_PEP":"Pep","Entity_List_RCA":"RCA","Entity_List_Details":"Mostre mais","Entity_Label_Mandatory":"Campo obrigatório","Entity_Label_Button_Back":"Voltar","Entity_Label_Button_Close":"Fechar","Entity_List_Birth date":"Data de nascimento","Entity_List_NameType":"Tipo de nome","Entity_List_Role":"Papel","Entity_List_RoleCategory":"Categoria de função","Entity_List_RoleCategoryDetails":"Categoria detalhada","Entity_List_FromDate":"Data de início","Entity_List_ThroughDate":"Até a data","Entity_List_Active":"Status de função","Entity_List_Type":"Tipo de nome","Entity_List_Name":"Nome","Entity_List_Description":"Descrição","Entity_List_CountryOfJurisdiction":"País de jurisdição","Label_Snackbar_NoData":"Nenhuma pessoa combina com a consulta","Entity_Label_FieldCountryListSimple_All":"Todos os países","Entity_List_SearchBySSN":"Match SSN","Entity_Details":"Detalhes","Entity_Names":"Nomes","Entity_Roles":"Papéis","Entity_Relations":"Relações","Entity_Label_AddCompanyUser":"Adicionar usuário","Entity_Label_AddUser_Email2":"Digite o email","Entity_Label_AddUser_Email":"E-mail","Entity_Label_AddUser_Name":"Nome","Entity_UsersList_InactiveMembersTitle":"Membros inativos","Entity_UsersList_MembersTitle":"Membros","Entity_UsersList_AdminsTitle":"Administradores","Entity_UsersList_Deactivate":"Desativar","Entity_UsersList_Activate":"Ativar","Entity_UsersList_Name":"Nome","Entity_UsersList_Email":"E-mail","Entity_UsersList_Dialog_Activate":"Ativar o usuário?","Entity_UsersList_Dialog_Deactivate":"Desativar o usuário?","Entity_UsersList_Dialog_Cancel":"Cancelar","Entity_UsersList_Dialog_Confirm":"Confirme","Entity_Validation_MandatoryField":"Por favor, preencha um campo obrigatório","Entity_Validation_MatchErrorField":"Os valores não correspondem a {$ field}","Entity_UsersList_Active":"Status","Entity_UserList_Pic":"Perfil","Nav_DropDownItem_AdminCompanyPersons":"Gerenciar contas comerciais","Entity_List_Avatar":"#","Nav_DropDownItem_Finnish":"Finlandês","Nav_DropDownItem_Danish":"Dinamarquês","Nav_DropDownItem_Norweigan":"Norweigan","Label_ordersbystate_sublabel":"Ordens por estado","Entity_Delete_Relation":"Exclua essa relação","Entity_Delete_Role":"Exclua esse papel","Label_Person_Delete_Orde":"Confirme para excluir o item","Label_Button_ConfirmDelete":"Excluir ordem","Nav_DropDownItem_Icleandic":"Islândia","Entity_Label_Field_ContactUs_Title":"Contate-nos","Entity_Label_Field_ContactUs_Name":"Nome","Entity_Label_Field_ContactUs_Email":"Endereço de email","Entity_Label_Field_ContactUs_Email2":"Repita o endereço de e-mail","Entity_Label_Field_ContactUs_Phone":"Telefone","Entity_Label_Field_ContactUs_Content":"Mensagem","Entity_Label_Button_ContactUs_Submit":"Enviar","Entity_Label_Button_ContactUs_Cancel":"Cancelar","Entity_Label_Field_ContactUs_Waltercheck":"Responda à pergunta","Entity_Validation_MandatoryField_Name":"Nome","Entity_Validation_MandatoryField_Email":"E-mail","Entity_Validation_MandatoryField_Message":"Mensagem","Nav_DropDownItem_About":"Sobre aurora","Entity_FileareaList_AdminsTitle":"Área de arquivo","Entity_FileareaList_Download":"Download","Entity_FileareaList_Name":"Nome do arquivo","Nav_DropDownItem_Filearea":"Área de arquivo","Entity_Label_Field_ContactUs_Success":"Sua mensagem foi enviada. Obrigado.","Entity_Label_Field_ContactUs_Fail":"Problema de enviar a mensagem. Por favor, tente novamente mais tarde.","Entity_Label_Download_Success":"A transferência de arquivos começou","Label_LoginForm_GoHome":"Voltar para a página principal","Nav_DropDownItem_Login":"Conecte-se","Label_Content_Help":"Ajuda na pesquisa?","Entity_Details_Address":"Endereço","Entity_List_Address":"Endereço postal","Entity_List_Address2":"Endereço postal 2","Entity_List_HouseNumber":"Número da casa","Entity_List_PostalCity":"Cidade","Entity_List_ZipCode":"CEP","Entity_List_PostalCountry":"País","Label_Person_Delete_Order":"Excluir ordem","Entity_List_RelationType":"Tipo de relação","Entity_List_RelationDescription":"Descrição da relação","Entity_List_BirthDate":"Data de nascimento","Label_EntityIsUpdated":"Última mudança","Entity_AuroraID":"Aurora ID","Label_RoleIsActive":"Ativo","Label_RoleIsInActive":"Inativo","Label_Button_Clear":"Claro","Label_Button_Filter":"Filtro","Label_Button_Search":"Procurar","Label_NoSearchPerfomed":"Nenhum resultado de pesquisa. A pesquisa foi realizada","Entity_List_OpenRelation":"Vá para uma pessoa relacionada","Label_Welcome":"Bem-vindo","Label_Country_Sweden":"Suécia","Label_Country_Denmark":"Dinamarca","Label_Country_Finland":"Finlândia","Label_Country_Norway":"Noruega","Nav_DropDownItem_Settings":"Configurações","Nav_DropDownItem_ChangePassword":"Alterar a senha","Nav_DropDownItem_Darkmode":"Mudar tema","Nav_DropDownItem_Contact":"Contate-nos","Label_SearchAppName":"AURORA POD","Label_Tooltip_ThemeDark":"Use tema sombrio","Label_Tooltip_ThemeLight":"Use o tema da luz","Label_Tooltip_Settings":"Configurações","Label_Tooltip_Contact":"Contate-nos","Label_Tooltip_Filearea":"Fileareia","Label_Tooltip_HandleUsers":"Gerenciar contas comerciais","Entity_Label_SetPassWord":"Salve nova senha","Label_RegisterForm_Password":"Senha","Tooltip_RegisterForm_Password":"Pelo menos 8 caracteres","Label_RegisterForm_PasswordConfirm":"Confirme sua senha","Tooltip_RegisterForm_PasswordConfirm":"Escreva novamente para confirmar a senha","Label_PasswordChanged":"Senha alterada","Label_Password_Guidelines":"A corda deve conter pelo menos 1 caráter alfabético minúsculo, pelo menos 1 caráter alfabético em maiúsculas, pelo menos 1 caráter numérico e pelo menos um personagem especial. A string deve ter oito caracteres ou mais","Button_Password_Save":"Salve nova senha","Error_RegisterForm_Password":"Erro de formato de senha","Error_RegisterForm_PasswordMatch":"Senha não corresponde","Label_LoginForm_Account":"Nome da conta","Label_LoginForm_AccountPlaceholder":"Digite o nome da sua conta","Denmark":"Dinamarca","Sweden":"Suécia","Finlan":"Finlan","Norway":"Noruega","Entity_Label_Error_canPerformSSNSearchFalse":"Você precisa combinar a pesquisa do SSN com o primeiro e o sobrenome","Confirm_you_want_to_remove_user_from_Company":"Confirme que deseja remover o usuário da empresa.","ButtonRemoveUser":"Remova o usuário","ButtonCancel":"Cancelar","Titel_Delete_User":"Remova o usuário","User_already_exists_Contact_support":"Usuário já existe. Entre em contato com o suporte se precisar de ajuda para relacionar esse usuário com esta empresa.","SSN_format_error":"Digite o número do Seguro Social no formato yyyymmdd-xxxx","Label_Content_Cookie":"Sobre cookies","time_indicator":"No tempo","January":"Janeiro","February":"Fevereiro","March":"Marchar","April":"Abril","May":"Poderia","June":"Junho","July":"Julho","August":"Agosto","September":"Setembro","October":"Outubro","November":"Novembro","December":"Dezembro","Nav_DropDownItem_Livestream":"Intercom","Label_MyChatChannels":"Canais","Label_MyChatChannelsMostRecent":"Mais recente","Link_Login_Registe":"Juntar","Label_Onboarding_Password":"Digite a senha","Label_Onboarding_PasswordAgain":"Coloque a senha novamente","Nav_DropDownItem_MCC":"Painel","Entity_Label_Filter":"Filtro","Nav_DropDownItem_MCCDashBoard":"Dashboard","Nav_DropDownItem_PODView":"POD view","Label_AppName":"Aurora","Nav_DropDownItem_Profilesettings":"Configurações de perfil","Nav_DropDownItem_Databrowser":"Navegador de dados","Nav_DropDownItem_Suspence":"Suspence","Nav_DropDownItem_OrderHistory":"Histórico de pedidos","Nav_DropDownItem_Alarmlist":"Lista de alarme","Label_LoginForm_UsernamePlaceholder":"Nome de usuário","Label_LoginForm_Username":"Nome de usuário","Nav_DropDownItem_MCCPOD":"POD","Nav_DropDownItem_MCCGateways":"Gateways","Nav_DropDownItem_MCCSensors":"Sensores","Nav_DropDownItem_MCCEnergy":"Energia","Nav_DropDownItem_MCCPower":"Poder","Nav_DropDownItem_MCCVolume":"Volume","Table_Column_entity_class":"Entidade","Table_Column_point_class":"Apontar","Table_Column_brickSensorClass":"Brick sensor class","Table_Column_gatewayClassId":"Gateway class","Table_Column_time_read_string":"Leia o registro de data e hora","Table_Column_gatewayId":"Gateway ID","Table_Column_lastKnownValue":"Último valor conhecido","Table_Column_write_time_string":"Os dados foram salvos","Table_Column_point_id":"Apontar","Table_Column_brickSensorClassQuantity":"Brick sensor Quantity","Table_Column_timestamp_read":"Leia o registro de data e hora","Table_Column_transformedElement":"Parâmetro do objeto de dispositivo","Table_Column_processStatus":"Status do processo","Table_Column_command":"Comando","Nav_DropDownItem_Agents":"Agents","Nav_DropDownItem_Events":"Dados","Nav_DropDownItem_Ontology":"Ontologia","Table_Column_Ontotology_Name":"Nome","Table_Column_Ontotology_Description":"Descrição","Table_Column_Ontotology_Foldername":"Nome da pasta","Table_Column_Ontotology_Ontology":"Ontologia","Table_Column_Ontotology_Superclass":"Superclass","Table_Column_Ontotology_Type":"Tipo","Table_Column_Ontotology_Updated":"Atualizada","Table_Column_Ontotology_UpdatedAsDateString":"Atualizado como string","Table_Column_topic":"Topic","Nav_DropDownItem_Edit":"Editar","Nav_DropDownItem_SensorMapping":"Mapeamento do sensor","Nav_DropDownItem_EditModel":"Data tree","Nav_DropDownItem_ExportCenter":"Export center","Nav_DropDownItem_Meters":"Metros","Button_RegisterForm_Register":"Registrar uma nova conta","Label_iHaveAnAccount_Login":"Eu já tenho uma conta","Label_RegisterForm_Register":"Registrar uma nova conta","Label_RegisterForm_RegisterInfo":"Registre uma nova conta para usar o serviço","Label_RegisterForm_Name":"Nome da sua conta","Tooltip_RegisterForm_Name":"O nome da sua conta","Label_RegisterForm_Voucher":"Comprovante","Tooltip_RegisterForm_Voucher":"Digite o voucher que você recebeu para registrar a conta","Label_RegisterForm_Email":"E-mail","Tooltip_RegisterForm_Email":"Digite um e-mail para sua conta","Error_RegisterForm_Name":"Você precisa dar um nome à sua conta","Error_RegisterForm_Voucher":"Por favor, insira o voucher para criar a conta","Error_RegisterForm_Email":"Por favor, insira um e-mail para a conta"});Package['universe:i18n'].i18n._ts = Math.max(Package['universe:i18n'].i18n._ts, 1708695287714);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"sv.i18n.yml.js":function module(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// i18n/core/sv.i18n.yml.js                                                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Package['universe:i18n'].i18n.addTranslations('sv','',{"language":"sv","LINE02":"LINE02","Header_Login_Login":"Logga in","Nav_DropDownItem_English":"Engelsk","Nav_DropDownItem_Swedish":"Svenska","Nav_DropDownItem_Help":"Hjälp","Nav_DropDownItem_Chat":"Chatt","Nav_DropDownItem_Logout":"Logga ut","Nav_DropDownItem_Profile":"Profil","Nav_DropDownItem_Orders":"Order","Header_Login_EnterHint":"Skriv användarnamn och lösenord","Link_Login_ForgotPassword":"Glömt ditt lösenord?","Link_Login_CreateAccount":"Skapa ett konto","Label_LoginForm_Email":"E-post","Label_LoginForm_EmailPlaceholder":"E-post","Label_LoginForm_EmailValidationError":"Ange en giltig e-postadress.","Label_LoginForm_Password":"Lösenord","Label_LoginForm_PasswordPlaceholder":"Ange ditt lösenord","Label_LoginForm_PasswordValidationError":"Det lösenordet är för kort","Button_LoginForm_Login":"Logga in","Header_ForgotPassword_Password":"Glömt ditt lösenord","Header_ForgotPassword_EnterHint":"Ange din e-postadress så skickas ett nytt lösenord till dig.","Header_ForgotPassword_Remember":"Kommer du ihåg ditt lösenord?","Link_ForgotPassword_Login":"Logga in","Label_ForgotPassword_Email":"E-postadress","Label_ForgotPassword_EmailPlaceholder":"Här anger du din e -postadress.","Label_ForgotPassword_EmailValidationError":"Ange en giltig e -postadress.","Button_ForgotPassword_Login":"Skicka ett nytt lösenord","Button_ForgotPassword_Save":"Skicka ett nytt lösenord","Header_SetPassword_Password":"Ange ett nytt lösenord","Header_SetPassword_EnterHint":"Ange ditt lösenord två gånger","Link_SetPassword_Cancel":"Annullera","Label_SetPassword_Label":"Lösenord","Label_SetPassword_ConfirmLabel":"Bekräfta lösenord","Label_SetPassword_MinLengthValidationError":"Lösenordet är för kort (minimum {$minlängd} tecken)","Label_SetPassword_MismatchValidationError":"Lösenordet matchar inte","Button_SetPassword_Save":"Spara","Email_SiteName_Text":"Aurora","Email_From_Text":"Hello@tritonite.io","Email_ResetPassword_Subject":"Återställ ditt lösenord","Label_List_Month":"De senaste 30 dagarna","Label_List_Old":"Äldre än 30 dagar","Label_List_Today":"I dag","Label_List_Week":"De senaste sju dagarna","Label_List_Yesterday":"I går","Label_Chat_Placeholder_Send":"Meddelande","Label_Chat_Placeholder_Send_Label":"Nytt meddelande","Label_Ordercard_Meta":"Metavärden","Label_Ordercard_Persondata":"Persondata","Label_Ordercard_Persondata_url":"Bild på personen","Label_Ordercard_Postaddress":"Postadress","Label_Ordercard_Roles":"Roller","Label_Ordercard_Relation":"Relation","Label_Ordercard_Notes":"Anteckningar","Label_Ordercard_Audit":"Granska","Entity_Label_Field_order_process_method":"Processmetod","Entity_Label_Field_order_type_name":"Ordertyp","Entity_Label_state_name":"Orderstatus","Entity_Label_state_description":"Orderstatus","Entity_Label_Orderid":"Beställnings -ID","Entity_Label_Title":"Titel","Entity_Label_Nid":"Id","Entity_Label_Created":"Skapad","Entity_Label_Changed":"Ändrats","Entity_Label_Field_pep":"Är en pep","Entity_Label_Field_current_ssn":"Ssn","Entity_Label_Field_ssntype":"SSN -typ","Entity_Label_Field_Birth date":"Födelsedatum","Entity_Label_Field_postaladdress":"Postadress","Entity_Label_Field_postaladdress2":"Postadress 2","Entity_Label_Field_housenumber":"Hus nummer","Entity_Label_Field_postalcity":"Poststad","Entity_Label_Field_zipcode":"Postnummer","Entity_Label_Field_firstname":"Förnamn","Entity_Label_Field_lastname":"Efternamn","Entity_Label_Field_name_type":"Namntyp","Entity_Label_Field_postalcountry":"Postkv","Entity_Label_Field_personid":"Person ID (klassiker)","Entity_Label_Field_person":"Personreferens (NID)","Entity_Label_Field_person_relation":"Personförhållande","Entity_Label_Field_relation_description":"Beskrivning","Entity_Label_Field_period_value":"Start datum","Entity_Label_Field_period_value2":"Till datum","Entity_Label_Field_country_of_jurisdiction":"Jurisdiktion","Entity_Label_Field_is_active":"Är aktiv person","Entity_Label_Field_role_description":"Rollbeskrivning","Entity_Label_Field_organisation":"Organisation","Entity_Label_Field_organisation_number":"Organisationsnummer","Entity_Label_Field_notes":"Notera","Entity_Label_Field_detailed_role_categories":"Detaljerad kategori","Entity_Label_Field_gender":"Kön","Entity_Label_Field_whom":"Vem","Entity_Label_Field_what":"Vad","Entity_Label_Field_when":"När","Entity_Label_Field_url":"Url","Nav_DropDownItem_Articles":"Artiklar","Nav_DropDownItem_Snippets":"Stång","Nav_DropDownItem_Labels":"Etiketter","Nav_DropDownItem_Configuration":"Konfiguration","Label_podview_articles_master_title":"Artiklar","Label_podview_articles_master_id":"Id","Label_podview_articles_master_typeOfArticle":"Typ av artikel","Label_podview_articles_master_title1":"Titel","Label_podview_articles_master_ingress":"Inträde","Label_podview_articles_master_language":"Språk","Label_podview_articles_master_revision":"Revision","Label_podview_articles_master_status":"Dokumentstatus","Label_podview_articles_master_updatedAt":"Uppdaterad","Label_podview_articles_master_version":"Version","Label_podview_articles_master_publish_status":"Publicera status","Nav_DropDownItem_Tags":"Taggar","Nav_DropDownItem_NewDocument":"Ny dokument","Label_podview_articles_master_status6":"Status","Label_podview_articles_master_status7":"Status","Label_podview_articles_master_status8":"Status","Label_podview_articles_master_status9":"Status","Label_podview_articles_master_status10":"Status","Label_podview_articles_master_status11":"Status","Label_podview_articles_master_status12":"Status","Label_podview_articles_master_status13":"Status","Label_podview_articles_master_status14":"Status","Label_podview_articles_master_status15":"Status","Label_podview_articles_master_status16":"Status","Label_podview_articles_master_status17":"Status","Label_podview_articles_master_status18":"Status","Label_podview_articles_master_status19":"Status","Nav_DropDownItem_Persons":"Sökperson","Label_Button_Edit":"Redigera","Label_Button_Create":"Skapa","Label_Button_Save":"Spara","Label_Button_Delete":"Radera","Label_Button_Update":"Uppdatering","Label_Button_Cancel":"Annullera","Label_Autoupdate":"Direktuppdatering","Label_Button_Add":"Lägg till","Label_Button_Remove":"Avlägsna","Label_Ordercard_Personnames":"Namn","Label_Ordercard_Personssn":"Ssn","Entity_Label_Field_description":"Om denna beställning","Label_Button_UpdateOrderState":"Uppdateringsorder","Label_Button_CancelOrder":"Avbryta beställningen","Entity_Label_Field_deactivationdate":"Deaktiveringsdatum","Entity_Label_Field_is_deceased":"Den avlidne","Entity_Label_Field_deceased_date":"Avliden datum","Entity_Label_Field_name_type_remove_item":"Ta bort namnet?","Entity_Label_Field_remove_item_text":"Vill du verkligen ta bort det här objektet?","Label_Ordercard_PersonSSN":"Person SSN -nummer","Entity_Label_Field_ssn_remove_item":"Ta bort SSN -objektet?","Entity_Label_Field_pepcountry":"Pepland","Entity_Label_FieldCountryOfJurisdiction_Denmark":"Danmark","Entity_Label_FieldCountryOfJurisdiction_Sweden":"Sverige","Entity_Label_FieldCountryOfJurisdiction_Norway":"Norge","Entity_Label_FieldCountryOfJurisdiction_Finland":"Finland","Entity_Label_Field_is_active_role":"Är aktiv roll","Label_Button_NewRole":"Lägg till en ny roll","Label_Button_RemoveRole":"Radera","Entity_Label_Item_id":"Id","Entity_Label_Field_Role_remove_item":"Ta bort rollen från ordning?","Label_Button_NewRelation":"Lägg till ny relation","Entity_Label_Field_Relation_remove_item":"Ta bort relationen från ordning?","Label_Button_RemoveRelation":"Ta bort relationen","Label_Ordercard_Relations":"Relation","Entity_Label_Field_relation":"Relationstyp","Entity_Label_Field_Category":"Rollkategori","Entity_Label_Role_description_type":"Rollbeskrivning Typ","Entity_Label_Search":"Sök","Label_Orders_Search":"Sökperson eller beställning","Table_OrderList_Column_Name":"Beställnings -ID","Table_OrderList_Column_Status":"Status","Table_OrderList_Column_OrderType":"Typ","Table_OrderList_Column_ModifiedBy":"Ändrats","Entity_Label_Person_Card":"Persondata","Entity_Label_Personid":"Person id klassiker","Label_OpenOrderListItem_Languages":"Välj språk","Label_Button_ChangeData":"Ändra data","Label_Ordercard_PersonOrders":"Personbeställning","Label_Button_Create_Order":"Skapa beställning","Label_Person_Save_Order":"Plese Ange en kommentar för beställningen och tryck på spara","TIMEAGO_INIT_STRING":"För","Entity_Create_Order":"Skapa beställning","Table_searchpersonList_Column_ID":"Id","Table_searchpersonList_Column_FirstName":"Förnamn","Table_searchpersonList_Column_LastName":"Efternamn","Table_searchpersonList_Column_PEPRCA":"Pep / rca","Table_searchpersonList_Column_Country":"Land","Table_searchpersonList_Column_Role":"Detaljerad roll","Table_searchpersonList_Column_Relation":"Relation","Table_searchpersonList_Column_Organisation":"Organisation","RelationshipWithPersonIs":"Till","Label_searchpersons_Search":"Ange värde och tryck på Enter","Label_PersonView":"Personvy","Label_RoleView":"Rollvy","RelationshipWithPersonIsDaughterInLaw":"Svärdotter till","RelationshipWithPersonIsSonInLaw":"Svärson till","RelationshipWithPersonIsDoughter":"Degare till","RelationshipWithPersonIsSon":"Son till","RelationshipWithPersonIsMotherInLaw":"Svärmor till","RelationshipWithPersonIsFatherInLaw":"Svärfar till","RelationshipWithPersonIsMother":"Till","RelationshipWithPersonIsFather":"Far till","RelationshipWithPersonIsPartner":"Samarbeta med","RelationshipWithPersonIsCoworker":"Kollega med","Table_SearchResultForString":"Resultat för sökningString","Table_SearchResultTimeLaps":"Sökte in","Table_searchpersonList_Column_RoleDescription":"Rollbeskrivning","Table_searchpersonList_Column_MainRole":"Huvudroll","Label_LoginForm_LdapError":"Ditt användarid eller lösenord är inte korrekt. Var god försök igen","Table_searchpersonList_Column_SSN":"Född","Label_ShowAllRoles":"Visa alla roller","Entity_Label_Version_Card":"Versioner","Table_searchpersonList_Column_Birth date":"Födelsedatum","Label_DistinctRoles":"Distinkt rollpresenning","Form_Current_RoleSearch":"Rollöknyckel (taxonomi)","Form_NumberOfActivePersons":"Antal aktiva personer","Form_NumberOfNoneActivePersons":"Antal inaktiva personer","Form_NumberOfPersons":"Antal personer","Form_NumberOfActiveRoles":"Antal aktiva roller","Label_ResetSearch":"Ny sökning","Entity_Label_Field_SSN":"Personnummer","Entity_Label_field_names":"Namn","Label_Button_Create_NewPersonOrder":"Skapa ny person","Entity_Label_Field_personname":"Person","Entity_Label_field_type_label":"Personstypetikett","Entity_Label_field_personid":"PersonID (klassiker)","Entity_Label_GoTo_Person":"Goto person","Entity_Label_Field_is_active_relation":"Aktiv relation","Form_NumberOfTotalRoles":"Rader i bordet","Form_NumberOfNoneActive":"Inga aktiva rader","Label_variant_yy":"Y","Label_variant_mm":"M","Label_variant_dd":"D","Label_date_error":"Kontrollera datum","Label_Invalid_date":"Ogiltigt datum","Label_variant_hh":"Hh","Label_variant_min":"Mm","Label_Person_QueryNewOrder":"Bekräfta för att skapa en ny beställning","Label_Button_CreateNewOrder":"Skapa ny personordning","Label_Snackbar_DataSaved":"Data sparas","Label_Snackbar_Error":"En systemfel inträffade!","Nav_DropDownItem_NewOrder":"Ny order","Entity_Label_Field_countryofjurisdiction":"Jurisdiktion","Entity_Label_Motherboard":"Moderkort","Label_Livestream":"Direktsändning","Label_Order_Entity":"Livestream order","Label_Person_Entity":"Livestream person","Label_Livestream_Last":"Sista evenemang","Label_PerformedBy":"Utförs av","Label_All_Livestream":"Senaste","Label_Ordercard_CurrentOrders":"Order","Label_Ordercard_Subheader":"Nuvarande beställningar","Label_MothercheckPerformed":"Mother Check utförd","Label_Motherchecks":"Övervakning av nyckelvärden i Aurora -plattformen","Label_Motherchecks_sublabel":"Modercheck -lista","Label_mothercheck_details":"Moderkontrolldetaljer","Label_Mothercheck_info":"Modercheckinfo","Label_Button_OK":"OK","Entity_Label_Field_current_ssn_error":"Organisationsnummer är fel","Label_Search_Toolbar":"Personid","Label_MessageCheck":"Meddelanden","Label_MessageCheck_sublabel":"Valideringsstatuslista","Label_messagePerformed":"Utförda kontroller","Validate_mandatory_field":"Obligatoriskt fält","Validate_mandatory_field_objective":"Detta fält måste fyllas i","Validate_mandatory_field_resolution":"Fylla i fältet","Label_Snackbar_ValidationOrderError":"Valideringsfel i ordning","Label_Snackbar_OrderProcessed":"Ordern har behandlats","Validate_Birth date_ok_title":"Födelsedatumfält ok","Validate_Birth date_error_title":"Födelsedatum har ett fel","Validate_gender_ok_title":"Könsfält ok","Validate_gender_error_title":"Kön har ett fel","Validate_name_error_title":"Minst ett namn måste vara närvarande i ordning","Validate_name_ok_title":"Namnkontroll ok","Label_Person_RestoreThisOrder":"Återställ den sista uppsättningen av ändringar","Label_Button_RestoreOrder":"Återställ","Entity_Restore_Order":"Återställa beställningen","Entity_Process_Order":"Processbeställning","Label_message_details":"Beskrivning","Validate_pepcountry_ok_title":"Pep country check ok","Validate_pepcountry_error_title":"Minst ett pep -land måste väljas","Validate_SSN_ok_title":"SSN OK","Validate_SSN_error_title":"SSN saknas","Label_Card_Role":"Roll","Label_Card_Relation":"Relation","Label_Card_Core":"Kärna","Label_Card_SSN":"Ssn","Label_Card_Address":"Adress","Label_Card_URI":"Uri","Label_Card_Name":"Namn","Label_Card_Order":"Beställa","Validate_nametype_primary_objective":"En order möke ha Ett primär namn","Nav_DropDownItem_Orderdashboard":"Beställ instrumentbräda","Entity_Label_SearchPerson":"Sökperson","Entity_Label_SearchPerson_Firstname":"Förnamn","Entity_Label_SearchPerson_Lastname":"Efternamn","Entity_Label_SearchPerson_SSNNumber":"Svensk SSN","Entity_Label_SearchPerson_Birth date":"Födelsedatum","Entity_Label_SearchPerson_Year":"År","Entity_Label_SearchPerson_Month":"Månad","Entity_Label_SearchPerson_Day":"Dag","Entity_Label_NameValues":"Namn","Entity_Label_SearchDates":"Datum","Entity_Label_PEPRCA":"Definiera Pep och/eller RCA","Entity_Label_Button_Find":"Sök","Entity_Label_SelectListCountries":"Välj Listländer","Entity_List_Link":"Person","Entity_List_SSN":"Personnummer","Entity_List_FirstName":"Förnamn","Entity_List_LastName":"Efternamn","Entity_List_Gender":"Kön","Entity_List_PEP":"Pep","Entity_List_RCA":"RCA","Entity_List_Details":"Visa mer","Entity_Label_Mandatory":"Obligatoriskt fält","Entity_Label_Button_Back":"Tillbaka","Entity_Label_Button_Close":"Stänga","Entity_List_Birth date":"Födelsedatum","Entity_List_NameType":"Namntyp","Entity_List_Role":"Roll","Entity_List_RoleCategory":"Rollkategori","Entity_List_RoleCategoryDetails":"Detaljerad kategori","Entity_List_FromDate":"Start datum","Entity_List_ThroughDate":"Till datum","Entity_List_Active":"Rollstatus","Entity_List_Type":"Namntyp","Entity_List_Name":"Namn","Entity_List_Description":"Beskrivning","Entity_List_CountryOfJurisdiction":"Jurisdiktion","Label_Snackbar_NoData":"Ingen person matchar frågan","Entity_Label_FieldCountryListSimple_All":"Alla länder","Entity_List_SearchBySSN":"SSN -match","Entity_Details":"Information","Entity_Names":"Namn","Entity_Roles":"Roller","Entity_Relations":"Relationer","Entity_Label_AddCompanyUser":"Lägg till användare","Entity_Label_AddUser_Email2":"Återinför e-post","Entity_Label_AddUser_Email":"E-post","Entity_Label_AddUser_Name":"Namn","Entity_UsersList_InactiveMembersTitle":"Inaktiva medlemmar","Entity_UsersList_MembersTitle":"Medlemmar","Entity_UsersList_AdminsTitle":"Administratörer","Entity_UsersList_Deactivate":"Avaktivera","Entity_UsersList_Activate":"Aktivera","Entity_UsersList_Name":"Namn","Entity_UsersList_Email":"E-post","Entity_UsersList_Dialog_Activate":"Aktivera användaren?","Entity_UsersList_Dialog_Deactivate":"Avaktivera användaren?","Entity_UsersList_Dialog_Cancel":"Annullera","Entity_UsersList_Dialog_Confirm":"Bekräfta","Entity_Validation_MandatoryField":"Fyll i ett obligatoriskt fält","Entity_Validation_MatchErrorField":"Värden matchar inte för {$fält}","Entity_UsersList_Active":"Status","Entity_UserList_Pic":"Profil","Nav_DropDownItem_AdminCompanyPersons":"Hantera affärskonton","Entity_List_Avatar":"#","Nav_DropDownItem_Finnish":"Finska","Nav_DropDownItem_Danish":"Dansk","Nav_DropDownItem_Norweigan":"Norweigan","Label_ordersbystate_sublabel":"Order efter stat","Entity_Delete_Relation":"Ta bort detta förhållande","Entity_Delete_Role":"Ta bort denna roll","Label_Person_Delete_Orde":"Bekräfta för att ta bort objektet","Label_Button_ConfirmDelete":"Ta bort beställning","Nav_DropDownItem_Icleandic":"Island","Entity_Label_Field_ContactUs_Title":"Kontakta oss","Entity_Label_Field_ContactUs_Name":"Namn","Entity_Label_Field_ContactUs_Email":"E-postadress","Entity_Label_Field_ContactUs_Email2":"Upprepa e-postadressen","Entity_Label_Field_ContactUs_Phone":"Telefon","Entity_Label_Field_ContactUs_Content":"Meddelande","Entity_Label_Button_ContactUs_Submit":"Skicka","Entity_Label_Button_ContactUs_Cancel":"Annullera","Entity_Label_Field_ContactUs_Waltercheck":"Svara på frågan","Entity_Validation_MandatoryField_Name":"Namn","Entity_Validation_MandatoryField_Email":"E-post","Entity_Validation_MandatoryField_Message":"Meddelande","Nav_DropDownItem_About":"Om Aurora","Entity_FileareaList_AdminsTitle":"Arkivområde","Entity_FileareaList_Download":"Ladda ner","Entity_FileareaList_Name":"Filnamn","Nav_DropDownItem_Filearea":"Arkivområde","Entity_Label_Field_ContactUs_Success":"Ditt meddelande har skickats. Tack.","Entity_Label_Field_ContactUs_Fail":"Problemet att skicka meddelandet. Vänligen försök igen senare.","Entity_Label_Download_Success":"Filöverföring påbörjades","Label_LoginForm_GoHome":"Tillbaka till huvudsidan","Nav_DropDownItem_Login":"Logga in","Label_Content_Help":"Hjälp med sökning?","Entity_Details_Address":"Adress","Entity_List_Address":"Postadress","Entity_List_Address2":"Postadress 2","Entity_List_HouseNumber":"Hus nummer","Entity_List_PostalCity":"Stad","Entity_List_ZipCode":"Postnummer","Entity_List_PostalCountry":"Land","Label_Person_Delete_Order":"Ta bort beställning","Entity_List_RelationType":"Relationstyp","Entity_List_RelationDescription":"Relationsbeskrivning","Entity_List_BirthDate":"Födelsedatum","Label_EntityIsUpdated":"Senast förändrades","Entity_AuroraID":"Aurora ID","Label_RoleIsActive":"Aktiva","Label_RoleIsInActive":"Inaktiv","Label_Button_Clear":"Klar","Label_Button_Filter":"Filtrera","Label_Button_Search":"Sök","Label_NoSearchPerfomed":"Inget sökresultat. Sökningen utfördes","Entity_List_OpenRelation":"Gå till närstående person","Label_Welcome":"Välkommen","Label_Country_Sweden":"Sverige","Label_Country_Denmark":"Danmark","Label_Country_Finland":"Finland","Label_Country_Norway":"Norge","Nav_DropDownItem_Settings":"Inställningar","Nav_DropDownItem_ChangePassword":"Ändra lösenord","Nav_DropDownItem_Darkmode":"Byta tema","Nav_DropDownItem_Contact":"Kontakta oss","Label_SearchAppName":"Aurora Pod","Label_Tooltip_ThemeDark":"Använd mörkt tema","Label_Tooltip_ThemeLight":"Använd lätt tema","Label_Tooltip_Settings":"Inställningar","Label_Tooltip_Contact":"Kontakta oss","Label_Tooltip_Filearea":"Filearea","Label_Tooltip_HandleUsers":"Hantera affärskonton","Entity_Label_SetPassWord":"Spara nytt lösenord","Label_RegisterForm_Password":"Lösenord","Tooltip_RegisterForm_Password":"Minst 8 tecken","Label_RegisterForm_PasswordConfirm":"Bekräfta lösenord","Tooltip_RegisterForm_PasswordConfirm":"Skriv igen för att bekräfta lösenordet","Label_PasswordChanged":"Lösenordet ändrat","Label_Password_Guidelines":"Strängen måste innehålla minst 1 gemensam alfabetisk karaktär, minst 1 versaler alfabetisk karaktär, minst 1 numerisk karaktär och åtminstone en speciell karaktär. Strängen måste vara åtta tecken eller längre","Button_Password_Save":"Spara nytt lösenord","Error_RegisterForm_Password":"Lösenordsformatfel","Error_RegisterForm_PasswordMatch":"Lösenordet matchar inte","Label_LoginForm_Account":"Kontonamn","Label_LoginForm_AccountPlaceholder":"Ange ditt kontonamn","Denmark":"Danmark","Sweden":"Sverige","Finlan":"Finlan","Norway":"Norge","Entity_Label_Error_canPerformSSNSearchFalse":"Du måste kombinera SSN -sökning med första och efternamn","Confirm_you_want_to_remove_user_from_Company":"Bekräfta att du vill ta bort användaren från företaget.","ButtonRemoveUser":"Ta bort användaren","ButtonCancel":"Annullera","Titel_Delete_User":"Ta bort användaren","User_already_exists_Contact_support":"Användare finns redan. Kontakta support om du behöver hjälp för att relatera den här användaren till det här företaget.","SSN_format_error":"Ange socialförsäkringsnummer i formatet yyyymmdd-xxxx","Label_Content_Cookie":"Om kakor","time_indicator":"Då","January":"Januari","February":"Februari","March":"Mars","April":"April","May":"Maj","June":"Juni","July":"Juli","August":"Augusti","September":"September","October":"Oktober","November":"November","December":"December","Nav_DropDownItem_Livestream":"Intercom","Label_MyChatChannels":"Kanal","Label_MyChatChannelsMostRecent":"Senaste","Link_Login_Registe":"Ansluta sig","Label_Onboarding_Password":"Skriv in lösenord","Label_Onboarding_PasswordAgain":"Ange lösenord igen","Nav_DropDownItem_MCC":"Instrumentbräda","Entity_Label_Filter":"Filtrera","Nav_DropDownItem_MCCDashBoard":"Dashboard","Nav_DropDownItem_PODView":"POD view","Label_AppName":"Aurora","Nav_DropDownItem_Profilesettings":"Profilinställningar","Nav_DropDownItem_Databrowser":"Datawebbläsare","Nav_DropDownItem_Suspence":"Suspence","Nav_DropDownItem_OrderHistory":"Beställningshistorik","Nav_DropDownItem_Alarmlist":"Larmlista","Label_LoginForm_UsernamePlaceholder":"Användarnamn","Label_LoginForm_Username":"Användarnamn","Nav_DropDownItem_MCCPOD":"POD","Nav_DropDownItem_MCCGateways":"Gateways","Nav_DropDownItem_MCCSensors":"Sensorer","Nav_DropDownItem_MCCEnergy":"Energi","Nav_DropDownItem_MCCPower":"Kraft","Nav_DropDownItem_MCCVolume":"Volym","Table_Column_entity_class":"Entitet","Table_Column_point_class":"Punkt","Table_Column_brickSensorClass":"Brick sensor class","Table_Column_gatewayClassId":"Gateway class","Table_Column_time_read_string":"Läs tidsstämpel","Table_Column_gatewayId":"Gateway ID","Table_Column_lastKnownValue":"Senast kända värde","Table_Column_write_time_string":"Data sparades","Table_Column_point_id":"Punkt","Table_Column_brickSensorClassQuantity":"Brick sensor Quantity","Table_Column_timestamp_read":"Läs tidsstämpel","Table_Column_transformedElement":"Enhetsobjektparameter","Table_Column_processStatus":"Processstatus","Table_Column_command":"Kommando","Nav_DropDownItem_Agents":"Agents","Nav_DropDownItem_Events":"Data","Nav_DropDownItem_Ontology":"Ontologi","Table_Column_Ontotology_Name":"Namn","Table_Column_Ontotology_Description":"Beskrivning","Table_Column_Ontotology_Foldername":"Mapp namn","Table_Column_Ontotology_Ontology":"Ontologi","Table_Column_Ontotology_Superclass":"Superklass","Table_Column_Ontotology_Type":"Typ","Table_Column_Ontotology_Updated":"Uppdaterad","Table_Column_Ontotology_UpdatedAsDateString":"Uppdaterad som sträng","Table_Column_topic":"Topic","Nav_DropDownItem_Edit":"Redigera","Nav_DropDownItem_SensorMapping":"Sensorkartläggning","Nav_DropDownItem_EditModel":"Data tree","Nav_DropDownItem_ExportCenter":"Export center","Nav_DropDownItem_Meters":"Mätare","Button_RegisterForm_Register":"Registrera ett nytt konto","Label_iHaveAnAccount_Login":"Jag har redan ett konto","Label_RegisterForm_Register":"Registrera ett nytt konto","Label_RegisterForm_RegisterInfo":"Registrera ett nytt konto för att använda tjänsten","Label_RegisterForm_Name":"Namnet du konto","Tooltip_RegisterForm_Name":"Namnet på ditt konto","Label_RegisterForm_Voucher":"Kupong","Tooltip_RegisterForm_Voucher":"Ange den kupong du fick för att registrera kontot","Label_RegisterForm_Email":"E-post","Tooltip_RegisterForm_Email":"Ange e-post för ditt konto","Error_RegisterForm_Name":"Du måste ge ditt konto ett namn","Error_RegisterForm_Voucher":"Ange kupongen för att skapa kontot","Error_RegisterForm_Email":"Ange ett e-postmeddelande för kontot"});Package['universe:i18n'].i18n._ts = Math.max(Package['universe:i18n'].i18n._ts, 1708695287715);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"tcomb":{"en.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// i18n/tcomb/en.js                                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.exportDefault({
  optional: ' (optional)',
  required: '',
  add: 'Add',
  remove: 'Remove',
  up: 'Up',
  down: 'Down'
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"sv.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// i18n/tcomb/sv.js                                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.exportDefault({
  optional: ' (valfri)',
  required: '',
  add: 'Foga',
  remove: 'Avlägsna',
  up: 'Upp',
  down: 'Ned'
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"wallaby.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// wallaby.js                                                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"debug.json":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// debug.json                                                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"package.json":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// package.json                                                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.exports = {
  "name": "aurora",
  "version": "0.5.27",
  "version_focus": "Pod",
  "version_build_date": "20240314",
  "description": "Aurora POD - Translation and Localization Management System",
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
    "@babel/runtime": "^7.20.1",
    "@date-io/date-fns": "^2.16.0",
    "@date-io/luxon": "^1.3.6",
    "@date-io/moment": "^1.0.2",
    "@emotion/react": "^11.11.4",
    "@emotion/styled": "^11.11.0",
    "@material-ui/core": "^4.12.4",
    "@material-ui/icons": "^4.11.3",
    "@material-ui/lab": "^4.0.0-alpha.61",
    "@material-ui/pickers": "^3.2.6",
    "@mui/icons-material": "^5.14.8",
    "@mui/lab": "^5.0.0-alpha.143",
    "@mui/material": "5.14.7",
    "@mui/styles": "5.14.6",
    "@mui/x-tree-view": "^6.17.0",
    "@react-spring/web": "^9.5.5",
    "animate.css": "^4.1.1",
    "babel-core": "^6.26.0",
    "babel-polyfill": "^6.26.0",
    "chalk": "^2.4.2",
    "classnames": "^2.3.2",
    "create-react-class": "^15.6.3",
    "date-fns": "^2.29.3",
    "dateformat": "^5.0.3",
    "domready": "^1.0.8",
    "echarts": "^4.7.0",
    "echarts-for-react": "^3.0.2",
    "es6-promisify": "^7.0.0",
    "file-saver": "^2.0.5",
    "formik": "^2.4.5",
    "immutability-helper": "^3.0.1",
    "intl": "^1.2.5",
    "intl-locales-supported": "^1.0.0",
    "javascript-time-ago": "^2.5.9",
    "linq": "^3.1.1",
    "lodash": "^4.17.21",
    "ltxml": "github:jthuraisamy/ltxml",
    "luxon": "^1.8.2",
    "mantra-core-extra": "^1.8.2",
    "material-ui-image": "^3.2.2",
    "material-ui-pickers": "^2.2.4",
    "meteor-babel": "^7.1.6",
    "meteor-node-stubs": "^0.4.1",
    "moment": "^2.29.4",
    "node-fetch": "^3.3.2",
    "pixl-xml": "^1.0.7",
    "prop-types": "^15.8.1",
    "react": "^18.2.0",
    "react-autosuggest": "^9.3.4",
    "react-bootstrap": "^0.30.2",
    "react-clock": "^4.0.0",
    "react-country-flag": "^3.0.2",
    "react-dom": "^18.2.0",
    "react-draggable-list": "^3.4.0",
    "react-gravatar": "^2.6.3",
    "react-iframe": "^1.8.5",
    "react-input-mask": "^2.0.4",
    "react-komposer": "1.13.1",
    "react-markdown": "^9.0.1",
    "react-mounter": "^1.2.0",
    "react-select": "^5.6.1",
    "react-simple-di-extra": "^1.3.4",
    "react-speech": "^1.0.2",
    "react-spring": "^9.5.5",
    "react-sticky": "^6.0.3",
    "react-swipeable-views": "^0.12.8",
    "react-syntax-highlighter": "^15.5.0",
    "react-tagsinput": "3.8.1",
    "react-text-mask": "^5.4.3",
    "react-timer-mixin": "^0.13.4",
    "react-tiny-link": "^3.6.1",
    "react-transition-group": "^4.1.1",
    "react-trianglify": "^3.0.3",
    "react-world-flags": "^1.5.1",
    "require": "^2.4.20",
    "rss-parser": "^3.13.0",
    "showdown": "^2.1.0",
    "tcomb-form": "^0.9.21",
    "throttle-debounce": "^1.0.1",
    "trianglify": "^4.1.1",
    "unist-util-visit-parents": "^6.0.1",
    "vfile": "^6.0.1",
    "xlsx": "^0.18.5",
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},{
  "extensions": [
    ".js",
    ".json",
    ".mjs",
    ".jsx",
    ".i18n.yml"
  ]
});

require("/server/lib/drupal/services.js");
require("/server/lib/fileManager/filemanager.js");
require("/lib/transformers/dateStringTransformer.js");
require("/server/lib/adminrole.js");
require("/server/lib/chat.js");
require("/server/lib/chatroom.js");
require("/server/lib/notices.js");
require("/server/lib/order.js");
require("/server/lib/workgroup.js");
require("/lib/collections.js");
require("/lib/constants.js");
require("/lib/log.js");
require("/lib/random.js");
require("/lib/user.js");
require("/i18n/core/da.i18n.yml.js");
require("/i18n/core/en.i18n.yml.js");
require("/i18n/core/es.i18n.yml.js");
require("/i18n/core/fi.i18n.yml.js");
require("/i18n/core/no.i18n.yml.js");
require("/i18n/core/pt.i18n.yml.js");
require("/i18n/core/sv.i18n.yml.js");
require("/i18n/tcomb/en.js");
require("/i18n/tcomb/sv.js");
require("/server/configs/app.js");
require("/server/configs/initial_adds.js");
require("/server/configs/initial_users.js");
require("/server/methods/_users.js");
require("/server/methods/account.js");
require("/server/methods/agents.js");
require("/server/methods/chatlinelists.js");
require("/server/methods/chatrooms.js");
require("/server/methods/contact.js");
require("/server/methods/content.js");
require("/server/methods/events.js");
require("/server/methods/filearea.js");
require("/server/methods/index.js");
require("/server/methods/log.js");
require("/server/methods/nodes.js");
require("/server/methods/notices.js");
require("/server/methods/orders.js");
require("/server/methods/search.js");
require("/server/methods/sycorax.js");
require("/server/methods/systemconfig.js");
require("/server/methods/workorders.js");
require("/server/publications/_users.js");
require("/server/publications/agents.js");
require("/server/publications/articles.js");
require("/server/publications/chatlines.js");
require("/server/publications/chatrooms.js");
require("/server/publications/contents.js");
require("/server/publications/index.js");
require("/server/publications/links.js");
require("/server/publications/mcc_config.js");
require("/server/publications/notices.js");
require("/server/publications/programs.js");
require("/server/publications/secrets.js");
require("/server/publications/sensor-mapping.js");
require("/server/publications/signalstate.js");
require("/server/publications/workorders.js");
require("/server/routes.js");
require("/wallaby.js");
require("/server/main.js");
//# sourceURL=meteor://💻app/app/app.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL2xpYi9kcnVwYWwvc2VydmljZXMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9saWIvZmlsZU1hbmFnZXIvZmlsZW1hbmFnZXIuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9saWIvYWRtaW5yb2xlLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbGliL2NoYXQuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9saWIvY2hhdHJvb20uanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9saWIvbm90aWNlcy5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL2xpYi9vcmRlci5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL2xpYi93b3JrZ3JvdXAuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9jb25maWdzL2FwcC5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL2NvbmZpZ3MvaW5pdGlhbF9hZGRzLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvY29uZmlncy9pbml0aWFsX3VzZXJzLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWV0aG9kcy9fdXNlcnMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9tZXRob2RzL2FjY291bnQuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9tZXRob2RzL2FnZW50cy5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL21ldGhvZHMvY2hhdGxpbmVsaXN0cy5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL21ldGhvZHMvY2hhdHJvb21zLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWV0aG9kcy9jb250YWN0LmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWV0aG9kcy9jb250ZW50LmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWV0aG9kcy9ldmVudHMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9tZXRob2RzL2ZpbGVhcmVhLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWV0aG9kcy9pbmRleC5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL21ldGhvZHMvbG9nLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWV0aG9kcy9ub2Rlcy5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL21ldGhvZHMvbm90aWNlcy5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL21ldGhvZHMvb3JkZXJzLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWV0aG9kcy9zZWFyY2guanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9tZXRob2RzL3N5Y29yYXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9tZXRob2RzL3N5c3RlbWNvbmZpZy5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL21ldGhvZHMvd29ya29yZGVycy5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL3B1YmxpY2F0aW9ucy9fdXNlcnMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9wdWJsaWNhdGlvbnMvYWdlbnRzLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvcHVibGljYXRpb25zL2FydGljbGVzLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvcHVibGljYXRpb25zL2NoYXRsaW5lcy5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL3B1YmxpY2F0aW9ucy9jaGF0cm9vbXMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9wdWJsaWNhdGlvbnMvY29udGVudHMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9wdWJsaWNhdGlvbnMvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9wdWJsaWNhdGlvbnMvbGlua3MuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9wdWJsaWNhdGlvbnMvbWNjX2NvbmZpZy5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL3B1YmxpY2F0aW9ucy9ub3RpY2VzLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvcHVibGljYXRpb25zL3Byb2dyYW1zLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvcHVibGljYXRpb25zL3NlY3JldHMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9wdWJsaWNhdGlvbnMvc2Vuc29yLW1hcHBpbmcuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9wdWJsaWNhdGlvbnMvc2lnbmFsc3RhdGUuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9wdWJsaWNhdGlvbnMvd29ya29yZGVycy5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL3JvdXRlcy5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL21haW4uanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2xpYi90cmFuc2Zvcm1lcnMvZGF0ZVN0cmluZ1RyYW5zZm9ybWVyLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9saWIvY29sbGVjdGlvbnMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2xpYi9jb25zdGFudHMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2xpYi9sb2cuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2xpYi9yYW5kb20uanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2xpYi91c2VyLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9pMThuL3Rjb21iL2VuLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9pMThuL3Rjb21iL3N2LmpzIiwibWV0ZW9yOi8v8J+Su2FwcC93YWxsYWJ5LmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydCIsImRlZmF1bHQiLCJHdWRydW5Db250ZW50U2VydmljZXMiLCJIVFRQIiwibGluayIsInYiLCJNZXRlb3IiLCJERUZDT045IiwiREVGQ09ONyIsIkRFRkNPTjUiLCJERUZDT040IiwiREVGQ09OMyIsIkRFRkNPTjIiLCJERUZDT04xIiwidXRpbCIsIlVTRVJfQUNUSU9OX0FDVElWQVRFIiwiY29uc3RydWN0b3IiLCJhc3luY0h0dHAiLCJwcm9taXNpZnkiLCJwb3N0Iiwic2VuZFJlcXVlc3QiLCJ1cmwiLCJxdWVyeSIsImFzeW5jIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJzdGFydFRpbWUiLCJEYXRlIiwiZ2V0VGltZSIsImhlYWRlcnMiLCJzZXR0aW5ncyIsImFwaUtleSIsIkFQSUtFWSIsInN0cmljdFNTTCIsInJlc3BvbnNlIiwiZXhlY3V0aW9uVGltZSIsInN0YXR1c0NvZGUiLCJkYXRhIiwibG9jYWxFcnJvciIsIkVycm9yIiwic2VuZFJlcXVlc3RBc3luYyIsIlByb21pc2UiLCJhc3luY0FwcGx5IiwiYXdhaXQiLCJ0ZXN0X2Nvbm5lY3Rpb24iLCJzZXJ2aWNlVXJsIiwiY29uY2F0IiwiZHJ1cGFsVGVzdENvbm5lY3Rpb24iLCJyZXBsYWNlIiwicXVlcnlPcmRlciIsInNlYXJjaFRleHQiLCJkcnVwYWxPcmRlclF1ZXJ5IiwicXVlcnlPcmRlclN0YXRlIiwic3RhdGUiLCJsaW1pdCIsImZpZWxkX29yZGVyX3N0YXRlIiwicXVlcnlfbGltaXQiLCJxdWVyeU9yZGVyQnlQZXJzb25JZCIsImZpZWxkX3BlcnNvbmlkIiwicXVlcnlSZWNlbnRPcmRlcnMiLCJtb3RoZXJjaGVja3MiLCJkcnVwYWxNb3RoZXJDaGVjayIsInF1ZXJ5T3JkZXJCeU9yZGVySWQiLCJmaWVsZF9vcmRlcmlkIiwidXBkYXRlT3JkZXJCeU9yZGVySWQiLCJvcmRlciIsImRydXBhbE9yZGVyVXBkYXRlIiwidXBkYXRlU3RyZWFtIiwiY3JlYXRlUGVyc29uT3JkZXIiLCJkcnVwYWxPcmRlckNyZWF0ZSIsImRhdGFSZXBseSIsImdldFRlcm1zIiwidGVybXR5cGUiLCJkcnVwYWxHZXRUYXgiLCJ0YXhvbm9teV90eXBlIiwicXVlcnlUZXJtcyIsImRydXBhbFF1ZXJ5VGF4IiwidGF4b25vbXlfYXV0b3NlYXJjaCIsInF1ZXJ5VGVybXNDb3VudHJ5IiwiZGF0YUNvbnRleHQiLCJ0YXhvbm9teV9xdWVyeV9jb3VudHJ5IiwicXVlcnlQZXJzb25CeUlkIiwiZHJ1cGFsRW50aXR5UXVlcnkiLCJxdWVyeV9kb21haW4iLCJxdWVyeVBlcnNvbiIsIm1ldGEiLCJtZXRhX3Jlc3BvbmNlbW9kZSIsIm1ldGFfcXVlcnlfZW5naW5lIiwibWV0YV9xdWVyeV9hcmdzIiwicXVlcnlQZXJzb25BZHZhbmNlZCIsInBlcnNvbmFkdmFuY2VkX2Rpc3RpbmN0IiwicXVlcnlSb2xlQWR2YW5jZWQiLCJxdWVyeVJvbGVzIiwiYWR2YW5jZWRyb2xlX3JvbGVzIiwiYWR2YW5jZWRyb2xlX2RldGFpbGVkY2F0ZWdvcnlyb2xlIiwiYWR2YW5jZWRyb2xlX2Jhc2VjYXRlZ29yeXJvbGUiLCJhZHZhbmNlZHJvbGVfb3JnYW5pc2F0aW9uIiwiYWR2YW5jZWRyb2xlX2NvdW50cnlvZmp1cmlzZGljdGlvbiIsImxpdmVzdHJlYW0iLCJmaWVsZF9wYXJlbnRfcmVmZXJlbmNlIiwicHJvY2Vzc09yZGVyIiwicmVxdWVzdCIsImRydXBhbFByb2Nlc3MiLCJmaWVsZF9vcmRlcl9zdGF0ZV9yZXF1ZXN0X25leHQiLCJnZXRVc2VyUm9sZXMiLCJ1aWQiLCJkcnVwYWxVc2VyVXJsIiwicm9sZXMiLCJhZG1pbiIsImFkbWluX2luX2NvbXBhbmllcyIsIm1lbWJlciIsIm1lbWJlcl9pbl9jb21wYW5pZXMiLCJlIiwiZ2V0Q29tcGFueVVzZXJzIiwiY29tcGFueUlkIiwiZHJ1cGFsQ29tcGFueVVzZXJzVXJsIiwiZmllbGRfY29tcGFueV9pZCIsImNvbXBhbnkiLCJhZG1pbmlzdHJhdG9ycyIsImZpZWxkX2NvbXBhbnlfYWRtaW5pc3RyYXRvcnMiLCJ0ZW1wIiwibWFwIiwidXNlciIsIm1lbWJlcnMiLCJmaWVsZF9jb21wYW55X21lbWJlcnMiLCJzdGF0dXMiLCJmaWVsZF9jb21wYW55X21lbWJlcnNfaW5hY3RpdmUiLCJ1c2VycyIsImFkbWlucyIsIm1hbmFnZVVzZXIiLCJhY3Rpb24iLCJkcnVwYWxNYW5hZ2VVc2VyVXJsIiwiY29udGVudFNlcnZlckFjdGlvbiIsImRydXBhbEluc2VydFVzZXIiLCJ1c2VyX21haWwiLCJtYWlsIiwidXNlcl9uYW1lIiwibmFtZSIsInNlY3JldFF1ZXN0aW9uIiwic2VjcmV0QW5zd2VyIiwicHciLCJhZGRVc2VyIiwic2VuZFF1ZXN0aW9uIiwiZHJ1cGFsQ29udGFjdFVybCIsInF1ZXJ5T3B0aW9ucyIsImdldEFydGljbGUiLCJkcnVwYWxHZXRBcnRpY2xlVXJsIiwiZmlsZWFyZWFHZXRGaWxlIiwiZHJ1cGFsRmlsZWFyZWFHZXRGaWxlIiwiZmlsZWFyZWFRdWVyeSIsImRydXBhbEZpbGVhcmVhUXVlcnkiLCJkcnVwYWxHZXRVc2VyIiwibWV0aG9kIiwidmFsdWUiLCJnZXRVc2VyQnlBdHRyaWJ1dGUiLCJBZG1pbnMiLCJXb3JrZ3JvdXBzIiwiV29ya2dyb3VwVXNlcnMiLCJQdWJsaXNoaW5nUmVnaW9ucyIsIkFydGljbGVzIiwiQ29uc3RhbnRzIiwiV29ya2dyb3VwIiwiZXhwb3J0RGVmYXVsdCIsImlzU3VwZXJBZG1pbiIsInVzZXJJZCIsImZpbmRPbmUiLCJyb2xlSWQiLCJVc2VyUm9sZXMiLCJTVVBFUl9BRE1JTiIsImlzUmVnaW9uQWRtaW4iLCJyZWdpb25JZCIsInJlZ2lvbklkcyIsIkFycmF5IiwiaXNBcnJheSIsInB1c2giLCJyZWdpb25BZG1pbiIsIiRpbiIsIlJFR0lPTl9BRE1JTiIsImlzQW55UmVnaW9uQWRtaW4iLCJpc1dvcmtncm91cFJlZ2lvbkFkbWluIiwid29ya2dyb3VwSWQiLCJ3b3JrZ3JvdXAiLCJmaWVsZF9wdWJsaXNoaW5nX3JlZ2lvbiIsImlzQXJ0aWNsZXNSZWdpb25BZG1pbiIsImFydGljbGVJZCIsImFydGljbGUiLCJwdWJsaXNoaW5nUmVnaW9ucyIsImlzQXJ0aWNsZXNXb3JrZ3JvdXBBZG1pbiIsIl9pZCIsImlzV29ya2dyb3VwQWRtaW4iLCJ3b3JrZ3JvdXBBZG1pbiIsInVzZXJfaWQiLCJ3b3JrZ3JvdXBfaWQiLCJ1c2VyX2dyb3VwX3JvbGUiLCJXT1JLR1JPVVBfQURNSU4iLCJyZXN1bHQiLCJnZXRBZG1pblJlZ2lvbklkcyIsImZpbmQiLCJmZXRjaCIsInJlZ2lvbiIsInJlZ2lvbnNGcm9tUm9sZSIsImFkbWluUm9sZSIsImdldEFkbWluV29ya2dyb3VwSWRzIiwid29ya2dyb3VwSWRzIiwiZ2V0UmVnaW9uQWRtaW5zSWRzIiwiYWRtaW5zRm9yUmVnaW9uIiwiZ2V0UmVnaW9uQWRtaW5zQ3Vyc29yIiwiQ2hhdFJvb21zIiwiQ2hhdExpbmVzIiwiZ3JvdXBCeSIsInhzIiwia2V5IiwicmVkdWNlIiwicnYiLCJ4IiwiZ2V0Q2hhdFJvb21CeUlkIiwiaWQiLCJfdXBzZXJ0Q2hhdHJvb20iLCJhY3RpdmVQcm9ncmFtIiwidXNlclVybCIsInByb2dyYW1VcmwiLCJjaGF0Um9vbVR5cGUiLCJ1c2VyX2xpc3QiLCJjdXJyZW50RGF0ZSIsImZvckVhY2giLCJpdGVtIiwiY2hhdFJvb20iLCJjcmVhdGVkQXQiLCJtb2RpZmllZEF0IiwiY3JlYXRlZEJ5IiwidGl0bGUiLCJzdWJ0aXRsZSIsInN1YlRpdGxlIiwiY2hhbm5lbElkIiwidXBkYXRlIiwiJHNldCIsIm9wdGlvbnMiLCJ1cHNlcnQiLCJfdXBzZXJ0Q2hhdHJvb21zZXRBY3RpdmVVc2VyIiwiY2hhdFJvb21zIiwiY2hhdExpbmVzU2VsZWN0b3IiLCJjaGF0TGluZXMiLCJ1c2VyQWN0aXZlTGlzdCIsImlzTmV3VXNlciIsInRoZUFjdGl2ZURhdGUiLCJhY3RpdmVEYXRlIiwidW5SZWFkTWVzc2FnZXMiLCJfdW5SZWFkTWVzc2FnZXMiLCJpbmRleCIsImxhc3RBY3Rpb24iLCJ0ZXh0IiwiX2dldE51bU9mVW5yZWFkTWVzc2FnZXMiLCJjaGF0Um9vbXNTZWxlY3RvciIsIl91c2Vyc1VuUmVhZE1lc3NhZ2VzIiwidG90YWxVblJlYWQiLCJhY3RpdmVVc2VyIiwiZGF0ZTJjaGVjayIsImNoYXRMaW5lIiwiX29iamVjdFNwcmVhZCIsIk5vdGljZXMiLCJOb3RpY2VzVXNlclN0YXR1cyIsImFkZE5vdGljZSIsIm5vdGljZSIsImN1cnJlbnRVc2VyIiwiY3VycmVudFVzZXJJZCIsIm5ld05vdGljZSIsIm1vZGlmaWVkQnkiLCJjcmVhdGVkQnlOYW1lIiwibm90aWNlSWQiLCJpbnNlcnQiLCJhZGROb3RpY2VCeUZpZWxkcyIsImV2ZW50Q2xhc3MiLCJldmVudCIsIndoYXQiLCJlbnRpdHkiLCJlbnRpdHlJZCIsImVudGl0eVVyaSIsImVudGl0eU5hbWUiLCJhdmF0YXJfdXJpIiwiZW50aXR5X3VyaSIsIm5vdGljZXMiLCJtdWx0aSIsInJlYWRJdCIsInJlYWRBdCIsIl9zdGF0dXNJZCIsIk9yZGVyIiwiZGF0ZUZvcm1hdCIsInRlc3RDb25uZWN0aW9uQ29udGVudCIsInNlcnZpY2VzIiwiZXJyb3IiLCJvcmRlclF1ZXJ5Iiwib3JkZXJzIiwicHJvY2VzcyIsImNyZWF0ZVVwZGF0ZVBlcnNvbk9yZGVyIiwibm93IiwiT3JkZXJQcm9jZXNzTWV0aG9kIiwiRVhQUkVTUyIsImdldE5hbWVUeXBlcyIsImNoZWNrIiwiVXNlcldvcmtncm91cFJvbGVzIiwiV29ya2dyb3VwVm91Y2hlcnMiLCJBRE1JTl9ST0xFX05BTUUiLCJNRU1CRVJfUk9MRV9OQU1FIiwiZ2V0VXNlcldvcmtncm91cElkcyIsImFzQWRtaW4iLCJyb2xlIiwid3UiLCJnZXRSZWdpb25zV29ya2dyb3VwSWRzIiwiaWRzIiwidyIsImdldFdvcmtncm91cEVudGl0eSIsImdldFdvcmtncm91cFJlZ2lvbklkcyIsIndvcmtncm91cEVudGl0eSIsImFkZFdvcmtncm91cFJlZ2lvbiIsIiRhZGRUb1NldCIsInJlbW92ZVdvcmtncm91cFJlZ2lvbiIsIiRwdWxsIiwidXBkYXRlRmllbGQiLCJmaWVsZE5hbWUiLCJ2YWx1ZXMiLCJpc1VzZXJBZG1pbkluV29ya2dyb3VwIiwic2VsZWN0ZWRXb3JrZ3JvdXBzIiwiaXNPdGhlclVzZXJBZG1pbkluV29ya2dyb3VwIiwiaXNVc2VyV29ya2dyb3VwVXNlckFkbWluIiwid29ya2dyb3VwVXNlcklkIiwid29ya2dyb3VwVXNlciIsImlzVXNlckFkbWluSW5BbnlHcm91cCIsImdldFdvcmtncm91cEFkbWluc0lkcyIsImFkbWluV29ya2dyb3VwVXNlcnMiLCJhZGRlZFdvcmtncm91cFVzZXJJZCIsImN1cnJlbnRXb3JrZ3JvdXBVc2VyRW50aXR5IiwibWVtYmVyUm9sZSIsImFkZFVzZXJBc1N5c3RlbSIsImFjdGl2YXRlIiwiZ2V0V29ya2dyb3VwUHVibGlzaGluZ05hbWUiLCJwdWJsaXNoaW5nTmFtZSIsImdldFdvcmtncm91cFZvdWNoZXIiLCJ2ZXJzaW9uIiwidmVyc2lvbl9mb2N1cyIsInZlcnNpb25fYnVpbGRfZGF0ZSIsImNoYXRsaW5lcyIsImNvdW50IiwiQWNjb3VudHMiLCJjcmVhdGVVc2VyIiwiZW1haWwiLCJwYXNzd29yZCIsIkFkbWluUm9sZSIsIlJhbmRvbSIsIm1ldGhvZHMiLCJfdXNlcnMuZ2V0VXNlckxpc3QiLCJPYmplY3QiLCJjaGF0VXNlcnMiLCJfdXNlcnMuZ2V0TGFuZ3VhZ2VQcmVmZXJlbmNlIiwiU3RyaW5nIiwicmVjb3JkIiwiZ2V0IiwibG9jYWxlIiwiZGVmYXVsdExvY2FsZSIsIl91c2Vycy5zZXRMYW5ndWFnZVByZWZlcmVuY2UiLCJsYW5nIiwic2V0Iiwic2F2ZSIsIl91c2Vycy5nZXRUaGVtZSIsIl91c2Vycy5zZXRUaGVtZSIsInRoZW1lIiwiQm9vbGVhbiIsIl91c2Vycy51cGRhdGVQcm9maWxlRGVzY3JpcHRpb24iLCJ1cGRhdGVkIiwicHJvZmlsZSIsIl91c2Vycy51cGRhdGVOYW1lIiwiX3VzZXJzLnVwZGF0ZUVtYWlsIiwiX3VzZXJzLmFub255bWl6ZSIsIm5ld1VzZXIiLCJtb2R1bGUxIiwiTWF0Y2giLCJQZXJzb25zIiwiU2VhcmNoTG9nIiwiRHJ1cGFsU2VydmljZXMiLCJzdGFsZVNlc3Npb25QdXJnZUludGVydmFsIiwicHVibGljIiwiaW5hY3Rpdml0eVRpbWVvdXQiLCJzdGFsZVNlc3Npb25JbmFjdGl2aXR5VGltZW91dCIsImZvcmNlTG9nb3V0IiwiYWNjb3VudC5zZXRQdyIsInVzZXJPYmoiLCJkb1dvcmsiLCJhY2NvdW50U2V0UHciLCJyZWFzb24iLCJoZWFydGJlYXQiLCJzZXRJbnRlcnZhbCIsIm92ZXJkdWVUaW1lc3RhbXAiLCIkbHQiLCIkdW5zZXQiLCJGdXR1cmUiLCJOcG0iLCJyZXF1aXJlIiwiRFJVUEFMX0RFRkFVTFRTIiwicG9ydCIsImRuIiwic2VhcmNoRE4iLCJzZWFyY2hTaXplTGltaXQiLCJzZWFyY2hDcmVkZW50aWFscyIsImNyZWF0ZU5ld1VzZXIiLCJkZWZhdWx0RG9tYWluIiwic2VhcmNoUmVzdWx0c1Byb2ZpbGVNYXAiLCJiYXNlIiwic2VhcmNoIiwibGRhcHNDZXJ0aWZpY2F0ZSIsImJpbmRUb0RvbWFpbiIsImJpbmREb21haW4iLCJMREFQIiwiY3JlYXRlIiwiXyIsImRlZmF1bHRzIiwicHJvdG90eXBlIiwiZHJ1cGFsQ2hlY2siLCJiaW5kQWZ0ZXJGaW5kIiwic2VsZiIsImhhc093blByb3BlcnR5IiwibGRhcEFzeW5jRnV0IiwiZXJyIiwidG9rZW5SZXN1bHQiLCJyZXR1cm4iLCJ1c2VyX2RhdGEiLCJ1c2VybmFtZSIsImxkYXBQYXNzIiwiY29udGVudCIsInBhcmFtcyIsImxvZ2luUmVzdWx0IiwicmV0T2JqZWN0IiwiY29kZSIsIm1lc3NhZ2UiLCJ3YWl0IiwicmVnaXN0ZXJMb2dpbkhhbmRsZXIiLCJsb2dpblJlcXVlc3QiLCJkcnVwYWwiLCJ1c2VyT3B0aW9ucyIsImxkYXBPcHRpb25zIiwibGRhcE9iaiIsInN0YW1wZWRUb2tlbiIsInRva2VuIiwiZW1haWxzIiwiJGVsZW1NYXRjaCIsImFkZHJlc3MiLCJ2ZXJpZmllZCIsIl9nZW5lcmF0ZVN0YW1wZWRMb2dpblRva2VuIiwiaGFzaFN0YW1wZWRUb2tlbiIsIl9oYXNoU3RhbXBlZFRva2VuIiwiJHB1c2giLCJzZXRQYXNzd29yZCIsImNhbGwiLCJ1c2VyT2JqZWN0IiwiaXNPbmxpbmUiLCIkZ3QiLCJDaGF0Um9vbSIsImNoYXRsaW5lbGlzdHMudW5yZWFkTWVzc2FnZXMiLCJjaGF0bGluZWxpc3RzLmZvY3VzQ2hhdGxpbmUiLCJjaGF0bGluZWxpc3RzLmFkZENoYXRMaW5lIiwibGluZSIsImxpbmVJZCIsImNoYXRsaW5lbGlzdHMucmVtb3ZlQ2hhdExpbmUiLCJjb250YWluZXJJZCIsImNoYXRsaW5lbGlzdHMuY2hlY2tBY2Nlc3MiLCJjaGF0Um9vbXNVc2VySWRzIiwiaGFzQWNjZXNzVG9DaGF0bGluZXMiLCJfY2hlY2tBY2Nlc3M0VXNlciIsImNoYXRyb29tLmdldDRjaGFubmVsIiwiY2hhdHJvb20uZ2V0NHVzZXIiLCJjaGF0cm9vbS5zZXRBY3RpdmVVc2VyIiwiY29udGFjdC5zZW5kUXVlc3Rpb24iLCJDb250ZW50cyIsImNvbnRlbnQuY2xvbmVBcnRpY2xlIiwiY29udGV4dCIsImRvY3VtZW50VG9DbG9uZSIsInJldmlzaW9ucyIsInJldmlzaW9uIiwibWFzdGVyTGFuZ3VhZ2UiLCJsYW5ndWFnZSIsImNsb25lSWQiLCJOb3Rpc2VDbGFzcyIsIkNPTlRFTlRfQ0xPTkVEIiwiY29udGVudC5nZXRBcnRpY2xlIiwiY29udGVudC51cGRhdGUiLCJmaWVsZHNUb1VwZGF0ZSIsInVwZGF0ZUNvdW50IiwiaTE4biIsIl9fIiwiQ09OVEVOVF9VUERBVEVEIiwiY29udGVudC5nZXRUeXBlT2ZBcnRpY2xlcyIsInBpcGVsaW5lIiwiJGdyb3VwIiwiZGlzdGluY3RUeXBlcyIsIiRwcm9qZWN0IiwicmF3Q29sbGVjdGlvbiIsInJlc29sdmUiLCJyZWplY3QiLCJhZ2dyZWdhdGUiLCJjdXJzb3IiLCJ0b0FycmF5IiwiRXZlbnRzIiwiZXZlbnRzLmdldEV2ZW50c0Zvck5vZGUiLCJwb2ludF9pZCIsInN0YXJ0RGF0ZSIsImVuZERhdGUiLCJub2RlcyIsInByb2Nlc3NSYXdEYXRhIiwicmF3RGF0YSIsIm9uZURheUFnbyIsIm9uZVdlZWtBZ28iLCJvbmVNb250aEFnbyIsIm9uZVllYXJBZ28iLCJoaXN0b3J5RGF0YSIsImFjYyIsImRvYyIsImRhdGUiLCJwYXJzZUludCIsInRpbWVzdGFtcF93cml0ZSIsImRhdGVTdHJpbmciLCJ0b0lTT1N0cmluZyIsInNwbGl0IiwidGltZVN0cmluZyIsInN1YnN0cmluZyIsImluaXRpYWxpemVLZXkiLCJkYXRlcyIsInBhcnNlRmxvYXQiLCJwcm9jZXNzUmF3RGF0YU9sZCIsImZpbGVhcmVhLmZpbGVhcmVhUXVlcnkiLCJtZXRhX2FjdGluZ191c2VyIiwiZmlsZWFyZWEuZmlsZWFyZWFHZXRJdGVtIiwiX3VzZXJzIiwiY2hhdGxpbmVsaXN0cyIsImNvbnRhY3QiLCJmaWxlYXJlYSIsImFjY291bnQiLCJzeWNvcmF4IiwiY2hhdHJvb21zIiwiZXZlbnRzIiwid29ya29yZGVycyIsInN5c3RlbWNvbmZpZyIsImxvZy5pbmZvIiwiT25lT2YiLCJOb2RlcyIsIk5vZGVMaW5rcyIsIm5vZGVzLmFkZE5vZGUiLCJub2RlT2JqZWN0Iiwibm9kZSIsImxhc3RVcGRhdGVkIiwib3duZXIiLCJjcmVhdGVkIiwibm9kZXMucmVtb3ZlTm9kZSIsIm5vZGVJZCIsIm5vZGVzLmFkZExpbmsiLCJsaW5rT2JqZWN0IiwiZ2V0VHJlZVN0cnVjdHVyZXYxIiwic3RhcnROb2RlSWQiLCJub2RlQ29sbGVjdGlvbiIsIm5vZGVMaW5rc0NvbGxlY3Rpb24iLCJidWlsZE5vZGUiLCJsaW5rcyIsInBhcmVudElkIiwiY2hpbGRyZW4iLCJjaGlsZE5vZGUiLCJjaGlsZElkIiwiZ2V0VHJlZVN0cnVjdHVyZSIsIm5vdGljZXMuYWRkIiwibm90aWNlcy51cGRhdGVSZWFkU3RhdHVzIiwibm90aWNlU3RhdHVzIiwidXBkYXRlU3RhdHVzIiwiVXNlcnMiLCJvcmRlcnMudGVzdGNvbm5lY3Rpb24iLCJ1bmJsb2NrIiwib3JkZXJzLm9yZGVycXVlcnkiLCJvcmRlcnMucXVlcnlPcmRlckJ5T3JkZXJJZCIsIm9yZGVycy5xdWVyeU9yZGVyQnlQZXJzb25JZCIsIm9yZGVycy5xdWVyeVJlY2VudE9yZGVycyIsIm9yZGVycy51cGRhdGVPcmRlckJ5T3JkZXJJZCIsImNvbnRlbnRfb3JkZXIiLCJvcmRlcnMuY3JlYXRlVXBkYXRlUGVyc29uT3JkZXIiLCJvcmRlcnMuZ2V0TmFtZVR5cGVzIiwib3JkZXJzLmdldFRlcm1zIiwib3JkZXJzLnF1ZXJ5VGVybXMiLCJvcmRlcnMucXVlcnlUZXJtc0NvdW50cnkiLCJvcmRlcnMucXVlcnlQZXJzb25CeUlkIiwib3JkZXJzLnF1ZXJ5UGVyc29uIiwib3JkZXJzLnF1ZXJ5UGVyc29uQWR2YW5jZWQiLCJvcmRlcnMucXVlcnlSb2xlQWR2YW5jZWQiLCJvcmRlcnMubGl2ZXN0cmVhbSIsIm9yZGVycy5tb3RoZXJjaGVja3MiLCJvcmRlcnMucHJvY2VzcyIsIm9yZGVycy5xdWVyeU9yZGVyU3RhdGUiLCJzZWFyY2guZmluZFBlcnNvbiIsImRiUXVlcnkiLCJuYW1lRWxlbU1hdGNoIiwiTmFtZVR5cGUiLCJyU3RhcnQiLCJyU3RhcnRMYXN0TmFtZSIsInJFbmQiLCJmaXJzdE5hbWUiLCJyZWdleCIsIlJlZ0V4cCIsInNvdXJjZSIsInRvTG93ZXJDYXNlIiwidHJpbSIsImRpciIsIiRyZWdleCIsImxhc3ROYW1lIiwiZmllbGRfcGVwIiwiZmllbGRfcmNhIiwieWVhciIsIm1vbnRoIiwiZGF5IiwiZmllbGRfcGVwX2NvdW50cmllc19saXN0IiwiZmlsdGVyZWRDb3VudHJpZXMiLCJmaWx0ZXIiLCJzZWxlY3RlZCIsInNlYXJjaEJ5U1NOIiwic3NuTnVtYmVyIiwia2V5cyIsIlVzZXJJZCIsIkRhdGVUaW1lIiwiUmVzdWx0c1JldHVybmVkIiwibGlzdCIsInN5Y29yYXguZHluYW1pYy5hc3luYyIsIl9kb0ZldGNoU3luYyIsIndyYXBBc3luYyIsIl9kb0ZldGNoMiIsIl9kb0ZldGNoIiwic3ljb3JheC5keW5hbWljIiwidGhlbiIsImpzb24iLCJTeXN0ZW1Db25maWciLCJzeXN0ZW1jb25maWcuZ2V0Iiwic3lzdGVtY29uZmlnLnB1dCIsInVwZGF0ZWRCeSIsInVwZGF0ZWRBdCIsImluc2VydGVkSWQiLCJudW1iZXJBZmZlY3RlZCIsIldvcmtPcmRlcnMiLCJ3b3Jrb3JkZXIubmV3IiwiY3VzdG9tZXJPcmRlcklkIiwid29ya29yZGVyY2xhc3MiLCJwYXlsb2FkIiwiY3VzdG9tZXJJZCIsIndvcmtvcmRlcklkIiwid29ya29yZGVyIiwiY29udGVudElkIiwibW9kaWZpZWQiLCJwdWJsaXNoIiwic2VsZWN0b3IiLCJBZ2VudHMiLCJBZ2VudFVzZXJDb25uZWN0aW9ucyIsIk1vbmdvIiwiYXV0b3J1biIsImNvbXB1dGF0aW9uIiwiU2VsZWN0b3IiLCJhZ2VudHNfY29ubmVjdGlvbnMiLCJvYmplY3RJZEFycmF5IiwiY29ubmVjdGlvbiIsImFnZW50X2lkIiwiT2JqZWN0SUQiLCJvYmplY3RJZCIsImFnZW50cyIsImNoYXRMaW5lc1VzZXJJZHMiLCJ1c2Vyc1dpdGhBdmF0YXJzIiwiY2hhdHJvb21JZCIsIm5vZGVzU2VsZWN0b3IiLCJxdWV1ZSIsInNlZW5Ob2RlSWRzIiwiU2V0Iiwic2VlbkxpbmtJZHMiLCJjdXJyZW50SWQiLCJzaGlmdCIsImhhcyIsImFkZCIsIl9nZXROb2Rlc0FuZENoaWxkcmVuIiwiZGVlcHRoIiwibWF4RGVlcHRoIiwiaSIsImNoaWxkIiwidGFyZ2V0Iiwic2VjcmV0cyIsImFydGljbGVzIiwiY29udGVudHMiLCJtY2MiLCJMaW5rcyIsImxpbmtJZCIsImxpbmtzU2VsZWN0b3IiLCJNY2NDb25maWciLCJtY2NDb25maWciLCJmYWNpbGl0eSIsImFsbG93RGlza1VzZSIsIiRtYXRjaCIsInJlYWRfcHJvY19zdGF0dXMiLCJudW1PZlJlYWQiLCIkc3VtIiwibm90aWNlU2VsZWN0b3IiLCJub3RpY2VzNFVzZXIiLCJub3RpY2VzX3VzZXJzdGF0dXMiLCJub3RpY2VzNHVzZXJzIiwiUHJvZ3JhbXMiLCJNb2R1bGVzIiwicHJvZ3JhbUlkIiwiU2VjcmV0cyIsIlNlbnNvck1hcHBpbmciLCJkYXRhU2VsZWN0b3IiLCJTaWduYWxTdGF0ZSIsIlNpZ25hbEhpc3RvcnkiLCJzaWduYWxTdGF0ZSIsInNvcnQiLCJzaWduYWxJZCIsIlNpZ25hbEhpc3RvcnlEYXRhIiwib2JqZWN0IiwiTnVtYmVyIiwicHJvamVjdGlvbiIsIm15TGltaXQiLCJzdGFydCIsImVuZCIsImV4ZWN1dGlvbiIsIkZpbGVNYW5hZ2VyIiwiUGlja2VyIiwicm91dGUiLCJyZXEiLCJyZXMiLCJuZXh0IiwiZmlsZVR5cGUiLCJmaWxlSWQiLCJmaWxlTmFtZSIsImRlY29kZVVSSUNvbXBvbmVudCIsImZpbGVEYXRhIiwicmVhZE91dHB1dEZpbGVBc0J1ZmZlciIsInNldEhlYWRlciIsInB1YmxpY2F0aW9ucyIsImFkZEluaXRpYWxEYXRhIiwiQXBwQ29uZmlnIiwic3RhcnR1cCIsInJlbGVhc2UiLCJ1cmxzIiwicmVzZXRQYXNzd29yZCIsImFic29sdXRlVXJsIiwiZW1haWxUZW1wbGF0ZXMiLCJzaXRlTmFtZSIsImZyb20iLCJzdWJqZWN0IiwiaHRtbCIsInVybFRhZyIsIm9uQ3JlYXRlVXNlciIsInZhbGlkYXRlTG9naW5BdHRlbXB0Iiwib25Mb2dpbiIsImxvZ2luSW5mbyIsImFsbG93ZWQiLCJ0eXBlIiwidCIsIm1vbWVudCIsIkRhdGVTdHJpbmdUcmFuc2Zvcm1lciIsImZvcm1hdFN0cmluZyIsImZvcm1hdCIsImlzIiwibW9tZW50RGF0ZSIsInBhcnNlIiwic3RyIiwidG9EYXRlIiwiQWN0aW9uTG9nIiwiVGV4dHNWZXJzaW9ucyIsIktleVZhbHVlcyIsIktleVZhbHVlQ2xhc3NlcyIsIktleVZhbHVlR3JvdXBzIiwiS2V5VmFsdWVDb250ZXh0cyIsIlRhZ0NsYXNzZXMiLCJUYWdzIiwiQ29sbGVjdGlvbiIsIlVTRVJfQUNUSU9OX0RFQUNUSVZBVEUiLCJVU0VSX0FDVElPTl9BREQiLCJVU0VSX1NUQVRVU19BQ1RJVkUiLCJVU0VSX1NUQVRVU19JTkFDVElWRSIsIlJlYWN0IiwiQ2FyZE1vZGUiLCJQRVJTT04iLCJORVdPUkRFUiIsIk9SREVSIiwiQ2FyZFN0YXR1cyIsIk5BIiwiUUEiLCJSUUEiLCJORVciLCJGVVRVUkUiLCJPSyIsIk9yZGVyUHJvY2Vzc1N0YXR1c2VzIiwiSU5JVCIsIlBFTkRJTkciLCJPUEVOMTAwIiwiT1BFTjExMCIsIk9QRU41MDAiLCJUSU1FQ0hFQ0siLCJRQUNIRUNLIiwiUFVCTElTSCIsIkNPTVBMRVRFRCIsIlNVU1BFTkNFOTEwIiwiU1VTUEVOQ0U5NTAiLCJTVVNQRU5DRTk5MCIsIkNBTkNFTExFRCIsIk9yZGVyVHlwZSIsIk5FV19QRVJTT04iLCJNSUdSQVRJT04iLCJSRUxBVElPTl9VUERBVEUiLCJSRUxBVElPTl9JTlNFUlQiLCJDT1JFIiwiVVJJIiwiU1NOIiwiQUREUkVTUyIsIk5BTUUiLCJST0xFX0lOU0VSVCIsIlJPTEVfVVBEQVRFIiwiYWN0aXZlQ2FyZCIsIlJPTEVTIiwiR2VuZGVyIiwiRkVNQUxFIiwiTUFMRSIsIkRFRkFVTFQiLCJkYXRlUHJlY2lzaW9uIiwiVU5ERUYiLCJZRUFSIiwiTU9OVEgiLCJEQVkiLCJvcmRlclR5cGVUZWNobmljYWwiLCJORVdfUEVSU09OX09SREVSIiwiZGVmYXVsdFZhbHVlcyIsIk9SREVSSUQiLCJtb3RoZXJDaGVja1N0YXRlIiwiV0FSTklORyIsIkVSUk9SX0dFTkVSSUMiLCJFUlJPUiIsInBlcnNvbk5hbWVUeXBlcyIsIlBSRVZJT1VTX05BTUVTIiwiQUxURVJOQVRJVkVfTkFNRVMiLCJQUklNQVJZX05BTUUiLCJSRUdJU1RSRURfTkFNRSIsIkFSVElDTEVfQUNUSU9OX0NPTlRFTlRfVVBEQVRFIiwiQVJUSUNMRV9TVEFUVVNfT1BFTiIsIkFSVElDTEVfU1RBVFVTX1JFVklFVyIsIkFSVElDTEVfU1RBVFVTX1JFUVVFU1RfRk9SX1BVQkxJQ0FUSU9OIiwiQVJUSUNMRV9TVEFUVVNfQVBQUk9WRURfRk9SX1BVQkxJQ0FUSU9OIiwiQVJUSUNMRV9TVEFUVVNfUFVCTElTSEVEIiwiQ0hBVF9BQ1RJT05fTkVXX01FU1NBR0UiLCJHUk9VUF9BQ1RJT05fTkVXX01FTUJFUiIsIkxvYWRpbmdDb21wb25lbnQiLCJjcmVhdGVFbGVtZW50IiwiTG9nIiwiaW5mbyIsImNhbGxiYWNrIiwiZ2VuZXJhdGVTdHJpbmciLCJwb3NzaWJsZSIsImNoYXJBdCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIlBob25lIiwiRW1haWwiLCJVc2VyUHJvZmlsZSIsIkFzdHJvIiwiQ2xhc3MiLCJmaWVsZHMiLCJ2YWxpZGF0b3IiLCJWYWxpZGF0b3JzIiwibWluTGVuZ3RoIiwibnVtYmVyIiwidXVpZCIsImRlc2NyaXB0aW9uIiwiVXNlciIsImNvbGxlY3Rpb24iLCJuZXN0ZWQiLCJfaXNzIiwiX2lzYSIsImZpcnN0RW1haWwiLCJpc1NlcnZlciIsImV4dGVuZCIsIm9wdGlvbmFsIiwicmVxdWlyZWQiLCJyZW1vdmUiLCJ1cCIsImRvd24iLCJleHBvcnRzIiwid2FsbGFieSIsImxvYWQiLCJmaWxlcyIsInRlc3RzIiwiY29tcGlsZXJzIiwiYmFiZWwiLCJwcmVzZXRzIiwiZW52IiwidGVzdEZyYW1ld29yayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxNQUFNLENBQUM7RUFBQ0MsT0FBTyxFQUFDQSxDQUFBLEtBQUlDO0FBQXFCLENBQUMsQ0FBQztBQUFDLElBQUlDLElBQUk7QUFBQ0osTUFBTSxDQUFDSyxJQUFJLENBQUMsYUFBYSxFQUFDO0VBQUNELElBQUlBLENBQUNFLENBQUMsRUFBQztJQUFDRixJQUFJLEdBQUNFLENBQUM7RUFBQTtBQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7QUFBQyxJQUFJQyxNQUFNO0FBQUNQLE1BQU0sQ0FBQ0ssSUFBSSxDQUFDLGVBQWUsRUFBQztFQUFDRSxNQUFNQSxDQUFDRCxDQUFDLEVBQUM7SUFBQ0MsTUFBTSxHQUFDRCxDQUFDO0VBQUE7QUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO0FBQUMsSUFBSUUsT0FBTyxFQUFDQyxPQUFPLEVBQUNDLE9BQU8sRUFBQ0MsT0FBTyxFQUFDQyxPQUFPLEVBQUNDLE9BQU8sRUFBQ0MsT0FBTztBQUFDZCxNQUFNLENBQUNLLElBQUksQ0FBQyxhQUFhLEVBQUM7RUFBQ0csT0FBT0EsQ0FBQ0YsQ0FBQyxFQUFDO0lB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QU87SUFFbEIsT0FBTztNQUNMd2UsS0FBSyxFQUFFLENBQ0wsb0NBQW9DLEVBQ3BDLGdDQUFnQyxFQUNoQyxtQ0FBbUMsRUFDbkMsNkJBQTZCLENBQzlCO01BQ0RDLEtBQUssRUFBRSxDQUNMLHNCQUFzQixDQUN2QjtNQUNEQyxTQUFTLEVBQUU7UUFDUixVQUFVLEVBQUVKLE9BQU8sQ0FBQ0ksU0FBUyxDQUFDQyxLQUFLLENBQUM7VUFDbENBLEtBQUssRUFBRUosSUFBSSxDQUFDLFlBQVksQ0FBQztVQUN6QkssT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxPQUFPO1FBQ3hDLENBQUM7TUFDSixDQUFDO01BQ0RDLEdBQUcsRUFBRTtRQUNIMUksSUFBSSxFQUFFO01BQ1IsQ0FBQztNQUNEMkksYUFBYSxFQUFFO0lBQ2pCLENBQUM7RUFDSCxDQUFDO0FBQUMsRUFBQXZiLElBQUEsT0FBQXhjLE1BQUEsRSIsImZpbGUiOiIvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSFRUUCB9IGZyb20gXCJtZXRlb3IvaHR0cFwiO1xuaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSBcIm1ldGVvci9tZXRlb3JcIjtcbmltcG9ydCB7XG4gIERFRkNPTjksXG4gIERFRkNPTjcsXG4gIERFRkNPTjUsXG4gIERFRkNPTjQsXG4gIERFRkNPTjMsXG4gIERFRkNPTjIsXG4gIERFRkNPTjEsXG59IGZyb20gXCIvZGVidWcuanNvblwiO1xuXG5pbXBvcnQgdXRpbCBmcm9tIFwidXRpbFwiO1xuaW1wb3J0IHsgVVNFUl9BQ1RJT05fQUNUSVZBVEUgfSBmcm9tIFwiLi4vLi4vLi4vbGliL2NvbnN0YW50c1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHdWRydW5Db250ZW50U2VydmljZXMge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCBhc3luY0h0dHAgPSB1dGlsLnByb21pc2lmeShIVFRQLnBvc3QpO1xuXG4gICAgdGhpcy5zZW5kUmVxdWVzdCA9ICh1cmwsIHF1ZXJ5LCBhc3luYyA9IGZhbHNlKSA9PiB7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKHVybCk7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiUXVlcnkgc3RyaW5nLi4uXCIpO1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShxdWVyeSwgbnVsbCwgMikpO1xuICAgICAgY29uc3Qgc3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAgIGlmIChxdWVyeSkge1xuICAgICAgICBpZiAocXVlcnkuaGVhZGVycykge1xuICAgICAgICAgIHF1ZXJ5LmhlYWRlcnNbXCJBUElLRVlcIl0gPSBNZXRlb3Iuc2V0dGluZ3MuYXBpS2V5O1xuICAgICAgICAgIHF1ZXJ5LmhlYWRlcnNbXCJzdHJpY3RTU0xcIl0gPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBxdWVyeS5oZWFkZXJzID0ge1xuICAgICAgICAgICAgQVBJS0VZOiBNZXRlb3Iuc2V0dGluZ3MuYXBpS2V5LFxuICAgICAgICAgICAgc3RyaWN0U1NMOiBmYWxzZSxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBxdWVyeSA9IHtcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICBBUElLRVk6IE1ldGVvci5zZXR0aW5ncy5hcGlLZXksXG4gICAgICAgICAgICBzdHJpY3RTU0w6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gSFRUUC5wb3N0KHVybCwgcXVlcnkpO1xuICAgICAgY29uc3QgZXhlY3V0aW9uVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gc3RhcnRUaW1lO1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIkNhbGwgdG8gc2VydmVyIHRvb2s6IFwiICsgZXhlY3V0aW9uVGltZSk7XG5cbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgbG9jYWxFcnJvciA9IG5ldyBNZXRlb3IuRXJyb3IoXG4gICAgICAgICAgXCJJbnZhbGlkIHJlc3BvbnNlIHN0YXR1cyBjb2RlOiBcIiArIHJlc3BvbnNlLnN0YXR1c0NvZGVcbiAgICAgICAgKTtcbiAgICAgICAgREVGQ09OMSAmJiBjb25zb2xlLmxvZyhyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgREVGQ09OMSAmJiBjb25zb2xlLmxvZyhsb2NhbEVycm9yKTtcbiAgICAgICAgdGhyb3cgbG9jYWxFcnJvcjtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5zZW5kUmVxdWVzdEFzeW5jID0gYXN5bmMgKHVybCwgcXVlcnkpID0+IHtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2codXJsKTtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJRdWVyeSBzdHJpbmcuLi5cIik7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHF1ZXJ5LCBudWxsLCAyKSk7XG4gICAgICBjb25zdCBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgICAgaWYgKHF1ZXJ5KSB7XG4gICAgICAgIGlmIChxdWVyeS5oZWFkZXJzKSB7XG4gICAgICAgICAgcXVlcnkuaGVhZGVyc1tcIkFQSUtFWVwiXSA9IE1ldGVvci5zZXR0aW5ncy5hcGlLZXk7XG4gICAgICAgICAgcXVlcnkuaGVhZGVyc1tcInN0cmljdFNTTFwiXSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHF1ZXJ5LmhlYWRlcnMgPSB7XG4gICAgICAgICAgICBBUElLRVk6IE1ldGVvci5zZXR0aW5ncy5hcGlLZXksXG4gICAgICAgICAgICBzdHJpY3RTU0w6IGZhbHNlLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXJ5ID0ge1xuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIEFQSUtFWTogTWV0ZW9yLnNldHRpbmdzLmFwaUtleSxcbiAgICAgICAgICAgIHN0cmljdFNTTDogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhc3luY0h0dHAodXJsLCBxdWVyeSk7XG4gICAgICBjb25zdCBleGVjdXRpb25UaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBzdGFydFRpbWU7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiQ2FsbCB0byBzZXJ2ZXIgdG9vazogXCIgKyBleGVjdXRpb25UaW1lKTtcblxuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IDIwMCkge1xuICAgICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09PSA0MDApIHtcbiAgICAgICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxldCBsb2NhbEVycm9yID0gbmV3IE1ldGVvci5FcnJvcihcbiAgICAgICAgICAgIFwiSW52YWxpZCByZXNwb25zZSBzdGF0dXMgY29kZTogXCIgKyByZXNwb25zZS5zdGF0dXNDb2RlXG4gICAgICAgICAgKTtcbiAgICAgICAgICBERUZDT04xICYmIGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgIERFRkNPTjEgJiYgY29uc29sZS5sb2cobG9jYWxFcnJvcik7XG4gICAgICAgICAgdGhyb3cgbG9jYWxFcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICB0ZXN0X2Nvbm5lY3Rpb24oKSB7XG4gICAgbGV0IHNlcnZpY2VVcmwgPSBgJHtNZXRlb3Iuc2V0dGluZ3MuZHJ1cGFsVGVzdENvbm5lY3Rpb259YDtcbiAgICBzZXJ2aWNlVXJsID0gc2VydmljZVVybC5yZXBsYWNlKC8oW146XVxcLylcXC8rL2csIFwiJDFcIik7XG4gICAgcmV0dXJuIHRoaXMuc2VuZFJlcXVlc3Qoc2VydmljZVVybCwge30pO1xuICB9XG5cbiAgcXVlcnlPcmRlcihzZWFyY2hUZXh0KSB7XG4gICAgbGV0IHNlcnZpY2VVcmwgPSBgJHtNZXRlb3Iuc2V0dGluZ3MuZHJ1cGFsT3JkZXJRdWVyeX1gO1xuICAgIHNlcnZpY2VVcmwgPSBzZXJ2aWNlVXJsLnJlcGxhY2UoLyhbXjpdXFwvKVxcLysvZywgXCIkMVwiKTtcbiAgICAvL2xldCBvcmRlcnN0YXRlID0gJzM5MSc7XG4gICAgbGV0IHF1ZXJ5ID0ge1xuICAgICAgZGF0YToge1xuICAgICAgICBxdWVyeTogc2VhcmNoVGV4dCxcbiAgICAgIH0sXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5zZW5kUmVxdWVzdChzZXJ2aWNlVXJsLCBxdWVyeSk7XG4gIH1cblxuICBxdWVyeU9yZGVyU3RhdGUoc3RhdGUsIGxpbWl0KSB7XG4gICAgbGV0IHNlcnZpY2VVcmwgPSBgJHtNZXRlb3Iuc2V0dGluZ3MuZHJ1cGFsT3JkZXJRdWVyeX1gO1xuICAgIHNlcnZpY2VVcmwgPSBzZXJ2aWNlVXJsLnJlcGxhY2UoLyhbXjpdXFwvKVxcLysvZywgXCIkMVwiKTtcbiAgICAvL2xldCBvcmRlcnN0YXRlID0gJzM5MSc7XG4gICAgbGV0IHF1ZXJ5ID0ge1xuICAgICAgZGF0YToge1xuICAgICAgICBmaWVsZF9vcmRlcl9zdGF0ZTogc3RhdGUsXG4gICAgICAgIHF1ZXJ5X2xpbWl0OiBsaW1pdCxcbiAgICAgIH0sXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5zZW5kUmVxdWVzdChzZXJ2aWNlVXJsLCBxdWVyeSk7XG4gIH1cblxuICBxdWVyeU9yZGVyQnlQZXJzb25JZChzZWFyY2hUZXh0KSB7XG4gICAgbGV0IHNlcnZpY2VVcmwgPSBgJHtNZXRlb3Iuc2V0dGluZ3MuZHJ1cGFsT3JkZXJRdWVyeX1gO1xuICAgIHNlcnZpY2VVcmwgPSBzZXJ2aWNlVXJsLnJlcGxhY2UoLyhbXjpdXFwvKVxcLysvZywgXCIkMVwiKTtcbiAgICAvL2xldCBvcmRlcnN0YXRlID0gJzM5MSc7XG4gICAgbGV0IHF1ZXJ5ID0ge1xuICAgICAgZGF0YToge1xuICAgICAgICBmaWVsZF9wZXJzb25pZDogc2VhcmNoVGV4dCxcbiAgICAgIH0sXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5zZW5kUmVxdWVzdChzZXJ2aWNlVXJsLCBxdWVyeSk7XG4gIH1cblxuICBxdWVyeVJlY2VudE9yZGVycygpIHtcbiAgICBsZXQgc2VydmljZVVybCA9IGAke01ldGVvci5zZXR0aW5ncy5kcnVwYWxPcmRlclF1ZXJ5fWA7XG4gICAgc2VydmljZVVybCA9IHNlcnZpY2VVcmwucmVwbGFjZSgvKFteOl1cXC8pXFwvKy9nLCBcIiQxXCIpO1xuICAgIC8vbGV0IG9yZGVyc3RhdGUgPSAnMzkxJztcbiAgICBsZXQgcXVlcnkgPSB7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIHF1ZXJ5X2xpbWl0OiBcIjUwXCIsXG4gICAgICB9LFxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMuc2VuZFJlcXVlc3Qoc2VydmljZVVybCwgcXVlcnkpO1xuICB9XG5cbiAgbW90aGVyY2hlY2tzKCkge1xuICAgIGxldCBzZXJ2aWNlVXJsID0gYCR7TWV0ZW9yLnNldHRpbmdzLmRydXBhbE1vdGhlckNoZWNrfWA7XG4gICAgc2VydmljZVVybCA9IHNlcnZpY2VVcmwucmVwbGFjZSgvKFteOl1cXC8pXFwvKy9nLCBcIiQxXCIpO1xuICAgIC8vbGV0IG9yZGVyc3RhdGUgPSAnMzkxJztcbiAgICBsZXQgcXVlcnkgPSB7XG4gICAgICBkYXRhOiB7fSxcbiAgICB9O1xuICAgIHJldHVybiB0aGlzLnNlbmRSZXF1ZXN0KHNlcnZpY2VVcmwsIHF1ZXJ5KTtcbiAgfVxuXG4gIHF1ZXJ5T3JkZXJCeU9yZGVySWQoc2VhcmNoVGV4dCkge1xuICAgIGxldCBzZXJ2aWNlVXJsID0gYCR7TWV0ZW9yLnNldHRpbmdzLmRydXBhbE9yZGVyUXVlcnl9YDtcbiAgICBzZXJ2aWNlVXJsID0gc2VydmljZVVybC5yZXBsYWNlKC8oW146XVxcLylcXC8rL2csIFwiJDFcIik7XG4gICAgLy9sZXQgb3JkZXJzdGF0ZSA9ICczOTEnO1xuICAgIGxldCBxdWVyeSA9IHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZmllbGRfb3JkZXJpZDogc2VhcmNoVGV4dCxcbiAgICAgIH0sXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5zZW5kUmVxdWVzdChzZXJ2aWNlVXJsLCBxdWVyeSk7XG4gIH1cblxuICB1cGRhdGVPcmRlckJ5T3JkZXJJZChvcmRlcikge1xuICAgIGxldCBzZXJ2aWNlVXJsID0gYCR7TWV0ZW9yLnNldHRpbmdzLmRydXBhbE9yZGVyVXBkYXRlfWA7XG4gICAgc2VydmljZVVybCA9IHNlcnZpY2VVcmwucmVwbGFjZSgvKFteOl1cXC8pXFwvKy9nLCBcIiQxXCIpO1xuICAgIC8vIGp1c3QgcGFzcyB0aGUgb3JkZXJcblxuICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJDaGVja2luZyBkYXRhIGluIHVwZGF0ZU9yZGVyQnlPcmRlcklkXCIpO1xuICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2cob3JkZXIpO1xuXG4gICAgLy9vcmRlci5hY3RpbmdfdWlkID0gdXNlck9iai51aWQ7XG4gICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIkFmdGVyLi4uXCIpO1xuICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2cob3JkZXIpO1xuXG4gICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhvcmRlcik7XG5cbiAgICBsZXQgdXBkYXRlU3RyZWFtID0ge1xuICAgICAgb3JkZXIsXG4gICAgfTtcbiAgICB1cGRhdGVTdHJlYW0uZGF0YSA9IHVwZGF0ZVN0cmVhbS5vcmRlcjtcbiAgICByZXR1cm4gdGhpcy5zZW5kUmVxdWVzdChzZXJ2aWNlVXJsLCB1cGRhdGVTdHJlYW0pO1xuICB9XG5cbiAgY3JlYXRlUGVyc29uT3JkZXIob3JkZXIpIHtcbiAgICBsZXQgc2VydmljZVVybCA9IGAke01ldGVvci5zZXR0aW5ncy5kcnVwYWxPcmRlckNyZWF0ZX1gO1xuICAgIHNlcnZpY2VVcmwgPSBzZXJ2aWNlVXJsLnJlcGxhY2UoLyhbXjpdXFwvKVxcLysvZywgXCIkMVwiKTtcbiAgICBsZXQgdXBkYXRlU3RyZWFtID0ge1xuICAgICAgb3JkZXIsXG4gICAgfTtcbiAgICB1cGRhdGVTdHJlYW0uZGF0YSA9IHVwZGF0ZVN0cmVhbS5vcmRlcjtcbiAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKHVwZGF0ZVN0cmVhbS5vcmRlcik7XG5cbiAgICBsZXQgZGF0YVJlcGx5ID0gdGhpcy5zZW5kUmVxdWVzdChzZXJ2aWNlVXJsLCB1cGRhdGVTdHJlYW0pO1xuICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coZGF0YVJlcGx5KTtcbiAgICByZXR1cm4gZGF0YVJlcGx5O1xuICB9XG5cbiAgZ2V0VGVybXModGVybXR5cGUpIHtcbiAgICBsZXQgc2VydmljZVVybCA9IGAke01ldGVvci5zZXR0aW5ncy5kcnVwYWxHZXRUYXh9YDtcbiAgICBzZXJ2aWNlVXJsID0gc2VydmljZVVybC5yZXBsYWNlKC8oW146XVxcLylcXC8rL2csIFwiJDFcIik7XG4gICAgbGV0IHF1ZXJ5ID0ge1xuICAgICAgZGF0YToge1xuICAgICAgICB0YXhvbm9teV90eXBlOiB0ZXJtdHlwZSxcbiAgICAgIH0sXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5zZW5kUmVxdWVzdChzZXJ2aWNlVXJsLCBxdWVyeSk7XG4gIH1cblxuICBxdWVyeVRlcm1zKHRlcm10eXBlLCBzZWFyY2hUZXh0KSB7XG4gICAgbGV0IHNlcnZpY2VVcmwgPSBgJHtNZXRlb3Iuc2V0dGluZ3MuZHJ1cGFsUXVlcnlUYXh9YDtcbiAgICBzZXJ2aWNlVXJsID0gc2VydmljZVVybC5yZXBsYWNlKC8oW146XVxcLylcXC8rL2csIFwiJDFcIik7XG4gICAgbGV0IHF1ZXJ5ID0ge1xuICAgICAgZGF0YToge1xuICAgICAgICB0YXhvbm9teV90eXBlOiB0ZXJtdHlwZSxcbiAgICAgICAgdGF4b25vbXlfYXV0b3NlYXJjaDogc2VhcmNoVGV4dCxcbiAgICAgIH0sXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5zZW5kUmVxdWVzdChzZXJ2aWNlVXJsLCBxdWVyeSk7XG4gIH1cblxuICBxdWVyeVRlcm1zQ291bnRyeShkYXRhQ29udGV4dCkge1xuICAgIGxldCBzZXJ2aWNlVXJsID0gYCR7TWV0ZW9yLnNldHRpbmdzLmRydXBhbFF1ZXJ5VGF4fWA7XG4gICAgc2VydmljZVVybCA9IHNlcnZpY2VVcmwucmVwbGFjZSgvKFteOl1cXC8pXFwvKy9nLCBcIiQxXCIpO1xuICAgIGxldCB0ZXJtdHlwZSA9IFwiY291bnRyaWVzXCI7XG4gICAgbGV0IHF1ZXJ5ID0ge1xuICAgICAgZGF0YToge1xuICAgICAgICB0YXhvbm9teV90eXBlOiB0ZXJtdHlwZSxcbiAgICAgICAgdGF4b25vbXlfcXVlcnlfY291bnRyeTogZGF0YUNvbnRleHQsXG4gICAgICB9LFxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMuc2VuZFJlcXVlc3Qoc2VydmljZVVybCwgcXVlcnkpO1xuICB9XG5cbiAgcXVlcnlQZXJzb25CeUlkKHNlYXJjaFRleHQpIHtcbiAgICBsZXQgc2VydmljZVVybCA9IGAke01ldGVvci5zZXR0aW5ncy5kcnVwYWxFbnRpdHlRdWVyeX1gO1xuICAgIHNlcnZpY2VVcmwgPSBzZXJ2aWNlVXJsLnJlcGxhY2UoLyhbXjpdXFwvKVxcLysvZywgXCIkMVwiKTtcbiAgICBsZXQgcXVlcnkgPSB7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIGZpZWxkX3BlcnNvbmlkOiBzZWFyY2hUZXh0LFxuICAgICAgICBxdWVyeV9kb21haW46IFtcInBlcnNvblwiXSxcbiAgICAgIH0sXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5zZW5kUmVxdWVzdChzZXJ2aWNlVXJsLCBxdWVyeSk7XG4gIH1cblxuICBxdWVyeVBlcnNvbihzZWFyY2hUZXh0LCBtZXRhKSB7XG4gICAgbGV0IHNlcnZpY2VVcmwgPSBgJHtNZXRlb3Iuc2V0dGluZ3MuZHJ1cGFsRW50aXR5UXVlcnl9YDtcbiAgICBzZXJ2aWNlVXJsID0gc2VydmljZVVybC5yZXBsYWNlKC8oW146XVxcLylcXC8rL2csIFwiJDFcIik7XG4gICAgbGV0IHF1ZXJ5ID0ge1xuICAgICAgZGF0YToge1xuICAgICAgICBxdWVyeTogc2VhcmNoVGV4dCxcbiAgICAgICAgcXVlcnlfZG9tYWluOiBbXCJwZXJzb25cIl0sXG4gICAgICAgIHF1ZXJ5X2xpbWl0OiBcIjEwMDBcIixcbiAgICAgICAgbWV0YV9yZXNwb25jZW1vZGU6IFwicXVlcnltb2RlXCIsXG4gICAgICAgIG1ldGFfcXVlcnlfZW5naW5lOiBcImZ1bGx0ZXh0XCIsXG4gICAgICAgIG1ldGFfcXVlcnlfYXJnczogbWV0YSxcbiAgICAgIH0sXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5zZW5kUmVxdWVzdChzZXJ2aWNlVXJsLCBxdWVyeSk7XG4gIH1cblxuICBxdWVyeVBlcnNvbkFkdmFuY2VkKHNlYXJjaFRleHQpIHtcbiAgICBsZXQgc2VydmljZVVybCA9IGAke01ldGVvci5zZXR0aW5ncy5kcnVwYWxFbnRpdHlRdWVyeX1gO1xuICAgIHNlcnZpY2VVcmwgPSBzZXJ2aWNlVXJsLnJlcGxhY2UoLyhbXjpdXFwvKVxcLysvZywgXCIkMVwiKTtcbiAgICBsZXQgcXVlcnkgPSB7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIHF1ZXJ5OiBzZWFyY2hUZXh0LFxuICAgICAgICBxdWVyeV9kb21haW46IFtcInBlcnNvblwiXSxcbiAgICAgICAgcXVlcnlfbGltaXQ6IFwiMjAwMFwiLFxuICAgICAgICBtZXRhX3Jlc3BvbmNlbW9kZTogXCJxdWVyeW1vZGVcIixcbiAgICAgICAgbWV0YV9xdWVyeV9lbmdpbmU6IFwicGVyc29uYWR2YW5jZWRcIixcbiAgICAgICAgcGVyc29uYWR2YW5jZWRfZGlzdGluY3Q6IFwiMVwiLFxuICAgICAgfSxcbiAgICB9O1xuICAgIHJldHVybiB0aGlzLnNlbmRSZXF1ZXN0KHNlcnZpY2VVcmwsIHF1ZXJ5KTtcbiAgfVxuXG4gIHF1ZXJ5Um9sZUFkdmFuY2VkKHNlYXJjaFRleHQsIHF1ZXJ5Um9sZXMpIHtcbiAgICBsZXQgc2VydmljZVVybCA9IGAke01ldGVvci5zZXR0aW5ncy5kcnVwYWxFbnRpdHlRdWVyeX1gO1xuICAgIHNlcnZpY2VVcmwgPSBzZXJ2aWNlVXJsLnJlcGxhY2UoLyhbXjpdXFwvKVxcLysvZywgXCIkMVwiKTtcbiAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKHF1ZXJ5Um9sZXMpO1xuICAgIGxldCBxdWVyeSA9IHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgcXVlcnk6IHNlYXJjaFRleHQsXG4gICAgICAgIHF1ZXJ5X2RvbWFpbjogW1wicGVyc29uXCJdLFxuICAgICAgICBxdWVyeV9saW1pdDogXCIyMDAwXCIsXG4gICAgICAgIG1ldGFfcmVzcG9uY2Vtb2RlOiBcInF1ZXJ5bW9kZVwiLFxuICAgICAgICBtZXRhX3F1ZXJ5X2VuZ2luZTogXCJyb2xlYWR2YW5jZWRcIixcbiAgICAgICAgYWR2YW5jZWRyb2xlX3JvbGVzOiBxdWVyeVJvbGVzLmFkdmFuY2Vkcm9sZV9yb2xlcyxcbiAgICAgICAgYWR2YW5jZWRyb2xlX2RldGFpbGVkY2F0ZWdvcnlyb2xlOlxuICAgICAgICAgIHF1ZXJ5Um9sZXMuYWR2YW5jZWRyb2xlX2RldGFpbGVkY2F0ZWdvcnlyb2xlLFxuICAgICAgICBhZHZhbmNlZHJvbGVfYmFzZWNhdGVnb3J5cm9sZTogcXVlcnlSb2xlcy5hZHZhbmNlZHJvbGVfYmFzZWNhdGVnb3J5cm9sZSxcbiAgICAgICAgYWR2YW5jZWRyb2xlX29yZ2FuaXNhdGlvbjogcXVlcnlSb2xlcy5hZHZhbmNlZHJvbGVfb3JnYW5pc2F0aW9uLFxuICAgICAgICBhZHZhbmNlZHJvbGVfY291bnRyeW9manVyaXNkaWN0aW9uOlxuICAgICAgICAgIHF1ZXJ5Um9sZXMuYWR2YW5jZWRyb2xlX2NvdW50cnlvZmp1cmlzZGljdGlvbixcbiAgICAgIH0sXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5zZW5kUmVxdWVzdChzZXJ2aWNlVXJsLCBxdWVyeSk7XG4gIH1cblxuICBsaXZlc3RyZWFtKHNlYXJjaFRleHQpIHtcbiAgICBsZXQgc2VydmljZVVybCA9IGAke01ldGVvci5zZXR0aW5ncy5kcnVwYWxFbnRpdHlRdWVyeX1gO1xuICAgIHNlcnZpY2VVcmwgPSBzZXJ2aWNlVXJsLnJlcGxhY2UoLyhbXjpdXFwvKVxcLysvZywgXCIkMVwiKTtcbiAgICAvL2xldCBvcmRlcnN0YXRlID0gJzM5MSc7XG4gICAgbGV0IHF1ZXJ5ID0ge1xuICAgICAgZGF0YToge1xuICAgICAgICBmaWVsZF9wYXJlbnRfcmVmZXJlbmNlOiBzZWFyY2hUZXh0LFxuICAgICAgICBxdWVyeV9kb21haW46IFtcImxpdmVzdHJlYW1cIl0sXG4gICAgICAgIHF1ZXJ5X2xpbWl0OiBcIjUwXCIsXG4gICAgICAgIG1ldGFfcmVzcG9uY2Vtb2RlOiBcInF1ZXJ5bW9kZVwiLFxuICAgICAgICBtZXRhX3F1ZXJ5X2VuZ2luZTogXCJsaXZlc3RyZWFtXCIsXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKHF1ZXJ5KTtcblxuICAgIHJldHVybiB0aGlzLnNlbmRSZXF1ZXN0KHNlcnZpY2VVcmwsIHF1ZXJ5KTtcbiAgfVxuXG4gIHByb2Nlc3NPcmRlcihyZXF1ZXN0KSB7XG4gICAgbGV0IHNlcnZpY2VVcmwgPSBgJHtNZXRlb3Iuc2V0dGluZ3MuZHJ1cGFsUHJvY2Vzc31gO1xuICAgIHNlcnZpY2VVcmwgPSBzZXJ2aWNlVXJsLnJlcGxhY2UoLyhbXjpdXFwvKVxcLysvZywgXCIkMVwiKTtcbiAgICBsZXQgcXVlcnkgPSB7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIGZpZWxkX29yZGVyaWQ6IHJlcXVlc3QuZmllbGRfb3JkZXJpZCxcbiAgICAgICAgZmllbGRfb3JkZXJfc3RhdGVfcmVxdWVzdF9uZXh0OiByZXF1ZXN0LmZpZWxkX29yZGVyX3N0YXRlX3JlcXVlc3RfbmV4dCxcbiAgICAgIH0sXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5zZW5kUmVxdWVzdChzZXJ2aWNlVXJsLCBxdWVyeSk7XG4gIH1cblxuICBhc3luYyBnZXRVc2VyUm9sZXModWlkKSB7XG4gICAgbGV0IHNlcnZpY2VVcmwgPSBgJHtNZXRlb3Iuc2V0dGluZ3MuZHJ1cGFsVXNlclVybH1gO1xuICAgIHNlcnZpY2VVcmwgPSBzZXJ2aWNlVXJsLnJlcGxhY2UoLyhbXjpdXFwvKVxcLysvZywgXCIkMVwiKTtcblxuICAgIGlmICghdWlkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBsZXQgcXVlcnkgPSB7XG4gICAgICBkYXRhOiB7IHVpZCB9LFxuICAgIH07XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5zZW5kUmVxdWVzdEFzeW5jKHNlcnZpY2VVcmwsIHF1ZXJ5KTtcbiAgICAgIC8vcm9sZXMgY29udGFpbiBhcnJheXMgb2YgY29tcGFueSBpZHNcbiAgICAgIGNvbnN0IHJvbGVzID0ge1xuICAgICAgICBhZG1pbjogcmVzcG9uc2UgJiYgcmVzcG9uc2UuYWRtaW5faW5fY29tcGFuaWVzLFxuICAgICAgICBtZW1iZXI6IHJlc3BvbnNlICYmIHJlc3BvbnNlLm1lbWJlcl9pbl9jb21wYW5pZXMsXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHJvbGVzO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJFcnJvciBpbiBnZXRVc2VyUm9sZXNcIik7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKGUpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGdldENvbXBhbnlVc2Vycyhjb21wYW55SWQpIHtcbiAgICBsZXQgc2VydmljZVVybCA9IGAke01ldGVvci5zZXR0aW5ncy5kcnVwYWxDb21wYW55VXNlcnNVcmx9YDtcbiAgICBzZXJ2aWNlVXJsID0gc2VydmljZVVybC5yZXBsYWNlKC8oW146XVxcLylcXC8rL2csIFwiJDFcIik7XG4gICAgbGV0IHF1ZXJ5ID0ge1xuICAgICAgZGF0YTogeyBmaWVsZF9jb21wYW55X2lkOiBjb21wYW55SWQgfSxcbiAgICB9O1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvbXBhbnkgPSBhd2FpdCB0aGlzLnNlbmRSZXF1ZXN0QXN5bmMoc2VydmljZVVybCwgcXVlcnkpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIkNvbXBhbnkgdXNlcnMgcmV0dXJuZWQ6XCIpO1xuXG4gICAgICBsZXQgYWRtaW5pc3RyYXRvcnMgPSBbXTtcbiAgICAgIGlmIChjb21wYW55ICYmIGNvbXBhbnkuZmllbGRfY29tcGFueV9hZG1pbmlzdHJhdG9ycykge1xuICAgICAgICBsZXQgdGVtcCA9IGNvbXBhbnkuZmllbGRfY29tcGFueV9hZG1pbmlzdHJhdG9ycy5tYXAoKHVzZXIpID0+IHtcbiAgICAgICAgICByZXR1cm4gdXNlcjtcbiAgICAgICAgfSk7XG4gICAgICAgIGFkbWluaXN0cmF0b3JzID0gYWRtaW5pc3RyYXRvcnMuY29uY2F0KHRlbXApO1xuICAgICAgfVxuXG4gICAgICBsZXQgbWVtYmVycyA9IFtdO1xuICAgICAgaWYgKGNvbXBhbnkgJiYgY29tcGFueS5maWVsZF9jb21wYW55X21lbWJlcnMpIHtcbiAgICAgICAgbGV0IHRlbXAgPSBjb21wYW55LmZpZWxkX2NvbXBhbnlfbWVtYmVycy5tYXAoKHVzZXIpID0+IHtcbiAgICAgICAgICB1c2VyLnN0YXR1cyA9IFwiYWN0aXZlXCI7XG4gICAgICAgICAgcmV0dXJuIHVzZXI7XG4gICAgICAgIH0pO1xuICAgICAgICBtZW1iZXJzID0gbWVtYmVycy5jb25jYXQodGVtcCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb21wYW55ICYmIGNvbXBhbnkuZmllbGRfY29tcGFueV9tZW1iZXJzX2luYWN0aXZlKSB7XG4gICAgICAgIGxldCB0ZW1wID0gY29tcGFueS5maWVsZF9jb21wYW55X21lbWJlcnNfaW5hY3RpdmUubWFwKCh1c2VyKSA9PiB7XG4gICAgICAgICAgdXNlci5zdGF0dXMgPSBcImluYWN0aXZlXCI7XG4gICAgICAgICAgcmV0dXJuIHVzZXI7XG4gICAgICAgIH0pO1xuICAgICAgICBtZW1iZXJzID0gbWVtYmVycy5jb25jYXQodGVtcCk7XG4gICAgICB9XG4gICAgICBjb25zdCB1c2VycyA9IHtcbiAgICAgICAgY29tcGFueUlkLFxuICAgICAgICBhZG1pbnM6IGFkbWluaXN0cmF0b3JzLFxuICAgICAgICBtZW1iZXJzOiBtZW1iZXJzLFxuICAgICAgfTtcblxuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyh1c2Vycyk7XG4gICAgICByZXR1cm4gdXNlcnM7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIkVycm9yIGluIGdldENvbXBhbnlVc2Vyc1wiKTtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coZSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgbWFuYWdlVXNlcih1aWQsIGFjdGlvbiwgY29tcGFueUlkKSB7XG4gICAgbGV0IHNlcnZpY2VVcmwgPSBgJHtNZXRlb3Iuc2V0dGluZ3MuZHJ1cGFsTWFuYWdlVXNlclVybH1gO1xuICAgIHNlcnZpY2VVcmwgPSBzZXJ2aWNlVXJsLnJlcGxhY2UoLyhbXjpdXFwvKVxcLysvZywgXCIkMVwiKTtcbiAgICBjb25zdCBjb250ZW50U2VydmVyQWN0aW9uID1cbiAgICAgIGFjdGlvbiA9PT0gVVNFUl9BQ1RJT05fQUNUSVZBVEUgPyBcImFjdGl2YXRlVXNlclwiIDogXCJkaXNhYmxlVXNlclwiO1xuICAgIGxldCBxdWVyeSA9IHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgdWlkLFxuICAgICAgICBhY3Rpb246IGNvbnRlbnRTZXJ2ZXJBY3Rpb24sXG4gICAgICAgIGZpZWxkX2NvbXBhbnlfaWQ6IGNvbXBhbnlJZCxcbiAgICAgIH0sXG4gICAgfTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnNlbmRSZXF1ZXN0QXN5bmMoc2VydmljZVVybCwgcXVlcnkpO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJFcnJvciBpbiBtYW5hZ2VVc2VyXCIpO1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhlKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBkcnVwYWxJbnNlcnRVc2VyKHVzZXIpIHtcbiAgICBsZXQgc2VydmljZVVybCA9IGAke01ldGVvci5zZXR0aW5ncy5kcnVwYWxJbnNlcnRVc2VyfWA7XG4gICAgc2VydmljZVVybCA9IHNlcnZpY2VVcmwucmVwbGFjZSgvKFteOl1cXC8pXFwvKy9nLCBcIiQxXCIpO1xuICAgIGxldCBxdWVyeSA9IHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgdXNlcl9tYWlsOiB1c2VyLm1haWwsXG4gICAgICAgIHVzZXJfbmFtZTogdXNlci5uYW1lLFxuICAgICAgICBzZWNyZXRRdWVzdGlvbjogdXNlci5zZWNyZXRRdWVzdGlvbixcbiAgICAgICAgc2VjcmV0QW5zd2VyOiB1c2VyLnNlY3JldEFuc3dlcixcbiAgICAgICAgcHc6IHVzZXIucHcsXG4gICAgICAgIGFjdGlvbjogXCJuZXdVc2VyXCIsXG4gICAgICB9LFxuICAgIH07XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5zZW5kUmVxdWVzdEFzeW5jKHNlcnZpY2VVcmwsIHF1ZXJ5KTtcbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiRXJyb3IgaW4gaW5zZXJ0VXNlclwiKTtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coZSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgYWRkVXNlcih1c2VyLCBjb21wYW55SWQpIHtcbiAgICBsZXQgc2VydmljZVVybCA9IGAke01ldGVvci5zZXR0aW5ncy5kcnVwYWxNYW5hZ2VVc2VyVXJsfWA7XG4gICAgc2VydmljZVVybCA9IHNlcnZpY2VVcmwucmVwbGFjZSgvKFteOl1cXC8pXFwvKy9nLCBcIiQxXCIpO1xuICAgIGxldCBxdWVyeSA9IHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgdXNlcl9tYWlsOiB1c2VyLm1haWwsXG4gICAgICAgIHVzZXJfbmFtZTogdXNlci5uYW1lLFxuICAgICAgICBhY3Rpb246IFwibmV3VXNlclwiLFxuICAgICAgICBmaWVsZF9jb21wYW55X2lkOiBjb21wYW55SWQsXG4gICAgICB9LFxuICAgIH07XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5zZW5kUmVxdWVzdEFzeW5jKHNlcnZpY2VVcmwsIHF1ZXJ5KTtcbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiRXJyb3IgaW4gbWFuYWdlVXNlclwiKTtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coZSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgc2VuZFF1ZXN0aW9uKHF1ZXJ5KSB7XG4gICAgbGV0IHNlcnZpY2VVcmwgPSBgJHtNZXRlb3Iuc2V0dGluZ3MuZHJ1cGFsQ29udGFjdFVybH1gO1xuICAgIHNlcnZpY2VVcmwgPSBzZXJ2aWNlVXJsLnJlcGxhY2UoLyhbXjpdXFwvKVxcLysvZywgXCIkMVwiKTtcbiAgICBsZXQgcXVlcnlPcHRpb25zID0ge1xuICAgICAgZGF0YTogcXVlcnksXG4gICAgfTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnNlbmRSZXF1ZXN0QXN5bmMoc2VydmljZVVybCwgcXVlcnlPcHRpb25zKTtcbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiRXJyb3IgaW4gc2VuZFF1ZXN0aW9uXCIpO1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhlKTtcbiAgICB9XG4gIH1cbiAgYXN5bmMgZ2V0QXJ0aWNsZShxdWVyeSkge1xuICAgIGxldCBzZXJ2aWNlVXJsID0gYCR7TWV0ZW9yLnNldHRpbmdzLmRydXBhbEdldEFydGljbGVVcmx9YDtcbiAgICBzZXJ2aWNlVXJsID0gc2VydmljZVVybC5yZXBsYWNlKC8oW146XVxcLylcXC8rL2csIFwiJDFcIik7XG4gICAgbGV0IHF1ZXJ5T3B0aW9ucyA9IHtcbiAgICAgIGRhdGE6IHF1ZXJ5LFxuICAgIH07XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5zZW5kUmVxdWVzdEFzeW5jKHNlcnZpY2VVcmwsIHF1ZXJ5T3B0aW9ucyk7XG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIkVycm9yIGluIGdldEFydGljbGVcIik7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKGUpO1xuICAgIH1cbiAgfVxuICAvLyBhc3luYyBnZXRBcnRpY2xlKHF1ZXJ5KSB7XG4gIC8vICAgbGV0IHNlcnZpY2VVcmwgPSBgJHtNZXRlb3Iuc2V0dGluZ3MuZHJ1cGFsR2V0QXJ0aWNsZVVybH1gO1xuICAvLyAgIHNlcnZpY2VVcmwgPSBzZXJ2aWNlVXJsLnJlcGxhY2UoLyhbXjpdXFwvKVxcLysvZywgXCIkMVwiKTtcbiAgLy8gICBsZXQgcXVlcnlPcHRpb25zID0ge1xuICAvLyAgICAgZGF0YTogcXVlcnlcbiAgLy8gICB9O1xuICAvLyAgIHRyeSB7XG4gIC8vICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuc2VuZFJlcXVlc3RBc3luYyhzZXJ2aWNlVXJsLCBxdWVyeU9wdGlvbnMpO1xuICAvLyAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAvLyAgIH0gY2F0Y2ggKGUpIHtcbiAgLy8gICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJFcnJvciBpbiBnZXRBcnRpY2xlXCIpO1xuICAvLyAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhlKTtcbiAgLy8gICB9XG4gIC8vIH1cbiAgYXN5bmMgZmlsZWFyZWFHZXRGaWxlKHF1ZXJ5KSB7XG4gICAgbGV0IHNlcnZpY2VVcmwgPSBgJHtNZXRlb3Iuc2V0dGluZ3MuZHJ1cGFsRmlsZWFyZWFHZXRGaWxlfWA7XG4gICAgc2VydmljZVVybCA9IHNlcnZpY2VVcmwucmVwbGFjZSgvKFteOl1cXC8pXFwvKy9nLCBcIiQxXCIpO1xuICAgIGxldCBxdWVyeU9wdGlvbnMgPSB7XG4gICAgICBkYXRhOiBxdWVyeSxcbiAgICB9O1xuICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJQcmVwYXJpbmcgdG8gZ2V0IHRoZSBmaWxlLi4uIVwiKTtcbiAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKHF1ZXJ5KTtcblxuICAgIHRyeSB7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiU2VuZGluZyBSZXF1ZXN0Li4uIVwiKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5zZW5kUmVxdWVzdEFzeW5jKHNlcnZpY2VVcmwsIHF1ZXJ5T3B0aW9ucyk7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiR2V0IEl0ZW0gYmFjayBmcm9tIFJlcXVlc3RcIik7XG5cbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiRXJyb3IgaW4gZmlsZWFyZWFHZXRJdGVtXCIpO1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhlKTtcbiAgICB9XG4gIH1cbiAgYXN5bmMgZmlsZWFyZWFRdWVyeShxdWVyeSkge1xuICAgIGxldCBzZXJ2aWNlVXJsID0gYCR7TWV0ZW9yLnNldHRpbmdzLmRydXBhbEZpbGVhcmVhUXVlcnl9YDtcbiAgICBzZXJ2aWNlVXJsID0gc2VydmljZVVybC5yZXBsYWNlKC8oW146XVxcLylcXC8rL2csIFwiJDFcIik7XG4gICAgbGV0IHF1ZXJ5T3B0aW9ucyA9IHtcbiAgICAgIGRhdGE6IHF1ZXJ5LFxuICAgIH07XG4gICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcImZpbGVhcmVhUXVlcnkgR2V0dGluZyBjb250ZW50Li4uIVwiKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuc2VuZFJlcXVlc3RBc3luYyhzZXJ2aWNlVXJsLCBxdWVyeU9wdGlvbnMpO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJFcnJvciBpbiBmaWxlYXJlYVF1ZXJ5XCIpO1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhlKTtcbiAgICB9XG4gIH1cbiAgYXN5bmMgZHJ1cGFsR2V0VXNlcih1aWQpIHtcbiAgICBsZXQgc2VydmljZVVybCA9IGAke01ldGVvci5zZXR0aW5ncy5kcnVwYWxHZXRVc2VyfWA7XG4gICAgc2VydmljZVVybCA9IHNlcnZpY2VVcmwucmVwbGFjZSgvKFteOl1cXC8pXFwvKy9nLCBcIiQxXCIpO1xuICAgIGxldCBxdWVyeSA9IHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgbWV0aG9kOiBcInVpZFwiLFxuICAgICAgICB2YWx1ZTogdWlkLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5zZW5kUmVxdWVzdEFzeW5jKHNlcnZpY2VVcmwsIHF1ZXJ5KTtcbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiRXJyb3IgaW4gZ2V0VXNlclwiKTtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coZSk7XG4gICAgfVxuICB9XG4gIGFzeW5jIGdldFVzZXJCeUF0dHJpYnV0ZShtZXRob2QsIHZhbHVlKSB7XG4gICAgbGV0IHNlcnZpY2VVcmwgPSBgJHtNZXRlb3Iuc2V0dGluZ3MuZHJ1cGFsR2V0VXNlcn1gO1xuICAgIHNlcnZpY2VVcmwgPSBzZXJ2aWNlVXJsLnJlcGxhY2UoLyhbXjpdXFwvKVxcLysvZywgXCIkMVwiKTtcbiAgICBsZXQgcXVlcnkgPSB7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICB9LFxuICAgIH07XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnNlbmRSZXF1ZXN0QXN5bmMoc2VydmljZVVybCwgcXVlcnkpO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJFcnJvciBpbiBnZXRVc2VyXCIpO1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhlKTtcbiAgICB9XG4gIH1cbn1cbiIsIi8qKlxuICogQ3JlYXRlZCBieSBrYWNwZXIgb24gNi84LzE2LlxuICovXG4vKlxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEZpbGVNYW5hZ2VyKGJhc2VEaXJlY3RvcnkpIHtcbiAgdmFyIHBhdGggPSBOcG0ucmVxdWlyZSgncGF0aCcpO1xuICB2YXIgZnMgPSBOcG0ucmVxdWlyZSgnZnMnKTtcbiAgYmFzZURpcmVjdG9yeSA9IGJhc2VEaXJlY3RvcnkudHJpbSgnLycpO1xuICBsZXQgZmlsZXNSb290UGF0aCA9IE1ldGVvci5zZXR0aW5ncy5maWxlc1Jvb3RQYXRoO1xuICB2YXIgYmFzZVBhdGggPSBgJHtmaWxlc1Jvb3RQYXRofS8ke2Jhc2VEaXJlY3Rvcnl9L2A7XG4gIGJhc2VQYXRoID0gYmFzZVBhdGgucmVwbGFjZSgnLy8nLCAnLycpO1xuXG4gIHRoaXMucmVhZElucHV0RmlsZUFzQnVmZmVyID0gZnVuY3Rpb24gKGZpbGVOYW1lKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBmaWxlQnVmZmVyID0gZnMucmVhZEZpbGVTeW5jKGJhc2VQYXRoICsgZmlsZU5hbWUpO1xuICAgICAgcmV0dXJuIGZpbGVCdWZmZXI7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBGaWxlICR7ZmlsZU5hbWV9IG5vdCBmb3VuZGApO1xuICAgIH1cbiAgfTtcblxuICB0aGlzLnJlYWRPdXRwdXRGaWxlQXNCdWZmZXIgPSBmdW5jdGlvbiAoZmlsZU5hbWUpIHtcbiAgICB2YXIgZmlsZUJ1ZmZlciA9IGZzLnJlYWRGaWxlU3luYyhiYXNlUGF0aCArICdvdXQvJyArIGZpbGVOYW1lKTtcbiAgICByZXR1cm4gZmlsZUJ1ZmZlcjtcbiAgfTtcblxuICB0aGlzLndyaXRlQnVmZmVyQXNJbnB1dEZpbGUgPSBmdW5jdGlvbiAoZmlsZU5hbWUsIHdyaXRlQnVmZmVyKSB7XG4gICAgY3JlYXRlUGF0aElmRG9lc05vdEV4aXN0KGJhc2VQYXRoKTtcbiAgICBmcy53cml0ZUZpbGVTeW5jKGJhc2VQYXRoICsgZmlsZU5hbWUsIHdyaXRlQnVmZmVyKTtcbiAgfTtcblxuICB0aGlzLndyaXRlQnVmZmVyQXNPdXRwdXRGaWxlID0gZnVuY3Rpb24gKGZpbGVOYW1lLCB3cml0ZUJ1ZmZlcikge1xuICAgIGxldCBvdXRQYXRoID0gYmFzZVBhdGggKyAnb3V0Lyc7XG4gICAgY3JlYXRlUGF0aElmRG9lc05vdEV4aXN0KG91dFBhdGgpO1xuICAgIGZzLndyaXRlRmlsZVN5bmMob3V0UGF0aCArIGZpbGVOYW1lLCB3cml0ZUJ1ZmZlcik7XG4gIH07XG5cbiAgdGhpcy5zZXRCYXNlRGlyZWN0b3J5ID0gZnVuY3Rpb24gKGJhc2VEaXJlY3RvcnkpIHtcbiAgICBiYXNlRGlyZWN0b3J5ID0gYmFzZURpcmVjdG9yeS50cmltKCcvJyk7XG4gICAgYmFzZVBhdGggPSBgJHtmaWxlc1Jvb3RQYXRofS8ke2Jhc2VEaXJlY3Rvcnl9L2A7XG4gIH07XG5cbiAgdGhpcy5nZXRCYXNlUGF0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gYmFzZVBhdGg7XG4gIH07XG5cbiAgdGhpcy5nZXRCYXNlT3V0UGF0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gYmFzZVBhdGggKyAnb3V0JztcbiAgfTtcblxuICB0aGlzLmxpc3RGaWxlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZnMucmVhZGRpclN5bmMoYmFzZVBhdGgpLnJlZHVjZShmdW5jdGlvbiAobGlzdCwgZmlsZSkge1xuICAgICAgdmFyIG5hbWUgPSBwYXRoLmpvaW4oYmFzZVBhdGgsIGZpbGUpO1xuICAgICAgaWYgKCFmcy5zdGF0U3luYyhuYW1lKS5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgIGxpc3QucHVzaChmaWxlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBsaXN0O1xuICAgIH0sIFtdKTtcbiAgfTtcblxuICB2YXIgY3JlYXRlUGF0aElmRG9lc05vdEV4aXN0ID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICB2YXIgZ2V0UGFyZW50UGF0aCA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAvLyAgIHJvb3QvZGlyMS9kaXIyLyAtPiByb290L2RpcjEvZGlyMiAtPiByb290L2RpcjFcbiAgICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoL1xcLyskLywgJycpO1xuICAgICAgbGV0IGxhc3RTbGFzaEluZGV4ID0gcGF0aC5sYXN0SW5kZXhPZignLycpO1xuICAgICAgcmV0dXJuIHBhdGguc3Vic3RyaW5nKDAsIGxhc3RTbGFzaEluZGV4KTtcblxuICAgIH07XG5cbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMocGF0aCkpIHtcbiAgICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGBDcmVhdGluZyBwYXRoICR7cGF0aH1gKTtcbiAgICAgIGxldCBwYXJlbnRQYXRoID0gZ2V0UGFyZW50UGF0aChwYXRoKTtcbiAgICAgIGlmICghZnMuZXhpc3RzU3luYyhwYXJlbnRQYXRoKSkge1xuICAgICAgICBjcmVhdGVQYXRoSWZEb2VzTm90RXhpc3QocGFyZW50UGF0aClcbiAgICAgIH1cbiAgICAgIGZzLm1rZGlyU3luYyhwYXRoKTtcbiAgICB9XG4gIH1cblxufVxuKi9cbiIsImltcG9ydCB7QWRtaW5zLCBXb3JrZ3JvdXBzLCBXb3JrZ3JvdXBVc2VycywgUHVibGlzaGluZ1JlZ2lvbnMsIEFydGljbGVzfSBmcm9tICcvbGliL2NvbGxlY3Rpb25zJztcbmltcG9ydCBDb25zdGFudHMgZnJvbSAnL2xpYi9jb25zdGFudHMnO1xuaW1wb3J0IFdvcmtncm91cCBmcm9tIFwiLi93b3JrZ3JvdXBcIjtcbmltcG9ydCB7XG4gIERFRkNPTjksXG4gIERFRkNPTjcsXG4gIERFRkNPTjUsXG4gIERFRkNPTjQsXG4gIERFRkNPTjMsXG4gIERFRkNPTjIsXG4gIERFRkNPTjEsXG59IGZyb20gXCIvZGVidWcuanNvblwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgaXNTdXBlckFkbWluOiBmdW5jdGlvbiAodXNlcklkKSB7XG5cbiAgICBjb25zdCBhZG1pbiA9IEFkbWlucy5maW5kT25lKHtzdGF0dXM6ICdhY3RpdmUnLCB1c2VySWQsIHJvbGVJZDogQ29uc3RhbnRzLlVzZXJSb2xlcy5TVVBFUl9BRE1JTn0pO1xuICAgIHJldHVybiAhIWFkbWluO1xuICB9LFxuXG4gIGlzUmVnaW9uQWRtaW46IGZ1bmN0aW9uICh1c2VySWQsIHJlZ2lvbklkKSB7XG5cbiAgICBpZiAoIXJlZ2lvbklkIHx8ICF1c2VySWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBsZXQgcmVnaW9uSWRzID0gW107XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShyZWdpb25JZCkpIHtcbiAgICAgIHJlZ2lvbklkcyA9IHJlZ2lvbklkO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJlZ2lvbklkcy5wdXNoKHJlZ2lvbklkKVxuICAgIH1cblxuICAgIGNvbnN0IHJlZ2lvbkFkbWluID0gQWRtaW5zLmZpbmRPbmUoe1xuICAgICAgc3RhdHVzOiAnYWN0aXZlJywgdXNlcklkLCByZWdpb25JZDogeyRpbjogcmVnaW9uSWRzfSxcbiAgICAgIHJvbGVJZDogQ29uc3RhbnRzLlVzZXJSb2xlcy5SRUdJT05fQURNSU5cbiAgICB9KTtcblxuICAgIHJldHVybiAhIXJlZ2lvbkFkbWluIHx8IHRoaXMuaXNTdXBlckFkbWluKHVzZXJJZCk7XG5cbiAgfSxcblxuICBpc0FueVJlZ2lvbkFkbWluOiBmdW5jdGlvbiAodXNlcklkKSB7XG5cbiAgICBpZiAoIXVzZXJJZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHJlZ2lvbkFkbWluID0gQWRtaW5zLmZpbmRPbmUoe1xuICAgICAgc3RhdHVzOiAnYWN0aXZlJywgdXNlcklkLFxuICAgICAgcm9sZUlkOiBDb25zdGFudHMuVXNlclJvbGVzLlJFR0lPTl9BRE1JTlxuICAgIH0pO1xuXG4gICAgcmV0dXJuICEhcmVnaW9uQWRtaW4gfHwgdGhpcy5pc1N1cGVyQWRtaW4odXNlcklkKTtcblxuICB9XG4gICxcblxuICBpc1dvcmtncm91cFJlZ2lvbkFkbWluOiBmdW5jdGlvbiAodXNlcklkLCB3b3JrZ3JvdXBJZCkge1xuXG4gICAgaWYgKCF3b3JrZ3JvdXBJZCB8fCAhdXNlcklkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3Qgd29ya2dyb3VwID0gV29ya2dyb3Vwcy5maW5kT25lKHtzdGF0dXM6ICdhY3RpdmUnLCAnX2lkJzogd29ya2dyb3VwSWR9KTtcblxuICAgIGNvbnN0IHJlZ2lvbklkcyA9IHdvcmtncm91cCAmJiB3b3JrZ3JvdXAuZmllbGRfcHVibGlzaGluZ19yZWdpb25cbiAgICAgID8gd29ya2dyb3VwLmZpZWxkX3B1Ymxpc2hpbmdfcmVnaW9uIDogW107XG5cblxuICAgIGNvbnN0IHJlZ2lvbkFkbWluID0gQWRtaW5zLmZpbmRPbmUoe1xuICAgICAgc3RhdHVzOiAnYWN0aXZlJywgdXNlcklkLCByZWdpb25JZDogeyRpbjogcmVnaW9uSWRzfSxcbiAgICAgIHJvbGVJZDogQ29uc3RhbnRzLlVzZXJSb2xlcy5SRUdJT05fQURNSU5cbiAgICB9KTtcblxuICAgIHJldHVybiAhIXJlZ2lvbkFkbWluIHx8IHRoaXMuaXNTdXBlckFkbWluKHVzZXJJZCk7XG5cbiAgfVxuICAsXG4gIGlzQXJ0aWNsZXNSZWdpb25BZG1pbjogZnVuY3Rpb24gKHVzZXJJZCwgYXJ0aWNsZUlkKSB7XG5cbiAgICBpZiAoIWFydGljbGVJZCB8fCAhdXNlcklkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgYXJ0aWNsZSA9IEFydGljbGVzLmZpbmRPbmUoe3N0YXR1czogJ2FjdGl2ZScsICdfaWQnOiBhcnRpY2xlSWR9KTtcblxuICAgIGNvbnN0IHJlZ2lvbklkcyA9IGFydGljbGUgJiYgYXJ0aWNsZS5wdWJsaXNoaW5nUmVnaW9uc1xuICAgICAgPyBhcnRpY2xlLnB1Ymxpc2hpbmdSZWdpb25zIDogW107XG5cblxuICAgIGNvbnN0IHJlZ2lvbkFkbWluID0gQWRtaW5zLmZpbmRPbmUoe1xuICAgICAgc3RhdHVzOiAnYWN0aXZlJywgdXNlcklkLCByZWdpb25JZDogeyRpbjogcmVnaW9uSWRzfSxcbiAgICAgIHJvbGVJZDogQ29uc3RhbnRzLlVzZXJSb2xlcy5SRUdJT05fQURNSU5cbiAgICB9KTtcblxuICAgIHJldHVybiAhIXJlZ2lvbkFkbWluIHx8IHRoaXMuaXNTdXBlckFkbWluKHVzZXJJZCk7XG5cbiAgfVxuICAsXG5cbiAgaXNBcnRpY2xlc1dvcmtncm91cEFkbWluOiBmdW5jdGlvbiAodXNlcklkLCBhcnRpY2xlSWQpIHtcblxuICAgIGlmICghYXJ0aWNsZUlkIHx8ICF1c2VySWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgYXJ0aWNsZSA9IEFydGljbGVzLmZpbmRPbmUoe3N0YXR1czogJ2FjdGl2ZScsIF9pZDogYXJ0aWNsZUlkfSk7XG4gICAgaWYgKCFhcnRpY2xlIHx8ICFhcnRpY2xlLndvcmtncm91cElkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaXNXb3JrZ3JvdXBBZG1pbih1c2VySWQsIGFydGljbGUud29ya2dyb3VwSWQpO1xuICB9LFxuXG4gIGlzV29ya2dyb3VwQWRtaW46IGZ1bmN0aW9uICh1c2VySWQsIHdvcmtncm91cElkKSB7XG5cbiAgICBpZiAoIXdvcmtncm91cElkIHx8ICF1c2VySWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB3b3JrZ3JvdXBBZG1pbiA9IFdvcmtncm91cFVzZXJzLmZpbmRPbmUoe1xuICAgICAgc3RhdHVzOiAnYWN0aXZlJywgdXNlcl9pZDogdXNlcklkLFxuICAgICAgd29ya2dyb3VwX2lkOiB3b3JrZ3JvdXBJZCxcbiAgICAgIHVzZXJfZ3JvdXBfcm9sZTogQ29uc3RhbnRzLlVzZXJSb2xlcy5XT1JLR1JPVVBfQURNSU5cbiAgICB9KTtcblxuICAgIGNvbnN0IGlzV29ya2dyb3VwQWRtaW4gPSAhIXdvcmtncm91cEFkbWluO1xuXG4gICAgY29uc3Qgd29ya2dyb3VwID0gV29ya2dyb3Vwcy5maW5kT25lKHtzdGF0dXM6ICdhY3RpdmUnLCAnX2lkJzogd29ya2dyb3VwSWR9KTtcblxuICAgIGNvbnN0IHJlZ2lvbklkcyA9IHdvcmtncm91cCAmJiB3b3JrZ3JvdXAuZmllbGRfcHVibGlzaGluZ19yZWdpb25cbiAgICAgID8gd29ya2dyb3VwLmZpZWxkX3B1Ymxpc2hpbmdfcmVnaW9uIDogW107XG4gICAgY29uc3QgcmVzdWx0ID0gaXNXb3JrZ3JvdXBBZG1pbiB8fCB0aGlzLmlzUmVnaW9uQWRtaW4odXNlcklkLCByZWdpb25JZHMpIHx8IHRoaXMuaXNTdXBlckFkbWluKHVzZXJJZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICAsXG5cbiAgZ2V0QWRtaW5SZWdpb25JZHM6IGZ1bmN0aW9uICh1c2VySWQpIHtcbiAgICBpZiAodGhpcy5pc1N1cGVyQWRtaW4odXNlcklkKSkge1xuICAgICAgcmV0dXJuIFB1Ymxpc2hpbmdSZWdpb25zLmZpbmQoe3N0YXR1czogJ2FjdGl2ZSd9KS5mZXRjaCgpLm1hcChyZWdpb24gPT4gcmVnaW9uLl9pZCk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVnaW9uc0Zyb21Sb2xlID0gQWRtaW5zLmZpbmQoe1xuICAgICAgc3RhdHVzOiAnYWN0aXZlJywgdXNlcklkLFxuICAgICAgcm9sZUlkOiBDb25zdGFudHMuVXNlclJvbGVzLlJFR0lPTl9BRE1JTlxuICAgIH0pLmZldGNoKCkubWFwKGFkbWluUm9sZSA9PiBhZG1pblJvbGUucmVnaW9uSWQpO1xuXG4gICAgcmV0dXJuIHJlZ2lvbnNGcm9tUm9sZSA/IHJlZ2lvbnNGcm9tUm9sZSA6IFtdO1xuXG4gIH0sXG5cbiAgZ2V0QWRtaW5Xb3JrZ3JvdXBJZHM6IGZ1bmN0aW9uICh1c2VySWQpIHtcbiAgICBjb25zdCByZWdpb25JZHMgPSB0aGlzLmdldEFkbWluUmVnaW9uSWRzKHVzZXJJZCk7XG4gICAgY29uc3Qgd29ya2dyb3VwSWRzID0gV29ya2dyb3Vwcy5maW5kKFxuICAgICAge1xuICAgICAgICBzdGF0dXM6ICdhY3RpdmUnLFxuICAgICAgICAnZmllbGRfcHVibGlzaGluZ19yZWdpb24nOiB7JGluOiByZWdpb25JZHN9XG4gICAgICB9KVxuICAgICAgLmZldGNoKCkubWFwKHdvcmtncm91cCA9PiB3b3JrZ3JvdXAuX2lkKTtcbiAgICByZXR1cm4gd29ya2dyb3VwSWRzO1xuXG4gIH0sXG5cbiAgZ2V0UmVnaW9uQWRtaW5zSWRzOiBmdW5jdGlvbiAocmVnaW9uSWQpIHtcblxuICAgIGNvbnN0IGFkbWluc0ZvclJlZ2lvbiA9IEFkbWlucy5maW5kKHtcbiAgICAgIHN0YXR1czogJ2FjdGl2ZScsXG4gICAgICByb2xlSWQ6IENvbnN0YW50cy5Vc2VyUm9sZXMuUkVHSU9OX0FETUlOLFxuICAgICAgcmVnaW9uSWRcbiAgICB9KS5mZXRjaCgpLm1hcChhZG1pblJvbGUgPT4gYWRtaW5Sb2xlLnVzZXJJZCk7XG5cbiAgICByZXR1cm4gYWRtaW5zRm9yUmVnaW9uID8gYWRtaW5zRm9yUmVnaW9uIDogW107XG5cbiAgfVxuICAsXG5cbiAgZ2V0UmVnaW9uQWRtaW5zQ3Vyc29yOiBmdW5jdGlvbiAocmVnaW9uSWQpIHtcblxuICAgIHJldHVybiBBZG1pbnMuZmluZCh7XG4gICAgICBzdGF0dXM6ICdhY3RpdmUnLFxuICAgICAgcm9sZUlkOiBDb25zdGFudHMuVXNlclJvbGVzLlJFR0lPTl9BRE1JTixcbiAgICAgIHJlZ2lvbklkXG4gICAgfSk7XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQge0NoYXRSb29tcywgQ2hhdExpbmVzfSBmcm9tICcvbGliL2NvbGxlY3Rpb25zJztcbmltcG9ydCBDb25zdGFudHMgZnJvbSAnL2xpYi9jb25zdGFudHMnO1xuaW1wb3J0IHtNZXRlb3J9IGZyb20gXCJtZXRlb3IvbWV0ZW9yXCI7XG5cbmNvbnN0IGdyb3VwQnkgPSBmdW5jdGlvbih4cywga2V5KSB7XG4gIHJldHVybiB4cy5yZWR1Y2UoZnVuY3Rpb24ocnYsIHgpIHtcbiAgICAocnZbeFtrZXldXSA9IHJ2W3hba2V5XV0gfHwgW10pLnB1c2goeCk7XG4gICAgcmV0dXJuIHJ2O1xuICB9LCB7fSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgZ2V0Q2hhdFJvb21CeUlkOiBmdW5jdGlvbihpZCkge1xuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCB7IENoYXRSb29tcywgQ2hhdExpbmVzIH0gZnJvbSBcIi9saWIvY29sbGVjdGlvbnNcIjtcbmltcG9ydCBDb25zdGFudHMgZnJvbSBcIi9saWIvY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBNZXRlb3IgfSBmcm9tIFwibWV0ZW9yL21ldGVvclwiO1xuaW1wb3J0IHtcbiAgREVGQ09OOSxcbiAgREVGQ09ONyxcbiAgREVGQ09ONSxcbiAgREVGQ09ONCxcbiAgREVGQ09OMyxcbiAgREVGQ09OMixcbiAgREVGQ09OMSxcbn0gZnJvbSBcIi9kZWJ1Zy5qc29uXCI7XG5leHBvcnQgZGVmYXVsdCB7XG4gIC8qXG4gICAgICAgICAgR2V0cyBhbGwgYWN0aXZlIGFyaXRjbGVzJyBpZHMgZm9yIHVzZXJcbiAgICAgICAgICAqL1xuXG4gIF91cHNlcnRDaGF0cm9vbShhY3RpdmVQcm9ncmFtLCB1c2VycywgdXNlclVybCwgcHJvZ3JhbVVybCwgY2hhdFJvb21UeXBlKSB7XG4gICAgbGV0IHVzZXJfbGlzdCA9IFtdO1xuXG4gICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIkZpeGluZyBjaGF0cm9vbSAtIHVzZXJzIGFuZCBwcm9ncmFtXCIpO1xuICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2codXNlcnMpO1xuICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coYWN0aXZlUHJvZ3JhbSk7XG4gICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gICAgdXNlcnMuZm9yRWFjaCgodXNlcikgPT4ge1xuICAgICAgaXRlbSA9IHtcbiAgICAgICAgdXNlcklkOiB1c2VyLFxuICAgICAgfTtcbiAgICAgIHVzZXJfbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH0pO1xuXG4gICAgLy8gaGF2ZSB0byBzZXQgc3VidGl0bGUgdG8gc21hbGwgbGV0dGVyc1xuICAgIHZhciBjaGF0Um9vbSA9IHtcbiAgICAgIGNyZWF0ZWRBdDogY3VycmVudERhdGUsXG4gICAgICBtb2RpZmllZEF0OiBjdXJyZW50RGF0ZSxcbiAgICAgIHN0YXR1czogXCJhY3RpdmVcIixcbiAgICAgIGNyZWF0ZWRCeTogYWN0aXZlUHJvZ3JhbS5jcmVhdGVkQnksXG4gICAgICB1cmw6IHByb2dyYW1VcmwsXG4gICAgICB1c2VyVXJsOiB1c2VyVXJsLFxuICAgICAgdGl0bGU6IGFjdGl2ZVByb2dyYW0udGl0bGUsXG4gICAgICBzdWJ0aXRsZTogYWN0aXZlUHJvZ3JhbS5zdWJUaXRsZSxcbiAgICAgIHVzZXJzOiB1c2VyX2xpc3QsXG4gICAgICBjaGFubmVsSWQ6IGFjdGl2ZVByb2dyYW0uX2lkLFxuICAgICAgY2hhdFJvb21UeXBlOiBjaGF0Um9vbVR5cGUsXG4gICAgfTtcblxuICAgIGNvbnN0IHF1ZXJ5ID0geyBjaGFubmVsSWQ6IGFjdGl2ZVByb2dyYW0uY2hhbm5lbElkIH07XG4gICAgY29uc3QgdXBkYXRlID0geyAkc2V0OiBjaGF0Um9vbSB9O1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7IHVwc2VydDogdHJ1ZSB9O1xuXG4gICAgQ2hhdFJvb21zLnVwZGF0ZShxdWVyeSwgdXBkYXRlLCBvcHRpb25zKTtcbiAgfSxcblxuICBfdXBzZXJ0Q2hhdHJvb21zZXRBY3RpdmVVc2VyKGNoYW5uZWxJZCwgdXNlcklkKSB7XG4gICAgY29uc3QgY2hhdFJvb21zID0gQ2hhdFJvb21zLmZpbmQoe1xuICAgICAgY2hhbm5lbElkOiBjaGFubmVsSWQsXG4gICAgfSkuZmV0Y2goKTtcblxuICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJHZXR0aW5nIGNoYXRSb29tc1wiKTtcbiAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKGNoYXRSb29tcyk7XG5cbiAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiVXBkYXRlIGFjdGl2ZSB1c2VyIHRpbWVzdGFtcFwiKTtcbiAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKGNoYW5uZWxJZCk7XG4gICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyh1c2VySWQpO1xuXG4gICAgY29uc3QgY2hhdExpbmVzU2VsZWN0b3IgPSB7XG4gICAgICBjaGFubmVsSWQ6IGNoYW5uZWxJZCxcbiAgICAgIHN0YXR1czogXCJhY3RpdmVcIixcbiAgICB9O1xuXG4gICAgbGV0IGNoYXRMaW5lcyA9IENoYXRMaW5lcy5maW5kKGNoYXRMaW5lc1NlbGVjdG9yKS5mZXRjaCgpO1xuICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coY2hhdExpbmVzKTtcblxuICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcblxuICAgIGxldCBpdGVtID0ge307XG4gICAgbGV0IHVzZXJBY3RpdmVMaXN0ID0gW107XG4gICAgbGV0IGlzTmV3VXNlciA9IHRydWU7XG4gICAgaWYgKGNoYXRSb29tc1swXS51c2VyQWN0aXZlTGlzdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjaGF0Um9vbXNbMF0udXNlckFjdGl2ZUxpc3QuZm9yRWFjaCgodXNlcikgPT4ge1xuICAgICAgICBpc05ld1VzZXIgPSB1c2VyLnVzZXJJZCA9PT0gdXNlcklkID8gZmFsc2UgOiBpc05ld1VzZXI7XG4gICAgICAgIGxldCB0aGVBY3RpdmVEYXRlID1cbiAgICAgICAgICAgIHVzZXIudXNlcklkID09PSB1c2VySWQgPyBjdXJyZW50RGF0ZSA6IHVzZXIuYWN0aXZlRGF0ZSxcbiAgICAgICAgICBpdGVtID0ge1xuICAgICAgICAgICAgdXNlcklkOiB1c2VyLnVzZXJJZCxcbiAgICAgICAgICAgIGFjdGl2ZURhdGU6IHRoZUFjdGl2ZURhdGUsXG4gICAgICAgICAgICB1blJlYWRNZXNzYWdlczogX3VuUmVhZE1lc3NhZ2VzKHRoZUFjdGl2ZURhdGUsIGNoYXRMaW5lcyksXG4gICAgICAgICAgfTtcbiAgICAgICAgdXNlckFjdGl2ZUxpc3QucHVzaChpdGVtKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChpc05ld1VzZXIpIHtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJUaGUgbmV3IHVzZXIgaXMgYSBuZXcgdXNlclwiKTtcblxuICAgICAgaXRlbSA9IHtcbiAgICAgICAgdXNlcklkOiB1c2VySWQsXG4gICAgICAgIGFjdGl2ZURhdGU6IGN1cnJlbnREYXRlLFxuICAgICAgICB1blJlYWRNZXNzYWdlczogX3VuUmVhZE1lc3NhZ2VzKGN1cnJlbnREYXRlLCBjaGF0TGluZXMpLFxuICAgICAgfTtcbiAgICAgIHVzZXJBY3RpdmVMaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuXG4gICAgbGV0IGluZGV4ID0gY2hhdExpbmVzLmxlbmd0aCAtIDE7XG4gICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIkNIQVRMSU5FUyBMRU5HVEhcIik7XG4gICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhpbmRleCk7XG5cbiAgICAvLyBoYXZlIHRvIHNldCBzdWJ0aXRsZSB0byBzbWFsbCBsZXR0ZXJzXG4gICAgdmFyIGNoYXRSb29tID0ge1xuICAgICAgbW9kaWZpZWRBdDogY3VycmVudERhdGUsXG4gICAgICBsYXN0QWN0aW9uOiBjaGF0TGluZXNbaW5kZXhdLnRleHQsXG4gICAgICB1c2VyQWN0aXZlTGlzdDogdXNlckFjdGl2ZUxpc3QsXG4gICAgfTtcblxuICAgIGNvbnN0IHF1ZXJ5ID0geyBjaGFubmVsSWQ6IGNoYW5uZWxJZCB9O1xuICAgIGNvbnN0IHVwZGF0ZSA9IHsgJHNldDogY2hhdFJvb20gfTtcbiAgICBjb25zdCBvcHRpb25zID0geyB1cHNlcnQ6IHRydWUgfTtcblxuICAgIENoYXRSb29tcy51cGRhdGUocXVlcnksIHVwZGF0ZSwgb3B0aW9ucyk7XG4gIH0sXG5cbiAgX2dldE51bU9mVW5yZWFkTWVzc2FnZXModXNlcklkKSB7XG4gICAgY29uc3QgY2hhdFJvb21zU2VsZWN0b3IgPSB7XG4gICAgICBzdGF0dXM6IFwiYWN0aXZlXCIsXG4gICAgICBcInVzZXJzLnVzZXJJZFwiOiB7XG4gICAgICAgICRpbjogW3VzZXJJZF0sXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBjb25zdCBjaGF0Um9vbXMgPSBDaGF0Um9vbXMuZmluZChjaGF0Um9vbXNTZWxlY3RvcikuZmV0Y2goKTtcblxuICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJGaW5kIGNoZWNrIGNoYXQgcm9vbSBmb3IgdXNlci4uLlwiKTtcblxuICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coY2hhdFJvb21zKTtcblxuICAgIHJldHVybiBfdXNlcnNVblJlYWRNZXNzYWdlcyh1c2VySWQsIGNoYXRSb29tcyk7XG4gIH0sXG59O1xuXG5mdW5jdGlvbiBfdXNlcnNVblJlYWRNZXNzYWdlcyh1c2VySWQsIGNoYXRSb29tcykge1xuICBsZXQgdG90YWxVblJlYWQgPSAwO1xuXG4gIGNoYXRSb29tcy5mb3JFYWNoKChjaGF0Um9vbSkgPT4ge1xuICAgIGlmIChjaGF0Um9vbS51c2VyQWN0aXZlTGlzdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjaGF0Um9vbS51c2VyQWN0aXZlTGlzdC5mb3JFYWNoKChhY3RpdmVVc2VyKSA9PiB7XG4gICAgICAgIGlmIChhY3RpdmVVc2VyLnVzZXJJZCA9PT0gdXNlcklkKSB7XG4gICAgICAgICAgdG90YWxVblJlYWQgPSB0b3RhbFVuUmVhZCArIGFjdGl2ZVVzZXIudW5SZWFkTWVzc2FnZXM7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG4gIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJUb3RhbCBVbnJlYWQgbWVzc2FnZXMgZm9yIHVzZXJcIik7XG4gIERFRkNPTjMgJiYgY29uc29sZS5sb2codXNlcklkKTtcbiAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyh0b3RhbFVuUmVhZCk7XG4gIHJldHVybiB0b3RhbFVuUmVhZDtcbn1cblxuZnVuY3Rpb24gX3VuUmVhZE1lc3NhZ2VzKGRhdGUyY2hlY2ssIGNoYXRMaW5lcykge1xuICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiY2hlY2sgdW5yZWFkXCIpO1xuICBERUZDT04zICYmIGNvbnNvbGUubG9nKGRhdGUyY2hlY2spO1xuICBERUZDT04zICYmIGNvbnNvbGUubG9nKGNoYXRMaW5lcyk7XG5cbiAgbGV0IHVuUmVhZE1lc3NhZ2VzID0gMDtcbiAgY2hhdExpbmVzLmZvckVhY2goKGNoYXRMaW5lKSA9PiB7XG4gICAgaWYgKGRhdGUyY2hlY2sgPCBjaGF0TGluZS5jcmVhdGVkQXQpIHtcbiAgICAgIHVuUmVhZE1lc3NhZ2VzKys7XG4gICAgfVxuICB9KTtcbiAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIlVuUmVhZE1lc3NhZ2VzXCIpO1xuICBERUZDT04zICYmIGNvbnNvbGUubG9nKHVuUmVhZE1lc3NhZ2VzKTtcbiAgcmV0dXJuIHVuUmVhZE1lc3NhZ2VzO1xufVxuIiwiaW1wb3J0IHsgTm90aWNlcywgTm90aWNlc1VzZXJTdGF0dXMgfSBmcm9tIFwiL2xpYi9jb2xsZWN0aW9uc1wiO1xuXG5pbXBvcnQge1xuICBERUZDT045LFxuICBERUZDT043LFxuICBERUZDT041LFxuICBERUZDT040LFxuICBERUZDT04zLFxuICBERUZDT04yLFxuICBERUZDT04xLFxufSBmcm9tIFwiL2RlYnVnLmpzb25cIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBhZGROb3RpY2U6IGZ1bmN0aW9uIChub3RpY2UsIHVzZXJzKSB7XG4gICAgKFwidXNlIHN0cmljdFwiKTtcblxuICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gTWV0ZW9yLnVzZXIoKS5faWQ7XG4gICAgY29uc3QgY3VycmVudFVzZXJJZCA9IE1ldGVvci51c2VyKCkuX2lkO1xuICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcblxuICAgIGxldCBuZXdOb3RpY2UgPSB7fTtcbiAgICBuZXdOb3RpY2UgPSB7XG4gICAgICAuLi5ub3RpY2UsXG4gICAgfTtcbiAgICBuZXdOb3RpY2UubW9kaWZpZWRCeSA9IGN1cnJlbnRVc2VyO1xuICAgIG5ld05vdGljZS5jcmVhdGVkQnlOYW1lID0gY3VycmVudFVzZXI7XG4gICAgbmV3Tm90aWNlLmNyZWF0ZWRCeSA9IGN1cnJlbnRVc2VySWQ7XG4gICAgbmV3Tm90aWNlLm1vZGlmaWVkQXQgPSBjdXJyZW50RGF0ZTtcbiAgICBuZXdOb3RpY2UuY3JlYXRlZEF0ID0gY3VycmVudERhdGU7XG4gICAgbmV3Tm90aWNlLnN0YXR1cyA9IFwiYWN0aXZlXCI7XG5cbiAgICBsZXQgbm90aWNlSWQgPSBOb3RpY2VzLmluc2VydChuZXdOb3RpY2UpO1xuICAgIHJldHVybiBub3RpY2VJZDtcbiAgfSxcblxuICBhZGROb3RpY2VCeUZpZWxkczogZnVuY3Rpb24gKFxuICAgIGV2ZW50Q2xhc3MsXG4gICAgZXZlbnQsXG4gICAgd2hhdCxcbiAgICBlbnRpdHksXG4gICAgZW50aXR5SWQsXG4gICAgZW50aXR5VXJpLFxuICAgIGVudGl0eU5hbWUsXG4gICAgdXNlcnNcbiAgKSB7XG4gICAgKFwidXNlIHN0cmljdFwiKTtcbiAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiQ3JlYXRlIGEgbmV3IG5vdGljZVwiKTtcbiAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGV2ZW50Q2xhc3MpO1xuXG4gICAgY29uc3QgY3VycmVudFVzZXIgPSBNZXRlb3IudXNlcigpLm5hbWU7XG4gICAgY29uc3QgY3VycmVudFVzZXJJZCA9IE1ldGVvci51c2VyKCkuX2lkO1xuICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCBhdmF0YXJfdXJpID0gTWV0ZW9yLnVzZXIoKS5hdmF0YXJfdXJpO1xuICAgIGxldCBub3RpY2VJZCA9IG51bGw7XG4gICAgbGV0IG5ld05vdGljZSA9IHt9O1xuICAgIG5ld05vdGljZS53aGF0ID0gd2hhdDtcbiAgICBuZXdOb3RpY2UuZW50aXR5ID0gZW50aXR5O1xuICAgIG5ld05vdGljZS5lbnRpdHlJZCA9IGVudGl0eUlkO1xuICAgIG5ld05vdGljZS5ldmVudENsYXNzID0gZXZlbnRDbGFzcztcbiAgICBuZXdOb3RpY2UuZXZlbnQgPSBldmVudDtcbiAgICBuZXdOb3RpY2UuZW50aXR5TmFtZSA9IGVudGl0eU5hbWU7XG4gICAgbmV3Tm90aWNlLmVudGl0eV91cmkgPSBlbnRpdHlVcmk7XG4gICAgbmV3Tm90aWNlLmF2YXRhcl91cmkgPSBhdmF0YXJfdXJpO1xuICAgIG5ld05vdGljZS5tb2RpZmllZEJ5ID0gY3VycmVudFVzZXJJZDtcbiAgICBuZXdOb3RpY2UuY3JlYXRlZEJ5TmFtZSA9IGN1cnJlbnRVc2VyO1xuICAgIG5ld05vdGljZS5jcmVhdGVkQnkgPSBjdXJyZW50VXNlcklkO1xuICAgIG5ld05vdGljZS5tb2RpZmllZEF0ID0gY3VycmVudERhdGU7XG4gICAgbmV3Tm90aWNlLmNyZWF0ZWRBdCA9IGN1cnJlbnREYXRlO1xuICAgIG5ld05vdGljZS5zdGF0dXMgPSBcImFjdGl2ZVwiO1xuICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2cobmV3Tm90aWNlKTtcblxuICAgIGNvbnN0IHF1ZXJ5ID0geyBlbnRpdHlJZDogZW50aXR5SWQsIGV2ZW50OiBldmVudCB9O1xuICAgIGNvbnN0IHVwZGF0ZSA9IHsgJHNldDogbmV3Tm90aWNlIH07XG4gICAgY29uc3Qgb3B0aW9ucyA9IHsgdXBzZXJ0OiB0cnVlIH07XG5cbiAgICAvL2xldCBub3RpY2VJZCA9IE5vdGljZXMuaW5zZXJ0KG5ld05vdGljZSk7XG4gICAgbGV0IHN0YXR1cyA9IE5vdGljZXMudXBkYXRlKHF1ZXJ5LCB1cGRhdGUsIG9wdGlvbnMpO1xuXG4gICAgaWYgKHN0YXR1cykge1xuICAgICAgbGV0IG5vdGljZXMgPSBOb3RpY2VzLmZpbmQocXVlcnkpLmZldGNoKCk7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiR2VuZXJhdGVkIE5vdGlzZUlkXCIpO1xuXG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKG5vdGljZXMpO1xuICAgICAgbm90aWNlSWQgPSBub3RpY2VzWzBdLl9pZCA/IG5vdGljZXNbMF0uX2lkIDogbm90aWNlSWQ7XG4gICAgICAvLyBsZXQgdXNlcl9saXN0ID0gW107XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiQ2hlY2tpbmcgdXNlcnNcIik7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKHVzZXJzKTtcblxuICAgICAgaWYgKHVzZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIkFyY2hpdmUgcHJldmlvdXMgcmV2aWV3IFwiKTtcbiAgICAgICAgY29uc3QgcXVlcnkgPSB7IG5vdGljZUlkOiBub3RpY2VzWzBdLl9pZCB9O1xuICAgICAgICBjb25zdCB1cGRhdGUgPSB7ICRzZXQ6IHsgc3RhdHVzOiBcImFyY2hpdmVkXCIgfSB9O1xuICAgICAgICBjb25zdCBvcHRpb25zID0geyBtdWx0aTogdHJ1ZSB9O1xuICAgICAgICBsZXQgc3RhdHVzID0gTm90aWNlc1VzZXJTdGF0dXMudXBkYXRlKHF1ZXJ5LCB1cGRhdGUsIG9wdGlvbnMpO1xuXG4gICAgICAgIHVzZXJzLmZvckVhY2goKHVzZXJJZCkgPT4ge1xuICAgICAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJRdWVyeSBmb3IgdXBkYXRpbmcgdXNlciBub3RpY2VzXCIpO1xuICAgICAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2cocXVlcnkpO1xuICAgICAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJBZGQgdXNlciB0byBub3RpY2VcIik7XG4gICAgICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyh1c2VySWQpO1xuXG4gICAgICAgICAgbGV0IGl0ZW0gPSB7XG4gICAgICAgICAgICB1c2VySWQ6IHVzZXJJZCxcbiAgICAgICAgICAgIG5vdGljZUlkOiBub3RpY2VzWzBdLl9pZCxcbiAgICAgICAgICAgIG1vZGlmaWVkQnk6IGN1cnJlbnRVc2VySWQsXG4gICAgICAgICAgICBjcmVhdGVkQnlOYW1lOiBjdXJyZW50VXNlcixcbiAgICAgICAgICAgIGNyZWF0ZWRCeTogY3VycmVudFVzZXJJZCxcbiAgICAgICAgICAgIG1vZGlmaWVkQXQ6IGN1cnJlbnREYXRlLFxuICAgICAgICAgICAgY3JlYXRlZEF0OiBjdXJyZW50RGF0ZSxcbiAgICAgICAgICAgIHJlYWRJdDogZmFsc2UsXG4gICAgICAgICAgICByZWFkQXQ6IG51bGwsXG4gICAgICAgICAgICBzdGF0dXM6IFwiYWN0aXZlXCIsXG4gICAgICAgICAgfTtcbiAgICAgICAgICBsZXQgX3N0YXR1c0lkID0gTm90aWNlc1VzZXJTdGF0dXMuaW5zZXJ0KGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbm90aWNlSWQ7XG4gIH0sXG59O1xuXG4vKlxuIHZhciBjaGF0Um9vbSA9IHtcbiAgICAgICAgc3RhdHVzOiBcImFjdGl2ZVwiLFxuICAgICAgICBjcmVhdGVkQnk6IGFydGljbGUuY3JlYXRlZEJ5LFxuICAgICAgICB1cmw6IGltYWdlVXJsLFxuICAgICAgICB0aXRsZTogYXJ0aWNsZS5uYW1lLFxuICAgICAgICBzdWJ0aXRsZTogYXJ0aWNsZS5zdWJ0aXRsZSxcbiAgICAgICAgdXNlcnM6IHVzZXJfbGlzdCxcbiAgICAgICAgY2hhbm5lbElkOiBhcnRpY2xlLl9pZCxcbiAgICAgICAgY2hhdFJvb21UeXBlOiBjaGF0Um9vbVR5cGUsXG4gICAgfTtcblxuICAgIGNvbnN0IHF1ZXJ5ID0geyBjaGFubmVsSWQ6IGFydGljbGUuX2lkIH07XG4gICAgY29uc3QgdXBkYXRlID0geyAkc2V0OiBjaGF0Um9vbSB9O1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7IHVwc2VydDogdHJ1ZSB9O1xuXG4gICAgQ2hhdFJvb21zLnVwZGF0ZShxdWVyeSwgdXBkYXRlLCBvcHRpb25zKTtcblxuXG5cblxuXG4qL1xuIiwiaW1wb3J0IEd1ZHJ1bkNvbnRlbnRTZXJ2aWNlcyBmcm9tIFwiLi4vbGliL2RydXBhbC9zZXJ2aWNlcy5qc1wiO1xuaW1wb3J0IHtcbiAgTWV0ZW9yXG59IGZyb20gXCJtZXRlb3IvbWV0ZW9yXCI7XG5pbXBvcnQgQ29uc3RhbnRzIGZyb20gXCIvbGliL2NvbnN0YW50c1wiO1xuaW1wb3J0IGRhdGVGb3JtYXQgZnJvbSBcImRhdGVmb3JtYXRcIjtcbmltcG9ydCB7XG4gIERFRkNPTjksXG4gIERFRkNPTjcsXG4gIERFRkNPTjUsXG4gIERFRkNPTjQsXG4gIERFRkNPTjMsXG4gIERFRkNPTjIsXG4gIERFRkNPTjFcbn0gZnJvbSBcIi9kZWJ1Zy5qc29uXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlciB7XG4gIGNvbnN0cnVjdG9yKE1ldGVvciA9IHVuZGVmaW5lZCkge1xuICAgIHRoaXMudXNlciA9IE1ldGVvci51c2VyKCk7XG4gIH1cblxuICB0ZXN0Q29ubmVjdGlvbkNvbnRlbnQoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBzZXJ2aWNlcyA9IG5ldyBHdWRydW5Db250ZW50U2VydmljZXMoKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJTZW5kaW5nIG5vdGlmaWNhdGlvbiB0byBHdW5kcnVuXCIpO1xuICAgICAgc2VydmljZXMudGVzdF9jb25uZWN0aW9uKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcihcIlwiLCBcIlwiLCBKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgIH1cbiAgfVxuICBvcmRlclF1ZXJ5KHNlYXJjaFRleHQpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IHNlcnZpY2VzID0gbmV3IEd1ZHJ1bkNvbnRlbnRTZXJ2aWNlcygpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIlNlbmRpbmcgbm90aWZpY2F0aW9uIHRvIEd1bmRydW5cIik7XG4gICAgICBsZXQgb3JkZXJzID0gc2VydmljZXMucXVlcnlPcmRlcihzZWFyY2hUZXh0KTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJPaywgZ2V0IHNvbWV0aGluZyBmcm9tIG9yZGVyIFwiKTtcblxuICAgICAgcmV0dXJuIG9yZGVycztcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKFwiXCIsIFwiXCIsIEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XG4gICAgfVxuICB9XG5cbiAgcXVlcnlPcmRlckJ5UGVyc29uSWQoc2VhcmNoVGV4dCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgc2VydmljZXMgPSBuZXcgR3VkcnVuQ29udGVudFNlcnZpY2VzKCk7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiU2VuZGluZyBub3RpZmljYXRpb24gdG8gR3VuZHJ1blwiKTtcbiAgICAgIGxldCBvcmRlcnMgPSBzZXJ2aWNlcy5xdWVyeU9yZGVyQnlQZXJzb25JZChzZWFyY2hUZXh0KTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJPaywgZ2V0IHNvbWV0aGluZyBmcm9tIG9yZGVyIFwiKTtcblxuICAgICAgcmV0dXJuIG9yZGVycztcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKFwiXCIsIFwiXCIsIEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XG4gICAgfVxuICB9XG5cbiAgcHJvY2VzcyhyZXF1ZXN0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBzZXJ2aWNlcyA9IG5ldyBHdWRydW5Db250ZW50U2VydmljZXMoKTtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJSZXF1ZXN0IHByb2Nlc3Mgb2Ygb3JkZXJcIik7XG4gICAgICBsZXQgb3JkZXJzID0gc2VydmljZXMucHJvY2Vzc09yZGVyKHJlcXVlc3QpO1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIk9rLCBnZXQgc29tZSByZXBseVwiKTtcblxuICAgICAgcmV0dXJuIG9yZGVycztcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKFwiXCIsIFwiXCIsIEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XG4gICAgfVxuICB9XG5cbiAgcXVlcnlSZWNlbnRPcmRlcnMoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBzZXJ2aWNlcyA9IG5ldyBHdWRydW5Db250ZW50U2VydmljZXMoKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJTZW5kaW5nIG5vdGlmaWNhdGlvbiB0byBHdW5kcnVuXCIpO1xuICAgICAgbGV0IG9yZGVycyA9IHNlcnZpY2VzLnF1ZXJ5UmVjZW50T3JkZXJzKCk7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiT2ssIGdldCBzb21ldGhpbmcgZnJvbSBvcmRlciBcIik7XG5cbiAgICAgIHJldHVybiBvcmRlcnM7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcihcIlwiLCBcIlwiLCBKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgIH1cbiAgfVxuXG4gIHF1ZXJ5T3JkZXJTdGF0ZShzdGF0ZSwgbGltaXQpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IHNlcnZpY2VzID0gbmV3IEd1ZHJ1bkNvbnRlbnRTZXJ2aWNlcygpO1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcInF1ZXJ5T3JkZXJTdGF0ZVwiKTtcbiAgICAgIGxldCBvcmRlcnMgPSBzZXJ2aWNlcy5xdWVyeU9yZGVyU3RhdGUoc3RhdGUsIGxpbWl0KTtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJPaywgZ2V0IHNvbWV0aGluZyBmcm9tIG9yZGVyIFwiKTtcblxuICAgICAgcmV0dXJuIG9yZGVycztcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKFwiXCIsIFwiXCIsIEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XG4gICAgfVxuICB9XG5cbiAgbW90aGVyY2hlY2tzKCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgc2VydmljZXMgPSBuZXcgR3VkcnVuQ29udGVudFNlcnZpY2VzKCk7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiU2VuZGluZyBtb3RoZXJjaGVja3MgR3VuZHJ1blwiKTtcbiAgICAgIGxldCBvcmRlcnMgPSBzZXJ2aWNlcy5tb3RoZXJjaGVja3MoKTtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJPaywgZ2V0IHNvbWV0aGluZyBmcm9tIG1vdGhlcmNoZWNrcyBcIik7XG5cbiAgICAgIHJldHVybiBvcmRlcnM7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcihcIlwiLCBcIlwiLCBKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgIH1cbiAgfVxuXG5cblxuICBxdWVyeU9yZGVyQnlPcmRlcklkKHNlYXJjaFRleHQpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IHNlcnZpY2VzID0gbmV3IEd1ZHJ1bkNvbnRlbnRTZXJ2aWNlcygpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIlNlbmRpbmcgbm90aWZpY2F0aW9uIHRvIEd1bmRydW5cIik7XG4gICAgICBsZXQgb3JkZXJzID0gc2VydmljZXMucXVlcnlPcmRlckJ5T3JkZXJJZChzZWFyY2hUZXh0KTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJPaywgZ2V0IHNvbWV0aGluZyBmcm9tIG9yZGVyIFwiKTtcblxuICAgICAgcmV0dXJuIG9yZGVycztcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKFwiXCIsIFwiXCIsIEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XG4gICAgfVxuICB9XG4gIHVwZGF0ZU9yZGVyQnlPcmRlcklkKG9yZGVyKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBzZXJ2aWNlcyA9IG5ldyBHdWRydW5Db250ZW50U2VydmljZXMoKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJTZW5kaW5nIG5vdGlmaWNhdGlvbiB0byBHdW5kcnVuXCIpO1xuICAgICAgbGV0IHJlc3VsdCA9IHNlcnZpY2VzLnVwZGF0ZU9yZGVyQnlPcmRlcklkKG9yZGVyKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJPaywgdXBkYXRlIGRvbmUgLSBjaGVjayByZXN1bHQuLi4gXCIpO1xuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoXCJcIiwgXCJcIiwgSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICB9XG4gIH1cbiAgY3JlYXRlVXBkYXRlUGVyc29uT3JkZXIob3JkZXIpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IHNlcnZpY2VzID0gbmV3IEd1ZHJ1bkNvbnRlbnRTZXJ2aWNlcygpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIlNlbmRpbmcgbm90aWZpY2F0aW9uIHRvIEd1bmRydW5cIik7XG4gICAgICAvLyBERUZDT041ICYmIGNvbnNvbGUubG9nKHRoaXMudXNlcik7XG4gICAgICB2YXIgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgIG9yZGVyWydmaWVsZF9vcmRlcl9zdGF0ZSddID0gMjcxO1xuICAgICAgb3JkZXJbJ2ZpZWxkX29yZGVyaWQnXSA9ICcnO1xuICAgICAgb3JkZXJbJ2ZpZWxkX2NyZWF0b3InXSA9IHRoaXMudXNlci51aWQ7XG4gICAgICBvcmRlclsnZmllbGRfcmVzcG9uc2libGUnXSA9IHRoaXMudXNlci51aWQ7XG4gICAgICBvcmRlclsnZmllbGRfb3JkZXJfcHJvY2Vzc19tZXRob2QnXSA9IG9yZGVyWydmaWVsZF9vcmRlcl9wcm9jZXNzX21ldGhvZCddID8gb3JkZXJbJ2ZpZWxkX29yZGVyX3Byb2Nlc3NfbWV0aG9kJ10gOiBDb25zdGFudHMuT3JkZXJQcm9jZXNzTWV0aG9kLkVYUFJFU1M7XG4gICAgICBvcmRlclsnZmllbGRfZWZmZWN0aXZlX2RhdGUnXSA9IGRhdGVGb3JtYXQobm93LCBcInl5eXktbW0tZGRcIik7XG5cblxuXG4gICAgICBsZXQgcmVzdWx0ID0gc2VydmljZXMuY3JlYXRlUGVyc29uT3JkZXIob3JkZXIpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIk9rLCB1cGRhdGUgZG9uZSAtIGNoZWNrIHJlc3VsdC4uLiBcIik7XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcihcIlwiLCBcIlwiLCBKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgIH1cbiAgfVxuXG5cbiAgZ2V0TmFtZVR5cGVzKCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgc2VydmljZXMgPSBuZXcgR3VkcnVuQ29udGVudFNlcnZpY2VzKCk7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiR2V0dGluZyBnZXROYW1lVHlwZXNcIik7XG4gICAgICBsZXQgcmVzdWx0ID0gc2VydmljZXMuZ2V0VGVybXMoXCJuYW1ldHlwZVwiKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJPaywgdXBkYXRlIGRvbmUgLSBjaGVjayByZXN1bHQuLi4gXCIpO1xuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoXCJcIiwgXCJcIiwgSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICB9XG4gIH1cbiAgZ2V0VGVybXModGVybXR5cGUpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IHNlcnZpY2VzID0gbmV3IEd1ZHJ1bkNvbnRlbnRTZXJ2aWNlcygpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIkdldHRpbmcgZ2V0VGVybXNcIik7XG4gICAgICBsZXQgcmVzdWx0ID0gc2VydmljZXMuZ2V0VGVybXModGVybXR5cGUpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIk9rLCB1cGRhdGUgZG9uZSAtIGNoZWNrIHJlc3VsdC4uLiBcIik7XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcihcIlwiLCBcIlwiLCBKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgIH1cbiAgfVxuICBxdWVyeVRlcm1zKHRlcm10eXBlLCBzZWFyY2hUZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBzZXJ2aWNlcyA9IG5ldyBHdWRydW5Db250ZW50U2VydmljZXMoKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJHZXR0aW5nIHF1ZXJ5VGVybXNcIik7XG4gICAgICBsZXQgcmVzdWx0ID0gc2VydmljZXMucXVlcnlUZXJtcyh0ZXJtdHlwZSwgc2VhcmNoVGV4dCk7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiT2ssIHVwZGF0ZSBkb25lIC0gY2hlY2sgcmVzdWx0Li4uIFwiKTtcblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKFwiXCIsIFwiXCIsIEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XG4gICAgfVxuICB9XG4gIHF1ZXJ5VGVybXNDb3VudHJ5KGRhdGFDb250ZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBzZXJ2aWNlcyA9IG5ldyBHdWRydW5Db250ZW50U2VydmljZXMoKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJHZXR0aW5nIHF1ZXJ5VGVybXNDb3VudHJ5XCIpO1xuICAgICAgbGV0IHJlc3VsdCA9IHNlcnZpY2VzLnF1ZXJ5VGVybXNDb3VudHJ5KGRhdGFDb250ZXh0KTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJPaywgdXBkYXRlIGRvbmUgLSBjaGVjayByZXN1bHQuLi4gXCIpO1xuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoXCJcIiwgXCJcIiwgSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICB9XG4gIH1cbiAgcXVlcnlQZXJzb25CeUlkKHNlYXJjaFRleHQpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IHNlcnZpY2VzID0gbmV3IEd1ZHJ1bkNvbnRlbnRTZXJ2aWNlcygpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIlNlbmRpbmcgbm90aWZpY2F0aW9uIHRvIEd1bmRydW5cIik7XG4gICAgICBsZXQgb3JkZXJzID0gc2VydmljZXMucXVlcnlQZXJzb25CeUlkKHNlYXJjaFRleHQpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIk9rLCBnZXQgc29tZXRoaW5nIGZyb20gcGVyc29uLW9iamVjdCBcIik7XG5cbiAgICAgIHJldHVybiBvcmRlcnM7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcihcIlwiLCBcIlwiLCBKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgIH1cbiAgfVxuICBxdWVyeVBlcnNvbihzZWFyY2hUZXh0LCBtZXRhKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBzZXJ2aWNlcyA9IG5ldyBHdWRydW5Db250ZW50U2VydmljZXMoKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJRdWVyeSBzdHVmZiBmcm9tIEd1ZHJ1blwiKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJDaGVjayBNZXRhIHN0cnVjdHVyZVwiKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2cobWV0YSk7XG4gICAgICBsZXQgb3JkZXJzID0gc2VydmljZXMucXVlcnlQZXJzb24oc2VhcmNoVGV4dCwgbWV0YSk7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiT2ssIGdldCBzb21ldGhpbmcgZnJvbSBwZXJzb24tb2JqZWN0IFwiKTtcblxuICAgICAgcmV0dXJuIG9yZGVycztcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKFwiXCIsIFwiXCIsIEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XG4gICAgfVxuICB9XG4gIHF1ZXJ5Um9sZUFkdmFuY2VkKHNlYXJjaFRleHQsIHF1ZXJ5Um9sZXMpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IHNlcnZpY2VzID0gbmV3IEd1ZHJ1bkNvbnRlbnRTZXJ2aWNlcygpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIlF1ZXJ5IHN0dWZmIEFEVkFOQ0VEIFJPTEUgZnJvbSBHdWRydW5cIik7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiQ2hlY2sgcXVlcnlSb2xlcyBzdHJ1Y3R1cmVcIik7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKHF1ZXJ5Um9sZXMpO1xuICAgICAgbGV0IG9yZGVycyA9IHNlcnZpY2VzLnF1ZXJ5Um9sZUFkdmFuY2VkKFxuICAgICAgICBzZWFyY2hUZXh0LFxuICAgICAgICBxdWVyeVJvbGVzKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJPaywgZ2V0IHNvbWV0aGluZyBmcm9tIFJPTEUgcGVyc29uLW9iamVjdCBcIik7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKG9yZGVycyk7XG4gICAgICByZXR1cm4gb3JkZXJzO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoXCJcIiwgXCJcIiwgSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICB9XG4gIH1cbiAgcXVlcnlQZXJzb25BZHZhbmNlZChzZWFyY2hUZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBzZXJ2aWNlcyA9IG5ldyBHdWRydW5Db250ZW50U2VydmljZXMoKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJRdWVyeSBzdHVmZiBmcm9tIEd1ZHJ1blwiKTtcbiAgICAgIGxldCBvcmRlcnMgPSBzZXJ2aWNlcy5xdWVyeVBlcnNvbkFkdmFuY2VkKHNlYXJjaFRleHQpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIk9rLCBnZXQgc29tZXRoaW5nIGZyb20gcGVyc29uLW9iamVjdCBcIik7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKG9yZGVycyk7XG4gICAgICByZXR1cm4gb3JkZXJzO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoXCJcIiwgXCJcIiwgSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICB9XG4gIH1cbiAgbGl2ZXN0cmVhbShzZWFyY2hUZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBzZXJ2aWNlcyA9IG5ldyBHdWRydW5Db250ZW50U2VydmljZXMoKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJHZXQgbGl2ZXN0cmVhbVwiKTtcbiAgICAgIGxldCBvcmRlcnMgPSBzZXJ2aWNlcy5saXZlc3RyZWFtKHNlYXJjaFRleHQpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIk9rLCBnZXQgc29tZXRoaW5nIGZyb20gb3JkZXIgXCIpO1xuXG4gICAgICByZXR1cm4gb3JkZXJzO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoXCJcIiwgXCJcIiwgSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7Y2hlY2t9IGZyb20gJ21ldGVvci9jaGVjayc7XG5pbXBvcnQge1dvcmtncm91cHMsIFdvcmtncm91cFVzZXJzLCBVc2VyV29ya2dyb3VwUm9sZXMsIFdvcmtncm91cFZvdWNoZXJzfSBmcm9tICcvbGliL2NvbGxlY3Rpb25zJztcblxuaW1wb3J0IHtcbiAgREVGQ09OOSxcbiAgREVGQ09ONyxcbiAgREVGQ09ONSxcbiAgREVGQ09ONCxcbiAgREVGQ09OMyxcbiAgREVGQ09OMixcbiAgREVGQ09OMSxcbn0gZnJvbSBcIi9kZWJ1Zy5qc29uXCI7XG5jb25zdCBBRE1JTl9ST0xFX05BTUUgPSAnQWRtaW4nO1xuY29uc3QgTUVNQkVSX1JPTEVfTkFNRSA9ICdNZW1iZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXb3JrZ3JvdXAge1xuXG4gICAgY29uc3RydWN0b3Iod29ya2dyb3VwSWQsIHVzZXJJZCkge1xuICAgICAgICB0aGlzLndvcmtncm91cElkID0gd29ya2dyb3VwSWQ7XG4gICAgICAgIHRoaXMudXNlcklkID0gdXNlcklkO1xuICAgICAgICB0aGlzLndvcmtncm91cCA9IG51bGw7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldFVzZXJXb3JrZ3JvdXBJZHModXNlcklkLCBhc0FkbWluKSB7XG4gICAgICAgIGNvbnN0IHJvbGUgPSBVc2VyV29ya2dyb3VwUm9sZXMuZmluZE9uZSh7bmFtZTogYXNBZG1pbiA/IEFETUlOX1JPTEVfTkFNRSA6IE1FTUJFUl9ST0xFX05BTUV9KTtcblxuICAgICAgICByZXR1cm4gV29ya2dyb3VwVXNlcnNcbiAgICAgICAgICAgIC5maW5kKHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdhY3RpdmUnLFxuICAgICAgICAgICAgICAgIHVzZXJfaWQ6IHVzZXJJZCxcbiAgICAgICAgICAgICAgICB1c2VyX2dyb3VwX3JvbGU6IHJvbGUuX2lkXG4gICAgICAgICAgICB9KS5mZXRjaCgpLm1hcCh3dSA9PiB3dS53b3JrZ3JvdXBfaWQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXRSZWdpb25zV29ya2dyb3VwSWRzKHJlZ2lvbklkcykge1xuXG4gICAgICAgIGNvbnN0IGlkcyA9IFtdO1xuICAgICAgICBpZiAocmVnaW9uSWRzKSB7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZWdpb25JZHMpKSB7XG4gICAgICAgICAgICAgICAgaWRzLmNvbmNhdChyZWdpb25JZHMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZHMucHVzaChyZWdpb25JZHMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB3b3JrZ3JvdXBJZHMgPSBXb3JrZ3JvdXBzLmZpbmQoe3N0YXR1czogJ2FjdGl2ZScsIGZpZWxkX3B1Ymxpc2hpbmdfcmVnaW9uOiB7JGluOiBpZHN9fSlcbiAgICAgICAgICAgIC5mZXRjaCgpLm1hcCh3ID0+IHcuX2lkKTtcblxuICAgICAgICAvL0RFRkNPTjUgJiYgY29uc29sZS5sb2cgKCdXT1JLR1JPVVBTIEZPUiBSRUdJT05TOiAnKTtcbiAgICAgICAgLy9ERUZDT041ICYmIGNvbnNvbGUubG9nIChyZWdpb25JZHMpO1xuICAgICAgICAvL0RFRkNPTjUgJiYgY29uc29sZS5sb2cgKHdvcmtncm91cElkcyk7XG4gICAgICAgIHJldHVybiB3b3JrZ3JvdXBJZHM7XG4gICAgfVxuXG4gICAgZ2V0V29ya2dyb3VwRW50aXR5KCkge1xuICAgICAgICBpZiAoIXRoaXMud29ya2dyb3VwKSB7XG4gICAgICAgICAgICBjb25zdCB3b3JrZ3JvdXAgPSBXb3JrZ3JvdXBzLmZpbmRPbmUoe19pZDogdGhpcy53b3JrZ3JvdXBJZCwgc3RhdHVzOiAnYWN0aXZlJ30pO1xuICAgICAgICAgICAgdGhpcy53b3JrZ3JvdXAgPSB3b3JrZ3JvdXA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMud29ya2dyb3VwO1xuICAgIH1cblxuICAgIGdldFdvcmtncm91cFJlZ2lvbklkcygpIHtcbiAgICAgICAgY29uc3Qgd29ya2dyb3VwRW50aXR5ID0gdGhpcy5nZXRXb3JrZ3JvdXBFbnRpdHkoKTtcbiAgICAgICAgaWYgKCF3b3JrZ3JvdXBFbnRpdHkpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB3b3JrZ3JvdXBFbnRpdHkuZmllbGRfcHVibGlzaGluZ19yZWdpb247XG4gICAgfVxuXG4gICAgYWRkV29ya2dyb3VwUmVnaW9uKHJlZ2lvbklkKSB7XG4gICAgICAgIGlmICh0aGlzLndvcmtncm91cElkICYmIHJlZ2lvbklkKSB7XG5cbiAgICAgICAgICAgIFdvcmtncm91cHMudXBkYXRlKFxuICAgICAgICAgICAgICAgIHtfaWQ6IHRoaXMud29ya2dyb3VwSWR9LFxuICAgICAgICAgICAgICAgIHskYWRkVG9TZXQ6IHtmaWVsZF9wdWJsaXNoaW5nX3JlZ2lvbjogcmVnaW9uSWR9fSk7XG5cbiAgICAgICAgICAgIFdvcmtncm91cHMudXBkYXRlKFxuICAgICAgICAgICAgICAgIHtfaWQ6IHRoaXMud29ya2dyb3VwSWR9LFxuICAgICAgICAgICAgICAgIHskc2V0OiB7bW9kaWZpZWRCeTogdGhpcy51c2VySWQsIG1vZGlmaWVkQXQ6IG5ldyBEYXRlKCl9fSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVXb3JrZ3JvdXBSZWdpb24ocmVnaW9uSWQpIHtcbiAgICAgICAgaWYgKHRoaXMud29ya2dyb3VwSWQgJiYgcmVnaW9uSWQpIHtcblxuICAgICAgICAgICAgV29ya2dyb3Vwcy51cGRhdGUoXG4gICAgICAgICAgICAgICAge19pZDogdGhpcy53b3JrZ3JvdXBJZH0sXG4gICAgICAgICAgICAgICAgeyRwdWxsOiB7ZmllbGRfcHVibGlzaGluZ19yZWdpb246IHJlZ2lvbklkfX0pO1xuXG4gICAgICAgICAgICBXb3JrZ3JvdXBzLnVwZGF0ZShcbiAgICAgICAgICAgICAgICB7X2lkOiB0aGlzLndvcmtncm91cElkfSxcbiAgICAgICAgICAgICAgICB7JHNldDoge21vZGlmaWVkQnk6IHRoaXMudXNlcklkLCBtb2RpZmllZEF0OiBuZXcgRGF0ZSgpfX0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlRmllbGQoZmllbGROYW1lLCB2YWx1ZSkge1xuICAgICAgICBjb25zdCBjdXJyZW50VXNlciA9IHRoaXMudXNlcklkO1xuICAgICAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgaWYgKHRoaXMud29ya2dyb3VwSWQpIHtcblxuICAgICAgICAgICAgY29uc3QgdmFsdWVzID0ge1xuICAgICAgICAgICAgICAgIG1vZGlmaWVkQnk6IGN1cnJlbnRVc2VyLFxuICAgICAgICAgICAgICAgIG1vZGlmaWVkQXQ6IGN1cnJlbnREYXRlLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhbHVlc1tmaWVsZE5hbWVdID0gdmFsdWU7XG5cbiAgICAgICAgICAgIFdvcmtncm91cHMudXBkYXRlKHtfaWQ6IHRoaXMud29ya2dyb3VwSWR9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJHNldDogdmFsdWVzXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgaXNVc2VyQWRtaW5Jbldvcmtncm91cCh3b3JrZ3JvdXBJZCkge1xuICAgICAgICBpZiAoIXdvcmtncm91cElkKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGBDaGVja2luZyBpZiB1c2VyICR7dGhpcy51c2VySWR9IGlzIGFkbWluIGZvciB3b3JrZ3JvdXAgJHt0aGlzLndvcmtncm91cElkfWApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhgQ2hlY2tpbmcgaWYgdXNlciAke3RoaXMudXNlcklkfSBpcyBhZG1pbiBmb3Igd29ya2dyb3VwICR7d29ya2dyb3VwSWR9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBhZG1pblJvbGUgPSBVc2VyV29ya2dyb3VwUm9sZXMuZmluZE9uZSh7bmFtZTogQURNSU5fUk9MRV9OQU1FfSk7XG4gICAgICAgIGlmIChhZG1pblJvbGUpIHtcblxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRXb3JrZ3JvdXBzID0gV29ya2dyb3VwVXNlcnNcbiAgICAgICAgICAgICAgICAuZmluZCh7XG4gICAgICAgICAgICAgICAgICAgIHdvcmtncm91cF9pZDogd29ya2dyb3VwSWQgPyB3b3JrZ3JvdXBJZCA6IHRoaXMud29ya2dyb3VwSWQsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ2FjdGl2ZScsXG4gICAgICAgICAgICAgICAgICAgIHVzZXJfaWQ6IHRoaXMudXNlcklkLFxuICAgICAgICAgICAgICAgICAgICB1c2VyX2dyb3VwX3JvbGU6IGFkbWluUm9sZS5faWRcbiAgICAgICAgICAgICAgICB9KS5mZXRjaCgpO1xuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkV29ya2dyb3Vwcy5sZW5ndGggPT09IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlzT3RoZXJVc2VyQWRtaW5Jbldvcmtncm91cCh1c2VySWQpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhgQ2hlY2tpbmcgaWYgdXNlciAke3VzZXJJZH0gaXMgYWRtaW4gZm9yIHdvcmtncm91cCAke3RoaXMud29ya2dyb3VwSWR9YCk7XG4gICAgICAgIGNvbnN0IGFkbWluUm9sZSA9IFVzZXJXb3JrZ3JvdXBSb2xlcy5maW5kT25lKHtuYW1lOiBBRE1JTl9ST0xFX05BTUV9KTtcbiAgICAgICAgaWYgKGFkbWluUm9sZSkge1xuXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZFdvcmtncm91cHMgPSBXb3JrZ3JvdXBVc2Vyc1xuICAgICAgICAgICAgICAgIC5maW5kKHtcbiAgICAgICAgICAgICAgICAgICAgd29ya2dyb3VwX2lkOiB0aGlzLndvcmtncm91cElkLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdhY3RpdmUnLFxuICAgICAgICAgICAgICAgICAgICB1c2VyX2lkOiB1c2VySWQsXG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZ3JvdXBfcm9sZTogYWRtaW5Sb2xlLl9pZFxuICAgICAgICAgICAgICAgIH0pLmZldGNoKCk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHNlbGVjdGVkV29ya2dyb3Vwcy5sZW5ndGgpO1xuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkV29ya2dyb3Vwcy5sZW5ndGggPT09IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlzVXNlcldvcmtncm91cFVzZXJBZG1pbih3b3JrZ3JvdXBVc2VySWQpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhgQ2hlY2tpbmcgaWYgdXNlciAke3RoaXMudXNlcklkfSBpcyBhZG1pbiBmb3Igd29ya2dyb3VwVXNlciAke3dvcmtncm91cFVzZXJJZH1gKTtcblxuICAgICAgICBsZXQgd29ya2dyb3VwSWQgPSAnJztcbiAgICAgICAgLy8gZ2V0IHdvcmtncm91cElkIGZyb20gd29ya2dyb3VwVXNlclxuICAgICAgICBjb25zdCB3b3JrZ3JvdXBVc2VyID0gV29ya2dyb3VwVXNlcnMuZmluZE9uZSh3b3JrZ3JvdXBVc2VySWQpO1xuICAgICAgICBpZiAod29ya2dyb3VwVXNlcikge1xuICAgICAgICAgICAgd29ya2dyb3VwSWQgPSB3b3JrZ3JvdXBVc2VyLndvcmtncm91cF9pZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5pc1VzZXJBZG1pbkluV29ya2dyb3VwKHdvcmtncm91cElkKTtcbiAgICB9XG5cbiAgICBpc1VzZXJBZG1pbkluQW55R3JvdXAoKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coYENoZWNraW5nIGlmIHVzZXIgJHt0aGlzLnVzZXJJZH0gaXMgYWRtaW4gaW4gYW55IHdvcmtncm91cGApO1xuICAgICAgICBjb25zdCBhZG1pblJvbGUgPSBVc2VyV29ya2dyb3VwUm9sZXMuZmluZE9uZSh7bmFtZTogQURNSU5fUk9MRV9OQU1FfSk7XG4gICAgICAgIGlmIChhZG1pblJvbGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkV29ya2dyb3VwcyA9IFdvcmtncm91cFVzZXJzXG4gICAgICAgICAgICAgICAgLmZpbmQoe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdhY3RpdmUnLFxuICAgICAgICAgICAgICAgICAgICB1c2VyX2lkOiB0aGlzLnVzZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9ncm91cF9yb2xlOiBhZG1pblJvbGUuX2lkXG4gICAgICAgICAgICAgICAgfSkuZmV0Y2goKTtcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZFdvcmtncm91cHMubGVuZ3RoID4gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0V29ya2dyb3VwQWRtaW5zSWRzKCkge1xuICAgICAgICBsZXQgYWRtaW5zID0gW107XG5cbiAgICAgICAgY29uc3QgYWRtaW5Sb2xlID0gVXNlcldvcmtncm91cFJvbGVzLmZpbmRPbmUoe25hbWU6IEFETUlOX1JPTEVfTkFNRX0pO1xuICAgICAgICBpZiAoYWRtaW5Sb2xlKSB7XG4gICAgICAgICAgICBjb25zdCBhZG1pbldvcmtncm91cFVzZXJzID0gV29ya2dyb3VwVXNlcnNcbiAgICAgICAgICAgICAgICAuZmluZCh7XG4gICAgICAgICAgICAgICAgICAgIHdvcmtncm91cF9pZDogdGhpcy53b3JrZ3JvdXBJZCxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnYWN0aXZlJyxcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9ncm91cF9yb2xlOiBhZG1pblJvbGUuX2lkXG4gICAgICAgICAgICAgICAgfSkuZmV0Y2goKTtcblxuICAgICAgICAgICAgYWRtaW5Xb3JrZ3JvdXBVc2Vycy5mb3JFYWNoKHdvcmtncm91cFVzZXIgPT4gYWRtaW5zLnB1c2god29ya2dyb3VwVXNlci51c2VyX2lkKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFkbWlucztcbiAgICB9XG5cbiAgICBhZGRVc2VyKHVzZXJJZCwgYXNBZG1pbiA9IGZhbHNlKSB7XG4gICAgICAgIGxldCBhZGRlZFdvcmtncm91cFVzZXJJZCA9ICcnO1xuICAgICAgICBsZXQgY3VycmVudFdvcmtncm91cFVzZXJFbnRpdHkgPSBXb3JrZ3JvdXBVc2Vycy5maW5kT25lKHt3b3JrZ3JvdXBfaWQ6IHRoaXMud29ya2dyb3VwSWQsIHVzZXJfaWQ6IHVzZXJJZH0pO1xuICAgICAgICBjb25zdCBjdXJyZW50VXNlciA9IHRoaXMudXNlcklkO1xuICAgICAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgLy9pZiB3ZSBoYXZlIG9uZSBqdXN0IGNoYW5nZSB0aGUgc3RhdHVzIC0gZG9udCBuZWVkIHRvIHN0b3JlIGFsbCB0aGUgY2hhbmdlc1xuICAgICAgICBpZiAoY3VycmVudFdvcmtncm91cFVzZXJFbnRpdHkpIHtcbiAgICAgICAgICAgIGFkZGVkV29ya2dyb3VwVXNlcklkID0gY3VycmVudFdvcmtncm91cFVzZXJFbnRpdHkuX2lkO1xuICAgICAgICAgICAgV29ya2dyb3VwVXNlcnMudXBkYXRlKHtfaWQ6IGN1cnJlbnRXb3JrZ3JvdXBVc2VyRW50aXR5Ll9pZH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAkc2V0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdhY3RpdmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZWRCeTogY3VycmVudFVzZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllZEF0OiBjdXJyZW50RGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGNvbnN0IG1lbWJlclJvbGUgPVxuICAgICAgICAgICAgICAgIGFzQWRtaW5cbiAgICAgICAgICAgICAgICAgICAgPyBVc2VyV29ya2dyb3VwUm9sZXMuZmluZE9uZSh7bmFtZTogQURNSU5fUk9MRV9OQU1FfSlcbiAgICAgICAgICAgICAgICAgICAgOiBVc2VyV29ya2dyb3VwUm9sZXMuZmluZE9uZSh7bmFtZTogTUVNQkVSX1JPTEVfTkFNRX0pO1xuXG4gICAgICAgICAgICBjb25zdCB3b3JrZ3JvdXBVc2VyID0ge1xuICAgICAgICAgICAgICAgIHdvcmtncm91cF9pZDogdGhpcy53b3JrZ3JvdXBJZCxcbiAgICAgICAgICAgICAgICB1c2VyX2lkOiB1c2VySWQsXG4gICAgICAgICAgICAgICAgdXNlcl9ncm91cF9yb2xlOiBtZW1iZXJSb2xlLl9pZCxcbiAgICAgICAgICAgICAgICBtb2RpZmllZEJ5OiBjdXJyZW50VXNlcixcbiAgICAgICAgICAgICAgICBjcmVhdGVkQnk6IGN1cnJlbnRVc2VyLFxuICAgICAgICAgICAgICAgIG1vZGlmaWVkQXQ6IGN1cnJlbnREYXRlLFxuICAgICAgICAgICAgICAgIGNyZWF0ZWRBdDogY3VycmVudERhdGUsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAnYWN0aXZlJ1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgYWRkZWRXb3JrZ3JvdXBVc2VySWQgPSBXb3JrZ3JvdXBVc2Vycy5pbnNlcnQod29ya2dyb3VwVXNlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFkZGVkV29ya2dyb3VwVXNlcklkO1xuICAgIH1cblxuICAgIHN0YXRpYyBhZGRVc2VyQXNTeXN0ZW0od29ya2dyb3VwSWQsIHVzZXJJZCwgYWN0aXZhdGUgPSB0cnVlKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJBZGRpbmcgdXNlciB0byB3b3JrZ3JvdXBcIik7XG4gICAgICAgIC8vY29uc29sZS5sb2codXNlcklkICsgXCIgfCBcIiArIHdvcmtncm91cElkKTtcbiAgICAgICAgbGV0IGFkZGVkV29ya2dyb3VwVXNlcklkID0gJyc7XG4gICAgICAgIGxldCBjdXJyZW50V29ya2dyb3VwVXNlckVudGl0eSA9IFdvcmtncm91cFVzZXJzLmZpbmRPbmUoe3dvcmtncm91cF9pZDogd29ya2dyb3VwSWQsIHVzZXJfaWQ6IHVzZXJJZH0pO1xuICAgICAgICBjb25zdCBjdXJyZW50VXNlciA9ICdTWVNURU0nO1xuICAgICAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgLy9pZiB3ZSBoYXZlIG9uZSBqdXN0IGNoYW5nZSB0aGUgc3RhdHVzIC0gZG9udCBuZWVkIHRvIHN0b3JlIGFsbCB0aGUgY2hhbmdlc1xuICAgICAgICBpZiAoY3VycmVudFdvcmtncm91cFVzZXJFbnRpdHkpIHtcbiAgICAgICAgICAgIGFkZGVkV29ya2dyb3VwVXNlcklkID0gY3VycmVudFdvcmtncm91cFVzZXJFbnRpdHkuX2lkO1xuICAgICAgICAgICAgV29ya2dyb3VwVXNlcnMudXBkYXRlKHtfaWQ6IGN1cnJlbnRXb3JrZ3JvdXBVc2VyRW50aXR5Ll9pZH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAkc2V0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IGFjdGl2YXRlID8gJ2FjdGl2ZScgOiAncGVuZGluZycsXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllZEJ5OiBjdXJyZW50VXNlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWVkQXQ6IGN1cnJlbnREYXRlLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgY29uc3QgbWVtYmVyUm9sZSA9IFVzZXJXb3JrZ3JvdXBSb2xlcy5maW5kT25lKHtuYW1lOiBNRU1CRVJfUk9MRV9OQU1FfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IHdvcmtncm91cFVzZXIgPSB7XG4gICAgICAgICAgICAgICAgd29ya2dyb3VwX2lkOiB3b3JrZ3JvdXBJZCxcbiAgICAgICAgICAgICAgICB1c2VyX2lkOiB1c2VySWQsXG4gICAgICAgICAgICAgICAgdXNlcl9ncm91cF9yb2xlOiBtZW1iZXJSb2xlLl9pZCxcbiAgICAgICAgICAgICAgICBtb2RpZmllZEJ5OiBjdXJyZW50VXNlcixcbiAgICAgICAgICAgICAgICBjcmVhdGVkQnk6IGN1cnJlbnRVc2VyLFxuICAgICAgICAgICAgICAgIG1vZGlmaWVkQXQ6IGN1cnJlbnREYXRlLFxuICAgICAgICAgICAgICAgIGNyZWF0ZWRBdDogY3VycmVudERhdGUsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiBhY3RpdmF0ZSA/ICdhY3RpdmUnIDogJ3BlbmRpbmcnXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBhZGRlZFdvcmtncm91cFVzZXJJZCA9IFdvcmtncm91cFVzZXJzLmluc2VydCh3b3JrZ3JvdXBVc2VyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWRkZWRXb3JrZ3JvdXBVc2VySWQ7XG4gICAgfVxuXG4gICAgZ2V0V29ya2dyb3VwUHVibGlzaGluZ05hbWUoKSB7XG4gICAgICAgIGNvbnN0IHdvcmtncm91cCA9IHRoaXMuZ2V0V29ya2dyb3VwRW50aXR5KCk7XG4gICAgICAgIHJldHVybiAod29ya2dyb3VwICYmIHdvcmtncm91cC5wdWJsaXNoaW5nTmFtZSkgfHwgJz8/Pyc7XG4gICAgfVxuXG4gICAgZ2V0V29ya2dyb3VwVm91Y2hlcigpIHtcbiAgICAgICAgcmV0dXJuIFdvcmtncm91cFZvdWNoZXJzLmZpbmRPbmUoe3dvcmtncm91cElkOiB0aGlzLndvcmtncm91cElkLCBzdGF0dXM6ICdhY3RpdmUnfSk7XG4gICAgfVxuXG59XG4iLCIvKiB0aGVtZSBzdHVmZiAqL1xuaW1wb3J0IHsgdmVyc2lvbiwgdmVyc2lvbl9mb2N1cywgdmVyc2lvbl9idWlsZF9kYXRlIH0gZnJvbSBcIi4uLy4uL3BhY2thZ2UuanNvblwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6IFwidlwiICsgdmVyc2lvbiArIFwiIFwiICsgdmVyc2lvbl9mb2N1cyxcbiAgdmVyc2lvbjogXCJ2XCIgKyB2ZXJzaW9uLFxuICB2ZXJzaW9uX2J1aWxkX2RhdGU6IHZlcnNpb25fYnVpbGRfZGF0ZVxufTtcbiIsImltcG9ydCB7Y2hhdGxpbmVzfSBmcm9tICcvbGliL2NvbGxlY3Rpb25zJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7fSIsImltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4gIGlmIChNZXRlb3IudXNlcnMuZmluZCgpLmNvdW50KCkgPT09IDApIHtcbiAgICBBY2NvdW50cy5jcmVhdGVVc2VyKHsgZW1haWw6ICd0ZXN0QHRlc3QuY29tJywgcGFzc3dvcmQ6ICd0ZXN0MTIzNCcgfSk7XG4gIH1cbn07XG4iLCJpbXBvcnQgeyBNZXRlb3IgfSBmcm9tIFwibWV0ZW9yL21ldGVvclwiO1xuaW1wb3J0IHsgY2hlY2sgfSBmcm9tIFwibWV0ZW9yL2NoZWNrXCI7XG4vLyBpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IEFkbWluUm9sZSBmcm9tIFwiLi4vbGliL2FkbWlucm9sZVwiO1xuaW1wb3J0IHsgUmFuZG9tIH0gZnJvbSBcIm1ldGVvci9yYW5kb21cIjtcbmltcG9ydCB7XG4gIERFRkNPTjksXG4gIERFRkNPTjcsXG4gIERFRkNPTjUsXG4gIERFRkNPTjQsXG4gIERFRkNPTjMsXG4gIERFRkNPTjIsXG4gIERFRkNPTjEsXG59IGZyb20gXCIvZGVidWcuanNvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIE1ldGVvci5tZXRob2RzKHtcbiAgICBcIl91c2Vycy5nZXRVc2VyTGlzdFwiKHF1ZXJ5KSB7XG4gICAgICBjaGVjayhxdWVyeSwgT2JqZWN0KTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJSdW5uaW5nIFF1ZXJ5IHRvIGdldCBVc2Vyc1wiKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2cocXVlcnkpO1xuXG4gICAgICB2YXIgY2hhdFVzZXJzID0gTWV0ZW9yLnVzZXJzLmZpbmQocXVlcnkpLmZldGNoKCk7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGNoYXRVc2Vycyk7XG5cbiAgICAgIHJldHVybiBjaGF0VXNlcnM7XG4gICAgfSxcbiAgICBcIl91c2Vycy5nZXRMYW5ndWFnZVByZWZlcmVuY2VcIihfaWQpIHtcbiAgICAgIGNoZWNrKF9pZCwgU3RyaW5nKTtcbiAgICAgIGxldCByZWNvcmQgPSBNZXRlb3IudXNlcnMuZmluZE9uZShfaWQpO1xuXG4gICAgICBpZiAocmVjb3JkICYmIHJlY29yZC5nZXQoXCJsYW5ndWFnZVwiKSkgcmV0dXJuIHJlY29yZC5nZXQoXCJsYW5ndWFnZVwiKTtcblxuICAgICAgY29uc3QgbG9jYWxlID0gTWV0ZW9yLnNldHRpbmdzW1wicHVibGljXCJdLmRlZmF1bHRMb2NhbGU7XG4gICAgICByZXR1cm4gbG9jYWxlID8gbG9jYWxlIDogXCJzdlwiO1xuICAgIH0sXG5cbiAgICBcIl91c2Vycy5zZXRMYW5ndWFnZVByZWZlcmVuY2VcIihfaWQsIGxhbmcpIHtcbiAgICAgIGNoZWNrKF9pZCwgU3RyaW5nKTtcbiAgICAgIGNoZWNrKGxhbmcsIFN0cmluZyk7XG4gICAgICAvLyBNZXRlb3IudXNlcnMudXBkYXRlKHtfaWQ6IF9pZH0sIHtzZXQ6IHtsYW5ndWFnZTogbGFuZ319KVxuICAgICAgbGV0IHJlY29yZCA9IE1ldGVvci51c2Vycy5maW5kT25lKF9pZCk7XG4gICAgICBpZiAocmVjb3JkKSB7XG4gICAgICAgIHJlY29yZC5zZXQoXCJsYW5ndWFnZVwiLCBsYW5nKTtcbiAgICAgICAgcmVjb3JkLnNhdmUoKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJfdXNlcnMuZ2V0VGhlbWVcIihfaWQpIHtcbiAgICAgIGNoZWNrKF9pZCwgU3RyaW5nKTtcbiAgICAgIGxldCByZWNvcmQgPSBNZXRlb3IudXNlcnMuZmluZE9uZShfaWQpO1xuXG4gICAgICBpZiAocmVjb3JkICYmIHJlY29yZC5nZXQoXCJ0aGVtZVwiKSkgcmV0dXJuIHJlY29yZC5nZXQoXCJ0aGVtZVwiKTtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIFwiX3VzZXJzLnNldFRoZW1lXCIoX2lkLCB0aGVtZSkge1xuICAgICAgY2hlY2soX2lkLCBTdHJpbmcpO1xuICAgICAgY2hlY2sodGhlbWUsIEJvb2xlYW4pO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIlNldCBUaGVtZSBmb3IgdXNlciBcIiArIF9pZCk7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiVGhlbWUgdmFsdWUgXCIgKyB0aGVtZSk7XG5cbiAgICAgIGxldCByZWNvcmQgPSBNZXRlb3IudXNlcnMuZmluZE9uZShfaWQpO1xuICAgICAgaWYgKHJlY29yZCkge1xuICAgICAgICByZWNvcmQuc2V0KFwidGhlbWVcIiwgdGhlbWUpO1xuICAgICAgICByZWNvcmQuc2F2ZSgpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBcIl91c2Vycy51cGRhdGVQcm9maWxlRGVzY3JpcHRpb25cIih1c2VySWQsIHRleHQpIHtcbiAgICAgIGNoZWNrKHVzZXJJZCwgU3RyaW5nKTtcbiAgICAgIGNoZWNrKHRleHQsIFN0cmluZyk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgIXRoaXMudXNlcklkIHx8XG4gICAgICAgICh0aGlzLnVzZXJJZCAhPT0gdXNlcklkICYmICFBZG1pblJvbGUuaXNTdXBlckFkbWluKHRoaXMudXNlcklkKSlcbiAgICAgICkge1xuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgICAgfVxuXG4gICAgICBsZXQgdXBkYXRlZCA9IE1ldGVvci51c2Vycy51cGRhdGUoXG4gICAgICAgIHsgX2lkOiB1c2VySWQgfSxcbiAgICAgICAgeyAkc2V0OiB7IHByb2ZpbGU6IHRleHQgfSB9XG4gICAgICApO1xuICAgICAgaWYgKHVwZGF0ZWQpIHtcbiAgICAgICAgcmV0dXJuIFwiRGVzY3JpcHRpb24gdXBkYXRlZFwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFwiRGVzY3JpcHRpb24gbm90IHVwZGF0ZWQhIFBsZWFzZSB0cnkgYWdhaW4uXCI7XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiX3VzZXJzLnVwZGF0ZU5hbWVcIih1c2VySWQsIHRleHQpIHtcbiAgICAgIGNoZWNrKHVzZXJJZCwgU3RyaW5nKTtcbiAgICAgIGNoZWNrKHRleHQsIFN0cmluZyk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgIXRoaXMudXNlcklkIHx8XG4gICAgICAgICh0aGlzLnVzZXJJZCAhPT0gdXNlcklkICYmICFBZG1pblJvbGUuaXNTdXBlckFkbWluKHRoaXMudXNlcklkKSlcbiAgICAgICkge1xuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgICAgfVxuXG4gICAgICBsZXQgdXBkYXRlZCA9IE1ldGVvci51c2Vycy51cGRhdGUoXG4gICAgICAgIHsgX2lkOiB1c2VySWQgfSxcbiAgICAgICAgeyAkc2V0OiB7IG5hbWU6IHRleHQgfSB9XG4gICAgICApO1xuICAgICAgaWYgKHVwZGF0ZWQpIHtcbiAgICAgICAgcmV0dXJuIFwiTmFtZSB1cGRhdGVkXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gXCJOYW1lIG5vdCB1cGRhdGVkISBQbGVhc2UgdHJ5IGFnYWluLlwiO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBcIl91c2Vycy51cGRhdGVFbWFpbFwiKHVzZXJJZCwgZW1haWwpIHtcbiAgICAgIGNoZWNrKHVzZXJJZCwgU3RyaW5nKTtcbiAgICAgIGNoZWNrKGVtYWlsLCBTdHJpbmcpO1xuXG4gICAgICBpZiAoXG4gICAgICAgICF0aGlzLnVzZXJJZCB8fFxuICAgICAgICAodGhpcy51c2VySWQgIT09IHVzZXJJZCAmJiAhQWRtaW5Sb2xlLmlzU3VwZXJBZG1pbih0aGlzLnVzZXJJZCkpXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiQWNjZXNzIGRlbmllZFwiKTtcbiAgICAgIH1cblxuICAgICAgbGV0IHVwZGF0ZWQgPSBNZXRlb3IudXNlcnMudXBkYXRlKFxuICAgICAgICB7IF9pZDogdXNlcklkIH0sXG4gICAgICAgIHsgJHNldDogeyBcImVtYWlscy4wLmFkZHJlc3NcIjogZW1haWwgfSB9XG4gICAgICApO1xuICAgICAgaWYgKHVwZGF0ZWQpIHtcbiAgICAgICAgcmV0dXJuIFwiRW1haWwgdXBkYXRlZFwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFwiRW1haWwgbm90IHVwZGF0ZWQhIFBsZWFzZSB0cnkgYWdhaW4uXCI7XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiX3VzZXJzLmFub255bWl6ZVwiKHVzZXJJZCkge1xuICAgICAgY2hlY2sodXNlcklkLCBTdHJpbmcpO1xuXG4gICAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCBcIkFjY2VzcyBkZW5pZWRcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChBZG1pblJvbGUuaXNTdXBlckFkbWluKHRoaXMudXNlcklkKSkge1xuICAgICAgICBjb25zdCBuZXdVc2VyID0ge1xuICAgICAgICAgIG5hbWU6IFJhbmRvbS5pZCgpLFxuICAgICAgICAgIFwiZW1haWxzLjAuYWRkcmVzc1wiOiBSYW5kb20uaWQoKSArIFwiQFwiICsgUmFuZG9tLmlkKCkgKyBcIi53ZXlsYW4ueXRcIixcbiAgICAgICAgICBhdmF0YXJfdXJpOiBcIlwiLFxuICAgICAgICB9O1xuICAgICAgICBsZXQgdXBkYXRlZCA9IE1ldGVvci51c2Vycy51cGRhdGUoeyBfaWQ6IHVzZXJJZCB9LCB7ICRzZXQ6IG5ld1VzZXIgfSk7XG4gICAgICAgIGlmICh1cGRhdGVkKSB7XG4gICAgICAgICAgcmV0dXJuIFwiVXNlciBhbm9ueW1pemUgc3VjY2Vzc2Z1bFwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBcIlVzZXIgYW5vbnltaXplIGZhaWx1cmUhIFBsZWFzZSB0cnkgYWdhaW4uXCI7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoXG4gICAgICAgICAgNDAxLFxuICAgICAgICAgIFwiQWNjZXNzIGRlbmllZCAtIGFkbWluaXN0cmF0b3Igcm9sZSByZXF1aXJlZFwiXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSxcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBNZXRlb3IgfSBmcm9tIFwibWV0ZW9yL21ldGVvclwiO1xuaW1wb3J0IHsgY2hlY2ssIE1hdGNoIH0gZnJvbSBcIm1ldGVvci9jaGVja1wiO1xuaW1wb3J0IE9yZGVyIGZyb20gXCIuLi9saWIvb3JkZXIuanNcIjtcbmltcG9ydCB7IFBlcnNvbnMsIFNlYXJjaExvZyB9IGZyb20gXCIvbGliL2NvbGxlY3Rpb25zXCI7XG5cbmltcG9ydCB7XG4gIERFRkNPTjksXG4gIERFRkNPTjcsXG4gIERFRkNPTjUsXG4gIERFRkNPTjQsXG4gIERFRkNPTjMsXG4gIERFRkNPTjIsXG4gIERFRkNPTjEsXG59IGZyb20gXCIvZGVidWcuanNvblwiO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tIFwiL2xpYi9jb25zdGFudHNcIjtcbmltcG9ydCBEcnVwYWxTZXJ2aWNlcyBmcm9tIFwiLi4vbGliL2RydXBhbC9zZXJ2aWNlc1wiO1xuXG5ERUZDT041ICYmIGNvbnNvbGUubG9nKFwiSW4gQWNjb3VudFwiKTtcblxudmFyIHN0YWxlU2Vzc2lvblB1cmdlSW50ZXJ2YWwgPVxuICAoTWV0ZW9yLnNldHRpbmdzICYmXG4gICAgTWV0ZW9yLnNldHRpbmdzLnB1YmxpYyAmJlxuICAgIE1ldGVvci5zZXR0aW5ncy5wdWJsaWMuc3RhbGVTZXNzaW9uUHVyZ2VJbnRlcnZhbCkgfHxcbiAgMSAqIDYwICogMTAwMDsgLy8gMW1pblxudmFyIGluYWN0aXZpdHlUaW1lb3V0ID1cbiAgKE1ldGVvci5zZXR0aW5ncyAmJlxuICAgIE1ldGVvci5zZXR0aW5ncy5wdWJsaWMgJiZcbiAgICBNZXRlb3Iuc2V0dGluZ3MucHVibGljLnN0YWxlU2Vzc2lvbkluYWN0aXZpdHlUaW1lb3V0KSB8fFxuICAzMCAqIDYwICogMTAwMDsgLy8gMzBtaW5zXG52YXIgZm9yY2VMb2dvdXQgPSBNZXRlb3Iuc2V0dGluZ3MgJiYgTWV0ZW9yLnNldHRpbmdzLnB1YmxpYyAmJiBNZXRlb3Iuc2V0O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIE1ldGVvci5tZXRob2RzKHtcbiAgICBhc3luYyBcImFjY291bnQuc2V0UHdcIihxdWVyeSkge1xuICAgICAgY2hlY2socXVlcnksIE9iamVjdCk7XG4gICAgICBsZXQgdXNlck9iaiA9IE1ldGVvci51c2Vycy5maW5kT25lKHRoaXMudXNlcklkKTtcbiAgICAgIHF1ZXJ5LnVpZCA9IHVzZXJPYmoudWlkO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIkFjY291bnQgc2V0UHdcIik7XG5cbiAgICAgIGNvbnN0IGRvV29yayA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3Qgc2VydmljZXMgPSBuZXcgRHJ1cGFsU2VydmljZXMoKTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBzZXJ2aWNlcy5hY2NvdW50U2V0UHcocXVlcnkpO1xuICAgICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGBNZXRob2QgQWNjb3VudCBzZXRQd2ApO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9O1xuXG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gYXdhaXQgZG9Xb3JrKCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoZS5lcnJvciwgZS5yZWFzb24pO1xuICAgICAgfVxuICAgIH0sXG4gICAgaGVhcnRiZWF0OiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhgSGVhcnRiZWF0IGNoZWNrIC0gaWYgdXNlciBzaG91bGQgcmVDb25uZWN0YCk7XG4gICAgICB2YXIgdXNlciA9IE1ldGVvci51c2Vycy5maW5kT25lKHRoaXMudXNlcklkKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2codGhpcy51c2VySWQpO1xuXG4gICAgICBpZiAodXNlcikge1xuICAgICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGBHZXQgdXNlciBhbmQgdXBkYXRlIGhlYXJ0YmVhdC4uLmApO1xuICAgICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKHVzZXIudWlkICsgXCIgXCIgKyB1c2VyLm5hbWUpO1xuICAgICAgICBNZXRlb3IudXNlcnMudXBkYXRlKHVzZXIuX2lkLCB7ICRzZXQ6IHsgaGVhcnRiZWF0OiBuZXcgRGF0ZSgpIH0gfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGBUaGlzIHVzZXJpZCBpcyBub3Qgc2V0Li4uYCk7XG4gICAgICB9XG4gICAgICAvLyBpZiAodXNlcikge1xuICAgICAgLy8gICBERUZDT041ICYmIGNvbnNvbGUubG9nKGBHZXQgdXNlciBhbmQgdXBkYXRlIGhlYXJ0YmVhdC4uLmApO1xuICAgICAgLy8gICBERUZDT041ICYmIGNvbnNvbGUubG9nKHVzZXIudWlkICsgXCIgXCIgKyB1c2VyLnVzZXJuYW1lKTtcbiAgICAgIC8vICAgTWV0ZW9yLnVzZXJzLnVwZGF0ZSh1c2VyLl9pZCwgeyAkc2V0OiB7IGhlYXJ0YmVhdDogbmV3IERhdGUoKSB9IH0pO1xuICAgICAgLy8gfVxuICAgIH0sXG4gICAgLy9cbiAgfSk7XG59XG5cbi8vXG4vLyBwZXJpb2RpY2FsbHkgcHVyZ2UgYW55IHN0YWxlIHNlc3Npb25zLCByZW1vdmluZyB0aGVpciBsb2dpbiB0b2tlbnMgYW5kIGNsZWFyaW5nIG91dCB0aGUgc3RhbGUgaGVhcnRiZWF0LlxuLy9cbmlmIChmb3JjZUxvZ291dCAhPT0gZmFsc2UpIHtcbiAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhgSGVhcnRCZWF0Q2hlY2sgU2V0dXAuLi5gKTtcbiAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhzdGFsZVNlc3Npb25QdXJnZUludGVydmFsKTtcblxuICBNZXRlb3Iuc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coYEhlYXJ0QmVhdENoZWNrIFNlcnZlciBDaGVjay4uLmApO1xuXG4gICAgdmFyIG5vdyA9IG5ldyBEYXRlKCksXG4gICAgICBvdmVyZHVlVGltZXN0YW1wID0gbmV3IERhdGUobm93IC0gaW5hY3Rpdml0eVRpbWVvdXQpO1xuICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coaW5hY3Rpdml0eVRpbWVvdXQpO1xuICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2cob3ZlcmR1ZVRpbWVzdGFtcCk7XG4gICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhzdGFsZVNlc3Npb25QdXJnZUludGVydmFsKTtcblxuICAgIE1ldGVvci51c2Vycy51cGRhdGUoXG4gICAgICB7IGhlYXJ0YmVhdDogeyAkbHQ6IG92ZXJkdWVUaW1lc3RhbXAgfSB9LFxuICAgICAgeyAkc2V0OiB7IFwic2VydmljZXMucmVzdW1lLmxvZ2luVG9rZW5zXCI6IFtdIH0sICR1bnNldDogeyBoZWFydGJlYXQ6IDEgfSB9LFxuICAgICAgeyBtdWx0aTogdHJ1ZSB9XG4gICAgKTtcbiAgfSwgc3RhbGVTZXNzaW9uUHVyZ2VJbnRlcnZhbCk7XG59XG5cbkZ1dHVyZSA9IE5wbS5yZXF1aXJlKFwiZmliZXJzL2Z1dHVyZVwiKTtcbi8vIEF0IGEgbWluaW11bSwgc2V0IHVwIExEQVBfREVGQVVMVFMudXJsIGFuZCAuZG4gYWNjb3JkaW5nIHRvXG4vLyB5b3VyIG5lZWRzLiB1cmwgc2hvdWxkIGFwcGVhciBhcyAnbGRhcDovL3lvdXIudXJsLmhlcmUnXG4vLyBkbiBzaG91bGQgYXBwZWFyIGluIG5vcm1hbCBsZGFwIGZvcm1hdCBvZiBjb21tYSBzZXBhcmF0ZWQgYXR0cmlidXRlPXZhbHVlXG4vLyBlLmcuICd1aWQ9c29tZXVzZXIsY249dXNlcnMsZGM9c29tZXZhbHVlJ1xuRFJVUEFMX0RFRkFVTFRTID0ge1xuICB1cmw6IGZhbHNlLFxuICBwb3J0OiBcIjM4OVwiLFxuICBkbjogZmFsc2UsXG4gIHNlYXJjaEROOiBmYWxzZSxcbiAgc2VhcmNoU2l6ZUxpbWl0OiAxMDAsXG4gIHNlYXJjaENyZWRlbnRpYWxzOiBmYWxzZSxcbiAgY3JlYXRlTmV3VXNlcjogdHJ1ZSxcbiAgZGVmYXVsdERvbWFpbjogZmFsc2UsXG4gIHNlYXJjaFJlc3VsdHNQcm9maWxlTWFwOiBmYWxzZSxcbiAgYmFzZTogbnVsbCxcbiAgc2VhcmNoOiBcIihvYmplY3RjbGFzcz0qKVwiLFxuICBsZGFwc0NlcnRpZmljYXRlOiBmYWxzZSxcbiAgYmluZFRvRG9tYWluOiBmYWxzZSxcbiAgYmluZERvbWFpbjogbnVsbCxcbn07XG5MREFQID0ge307XG5cbi8qKlxuIEBjbGFzcyBMREFQXG4gQGNvbnN0cnVjdG9yXG4gKi9cbkxEQVAuY3JlYXRlID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgLy8gU2V0IG9wdGlvbnNcbiAgdGhpcy5vcHRpb25zID0gXy5kZWZhdWx0cyhvcHRpb25zLCBEUlVQQUxfREVGQVVMVFMpO1xuXG4gIC8vIE1ha2Ugc3VyZSBvcHRpb25zIGhhdmUgYmVlbiBzZXRcbiAgdHJ5IHtcbiAgICAvLyBjaGVjayh0aGlzLm9wdGlvbnMudXJsLCBTdHJpbmcpO1xuICAgIC8vIGNoZWNrKHRoaXMub3B0aW9ucy5kbiwgU3RyaW5nKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoXG4gICAgICBcIkJhZCBEZWZhdWx0c1wiLFxuICAgICAgXCJPcHRpb25zIG5vdCBzZXQuIE1ha2Ugc3VyZSB0byBzZXQgTERBUF9ERUZBVUxUUy51cmwgYW5kIExEQVBfREVGQVVMVFMuZG4hXCJcbiAgICApO1xuICB9XG5cbiAgLy8gLy8gQmVjYXVzZSBOUE0gbGRhcGpzIG1vZHVsZSBoYXMgc29tZSBiaW5hcnkgYnVpbGRzLFxuICAvLyAvLyBXZSBoYWQgdG8gY3JlYXRlIGEgd3JhcGVyIHBhY2thZ2UgZm9yIGl0IGFuZCBidWlsZCBmb3JcbiAgLy8gLy8gY2VydGFpbiBhcmNoaXRlY3R1cmVzLiBUaGUgcGFja2FnZSB0eXA6bGRhcC1qcyBleHBvcnRzXG4gIC8vIC8vICdNZXRlb3JXcmFwcGVyTGRhcGpzJyB3aGljaCBpcyBhIHdyYXBwZXIgZm9yIHRoZSBucG0gbW9kdWxlXG4gIC8vIHRoaXMubGRhcGpzID0gTWV0ZW9yV3JhcHBlckxkYXBqcztcbn07XG5cbi8qKlxuICogQXR0ZW1wdCB0byBiaW5kIChhdXRoZW50aWNhdGUpIGxkYXBcbiAqIGFuZCBwZXJmb3JtIGEgZG4gc2VhcmNoIGlmIHNwZWNpZmllZFxuICpcbiAqIEBtZXRob2QgbGRhcENoZWNrXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAgT2JqZWN0IHdpdGggdXNlcm5hbWUsIGxkYXBQYXNzIGFuZCBvdmVycmlkZXMgZm9yIExEQVBfREVGQVVMVFMgb2JqZWN0LlxuICogQWRkaXRpb25hbGx5IHRoZSBzZWFyY2hCZWZvcmVCaW5kIHBhcmFtZXRlciBjYW4gYmUgc3BlY2lmaWVkLCB3aGljaCBpcyB1c2VkIHRvIHNlYXJjaCBmb3IgdGhlIEROXG4gKiBpZiBub3QgcHJvdmlkZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtiaW5kQWZ0ZXJGaW5kXSAgV2hldGhlciBvciBub3QgdG8gdHJ5IHRvIGxvZ2luIHdpdGggdGhlIHN1cHBsaWVkIGNyZWRlbnRpYWxzIG9yXG4gKiBqdXN0IHJldHVybiB3aGV0aGVyIG9yIG5vdCB0aGUgdXNlciBleGlzdHMuXG4gKi9cbkxEQVAuY3JlYXRlLnByb3RvdHlwZS5kcnVwYWxDaGVjayA9IGZ1bmN0aW9uIChvcHRpb25zLCBiaW5kQWZ0ZXJGaW5kKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIkxvZ2luIENoZWNrIERydXBhbCAoTkVXKVwiKTtcblxuICAvLyBERUZDT04zICYmIGNvbnNvbGUubG9nKCdkcnVwYWxDaGVjaycpO1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICBpZiAoXG4gICAgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoXCJ1c2VybmFtZVwiKSAmJlxuICAgICAgb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShcImxkYXBQYXNzXCIpKSB8fFxuICAgICFiaW5kQWZ0ZXJGaW5kXG4gICkge1xuICAgIHZhciBsZGFwQXN5bmNGdXQgPSBuZXcgRnV0dXJlKCk7XG5cbiAgICB0cnkge1xuICAgICAgSFRUUC5nZXQoTWV0ZW9yLnNldHRpbmdzW1wiZHJ1cGFsVG9rZW5VcmxcIl0sIHVuZGVmaW5lZCwgZnVuY3Rpb24gKFxuICAgICAgICBlcnIsXG4gICAgICAgIHRva2VuUmVzdWx0XG4gICAgICApIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGxkYXBBc3luY0Z1dC5yZXR1cm4oe1xuICAgICAgICAgICAgZXJyb3I6IGVycixcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgdXNlcl9kYXRhID0ge1xuICAgICAgICAgICAgdXNlcm5hbWU6IG9wdGlvbnMudXNlcm5hbWUsXG4gICAgICAgICAgICBwYXNzd29yZDogb3B0aW9ucy5sZGFwUGFzcyxcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaWYgKCF0b2tlblJlc3VsdC5jb250ZW50KSB7XG4gICAgICAgICAgICBsZGFwQXN5bmNGdXQucmV0dXJuKHtcbiAgICAgICAgICAgICAgZXJyb3I6IG5ldyBNZXRlb3IuRXJyb3IoXCI1MDBcIiwgXCJtaXNzaW5nIHRva2VuIGluIHJlc3BvbnNlXCIpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHF1b3RlLXByb3BzXG4gICAgICAgICAgY29uc3QgaGVhZGVycyA9IHtcbiAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgXCJYLUNTUkYtVG9rZW5cIjogdG9rZW5SZXN1bHQuY29udGVudCxcbiAgICAgICAgICAgIHN0cmljdFNTTDogXCJmYWxzZVwiLFxuICAgICAgICAgIH07XG4gICAgICAgICAgdmFyIHBhcmFtcyA9IHsgaGVhZGVycywgZGF0YTogdXNlcl9kYXRhIH07XG4gICAgICAgICAgSFRUUC5wb3N0KE1ldGVvci5zZXR0aW5nc1tcImRydXBhbExvZ2luVXJsXCJdLCBwYXJhbXMsIGZ1bmN0aW9uIChcbiAgICAgICAgICAgIGVycixcbiAgICAgICAgICAgIGxvZ2luUmVzdWx0XG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgIGxkYXBBc3luY0Z1dC5yZXR1cm4oe1xuICAgICAgICAgICAgICAgIGVycm9yOiBlcnIsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gREVGQ09OMyAmJiBjb25zb2xlLmxvZyhsb2dpblJlc3VsdCk7XG4gICAgICAgICAgICAgIHZhciByZXRPYmplY3QgPSB7fTtcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXRPYmplY3QudXNlcm5hbWUgPSBsb2dpblJlc3VsdC5kYXRhLnVzZXIubmFtZTtcbiAgICAgICAgICAgICAgICBpZiAoIXJldE9iamVjdC51c2VybmFtZSkge1xuICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidXNlciBuYW1lIGlzIGVtcHR5XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXRPYmplY3QuZW1haWwgPSBsb2dpblJlc3VsdC5kYXRhLnVzZXIubWFpbDtcbiAgICAgICAgICAgICAgICBpZiAoIXJldE9iamVjdC5lbWFpbCkge1xuICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidXNlciBlbWFpbCBpcyBlbXB0eVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0T2JqZWN0LnVpZCA9IGxvZ2luUmVzdWx0LmRhdGEudXNlci51aWQ7XG4gICAgICAgICAgICAgICAgbGRhcEFzeW5jRnV0LnJldHVybihyZXRPYmplY3QpO1xuICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICBsZGFwQXN5bmNGdXQucmV0dXJuKHtcbiAgICAgICAgICAgICAgICAgIGVycm9yOiBuZXcgTWV0ZW9yLkVycm9yKGVyci5jb2RlLCBlcnIubWVzc2FnZSksXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBsZGFwQXN5bmNGdXQud2FpdCgpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbGRhcEFzeW5jRnV0LnJldHVybih7XG4gICAgICAgIGVycm9yOiBuZXcgTWV0ZW9yLkVycm9yKGVyci5jb2RlLCBlcnIubWVzc2FnZSksXG4gICAgICB9KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDMsIFwiTWlzc2luZyBBdXRoIFBhcmFtZXRlcnNcIik7XG4gIH1cbn07XG5cbi8vIFJlZ2lzdGVyIGxvZ2luIGhhbmRsZXIgd2l0aCBNZXRlb3Jcbi8vIEhlcmUgd2UgY3JlYXRlIGEgbmV3IExEQVAgaW5zdGFuY2Ugd2l0aCBvcHRpb25zIHBhc3NlZCBmcm9tXG4vLyBNZXRlb3IubG9naW5XaXRoTERBUCBvbiBjbGllbnQgc2lkZVxuLy8gQHBhcmFtIHtPYmplY3R9IGxvZ2luUmVxdWVzdCB3aWxsIGNvbnNpc3Qgb2YgdXNlcm5hbWUsIGxkYXBQYXNzLCBsZGFwLCBhbmQgbGRhcE9wdGlvbnNcbkFjY291bnRzLnJlZ2lzdGVyTG9naW5IYW5kbGVyKFwiZHJ1cGFsXCIsIGZ1bmN0aW9uIChsb2dpblJlcXVlc3QpIHtcbiAgLy8gSWYgJ2xkYXAnIGlzbid0IHNldCBpbiBsb2dpblJlcXVlc3Qgb2JqZWN0LFxuICAvLyB0aGVuIHRoaXMgaXNuJ3QgdGhlIHByb3BlciBoYW5kbGVyIChyZXR1cm4gdW5kZWZpbmVkKVxuICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiUkVHSVNURVIgTE9HSU4gSEFORExFUiBSRVFVRVNUIChORVcpOlwiKTtcbiAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhsb2dpblJlcXVlc3QpO1xuXG4gIGlmICghbG9naW5SZXF1ZXN0LmRydXBhbCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICAvLyBJbnN0YW50aWF0ZSBMREFQIHdpdGggb3B0aW9uc1xuICB2YXIgdXNlck9wdGlvbnMgPSBsb2dpblJlcXVlc3QubGRhcE9wdGlvbnMgfHwge307XG4gIEFjY291bnRzLmxkYXBPYmogPSBuZXcgTERBUC5jcmVhdGUodXNlck9wdGlvbnMpO1xuXG4gIC8vIENhbGwgbGRhcENoZWNrIGFuZCBnZXQgcmVzcG9uc2VcbiAgdmFyIHJlc3BvbnNlID0gQWNjb3VudHMubGRhcE9iai5kcnVwYWxDaGVjayhsb2dpblJlcXVlc3QsIHRydWUpO1xuICBpZiAocmVzcG9uc2UuZXJyb3IpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXNlcklkOiBudWxsLFxuICAgICAgZXJyb3I6IHJlc3BvbnNlLmVycm9yLFxuICAgIH07XG4gIH1cbiAgLy8gU2V0IGluaXRpYWwgdXNlcklkIGFuZCB0b2tlbiB2YWxzXG4gIHZhciB1c2VySWQgPSBudWxsO1xuICB2YXIgc3RhbXBlZFRva2VuID0ge1xuICAgIHRva2VuOiBudWxsLFxuICB9O1xuICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwicmVzcG9uc2U6XCIpO1xuICBERUZDT04zICYmIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcblxuICAvLyBMb29rIHRvIHNlZSBpZiB1c2VyIGFscmVhZHkgZXhpc3RzXG4gIHZhciB1c2VyID0gTWV0ZW9yLnVzZXJzLmZpbmRPbmUoe1xuICAgIC8vIHVzZXJuYW1lOiByZXNwb25zZS51c2VybmFtZVxuICAgIFwiZW1haWxzLmFkZHJlc3NcIjogcmVzcG9uc2UuZW1haWwsXG4gIH0pO1xuICBpZiAoIXVzZXIpIHtcbiAgICB1c2VyID0gTWV0ZW9yLnVzZXJzLmZpbmRPbmUoe1xuICAgICAgZW1haWxzOiB7ICRlbGVtTWF0Y2g6IHsgYWRkcmVzczogcmVzcG9uc2UuZW1haWwsIHZlcmlmaWVkOiB0cnVlIH0gfSxcbiAgICB9KTtcbiAgICBpZiAodXNlcikge1xuICAgICAgdXNlci51c2VybmFtZSA9IHJlc3BvbnNlLnVzZXJuYW1lO1xuICAgIH1cbiAgfVxuXG4gIC8vIExvZ2luIHVzZXIgaWYgdGhleSBleGlzdFxuICBpZiAodXNlcikge1xuICAgIHVzZXJJZCA9IHVzZXIuX2lkO1xuXG4gICAgLy8gQ3JlYXRlIGhhc2hlZCB0b2tlbiBzbyB1c2VyIHN0YXlzIGxvZ2dlZCBpblxuICAgIHN0YW1wZWRUb2tlbiA9IEFjY291bnRzLl9nZW5lcmF0ZVN0YW1wZWRMb2dpblRva2VuKCk7XG4gICAgdmFyIGhhc2hTdGFtcGVkVG9rZW4gPSBBY2NvdW50cy5faGFzaFN0YW1wZWRUb2tlbihzdGFtcGVkVG9rZW4pO1xuICAgIC8vIFVwZGF0ZSB0aGUgdXNlcidzIHRva2VuIGluIG1vbmdvXG4gICAgTWV0ZW9yLnVzZXJzLnVwZGF0ZSh1c2VySWQsIHtcbiAgICAgICRwdXNoOiB7XG4gICAgICAgIFwic2VydmljZXMucmVzdW1lLmxvZ2luVG9rZW5zXCI6IGhhc2hTdGFtcGVkVG9rZW4sXG4gICAgICB9LFxuICAgIH0pO1xuICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJVc2VyIGV4aXN0cyFcIik7XG4gICAgQWNjb3VudHMuc2V0UGFzc3dvcmQodXNlcklkLCBsb2dpblJlcXVlc3QubGRhcFBhc3MpO1xuICAgIE1ldGVvci5jYWxsKFxuICAgICAgXCJfdXNlcnMuc3luY0RydXBhbFVzZXJcIixcbiAgICAgIHVzZXJJZCxcbiAgICAgIHJlc3BvbnNlLnVpZCxcbiAgICAgIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIC8vIGlmIChjYWxsYmFjaykge1xuICAgICAgICAvLyAgIGlmIChlcnIpIHtcbiAgICAgICAgLy8gICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgIC8vICAgfSBlbHNlIHtcbiAgICAgICAgLy8gICAgIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbiAgICAgICAgLy8gICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJhY3Rpb25zLl91c2Vycy5tYW5hZ2UgZXJyb3I6IFwiICsgZXJyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG4gIH1cbiAgLy8gT3RoZXJ3aXNlIGNyZWF0ZSB1c2VyIGlmIG9wdGlvbiBpcyBzZXRcbiAgZWxzZSBpZiAoQWNjb3VudHMubGRhcE9iai5vcHRpb25zLmNyZWF0ZU5ld1VzZXIpIHtcbiAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiQ3JlYXRpbmcgbmV3IHVzZXJcIik7XG4gICAgdmFyIHVzZXJPYmplY3QgPSB7XG4gICAgICB1c2VybmFtZTogcmVzcG9uc2UudXNlcm5hbWUsXG4gICAgfTtcblxuICAgIHVzZXJJZCA9IEFjY291bnRzLmNyZWF0ZVVzZXIodXNlck9iamVjdCk7XG4gICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyh1c2VyT2JqZWN0KTtcbiAgICBNZXRlb3IudXNlcnMudXBkYXRlKHVzZXJJZCwge1xuICAgICAgJHNldDoge1xuICAgICAgICBlbWFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBhZGRyZXNzOiByZXNwb25zZS5lbWFpbCxcbiAgICAgICAgICAgIHZlcmlmaWVkOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIHVpZDogcmVzcG9uc2UudWlkLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBBY2NvdW50cy5zZXRQYXNzd29yZCh1c2VySWQsIGxvZ2luUmVxdWVzdC5sZGFwUGFzcyk7XG4gICAgTWV0ZW9yLmNhbGwoXG4gICAgICBcIl91c2Vycy5zeW5jRHJ1cGFsVXNlclwiLFxuICAgICAgdXNlcklkLFxuICAgICAgcmVzcG9uc2UudWlkLFxuICAgICAgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgLy8gaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIC8vICAgaWYgKGVycikge1xuICAgICAgICAvLyAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgLy8gICB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgY2FsbGJhY2sobnVsbCwgcmVzcG9uc2UpO1xuICAgICAgICAvLyAgIH1cbiAgICAgICAgLy8gfVxuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcImFjdGlvbnMuX3VzZXJzLm1hbmFnZSBlcnJvcjogXCIgKyBlcnIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBMZGFwIHN1Y2Nlc3MsIGJ1dCBubyB1c2VyIGNyZWF0ZWRcbiAgICBERUZDT04zICYmXG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJBdXRoZW50aWNhdGlvbiBzdWNjZWVkZWQgZm9yIFwiICtcbiAgICAgICAgICByZXNwb25zZS51c2VybmFtZSArXG4gICAgICAgICAgXCIsIGJ1dCBubyB1c2VyIGV4aXN0cyBpbiBNZXRlb3IuIEVpdGhlciBjcmVhdGUgdGhlIHVzZXIgbWFudWFsbHkgb3Igc2V0IERSVVBBX0RFRkFVTFRTLmNyZWF0ZU5ld1VzZXIgdG8gdHJ1ZVwiXG4gICAgICApO1xuICAgIHJldHVybiB7XG4gICAgICB1c2VySWQ6IG51bGwsXG4gICAgICBlcnJvcjogbmV3IE1ldGVvci5FcnJvcig0MDMsIFwiVXNlciBmb3VuZCBpbiBMREFQIGJ1dCBub3QgaW4gYXBwbGljYXRpb25cIiksXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdXNlcklkLFxuICAgIHRva2VuOiBzdGFtcGVkVG9rZW4udG9rZW4sXG4gIH07XG59KTtcbiIsImltcG9ydCB7IE1ldGVvciB9IGZyb20gXCJtZXRlb3IvbWV0ZW9yXCI7XG5pbXBvcnQgeyBjaGVjaywgTWF0Y2ggfSBmcm9tIFwibWV0ZW9yL2NoZWNrXCI7XG5cbmltcG9ydCB7XG4gIERFRkNPTjksXG4gIERFRkNPTjcsXG4gIERFRkNPTjUsXG4gIERFRkNPTjQsXG4gIERFRkNPTjMsXG4gIERFRkNPTjIsXG4gIERFRkNPTjEsXG59IGZyb20gXCIvZGVidWcuanNvblwiO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tIFwiL2xpYi9jb25zdGFudHNcIjtcblxuREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIkluIEFjY291bnRcIik7XG5cbnZhciBzdGFsZVNlc3Npb25QdXJnZUludGVydmFsID1cbiAgKE1ldGVvci5zZXR0aW5ncyAmJlxuICAgIE1ldGVvci5zZXR0aW5ncy5wdWJsaWMgJiZcbiAgICBNZXRlb3Iuc2V0dGluZ3MucHVibGljLnN0YWxlU2Vzc2lvblB1cmdlSW50ZXJ2YWwpIHx8XG4gIDEgKiA2MCAqIDEwMDA7IC8vIDFtaW5cbnZhciBpbmFjdGl2aXR5VGltZW91dCA9XG4gIChNZXRlb3Iuc2V0dGluZ3MgJiZcbiAgICBNZXRlb3Iuc2V0dGluZ3MucHVibGljICYmXG4gICAgTWV0ZW9yLnNldHRpbmdzLnB1YmxpYy5zdGFsZVNlc3Npb25JbmFjdGl2aXR5VGltZW91dCkgfHxcbiAgMzAgKiA2MCAqIDEwMDA7IC8vIDMwbWluc1xudmFyIGZvcmNlTG9nb3V0ID0gTWV0ZW9yLnNldHRpbmdzICYmIE1ldGVvci5zZXR0aW5ncy5wdWJsaWMgJiYgTWV0ZW9yLnNldDtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBNZXRlb3IubWV0aG9kcyh7XG4gICAgaGVhcnRiZWF0OiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhgSGVhcnRiZWF0IGNoZWNrIC0gaWYgdXNlciBzaG91bGQgcmVDb25uZWN0YCk7XG4gICAgICB2YXIgdXNlciA9IE1ldGVvci51c2Vycy5maW5kT25lKHRoaXMudXNlcklkKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2codGhpcy51c2VySWQpO1xuXG4gICAgICBpZiAodXNlcikge1xuICAgICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGBHZXQgdXNlciBhbmQgdXBkYXRlIGhlYXJ0YmVhdC4uLmApO1xuICAgICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKHVzZXIuX2lkICsgXCIgXCIgKyB1c2VyLm5hbWUpO1xuICAgICAgICBsZXQgdXBkYXRlZCA9IE1ldGVvci51c2Vycy51cGRhdGUoXG4gICAgICAgICAgeyBfaWQ6IHRoaXMudXNlcklkIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgJHNldDogeyBoZWFydGJlYXQ6IG5ldyBEYXRlKCksIGlzT25saW5lOiB0cnVlIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coYFNvbWUgZXJyb3Igb2NjdXJlZC5gKTtcbiAgICAgICAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGBSZXN1bHQgYWZ0ZXIgdXBkYXRlIGlzLi4uYCk7XG4gICAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2codXBkYXRlZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGBUaGlzIHVzZXJpZCBpcyBub3Qgc2V0Li4uYCk7XG4gICAgICB9XG4gICAgICAvLyBpZiAodXNlcikge1xuICAgICAgLy8gICBERUZDT041ICYmIGNvbnNvbGUubG9nKGBHZXQgdXNlciBhbmQgdXBkYXRlIGhlYXJ0YmVhdC4uLmApO1xuICAgICAgLy8gICBERUZDT041ICYmIGNvbnNvbGUubG9nKHVzZXIudWlkICsgXCIgXCIgKyB1c2VyLnVzZXJuYW1lKTtcbiAgICAgIC8vICAgTWV0ZW9yLnVzZXJzLnVwZGF0ZSh1c2VyLl9pZCwgeyAkc2V0OiB7IGhlYXJ0YmVhdDogbmV3IERhdGUoKSB9IH0pO1xuICAgICAgLy8gfVxuICAgIH0sXG4gICAgLy9cbiAgfSk7XG59XG5cbi8vXG4vLyBwZXJpb2RpY2FsbHkgcHVyZ2UgYW55IHN0YWxlIHNlc3Npb25zLCByZW1vdmluZyB0aGVpciBsb2dpbiB0b2tlbnMgYW5kIGNsZWFyaW5nIG91dCB0aGUgc3RhbGUgaGVhcnRiZWF0LlxuLy9cbmlmIChmb3JjZUxvZ291dCAhPT0gZmFsc2UpIHtcbiAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhgSGVhcnRCZWF0Q2hlYyBDaGVjayBpZiB1c2VycyBzdGlsbCBvbmxpbmUuLi5gKTtcbiAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhzdGFsZVNlc3Npb25QdXJnZUludGVydmFsKTtcblxuICBNZXRlb3Iuc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coYEhlYXJ0QmVhdENoZWNrIFNlcnZlciBDaGVjay4uLmApO1xuXG4gICAgdmFyIG5vdyA9IG5ldyBEYXRlKCksXG4gICAgICBvdmVyZHVlVGltZXN0YW1wID0gbmV3IERhdGUobm93IC0gaW5hY3Rpdml0eVRpbWVvdXQpO1xuICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coaW5hY3Rpdml0eVRpbWVvdXQpO1xuICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2cob3ZlcmR1ZVRpbWVzdGFtcCk7XG4gICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhzdGFsZVNlc3Npb25QdXJnZUludGVydmFsKTtcbiAgICBNZXRlb3IudXNlcnMudXBkYXRlKFxuICAgICAgeyBoZWFydGJlYXQ6IHsgJGx0OiBvdmVyZHVlVGltZXN0YW1wIH0gfSxcbiAgICAgIHtcbiAgICAgICAgJHNldDogeyBcInNlcnZpY2VzLnJlc3VtZS5sb2dpblRva2Vuc1wiOiBbXSB9LFxuICAgICAgICAkc2V0OiB7IGhlYXJ0YmVhdDogMSwgaXNPbmxpbmU6IGZhbHNlIH0sXG4gICAgICB9LFxuICAgICAgeyBtdWx0aTogdHJ1ZSB9LFxuICAgICAgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coYFNvbWUgZXJyb3Igb2NjdXJlZC5gKTtcbiAgICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB9XG4gICAgKTtcbiAgICBNZXRlb3IudXNlcnMudXBkYXRlKFxuICAgICAgeyBoZWFydGJlYXQ6IHsgJGd0OiBvdmVyZHVlVGltZXN0YW1wIH0gfSxcbiAgICAgIHtcbiAgICAgICAgJHNldDogeyBpc09ubGluZTogdHJ1ZSB9LFxuICAgICAgfSxcbiAgICAgIHsgbXVsdGk6IHRydWUgfSxcbiAgICAgIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGBTb21lIGVycm9yIG9jY3VyZWQuYCk7XG4gICAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgfVxuICAgICk7XG4gIH0sIHN0YWxlU2Vzc2lvblB1cmdlSW50ZXJ2YWwpO1xufVxuIiwiaW1wb3J0IHsgQ2hhdFJvb21zLCBDaGF0TGluZXMgfSBmcm9tIFwiL2xpYi9jb2xsZWN0aW9uc1wiO1xuaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSBcIm1ldGVvci9tZXRlb3JcIjtcbmltcG9ydCB7IGNoZWNrLCBNYXRjaCB9IGZyb20gXCJtZXRlb3IvY2hlY2tcIjtcbmltcG9ydCB7XG4gIERFRkNPTjksXG4gIERFRkNPTjcsXG4gIERFRkNPTjUsXG4gIERFRkNPTjQsXG4gIERFRkNPTjMsXG4gIERFRkNPTjIsXG4gIERFRkNPTjEsXG59IGZyb20gXCIvZGVidWcuanNvblwiO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tIFwiL2xpYi9jb25zdGFudHNcIjtcbmltcG9ydCBDaGF0Um9vbSBmcm9tIFwiLi4vbGliL2NoYXRyb29tXCI7XG5cbkRFRkNPTjUgJiYgY29uc29sZS5sb2coXCJJbiBjaGF0bGluZWxpc3RzIHNlcnZlciwgZ2V0dGluZyB0aGUgc3R1ZmZcIik7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgTWV0ZW9yLm1ldGhvZHMoe1xuICAgIFwiY2hhdGxpbmVsaXN0cy51bnJlYWRNZXNzYWdlc1wiKCkge1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcImNoYXRsaW5lbGlzdHMudW5yZWFkTWVzc2FnZXMgZm9yIGN1cnJlbnQgdXNlciBcIik7XG5cbiAgICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiQWNjZXNzIGRlbmllZFwiKTtcbiAgICAgIH1cblxuICAgICAgbGV0IHJlc3VsdCA9IENoYXRSb29tLl9nZXROdW1PZlVucmVhZE1lc3NhZ2VzKHRoaXMudXNlcklkKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcbiAgfSk7XG4gIE1ldGVvci5tZXRob2RzKHtcbiAgICBcImNoYXRsaW5lbGlzdHMuZm9jdXNDaGF0bGluZVwiKGNoYW5uZWxJZCkge1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcImNoYXRsaW5lbGlzdHMuZm9jdXNDaGF0bGluZSBcIiArIGNoYW5uZWxJZCk7XG5cbiAgICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiQWNjZXNzIGRlbmllZFwiKTtcbiAgICAgIH1cbiAgICAgIGNoZWNrKGNoYW5uZWxJZCwgU3RyaW5nKTtcblxuICAgICAgY29uc3QgY3VycmVudFVzZXIgPSBNZXRlb3IudXNlcigpLl9pZDtcbiAgICAgIGNvbnN0IGN1cnJlbnRVc2VySWQgPSBNZXRlb3IudXNlcigpLl9pZDtcbiAgICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcblxuICAgICAgQ2hhdFJvb20uX3Vwc2VydENoYXRyb29tc2V0QWN0aXZlVXNlcihjaGFubmVsSWQsIGN1cnJlbnRVc2VySWQpO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICB9KTtcblxuICBNZXRlb3IubWV0aG9kcyh7XG4gICAgXCJjaGF0bGluZWxpc3RzLmFkZENoYXRMaW5lXCIoY2hhbm5lbElkLCBsaW5lKSB7XG4gICAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCBcIkFjY2VzcyBkZW5pZWRcIik7XG4gICAgICB9XG4gICAgICBjaGVjayhjaGFubmVsSWQsIFN0cmluZyk7XG4gICAgICBjaGVjayhsaW5lLCBTdHJpbmcpO1xuXG4gICAgICBjb25zdCBjdXJyZW50VXNlciA9IE1ldGVvci51c2VyKCkuX2lkO1xuICAgICAgY29uc3QgY3VycmVudFVzZXJJZCA9IE1ldGVvci51c2VyKCkuX2lkO1xuICAgICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICBsZXQgY2hhdExpbmUgPSB7fTtcbiAgICAgIGNoYXRMaW5lLnRleHQgPSBsaW5lO1xuICAgICAgY2hhdExpbmUuY2hhbm5lbElkID0gY2hhbm5lbElkO1xuICAgICAgY2hhdExpbmUubW9kaWZpZWRCeSA9IGN1cnJlbnRVc2VyO1xuICAgICAgY2hhdExpbmUuY3JlYXRlZEJ5TmFtZSA9IGN1cnJlbnRVc2VyO1xuICAgICAgY2hhdExpbmUuY3JlYXRlZEJ5ID0gY3VycmVudFVzZXJJZDtcbiAgICAgIGNoYXRMaW5lLm1vZGlmaWVkQXQgPSBjdXJyZW50RGF0ZTtcbiAgICAgIGNoYXRMaW5lLmNyZWF0ZWRBdCA9IGN1cnJlbnREYXRlO1xuICAgICAgY2hhdExpbmUuc3RhdHVzID0gXCJhY3RpdmVcIjtcblxuICAgICAgbGV0IGxpbmVJZCA9IENoYXRMaW5lcy5pbnNlcnQoY2hhdExpbmUpO1xuICAgICAgQ2hhdFJvb20uX3Vwc2VydENoYXRyb29tc2V0QWN0aXZlVXNlcihjaGFubmVsSWQsIGN1cnJlbnRVc2VySWQpO1xuXG4gICAgICBERUZDT041ICYmXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW4gY2hhdGxpbmVsaXN0cy5hZGRDaGF0TGluZSBtZXRob2QgcmV0dXJuaW5nIFwiICsgbGluZUlkKTtcbiAgICAgIHJldHVybiBsaW5lSWQ7XG4gICAgfSxcbiAgfSk7XG5cbiAgTWV0ZW9yLm1ldGhvZHMoe1xuICAgIFwiY2hhdGxpbmVsaXN0cy5yZW1vdmVDaGF0TGluZVwiKGNvbnRhaW5lcklkLCBsaW5lSWQpIHtcbiAgICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiQWNjZXNzIGRlbmllZFwiKTtcbiAgICAgIH1cbiAgICAgIGNoZWNrKGNvbnRhaW5lcklkLCBTdHJpbmcpO1xuICAgICAgY2hlY2sobGluZUlkLCBTdHJpbmcpO1xuXG4gICAgICAvKlxuICAgICAgaWYgKEFydGljbGVTdGF0dXMuaXNDb250YWluZXJUeXBlUmVhZE9ubHkoY2hhbm5lbElkLCBDb25zdGFudHMuQ29udGFpbmVyVHlwZXMuQ0hBVExJTkVTKSkge1xuICAgICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZygnSW4gY2hhdGxpbmVsaXN0cy5yZW1vdmVDaGF0TGluZSBtZXRob2QgYW5kIHJlYWQgb25seSBjaGFubmVsOiAnICsgY2hhbm5lbElkKTtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcihcIkxpbmUgY2Fubm90IGJlIHJlbW92ZWQgYmVjYXVzZSBvZiBjaGFubmVsJ3Mgc3RhdGVcIik7XG4gICAgICB9XG4qL1xuICAgICAgY29uc3QgY3VycmVudFVzZXIgPSBNZXRlb3IudXNlcigpLl9pZDtcbiAgICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcblxuICAgICAgQ2hhdExpbmVzLnVwZGF0ZShsaW5lSWQsIHtcbiAgICAgICAgJHNldDoge1xuICAgICAgICAgIHN0YXR1czogXCJkZWxldGVkXCIsXG4gICAgICAgICAgbW9kaWZpZWRCeTogY3VycmVudFVzZXIsXG4gICAgICAgICAgbW9kaWZpZWRBdDogY3VycmVudERhdGUsXG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgICAgREVGQ09ONSAmJlxuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBcIkluIGNoYXRsaW5lbGlzdHMucmVtb3ZlQ2hhdExpbmUgbWV0aG9kIHJldHVybmluZyBcIiArIGxpbmVJZFxuICAgICAgICApO1xuICAgICAgcmV0dXJuIGxpbmVJZDtcbiAgICB9LFxuICB9KTtcblxuICBNZXRlb3IubWV0aG9kcyh7XG4gICAgXCJjaGF0bGluZWxpc3RzLmNoZWNrQWNjZXNzXCIoY2hhbm5lbElkKSB7XG4gICAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCBcIkFjY2VzcyBkZW5pZWRcIik7XG4gICAgICB9XG4gICAgICBjaGVjayhjaGFubmVsSWQsIFN0cmluZyk7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiQ2hlY2sgaWYgdXNlIGhhcyBhY2Nlc3MgdG8gY2hhdHJvb21cIik7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKGNoYW5uZWxJZCk7XG5cbiAgICAgIGNvbnN0IGNoYXRSb29tc1NlbGVjdG9yID0ge1xuICAgICAgICBcInVzZXJzLnVzZXJJZFwiOiB7XG4gICAgICAgICAgJGluOiBbdGhpcy51c2VySWRdLFxuICAgICAgICB9LFxuICAgICAgICBjaGFubmVsSWQ6IGNoYW5uZWxJZCxcbiAgICAgIH07XG4gICAgICBsZXQgY2hhdFJvb21zVXNlcklkcyA9IENoYXRSb29tcy5maW5kKGNoYXRSb29tc1NlbGVjdG9yKTtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coY2hhdFJvb21zVXNlcklkcy5mZXRjaCgpKTtcbiAgICAgIGxldCBoYXNBY2Nlc3NUb0NoYXRsaW5lcyA9IGNoYXRSb29tc1VzZXJJZHMuZmV0Y2goKS5sZW5ndGg7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiVXNlciBoYXMgYWNjZXNzIGlmIG5leHQgdmFsdWUgPiAwXCIpO1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhoYXNBY2Nlc3NUb0NoYXRsaW5lcyk7XG4gICAgICByZXR1cm4gaGFzQWNjZXNzVG9DaGF0bGluZXM7XG4gICAgfSxcbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIF9jaGVja0FjY2VzczRVc2VyKGNoYW5uZWxJZCwgdXNlcklkKSB7XG4gIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJDaGVjayBpZiB1c2VyIGhhcyBhY2Nlc3MgdG8gY2hhdHJvb21cIik7XG4gIERFRkNPTjMgJiYgY29uc29sZS5sb2coY2hhbm5lbElkKTtcbiAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyh1c2VySWQpO1xuXG4gIGNvbnN0IGNoYXRSb29tc1NlbGVjdG9yID0ge1xuICAgIFwidXNlcnMudXNlcklkXCI6IHtcbiAgICAgICRpbjogW3VzZXJJZF0sXG4gICAgfSxcbiAgICBjaGFubmVsSWQ6IGNoYW5uZWxJZCxcbiAgfTtcbiAgbGV0IGNoYXRSb29tc1VzZXJJZHMgPSBDaGF0Um9vbXMuZmluZChjaGF0Um9vbXNTZWxlY3Rvcik7XG4gIERFRkNPTjMgJiYgY29uc29sZS5sb2coY2hhdFJvb21zVXNlcklkcy5mZXRjaCgpKTtcbiAgbGV0IGhhc0FjY2Vzc1RvQ2hhdGxpbmVzID0gY2hhdFJvb21zVXNlcklkcy5mZXRjaCgpLmxlbmd0aDtcbiAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIlVzZXIgaGFzIGFjY2VzcyBpZiBuZXh0IHZhbHVlID4gMFwiKTtcbiAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhoYXNBY2Nlc3NUb0NoYXRsaW5lcyk7XG4gIHJldHVybiBoYXNBY2Nlc3NUb0NoYXRsaW5lcztcbn1cbiIsImltcG9ydCB7XG4gIENoYXRSb29tcyxcbn0gZnJvbSBcIi9saWIvY29sbGVjdGlvbnNcIjtcbmltcG9ydCB7IE1ldGVvciB9IGZyb20gXCJtZXRlb3IvbWV0ZW9yXCI7XG5cblxuaW1wb3J0IHsgY2hlY2ssIE1hdGNoIH0gZnJvbSBcIm1ldGVvci9jaGVja1wiO1xuaW1wb3J0IHtcbiAgREVGQ09OOSxcbiAgREVGQ09ONyxcbiAgREVGQ09ONSxcbiAgREVGQ09ONCxcbiAgREVGQ09OMyxcbiAgREVGQ09OMixcbiAgREVGQ09OMSxcbn0gZnJvbSBcIi9kZWJ1Zy5qc29uXCI7XG5pbXBvcnQgQ29uc3RhbnRzIGZyb20gXCIvbGliL2NvbnN0YW50c1wiO1xuREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIkluIGNoYXRsaW5lbGlzdHMgc2VydmVyLCBnZXR0aW5nIHRoZSBzdHVmZlwiKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBNZXRlb3IubWV0aG9kcyh7XG4gICAgXCJjaGF0cm9vbS5nZXQ0Y2hhbm5lbFwiKGNoYW5uZWxJZCkge1xuICAgICAgaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgICAgfVxuICAgICAgY2hlY2soY2hhbm5lbElkLCBTdHJpbmcpO1xuICAgICAgY29uc3QgY2hhdFJvb21zID0gQ2hhdFJvb21zLmZpbmQoe1xuICAgICAgICBjaGFubmVsSWQ6IGNoYW5uZWxJZCxcbiAgICAgIH0pLmZldGNoKCk7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiR2V0dGluZyBjaGF0Um9vbXNcIik7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGNoYXRSb29tcyk7XG5cbiAgICAgIHJldHVybiBjaGF0Um9vbXM7XG4gICAgfSxcbiAgfSk7XG4gIE1ldGVvci5tZXRob2RzKHtcbiAgICBcImNoYXRyb29tLmdldDR1c2VyXCIoKSB7XG4gICAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCBcIkFjY2VzcyBkZW5pZWRcIik7XG4gICAgICB9XG4gICAgICBjb25zdCBjaGF0Um9vbXNTZWxlY3RvciA9IHtcbiAgICAgICAgXCJ1c2Vycy51c2VySWRcIjoge1xuICAgICAgICAgICRpbjogW3RoaXMudXNlcklkXSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBsZXQgY2hhdFJvb21zID0gQ2hhdFJvb21zLmZpbmQoY2hhdFJvb21zU2VsZWN0b3IpLmZldGNoKCk7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiR2V0dGluZyBjaGF0Um9vbXMgZm9yIFVzZXJcIik7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKGNoYXRSb29tcyk7XG5cbiAgICAgIC8vIGlmIHRoZXJlIGFyZSBubyBjaGF0Um9vbXMgZm9yIHRoaXMgdXNlciwgY3JlYXRlIGhpcyBwZXJzb25hbCBjaGF0Um9vbSBmb3IgaGltIGFuZCBoaXMgYWdlbnQuXG4gICAgICBcblxuICAgICAgcmV0dXJuIGNoYXRSb29tcztcbiAgICB9LFxuICB9KTtcblxuICBNZXRlb3IubWV0aG9kcyh7XG4gICAgXCJjaGF0cm9vbS5zZXRBY3RpdmVVc2VyXCIoY2hhbm5lbElkKSB7XG4gICAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCBcIkFjY2VzcyBkZW5pZWRcIik7XG4gICAgICB9XG4gICAgICBjb25zdCBjaGF0Um9vbXNTZWxlY3RvciA9IHtcbiAgICAgICAgXCJ1c2Vycy51c2VySWRcIjoge1xuICAgICAgICAgICRpbjogW3RoaXMudXNlcklkXSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBsZXQgY2hhdFJvb21zID0gQ2hhdFJvb21zLmZpbmQoY2hhdFJvb21zU2VsZWN0b3IpLmZldGNoKCk7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiR2V0dGluZyBjaGF0Um9vbXMgZm9yIFVzZXJcIik7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKGNoYXRSb29tcyk7XG5cbiAgICAgIHJldHVybiBjaGF0Um9vbXM7XG4gICAgfSxcbiAgfSk7XG59XG4iLCJpbXBvcnQge1xuICBNZXRlb3Jcbn0gZnJvbSBcIm1ldGVvci9tZXRlb3JcIjtcbmltcG9ydCB7XG4gIGNoZWNrLFxuICBNYXRjaFxufSBmcm9tIFwibWV0ZW9yL2NoZWNrXCI7XG5pbXBvcnQgT3JkZXIgZnJvbSBcIi4uL2xpYi9vcmRlci5qc1wiO1xuaW1wb3J0IHtcbiAgUGVyc29ucyxcbiAgU2VhcmNoTG9nXG59IGZyb20gJy9saWIvY29sbGVjdGlvbnMnO1xuXG5pbXBvcnQge1xuICBERUZDT045LFxuICBERUZDT043LFxuICBERUZDT041LFxuICBERUZDT040LFxuICBERUZDT04zLFxuICBERUZDT04yLFxuICBERUZDT04xXG59IGZyb20gXCIvZGVidWcuanNvblwiO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tIFwiL2xpYi9jb25zdGFudHNcIjtcbmltcG9ydCBEcnVwYWxTZXJ2aWNlcyBmcm9tIFwiLi4vbGliL2RydXBhbC9zZXJ2aWNlc1wiO1xuXG5ERUZDT041ICYmIGNvbnNvbGUubG9nKFwiSW4gU2VhcmNoIHNlcnZlciBwYXJ0XCIpO1xuXG5cbi8qKlxuICogcXVlcnk6XG4ge1xuICAgIG5hbWUsXG4gICAgZW1haWwsXG4gICAgZW1haWwyLFxuICAgIHBob25lLFxuICAgIGNvbnRlbnRcbn1cbiAqKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBNZXRlb3IubWV0aG9kcyh7XG4gICAgYXN5bmMgJ2NvbnRhY3Quc2VuZFF1ZXN0aW9uJyhxdWVyeSkge1xuICAgICAgY2hlY2socXVlcnksIE9iamVjdCk7XG5cbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJjb250YWN0LnNlbmRRdWVzdGlvblwiKTtcblxuICAgICAgY29uc3QgZG9Xb3JrID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAvLyBhbnkgdXNlciBDYW4gc2VuZCBtZXNzYWdlIC0gZ3Vlc3QgYXMgbG9nZ2VkIGluIHVzZXJzLi4uXG4gICAgICAgIFxuICAgICAgICAvLyBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICAgIC8vICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZygnY29udGFjdC5zZW5kUXVlc3Rpb24gLSBBY2Nlc3MgZGVuaWVkJyk7XG4gICAgICAgIC8vICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsICdBY2Nlc3MgZGVuaWVkJyk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgY29uc3Qgc2VydmljZXMgPSBuZXcgRHJ1cGFsU2VydmljZXMoKTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBzZXJ2aWNlcy5zZW5kUXVlc3Rpb24ocXVlcnkpO1xuICAgICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGBNZXRob2Qgc2VuZFF1ZXN0aW9uIHN1Y2Nlc3NmdWxgKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9O1xuXG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gYXdhaXQgZG9Xb3JrKCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoZS5lcnJvciwgZS5yZWFzb24pO1xuICAgICAgfVxuXG4gICAgfVxuICB9KTtcbn1cbiIsImltcG9ydCB7IE1ldGVvciB9IGZyb20gXCJtZXRlb3IvbWV0ZW9yXCI7XG5pbXBvcnQgeyBjaGVjaywgTWF0Y2ggfSBmcm9tIFwibWV0ZW9yL2NoZWNrXCI7XG5pbXBvcnQgT3JkZXIgZnJvbSBcIi4uL2xpYi9vcmRlci5qc1wiO1xuaW1wb3J0IHsgQ29udGVudHMgfSBmcm9tIFwiL2xpYi9jb2xsZWN0aW9uc1wiO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tIFwiL2xpYi9jb25zdGFudHNcIjtcblxuaW1wb3J0IHtcbiAgREVGQ09OOSxcbiAgREVGQ09ONyxcbiAgREVGQ09ONSxcbiAgREVGQ09ONCxcbiAgREVGQ09OMyxcbiAgREVGQ09OMixcbiAgREVGQ09OMSxcbn0gZnJvbSBcIi9kZWJ1Zy5qc29uXCI7XG5pbXBvcnQgRHJ1cGFsU2VydmljZXMgZnJvbSBcIi4uL2xpYi9kcnVwYWwvc2VydmljZXNcIjtcbmltcG9ydCBub3RpY2VzIGZyb20gXCIuLi9saWIvbm90aWNlc1wiO1xuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xuXG5ERUZDT041ICYmIGNvbnNvbGUubG9nKFwiSW4gU2VhcmNoIHNlcnZlciBwYXJ0XCIpO1xuXG4vKipcbiAqIHF1ZXJ5OlxuIHtcbiAgICBuYW1lLFxuICAgIGVtYWlsLFxuICAgIGVtYWlsMixcbiAgICBwaG9uZSxcbiAgICBjb250ZW50XG59XG4gKiovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgTWV0ZW9yLm1ldGhvZHMoe1xuICAgIFwiY29udGVudC5jbG9uZUFydGljbGVcIjogZnVuY3Rpb24gKF9pZCwgY29udGV4dCkge1xuICAgICAgY2hlY2soX2lkLCBTdHJpbmcpO1xuICAgICAgY2hlY2soY29udGV4dCwgU3RyaW5nKTtcblxuICAgICAgY29uc29sZS5sb2coXCJjb250ZW50LmNsb25lQXJ0aWNsZVwiKTtcblxuICAgICAgLy8gT3B0aW9uYWw6IEFkZCBhZGRpdGlvbmFsIHNlY3VyaXR5IGNoZWNrcyBoZXJlLCBlLmcuLCB0aGlzLnVzZXJJZCB0byBlbnN1cmUgdXNlciBpcyBsb2dnZWQgaW5cbiAgICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiWW91IG11c3QgYmUgbG9nZ2VkIGluIHRvIGNsb25lIGNvbnRlbnRcIik7XG4gICAgICB9XG5cbiAgICAgIC8vIEFzc3VtaW5nIHlvdSBoYXZlIGEgY29sbGVjdGlvbiBmb3IgeW91ciBjb250ZW50IG9iamVjdHMsIGUuZy4sIENvbnRlbnRzXG4gICAgICBjb25zdCBkb2N1bWVudFRvQ2xvbmUgPSBDb250ZW50cy5maW5kT25lKHsgX2lkOiBfaWQgfSk7XG5cbiAgICAgIGlmICghZG9jdW1lbnRUb0Nsb25lKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDA0LCBcIkRvY3VtZW50IG5vdCBmb3VuZFwiKTtcbiAgICAgIH1cblxuICAgICAgLy8gRW5zdXJlIHJldmlzaW9ucyBleGlzdFxuICAgICAgaWYgKGRvY3VtZW50VG9DbG9uZS5yZXZpc2lvbnMgJiYgZG9jdW1lbnRUb0Nsb25lLnJldmlzaW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGRvY3VtZW50VG9DbG9uZS5yZXZpc2lvbnMgPSBkb2N1bWVudFRvQ2xvbmUucmV2aXNpb25zLm1hcChcbiAgICAgICAgICAocmV2aXNpb24pID0+IHtcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIG1hc3Rlckxhbmd1YWdlIGlzIGVxdWFsIHRvIHRoZSBsYW5ndWFnZSBvZiB0aGUgcmV2aXNpb25cbiAgICAgICAgICAgIGlmIChkb2N1bWVudFRvQ2xvbmUubWFzdGVyTGFuZ3VhZ2UgPT09IHJldmlzaW9uLmxhbmd1YWdlKSB7XG4gICAgICAgICAgICAgIC8vIFByZXBlbmQgXCJDbG9uZSBvZiBcIiB0byB0aGUgdGl0bGUgb2YgdGhlIG1hdGNoaW5nIHJldmlzaW9uXG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4ucmV2aXNpb24sXG4gICAgICAgICAgICAgICAgdGl0bGU6IGBDbG9uZSBvZiAke3JldmlzaW9uLnRpdGxlfWAsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmV2aXNpb247XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICAvLyBSZW1vdmUgdGhlIF9pZCBwcm9wZXJ0eSB0byBlbnN1cmUgTW9uZ29EQiBnZW5lcmF0ZXMgYSBuZXcgb25lIGZvciB0aGUgY2xvbmVcbiAgICAgIGRlbGV0ZSBkb2N1bWVudFRvQ2xvbmUuX2lkO1xuICAgICAgLy8gZ2V0IHRoZSBoaWdoZXN0IG51bWJlciBvZiB0aGUgaWQgYW5kIGFkZCAxXG4gICAgXG5cbiAgICAgIC8vIENsb25lIHRoZSBkb2N1bWVudFxuICAgICAgY29uc3QgY2xvbmVJZCA9IENvbnRlbnRzLmluc2VydChkb2N1bWVudFRvQ2xvbmUpO1xuXG4gICAgICAvLyBPcHRpb25hbDogTG9nIHRoZSBjbG9uaW5nIGFjdGlvbiBvciBub3RpZnkgdGhlIHVzZXJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPVxuICAgICAgICBcIkRvY3VtZW50IGNsb25lZCBzdWNjZXNzZnVsbHkuIE5ldyBkb2N1bWVudCBJRDogXCIgKyBjbG9uZUlkO1xuICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XG5cbiAgICAgIC8vIEFkZCBhIG5vdGljZSBhYm91dCB0aGUgY2xvbmluZyBhY3Rpb25cbiAgICAgIG5vdGljZXMuYWRkTm90aWNlQnlGaWVsZHMoXG4gICAgICAgIENvbnN0YW50cy5Ob3Rpc2VDbGFzcy5DT05URU5UX0NMT05FRCxcbiAgICAgICAgXCJDbG9uZWQgY29udGVudFwiLFxuICAgICAgICBtZXNzYWdlLFxuICAgICAgICBcImNvbnRlbnRzXCIsXG4gICAgICAgIGNsb25lSWQsIC8vIFVzZSBjbG9uZUlkIGZvciB0aGUgbGluayB0byB0aGUgY2xvbmVkIGNvbnRlbnRcbiAgICAgICAgXCIvY29udGVudC9cIiArIGNsb25lSWQsXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIFt0aGlzLnVzZXJJZF1cbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBjbG9uZUlkOyAvLyBSZXR1cm5zIHRoZSBfaWQgb2YgdGhlIGNsb25lZCBkb2N1bWVudFxuICAgIH0sXG4gIH0pO1xuXG5cbiAgTWV0ZW9yLm1ldGhvZHMoe1xuICAgIGFzeW5jIFwiY29udGVudC5nZXRBcnRpY2xlXCIocXVlcnkpIHtcbiAgICAgIGNoZWNrKHF1ZXJ5LCBPYmplY3QpO1xuXG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiY29udGVudC5nZXRBcnRpY2xlXCIpO1xuXG4gICAgICBjb25zdCBkb1dvcmsgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIC8vIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgICAgLy8gICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiY29udGVudC5nZXRBcnRpY2xlIC0gQWNjZXNzIGRlbmllZFwiKTtcbiAgICAgICAgLy8gICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgJ0FjY2VzcyBkZW5pZWQnKTtcbiAgICAgICAgLy8gfVxuICAgICAgICBjb25zdCBzZXJ2aWNlcyA9IG5ldyBEcnVwYWxTZXJ2aWNlcygpO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHNlcnZpY2VzLmdldEFydGljbGUocXVlcnkpO1xuICAgICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGBNZXRob2QgZ2V0QXJ0aWNsZSBzdWNjZXNzZnVsYCk7XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgIH07XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBhd2FpdCBkb1dvcmsoKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcihlLmVycm9yLCBlLnJlYXNvbik7XG4gICAgICB9XG4gICAgfSxcbiAgfSk7XG4gIE1ldGVvci5tZXRob2RzKHtcbiAgICBcImNvbnRlbnQudXBkYXRlXCI6IGZ1bmN0aW9uIChfaWQsIGNvbnRleHQsIGZpZWxkc1RvVXBkYXRlKSB7XG4gICAgICAvLyBDaGVjayB0aGUgYXJndW1lbnRzIGZvciBwcm9wZXIgdHlwZXNcbiAgICAgIGNoZWNrKF9pZCwgU3RyaW5nKTtcbiAgICAgIGNoZWNrKGZpZWxkc1RvVXBkYXRlLCBPYmplY3QpO1xuICAgICAgY2hlY2soY29udGV4dCwgU3RyaW5nKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiY29udGVudC51cGRhdGVcIik7XG4gICAgICBjb25zb2xlLmxvZyhfaWQpO1xuICAgICAgY29uc29sZS5sb2coZmllbGRzVG9VcGRhdGUpO1xuICAgICAgLy8gT3B0aW9uYWw6IGFkZCBhZGRpdGlvbmFsIHNlY3VyaXR5IGNoZWNrcyBoZXJlLCBlLmcuLCB0aGlzLnVzZXJJZCB0byBlbnN1cmUgdXNlciBpcyBsb2dnZWQgaW5cbiAgICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiWW91IG11c3QgYmUgbG9nZ2VkIGluIHRvIHVwZGF0ZSBjb250ZW50XCIpO1xuICAgICAgfVxuXG4gICAgICAvLyBPcHRpb25hbDogVmFsaWRhdGUgZmllbGRzVG9VcGRhdGUgYWdhaW5zdCBhIHNjaGVtYSBvciBzcGVjaWZpYyBydWxlcyBpZiBuZWNlc3NhcnlcbiAgICAgIC8vIFRoaXMgc3RlcCBkZXBlbmRzIG9uIHlvdXIgYXBwbGljYXRpb24ncyBuZWVkcyBhbmQgdGhlIHN0cnVjdHVyZSBvZiB5b3VyIGNvbnRlbnQgb2JqZWN0c1xuXG4gICAgICAvLyBBc3N1bWluZyB5b3UgaGF2ZSBhIGNvbGxlY3Rpb24gZm9yIHlvdXIgY29udGVudCBvYmplY3RzLCBlLmcuLCBDb250ZW50c1xuICAgICAgLy8gVXBkYXRlIHRoZSBjb250ZW50IG9iamVjdCB3aXRoIHRoZSBwcm92aWRlZCBfaWQgYW5kIGZpZWxkc1RvVXBkYXRlXG4gICAgICBjb25zdCB1cGRhdGVDb3VudCA9IENvbnRlbnRzLnVwZGF0ZShcbiAgICAgICAgeyBfaWQ6IF9pZCB9LFxuICAgICAgICB7ICRzZXQ6IGZpZWxkc1RvVXBkYXRlIH1cbiAgICAgICk7XG5cbiAgICAgIGlmICh1cGRhdGVDb3VudCA9PT0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwNCwgXCJDb250ZW50IG5vdCBmb3VuZFwiKTtcbiAgICAgIH1cbiAgICAgIC8vIHN0cmluZ2lmeSB0aGUgZmllbGRzVG9VcGRhdGUgb2JqZWN0IHRvIGRpc3BsYXkgdGhlIHVwZGF0ZWQgZmllbGRzIGluIHRoZSBub3RpY2VcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPVxuICAgICAgICBpMThuLl9fKFwiQ29udGVudF91cGRhdGVkXCIpICsgXCIgXCIgKyBKU09OLnN0cmluZ2lmeShmaWVsZHNUb1VwZGF0ZSk7XG5cbiAgICAgIG5vdGljZXMuYWRkTm90aWNlQnlGaWVsZHMoXG4gICAgICAgIENvbnN0YW50cy5Ob3Rpc2VDbGFzcy5DT05URU5UX1VQREFURUQsXG4gICAgICAgIFwiVXBwZGF0aW5nIGNvbnRlbnQgZmllbGRzXCIsXG4gICAgICAgIG1lc3NhZ2UsXG4gICAgICAgIFwiY29udGVudHNcIixcbiAgICAgICAgX2lkLFxuICAgICAgICBcIi9jb250ZW50L1wiICsgX2lkLFxuICAgICAgICBjb250ZXh0LFxuICAgICAgICBbdGhpcy51c2VySWRdXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gdXBkYXRlQ291bnQ7IC8vIFJldHVybnMgdGhlIG51bWJlciBvZiBkb2N1bWVudHMgdXBkYXRlZFxuICAgIH0sXG4gIH0pO1xuICBNZXRlb3IubWV0aG9kcyh7XG4gICAgXCJjb250ZW50LmdldFR5cGVPZkFydGljbGVzXCI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcihcbiAgICAgICAgICA0MDEsXG4gICAgICAgICAgXCJZb3UgbXVzdCBiZSBsb2dnZWQgaW4gdG8gYWNjZXNzIGNvbnRlbnQgdHlwZXNcIlxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICAvLyBEZWZpbmUgdGhlIHBpcGVsaW5lIGFycmF5IHdpdGhpbiB0aGUgbWV0aG9kXG4gICAgICBjb25zdCBwaXBlbGluZSA9IFtcbiAgICAgICAge1xuICAgICAgICAgICRncm91cDoge1xuICAgICAgICAgICAgX2lkOiBudWxsLFxuICAgICAgICAgICAgZGlzdGluY3RUeXBlczoge1xuICAgICAgICAgICAgICAkYWRkVG9TZXQ6IFwiJHR5cGVPZkFydGljbGVcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICRwcm9qZWN0OiB7XG4gICAgICAgICAgICBfaWQ6IDAsXG4gICAgICAgICAgICBkaXN0aW5jdFR5cGVzOiAxLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICBdO1xuXG4gICAgICBjb25zdCByYXdDb2xsZWN0aW9uID0gQ29udGVudHMucmF3Q29sbGVjdGlvbigpO1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICByYXdDb2xsZWN0aW9uXG4gICAgICAgICAgLmFnZ3JlZ2F0ZShwaXBlbGluZSwgeyBjdXJzb3I6IHt9IH0pXG4gICAgICAgICAgLnRvQXJyYXkoKGVycm9yLCByZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICByZWplY3QobmV3IE1ldGVvci5FcnJvcihcImFnZ3JlZ2F0aW9uLWVycm9yXCIsIGVycm9yLm1lc3NhZ2UpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIEFzc3VtaW5nIHRoZSByZXN1bHQgaXMgYW4gYXJyYXkgd2l0aCBvbmUgZG9jdW1lbnQgY29udGFpbmluZyB0aGUgZGlzdGluY3RUeXBlcyBhcnJheVxuICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5sZW5ndGggPiAwID8gcmVzdWx0WzBdLmRpc3RpbmN0VHlwZXMgOiBbXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9LFxuICB9KTtcbn1cbiIsImltcG9ydCB7IEV2ZW50cyB9IGZyb20gXCIvbGliL2NvbGxlY3Rpb25zXCI7XG5pbXBvcnQgeyBNZXRlb3IgfSBmcm9tIFwibWV0ZW9yL21ldGVvclwiO1xuaW1wb3J0IHsgY2hlY2ssIE1hdGNoIH0gZnJvbSBcIm1ldGVvci9jaGVja1wiO1xuaW1wb3J0IHtcbiAgREVGQ09OOSxcbiAgREVGQ09ONyxcbiAgREVGQ09ONSxcbiAgREVGQ09ONCxcbiAgREVGQ09OMyxcbiAgREVGQ09OMixcbiAgREVGQ09OMSxcbn0gZnJvbSBcIi9kZWJ1Zy5qc29uXCI7XG5cbkRFRkNPTjMgJiYgY29uc29sZS5sb2coXCJJbiBOb2RlcyBzZXJ2ZXIsIGdldHRpbmcgdGhlIHN0dWZmXCIpO1xuXG4vLyBUaGlzIGlzIHRoZSBzZXJ2ZXIgc2lkZSBtZXRob2QgZm9yIGFkZGluZyBhIG5vZGVcbi8vIG1ha2UgbWV0aG9kcyBmb3IgYWRkaW5nIGEgbm9kZSwgZGVsZXRpbmcgYSBub2RlLCBhbmQgdXBkYXRpbmcgYSBub2RlXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgTWV0ZW9yLm1ldGhvZHMoe1xuICAgIFwiZXZlbnRzLmdldEV2ZW50c0Zvck5vZGVcIihwb2ludF9pZCwgc3RhcnREYXRlLCBlbmREYXRlKSB7XG4gICAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCBcIkFjY2VzcyBkZW5pZWRcIik7XG4gICAgICB9XG4gICAgICBjaGVjayhwb2ludF9pZCwgU3RyaW5nKTtcblxuICAgICAgY29uc3QgY3VycmVudFVzZXIgPSBNZXRlb3IudXNlcigpLl9pZDtcbiAgICAgIGNvbnN0IGN1cnJlbnRVc2VySWQgPSBNZXRlb3IudXNlcigpLl9pZDtcbiAgICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcblxuICAgICAgLy8gdXNlIHN0YXJ0RGF0ZSBhbmQgZW5kRGF0ZSBhbmQgc2V0IHRvIGRlZmF1bHQgaWYgbm90IHByb3ZpZGVkIChmb3IgZW5kRGF0ZSBzZXQgdG8gMjAgeWVhcnMgZnJvbSBub3cpXG4gICAgICBzdGFydERhdGUgPSBzdGFydERhdGUgPyBzdGFydERhdGUgOiBuZXcgRGF0ZSgpO1xuICAgICAgZW5kRGF0ZSA9IGVuZERhdGUgPyBlbmREYXRlIDogbmV3IERhdGUoKSArIDYzMTE1MjAwMDAwMDtcblxuICAgICAgdmFyIHF1ZXJ5ID0ge1xuICAgICAgICBwb2ludF9pZDogcG9pbnRfaWQsXG4gICAgICB9O1xuXG4gICAgICAvLyBpZiB0aGUgbm9kZU9iamVjdCBoYXMgYW4gX2lkLCB0aGVuIHdlIGFyZSB1cGRhdGluZyBhbiBleGlzdGluZyBub2RlXG4gICAgICAvLyBzbyB3ZSBuZWVkIHRvIGNoZWNrIGlmIHRoZSB1c2VyIGlzIHRoZSBvd25lciBvZiB0aGUgbm9kZVxuICAgICAgY29uc3Qgbm9kZXMgPSBFdmVudHMuZmluZChxdWVyeSkuZmV0Y2goKTtcbiAgICAgIERFRkNPTjQgJiZcbiAgICAgICAgY29uc29sZS5sb2coXCJOT0RFOiBcIiwgcG9pbnRfaWQsIFwiIC0gXCIsIHN0YXJ0RGF0ZSwgXCIgLSBcIiwgZW5kRGF0ZSk7XG4gICAgICBERUZDT040ICYmIGNvbnNvbGUubG9nKFwiRm91bmQgbm9kZXM6IFwiLCBwcm9jZXNzUmF3RGF0YShub2RlcykpO1xuXG4gICAgICByZXR1cm4gcHJvY2Vzc1Jhd0RhdGEobm9kZXMsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSk7XG4gICAgfSxcbiAgfSk7XG59XG5cbmNvbnN0IHByb2Nlc3NSYXdEYXRhID0gKHJhd0RhdGEsIHN0YXJ0RGF0ZSA9IG51bGwpID0+IHtcbiAgY29uc3QgY3VycmVudERhdGUgPSBzdGFydERhdGUgPyBuZXcgRGF0ZShzdGFydERhdGUpIDogbmV3IERhdGUoKTtcbiAgY29uc3Qgb25lRGF5QWdvID0gbmV3IERhdGUoY3VycmVudERhdGUgLSAyNCAqIDYwICogNjAgKiAxMDAwKTtcbiAgY29uc3Qgb25lV2Vla0FnbyA9IG5ldyBEYXRlKGN1cnJlbnREYXRlIC0gNyAqIDI0ICogNjAgKiA2MCAqIDEwMDApO1xuICBjb25zdCBvbmVNb250aEFnbyA9IG5ldyBEYXRlKGN1cnJlbnREYXRlIC0gMzAgKiAyNCAqIDYwICogNjAgKiAxMDAwKTsgLy8gQXNzdW1pbmcgMzAgZGF5cyBmb3Igc2ltcGxpY2l0eVxuICBjb25zdCBvbmVZZWFyQWdvID0gbmV3IERhdGUoY3VycmVudERhdGUgLSAzNjUgKiAyNCAqIDYwICogNjAgKiAxMDAwKTsgLy8gQXNzdW1pbmcgMzY1IGRheXMgZm9yIHNpbXBsaWNpdHlcblxuICBjb25zdCBoaXN0b3J5RGF0YSA9IHJhd0RhdGEucmVkdWNlKChhY2MsIGRvYykgPT4ge1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShwYXJzZUludChkb2MudGltZXN0YW1wX3dyaXRlKSAqIDEwMDApO1xuICAgIGNvbnN0IGRhdGVTdHJpbmcgPSBkYXRlLnRvSVNPU3RyaW5nKCkuc3BsaXQoXCJUXCIpWzBdO1xuICAgIGNvbnN0IHRpbWVTdHJpbmcgPSBkYXRlLnRvSVNPU3RyaW5nKCkuc3BsaXQoXCJUXCIpWzFdLnN1YnN0cmluZygwLCA1KTtcblxuICAgIC8vIEhlbHBlciBmdW5jdGlvbiB0byBpbml0aWFsaXplIGFjY3VtdWxhdG9yIGtleXNcbiAgICBjb25zdCBpbml0aWFsaXplS2V5ID0gKGtleSkgPT4ge1xuICAgICAgaWYgKCFhY2Nba2V5XSkge1xuICAgICAgICBhY2Nba2V5XSA9IHtcbiAgICAgICAgICBkYXRlczogW10sXG4gICAgICAgICAgdmFsdWVzOiBbXSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaW5pdGlhbGl6ZUtleShcIjI0aFwiKTtcbiAgICBpbml0aWFsaXplS2V5KFwiMWRheVwiKTtcbiAgICBpbml0aWFsaXplS2V5KFwiMXdlZWtcIik7XG4gICAgaW5pdGlhbGl6ZUtleShcIjFtb250aFwiKTtcbiAgICBpbml0aWFsaXplS2V5KFwiMXllYXJcIik7XG5cbiAgICAvLyBGaWx0ZXIgZGF0YSBpbnRvIGRpZmZlcmVudCB0aW1lIGludGVydmFsc1xuICAgIGlmIChkYXRlID4gb25lRGF5QWdvKSB7XG4gICAgICBhY2NbXCIyNGhcIl0uZGF0ZXMucHVzaChgJHtkYXRlU3RyaW5nfSAke3RpbWVTdHJpbmd9YCk7XG4gICAgICBhY2NbXCIyNGhcIl0udmFsdWVzLnB1c2gocGFyc2VGbG9hdChkb2MudmFsdWUpKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgZGF0ZS50b0lTT1N0cmluZygpLnNwbGl0KFwiVFwiKVswXSA9PT1cbiAgICAgIGN1cnJlbnREYXRlLnRvSVNPU3RyaW5nKCkuc3BsaXQoXCJUXCIpWzBdXG4gICAgKSB7XG4gICAgICBhY2NbXCIxZGF5XCJdLmRhdGVzLnB1c2godGltZVN0cmluZyk7XG4gICAgICBhY2NbXCIxZGF5XCJdLnZhbHVlcy5wdXNoKHBhcnNlRmxvYXQoZG9jLnZhbHVlKSk7XG4gICAgfVxuICAgIGlmIChkYXRlID4gb25lV2Vla0Fnbykge1xuICAgICAgYWNjW1wiMXdlZWtcIl0uZGF0ZXMucHVzaChgJHtkYXRlU3RyaW5nfSAke3RpbWVTdHJpbmd9YCk7XG4gICAgICBhY2NbXCIxd2Vla1wiXS52YWx1ZXMucHVzaChwYXJzZUZsb2F0KGRvYy52YWx1ZSkpO1xuICAgIH1cbiAgICBpZiAoZGF0ZSA+IG9uZU1vbnRoQWdvKSB7XG4gICAgICBhY2NbXCIxbW9udGhcIl0uZGF0ZXMucHVzaChgJHtkYXRlU3RyaW5nfSAke3RpbWVTdHJpbmd9YCk7XG4gICAgICBhY2NbXCIxbW9udGhcIl0udmFsdWVzLnB1c2gocGFyc2VGbG9hdChkb2MudmFsdWUpKTtcbiAgICB9XG4gICAgaWYgKGRhdGUgPiBvbmVZZWFyQWdvKSB7XG4gICAgICBhY2NbXCIxeWVhclwiXS5kYXRlcy5wdXNoKGAke2RhdGVTdHJpbmd9ICR7dGltZVN0cmluZ31gKTtcbiAgICAgIGFjY1tcIjF5ZWFyXCJdLnZhbHVlcy5wdXNoKHBhcnNlRmxvYXQoZG9jLnZhbHVlKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30pO1xuXG4gIHJldHVybiBoaXN0b3J5RGF0YTtcbn07XG5cbmNvbnN0IHByb2Nlc3NSYXdEYXRhT2xkID0gKHJhd0RhdGEsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSkgPT4ge1xuICBjb25zdCBoaXN0b3J5RGF0YSA9IHJhd0RhdGEucmVkdWNlKChhY2MsIGRvYykgPT4ge1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShwYXJzZUludChkb2MudGltZXN0YW1wX3dyaXRlKSAqIDEwMDApO1xuICAgIGNvbnN0IGRhdGVTdHJpbmcgPSBkYXRlLnRvSVNPU3RyaW5nKCkuc3BsaXQoXCJUXCIpWzBdO1xuICAgIGNvbnN0IHRpbWVTdHJpbmcgPSBkYXRlLnRvSVNPU3RyaW5nKCkuc3BsaXQoXCJUXCIpWzFdLnN1YnN0cmluZygwLCA1KTtcblxuICAgIGlmICghYWNjW1wiMWRheVwiXSkge1xuICAgICAgYWNjW1wiMWRheVwiXSA9IHtcbiAgICAgICAgZGF0ZXM6IFtdLFxuICAgICAgICB2YWx1ZXM6IFtdLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoIWFjY1tcIjI0aFwiXSkge1xuICAgICAgYWNjW1wiMjRoXCJdID0ge1xuICAgICAgICBkYXRlczogW10sXG4gICAgICAgIHZhbHVlczogW10sXG4gICAgICB9O1xuICAgIH1cblxuICAgIGFjY1tcIjFkYXlcIl0uZGF0ZXMucHVzaCh0aW1lU3RyaW5nKTtcbiAgICBhY2NbXCIxZGF5XCJdLnZhbHVlcy5wdXNoKHBhcnNlRmxvYXQoZG9jLnZhbHVlKSk7XG5cbiAgICBhY2NbXCIyNGhcIl0uZGF0ZXMucHVzaChgJHtkYXRlU3RyaW5nfSAke3RpbWVTdHJpbmd9YCk7XG4gICAgYWNjW1wiMjRoXCJdLnZhbHVlcy5wdXNoKHBhcnNlRmxvYXQoZG9jLnZhbHVlKSk7XG5cbiAgICByZXR1cm4gYWNjO1xuICB9LCB7fSk7XG5cbiAgcmV0dXJuIGhpc3RvcnlEYXRhO1xufTtcbiIsImltcG9ydCB7IE1ldGVvciB9IGZyb20gXCJtZXRlb3IvbWV0ZW9yXCI7XG5pbXBvcnQgeyBjaGVjaywgTWF0Y2ggfSBmcm9tIFwibWV0ZW9yL2NoZWNrXCI7XG5pbXBvcnQgT3JkZXIgZnJvbSBcIi4uL2xpYi9vcmRlci5qc1wiO1xuaW1wb3J0IHsgUGVyc29ucywgU2VhcmNoTG9nIH0gZnJvbSBcIi9saWIvY29sbGVjdGlvbnNcIjtcblxuaW1wb3J0IHtcbiAgREVGQ09OOSxcbiAgREVGQ09ONyxcbiAgREVGQ09ONSxcbiAgREVGQ09ONCxcbiAgREVGQ09OMyxcbiAgREVGQ09OMixcbiAgREVGQ09OMVxufSBmcm9tIFwiL2RlYnVnLmpzb25cIjtcbmltcG9ydCBDb25zdGFudHMgZnJvbSBcIi9saWIvY29uc3RhbnRzXCI7XG5pbXBvcnQgRHJ1cGFsU2VydmljZXMgZnJvbSBcIi4uL2xpYi9kcnVwYWwvc2VydmljZXNcIjtcblxuREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIkluIFNlYXJjaCBzZXJ2ZXIgcGFydFwiKTtcblxuLyoqXG4gKiBxdWVyeTpcbiB7XG4gICAgbmFtZSxcbiAgICBlbWFpbCxcbiAgICBlbWFpbDIsXG4gICAgcGhvbmUsXG4gICAgY29udGVudFxufVxuICoqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgTWV0ZW9yLm1ldGhvZHMoe1xuICAgIGFzeW5jIFwiZmlsZWFyZWEuZmlsZWFyZWFRdWVyeVwiKHF1ZXJ5KSB7XG4gICAgICBjaGVjayhxdWVyeSwgT2JqZWN0KTtcblxuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcImZpbGVhcmVhLmZpbGVhcmVhUXVlcnlcIik7XG5cbiAgICAgIGNvbnN0IGRvV29yayA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJmaWxlYXJlYS5maWxlYXJlYVF1ZXJ5IC0gQWNjZXNzIGRlbmllZFwiKTtcbiAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJHZXQgQ3VycmVudCB1c2VyXCIpO1xuICAgICAgICBsZXQgdXNlck9iaiA9IE1ldGVvci51c2Vycy5maW5kT25lKHRoaXMudXNlcklkKTtcbiAgICAgICAgcXVlcnkubWV0YV9hY3RpbmdfdXNlciA9IHVzZXJPYmoudWlkO1xuICAgICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKGBEb2luZyByZXF1ZXN0YCk7XG4gICAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2cocXVlcnkpO1xuICAgICAgICBjb25zdCBzZXJ2aWNlcyA9IG5ldyBEcnVwYWxTZXJ2aWNlcygpO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHNlcnZpY2VzLmZpbGVhcmVhUXVlcnkocXVlcnkpO1xuICAgICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKGBNZXRob2QgZmlsZWFyZWFRdWVyeSBzdWNjZXNzZnVsYCk7XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgIH07XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBhd2FpdCBkb1dvcmsoKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcihlLmVycm9yLCBlLnJlYXNvbik7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBNZXRlb3IubWV0aG9kcyh7XG4gICAgYXN5bmMgXCJmaWxlYXJlYS5maWxlYXJlYUdldEl0ZW1cIihxdWVyeSkge1xuICAgICAgY2hlY2socXVlcnksIE9iamVjdCk7XG5cbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJmaWxlYXJlYS5maWxlYXJlYUdldEl0ZW1cIik7XG5cbiAgICAgIGNvbnN0IGRvV29yayA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJmaWxlYXJlYS5maWxlYXJlYUdldEl0ZW0gLSBBY2Nlc3MgZGVuaWVkXCIpO1xuICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCBcIkFjY2VzcyBkZW5pZWRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiR2V0IEN1cnJlbnQgdXNlclwiKTtcbiAgICAgICAgbGV0IHVzZXJPYmogPSBNZXRlb3IudXNlcnMuZmluZE9uZSh0aGlzLnVzZXJJZCk7XG4gICAgICAgIHF1ZXJ5Lm1ldGFfYWN0aW5nX3VzZXIgPSB1c2VyT2JqLnVpZDtcbiAgICAgICAgY29uc3Qgc2VydmljZXMgPSBuZXcgRHJ1cGFsU2VydmljZXMoKTtcbiAgICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhgRG9pbmcgcmVxdWVzdGApO1xuICAgICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKHF1ZXJ5KTtcblxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHNlcnZpY2VzLmZpbGVhcmVhR2V0RmlsZShxdWVyeSk7XG4gICAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coYE1ldGhvZCBmaWxlYXJlYUdldEl0ZW0gc3VjY2Vzc2Z1bGApO1xuICAgICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcblxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9O1xuXG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gYXdhaXQgZG9Xb3JrKCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoZS5lcnJvciwgZS5yZWFzb24pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG4iLCJpbXBvcnQgX3VzZXJzIGZyb20gXCIuL191c2Vyc1wiO1xuaW1wb3J0IGNoYXRsaW5lbGlzdHMgZnJvbSBcIi4vY2hhdGxpbmVsaXN0c1wiO1xuaW1wb3J0IG9yZGVycyBmcm9tIFwiLi9vcmRlcnNcIjtcbmltcG9ydCBzZWFyY2ggZnJvbSBcIi4vc2VhcmNoXCI7XG5pbXBvcnQgbG9nIGZyb20gXCIuL2xvZ1wiO1xuaW1wb3J0IGNvbnRhY3QgZnJvbSBcIi4vY29udGFjdFwiO1xuaW1wb3J0IGNvbnRlbnQgZnJvbSBcIi4vY29udGVudFwiO1xuaW1wb3J0IGZpbGVhcmVhIGZyb20gXCIuL2ZpbGVhcmVhXCI7XG5pbXBvcnQgYWNjb3VudCBmcm9tIFwiLi9hY2NvdW50XCI7XG5pbXBvcnQgc3ljb3JheCBmcm9tIFwiLi9zeWNvcmF4XCI7XG5pbXBvcnQgbm9kZXMgZnJvbSBcIi4vbm9kZXNcIjtcbmltcG9ydCBjaGF0cm9vbXMgZnJvbSBcIi4vY2hhdHJvb21zXCI7XG5pbXBvcnQgZXZlbnRzIGZyb20gXCIuL2V2ZW50c1wiO1xuaW1wb3J0IHdvcmtvcmRlcnMgZnJvbSBcIi4vd29ya29yZGVyc1wiO1xuaW1wb3J0IG5vdGljZXMgZnJvbSBcIi4vbm90aWNlc1wiO1xuaW1wb3J0IHN5c3RlbWNvbmZpZyBmcm9tIFwiLi9zeXN0ZW1jb25maWdcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICBfdXNlcnMoKTtcbiAgY2hhdGxpbmVsaXN0cygpO1xuICBvcmRlcnMoKTtcbiAgc2VhcmNoKCk7XG4gIGNvbnRhY3QoKTtcbiAgY29udGVudCgpO1xuICBmaWxlYXJlYSgpO1xuICBhY2NvdW50KCk7XG4gIHN5Y29yYXgoKTtcbiAgbm9kZXMoKTtcbiAgY2hhdHJvb21zKCk7XG4gIGV2ZW50cygpO1xuICB3b3Jrb3JkZXJzKCk7XG4gIG5vdGljZXMoKTtcbiAgc3lzdGVtY29uZmlnKCk7XG59XG4iLCJpbXBvcnQge0FydGljbGVzfSBmcm9tICcvbGliL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7TWV0ZW9yfSBmcm9tICdtZXRlb3IvbWV0ZW9yJztcbmltcG9ydCB7Y2hlY2ssIE1hdGNofSBmcm9tICdtZXRlb3IvY2hlY2snO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tICcvbGliL2NvbnN0YW50cyc7XG5pbXBvcnQge1xuICBERUZDT045LFxuICBERUZDT043LFxuICBERUZDT041LFxuICBERUZDT040LFxuICBERUZDT04zLFxuICBERUZDT04yLFxuICBERUZDT04xXG59IGZyb20gXCIvZGVidWcuanNvblwiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIE1ldGVvci5tZXRob2RzKHtcbiAgICAnbG9nLmluZm8nIChjb250ZW50KSB7XG4gICAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCAnQWNjZXNzIGRlbmllZCcpXG4gICAgICB9XG4gICAgICBjaGVjayhjb250ZW50LCBNYXRjaC5PbmVPZihTdHJpbmcsIE9iamVjdCkpO1xuXG4gICAgICBpZiAodHlwZW9mKGNvbnRlbnQpID09PSAnc3RyaW5nJykge1xuICAgICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhgSU5GTzogJHtjb250ZW50fWApO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mKGNvbnRlbnQpID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhgSU5GTzpgKTtcbiAgICAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoY29udGVudCkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJ09LJztcblxuICAgIH1cbiAgfSk7XG5cbn1cbiIsImltcG9ydCB7IE5vZGVzLCBOb2RlTGlua3MgfSBmcm9tIFwiL2xpYi9jb2xsZWN0aW9uc1wiO1xuaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSBcIm1ldGVvci9tZXRlb3JcIjtcbmltcG9ydCB7IGNoZWNrLCBNYXRjaCB9IGZyb20gXCJtZXRlb3IvY2hlY2tcIjtcbmltcG9ydCB7XG4gIERFRkNPTjksXG4gIERFRkNPTjcsXG4gIERFRkNPTjUsXG4gIERFRkNPTjQsXG4gIERFRkNPTjMsXG4gIERFRkNPTjIsXG4gIERFRkNPTjEsXG59IGZyb20gXCIvZGVidWcuanNvblwiO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tIFwiL2xpYi9jb25zdGFudHNcIjtcblxuREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIkluIE5vZGVzIHNlcnZlciwgZ2V0dGluZyB0aGUgc3R1ZmZcIik7XG5cbi8vIFRoaXMgaXMgdGhlIHNlcnZlciBzaWRlIG1ldGhvZCBmb3IgYWRkaW5nIGEgbm9kZVxuLy8gbWFrZSBtZXRob2RzIGZvciBhZGRpbmcgYSBub2RlLCBkZWxldGluZyBhIG5vZGUsIGFuZCB1cGRhdGluZyBhIG5vZGVcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBNZXRlb3IubWV0aG9kcyh7XG4gICAgXCJub2Rlcy5hZGROb2RlXCIobm9kZU9iamVjdCkge1xuICAgICAgaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgICAgfVxuICAgICAgY2hlY2sobm9kZU9iamVjdCwgT2JqZWN0KTtcblxuICAgICAgY29uc3QgY3VycmVudFVzZXIgPSBNZXRlb3IudXNlcigpLl9pZDtcbiAgICAgIGNvbnN0IGN1cnJlbnRVc2VySWQgPSBNZXRlb3IudXNlcigpLl9pZDtcbiAgICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcblxuICAgICAgREVGQ09ONCAmJiBjb25zb2xlLmxvZyhcIkluIG5vZGVzLmFkZE5vZGUsIFVwc2VydCBub2RlOiBcIiwgbm9kZU9iamVjdCk7XG5cbiAgICAgIC8vIGlmIHRoZSBub2RlT2JqZWN0IGhhcyBhbiBfaWQsIHRoZW4gd2UgYXJlIHVwZGF0aW5nIGFuIGV4aXN0aW5nIG5vZGVcbiAgICAgIGlmIChub2RlT2JqZWN0Ll9pZCkge1xuICAgICAgICAvLyBpZiB0aGUgbm9kZU9iamVjdCBoYXMgYW4gX2lkLCB0aGVuIHdlIGFyZSB1cGRhdGluZyBhbiBleGlzdGluZyBub2RlXG4gICAgICAgIC8vIHNvIHdlIG5lZWQgdG8gY2hlY2sgaWYgdGhlIHVzZXIgaXMgdGhlIG93bmVyIG9mIHRoZSBub2RlXG4gICAgICAgIGNvbnN0IG5vZGUgPSBOb2Rlcy5maW5kT25lKHsgX2lkOiBub2RlT2JqZWN0Ll9pZCB9KTtcblxuICAgICAgICAvLyB3ZSBkb250IG5lZWQgdG8gY2hlY2sgaWYgb3duZXIgaXMgc2FtZSBhcyBjdXJyZW50IHVzZXJcbiAgICAgICAgLy8gaWYgKG5vZGUub3duZXIgIT09IGN1cnJlbnRVc2VySWQpIHtcbiAgICAgICAgLy8gICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIHVwc2VydCB0aGUgbm9kZVxuICAgICAgICBOb2Rlcy51cHNlcnQoXG4gICAgICAgICAgeyBfaWQ6IG5vZGVPYmplY3QuX2lkIH0sXG4gICAgICAgICAgeyAkc2V0OiB7IC4uLm5vZGVPYmplY3QsIGxhc3RVcGRhdGVkOiBjdXJyZW50RGF0ZSB9IH1cbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGlmIHRoZSBub2RlT2JqZWN0IGRvZXMgbm90IGhhdmUgYW4gX2lkLCB0aGVuIHdlIGFyZSBhZGRpbmcgYSBuZXcgbm9kZVxuICAgICAgICAvLyBzbyB3ZSBuZWVkIHRvIGFkZCB0aGUgb3duZXIgYW5kIGNyZWF0ZWQgZmllbGRzXG4gICAgICAgIE5vZGVzLmluc2VydCh7XG4gICAgICAgICAgLi4ubm9kZU9iamVjdCxcbiAgICAgICAgICBvd25lcjogY3VycmVudFVzZXIsXG4gICAgICAgICAgY3JlYXRlZDogY3VycmVudERhdGUsXG4gICAgICAgICAgbGFzdFVwZGF0ZWQ6IGN1cnJlbnREYXRlLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICB9KTtcblxuICBNZXRlb3IubWV0aG9kcyh7XG4gICAgXCJub2Rlcy5yZW1vdmVOb2RlXCIobm9kZUlkKSB7XG4gICAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCBcIkFjY2VzcyBkZW5pZWRcIik7XG4gICAgICB9XG4gICAgICBjaGVjayhub2RlSWQsIFN0cmluZyk7XG5cbiAgICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gTWV0ZW9yLnVzZXIoKS5faWQ7XG4gICAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XG5cbiAgICAgIE5vZGVzLnVwZGF0ZShub2RlSWQsIHtcbiAgICAgICAgJHNldDoge1xuICAgICAgICAgIHN0YXR1czogXCJhcmNoaXZlZFwiLFxuICAgICAgICAgIG1vZGlmaWVkQnk6IGN1cnJlbnRVc2VyLFxuICAgICAgICAgIG1vZGlmaWVkQXQ6IGN1cnJlbnREYXRlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIERFRkNPTjUgJiZcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgXCJJbiByZW1vdmVOb2RlIG1ldGhvZCBvbiBzZXJ2ZXIsIHJlbW92ZWQgbm9kZSB3aXRoIGlkOiBcIiArIG5vZGVJZFxuICAgICAgICApO1xuICAgICAgcmV0dXJuIG5vZGVJZDtcbiAgICB9LFxuICB9KTtcbiAgLy8gc3RvcmUgYSBsaW5rIGJldHdlZW4gdHdvIG5vZGVzXG4gIE1ldGVvci5tZXRob2RzKHtcbiAgICBcIm5vZGVzLmFkZExpbmtcIihsaW5rT2JqZWN0KSB7XG4gICAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCBcIkFjY2VzcyBkZW5pZWRcIik7XG4gICAgICB9XG4gICAgICBjaGVjayhsaW5rT2JqZWN0LCBPYmplY3QpO1xuXG4gICAgICBjb25zdCBjdXJyZW50VXNlciA9IE1ldGVvci51c2VyKCkuX2lkO1xuICAgICAgY29uc3QgY3VycmVudFVzZXJJZCA9IE1ldGVvci51c2VyKCkuX2lkO1xuICAgICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICBERUZDT040ICYmIGNvbnNvbGUubG9nKFwiSW4gbm9kZXMuYWRkTGluaywgVXBzZXJ0IGxpbms6IFwiLCBsaW5rT2JqZWN0KTtcblxuICAgICAgLy8gaWYgdGhlIGxpbmtPYmplY3QgaGFzIGFuIF9pZCwgdGhlbiB3ZSBhcmUgdXBkYXRpbmcgYW4gZXhpc3RpbmcgbGlua1xuICAgICAgaWYgKGxpbmtPYmplY3QuX2lkKSB7XG4gICAgICAgIC8vIGlmIHRoZSBsaW5rT2JqZWN0IGhhcyBhbiBfaWQsIHRoZW4gd2UgYXJlIHVwZGF0aW5nIGFuIGV4aXN0aW5nIGxpbmtcbiAgICAgICAgLy8gc28gd2UgbmVlZCB0byBjaGVjayBpZiB0aGUgdXNlciBpcyB0aGUgb3duZXIgb2YgdGhlIGxpbmtcbiAgICAgICAgY29uc3QgbGluayA9IE5vZGVMaW5rcy5maW5kT25lKHsgX2lkOiBsaW5rT2JqZWN0Ll9pZCB9KTtcbiAgICAgICAgLy8gd2UgZG9udCBuZWVkIHRvIGNoZWNrIGlmIG93bmVyIGlzIHNhbWUgYXMgY3VycmVudCB1c2VyXG4gICAgICAgIC8vIGlmIChsaW5rLm93bmVyICE9PSBjdXJyZW50VXNlcklkKSB7XG4gICAgICAgIC8vICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiQWNjZXNzIGRlbmllZFwiKTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyB1cHNlcnQgdGhlIGxpbmtcbiAgICAgICAgTm9kZUxpbmtzLnVwc2VydChcbiAgICAgICAgICB7IF9pZDogbGlua09iamVjdC5faWQgfSxcbiAgICAgICAgICB7ICRzZXQ6IHsgLi4ubGlua09iamVjdCwgbGFzdFVwZGF0ZWQ6IGN1cnJlbnREYXRlIH0gfVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaWYgdGhlIGxpbmtPYmplY3QgZG9lcyBub3QgaGF2ZSBhbiBfaWQsIHRoZW4gd2UgYXJlIGFkZGluZyBhIG5ldyBsaW5rXG4gICAgICAgIC8vIHNvIHdlIG5lZWQgdG8gYWRkIHRoZSBvd25lciBhbmQgY3JlYXRlZCBmaWVsZHNcbiAgICAgICAgTm9kZUxpbmtzLmluc2VydCh7XG4gICAgICAgICAgLi4ubGlua09iamVjdCxcbiAgICAgICAgICBvd25lcjogY3VycmVudFVzZXIsXG4gICAgICAgICAgY3JlYXRlZDogY3VycmVudERhdGUsXG4gICAgICAgICAgbGFzdFVwZGF0ZWQ6IGN1cnJlbnREYXRlLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICB9KTtcbiAgTWV0ZW9yLm1ldGhvZHMoe1xuICAgIGdldFRyZWVTdHJ1Y3R1cmV2MTogZnVuY3Rpb24gKHN0YXJ0Tm9kZUlkKSB7XG4gICAgICBjaGVjayhzdGFydE5vZGVJZCwgU3RyaW5nKTtcbiAgICAgIERFRkNPTjIgJiYgY29uc29sZS5sb2coXCJJbiBnZXRUcmVlU3RydWN0dXJlIG1ldGhvZCBvbiBzZXJ2ZXJcIik7XG4gICAgICBERUZDT04yICYmIGNvbnNvbGUubG9nKFwiIHN0YXJ0Tm9kZUlkOiBcIiArIHN0YXJ0Tm9kZUlkKTtcblxuICAgICAgY29uc3Qgbm9kZUNvbGxlY3Rpb24gPSBOb2RlczsgLy8gQXNzdW1pbmcgeW91J3ZlIGRlZmluZWQgTm9kZXMgYXMgeW91ciBjb2xsZWN0aW9uXG4gICAgICBjb25zdCBub2RlTGlua3NDb2xsZWN0aW9uID0gTm9kZUxpbmtzO1xuXG4gICAgICBmdW5jdGlvbiBidWlsZE5vZGUoX2lkKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBub2RlQ29sbGVjdGlvbi5maW5kT25lKHsgX2lkIH0pO1xuICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxpbmtzID0gbm9kZUxpbmtzQ29sbGVjdGlvbi5maW5kKHsgcGFyZW50SWQ6IF9pZCB9KS5mZXRjaCgpO1xuXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gW107XG4gICAgICAgIGZvciAoY29uc3QgbGluayBvZiBsaW5rcykge1xuICAgICAgICAgIGNvbnN0IGNoaWxkTm9kZSA9IGJ1aWxkTm9kZShsaW5rLmNoaWxkSWQpO1xuICAgICAgICAgIGlmIChjaGlsZE5vZGUpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuLnB1c2goY2hpbGROb2RlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLm5vZGUsXG4gICAgICAgICAgY2hpbGRyZW4sXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhcImJ1aWxkTm9kZShzdGFydE5vZGVJZClcIik7XG4gICAgICBjb25zb2xlLmxvZyhidWlsZE5vZGUoc3RhcnROb2RlSWQpKTtcbiAgICAgIHJldHVybiBidWlsZE5vZGUoc3RhcnROb2RlSWQpO1xuICAgIH0sXG4gIH0pO1xuICBNZXRlb3IubWV0aG9kcyh7XG4gICAgZ2V0VHJlZVN0cnVjdHVyZTogZnVuY3Rpb24gKHN0YXJ0Tm9kZUlkKSB7XG4gICAgICBjaGVjayhzdGFydE5vZGVJZCwgU3RyaW5nKTtcbiAgICAgIC8vIERFRkNPTjIgJiYgY29uc29sZS5sb2coXCJJbiBnZXRUcmVlU3RydWN0dXJlIG1ldGhvZCBvbiBzZXJ2ZXJcIik7XG4gICAgICAvLyBERUZDT04yICYmIGNvbnNvbGUubG9nKFwiIHN0YXJ0Tm9kZUlkOiBcIiArIHN0YXJ0Tm9kZUlkKTtcblxuICAgICAgY29uc3Qgbm9kZUNvbGxlY3Rpb24gPSBOb2RlczsgLy8gQXNzdW1pbmcgeW91J3ZlIGRlZmluZWQgTm9kZXMgYXMgeW91ciBjb2xsZWN0aW9uXG4gICAgICBjb25zdCBub2RlTGlua3NDb2xsZWN0aW9uID0gTm9kZUxpbmtzO1xuXG4gICAgICBmdW5jdGlvbiBidWlsZE5vZGUoX2lkKSB7XG4gICAgICAgIC8vIERFRkNPTjIgJiYgY29uc29sZS5sb2coXCJCdWlsZGluZyBub2RlIGZvciBfaWQ6IFwiICsgX2lkKTtcblxuICAgICAgICBjb25zdCBub2RlID0gbm9kZUNvbGxlY3Rpb24uZmluZE9uZSh7IF9pZCB9KTtcbiAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsaW5rcyA9IG5vZGVMaW5rc0NvbGxlY3Rpb24uZmluZCh7IHBhcmVudElkOiBfaWQgfSkuZmV0Y2goKTtcblxuICAgICAgICAvLyBERUZDT04yICYmIGNvbnNvbGUubG9nKGBGb3VuZCAke2xpbmtzLmxlbmd0aH0gbGlua3MgZm9yIG5vZGUgJHtfaWR9YCk7XG5cbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBsaW5rIG9mIGxpbmtzKSB7XG4gICAgICAgICAgLypERUZDT04yICYmXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUHJvY2Vzc2luZyBsaW5rIHdpdGggY2hpbGRJZDogJHtsaW5rLmNoaWxkSWR9YCk7Ki9cbiAgICAgICAgICBjb25zdCBjaGlsZE5vZGUgPSBidWlsZE5vZGUobGluay5jaGlsZElkKTsgLy8gUmVtb3ZlZCBhd2FpdCBiZWNhdXNlIE1ldGVvcidzIE1vbmdvIEFQSSBpcyBzeW5jaHJvbm91c1xuICAgICAgICAgIGlmIChjaGlsZE5vZGUpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuLnB1c2goY2hpbGROb2RlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLm5vZGUsXG4gICAgICAgICAgY2hpbGRyZW4sXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICAvL0RFRkNPTjIgJiYgY29uc29sZS5sb2coXCJidWlsZE5vZGUoc3RhcnROb2RlSWQpXCIpO1xuICAgICAgLy9ERUZDT04yICYmIGNvbnNvbGUubG9nKGJ1aWxkTm9kZShzdGFydE5vZGVJZCkpO1xuICAgICAgcmV0dXJuIGJ1aWxkTm9kZShzdGFydE5vZGVJZCk7XG4gICAgfSxcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBOb3RpY2VzVXNlclN0YXR1cyB9IGZyb20gXCIvbGliL2NvbGxlY3Rpb25zXCI7XG5pbXBvcnQgeyBhZGROb3RpY2UgfSBmcm9tIFwiLi4vbGliL25vdGljZXNcIjtcblxuaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSBcIm1ldGVvci9tZXRlb3JcIjtcbmltcG9ydCB7IGNoZWNrLCBNYXRjaCB9IGZyb20gXCJtZXRlb3IvY2hlY2tcIjtcbmltcG9ydCB7XG4gIERFRkNPTjksXG4gIERFRkNPTjcsXG4gIERFRkNPTjUsXG4gIERFRkNPTjQsXG4gIERFRkNPTjMsXG4gIERFRkNPTjIsXG4gIERFRkNPTjEsXG59IGZyb20gXCIvZGVidWcuanNvblwiO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tIFwiL2xpYi9jb25zdGFudHNcIjtcbkRFRkNPTjUgJiYgY29uc29sZS5sb2coXCJJbiBjaGF0bGluZWxpc3RzIHNlcnZlciwgZ2V0dGluZyB0aGUgc3R1ZmZcIik7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgTWV0ZW9yLm1ldGhvZHMoe1xuICAgIFwibm90aWNlcy5hZGRcIihub3RpY2UsIHVzZXJzKSB7XG4gICAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCBcIkFjY2VzcyBkZW5pZWRcIik7XG4gICAgICB9XG4gICAgICBjaGVjayhub3RpY2UsIE9iamVjdCk7XG4gICAgICBjaGVjayh1c2VycywgT2JqZWN0KTtcblxuICAgICAgY29uc3QgY3VycmVudFVzZXIgPSBNZXRlb3IudXNlcigpLl9pZDtcbiAgICAgIGNvbnN0IGN1cnJlbnRVc2VySWQgPSBNZXRlb3IudXNlcigpLl9pZDtcbiAgICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcblxuICAgICAgbGV0IG5ld05vdGljZSA9IHt9O1xuICAgICAgbmV3Tm90aWNlID0ge1xuICAgICAgICAuLi5ub3RpY2UsXG4gICAgICB9O1xuICAgICAgbmV3Tm90aWNlLm1vZGlmaWVkQnkgPSBjdXJyZW50VXNlcjtcbiAgICAgIG5ld05vdGljZS5jcmVhdGVkQnlOYW1lID0gY3VycmVudFVzZXI7XG4gICAgICBuZXdOb3RpY2UuY3JlYXRlZEJ5ID0gY3VycmVudFVzZXJJZDtcbiAgICAgIG5ld05vdGljZS5tb2RpZmllZEF0ID0gY3VycmVudERhdGU7XG4gICAgICBuZXdOb3RpY2UuY3JlYXRlZEF0ID0gY3VycmVudERhdGU7XG4gICAgICBuZXdOb3RpY2Uuc3RhdHVzID0gXCJhY3RpdmVcIjtcbiAgICAgIC8vIGxldCBub3RpY2VJZCA9IE5vdGljZXMuaW5zZXJ0KG5ld05vdGljZSk7XG5cbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJJbnNlcnRlZCBhIG5ldyBub3RpY2VcIik7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKG5ld05vdGljZSk7XG4gICAgICByZXR1cm4gYWRkTm90aWNlKG5ld05vdGljZSwgdXNlcnMpO1xuICAgIH0sXG4gIH0pO1xuICBNZXRlb3IubWV0aG9kcyh7XG4gICAgXCJub3RpY2VzLnVwZGF0ZVJlYWRTdGF0dXNcIihub3RpY2VTdGF0dXMpIHtcbiAgICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiQWNjZXNzIGRlbmllZFwiKTtcbiAgICAgIH1cbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCIqKioqKiogbm90aWNlcy51cGRhdGVSZWFkU3RhdHVzXCIpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhub3RpY2VTdGF0dXMpO1xuICAgICAgY2hlY2sobm90aWNlU3RhdHVzLCBPYmplY3QpO1xuICAgICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgbGV0IHVwZGF0ZVN0YXR1cyA9IE5vdGljZXNVc2VyU3RhdHVzLnVwZGF0ZShcbiAgICAgICAgeyBfaWQ6IG5vdGljZVN0YXR1cy5faWQgfSxcbiAgICAgICAge1xuICAgICAgICAgICRzZXQ6IHtcbiAgICAgICAgICAgIHJlYWRJdDogbm90aWNlU3RhdHVzLnJlYWRJdCxcbiAgICAgICAgICAgIHJlYWRBdDogY3VycmVudERhdGUsXG4gICAgICAgICAgICBtb2RpZmllZEF0OiBjdXJyZW50RGF0ZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgICApO1xuICAgICAgcmV0dXJuIHVwZGF0ZVN0YXR1cztcbiAgICB9LFxuICB9KTtcbn1cbiIsImltcG9ydCB7XG4gIE1ldGVvclxufSBmcm9tIFwibWV0ZW9yL21ldGVvclwiO1xuaW1wb3J0IHtcbiAgY2hlY2ssXG4gIE1hdGNoXG59IGZyb20gXCJtZXRlb3IvY2hlY2tcIjtcbmltcG9ydCBPcmRlciBmcm9tIFwiLi4vbGliL29yZGVyLmpzXCI7XG5pbXBvcnQge1xuICBVc2Vyc1xufSBmcm9tICcvbGliL2NvbGxlY3Rpb25zJztcblxuaW1wb3J0IHtcbiAgREVGQ09OOSxcbiAgREVGQ09ONyxcbiAgREVGQ09ONSxcbiAgREVGQ09ONCxcbiAgREVGQ09OMyxcbiAgREVGQ09OMixcbiAgREVGQ09OMVxufSBmcm9tIFwiL2RlYnVnLmpzb25cIjtcbmltcG9ydCBDb25zdGFudHMgZnJvbSBcIi9saWIvY29uc3RhbnRzXCI7XG5ERUZDT041ICYmIGNvbnNvbGUubG9nKFwiSW4gT3JkZXIgc2VydmVyIHBhcnRcIik7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgTWV0ZW9yLm1ldGhvZHMoe1xuICAgIFwib3JkZXJzLnRlc3Rjb25uZWN0aW9uXCIoKSB7XG4gICAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCBcIkFjY2VzcyBkZW5pZWRcIik7XG4gICAgICB9XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwib3JkZXJzLnRlc3Rjb25uZWN0aW9uIFwiKTtcbiAgICAgIGNvbnN0IG9yZGVyID0gbmV3IE9yZGVyKE1ldGVvcik7XG5cbiAgICAgIHRoaXMudW5ibG9jaygpO1xuICAgICAgb3JkZXIudGVzdENvbm5lY3Rpb25Db250ZW50KCk7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwidGVzdENvbm5lY3Rpb25TZW50XCIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KTtcbiAgTWV0ZW9yLm1ldGhvZHMoe1xuICAgIFwib3JkZXJzLm9yZGVycXVlcnlcIihzZWFyY2hUZXh0KSB7XG4gICAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCBcIkFjY2VzcyBkZW5pZWRcIik7XG4gICAgICB9XG4gICAgICBjaGVjayhzZWFyY2hUZXh0LCBTdHJpbmcpO1xuXG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwib3JkZXJzLlF1ZXJ5IHN0dWZmXCIpO1xuICAgICAgY29uc3Qgb3JkZXIgPSBuZXcgT3JkZXIoTWV0ZW9yKTtcblxuICAgICAgdGhpcy51bmJsb2NrKCk7XG4gICAgICBjb25zdCBvcmRlcnMgPSBvcmRlci5vcmRlclF1ZXJ5KHNlYXJjaFRleHQpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIk9yZGVyUXVlcnkgc2VudCB3aXRoIHNlYXJjaCBzdHJpbmcgOiBcIi5zZWFyY2hUZXh0KTtcblxuICAgICAgcmV0dXJuIG9yZGVycztcbiAgICB9XG4gIH0pO1xuICBNZXRlb3IubWV0aG9kcyh7XG4gICAgXCJvcmRlcnMucXVlcnlPcmRlckJ5T3JkZXJJZFwiKHNlYXJjaFRleHQpIHtcbiAgICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiQWNjZXNzIGRlbmllZFwiKTtcbiAgICAgIH1cbiAgICAgIGNoZWNrKHNlYXJjaFRleHQsIFN0cmluZyk7XG5cbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJvcmRlcnMuUXVlcnkgc3R1ZmZcIik7XG4gICAgICBjb25zdCBvcmRlciA9IG5ldyBPcmRlcihNZXRlb3IpO1xuXG4gICAgICB0aGlzLnVuYmxvY2soKTtcbiAgICAgIGNvbnN0IG9yZGVycyA9IG9yZGVyLnF1ZXJ5T3JkZXJCeU9yZGVySWQoc2VhcmNoVGV4dCk7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiT3JkZXJRdWVyeSBzZW50IHdpdGggc2VhcmNoIHN0cmluZyA6IFwiLnNlYXJjaFRleHQpO1xuXG4gICAgICByZXR1cm4gb3JkZXJzO1xuICAgIH1cbiAgfSk7XG5cbiAgTWV0ZW9yLm1ldGhvZHMoe1xuICAgIFwib3JkZXJzLnF1ZXJ5T3JkZXJCeVBlcnNvbklkXCIoc2VhcmNoVGV4dCkge1xuICAgICAgaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgICAgfVxuICAgICAgY2hlY2soc2VhcmNoVGV4dCwgU3RyaW5nKTtcblxuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIm9yZGVycy5RdWVyeSBzdHVmZlwiKTtcbiAgICAgIGNvbnN0IG9yZGVyID0gbmV3IE9yZGVyKE1ldGVvcik7XG5cbiAgICAgIHRoaXMudW5ibG9jaygpO1xuICAgICAgY29uc3Qgb3JkZXJzID0gb3JkZXIucXVlcnlPcmRlckJ5UGVyc29uSWQoc2VhcmNoVGV4dCk7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiT3JkZXJRdWVyeSBmb3IgUGVyc29uaWQgc2VudCB3aXRoIHNlYXJjaCBzdHJpbmcgOiBcIi5zZWFyY2hUZXh0KTtcblxuICAgICAgcmV0dXJuIG9yZGVycztcbiAgICB9XG4gIH0pO1xuXG4gIE1ldGVvci5tZXRob2RzKHtcbiAgICBcIm9yZGVycy5xdWVyeVJlY2VudE9yZGVyc1wiKCkge1xuICAgICAgaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgICAgfVxuICAgICAgLy9jaGVjayhzZWFyY2hUZXh0LCBTdHJpbmcpO1xuXG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwib3JkZXJzLlF1ZXJ5IHN0dWZmXCIpO1xuICAgICAgY29uc3Qgb3JkZXIgPSBuZXcgT3JkZXIoTWV0ZW9yKTtcblxuICAgICAgdGhpcy51bmJsb2NrKCk7XG4gICAgICBjb25zdCBvcmRlcnMgPSBvcmRlci5xdWVyeVJlY2VudE9yZGVycygpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIk9yZGVyUXVlcnkgZm9yIFBlcnNvbmlkIHNlbnQgd2l0aCBzZWFyY2ggc3RyaW5nIDogXCIuc2VhcmNoVGV4dCk7XG5cbiAgICAgIHJldHVybiBvcmRlcnM7XG4gICAgfVxuICB9KTtcblxuICBNZXRlb3IubWV0aG9kcyh7XG4gICAgXCJvcmRlcnMudXBkYXRlT3JkZXJCeU9yZGVySWRcIihjb250ZW50X29yZGVyKSB7XG4gICAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCBcIkFjY2VzcyBkZW5pZWRcIik7XG4gICAgICB9XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGNvbnRlbnRfb3JkZXIpO1xuXG4gICAgICBjaGVjayhjb250ZW50X29yZGVyLCBPYmplY3QpO1xuICAgICAgLy9jaGVjayhjb250ZW50X29yZGVyLmZpZWxkX29yZGVyaWQsIFN0cmluZyk7XG4gICAgICBsZXQgdXNlck9iaiA9IE1ldGVvci51c2Vycy5maW5kT25lKHRoaXMudXNlcklkKTtcblxuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIm9yZGVycy51cGRhdGUgc3R1ZmZcIik7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGNvbnRlbnRfb3JkZXIpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyh1c2VyT2JqKTtcblxuICAgICAgY29uc3Qgb3JkZXIgPSBuZXcgT3JkZXIoTWV0ZW9yKTtcbiAgICAgIGNvbnRlbnRfb3JkZXIubWV0YV9hY3RpbmdfdXNlciA9IHVzZXJPYmoudWlkO1xuICAgICAgdGhpcy51bmJsb2NrKCk7XG4gICAgICBjb25zdCByZXNwb25zZSA9IG9yZGVyLnVwZGF0ZU9yZGVyQnlPcmRlcklkKGNvbnRlbnRfb3JkZXIpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIkNhbGxlZCBkcnVwYWwgc2VydmljZSBhbmQgcmVjZWl2ZWQgcmVzcG9uc2VcIik7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcblxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cbiAgfSk7XG4gIE1ldGVvci5tZXRob2RzKHtcbiAgICBcIm9yZGVycy5jcmVhdGVVcGRhdGVQZXJzb25PcmRlclwiKGNvbnRlbnRfb3JkZXIpIHtcbiAgICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiQWNjZXNzIGRlbmllZFwiKTtcbiAgICAgIH1cblxuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIkNyZWF0ZSBPcmRlclwiKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coY29udGVudF9vcmRlcik7XG4gICAgICBjaGVjayhjb250ZW50X29yZGVyLCBPYmplY3QpO1xuXG4gICAgICBjb25zdCBvcmRlciA9IG5ldyBPcmRlcihNZXRlb3IpO1xuXG4gICAgICB0aGlzLnVuYmxvY2soKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gb3JkZXIuY3JlYXRlVXBkYXRlUGVyc29uT3JkZXIoY29udGVudF9vcmRlcik7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiQ2FsbGVkIGRydXBhbCBzZXJ2aWNlIGFuZCByZWNlaXZlZCByZXNwb25zZVwiKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuXG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuICB9KTtcbiAgTWV0ZW9yLm1ldGhvZHMoe1xuICAgIFwib3JkZXJzLmdldE5hbWVUeXBlc1wiKCkge1xuICAgICAgaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgICAgfVxuXG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiU2VydmVyIG9yZGVycy5nZXROYW1lVHlwZXNcIik7XG4gICAgICBjb25zdCBvcmRlciA9IG5ldyBPcmRlcihNZXRlb3IpO1xuICAgICAgdGhpcy51bmJsb2NrKCk7XG4gICAgICBjb25zdCByZXNwb25zZSA9IG9yZGVyLmdldE5hbWVUeXBlcygpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIkNhbGxlZCBkcnVwYWwgc2VydmljZSBhbmQgcmVjZWl2ZWQgTmFtZXR5cGVzXCIpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG5cbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG4gIH0pO1xuICBNZXRlb3IubWV0aG9kcyh7XG4gICAgXCJvcmRlcnMuZ2V0VGVybXNcIih0ZXJtdHlwZSkge1xuICAgICAgY2hlY2sodGVybXR5cGUsIFN0cmluZyk7XG5cbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJTZXJ2ZXIgb3JkZXJzLmdldFRlcm1zXCIpO1xuICAgICAgY29uc3Qgb3JkZXIgPSBuZXcgT3JkZXIoTWV0ZW9yKTtcbiAgICAgIHRoaXMudW5ibG9jaygpO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBvcmRlci5nZXRUZXJtcyh0ZXJtdHlwZSk7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiQ2FsbGVkIGRydXBhbCBzZXJ2aWNlIGFuZCByZWNlaXZlZCBnZXRUZXJtc1wiKTtcbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG4gIH0pO1xuICBNZXRlb3IubWV0aG9kcyh7XG4gICAgXCJvcmRlcnMucXVlcnlUZXJtc1wiKHRlcm10eXBlLCBzZWFyY2hUZXh0KSB7XG4gICAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCBcIkFjY2VzcyBkZW5pZWRcIik7XG4gICAgICB9XG4gICAgICBjaGVjayh0ZXJtdHlwZSwgU3RyaW5nKTtcbiAgICAgIGNoZWNrKHNlYXJjaFRleHQsIFN0cmluZyk7XG5cbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJTZXJ2ZXIgb3JkZXJzLnF1ZXJ5VGVybXNcIik7XG4gICAgICBjb25zdCBvcmRlciA9IG5ldyBPcmRlcihNZXRlb3IpO1xuICAgICAgdGhpcy51bmJsb2NrKCk7XG4gICAgICBjb25zdCByZXNwb25zZSA9IG9yZGVyLnF1ZXJ5VGVybXModGVybXR5cGUsIHNlYXJjaFRleHQpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIkNhbGxlZCBkcnVwYWwgc2VydmljZSBhbmQgcmVjZWl2ZWQgcXVlcnlUZXJtc1wiKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuXG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuICB9KTtcbiAgTWV0ZW9yLm1ldGhvZHMoe1xuICAgIFwib3JkZXJzLnF1ZXJ5VGVybXNDb3VudHJ5XCIoZGF0YUNvbnRleHQpIHtcbiAgICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiQWNjZXNzIGRlbmllZFwiKTtcbiAgICAgIH1cbiAgICAgIGNoZWNrKGRhdGFDb250ZXh0LCBTdHJpbmcpO1xuXG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiU2VydmVyIG9yZGVycy5xdWVyeVRlcm1zXCIpO1xuICAgICAgY29uc3Qgb3JkZXIgPSBuZXcgT3JkZXIoTWV0ZW9yKTtcbiAgICAgIHRoaXMudW5ibG9jaygpO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBvcmRlci5xdWVyeVRlcm1zQ291bnRyeShkYXRhQ29udGV4dCk7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiQ2FsbGVkIGRydXBhbCBzZXJ2aWNlIGFuZCByZWNlaXZlZCBxdWVyeVRlcm1zXCIpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG5cbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG4gIH0pO1xuICBNZXRlb3IubWV0aG9kcyh7XG4gICAgXCJvcmRlcnMucXVlcnlQZXJzb25CeUlkXCIoc2VhcmNoVGV4dCkge1xuICAgICAgaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgICAgfVxuICAgICAgY2hlY2soc2VhcmNoVGV4dCwgU3RyaW5nKTtcblxuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIlBlcnNvbi5RdWVyeSBzdHVmZlwiKTtcbiAgICAgIGNvbnN0IG9yZGVyID0gbmV3IE9yZGVyKE1ldGVvcik7XG5cbiAgICAgIHRoaXMudW5ibG9jaygpO1xuICAgICAgY29uc3Qgb3JkZXJzID0gb3JkZXIucXVlcnlQZXJzb25CeUlkKHNlYXJjaFRleHQpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcInF1ZXJ5UGVyc29uQnlJZCBzZW50IHdpdGggc2VhcmNoIHN0cmluZyA6IFwiLnNlYXJjaFRleHQpO1xuXG4gICAgICByZXR1cm4gb3JkZXJzO1xuICAgIH1cbiAgfSk7XG4gIE1ldGVvci5tZXRob2RzKHtcbiAgICBcIm9yZGVycy5xdWVyeVBlcnNvblwiKHNlYXJjaFRleHQsIG1ldGEpIHtcbiAgICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiQWNjZXNzIGRlbmllZFwiKTtcbiAgICAgIH1cbiAgICAgIGNoZWNrKHNlYXJjaFRleHQsIFN0cmluZyk7XG4gICAgICBjaGVjayhtZXRhLCBTdHJpbmcpO1xuXG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiUGVyc29uLlF1ZXJ5IHN0dWZmXCIpO1xuICAgICAgY29uc3Qgb3JkZXIgPSBuZXcgT3JkZXIoTWV0ZW9yKTtcblxuICAgICAgdGhpcy51bmJsb2NrKCk7XG4gICAgICBjb25zdCBvcmRlcnMgPSBvcmRlci5xdWVyeVBlcnNvbihzZWFyY2hUZXh0LCBtZXRhKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJxdWVyeVBlcnNvbiBzZW50IHdpdGggc2VhcmNoIHN0cmluZyA6IFwiLnNlYXJjaFRleHQpO1xuXG4gICAgICByZXR1cm4gb3JkZXJzO1xuICAgIH1cbiAgfSk7XG4gIE1ldGVvci5tZXRob2RzKHtcbiAgICBcIm9yZGVycy5xdWVyeVBlcnNvbkFkdmFuY2VkXCIoc2VhcmNoVGV4dCkge1xuICAgICAgaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgICAgfVxuICAgICAgY2hlY2soc2VhcmNoVGV4dCwgU3RyaW5nKTtcblxuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIlBlcnNvbi5RdWVyeSBzdHVmZlwiKTtcbiAgICAgIGNvbnN0IG9yZGVyID0gbmV3IE9yZGVyKE1ldGVvcik7XG5cbiAgICAgIHRoaXMudW5ibG9jaygpO1xuICAgICAgY29uc3Qgb3JkZXJzID0gb3JkZXIucXVlcnlQZXJzb25BZHZhbmNlZChzZWFyY2hUZXh0KTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJxdWVyeVBlcnNvbiBzZW50IHdpdGggc2VhcmNoIHN0cmluZyA6IFwiLnNlYXJjaFRleHQpO1xuXG4gICAgICByZXR1cm4gb3JkZXJzO1xuICAgIH1cbiAgfSk7XG4gIE1ldGVvci5tZXRob2RzKHtcbiAgICBcIm9yZGVycy5xdWVyeVJvbGVBZHZhbmNlZFwiKHNlYXJjaFRleHQsIHF1ZXJ5Um9sZXMpIHtcbiAgICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiQWNjZXNzIGRlbmllZFwiKTtcbiAgICAgIH1cbiAgICAgIGNoZWNrKHNlYXJjaFRleHQsIFN0cmluZyk7XG4gICAgICBjaGVjayhxdWVyeVJvbGVzLCBPYmplY3QpO1xuXG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiUGVyc29uLlF1ZXJ5IHN0dWZmXCIpO1xuICAgICAgY29uc3Qgb3JkZXIgPSBuZXcgT3JkZXIoTWV0ZW9yKTtcblxuICAgICAgdGhpcy51bmJsb2NrKCk7XG4gICAgICBjb25zdCBvcmRlcnMgPSBvcmRlci5xdWVyeVJvbGVBZHZhbmNlZChzZWFyY2hUZXh0LCBxdWVyeVJvbGVzKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJxdWVyeVBlcnNvbiBzZW50IHdpdGggc2VhcmNoIHN0cmluZyA6IFwiLnNlYXJjaFRleHQpO1xuXG4gICAgICByZXR1cm4gb3JkZXJzO1xuICAgIH1cbiAgfSk7XG4gIE1ldGVvci5tZXRob2RzKHtcbiAgICBcIm9yZGVycy5saXZlc3RyZWFtXCIoc2VhcmNoVGV4dCkge1xuICAgICAgaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgICAgfVxuICAgICAgY2hlY2soc2VhcmNoVGV4dCwgU3RyaW5nKTtcbiAgICAgIC8vbGV0IHVzZXJPYmogPSBNZXRlb3IudXNlcnMuZmluZE9uZSh0aGlzLnVzZXJJZCk7XG5cbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJMaXZlc3RyZWFtIGNoZWNrXCIpO1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyh0aGlzLnVzZXJJZCk7XG4gICAgICAvL0RFRkNPTjMgJiYgY29uc29sZS5sb2codXNlck9iaik7XG5cblxuICAgICAgY29uc3Qgb3JkZXIgPSBuZXcgT3JkZXIoTWV0ZW9yKTtcblxuICAgICAgdGhpcy51bmJsb2NrKCk7XG4gICAgICBjb25zdCBvcmRlcnMgPSBvcmRlci5saXZlc3RyZWFtKHNlYXJjaFRleHQpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcImxpdmVzdHJlYW0gc2VudCB3aXRoIHNlYXJjaCBzdHJpbmcgOiBcIi5zZWFyY2hUZXh0KTtcblxuICAgICAgcmV0dXJuIG9yZGVycztcbiAgICB9XG4gIH0pO1xuICBNZXRlb3IubWV0aG9kcyh7XG4gICAgXCJvcmRlcnMubW90aGVyY2hlY2tzXCIoKSB7XG4gICAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCBcIkFjY2VzcyBkZW5pZWRcIik7XG4gICAgICB9XG4gICAgICAvL2NoZWNrKHNlYXJjaFRleHQsIFN0cmluZyk7XG4gICAgICAvL2xldCB1c2VyT2JqID0gTWV0ZW9yLnVzZXJzLmZpbmRPbmUodGhpcy51c2VySWQpO1xuXG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwibW90aGVyY2hlY2tzIGNoZWNrXCIpO1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyh0aGlzLnVzZXJJZCk7XG4gICAgICAvL0RFRkNPTjMgJiYgY29uc29sZS5sb2codXNlck9iaik7XG5cblxuICAgICAgY29uc3Qgb3JkZXIgPSBuZXcgT3JkZXIoTWV0ZW9yKTtcblxuICAgICAgdGhpcy51bmJsb2NrKCk7XG4gICAgICBjb25zdCBvcmRlcnMgPSBvcmRlci5tb3RoZXJjaGVja3MoKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJtb3RoZXJjaGVja3Mgc2VudFwiKTtcblxuICAgICAgcmV0dXJuIG9yZGVycztcbiAgICB9XG4gIH0pO1xuICBNZXRlb3IubWV0aG9kcyh7XG4gICAgXCJvcmRlcnMucHJvY2Vzc1wiKHF1ZXJ5KSB7XG4gICAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCBcIkFjY2VzcyBkZW5pZWRcIik7XG4gICAgICB9XG4gICAgICBjaGVjayhxdWVyeSwgT2JqZWN0KTtcblxuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIk9yZGVyIFByb2Nlc3MgU2VydmVyU2lkZVwiKTtcbiAgICAgIGNvbnN0IG9yZGVyID0gbmV3IE9yZGVyKE1ldGVvcik7XG5cbiAgICAgIHRoaXMudW5ibG9jaygpO1xuICAgICAgY29uc3Qgb3JkZXJzID0gb3JkZXIucHJvY2VzcyhxdWVyeSk7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiUHJvY2VzcyBPcmRlciBSZXF1ZXN0OiBcIik7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKHF1ZXJ5KTtcblxuICAgICAgcmV0dXJuIG9yZGVycztcbiAgICB9XG4gIH0pO1xuICBNZXRlb3IubWV0aG9kcyh7XG4gICAgXCJvcmRlcnMucXVlcnlPcmRlclN0YXRlXCIoc3RhdGUsIGxpbWl0KSB7XG4gICAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCBcIkFjY2VzcyBkZW5pZWRcIik7XG4gICAgICB9XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiUXVlcnkgT3JkZXJzdGF0ZVwiKTtcblxuICAgICAgY2hlY2soc3RhdGUsIFN0cmluZyk7XG4gICAgICBjaGVjayhsaW1pdCwgU3RyaW5nKTtcblxuICAgICAgY29uc3Qgb3JkZXIgPSBuZXcgT3JkZXIoTWV0ZW9yKTtcblxuICAgICAgdGhpcy51bmJsb2NrKCk7XG4gICAgICBjb25zdCBvcmRlcnMgPSBvcmRlci5xdWVyeU9yZGVyU3RhdGUoc3RhdGUsIGxpbWl0KTtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJzdGF0ZSwgbGltaXQ6IFwiKTtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coc3RhdGUpO1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhsaW1pdCk7XG5cbiAgICAgIHJldHVybiBvcmRlcnM7XG4gICAgfVxuICB9KTtcbn1cbiIsImltcG9ydCB7IE1ldGVvciB9IGZyb20gXCJtZXRlb3IvbWV0ZW9yXCI7XG5pbXBvcnQgeyBjaGVjaywgTWF0Y2ggfSBmcm9tIFwibWV0ZW9yL2NoZWNrXCI7XG5pbXBvcnQgT3JkZXIgZnJvbSBcIi4uL2xpYi9vcmRlci5qc1wiO1xuaW1wb3J0IHsgUGVyc29ucywgU2VhcmNoTG9nIH0gZnJvbSBcIi9saWIvY29sbGVjdGlvbnNcIjtcblxuaW1wb3J0IHtcbiAgREVGQ09OOSxcbiAgREVGQ09ONyxcbiAgREVGQ09ONSxcbiAgREVGQ09ONCxcbiAgREVGQ09OMyxcbiAgREVGQ09OMixcbiAgREVGQ09OMVxufSBmcm9tIFwiL2RlYnVnLmpzb25cIjtcbmltcG9ydCBDb25zdGFudHMgZnJvbSBcIi9saWIvY29uc3RhbnRzXCI7XG5cbkRFRkNPTjUgJiYgY29uc29sZS5sb2coXCJJbiBTZWFyY2ggc2VydmVyIHBhcnRcIik7XG5cbi8qKlxuICogcXVlcnk6XG4ge1xuICAgICAgZmlyc3ROYW1lOiBcIlwiLFxuICAgICAgbGFzdE5hbWU6IFwiXCIsXG4gICAgICBzc25OdW1iZXI6IFwiXCIsXG4gICAgICB5ZWFyOiBcIlwiLFxuICAgICAgbW9udGg6IFwiXCIsXG4gICAgICBkYXk6IFwiXCIsXG4gICAgICBmaWVsZF9wZXBfY291bnRyaWVzX2xpc3QsXG4gICAgICBmaWVsZF9wZXBcbiAgICAgIGZpZWxkX3JjYVxuXG59XG4gKiovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICBNZXRlb3IubWV0aG9kcyh7XG4gICAgXCJzZWFyY2guZmluZFBlcnNvblwiKHF1ZXJ5KSB7XG4gICAgICBjaGVjayhxdWVyeSwgT2JqZWN0KTtcbiAgICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiQWNjZXNzIGRlbmllZFwiKTtcbiAgICAgIH1cbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJzZWFyY2guZmluZFBlcnNvbiBcIik7XG5cbiAgICAgIGxldCBkYlF1ZXJ5ID0ge307XG5cbiAgICAgIGNvbnN0IG5hbWVFbGVtTWF0Y2ggPSB7IE5hbWVUeXBlOiBcIlByaW3DpHJ0IG5hbW5cIiB9O1xuICAgICAgLy8gY29uc3QgclN0YXJ0ID0gLy4qXFxiLztcbiAgICAgIC8vY29uc3QgckVuZCA9IC9cXGIvO1xuICAgICAgLy8gY29uc3QgclN0YXJ0ID0gL14vO1xuICAgICAgLy9jb25zdCByRW5kID0gLyQvO1xuICAgICAgY29uc3QgclN0YXJ0ID0gL1xcQS87XG4gICAgICBjb25zdCByU3RhcnRMYXN0TmFtZSA9IC9cXGIvO1xuICAgICAgLy9jb25zdCByRW5kID0gL1xcWi4qLztcbiAgICAgIC8vY29uc3QgclN0YXJ0ID0gL1xcYi87XG4gICAgICBjb25zdCByRW5kID0gL1xcYi87XG4gICAgICBpZiAocXVlcnkuZmlyc3ROYW1lKSB7XG4gICAgICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICByU3RhcnQuc291cmNlICsgcXVlcnkuZmlyc3ROYW1lLnRvTG93ZXJDYXNlKCkudHJpbSgpICsgckVuZC5zb3VyY2UsXG4gICAgICAgICAgXCJpXCJcbiAgICAgICAgKTtcbiAgICAgICAgREVGQ09OMyAmJlxuICAgICAgICAgIGNvbnNvbGUuZGlyKFxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgICAgIHJTdGFydC5zb3VyY2UgKyBxdWVyeS5maXJzdE5hbWUudG9Mb3dlckNhc2UoKS50cmltKCkgKyByRW5kLnNvdXJjZVxuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICAgIG5hbWVFbGVtTWF0Y2hbXCJGaXJzdE5hbWVcIl0gPSB7ICRyZWdleDogcmVnZXggfTtcbiAgICAgIH1cblxuICAgICAgaWYgKHF1ZXJ5Lmxhc3ROYW1lKSB7XG4gICAgICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICByU3RhcnRMYXN0TmFtZS5zb3VyY2UgKyBxdWVyeS5sYXN0TmFtZS50b0xvd2VyQ2FzZSgpICsgckVuZC5zb3VyY2UsXG4gICAgICAgICAgXCJpXCJcbiAgICAgICAgKTtcbiAgICAgICAgbmFtZUVsZW1NYXRjaFtcIkxhc3ROYW1lXCJdID0geyAkcmVnZXg6IHJlZ2V4IH07XG4gICAgICAgIERFRkNPTjMgJiZcbiAgICAgICAgICBjb25zb2xlLmRpcihcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KFxuICAgICAgICAgICAgICByU3RhcnQuc291cmNlICsgcXVlcnkubGFzdE5hbWUudG9Mb3dlckNhc2UoKSArIHJFbmQuc291cmNlXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmRpcihKU09OLnN0cmluZ2lmeShuYW1lRWxlbU1hdGNoKSk7XG5cbiAgICAgIGRiUXVlcnlbXCJOYW1lc1wiXSA9IHsgJGVsZW1NYXRjaDogbmFtZUVsZW1NYXRjaCB9O1xuXG4gICAgICBpZiAocXVlcnkuZmllbGRfcGVwID09PSBmYWxzZSB8fCBxdWVyeS5maWVsZF9wZXAgPT09IDApIHtcbiAgICAgICAgZGJRdWVyeVtcIlBFUFwiXSA9IFwiMFwiO1xuICAgICAgfVxuXG4gICAgICBpZiAocXVlcnkuZmllbGRfcmNhID09PSBmYWxzZSB8fCBxdWVyeS5maWVsZF9yY2EgPT09IDApIHtcbiAgICAgICAgZGJRdWVyeVtcIlJDQVwiXSA9IFwiMFwiO1xuICAgICAgfVxuXG4gICAgICBpZiAocXVlcnkueWVhcikge1xuICAgICAgICBkYlF1ZXJ5W1wiQmlydGhEYXRlWWVhclwiXSA9IHF1ZXJ5LnllYXI7XG4gICAgICB9XG5cbiAgICAgIGlmIChxdWVyeS5tb250aCkge1xuICAgICAgICBkYlF1ZXJ5W1wiQmlydGhEYXRlTW9udGhcIl0gPSBxdWVyeS5tb250aDtcbiAgICAgIH1cblxuICAgICAgaWYgKHF1ZXJ5LmRheSkge1xuICAgICAgICBkYlF1ZXJ5W1wiQmlydGhEYXRlRGF5XCJdID0gcXVlcnkuZGF5O1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIEFycmF5LmlzQXJyYXkocXVlcnkuZmllbGRfcGVwX2NvdW50cmllc19saXN0KSAmJlxuICAgICAgICBxdWVyeS5maWVsZF9wZXBfY291bnRyaWVzX2xpc3QubGVuZ3RoID4gMFxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkQ291bnRyaWVzID0gcXVlcnkuZmllbGRfcGVwX2NvdW50cmllc19saXN0XG4gICAgICAgICAgLmZpbHRlcihcbiAgICAgICAgICAgIChpdGVtLCBpbmRleCkgPT5cbiAgICAgICAgICAgICAgcXVlcnkuZmllbGRfcGVwX2NvdW50cmllc19saXN0W2luZGV4XSAmJlxuICAgICAgICAgICAgICBxdWVyeS5maWVsZF9wZXBfY291bnRyaWVzX2xpc3RbaW5kZXhdLnNlbGVjdGVkID09PSB0cnVlXG4gICAgICAgICAgKVxuICAgICAgICAgIC5tYXAoaXRlbSA9PiBpdGVtLm5hbWUpO1xuXG4gICAgICAgIGRiUXVlcnlbXCJQRVBDb3VudHJpZXMuUEVQQ291bnRyeU5hbWVcIl0gPSB7ICRpbjogZmlsdGVyZWRDb3VudHJpZXMgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vbm8gcmVzdWx0cyBpZiBubyBjb3VudHJpZXMgc2VsZWN0ZWRcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuXG4gICAgICBsZXQgc2VhcmNoQnlTU04gPSBmYWxzZTtcblxuICAgICAgaWYgKHF1ZXJ5LnNzbk51bWJlcikge1xuICAgICAgICAvL3RoZSByZXN0IGRvZXNuJ3QgbWF0dGVyIGlmIHdlIHVzZSBzc25cbiAgICAgICAgZGJRdWVyeSA9IHsgXCJTU05zLkN1cnJlbnRTU05cIjogcXVlcnkuc3NuTnVtYmVyIH07XG4gICAgICAgIHNlYXJjaEJ5U1NOID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKE9iamVjdC5rZXlzKGRiUXVlcnkpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG5cbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJEZWJRdWVyeVwiKTtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5kaXIoSlNPTi5zdHJpbmdpZnkoZGJRdWVyeSkpO1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmRpcihkYlF1ZXJ5KTtcblxuICAgICAgY29uc3QgcmVzdWx0ID0gUGVyc29ucy5maW5kKGRiUXVlcnkpLmZldGNoKCk7XG5cbiAgICAgIFNlYXJjaExvZy5pbnNlcnQoe1xuICAgICAgICBVc2VySWQ6IHRoaXMudXNlcklkLFxuICAgICAgICBEYXRlVGltZTogbmV3IERhdGUoKSxcbiAgICAgICAgUmVzdWx0c1JldHVybmVkOiByZXN1bHQubGVuZ3RoID4gMFxuICAgICAgfSk7XG5cbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJzZWFyY2guZmluZFBlcnNvbiBkb25lIHlvXCIpO1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShkYlF1ZXJ5KSk7XG4gICAgICByZXR1cm4geyBsaXN0OiByZXN1bHQsIHNlYXJjaEJ5U1NOIH07XG4gICAgfVxuICB9KTtcbn1cbiIsImltcG9ydCB7IE1ldGVvciB9IGZyb20gXCJtZXRlb3IvbWV0ZW9yXCI7XG5pbXBvcnQgeyBjaGVjaywgTWF0Y2ggfSBmcm9tIFwibWV0ZW9yL2NoZWNrXCI7XG5pbXBvcnQgZmV0Y2ggZnJvbSBcIm5vZGUtZmV0Y2hcIjtcbmltcG9ydCB7XG4gIERFRkNPTjksXG4gIERFRkNPTjcsXG4gIERFRkNPTjUsXG4gIERFRkNPTjQsXG4gIERFRkNPTjMsXG4gIERFRkNPTjIsXG4gIERFRkNPTjEsXG59IGZyb20gXCIvZGVidWcuanNvblwiO1xuXG5leHBvcnQgZGVmYXVsdCAgZnVuY3Rpb24gKCkge1xuICBNZXRlb3IubWV0aG9kcyh7XG4gICAgXCJzeWNvcmF4LmR5bmFtaWMuYXN5bmNcIjogZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgIGNoZWNrKGNvbnRleHQsIFN0cmluZyk7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwic3ljb3JheC5keW5hbWljLmFzeW5jXCIpO1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhjb250ZXh0KTtcblxuICAgICAgLy8gQXNzdW1pbmcgXCJwcm9jZXNzTGRhcExvZ2luXCIgZXhpc3RzIHNvbWV3aGVyZSBlbHNlIC4uLlxuICAgICAgdmFyIF9kb0ZldGNoU3luYyA9IE1ldGVvci53cmFwQXN5bmMoX2RvRmV0Y2gyKTtcbiAgICAgIHZhciBkYXRhID0gX2RvRmV0Y2goY29udGV4dCk7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiUmVwbHkgZGF0YSB0byBIb3N0XCIpO1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0sXG4gICAgXCJzeWNvcmF4LmR5bmFtaWNcIihjb250ZXh0KSB7XG4gICAgICAvLyBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICAvLyAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCBcIkFjY2VzcyBkZW5pZWRcIik7XG4gICAgICAvLyB9XG4gICAgICBjaGVjayhjb250ZXh0LCBTdHJpbmcpO1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcInN5Y29yYXguZHluYW1pY1wiKTtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coY29udGV4dCk7XG5cbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJNYWtpbmcgcmVxdWVzdCB0byBTeWNvcmF4XCIpO1xuICAgICAgIF9kb0ZldGNoKGNvbnRleHQpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIlJlcGx5IGRhdGEgdG8gSG9zdFwiKTtcbiAgICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9KTtcblxuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIkRpZCB0aGUgcmVxdWVzdCB0byBTeWNvcmF4XCIpO1xuICAgIH0sXG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBfZG9GZXRjaCh1cmwpIHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwpO1xuICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICByZXR1cm4gZGF0YTtcbn1cblxuZnVuY3Rpb24gX2RvRmV0Y2gyKGNvbnRleHQpIHtcbiAgZmV0Y2goY29udGV4dCwge30pXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJSZXBseSBkYXRhXCIpO1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0pO1xufVxuIiwiaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSBcIm1ldGVvci9tZXRlb3JcIjtcbmltcG9ydCB7IGNoZWNrIH0gZnJvbSBcIm1ldGVvci9jaGVja1wiO1xuaW1wb3J0IHsgU3lzdGVtQ29uZmlnIH0gZnJvbSBcIi9saWIvY29sbGVjdGlvbnNcIjtcbmltcG9ydCB7XG4gIERFRkNPTjksXG4gIERFRkNPTjcsXG4gIERFRkNPTjUsXG4gIERFRkNPTjQsXG4gIERFRkNPTjMsXG4gIERFRkNPTjIsXG4gIERFRkNPTjEsXG59IGZyb20gXCIvZGVidWcuanNvblwiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBNZXRlb3IubWV0aG9kcyh7XG4gICAgXCJzeXN0ZW1jb25maWcuZ2V0XCIoa2V5KSB7XG4gICAgICBjaGVjayhrZXksIFN0cmluZyk7IC8vIENvcnJlY3RlZCB0byBjaGVjayB0aGUgJ2tleScgcGFyYW1ldGVyXG5cbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJNZXRob2Qgc3lzdGVtY29uZmlnLmdldFwiKTtcblxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBTeXN0ZW1Db25maWcuZmluZE9uZSh7IF9pZDoga2V5IH0pO1xuICAgICAgLy8gaWYgdGhlcmUgaXMgbm8gcmVzcG9uc2UgdGhlIGtleSBpcyBub3QgZm91bmIgYnV0IHdlIGRvbid0IHRocm93IGFuIGVycm9yIGp1c3QgcmV0dXJuIG51bGxcblxuICAgICAgaWYgKCFyZXNwb25zZSkge1xuICAgICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGBObyBzeXN0ZW0gY29uZmlnIGZvdW5kIHdpdGgga2V5OiAke2tleX1gKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0sXG4gICAgXCJzeXN0ZW1jb25maWcucHV0XCIoa2V5LCBmaWVsZHNUb1VwZGF0ZSkge1xuICAgICAgY2hlY2soa2V5LCBTdHJpbmcpO1xuICAgICAgY2hlY2soZmllbGRzVG9VcGRhdGUsIE9iamVjdCk7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwic3lzdGVtY29uZmlnLnB1dFwiKTtcblxuICAgICAgaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKFxuICAgICAgICAgIDQwMSxcbiAgICAgICAgICBcIllvdSBtdXN0IGJlIGxvZ2dlZCBpbiB0byB1cGRhdGUgc3lzdGVtIGNvbmZpZ1wiXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIC8vIHVzZXIgYW5kIHdoZW4gdGhlIHJlY29yZCB3YXMgdXBkYXRlZFxuICAgICAgZmllbGRzVG9VcGRhdGUudXBkYXRlZEJ5ID0gdGhpcy51c2VySWQ7XG4gICAgICBmaWVsZHNUb1VwZGF0ZS51cGRhdGVkQXQgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICAvLyBVc2luZyB0aGUgdXBzZXJ0IG9wdGlvblxuICAgICAgY29uc3QgcmVzdWx0ID0gU3lzdGVtQ29uZmlnLnVwZGF0ZShcbiAgICAgICAgeyBfaWQ6IGtleSB9LFxuICAgICAgICB7ICRzZXQ6IGZpZWxkc1RvVXBkYXRlIH0sXG4gICAgICAgIHsgdXBzZXJ0OiB0cnVlIH0gLy8gVGhpcyBpcyB0aGUga2V5IGNoYW5nZVxuICAgICAgKTtcblxuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICBpZiAocmVzdWx0Lmluc2VydGVkSWQpIHtcbiAgICAgICAgICBERUZDT041ICYmXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgYE5ldyBzeXN0ZW0gY29uZmlnIGNyZWF0ZWQgd2l0aCBJRDogJHtyZXN1bHQuaW5zZXJ0ZWRJZH1gXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIERFRkNPTjUgJiZcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICBgU3lzdGVtIGNvbmZpZyB1cGRhdGVkLiBOdW1iZXIgb2YgZG9jdW1lbnRzIGFmZmVjdGVkOiAke3Jlc3VsdC5udW1iZXJBZmZlY3RlZH1gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKFxuICAgICAgICAgIFwidXBkYXRlLWZhaWxlZFwiLFxuICAgICAgICAgIFwiRmFpbGVkIHRvIHVwZGF0ZSBvciBpbnNlcnQgc3lzdGVtIGNvbmZpZ1wiXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHQ7IC8vIFJldHVybnMgdGhlIHJlc3VsdCBvZiB0aGUgdXBkYXRlIG9wZXJhdGlvblxuICAgIH0sXG4gIH0pO1xufVxuIiwiaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSBcIm1ldGVvci9tZXRlb3JcIjtcbmltcG9ydCB7IGNoZWNrIH0gZnJvbSBcIm1ldGVvci9jaGVja1wiO1xuLy8gaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IFJhbmRvbSB9IGZyb20gXCJtZXRlb3IvcmFuZG9tXCI7XG5pbXBvcnQge1xuICBERUZDT045LFxuICBERUZDT043LFxuICBERUZDT041LFxuICBERUZDT040LFxuICBERUZDT04zLFxuICBERUZDT04yLFxuICBERUZDT04xLFxufSBmcm9tIFwiL2RlYnVnLmpzb25cIjtcbmltcG9ydCB7IFdvcmtPcmRlcnMgfSBmcm9tIFwiL2xpYi9jb2xsZWN0aW9uc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIE1ldGVvci5tZXRob2RzKHtcbiAgICBhc3luYyBcIndvcmtvcmRlci5uZXdcIihjdXN0b21lck9yZGVySWQsIHdvcmtvcmRlcmNsYXNzLCBwYXlsb2FkKSB7XG4gICAgICBjaGVjayhjdXN0b21lck9yZGVySWQsIFN0cmluZyk7XG4gICAgICBjaGVjayh3b3Jrb3JkZXJjbGFzcywgU3RyaW5nKTtcbiAgICAgIGNoZWNrKHBheWxvYWQsIE9iamVjdCk7XG5cbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJ3b3Jrb3JkZXIubmV3XCIpO1xuXG4gICAgICBjb25zdCBkb1dvcmsgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIC8vIGNyZWF0ZSBhIG5ldyBtb25nbyBkb2N1bWVudCB3aXRoIHRoZSBwYXlsb2FkIGFuZCB0aGUgd29ya29yZGVyY2xhc3NcbiAgICAgICAgLy8gYWxzbyBjcmVhdGUgYSByZWFkYWJsZSB3b3Jrb3JkZXJJZCBjcmVhdGVkIGJ5IHl5eXltbWRkaGhtbXNzICsgdGhlIGZpcnN0IDQgY2hhcnMgb2YgdGhlIHdvcmtvcmRlcmNsYXNzXG4gICAgICAgIC8vIHVzZSB0aGUgd29ya29yZGVySWQgYXMgdGhlIF9pZCBvZiB0aGUgbW9uZ28gZG9jdW1lbnRcbiAgICAgICAgLy8gcmV0dXJuIHRoZSB3b3Jrb3JkZXJJZFxuXG4gICAgICAgIC8vIGZpcnN0IG1ha2UgdGhlIHdvcmtvcmVkZXIgaWQgc3RyaW5nXG5cblxuICAgICAgICAvLyBnZXQgYWdlbnQgaW5mb3JtYXRpb24gZnJvbSBjb2xsZWN0aW9uIGJpbF9hZ2VudCBiYXNlZCBvbiBjdXN0b21lcklkIGluIHRoZSBwYXlsb2FkXG4gICAgICAgIGxldCBxdWVyeSA9IHtcbiAgICAgICAgICBfaWQ6IHBheWxvYWQuY3VzdG9tZXJJZCxcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgd29ya29yZGVySWQgPVxuICAgICAgICAgIG5ldyBEYXRlKClcbiAgICAgICAgICAgIC50b0lTT1N0cmluZygpXG4gICAgICAgICAgICAucmVwbGFjZSgvW14wLTldL2csIFwiXCIpXG4gICAgICAgICAgICAuc3Vic3RyaW5nKDAsIDE0KSArIHdvcmtvcmRlcmNsYXNzLnN1YnN0cmluZygwLCA2KTtcblxuICAgICAgICAvLyBub3cgY3JlYXRlIHRoZSBtb25nbyBkb2N1bWVudFxuICAgICAgICBsZXQgd29ya29yZGVyID0ge1xuICAgICAgICAgIF9pZDogd29ya29yZGVySWQsXG4gICAgICAgICAgY29udGVudElkOiBjdXN0b21lck9yZGVySWQsXG4gICAgICAgICAgd29ya29yZGVyY2xhc3M6IHdvcmtvcmRlcmNsYXNzLFxuICAgICAgICAgIHBheWxvYWQ6IHBheWxvYWQsXG4gICAgICAgICAgc3RhdHVzOiAxMDAwLFxuICAgICAgICAgIGNyZWF0ZWQ6IG5ldyBEYXRlKCksXG4gICAgICAgICAgbW9kaWZpZWQ6IG5ldyBEYXRlKCksXG4gICAgICAgICAgY3JlYXRlZEJ5OiBNZXRlb3IudXNlcklkKCksXG4gICAgICAgICAgbW9kaWZpZWRCeTogTWV0ZW9yLnVzZXJJZCgpLFxuICAgICAgICB9O1xuXG4gICAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2cod29ya29yZGVyKTtcblxuICAgICAgICAvLyBub3cgaW5zZXJ0IHRoZSBkb2N1bWVudFxuICAgICAgICBsZXQgcmVzdWx0ID0gV29ya09yZGVycy5pbnNlcnQod29ya29yZGVyKTtcblxuICAgICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwid29ya29yZGVyLm5ldyByZXN1bHQ6IFwiKTtcbiAgICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhyZXN1bHQpO1xuXG4gICAgICAgIC8vIG5vdyByZXR1cm4gdGhlIHdvcmtvcmRlcklkXG4gICAgICAgIHJldHVybiB3b3Jrb3JkZXJJZDtcbiAgICAgIH07XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBhd2FpdCBkb1dvcmsoKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcihlLmVycm9yLCBlLnJlYXNvbik7XG4gICAgICB9XG4gICAgfSxcbiAgfSk7XG59XG4iLCJpbXBvcnQge01ldGVvcn0gZnJvbSAnbWV0ZW9yL21ldGVvcic7XG5pbXBvcnQge2NoZWNrfSBmcm9tICdtZXRlb3IvY2hlY2snO1xuaW1wb3J0IHtcbiAgREVGQ09OOSxcbiAgREVGQ09ONyxcbiAgREVGQ09ONSxcbiAgREVGQ09ONCxcbiAgREVGQ09OMyxcbiAgREVGQ09OMixcbiAgREVGQ09OMVxufSBmcm9tIFwiL2RlYnVnLmpzb25cIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICBNZXRlb3IucHVibGlzaCgndXNlcnMuYWxsJywgZnVuY3Rpb24oKSB7XG4gICAgaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsICdBY2Nlc3MgZGVuaWVkJyk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2VsZWN0b3IgPSB7XG4gICAgICBzdGF0dXM6ICdhY3RpdmUnXG4gICAgfTtcbiAgICBjb25zdCBvcHRpb25zID0ge307XG4gICAgY29uc3QgcmVzcG9uc2UgPSBNZXRlb3IudXNlcnMuZmluZChzZWxlY3Rvciwgb3B0aW9ucyk7XG4gICAgLy8gREVGQ09ONSAmJiBjb25zb2xlLmxvZygnVXNlcnMuQ29sbGVjdGlvbicpO1xuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSk7XG5cbiAgTWV0ZW9yLnB1Ymxpc2goJ3VzZXJzLnNpbmdsZScsIGZ1bmN0aW9uKF9pZCkge1xuICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCAnQWNjZXNzIGRlbmllZCcpO1xuICAgIH1cbiAgICBjaGVjayhfaWQsIFN0cmluZyk7XG4gICAgY29uc3Qgc2VsZWN0b3IgPSB7XG4gICAgICBfaWQsXG4gICAgICBzdGF0dXM6ICdhY3RpdmUnXG4gICAgfTtcbiAgICBjb25zdCByZXNwb25zZSA9IE1ldGVvci51c2Vycy5maW5kKHNlbGVjdG9yKTtcbiAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZygnVXNlcnMuU2luZ2xlJyk7XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9KTtcblxuICBNZXRlb3IucHVibGlzaCgndXNlcnMuc2luZ2xlLnVpZCcsIGZ1bmN0aW9uKHVpZCkge1xuICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCAnQWNjZXNzIGRlbmllZCcpO1xuICAgIH1cbiAgICBjaGVjayh1aWQsIFN0cmluZyk7XG4gICAgY29uc3Qgc2VsZWN0b3IgPSB7XG4gICAgICB1aWRcbiAgICB9O1xuICAgIGNvbnN0IHJlc3BvbnNlID0gTWV0ZW9yLnVzZXJzLmZpbmQoc2VsZWN0b3IpO1xuICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKCdVc2Vycy5TaW5nbGUuVWlkJyk7XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9KTtcblxuICBNZXRlb3IucHVibGlzaCgndXNlcnMuY3VycmVudCcsIGZ1bmN0aW9uKCkge1xuICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCAnQWNjZXNzIGRlbmllZCcpO1xuICAgIH1cbiAgICAvLyBjaGVjayhfaWQsIFN0cmluZyk7XG4gICAgLy8gaWYgKHRoaXMudXNlcklkKSB7XG4gICAgY29uc3Qgc2VsZWN0b3IgPSB7XG4gICAgICBfaWQ6IHRoaXMudXNlcklkXG4gICAgfTtcbiAgICBjb25zdCByZXNwb25zZSA9IE1ldGVvci51c2Vycy5maW5kKHNlbGVjdG9yKTtcbiAgICAvLyAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyAoJ3B1Ymxpc2ggdXNlcnMuY3VycmVudCBfaWQnLCBfaWQpO1xuICAgIC8vICBERUZDT041ICYmIGNvbnNvbGUubG9nICgncHVibGlzaCB1c2Vycy5jdXJyZW50IHRoaXMudXNlcklkJywgdGhpcy51c2VySWQpO1xuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBNZXRlb3IgfSBmcm9tIFwibWV0ZW9yL21ldGVvclwiO1xuaW1wb3J0IHsgY2hlY2sgfSBmcm9tIFwibWV0ZW9yL2NoZWNrXCI7XG5pbXBvcnQgeyBBZ2VudHMsIEFnZW50VXNlckNvbm5lY3Rpb25zIH0gZnJvbSBcIi9saWIvY29sbGVjdGlvbnNcIjtcbmltcG9ydCB7IE1vbmdvIH0gZnJvbSBcIm1ldGVvci9tb25nb1wiO1xuXG5pbXBvcnQge1xuICBERUZDT045LFxuICBERUZDT043LFxuICBERUZDT041LFxuICBERUZDT040LFxuICBERUZDT04zLFxuICBERUZDT04yLFxuICBERUZDT04xLFxufSBmcm9tIFwiL2RlYnVnLmpzb25cIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIlNldHRpbmcgdXAgQWdlbnQgc3R1ZmZcIik7XG5cbiAgTWV0ZW9yLnB1Ymxpc2goXCJhZ2VudHMuZm9yLnVzZXJcIiwgZnVuY3Rpb24gKHVzZXJJZCkge1xuICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJJbiBhZ2VudCAgc3Vic2NyaWJlIGZ1bmN0aW9uXCIpO1xuICAgIGNoZWNrKHVzZXJJZCwgU3RyaW5nKTtcbiAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgIH1cbiAgICB0aGlzLmF1dG9ydW4oZnVuY3Rpb24gKGNvbXB1dGF0aW9uKSB7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiU3Vic2NyaWJpbmcgYWdlbnRcIik7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiU2VhcmNoaW5nIGZvciBhZ2VudHMgZm9yIHVzZXIgXCIgKyB1c2VySWQpO1xuXG4gICAgICBjb25zdCBTZWxlY3RvciA9IHtcbiAgICAgICAgdXNlcl9pZDogdXNlcklkLFxuICAgICAgfTtcblxuICAgICAgbGV0IGFnZW50c19jb25uZWN0aW9ucyA9IEFnZW50VXNlckNvbm5lY3Rpb25zLmZpbmQoU2VsZWN0b3IpO1xuICAgICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIkFnZW50IGxpc3RcIik7XG5cbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coYWdlbnRzX2Nvbm5lY3Rpb25zLmZldGNoKCkpO1xuICAgICAgLy8gc3Vic2NyaWJlIGZvciBhbGwgYWdlbnRzIHRoYXQgYXJlIGNvbm5lY3RlZCB0byB0aGlzIHVzZXIgd2hlcmUgaWQgaXMgb2JqZWN0IGlkIGFuZCBzdG9yZWQgd2l0aCBPYmplY3RJZChcIjY0MTcxNzA0NzkwODQyNmZhYjNkOTQ5N1wiXG4gICAgICBjb25zdCBvYmplY3RJZEFycmF5ID0gYWdlbnRzX2Nvbm5lY3Rpb25zXG4gICAgICAgIC5mZXRjaCgpXG4gICAgICAgIC5tYXAoKGNvbm5lY3Rpb24pID0+IHtcbiAgICAgICAgICAvLyBDaGVjayB0aGF0IHRoZSBfaWQgZmllbGQgaXMgYSB2YWxpZCBPYmplY3RJZCBzdHJpbmdcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0eXBlb2YgY29ubmVjdGlvbi5hZ2VudF9pZCA9PT0gXCJzdHJpbmdcIiAmJlxuICAgICAgICAgICAgY29ubmVjdGlvbi5hZ2VudF9pZC5sZW5ndGggPT09IDI0XG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICAvLyBDb252ZXJ0IHRoZSBzdHJpbmcgdG8gYW4gT2JqZWN0SWQgaW5zdGFuY2VcbiAgICAgICAgICAgIHJldHVybiBuZXcgTW9uZ28uT2JqZWN0SUQoY29ubmVjdGlvbi5hZ2VudF9pZCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFJldHVybiBudWxsIGlmIHRoZSBfaWQgZmllbGQgaXMgbm90IGEgdmFsaWQgT2JqZWN0SWQgc3RyaW5nXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5maWx0ZXIoKG9iamVjdElkKSA9PiBvYmplY3RJZCAhPT0gbnVsbCk7XG5cbiAgICAgIC8vIEZpbmQgZG9jdW1lbnRzIHdoZXJlIHRoZSBfaWQgZmllbGQgbWF0Y2hlcyBhbnkgdmFsdWUgaW4gdGhlIG9iamVjdElkQXJyYXlcblxuICAgICAgbGV0IGFnZW50cyA9IEFnZW50cy5maW5kKHsgX2lkOiB7ICRpbjogb2JqZWN0SWRBcnJheSB9IH0pO1xuXG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiQWdlbnQgY29ubmVjdGlvbnNcIik7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKGFnZW50cy5mZXRjaCgpKTtcblxuICAgICAgcmV0dXJuIGFnZW50cztcbiAgICB9KTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBNZXRlb3IgfSBmcm9tIFwibWV0ZW9yL21ldGVvclwiO1xuaW1wb3J0IHsgY2hlY2sgfSBmcm9tIFwibWV0ZW9yL2NoZWNrXCI7XG5pbXBvcnQgeyBBcnRpY2xlcyB9IGZyb20gXCIvbGliL2NvbGxlY3Rpb25zXCI7XG5cbmltcG9ydCB7XG4gIERFRkNPTjksXG4gIERFRkNPTjcsXG4gIERFRkNPTjUsXG4gIERFRkNPTjQsXG4gIERFRkNPTjMsXG4gIERFRkNPTjIsXG4gIERFRkNPTjEsXG59IGZyb20gXCIvZGVidWcuanNvblwiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiU2V0dGluZyB1cCBBcnRpY2xlIHN0dWZmXCIpO1xuXG4gIE1ldGVvci5wdWJsaXNoKFwiYXJ0aWNsZXMub25lXCIsIGZ1bmN0aW9uIChhcnRpY2xlSWQpIHtcbiAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiSW4gYXJ0aWNsZSAgc3Vic2NyaWJlIGZ1bmN0aW9uXCIpO1xuICAgIGNoZWNrKGFydGljbGVJZCwgU3RyaW5nKTtcbiAgICAvLyBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgLy8gICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgIC8vIH1cbiAgICB0aGlzLmF1dG9ydW4oZnVuY3Rpb24gKGNvbXB1dGF0aW9uKSB7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiU3Vic2NyaWJpbmcgQXJ0aWNsZVwiKTtcblxuICAgICAgY29uc3QgU2VsZWN0b3IgPSB7XG4gICAgICAgIFwiZmllbGRfYXJ0aWNsZV9pZC52YWx1ZVwiOiBhcnRpY2xlSWQsXG4gICAgICAgIHN0YXR1czogXCJhY3RpdmVcIixcbiAgICAgIH07XG5cbiAgICAgIGxldCBhcnRpY2xlID0gQXJ0aWNsZXMuZmluZChTZWxlY3Rvcik7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKGFydGljbGUuZmV0Y2goKSk7XG5cbiAgICAgIHJldHVybiBhcnRpY2xlO1xuICAgIH0pO1xuICB9KTtcbn1cbiIsImltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuaW1wb3J0IHsgY2hlY2sgfSBmcm9tICdtZXRlb3IvY2hlY2snO1xuaW1wb3J0IHsgQ2hhdExpbmVzLCBVc2VycyB9IGZyb20gJy9saWIvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHtcbiAgREVGQ09OOSxcbiAgREVGQ09ONyxcbiAgREVGQ09ONSxcbiAgREVGQ09ONCxcbiAgREVGQ09OMyxcbiAgREVGQ09OMixcbiAgREVGQ09OMVxufSBmcm9tIFwiL2RlYnVnLmpzb25cIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICBNZXRlb3IucHVibGlzaCgnY2hhdGxpbmVzLmZvcmNoYW5uZWwnLCBmdW5jdGlvbihjaGFubmVsSWQpIHtcbiAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgJ0FjY2VzcyBkZW5pZWQnKTtcbiAgICB9XG4gICAgY2hlY2soY2hhbm5lbElkLCBTdHJpbmcpO1xuICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKCdJbiBwdWJsaWNhdGlvbi9jaGF0bGluZXMuZm9yY2hhbm5lbCcpO1xuICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGNoYW5uZWxJZCk7XG5cbiAgICB0aGlzLmF1dG9ydW4oZnVuY3Rpb24oY29tcHV0YXRpb24pIHtcbiAgICAgIGNvbnN0IGNoYXRMaW5lc1NlbGVjdG9yID0ge1xuICAgICAgICBjaGFubmVsSWQ6IGNoYW5uZWxJZCxcbiAgICAgICAgc3RhdHVzOiAnYWN0aXZlJ1xuICAgICAgfTtcbiAgICAgIGxldCBjaGF0TGluZXNVc2VySWRzID0gQ2hhdExpbmVzLmZpbmQoY2hhdExpbmVzU2VsZWN0b3IpXG4gICAgICAgIC5mZXRjaCgpXG4gICAgICAgIC5tYXAobGluZSA9PiBsaW5lLmNyZWF0ZWRCeSk7XG5cbiAgICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKCdGaW5kIGNoYXRMaW5lc1VzZXJJZHMnKTtcblxuICAgICAgY29uc3QgdXNlcnNXaXRoQXZhdGFycyA9IE1ldGVvci51c2Vycy5maW5kKFxuICAgICAgICB7XG4gICAgICAgICAgX2lkOiB7XG4gICAgICAgICAgICAkaW46IGNoYXRMaW5lc1VzZXJJZHNcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHsgYXZhdGFyX3VyaTogMSB9XG4gICAgICApO1xuICAgICAgLy8gREVGQ09ONSAmJiBjb25zb2xlLmxvZyh1c2Vyc1dpdGhBdmF0YXJzKTtcbiAgICAgIHJldHVybiBbQ2hhdExpbmVzLmZpbmQoY2hhdExpbmVzU2VsZWN0b3IpLCB1c2Vyc1dpdGhBdmF0YXJzXTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgTWV0ZW9yLnB1Ymxpc2goJ2NoYXRsaW5lcy5mb3JVc2VyJywgZnVuY3Rpb24oKSB7XG4gICAgaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsICdBY2Nlc3MgZGVuaWVkJyk7XG4gICAgfVxuICAgIGNvbnN0IGNoYXRMaW5lc1NlbGVjdG9yID0ge1xuICAgICAgY3JlYXRlZEJ5OiB0aGlzLnVzZXJJZFxuICAgIH07XG4gICAgbGV0IGNoYXRMaW5lc1VzZXJJZHMgPSBDaGF0TGluZXMuZmluZChjaGF0TGluZXNTZWxlY3Rvcik7XG4gICAgLy8gREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIkZpbmQgdXNlcnNcIik7XG4gICAgLy8gREVGQ09ONSAmJiBjb25zb2xlLmxvZyhjaGF0TGluZXNVc2VySWRzKTtcbiAgICByZXR1cm4gY2hhdExpbmVzVXNlcklkcztcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBNZXRlb3IgfSBmcm9tIFwibWV0ZW9yL21ldGVvclwiO1xuaW1wb3J0IHsgY2hlY2sgfSBmcm9tIFwibWV0ZW9yL2NoZWNrXCI7XG5pbXBvcnQgeyBDaGF0Um9vbXMsIFVzZXJzIH0gZnJvbSBcIi9saWIvY29sbGVjdGlvbnNcIjtcbmltcG9ydCB7XG4gIERFRkNPTjksXG4gIERFRkNPTjcsXG4gIERFRkNPTjUsXG4gIERFRkNPTjQsXG4gIERFRkNPTjMsXG4gIERFRkNPTjIsXG4gIERFRkNPTjEsXG59IGZyb20gXCIvZGVidWcuanNvblwiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBNZXRlb3IucHVibGlzaChcImNoYXRyb29tcy5hY2Nlc3NcIiwgZnVuY3Rpb24gKGNoYXRyb29tSWQpIHtcbiAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgIH1cbiAgICBjaGVjayhjaGF0cm9vbUlkLCBTdHJpbmcpO1xuICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJJbiBwdWJsaWNhdGlvbi9jaGF0Um9vbXMuZm9yY2hhbm5lbFwiKTtcbiAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKGNoYXRyb29tSWQpO1xuXG4gICAgdGhpcy5hdXRvcnVuKGZ1bmN0aW9uIChjb21wdXRhdGlvbikge1xuICAgICAgY29uc3QgY2hhdFJvb21zU2VsZWN0b3IgPSB7XG4gICAgICAgIF9pZDogY2hhdHJvb21JZCxcbiAgICAgICAgc3RhdHVzOiBcImFjdGl2ZVwiLFxuICAgICAgfTtcblxuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIkZpbmQgY2hhdFJvb21zVXNlcklkc1wiKTtcblxuICAgICAgLy8gREVGQ09ONSAmJiBjb25zb2xlLmxvZyh1c2Vyc1dpdGhBdmF0YXJzKTtcbiAgICAgIHJldHVybiBbQ2hhdFJvb21zLmZpbmQoY2hhdFJvb21zU2VsZWN0b3IpXTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgTWV0ZW9yLnB1Ymxpc2goXCJjaGF0cm9vbXMuZm9yVXNlclwiLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiQWNjZXNzIGRlbmllZFwiKTtcbiAgICB9XG4gICAgY29uc3QgY2hhdFJvb21zU2VsZWN0b3IgPSB7XG4gICAgICBcInVzZXJzLnVzZXJJZFwiOiB7XG4gICAgICAgICRpbjogW3RoaXMudXNlcklkXSxcbiAgICAgIH0sXG4gICAgfTtcbiAgICBsZXQgY2hhdFJvb21zVXNlcklkcyA9IENoYXRSb29tcy5maW5kKGNoYXRSb29tc1NlbGVjdG9yKTtcbiAgICAvLyBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiRmluZCB1c2Vyc1wiKTtcbiAgICAvLyBERUZDT041ICYmIGNvbnNvbGUubG9nKGNoYXRSb29tc1VzZXJJZHMpO1xuICAgIHJldHVybiBjaGF0Um9vbXNVc2VySWRzO1xuICB9KTtcbn1cbiIsIi8vIHN1YnNjcmliZSBvbiBub2RlIGFuZCBub2RlIGNoaWxkcmVuXG5pbXBvcnQgeyBNZXRlb3IgfSBmcm9tIFwibWV0ZW9yL21ldGVvclwiO1xuaW1wb3J0IHsgY2hlY2sgfSBmcm9tIFwibWV0ZW9yL2NoZWNrXCI7XG5pbXBvcnQgeyBDb250ZW50cyB9IGZyb20gXCIvbGliL2NvbGxlY3Rpb25zXCI7XG5pbXBvcnQge1xuICBERUZDT045LFxuICBERUZDT043LFxuICBERUZDT041LFxuICBERUZDT040LFxuICBERUZDT04zLFxuICBERUZDT04yLFxuICBERUZDT04xLFxufSBmcm9tIFwiL2RlYnVnLmpzb25cIjtcblxuLy9zdWJzY3JpYmUgb24gbm9kZXMgYW5kIG5vZGUgY2hpbGRyZW5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgLy8gc3Vic2NyaWJlIG9uIGFsbCBub2Rlc1xuICBNZXRlb3IucHVibGlzaChcImNvbnRlbnRzLmFsbFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiQWNjZXNzIGRlbmllZFwiKTtcbiAgICB9XG4gICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIkNvbnRlbnRzLmFsbFwiKTtcblxuICAgIHRoaXMuYXV0b3J1bihmdW5jdGlvbiAoY29tcHV0YXRpb24pIHtcbiAgICAgIGNvbnN0IG5vZGVzU2VsZWN0b3IgPSB7XG4gICAgICAgIFxuICAgICAgfTtcblxuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIkdldCBhbGwgbm9kZXNcIik7XG5cbiAgICAgIHJldHVybiBbQ29udGVudHMuZmluZChub2Rlc1NlbGVjdG9yKV07XG4gICAgfSk7XG4gIH0pO1xuXG4gIE1ldGVvci5wdWJsaXNoKFwiY29udGVudHMuZ2V0XCIsIGZ1bmN0aW9uIChub2RlSWQpIHtcbiAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgIH1cbiAgICBjaGVjayhub2RlSWQsIFN0cmluZyk7XG4gICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIkluIHB1YmxpY2F0aW9uL0NvbnRlbnQuZ2V0XCIpO1xuICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2cobm9kZUlkKTtcblxuICAgIHRoaXMuYXV0b3J1bihmdW5jdGlvbiAoY29tcHV0YXRpb24pIHtcbiAgICAgIGNvbnN0IG5vZGVzU2VsZWN0b3IgPSB7XG4gICAgICAgIF9pZDogbm9kZUlkLFxuICAgICAgfTtcblxuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIkZpbmQgbm9kZSB3aXRoIGlkOiBcIiwgbm9kZUlkKTtcbiAgICAgIHJldHVybiBbQ29udGVudHMuZmluZChub2Rlc1NlbGVjdG9yKV07XG4gICAgfSk7XG4gIH0pO1xuICBNZXRlb3IucHVibGlzaChcIkNvbnRlbnRzLmdldFRyZWVcIiwgZnVuY3Rpb24gKG5vZGVJZCkge1xuICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCBcIkFjY2VzcyBkZW5pZWRcIik7XG4gICAgfVxuICAgIGNoZWNrKG5vZGVJZCwgU3RyaW5nKTtcbiAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiSW4gcHVibGljYXRpb24vQ29udGVudHMuZ2V0VHJlZVwiKTtcbiAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKG5vZGVJZCk7XG5cbiAgICBjb25zdCBxdWV1ZSA9IFtub2RlSWRdO1xuICAgIGNvbnN0IHNlZW5Ob2RlSWRzID0gbmV3IFNldCgpO1xuICAgIGNvbnN0IHNlZW5MaW5rSWRzID0gbmV3IFNldCgpO1xuXG4gICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgY29uc3QgY3VycmVudElkID0gcXVldWUuc2hpZnQoKTtcblxuICAgICAgaWYgKHNlZW5Ob2RlSWRzLmhhcyhjdXJyZW50SWQpKSBjb250aW51ZTtcblxuICAgICAgc2Vlbk5vZGVJZHMuYWRkKGN1cnJlbnRJZCk7XG5cbiAgICAgIGNvbnN0IGxpbmtzID0gTm9kZUxpbmtzLmZpbmQoeyBwYXJlbnRJZDogY3VycmVudElkIH0pLmZldGNoKCk7XG5cbiAgICAgIGZvciAoY29uc3QgbGluayBvZiBsaW5rcykge1xuICAgICAgICBpZiAoIXNlZW5MaW5rSWRzLmhhcyhsaW5rLl9pZCkpIHtcbiAgICAgICAgICBzZWVuTGlua0lkcy5hZGQobGluay5faWQpO1xuICAgICAgICAgIHF1ZXVlLnB1c2gobGluay5jaGlsZElkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIFxuXG4gICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIkZvdW5kIG5vZGVzIGFuZCBsaW5rczpcIiwgc2Vlbk5vZGVJZHMsIHNlZW5MaW5rSWRzKTtcblxuICAgIHJldHVybiBbXG4gICAgICBDb250ZW50cy5maW5kKHsgX2lkOiB7ICRpbjogWy4uLnNlZW5Ob2RlSWRzXSB9IH0pLFxuICAgICAgTm9kZUxpbmtzLmZpbmQoeyBfaWQ6IHsgJGluOiBbLi4uc2VlbkxpbmtJZHNdIH0gfSksXG4gICAgXTtcblxuXG4gIH0pO1xufVxuXG4vLyBmdW5jdGlvbiB0aGF0IHJlYWRzIHRoZSBub2RlIGFuZCByZXR1cm5zIHRoZSBub2RlIGFuZCBhbGwgY2hpbGRyZW4gYmFzZWQgb24gdGhlIE5vZGVMaW5rcyBjb2xsZWN0aW9uXG5mdW5jdGlvbiBfZ2V0Tm9kZXNBbmRDaGlsZHJlbihub2RlSWQsIGRlZXB0aCwgbWF4RGVlcHRoKSB7XG4gIC8vIGdldCB0aGUgbm9kZVxuICBjb25zdCBub2RlID0gQ29udGVudHMuZmluZE9uZSh7IF9pZDogbm9kZUlkIH0pO1xuICAvLyBnZXQgdGhlIGNoaWxkcmVuIG9mIHRoZSBub2RlIGJhc2VkIG9uIHRoZSBOb2RlTGlua3MgY29sbGVjdGlvblxuICBjb25zdCBjaGlsZHJlbiA9IE5vZGVMaW5rcy5maW5kKHsgc291cmNlOiBub2RlSWQgfSkuZmV0Y2goKTtcblxuICAvLyBpZiB0aGUgZGVlcHRoIGlzIGxlc3MgdGhhbiB0aGUgbWF4RGVlcHRoLCBnZXQgdGhlIG5leHQgbGV2ZWwgb2Ygbm9kZXNcbiAgaWYgKGRlZXB0aCA8IG1heERlZXB0aCkge1xuICAgIC8vIGxvb3AgdGhyb3VnaCB0aGUgY2hpbGRyZW5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBnZXQgdGhlIGNoaWxkcmVuIG9mIHRoZSBjaGlsZHJlblxuICAgICAgY29uc3QgY2hpbGQgPSBfZ2V0Tm9kZXNBbmRDaGlsZHJlbihcbiAgICAgICAgY2hpbGRyZW5baV0udGFyZ2V0LFxuICAgICAgICBkZWVwdGggKyAxLFxuICAgICAgICBtYXhEZWVwdGhcbiAgICAgICk7XG4gICAgICAvLyBhZGQgdGhlIGNoaWxkcmVuIHRvIHRoZSBjaGlsZHJlbiBhcnJheVxuICAgICAgY2hpbGRyZW5baV0uY2hpbGRyZW4gPSBjaGlsZDtcbiAgICB9XG4gIH1cbiAgLy8gcmV0dXJuIHRoZSBub2RlIGFuZCB0aGUgY2hpbGRyZW5cbiAgcmV0dXJuIHsgbm9kZSwgY2hpbGRyZW4gfTtcbn1cbiIsImltcG9ydCBfdXNlcnMgZnJvbSBcIi4vX3VzZXJzXCI7XG5pbXBvcnQgY2hhdGxpbmVzIGZyb20gXCIuL2NoYXRsaW5lc1wiO1xuaW1wb3J0IGNoYXRyb29tcyBmcm9tIFwiLi9jaGF0cm9vbXNcIjtcbmltcG9ydCBzZWNyZXRzIGZyb20gXCIuL3NlY3JldHNcIjtcbmltcG9ydCBhcnRpY2xlcyBmcm9tIFwiLi9hcnRpY2xlc1wiO1xuaW1wb3J0IGNvbnRlbnRzIGZyb20gXCIuL2NvbnRlbnRzXCI7XG5pbXBvcnQgd29ya29yZGVycyBmcm9tIFwiLi93b3Jrb3JkZXJzXCI7XG5pbXBvcnQgbm90aWNlcyBmcm9tIFwiLi9ub3RpY2VzXCI7XG5pbXBvcnQgbWNjIGZyb20gXCIuL21jY19jb25maWdcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgX3VzZXJzKCk7XG4gIGNoYXRsaW5lcygpO1xuICBjaGF0cm9vbXMoKTtcbiAgc2VjcmV0cygpO1xuICBhcnRpY2xlcygpO1xuICBtY2MoKTtcbiAgY29udGVudHMoKTtcbiAgd29ya29yZGVycygpO1xuICBub3RpY2VzKCk7XG59XG4iLCIvLyBzdWJzY3JpYmUgb24gbGluayBjaGlsZHJlblxuaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSBcIm1ldGVvci9tZXRlb3JcIjtcbmltcG9ydCB7IGNoZWNrIH0gZnJvbSBcIm1ldGVvci9jaGVja1wiO1xuaW1wb3J0IHsgTm9kZXMsIExpbmtzIH0gZnJvbSBcIi9saWIvY29sbGVjdGlvbnNcIjtcbmltcG9ydCB7XG4gIERFRkNPTjksXG4gIERFRkNPTjcsXG4gIERFRkNPTjUsXG4gIERFRkNPTjQsXG4gIERFRkNPTjMsXG4gIERFRkNPTjIsXG4gIERFRkNPTjEsXG59IGZyb20gXCIvZGVidWcuanNvblwiO1xuXG4vL3N1YnNjcmliZSBvbiBsaW5rcyBhbmQgbGluayBjaGlsZHJlblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICAvLyBzdWJzY3JpYmUgb24gYWxsIGxpbmtzXG4gIE1ldGVvci5wdWJsaXNoKFwibGlua3MuYWxsXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgIH1cbiAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwibGlua3MuYWxsXCIpO1xuICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2cobGlua0lkKTtcblxuICAgIHRoaXMuYXV0b3J1bihmdW5jdGlvbiAoY29tcHV0YXRpb24pIHtcbiAgICAgIGNvbnN0IGxpbmtzU2VsZWN0b3IgPSB7XG4gICAgICAgIHN0YXR1czogXCJhY3RpdmVcIixcbiAgICAgIH07XG5cbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJHZXQgYWxsIGxpbmtzXCIpO1xuXG4gICAgICAvLyBERUZDT041ICYmIGNvbnNvbGUubG9nKHVzZXJzV2l0aEF2YXRhcnMpO1xuICAgICAgcmV0dXJuIFtOb2Rlcy5maW5kKGxpbmtzU2VsZWN0b3IpXTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgTWV0ZW9yLnB1Ymxpc2goXCJsaW5rcy5hY2Nlc3NcIiwgZnVuY3Rpb24gKGxpbmtJZCkge1xuICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCBcIkFjY2VzcyBkZW5pZWRcIik7XG4gICAgfVxuICAgIGNoZWNrKGxpbmtJZCwgU3RyaW5nKTtcbiAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiSW4gcHVibGljYXRpb24vbGlua3MuYWNjZXNzXCIpO1xuICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2cobGlua0lkKTtcblxuICAgIHRoaXMuYXV0b3J1bihmdW5jdGlvbiAoY29tcHV0YXRpb24pIHtcbiAgICAgIGNvbnN0IGxpbmtzU2VsZWN0b3IgPSB7XG4gICAgICAgIF9pZDogbGlua0lkLFxuICAgICAgICBzdGF0dXM6IFwiYWN0aXZlXCIsXG4gICAgICB9O1xuXG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiRmluZCBsaW5rc1wiKTtcblxuICAgICAgLy8gREVGQ09ONSAmJiBjb25zb2xlLmxvZyh1c2Vyc1dpdGhBdmF0YXJzKTtcbiAgICAgIHJldHVybiBbTm9kZXMuZmluZChsaW5rc1NlbGVjdG9yKV07XG4gICAgfSk7XG4gIH0pO1xufVxuXG4vLyBmdW5jdGlvbiB0aGF0IHJlYWRzIHRoZSBsaW5rIGFuZCByZXR1cm5zIHRoZSBsaW5rIGFuZCBhbGwgY2hpbGRyZW4gYmFzZWQgb24gdGhlIGxpbmtzIGNvbGxlY3Rpb25cbmZ1bmN0aW9uIF9nZXROb2Rlc0FuZENoaWxkcmVuKGxpbmtJZCwgZGVlcHRoLCBtYXhEZWVwdGgpIHtcbiAgLy8gZ2V0IHRoZSBsaW5rXG4gIGNvbnN0IGxpbmsgPSBOb2Rlcy5maW5kT25lKHsgX2lkOiBsaW5rSWQgfSk7XG4gIC8vIGdldCB0aGUgY2hpbGRyZW4gb2YgdGhlIGxpbmsgYmFzZWQgb24gdGhlIGxpbmtzIGNvbGxlY3Rpb25cbiAgY29uc3QgY2hpbGRyZW4gPSBMaW5rcy5maW5kKHsgc291cmNlOiBsaW5rSWQgfSkuZmV0Y2goKTtcblxuICAvLyBpZiB0aGUgZGVlcHRoIGlzIGxlc3MgdGhhbiB0aGUgbWF4RGVlcHRoLCBnZXQgdGhlIG5leHQgbGV2ZWwgb2YgbGlua3NcbiAgICBpZiAoZGVlcHRoIDwgbWF4RGVlcHRoKSB7XG4gICAgICAgIC8vIGxvb3AgdGhyb3VnaCB0aGUgY2hpbGRyZW5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgLy8gZ2V0IHRoZSBjaGlsZHJlbiBvZiB0aGUgY2hpbGRyZW5cbiAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gX2dldE5vZGVzQW5kQ2hpbGRyZW4oY2hpbGRyZW5baV0udGFyZ2V0LCBkZWVwdGggKyAxLCBtYXhEZWVwdGgpO1xuICAgICAgICAgICAgLy8gYWRkIHRoZSBjaGlsZHJlbiB0byB0aGUgY2hpbGRyZW4gYXJyYXlcbiAgICAgICAgICAgIGNoaWxkcmVuW2ldLmNoaWxkcmVuID0gY2hpbGQ7XG4gICAgICAgIH1cbiAgICB9XG4gIC8vIHJldHVybiB0aGUgbGluayBhbmQgdGhlIGNoaWxkcmVuXG4gIHJldHVybiB7IGxpbmssIGNoaWxkcmVuIH07XG59XG4iLCJpbXBvcnQgeyBNZXRlb3IgfSBmcm9tIFwibWV0ZW9yL21ldGVvclwiO1xuaW1wb3J0IHsgY2hlY2sgfSBmcm9tIFwibWV0ZW9yL2NoZWNrXCI7XG5pbXBvcnQgeyBNY2NDb25maWcgfSBmcm9tIFwiL2xpYi9jb2xsZWN0aW9uc1wiO1xuaW1wb3J0IHtcbiAgREVGQ09OOSxcbiAgREVGQ09ONyxcbiAgREVGQ09ONSxcbiAgREVGQ09ONCxcbiAgREVGQ09OMyxcbiAgREVGQ09OMixcbiAgREVGQ09OMSxcbn0gZnJvbSBcIi9kZWJ1Zy5qc29uXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIERFRkNPTjcgJiYgY29uc29sZS5sb2coXCJTZXR0aW5nIHVwIG1jYyAtY29uZmlnXCIpO1xuXG4gIE1ldGVvci5wdWJsaXNoKFwibWNjQ29uZmlnLmFsbFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgREVGQ09ONyAmJiBjb25zb2xlLmxvZyhcIkluIHRoZSBzdWJzY3JpYmUgZnVuY3Rpb25cIik7XG5cbiAgICAvLyBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgLy8gICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgIC8vIH1cbiAgICB0aGlzLmF1dG9ydW4oZnVuY3Rpb24gKGNvbXB1dGF0aW9uKSB7XG4gICAgICBERUZDT043ICYmIGNvbnNvbGUubG9nKFwiU3Vic2NyaWJpbmcgTUNDIENvbmZpZ3NcIik7XG5cbiAgICAgIGNvbnN0IFNlbGVjdG9yID0ge1xuICAgICAgICBzdGF0dXM6IFwiYWN0aXZlXCIsXG4gICAgICB9O1xuXG4gICAgICBsZXQgbWNjQ29uZmlnID0gTWNjQ29uZmlnLmZpbmQoU2VsZWN0b3IpO1xuICAgICAgREVGQ09ONyAmJiBjb25zb2xlLmxvZyhtY2NDb25maWcpO1xuXG4gICAgICByZXR1cm4gbWNjQ29uZmlnO1xuICAgIH0pO1xuICB9KTtcblxuICBNZXRlb3IucHVibGlzaChcIm1jY0NvbmZpZy5vbmVcIiwgZnVuY3Rpb24gKGZhY2lsaXR5KSB7XG4gICAgREVGQ09ONyAmJiBjb25zb2xlLmxvZyhcIkluIG1jY0NvbmZpZy5vbmUgIHN1YnNjcmliZSBmdW5jdGlvblwiKTtcbiAgICBjaGVjayhmYWNpbGl0eSwgU3RyaW5nKTtcbiAgICAvLyBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgLy8gICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgIC8vIH1cbiAgICB0aGlzLmF1dG9ydW4oZnVuY3Rpb24gKGNvbXB1dGF0aW9uKSB7XG4gICAgICBERUZDT043ICYmIGNvbnNvbGUubG9nKFwiU3Vic2NyaWJpbmcgbWNjQ29uZmlnXCIpO1xuXG4gICAgICBjb25zdCBTZWxlY3RvciA9IHtcbiAgICAgICAgZmFjaWxpdHk6IGZhY2lsaXR5LFxuICAgICAgICBzdGF0dXM6IFwiYWN0aXZlXCIsXG4gICAgICB9O1xuXG4gICAgICBsZXQgbWNjQ29uZmlnID0gTWNjQ29uZmlnLmZpbmQoU2VsZWN0b3IpO1xuICAgICAgREVGQ09ONyAmJiBjb25zb2xlLmxvZyhtY2NDb25maWcpO1xuXG4gICAgICByZXR1cm4gbWNjQ29uZmlnO1xuICAgIH0pO1xuICB9KTtcblxuICBNZXRlb3IucHVibGlzaChcIm1jY0NvbmZpZy5Db3VudFJlYWRcIiwgZnVuY3Rpb24gKGZhY2lsaXR5KSB7XG4gICAgREVGQ09ONyAmJiBjb25zb2xlLmxvZyhcIkluIG1jY0NvbmZpZy5Db3VudFJlYWQgIHN1YnNjcmliZSBmdW5jdGlvblwiKTtcbiAgICBjaGVjayhmYWNpbGl0eSwgU3RyaW5nKTtcbiAgICAvLyBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgLy8gICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgIC8vIH1cbiAgICB0aGlzLmF1dG9ydW4oZnVuY3Rpb24gKGNvbXB1dGF0aW9uKSB7XG4gICAgICBERUZDT043ICYmIGNvbnNvbGUubG9nKFwiU3Vic2NyaWJpbmcgQ291bnRSZWFkXCIpO1xuXG4gICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgYWxsb3dEaXNrVXNlOiB0cnVlLFxuICAgICAgfTtcblxuICAgICAgdmFyIHBpcGVsaW5lID0gW1xuICAgICAgICB7XG4gICAgICAgICAgJG1hdGNoOiB7XG4gICAgICAgICAgICByZWFkX3Byb2Nfc3RhdHVzOiBcIk9LXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICRncm91cDoge1xuICAgICAgICAgICAgX2lkOiB7fSxcbiAgICAgICAgICAgIG51bU9mUmVhZDoge1xuICAgICAgICAgICAgICAkc3VtOiAxLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgJHByb2plY3Q6IHtcbiAgICAgICAgICAgIG51bU9mUmVhZDogXCIkbnVtT2ZSZWFkXCIsXG4gICAgICAgICAgICBfaWQ6IDAsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF07XG5cbiAgICAgIGxldCBtY2NDb25maWcgPSBNY2NDb25maWcuYWdncmVnYXRlKHBpcGVsaW5lLCBvcHRpb25zKTtcbiAgICAgIERFRkNPTjcgJiYgY29uc29sZS5sb2cobWNjQ29uZmlnKTtcblxuICAgICAgcmV0dXJuIG1jY0NvbmZpZztcbiAgICB9KTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBNZXRlb3IgfSBmcm9tIFwibWV0ZW9yL21ldGVvclwiO1xuaW1wb3J0IHsgY2hlY2sgfSBmcm9tIFwibWV0ZW9yL2NoZWNrXCI7XG5pbXBvcnQgeyBOb3RpY2VzVXNlclN0YXR1cywgTm90aWNlcywgVXNlcnMgfSBmcm9tIFwiL2xpYi9jb2xsZWN0aW9uc1wiO1xuaW1wb3J0IHtcbiAgREVGQ09OOSxcbiAgREVGQ09ONyxcbiAgREVGQ09ONSxcbiAgREVGQ09ONCxcbiAgREVGQ09OMyxcbiAgREVGQ09OMixcbiAgREVGQ09OMSxcbn0gZnJvbSBcIi9kZWJ1Zy5qc29uXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIE1ldGVvci5wdWJsaXNoKFwibm90aWNlcy5mb3JVc2VyXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgIH1cbiAgICAvLyBjaGVjayh1c2VySWQsIFN0cmluZyk7XG4gICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIm5vdGljZXMuZm9yVXNlclwiKTtcblxuICAgIHRoaXMuYXV0b3J1bihmdW5jdGlvbiAoY29tcHV0YXRpb24pIHtcbiAgICAgIGNvbnN0IG5vdGljZVNlbGVjdG9yID0ge1xuICAgICAgICBzdGF0dXM6IFwiYWN0aXZlXCIsXG4gICAgICAgIHVzZXJJZDogdGhpcy51c2VySWQsXG4gICAgICB9O1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIlF1ZXJ5XCIpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhub3RpY2VTZWxlY3Rvcik7XG5cbiAgICAgIGNvbnN0IG5vdGljZXM0VXNlciA9IE5vdGljZXNVc2VyU3RhdHVzLmZpbmQobm90aWNlU2VsZWN0b3IpXG4gICAgICAgIC5mZXRjaCgpXG4gICAgICAgIC5tYXAoKGxpbmUpID0+IGxpbmUubm90aWNlSWQpO1xuXG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKG5vdGljZXM0VXNlcik7XG5cbiAgICAgIGNvbnN0IG5vdGljZXMgPSBOb3RpY2VzLmZpbmQoXG4gICAgICAgIHtcbiAgICAgICAgICBfaWQ6IHtcbiAgICAgICAgICAgICRpbjogbm90aWNlczRVc2VyLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHsgYXZhdGFyX3VyaTogMSB9XG4gICAgICApO1xuXG4gICAgICBjb25zdCBub3RpY2VzX3VzZXJzdGF0dXMgPSBOb3RpY2VzVXNlclN0YXR1cy5maW5kKG5vdGljZVNlbGVjdG9yKTtcblxuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIkZpbmQgbm90aWNlc1wiKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2cobm90aWNlcy5mZXRjaCgpKTtcblxuICAgICAgLy8gREVGQ09ONSAmJiBjb25zb2xlLmxvZyh1c2Vyc1dpdGhBdmF0YXJzKTtcbiAgICAgIHJldHVybiBbbm90aWNlcywgbm90aWNlc191c2Vyc3RhdHVzXTtcbiAgICB9KTtcbiAgfSk7XG4gIE1ldGVvci5wdWJsaXNoKFwibm90aWNlcy5mb3JVc2VyQW5kQXJ0aWNsZVwiLCBmdW5jdGlvbiAoYXJ0aWNsZUlkKSB7XG4gICAgY2hlY2soYXJ0aWNsZUlkLCBTdHJpbmcpO1xuXG4gICAgaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiQWNjZXNzIGRlbmllZFwiKTtcbiAgICB9XG4gICAgLy8gY2hlY2sodXNlcklkLCBTdHJpbmcpO1xuICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJub3RpY2VzLmZvclVzZXJBbmRBcnRpY2xlXCIpO1xuXG4gICAgdGhpcy5hdXRvcnVuKGZ1bmN0aW9uIChjb21wdXRhdGlvbikge1xuICAgICAgY29uc3Qgbm90aWNlU2VsZWN0b3IgPSB7XG4gICAgICAgIHN0YXR1czogXCJhY3RpdmVcIixcbiAgICAgICAgdXNlcklkOiB0aGlzLnVzZXJJZCxcbiAgICAgIH07XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiUXVlcnlcIik7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKG5vdGljZVNlbGVjdG9yKTtcblxuICAgICAgY29uc3Qgbm90aWNlczRVc2VyID0gTm90aWNlc1VzZXJTdGF0dXMuZmluZChub3RpY2VTZWxlY3RvcilcbiAgICAgICAgLmZldGNoKClcbiAgICAgICAgLm1hcCgobGluZSkgPT4gbGluZS5ub3RpY2VJZCk7XG5cbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2cobm90aWNlczRVc2VyKTtcblxuICAgICAgY29uc3Qgbm90aWNlcyA9IE5vdGljZXMuZmluZChcbiAgICAgICAge1xuICAgICAgICAgIHN0YXR1czogXCJhY3RpdmVcIixcbiAgICAgICAgICBlbnRpdHk6IFwiYXJ0aWNsZVwiLFxuICAgICAgICAgIGVudGl0eUlkOiBhcnRpY2xlSWQsXG4gICAgICAgICAgX2lkOiB7XG4gICAgICAgICAgICAkaW46IG5vdGljZXM0VXNlcixcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB7IGF2YXRhcl91cmk6IDEgfVxuICAgICAgKTtcblxuICAgICAgY29uc3Qgbm90aWNlc191c2Vyc3RhdHVzID0gTm90aWNlc1VzZXJTdGF0dXMuZmluZChub3RpY2VTZWxlY3Rvcik7XG5cbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJGaW5kIG5vdGljZXNcIik7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKG5vdGljZXMuZmV0Y2goKSk7XG5cbiAgICAgIC8vIERFRkNPTjUgJiYgY29uc29sZS5sb2codXNlcnNXaXRoQXZhdGFycyk7XG4gICAgICByZXR1cm4gW25vdGljZXMsIG5vdGljZXNfdXNlcnN0YXR1c107XG4gICAgfSk7XG4gIH0pO1xuXG4gIE1ldGVvci5wdWJsaXNoKFwibm90aWNlcy5mb3JBbGxVc2Vyc0FuZEFydGljbGVcIiwgZnVuY3Rpb24gKGFydGljbGVJZCkge1xuICAgIGNoZWNrKGFydGljbGVJZCwgU3RyaW5nKTtcblxuICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCBcIkFjY2VzcyBkZW5pZWRcIik7XG4gICAgfVxuICAgIC8vIGNoZWNrKHVzZXJJZCwgU3RyaW5nKTtcbiAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwibm90aWNlcy5mb3JVc2VyQW5kQXJ0aWNsZVwiKTtcblxuICAgIHRoaXMuYXV0b3J1bihmdW5jdGlvbiAoY29tcHV0YXRpb24pIHtcbiAgICAgIGxldCBub3RpY2VzNHVzZXJzID0gTm90aWNlcy5maW5kKFxuICAgICAgICB7XG4gICAgICAgICAgc3RhdHVzOiBcImFjdGl2ZVwiLFxuICAgICAgICAgIGVudGl0eTogXCJhcnRpY2xlXCIsXG4gICAgICAgICAgZW50aXR5SWQ6IGFydGljbGVJZCxcbiAgICAgICAgfSxcbiAgICAgICAgeyBhdmF0YXJfdXJpOiAxIH1cbiAgICAgIClcbiAgICAgICAgLmZldGNoKClcbiAgICAgICAgLm1hcCgobGluZSkgPT4gbGluZS5faWQpO1xuXG4gICAgICBjb25zdCBub3RpY2VTZWxlY3RvciA9IHtcbiAgICAgICAgc3RhdHVzOiBcImFjdGl2ZVwiLFxuICAgICAgICBub3RpY2VJZDoge1xuICAgICAgICAgICRpbjogbm90aWNlczR1c2VycyxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IG5vdGljZXNfdXNlcnN0YXR1cyA9IE5vdGljZXNVc2VyU3RhdHVzLmZpbmQobm90aWNlU2VsZWN0b3IpO1xuICAgICAgY29uc3Qgbm90aWNlcyA9IE5vdGljZXMuZmluZChcbiAgICAgICAge1xuICAgICAgICAgIHN0YXR1czogXCJhY3RpdmVcIixcbiAgICAgICAgICBlbnRpdHk6IFwiYXJ0aWNsZVwiLFxuICAgICAgICAgIGVudGl0eUlkOiBhcnRpY2xlSWQsXG4gICAgICAgIH0sXG4gICAgICAgIHsgYXZhdGFyX3VyaTogMSB9XG4gICAgICApO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIkZpbmQgbm90aWNlc1wiKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2cobm90aWNlcy5mZXRjaCgpKTtcblxuICAgICAgLy8gREVGQ09ONSAmJiBjb25zb2xlLmxvZyh1c2Vyc1dpdGhBdmF0YXJzKTtcbiAgICAgIHJldHVybiBbbm90aWNlcywgbm90aWNlc191c2Vyc3RhdHVzXTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgTWV0ZW9yLnB1Ymxpc2goXCJub3RpY2VzLmZvckFydGljbGVcIiwgZnVuY3Rpb24gKGFydGljbGVJZCkge1xuICAgIGNoZWNrKGFydGljbGVJZCwgU3RyaW5nKTtcblxuICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCBcIkFjY2VzcyBkZW5pZWRcIik7XG4gICAgfVxuICAgIC8vIGNoZWNrKHVzZXJJZCwgU3RyaW5nKTtcbiAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwibm90aWNlcy5mb3JBcnRpY2xlXCIpO1xuXG4gICAgdGhpcy5hdXRvcnVuKGZ1bmN0aW9uIChjb21wdXRhdGlvbikge1xuICAgICAgY29uc3Qgbm90aWNlcyA9IE5vdGljZXMuZmluZChcbiAgICAgICAge1xuICAgICAgICAgIGVudGl0eTogXCJhcnRpY2xlXCIsXG4gICAgICAgICAgZW50aXR5SWQ6IGFydGljbGVJZCxcbiAgICAgICAgICBzdGF0dXM6IFwiYWN0aXZlXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHsgYXZhdGFyX3VyaTogMSB9XG4gICAgICApO1xuXG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiRmluZCBub3RpY2VzXCIpO1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhub3RpY2VzLmZldGNoKCkpO1xuXG4gICAgICAvLyBERUZDT041ICYmIGNvbnNvbGUubG9nKHVzZXJzV2l0aEF2YXRhcnMpO1xuICAgICAgcmV0dXJuIFtub3RpY2VzXTtcbiAgICB9KTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBNZXRlb3IgfSBmcm9tICdtZXRlb3IvbWV0ZW9yJztcbmltcG9ydCB7IGNoZWNrIH0gZnJvbSAnbWV0ZW9yL2NoZWNrJztcbmltcG9ydCB7IFByb2dyYW1zLCBNb2R1bGVzIH0gZnJvbSAnL2xpYi9jb2xsZWN0aW9ucyc7XG5pbXBvcnQge1xuICBERUZDT045LFxuICBERUZDT043LFxuICBERUZDT041LFxuICBERUZDT040LFxuICBERUZDT04zLFxuICBERUZDT04yLFxuICBERUZDT04xXG59IGZyb20gXCIvZGVidWcuanNvblwiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIE1ldGVvci5wdWJsaXNoKCdwcm9ncmFtLmdldCcsIGZ1bmN0aW9uKHByb2dyYW1JZCkge1xuICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCAnQWNjZXNzIGRlbmllZCcpO1xuICAgIH1cbiAgICBjaGVjayhjaGFubmVsSWQsIFN0cmluZyk7XG4gICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coJ0luIHB1YmxpY2F0aW9uL3Byb2dyYW0uZ2V0Jyk7XG4gICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coY2hhbm5lbElkKTtcblxuICAgIHRoaXMuYXV0b3J1bihmdW5jdGlvbihjb21wdXRhdGlvbikge1xuICAgICAgY29uc3QgY2hhdExpbmVzU2VsZWN0b3IgPSB7XG4gICAgICAgIGNoYW5uZWxJZDogY2hhbm5lbElkLFxuICAgICAgICBzdGF0dXM6ICdhY3RpdmUnXG4gICAgICB9O1xuICAgICAgbGV0IGNoYXRMaW5lc1VzZXJJZHMgPSBDaGF0TGluZXMuZmluZChjaGF0TGluZXNTZWxlY3RvcilcbiAgICAgICAgLmZldGNoKClcbiAgICAgICAgLm1hcChsaW5lID0+IGxpbmUuY3JlYXRlZEJ5KTtcblxuICAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coJ0ZpbmQgY2hhdExpbmVzVXNlcklkcycpO1xuXG4gICAgICBjb25zdCB1c2Vyc1dpdGhBdmF0YXJzID0gTWV0ZW9yLnVzZXJzLmZpbmQoXG4gICAgICAgIHtcbiAgICAgICAgICBfaWQ6IHtcbiAgICAgICAgICAgICRpbjogY2hhdExpbmVzVXNlcklkc1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgeyBhdmF0YXJfdXJpOiAxIH1cbiAgICAgICk7XG4gICAgICAvLyBERUZDT041ICYmIGNvbnNvbGUubG9nKHVzZXJzV2l0aEF2YXRhcnMpO1xuICAgICAgcmV0dXJuIFtDaGF0TGluZXMuZmluZChjaGF0TGluZXNTZWxlY3RvciksIHVzZXJzV2l0aEF2YXRhcnNdO1xuICAgIH0pO1xuICB9KTtcblxuICBNZXRlb3IucHVibGlzaCgnY2hhdGxpbmVzLmZvclVzZXInLCBmdW5jdGlvbigpIHtcbiAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgJ0FjY2VzcyBkZW5pZWQnKTtcbiAgICB9XG4gICAgY29uc3QgY2hhdExpbmVzU2VsZWN0b3IgPSB7XG4gICAgICBjcmVhdGVkQnk6IHRoaXMudXNlcklkXG4gICAgfTtcbiAgICBsZXQgY2hhdExpbmVzVXNlcklkcyA9IENoYXRMaW5lcy5maW5kKGNoYXRMaW5lc1NlbGVjdG9yKTtcbiAgICAvLyBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiRmluZCB1c2Vyc1wiKTtcbiAgICAvLyBERUZDT041ICYmIGNvbnNvbGUubG9nKGNoYXRMaW5lc1VzZXJJZHMpO1xuICAgIHJldHVybiBjaGF0TGluZXNVc2VySWRzO1xuICB9KTtcbn1cbiIsImltcG9ydCB7IE1ldGVvciB9IGZyb20gXCJtZXRlb3IvbWV0ZW9yXCI7XG5pbXBvcnQgeyBjaGVjayB9IGZyb20gXCJtZXRlb3IvY2hlY2tcIjtcbmltcG9ydCB7IFNlY3JldHMgfSBmcm9tIFwiL2xpYi9jb2xsZWN0aW9uc1wiO1xuaW1wb3J0IHtcbiAgREVGQ09OOSxcbiAgREVGQ09ONyxcbiAgREVGQ09ONSxcbiAgREVGQ09ONCxcbiAgREVGQ09OMyxcbiAgREVGQ09OMixcbiAgREVGQ09OMSxcbn0gZnJvbSBcIi9kZWJ1Zy5qc29uXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJTZXR0aW5nIHVwIHNlY3JldHNcIik7XG5cbiAgTWV0ZW9yLnB1Ymxpc2goXCJzZWNyZXRzLmFsbFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIkluIHRoZSBzdWJzY3JpYmUgZnVuY3Rpb25cIik7XG5cbiAgICAvLyBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgLy8gICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgXCJBY2Nlc3MgZGVuaWVkXCIpO1xuICAgIC8vIH1cbiAgICB0aGlzLmF1dG9ydW4oZnVuY3Rpb24gKGNvbXB1dGF0aW9uKSB7XG4gICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiU3Vic2NyaWJpbmcgc2VjcmV0c1wiKTtcblxuICAgICAgY29uc3QgU2VsZWN0b3IgPSB7XG4gICAgICAgIHN0YXR1czogXCJhY3RpdmVcIixcbiAgICAgIH07XG5cbiAgICAgIGxldCBzZWNyZXRzID0gU2VjcmV0cy5maW5kKFNlbGVjdG9yKTtcbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coc2VjcmV0cyk7XG5cbiAgICAgIHJldHVybiBzZWNyZXRzO1xuICAgIH0pO1xuICB9KTtcbn1cbiIsIi8vIHN1YnNjcmliZSBvbiBub2RlIGFuZCBub2RlIGNoaWxkcmVuXG5pbXBvcnQgeyBNZXRlb3IgfSBmcm9tIFwibWV0ZW9yL21ldGVvclwiO1xuaW1wb3J0IHsgY2hlY2sgfSBmcm9tIFwibWV0ZW9yL2NoZWNrXCI7XG5pbXBvcnQgeyBTZW5zb3JNYXBwaW5nIH0gZnJvbSBcIi9saWIvY29sbGVjdGlvbnNcIjtcbmltcG9ydCB7XG4gIERFRkNPTjksXG4gIERFRkNPTjcsXG4gIERFRkNPTjUsXG4gIERFRkNPTjQsXG4gIERFRkNPTjMsXG4gIERFRkNPTjIsXG4gIERFRkNPTjEsXG59IGZyb20gXCIvZGVidWcuanNvblwiO1xuXG4vL3N1YnNjcmliZSBvbiBub2RlcyBhbmQgbm9kZSBjaGlsZHJlblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICAvLyBzdWJzY3JpYmUgb24gYWxsIG5vZGVzXG4gIE1ldGVvci5wdWJsaXNoKFwic2Vuc29ybWFwcGluZy5hbGxcIiwgZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCBcIkFjY2VzcyBkZW5pZWRcIik7XG4gICAgfVxuICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJzZW5zb3JtYXBwaW5nLmFsbFwiKTtcblxuICAgIHRoaXMuYXV0b3J1bihmdW5jdGlvbiAoY29tcHV0YXRpb24pIHtcbiAgICAgIGNvbnN0IGRhdGFTZWxlY3RvciA9IHtcbiAgICAgIH07XG5cbiAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJHZXQgYWxsIFNlbnNvck1hcHBpbmdcIik7XG4gICAgICAvLyB2YXIgc29ydCA9IFtbXCJ0aW1lc3RhbXBfcmVhZFwiLCAtMS4wXV07XG4gICAgICBsZXQgbm9kZXMgPSBTZW5zb3JNYXBwaW5nLmZpbmQoZGF0YVNlbGVjdG9yLCB7XG4gICAgICAgIGxpbWl0OiAxNTAwLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gW25vZGVzXTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbiIsImltcG9ydCB7IE1ldGVvciB9IGZyb20gXCJtZXRlb3IvbWV0ZW9yXCI7XG5pbXBvcnQgeyBjaGVjayB9IGZyb20gXCJtZXRlb3IvY2hlY2tcIjtcbmltcG9ydCB7IFNpZ25hbFN0YXRlLCBTaWduYWxIaXN0b3J5IH0gZnJvbSBcIi9saWIvY29sbGVjdGlvbnNcIjtcbmltcG9ydCB7XG4gICAgREVGQ09OOSxcbiAgICBERUZDT043LFxuICAgIERFRkNPTjUsXG4gICAgREVGQ09ONCxcbiAgICBERUZDT04zLFxuICAgIERFRkNPTjIsXG4gICAgREVGQ09OMSxcbn0gZnJvbSBcIi9kZWJ1Zy5qc29uXCI7XG5cbi8vIGNcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gICAgREVGQ09OMyAmJiBjb25zb2xlLmxvZyhcIlNldHRpbmcgdXAgc2lnbmFsU3RhdGVcIik7XG5cbiAgICBNZXRlb3IucHVibGlzaChcInNpZ25hbFN0YXRlLmFsbFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgREVGQ09ONyAmJiBjb25zb2xlLmxvZyhcIkluIHRoZSBzdWJzY3JpYmUgZnVuY3Rpb25cIik7XG5cbiAgICAgICAgLy8gaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgICAvLyAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCBcIkFjY2VzcyBkZW5pZWRcIik7XG4gICAgICAgIC8vIH1cbiAgICAgICAgdGhpcy5hdXRvcnVuKGZ1bmN0aW9uKGNvbXB1dGF0aW9uKSB7XG4gICAgICAgICAgICBERUZDT043ICYmIGNvbnNvbGUubG9nKFwiU3Vic2NyaWJpbmcgU2lnbmFsU3RhdGVcIik7XG5cbiAgICAgICAgICAgIGNvbnN0IFNlbGVjdG9yID0ge307XG5cbiAgICAgICAgICAgIGxldCBzaWduYWxTdGF0ZSA9IFNpZ25hbFN0YXRlLmZpbmQoU2VsZWN0b3IpO1xuICAgICAgICAgICAgREVGQ09ONyAmJiBjb25zb2xlLmxvZyhzaWduYWxTdGF0ZSk7XG5cbiAgICAgICAgICAgIHJldHVybiBzaWduYWxTdGF0ZTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBNZXRlb3IucHVibGlzaChcInNpZ25hbFN0YXRlLmZhY2lsaXR5XCIsIGZ1bmN0aW9uKGZhY2lsaXR5KSB7XG4gICAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJJbiBmYWNpbGl0eSAgc3Vic2NyaWJlIGZ1bmN0aW9uXCIpO1xuICAgICAgICBjaGVjayhmYWNpbGl0eSwgU3RyaW5nKTtcbiAgICAgICAgLy8gaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgICAvLyAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCBcIkFjY2VzcyBkZW5pZWRcIik7XG4gICAgICAgIC8vIH1cbiAgICAgICAgdGhpcy5hdXRvcnVuKGZ1bmN0aW9uKGNvbXB1dGF0aW9uKSB7XG4gICAgICAgICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiKioqIFN1YnNjcmliaW5nIGZhY2lsaXR5XCIpO1xuXG4gICAgICAgICAgICBjb25zdCBTZWxlY3RvciA9IHtcbiAgICAgICAgICAgIF9pZDogbmV3IFJlZ0V4cChmYWNpbGl0eSwgXCJpXCIpICAgICBcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBzb3J0ID0gW1xuICAgICAgICAgICAgICAgIFtcInJvdXRlXCIsIDEuMF1cbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coU2VsZWN0b3IpO1xuXG4gICAgICAgICAgICBsZXQgc2lnbmFsU3RhdGUgPSBTaWduYWxTdGF0ZS5maW5kKFNlbGVjdG9yLCB7IHNvcnQ6IHNvcnQgfSk7XG4gICAgICAgICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKHNpZ25hbFN0YXRlLmZldGNoKCkpO1xuXG4gICAgICAgICAgICByZXR1cm4gc2lnbmFsU3RhdGU7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgTWV0ZW9yLnB1Ymxpc2goXCJzaWduYWxTdGF0ZS5IaXN0b3J5XCIsIGZ1bmN0aW9uKHNpZ25hbElkKSB7XG4gICAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coXCJJbiBzaWduYWxTdGF0ZSAgc3Vic2NyaWJlIGZ1bmN0aW9uXCIpO1xuICAgICAgICBjaGVjayhzaWduYWxJZCwgU3RyaW5nKTtcbiAgICAgICAgLy8gaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgICAvLyAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCBcIkFjY2VzcyBkZW5pZWRcIik7XG4gICAgICAgIC8vIH1cbiAgICAgICAgdGhpcy5hdXRvcnVuKGZ1bmN0aW9uKGNvbXB1dGF0aW9uKSB7XG4gICAgICAgICAgICBERUZDT04zICYmIGNvbnNvbGUubG9nKFwiU3Vic2NyaWJpbmcgc2lnbmFsSWRcIik7XG5cbiAgICAgICAgICAgIGNvbnN0IFNlbGVjdG9yID0ge1xuICAgICAgICAgICAgICAgIGVudGl0eUlkOiBzaWduYWxJZCxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBzb3J0ID0gW1xuICAgICAgICAgICAgICAgIFtcInRpbWVcIiwgLTEuMF1cbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgIERFRkNPTjMgJiYgY29uc29sZS5sb2coU2VsZWN0b3IpO1xuXG4gICAgICAgICAgICBsZXQgU2lnbmFsSGlzdG9yeURhdGEgPSBTaWduYWxIaXN0b3J5LmZpbmQoU2VsZWN0b3IsIHtcbiAgICAgICAgICAgICAgICBzb3J0OiBzb3J0LFxuICAgICAgICAgICAgICAgIGxpbWl0OiA0MDAsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIERFRkNPTjMgJiYgY29uc29sZS5sb2coU2lnbmFsSGlzdG9yeURhdGEuZmV0Y2goKSk7XG5cbiAgICAgICAgICAgIHJldHVybiBTaWduYWxIaXN0b3J5RGF0YTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59IiwiaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSBcIm1ldGVvci9tZXRlb3JcIjtcbmltcG9ydCB7IGNoZWNrIH0gZnJvbSBcIm1ldGVvci9jaGVja1wiO1xuaW1wb3J0IHsgV29ya09yZGVycyB9IGZyb20gXCIvbGliL2NvbGxlY3Rpb25zXCI7XG5pbXBvcnQge1xuICBERUZDT045LFxuICBERUZDT043LFxuICBERUZDT041LFxuICBERUZDT040LFxuICBERUZDT04zLFxuICBERUZDT04yLFxuICBERUZDT04xLFxufSBmcm9tIFwiL2RlYnVnLmpzb25cIjtcbmltcG9ydCB7IG9iamVjdCB9IGZyb20gXCJwcm9wLXR5cGVzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIE1ldGVvci5wdWJsaXNoKFwid29ya29yZGVycy5vcGVuLnNlYXJjaFwiLCBmdW5jdGlvbiAoZGF0YVNlbGVjdG9yLCBsaW1pdCkge1xuICAgIGlmICghdGhpcy51c2VySWQpIHtcbiAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCBcIkFjY2VzcyBkZW5pZWRcIik7XG4gICAgfVxuXG4gICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIndvcmtvcmRlcnMub3Blbi5zZWFyY2hcIik7XG4gICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhkYXRhU2VsZWN0b3IpO1xuICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2cobGltaXQpO1xuICAgIGNoZWNrKGRhdGFTZWxlY3RvciwgT2JqZWN0KTtcbiAgICBjaGVjayhsaW1pdCwgTnVtYmVyKTtcblxuICAgIHRoaXMuYXV0b3J1bihmdW5jdGlvbiAoY29tcHV0YXRpb24pIHtcbiAgICAgIHZhciBwcm9qZWN0aW9uID0ge307XG5cbiAgICAgIHZhciBzb3J0ID0gW1tcIkNyZWF0ZWRcIiwgLTFdXTtcblxuICAgICAgbGV0IG15TGltaXQgPSBsaW1pdCA/IGxpbWl0IDogMjAwO1xuXG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiR2V0IHRoZSBub2RlXCIpO1xuICAgICAgLy8gbWFrZSBhIHRpbWUgdG8gY2FsY3VsYXRlIHRoZSB0aW1lIGl0IHRha2VzIHRvIGdldCB0aGUgbm9kZVxuICAgICAgbGV0IHN0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAvLyBERUZDT041ICYmIGNvbnNvbGUubG9nKHVzZXJzV2l0aEF2YXRhcnMpO1xuICAgICAgbGV0IG5vZGVzID0gV29ya09yZGVycy5maW5kKGRhdGFTZWxlY3Rvciwge1xuICAgICAgICBwcm9qZWN0aW9uLFxuICAgICAgICBzb3J0LFxuICAgICAgICBsaW1pdDogbXlMaW1pdCxcbiAgICAgIH0pO1xuICAgICAgbGV0IGVuZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgbGV0IGV4ZWN1dGlvbiA9IGVuZCAtIHN0YXJ0O1xuICAgICAgREVGQ09ONSAmJiBjb25zb2xlLmxvZyhcIkV4ZWN1dGlvbiB0aW1lOiBcIiArIGV4ZWN1dGlvbik7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiRE9ORSBHZXQgdGhlIG5vZGVcIik7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiTnVtYmVyIG9mIG5vZGVzOiBcIiArIG5vZGVzLmNvdW50KCkpO1xuICAgICAgLy8gREVGQ09ONSAmJiBjb25zb2xlLmxvZyhub2Rlcy5mZXRjaCgpKTtcbiAgICAgIHJldHVybiBbbm9kZXNdO1xuICAgIH0pO1xuICB9KTtcbiAgTWV0ZW9yLnB1Ymxpc2goXCJ3b3Jrb3JkZXJzLnNlYXJjaFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLnVzZXJJZCkge1xuICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDEsIFwiQWNjZXNzIGRlbmllZFwiKTtcbiAgICB9XG5cbiAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwid29ya29yZGVycy5zZWFyY2hcIik7XG5cbiAgICB0aGlzLmF1dG9ydW4oZnVuY3Rpb24gKGNvbXB1dGF0aW9uKSB7XG4gICAgICB2YXIgcHJvamVjdGlvbiA9IHt9O1xuICAgICAgdmFyIGRhdGFTZWxlY3RvciA9IHt9O1xuICAgICAgdmFyIHNvcnQgPSBbW1wiY3JlYXRlZFwiLCAtMV1dO1xuICAgICAgdmFyIGxpbWl0ID0gMjAwO1xuXG4gICAgICBsZXQgbXlMaW1pdCA9IGxpbWl0ID8gbGltaXQgOiAyMDA7XG5cbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJHZXQgdGhlIG5vZGVcIik7XG4gICAgICAvLyBtYWtlIGEgdGltZSB0byBjYWxjdWxhdGUgdGhlIHRpbWUgaXQgdGFrZXMgdG8gZ2V0IHRoZSBub2RlXG4gICAgICBsZXQgc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIC8vIERFRkNPTjUgJiYgY29uc29sZS5sb2codXNlcnNXaXRoQXZhdGFycyk7XG4gICAgICBsZXQgbm9kZXMgPSBXb3JrT3JkZXJzLmZpbmQoZGF0YVNlbGVjdG9yLCB7XG4gICAgICAgIHByb2plY3Rpb24sXG4gICAgICAgIHNvcnQsXG4gICAgICAgIGxpbWl0OiBteUxpbWl0LFxuICAgICAgfSk7XG4gICAgICBsZXQgZW5kID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICBsZXQgZXhlY3V0aW9uID0gZW5kIC0gc3RhcnQ7XG4gICAgICBERUZDT041ICYmIGNvbnNvbGUubG9nKFwiRXhlY3V0aW9uIHRpbWU6IFwiICsgZXhlY3V0aW9uKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJET05FIEdldCB0aGUgbm9kZVwiKTtcbiAgICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJOdW1iZXIgb2Ygbm9kZXM6IFwiICsgbm9kZXMuY291bnQoKSk7XG4gICAgICAvLyBERUZDT041ICYmIGNvbnNvbGUubG9nKG5vZGVzLmZldGNoKCkpO1xuICAgICAgcmV0dXJuIFtub2Rlc107XG4gICAgfSk7XG4gIH0pO1xufVxuIiwiaW1wb3J0IHtNZXRlb3J9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuaW1wb3J0IEZpbGVNYW5hZ2VyIGZyb20gJy4vbGliL2ZpbGVNYW5hZ2VyL2ZpbGVtYW5hZ2VyJztcblxuUGlja2VyLnJvdXRlKCcvZmlsZS86ZmlsZVR5cGUvOmZpbGVJZCcsIGZ1bmN0aW9uIChwYXJhbXMsIHJlcSwgcmVzLCBuZXh0KSB7XG4gIGxldCB7ZmlsZVR5cGUsIGZpbGVJZH0gPSBwYXJhbXM7XG4gIHRyeSB7XG4gICAgbGV0IGZpbGVOYW1lID0gZGVjb2RlVVJJQ29tcG9uZW50KGZpbGVJZCk7XG4gICAgdmFyIGZpbGVEYXRhID0gbmV3IEZpbGVNYW5hZ2VyKGZpbGVUeXBlKS5yZWFkT3V0cHV0RmlsZUFzQnVmZmVyKGZpbGVOYW1lKTtcbiAgICByZXMuc2V0SGVhZGVyKCdDb250ZW50LWRpc3Bvc2l0aW9uJywgJ2F0dGFjaG1lbnQ7IGZpbGVuYW1lPScgKyBmaWxlTmFtZSk7XG4gICAgcmVzLmVuZChmaWxlRGF0YSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXMuZW5kKCdGaWxlIG5vdCBmb3VuZCEnKTtcbiAgfVxuXG5cbn0pO1xuIiwiaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSAnbWV0ZW9yL21ldGVvcic7XG5pbXBvcnQgcHVibGljYXRpb25zIGZyb20gJy4vcHVibGljYXRpb25zJztcbmltcG9ydCBtZXRob2RzIGZyb20gJy4vbWV0aG9kcyc7XG5pbXBvcnQgYWRkSW5pdGlhbERhdGEgZnJvbSAnLi9jb25maWdzL2luaXRpYWxfYWRkcy5qcyc7XG5pbXBvcnQgaTE4biBmcm9tICdtZXRlb3IvdW5pdmVyc2U6aTE4bic7XG5pbXBvcnQge1xuICAgIERFRkNPTjksXG4gICAgREVGQ09ONyxcbiAgICBERUZDT041LFxuICAgIERFRkNPTjQsXG4gICAgREVGQ09OMyxcbiAgICBERUZDT04yLFxuICAgIERFRkNPTjFcbn0gZnJvbSBcIi9kZWJ1Zy5qc29uXCI7XG5pbXBvcnQgQXBwQ29uZmlnIGZyb20gXCIuL2NvbmZpZ3MvYXBwXCI7XG5cbnB1YmxpY2F0aW9ucygpO1xubWV0aG9kcygpO1xuYWRkSW5pdGlhbERhdGEoKTtcblxuLy9cbk1ldGVvci5zdGFydHVwKCgpID0+IHtcbiAgLy8gV2ViQXBwLnJhd0Nvbm5lY3RIYW5kbGVycy51c2UoZnVuY3Rpb24ocmVxLCByZXMsIG5leHQpIHtcbiAgLy8gICAgIHJlcy5zZXRIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiwgXCIqXCIpO1xuICAvLyAgICAgcmVzLnNldEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnNcIiwgXCJBdXRob3JpemF0aW9uLENvbnRlbnQtVHlwZVwiKTtcbiAgLy8gICAgIHJldHVybiBuZXh0KCk7XG4gIC8vIH0pO1xuICAvLyB9KTtcbiAgREVGQ09OMiAmJiBjb25zb2xlLmxvZyhcIiogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiBcIik7XG4gIERFRkNPTjIgJiYgY29uc29sZS5sb2coXCJTdGFydGluZyBOZXB0dW5lIFBPRCBNZXRlb3Igc2VydmVyIHNlcXVlbmNlXCIpO1xuICBERUZDT04yICYmIGNvbnNvbGUubG9nKEFwcENvbmZpZy5uYW1lKTtcbiAgREVGQ09OMiAmJiBjb25zb2xlLmxvZyhBcHBDb25maWcudmVyc2lvbl9idWlsZF9kYXRlKTtcbiAgREVGQ09OMiAmJiBjb25zb2xlLmxvZyhcIlJ1bm5pbmcgb24gXCIgKyBNZXRlb3IucmVsZWFzZSk7XG4gIERFRkNPTjIgJiYgY29uc29sZS5sb2coXCIqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogXCIpO1xuICBBY2NvdW50cy51cmxzLnJlc2V0UGFzc3dvcmQgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICByZXR1cm4gTWV0ZW9yLmFic29sdXRlVXJsKFwicmVzZXQtcGFzc3dvcmQvXCIgKyB0b2tlbik7XG4gIH07XG5cbiAgQWNjb3VudHMuZW1haWxUZW1wbGF0ZXMuc2l0ZU5hbWUgPSBpMThuLl9fKFwiRW1haWxfU2l0ZU5hbWVfVGV4dFwiKTtcbiAgQWNjb3VudHMuZW1haWxUZW1wbGF0ZXMuZnJvbSA9IGkxOG4uX18oXCJFbWFpbF9Gcm9tX1RleHRcIik7XG5cbiAgQWNjb3VudHMuZW1haWxUZW1wbGF0ZXMucmVzZXRQYXNzd29yZCA9IHtcbiAgICBzdWJqZWN0KHVzZXIpIHtcbiAgICAgIHJldHVybiBpMThuLl9fKFwiRW1haWxfUmVzZXRQYXNzd29yZF9TdWJqZWN0XCIpO1xuICAgIH0sXG5cbiAgICBodG1sKHVzZXIsIHVybCkge1xuICAgICAgbGV0IHVybFRhZyA9IGA8YSBocmVmPVwiJHt1cmx9XCI+JHt1cmx9PC9hPmA7XG4gICAgICByZXR1cm4gaTE4bi5fXyhcIkVtYWlsX1Jlc2V0UGFzc3dvcmRfVGV4dFwiLCB7IHVybFRhZyB9KTtcbiAgICB9LFxuICB9O1xuXG4gIEFjY291bnRzLm9uQ3JlYXRlVXNlcigob3B0aW9ucywgdXNlcikgPT4ge1xuICAgIERFRkNPTjUgJiYgY29uc29sZS5sb2coXCJDcmVhdGluZyB1c2VyIHhcIik7XG5cbiAgICB1c2VyLnN0YXR1cyA9IFwiYWN0aXZlXCI7XG4gICAgdXNlci5uYW1lID0gb3B0aW9ucy5uYW1lO1xuICAgIHJldHVybiB1c2VyO1xuICB9KTtcblxuICBBY2NvdW50cy52YWxpZGF0ZUxvZ2luQXR0ZW1wdChmdW5jdGlvbiAobG9naW5SZXF1ZXN0KSB7XG4gICAgaWYgKGxvZ2luUmVxdWVzdC51c2VyKSB7XG4gICAgICBpZiAoIWxvZ2luUmVxdWVzdC51c2VyLnN0YXR1cyB8fCBsb2dpblJlcXVlc3QudXNlci5zdGF0dXMgIT0gXCJhY3RpdmVcIilcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDMsIGkxOG4uX18oXCJFcnJvcl9BY2NvdW50X05vdEFjdGl2ZVwiKSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9KTtcblxuICBBY2NvdW50cy5vbkxvZ2luKChsb2dpbkluZm8pID0+IHtcbiAgICBpZiAoXG4gICAgICBsb2dpbkluZm8gJiZcbiAgICAgIGxvZ2luSW5mby5hbGxvd2VkID09PSB0cnVlICYmXG4gICAgICBsb2dpbkluZm8udHlwZSAhPT0gXCJyZXN1bWVcIlxuICAgICkge1xuICAgIH1cbiAgfSk7XG59KTsiLCJpbXBvcnQgdCBmcm9tICd0Y29tYi1mb3JtJ1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnXG5cbmNvbnN0IERhdGVTdHJpbmdUcmFuc2Zvcm1lciA9IGZ1bmN0aW9uIChmb3JtYXRTdHJpbmcpIHtcblxuICByZXR1cm4ge1xuICAgIGZvcm1hdDogKHZhbHVlKSA9PiB7XG4gICAgICBpZiAodC5EYXRlLmlzKHZhbHVlKSkge1xuICAgICAgICBsZXQgbW9tZW50RGF0ZSA9IG1vbWVudCh2YWx1ZSk7XG4gICAgICAgIHJldHVybiBtb21lbnREYXRlLmZvcm1hdChmb3JtYXRTdHJpbmcpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgcGFyc2U6IChzdHIpID0+IHtcbiAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgcmV0dXJuIHN0ciA/IG1vbWVudC5wYXJzZShzdHIpLnRvRGF0ZSgpIDogbnVsbFxuICAgIH1cbiAgfVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBEYXRlU3RyaW5nVHJhbnNmb3JtZXI7XG4iLCJpbXBvcnQgeyBNb25nbyB9IGZyb20gXCJtZXRlb3IvbW9uZ29cIjtcbmltcG9ydCB7XG4gIERFRkNPTjksXG4gIERFRkNPTjcsXG4gIERFRkNPTjUsXG4gIERFRkNPTjQsXG4gIERFRkNPTjMsXG4gIERFRkNPTjIsXG4gIERFRkNPTjEsXG59IGZyb20gXCIvcGFja2FnZS5qc29uXCI7XG5cbmV4cG9ydCBjb25zdCBVc2VycyA9IG5ldyBNb25nby5Db2xsZWN0aW9uKFwiVXNlcnNcIik7XG5cbmV4cG9ydCBjb25zdCBTeXN0ZW1Db25maWcgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbihcInN5c3RlbWNvbmZpZ1wiKTtcbmV4cG9ydCBjb25zdCBBY3Rpb25Mb2cgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbihcImFjdGlvbkxvZ1wiKTtcbmV4cG9ydCBjb25zdCBUZXh0c1ZlcnNpb25zID0gbmV3IE1vbmdvLkNvbGxlY3Rpb24oXCJ0ZXh0c3ZlcnNpb25zXCIpO1xuZXhwb3J0IGNvbnN0IE5vdGljZXMgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbihcIm5vdGljZXNcIik7XG5leHBvcnQgY29uc3QgTm90aWNlc1VzZXJTdGF0dXMgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbihcIm5vdGljZXNfdXNlcnN0YXR1c1wiKTtcblxuZXhwb3J0IGNvbnN0IENoYXRMaW5lcyA9IG5ldyBNb25nby5Db2xsZWN0aW9uKFwiY2hhdGxpbmVzXCIpO1xuZXhwb3J0IGNvbnN0IENoYXRSb29tcyA9IG5ldyBNb25nby5Db2xsZWN0aW9uKFwiY2hhdHJvb21zXCIpO1xuXG4vLyBtYWtlIGNvbGxlY3Rpb25zIGZvciBrZXl2YWx1ZSwga2V5dmFsdWVfY2xhc3MsIGtleXZhbHVlX2dyb3VwLCBrZXl2YWx1ZV9jb250ZXh0XG5leHBvcnQgY29uc3QgS2V5VmFsdWVzID0gbmV3IE1vbmdvLkNvbGxlY3Rpb24oXCJrZXl2YWx1ZXNcIik7XG5leHBvcnQgY29uc3QgS2V5VmFsdWVDbGFzc2VzID0gbmV3IE1vbmdvLkNvbGxlY3Rpb24oXCJrZXl2YWx1ZUNsYXNzZXNcIik7XG5leHBvcnQgY29uc3QgS2V5VmFsdWVHcm91cHMgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbihcImtleXZhbHVlR3JvdXBzXCIpO1xuZXhwb3J0IGNvbnN0IEtleVZhbHVlQ29udGV4dHMgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbihcImtleXZhbHVlQ29udGV4dHNcIik7XG4vL1xuXG5leHBvcnQgY29uc3QgQ29udGVudHMgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbihcImNvbnRlbnRzXCIpO1xuZXhwb3J0IGNvbnN0IFdvcmtPcmRlcnMgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbihcIndvcmtvcmRlcnNcIik7XG5cbmV4cG9ydCBjb25zdCBUYWdDbGFzc2VzID0gbmV3IE1vbmdvLkNvbGxlY3Rpb24oXCJ0YWdjbGFzc2VzXCIpO1xuZXhwb3J0IGNvbnN0IFRhZ3MgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbihcInRhZ3NcIik7XG5cbkRFRkNPTjUgJiYgY29uc29sZS5sb2coXCJGaXhpbmcgY29sbGVjdGlvbnMuLi5cIik7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBjb25zdCBVU0VSX0FDVElPTl9BQ1RJVkFURSA9IFwiYWN0aXZhdGVcIjtcbmV4cG9ydCBjb25zdCBVU0VSX0FDVElPTl9ERUFDVElWQVRFID0gXCJkZWFjdGl2YXRlXCI7XG5leHBvcnQgY29uc3QgVVNFUl9BQ1RJT05fQUREID0gXCJhZGRcIjtcbmV4cG9ydCBjb25zdCBVU0VSX1NUQVRVU19BQ1RJVkUgPSBcImFjdGl2ZVwiO1xuZXhwb3J0IGNvbnN0IFVTRVJfU1RBVFVTX0lOQUNUSVZFID0gXCJpbmFjdGl2ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25zdGFudHMge1xuICBzdGF0aWMgQ2FyZE1vZGUgPSB7XG4gICAgUEVSU09OOiBcIjEwMFwiLFxuICAgIE5FV09SREVSOiBcIjIwMFwiLFxuICAgIE9SREVSOiBcIjMwMFwiLFxuICB9O1xuXG4gIHN0YXRpYyBDYXJkU3RhdHVzID0ge1xuICAgIE5BOiBcIjBcIixcbiAgICBRQTogXCIxMDAwXCIsXG4gICAgUlFBOiBcIjIwMDBcIixcbiAgICBORVc6IFwiNTAwMFwiLFxuICAgIEZVVFVSRTogXCI2MDAwXCIsXG4gICAgT0s6IFwiODAwMFwiLFxuICB9O1xuXG4gIHN0YXRpYyBPcmRlclByb2Nlc3NTdGF0dXNlcyA9IHtcbiAgICBJTklUOiBcIjBcIixcbiAgICBQRU5ESU5HOiBcIjEwXCIsXG4gICAgT1BFTjEwMDogXCIxMDBcIixcbiAgICBPUEVOMTEwOiBcIjExMFwiLFxuICAgIE9QRU41MDA6IFwiNTAwXCIsXG4gICAgRlVUVVJFOiBcIjYwMFwiLFxuICAgIFRJTUVDSEVDSzogXCIxMDAwXCIsXG4gICAgUUFDSEVDSzogXCI0MDAwXCIsXG4gICAgUFVCTElTSDogXCI1MDAwXCIsXG4gICAgQ09NUExFVEVEOiBcIjgwMDBcIixcbiAgICBTVVNQRU5DRTkxMDogXCI5MTBcIixcbiAgICBTVVNQRU5DRTk1MDogXCI5NTBcIixcbiAgICBTVVNQRU5DRTk5MDogXCI5OTBcIixcbiAgICBDQU5DRUxMRUQ6IFwiOTk5XCIsXG4gIH07XG5cbiAgc3RhdGljIE9yZGVyVHlwZSA9IHtcbiAgICBORVdfUEVSU09OOiBcIjEwMFwiLFxuICAgIE1JR1JBVElPTjogXCIxODhcIixcbiAgICBSRUxBVElPTl9VUERBVEU6IFwiMTg5XCIsXG4gICAgUkVMQVRJT05fSU5TRVJUOiBcIjE5MFwiLFxuICAgIENPUkU6IFwiMjAwXCIsXG4gICAgVVJJOiBcIjIwMVwiLFxuICAgIFNTTjogXCIyMDJcIixcbiAgICBBRERSRVNTOiBcIjIwM1wiLFxuICAgIE5BTUU6IFwiMjA1XCIsXG4gICAgUk9MRV9JTlNFUlQ6IFwiMjA2XCIsXG4gICAgUk9MRV9VUERBVEU6IFwiMjA3XCIsXG4gIH07XG5cbiAgc3RhdGljIGFjdGl2ZUNhcmQgPSB7XG4gICAgUkVMQVRJT05fVVBEQVRFOiBcIlJFTEFUSU9OX1VQREFURVwiLFxuICAgIFJFTEFUSU9OX0lOU0VSVDogXCJSRUxBVElPTl9JTlNFUlRcIixcbiAgICBST0xFX1VQREFURTogXCJST0xFX1VQREFURVwiLFxuICAgIFJPTEVfSU5TRVJUOiBcIlJPTEVfSU5TRVJUXCIsXG4gICAgQ09SRTogXCJDT1JFXCIsXG4gICAgVVJJOiBcIlVSSVwiLFxuICAgIFNTTjogXCJTU05cIixcbiAgICBOQU1FOiBcIk5BTUVcIixcbiAgICBBRERSRVNTOiBcIkFERFJFU1NcIixcbiAgICBST0xFUzogXCJST0xFU1wiLFxuICB9O1xuXG4gIHN0YXRpYyBHZW5kZXIgPSB7XG4gICAgRkVNQUxFOiBcIktcIixcbiAgICBNQUxFOiBcIk1cIixcbiAgfTtcblxuICBzdGF0aWMgT3JkZXJQcm9jZXNzTWV0aG9kID0ge1xuICAgIEVYUFJFU1M6IFwiRVwiLFxuICAgIERFRkFVTFQ6IFwiRFwiLFxuICB9O1xuXG4gIHN0YXRpYyBkYXRlUHJlY2lzaW9uID0ge1xuICAgIFVOREVGOiBcInVcIixcbiAgICBZRUFSOiBcIllcIixcbiAgICBNT05USDogXCJNXCIsXG4gICAgREFZOiBcIkRcIixcbiAgfTtcblxuICBzdGF0aWMgb3JkZXJUeXBlVGVjaG5pY2FsID0ge1xuICAgIE5FV19QRVJTT05fT1JERVI6IFwiMzg0XCIsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRWYWx1ZXMgPSB7XG4gICAgT1JERVJJRDogXCI5OTk5OTk5OVwiLFxuICB9O1xuXG4gIHN0YXRpYyBtb3RoZXJDaGVja1N0YXRlID0ge1xuICAgIE9LOiAwLFxuICAgIFdBUk5JTkc6IDEwMCxcbiAgICBFUlJPUl9HRU5FUklDOiA5OTksXG4gICAgRVJST1I6IDk5OSxcbiAgfTtcblxuICBzdGF0aWMgcGVyc29uTmFtZVR5cGVzID0ge1xuICAgIFBSRVZJT1VTX05BTUVTOiBcIjFcIixcbiAgICBBTFRFUk5BVElWRV9OQU1FUzogXCIyXCIsXG4gICAgUFJJTUFSWV9OQU1FOiBcIjNcIixcbiAgICBSRUdJU1RSRURfTkFNRTogXCI0XCIsXG4gIH07XG5cbiAgc3RhdGljIE5vdGlzZUNsYXNzID0ge1xuICAgIENPTlRFTlRfVVBEQVRFRDogXCJjb250ZW50X3VwZGF0ZWRcIixcbiAgICBDT05URU5UX0NMT05FRDogXCJjb250ZW50X2Nsb25lZFwiLFxuICAgIEFSVElDTEVfQUNUSU9OX0NPTlRFTlRfVVBEQVRFOiBcImFydGljbGVfYWN0aW9uX2NvbnRlbnRfdXBkYXRlXCIsXG4gICAgQVJUSUNMRV9TVEFUVVNfT1BFTjogXCJhcnRpY2xlX3N0YXR1c19vcGVuXCIsXG4gICAgQVJUSUNMRV9TVEFUVVNfUkVWSUVXOiBcImFydGljbGVfc3RhdHVzX3Jldmlld1wiLFxuICAgIEFSVElDTEVfU1RBVFVTX1JFUVVFU1RfRk9SX1BVQkxJQ0FUSU9OOlxuICAgICAgXCJhcnRpY2xlX3N0YXR1c19yZXF1ZXN0X2Zvcl9wdWJsaWNhdGlvblwiLFxuICAgIEFSVElDTEVfU1RBVFVTX0FQUFJPVkVEX0ZPUl9QVUJMSUNBVElPTjpcbiAgICAgIFwiYXJ0aWNsZV9zdGF0dXNfYXBwcm92ZWRfZm9yX3B1YmxpY2F0aW9uXCIsXG4gICAgQVJUSUNMRV9TVEFUVVNfUFVCTElTSEVEOiBcImFydGljbGVfc3RhdHVzX3B1Ymxpc2hlZFwiLFxuICAgIENIQVRfQUNUSU9OX05FV19NRVNTQUdFOiBcImNoYXRfYWN0aW9uX25ld19tZXNzYWdlXCIsXG4gICAgR1JPVVBfQUNUSU9OX05FV19NRU1CRVI6IFwiZ3JvdXBfYWN0aW9uX25ld19tZW1iZXJcIixcbiAgfTtcblxuICBzdGF0aWMgTG9hZGluZ0NvbXBvbmVudCA9ICgpID0+IDxkaXY+IC4uLiA8L2Rpdj47XG59XG4iLCJpbXBvcnQge01ldGVvcn0gZnJvbSAnbWV0ZW9yL21ldGVvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZyB7XG4gIHN0YXRpYyBpbmZvID0gKGNvbnRlbnQsIGNhbGxiYWNrKSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coYExvZ2dpbmcgJHtjb250ZW50fSBvbiBzZXJ2ZXJgKTtcbiAgICBNZXRlb3IuY2FsbCgnbG9nLmluZm8nLCBjb250ZW50LCAoZXJyLCByZXN1bHQpID0+IHtcbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayhlcnIsIHJlc3VsdCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbn1cblxuXG5cbiIsImltcG9ydCB7TWV0ZW9yfSBmcm9tICdtZXRlb3IvbWV0ZW9yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFuZG9tIHtcbiAgc3RhdGljIGdlbmVyYXRlU3RyaW5nID0gKGxlbmd0aCkgPT4ge1xuICAgIGlmICghbGVuZ3RoKSB7XG4gICAgICBsZW5ndGggPSA1O1xuICAgIH1cbiAgICBsZXQgdGV4dCA9IFwiXCI7XG4gICAgY29uc3QgcG9zc2libGUgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5XCI7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKVxuICAgICAgdGV4dCArPSBwb3NzaWJsZS5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zc2libGUubGVuZ3RoKSk7XG5cbiAgICByZXR1cm4gdGV4dDtcbiAgfTtcblxufVxuXG5cblxuIiwiLy8gTWV0ZW9yLnVzZXJzLmRlbnkgKHtcbi8vICAgaW5zZXJ0OiAodXNlcklkLCBkb2MsIGZpZWxkcywgbW9kaWZpZXIpID0+IHRydWUsXG4vLyAgIHVwZGF0ZTogKHVzZXJJZCwgZG9jLCBmaWVsZHMsIG1vZGlmaWVyKSA9PiB0cnVlLFxuLy8gICByZW1vdmU6ICh1c2VySWQsIGRvYywgZmllbGRzLCBtb2RpZmllcikgPT4gdHJ1ZSxcbi8vIH0pXG5cbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBjb25zdCBQaG9uZSA9IEFzdHJvLkNsYXNzKHtcbiAgbmFtZTogJ1Bob25lJyxcbiAgZmllbGRzOiB7XG4gICAgbmFtZToge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICB2YWxpZGF0b3I6IFtWYWxpZGF0b3JzLm1pbkxlbmd0aCgzKV1cbiAgICB9LFxuICAgIG51bWJlcjoge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICB2YWxpZGF0b3I6IFtWYWxpZGF0b3JzLm1pbkxlbmd0aCg5KV1cbiAgICB9LFxuICAgIHV1aWQ6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgfVxuICB9XG59KTtcblxuZXhwb3J0IGNvbnN0IEVtYWlsID0gQXN0cm8uQ2xhc3Moe1xuICBuYW1lOiAnRW1haWwnLFxuICBmaWVsZHM6IHtcbiAgICBhZGRyZXNzOiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgLy8gdmFsaWRhdG9yOiBbXG4gICAgICAvLyAgIFZhbGlkYXRvcnMubWluTGVuZ3RoKDMpXG4gICAgICAvLyBdXG4gICAgfSxcbiAgICB2ZXJpZmllZDoge1xuICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgIC8vIHZhbGlkYXRvcjogW1xuICAgICAgLy8gICBWYWxpZGF0b3JzLm1pbkxlbmd0aCg5KVxuICAgICAgLy8gXVxuICAgIH1cbiAgfVxufSk7XG5cbmV4cG9ydCBjb25zdCBVc2VyUHJvZmlsZSA9IEFzdHJvLkNsYXNzKHtcbiAgbmFtZTogJ1VzZXJQcm9maWxlJyxcbiAgZmllbGRzOiB7XG4gICAgLyogQW55IGZpZWxkcyB5b3Ugd2FudCB0byBiZSBwdWJsaXNoZWQgdG8gdGhlIGNsaWVudCAqL1xuICAgIGRlc2NyaXB0aW9uOiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgIH1cbiAgICAvLyBsYXN0TmFtZToge1xuICAgIC8vICAgdHlwZTogJ3N0cmluZycsXG4gICAgLy8gfSxcbiAgICAvLyAncGhvbmVzJzoge1xuICAgIC8vICAgdHlwZTogJ2FycmF5JyxcbiAgICAvLyAgIG5lc3RlZDogJ1Bob25lJyxcbiAgICAvLyAgIGRlZmF1bHQ6IGZ1bmN0aW9uKCkge1xuICAgIC8vICAgICByZXR1cm4gW107XG4gICAgLy8gICB9XG4gICAgLy8gfSxcbiAgICAvLyBuaWNrbmFtZVxuICB9XG59KTtcblxuY29uc3QgVXNlciA9IEFzdHJvLkNsYXNzKHtcbiAgbmFtZTogJ1VzZXInLFxuICBjb2xsZWN0aW9uOiBNZXRlb3IudXNlcnMsXG4gIGZpZWxkczoge1xuICAgIC8vIGVtYWlsczoge1xuICAgIC8vICAgdHlwZTogJ2FycmF5JyxcbiAgICAvLyAgIGRlZmF1bHQ6IGZ1bmN0aW9uKCkge1xuICAgIC8vICAgICByZXR1cm4gW107XG4gICAgLy8gICB9XG4gICAgLy8gfSxcblxuICAgIGVtYWlsczoge1xuICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgIG5lc3RlZDogJ0VtYWlsJyxcbiAgICAgIGRlZmF1bHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG4gICAgfSxcbiAgICBjcmVhdGVkQXQ6ICdkYXRlJyxcbiAgICBwcm9maWxlOiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgIH0sXG4gICAgcm9sZXM6IHtcbiAgICAgIHR5cGU6ICdhcnJheScsXG4gICAgICBkZWZhdWx0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfVxuICAgIH0sXG4gICAgX2lzczoge1xuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgfSxcbiAgICBfaXNhOiB7XG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICB9LFxuXG4gICAgYXZhdGFyX3VyaToge1xuICAgICAgdHlwZTogJ3N0cmluZydcbiAgICB9LFxuICAgIHN0YXR1czoge1xuICAgICAgdHlwZTogJ3N0cmluZydcbiAgICB9LFxuICAgIG5hbWU6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgfSxcbiAgICB1aWQ6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgZmlyc3RFbWFpbDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gXy5nZXQodGhpcywgJ2VtYWlsc1swXS5hZGRyZXNzJywgbnVsbCk7XG4gICAgfVxuICAgIC8vICxhY2xJcyA6IGZ1bmN0aW9uKHJvbGVTbHVnKSB7XG4gICAgLy8gICAgY29uc29sZS5sb2cgKCdVVXNlci0+YWNsSXNJblJvbGUgcm9sZS1zbHVnJywgcm9sZVNsdWcpO1xuICAgIC8vICAgIGNvbnNvbGUubG9nKHRoaXMucm9sZXMpXG4gICAgLy8gICByZXR1cm4gXy5jb250YWlucyh0aGlzLnJvbGVzLCByb2xlU2x1Zyk7XG4gICAgLy8gfVxuICB9XG59KTtcblxuaWYgKE1ldGVvci5pc1NlcnZlcikge1xuICBVc2VyLmV4dGVuZCh7XG4gICAgZmllbGRzOiB7XG4gICAgICBzZXJ2aWNlczogXCJvYmplY3RcIixcbiAgICAgIGxhbmd1YWdlOiBcInN0cmluZ1wiLFxuICAgICAgYXZhdGFyX3VyaTogXCJzdHJpbmdcIixcbiAgICAgIG5hbWU6IFwic3RyaW5nXCIsXG4gICAgICB1aWQ6IFwic3RyaW5nXCIsXG4gICAgICB0aGVtZTogXCJib29sZWFuXCJcbiAgICB9LFxuICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgVXNlcjtcbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgb3B0aW9uYWw6ICcgKG9wdGlvbmFsKScsXG4gIHJlcXVpcmVkOiAnJyxcbiAgYWRkOiAnQWRkJyxcbiAgcmVtb3ZlOiAnUmVtb3ZlJyxcbiAgdXA6ICdVcCcsXG4gIGRvd246ICdEb3duJ1xufVxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICBvcHRpb25hbDogJyAodmFsZnJpKScsXG4gIHJlcXVpcmVkOiAnJyxcbiAgYWRkOiAnRm9nYScsXG4gIHJlbW92ZTogJ0F2bMOkZ3NuYScsXG4gIHVwOiAnVXBwJyxcbiAgZG93bjogJ05lZCdcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHdhbGxhYnkpIHtcbiAgLy8gVGhlcmUgaXMgYSB3ZWlyZCBlcnJvciB3aXRoIHRoZSBtdWkgYW5kIG1hbnRyYS5cbiAgLy8gU2VlOiBodHRwczovL2dvby5nbC9jTEg4aWJcbiAgLy8gVXNpbmcgcmVxdWlyZSBoZXJlIHNlZW1zIHRvIGJlIHRoZSBlcnJvci5cbiAgLy8gUmVuYW1pbmcgaXQgaW50byBgbG9hZGAganVzdCBmaXhlZCB0aGUgaXNzdWUuXG4gIHZhciBsb2FkID0gcmVxdWlyZTtcblxuICByZXR1cm4ge1xuICAgIGZpbGVzOiBbXG4gICAgICAnY2xpZW50L21vZHVsZXMvKiovY29tcG9uZW50cy8qLmpzeCcsXG4gICAgICAnY2xpZW50L21vZHVsZXMvKiovYWN0aW9ucy8qLmpzJyxcbiAgICAgICdjbGllbnQvbW9kdWxlcy8qKi9jb250YWluZXJzLyouanMnLFxuICAgICAgJ2NsaWVudC9tb2R1bGVzLyoqL2xpYnMvKi5qcydcbiAgICBdLFxuICAgIHRlc3RzOiBbXG4gICAgICAnY2xpZW50LyoqL3Rlc3RzLyouanMnXG4gICAgXSxcbiAgICBjb21waWxlcnM6IHtcbiAgICAgICAnKiovKi5qcyonOiB3YWxsYWJ5LmNvbXBpbGVycy5iYWJlbCh7XG4gICAgICAgICBiYWJlbDogbG9hZCgnYmFiZWwtY29yZScpLFxuICAgICAgICAgcHJlc2V0czogWydlczIwMTUnLCAnc3RhZ2UtMicsICdyZWFjdCddXG4gICAgICAgfSlcbiAgICB9LFxuICAgIGVudjoge1xuICAgICAgdHlwZTogJ25vZGUnXG4gICAgfSxcbiAgICB0ZXN0RnJhbWV3b3JrOiAnbW9jaGEnXG4gIH07XG59O1xuIl19
