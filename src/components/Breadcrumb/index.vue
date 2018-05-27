<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in levelList"
        :key="item.path"
        v-if='item.meta.title'
      >
        <span
          v-if='item.redirect === "noredirect" || index==levelList.length-1'
          class="no-redirect"
        >
          {{item.meta.title}}
        </span>
        <router-link
          v-else :to="item.redirect ? `/${item.redirect}` : item.path"
          :data-redirect="item.redirect"
          :data-path="item.path"
        >
          {{item.meta.title}}
        </router-link>
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
        // matched = [{ path: '/dashboard', meta: { title: 'dashboard' } }].concat(matched);
        matched = [].concat(matched);
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
  color: rgba(0, 0, 0, 0.45);

  .no-redirect {
    cursor: text;
    color: inherit;
  }

  .el-breadcrumb__inner,
  .el-breadcrumb__inner a,
  .el-breadcrumb__inner.is-link {
    color: inherit;
    font-weight: 400;
  }

  .el-breadcrumb__inner a,
  .el-breadcrumb__inner.is-link {
    &:hover {
      color: #409EFF;
    }
  }

  .el-breadcrumb__item:last-child {
    color: #606266;
  }

}
</style>
