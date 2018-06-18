<template>
  <div class="result-demo">
    <el-card shadow="hover">
      <result
        type="success"
        title="提交成功"
        message="提交结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用 Message 全局提示反馈即可"
      >
        <div class="info" slot="extra">
          <div style="font-size: 18px; margin-bottom: 20px;">项目名称</div>
          <p>项目 ID：23421</p>
          <p>负责人：曲丽丽</p>
          <p>生效时间：2016-12-12 ~ 2017-12-12</p>
        </div>
        <div slot="actions">
          <el-button size="small" type="primary">返回列表</el-button>
          <el-button size="small">查看项目</el-button>
          <el-button size="small">打印</el-button>
        </div>
      </result>
    </el-card>

    <el-card shadow="hover">
      <result
        :image="image"
        title="支付成功"
        message="提交结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用 Message 全局提示反馈即可"
      >
        <div slot="message">998.00元 <del>1098元</del></div>
      </result>
    </el-card>

    <el-card shadow="hover">
      <result
        type="success"
        title="验证成功"
        message="所提交内容已成功完成验证"
      ></result>
    </el-card>
  </div>
</template>

<script>
import Result from '@/components/Result';
import image from '@/assets/alipay.svg';

export default {
  components: {
    Result,
  },
  data() {
    return {
      image,
    };
  },
};
</script>

<style lang="scss">
.result-demo {
  .el-card {
    margin-bottom: 25px;
  }
}
</style>
