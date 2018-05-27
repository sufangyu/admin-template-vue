import Cookies from 'js-cookie';

const app = {
  state: {
    device: 'desktop',
    language: Cookies.get('language') || 'en',
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false,
    },
  },
  getters: {
    sidebar: state => state.sidebar,
    language: state => state.language,
    device: state => state.device,
  },
  actions: {
    // 切换 侧边菜单栏隐藏/显示
    toggleSidebar({ commit }) {
      commit('TOGGLE_SIDEBAR');
    },
    // 隐藏 侧边菜单栏
    closeSidebar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation);
    },
    // 显示 侧边菜单栏
    openSidebar({ commit }, { withoutAnimation }) {
      commit('OPEN_SIDEBAR', withoutAnimation);
    },
    // 切换 当前浏览器设备 mobile/desktop
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device);
    },
    // 设置 当前语言
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language);
    },
  },
  mutations: {
    TOGGLE_SIDEBAR: (state) => {
      // sidebarStatus =>>  0: 显示; 1: 隐藏
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1);
      } else {
        Cookies.set('sidebarStatus', 0);
      }
      state.sidebar.opened = !state.sidebar.opened;
      state.sidebar.withoutAnimation = false;
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1);
      state.sidebar.opened = false;
      state.sidebar.withoutAnimation = withoutAnimation;
    },
    OPEN_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 0);
      state.sidebar.opened = true;
      state.sidebar.withoutAnimation = withoutAnimation;
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device;
    },
    SET_LANGUAGE: (state, language) => {
      Cookies.set('language', language);
      state.language = language;
    },
  },
};

export default app;
