<template>
    <div>
        <div class="container">
            <div class="bread-budget" separator-class="el-icon-arrow-right">
                <router-link tag="span" class="bread-item" :to="{ path: '/' }">首页</router-link>
                <i class="el-icon-arrow-right" style="color:#bbbbbb;font-size:13px;line-height:60px;"></i>
                <router-link tag="span" class="bread-item" :to="{ path: '/hash/0' }">云算力</router-link>
                <i class="el-icon-arrow-right" style="color:#bbbbbb;font-size:13px;line-height:60px;"></i>
                <span class="bread-item-now" >{{proDetails.coin}}</span>
            </div>
            <div class="product-params">
                <div class="img-box">
                    <span class="tag">{{proDetails.coin}}</span>
                    <div class="product-wrap"><img :src="proDetails.goods_img" class="product" alt="product"></div>
                </div>
                <div class="params-box">
                    <ul>
                        <li><pre class="title">{{proDetails.goods_name}}</pre></li>
                        <li><pre class="desc">{{proDetails.goods_desc}}</pre></li>
                        <li><span>单价&nbsp：</span><span class="price">{{proDetails.shop_price | numTofixed}}<font>元/{{proDetails.unit}}</font></span></li>
                        <li class="gutter"><span class="property">交割日期&nbsp：</span><font>{{proDetails.delivery_date}}</font></li>
                        <li class="gutter"><span class="property">剩余算力&nbsp：</span><font>{{proDetails.goods_number}}{{proDetails.unit}}</font></li>
                        <li class="gutter">
                            <span class="property">购买算力&nbsp：</span> 
                            <div class="calc">
                                <span class="calculation" v-if="!(proDetails.min_unit > proDetails.goods_number)" @click="reduce"><i class="el-icon-minus"></i></span>
                                <span class="calculation" style="background-color:#eeeeee;" v-else><i class="el-icon-minus" style="color:#ffffff;"></i></span>
                                <input class="count" type="number" @keyup="keyup" @blur="blur" v-model="count">
                                <span class="calculation" v-if="!(proDetails.min_unit > proDetails.goods_number)" @click="plus"><i class="el-icon-plus"></i></span>
                                <span class="calculation" style="background-color:#eeeeee;" v-else><i class="el-icon-plus" style="color:#ffffff;"></i></span>
                            </div>
                            <span style="font-size:19px;vertical-align:middle;">{{proDetails.unit}} </span>
                            <span class="property" style="text-align:center;">{{proDetails.min_unit}}{{proDetails.unit}}起购</span> 
                        </li>
                        <li class="gutter">
                            <span class="property">应付&nbsp：</span>
                            <span class="calcPrice" v-if="!(proDetails.min_unit > proDetails.goods_number)">{{calcPrice}}元</span>
                            <span class="calcPrice" v-else>0元</span>
                            <!-- <span class="cheap">使用优惠券</span> -->
                        </li>
                        <li  class="pay-btn" v-if="!(proDetails.min_unit > proDetails.goods_number)"><div style="width:100%;height:100%;color:white;font-size:18px;" @click="confirmOrder">确认下单</div></li>
                        <li  class="sellOut" v-else><div style="width:100%;height:100%;color:white;font-size:18px;">已售完</div></li>
                    </ul>
                </div>
            </div>

            <div class="product-detail">
                <ul class="product-list">
                    <li class="tab-item" data-index = '1' @click="changIndex" :class="index==1?'checked':''">产品介绍</li>
                    <li class="tab-item" data-index = '2' @click="changIndex" :class="index==2?'checked':''">产品参数</li>
                    <!-- <li class="tab-item" data-index = '3' @click="changIndex" :class="index==3?'checked':''">补充说明</li> -->
                </ul>
                <div id="tab-container">
                    <div :class="index==1?'show':'hide'"><img :src="proDetails.original_img" alt="商品描述"></div>
                    <div :class="index==2?'show':'hide'">
                        <table class="paramsTable">
                            <tbody>
                                <tr v-for="item in proDetails.miner_param">
                                    <td>{{item.key}}</td>
                                    <td>{{item.value}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- <div :class="index==3?'show':'hide'">这里是补充说明</div> -->
                    <!-- <h1>{{$route.query.pid}}</h1>  -->
                </div>
            </div>

        </div>


        
    </div>
</template>
<script>
let timer = null
export default {
    data(){
        return{
            proDetails:{},
            count:1 ,
            index:1 
        }
    },
    filters:{
        numTofixed:(value)=>{
            if(value =='' || value == undefined || value == null){
                return 0
            }else{
                var val = Number(value)
                return val.toFixed(2)
            }
        }
    },
    computed:{
        calcPrice:function(){
            if(this.proDetails.shop_price =='' || this.proDetails.shop_price == undefined || this.proDetails.shop_price == null){
                return 0
            }else{
                return (this.count*this.proDetails.shop_price).toFixed(2)
            }
        }
    },
    methods:{
        blur(){
            var value = Number(this.count)
            this.count = value.toFixed(0)
            if(value == 0|| value == ''|| value == undefined){
                this.count = this.proDetails.min_unit
            }
            if(value > this.proDetails.goods_number){
                this.count = this.proDetails.goods_number
            }
            if( value < this.proDetails.min_unit){
                this.count = this.proDetails.min_unit
            }
        },
        keyup(){
            if(timer){
                window.clearTimeout(timer)
            }
            timer = window.setTimeout(
                ()=>{
                    var val = Number(this.count)
                    if( val > this.proDetails.goods_number){
                        this.count = this.proDetails.goods_number
                    }
                    if( val < this.proDetails.min_unit){
                        this.count = this.proDetails.min_unit
                    }
                },1000
            )
        },
        reduce(){
            this.count--
            if(this.count < this.proDetails.min_unit){
                this.count = this.proDetails.min_unit
                return
            }
        },
        plus(){
            this.count++
            if(this.count > this.proDetails.goods_number){
                this.count = this.proDetails.goods_number
                return
            }
        },
        changIndex(event){
            this.$data.index = event.target.getAttribute('data-index');
        },
        confirmOrder(){
            var count = this.count
            if(count < Number(this.proDetails.min_unit)){
                count = this.proDetails.min_unit
            }else if(count > Number(this.proDetails.goods_number)){
                count = this.proDetails.goods_number
            }
            if(this.proDetails.goods_id == '' || this.proDetails.goods_id == null || this.proDetails.goods_id == 'undefined'){
                this.$Message({message:'无此商品信息',type:'error',duration:1000 })
            }else{
                this.$router.push('/confirm?pid='+this.proDetails.goods_id+'&count='+count)
            }
        }
    },
    mounted(){
        this.$http.get('/shop/getInfo?goods_id='+this.$route.params.pid).then(
            (res)=>{
                this.proDetails = res.data.data
                this.count = this.proDetails.min_unit
            }
        )
        // if(this.proDetails.min_unit > proDetails.goods_number){
        //     this.$router.push('/hash/0')
        //     this.$Message.error('库存不足')
        // }
    }
}
</script>

<style scoped>
.container{
    width:100%;
    position: relative;
    background-color:#f7f7f7;
    padding: 0px 0 25px;
}
.container:after{
    content:'';
    display: block;
    clear:both;
}
.product-params{
    box-sizing: border-box;
    width:1200px;
    /* height:500px; */
    padding: 20px;
    background-color:rgb(255, 255, 255);
    margin:0 auto 25px;
    box-shadow: 0 0 2px 0 #d1d1d1;
}
.product-params .img-box{
    width:460px;
    height: 460px;
    background-color:rgb(233, 233, 233);
    position: relative;
    display: inline-block;
}
.img-box .tag{
    display: inline-block;
    width: 70px;
    height: 40px;
    line-height:40px;
    text-align:center;
    background-color:#fa4242;
    color: white;
    position: absolute;
    top: 0;
    left:0;
}
.img-box .product-wrap{
    width:100%;
    height:460px;
}
.img-box .product{
    width:100%;
    height:100%;
    vertical-align: middle;
}
.product-params  .params-box{
    display: inline-block;
    vertical-align: top;
    user-select: none;
}
.params-box .title{
    width:530px;
    font-size:24px;
    color: #333333;
    margin-bottom:20px;
}
.params-box .desc{
    width:530px;
    font-size:15px;
    color: #777676;
    margin-bottom:20px;
}
.params-box li:nth-child(3) span:nth-child(1){
    display: inline-block;
    margin-right:20px;
    color:rgb(44, 44, 44);
}
.params-box .price{
    display: inline-block;
    font-size:35px;
    color:#ff8e28;
    margin-bottom:20px;
}
.params-box .price font{
    font-size:20px;
}

.params-box .property{
    display: inline-block;
    width: 110px;
    color: #666666;
    vertical-align: middle;
}
.params-box .gutter{
    margin-bottom:22px;
}
.params-box .gutter font{
    display: inline-block;
    vertical-align: middle;
}
.calc{
    display: inline-block;
    font-size: 0;
    vertical-align: middle;
    margin-right:10px;
}
.pay-btn{
    width:350px;
    height:50px;
    line-height:50px;
    text-align:center;
    background-color:#ff8e28;
    cursor: pointer;
}
.pay-btn a{
    color: white;
    font-size: 20px;
}

.sellOut{
    width:350px;
    height:50px;
    line-height:50px;
    text-align:center;
    background-color:#5a5a5a;
    cursor:not-allowed;
}
.sellOut a{
    color: white;
    font-size: 20px;
}
.calcPrice{
    font-size: 19px;
}
.cheap{
    display: inline-block;
    padding: 5px 15px;
    background-color:#ff6666;
    color: white;
    border-radius: 5px;
    margin-left:50px;
}
.count{
    display: inline-block;
    box-sizing:border-box;
    width:60px;
    height:40px;
    line-height:40px;
    text-align:center;
    font-size: 15px;
    vertical-align: middle;
    outline: 0;
    border-style: none;
    border-top:1px solid #e4e4e4;
    border-bottom:1px solid #e4e4e4;
    -webkit-appearance:textfield;
    -moz-appearance:textfield;
    appearance:textfield;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button{
	-webkit-appearance: none !important;
	margin: 0;
}
.calculation{
    display: inline-block;
    width:40px;
    height:40px;
    line-height:40px;
    text-align:center;
    background-color: #dbdbdb;
    vertical-align: middle;
    font-size: 15px;
    cursor: pointer;
}
.product-detail{
    width:1200px;
    margin:0 auto;
    background-color: white;
    box-shadow: 0 0 2px 0 #d1d1d1;
}
.product-list{
    width:1100px;
    margin:0 auto;
    padding: 15px 0 0;
    border-bottom:1px solid #eeeeee;
    box-sizing: border-box;
}
#tab-container{
    width:1100px;
    margin:0 auto;
    padding: 15px 0;
}
#tab-container img{
    width:100%;
}
.product-detail .tab-item{
    display: inline-block;
    width:100px;
    margin: 0 25px 0 0;
    height: 50px;
    line-height:50px;
    font-size: 22px;
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    color:#575757;
    font-weight:400;
    transition: all 0.3s;
}
.product-detail .tab-item.checked{
    color:#ff8e28;
    border-bottom:3px solid #ff8e28;
}
.show{
    display: block;
}
.hide{
    display: none;
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
.paramsTable{
    border-collapse: collapse;
    width:100%;
}
.paramsTable tr td {
    border-right:1px solid #9e9e9e;
    border-bottom:1px solid #9e9e9e;
    padding-left:30px;
}
.paramsTable tr td:nth-child(1) {
    width:30%;
    height:40px;
    background-color: #d1d1d1;
}
.paramsTable tr {
    border-top:1px solid #9e9e9e;
    border-left:1px solid #9e9e9e;
}
</style>
