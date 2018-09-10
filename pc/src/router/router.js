// 引入路由插件
import VueRouter from 'vue-router'
import axios from 'axios'
// 引入 导航和底部组件
import header from '../assets/header.vue'
import footer from '../assets/footer.vue'
// 引入主页、产品列表、产品详情 组件
import home from '../assets/home'               //首页
import hashproduct from '../assets/hashpro/hashproduct'       //云算力
import miss from '../assets/miss'               //404
import faq from '../assets/clause/faq'          //常见问题
import discount from '../assets/discount'       //常见问题

import productDetails from '../assets/hashpro/pro-details'    //产品详情
import confirm from '../assets/hashpro/confirm' //确认订单

import login from '../assets/login/login'       //登陆
import register from '../assets/login/register' //注册
import reset from '../assets/login/reset'       //注册

import system from '../assets/system/system' 
import mine from '../assets/system/mine'        //个人中心
import power from '../assets/system/power'      //算力
import set from '../assets/system/set'          //设置
import history from '../assets/system/history'  //记录
import order from '../assets/system/order'      //订单
import cash from '../assets/system/cash'        //提现
import coin from '../assets/system/coin'        //提币
import recharge from '../assets/system/recharge'//充值
import detail from '../assets/system/detail'//充值
//协议
import doc from '../assets/doc/doc'    
import sell from '../assets/doc/sellAgree'      //销售协议
import agree from '../assets/doc/agreement'     //服务协议

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      components: {
        default: home,
        header: header,
        footer: footer
      },
      name: 'home'
    },
    {
      path: '/hash/:type',
      components: {
        default: hashproduct,
        header: header,
        footer: footer
      },
      name:'hash'
    },
    {
      path: '/product/:pid',
      components: {
        default: productDetails,
        header: header,
        footer: footer
      },
      name: 'hash'
    },
    {
      path: '/login',
      component: login,
      name: 'login'
    },
    {
      path: '/register',
      component: register,
      name: 'register'
    },
    {
      path: '/system',
      redirect: '/system/mine',
      beforeEnter: (to, from, next) => {
        axios.get('/isCheck')
        .then((res)=>{
          if ( res.data.code == 0 ) {
            next()
          }else if ( res.data.code == 100 ) {
            next('/login')
          }
        })
      }
    },
    {
      path: '/system',
      name: 'system',
      components: {
        default: system,
        header: header
      },
      children:[
        { path:'mine',component:mine,name:'mine' },
        { path:'power/:coin',component:power,name:'power' },
        { path:'history',component:history,name:'history' },
        { path:'set',component:set,name:'set' },
        { path:'order',component:order,name:'order' },
        { path:'coin/:type',component:coin,name:'mine' },
        { path:'cash',component:cash,name:'mine' },
        { path:'recharge',component:recharge,name:'mine' },
        { path:'detail',component:detail,name:'mine' }
      ]
    },
    {
      path: '/confirm',
      name: 'confirm',
      components: {
        default: confirm,
        header: header,
        footer:footer
      }
    },
    {
      path:'/miss',
      name:'miss',
      component:miss
    },
    {
      path:'/faq',
      name:'faq',
      components:{
        default: faq,
        header: header
      }
    },
    // {
    //   path:'/discount',
    //   name:'discount',
    //   components:{
    //     default: discount,
    //     header: header
    //   }
    // },
    {
      path: '/doc',
      name: 'doc',
      component: doc,
      children:[
        { path:'agree',component:agree },
        { path:'sell',component:sell }
      ]
    },
    {
      path: '/reset',
      name: 'reset',
      components:{
        default: reset,
        footer: footer
      }
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})