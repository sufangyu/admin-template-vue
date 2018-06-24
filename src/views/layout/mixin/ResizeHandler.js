import store from '@/store';
import Cookies from 'js-cookie';

const { body } = document;
const RATIO = 0;
const PAD_WIDTH = 992;
const MOBILE_WIDTH = 769;
const SIDEBAR_IS_CLOSED__KEY = 'sidebar-closed';

export default {
  watch: {
    $route() {
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('closeSidebar', { withoutAnimation: false });
      }
    },
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler);
  },
  mounted() {
    this.setDevice();
    // 不存在侧边栏初始化, 设置初始化状态
    if (Cookies.get(SIDEBAR_IS_CLOSED__KEY) === undefined) {
      this.setSidebarStatus();
    }
  },
  methods: {
    isMobile() {
      const rect = body.getBoundingClientRect();
      return rect.width - RATIO < MOBILE_WIDTH;
    },
    isPad() {
      const rect = body.getBoundingClientRect();
      return rect.width - RATIO < PAD_WIDTH;
    },
    resizeHandler() {
      if (!document.hidden) {
        // 侧边栏当前是 min 状态, 则缩放浏览器时忽略检测 pc
        this.setSidebarStatus(!+Cookies.get(SIDEBAR_IS_CLOSED__KEY));
        this.setDevice();
      }
    },
    /**
     * 设置 设备标识信息
     *
     */
    setDevice() {
      const isMobile = this.isMobile();
      const isPad = this.isPad();

      if (isMobile) {
        store.dispatch('toggleDevice', 'mobile');
      } else if (isPad) {
        store.dispatch('toggleDevice', 'pad');
      } else {
        store.dispatch('toggleDevice', 'desktop');
      }
    },
    /**
     * 设置 侧边栏和设备
     *
     * @param {boolean} [isCheckPc=true]
     */
    setSidebarStatus(isCheckPc = true) {
      const isMobile = this.isMobile();
      const isPad = this.isPad();

      if (isMobile) {
        store.dispatch('closeSidebar', { withoutAnimation: true });
      } else if (isPad) {
        store.dispatch('closeSidebar', { withoutAnimation: true });
      } else if (isCheckPc) {
        store.dispatch('openSidebar', { withoutAnimation: false });
      }
    },
  },
};
