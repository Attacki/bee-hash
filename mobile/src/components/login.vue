<template>
  <div class="nav">
    <div class="top_bar">
      <div class="flex_item">
        <span @click="back" class="detail"></span>
      </div>
      <div class="flex_item title">登录</div>
      <div class="flex_item">
      </div>
    </div>
    <ul class="login_box">
        <li style="padding:.5rem 0 .4rem;">
            <span class='logo'></span>
            <p class="mother">Beehash.cn</p>
        </li>
        <li class="input">
          <label for="phone" class="key">手机号码：</label>
          <input type="text" id="phone" class="val" style="width:100%;" @focus="clearErr('phone')" placeholder="请输入手机号码" v-model="phone">
          <span class="err">{{errorTip.phone}}</span>
        </li>
        <li class="input">
          <label for="code" class="key">验证码：</label>
          <input type="text" id="code" class="val" style="width:65%; border-right:none;" maxlength="4" @focus="clearErr('code')" placeholder="4位数字验证码" v-model="capchar"><!--
          --><span class="capchar" @click="flag && sendCapchar()">{{btn_tip}}</span>
          <span class="err">{{errorTip.code}}</span>
        </li>
        <li class="login_btn" @click="login">登录</li>
    </ul>
  </div>
</template>

<script>
var prePath = '';
export default {
    data(){
        return{
           phone:'',
           capchar:'',
           btn_tip:'获得验证码',
           timer:null,
           flag:true,
           errorTip:{
             phone:'',
             code:''
           }
        }
    },
    beforeRouteEnter(to, from, next) {
      prePath = from.fullPath;
      next();
    },
    methods:{
      sendCapchar(){
        $.ajax({
          type:'post',
          data:{'phone':this.phone},
          url:'/sendWapLoginCode',
          success:(res)=>{
            if(res.code == 0){
              this.setTimer(60);
            }else{
              this.showErr(res.data);
            };
          }
        });
      },
      setTimer(count){
        this.flag = false;
        this.timer = setTimeout( ()=>{
          if(count == 1){
            this.flag = true;
            this.btn_tip = '重新获取'
            clearTimeout(this.timer);
            return
          }
          --count;
          this.btn_tip = count + 's';
          this.setTimer(count);
        },1000)
      },
      login(){
        $.ajax({
          type:'post',
          url:'/ajaxWapLogin',
          data:{'phone':this.phone,'code':this.capchar},
          success:(res)=>{
            if(res.code == 0){
              this.$router.push(prePath);
            }else{
              this.showErr(res.data);
            }
          }
        })
      },
      showErr(errs){
        for( var tip in errs){
          this.errorTip[tip] = errs[tip];
        }
      },
      clearErr(val){
        this.errorTip[val] = ''
      },
      back(){
        this.$router.push(prePath);
      }
    },
    mounted(){
      clearTimeout(this.timer);
    },
    distoryed(){
      clearTimeout(this.timer);
    }
}
</script>

<style lang="less" scoped>
.top_bar {
  position: fixed;
  top:0;
  width:100%;
  display: flex;
  height:.45rem;
  line-height: .45rem;
  box-sizing: border-box;
  padding:0rem .15rem;
  background:#2e2e37;
  z-index:100;
}
.top_bar .flex_item{
  flex: 1;
}
.title{
  text-align: center;
  font-size: .15rem;
  color:#f1f1f1;
  font-weight: 350;
}
.detail{
    width:.25rem;
    height:.45rem;
    line-height:.25rem;
    float: left;
    background: url('../assets/img/pointer.png') center center/.1rem .16rem no-repeat;
}
.login_box{
    position: fixed;
    top:.45rem;
    padding:0 .35rem;
    width: 100%;
    height:calc(100% - .45rem);
    box-sizing: border-box;
}
.logo{
  display: block;
  margin: 0 auto;
  width:.4rem;
  height:.45rem;
  background:url('../assets/img/white.png') center center/.3rem .32rem no-repeat;
}
.mother{
  font-size: .15rem;
  color:#585858;
  text-align: center;
}
.login_btn{
  width:100%;
  height:.36rem;
  line-height:.36rem;
  text-align: center;
  cursor: pointer;
  color:#f1f1f1;
  margin-top:.3rem;
  background:#ff8e28;
}
.input{
  padding-bottom: .2rem;
  position: relative;
}
.input .err{
  position: absolute;
  bottom:0rem;
  color:rgb(236, 57, 57);
  font-size:.13rem;
}
.input .key{
  display: block;
  color: #919191;
  height:.36rem;
  line-height:.3rem;
  font-size: .14rem;
}
.input .val{
  display:inline-block;
  border-style:none;
  outline: none;
  height:.4rem;
  padding-left:.1rem;
  border:.01rem solid #e7e7e7;
  box-sizing: border-box;
  font-size:.15rem;
}
.input .capchar{
  display: inline-block;
  vertical-align: top;
  width:35%;
  height:.4rem;
  line-height:.4rem;
  background:#f1f1f1;
  color:#858585;
  font-size: .13rem;
  text-align:center;
  border:.01rem solid #e7e7e7;
  border-left:none;
  box-sizing:border-box;
}
input::-webkit-input-placeholder {
  color: #a9aaac; 
  font-size: .13rem;
} 
input:-moz-placeholder {
  color: #a9aaac; 
  font-size: .13rem;
} 
input:-ms-input-placeholder {
  color: #a9aaac; 
  font-size: .13rem;
} 
</style>
