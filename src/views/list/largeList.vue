<template>
  <div class="table-demo">

    <el-card shadow="hover" class="card-bottom card-header-border-none">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">大量数据列表</h3>
      </div>

      <div class="table-list">
        <div class="table-list-wrapper">
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
            </el-table-column>
          </el-table>

          <div class="list-footer">
            <div class="list-footer-left"></div>
            <div class="list-footer-right">
              <el-pagination
                background
                :total="total"
                :current-page="page"
                :page-size="size"
                :layout="pagination.layout"
                :page-sizes="pagination.pageSizes"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
              >
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </el-card>

  </div>
</template>

<script>
import { arraySplit } from '@/utils/array';

// 模拟请求放回数据
const getList = (query = {}) => {
  const tmp = [];
  const len = 508;
  let index = 100;

  for (let i = 0; i < len; i += 1) {
    index += 1;
    const item = {
      id: index,
      date: '2016-05-03',
      name: '王小虎',
      address: `上海市普陀区金沙江路 1518 弄 - [${index}]`,
    };

    tmp.push(item);
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'success',
        data: {
          list: tmp,
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
      page: 1,
      size: 20,
      total: 0,
      pagination: {
        pageSizes: [10, 20, 30, 40],
        layout: 'total, sizes, prev, pager, next, jumper',
      },
      listAll: [],
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
          this.listAll = res.data.list;
          const listTmp = arraySplit(this.listAll, this.size);
          this.list = listTmp[0];
          this.page = 1;
          this.total = this.listAll.length;
        }
      } catch (error) {
        console.log('getList error =>>', error);
      }
    },
    /**
     * 在全部数据中获取列表数据
     *
     * @param {number} page 页码
     * @param {number} size 每页条数
     */
    getListInFrontend(page, size) {
      this.loading = true;
      const listTmp = arraySplit(this.listAll, size);
      this.list = listTmp[page - 1];
      this.loading = false;
    },
    // 设置 pagination size
    handleSizeChange(val) {
      this.page = 1;
      this.size = val;
      this.getListInFrontend(this.page, this.size);
    },
    // 设置 pagination page
    handleCurrentChange(val) {
      this.page = val;
      this.getListInFrontend(this.page, this.size);
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
