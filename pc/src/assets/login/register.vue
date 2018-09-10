<template>
  <div class="container-box ">
        <div class="bg-dark header">
            <el-row class="grid-content clear-float">
                <router-link tag="a" to="/" class="logo" ></router-link>
                <div class="right">
                    <ul class="loginReg">
                        已有账号
                        <li><router-link style="color:orange;text-decoration:underline !important;" to="/login">直接登录</router-link></li>
                    </ul>
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
            </el-row>
        </div>
        <div class="login-container">
            <p class="title">欢迎注册蜜蜂云算力</p>
            <div class="input-item">
                <font>手机号码</font><!--
                --><input type="text" spellcheck="false" class="login-input" @blur="regPhone" @focus="clearTip('phone')" v-model="phoneNum" placeholder="请输入手机号码">
                <p class="tip">{{tip.phone}}</p>
            </div>
            <div class="input-item">
                <font>图形验证码</font><!--
                --><input type="text"  spellcheck="false" class="login-input" style="width: 136px;" v-model="imgCode"  @focus="clearTip('captcha')" placeholder="请输入图形验证码"><!-- 
                --><img class ="capchar" @click="refreshCode" v-cloak :src="codeSrc">
                <p class="tip">{{tip.captcha}}</p>
            </div>
            <div class="input-item">
                <font>短信验证码</font><!--
                --><input type="text"  spellcheck="false" class="login-input" style="width: 136px;" v-model="phoneCode"  @focus="clearTip('code')" placeholder="请输入短信验证码"><!--
                --><span class="sendCode" @click="flag && sendPhoneCode($event)">{{btnMsg}}</span>
                <p class="tip">{{tip.code}}</p>
            </div>
            <div class="input-item">
                <font>设置密码</font><!--
                --><input :type="inputType"  spellcheck="false" class="login-input" v-model="password"  placeholder="6-20位组合密码">
            </div>
            <div class="input-item">
                <font>重复密码</font><!--
                --><input :type="inputType"  spellcheck="false" class="login-input" style="width: 180px;" v-model="rePassword"  @focus="clearTip('password')" placeholder="6-20位组合密码"><!--
                --><i class="el-icon-view eyes" @mousedown="showPsw" @mouseup="hidePsw"></i>
                <p class="tip">{{tip.password}}</p>
            </div>
            <div class="input-item">
                <font>邀请码&nbsp(选填)</font><!--
                --><input type="text"  spellcheck="false" class="login-input" v-model="invite"  placeholder="填入邀请码">
                <p class="tip">{{tip.invite_code}}</p>
            </div>
            <div class="agreement">
                <div class="check-box">
                  <input id="agree" type="checkbox" style="display:none" v-model="checked">
                  <label for="agree" class="label" >
                      <i class="icon" ></i>
                  </label>
                </div>
                <font>阅读并接受</font><!--
                --><router-link to="/doc/agree" class="agree" target="_blank">《用户注册服务协议》</router-link>
            </div>
            <span class="btn-login" @click="register" >注册</span>
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
let timer = null
  export default {
    data() {
      return {
        activeIndex: 'home',
        inputType:'password',
        codeSrc:'/getCaptcha?t=',
        btnMsg:'发送验证码',
        phoneNum:'',
        imgCode:'',
        phoneCode:'',
        password:'',
        rePassword:'',
        flag:true,
        invite:'',
        tip:{
          phone:'',
          captcha:'',
          code:'',
          password:'',
          invite_code:''
        },
        language:'简体中文',
        languageImgSrc:cnImgUrl,
        checked:false
      }
    },
    beforeRouteEnter(to, from, next) {
      prePath = from.fullPath
      next()
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
        showPsw(){
          this.$data.inputType = 'text'
        },
        hidePsw(){
          this.$data.inputType = 'password'
        },
        regPhone(){
          var mobile = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
          if(!(mobile.test(this.$data.phoneNum))){
            this.$data.tip.phone="手机号格式不正确"
            return false
          }
          return true
        },
        refreshCode(){
          this.$data.codeSrc = this.$data.codeSrc+Math.random()
        },
        sendPhoneCode(event){
          var that =this, target = event.target
          if(!this.regPhone()){
              return
          }
          that.$http.post('/sendLoginCode',{
            phone:that.$data.phoneNum,
            captcha:that.$data.imgCode
          })
          .then(function (res) {
            if(res.data.code == 0){
              that.$Message.success({
                message:'发送成功',
                type:'success'
              })
              var timeCount = 60
              var timer = window.setInterval(
                ()=>{
                  try {that.$data.flag = false
                  timeCount--
                  that.$data.btnMsg = timeCount+'s'
                  if(timeCount == 0){
                    that.$data.flag = true
                    window.clearInterval(timer)
                    that.$data.btnMsg = '重新发送'
                  }} catch(error) {
                    window.clearInterval(timer)
                  }
              },1000)
            }
            else{
              that.$data.codeSrc = that.$data.codeSrc+Math.random()
              for(var key in res.data.data){
                that.$data.tip[key] = res.data.data[key]
              }
            }
          })
        },
        clearTip(value){
          this.$data.tip[value]=''
        },
        register(){
          var that =this
          if(this.checked){
            that.$http.post('/ajaxRegister',{
              phone:that.$data.phoneNum,
              captcha:that.$data.imgCode,
              code:that.$data.phoneCode,
              password:that.$data.password,
              password_confirmation:that.$data.rePassword,
              invite_code:that.$data.invite
            }).then(
              (res)=>{
                if(res.data.code == 0){
                  if(prePath == '/login'){
                    that.$router.push('/')
                  }else{
                    that.$router.push(prePath)
                  }
                  this.$Message({
                    message: '注册成功',
                    type: 'success'
                  })
                }else if(res.data.code == 100){
                  for(var key in res.data.data){
                    that.$data.tip[key] = res.data.data[key]
                  }
                }
              }
            )
          }else{
            this.$Message({
              message: '请先接受注册协议',
              type: 'error',
              duration:1000
            })
          }
          
        }

    },
    mounted(){
      this.invite = this.$router.currentRoute.query.invite_code
    },
    beforeRouteLeave(to,from,next){
      window.clearInterval(timer);
      next()
    }
  }
