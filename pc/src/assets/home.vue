<template>
    <div class="content">
        <el-row class="banner-box">
            <el-col class="img-box"><img class="bg-banner" src="./img/banner.jpg" alt="banner"></el-col>
            <el-col class="specialWord">
                <span>买币不如买算力</span>
                <span>即买即卖·无需等待·专人维护·算力稳定</span>
                <router-link to="/hash/0" tag="span" class="button">开启收益></router-link>
            </el-col>
        </el-row>
        <el-row class="platform">
            <el-col :span="24" class="description">
                <p>从现在开始挖矿不再困难</p>
                <p>蜜蜂云算力为您提供简单，安全，快捷的云算力服务，让你体验到挖矿的快乐。</p>
            </el-col>
        </el-row>
        <div class="platform-data">
            <el-row  class="dataTable">
                <el-col class="pro-table" :span="16">
                    <el-row class="title" >
                        <el-col :span="4"  class="recommend" >优先推荐</el-col>
                        <el-col :span="3"  class="more" :offset="17"><router-link to="/hash/0">更多选择></router-link></el-col>
                    </el-row>
                    <table class="hashTable">
                        <thead>
                            <th>产品名称</th>
                            <th>总算力</th>
                            <th>最低购买</th>
                            <th>购买单价</th>
                            <th>剩余算力</th>
                            <th></th>
                        </thead>
                        <tbody>
                            <tr v-for="pro in proList">
                                <td>{{pro.goods_name}}</td>
                                <td>{{pro.goods_sum}}{{pro.computingUnit}}</td>
                                <td><font>{{pro.min_unit}}</font>{{pro.computingUnit}}</td>
                                <td><font>￥{{pro.shop_price}}</font>/{{pro.computingUnit}}</td>
                                <td>{{pro.goods_number}}{{pro.computingUnit}}</td>
                                <td>
                                    <span v-if="pro.goods_number > pro.min_unit"><router-link :to="'/product/'+pro.goods_id">立即购买</router-link></span>
                                    <div v-else>销售告罄</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </el-col>
                <el-col class="sliper" :span="7">
                    <div style="border-top:2px solid #ff8d27;">
                        <ul class="productDetails">
                            <li>产品细节</li>
                            <li><i class="icon el-icon-circle-check"></i>期限：终身合约</li>
                            <li><i class="icon el-icon-circle-check"></i>维护费：8%收益</li>
                            <li><i class="icon el-icon-circle-check"></i>支持支付宝、微信购买</li>
                        </ul>
                        <div class="newTransaction">
                            <div class="desc">
                                <span>成功订单</span>
                                <!-- <span><a href="#">时间</a></span> -->
                            </div>
                            <div id="rollList" @mouseover="clean" @mouseout="set" >
                                <div id="firFloor">
                                    <ul v-for="item in boughtList" class="roll">
                                        <li>{{item.user_name}}</li>
                                        <li>{{item.num}}<font></font></li>
                                        <li>{{item.type}}</li>
                                    </ul>
                                </div>
                                <div id="secFloor">
                                    <ul v-for="item in boughtList" class="roll">
                                        <li>{{item.user_name}}</li>
                                        <li>{{item.num}}<font></font></li>
                                        <li>{{item.type}}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-row class="hashTrans">
            <el-col class="img-box"><img class="bg-banner" src="./img/background.png" alt="banner"></el-col>
            <ul class="transTitle">
                <li>成熟、领先的云算力租赁服务平台</li>
                <li>
                    <span class="dashLine"></span>
                    <span class="triangle"></span>
                    <span class="dashLine"></span>
                </li>
                <li>
                    <el-col>
                        <el-row class="character">
                            <el-col :span="8">
                                <img class="icon" src="./img/research.png">
                                <div class="descp">
                                    <span>区块链应用研究</span>
                                    <span>专注于研究数字货币技术和区块链技术</span>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <img class="icon" src="./img/mangement.png">
                                <div class="descp">
                                    <span>管理规范</span>
                                    <span>从矿机选购到产生效益，严格控制每个业务流程，从而全面把控生命周期</span>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <img class="icon" src="./img/miner.png">
                                <div class="descp">
                                    <span>矿机严选</span>
                                    <span>严格合作机构准入门槛，多维度审核及资信评估，全面控制源头风险</span>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <img class="icon" src="./img/transaction.png">
                                <div class="descp">
                                    <span>成功交易案例</span>
                                    <span>大量真实交易案例，解决您的信任问题</span>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <img class="icon" src="./img/fastDelivery.png">
                                <div class="descp">
                                    <span>快速交付</span>
                                    <span>无需等待就能递交大量算力</span>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <img class="icon" src="./img/runtime.png">
                                <div class="descp">
                                    <span>实时统计数据</span>
                                    <span>客服人员实时跟踪，记录您的信息，确保您无任何风险</span>
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                </li>
            </ul>
        </el-row>
        <el-row class="minerFactory">
            <ul class="transTitle">
                <li>我们的矿场</li>
                <li>
                    <span class="dashLine"></span>
                    <span class="triangle"></span>
                    <span class="dashLine"></span>
                </li>
                <li>
                    <div>
                        <div class="factory">
                            <div class="miner" :span="7">
                                <img src="./img/factory1.jpg">
                            </div>
                            <div class="miner" :span="7">
                                <img src="./img/factory2.jpg">
                            </div>
                            <div class="miner" :span="7">
                                <img src="./img/factory3.jpg">
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </el-row>
        
    </div>
