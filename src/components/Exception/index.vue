<template>
  <div class="exception">
    <div class="exception-image" v-if="image">
      <slot name="image"><img :src="image" alt="title" /></slot>
    </div>
    <h1 class="exception-title" v-if="title">{{title}}</h1>
    <div class="exception-description" v-if="description">
      <slot name="description">{{description}}</slot>
    </div>
    <div class="exception-actions">
      <slot name="actions">
        <el-button @click="goback" v-if="hasGoback || gobackShow">上一页</el-button>
        <el-button type="primary">
          <router-link :to="{path: '/'}" replace exact tag="span">返回首页</router-link>
        </el-button>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Exception',
  props: {
    // 图片
    image: {
      type: String,
    },
    // 标题
    title: {
      type: String,
    },
    // 描述
    description: {
      type: String,
      default: '',
    },
    // 是否显示返回键
    hasGoback: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      gobackShow: true,
    };
  },
  created() {
    const { goback } = this.$route.query;
    this.gobackShow = goback === 'true';
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss">
.exception {
  max-width: 640px;
  padding: 80px 0 50px;
  text-align: center;
  margin: 0 auto;

  &-image {
    max-width: 200px;
    text-align: center;
    font-size: 0;
    margin: 0 auto 35px;

    img {
      display: inline-block;
      max-width: 100%;
    }
  }

  &-title {
    font-weight: 400;
    font-size: 42px;
    margin: 0 0 10px;
  }

  &-description {
    padding: 0;
    margin: 0;
    font-size: 22px;
    opacity: 0.6;
  }

  &-actions {
    margin-top: 35px;
  }
}
</style>
