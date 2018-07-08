<template>
  <div>
    <div class="filter-container">
      <el-checkbox-group v-model="formTheadProp" @change="handleChangeCheckboxGroup">
        <el-checkbox
          v-for="item in filterFormThead"
          :label="item.prop"
          :key="item.prop"
        >{{item.label}}</el-checkbox>
      </el-checkbox-group>
    </div>

    <el-table :data="tableData" :key='key' border fit highlight-current-row style="width: 100%">
      <el-table-column prop="id" label="# ID" width="100" align="center"></el-table-column>
      <el-table-column
        v-for='item in formThead'
        :key='item.prop'
        :prop="item.prop"
        :label="item.label"
      >
        <template slot-scope="scope">{{scope.row[item.prop]}}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
const filterFormThead = [
  { label: '日期', prop: 'date' },
  { label: '姓名', prop: 'name' },
  { label: '地址', prop: 'address' },
];
const defaultFormThead = filterFormThead.filter((item, index) => index < 2);

export default {
  data() {
    return {
      tableData: [
        {
          id: '1001',
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          id: '1002',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          id: '1003',
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          id: '1004',
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          id: '1005',
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
      ],
      key: 1, // table key
      filterFormThead,
      formTheadProp: defaultFormThead.map(item => item.prop),
      formThead: defaultFormThead, // 默认表头 Default header
    };
  },
  methods: {
    handleChangeCheckboxGroup(groupVal) {
      const result = this.filterFormThead.filter(item => groupVal.includes(item.prop));
      this.formThead = result;
      this.key = this.key + 1;
    },
  },
};
</script>

<style>
.filter-container {
  padding-bottom: 10px;
}
</style>
