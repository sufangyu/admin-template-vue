<template>
  <div class="zip-export">
    <el-card shadow="hover" class="card-bottom">
      <el-form ref="form" label-position="right" label-width="50px">
        <el-row :gutter="10">
          <el-col :xs="16" :sm="16" :md="12" :lg="12" :xl="12">
            <el-form-item label="名称">
              <el-input v-model="filename"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="12" :lg="12" :xl="12">
            <el-button
              type="primary"
              :loading="downloadLoading"
              @click="handleDownload"
            >
              导出Zip
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-table
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
    >
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
    async handleDownload() {
      this.downloadLoading = true;
      const zip = await import('@/vendor/Export2Zip');
      const tHeader = ['ID', 'Title', 'Author', 'Readings', 'Date'];
      const filterVal = ['id', 'title', 'author', 'pv', 'created_at'];
      const list = this.list;
      const data = this.formatJson(filterVal, list);
      zip.export_txt_to_zip(tHeader, data, this.filename, this.filename);
      this.downloadLoading = false;
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
.zip-export {
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
