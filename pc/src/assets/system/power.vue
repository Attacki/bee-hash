<template>
    <div class='hashpower-box'>
        <p class="title">我的云算力</p>
        <div class="tabs">
            <span v-for="item in coinList" :data-coin-type='item.cat_name' :class="checkedType==item.cat_name?'checked':''" @click="changeType($event)">{{item.cat_name}}</span>
        </div>
        <div>
            <div class="nav">
                <span class="block"></span>
                <span class="nav-name">算力详情</span>
                    <!-- <div class="changeCoin">
                        <div class="coin" @click="changeCoin">
                            {{coinSelected}}
                            <span class="triangle"></span>
                        </div>
                        <transition name="fade">
                            <ul v-show="state" class="coin-item">
                                <li data-id="ETH" @click="item">ETH</li>
                                <li data-id="BTC" @click="item">BTC</li>
                                <li data-id="ETC" @click="item">ETC</li>
                            </ul>
                        </transition>
                    </div> -->
            </div>
            <ul class="hashState">
                <li>
                    <p>{{hashDetails.valid_hash.sum_number}}{{hashDetails.valid_hash.unit}}</p>
                    <p>可用算力</p>
                </li><!--
                --><li>
                    <p>{{hashDetails.wait_delivery_hash.sum_number}}{{hashDetails.wait_delivery_hash.unit}}</p>
                    <p>待交割</p>
                </li>
            </ul>
        </div>
        <!-- <div style="padding-bottom:35px;">
            <div class="nav" style="margin-bottom:45px;">
                <span class="block"></span>
                <span class="nav-name">预计收益</span>
            </div>
            <ul class="produce">
                <li>
                    <span>耗电</span>
                    <span>0.00</span>
                </li>
                <li>
                    <span>产出(BTC)</span>
                    <span>0.00</span>
                </li>
                <li>
                    <span>管理(BTC)</span>
                    <span>0.00</span>
                </li>
                <li>
                    <span>实际(BTC)</span>
                    <span>0.00</span>
                </li>
            </ul>
            <span class="grayLine"></span>
            <ul class="pre-earnings">
                <li>收益估算：</li>
                <li>￥&nbsp0.00</li>
                <li>*收益计算参考当日8点火币网价格</li>
            </ul>
        </div> -->
        <div style="min-height:550px">
            <div class="nav">
                <span class="block"></span>
                <span class="nav-name">每日收益</span>
            </div>
            <table class="hash-details" cellspacing="0" cellpadding="0">
                <thead>
                    <th>日期</th>
                    <th>币种</th>
                    <th>持有算力</th>
                    <th>电费</th>
                    <th>币种管理费({{checkedType}})</th>
                    <th>出币收益({{checkedType}})</th>
                    <th>币种实际收益({{checkedType}})</th>
                </thead>
                <tbody v-if="!(profitList.length == 0)">
                    <tr v-for="record in profitList">
                        <td>{{record.add_time}}</td>
                        <td>{{record.coin}}</td>
                        <td>{{record.hashrate}}{{record.unit}}</td>
                        <td>
                            {{record.cny_real_electric_charge}}(元)<br>{{record.coin_electric_charge}}({{checkedType}})</td>
                        <td>{{record.coin_manage_fee}}</td>
                        <td>{{record.coin_income}}</td>
                        <td>{{record.coin_real_income}}</td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="8" style="text-align:center;">暂无记录</td>
                    </tr>
                </tbody>
            </table>
            <pager @onPageChange = "getHashList" :total="totalPages" v-if="flag"></pager>
        </div>
    </div>
</template>

