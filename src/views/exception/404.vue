<template>
  <div class="exception-demo">
    <exception
      :image="require('@/assets/404.svg')"
      title="咦~页面不见了~"
      description="请核对您输入的页面地址是否正确哦~"
      :hasGoback="false"
    ></exception>
  </div>
</template>

<script>
import Exception from '@/components/Exception';

export default {
  components: {
    Exception,
  },
};
</script>
