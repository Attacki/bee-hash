<template>
  <div id="app">
    <router-view name="header"></router-view>
    <router-view></router-view>
    <router-view name="footer"></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
import router from './router/router'
//每个路由跳转时进行的操作
// router.beforeEach((to, from, next) => {
//   next()
// })
export default {
  name:'app',
  data() {
    return {
      
    };
  },
  router,
  computed: {
    username () {
      // 我们很快就会看到 `params` 是什么
      return this.$route.params.username
    }
  },
  methods: {

  }
}
</script>

<style>
body {
  font-family: "Microsoft Yahei","Helvetica Neue","Luxi Sans","DejaVu Sans",Tahoma,"Hiragino Sans GB",STHeiti !important;
  margin: 0;
}
pre{
  font-family: "Microsoft Yahei","Helvetica Neue","Luxi Sans","DejaVu Sans",Tahoma,"Hiragino Sans GB",STHeiti !important;
  white-space: pre-wrap; /*css-3*/ 
  white-space: -moz-pre-wrap; /*Mozilla,since1999*/ 
  white-space: -pre-wrap; /*Opera4-6*/ 
  white-space: -o-pre-wrap; /*Opera7*/ 
  word-wrap: break-word; /*InternetExplorer5.5+*/ 
}
p ul{
  margin: 0;
  padding: 0;
}
a{
  text-decoration: none !important;
  font-size: 16px;
}
ul li{
  list-style-type: none;
}
[v-cloak]{
  display: none;
}
.bg-dark {
  background-color: #2e2e37 !important;
}
.bg-dark .el-menu--horizontal > .el-menu-item{
  color: white;
}
.bg-dark .el-menu--horizontal > .el-menu-item.is-active{
  border-color:transparent !important;
}
.bg-dark .el-menu--horizontal > .el-menu-item:not(.is-disabled):hover{
  background-color: #2e2e37 !important;
  color: white;
}
.bg-dark .loginReg li {
  color: white;
}
.bg-dark .logo{
  background: url('./assets/img/cube.png') 0 center/39px 42px no-repeat;
}
#app{
  height:100%;
}
.select .el-submenu__title{
  font-size: 16px !important;
  border: none !important;
}
.select .el-submenu__title:hover{
  background-color: transparent !important;
}
.select-item.el-menu--horizontal,.select-item .el-menu,.select-item .el-menu-item{
  background-color: white !important;
  color: rgb(133, 133, 133) !important;
}
.select-item .el-menu-item:hover{
  color: rgb(0, 0, 0) !important;
}
.select .el-submenu{
  margin: 10px 0 ;
}
.select-item{
  margin:-7px 0 0 -6px;
}
.el-menu--popup{
  min-width:150px;
}
/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track-piece {
  background: #ffffff;
}
::-webkit-scrollbar-thumb {
  background: #e2e2e2;
}
.el-menu--horizontal{
  border: none !important;
}
</style>
