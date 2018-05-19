<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="用函数的剪贴板" name="directly">
        <el-input
          v-model="inputData"
          placeholder="Please input"
          style='width: 400px;'
        ></el-input>
        <el-button
          type="primary"
          icon="document"
          @click='handleCopy(inputData, $event)'
        >
          copy
        </el-button>
      </el-tab-pane>
      <el-tab-pane label="用指令的剪贴板" name="v-directive">
        <el-input
          v-model="inputData"
          placeholder="Please input"
          style='width: 400px;'
        ></el-input>
        <el-button
          type="primary"
          icon="document"
          v-clipboard:copy='inputData'
          v-clipboard:success='clipboardSuccess'
        >
          copy
        </el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import clip from '@/utils/clipboard';
import clipboard from '@/directives/clipboard';

export default {
  name: 'clipboardDemo',
  directives: {
    clipboard,
  },
  data() {
    return {
      activeName: 'directly',
      inputData: '被复制的文本内容: A55aD8',
    };
  },
  methods: {
    handleCopy(text, event) {
      clip(text, event);
    },
    clipboardSuccess() {
      this.$message({
        message: '复制成功',
        type: 'success',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  padding: 30px;
}
</style>

