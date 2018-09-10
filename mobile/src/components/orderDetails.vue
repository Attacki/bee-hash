<template>
  <div class="nav">
    <div class="top_bar">
      <div class="flex_item">
        <router-link tag='span' to="/seldList" class="detail"></router-link>
      </div>
      <div class="flex_item title">订单详情</div>
      <div class="flex_item">
      </div>
    </div>
    <ul class="o_detail">
        <li class="item"> 订单状态： {{orderInfo.order_status | judge}}</li>
        <li class="o_desc"> 
            订单编号： {{orderInfo.order_sn}}
            <p class="desc">下单时间：{{orderInfo.add_time}}</p>
            <p class="desc">付款时间：{{orderInfo.pay_time?orderInfo.pay_time:'- -'}}</p>
        </li>
        <li class="o_content">
            <p class="name">订单详情：</p>
            <div>
                <p class="o_name">{{orderInfo.goods_name}}</p>
                <span class="picture"><div> <img :src="orderInfo.goods_thumb" alt=""></div></span><!--
                --><span class="o_property">
                    <p>订单数量：{{orderInfo.goods_number}}</p>
                    <p>每{{orderInfo.unit}}算力价格：{{orderInfo.goods_price}}元</p>
                    <p>租赁起算日：{{orderInfo.delivery_date}}</p>
                </span>
            </div>
        </li>
        <li class="o_desc">
            <p class="name">订单介绍：</p>
            <div style="padding-bottom:.1rem;">
                <div class="flex">
                    <span> 收益结算 </span>
                    <span> 
                      算力收益通过PPS（Pay Per Share）模式结算，在收益结算时根据实时价格扣除电费，收取8%的管理费，每日结算昨天的收益，定时发放。
                   </span>
                </div>
                <div class="flex">
                    <span> 功耗 </span>
                    <span> {{orderInfo.power}}/h</span>
                </div>
                <div class="flex">
                    <span> 管理费 </span>
                    <span> {{orderInfo.manage_fee*100}}% </span>
                </div>
                <div class="flex">
                    <span> 电费 </span>
                    <span> {{orderInfo.electric_charge}}元/度 </span>
                </div>
                <p class="total">
                    <span class="key">合计：</span>
                    <span class="val clearfix">{{orderInfo.goods_amount}}元</span>
                </p>
            </div>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
    data(){
        return{
           orderInfo:{}
        }
    },
    filters:{
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
        getInfo(id){
            $.ajax({
                type:'get',
                url:'/u/get_user_order_info?order_id='+id,
                success:(res)=>{
                    this.orderInfo = res.data;
                }
            })
        }
    },
    mounted(){
        this.getInfo(this.$route.params.order);
    }
}
</script>

<style lang="less" scoped>
.nav{
  height:calc(100% - .45rem)
}
.top_bar {
  position: fixed;
  top:0;
  width:100%;
  display: flex;
  height:.45rem;
  line-height: .45rem;
  box-sizing: border-box;
  padding:0rem .15rem;
  background:#2e2e37;
  z-index:100;
}
.top_bar .flex_item{
  flex: 1;
}
.title{
  text-align: center;
  font-size: .15rem;
  color:#f1f1f1;
  font-weight: 350;
}
.detail{
    width:.25rem;
    height:100%;
    line-height:.25rem;
    float: left;
    background: url('../assets/img/pointer.png') center center/.1rem .16rem no-repeat;
}
.o_detail{
    position: fixed;
    top:.45rem;
    padding:.05rem .16rem;
    width: 100%;
    box-sizing: border-box;
    overflow-y: auto;
    height:calc(100% - .45rem);
}
.o_detail .item{
    height:.5rem;
    line-height:.5rem;
    border-bottom:.01rem solid #f1f1f1;
    color:#000000;
    font-size: .15rem;
}
.o_desc{
    color:#000000;
    font-size: .15rem;
    line-height:.4rem;
    padding-bottom: .15rem;
}
.o_desc .desc{
    color:#9c9c9c;
    font-size: .12rem;
    padding-left:.2rem;
    height:.2rem;
    line-height:.2rem;
}
.o_content{
    border-bottom:.01rem solid #f1f1f1;
    padding-bottom: .1rem;
}
.o_content .name{
    margin: 0;
    height:.5rem;
    line-height:.5rem;
    color:#000000;
    font-size: .15rem;
}
.o_content .o_name{
    color:#999999;
    font-size: .14rem;
    height:.35rem;
}
.o_content .picture{
    display: inline-block;
    width:45%;
    height:1.2rem;
    margin-bottom:.17rem;
}
.picture div{
    display: flex;
    align-items: center;
    width:1.2rem;
    height:100%;
    background: #e4e4e4;
    padding:.05rem;
    box-sizing: border-box;
}
.picture img{
    width:100%;
}
.o_content .o_property{
    display: inline-block;
    width:55%;
    vertical-align: bottom;
    margin-bottom:.17rem;
}
.o_property p{
    color:#999999;
    font-size: .13rem;
    height:.22rem;
}
.flex{
    display: flex;
}
.flex span{
    color:#9c9c9c;
    font-size: .12rem;
    padding: .05rem 0 .05rem .15rem;
    line-height:.15rem;
}
.flex span:nth-child(1){
    border-right:.01rem solid #e0e0e0;
    flex:1;
}
.flex span:nth-child(2){
    flex:2.5;
}
.total{
    border-top:.01rem solid #f1f1f1;
    border-bottom:.01rem solid #f1f1f1;
    box-sizing: border-box;
    margin-top: .2rem;
    padding:0 .15rem;
    height:.5rem;
    line-height:.5rem;
    .key{
        font-size: .15rem;
        color: #666666;
    }
    .val{
        float: right;
        font-weight: bold;
        color:#ff8e27;
        font-size: .16rem;
    }
}
</style>
