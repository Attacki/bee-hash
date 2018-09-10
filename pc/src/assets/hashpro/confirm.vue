<template>
    <div class="container" 
    v-loading="loading">
        <div class="bread-budget" separator-class="el-icon-arrow-right">
            <router-link tag="span" class="bread-item" :to="{ path: '/product/'+$route.query.pid }">返回</router-link>
            <i class="el-icon-arrow-right" style="color:#bbbbbb;font-size:13px;line-height:60px;"></i>
        </div>
        <el-row class="confirm-order">
            <el-col :span='24' class="title">
                确认订单
            </el-col>
            <el-col :span="24" class="desc">
                <el-row>
                    <el-col :span="15" style="border-right:1px solid #e1e1e1;" class="product-details">
                        <pre class="hashname">{{prosData.goods_name}}</pre>
                        <el-col class="center" :span="6">
                            <p v-cloak>{{prosData.price}}元</p>
                            <p>每{{prosData.computing_unit}}算力价格</p>
                        </el-col>
                        <el-col class="center" :span="6">
                            <p v-cloak>{{prosData.quantity}}{{prosData.computing_unit}}</p>
                            <p>购买数量</p>
                        </el-col>
                        <el-col class="center" :span="6">
                            <p v-cloak>{{prosData.total}}元</p>
                            <p>合计</p>
                        </el-col>
                        <el-col class="scale" :span="12">
                            <p><span class="point"></span>算力规模：{{prosData.goods_sum }}{{prosData.computing_unit}}</p>
                            <p><span class="point"></span>销售开始日期：{{prosData.sales_time}}</p>
                        </el-col>
                        <el-col class="scale" :span="12">
                            <p><span class="point"></span>剩余算力：{{prosData.goods_number}}{{prosData.computing_unit}}</p>
                            <p><span class="point"></span>租赁起算日：{{prosData.delivery_date}}</p>
                        </el-col>
                    </el-col>
                    <el-col style="position:relative;height:100px;" :span="9">
                        <img :src="prosData.goods_thumb" class="img" alt="">
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row class="order-detail">
            <el-col :span='24' class="title">
                订单介绍
            </el-col>
            <el-col :span="24" class="desc">
                <el-row>
                    <el-col :span="12" class="top left">
                        <div class="property">
                            <p>算力类型</p>
                            <p>管理费</p>
                            <p>电费</p>
                        </div><!--
                        --><div class="value">
                            <p>{{prosData.coin}}</p>
                            <p>{{prosData.manage_rate}}</p>
                            <p>{{prosData.electricity_bill}}</p>
                        </div>
                    </el-col>
                    <el-col :span="12" class="top">
                        <div class="property">
                            <p>收益结算</p>
                            <p>合约周期</p>
                            <p>功耗</p>
                        </div><!--
                        --><div class="value">
                            <p>次日打币至个人中心，{{prosData.coin}}结算</p>
                            <p>永久至无收益，或连续10天负收益，将结束合约</p>
                            <p>{{prosData.hash_power}}</p>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row class="order-pay">
            <el-col :span='24' class="title">
                支付订单信息
            </el-col>
            <el-col :span="24" class="desc">
                <div class="input-group" :class="paytype==1?'checked':''">
                    <input type="radio" id="pay1" name="payType" class="radio" checked="checked">
                    <label for="pay1" data-id='1' @click='changeCon' class="label">
                        <i data-id='1' class="icon"></i>
                        <span data-id='1' class="pay"></span>
                        <span data-id='1' style="font-size:18px;color:rgb(102,102,102);">支付宝支付</span>
                        <span data-id='1' style="float:right;" class="total">支付100元</span>
                    </label>
                </div>
                <div class="input-group" :class="paytype==2?'checked':''">
                    <input type="radio" id="pay2" name="payType" class="radio" >
                    <label for="pay2" data-id='2' @click='changeCon' class="label">
                        <i data-id='2' class="icon"></i>
                        <span data-id='2' class="wechat"></span>
                        <span data-id='2' style="font-size:18px;color:rgb(102,102,102);">微信支付</span>
                        <span data-id='2' style="float:right;" class="total">支付100元</span>
                    </label>
                </div>
                <div class="agree-group">
                    <div class="agree-check">
                        <input type="checkbox" id='agree' v-model="checked" style="display:none;" >
                        <label for="agree" style="width:initial !important; display:inline-block !important;" class="label">
                            <i class="icon" ></i>
                        </label>
                    </div><!--
                    --><div class="agreement">
                        <p>阅读并接受</p>
                        <router-link to="/doc/sell" target="_blank" style='color:rgb(29,153,240)'>《云算力销售协议》</router-link>
                    </div>
                    <div class="agree-btn" @click="pay">立即支付</div>
                    <ul class="tips">
                        <li>本商品售后服务政策如下，一旦购买，即视为对本政策的认同。</li>
                        <li class="tip">1、付款后均不能退款、退货；</li>
                        <li class="tip">2、由于市场波动，在您购买后，产品价格可能会随时调整，我们不承担事先通知、价格补偿的义务。</li>
                    </ul>
                </div>
            </el-col>
        </el-row>
        <div class="weixin" v-if="showCode">
            <div class="wraper">
                <span>微信支付</span>
                <i class="el-icon-close close" @click="close"></i>
                <div class="code_box">
                    <div v-html="code"></div>
                </div>
                <p>扫描二维码支付订单</p>
                <div class="btn" @click="hideCode">已完成支付</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            toggle:'none',
            prosData:{
                goods_name:'ETH',
                price:'65',
                computing_unit:'T',
                quantity:'100'
            },
            paytype:'1',
            checked:false,
            goback:'',
            login:'',
            code:'',
            loading:false,
            showCode:false
        }
    },
    methods:{
        changeCon(event){
            var target = event.target
            this.paytype = target.getAttribute('data-id')
        },
        pay(){
            var that = this
            if(this.checked){
                this.$http.post('/order/addOrder',{
                    'goods_id':this.prosData.goods_id,      //商品id
                    'goods_number':this.prosData.quantity,  //购买数量
                    'goods_amount':this.prosData.total, //订单金额
                    'pay_type':this.paytype //1:支付宝支付，2：微信支付
                }).then(
                    (res)=>{
                        if(res.data.code == 0){
                            this.loading = true
                            if(this.paytype == 1){
                                window.location.href= res.data.data.redirect+'/'+res.data.data.order_id;
                            }else if(this.paytype == 2){
                                this.$http.get(res.data.data.redirect,
                                {params:{
                                    order_id:res.data.data.order_id
                                }}).then(
                                    (res)=>{
                                        if(res.data.code == 0){
                                            that.code = res.data.data.Qr_code
                                            that.showCode = true
                                            this.loading = false
                                        }else{
                                            this.message(res.data.message,"error")
                                        }
                                    }
                                )
                            }
                        }else{
                            this.message(res.data.message,"error")
                        }
                    }
                )
            }else{
                this.message('请勾选算力销售协议',"error")
            }
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
        close(){
            this.$router.push('/system/power/'+this.prosData.coin)
        },
        hideCode(){
            this.$router.push('/system/power/'+this.prosData.coin)
        }
    },
    mounted(){
        var that = this
        this.$http.get('/order/confirmOrder',{
            params:{
                goods_id:this.$route.query.pid,
                goods_number:this.$route.query.count
            }
        }).then(
            (res)=>{
                if(res.data.code == 0 ){
                    that.$data.prosData = res.data.data
                }else{
                    that.$router.push('/hash/0')
                    this.message(res.message,"error")
                }
            }
        )
        this.goback = this.$router.path
        this.$http.get('/isCheck')
        .then((res)=>{
            if(res.data.code == 0){
                this.login = true
            }else if(res.data.code == 100){
                this.login = false
            }
        })
    }
}
</script>

