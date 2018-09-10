<template>
    <div>
        <div class="position">
            <span class="type" @click="toggle"></span>
        </div>
        <transition name="fade">
            <ul v-show="show" class="type_list">
                <li v-if="typeList.length == 0" class="type_item" style="padding:0;text-align:center;">刷新获取列表</li>
                <li v-else v-for="item in typeList" :class="{'checked': typeChecked == item.cat_id}" :data-id="item.cat_id" @click="changeChecked" class="type_item">{{item.cat_name}}算力</li>
            </ul>
        </transition>
    </div>
</template>

<script>
export default {
    data(){
        return{
            show:false,
            typeChecked:0,
            typeList:[]
        }
    },
    props:['action'],
    methods:{
        changeChecked(e){
            this.typeChecked = e.target.dataset.id;
            this.action(e.target.dataset.id)
        },
        toggle(e){
            $('.type').hasClass('up')? $('.type').removeClass('up'):$('.type').addClass('up');
            this.show = !this.show;
            e.stopPropagation();
        }
    },
    mounted(){
        var that =this;
        $(document).on('click.removeClass','body',function(){
            $('.type').removeClass('up');
            that.$data.show = false;
        })
        $.ajax({
            type:'get',
            url:'/shop/getType',
            success:(res)=>{
                if(res.code == 0){
                    this.$data.typeList = res.data
                }else{
                    this.$data.typeList = []
                }
            }
        })
    }

}
</script>

<style lang="less" scoped>
.fade-enter-active ,.fade-enter-active .type_item{
  transition: all .6s;
}
.fade-leave-active ,.fade-leave-active .type_item{
  transition: all .4s;
}
.fade-enter, .fade-leave-to,.fade-enter .type_item,.fade-leave-to .type_item{
  height: 0 !important;
  opacity: 0;
}
.position{
    position: relative;
    text-align: right;
    width:100%;
    height:.45rem;
    z-index: 100000;
    box-sizing: border-box;
    padding:0 .14rem;
}
.type{
  display: inline-block;
  width:.3rem;
  height:.45rem;
  background:url('../assets/img/toggle.png') center center/.2rem .2rem no-repeat;
  transition: all .3s;
  transform: rotateZ(0deg);
  cursor: pointer;
  z-index: 100000;
}
.type_list{
  position: fixed;
  top:.45rem;
  width:100%;
  height:calc(100% - .45rem);
  background:rgba(0,0,0,.5);
  border-top:.01rem solid #e1e1e1;
  z-index: 1000;
  .type_item{
    width:100%;
    height:.4rem;
    line-height:.4rem;
    padding-left:.3rem;
    font-size:.14rem;
    background: white;
    border-bottom:.01rem solid #e1e1e1;
  }
}
.up{
  transform: rotateZ(180deg) !important;
}
.checked{
    color:#ff8e28;
}
</style>
