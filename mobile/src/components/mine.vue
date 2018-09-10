<template>
    <div class="miner" :class="{'adjust1':this.$status == false}">
        <ul class="balance">
            <template v-if="this.$status">
                <li>
                    <span class="head"></span>
                    <strong>{{mineInfo.user_name}}</strong>
                </li>
            </template>
            <template v-else>
                <li  :class="{'adjust2':this.$status == false}">
                    <span class="logo" ></span>
                    <router-link to="/login" class="login_btn" tag="strong">请登录</router-link>
                </li>
            </template>
            <template v-if="this.$status">
                <li>
                    <span class="key">帐户余额</span>
                    <span class="val clearfix">{{mineFound.person_money.user_money}}<font>元</font></span>
                </li>
                <li v-cloak v-if="mineFound.found != 0" v-for="item in mineFound.found">
                    <span class="key">{{item.coin}}余额</span>
                    <span class="val clearfix">{{item.balance}}<font>{{item.coin}}</font></span>
                </li>
                <li v-cloak v-else v-for="item in mineFound.found">
                    <span class="key">{{item.coin}}余额</span>
                    <span class="val clearfix">--</span>
                </li>
            </template>
            
        </ul>
        <template v-if="this.$status">
            <ul class="normal">
                <router-link tag="li" to="/seldList" style="border-bottom:.01rem solid #f7f7f7;">
                    <span class="key">订单详情</span>
                    <span class="detail"><span></span></span>
                </router-link>
            </ul>
            <ul class="normal">
                <li @click="logout" style="text-align:center;color:#999999;font-size:.15rem;">退出登录</li>
            </ul>
            <p class="suggest">
                更多内容请用PC访问www.beehash.cn
            </p>
        </template>
    </div>
</template>

<script>
export default {
    data(){
        return{
            mineInfo:{
                user_name:'',
                user_photo:''
            },
            mineFound:{
                person_money:{
                    'user_money':'--'
                }
            }
        }
    },
    methods:{
        logout(){
            var that=this;
            $.ajax({
                type:'get',
                url:'/logout',
                success:(res)=>{
                    if(res.code == 0){
                        that.$router.push('/');
                    };
                }
            })
        },
        getFound(){
            $.ajax({
                type:'get',
                url:'/u/get_found',
                success:(e)=>{
                    this.mineFound = e.data;
                }
            });
        },
        getUser_info(){
            $.ajax({
                type:'get',
                url:'/u/get_user_info',
                success:(res)=>{
                    this.mineInfo.user_name = res.data.user_info[0].user_name
                    this.mineInfo.user_photo = res.data.user_info[0].user_photo
                }
            })
        }

    },
    mounted(){
        if(this.$status){
            this.getUser_info();
            this.getFound();
        }
    }

}
</script>

<style lang="less" scoped>
.miner{
    height:calc(100% - .45rem);
    min-height:7.1rem;
    background:#f1f1f1;
    overflow-y: auto;
    box-sizing: border-box;
}
.balance,.normal{
    background: #ffffff;
    margin-bottom:.1rem;
}
.balance li:first-child{
    height: 1.15rem;
    border-bottom:.01rem solid #f7f7f7;
    text-align: center;
    padding-top:.3rem;
}
.balance li:first-child .head{
    display: block;
    width:.5rem;
    height: .5rem;
    margin: 0 auto .1rem;
    border-radius: 50%;
    border: .03rem solid #e0e0e0;
    background: url('../assets/img/mine.png') center center/.45rem .45rem no-repeat;
}
.balance li:not(:first-child){
    height:.42rem;
    font-size: .14rem;
    line-height:.42rem;
    padding:0 .25rem;
    border-bottom:.01rem solid #f7f7f7;
}
.balance li:not(:first-child) .val{
    float: right;
}
.balance li:not(:first-child) .val font{
    display:inline-block;
    color:#ff8e27;
    font-size: .14rem;
    width:.5rem;
    text-align: center;
    margin-left:.03rem;
}
.normal li{
    height:.45rem;
    font-size: .14rem;
    line-height:.45rem;
    padding:0 .25rem;
}
.logo{
  display: block;
  margin: 0 auto .05rem;
  width:.4rem;
  height:.45rem;
  background:url('../assets/img/white.png') center center/.3rem .32rem no-repeat;

}
.login_btn{
    padding: .03rem .2rem;
    border:.01rem solid #ff8e28;
    color:#ff8e28;
    font-size:.15rem;
}
.detail{
    width:.25rem;
    height:.25rem;
    line-height:.25rem;
    float: right;
}
.detail span{
    display: inline-block;
    width:100%;
    height:100%;
    position: relative;
}
.detail span:after{
    content: '';
    display: block;
    width:.1rem;
    height:.1rem;
    position: absolute;
    border-top:.01rem solid rgb(129, 129, 129);
    border-right:.01rem solid rgb(129, 129, 129);
    transform:rotateZ(45deg);
    top:.2rem;
    left:.09rem;
}
.suggest{
    color:#929292;
    font-size: .12rem;
    text-align:center;
    margin-top:.21rem;
}
.adjust1{
    padding-top:55% !important;
    background: #ffffff !important;
    min-height: initial !important;
}
.adjust2{
    border: none !important ;
}
</style>