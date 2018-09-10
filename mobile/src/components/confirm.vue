<template>
  <div class="nav">
    <div class="top_bar">
      <div class="flex_item">
        <router-link tag='span' :to="'/proDetails/'+$route.query.goods_id" class="detail"></router-link>
      </div>
      <div class="flex_item title">确认订单</div>
      <div class="flex_item">
      </div>
    </div>
    <ul class="o_detail">
        <li class="o_content">
            <p class="c_item">
                <font>算力名称：</font><font>{{prosData.goods_name}}</font>
            </p>
            <p class="c_item">
                <font>算力单价：</font><font>{{prosData.price}}元 / {{prosData.computing_unit}}</font>
            </p>
            <p class="c_item" style="border-bottom:.01rem solid #f1f1f1; padding-bottom:.1rem;">
                <font>算力数量：</font><font>{{$route.query.count}}{{prosData.computing_unit}}</font>
            </p>
            <p class="c_item" style="margin-top:.1rem;">
                <font>收益结算：</font><font>算力收益通过PPS（Pay Per Share）模式结算，在收益结算时根据实时价格扣除电费，收取8%的管理费，每日结算昨天的收益，定时发放。</font>
            </p>
            <p class="c_item">
                <font>功耗：</font><font>{{prosData.hash_power}}</font>
            </p>
            <p class="c_item">
                <font>管理费：</font><font>{{prosData.manage_rate}}</font>
            </p>
            <p class="c_item">
                <font>电费：</font><font>{{prosData.electricity_bill}}</font>
            </p>
        </li>
        <li class="o_desc">
            <p class="calc_total">
                <span class="val clearfix">{{totalPrice}}元</span>
                <span class="key">合计：</span>
            </p>
        </li>
        <li style="margin-top:.15rem;">
            <div class="desc">
                <div class="input-group" :class="paytype==4?'checked':''">
                    <input type="radio" id="pay1" name="payType" class="radio" checked="checked">
                    <label for="pay1" data-id='4' @click='changeCon' class="label">
                        <i data-id='4' class="icon"></i>
                        <span data-id='4' class="pay check"></span>
                        <span data-id='4' style="float:right;" class="total">支付{{totalPrice}}元</span>
                    </label>
                </div>
                <!-- <div class="input-group" :class="paytype==2?'checked':''">
                    <input type="radio" id="pay2" name="payType" class="radio" >
                    <label for="pay2" data-id='2' @click='changeCon' class="label">
                        <i data-id='2' class="icon"></i>
                        <span data-id='2' class="wechat check"></span>
                        <span data-id='2' style="float:right;" class="total">支付{{totalPrice}}元</span>
                    </label>
                </div> -->
            </div>
        </li>
    </ul>
    <div class="agree-group">
        <div class="agreement">
            <input type="checkbox" id="agree" style="display:none" v-model="agree">
            <label  class="agree" for="agree"></label>
            <p>阅读并接受</p>
            <router-link to="/sellDoc" style='color:rgb(29,153,240)'>《云算力销售协议》</router-link>
        </div>
        <div class="agree-btn" :class="{'dis_btn':!agree}" @click=" agree && pay()">立即支付</div>
    </div>
    <transition name="fade" >
        <div class="box" v-show="setting.show">
            <span class="tip_content">{{setting.msg}}</span>
        </div>
    </transition>
  </div>
</template>