</template>


<script>

var box = null,box_begin = null,box_begin_height = null, curTop = null
export default {
    metaInfo: {
      title: '蜜蜂云算力租赁',
      meta: [{
        name: 'keyWords',
        content: '云算力,挖矿,矿机,掘金者,熊猫B3,蚂蚁S9,BTC,ETH,ETC,DCR,矿场,托管。'
      },{
        name: 'description',
        href: 'Beehash是全球先进的云算力租赁服务平台，提供BTC、ETH、ETC、DCR等云算力租赁服务。“工业级矿机”掘金者Miner，Beehash提供云算力租赁服务，为矿圈人士打造高效灵活、收益强劲、品质可靠的交易平台，让挖矿更简单、让托管更省心！'
      }]
    },
    name:'home',
    data() {
        return {
            proList:[],
            boughtList:[]
        }
    },
    methods:{
        setTimeout(){
            if(this.$router.currentRoute.name == "home"){
                this.$publicVar.timeOut = window.setTimeout( ()=>{
                    if (curTop >= box_begin_height) {
                        box.scrollTop = 0;
                    }
                    box_begin_height = parseFloat(window.getComputedStyle(box_begin, null).height)
                    curTop = box.scrollTop
                    box.scrollTop = ++curTop;
                    window.clearTimeout(this.$publicVar.timeOut)
                    this.setTimeout()
                },40)
            }else{
                this.$publicVar.timeOut = ''
            }
        },
        clean(){
            window.clearTimeout(this.$publicVar.timeOut)
        },
        set(){
            this.setTimeout()
        }
    },
    mounted: function () {
        box = document.getElementById("rollList")
        box_begin = document.getElementById("firFloor")
        var that = this
        this.$nextTick(function () {
            that.$http.get('/shop/getRecommend')
            .then((res)=>{
                this.proList = res.data.data
            });
            that.$http.get('/order/getRecentOrder')
            .then((res)=>{
                this.boughtList = res.data.data;
                //滚动订单
                this.setTimeout()
            });

        })
    },
    beforeRouteLeave(to,from,next){
        window.clearTimeout(this.$publicVar.timeOut)
        next()
    }
}
</script>

<style scoped>
.content{
    margin: 0 auto;
    width:100%;
    min-width:1200px;
}
.banner-box{
    margin: 0 auto;
    width: 100%;
    position: relative;
}
.specialWord{
    margin: 0 auto;
    width: 100%;
    max-width: 1200px;
    position: absolute;
    top:20%;
    left: calc( 50% - 600px);
}
.specialWord span{
    display: block;
    color: white;
}
.specialWord span:nth-child(1){
    font-size: 45px;
    letter-spacing: 1px;
    margin-bottom:40px;
}
.specialWord span:nth-child(2){
    font-size: 26px;
    color: rgba(255,255,255,.5);
    margin-bottom:40px;
}
.specialWord .button{
    color: #ff8d27;
    width: 163px;
    height: 46px;
    line-height: 46px;
    text-align: center;
    background-color: white;
    border-radius: 7px;
    font-size: 18px;
    cursor:pointer;
}
.img-box{
    width: 100%;
    overflow: hidden;
}
.bg-banner{
    float: left;
    min-width: 1200px;
}
.platform{
    margin: 0 auto;
    width: 100%;
    max-width: 1200px;
}
.platform .description{
    margin: 50px auto;
}
.platform .description p{
    margin: 0;
    padding: 0;
    text-align: center;
    color: #525252;
}
.platform .description p:nth-child(1){
    font-size: 30px;
    font-weight:100;
    padding-bottom: 30px;

}
.platform .description p:nth-child(2){
    font-size: 15px;
}
.platform-data{
    background-color: #f6f6f6;
    padding: 50px 0;
}
.platform-data .dataTable{
    margin: 0 auto;
    width: 100%;
    max-width: 1200px;
}
.dataTable .pro-table{
    margin: 10px 3% 10px 0; 
    background-color: white;
    height: 432px;
    overflow-y: auto;
    overflow-x: hidden;
}
.title{
    border-top: 2px solid #ff8d27;
    height: 60px;
    line-height: 60px;
    background-color: #f7efe7;
}
.title .recommend{
    font-size: 18px;
    color: #333333;
    box-sizing:border-box;
    height: 30px;
    margin: 15px 0 0;
    padding: 0 0 0 30px;
    line-height: 30px;
    border-right: 1px solid gray;
}
.title .more a{
    color: black;
}
.hashTable{
    width: 100%;
    border-collapse:collapse; 
}
.hashTable tbody tr td{
    text-align: center;
    height: 50px;
    color: #666666;
}
.hashTable thead th {
    color: #999999;
    font-size: 15px;
    font-weight: 400;
    height: 50px;
}
.hashTable thead th:nth-child(1){
    text-align: left;
    padding-left: 20px;
}
.hashTable tbody tr{
    border-top:1px dashed #e6e6e6;
}
.hashTable tbody tr td:nth-child(1){
    color: #111111;
    text-align: left;
    padding-left: 20px;
}
.hashTable tbody tr td:nth-child(3) font{
    color: #ff8d27;
    font-weight: bold;
}
.hashTable tbody tr td:nth-child(4) font{
    color: #ff8d27;
    font-weight: bold;
}
.hashTable tbody tr td:nth-child(6) span{
    display: inline-block;
    font-size: 12px;
    text-align: center;
    color: white;
    border-radius:3px;
    background-color: #ff8d27;
    cursor:pointer;
    user-select: none;
}
.hashTable tbody tr td:nth-child(6) span a{
    display: inline-block;
    font-size: 12px;
    padding: 5px 6px;
    color: white;
}
.hashTable tbody tr td:nth-child(6) div{
    display: inline;
    text-align: center;
    font-size: 12px;
    color: white;
    border-radius:3px;
    padding: 5px 6px;
    background-color: #9b9b9b;
    user-select: none;
    pointer-events: none;
}

