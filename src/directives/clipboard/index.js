import Clipboard from './clipboard';

const install = (Vue) => {
  Vue.directive('Clipboard', Clipboard);
};

/* eslint-disable no-undef */
if (window.Vue) {
  window.clipboard = Clipboard;
  Vue.use(install);
}

Clipboard.install = install;
export default Clipboard;
