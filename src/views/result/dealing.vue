<template>
  <div class="result-demo">
    <el-card shadow="hover" class="card-bottom">
      <result
        type="dealing"
        title="等待处理"
        message="已提交申请，等待银行处理"
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
