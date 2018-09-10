
<template>
    <div class="bg-dark header" id="header">
      <el-row class="grid-content" align="middle" >
        <router-link to="/" class="logo" ></router-link>
        <ul class="tabs">
          <router-link to="/" :class="{'checked':activeIndex=='home'}">首页</router-link>
          <router-link to="/hash/0" :class="{'checked':activeIndex=='hash'}">云算力</router-link>
          <router-link to="/faq" :class="{'checked':activeIndex=='faq'}">常见问题</router-link>
          <!-- <router-link to="/discount" :class="{'checked':activeIndex=='discount'}">优惠活动</router-link> -->
        </ul>
        <div class="right">
          <ul class="loginReg" v-if="!mineSystem">
            <li><router-link to="/login">登录</router-link></li>
            <li>/</li>
            <li><router-link to="/register">注册</router-link></li>
          </ul>
          <div class="mySelf"  v-if="mineSystem">
            <router-link to="/system/mine" style="color:white;vertical-align:top;line-height:80px;">{{mineParams.username}}</router-link>
            <el-menu class="inline select" mode="horizontal" router  background-color="#2e2e37" text-color="#fff" active-text-color="#fff">
              <el-submenu  popper-class="select-item" index="/">
                <template slot="title" ><router-link to="/system/mine" style="display:inline-block;padding-bottom:5px">个人中心</router-link></template>
                <!-- <el-menu-item index="/system">订单管理</el-menu-item> -->
                <el-menu-item index=''@click="logout">退出登录</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
          <!-- <el-menu class="inline select" mode="horizontal" @select="handleSelect" background-color="#2e2e37" text-color="#fff" active-text-color="#fff">
            <el-submenu popper-class="select-item" index="1">
              <template slot="title">
                <img :src="languageImgSrc" alt='flag' class="flag">
                {{language}}
              </template>
              <el-menu-item index="1">
                <img src="./img/china.png" alt='flag' class="flag">
                简体中文
              </el-menu-item>
              <el-menu-item index="2">
                <img src="./img/english.png" alt='flag' class="flag">
                English
              </el-menu-item>
            </el-submenu>
          </el-menu> -->
        </div>
      </el-row>
    </div>
</template>

<script>
const cnImgUrl = require('./img/china.png')
const enImgUrl = require('./img/english.png')
export default {
  data() {
    return {
      activeIndex: 'home',
      activeIndex2: '1',
      mineSystem: false,
      mineParams:{username:''},
      language:'简体中文',
      languageImgSrc:cnImgUrl
    };
  },
  methods: {
    handleSelect(index) {
      if(index == 1){
        this.$data.language = '简体中文'
        this.$data.languageImgSrc = cnImgUrl
      }else if(index == 2){
        this.$data.language = 'English'
        this.$data.languageImgSrc = enImgUrl
      }
    },
    logout(){
      var that=this
      this.$http.get('/logout')
      .then((res)=>{
        that.$router.push('/')
        this.$data.mineSystem = false
      })
    }
  },
  watch:{
    '$route' (to, from) {
      this.$data.activeIndex = to.name
    }
  },
  mounted(){
    this.$data.activeIndex = this.$router.history.current.name
    this.$http.get('/isCheck')
    .then((res)=>{
      if(res.data.code == 0){
        this.$data.mineSystem = true
        this.$data.mineParams.username = res.data.data.username
      }else if(res.data.code == 100){
        this.$data.mineSystem = false
        if(this.$router.currentRoute.matched[0].meta.name == 'system'){
          this.$router.push('/login')
        }
      }
    })
  }
}
</script>

<style scoped>
.header{
  min-width:1200px;
}
.el-row {
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
}
.right{
  float: right;
  height: 80px;
}
.inline{
  display: inline-block;
  background-color: transparent;
}
a{
  color:white;
  text-decoration: none !important;
  font-size: 16px;
}
.el-menu{
  height: 80px;
  line-height: 80px;
}
#tabs .el-menu-item {
  padding: 0;
  height: 80px;
  line-height: 80px;
}
#tabs .el-menu-item a{
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0 20px;
}
.tabs a.checked{
  color:#ff8d27 !important;
}
.tabs{
  display:inline-block;
  vertical-align: top;
  height: 80px;
  line-height: 80px;
  margin: 0;
}
.tabs a{
  display: inline-block;
  padding-right: 20px;
  color:white;
  cursor: pointer;
}
.logo{
  display: inline-block;
  vertical-align: top;
  width: 60px;
  height: 80px;
}
.loginReg{
  display: inline-block;
  margin: 0px;
  padding: 0px;
  vertical-align: top;
  height: 80px;
  line-height: 80px;
  padding: 0 20px;
}
.loginReg li {
  list-style-type: none;
  display: inline-block;
}
.grid-content {
  height: 80px;
}
.el-dropdown-link{
  cursor: pointer;
  color: white;
}
.mySelf{
  display: inline-block;
}
.shopcar{
  display: inline-block;
  width:20px;
  height:18px;
  margin: 31px 15px 0 0;
  vertical-align: top;
  background: url('img/shopcar.png') center center/20px 18px no-repeat;
}
.flag{
  display: inline-block;
  margin:0 7px 2px 0;
}
</style>
