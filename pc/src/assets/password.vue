<template>
    <div class="password" :ref="id">
        <input type="password" class="psw" data-id="1"  maxlength="1" @focus="focus" @click="collect" @keyup="keyup">
        <input type="password" class="psw" data-id="2"  maxlength="1" @focus="focus" @click="collect" @keyup="keyup">
        <input type="password" class="psw" data-id="3"  maxlength="1" @focus="focus" @click="collect" @keyup="keyup">
        <input type="password" class="psw" data-id="4"  maxlength="1" @focus="focus" @click="collect" @keyup="keyup">
        <input type="password" class="psw" data-id="5"  maxlength="1" @focus="focus" @click="collect" @keyup="keyup">
        <input type="password" class="psw" data-id="6"  maxlength="1" @focus="focus" @click="collect" @keyup="keyup">
    </div>
</template>

<script>
export default {
    props:['action','id'],
    data(){
        return {
            timer:null,
            password:'',
            psw:null,
            length:''
        }
    },
    methods:{
        focus(e){
            this.$emit('clean');
            // e.target.classList.add('focus')
        },
        // blur(e){
        //     this.$emit('lose')
            // e.target.classList.remove('focus')
        // },
        keyup(e){
            if(e.keyCode>=48&&e.keyCode<=57 || e.keyCode>=96&&e.keyCode<=105){
                /*输入0-9*/
                if(e.target.dataset.id == "6"){
                    e.target.focus();
                    this.calc();
                }else if(e.target.value.length == "1"){
                    this.next(e.target).focus();
                }
            }else if(e.keyCode=="8") {
                /*退格回删事件*/
                if(e.target.dataset.id == "1"){
                    e.target.focus();
                }else{
                    this.psw[this.length-1].focus()
                    this.psw[this.length-1].value = '';
                }
            }else if(e.keyCode=="9"||e.keyCode=="13"){
                /*输入非0-9*/
                e.target.focus();
            }else{
                e.target.value = '';
            }
            for(var i =0,len='';i<this.psw.length;i++){ len += this.psw[i].value;};
            this.length = len.length
        },
        collect(e){
            for(var i =0;i<this.psw.length;i++){
                this.password += this.psw[i].value
            }
            this.password.length == "6"?this.psw[5].focus() :this.psw[this.password.length].focus();
            this.password = "";
        },
        prev(curEle) {
            var flag = "getComputedStyle" in window;
            if (flag) {
                return curEle.previousElementSibling;
            }
            var pre = curEle.previousSibling;
            while (pre && pre.nodeType !== 1) {
                pre = pre.previousSibling;
            }
            return pre;
        },
        next(curEle) {
            var flag = 'getComputedStyle' in window;
            if (flag) {
                return curEle.nextElementSibling;
            }
            var nex = curEle.nextSibling;
            while (nex && nex.nodeType !== 1) {
                nex = nex.nextSibling;
            }
            return nex;
        },
        calc(){
            for(var i =0;i<this.psw.length;i++){ this.password += this.psw[i].value }
            this.password.length == "6"?this.action?this.action(this.password):'' :this.psw[this.password.length].focus();
            this.password = "";
        }
    },
    mounted(){
        this.psw = this.$refs[this.id].children
    }
}
</script>

<style scoped>
.password{
    display: inline-block;
    margin:0;
    width:100%;
    height: 100%;
}
.password input{
    display: inline-block;
    width:14%;
    outline: none;
    border-style:none;
    border-right:1px solid #d6d6d6;
    text-align:center;
    appearance: none;
    box-sizing: border-box;
    -webkit-appearance: none;
}
.password input:last-child{
    border:none;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    appearance: none; 
    margin: 0; 
}
/* 火狐 */
input{
    -moz-appearance:textfield;
}
input:disabled{
    background: white;
}
/* .focus{
    border:1px solid #83cdf8 !important;
} */
</style>
