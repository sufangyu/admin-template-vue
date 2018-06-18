<template>
  <div>
  <upload-excel @success="handleSuccess" />
    <el-table
      class="table-excel"
      :data="tableData"
      border
      highlight-current-row
    >
      <el-table-column
        v-for='item of tableHeader'
        :prop="item"
        :label="item"
        :key='item'
        align="center"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import UploadExcel from '@/components/UploadExcel';

export default {
  components: {
    UploadExcel,
  },
  data() {
    return {
      tableData: [],
      tableHeader: [],
    };
  },
  methods: {
    handleSuccess({ results, header }) {
      this.tableData = results;
      this.tableHeader = header;
    },
  },
};
</script>

<style lang="scss">
.table-excel {
  margin-top: 25px;
}
</style>
