<template>
  <div class="result">
    <div :class="{'result-pic': true, 'result-pic-image': image}" v-if="iconName || image">
      <icon-svg :name="iconName" v-if="iconName"></icon-svg>
      <img :src="image" v-if="image" />
    </div>
    <div class="result-title">{{title}}</div>
    <div class="result-message" v-if="message || hasmessage">
      <slot name="message">{{message}}</slot>
    </div>
    <div class="result-extra" v-if="hasExtra">
      <slot name="extra"></slot>
    </div>
    <div class="result-actions" v-if="hasActions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
import IconSvg from '@/components/IconSvg';

export default {
  name: 'Result',
  components: {
    IconSvg,
  },
  props: {
    type: {
      type: String,
    },
    image: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    extra: {
      type: String,
    },
    actions: {
      type: String,
    },
  },
  data() {
    return {
      hasmessage: !!this.$slots.message,
      hasActions: !!this.$slots.actions,
      hasExtra: !!this.$slots.extra,
    };
  },
  computed: {
    iconName() {
      let iconName;
      switch (this.type) {
        case 'success':
          iconName = 'checkCircle';
          break;
        case 'fail':
          iconName = 'crossCircle';
          break;
        case 'dealing':
          iconName = 'dealing';
          break;
        case 'waring':
          iconName = 'waring';
          break;
        default:
          iconName = '';
          break;
      }
      return iconName;
    },
  },
};
</script>

<style lang="scss">
$icon-size: 72px;

.result {
  margin: 0 auto;
  max-width: 540px;
  padding: 30px 0 20px;
  text-align: center;

  &-pic {
    font-size: $icon-size;
    line-height: $icon-size;
    margin-bottom: 24px;

    &-image {
      line-height: 0;
      font-size: 0;

      img {
        width: $icon-size;
        height: $icon-size;
      }
    }
  }

  &-title {
    font-size: 24px;
    color: rgba(0,0,0,.85);
    font-weight: 500;
    line-height: 32px;
    margin-bottom: 16px;
  }

  &-message {
    font-size: 14px;
    line-height: 22px;
    color: rgba(0,0,0,.45);
  }

  &-actions {
    margin-top: 24px;
  }

  &-extra {
    background: #fafafa;
    padding: 24px 30px;
    border-radius: 2px;
    text-align: left;
    line-height: 1.6;
    margin-top: 24px;
  }
}
</style>
