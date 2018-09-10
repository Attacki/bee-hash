<template>
  <div class="nav">
    <div class="top_bar">
      <div class="flex_item">
        <span class="detail" @click="goback"></span>
      </div>
      <div class="flex_item title">云算力销售协议</div>
      <div class="flex_item">
      </div>
    </div>
    <div class="conten_d">
            <ul class="content">
                <li>
                    <p class="item-name">协议概述</p>
                    <p class="item-desc">
                        云算力销售协议是Beehash推出的全新的云算力产品，购买成功后，用户将获得的收益为个人所拥有的有效算力的产出扣除管理费与电费后所得，收益日结，每日结算昨天的收益。
                    </p>
                </li>
                <li>
                    <p class="item-name">交易市场</p>
                    <p class="item-desc">
                        用户完成下单并支付成功后，订单无法撤销。
                    </p>
                </li>
                <li>
                    <p class="item-name">收益计算</p>
                    <p class="item-desc">
                        每日收益 = 每日算力产出-8%管理费-电费（功耗*0.5元/kw*h）
                    </p>
                    <p class="item-desc">
                        每日收益先扣除管理费，再扣除电费。
                    </p>
                    <p class="item-desc">
                        例如：每日算力产出100个币，先扣除8%的管理费，每日实际收益92个币，在扣除电费，电费根据当日数字货币（默认为火币网）的汇率转换为数字货币，假设电费价值2个币，那每日收益就是90个币。
                    </p>
                </li>
                <li>
                    <p class="item-name">收益分配</p>
                    <p class="item-desc">
                        1.Beehash将使用蜜蜂矿池对应币种PPS理论收益的平均值进行计算。
                    </p>
                    <p class="item-desc" style="line-height:30px;"> 
                        2.本合约算力产生的收益以数字货币的形式发放。
                    </p>
                    <p class="item-desc" style="line-height:30px;"> 
                        3.T日为交割日，T+1日0:00开始计算收益，T+2日可查看到收益。收益在T+2日14:00-24:00发放到您的账户。
                    </p>
                </li>
                <li>
                    <p class="item-name">维护费用</p>
                    <p class="item-desc">
                        1. 云算力销售协议所用矿机为市面上最新的矿机，电费为0.50元/kw*h。电费在收益分配时收取，根据当日数字货币（默认为火币网）的汇率转换为数字货币后，从用户余额中扣除。
                    </p>
                    <p class="item-desc">
                        2. 如出现余额不足以扣除当日电费的情况，余额将会以负数的形式存在，下次分配收益会优先进行偿还。
                    </p>
                    <p class="item-desc">
                        3.管理维护费用为每日总收益的8%.
                    </p>
                    <p class="item-desc">
                        4.Beehash有权根剧实际运营情况对维护费进行调整并提前一周在网站和官方社交平台等公布。如遇任何问题，我们会第一时间通过邮件或者短信的形式通知所有用户，送达即表示收到。
                    </p>
                </li>
                <li>
                    <p class="item-name">合约暂停</p>
                    <p class="item-desc">
                        1.在合约期内，如果每日收益不足以支付电费，且每日收益不足以支付电费的情况连续出现10天， Beehash有权对矿机进行停机处理，合约暂停。
                    </p>
                    <p class="item-desc">
                        2.算力合约暂停后， Beehash将对每日收益统计，如果连续两天收益高于电费，第三天我们会继续支付收益。
                    </p>
                    <p class="item-desc">
                        3.合约暂停的功能，仅限到 2018年12月31日， 之后出现连续10天负收益合约将终止。 
                    </p>
                    <p class="item-desc">
                        4.合约终止后， Beehash将不再支付收益。
                    </p>
                </li>
                <li>
                    <p class="item-name">免责声明</p>
                    <p class="item-desc">
                        1.遭遇不可抗力或客观事件造成项目终止。不可抗力是指不能预见、不能避免并不能克服的客观情况。包括但不限于自然灾害、如台风、地震、洪水、冰雹；政府行为，如法律、法规、政策变动、征收、征用；社会异常事件，如战争、罢工、骚乱等方面。beehash不承担不可抗力或客观事件造成项目终止的责任。
                    </p>
                </li>
                <li style="text-align:center;font-weight:bold;color:#666666;">
                    协议最终解释权归，Beehash方所有。
                </li>
            </ul>
    </div>
  </div>
</template>

<script>
var prePath=''
export default {
    methods:{
        goback(){
            this.$router.push(prePath)
        }
    },
    beforeRouteEnter(to, from, next) {
      prePath = from.fullPath;
      next();
    }
}
</script>

<style lang="less" scoped>
.nav{
  height:calc(100% - .45rem)
}
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
.conten_d{
    position: fixed;
    top:.45rem;
    padding:.05rem .16rem;
    width: 100%;
    height: calc(100% - .45rem);
    box-sizing: border-box;
    overflow-y: auto;
}
.content{
    width:100%;
    margin: 0 auto;
    overflow-y: auto;
    background-color: #ffffff;
    font-size: .14rem;
}
.item-name{
    font-weight:bold;
    color:#464646;
    margin-bottom:.25rem;
}
.item-desc{
    text-align: justify;
    color:#999999;
    margin-bottom:.2rem;
}
</style>
