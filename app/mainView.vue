<template>
    <div v-if="page == 1">
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <Manage/>
        </div>
    </div>
    <div v-else-if="page == 2">
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <Dashboard/>
        </div>
    </div>
    <div v-else-if="page == 3">
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <AddApp/>
        </div>
    </div>
    <div v-else-if="page == 4">
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <MyApp/>
        </div>
    </div>
    <div v-else>
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <Push/>
        </div>
    </div>
</template>

<script>
    import Push from './mainviews/push.vue'
    import Manage from './mainviews/manage.vue'
    import Dashboard from './mainviews/dashboard.vue'
    import AddApp from './mainviews/addApp.vue'
    import MyApp from './mainviews/myApp.vue'
    export default {
        name: 'mainView',
        components: {
            Push, Manage, Dashboard, AddApp, MyApp
        },
        props: ['page'],
    }
</script>
<style>
    .main {
        padding: 20px;
    }

    @media (min-width: 768px) {
        .main {
            padding-right: 40px;
            padding-left: 40px;
        }
    }
</style>