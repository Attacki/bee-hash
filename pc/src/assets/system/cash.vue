<template>
    <div class="cash-box">
        <p class="title">
            提现
            <router-link tag="span" to="/system/mine"  class="back">返回</router-link>
        </p>
        <ul class="input-group">
            <li class="input-item">
                <span class="key"><p style="display:inline-block;margin:0;color:#ff8d27;">*</p> 提现金额</span>
                <div class="value" style="position:relative ;">
                    <input type="number" class="input reg" @keyup="keyup" @blur="blur" @focus="clean('money')" v-model="getCash" placeholder="请输入提现金额">
                    <span class="tip" style="position:absolute;top:50px;left:0; font-size:14px;color:#ff4343;">{{errorTip.money}}</span>
                    <li class="desc" style="margin-top:30px;">
                        <pre class="tip">●   当前余额{{balance}}元    <span style="color:#47a3f3;font-size:14px;cursor:pointer;text-decoration:underline;" @click="getAll">全部提现</span>   （最低提现金额为100元）</pre>
                    </li>
                    <li class="desc">
                        <pre class="tip">●   提现到账金额：<font style="color:#ff8d27;">{{calcReal}}</font>         （手续费：提现金额的1%）</pre>
                    </li>
                </div>
            </li>
            <li class="input-item">
                <span class="key"><p style="display:inline-block;margin:0;color:#ff8d27;">*</p> 支付宝帐号</span>
                <div class="value" style="position:relative ;">
                    <input type="text" class="input" @focus="clean('payee')" v-model="payee" placeholder="请输入支付宝帐号">
                    <span class="tip" style="position:absolute;top:50px;left:0; font-size:14px;color:#ff4343;">{{errorTip.payee}}</span>
                </div>
            </li>
            <li class="input-item">
                <span class="key"><p style="display:inline-block;margin:0;color:#ff8d27;">*</p> 支付宝姓名</span>
                <div class="value" style="position:relative ;">
                    <input type="text" class="input" @focus="clean('payee_name')" v-model="payee_name" placeholder="请输入支付宝姓名">
                    <span class="tip" style="position:absolute;top:50px;left:0; font-size:14px;color:#ff4343;">{{errorTip.payee_name}}</span>
                </div>
            </li>
            <li class="input-item">
                <span class="key">到账时间</span>
                <div class="value">
                    <p style="line-height:40px;margin:0 ;">三个工作日以内（假节日时间顺延）</p>
                </div>
            </li>
            <li class="input-item">
                <span class="key"><p style="display:inline-block;margin:0;color:#ff8d27;">*</p> 资金密码</span>
                <div class="value" style="position:relative;">
                    <input type="password" class="input" @focus="clean('fund_password')" v-model="fund_password">
                    <span class="tip" style="position:absolute;top:50px;left:0; font-size:14px;color:#ff4343;">{{errorTip.fund_password}}</span>
                    <router-link tag="span" to="/system/set" style="position:absolute;left:540px;top:13px;color:#ff8d27;font-size:14px;cursor:pointer;">忘记密码?</router-link><br>
                </div>
            </li>
            <li class="input-item">
                <span class="key">手机号码</span>
                <div class="value">
                    <input type="text" class="input" :value="phoneNum" style="width:460px;cursor:no-drop" disabled>
                    <span class="sendCode" @click="flag && sendCode()">{{btnMsg}}</span>
                </div>
            </li>
            <li class="input-item">
                <span class="key"><p style="display:inline-block;margin:0;color:#ff8d27;">*</p> 验证码</span>
                <div class="value" style="position:relative;">
                    <input type="text" class="input" v-model="phoneCode" @focus="clean('code')" style="width:600px;" placeholder="请输入验证码"><br>
                    <span class="tip" style="position:absolute;top:50px;left:0; font-size:14px;color:#ff4343;">{{errorTip.code}}</span>
                </div>
            </li>
            <li class="input-item">
                <span class="key"></span>
                <div class="value">
                    <span class="btn" @click="withDraw">提交</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
