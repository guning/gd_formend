<template>
    <div class="form-group container">
        <div class="row">
            <div class="h2">My app</div>
            <hr>
        </div>
        <div class="row my-row">
            <div class="col-xs-7">
            <table class="table table-striped table-hover table-condensed">
                <thead>
                <th>id</th>
                <th>app name</th>
                <th>download</th>
                </thead>
                <tbody>
                <tr v-for="app in apps">
                    <td>{{ app.id }}</td>
                    <td>{{ app.name }}</td>
                    <td><button class="btn btn-info" @click="downloadFile(app.id)">下载</button></td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
    </div>
</template>
<script>
    import myAjax from '../../src/ajax.js'

    const urls = {
        downloadApp: '/app/downloadApp',
        appList: '/app/getApp'
    }
    export default {
        name: 'myApp',
        data: function () {
            return {
                apps: []
            }
        },
        created: function () {
            var that = this
            myAjax(0, urls.appList, '', function (rData) {
                var data = JSON.parse(rData)
                that.apps = data['data']
            })
        },
        methods: {
            downloadFile: function ($appId) {
                window.location = urls.downloadApp + '?appId=' + $appId;
            }
        }
    }
</script>
