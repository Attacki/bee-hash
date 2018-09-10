<template>
    <div class="account-property">
        <h2 class="title">我的帐号</h2>
        <el-row class="my-capital">
            <el-col :span="12" style="border-right:3px solid #f2f2f2;">
                <div class="now-wealth" style="user-select:none;">
                    <span>我的资产</span>
                    <span>同步时间：{{nowTime}}</span>
                    <span @click="getNowTime">刷新</span>
                </div>
                <div>
                    <h1 class="balance">
                        <p style="margin:0;display:inline-block">￥{{userData.person_money.user_money}}</p> 
                        <router-link class="detail" to="/system/detail">账户明细</router-link>
                    </h1>
                    <ul class="assetDetail">
                        <li>
                            <span>账户余额</span>
                            <span>￥{{userData.person_money.user_money}}</span>
                        </li>
                        <li>
                            <span>冻结资产</span>
                            <span>￥{{userData.person_money.frozen_money}}</span>
                        </li>
                        <li>
                            <span>积分总额  </span>
                            <span>{{userData.person_money.pay_points}}</span>
                        </li>
                        <li>
                            <a @click="Recharge">充值</a>
                            <a @click="withdraw">提现</a>
                        </li>
                    </ul>
                </div>
            </el-col>
            <el-col :span="12" class="table-box">
                <span>我的算力</span>
                <table class="hashTable" cellspacing='0' cellpadding="0">
                    <thead>
                        <th>算力名称</th>
                        <th>算力</th>
                        <th></th>
                    </thead>
                    <tbody v-if="!(userData.order_info.length == 0)">
                        <tr v-for="hash in userData.order_info">
                            <td>{{hash.coin}}</td>
                            <td>{{hash.goods_number}}{{hash.unit}}</td>
                            <td><router-link tag="p" :to="'/system/power/'+hash.coin">算力明细></router-link></td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="3">您还没有算力，立即<router-link to="/hash/0" style="color:#3079ff;text-decoration:underline!important;">购买</router-link>?</td>
                        </tr>
                    </tbody>
                </table>
            </el-col>
        </el-row>
        <span class="dashLine"></span>
        <h2 class="title">资产分布</h2>
        <div class="account-balance" >
            <div v-for="coin in userData.found">
                <p style="margin-bottom:0;">
                    <span class="triangle"></span>
                    <span class="coin">{{coin.coin}}</span>
                </p>
                <router-link :to="'/system/power/'+coin.coin" class="account-details" >查看明细></router-link>
                <ul class="account-data coin-balance">
                    <li>
                        <p>账户余额</p>
                        <p><span>{{coin.balance}}</span>&nbsp{{coin.coin}}</p>
                    </li><!--
                    --><li>
                        <p>今日收益</p>
                        <p><font>{{coin.today_income}}</font>&nbsp{{coin.coin}}</p>
                    </li><!--
                    --><li>
                        <p>累计收益</p>
                        <p><font>{{coin.all_balance}}</font>&nbsp{{coin.coin}}</p>
                    </li><!--
                    --><li>
                        <p>冻结资产</p>
                        <p><font>{{coin.freeze_balance}}</font>&nbsp{{coin.coin}}</p>
                    </li><!--
                    --><div class="btn-box">
                        <span class="button" @click = "getcash(coin.balance,coin.minimum,coin.coin)" >提币</span>
                    </div>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                userData:{
                    order_info:[],
                    found:[],
                    person_money:{
                        user_money:0,
                        frozen_money:0
                    }
                },
                nowTime:''
            }
        },
        methods:{
            getNowTime(){
                var time = new Date
                this.nowTime = time.getFullYear() + '-' + turnTwo(time.getMonth()+1) + '-' + turnTwo(time.getDate()) + ' ' + turnTwo(time.getHours()) + ':' + turnTwo(time.getMinutes()) + ':' + turnTwo(time.getSeconds())
                this.$http.get('/u/get_found').then(
                    (res)=>{
                        if(res.data.code == 0){
                            this.userData.order_info = res.data.data.order_info
                            this.userData.found = res.data.data.found
                            this.userData.person_money = res.data.data.person_money
                        }else if(res.data.code == 601){
                            this.$router.push('/login')
                            this.$Message({
                                message:res.data.message,
                                type:'error',
                                duration:1000,
                                beforeClose: (action, instance, done) => { done() }
                            })
                        }else{
                            this.$Message({
                                message:res.data.message,
                                type:'error',
                                duration:1000,
                                beforeClose: (action, instance, done) => { done() }
                            })
                        }
                    }
                )
                function turnTwo(num){
                    if( num < 10 ){ return  '0' + num }
                    return num
                }
            },
            Recharge(){
                this.$router.push('/system/recharge')
                // this.$Message.closeAll()
                // this.$Message({
                //     message:'暂不支持充值功能',
                //     type:'error',
                //     beforeClose: (action, instance, done) => { done() }
                // })
            },
            withdraw(){
                if(this.userData.person_money.user_money >= 100){
                    this.$router.push('/system/cash')
                }else{
                    this.$Message({
                        message:'账户余额必须大于100元',
                        type:'error',
                        duration:1500,
                        beforeClose: (action, instance, done) => { done() }
                    })
                }
            },
            getcash(balance,minimum,coin){
                if(balance >= minimum){
                    this.$router.push('/system/coin/'+coin)
                }else{
                    var num = parseFloat(minimum)
                    this.$Message({
                        message:'币种余额必须大于'+num+coin,
                        type:'error',
                        beforeClose: (action, instance, done) => {
                            done(); // 就是它!
                        }
                    })
                }
            },
        },
        mounted(){
            this.getNowTime()
        }
    }
