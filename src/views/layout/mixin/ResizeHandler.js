import store from '@/store';

const { body } = document;
const PAD_WIDTH = 992;
const MOBILE_WIDTH = 769;
const RATIO = 0;

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
    this.checkAppStatus();
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
        this.checkAppStatus();
      }
    },
    checkAppStatus() {
      const isMobile = this.isMobile();
      const isPad = this.isPad();

      if (isMobile) {
        store.dispatch('toggleDevice', 'mobile');
        store.dispatch('closeSidebar', { withoutAnimation: true });
      } else if (isPad) {
        store.dispatch('toggleDevice', 'pad');
        store.dispatch('closeSidebar', { withoutAnimation: true });
      } else {
        store.dispatch('toggleDevice', 'desktop');
        store.dispatch('openSidebar', { withoutAnimation: false });
      }
    },
  },
};
