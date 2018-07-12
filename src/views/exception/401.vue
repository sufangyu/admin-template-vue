<template>
  <div class="exception-demo">
    <exception
      :image="require('@/assets/401.svg')"
      title="401"
      description="抱歉，你无权访问该页面"
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
