<template>
  <div
    class="hamburger"
    :class="{actived: isActive}"
    @click="toggleClick"
  >
    <icon-svg name="hamburger" />
  </div>
</template>

<script>
import IconSvg from '@/components/IconSvg';

export default {
  name: 'hamburger',
  components: {
    IconSvg,
  },
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    toggleClick: {
      type: Function,
      default: null,
    },
  },
};
</script>

<style lang="scss">
.hamburger {
  display: inline-block;
  cursor: pointer;
  transition: .35s;
  font-size: 24px;
  transform-origin: 50% 50%;
  padding: 0 18px;
  color: rgba(0, 0, 0, 0.6);
  transition: background-color 0.25s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &.actived {
    transform: rotate(-180deg);
  }
}
</style>