<script>
export default {
    data(){
        return{
           goodsInfo:{},
           count:'',
           paytype:4,
           checked:true,
           agree:false,
           prosData:{},
           totalPrice:'',
           setting:{
            show:false,
            timer:null,
            msg:''
           }
        }
    },
    methods:{
        changeCon(event){
            var target = event.target
            this.paytype = target.getAttribute('data-id')
        },
        pay(){
            var that = this;
            if(that.$status){
                if(this.agree){
                    $.ajax({
                        type:'post',
                        url:'/order/addOrder',
                        data:{
                            'goods_id':this.$route.query.goods_id,      //商品id
                            'goods_number':this.$route.query.count,  //购买数量
                            'goods_amount':this.prosData.price * this.$route.query.count, //订单金额
                            'pay_type':this.paytype
                        },
                        success:(res)=>{
                            if(res.code == 0){
                                if(this.paytype == 4){
                                    window.location.href= res.data.redirect+'/'+res.data.order_id;
                                }
                            }else{
                                this.setting.msg = '请在个人中心取消未支付订单';
                                this.showTips(()=>{this.$router.push('/seldList');})
                            }
                        }
                    })
                }
            }else{
                this.setting.msg = '请先登陆';
                this.showTips(()=>{this.$router.push('/login');});
            }
            
        },
        getProInfo(){
            $.ajax({
                type:'get',
                url:'/order/confirmOrder',
                data:{
                    goods_id:this.$route.query.goods_id,
                    goods_number:this.$route.query.count
                },
                success:(res)=>{
                    this.prosData = res.data;
                    this.totalPrice = this.prosData.price * this.$route.query.count
                }
            })
        },
        showTips(fun){
            this.setting.show = true;
            this.$nextTick(()=>{
                this.timer = setTimeout(()=>{
                    if(this.setting.show){
                        this.setting.show = false;
                        clearTimeout(this.setting.timer);
                        fun();
                        return
                    }
                    this.showTips();
                },2000)
            })
        }
    },
    mounted(){
        this.getProInfo();
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
    height:.45rem;
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
    height:calc(100% - 1.6rem);
    overflow-y: auto;
}
.o_content{
    padding: .12rem 0;
}
.o_content .c_item{
    margin: 0;
    color:#000000;
    font-size: .15rem;
    line-height:.2rem;
    padding:.05rem 0;
}
.c_item font{
    font-size: .14rem;
    vertical-align: top;
}
.c_item font:nth-child(1){
    display: inline-block;
    width:21%;
    color:#111111;
}
.c_item font:nth-child(2){
    display: inline-block;
    width:75%;
    color:#6b6b6b;
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
.calc_total{
    border-top:.01rem solid #f1f1f1;
    border-bottom:.01rem solid #f1f1f1;
    box-sizing: border-box;
    padding:0 .15rem;
    height:.5rem;
    line-height:.5rem;
    .key{
        float: right;
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
.order-pay .desc{
    background-color:white;
    padding:.25rem .45rem;
}
.label{
    display: block;
    width:100%;
    height:100%;
    position: relative;
    padding: 0 .1rem 0 .4rem;
    box-sizing: border-box;
}
.radio{
    display: none;
}
.label:before{
    content: '';
    display: block;
    position: absolute;
    width:.2rem;
    height:.2rem;
    top:.1rem;
    left:.1rem;
    border-radius:50%;
    border:.01rem solid #8f8f8f;
    box-sizing:border-box;
}
.input-group{
    height:.4rem;
    line-height:.4rem;
    padding:.02rem;
}
.input-group.checked{
    border:.02rem solid #fcd2ad;
    padding:0;
}
.total{
    font-size:.14rem;
    color:#292929;
    display: none;
}
.input-group.checked .total{
    display: inline-block;
}
input:checked+.label:before{
    background-color:#ff8d26;
    border:none;
}
.input-group.checked .label i{
    position: absolute;
    top:0.13rem;
    left:0.16rem;
    width:.055rem;
    height:.11rem;
    border-bottom:.02rem solid #ffffff;
    border-right:.02rem solid #ffffff;
    -moz-transform: rotateZ(45deg);
    -webkit-transform: rotateZ(45deg);
    transform: rotateZ(45deg);
    cursor: pointer;
}
.check{
    display: inline-block;
    width:.3rem;
    height:.25rem;
    vertical-align: middle;
    margin:.05rem;
}
.pay{
    background:url('../assets/img/pay.png') center center/.25rem .25rem no-repeat;
}
.wechat{
    background:url('../assets/img/wechat.png') center center/.42rem .25rem no-repeat;
}
.agree-group{
    position: fixed;
    bottom:.15rem;
    width:calc(100% - .3rem);
    text-align: center;
    margin-left:.15rem;
    font-size: .14rem
}
.agreement,.agreement p{
    display: inline-block;
    padding:.08rem 0;
}
.agreement .agree ,#agree{
    display: inline-block;
    position: relative;
    vertical-align: middle;
}
.agreement .agree{
    margin-top:-.02rem;
    width:.2rem;
    height:.2rem;
    border-radius: 50%;
    box-sizing: border-box;
    border:0.01rem solid #8f8f8f;
}
.agreement .agree:after{
    content: '';
    display: block;
    position: absolute;
    top:.03rem;
    left:.06rem;
    width:.055rem;
    height:.11rem;
    border-bottom:.02rem solid #ffffff;
    border-right:.02rem solid #ffffff;
    -moz-transform: rotateZ(45deg);
    -webkit-transform: rotateZ(45deg);
    transform: rotateZ(45deg);
}
.agreement #agree:checked+.agree{
    background:#ff8d26;
    border:none;
}
.agree-btn{
    color:rgb(247, 247, 247);
    border-radius:.03rem;
    background:#fa9645;
    height:.4rem;
    line-height:.4rem;
    text-align: center;
    cursor: pointer;
    font-size: .14rem;
    font-weight:400;
    margin: 0 auto;
}
.dis_btn{
    background:#999999 !important;
}
//弹出层 

.fade-enter-active ,.fade-enter-active .type_item{
    transition: all 1s;
}
.fade-leave-active ,.fade-leave-active .type_item{
    transition: all 1s;
}
.fade-enter, .fade-leave-to,.fade-enter .type_item,.fade-leave-to .type_item{
    -webkit-transform:scale(0.8);
    -moz-transform:scale(0.8);
    transform: scale(0.8) !important;
    opacity: 0;
}
.box{
    position: fixed;
    top:60%;
    width:66%;
    left:17%;
    line-height:.3rem;
    font-size: .14rem;
    text-align: center;
}
.tip_content{
    display: inline-block;
    background:#ffffff;
    box-shadow: 0 0 .05rem 0 #d8d8d8;
    color:#ff8e28;
    margin: 0 auto;
    padding: 0 .2rem;
}
</style>
