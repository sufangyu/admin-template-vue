<template>
  <div class="excel-export">
    <el-card shadow="hover" class="card-bottom">
      <el-form ref="form" label-position="right" label-width="60px">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
            <el-form-item label="文件名">
              <el-input v-model="filename"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="9" :md="8" :lg="6" :xl="6">
            <el-form-item label="自适应">
              <el-radio-group v-model="autoWidth" size="medium">
                <el-radio-button label="true" >是</el-radio-button>
                <el-radio-button label="false">否</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="5" :md="6" :lg="8" :xl="8">
            <el-button
              type="primary"
              :loading="downloadLoading"
              @click="handleDownload"
            >
              导出选择项
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-table
      :data="list"
      v-loading.body="listLoading"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
      border
      fit
      highlight-current-row
    >
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column align="center" label='ID' width="75">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{scope.row.author}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Readings" width="90" align="center">
        <template slot-scope="scope">
          {{scope.row.pv}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Date" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.created_at | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { parseTime } from '@/utils';
import { getArticleList } from '@/api/articles';

export default {
  data() {
    return {
      list: null,
      multipleSelection: [],
      listLoading: true,
      downloadLoading: false,
      filename: '' || 'filename',
      autoWidth: true,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.listLoading = true;
      try {
        const res = await getArticleList();
        this.listLoading = false;
        if (!res.success) {
          this.$message.error(res.message || '加载失败，请重试');
        } else {
          this.list = res.data;
        }
      } catch (error) {
        console.log('fetchData error', error);
        this.listLoading = false;
      }
    },
    handleSelectionChange(options) {
      this.multipleSelection = options;
      console.log(this.multipleSelection);
    },
    async handleDownload() {
      if (this.multipleSelection.length) {
        this.downloadLoading = true;
        const excel = await import('@/vendor/Export2Excel');
        const tHeader = ['ID', 'Title', 'Author', 'Readings', 'Date'];
        const filterVal = ['id', 'title', 'author', 'pv', 'created_at'];
        const list = this.multipleSelection;
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
        });
        this.downloadLoading = false;
      } else {
        this.$message.warning('请勾选要导出的数据');
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map((j) => {
        if (j === 'created_at') {
          return parseTime(v[j]);
        }
        return v[j];
      }));
    },
  },
};
</script>

<style lang="scss">
.excel-export {
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