</script>

<style scoped>
/*头部*/
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
  line-height: 80px;
}
.inline{
  display: inline-block;
  background-color: transparent;
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
.logo{
  display: inline-block;
  vertical-align: top;
  width: 130px;
  height: 80px;
}
.loginReg{
  display: inline-block;
  margin: 0px;
  padding: 0px;
  vertical-align: top;
  height: 80px;
  padding: 0 20px;
  color: white;
}
.loginReg li {
  list-style-type: none;
  display: inline-block;
}
.grid-content {
  height: 80px;
}

/*中间*/
.container-box{
  width:100%;
  min-width: 1200px;
  height:100%;
  overflow: hidden;
  position: relative;
  background-color: #f3f3f3;
}
.clear-float:after{
  content:'';
  display:block;
  clear:left;
}
.login-container{
  border-radius: 10px;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  width: 55%;
  box-sizing: border-box;
  margin: 50px auto;
  padding: 0 78px;
  background: #fff;
  border: 1px solid #eaeaea;
}
.title {
  margin: 60px auto 50px;
  text-align: center;
  color: #505458;
  font-size: 26px;
  font-weight:500;
}
.input-item{
  box-sizing: border-box; 
  margin: 0 auto 27px;
  width:340px;
  height: 44px;
  border: 1px solid #b9b9b9;
  border-radius: 4px;
  padding:0 0 0 15px;
  line-height:42px;
  position: relative;
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
.input-item font{
  display: inline-block;
  margin-top:calc(6.5% - 6px);
  border-right: 1px solid #b9b9b9;
  line-height:13px;
  font-size:13px;
  width: 94px;
  height:13px;
  color:#666664;
  vertical-align: top;
}
.login-input{
  display: inline-block;
  box-sizing: border-box;
  vertical-align: top;
  /* width: 136px; */
  height:100%;
  border-style: none; /* 边框的显示方式 */
  padding:0 0 0 15px; 
  font-size: 15px;
  outline: 0;
}
input::-webkit-input-placeholder {
  color: #a9aaac; 
  font-size: 14px;
} 
input:-moz-placeholder {
  color: #a9aaac; 
  font-size: 14px;
} 
input:-ms-input-placeholder {
  color: #a9aaac; 
  font-size: 14px;
} 
.sendCode{
    display: inline-block;
    width:88px;
    height:30px;
    line-height:30px;
    color:#666668;
    font-size:11px;
    background-color:#eeeeee;
    text-align: center;
    cursor: pointer;
}
.disabled-btn{
    cursor:not-allowed;
}
.btn-login{
  display: block;
  width:340px;
  background-color:#ff8e28;
  border:none;
  cursor: pointer;
  border-radius:0;
  color:white;
  height:40px;
  line-height:40px;
  text-align:center;
  font-size:18px;
  margin:20px auto 46px;
}
.copyright{
  width: 100%;
  padding:25px 0 20px; 
  text-align: center;
  color: #a7a7a7;
  border-top:1px solid #e2e2e2;
}
.copyright font{
  width:40%;
}
.gutter{
  display: inline-block;
  width:5%;
}
.eyes{
  cursor: pointer;
  float: right;
  margin: 14px;
}
.capchar{
  display: inline-block;
  width:88px;
  height:30px;
  vertical-align: middle;
  cursor:pointer;
}
.agreement{
  width:340px;
  margin: 0 auto;
  text-align:center;
}
.agree{
  color:rgb(56, 151, 228);
}
.flag{
  display: inline-block;
  margin:0 7px 2px 0;
}
input:checked+label:before{
    background-color:#ff8d26;
    border:none;
}
.label{
    display: block;
    position: relative;  
    top:-16px;
    left: -5px;
}
.label:before{
    content: '';
    display: block;
    position: absolute;
    width:20px;
    height:20px;
    top:18px;
    left:25px;
    border-radius:50%;
    border:1px solid #8f8f8f;
    box-sizing:border-box;
}
.label i{
    position: absolute;
    top:18px;
    left:25px;
    cursor: pointer;
}
.label i:before{
    content: '';
    display: inline-block;
    width:7px;
    height:2px;
    background:rgb(255, 255, 255);
    -moz-transform-origin:center center;
    -webkit-transform-origin:center center;
    transform-origin:center center;
    -moz-transform: rotateZ(45deg) translate(0px,-4px);
    -webkit-transform: rotateZ(45deg) translate(0px,-4px);
    transform: rotateZ(45deg) translate(0px,-4px);
    /* transform: translate(0,-10px); */
}
.label i:after{
    content:'';
    display: inline-block;
    width:12px;
    height:2px;
    background:rgb(255, 255, 255);
    -moz-transform-origin:center center;
    -webkit-transform-origin:center center;
    transform-origin:center center;
    -moz-transform: rotateZ(142deg) translate(-2px,4px);
    -webkit-transform: rotateZ(142deg) translate(-2px,4px);
    transform: rotateZ(142deg) translate(-2px,4px);
}
</style>