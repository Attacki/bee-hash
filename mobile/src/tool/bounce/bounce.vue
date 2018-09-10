<template>
    <div class="fly_bounce">
        <!-- <transition name="fade" v-if="type == 'ask'">
            <div class="box">
                <p>{{msg}}</p>
                <div>
                    <span @click="callback">确定</span>
                    <span @click="cancel">取消</span>
                </div>
            </div>
        </transition>
        <transition name="fade" v-if="type == 'flying'">
            <div class="box">
                <div class="tip_icon" :class="iType"></div>
                <div class="tip_content">{{msg}}</div>
            </div>
        </transition> -->
    </div>
</template>

<script>
/*  
* 传入一个对象 'one' 
* 属性:  
*      type(浮层的类型)             可选值 ['tips','ask','flying']       默认'tips'   提示或判断
*      iType(浮层提示图标)          可选值 ['success','error']  默认'成功'    成功或失败
*      callback(点击确定的回调)      类型 function       默认关闭弹窗
*      msg(提示的内容)              类型  string        默认为空
*/
export default {
    props:['type','msg','show'],
    data(){
        return{
            tips:false,
            timer:null
        }
    },
    watch:{
        show:function(val){
            if(val){
                this.showTips();
            }
        }
    },
    methods:{
        showTips(){
            this.$nextTick(()=>{
                this.tips = true;
                this.timer = setTimeout(()=>{
                    if(this.tips){
                        this.tips = false;
                        clearTimeout(this.timer);
                        return
                    }
                    this.showTips()
                },1000)
            })
        }
    }
}
</script>

<style lang="less" scoped>
</style>
