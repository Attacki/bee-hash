<template>
    <div class="bg-dark footer">
        <el-row>
            <el-col :span="7">
                <ul class="company">
                    <li>武汉趣块科技有限责任公司</li>
                    <li>客服热线：027-67126811（9:30-17:30）</li>
                    <li style="color:#a8a8a8">QQ群：790481415（蜜蜂云算力1群）</li>
                    <li style="color:#a8a8a8">QQ群：442039051（蜜蜂云算力2群）</li>
                    <!-- <li style="color:#a8a8a8">公众微信号：gh_012484d3fd36</li> -->
                    <!-- <li>邮箱链接：company@otherpool.com</li> -->
                </ul>
            </el-col>
            <el-col hidden-xs-only :span="7">
                <ul class="links">
                    <li>友情链接</li>
                    <li><a href="http://www.otherpool.com" target="_blank">云矿池</a></li>
                    <li><a href="https://www.beepool.org" target='_blank'>蜜蜂矿池</a></li>
                </ul>
            </el-col>
            <el-col :span="10">
                <ul class="er-code">
                    <li><img src="./img/code.jpg" alt=""></li>
                    <li>关注公众号</li>
                    <li>了解第一手资讯</li>
                </ul>
            </el-col>
            <el-col :span="24">
                <div class="copyright">
                    <font>鄂ICP备</font>
                    <font>18016156号-1</font>
                    <font>Copyright© 2018 beehash.cn</font>
                </div>
            </el-col>
        </el-row>
    </div>
</template>


<script>
export default {
    data() {
        return {

        }
    },
    methods:{

    }
}
</script>

<style scoped>
.footer {
    margin: 0 auto;
    padding: 30px 0px;
    width: 100%;
    min-width:1200px;
}
.el-row {
    margin: 0 auto;
    width: 100%;
    max-width: 1200px;
}
.bg-dark {
    background: #2e2e37;
}
.company,.links{
    padding: 0;
}
.company li{
    padding-top:15px;
    color:#a8a8a8;
    font-size: 14px; 
}
.company li a{
    color:#a8a8a8;
    font-size: 14px; 
}
.company li:nth-child(1){
    color: #dadada;
    font-size: 18px;
    padding:0px 0 5px 0;  
}
.links li{
    display: block;
    padding-top:15px;
}
.links li a{
    font-size: 14px; 
    color:#a8a8a8;
}
.links li:nth-child(1){
    color: #dadada;
    font-size: 18px;
    padding:0px 0 5px 0;  
}
.er-code li{
    color:#a8a8a8;
    text-align: right;
    margin:  5px 15px;
    font-size: 14px;
}
.er-code img{
    width:115px;
    height:115px;
}
.er-code li:nth-child(2){
    padding-right:20px; 
}
.er-code li:nth-child(3){
    padding-right:11px; 
}
.copyright{
    padding-top:25px; 
    text-align: center;
    color: #a8a8a8;
}
</style>
