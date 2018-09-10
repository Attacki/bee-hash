<template>
  <div class="nav">
    <div class="top_bar">
      <div class="flex_item">
        <router-link tag='span' to="/mine" class="detail"></router-link>
      </div>
      <div class="flex_item title">订单列表</div>
      <div class="flex_item">
      </div>
    </div>
    <ul v-if="orderList.length !== 0" class="hash_list" >
      <load v-show="show"></load>
      <template v-for="item in orderList">
        <li class="hash_item">
          <div class="img_box">
            <img :src="item.goods_thumb" class="goods_img">
          </div>
          <div class="text">
            <p class="hash_name">{{item.goods_name}}</p>
            <div>
              <ul class="desc">
                <p >订单状态： <font>{{item.order_status | judge}}</font></p>
                <p >订单数量： {{item.goods_number}}{{item.unit}}</p>
                <p >下单时间： {{item.add_time}}</p>
                <p >订单价格： {{item.goods_amount}}元</p>
                <div class="price">
                  <span v-if="!(item.order_status!=0)" @click="cancel(item.order_id)" class="button clearfix">取消订单</span>
                  <router-link tag="span" :to="'/orderDetails/'+item.order_id" v-else class="button clearfix">查看详情</router-link>
                </div>
              </ul>
            </div>
          </div>
        </li>
      </template>
    </ul>
    <ul v-else class="hash_list" >
      <li style="text-align:center;font-size:.13rem">
        暂无订单
      </li>
    </ul>
  </div>
</template>

<script>
import load from '../tool/loading'
export default {
  data () {
    return {
      show: false,
      orderList:[{}]
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
  components:{
    load:load
  },
  methods:{
    getOrders(){
      $('.hash_item').css('display','none')
      this.show = true;
      $.ajax({
        type:'get',
        url:'/u/get_user_order',
        success:(res)=>{
          this.show = false;
          this.orderList = res.data.order_list;
          $('.hash_item').css('display','flex');
        }
      })
    },
    cancel(id){
      $.ajax({
        type:'post',
        url:'/u/set_cancel_order',
        data:{
          order_id:id
        },
        success:(res)=>{
          this.getOrders();
        }
      })
    }
  },
  mounted(){
    this.getOrders();
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
.hash_list{
  position: fixed;
  top:.45rem;
  overflow-y: auto;
  width:100%;
  box-sizing: border-box;
  padding:.12rem;
  background: #f1f1f1;
  height:calc(100% - .45rem);
  z-index:1;
}
.hash_item{
  background: #ffffff;
  position: relative;
  display: flex;
  // height: 1.4rem;
  padding:.07rem;
  box-sizing: border-box;
  margin-bottom:.1rem;
}
.img_box{
  display: flex;
  flex:1;
  background: #d6d6d6;
  padding:.15rem .04rem;
}
.goods_img{
  display: inline-block;
  width:1.25rem;
  height:0.9rem;
  margin: 0 auto;
  align-self:center;
}
.text{
  flex:2;
  padding:0 0 0 .15rem;
}
.hash_name{
  font-size:.14rem;
  font-weight: bold;
  color:#525252;
  text-align: left;
  margin-bottom:.08rem;
}
.desc p{
  font-size:.12rem;
  margin: .02rem 0;
  color:#999999;
  &:nth-child(1){
    color:#ff8e2c;
  }
}
.price{
  height:.24rem;
}
.price .button{
  position: absolute;
  right:0;
  bottom:.03rem;
  padding:0 .05rem;
  height:.22rem;
  min-height: 18px;
  line-height:.24rem;
  font-size: .12rem;
  font-weight: 400;
  border-radius: .03rem;
  color:white;
  background: #ff8e2c;
  text-align: center;
  margin-top:-0.06rem;
  -webkit-transform: scale(0.80); /* Safari 和 Chrome */
  -moz-transform: scale(0.80);        /* Firefox */
  transform: scale(0.80);
}
.button:after{
  content: '';
  display: block;
  clear: right;
}
.detail{
    width:.25rem;
    height:.45rem;
    line-height:.25rem;
    float: left;
    background: url('../assets/img/pointer.png') center center/.1rem .16rem no-repeat;
}
</style>
