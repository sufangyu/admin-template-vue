<template>
  <div class="table-demo">

    <el-card shadow="hover" class="card-bottom card-header-border-none">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">表格内编辑</h3>
      </div>

      <el-table
        style="width: 100%"
        border
        row-key="id"
        :data="list"
        v-loading="loading"
        class="drag-table"
      >
        <el-table-column
          label="ID"
          prop="id"
          width="70"
          align="center"
        ></el-table-column>

        <el-table-column
          label="日期"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 6px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="姓名"
          prop="name"
          width="120"
          align="center"
        ></el-table-column>

        <el-table-column
          label="地址"
          prop="address"
          min-width="250"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <div class="inline-edit">
                <el-input class="edit-input" size="small" v-model="scope.row.address"></el-input>
                <el-button
                  class='cancel-btn'
                  size="small"
                  type="warning"
                  @click="cancelEdit(scope.row)"
                >取消</el-button>
              </div>
            </template>
            <span v-else>{{ scope.row.address }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="操作"
          width="120"
        >
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.edit"
              type="success"
              @click="confirmEdit(scope.row)"
              size="small"
              icon="el-icon-circle-check-outline"
            >保存</el-button>
            <el-button
              v-else
              type="primary"
              @click='scope.row.edit=!scope.row.edit'
              size="small"
              icon="el-icon-edit"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>

<script>
// 模拟请求放回数据
const getList = (query = {}) => {
  const data = [
    {
      id: 1,
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    },
    {
      id: 2,
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    },
    {
      id: 3,
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    },
    {
      id: 4,
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    },
    {
      id: 5,
      date: '2016-05-08',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    },
    {
      id: 6,
      date: '2016-05-06',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    },
    {
      id: 7,
      date: '2016-05-07',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    },
    {
      id: 8,
      date: '2016-05-07',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    },
    {
      id: 9,
      date: '2016-05-07',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    },
    {
      id: 10,
      date: '2016-05-07',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    },
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'success',
        data: {
          list: data,
          page: query.page || 1,
          total: 100,
        },
      });
    }, 2500);
  });
};

export default {
  data() {
    return {
      list: [],
      loading: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取列表
    async getList() {
      if (this.loading) {
        return;
      }
      const query = {
        ...this.query,
        page: this.page,
        size: this.size,
      };
      this.loading = true;
      try {
        const res = await getList(query);
        this.loading = false;
        if (res.success) {
          this.list = res.data.list.map((item) => {
            this.$set(item, 'edit', false);
            item.originalAddress = item.address;
            return item;
          });
        }
      } catch (error) {
        console.log('getList error =>>', error);
      }
    },
    cancelEdit(row) {
      row.edit = false;
      row.title = row.originalTitle;
      this.$message({
        message: '已取消',
        type: 'warning',
      });
    },
    confirmEdit(row) {
      row.edit = false;
      row.originalTitle = row.title;
      this.$message({
        message: '地址已修改',
        type: 'success',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.inline-edit {
  display: flex;

  .edit-input {
    flex: 1;
  }
  .el-button {
    margin-left: 10px;
  }
}
</style>
