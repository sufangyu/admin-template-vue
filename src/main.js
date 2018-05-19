// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import VueAwesomeSwiper from 'vue-awesome-swiper';
// import 'swiper/dist/css/swiper.css';

import App from './App';
import router from './router';
import store from './store';
import './permission'; // permission control
import * as filters from './filters'; // global filters

Vue.config.productionTip = false;

// register global filters.
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

// register global component
Vue.use(ElementUI);
// Vue.use(VueAwesomeSwiper);

// import all svg
const requireAll = (requireContext) => {
  requireContext.keys().map(requireContext);
};
const req = require.context('@/assets/svg', true, /\.svg$/);
requireAll(req);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
