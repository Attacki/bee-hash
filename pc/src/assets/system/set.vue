<template>
    <div class="settings clear-float">
        <p class="title">个人设置</p>
        <div class="nav">
            <span class="block"></span>
            <span class="nav-name">登录密码</span>
            <span class="desc">登陆beehash的重要凭证</span>
            <span class="link" @click="showhide('showSubmitBox')" >修改</span>
        </div>
        <div class="nav">
            <span class="block"></span>
            <span class="nav-name">资金密码</span>
            <span class="desc">二级密码保护您的资金安全</span>
            <span class="link" @click="showhide('showPassword')">{{fundTip}}</span>
            <!-- <span class="link" @click="deny">设置</span> -->
        </div>
        <!-- 修改密码 -->
        <transition name="fade">
            <div class="submit-box" v-show="showSubmitBox">
                <div class="tool-box">
                    <p class="box-title">修改密码</p>
                    <i class="el-icon-close close" @click="closeMsg"></i>
                </div>
                <div class="input-item">
                    <font>手机号码</font><!--
                    --><input type="text" spellcheck="false" class="login-input" disabled @focus="clearTip('phone')" v-model="phoneNum" placeholder="请输入手机号码">
                </div>
                <div class="input-item">
                    <font>短信验证码</font><!--
                    --><input type="text"  spellcheck="false" class="login-input" v-model="changePsw.phoneCode" @focus="clearTip('code')" placeholder="请输入短信验证码"><!--
                    --><span class="sendCode" @click="flag && sendChangeCode('/sendChangeCode')">{{btnMsg}}</span>
                    <p class="tip">{{changePsw.tip.code}}</p>
                </div>
                <div class="input-item">
                    <font>设置密码</font><!--
                    --><input :type="inputType"  spellcheck="false" class="login-input" v-model="changePsw.password"  placeholder="数字字母组合密码">
                </div>
                <div class="input-item">
                    <font>重复密码</font><!--
                    --><input :type="inputType"  spellcheck="false" class="login-input" v-model="changePsw.rePassword" @focus="clearTip('password')" placeholder="数字字母组合密码"><!--
                    --><i class="el-icon-view eyes" @mousedown="showPsw" @mouseup="hidePsw"></i>
                    <p class="tip">{{changePsw.tip.password}}</p>
                </div>
                <div>
                    <span class="btn" @click="modifyPsw">修改密码</span>
                </div>
            </div>
        </transition>
        <!-- 设置资金密码 -->
        <transition name="fade">
            <div class="submit-box" v-show="showPassword">
                <div class="tool-box">
                    <p class="box-title">{{fundTip}}资金密码</p>
                    <i class="el-icon-close close" @click="closeMsg"></i>
                </div>
                <div class="input-item">
                    <font>设置密码</font>
                    <div style="display:inline-block;width:220px;padding-left:10px;box-sizing:border-box;"><psw :action="setPsw"  @clean="clearTip('password')" :id="'psw'" ></psw></div>
                </div>
                <div class="input-item">
                    <font>重复密码</font>
                    <div style="display:inline-block;width:220px;padding-left:10px;box-sizing:border-box;"><psw :action="setRepsw" @clean="clearTip('password')" :id="'psw1'" ></psw></div>
                    <p class="tip">{{fundPsw.tip.password}}</p>
                </div>
                <div class="input-item">
                    <font>手机号码</font><!--
                    --><input type="text" spellcheck="false" disabled class="login-input" v-model="phoneNum">
                </div>
                <div class="input-item">
                    <font>短信验证码</font><!--
                    --><input type="text"  spellcheck="false" class="login-input" v-model="fundPsw.phoneCode"  @focus="clearTip('code')" placeholder="请输入短信验证码"><!--
                    --><span class="sendCode" @click="flag && sendChangeCode('/set/get_fund_code')">{{btnMsg}}</span>
                    <p class="tip">{{fundPsw.tip.code}}</p>
                </div>
                <div>
                    <span class="btn" @click="fundCode">确定</span>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
