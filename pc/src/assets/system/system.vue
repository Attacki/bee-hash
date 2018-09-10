<template>
    <div class="container" v-loading ="loading">
        <el-row class="content">
            <el-col class="tab-list">
                <div class="myInfo">
                    <div class="head">
                        <img src="../img/mine.png" alt="headPortrait">
                    </div>
                    <div class="welcome">
                        <p>{{user_name}}</p>
                        <p>欢迎您！</p>
                    </div>
                </div>
                <ul class="tabs">
                    <router-link to="/system/mine" tag="li" :class="{'checked':active=='mine'}">个人中心</router-link>
                    <router-link to="/system/order" tag="li" :class="{'checked':active=='order'}">我的订单</router-link>
                    <router-link to="/system/power/BTC" tag="li" :class="{'checked':active=='power'}">我的算力</router-link>
                    <router-link to="/system/history?coin=BTC" tag="li" :class="{'checked':active=='history'}">提币记录</router-link>
                    <router-link to="/system/set" tag="li" :class="{'checked':active=='set'}">个人设置</router-link>
                </ul>
                <ul class="public">
                    <li><img src="../img/code.png" alt=""></li>
                    <li>关注公众号</li>
                    <li>了解第一手资讯</li>
                </ul>
            </el-col>
            <el-col class="tab-view">
                <router-view @showhide = "toggle" @loading= "load"></router-view>
            </el-col>
        </el-row>
        <transition name="fade">
            <div class="mask" v-show="showMask"></div>
        </transition>
    </div>
</template>

<script>
    export default{
        data() {
            return {
                index:1,
                active:'',
                showMask:false,
                user_name:'',
                user_photo:'',
                first:{
                    key:'',
                    path:''
                },
                second:'',
                loading:false
            }
        },
        watch:{
            '$route' (to, from) {
                this.$data.active = to.name
            }
        },
        methods:{
            toggle(state){
                this.showMask = state
            },
            load(state){
                this.loading = state
            }
        },
        mounted(){
            this.$data.active = this.$router.currentRoute.name
            this.$http.get('/u/get_user_info').then(
                (res)=>{
                    if(res.data.code == 0){
                        this.user_name = res.data.data.user_info[0].user_name
                        this.user_photo = res.data.data.user_info[0].user_photo
                    }
                }
            )
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
.container{
    width:100%;
    min-width:1200px;
    box-sizing:border-box;
    background-color:#f8f8f8;
    padding: 30px 0;
    min-height:900px;
    overflow: hidden;
}
.content{
    width:100%;
    margin: 0 auto;
    max-width:1200px;
    height:100%;
    background-color:#f2f2f2;
    border:1px solid #d8d6d6;
    position: relative;
    padding-left:220px;
}
.tab-list{
    width:220px;
    padding:50px 0;
    height:100%;
    border-right:1px solid #dad8d8;
    position: absolute;
    left:0;
}
.tab-view{
    background-color:white;
    min-height:850px;
}
.head{
    margin:0 auto;
    width:70px;
    height:70px;
    line-height:70px;
    text-align: center;
    border-radius:50%;
    border:7px solid #e3e3e3;
    background-color:white;
}
.head img{
    display: inline-block;
    vertical-align: middle;
}
.welcome{
    width:100%;
    text-align:center;
    color:#666666;
    font-size: 18px;
}
.welcome p{
    font-weight: bold;
    text-align: center;
}
.welcome p:nth-child(2){
    font-weight: 400;
    font-size: 16px;
}
.tabs{
    padding: 50px 0 40px;
}
.checked{
    background-color:white;
}
.tabs li{
    height:50px;
    line-height: 50px;
    color:#777777;
    padding:0 45px;
    cursor: pointer;
    font-weight:450;
    position: relative;
}
.tabs li:after{
    content: '';
    display: block;
    position: absolute;
    width:8px;
    height:8px;
    border-right:2px solid #707070;
    border-bottom:2px solid #707070;
    background-color:transparent;
    transform: rotate(-45deg);
    top:22px;
    right:15px;
}
.public{
    border-top:1px solid #d8d6d6;
    text-align: center;
    padding: 30px 0;
}
.public img{
    margin-bottom:20px;
}
.public li{
    color:#666666;
    line-height:25px;
    font-size: 14px;
}
.mask{
    display: block;
    width:100%;
    height:100%;
    background-color:#000000;
    filter: opacity(0.3);
    position: fixed;
    top:0px;
    left:0;
    z-index: 1000;
}
</style>
