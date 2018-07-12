<template>
  <div class="exception-demo">
    <exception
      :image="require('@/assets/500.svg')"
      title="500"
      description="服务器错误，请联系管理员~"
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
