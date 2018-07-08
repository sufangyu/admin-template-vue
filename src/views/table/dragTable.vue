<template>
  <div class="table-demo">

    <el-card shadow="hover" class="card-bottom card-header-border-none">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">可拖拽表格</h3>
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
        ></el-table-column>

        <el-table-column
          label="地址"
          prop="address"
          min-width="250"
        ></el-table-column>

        <el-table-column align="center" label="操作" width="80">
          <template slot-scope="scope">
            <span class='drag-handler'>
              <icon-svg name="drag"></icon-svg>
            </span>
          </template>
        </el-table-column>
      </el-table>

      <div class="result-arr">
        <div class='show-d'>旧列表ID : {{ oldList}}</div>
        <div class='show-d'>新列表ID : {{newList}}</div>
      </div>
    </el-card>

  </div>
</template>

<script>
import Sortable from 'sortablejs';

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

      sortable: null,
      oldList: [],
      newList: [],
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
        console.log(res);
        if (res.success) {
          this.list = res.data.list;

          this.oldList = this.list.map(v => v.id);
          this.newList = this.oldList.slice();
          this.$nextTick(() => {
            this.setSort();
          });
        }
      } catch (error) {
        console.log('getList error =>>', error);
      }
    },
    setSort() {
      const el = document.querySelectorAll('.drag-table > .el-table__body-wrapper > table > tbody')[0];
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        handle: '.drag-handler',
        animation: 150,
        setData: (dataTransfer, dragEl) => {
          dataTransfer.setData('Text', dragEl.textContent);
        },
        onEnd: (evt) => {
          const { oldIndex, newIndex } = evt;
          // update list
          const targetRow = this.list.splice(oldIndex, 1)[0];
          this.list.splice(newIndex, 0, targetRow);

          // for show the changes, you can delete in you code
          const tempRow = this.newList.splice(oldIndex, 1)[0];
          this.newList.splice(newIndex, 0, tempRow);
        },
      });
    },
  },
};
</script>

<style>
.sortable-ghost{
  opacity: 0.8;
  background: rgba(0, 0, 0, 0.2)!important;
}
</style>

<style lang="scss" scoped>
.table-demo {
  .drag-handler {
    cursor: pointer;
    cursor: -webkit-grabbing;

    > svg {
      width: 20px;
      height: 20px;
    }
  }

  .result-arr {
    margin-top: 25px;

    > div {
      padding: 5px 0;
    }
  }

}
</style>
