<template>
  <div class="page-info" v-if="title">
    <h1 class="title">{{title}}</h1>
    <div class="desc" v-if="desc">{{desc}}</div>
  </div>
</template>

<script>
export default {
  created() {
    this.getPageInfo();
  },
  data() {
    return {
      title: '',
      desc: '',
    };
  },
  watch: {
    $route() {
      this.getPageInfo();
    },
  },
  methods: {
    getPageInfo() {
      const matched = this.$route.matched.filter(item => item.name);
      const first = matched[matched.length - 1].meta;
      this.title = first.title || '';
      this.desc = first.desc || '';
    },
  },
};
</script>

<style lang="scss">
.page-info {
  .title {
    margin: 0 0 16px 0;
    font-size: 20px;
    font-weight: 500;
    color: rgba(0, 0, 0, .85);
  }
  .desc {
    font-size: 14px;
    line-height: 1;
    color: rgba(0, 0, 0, .65);
    margin-bottom: 16px;
  }
}
</style>
