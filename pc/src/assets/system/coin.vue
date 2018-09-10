<template>
    <div class="coin-box">
        <p class="title">
            提币
            <router-link tag="span" to="/system/mine"  class="back">返回</router-link>
        </p>
        <ul class="input-group">
            <li class="input-item">
                <span class="key"><p style="display:inline-block;margin:0;color:#ff8d27;">*</p> 提币币种</span>
                <div class="value">
                    <div class="changeCoin" :class="{'focus':coinState}">
                        <div class="coin" @click="changeCoin" >
                            {{coinSelected}}
                            <span class="triangle"></span>
                        </div>
                        <ul v-show="coinState" class="coin-item" :class="{'focus':coinState}">
                            <li v-for="(val,key) in coinlist" :data-id="key" @click="coinitem">{{key}}</li>
                        </ul>
                    </div>
                </div>
            </li>
            <li class="input-item">
                <span class="key"><p style="display:inline-block;margin:0;color:#ff8d27;">*</p> 提币金额</span>
                <div class="value" style="position:relative ;">
                    <input type="text" class="input" @keyup="keyup" @blur="blur" @focus="clean('amount')" v-model="getcoin">
                    <span class="tip" style="position:absolute;top:50px;left:0; font-size:14px;color:#ff4343;">{{errorTip.amount}}</span>
                    <span style="position:absolute;left:540px;top:13px;color:#ff8d27;font-size:14px;cursor:pointer;" @click="getAll">全部提现</span><br>
                    <li class="desc" style="margin-top:30px;">
                        <pre class="tip">●   当前余额{{coinBalance.balance}}{{coinSelected}}</pre>
                    </li>
                    <li class="desc">
                        <pre class="tip">●   实际到账{{calcReal}}     <font class="coin_rate">提现费率：{{coinBalance.rate}}‰   (千分之{{coinBalance.rate}})</font></pre>
                    </li>
                </div>
            </li>
            <li class="input-item">
                <span class="key"><p style="display:inline-block;margin:0;color:#ff8d27;">*</p> 转入地址</span>
                <div class="value">
                    <div class="address" :class="{'focus':addressState}">
                        <div class="coin" @click="changeAddress" >
                            <span style="display:inline-block;width:70px;vertical-align:top;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{addressSelected.alias}}</span>
                            <span style="display:inline-block;width:450px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{addressSelected.wallet}}</span>
                            <span class="triangle"></span>
                        </div>
                        <ul v-show="addressState" class="coin-item" :class="{'focus':addressState}">
                            <li v-for="address in coinAddress" :data-id="address.id">
                                <div style="height:35px;" :data-id="address.id" @click="chooseAdd">
                                    <span style="display:inline-block;width:70px;vertical-align:top;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{address.alias}}</span>
                                    <span style="display:inline-block;width:450px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{address.wallet}}</span>
                                </div>
                                <i class="el-icon-delete delete" @click="del"></i>
                            </li>
                            <li @click="addAddress" style="text-align:center;color:#888888;font-size:15px; "><i class="el-icon-plus" style="margin-right:10px;"></i>添加钱包地址</li>
                        </ul>
                    </div>
                </div>
            </li>
            <li class="input-item">
                <span class="key">到账时间</span>
                <div class="value">
                    <p style="line-height:40px;margin:0 ;">三个工作日以内</p>
                    <li class="desc">
                        <pre class="tip">●   有任何问题请联系客服： 027-67126811（周一至周五 9:30-17:30）</pre>
                    </li>
                </div>
            </li>
            <!-- <li class="input-item">
                <span class="key"><p style="display:inline-block;margin:0;color:#ff8d27;">*</p> 资金密码</span>
                <div class="value" style="position:relative;">
                    <input type="password" class="input" @focus="clean('fund_password')" v-model="fundPsw">
                    <span class="tip" style="position:absolute;top:50px;left:0; font-size:14px;color:#ff4343;">{{errorTip.fund_password}}</span>
                    <router-link tag="span" to="/system/set" style="position:absolute;left:540px;top:13px;color:#ff8d27;font-size:14px;cursor:pointer;">忘记密码?</router-link><br>
                </div>
            </li> -->
            <li class="input-item">
                <span class="key"><p style="display:inline-block;margin:0;color:#ff8d27;">*</p> 资金密码</span>
                <div class="value" style="position:relative;">
                    <div class="psw-box"><psw :action ="getPsw" @clean="clean('fund_password')" :id="'psw'"></psw></div>
                    <span class="tip" style="position:absolute;top:50px;left:0; font-size:14px;color:#ff4343;">{{errorTip.fund_password}}</span>
                    <router-link tag="span" to="/system/set" style="color:#ff8d27;font-size:14px;cursor:pointer;">忘记密码?</router-link><br>
                </div>
            </li>
            <li class="input-item">
                <span class="key">手机号码</span>
                <div class="value">
                    <input type="text" class="input" :value="phoneNum" style="width:300px;cursor:no-drop" disabled>
                    <span class="sendCode" @click="codeInter.flag && sendCode()">{{codeInter.btnMsg}}</span>
                </div>
            </li>
            <li class="input-item">
                <span class="key"><p style="display:inline-block;margin:0;color:#ff8d27;">*</p> 验证码</span>
                <div class="value" style="position:relative;">
                    <input type="text" class="input" v-model="phoneCode" @focus="clean('code')" style="width:300px;" placeholder="请输入验证码"><br>
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
        <!-- 绑定钱包地址的弹窗 -->
        <div class="mask" v-show="bindWallet.state">
            <div class="submit-box" v-show="bindWallet.state">
                <div class="tool-box">
                    <p class="box-title">绑定{{coinSelected}}钱包</p>
                    <i class="el-icon-close close" @click="closeBox"></i>
                </div>
                <div class="input-sub">
                    <font>钱包地址</font>
                    <input type="text" spellcheck="false" class="login-input" v-model="bindWallet.wallet" @blur="blurClass" @focus="clearTip($event,'wallet')" :placeholder="'添加'+coinSelected+'钱包地址'">
                    <p class="sub-tip">{{bindWallet.tip.wallet}}</p>
                </div>
                <div class="input-sub">
                    <font>备注</font>
                    <input type="text"  spellcheck="false" class="login-input" v-model="bindWallet.remark" @blur="blurClass" @focus="clearTip($event)"  :placeholder="coinSelected+'钱包备注'">
                </div>
                <div>
                    <span class="sub-btn" @click="addWallet">提交</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import psw from "../password"
