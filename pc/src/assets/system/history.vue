<template>
    <div class="history">
        <p class="title">提币记录</p>
        <div class="tabs">
            <span v-for="item in coinList" :data-coin-type='item.cat_name' :class="checkedType==item.cat_name?'checked':''" @click="changeType($event)">{{item.cat_name}}</span>
        </div>
        <!-- <div>
            <div class="nav">
                <span class="block"></span>
                <span class="nav-name">收益记录</span>
            </div>
            <table class="earnings-record" cellspacing="0" cellpadding="0">
                <thead>
                    <th>收益
                        <span style="position:relative;">
                            <span class="help">?</span>
                            <span class="help-content">收益=产出收益-扣除收益</span>
                        </span>
                    </th>
                    <th>产出收益</th>
                    <th>
                        扣除收益
                        <span style="position:relative;">
                            <span class="help">?</span>
                            <span class="help-content">扣除收益为管理费(8%)+机器当天产生的电费</span>
                        </span>
                    </th>
                    <th>收益时间</th>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="4" style="text-align:center;">暂无记录</td>
                    </tr>
                </tbody>
            </table>
        </div> -->
        <div>
            <div class="nav">
                <span class="block"></span>
                <span class="nav-name">提币记录</span>
            </div>
            <table class="earnings-record" cellspacing="0" cellpadding="0">
                <thead>
                    <th>提币数量</th>
                    <th>钱包地址</th>
                    <th>币种</th>
                    <th>状态</th>
                    <th style="width:200px;!important">提币时间</th>
                    <th style="width:200px;!important">到账时间</th>
                </thead>
                <tbody v-if="!(coinRecord.length == 0)">
                    <tr v-for="record in coinRecord">
                        <td>{{record.amount}}{{record.coin}}</td>
                        <td>{{record.wallet | slice}}</td>
                        <td>{{record.coin}}</td>
                        <td>{{record.status | trunState}}</td>
                        <td>{{record.add_time | turnTime}}</td>
                        <td>{{record.remit_time | turnTime}}</td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="6" style="text-align:center;">{{recordState}}</td>
                    </tr>
                </tbody>
            </table>
            <pager @onPageChange = "getWithdraw" :total="totalPages" v-if="flag"></pager>
        </div>
        <!-- <div>
            <div class="nav">
                <span class="block"></span>
                <span class="nav-name">购买记录</span>
            </div>
            <table class="earnings-record" cellspacing="0" cellpadding="0">
                <thead>
                    <th>购买数量</th>
                    <th>购买金额</th>
                    <th>状态</th>
                    <th>购买时间</th>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="4" style="text-align:center;">暂无记录</td>
                    </tr>
                </tbody>
            </table>
        </div> -->
    </div>
</template>

<script>
import pager from '../pager'
    export default{
        data(){
            return {
                coinList:[],
                checkedType:'',
                coinRecord:[],
                recordState:'读取中...',
                totalPages:'',
                flag:false
            }
        },
        components:{
            pager:pager
        },
        filters:{
            slice(val){
                var before = val.slice(0,8),after = val.slice(val.length-8)
                return before + '....' + after
            },
            turnTime(val){
                if(val == null){
                    return 
                }
                var time = new Date(val*1000)
                var remit = time.getFullYear() + '-' + turnTwo(time.getMonth()+1) + '-' + turnTwo(time.getDate()) + ' ' + turnTwo(time.getHours()) + ':' + turnTwo(time.getMinutes()) + ':' + turnTwo(time.getSeconds())
                function turnTwo(num){
                    if( num < 10 ){ return  '0' + num }
                    return num
                }
                return remit
            },
            trunState(status){
                switch(status){
                    case 0: return '审核中' ;break
                    case 1: return '审核通过' ;break
                    case 2: return '审核未通过' ;break
                    case 3: return '已汇出' ;break
                }
            },
        },
        methods:{
            changeType(event){
                var target = event.target
                var type = target.getAttribute('data-coin-type')
                this.$router.push('/system/history?coin='+type)
                this.checkedType = type
                this.recordState = '读取中...';
                this.flag = false;
                this.getWithdraw()
            },
            getWithdraw(page){
                this.$http.get('/u/get_withdraw',{
                    params:{
                    coin:this.checkedType,
                    page:page
                    }
                }).then(
                    (res)=>{
                        if(res.data.code == 0){
                            this.coinRecord = res.data.data.withdraw_list
                            this.totalPages = parseInt(res.data.data.count%10==0?res.data.data.count/10:res.data.data.count/10+1);
                            this.flag = true;
                            if(this.coinRecord.length == 0){
                                this.recordState = '暂无记录'
                            }
                        }else if(res.data.code == 601){
                            this.$router.push('/login');
                            this.$Message({ message:res.data.message,type:'error',duration:1000 })
                        }
                })
            }
        },
        mounted(){
            this.checkedType = this.$router.currentRoute.query.coin
            this.getWithdraw(1)
            this.$http.get('/shop/getType').then((res)=>{
                this.$data.coinList = res.data.data;
                this.$data.coinList.shift()
            });
        }
    }

</script>

<style scoped>
.history{
    padding:38px;
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
    padding: 0 20px 20px;
    box-sizing: border-box;
    margin-top:20px;
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
}
.earnings-record{
    width:100%;
    border-collapse:collapse;
}
.earnings-record thead{
    border-top:1px solid #dddddd;
    background-color:#f4f4f4;
}
.earnings-record th,.earnings-record td{
    text-align:left;
    font-weight:initial;
    font-size: 18px;
    height: 60px;
    color:#323232;
    box-sizing: border-box;
    padding:20px;
    text-align: center;
}
.earnings-record th:nth-child(1),.earnings-record td:nth-child(1){
    text-align: left;
    /* padding-left:50px; */
}
.earnings-record td{
    color:#676767;
    font-size: 14px;
}
.earnings-record tbody tr{
    border-bottom:1px solid #dddddd;
}
.help{
    display: inline-block;
    width:16px;
    height:16px;
    line-height: 16px;
    text-align:center;
    border:1px solid #ff8d2a;
    color:#ff8d2a;
    border-radius:50%;
    margin-left:5px;
    cursor: pointer;
}
.help-content{
    display: none;
    position: absolute;
    top:25px;
    left:40px;
    width:130px;
    height:45px;
    background-color:white;
    color:#ff8d2a;
    padding:4px;
    box-sizing: border-box;
    box-shadow: 0 0 15px 0 #c2c2c2;
    font-size:12px;word-break: break-all
}
.help:hover+.help-content{
    display: inline-block;
}
.tabs{
    width:100%;
    background-color: #f5f5f5;
    border-top:1px solid #d9d9d9;
    padding:10px 25px;
    box-sizing:border-box;
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