<script>
import pager from '../pager'
    export default {
        data(){
            return {
                coinList:[],
                checkedType:'BTC',
                state:false,
                hashDetails:{
                    'valid_hash':{
                        'sum_number':0,
                        'unit':'M'
                    },
                    "wait_delivery_hash": {
                        "sum_number": "0",
                        "unit": "M"
                    },
                    "order_list": []
                },
                profitList:[],
                totalPages:'',
                flag:false
            }
        },
        components:{
            pager:pager
        },
        filters:{
            turnTime(value){
                if(value == '' || value == undefined || value == null){
                    return '刚刚'
                }else{
                    function turnTwo(val){ return val<10?'0' + val:val }
                    var time = new Date(value*1000)
                    return  time.getFullYear()+'-'+turnTwo(time.getMonth()+1)+'-'+turnTwo(time.getDate())+' '+turnTwo(time.getHours())+':'+turnTwo(time.getMinutes())+':'+turnTwo(time.getSeconds())
                }
            },
            judge(value){
                switch (value){
                    case 0 : return '未交割';
                    case 1 : return '运行中';
                    case 2 : return '合约到期';
                    case 3 : return '合约暂停';
                    default : '未知状态'
                }
            }
        },
        methods:{
            changeCoin(event){
                if(this.state){
                    this.state = false
                }else{
                    this.state = true
                }
                event.stopPropagation();
            },
            // item(event){
            //     var target = event.target
            //     this.coinSelected = target.getAttribute('data-id')
            //     this.$data.state = false
            //     this.$http.get('/u/get_hash',{
            //     params:{coin:this.coinSelected}
            //     }).then(
            //         (res)=>{
            //             this.hashDetails = res.data.data
            //         }
            //     )
            //     event.stopPropagation();
            // },
            changeType(event){
                var target = event.target;
                var type = target.getAttribute('data-coin-type');
                this.$router.push('/system/power/'+type);
                this.checkedType = type;
                this.getHashVal();
                this.flag = false;
                this.getHashList(1);
            },
            getHashVal(){
                this.$http.get('/u/get_hash',{
                    params:{coin:this.checkedType}
                }).then(
                    (res)=>{
                        if(res.data.code == 0){
                            this.hashDetails = res.data.data;
                            var valid = this.hashDetails.valid_hash.sum_number;
                            var delivery = this.hashDetails.wait_delivery_hash.sum_number;
                            if(valid == null || valid == '' || valid == undefined ){
                                this.hashDetails.valid_hash.sum_number = 0
                                this.hashDetails.valid_hash.unit = 'M'
                            };
                            if(delivery == null || delivery == '' || delivery == undefined ){
                                this.hashDetails.wait_delivery_hash.sum_number = 0
                                this.hashDetails.wait_delivery_hash.unit = 'M'
                            };
                        }else if(res.data.code == 601){
                                this.$router.push('/login');
                                this.$Message({
                                    message:res.data.message,
                                    type:'error',
                                    duration:1000
                                });
                        }else{
                            this.$Message({
                                message:res.data.message,
                                type:'error',
                                duration:1000
                            })
                        }
                    }
                )
            },
            getHashList(page){
                this.$http.get('/u/get_income_list',{
                    params:{coin:this.checkedType,page:page}
                }).then(
                    (res)=>{
                        if(res.data.code == 0){
                            this.profitList = res.data.data.income_list;
                            this.totalPages = parseInt(res.data.data.count%10==0?res.data.data.count/10:res.data.data.count/10+1);
                            this.flag = true;
                        }else if(res.data.code == 601){
                            this.$router.push('/login');
                            this.$Message({
                                message:res.data.message,
                                type:'error',
                                duration:1000
                            });
                        }else{
                            this.$Message({
                                message:res.data.message,
                                type:'error',
                                duration:1000
                            });
                        }
                    }
                )
            }
        },
        mounted(){
            this.checkedType = this.$router.currentRoute.params.coin
            var that = this
            document.body.onclick = function(){
                    that.$data.state = false
            }
            this.getHashVal()
            this.getHashList(1)
            this.$http.get('/shop/getType').then((res)=>{
                this.$data.coinList = res.data.data;
                this.$data.coinList.shift()
            });
        }
    }
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
.hashpower-box{
    padding:38px;
}
.hashpower-box .title{
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
    /* border-top:1px solid #d2d2d2; */
    background-color:#f6f6f6;
    height:50px;
    margin-bottom:31px;
    position: relative;
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
    color:#333333;
}
.hashState{
    background-color:#fff5ed;
    height:153px;
    margin:0;
    padding: 0;
    margin-bottom: 40px;
}
.hashState li{
    display: inline-block;
    width:50%;
    height:100%;
    padding: 25px 0;
    box-sizing: border-box;
}
.hashState li:nth-child(1) p{
    border-right:2px solid #e0e0e0;
}
.hashState li p:nth-child(1){
    font-size: 36px;
    text-align:center;
    color:#333333;
    margin:0;
    padding-bottom:25px;
}
.hashState li p:nth-child(2){
    font-size: 16px;
    text-align:center;
    color:#666666;
    margin: 0;
}
.produce{
    display: inline-block;
    width: calc(50% - 3px);
    box-sizing: border-box;
    margin-top:0;
}
.produce li span{
    display: inline-block;
    width:49%;
    padding: 0 5%;
    box-sizing:border-box;
    height:40px;
}
.produce li span:nth-child(1){
    text-align: right;
    color:#525252;
    font-size: 18px;
}
.produce li span:nth-child(2){
    color:#1d1d1d;
    font-weight:bold;
    font-size: 18px;
}
.grayLine{
    display: inline-block;
    height:115px;
    border-right:2px solid #e0e0e0;
    vertical-align: top;
    margin-top:10px;
}
.pre-earnings{
    display: inline-block;
    width:50%;
    box-sizing: border-box;
    vertical-align: top;
    margin-top:0;
}
.pre-earnings li{
    height:30px;
}
.pre-earnings li:nth-child(1){
    color:#525252;
}
.pre-earnings li:nth-child(2){
    height:50px;
    font-size:30px;
    color:#ff8d27;
    font-weight:400;
}
.pre-earnings li:nth-child(3){
    font-size:14px;
    color:#666666;
}
.hash-details{
    width:100%;
    border-collapse:collapse;
}
.hash-details thead{
    background-color:#eeeeee;
}
.hash-details th,.hash-details td{
    text-align:center;
    font-weight:initial;
    height: 60px;
    color:#333333;
    box-sizing: border-box;
    padding:10px;
}
.hash-details td{
    color:#676767;
    font-size: 14px;
}
.hash-details tbody tr{
    border-bottom:1px solid #dddddd;
}
.changeCoin{
    position: absolute;
    top:10px;
    left:170px;
}
.coin{
    background-color:#ffffff;
    width:90px;
    height:28px;
    line-height:28px;
    text-align: center;
    color:#333333;
    border:1px solid #d2d2d2;
    border-radius:4px;
    box-sizing: border-box;
    cursor: pointer;
}
.triangle{
    display: inline-block;
    border-left:6px solid #ffffff;
    border-top:9px solid #d4d4d4;
    border-right:6px solid #ffffff;
    margin-left: 10px;
    margin-right:-10px;
}
.coin-item{
    margin:0;
    padding:0;
    background:#ffffff;
    border-left:1px solid #d2d2d2;
    border-right:1px solid #d2d2d2;
    border-radius:4px;
    cursor: pointer;
}
.coin-item li{
    text-align: center;
    height:28px;
    line-height:28px;
    border-bottom:1px solid #d2d2d2;
}
.tabs{
    background-color: #f5f5f5;
    border-top:1px solid #d9d9d9;
    padding:10px 25px;
    margin-bottom:20px;
}
.tabs span{
    display: inline-block;
    width:90px;
    height:38px;
    line-height:38px;
    text-align: center;
    font-size: 20px;
    color: #333333;
    margin-right: 20px;
    cursor: pointer;
}
.tabs span.checked{
    color:white;
    background-color:#ff8e28;
}
</style>

