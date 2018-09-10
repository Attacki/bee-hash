<template>
    <div class="pro_detail">
        <section class="good_message">
            <div class="img-box">
                <router-link to="/" tag="span" class="back_btn"><span></span></router-link>
                <img :src="goodsInfo.goods_img" class="image" alt="">
            </div>
            <div class="good_price">
                <p>{{goodsInfo.goods_name}}</p>
                <p>{{goodsInfo.goods_desc}}</p>
                <p>
                    <span>单价：</span>
                    <strong>{{goodsInfo.shop_price}}<small>元/{{goodsInfo.unit}}</small></strong>
                </p>
            </div>
            <div class="good_property">
                <p>
                    <span>交割日期</span>
                    <span>{{goodsInfo.delivery_date}}</span>
                </p>
                <p>
                    <span>剩余</span>
                    <span>{{goodsInfo.goods_number}}{{goodsInfo.unit}}</span>
                </p>
                <p>
                    <span>最低起购</span>
                    <span>{{goodsInfo.min_unit}}{{goodsInfo.unit}}</span>
                </p>
                <div class="purchase">
                    <span>购买</span>
                    <div style="display:inline-block;float:right;">
                        <span class="calculation" @click="reduce"><svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"><defs></defs><path d="M863.74455 544.00086 163.424056 544.00086c-17.664722 0-32.00086-14.336138-32.00086-32.00086s14.336138-32.00086 32.00086-32.00086l700.320495 0c17.695686 0 31.99914 14.336138 31.99914 32.00086S881.440237 544.00086 863.74455 544.00086z"></path></svg></span><!--
                        --><input class="count" type="number" @blur="blur" v-model="count"><!--
                        --><span class="calculation" style="margin-right:10px;" @click="plus"><svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"><defs></defs><path d="M863.328262 481.340895l-317.344013 0.099772L545.984249 162.816826c0-17.664722-14.336138-32.00086-32.00086-32.00086s-31.99914 14.336138-31.99914 32.00086l0 318.400215-322.368714-0.17718c-0.032684 0-0.063647 0-0.096331 0-17.632039 0-31.935493 14.239806-32.00086 31.904529-0.096331 17.664722 14.208843 32.031824 31.871845 32.095471l322.59234 0.17718 0 319.167424c0 17.695686 14.336138 32.00086 31.99914 32.00086s32.00086-14.303454 32.00086-32.00086L545.982529 545.440667l317.087703-0.099772c0.063647 0 0.096331 0 0.127295 0 17.632039 0 31.935493-14.239806 32.00086-31.904529S880.960301 481.404542 863.328262 481.340895z"></path></svg></span>
                        <span style="float:right">{{goodsInfo.unit}}</span>
                    </div>
                </div>
                <p>
                    <span>应付</span>
                    <span>
                        <span class="calc_price">{{calcPrice}}</span>
                        <small>元</small>
                    </span>
                </p>
            </div>
            <div class="good_picture">
                <img :src="goodsInfo.original_img" alt="">
            </div>
        </section>
        <section class="good_calc">
            <span class="calc">
                <font>实付：</font>
                <strong>{{calcPrice}}元</strong>
            </span>
            <span @click="confirm" class="btn">
                <strong>立即购买</strong>
            </span>
        </section>
    </div>
</template>

