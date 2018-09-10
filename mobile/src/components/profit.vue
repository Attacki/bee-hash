<template>
  <div class="nav">
    <div class="top_bar">
      <div class="flex_item">
        <router-link to="/" tag='span' class="logo dark"></router-link>
      </div>
      <div class="flex_item title">收益</div>
      <div class="flex_item">
      </div>
    </div>
    <div v-if="this.$status" class="coin_box">
        <p class="total">
            <span class="key">币种收益</span>
        </p>
        <div class="prifit_tab">
          <table>
            <thead>
              <th>币种</th>
              <th>总收益</th>
              <th>余额</th>
            </thead>
            <tbody>
              <template v-if="coin_found.length != 0">
                <tr v-for="item of coin_found">
                  <td><font>{{item.coin}}</font>算力</td>
                  <td><font>{{item.all_balance}}</font>{{item.coin}}</td>
                  <td><font>{{item.balance}}</font>{{item.coin}}</td>
                </tr>
              </template>
              <template v-else >
                <tr>
                  <td colspan="3">无数据</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <p class="total">
            <span class="key">收益明细</span>
        </p>
        <div class="property">
          <ul class="pro_list">
            <li v-for="item in coin_list" class="pro_item" :class="chosenCoin==item.cat_name?'choosen':''" :data-coin='item.cat_name'>{{item.cat_name}}</li>
          </ul>
          <div class="treasure">
            <div class="orange">
              <span>
                <p>可用算力</p>
                <p>
                  <font>{{valid_hash.sum_number}}</font>
                  <font>{{valid_hash.unit}}</font>
                </p>
              </span><span>
                <p>待交割</p>
                <p>
                  <font>{{wait_delivery_hash.sum_number}}</font>
                  <font>{{wait_delivery_hash.unit}}</font>
                </p>
              </span>
            </div>
          </div>
          <table>
            <thead>
              <th>日期</th>
              <th>电费<font style="display:inline-block;-webkit-transform:scale(0.8);-moz-transform:scale(0.8);transform: scale(0.8);">({{chosenCoin}})</font></th>
              <th>管理费<font style="display:inline-block;-webkit-transform:scale(0.8);-moz-transform:scale(0.8);transform: scale(0.8);">({{chosenCoin}})</font></th>
              <!-- <th>出币收益</th> -->
              <th>实际收益<font style="display:inline-block;-webkit-transform:scale(0.8);-moz-transform:scale(0.8);transform: scale(0.8);">({{chosenCoin}})</font></th>
            </thead>
            <tbody>
              <template v-if="incomeList.length != 0">
                <tr v-for="record in incomeList">
                  <td>{{record.add_time}}</td>
                  <td>{{record.coin_electric_charge}}</td>
                  <td>{{record.coin_manage_fee}}</td>
                  <!-- <td>{{record.coin_income}}</td> -->
                  <td>{{record.coin_real_income}}</td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan = '5'>暂无记录</td>  
                </tr>
              </template>
            </tbody>
          </table>
          <pagation @onPageChange='getDayProfit' :total="totalPages"  v-if="flag"></pagation>
        </div>
    </div>
    <div v-else class="login_box">
      <span class="logo white"></span>
      <p class="tips">请登录查看收益!</p>
      <router-link tag="span" to="/login" class="login_btn">登录</router-link>
    </div>
  </div>
</template>

<script>
import pager from '../tool/pager'