var timer = null
import psw from "../password"
    export default{
        data(){
            return{
                showSubmitBox:false,
                showPassword:false,
                inputType:'password',
                btnMsg:'获取验证码',
                phone:'',
                fundState:0,
                fundTip:'',
                changePsw:{
                    phoneNum:'',
                    phoneCode:'',
                    password:'',
                    rePassword:'',
                    tip:{
                        code:'',
                        password:''
                    }
                },
                fundPsw:{
                    phoneNum:'',
                    phoneCode:'',
                    password:'',
                    rePassword:'',
                    tip:{
                        code:'',
                        password:''
                    }
                },
                phoneNum:'',
                phoneCode:'',
                password:'',
                rePassword:'',
                flag:true,
                tip:{
                    phone:'',
                    code:'',
                    password:''
                }
            }
        },
        components:{
            psw:psw
        },
        methods:{
            showhide:function(which){
                this.$emit('showhide',!this[which])
                this[which] = !this[which]
            },
            fundCode(){
                var that = this
                this.$http.post('/set/set_fund_password',{
                    phone:this.phone,
                    code:this.fundPsw.phoneCode,
                    password:this.fundPsw.password,
                    password_confirmation:this.fundPsw.rePassword
                }).then(
                    (res)=>{
                        if(res.data.code == 0){
                            this.$emit('showhide',false)
                            this.showPassword = false
                            var msg = this.fundState?'修改密码成功':'设置密码成功'
                            this.$Message({
                                message:msg,
                                type:'success',
                                duration:1000
                            })
                            window.clearInterval(timer)
                            that.$data.fundPsw.tip = {}
                            that.$data.fundPsw.phoneCode = ''
                            that.$data.fundPsw.password = ''
                            that.$data.fundPsw.rePassword = ''
                            that.$data.flag = true
                            that.$data.btnMsg = '获取验证码'
                            this.fundTip = '忘记密码?'
                        }else if(res.data.code == 100){
                            for(var key in res.data.data){
                                that.$data.fundPsw.tip[key] = res.data.data[key]
                            }
                        }
                    }
                )
            },
            modifyPsw:function(){
                var that = this
                this.$http.post('/changePassword',{
                    	   	phone:this.phone,
                            code:this.changePsw.phoneCode,
                            password:this.changePsw.password,
                            password_confirmation:this.changePsw.rePassword
                }).then(
                    (res)=>{
                        if(res.data.code == 0){
                            this.$emit('showhide',false)
                            this.showSubmitBox = false
                            this.$Message({
                                message:'修改密码成功',
                                type:'success',
                                duration:1000
                            })
                            window.clearInterval(timer)
                            that.$data.changePsw.tip = {}
                            that.$data.changePsw.phoneCode = ''
                            that.$data.changePsw.password = ''
                            that.$data.changePsw.rePassword = ''
                            that.$data.flag = true
                            that.$data.btnMsg = '获取验证码'
                        }else if(res.data.code == 100){
                            for(var key in res.data.data){
                                that.$data.changePsw.tip[key] = res.data.data[key]
                            }
                        }
                    }
                )
            },
            showPsw(){
                this.$data.inputType = 'text'
            },
            hidePsw(){
                this.$data.inputType = 'password'
            },
            setPsw(val){
                this.fundPsw.password = val
            },
            setRepsw(val){
                this.fundPsw.rePassword = val
            },
            regPhone(event){
                event.target.parentNode.classList.remove('checked')
                var mobile = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
                if(!(mobile.test(this.$data.phoneNum))){
                    this.$data.tip.phone="手机号格式不正确"
                    return false
                }
                return true
            },
            sendChangeCode(url){
                var that = this
                that.$data.flag = false
                that.$http.post(url,{
                    phone:this.$data.phone
                })
                .then(function (res) {
                    if(res.data.code == 0){
                        that.$Message({
                            message:'发送成功',
                            type:'success',
                            duration:1000
                        })
                        var timeCount = 59
                        timer = window.setInterval(
                            ()=>{
                                timeCount--
                                that.$data.btnMsg = timeCount+'s'
                                if(timeCount == 0){
                                    that.$data.flag = true
                                    window.clearInterval(timer)
                                    that.$data.btnMsg = '重新发送'
                                }
                            },1000
                        )
                    }else if(res.data.code == 100){
                        that.$data.flag = true
                        for(var key in res.data.data){
                            that.$data.tip[key] = res.data.data[key]
                        }
                    }
                })
            },
            clearTip(value){
                if(value != ''){
                    this.$data.changePsw.tip[value] = ''
                    this.$data.fundPsw.tip[value] = ''
                }
            },
            closeMsg(){
                window.clearInterval(timer)
                this.$emit('showhide',false)
                this.showSubmitBox = false
                this.showWallet = false
                this.showPassword = false
                this.$data.flag = true
                this.$data.btnMsg = '获取验证码'
            },
            deny(){
                this.$Message.error('该功能暂未开启')
            }
        },
        mounted(){
            this.$http.get('/getchangePassword').then(
                (res)=>{
                    if(res.data.code == 0){
                        this.$data.phone = res.data.data.phone
                        var str = res.data.data.phone
                        var phone =  str.slice(0,3) +'****'+ str.slice(7,str.length)
                        this.$data.phoneNum = phone
                    }else if(res.data.code == 601){
                        this.$router.push('/login')
                        this.$Message({
                            message:res.data.message,
                            type:'error',
                            duration:1000
                        })
                    }else{
                        this.$Message({
                            message:res.data.message,
                            type:'error',
                            duration:1000
                        })
                    }
                }
            )
            this.$http.get('/set/get_fund_password_state').then(
                (res)=>{
                    this.fundState = res.data.data.state
                    if(this.fundState){
                        this.fundTip = '忘记密码?'
                    }else{
                        this.fundTip = '设置'
                    }
                }
            )
        }
    }

