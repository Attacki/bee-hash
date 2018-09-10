<template>
    <div class="discount">
        <div class="invite">
            <img src="./img/d_coin.png" alt="miss" class="img">
            <div class="nav">
                <span class="block"></span>
                <span class="nav-name">活动介绍</span>
            </div>
            <div class="details">
                <ul class="invite_desc">
                    <li>邀请好友消费成功，我们就送BTM：</li>
                    <li>1.邀请好友成功后，产生一笔真实的交易，我们会赠送相应的BTM。</li>
                    <li>2.赠送规则如下：ETC/ETH邀请好友购买10M增送1个BTM， BTC邀请好友购买1T增送1个BTM。</li>
                    <li>3.邀请好友购买交割日期起，一个工作日内，会赠送到账。</li>
                    <li>4.BTM会赠送到您的个人账户。</li>
                    <li style="color:#a3a3a3;font-size:14px;">活动如有调整。以蜜蜂云算力为准，最终解释权归蜜蜂云算力所有。</li>
                </ul>
                <ul class="invite_code">
                    <li style="position:relative;">
                        <span class="key">邀请码</span>
                        <router-link to="/login" tag="span" class="tips" v-if="!status">请先登录</router-link>
                        <input spellcheck="false" type="text" v-else id="invite_code" :value="invite_code">
                        <span class="copy" style="cursor: pointer;position:absolute;right:10px;" @click="copylink('invite_code')">复制</span>
                    </li>
                    <li style="position:relative;">
                        <span class="key">邀请链接</span>
                        <router-link to="/login" tag="span" class="tips" v-if="!status">请先登录</router-link>
                        <input spellcheck="false" type="text" v-else id="invite_link" :value="invite_link">
                        <span class="copy" style="cursor: pointer;position:absolute;right:10px;" @click="copylink('invite_link')">复制</span>
                    </li>
                    <li>
                        <span class="key">当前获得收益</span>
                        <span class="bgcolor">{{coin}}BTM</span>
                    </li>
                    <span class="profit">可在个人中心提现</span>
                </ul>
            </div>
        </div>
        <div class="invite">
            <img src="./img/d_online.png" alt="miss" class="img">
            <div class="nav">
                <span class="block"></span>
                <span class="nav-name">上线活动</span>
            </div>
            <div class="details">
                <ul class="invite_desc">
                    <li>蜜蜂云算力全新上线，买就返现：</li>
                    <li>1.购买云算力成功，我们会返还一部分现金。</li>
                    <li>2.返现规则：活动期间购买ETH/ETC，每M返现5元。购买BTC，每T返现20元。</li>
                    <li>3.返现到账时间是您的交割日起一个工作日内。</li>
                    <li>4.我们会返现到，到您的用户余额。</li>
                    <li style="color:#a3a3a3;font-size:14px;">活动如有调整。以蜜蜂云算力为准，最终解释权归蜜蜂云算力所有。</li>
                </ul>
                <ul class="invite_code">
                    <li>
                        <span class="key">
                            <span class="eth icon"></span>
                            <span class="etc icon"></span>
                        </span>
                        <span class="bgcolor">ETH/ETC  每M返现5元</span>
                    </li>
                    <li>
                        <span class="key">
                            <span class="btc icon"></span>
                        </span>
                        <span class="bgcolor">BTC  &nbsp&nbsp&nbsp&nbsp&nbsp 每T返现20元</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                status:false,
                invite_code:'',
                invite_link:'',
                coin:'0'
            }
        },
        methods:{
            copylink(id){
                if(this.status){
                    var inp = document.getElementById(id)
                    inp.select();
                    document.execCommand("Copy");
                    this.$Message( {message:'复制成功',type:'success',duration:1000} )
                }else{
                    this.$Message( {message:'请先登陆',type:'error',duration:1000} )
                }
            }
        },
        mounted(){ 
            this.$http.get('/isCheck')
            .then((res)=>{
                if(res.data.code == 0){
                    this.$data.status = true
                }else if(res.data.code == 100){
                    this.$data.status = false
                }
                if(this.status){
                    this.$http.get('/u/get_invitation_code').then( (res)=>{ this.invite_code = res.data.data.code; this.invite_link = 'https://www.beehash.cn/register?invite_code='+res.data.data.code } )
                }
            })
        }
    }
