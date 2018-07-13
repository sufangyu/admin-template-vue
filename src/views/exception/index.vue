<template>
  <div>
    <el-card shadow="hover" class="el-card card-bottom card-header-border-none is-hover-shadow">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">请求返回状态码</h3>
      </div>
      <div>
        <el-button type="primary" @click="handleException(401)">401</el-button>
        <el-button type="primary" @click="handleException(403)">403</el-button>
        <el-button type="primary" @click="handleException(500)">500</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import getException from '@/api/exception';

export default {
  methods: {
    async handleException(status) {
      try {
        const res = await getException(status);
        console.log(res);
      } catch (error) {
        console.log('handleException error =>>', error);
      }
    },
  },
};
</script>
