import Vue from 'vue';
import App from './App';
import store from './store';
import * as filters from './filters';
import dsbirdge from './js_sdk/dsbirdge.js';

Vue.config.productionTip = false;

Vue.prototype.$store = store;
Vue.prototype.$backgroundAudioData = {
  playing: false,
  playTime: 0,
  formatedPlayTime: '00:00:00'
};
Vue.prototype.$adpid = "1111111111";

Vue.prototype.$jsBridge = dsbirdge;

// 全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

App.mpType = 'app';

const app = new Vue({
  store,
  ...App
});
app.$mount();
