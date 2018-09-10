// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'                 //引入vue
import App from './App'               //把App根节点引入
import router from './router'         //引入路由
import $ from 'jquery'

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  $.ajax({
    type:'get',
    url:'/isCheck',
    success:(e)=>{
      if(e.code == 0){
        Vue.prototype.$status = true;
        next();
      }else{
        Vue.prototype.$status = false;
        next();
      }
  }})
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
