<template>
  <section class="app-layout-body">
    <div class="page-header">
      <breadcrumb class="page-breadcrumb" />
      <page-info />
    </div>
    <div class="page-content">
      <!-- name=fade/fade-transform -->
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </section>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb';
import PageInfo from '@/components/PageInfo';

export default {
  name: 'AppBody',
  components: {
    Breadcrumb,
    PageInfo,
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      if (this.$route.name !== undefined) {
        return this.$route.name + +new Date();
      }

      return this.$route + +new Date();
    },
  },
};
</script>

<style lang="scss">
.app-layout-body {
  height: calc(100% - 64px);
  overflow-y: auto;
  overflow-x: hidden;
}
.page-header {
  background: #fff;
  padding: 16px 24px 0;
  border-bottom: 1px solid #e8e8e8;
}
.page-content {
  margin: 24px;
}

@media screen and (max-width: 576px) {
  .page-content {
    margin: 24px 0 24px;
  }
}
</style>
