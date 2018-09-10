<template>
    <div class="loading" v-show='show'>
        <span class="tip">加载中</span>
        <span class="load"></span>
    </div>
</template>

<script>
export default {
    props:['show']
}
</script>

<style lang="less" scoped>
.loading{
    height:.30rem;
    line-height: .30rem;
    margin-bottom: .1rem;
    text-align: center;
    font-size:.14rem;
}
.tip{
    display:inline-block;
    margin-right: 7px;
}
.load{
    display: inline-block;
    vertical-align:middle;
    width:.18rem;
    height:.18rem;
    background:url('../assets/img/load.png') center center / .18rem .18rem no-repeat;
    z-index: 10;
    -webkit-animation: rotate 1s infinite linear;
    animation: rotate 1s infinite linear;
}
@keyframes rotate {
    from{
        transform: rotateZ(0deg)
    }
    to{
        transform: rotateZ(360deg)
    }
}
</style>