</script>

<style scoped>
.account-property{
    padding:38px;
}
.title{
    font-size:24px;
    font-weight: 400;
    color:#333333;
    margin-bottom:0;
}

.title{
    margin:0;
    color:#525252;
    font-size: 20px;
    font-weight: bold;
    margin-bottom:30px;
}
.dashLine{
    display: block;
    margin: 0 auto 20px;
    height:10px;
    border-top:1px dashed #e2e2e2;
    border-bottom:1px dashed #e2e2e2;
}
.my-capital{
    padding: 0 0px 35px;
}
.my-capital .el-col{
    max-height:301px;
}
.now-wealth span:nth-child(1){
    display: inline-block;
    padding-right:45px;
    font-size: 18px;
    color:#525252;
}
.now-wealth span:nth-child(2){
    display: inline-block;
    padding-right:15px;
    font-size: 14px;
    color:#525252;
}
.now-wealth span:nth-child(3){
    font-size: 14px;
    color:#3079ff;
    cursor: pointer;
    text-decoration: underline;
}
.detail{
    font-size: 14px;
    color:#f58235;
    cursor: pointer;
    text-decoration: underline !important;
}
.balance{
    color:#6c6c6c;
    font-size:40px;
    font-weight:450;
}
.assetDetail{
    padding:0;
}
.assetDetail li {
    width:100%;
    height:35px;
    line-height:35px;
}
.assetDetail li:last-child{
    margin-top:15px;
}
.assetDetail li span{
    display: inline-block;
    width:49%;
}
.assetDetail li span:nth-child(1){
    color:#525252;
}
.assetDetail li span:nth-child(2){
    color:#333333;
}
.assetDetail li a:nth-child(1){
    display: inline-block;
    width:120px;
    height:50px;
    line-height:50px;
    text-align:center;
    border-radius: 7px;
    font-size: 18px;
    font-weight:500;
    background-color: #ff8d27;
    color:white;
    margin-right:calc(50% - 120px );
    cursor: pointer;
}
.assetDetail li a:nth-child(2){
    display: inline-block;
    width:120px;
    height:50px;
    line-height:50px;
    text-align:center;
    border-radius: 7px;
    font-size: 18px;
    font-weight:500;
    background-color: #ffffff;
    border:1px solid #ff8d27;
    color:#ff8d27;
    cursor: pointer;
}
.table-box{
    padding: 0 30px;
    overflow-y: auto;
}
.table-box span{
    display: block;
    margin-bottom:15px; 
    font-size: 18px;
    color:#525252;
}
.hashTable{
    width:100%;
    border-collapse:collapse;
}
.hashTable thead{
    background-color: #efefef;
    height:35px;
}
.hashTable th,.hashTable td{
    padding:0 20px;
    height:45px;
    text-align: left;
    font-weight:400;
}
.hashTable tr{
    box-sizing: border-box;
    border:1px solid rgb(221, 221, 221);
    border-top:none;
}
.hashTable tr td:nth-child(1){
    color:#666666;
}
.hashTable tr td:nth-child(3){
    padding:0 10px;
    width:25%;
    color:#3079ff;
    cursor: pointer;
    font-size:14px;
}
.triangle{
    display: inline-block;
    border-left:13px solid #ff8d27;
    border-top:7px solid #ffffff;
    border-bottom:7px solid #ffffff;
    margin-right:10px;
}
.coin{
    font-size:20px;
    color:#666666;
    font-weight:400;
}
.account-details{
    display: block;
    float: right;
    color:#6c6c6c;
    font-size: 13px;
    height:30px;
    line-height:30px;
}
.account-data{
    clear: right;
    padding-left:10px;
}
.account-data li{
    display: inline-block;
    width:21%;
    box-sizing: border-box;
    padding:20px;
    padding-right:0;
}
.btn-box{
    display: inline-block;
    width:15%;
    box-sizing: border-box;
    padding:25px 0 0 15px;
    vertical-align: top;
}
.account-data li:last-child{
    border:none;
    vertical-align: top;
}
.account-data li p{
    font-size:14px;
    color:#666666;
    border-right:1px solid rgb(218, 218, 218);
    margin:0;
    padding: 5px 0;
}
.account-data li p:nth-child(1){
    padding-top:0;
}
.account-data li p:nth-child(2){
    font-size:14px;
    padding-bottom:0;
}
.account-data li p:nth-child(2) span{
    color:#ff8d27;
    font-size:18px;
    font-weight:bold;
}
.account-data li p:nth-child(2) font{
    color:#303137;
    font-size:18px;
    font-weight:bold;
}
.account-balance{
    padding: 0 0 35px;
}
.coin-balance{
    background-color: #f2f2f2;
    padding:20px 0;
}
.button{
    display: inline-block;
    width:117px;
    height:46px;
    line-height:46px;
    text-align: center;
    background-color:#303137;
    color:white;
    vertical-align: top;
    cursor: pointer;
}
</style>