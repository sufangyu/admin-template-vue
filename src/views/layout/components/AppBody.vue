<template>
  <section class="app-layout-body">
    <div class="page-header" v-if="pageHeader.length > 1">
      <breadcrumb v-if="pageHeader.includes('breadcrumb')" class="page-breadcrumb" />
      <page-info v-if="pageHeader.includes('pageInfo')" />
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
  data() {
    return {
      pageHeader: ['breadcrumb', 'pageInfo'],
    };
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
  watch: {
    $route() {
      // 初始化赋值
      this.pageHeader = ['breadcrumb', 'pageInfo'];
      this.getRouteMeta();
    },
  },
  created() {
    this.getRouteMeta();
  },
  methods: {
    getRouteMeta() {
      const matched = this.$route.matched.filter(item => item.name);
      const first = matched[matched.length - 1].meta;
      // 是否显示整个页面信息
      if (first.pageHeader && first.pageHeader.constructor !== Array) {
        console.warn(`${first.title}'s pageHeader config was't array`);
      } else if (first.pageHeader !== undefined) {
        this.pageHeader = first.pageHeader;
      }
    },
  },
};
</script>

<style lang="scss">
.app-layout-body {
  height: calc(100% - 64px - 40px);
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
