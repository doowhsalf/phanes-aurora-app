import {Admins, Workgroups, WorkgroupUsers, PublishingRegions, Articles} from '/lib/collections';
import Constants from '/lib/constants';
import Workgroup from "./workgroup";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";

export default {

  isSuperAdmin: function (userId) {

    const admin = Admins.findOne({status: 'active', userId, roleId: Constants.UserRoles.SUPER_ADMIN});
    return !!admin;
  },

  isRegionAdmin: function (userId, regionId) {

    if (!regionId || !userId) {
      return false;
    }

    let regionIds = [];

    if (Array.isArray(regionId)) {
      regionIds = regionId;
    }
    else {
      regionIds.push(regionId)
    }

    const regionAdmin = Admins.findOne({
      status: 'active', userId, regionId: {$in: regionIds},
      roleId: Constants.UserRoles.REGION_ADMIN
    });

    return !!regionAdmin || this.isSuperAdmin(userId);

  },

  isAnyRegionAdmin: function (userId) {

    if (!userId) {
      return false;
    }

    const regionAdmin = Admins.findOne({
      status: 'active', userId,
      roleId: Constants.UserRoles.REGION_ADMIN
    });

    return !!regionAdmin || this.isSuperAdmin(userId);

  }
  ,

  isWorkgroupRegionAdmin: function (userId, workgroupId) {

    if (!workgroupId || !userId) {
      return false;
    }

    const workgroup = Workgroups.findOne({status: 'active', '_id': workgroupId});

    const regionIds = workgroup && workgroup.field_publishing_region
      ? workgroup.field_publishing_region : [];


    const regionAdmin = Admins.findOne({
      status: 'active', userId, regionId: {$in: regionIds},
      roleId: Constants.UserRoles.REGION_ADMIN
    });

    return !!regionAdmin || this.isSuperAdmin(userId);

  }
  ,
  isArticlesRegionAdmin: function (userId, articleId) {

    if (!articleId || !userId) {
      return false;
    }

    const article = Articles.findOne({status: 'active', '_id': articleId});

    const regionIds = article && article.publishingRegions
      ? article.publishingRegions : [];


    const regionAdmin = Admins.findOne({
      status: 'active', userId, regionId: {$in: regionIds},
      roleId: Constants.UserRoles.REGION_ADMIN
    });

    return !!regionAdmin || this.isSuperAdmin(userId);

  }
  ,

  isArticlesWorkgroupAdmin: function (userId, articleId) {

    if (!articleId || !userId) {
      return false;
    }
    const article = Articles.findOne({status: 'active', _id: articleId});
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
      status: 'active', user_id: userId,
      workgroup_id: workgroupId,
      user_group_role: Constants.UserRoles.WORKGROUP_ADMIN
    });

    const isWorkgroupAdmin = !!workgroupAdmin;

    const workgroup = Workgroups.findOne({status: 'active', '_id': workgroupId});

    const regionIds = workgroup && workgroup.field_publishing_region
      ? workgroup.field_publishing_region : [];
    const result = isWorkgroupAdmin || this.isRegionAdmin(userId, regionIds) || this.isSuperAdmin(userId);
    return result;
  }
  ,

  getAdminRegionIds: function (userId) {
    if (this.isSuperAdmin(userId)) {
      return PublishingRegions.find({status: 'active'}).fetch().map(region => region._id);
    }

    const regionsFromRole = Admins.find({
      status: 'active', userId,
      roleId: Constants.UserRoles.REGION_ADMIN
    }).fetch().map(adminRole => adminRole.regionId);

    return regionsFromRole ? regionsFromRole : [];

  },

  getAdminWorkgroupIds: function (userId) {
    const regionIds = this.getAdminRegionIds(userId);
    const workgroupIds = Workgroups.find(
      {
        status: 'active',
        'field_publishing_region': {$in: regionIds}
      })
      .fetch().map(workgroup => workgroup._id);
    return workgroupIds;

  },

  getRegionAdminsIds: function (regionId) {

    const adminsForRegion = Admins.find({
      status: 'active',
      roleId: Constants.UserRoles.REGION_ADMIN,
      regionId
    }).fetch().map(adminRole => adminRole.userId);

    return adminsForRegion ? adminsForRegion : [];

  }
  ,

  getRegionAdminsCursor: function (regionId) {

    return Admins.find({
      status: 'active',
      roleId: Constants.UserRoles.REGION_ADMIN,
      regionId
    });

  }

}