.sliper{
    margin: 10px 0 ; 
}
.productDetails{
    padding:0;
    margin: 0;
}
.productDetails li{
    padding: 0 30px;
    height:45px;
    line-height: 45px;
}
.productDetails li:nth-child(1){
    height:60px;
    line-height: 60px
}
.productDetails li:nth-child(odd){
    background-color:#fff;
}
.productDetails .icon{
    font-size:20px;
    color:#ff8d27;
    margin-right:30px;
}
.newTransaction{
    height:235px;
    background-color:#fff;
}
.newTransaction:after{
    content:'';
    display:block;
    clear: both;
}
.newTransaction .desc{
    border-bottom:2px solid #ff8d27;
    z-index:1000;
    height:45px;
    line-height:45px;
}
.newTransaction .desc span{
    display: inline-block;
    box-sizing:border-box;
    padding: 0 30px;
}
.newTransaction #rollList{
    z-index: -1;
    height:190px;
    overflow: hidden;
}
.newTransaction .desc span:nth-child(2){
    float:right;
}
.newTransaction .desc span:nth-child(2) a{
    font-weight:100;
    color:#ff8d27;
    font-size:14px;
    text-decoration:underline;
}
.newTransaction .roll{
    box-sizing:border-box;
    margin:0;
    padding:10px 30px;
    border-bottom:1px dashed #e6e6e6;
    width:100%;
    height:42px;
    display:flex;
}
#firFloor{
    animation: roll 10s ;
}
#secFloor{
    animation: roll 10s ;
}
.newTransaction .roll li{
    display:inline-block;
    font-size:13px;
    flex:1;
}
.newTransaction .roll li:nth-child(2){
    flex:1;
    text-align:center;
}
.newTransaction .roll li:nth-child(2) {
    font-size:13px;
    color:#ff8d27;
}
.newTransaction .roll li:nth-child(3){
    text-align:right;
    line-height:21px;
    color:#999999;
}
.hashTrans{
    margin: 0 auto;
    width: 100%;
    position: relative;
}
.transTitle{
    position: absolute;
    top:0px;
    margin:0;
    padding:0;
    width:100%;
    max-width: 1200px;
    left: calc( 50% - 600px );
    text-align:center;
}
.transTitle li{
    width:100%;
    margin:0 auto;
}
.transTitle li:nth-child(1){
    padding:50px 0 38px;
    font-size:30px;
    font-weight:100;
}
.transTitle li:nth-child(3){
    overflow: hidden;
}
.transTitle li:nth-child(3):after{
    content:'';
    display:block;
    clear:both;
    zoom:1;
}
.dashLine{
    display:inline-block;
    width:12%;
    border-top:0.5px dashed #999999;
    vertical-align:middle;
    height:12px;
}
.triangle{
    display:inline-block;
    border-top:18px solid #fd8204;
    border-left:10px solid transparent;
    border-right:10px solid transparent;
    margin: 0 4%;
}
.character .el-col{
    padding:50px 15px 0;
    text-align: left;
}
.character .el-col .icon{
    display:inline-block;
    margin-right:20px;
}
.character .el-col .descp{
    display:inline-block;
    width:calc( 100% - 150px);
    vertical-align:top;
    padding-top:10px;
}

.character .el-col .descp span{
    display:block;
}
.character .el-col .descp span:nth-child(1){
    font-weight:bolder;
    font-size:20px;
    padding-bottom:10px;
    text-align:left;
    color: #333333;
}
.character .el-col .descp span:nth-child(2){
    white-space: break-word;
    text-align:left;
    color: #666666;
}
.minerFactory{
    margin: 0 auto;
    width: 100%;
    position: relative;
    height:500px;
}
.minerFactory .factory .el-col{
    margin-right:4%;
}
.minerFactory .factory .el-col:nth-child(3){
    margin-right:0;
}
.miner{
    display:inline-block;
    margin:50px 1% 50px 0;
    padding:0;
    overflow: hidden;
}
</style>