var timer = null,timeOut = null
    export default{
        data(){
            return{
                phone:'',
                phoneNum:'',
                getcoin:'',//提币金额
                fundPsw:'',//资金密码
                phoneCode:'',
                errorTip:{
                    fund_password:'',
                    code:'',
                    amount:''
                },
                coinlist:[],// 币种清单
                coinSelected:'',//被选币种
                coinBalance:{},//被选币种的信息
                addressSelected:{ alias:'', wallet:'' }, //被选钱包
                coinState:false,//显示币种列表
                addressState:false,//显示地址列表
                bindWallet:{//绑定钱包地址
                    wallet:'',
                    state:false,
                    remark:'',
                    tip:{
                        wallet:'',
                        phone:''
                    }
                },
                coinAddress:[],//对应币种的钱包列表
                codeInter:{
                    Inter:'',//定时器
                    flag:true,
                    btnMsg:'获取短信验证码'
                }
            }
        },
        components:{
            psw:psw
        },
        computed:{
            calcRate:function(){
                var val = this.coinBalance.rate
                if(val == ''||val == null||val == undefined){
                    return '计算中...'
                }else{
                    return val/1000
                }
            },
            calcReal:function(){
                var val = this.coinBalance.rate
                if(val == ''||val == null||val == undefined){
                    return '计算中...'
                }else{
                    return (this.getcoin*(1-val/1000)).toFixed(8) + this.coinSelected
                }
            }
        },
        methods:{
            coinitem(event){
                var target = event.target
                this.coinSelected = target.getAttribute('data-id')
                this.coinBalance = this.coinlist[this.coinSelected]
                this.$router.push('/system/coin/'+this.coinSelected)
                this.$data.coinState = false
                event.stopPropagation()
                this.getWallet()
            },
            changeCoin(event){
                this.coinState =  !this.coinState
                this.addressState = false
                event.stopPropagation()
            },
            blur(){
                var value = Number(this.getcoin)
                this.getcoin = value.toFixed(8)
                if(value == 0|| value == ''|| value == undefined || isNaN(value) ){
                    this.getcoin = this.coinBalance.minimum
                }
                if(value > this.coinBalance.balance){
                    this.getcoin = this.coinBalance.balance
                }else if( value < this.coinBalance.minimum){
                    this.getcoin = this.coinBalance.minimum
                }
            },
            keyup(){
                if(timeOut){
                    window.clearTimeout(timeOut)
                }
                timeOut = window.setTimeout(
                    ()=>{
                        var val = Number(this.getcoin)
                        if( val > this.coinBalance.balance){
                            this.getcoin = this.coinBalance.balance
                        }else if( val < this.coinBalance.minimum){
                            this.getcoin = this.coinBalance.minimum
                        }
                    },1000
                )
            },
            getAll(){
                this.getcoin = this.coinBalance.balance
            },
            chooseAdd(event){
                var selectedId = event.target.parentNode.dataset.id
                this.$data.addressState = false
                this.$data.coinAddress.forEach(element => {
                    if(selectedId == element.id){
                        this.addressSelected = element
                    }
                });
                event.stopPropagation()
            },
            changeAddress(event){
                this.addressState = !this.addressState
                this.coinState =  false
                event.stopPropagation()
            },
            del(event){
                var addressId= event.target.parentNode.dataset.id 
                this.$data.addressState = true
                this.$http.get('/wallet/del_coin_wallet',{params:{coin:this.coinSelected,wallet_id:addressId}}).then(
                    (res)=>{
                        if(res.data.code == 0){
                            this.$Message({
                                message:res.data.message,
                                type:'success',
                                duration:1000
                            })
                            this.getWallet()
                        }else if(res.data.code == 601){
                            this.$router.push('/login');
                            this.$Message({ message:res.data.message,type:'error',duration:1000 })
                        }else{ this.$Message({ message:res.data.message,type:'error',duration:1000 })}
                })
                event.stopPropagation()
            },
            clearTip(event,value){
                event.target.parentNode.classList.add('checked')
                if(value != ''){
                    this.$data.bindWallet.tip[value] = ''
                }
            },
            clean(value){
                this.$data.errorTip[value] = ''
            },
            closeBox(){
                window.clearInterval(timer)
                this.bindWallet.state = false
                this.bindWallet.tip = {}
                this.bindWallet.wallet = ''
                this.bindWallet.remark = ''
                this.bindWallet.phoneCode = ''
                this.bindWallet.flag = true
                this.bindWallet.btnMsg = '获取验证码'
                document.documentElement.style.paddingRight="0px"
                document.documentElement.style.overflowY = 'scroll'
            },
            blurClass(event){
                event.target.parentNode.classList.remove('checked')
            },
            addAddress(){
                document.documentElement.style.overflowY = 'hidden'
                document.documentElement.style.paddingRight="8px"
                this.addressState = false
                this.bindWallet.state = true
            },
            addWallet(){
                this.$http.post('/wallet/add_coin_wallet',{
                    phone:this.phone,
                    coin:this.coinSelected,
                    wallet:this.bindWallet.wallet,
                    remark:this.bindWallet.remark
                }).then(
                    (res)=>{
                        if(res.data.code == 0){
                            this.$Message({
                                message:res.data.message,
                                type:'success',
                                duration:1000
                            })
                            this.closeBox()
                            this.getWallet()
                        }else if(res.data.code == 100){
                            for(var key in res.data.data){
                                this.bindWallet.tip[key] = res.data.data[key]
                            }
                            if(res.data.data.length == 0){
                                this.$Message({
                                    message:res.data.message,
                                    type:'error',
                                    duration:1000
                                })
                            }
                        }else if(res.data.code == 601){
                            this.$router.push('/login');
                            this.$Message({ message:res.data.message,type:'error',duration:1000 })
                        }else{ this.$Message({ message:res.data.message,type:'error',duration:1000 })}
                })
            },
            sendCode(){
                this.$http.get('/u/get_apply_coin_code',{
                    params:{phone:this.phone}
                })
                .then((res)=>{
                    if(res.data.code == 0){
                        var timeCount = 60
                        this.codeInter.Inter = window.setInterval(
                            ()=>{
                                try {
                                    this.codeInter.flag = false
                                    timeCount--
                                    this.codeInter.btnMsg = timeCount+'s'
                                    if(timeCount == 0){
                                        this.codeInter.flag = true
                                        window.clearInterval(this.codeInter.Inter)
                                        this.codeInter.btnMsg = '重新发送'
                                }}catch (error){
                                    window.clearInterval(this.codeInter.Inter)
                                }
                            },1000
                        )
                        this.$Message({
                            message:res.data.message,
                            type:'success',
                            duration:1000
                        })
                    }else{
                        this.$Message({
                            message:res.data.message,
                            type:'error',
                            duration:1000
                        })
                    }
                })
            },
            withDraw(){
                this.$http.post('/u/apply_coin_withdraw',{
                    coin:this.coinSelected,
                    amount:this.getcoin,
                    wallet:this.addressSelected.wallet,
                    fund_password:this.fundPsw,
                    phone:this.phone,
                    code:this.phoneCode
                })
                .then(
                    (res)=>{
                        if(res.data.code == 0){
                            this.$Message({message:res.data.message,type:'success',duration:1500})
                            this.$router.push('/system/history?coin='+this.coinSelected)
                        }else{
                            for(var key in res.data.data){
                                this.errorTip[key] = res.data.data[key]
                            }
                        }
                    }
                )
            },
            getWallet(){
                this.$http.get('/wallet/get_coin_wallet',{params:{ coin:this.coinSelected }})
                .then(
                    (res)=>{
                        if(res.data.code == 0){
                            this.coinAddress = res.data.data.list
                            this.coinAddress.length >= 1 ? this.addressSelected = this.coinAddress[0] : this.addressSelected = {  alias:'',  wallet:''  }
                        }else if(res.data.code == 601){
                            this.$router.push('/login');
                            this.$Message({ message:res.data.message,type:'error',duration:1000 })
                        }else{ this.$Message({ message:res.data.message,type:'error',duration:1000 })}
                })
            },
            getPsw(val){
                this.fundPsw = val;
            },
            message(msg,type){
                this.$Message.closeAll();
                this.$Message({
                    message:msg,
                    type:type,
                    duration:1000,
                    beforeClose:(a,b,c)=>{ c() }
                });
            }
        },
        mounted(){
            this.coinSelected = this.$router.currentRoute.params.type
            this.$http.get('/u/get_coin_found').then(
                (res)=>{
                    this.coinlist = res.data.data
                    this.coinBalance = this.coinlist[this.coinSelected]
                }
            )
            this.getWallet()
            this.$http.get('/getchangePassword').then(
                (res)=>{
                    if(res.data.code == 0){
                        this.phone = res.data.data.phone
                        var str = res.data.data.phone
                        var phone =  str.slice(0,3) +'****'+ str.slice(7,str.length)
                        this.phoneNum = phone
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
            document.body.onclick = ()=>{ 
                this.$data.coinState = false
                this.$data.addressState = false
            }
        }
    }
</script>

<style scoped>

.coin-box{
    padding:38px;
}
.coin-box .title{
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
    margin-right: 35px;
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
.desc .coin_rate{
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
    color:#257ecc;
    border:1px solid #257ecc;
    font-size:14px;
    cursor:pointer;
}
input[type="text"]:disabled{
    background-color:#f5f7fb;
    color:#c4c4c5;
}
.changeCoin{
    width:150px;
    height:44px;
    line-height:44px;
    padding:0 5px;
    border:1px solid #bdbdbd;
    border-radius: 5px;
    position: relative;
}
.address{
    width: 600px;
    line-height:44px;
    padding:0 5px;
    border:1px solid #bdbdbd;
    border-radius: 5px;
    position: relative;
}
.focus{
    border:1px solid #ff8d27!important;
}
.coin{
    width:100%;
    box-sizing: border-box;
    cursor: pointer;
    height:44px;
    padding: 0px 20px;
}
.coin-item{
    box-sizing:border-box;
    position: absolute;
    top:45px;
    left:-1px;
    width:calc(100% + 2px);
    margin: 0;
    padding:0 5px;
    border:1px solid #bdbdbd;
    border-radius: 5px;
    background-color:white;
    z-index: 1000;
}
.coin-item li{
    box-sizing:border-box;
    width: 100%;
    height:35px;
    line-height: 35px;
    margin:5px 0;
    padding: 0px 20px;
    user-select: none;
    position: relative;
}
.coin-item li:hover{
    background-color:#fff3e8;
}
.triangle{
    display: inline-block;
    border-left:6px solid #ffffff;
    border-top:9px solid #ffc28c;
    border-right:6px solid #ffffff;
    margin-left: 10px;
    margin-right:-10px;
    position: absolute;
    top:20px;
    right:20px;
}
.delete{
    position: absolute;
    right:15px;
    top:0;
    margin-top:10px;
    cursor: pointer;
}
.mask{
    width:100%;
    height:100%;
    background-color:rgba(10, 10, 10, .3);
    position: fixed;
    top:0;
    left:0;

}
.submit-box{
    width:700px;
    background-color:#ffffff;
    position: fixed;
    border-radius:10px;
    top:calc(50% - 250px);
    left:calc(50% - 345px);
    z-index: 1111;
    box-shadow: 0 0 8px 0 #8f8f8f;
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
.input-sub{
  box-sizing: border-box; 
  margin: 0 auto 27px;
  width:570px;
  height: 44px;
  border: 1px solid #ffc793;
  border-radius: 4px;
  padding:0 0 0 15px;
  line-height:42px;
  position: relative;
}
.input-sub.checked{
  border: 1px solid #ff8d26;
}
.sub-tip{
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
.input-sub font{
  display: inline-block;
  margin-top:15px;
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
  width:450px;
  height:100%;
  border-style: none; /* 边框的显示方式 */
  padding:0 0 0 15px; 
  font-size: 15px;
  outline: 0;
}
.input-sub input::-webkit-input-placeholder {
  color: #a9aaac; 
  font-size: 14px;
} 
.input-sub input:-moz-placeholder {
  color: #a9aaac; 
  font-size: 14px;
} 
.input-sub input:-ms-input-placeholder {
  color: #a9aaac; 
  font-size: 14px;
}
.input-sub  input[type="text"]:disabled{
    background-color:#ffffff;
    color:#c5c4c4;
    user-select: none;
}
.sub-btn{
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
.psw-box{
    display:inline-block;width:310px;height:44px;text-align:center;border:1px solid #d2d1d6;border-radius:5px;
}
.psw-box /deep/ .password input{
    height:50% !important;
    font-size:30px;
    margin: 10px 0 0;
    padding: 5px;
}
</style>
