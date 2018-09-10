import bounceComponent from './bounce.vue'
const bounce = {
    install:function(Vue){
        Vue.component('bounce',bounceComponent);
    }
}
export default bounce