</script>

<style scoped>
.discount{
    padding:50px 0;
}
.invite{
    margin: 0 auto 25px;
    width:1200px;
    box-shadow: 0 0 10px 0 #b8b8b8;
    padding:38px 38px 50px;
    box-sizing: border-box;
    text-align: center;
}
.invite .img{
    width:1100px;
}
.nav{
    width:100%;
    padding: 0 20px 20px;
    box-sizing: border-box;
    margin-top:20px;
    text-align:left;
}
.nav .block{
    display: inline-block;
    width:2px;
    height:18px;
    background-color:#ff8d27;
}
.nav-name{
    display: inline-block;
    font-size: 26px;
    padding-left:15px;
    color:#414141;
    font-weight: 400;
}
.invite .details{
    text-align:left;
    padding:0 0 30px;
    margin:0 auto;
    width:1100px;
}
.invite_desc,.invite_code{
    display: inline-block;
    width:49%;
    box-sizing: border-box;
    margin:0;
    padding:0;
}
.invite_code{
    width:45%;
    float: right;
    margin-top:30px;
}
.invite_code:after{
    content:'';
    display: block;
    clear: both;
}
.invite_desc li{
    color:#666666;
    line-height:30px;
}
.invite_code li{
    color:#363636;
    line-height:50px;
    text-align: right;
}
.invite_code .key{
    display: inline-block;
    vertical-align: top;
    width:150px;
    height:40px;
    line-height: 40px;
    text-align:right;
    padding-right:25px;
    box-sizing:border-box;
}
.tips{
    display: inline-block;
    box-sizing: border-box;
    background-color:#327fff;
    color:white; 
    width:250px;
    height:40px;
    line-height:40px;
    font-size: 16px;
    text-align: center;
    vertical-align: top;
    padding:0 55px 0 15px;
    border-radius:4px;
    cursor: pointer;
}
.tips:hover{
    text-decoration:underline;
}
#invite_link,#invite_code{
    box-sizing: border-box;
    outline: none;
    border-style: none;
    background-color:#327fff;
    color:white; 
    width:250px;
    height:40px;
    text-align:center;
    font-size: 16px;
    vertical-align: top;
    padding:0 55px 0 15px;
    border-radius:4px;
}
.invite_code .bgcolor{
    display: inline-block;
    background-color:#327fff;
    border-radius:4px;
    color:white;
    width:250px;
    height:40px;
    line-height: 40px;
    text-align:center;
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
    padding:0 55px 0 15px;
    box-sizing: border-box;
}
.profit{
    display: inline-block;
    color:#a9a9a9;
    height:20px;
    font-size: 14px;
    margin-left:246px;
}
.profit:before{
    content:"";
    display: inline-block;
    background-color:#ff8d27;
    width:3px;
    height:3px;
    border-radius:50%;
    vertical-align: middle;
    margin-top:-2px;
    margin-right:7px;
}
.invite_code  .copy{
    display: inline-block;
    vertical-align: top;
    line-height:40px;
    width:60px;
    font-size: 15px;
    text-decoration: underline;
    color:#f2d43f;
}
.icon{
    display:inline-block;
    vertical-align: middle;
}
.etc{
    width:22px;
    height:31px;
    background: url('./img/d_etc.png') center center/ 22px 31px no-repeat;
}
.eth{
    width:28px;
    height:28px;
    margin-bottom:2px;
    background: url('./img/d_eth.png') center center/ 28px 28px no-repeat;
}
.btc{
    width:20px;
    height:26px;
    background: url('./img/d_btc.png') center center/ 20px 26px no-repeat;
}
</style>
