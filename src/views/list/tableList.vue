<template>
  <div class="table-list">
    <el-card shadow="hover" class="card-bottom card-header-border-none">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">查询条件</h3>
      </div>

      <div class="list-query">
        <el-form
          class="list-query-form"
          ref="queryForm"
          :inline="true"
          label-width="70px"
          :model="query"
        >
          <el-form-item label="关键词" prop="value">
            <el-input
              class="input-with-select"
              placeholder="输入关键词"
              v-model="query.value"
            >
              <el-select
                placeholder="选择类型"
                slot="prepend"
                v-model="query.type"
              >
                <el-option
                  v-for="item in queryOptions.type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="帐号状态" prop="status">
            <el-select
              placeholder="选择状态"
              v-model="query.status"
            >
              <el-option
                v-for="item in queryOptions.status"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="注册时间" prop="date">
            <el-date-picker
              v-model="query.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="['00:00:00', '23:59:59']"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="审批人" prop="approver">
            <el-input
              placeholder="输入审批人"
              v-model="query.approver"
            ></el-input>
          </el-form-item>

          <el-form-item class="form-buttons">
            <el-button
              type="primary"
              :loading="loading"
              @click="submitQueryForm('queryForm')"
            >查询</el-button>
            <el-button @click="resetQueryForm('queryForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card shadow="hover" class="card-bottom card-header-border-none">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">表格列表</h3>
        <div class="card-header-right">
          <el-button style="padding: 3px;" type="text">操作按钮</el-button>
        </div>
      </div>

      <div class="list-operator">
        <el-button size="small" icon="el-icon-plus" type="primary">立即创建</el-button>
        <el-button size="small" :disabled="selectionCount === 0">删除</el-button>
        <el-dropdown placement="bottom">
          <el-button size="small" :disabled="selectionCount === 0">
            更多操作
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>拒绝</el-dropdown-item>
            <el-dropdown-item>批量审核</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="table-list">
        <div class="table-list-alert">
          <el-alert
            type="info"
            show-icon
            :closable="false"
            title=""
          >
            <div class="alert-content">
              已选择<strong>{{selectionCount}}</strong>项
              <span class="action-line" @click="toggleSelection()">清空</span>
            </div>
          </el-alert>
        </div>

        <div class="table-list-wrapper">
          <el-table
            style="width: 100%"
            ref="multipleTable"
            border
            :data="list"
            v-loading="loading"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
              align="center"
            >
            </el-table-column>

            <el-table-column
              label="ID"
              prop="id"
              width="70"
              align="center"
            >
            </el-table-column>

            <el-table-column
              label="日期"
              width="135"
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
              width="100"
              align="center"
            >
            </el-table-column>

            <el-table-column
              label="地址"
              prop="address"
              min-width="250"
            >
            </el-table-column>

            <el-table-column
              label="操作"
              width="165"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button>
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleDeal(scope.$index, scope.row)"
                >审核</el-button>
              </template>
            </el-table-column>
          </el-table>

          <div class="list-footer">
            <div class="list-footer-left">
              <el-button size="small" :disabled="selectionCount === 0">删除</el-button>
            </div>
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
// 模拟请求放回数据
const getList = (query = {}) => {
  const data = [
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
    {
      id: '1006',
      date: '2016-05-06',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    },
    {
      id: '1007',
      date: '2016-05-07',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    },
    {
      id: '1008',
      date: '2016-05-07',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    },
    {
      id: '1009',
      date: '2016-05-07',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    },
    {
      id: '1010',
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
      query: {
        type: '1',
        value: '',
        status: '',
        date: '',
        approver: '',
      },
      queryOptions: {
        type: [
          { label: 'ID', value: '1' },
          { label: '用户名', value: '2' },
          { label: '邮箱', value: '3' },
          { label: '地址', value: '4' },
        ],
        status: [
          { label: '无效', value: '1' },
          { label: '有效', value: '2' },
        ],
      },
      page: 1,
      size: 10,
      total: 0,
      pagination: {
        pageSizes: [10, 20, 30, 40],
        layout: 'total, sizes, prev, pager, next, jumper',
      },
      list: [],
      multipleSelection: [],
      loading: false,
    };
  },
  computed: {
    selectionCount() {
      return this.multipleSelection.length;
    },
  },
  created() {
    this.getList();
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDeal(index, row) {
      console.log(index, row);
    },
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
      console.log('查询条件 =>>', query);
      this.loading = true;
      try {
        const res = await getList(query);
        this.loading = false;
        console.log(res);
        if (res.success) {
          const { list, page, total } = res.data;
          this.list = list;
          this.page = page;
          this.total = total;
        }
      } catch (error) {
        console.log('getList error =>>', error);
      }
    },
    // 查询
    submitQueryForm() {
      this.page = 1;
      this.getList();
    },
    // 重置
    resetQueryForm(formName) {
      this.$refs[formName].resetFields();
      this.getList();
    },
    // 表格勾选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 选择指定表格数据
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 设置 pagination size
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page = 1;
      this.size = val;
      this.getList();
    },
    // 设置 pagination page
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.getList();
    },
  },
};
</script>
