<template>
    <div class="form-group container">
        <div class="row">
            <h2>User Manage</h2>
            <hr>
        </div>
        <div class="row my-row">
            <div class="col-xs-1">
                <span class="text-info">App</span>
            </div>
            <div class="col-lg-2">
                <select class="form-control" v-model="appid" @change="showGroups">
                    <option v-for="a in apps" :value="a.id">{{ a.name }}</option>
                </select>
            </div>
        </div>
        <div class="row my-row" v-show="isGroupShow">
            <div class="col-xs-1">
                <span class="text-info">Group</span>
            </div>
            <div class="col-lg-2">
                <select class="form-control" v-model="groupid" @change="showUsers">
                    <option v-for="g in groups" :value="g.id">{{ g.name }}</option>
                </select>
            </div>
        </div>
        <div class="row my-row" v-show="isUsersShow">
            <table class="table table-striped table-hover table-condensed">
                <thead>
                <tr>
                    <th>user</th>
                    <th>group</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(u, index) in us" :key="index" @dblclick="modifyGroup(index)">
                    <th>{{ u.name }}</th>
                    <td>
                        <div v-show="u.isModify == undefined || u.isModify == false" >
                            {{ u.group }}
                        </div>
                        <div v-show="u.isModify == true">
                            <input type="text" class="form-control" value="u.group" v-model="u.group" @change="changeGroup(index)">
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    import myAjax from '../../src/ajax.js'
    const urls = {
        appsList: '/manage/api/getApps',
        groupsList: '/manage/api/getGroupsList',
        usersList: '/manage/api/getUsersList',
        modifyUserGroup: '/manage/api/modifyUserGroup'
    }
    export default {
        name: 'Manage',
        data: function () {
            return {
                isGroupShow: false,
                isUsersShow: false,
                appid: 0,
                groupid: 0,
                //data
                apps: [],
                groups: [],
                us: []
            }
        },
        created: function () {
            var that = this;
            myAjax(0, urls.appsList, '', function (rData) {
                var res = JSON.parse(rData);
                that.apps = res.data;
            })
        },
        methods: {
            showUsers: function () {
                var that = this;
                var formData = new FormData();
                var datas = JSON.stringify({
                    groupid: that.groupid,
                    appid: that.appid
                });
                formData.append('data', datas);
                myAjax(1, urls.usersList, formData, function (rData) {
                    var res = JSON.parse(rData);
                    that.us = res.data;
                    that.isUsersShow = true;
                    that.isGroupShow = true;
                });
            },
            showGroups: function () {
                var that = this;
                var formData = new FormData();
                var datas = JSON.stringify({
                    appid: that.appid
                });
                formData.append('data', datas);
                myAjax(1, urls.groupsList, formData, function (rData) {
                    var res = JSON.parse(rData);
                    that.groupId = 0;
                    that.groups = res.data.groups;
                    that.us = res.data.users;
                    that.isUsersShow = true;
                    that.isGroupShow = true;
                })
            },
            modifyGroup: function (index) {
                var u = this.us[index];
                u['isModify'] = true;
                this.$set(this.us, index, u);
            },
            changeGroup: function (index) {
                var u = this.us[index];
                u['isModify'] = false;
                var formData = new FormData();
                formData.append('data', JSON.stringify({
                    userid: u.id,
                    appid: this.appid,
                    groupname: u.group
                }));
                myAjax(1, urls.modifyUserGroup, formData, function (rData) {
                    console.log(rData);
                })
                this.$set(this.us, index, u)
            }
        }
    }
</script>
<style>
    .my-row {
        padding-top: 15px;
        padding-bottom: 15px;
    }
</style>
