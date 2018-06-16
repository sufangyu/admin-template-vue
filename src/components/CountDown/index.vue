<template>
  <el-button :type="type" @click="handleClick" :disabled="disabledArr">{{text}}</el-button>
</template>

<script>
let timer = null;

export default {
  props: {
    time: {
      type: Number,
      default: 10,
    },
    label: {
      type: String,
      default: '获取验证码',
    },
    disabled: {
      type: Boolean,
      default: true,
    },
    countDownTip: {
      type: String,
      default: 'S后重新获取',
    },
    type: {
      type: String,
      default: 'primary',
    },
  },
  data() {
    return {
      text: this.label,
      total: this.time,
      disabledArr: this.disabled,
    };
  },
  watch: {
    disabled(val) {
      this.disabledArr = val;
    },
  },
  methods: {
    handleClick() {
      if (this.disabledArr) {
        return;
      }

      this.disabledArr = true;
      this.countDown();
    },
    countDown() {
      clearTimeout(timer);
      if (this.total <= 0) {
        this.text = this.label;
        this.disabledArr = false;
        this.total = this.time;
      } else {
        this.text = `${this.total}${this.countDownTip}`;
        this.total -= 1;
        timer = setTimeout(() => {
          this.countDown();
        }, 1000);
      }
    },
  },
};
</script>
