<template>
    <div  class="pro-item">
        <template v-for="item in proGroup">
            <div class="pro-item-title">
                <ul>
                    <li>{{item.goods_name}}</li>
                </ul>
                <pre class="describe">{{item.goods_desc}}</pre>
            </div>
            <router-link  v-if="item.min_number < item.number"  :to="'/product/'+item.goods_id" tag="div" class="pro-item-details">
                <div class="machine-img">
                    <img  :src="item.goods_thumb" class="image" alt="machine">
                </div>
                <div class="machine-details">
                    <ul class="item-type">
                        <li>{{item.goods_name}}</li>
                        <li>
                            <span class="icon" :class="item.coin"></span>
                        </li>
                        <li class="hot" v-if="item.is_hot===1">热销</li>
                    </ul>
                    <ul class="item-details">
                        <li class="property">
                            <span>￥{{item.price}}</span>
                            <span>每{{item.unit}}价格</span>
                        </li>
                        <li class="property">
                            <span>{{item.min_number}}<font>/{{item.unit}}</font></span>
                            <span>起购</span>
                        </li>
                        <li class="property">
                            <span>{{item.power}}<font>/台</font></span>
                            <span>功耗</span>
                        </li>
                        <li class="property">
                            <span>{{item.number}}<font>/{{item.unit}}</font></span>
                            <span>剩余算力</span>
                        </li>
                        <li>
                            <span class="btn" >立即购买</span>
                        </li>
                    </ul>
                </div>
            </router-link>
            <router-link tag="div"  v-else class="pro-item-details" :to="'/product/'+item.goods_id" >
                <div class="machine-img">
                    <img :src="item.goods_thumb" class="image" alt="machine">
                </div>
                <div class="machine-details">
                    <ul class="item-type">
                        <li>{{item.goods_name}}</li>
                        <li><span class="icon gray"  :class="item.coin"></span></li>
                        <li class="sellOut">售罄</li>
                    </ul>
                    <ul class="item-details runOut">
                        <li class="property">
                            <span>￥{{item.price}}</span>
                            <span>每{{item.unit}}价格</span>
                        </li>
                        <li class="property">
                            <span>{{item.min_number}}<font>/{{item.unit}}</font></span>
                            <span>起购</span>
                        </li>
                        <li class="property">
                            <span>{{item.power}}<font>/台</font></span>
                            <span>功耗</span>
                        </li>
                        <li class="property">
                            <span>{{item.number}}<font>/{{item.unit}}</font></span>
                            <span>剩余算力</span>
                        </li>
                        <li>
                            <span class="btn">查看详情</span>
                        </li>
                    </ul>
                </div>
            </router-link>
        </template>
    </div>
</template>

<script>
export default {
    props:{
        proGroup:{
            type:Array,
            default:[]
        }
    },
    mounted(){

    }
}
</script>

<style scoped>
.pro-item{
    width: 100%;
    padding:30px 0;
}
.pro-item-title{
    border-left:2px solid #fe8d27;
    margin-bottom:30px;
}
.pro-item-title ul{
    padding: 0 25px;
}
.pro-item-title ul li{
    display: inline-block;
    font-size:20px;
    font-weight:600;
    color: #4e4e4e;
}
.describe{
    margin: 0;
    font-size: 16px;
    color: #999999;
    text-align: left !important;
    padding: 0 25px;
}
.pro-item-details{
    background-color:white;
    padding: 10px;
    margin-bottom:60px;
    cursor: pointer;
}
.pro-item-details:hover{
    box-shadow: 0 0 15px 0 #999999;
}
.pro-item-details .machine-img{
    display: inline-block;
    vertical-align: middle;
    background-color:#e6e7e9;
    border:1px solid #f1f1f1;
}
.image{
    vertical-align: middle;
    width:250px;
    height:180px;
}
.pro-item-details .machine-details{
    display: inline-block;
    vertical-align: middle;
    height: 180px;
    padding-left:40px;
    width:calc(100% - 300px);
}
.pro-item-details ul{
    padding:0;
}
 .item-type li{
    display: inline-block;
}
 .item-type li:nth-child(1){
    font-weight:350;
    font-size:20px;
    color:#333333;
}
.item-type .icon{
    display: inline-block;
    vertical-align: top;
    margin: 0 15px;
    width:22px;
    height:22px;
}
.BTC{
    background:  url('../img/btc.png') center 0/22px 22px no-repeat;
}
.ETH{
    background:  url('../img/eth.png') center 0/22px 22px no-repeat;
}
.ETC{
    background:  url('../img/etc.png') center 0/22px 22px no-repeat;
}
.item-type .hot{
    border:1px solid #fe8d27;
    vertical-align: bottom;
    font-size:14px;
    color: #fe8d27;
    padding: 1px 12px;
    border-radius:5px;
}
.item-type .sellOut{
    border:1px solid #5a5a5a;
    vertical-align: bottom;
    font-size:14px;
    color: #616161;
    padding: 1px 12px;
    border-radius:5px;
}
.item-details{
    margin-top:45px;
}
.item-details li{
    display: inline-block;
    width:20%;
    vertical-align: bottom;
    text-align:center;
    border-right:1px solid rgb(209, 209, 209);
}
.item-details li:last-child{
    border-right:none;
    height:72px;
}
.item-details .btn{
    display: block;
    width:130px;
    height: 40px;
    color: white;
    background-color: #fe8d27;
    margin: 16px 45px;
    line-height:40px;
    border-radius: 4px;
}
.item-details li:nth-child(1){
    width:13%;
    text-align:left;
}
.item-details li:nth-child(1) span:nth-child(2){
    padding-left:20px;
}
.item-details .property span{
    display: block;
}
.item-details .property span:nth-child(1){
    font-size:24px;
    color: #fe8d27;
    padding-bottom:20px;
}
.item-details .property span:nth-child(1) font{
    font-size:18px;
    color: #fe8d27;
}
.item-details .property span:nth-child(2){
    font-size:14px;
    color: #999999;
}
.item-details.runOut .property span:nth-child(1){
    font-size:24px;
    color: #7b7b7b;
    padding-bottom:20px;
}
.item-details.runOut .property span:nth-child(1) font{
    font-size:18px;
    color: #999999;
}
.item-details.runOut .property span:nth-child(2){
    font-size:14px;
    color: #999999;
}
.item-details.runOut .btn{
    display: block;
    width:130px;
    height: 40px;
    color: white;
    background-color: #5a5a5a;
    margin: 16px 45px;
    line-height:40px;
    border-radius: 4px;
}
.gray { 
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    
    filter: grayscale(100%);
	
    filter: gray;
}
</style>
