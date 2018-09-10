<template>
    <div class="cash-box">
        <p class="title">
            充值
            <router-link tag="span" to="/system/mine"  class="back">返回</router-link>
        </p>
        <ul class="input-group">
            <li class="input-item">
                <span class="key"><p style="display:inline-block;margin:0;color:#ff8d27;">*</p> 充值金额</span>
                <div class="value" style="position:relative ;">
                    <input type="number" onkeyup="value=value.replace(/[^\d.]/g,'')" class="input" placeholder="请输入充值金额" @focus ="clean('money')" v-model="money">
                    <span class="tip" style="position:absolute;top:50px;left:0; font-size:14px;color:#ff4343;">{{errorTip.money}}</span>
                </div>
            </li>
            <li class="input-item">
                <span class="key" style="line-height:100px;"><p style="display:inline-block;margin:0;color:#ff8d27;">*</p> 充值方式</span>
                <div class="value" style="position:relative ;">
                    <div class="pay" :class="{'checked':payType == 1}" data-type='1'  @click="changeType" ><span data-type='1'  @click="changeType"  class="alipay">支付宝</span></div>
                    <div class="pay" :class="{'checked':payType == 2}" data-type='2'  @click="changeType" ><span data-type='2'  @click="changeType" class="wechat">微信</span></div>

                </div>
            </li>
            <li class="input-item">
                <span class="key"></span>
                <div class="value">
                    <span class="btn" @click="recharge">充值</span>
                </div>
            </li>
        </ul>
        <div class="weixin" v-if="showcode">
            <div class="wraper">
                <span>微信支付</span>
                <i class="el-icon-close close" @click="close"></i>
                <div class="code_box">
                    <div v-html="code"></div>
                </div>
                <p>扫描二维码支付</p>
                <div class="btn" @click="hideCode">已完成支付</div>
            </div>
        </div>
    </div>
</template>

<script>
var timeOut = null
    export default{
        data(){
            return{
                money:'',
                payType:1,
                code:'',
                showcode:false,
                errorTip:{
                    money:''
                }
            }
        },
        methods:{
            changeType(e){
                var type = e.target.dataset.type;
                this.payType = type;
            },
            recharge(){
                this.$emit('loading',true)
                this.$http.post('/u/account_recharge',{
                    money :this.money,
                    pay_type:this.payType
                })
                .then(
                    (res)=>{
                        if(res.data.code == 0){
                            if(this.payType == 1){
                                window.location.href= res.data.data.redirect;
                            }else if(this.payType == 2){
                                this.$http.get(res.data.data.url,
                                {params:{
                                    recharge_id:res.data.data.recharge_id
                                }}).then(
                                    (res)=>{
                                        if(res.data.code == 0){
                                            this.$emit('loading',false)
                                            this.code = res.data.data.Qr_code
                                            this.showcode = true
                                        }else{
                                            this.$emit('loading',false)
                                            this.$Message.closeAll()
                                            this.$Message({message:res.data.message,type:"error",duration:1000,beforeClose: (action, instance, done) => { done() }})
                                        }
                                    }
                                )
                            }
                        }else{
                            this.$emit('loading',false)
                            for(var key in res.data.data){
                                this.errorTip[key] = res.data.data[key];
                            }
                            this.message(res.data.message,'error');
                        }
                    }
                )
            },
            message(msg,type){
                this.$Message.closeAll();
                this.$Message({
                    message:msg,
                    type:type,
                    duration:1000,
                    beforeClose:(a,b,c)=>{ c() }
                });
            },
            clean(key){
                this.errorTip[key] = '';
            },
            close(){
                this.$emit('loading',false);
                this.$router.push('/system/mine');
            },
            hideCode(){
                this.$router.push('/system/mine');
            }
        },
        beforeRouteLeave(to,from,next){
            this.$emit('loading',false)
            next()
        }
    }
</script>

<style scoped>
input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{
    -webkit-appearance: none;
    appearance: none;
    margin:0;
}
input{
    -moz-appearance: none;
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
.pay{
    display: inline-block;
    width:200px;
    margin-right:35px;
    height:100px;
    line-height: 100px;
    cursor: pointer;
    text-align: center;
    padding:2px;
    border:2px solid #cecece;
    border-radius:5px;
    position: relative;
}
.alipay{
    display: inline-block;
    width:120px;
    height:100px;
    line-height: 100px;
    cursor: pointer;
    text-align: right;
    background: url('../img/alipay.png') 0% center/35px 35px no-repeat;
    font-size: 20px;
    font-weight:200;
}
.wechat{
    display: inline-block;
    width:120px;
    height:100px;
    line-height: 100px;
    cursor: pointer;
    box-sizing: border-box;
    padding-right:10px;
    text-align: right;
    background: url('../img/wepay.png') 1% center/35px 35px no-repeat;
    font-size: 20px;
    font-weight:200;
}
.checked{
    border:2px solid #ff8d27;
}
.checked:after{
    content: '';
    display: block;
    position: absolute;
    width:22px;
    height:22px;
    bottom:5px;
    right:5px;
    background:url('../img/checked.png') center center/22px 22px no-repeat;
}
.weixin{
    background-color: rgba(10, 10, 10, .3);
    padding:20px 15px;
    width:100%;
    height:100%;
    position: fixed;
    top:0;
    left:0;
    z-index: 10000;
}
.weixin .wraper{
    background-color: white;
    width:400px;
    position: fixed;
    top:25%;
    left:calc(50% - 200px);
    padding:15px 0;
}
.wraper span{
    margin: 10px 30px;
    font-weight:bold;
    color:#494949;
}
.wraper .code_box{
    width:150px;
    height:150px;
    background-color:rgba(10,10,10,0.6);
    margin:40px auto 10px;
}
.wraper p{
    margin: 15px 0;
    padding-bottom:25px;
    text-align:center;
    font-size:14px;
    border-bottom:1px solid #cfcfcf;
}
.close{
    float:right;
    font-size:21px;
    cursor: pointer;
    color:#5c5c5c;
    margin-right:10px;
}
.close:after{
    content: '';
    display: block;
    clear: both;
    zoom: 1;
}
.weixin .btn{
    float: right;
    width:90px;
    text-align: center; 
    height:25px;
    line-height:25px;
    border-radius:2px;
    background-color:#1d99f0;
    color:white;
    margin-right:15px;
    font-size:14px;
    cursor: pointer;
    user-select: none;
}
</style>