</script>

<style scoped>
.fade-enter-active {
  transition: opacity .6s;
}
.fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
.settings{
    padding:38px;
    position: relative;
}
.clear-float:after{
    content:'';
    display: block;
    clear: both;
}
.title{
    margin:0;
    color:#525252;
    font-size: 20px;
    font-weight: bold;
    margin-bottom:30px;
}
.nav{
    width:100%;
    padding: 10px 20px;
    box-sizing: border-box;
    height:70px;
    line-height:50px;
    background-color:#f5f5f5;
    border-top:1px solid #dadada;
    user-select:none;
    margin-bottom:45px;
}
.nav .block{
    display: inline-block;
    width:3px;
    height:13px;
    background-color:#ff8d27;
}
.nav-name{
    display: inline-block;
    font-size: 18px;
    padding-left:15px;
    color:#666666;
    margin-right:50px;
}
.desc{
    color:#999999;
}
.link{
    float: right;
    color:#327fff;
    cursor: pointer;
}
.submit-box{
    width:550px;
    /* height:550px; */
    background-color:#ffffff;
    position: fixed;
    border-radius:10px;
    top:calc(50% - 300px);
    left:calc(50% - 275px);
    z-index: 1111;
}
.box-title{
    text-align:center;
    font-size: 20px;
    margin:50px auto;
}
.tool-box{
    position: relative;
}
.close{
    position: absolute;
    font-size:30px;
    cursor: pointer;
    right:15px;
    top:-35px;;
}
.input-item{
  box-sizing: border-box; 
  margin: 0 auto 27px;
  width:340px;
  height: 44px;
  border: 1px solid #fcb26e;
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
  border-right: 1px solid #ff8d27;
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
  width: 136px;
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
    color:#ffffff;
    font-size:11px;
    background-color:#ff8d26;
    text-align: center;
    cursor: pointer;
}
.disabled-btn{
    cursor:not-allowed;
}
input[type="text"]:disabled{
    background-color:#ffffff;
    color:#c5c4c4;
    user-select: none;
}
.eyes{
  cursor: pointer;
  float: right;
  margin: 14px;
}
.btn{
    display: block;
    width:340px;
    margin:0 auto 90px;
    height:40px;
    line-height: 40px;
    text-align:center;
    background-color: #ff8d26;
    color:white;
    cursor: pointer;
}
</style>
