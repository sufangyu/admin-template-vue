<template>
  <div class="result-demo">
    <el-card shadow="hover" class="card-bottom">
      <result
        type="fail"
        title="支付失败"
        message="请核对并修改以下信息后，再重新提交。"
      >
        <div class="info" slot="extra">
          <div style="font-size: 18px; margin-bottom: 20px;">您提交的内容有如下错误：</div>
          <p style="margin-bottom: 10px;">
            您的账户已被冻结
            <a style="margin-left: 16px;">立即解冻 <i class="el-icon-arrow-right"></i></a>
          </p>
          <p style="margin-bottom: 10px;">
            您的账户还不具备申请资格
            <a style="margin-left: 16px;">立即升级 <i class="el-icon-arrow-right"></i></a>
          </p>
        </div>
        <div slot="actions">
          <el-button size="small" type="primary">返回修改</el-button>
          <el-button size="small">联系客服</el-button>
        </div>
      </result>
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
