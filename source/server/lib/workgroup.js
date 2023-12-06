import {check} from 'meteor/check';
import {Workgroups, WorkgroupUsers, UserWorkgroupRoles, WorkgroupVouchers} from '/lib/collections';

import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";
const ADMIN_ROLE_NAME = 'Admin';
const MEMBER_ROLE_NAME = 'Member';

export default class Workgroup {

    constructor(workgroupId, userId) {
        this.workgroupId = workgroupId;
        this.userId = userId;
        this.workgroup = null;
    }

    static getUserWorkgroupIds(userId, asAdmin) {
        const role = UserWorkgroupRoles.findOne({name: asAdmin ? ADMIN_ROLE_NAME : MEMBER_ROLE_NAME});

        return WorkgroupUsers
            .find({
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

        const workgroupIds = Workgroups.find({status: 'active', field_publishing_region: {$in: ids}})
            .fetch().map(w => w._id);

        //DEFCON5 && console.log ('WORKGROUPS FOR REGIONS: ');
        //DEFCON5 && console.log (regionIds);
        //DEFCON5 && console.log (workgroupIds);
        return workgroupIds;
    }

    getWorkgroupEntity() {
        if (!this.workgroup) {
            const workgroup = Workgroups.findOne({_id: this.workgroupId, status: 'active'});
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

            Workgroups.update(
                {_id: this.workgroupId},
                {$addToSet: {field_publishing_region: regionId}});

            Workgroups.update(
                {_id: this.workgroupId},
                {$set: {modifiedBy: this.userId, modifiedAt: new Date()}});
        }
    }

    removeWorkgroupRegion(regionId) {
        if (this.workgroupId && regionId) {

            Workgroups.update(
                {_id: this.workgroupId},
                {$pull: {field_publishing_region: regionId}});

            Workgroups.update(
                {_id: this.workgroupId},
                {$set: {modifiedBy: this.userId, modifiedAt: new Date()}});
        }
    }

    updateField(fieldName, value) {
        const currentUser = this.userId;
        const currentDate = new Date();

        if (this.workgroupId) {

            const values = {
                modifiedBy: currentUser,
                modifiedAt: currentDate,
            };
            values[fieldName] = value;

            Workgroups.update({_id: this.workgroupId},
                {
                    $set: values
                })
        }

    }

    isUserAdminInWorkgroup(workgroupId) {
        if (!workgroupId) {
            //console.log(`Checking if user ${this.userId} is admin for workgroup ${this.workgroupId}`);
        } else {
            //console.log(`Checking if user ${this.userId} is admin for workgroup ${workgroupId}`);
        }

        const adminRole = UserWorkgroupRoles.findOne({name: ADMIN_ROLE_NAME});
        if (adminRole) {

            const selectedWorkgroups = WorkgroupUsers
                .find({
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
        const adminRole = UserWorkgroupRoles.findOne({name: ADMIN_ROLE_NAME});
        if (adminRole) {

            const selectedWorkgroups = WorkgroupUsers
                .find({
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
        const adminRole = UserWorkgroupRoles.findOne({name: ADMIN_ROLE_NAME});
        if (adminRole) {
            const selectedWorkgroups = WorkgroupUsers
                .find({
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

        const adminRole = UserWorkgroupRoles.findOne({name: ADMIN_ROLE_NAME});
        if (adminRole) {
            const adminWorkgroupUsers = WorkgroupUsers
                .find({
                    workgroup_id: this.workgroupId,
                    status: 'active',
                    user_group_role: adminRole._id
                }).fetch();

            adminWorkgroupUsers.forEach(workgroupUser => admins.push(workgroupUser.user_id));
        }
        return admins;
    }

    addUser(userId, asAdmin = false) {
        let addedWorkgroupUserId = '';
        let currentWorkgroupUserEntity = WorkgroupUsers.findOne({workgroup_id: this.workgroupId, user_id: userId});
        const currentUser = this.userId;
        const currentDate = new Date();

        //if we have one just change the status - dont need to store all the changes
        if (currentWorkgroupUserEntity) {
            addedWorkgroupUserId = currentWorkgroupUserEntity._id;
            WorkgroupUsers.update({_id: currentWorkgroupUserEntity._id},
                {
                    $set: {
                        status: 'active',
                        modifiedBy: currentUser,
                        modifiedAt: currentDate,
                    }
                }
            );
        } else {

            const memberRole =
                asAdmin
                    ? UserWorkgroupRoles.findOne({name: ADMIN_ROLE_NAME})
                    : UserWorkgroupRoles.findOne({name: MEMBER_ROLE_NAME});

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

    static addUserAsSystem(workgroupId, userId, activate = true) {
        //console.log("Adding user to workgroup");
        //console.log(userId + " | " + workgroupId);
        let addedWorkgroupUserId = '';
        let currentWorkgroupUserEntity = WorkgroupUsers.findOne({workgroup_id: workgroupId, user_id: userId});
        const currentUser = 'SYSTEM';
        const currentDate = new Date();

        //if we have one just change the status - dont need to store all the changes
        if (currentWorkgroupUserEntity) {
            addedWorkgroupUserId = currentWorkgroupUserEntity._id;
            WorkgroupUsers.update({_id: currentWorkgroupUserEntity._id},
                {
                    $set: {
                        status: activate ? 'active' : 'pending',
                        modifiedBy: currentUser,
                        modifiedAt: currentDate,
                    }
                }
            );
        } else {

            const memberRole = UserWorkgroupRoles.findOne({name: MEMBER_ROLE_NAME});

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
        return (workgroup && workgroup.publishingName) || '???';
    }

    getWorkgroupVoucher() {
        return WorkgroupVouchers.findOne({workgroupId: this.workgroupId, status: 'active'});
    }

}
