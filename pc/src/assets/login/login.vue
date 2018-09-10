<template>
  <div class="container-box clear-float">
    <img src="../img/bg.png" class='bg-img'></img>
    <div class="header clear-float">
      <router-link to="/" class="logo"></router-link>
      <!-- <el-menu class="inline select" mode="horizontal" @select="handleSelect" background-color="transparent" text-color="#fff" active-text-color="#fff">
        <el-submenu  popper-class="select-item" index="1">
          <template slot="title">
            <img :src="languageImgSrc" alt='flag' class="flag">
            {{language}}
          </template>
          <el-menu-item index="1">
            <img src="../img/china.png" alt='flag' class="flag">
            简体中文
          </el-menu-item>
          <el-menu-item index="2">
            <img src="../img/english.png" alt='flag' class="flag">
            English
          </el-menu-item>
        </el-submenu>
      </el-menu> -->
    </div>
    <div class="login-box clear-float">
      <div class="desc">
        <ul class="special">
          <li class="top-right"></li>
          <li class="middle"><pre>超高收益  专人维护  算力稳定</pre></li>
          <li class="bottom-left"></li>
        </ul>
        <ul class="character">
          <li><span class="point"></span> 严格控制每个业务流程，从而全面把控生命周期</li>
          <li><span class="point"></span> 无需等待，交易完成立刻享受超高收益</li>
          <li><span class="point"></span> 客服人员实时跟踪，记录您的的信息，确保您无任何风险</li>
        </ul>
      </div>
      <div class="login-container">
        <p class="title">个人登录</p>
        <div class="input-item">
          <input type="text" v-model="form.username" class="login-input" @focus="clearTip('username')" placeholder="请输入手机号码">
          <p class="tip">{{username}}</p>
        </div>
        <div class="input-item">
          <input type="password" v-model="form.password" class="login-input" @focus="clearTip('password')" @keyup.enter="login" placeholder="请输入6-20位组合密码">
          <p class="tip">{{password}}</p>
        </div>
        <div class="forget clear-float">
            <!-- <a>验证码登陆</a> -->
            <router-link to="/reset" class="clear-float"><span>忘记密码？</span></router-link>
        </div>
        <span  class="btn-login" @click="login">登录</span>
        <div class="bottom">
          <span class="line"></span><!--
          --><router-link to="/register"><span class="text">注册新帐号</span></router-link><!--
          --><span class="line"></span>
        </div>
      </div>
    </div>
    <div class="copyright">
        <font>Copyright© 2018 beehash.cn</font>
        <span class="gutter"></span>
        <font>All Rights Reserved 鄂ICP备 18016156号-1</font>
    </div>
  </div>
</template>

<script>
const cnImgUrl = require('../img/china.png')
const enImgUrl = require('../img/english.png')
let prePath = ''
export default {
  data() {
    return {
      tooken: '',
      form: {
        username: '',
        password: ''
      },
      username:'',
      password:'',
      language:'简体中文',
      languageImgSrc:cnImgUrl
    }
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
    login(){
      var that = this
      that.$http.post('/ajaxLogin', 
        {
          username: this.$data.form.username,
          password: this.$data.form.password
        }
      )
      .then(function (res) {
        if(res.data.code == 0){
          if(prePath == '/register' || prePath == '/reset' ){
            that.$router.push('/')
          }else{
            that.$router.push(prePath)
          }
          that.$Message.success({
            message:'登录成功',
            type:'success',
            duration:1000
          })
        }else if(res.data.code == 100){
          for(var key in res.data.data){
            that.$data[key] = res.data.data[key]
          }
        }
      })
    },
    clearTip(value){
      this.$data[value]=''
    }
  }, 
  beforeRouteEnter(to, from, next) {
    prePath = from.fullPath
    next()
  },
  mounted(){
    // var height = document.documentElement.clientHeight || document.body.clientHeight
    // if(height <= 975){
    //   document.getElementsByClassName('container-box')[0].style.height = '950px'
    // }else{
    //   document.getElementsByClassName('container-box')[0].style.height = height+'px'
    // }
    // window.addEventListener('resize',function(){
    //   var height = document.documentElement.clientHeight || document.body.clientHeight
    //   if(height <= 975){
    //     document.getElementsByClassName('container-box')[0].style.height = '950px'
    //   }else{
    //     document.getElementsByClassName('container-box')[0].style.height = height+'px'
    //   }
    // })
  }
}
</script>

