<template>
  <div class="tag-status-demo">
    <el-card shadow="hover" class="card-bottom card-header-border-none">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">状态点</h3>
      </div>
      <div>
        <tag-status status="success"></tag-status>
        <tag-status status="error"></tag-status>
        <tag-status status="default"></tag-status>
        <tag-status status="processing"></tag-status>
        <tag-status status="warning"></tag-status>
        <br />
        <br />
        <tag-status status="success" text="成功"></tag-status>
        <br />
        <tag-status status="error" text="失败"></tag-status>
        <br />
        <tag-status status="default" text="默认"></tag-status>
        <br />
        <tag-status status="processing" text="处理中"></tag-status>
        <br />
        <tag-status status="warning" text="警告"></tag-status>
        <br />
        <tag-status color="#000" text="自定义颜色"></tag-status>
      </div>
    </el-card>
  </div>
</template>

<script>
import TagStatus from '@/components/TagStatus';

export default {
  components: {
    TagStatus,
  },
};
</script>
