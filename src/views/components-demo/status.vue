<template>
  <div class="status-demo">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <el-card shadow="hover" class="card-bottom card-header-border-none">
          <div slot="header" class="card-header clearfix">
            <h3 class="card-header-title">标签状态</h3>
          </div>
          <div>
            <status status="success" text="成功"></status>
            <status status="error" text="失败"></status>
            <status status="default" text="默认"></status>
            <status status="processing" text="处理中"></status>
            <status status="warning" text="警告"></status>
            <status color="#000" text="自定义颜色"></status>
            <br />
            <br />
            <status status="processing" text="默认标签"></status>
            <status status="processing" text="中等标签" size="medium"></status>
            <status status="processing" text="小型标签" size="small"></status>
            <status status="processing" text="超小标签" size="mini"></status>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <el-card shadow="hover" class="card-bottom card-header-border-none">
          <div slot="header" class="card-header clearfix">
            <h3 class="card-header-title">状态点</h3>
          </div>
          <div>
            <status type="dot" status="success"></status>
            <status type="dot" status="error"></status>
            <status type="dot" status="default"></status>
            <status type="dot" status="processing"></status>
            <status type="dot" status="warning"></status>
            <br />
            <br />
            <status type="dot" status="success" text="成功"></status>
            <br />
            <status type="dot" status="error" text="失败"></status>
            <br />
            <status type="dot" status="default" text="默认"></status>
            <br />
            <status type="dot" status="processing" text="处理中"></status>
            <br />
            <status type="dot" status="warning" text="警告"></status>
            <br />
            <status type="dot" color="#000" text="自定义颜色"></status>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Status from '@/components/Status';

export default {
  components: {
    Status,
  },
};
</script>

<style lang="scss">
.status-demo .status-type-tag {
  margin: 3px 0;
}
.status-demo .status-type-tag + .status-type-tag {
  margin-left: 8px;
}
</style>
