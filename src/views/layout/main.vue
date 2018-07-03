<template>
  <div class="app-layout" :class="classObj">
    <div
      class="drawer-bg"
      v-if="device==='mobile' && sidebar.opened"
      @click="handleClickOutside"
    />
    <sidebar class="app-layout-sidebar" />
    <div class="app-layout-main">
      <app-header />
      <app-body />
    </div>
  </div>
</template>

<script>
import { AppHeader, Sidebar, AppBody } from './components';
import ResizeMixin from './mixin/ResizeHandler';

export default {
  name: 'layout',
  components: {
    AppHeader,
    Sidebar,
    AppBody,
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    classObj() {
      return {
        mobile: this.device === 'mobile',
        pad: this.device === 'pad',
        desktop: this.device === 'desktop',
        'hide-sidebar': !this.sidebar.opened,
        'without-animation': this.sidebar.withoutAnimation,
      };
    },
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('closeSidebar', { withoutAnimation: false });
    },
  },
};
</script>

<style lang="scss">
@import "src/styles/mixin.scss";
@import "src/styles/var.scss";
// $app-header-height : 64px;
// $sidebar-width     : 236px;
// $sidebar-width-min : 80px;

.app-layout {
  @include clearfix;

  position: relative;
  height: 100%;
  width: 100%;
  background: #f0f2f5;
}
.drawer-bg {
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.app-layout-main {
  height: 100%;
  margin-left: $sidebar-width;
  transition: margin-left .28s;
}
</style>
