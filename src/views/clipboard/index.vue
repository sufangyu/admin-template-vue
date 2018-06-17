<template>
  <div class="clipboard-demo">
    <el-card shadow="hover">
      <el-tabs v-model="activeName">
        <el-tab-pane label="用函数的剪贴板" name="directly">
          <el-row :gutter="10">
            <el-col :span="18">
              <el-input
                v-model="inputData"
                placeholder="Please input"
              ></el-input>
            </el-col>
            <el-col :span="6">
              <el-button
                type="primary"
                @click='handleCopy(inputData, $event)'
                style='width: 100%;'
              >
                复制
              </el-button>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="用指令的剪贴板" name="v-directive">
          <el-row :gutter="10">
            <el-col :span="18">
              <el-input
                v-model="inputData"
                placeholder="Please input"
              ></el-input>
            </el-col>
            <el-col :span="6">
              <el-button
                type="primary"
                v-clipboard:copy='inputData'
                v-clipboard:success='clipboardSuccess'
                style='width: 100%;'
              >
                复制
              </el-button>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-card>
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
