// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import VCharts from 'v-charts';
import 'element-ui/lib/theme-chalk/index.css';
import IconSvg from '@/components/IconSvg';

import App from './App';
import router from './router';
import store from './store';
import i18n from './lang'; // international

import './permission'; // permission control
import * as filters from './filters';
import * as directives from './directives';

Vue.config.productionTip = false;


// register global filters.
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

// register global directives.
Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key]);
});

// use components
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value),
});
Vue.use(VCharts);

// register global components
Vue.component('icon-svg', IconSvg);


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
  i18n,
  components: { App },
  template: '<App/>',
});
