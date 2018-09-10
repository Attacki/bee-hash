import Vue from 'vue/dist/vue.js'
import VueRouter from 'vue-router'
import { Row,Col,Dropdown,DropdownMenu,DropdownItem,MenuItem,Menu,Submenu,MenuItemGroup,Select,Form,FormItem,Input,Button,Checkbox,Message,Loading} from 'element-ui'
// import '../theme/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import axios from 'axios'
import MetaInfo from 'vue-meta-info'
import promise from 'es6-promise'
promise.polyfill()

Vue.use(Row)
Vue.use(Col)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(VueRouter)
Vue.use(MenuItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(Select)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Checkbox)
Vue.use(MetaInfo)
Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service;
Vue.prototype.$http= axios
Vue.prototype.$Message = Message
Vue.prototype.$publicVar = {
  timeOut:'',
  inter:''
}

new Vue({
  el: '#app',
  render: h => h(App)
})