<style scoped>
.container{
    width:100%;
    min-width:1200px;
    background-color:#f6f6f6;
    padding:10px 0 50px;
    position: relative;
}
.confirm-order,.order-detail,.order-pay{
    width:100%;
    max-width:1200px;
    margin:0 auto;
}
.title{
    color:#7f7f7f;
    border-left:2px solid #fe8d27;
    padding-left:15px;
    height:17px;
    line-height:17px;
    font-size: 20px;
    margin:15px 0;
}
.confirm-order .desc{
    background-color:white;
    padding:25px 0 25px 25px;
}
.product-details{
    padding: 0 20px;
}
.confirm-order .desc .hashname{
    font-weight:bold;
    color:#333333;
    margin: 0;
}
.center p{
    text-align: center;
}
.center p:nth-child(1){
    font-size: 26px;
    color:rgb(255,144,39);
}
.center p:nth-child(2){
    color:rgb(102,102,102);
}
.point{
    display: inline-block;
    width:9px;
    height:9px;
    border-radius: 50%;
    background:#c6c6c6;
    margin:0 18px;
}
.scale{
    color:rgb(153,153,153);
    padding-left:20px; 
}
.confirm-order .desc .img{
    position: absolute;
    top:10px;
    left:calc( 50% - 125px);
    width:250px;
}
.property{
    display:inline-block;
    width:100px;
    text-align:center;
    vertical-align: top;
}
.value{
    display:inline-block;
    width:calc( 100% - 100px);
}
.order-detail .desc{
    background-color:white;
    padding:25px 45px;
}
.top{
    border-top:1px solid #d3d3d3;
}
.left{
    border-left:1px solid #d3d3d3;
}
.order-detail .desc p{
    margin:0;
    border-right:1px solid #d3d3d3;
    border-bottom:1px solid #d3d3d3;
}
.property p{
    background-color: #f3f3f3;
    font-weight: bold;
    padding:10px;
    color:#333333;
}
.value p{
    height:42px;
    box-sizing: border-box;
    padding:10px 25px;
    color:#333333;
}
.order-pay .desc{
    background-color:white;
    padding:25px 45px;
}
.label{
    display: block;
    width:100%;
    height:100%;
    position: relative;
    padding: 0 40px 0 70px;
    box-sizing: border-box;
}
.radio{
    display: none;
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
.input-group{
    height:58px;
    line-height:58px;
    padding:3px;
}
.input-group.checked{
    border:3px solid #ffc593;
    padding:0;
}
.total{
    display: none;
}
.input-group.checked .total{
    display: inline-block;
}
input:checked+label:before{
    background-color:#ff8d26;
    border:none;
}
.input-group.checked .label i,.label i{
    position: absolute;
    top:0px;
    left:25px;
    cursor: pointer;
}
.input-group.checked .label i:before,.label i:before{
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
.input-group.checked .label i:after,.label i:after{
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
.pay{
    display: inline-block;
    width:24px;
    height:20px;
    background:url('../img/pay.png') center center/20px 20px no-repeat;
    vertical-align: middle;
    margin:-5px 20px 0 5px;
}
.wechat{
    display: inline-block;
    width:24px;
    height:20px;
    background:url('../img/wechat.png') center center/24px 20px no-repeat;
    vertical-align: middle;
    margin:-5px 20px 0 5px;
}
.agree-group{
    margin:20px auto;
    width:500px;
    text-align: center;
}
.agree-check{
    display: inline-block;
    margin:0;
    padding: 0;
    width:50px;
    line-height:58px;
}
.agree-check .label{
    top:-35px;
    left:-15px;
}
.agreement{
    display: inline-block;
}
.agreement p{
    display: inline-block;
}
.agree-btn{
    width:440px;
    color:white;
    border-radius:5px;
    background:#1d99f0;
    height:45px;
    line-height:45px;
    text-align: center;
    cursor: pointer;
    font-size: 20px;
    margin: 0 auto;
}
.disable{
    background:#919191 !important;
}
.bread-budget{
    margin: 0 auto;
    width:1200px;
    height:60px;
    line-height:60px;
}
.bread-item{
    color:#9e9e9e;
    cursor: pointer;
    font-size: 14px;
}
.bread-item:hover{
    color:#1b1b1b;
}
.bread-item-now{
    color:#3d3d4b;
    font-size: 14px;
}
.tips li:nth-child(1){
    font-size: 14px;
    color:#333333;
}
.tip{
    color:#999999;
    text-align: left;
    padding-left:15px;
    font-size: 14px;
    width:400px;
}
.weixin{
    background-color: rgba(0,0,0,0.6);
    padding:20px 15px;
    width:100%;
    height:100%;
    position: fixed;
    top:0;
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