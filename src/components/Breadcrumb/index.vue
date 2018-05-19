<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in levelList"
        :key="item.path"
        v-if='item.meta.title'
      >
        <span
          v-if='item.redirect==="noredirect" || index==levelList.length-1'
          class="no-redirect"
        >{{item.meta.title}}</span>
        <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  created() {
    this.getBreadcrumb();
  },
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name);
      const first = matched[0];
      if (first && first.name !== 'dashboard') {
        matched = [{ path: '/dashboard', meta: { title: 'dashboard' } }].concat(matched);
      }
      this.levelList = matched;
    },
  },
};
</script>

<style lang="scss">
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  margin-bottom: 16px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }

  .el-breadcrumb__inner a,
  .el-breadcrumb__inner.is-link {
    color: rgba(0, 0, 0, 0.45);
    font-weight: 400;
  }

  .el-breadcrumb__inner a {
    &:hover {
      color: #409EFF
    }
  }

}
</style>
