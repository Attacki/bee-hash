<template>
  <div class="nav">
    <div class="top_bar">
      <div class="flex_item">
        <span class="logo"></span>
      </div>
      <div class="flex_item title">蜜蜂算力</div>
      <div class="flex_item">
      </div>
    </div>
    <sel :action="getProduct"></sel>
    <ul v-if="proList.length !== 0" class="hash_list" >
      <load v-show="show"></load>
      <template v-for="item in proList">
        <router-link tag="li" :to="'/proDetails/'+item.goods_id" class="hash_item">
          <div class="img_box">
            <img :src="item.goods_thumb" class="goods_img">
          </div>
          <div class="text">
            <li class="hash_name">{{item.goods_name}}</li>
            <div style="width:calc(100% - .42rem);">
              <ul class="desc">
                <li class="rest">剩余算力 <font>{{item.number}}{{item.unit}}</font></li>
                <li class="min">{{item.min_number}}{{item.unit}}起购</li>
                <div class="price">
                  {{item.price | Int}}<font>{{item.price | Floor}}元</font>
                  <span>/{{item.unit}}</span>
                  
                  <span class="button">立即购买</span>
                </div>
              </ul>
            </div>
          </div>
        </router-link>
      </template>
    </ul>
    <ul v-else class="hash_list" >
      <li style="text-align:center;font-size:.13rem">
        该种算力正在筹备中...
        <h1 style="font-size:.19rem">敬请期待</h1>
      </li>
    </ul>
  </div>
</template>

<script>
import load from '../tool/loading'
import sel from '../tool/select'
export default {
  data () {
    return {
      show: false,
      proList:[{}]
    }
  },
  filters:{
    Int(val){return Math.floor(val)},
    Floor(val){return (val-Math.floor(val)).toFixed(2).slice(1)}
  },
  components:{
    load:load,
    sel:sel
  },
  methods:{
    animation(){
      if(this.proList.length != $('.hash_item').length){
        return
      }
      $('.hash_item').each(function(i){
        $(this).css({'display':'flex'})
        window.clearTimeout(timer)
        var timer=null;
        timer = window.setTimeout(()=>{
          $(this).addClass('fadeIn')
        },80*i)
      })
    },
    getProduct(id){
      $('.hash_item').css('display','none')
      this.show = true;
      $.ajax({
        type:'get',
        url:'/shop/getList',
        data:{goods_type:id},
        success:(res)=>{
          this.show = false;
          this.proList = res.data;
          setTimeout(()=>{this.animation()},200);
        }
      })
    }
  },
  mounted(){
    this.getProduct(0);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  border-bottom:.01rem solid #d6d6d6;
  background:#2e2e38;
  z-index:100;
}
.top_bar .flex_item{
  flex: 1;
}
.logo{
  display: inline-block;
  vertical-align: top;
  width:.4rem;
  height:.45rem;
  background:url('../assets/img/dark.png') center center/.3rem .32rem no-repeat;
}
.title{
  text-align: center;
  font-size: .18rem;
  color:#f5f5f5;
  font-weight: bold;
}
.hash_list{
  position: fixed;
  top:.45rem;
  overflow-y: auto;
  width:100%;
  box-sizing: border-box;
  padding:.12rem;
  background: #f1f1f1;
  height:calc(100% - .9rem);
  z-index:1;
}
.hash_item{
  background: #ffffff;
  position: relative;
  display: flex;
  padding:.07rem;
  box-sizing: border-box;
  margin-bottom:.1rem;
  opacity: 0;
}
.img_box{
  display: flex;
  flex:1;
  background: #d6d6d6;
  padding:.04rem;
}
.goods_img{
  display: inline-block;
  width:1.25rem;
  height:0.9rem;
  margin: 0 auto;
  align-self:center;
}
.text{
  box-sizing: border-box;
  flex:2;
  padding:0 0 0 .15rem;
}
.hash_name{
  font-size:.14rem;
  font-weight: 450;
  color:#4b4b4b;
  text-align: left;
  word-wrap: break-word;
  word-break: break-all;
}
.desc li{
  font-size:.12rem;
  margin: .04rem 0;
}
.price{
  margin-top:.08rem;
  font-size:.15rem;
  color:#ff8e28;
  line-height:.3rem;
  overflow: hidden;
  font{
    font-size:.12rem;
  }
  span{
    font-size:.12rem;
    color:#3b3b3b;
  }
  .button{
    position: absolute;
    right:0;
    bottom:.03rem;
    display: inline-block;
    box-sizing: border-box;
    padding:0.02rem .05rem;
    line-height:.22rem;
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
}
.desc .rest{
  color:#999999;
  font{
    color:#3b3b3b;
  }
}
.desc .min{
  color:#999999;
}
.fadeIn{
  -webkit-animation: fadeIn .5s linear;
  animation: fadeIn .5s linear;
  opacity: 1;
}
@-webkit-keyframes fadeIn{
    from{
      left:-1rem;
      opacity: 0;
    }
    to{
      left:0;
      opacity: 1;
    }
}
@keyframes fadeIn {
    from{
      left:-1rem;
      opacity: 0;
    }
    to{
      left:0;
      opacity: 1;
    }
}

</style>