<script>
export default {
    data(){
        return{
           goodsInfo:{},
           count:''
        }
    },
    computed:{
        calcPrice:function(){
            if(this.goodsInfo.shop_price =='' || this.goodsInfo.shop_price == undefined || this.goodsInfo.shop_price == null){
                return 0
            }else{
                return (this.count*this.goodsInfo.shop_price).toFixed(2)
            }
        }
    },
    methods:{
        getInfo(id){
            $.ajax({
                type:'get',
                url:'/shop/getInfo?goods_id='+id,
                success:(res)=>{
                    this.goodsInfo = res.data;
                    this.count = this.goodsInfo.min_unit;
                }
            })
        },
        blur(){
            var value = Number(this.count)
            this.count = value.toFixed(0)
            if(value == 0|| value == ''|| value == undefined){
                this.count = this.goodsInfo.min_unit
            }
            if(value > this.goodsInfo.goods_number){
                this.count = this.goodsInfo.goods_number
            }
            if( value < this.goodsInfo.min_unit){
                this.count = this.goodsInfo.min_unit
            }
        },
        reduce(){
            this.count--
            if(this.count < this.goodsInfo.min_unit){
                this.count = this.goodsInfo.min_unit
                return
            }
        },
        plus(){
            this.count++
            if(this.count > this.goodsInfo.goods_number){
                this.count = this.goodsInfo.goods_number
                return
            }
        },
        confirm(){
            var count = this.count
            if(count < Number(this.goodsInfo.min_unit)){
                count = this.goodsInfo.min_unit
            }else if(count > Number(this.goodsInfo.goods_number)){
                count = this.goodsInfo.goods_number
            }
            if(this.goodsInfo.goods_id == '' || this.goodsInfo.goods_id == null || this.goodsInfo.goods_id == 'undefined'){
                this.$Message({message:'无此商品信息',type:'error',duration:1000 })
            }else{
                this.$router.push('/confirm?goods_id='+this.goodsInfo.goods_id+'&count='+count)
            }
        }
    },
    mounted(){
        this.getInfo(this.$route.params.goods);
        (function findDimensions(){
            var winHeight = 0;
            if (window.innerHeight)
            winHeight = window.innerHeight;
            else if ((document.body) && (document.body.clientHeight))
            winHeight = document.body.clientHeight;
            if (document.documentElement  && document.documentElement.clientHeight)
            {
            winHeight = document.documentElement.clientHeight;
            }
            document.body.style.height = winHeight +'px';
            document.getElementsByClassName('pro_detail')[0].style.height = winHeight +'px';
        }())
    }
}
</script>

<style lang="less" scoped>
.pro_detail{
    font-size: .15rem;
}
.good_message{
    height:calc(100% - .5rem);
    background: #ededed;
    overflow-x: hidden;
    overflow-y: auto;
}
.img-box{
    height: 2.5rem;
    overflow: hidden;
    text-align: center;
    background:#ededed;
    position: relative;
}
.img-box .image{
    height:100%;
}
.back_btn{
    display:inline-block;
    width:.25rem;
    height:.25rem;
    line-height:.25rem;
    border-radius:50%;
    position: absolute;
    top:.12rem;
    left:.14rem;
}
.back_btn span{
    display: inline-block;
    width:100%;
    height:100%;
    position: relative;
}
.back_btn span:after{
    content: '';
    display: block;
    width:.1rem;
    height:.1rem;
    position: absolute;
    border-left:.02rem solid rgb(68, 68, 68);
    border-bottom:.02rem solid rgb(68, 68, 68);
    transform:rotateZ(45deg);
    top:.08rem;
    // left:.09rem;
    margin-left:.15rem;
}
.good_price,.good_property{
    padding: .15rem;
    background:white;
    margin-bottom:.05rem;
}
.good_price p{
    margin-bottom:.08rem;
    text-align: left;
    font-size:.14rem;
    &:nth-child(2){
        font-size:.12rem;
        color:#999999;
    }
    &:nth-child(3){
        margin:.15rem 0 0;
        strong{
            font-size: .2rem;
            color:#ff8e28;
        }
    }
}
.good_property {
    padding: 0 .15rem .05rem;
    p{
        height:.5rem;
        line-height:.5rem;
        border-bottom:.01rem solid #f5f5f5;
        font-size: .14rem;
        color:#999999;
        span:nth-child(2){
            color:#333333;
            float: right;
        }
    }
}
.purchase{
    height:.5rem;
    line-height:.5rem;
    font-size:.14rem;
    color:#999999;
    display:block;
    border-bottom:.01rem solid #f5f5f5;
}
.count{
    display: inline-block;
    box-sizing:border-box;
    width:.42rem;
    height:.32rem;
    line-height:.40rem;
    text-align:center;
    font-size: .15rem;
    vertical-align: middle;
    outline: 0;
    background: #ededed;
    border-style: none;
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
    width:.32rem;
    height:.32rem;
    line-height:.40rem;
    text-align:center;
    background-color: #ededed;
    vertical-align: middle;
    font-size: .13rem;
    cursor: pointer;
}
.calc_price{
    font-size: .2rem;
    color:#ff8e28;
}
.good_picture img{
    width:100%;
}
.good_calc{
    position: relative;
    height:.5rem;
    box-shadow: 0 0 .02rem 0 #999999;
    display: flex;
    align-items: stretch;
}
.good_calc .calc ,.good_calc .btn{
    display: flex;
    align-items: center;
}
.good_calc .calc{
    flex: 5.5;
    padding: 0 .15rem;
    font-size: .13rem;
    font{
        padding-top:.03rem;
    }
    strong{
        font-size: .18rem;
        color:#ff8e28;
    }
}
.good_calc .btn{
    flex: 4.5;
    background:#ff8e28;
    strong{
        width:100%;
        text-align:center;
        color:white;
    }
}
</style>