export default {
  data () {
    return {
        incomeList:{},   //币种总额
        coin_found:[],   //币种收益
        chosenCoin:'BTC',//被选币种
        totalPages:'',   //记录条数
        flag:false,       //是否显示分页
        valid_hash:'',
        wait_delivery_hash:'',
        coin_list:[]
    }
  },
  components:{
    pagation:pager
  },
  methods:{
    logout(){
      $.ajax({
        type:'get',
        url:'/logout',
        success:(res)=>{
          that.$router.push('/');
        }
      })
    },
    bindClick(){
      $.ajax({
        type:'get',
        url:'/shop/getType',
        success:(res)=>{
          this.$data.coin_list = res.data;
          this.$data.coin_list.shift()
          this.$nextTick(()=>{
            $('.pro_list .pro_item').on('click.never',(e)=>{
              $('.pro_item').removeClass('choosen');
              var coin = $(e.target).attr('data-coin');
              $(".pro_item[data-coin='"+coin+"']").addClass('choosen');
              this.chosenCoin = coin;
              this.flag = false;
              this.getDayProfit(1);
            })
          })
        }
      })
    },
    getFound(){
      $.ajax({
        type:'get',
        url:'/u/get_found',
        success:(res)=>{
          this.coin_found = res.data.found;
        }
      })
    },
    getDayProfit(page){
      $.ajax({
        type:'get',
        url:'/u/get_sum_incomel_list',
        data:{
          coin:this.chosenCoin,
          page:page
        },
        success:(res)=>{
          this.incomeList = res.data.income_list;
          this.totalPages = parseInt(res.data.count%10==0?res.data.count/10:res.data.count/10+1);
          this.valid_hash = res.data.valid_hash;
          this.wait_delivery_hash = res.data.wait_delivery_hash;
          this.flag = true;
        }
      })
    }
  },
  mounted(){
    $('.nav').css({'height':$('body').height() - 50});
    if(this.$status){
      this.bindClick();
      this.getFound();
      this.getDayProfit(1);
    }
  },
  destoryed(){
    $('.pro_item').off('click.never');
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
  border-bottom:.01rem solid #d6d6d6;
  background:#2e2e38;
  z-index:100;
}
.top_bar .flex_item{
  color:#fefefe;
  flex: 1;
}
.logo{
  display: inline-block;
  vertical-align: top;
  width:.4rem;
  height:.45rem;
}
.white{
  background:url('../assets/img/white.png') center center/.23rem .25rem no-repeat;
}
.dark{
  background:url('../assets/img/dark.png') center center/.3rem .32rem no-repeat;
}
.title{
  text-align: center;
  font-size: .18rem;
  color:#525252;
}
.coin_box{
  position: fixed;
  top:.45rem;
  overflow-y: auto;
  width:100%;
  box-sizing: border-box;
  padding:0 0 .1rem 0;
  background: #f1f1f1;
  height:calc(100% - .9rem);
  z-index:1;
}
.prifit_tab{
  background: #ffffff;
  padding:.05rem .2rem;
  min-height:2.97rem;
  box-sizing: border-box;
}
.prifit_tab table{
  width:100%;
}
.prifit_tab table th,.prifit_tab table td{
  text-align: center;
  font-weight: 350;
  width:36%;
  height:.35rem;
  font-size: .13rem;
  border-right: .01rem solid #ececec;
  &:last-child{
    border:none;
  }
  &:nth-child(1){
    width:27%;
  }
}
.prifit_tab table tr td{
  color:#929292;
  line-height:.35rem;
}
.prifit_tab table tr td{
  font-size: .1rem;
  &:nth-child(1) font{
    display: inline-block;
    width:.38rem;
    text-align: left;
  }
  &:nth-child(2) font{
    display: inline-block;
    width:.7rem;
    text-align: left;
    float:left;
    margin-left:.05rem;
  }
  &:nth-child(3) font{
    display: inline-block;
    width:.7rem;
    text-align: left;
    float:left;
    margin-left:.05rem;
  }
}
.prifit_tab table thead{
  border-bottom: .01rem solid rgb(226, 226, 226) ;
}
.prifit_tab table tr{
  border-bottom: .01rem solid rgb(226, 226, 226) ;
  &:last-child{
    border:none;
  }
}
.login_box{
  position: fixed;
  top:.45rem;
  height:calc(100% - .9rem);
  width:100%;
  text-align: center;
  padding-top:2rem;
}
.login_box .tips{
  text-align: center;
  font-size: .12rem;
}
.login_box .login_btn{
  display: block;
  background: #ff8e28;
  width:1rem;
  height:.27rem;
  line-height:.3rem;
  font-size: .14rem;
  color:white;
  border-radius: .02rem;
  margin:.1rem auto;
}
.total{
  background: transparent;
  color: #383838;
  padding:.15rem;
  box-sizing: border-box;
}
.coin_item{
  background: #ffffff;
  color:#929292;
  height:.45rem;
  padding:.15rem;
  box-sizing: border-box;
  font-size:.16rem;
  border-bottom: .01rem solid rgb(226, 226, 226) ;
}
.coin_item:first-child{
  color:#555555;
}
.coin_list .coin_item:last-child{
  border: none;
}
.coin_name,.desc{
  font-size:.13rem;
}
.desc{
  width: .6rem;
  float: right;
  text-align: left;
}

.property{
  padding:.1rem .2rem .3rem;
  background:white;
  min-height:2rem;
}
.pro_list{
  width:100%;
  white-space: nowrap;
  border-bottom:.01rem solid #f3f3f3;
  box-sizing: border-box;
  overflow: hidden;
  overflow-x: auto;
}
.pro_item{
  display: inline-block;
  white-space: nowrap;
  word-wrap: break-word;
  word-break: break-all;
  width:.45rem;
  height:.37rem;
  line-height:.37rem;
  text-align: center;
  font-size: .14rem;
  color:#666666;
  font-weight:350;
}
.pro_item.choosen{
  color:#ff8e28;
  border-bottom:.02rem solid #ff8e28;
}
.treasure{
  padding:.1rem 0 .18rem;
  border-bottom:.01rem solid #f3f3f3;
}
.treasure .orange{
  background:#f8e5d4;
  padding:.1rem .05rem;
}
.orange span{
  display: inline-block;
  text-align: center;
  width:50%;
  &:nth-child(1){
    border-right:.01rem solid #9e9e9e;
    box-sizing: border-box;
  }
  p:nth-child(1){
    color:#757575;
    font-size: .12rem;
    text-align: center;
    line-height:.2rem;
  }
  p:nth-child(2){
    color:#353535;
    font-size: .15rem;
    text-align: center;
    line-height:.4rem;
    font:nth-child(2){
      color:#757575;
      font-size: .12rem;
    }
  }
}
.property table th,.property table td{
  font-size:.12rem;
  text-align:center;
  font-weight: 450;
  width:15%;
  padding: .08rem 0;
  &:nth-child(3){
    width:20%;
  }
  &:nth-child(4){
    width:18%;
  }
  &:nth-child(5){
    width:26%;
  }
}
.property table th{
  padding:.05rem 0rem;
}
.property table tr:nth-child(odd){
  background:#fff6ef;
}
.property table tr td{
  border-right: .01rem solid #ececec;
  &:last-child{
    border:none;
  }
}
</style>
