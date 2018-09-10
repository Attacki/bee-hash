<template>
  <div class="tab">
    <router-link tag="div" to="/" class="tab_item gray">
      <div class="icon goods"></div>
      <p class="name">算力</p>
    </router-link>
    <router-link tag="div" to="/profit" class="tab_item gray">
      <div class="icon profit"></div>
      <p class="name">收益</p>
    </router-link>
    <router-link tag="div" to="/mine" class="tab_item gray">
      <div class="icon user"></div>
      <p class="name">个人中心</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.tab {
  position: fixed;
  box-sizing: border-box;
  width:100%;
  padding:.05rem 0 0;
  height:0.45rem;
  bottom:0;
  display: flex;
  box-shadow: 0 0 .03rem 0 #b4b4b4;
  background:white;
  z-index:100;
}
.tab .tab_item{
  flex: 1;
  text-align:center;
  .icon{
    display: inline-block;
    width:.18rem;
    height:.18rem;
  }
  .name{
    margin:0;
    text-align:center;
    color:#afafaf;
    font-size:.1rem;
  }
}
.goods{
  background:url('../assets/img/goods.png') center center/0.18rem 0.18rem no-repeat;
}
.profit{
  background:url('../assets/img/profit.png') center center/0.18rem 0.18rem no-repeat;
}
.user{
  background:url('../assets/img/user.png') center center/0.18rem 0.18rem no-repeat;
}
.router-link-exact-active.router-link-active .name{
  color:black;
}
.router-link-exact-active.router-link-active.tab_item{
  -webkit-filter: initial;
  -moz-filter: initial;
  -ms-filter: initial;
  filter: initial;
}
.gray{
  -webkit-filter: invert(100%);
  -moz-filter: invert(100%);
  -ms-filter: invert(100%);
  filter: invert(100%);
}

</style>
