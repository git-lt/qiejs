import Vue from 'vue';
import App from './index.vue';
import vueWechatTitle from 'vue-wechat-title';
import '@/assets/style/commom.styl';
Vue.use(vueWechatTitle);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
