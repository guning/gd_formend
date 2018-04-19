<template>
    <div>
        <Navbar/>
        <div class="container-fluid row">
            <Sidebar v-on:listenChange="changePage"/>
            <MainView v-bind:page="nowPage"/>
        </div>
    </div>
</template>

<script>
    import Navbar from './app/navbar.vue'
    import Sidebar from './app/sidebar.vue'
    import MainView from './app/mainView.vue'
    import 'bootstrap/dist/css/bootstrap.min.css'

    export default {
        components: {
            Navbar, Sidebar, MainView
        },
        data: function(){
            return {
                nowPage: 0
            }
        },
        methods : {
            changePage: function (p) {
                this.nowPage = p
            }
        }
    }
</script>

<style>
    body {
        padding-top: 50px;
    }
</style>