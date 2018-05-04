<template>
    <div class="form-group container">
        <div class="row">
            <div class="h2">Add app</div>
            <hr>
        </div>
        <div class="row my-row">
            <div class="col-xs-1">
                <span class="text-info big">upload</span>
            </div>
            <div class="col-xs-3">
                <label for="file" class="btn btn-primary">上传</label>
                <input type="file" style="display:none" id="file" ref="file"/>
            </div>
        </div>
        <div class="row my-row">
            <div class="col-xs-1">
                <span class="text-info big">applicationId</span>
            </div>
            <div class="col-xs-3">
                <input type="text" class="form-control" v-model="applicationId" required/>
            </div>
        </div>
        <div class="row my-row">
            <div class="col-xs-1">
                <button class="btn btn-primary" @click="addApp">提交</button>
            </div>
            <div class="col-xs-3">
                <span class="text-info" v-model="mes"></span>
            </div>
        </div>
    </div>
</template>
<script>
    import myAjax from '../../src/ajax.js'

    const urls = {
        addApp: 'http://gp.com/app/addApp',
    }
    export default {
        name: 'AddApp',
        data: function () {
            return {
                mes: "",
                file: null,
                applicationId: ""
            }
        },
        methods: {
            addApp: function () {
                var that = this
                that.file = that.$refs.file.files[0];
                if (that.file == null) {
                    alert("请选择文件")
                    return
                }
                var formData = new FormData
                formData.append('data', JSON.stringify({"applicationId": that.applicationId}))
                formData.append('file', that.file)
                myAjax(1, urls.addApp, formData, function (rData) {
                    var data = JSON.parse(rData)
                    if (data['status'] != 0) {
                        that.mes = data.msg;
                    } else {
                        that.mes = '提交成功';
                    }
                })
            }
        }
    }
</script>