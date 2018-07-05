<template>
  <span @click="handleClick">
    <icon-svg :name="iconName" />
  </span>
</template>

<script>
import screenfull from 'screenfull';
import IconSvg from '@/components/IconSvg';

export default {
  name: 'Fullscreen',
  components: {
    IconSvg,
  },
  props: {
    // 不可用的提示信息
    unusableMsg: {
      type: String,
      default: 'you browser can not work',
    },
  },
  data() {
    return {
      isFullscreen: false,
    };
  },
  computed: {
    iconName() {
      return this.isFullscreen ? 'exit-fullscreen' : 'fullscreen';
    },
  },
  created() {
    this.handleChangeFullscreen();
  },
  methods: {
    handleChangeFullscreen() {
      if (screenfull.enabled) {
        screenfull.on('change', () => {
          this.isFullscreen = screenfull.isFullscreen;
        });
      }
    },
    handleClick() {
      if (!screenfull.enabled) {
        this.$message.warning(this.unusableMsg);
        return;
      }

      screenfull.toggle();
    },
  },
};
</script>
