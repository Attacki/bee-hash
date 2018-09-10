<template>
    <div class="img-box">
        <div class="img" alt="mising"></div>
        <router-link to='/' class="home">返回首页</router-link>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                
            }
        },
        mouted(){
            var height = document.documentElement.clientHeight || document.body.clientHeight
            document.getElementsByClassName('img-box')[0].style.height = height+'px'
        }
    }
</script>

<style scoped>
.img-box{
    width:100%;
    overflow: hidden;
}
.img-box .img{
    height:945px;
    background: url('./img/404.jpg') center center/ 100% 100% no-repeat;
}
.home{
    position: absolute;
    width:120px;
    text-align: center;
    bottom: 10%;
    right:10%;
    text-decoration: underline !important;
    color:#56879b;
}
</style>
