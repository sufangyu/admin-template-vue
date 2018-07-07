<template>
  <span class="tag-status">
    <span
      class="tag-status-dot"
      :class="statusClass"
      :style="{
        backgroundColor: color,
      }"
    ></span>
    <span class="tag-status-text" v-if="text">{{text}}</span>
  </span>
</template>

<script>
export default {
  name: 'TagStatus',
  props: {
    status: {
      type: String,
      default: 'default',
    },
    text: {
      type: String,
      default: '',
    },
    // 自定义颜色
    color: {
      type: String,
      default: '',
    },
  },
  computed: {
    statusClass() {
      if (this.color !== '') {
        return '';
      }

      return `tag-status-dot-${this.status}`;
    },
  },
};
</script>

<style lang="scss">
.tag-status {
  font-size: 14px;
  color: rgba(0,0,0,.65);
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
  display: inline-block;
  line-height: inherit;
  vertical-align: baseline;

  &-dot {
    width: 6px;
    height: 6px;
    display: inline-block;
    border-radius: 50%;
    vertical-align: middle;
    position: relative;
    top: -1px;


    &-default {
      background-color: #d9d9d9;
    }
    &-success {
      background-color: #52c41a;
    }
    &-processing {
      background-color: #1890ff;
    }
    &-error {
      background-color: #f5222d;
    }
    &-warning {
      background-color: #faad14;
    }
  }

  &-text {
    color: rgba(0,0,0,.65);
    font-size: 14px;
    margin-left: 8px
  }
}
</style>
