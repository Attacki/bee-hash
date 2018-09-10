<template>
    <div class="content">
        <div class="navbar">
            <ul class="category-list">
                <router-link v-for="typeitem in proType" tag="li" @click.native="changeList(typeitem.cat_id)" :class="{'active':typeitem.cat_id == activeType}" :to="'/hash/'+typeitem.cat_id">{{typeitem.cat_name}}</router-link>
            </ul>
        </div>
        <div class="container-box">
            <div v-if="!(itemList.length == 0)">
                <keep-alive>
                    <hashList :proGroup="itemList" ></hashList>
                </keep-alive>
            </div>
            <div v-else>
                <p class="tips">该币种算力正在筹备...</p>
                <h2>敬请期待</h2>
            </div>
        </div>
    </div>
</template>

<script>
import hashList from './pro-list.vue'

export default {
    metaInfo: {
      title: 'Beehash - 专业的云算力租赁-产品列表',
      meta: [{
        name: 'keyWords',
        content: 'Beehash ,矿机,云算力,算力,矿池,算力交易出租平台,以太币云挖矿，比特币云挖矿，掘金者Miner'
      },{ 
        name: 'description',
        href: 'Beehash提供性价比最高的算力交易，算力租赁业务，一站式算力租赁首选。'
      }]
    },
    data(){
        return {
            activeType:this.$route.params.type,
            proType:[],
            itemList:[],
            itemAll:[]
        }
    },
    components:{
        hashList
    },
    methods:{
        changeList(type){
            this.$data.activeType = type
            this.$http.get('/shop/getList?goods_type='+type).then(
                (res)=>{
                    this.itemList = res.data.data
                }
            )
        }
    },
    mounted(){
        this.$data.activeType = this.$route.params.type
    },
    created(){
        var that = this 
        window.addEventListener("popstate", function() {
            that.$data.activeType = that.$route.params.type
            // that.$data.itemList = that.$data.listAll[that.$route.params.type]
        });
        this.$http.get('/shop/getType').then((res)=>{
            this.$data.proType = res.data.data
        });
        this.$http.get('/shop/getList?goods_type='+that.$route.params.type).then((res)=>{
            this.itemList = res.data.data
        });
    }

}


</script>

<style scoped>

.content {
    margin: 0 auto;
    padding: 0px;
    background-color:#f5f5f5;
    min-width:1200px;
}
.navbar{
    background-color:white;
    height: 100px;
    box-shadow: 0 5px 7px 0px rgb(230, 230, 230);
}
.category-list{
    padding:0;
    margin: 0 auto;
    width:100%;
    max-width:1200px;
}
.category-list li{
    display: inline-block;
    font-size:22px;
    color:#666666;
    text-align:center;
    height: 50px;
    line-height: 50px;
    margin-top:25px;
    border-radius:5px;
    padding:0 20px;
    cursor: pointer;
    margin-right:15px;
    transition: background-color 0.3s;
}
.category-list li.active{
    background-color:#ff8e28;
    color: white;
}
.container-box{
    margin: 0 auto;
    width:100%;
    max-width:1200px;
    padding:0 0 60px;
    min-height:402px;
}
</style>
