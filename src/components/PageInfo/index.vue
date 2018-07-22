<template>
  <div class="page-info" v-if="resTitle || resDesc || resExtra">
    <h1 class="title" v-if="resTitle">{{resTitle}}</h1>
    <div class="desc" v-if="resDesc">
      <slot name="desc">
        <p>{{resDesc}}</p>
      </slot>
    </div>
    <div class="extra" v-if="resExtra">
      <slot name="extra">
        {{resExtra}}
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: '',
    desc: '',
    extra: '',
  },
  data() {
    return {
      resTitle: '',
      resDesc: '',
      resExtra: '',
    };
  },
  watch: {
    $route() {
      this.getPageInfo();
    },
  },
  created() {
    this.getPageInfo();
  },
  methods: {
    getPageInfo() {
      const matched = this.$route.matched.filter(item => item.name);
      const first = matched[matched.length - 1].meta;
      this.resTitle = first.title || this.title;
      this.resDesc = first.desc || this.desc;
      this.resExtra = first.extra || this.extra;
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
    line-height: 1.2;
    color: rgba(0, 0, 0, .65);
    margin-bottom: 16px;

    p {
      margin: 0;
    }
  }

  .extra {
    color: rgba(0, 0, 0, .55);
    margin-bottom: 16px;
  }
}
</style>
