import Vue from 'vue'
import Router from 'vue-router'
import proList from '@/components/proList'
import proDetails from '@/components/proDetails'
import confirm from '@/components/confirm'
import profit from '@/components/profit'
import mine from '@/components/mine'
import seldList from '@/components/seldList'
import login from '@/components/login'
import navbar from '@/components/navbar'
import orderDetails from '@/components/orderDetails'
import sellDoc from '@/components/sell'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'proList',
      components: {
        default:proList,
        footer: navbar
      }
    },{
      path: '/proDetails/:goods',
      name: 'proDetails',
      component: proDetails
    },{
      path: '/profit',
      name: 'profit',
      components: {
        default:profit,
        footer: navbar
      }
    },{
      path: '/mine',
      name: 'mine',
      components: {
        default:mine,
        footer: navbar
      }
    },{
      path: '/login',
      name: 'login',
      component:login
    },
    {
      path:'/confirm',
      name:'confirm',
      component:confirm
    },
    {
      path:'/seldList',
      name:'seldList',
      component:seldList
    },
    {
      path:'/orderDetails/:order',
      name:'orderDetails',
      component:orderDetails
    },
    {
      path:'/sellDoc',
      name:'sellDoc',
      component:sellDoc
    }
  ]
})
