<template>
    <div class="form-group container">
        <div class="row">
            <div class="h2">Push Message</div>
            <hr>
        </div>
        <div class="row">
            <div class="col-xs-1">
                <span class="text-info big">app</span>
            </div>
            <div class="col-lg-3">
                <select v-model="appid" class="form-control">
                    <option v-for="app in apps" :value="app.id">{{app.name}}</option>
                </select>
            </div>
        </div>
        <div class="row my-row">
            <div class="col-xs-1">
                <span class="text-info big">platform</span>
            </div>
            <div class="col-xs-3">
                <div class="row">
                    <div class="col-xs-5">
                        <span class="text-warning">android</span>
                        <input type="radio" name="platform" v-model="platform" value="0"/>
                    </div>
                    <div class="col-xs-3">
                        <span class="text-warning">ios</span>
                        <input type="radio" name="platform" v-model="platform" value="1" disabled/>
                    </div>
                </div>
            </div>
        </div>
        <div class="row my-row">
            <div class="col-xs-1">
                <span class="text-info">title</span>
            </div>
            <div class="col-xs-3">
                <input type="text" class="form-control" placeholder="title" v-model="title">
            </div>
        </div>
        <div class="row my-row">
            <div class="col-xs-1">
                <span class="text-info">content</span>
            </div>
            <div class="col-xs-3">
                <textarea name="content" class="form-control" rows="3" v-model="content"></textarea>
            </div>
        </div>
        <div class="row my-row">
            <div class="col-xs-1">
                <span class="text-info">target</span>
            </div>
            <div class="col-xs-3">
                <div class="row">
                    <div class="col-xs-5">
                        <select @change="changeTarget" v-model="sendTarget" class="form-control">
                            <option value="0">All</option>
                            <option value="1">Group</option>
                            <option value="2">Users</option>
                        </select>
                    </div>
                    <div class="col-xs-4" v-show="isGroupShow">
                        <select v-model="group" class="form-control">
                            <option v-for="g in groups" :value="g.id">{{ g.name }}</option>
                        </select>
                    </div>
                    <div class="col-xs-7" v-show="isUsersShow">
                        <textarea name="users" class="form-control" rows="3" placeholder="user id, 逗号隔开" v-model="users"></textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="row my-row">
            <div class="col-xs-1">
                <span class="text-info">push time</span>
            </div>
            <div class="col-xs-7">
                <div class="row">
                    <div class="col-xs-2">
                        <span class="text-warning">now</span>
                        <input type="radio" name="ptime" v-model="pTime" @change="checked" value="0"/>
                    </div>
                    <div class="col-xs-5">
                        <div class="row">
                            <div class="col-xs-4">
                                <span class="text-warning">later</span>
                                <input type="radio" name="ptime" v-model="pTime" @change="checked" value="1"/>
                            </div>
                            <div class="col-xs-4">
                                <input type="text" v-model="laters" v-show="isLaterShow" class="form-control"
                                       placeholder="mins"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row my-row">
            <div class="col-xs-1">
                <button class="btn btn-primary" @click="pushMes">Push</button>
            </div>
            <div class="col-xs-2">
                <div v-show="isResponse">
                    <span class="text-success" v-show="isSuccess">Success</span>
                    <span class="text-danger" v-show="isFailed">Failed</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import myAjax from '../../src/ajax.js'
    const urls = {
        appsUrl: 'http://gp.com/push/api/getApps',
        groupsUrl: 'http://gp.com/push/api/getGroups',
        pushUrl: 'http://gp.com/push/api/push',
    }
    export default {
        name: 'Push',
        data: function () {
            return {
                isLaterShow: false,
                isGroupShow: false,
                isUsersShow: false,
                isResponse: false,
                isSuccess: false,
                isFailed: false,
                //data
                platform: 0,
                title: '',
                content: '',
                sendTarget: 0,//0:all, 1:group, 2:users
                appid: 0,
                apps: [],
                group: 0,
                groups: [],
                users: '',
                pTime: 0,
                laters: 0,
            }
        },
        created: function () {
            var that = this;
            myAjax(0, urls.appsUrl, '', function (rData) {
                var res = JSON.parse(rData);
                that.apps = res.data;
            })
        },
        methods: {
            checked: function () {
                this.isLaterShow = this.pTime == 1
            },
            changeTarget: function () {
                var that = this;
                switch (this.sendTarget) {
                    case '0':
                        this.isGroupShow = false
                        this.isUsersShow = false
                        break;
                    case '1':
                        this.isGroupShow = true
                        this.isUsersShow = false
                        var formData = new FormData();
                        formData.append('data', JSON.stringify({ appid: this.appid }));
                        myAjax(1, urls.groupsUrl, formData, function (rData) {
                            var res = JSON.parse(rData);
                            that.groups = res.data;
                        });
                        break;
                    case '2':
                        this.isGroupShow = false
                        this.isUsersShow = true
                        break;
                }
            },
            pushMes: function () {
                var formData = new FormData();
                var datas = JSON.stringify({
                    appid: this.appid,
                    platform: this.platform,
                    title: this.title,
                    content: this.content,
                    group: {
                        type: this.sendTarget,
                        ext: this.sendTarget == 1 ? this.group : this.users
                    },
                    time: this.pTime != 0 ? this.laters : 0
                });
                formData.append('data', datas);
                myAjax(1, urls.pushUrl, formData, function (rData) {
                    console.log(JSON.parse(rData));
                })
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