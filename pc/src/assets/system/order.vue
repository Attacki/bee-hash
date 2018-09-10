<template>
    <div class="orderList">
        <p class="title">我的订单</p>
        <div style="min-height:550px">
            <div class="nav">
                <span class="block"></span>
                <span class="nav-name">算力明细</span>
            </div>
            <table class="hash-details" cellspacing="0" cellpadding="0">
                <thead>
                    <th>订单号</th>
                    <th>币种</th>
                    <th>算力数量</th>
                    <th>购买时间</th>
                    <th>收益开始时间</th>
                    <th>状态</th>
                    <th>操作</th>
                </thead>
                <tbody v-if="!(record_list.length == 0)">
                    <tr v-for="record in record_list">
                        <td>{{record.order_sn}}</td>
                        <td>{{record.cat_name}}</td>
                        <td>{{record.goods_number}}{{record.unit}}</td>
                        <td>{{record.add_time}}</td>
                        <td>{{record.delivery_date}}</td>
                        <td>{{record.order_status | judge}}</td>
                        <td v-if="!(record.order_status!=0)">
                            <!-- <span class="continue btn">支付</span> -->
                            <span class="cancel btn" :data-id="record.order_id" @click="cancel">取消</span>
                        </td>
                        <td v-if="(record.order_status!=0)">
                            暂无
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="7" style="text-align:center;">暂无记录</td>
                    </tr>
                </tbody>
            </table>
            <pager @onPageChange = "getUserOrder" :total="totalPages" v-if="flag"></pager>
        </div>
        <transition name="fade">
            <div class="mask" v-show='msgbox'>
                <div class="msg-box" >
                    <p class="msg-title">
                        <font>取消订单</font>
                        <i class="el-icon-close close" @click="closeMsg"></i>
                    </p>
                    <p style="color:#333333;font-size:15px;margin:20px;">
                        您确认要取消订单么？
                    </p>
                    <div>
                        <span class="confirm" @click="confirm">确定</span>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import pager from '../pager'
    export default{
        data(){
            return {
                record_list: [],
                msgbox:false,
                cancelId:"",
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
                    case 0 : return '未付款';
                    case 1 : return '已付款';
                    case 2 : return '已取消';
                    case 3 : return '无效';
                    case 4 : return '退货';
                    default : '未知状态'
                }
            }
        },
        methods:{
            cancel(event){
                this.msgbox = true
                this.cancelId = event.target.getAttribute('data-id')
            },
            closeMsg(){
                this.msgbox = false
            },
            confirm(){
                this.$http.post('/u/set_cancel_order',{
                    order_id:this.cancelId
                }).then(
                    (res)=>{
                        if(res.data.code == 0){
                            this.$Message({message:res.data.message,type:'success',duration:1000})
                            this.$http.get('/u/get_user_order').then(
                                (res)=>{ this.record_list = res.data.data.order_list; }
                            )
                        }else if(res.data.code == 100){
                            this.$Message({message:res.data.message,type:'error',duration:1000})
                        }else{
                            this.$Message({message:res.data.message,type:'error',duration:1000})
                        }
                    }
                )
                this.msgbox = false
            },
            getUserOrder(page){
                this.$http.get('/u/get_user_order',{params:{page:page}}).then(
                    (res)=>{
                        if(res.data.code == 0){
                            this.record_list = res.data.data.order_list;
                            this.totalPages = parseInt(res.data.data.count%10==0?res.data.data.count/10:res.data.data.count/10+1);
                            this.flag = true;
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
            }
        },
        mounted(){
            this.getUserOrder(1);
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
.orderList{
    padding:38px;
    position: relative;
}
.orderList .title{
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
    border-top:1px solid #d2d2d2;
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
.btn{
    display: inline-block;
    border:1px solid #e0e0e0;
    padding:1px 2px;
    border-radius: 3px;
    cursor: pointer;
}
.mask{
    width:100%;
    height:100%;
    background-color:rgba(68, 68, 68, 0.2);
    position: fixed;
    top:0;
    left:0;
}
.msg-box{
    width:250px;
    height:135px;
    background-color:#fcfcfc;
    border:1px solid #e9e9e9;
    border-radius:6px;
    position: fixed;
    top:calc(40% - 50px);
    left:calc(50% - 125px);
    z-index: 10000;
}
.msg-box .msg-title{
    font-size: 15px;
    margin:0;
    border-bottom:1px solid #fcca9f;
    padding:10px 20px;
    position: relative;
}
.msg-box .close{
    position: absolute;
    font-size:18px;
    cursor: pointer;
    right:15px;
}
.msg-box .confirm{
    display: inline-block;
    float: right;
    margin-right:15px;
    font-size: 14px;
    background-color:#ff8d26;
    color:white;
    padding:1px 5px;
    border-radius: 3px;
    cursor: pointer;
}
</style>