var timeOut = null
    export default{
        data(){
            return{
                phone:'',
                phoneNum:'',            
                balance:'0',
                minimum:'',    
                getCash:'',         //金额
                payee:'',           //支付宝账户
                payee_name:'',      //支付宝姓名
                fund_password:'',   //资金密码
                phoneCode:'',       //验证码
                errorTip:{
                    fund_password:'',
                    code:'',
                    payee:'',
                    payee_name:'',
                    money:''
                },
                flag:true,
                btnMsg:'获取短信验证码',
                Inter:null
            }
        },
        computed:{
            calcReal:function(){
                var val = this.getCash
                if(val == ''||val == null||val == undefined){
                    return '请输入金额'
                }else{
                    return (this.getCash*0.99).toFixed(2) + '元'
                }
            }
        },
        methods:{
            blur(){
                var value = Number(this.getCash).toFixed(2)
                this.getCash = value
                if(value == 0 || value == ''|| value == undefined || isNaN(value) ){
                    this.getCash = this.minimum
                }
                if(value > this.balance){
                    this.getCash = this.balance
                }else if( value < this.minimum){
                    this.getCash = this.minimum
                }
            },
            keyup(){
                if(timeOut){
                    window.clearTimeout(timeOut)
                }
                timeOut = window.setTimeout(
                    ()=>{
                        var val = Number(this.getCash).toFixed(2)
                        this.getCash = val
                        if( val > this.balance){
                            this.getCash = this.balance
                        }else if( val < this.minimum){
                            this.getCash = this.minimum
                        }
                    },1000
                )
            },
            getAll(){
                this.getCash = this.balance
            },
            clean(value){
                this.$data.errorTip[value] = ''
            },
            blurClass(event){
                event.target.parentNode.classList.remove('checked')
            },
            sendCode(){
                this.$http.get('/u/get_apply_fund_code',{
                    params:{phone:this.phone}
                })
                .then((res)=>{
                    if(res.data.code == 0){
                        var timeCount = 60
                        this.Inter = window.setInterval(
                            ()=>{
                                try {
                                    this.flag = false
                                    timeCount--
                                    this.btnMsg = timeCount+'s'
                                    if(timeCount == 0){
                                        this.flag = true
                                        window.clearInterval(this.Inter)
                                        this.btnMsg = '重新发送'
                                }}catch (error){
                                    window.clearInterval(this.Inter)
                                }
                            },1000
                        )
                        this.message(res.data.message,'success')
                    }else{
                        this.message(res.data.message,'error')
                    }
                })
            },
            withDraw(){
                this.$http.post('/u/apply_fund_withdraw',{
                    money :this.getCash,
                    payee :this.payee,
                    payee_name :this.payee_name,
                    fund_password : this.fund_password,
                    code : this.phoneCode
                })
                .then(
                    (res)=>{
                        if(res.data.code == 0){
                            this.message(res.data.message,'success')
                            this.$router.push('/system/mine')
                        }else{
                            for(var key in res.data.data){
                                this.errorTip[key] = res.data.data[key]
                            }
                        }
                    }
                )
            },
            message(msg,type){
                this.$Message.closeAll()
                this.$Message({
                    message:msg,
                    type:type,
                    duration:1000,
                    beforeClose:(a,b,c)=>{ c() }
                })
            }
        },
        mounted(){
            this.$http.get('/u/get_account_balance').then(
                (res)=>{
                    if(res.data.code == 0){
                        this.phone = res.data.data.phone
                        var str = res.data.data.phone
                        var phone =  str.slice(0,3) +'****'+ str.slice(7,str.length)
                        this.phoneNum = phone
                        this.balance = res.data.data.user_money
                        this.minimum = res.data.data.min_money
                        this.getCash = res.data.data.min_money
                    }else if(res.data.code == 601){
                        this.$router.push('/login')
                        this.message(res.data.msg,'error')
                    }else{
                        this.message(res.data.msg,'error')
                    }
                }
            )
        }
    }
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    appearance: none; 
    margin: 0; 
}
input{
    -moz-appearance:textfield;
}
.cash-box{
    padding:38px;
}
.cash-box .title{
    display: inline-block;
    color:#525252;
    font-size: 20px;
    font-weight: bold;
    margin-top:0px;
    margin-bottom:20px;
    width:735px;
}
.back{
    display: inline-block;
    margin-right: 20px;
    color:rgb(255, 141, 39);
    font-weight:400;
    padding-bottom: 0px;
    border-bottom:1px solid rgb(255, 141, 39);
    cursor: pointer;
    font-size: 14px;
    float: right;
}
.back:after{
    content:'';
    display: block;
    clear: both;
}
.input-group{
    padding: 0;
}
.input-item{
    margin-bottom:35px;
}
.input-item .key{
    display: inline-block;
    width:100px;
    color:#4e4d4d;
    vertical-align: top;
    line-height:40px;
}
.input-item .value{
    display: inline-block;
    width:calc(100% - 110px);
}
.value .desc{
    color:#999999;
    font-size: 14px;
    margin-top:20px;
}
.desc .tip{
    display: inline-block;
    margin:0;
}
.desc .cash_rate{
    color:#ff8d27;
}
.input-item .input{
    display: inline-block;
    border-style: none;
    outline: none;
    border:1px solid #cacaca;
    width:600px;
    height:40px;
    border-radius: 5px;
    font-size:18px;
    padding-left:10px;
    margin-right:15px;
}
::-webkit-input-placeholder{
    font-size:14px;
}
.value .btn{
    margin-top:30px;
    display: inline-block;
    width:400px;
    height:40px;
    line-height:40px;
    text-align: center;
    color:white;
    background-color:#ff8d27;
    cursor: pointer;
    user-select:none;
}
.value .sendCode{
    display: inline-block;
    border-radius: 5px;
    width:98px;
    padding:10px;
    text-align:center;
    color:#47a3f3;
    border:1px solid #47a3f3;
    font-size:14px;
    cursor:pointer;
}
input[type="text"]:disabled{
    background-color:#f5f7fb;
    color:#c4c4c5;
}
.reg{
    outline: 0;
    border-style: none;
    -webkit-appearance:textfield;
    -moz-appearance:textfield;
    appearance:textfield;
}
</style>
