<template>
  <section class="app-main" style="min-height: 100%">
    <div class="page-header">
      <breadcrumb class="breadcrumb-container"></breadcrumb>
      <page-info></page-info>
    </div>
    <transition name="fade" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb';
import PageInfo from '@/components/PageInfo';

export default {
  name: 'AppMain',
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
.page-header {
  background: #fff;
  padding: 16px 24px 0;
  border-bottom: 1px solid #e8e8e8;
}
</style>
