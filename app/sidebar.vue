<template>
    <div class="col-sm-3 col-md-2 sidebar">
        <ul class="nav nav-sidebar">
            <li v-bind:class="{ active: isAddApp }" v-on:click="sendChange(3)"><a href="#addApp">Add app</a></li>
            <li v-bind:class="{ active: isPush }" v-on:click="sendChange(0)"><a href="#push">Push</a></li>
            <li v-bind:class="{ active: isManage }" v-on:click="sendChange(1)"><a href="#manage">Manage</a></li>
            <li v-bind:class="{ active: isDashboard }" v-on:click="sendChange(2)"><a href="#dashboard">Dashboard</a>
            </li>
            <li v-bind:class="{ active: isMyApp }" v-on:click="sendChange(4)"><a href="#MyApp">My app</a></li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'sidebar',
        props: [],
        data: function () {
            return {
                isAddApp: false,
                isPush: true,
                isManage: false,
                isDashboard: false,
                isMyApp: false
            }
        },
        methods: {
            sendChange: function (page) {
                switch (page) {
                    case 0:
                        [this.isPush, this.isManage, this.isDashboard, this.isAddApp, this.isMyApp] = [true, false, false, false, false]
                        break
                    case 1:
                        [this.isPush, this.isManage, this.isDashboard, this.isAddApp, this.isMyApp] = [false, true, false, false, false]
                        break
                    case 2:
                        [this.isPush, this.isManage, this.isDashboard, this.isAddApp, this.isMyApp] = [false, false, true, false, false]
                        break
                    case 3:
                        [this.isPush, this.isManage, this.isDashboard, this.isAddApp, this.isMyApp] = [false, false, false, true, false]
                        break;
                    case 4:
                        [this.isPush, this.isManage, this.isDashboard, this.isAddApp, this.isMyApp] = [false, false, false, false, true]
                        break;
                }
                this.$emit('listenChange', page)
            }
        }
    }
</script>
<style>
    .sidebar {
        display: none;
    }

    @media (min-width: 768px) {
        .sidebar {
            position: fixed;
            top: 51px;
            bottom: 0;
            left: 0;
            z-index: 1000;
            display: block;
            padding: 20px;
            overflow-x: hidden;
            overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
            background-color: #f5f5f5;
            border-right: 1px solid #eee;
        }
    }

    /* Sidebar navigation */
    .nav-sidebar {
        margin-right: -21px; /* 20px padding + 1px border */
        margin-bottom: 20px;
        margin-left: -20px;
    }

    .nav-sidebar > li > a {
        padding-right: 20px;
        padding-left: 20px;
    }

    .nav-sidebar > .active > a,
    .nav-sidebar > .active > a:hover,
    .nav-sidebar > .active > a:focus {
        color: #fff;
        background-color: #428bca;
    }
</style>