<style scoped>
.container-box{
  width:100%;
  min-width:1200px;
  overflow: hidden;
  position: relative;
}
.header{
  min-width:1200px;
  position: absolute;
  top:0;
  left:calc( 50% - 600px);
  z-index:100;
  margin-top:15px;
}
.logo{
  display:inline-block;
  width:50px;
  height:55px;
  background:url('../img/cube.png') center center no-repeat;
}
.inline{
  display: inline-block;
  vertical-align: bottom;
  margin:-10px 35px 0 0;
  float: right;
}
.clear-float:after{
  content:'';
  display:block;
  clear:left;
}
.login-box{
  width:100%;
  max-width:1200px;
  position: absolute;
  top:17%;
  left:calc( 50% - 600px);
}
.bg-img{
  float:left;
  z-index: 1;
}
.desc{
  display: inline-block;
  margin-top: 70px;
}
.desc ul{
  padding: 0;
}
.special{
  margin-bottom:75px;
}
.top-right{
  display:block;
  width:32px;
  height:28px;
  border-top:6px solid #ff8e26;
  border-right:6px solid #ff8e26;
  float: right;
}
.middle pre{
  clear: both;
  font-size: 32px;
  color:#f1f1f1;
  margin:0;
  padding:0px 42px;
  font-weight: 350;
}
.bottom-left{
  display:block;
  width:32px;
  height:28px;
  border-left:6px solid #ff8e26;
  border-bottom:6px solid #ff8e26;
}
.point{
  display: inline-block;
  width:9px;
  height:9px;
  margin:-3px 30px 0 0;
  border-radius: 50%;
  background-color: #f8f8f8;
  vertical-align: middle;
}
.character li{
  color: #f8f8f8;
  font-size: 18px;
  margin-bottom: 24px;
}
.login-container{
  float: right;
  border-radius: 5px;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  width: 505px;
  box-sizing: border-box;
  padding: 0 78px;
  margin-right:35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 5px #cac6c6;
  z-index: 1000;
}
.title {
  margin: 63px auto 85px;
  text-align: center;
  color: #505458;
  font-size: 24px;
  font-weight:500;
}
.input-item{
  position: relative;
  width: 100%;
  margin: 0 auto 30px;
}
.login-input{
  display: block;
  box-sizing: border-box; 
  width: 100%;
  height: 43px;
  border-radius: 4px;
  border-style: solid; /* 边框的显示方式 */
  border: 1px solid #b9b9b9;
  padding:0 15px; 
  font-size: 17px;
  outline: 0;
}
input::-webkit-input-placeholder {
  color: #a9aaac; 
  font-size: 13px;
} 
input:-moz-placeholder {
  color: #a9aaac; 
  font-size: 13px;
} 
input:-ms-input-placeholder {
  color: #a9aaac; 
  font-size: 13px;
} 
.forget{
  width:100%;
  overflow: hidden;
}
.forget a{
  color:#14a7f4;
  font-size: 12px;
}
.forget a span{
  float: right;
  color:#14a7f4;
  margin-top:5px;
}
.btn-login{
  display: block;
  width:100%;
  background-color:#1687ef;
  border:none;
  cursor: pointer;
  border-radius:0;
  color:white;
  height:40px;
  line-height:40px;
  text-align:center;
  margin:25px 0 42px;
}
.bottom span{
  display: inline-block;
}
.bottom .line{
  vertical-align: middle;
  border-top:1px solid  #dddddd;
  width:calc(50% - 45px);
  font-size: 0;
}
.bottom .text{
  width:90px;
  text-align:center;
  color: #1687ef;
  border-bottom:1px solid  #1687ef;
  margin-bottom:127px;
}
.copyright{
  width: 100%;
  padding-top:25px; 
  text-align: center;
  color: #e6e6e6;
  position: absolute;
  bottom:25px;
}
.copyright font{
  width:40%;
}
.gutter{
  display: inline-block;
  width:5%;
}
.tip{
  margin:0;
  padding: 0;
  position:absolute;
  width:90%;
  left:2%;
  height:27px;
  font-size: 13px;
  line-height: 27px;
  color: #ff5328;
}
.flag{
  display: inline-block;
  margin:0 7px 2px 0;
}
</style>