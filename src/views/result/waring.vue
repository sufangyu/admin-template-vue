<template>
  <div class="result-demo">
    <el-card shadow="hover" class="card-bottom">
      <result
        type="waring"
        title="无法完成操作"
        message="由于你的支付宝账户还未绑定淘宝账户请登请登录www.taobao.com"
      ></result>
    </el-card>
  </div>
</template>

<script>
import Result from '@/components/Result';

export default {
  components: {
    Result,
  },
};
</script>
