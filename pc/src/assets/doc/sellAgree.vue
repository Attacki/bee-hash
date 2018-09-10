<template>
    <div class="wraper">
        <ul class="content">
            <h3 style="font-weight:bold;color:#464646;font-size: 24px;text-align:center;">云算力销售协议</h3>
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
</template>

<script>
export default{
    data(){
        return {

        }
    }
}
</script>

<style scoped>
.wraper{
    background-color:#f9f9f9;
    padding:50px 0;
}
.content{
    width:650px;
    margin: 0 auto;
    padding: 50px;
    background-color: #ffffff;
}
.content h3{
    margin-top:0;
}
.item-name{
    font-weight:bold;
    color:#464646;
    margin-bottom:25px;
}
.item-desc{
    text-align: justify;
    color:#999999;
    margin-bottom:20px;
}
</style>

