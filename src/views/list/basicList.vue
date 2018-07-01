<template>
  <div class="base-list">
    <el-card shadow="hover" class="card-bottom card-header-border-none">
      <el-row>
        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
          <div class="list-summay">
            <span>我的待办</span>
            <p>8个任务</p>
            <em></em>
          </div>
        </el-col>
        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
          <div class="list-summay">
            <span>本周任务平均处理时间</span>
            <p>32分钟</p>
            <em></em>
          </div>
        </el-col>
        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
          <div class="list-summay">
            <span>本周完成任务数</span>
            <p>24个任务</p>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-card shadow="hover" class="card-bottom card-header-border-none">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">标准列表</h3>
        <div class="card-header-right">
          <el-radio-group v-model="query.status" size="small">
            <el-radio-button
              class="query-filter"
              v-for="item in queryOptions.status"
              :key="item.label"
              :label="item.label"
            >{{item.name}}</el-radio-button>
          </el-radio-group>
          <el-input
            class="query-search"
            size="small"
            placeholder="请输入"
            suffix-icon="el-icon-search"
            v-model="query.search"
          ></el-input>
        </div>
      </div>

      <div class="list-operator">
        <el-button size="small" icon="el-icon-plus" style="width: 100%;">添加</el-button>
      </div>

      <div class="bast-list">
        <div class="bast-list-wrapper">
          <el-table
            style="width: 100%"
            :show-header="false"
            ref="listBasic"
            :data="list"
            v-loading="loading"
          >
            <el-table-column
              label="信息"
              min-width="450"
            >
              <template slot-scope="scope">
                <div class="list-item-meta">
                  <div class="list-item-meta-image">
                    <img :src="scope.row.image" alt="" />
                  </div>
                  <div class="list-item-meta-content">
                    <h4 class="list-item-meta-title">{{scope.row.title}}</h4>
                    <div class="list-item-meta-description">{{scope.row.detail}}</div>
                  </div>
                </div>
              </template>
            </el-table-column>

            <el-table-column
              label="开发者"
              align="right"
              width="125"
            >
              <template slot-scope="scope">
                <div class="list-item-extra">
                  <span>Owner</span>
                  <p>{{scope.row.owner || '-'}}</p>
                </div>
              </template>
            </el-table-column>

            <el-table-column
              label="开始时间"
              align="right"
              width="145"
            >
              <template slot-scope="scope">
                <div class="list-item-extra">
                  <span>开始时间</span>
                  <p>{{scope.row.startDate}}</p>
                </div>
              </template>
            </el-table-column>

            <el-table-column
              label="操作"
              width="165"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  size="medium"
                  type="text"
                  @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button>
                <el-dropdown placement="bottom">
                  <el-button size="medium" type="text">
                    更多
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      @click.native="handleDel(scope.$index, scope.row)"
                    >删除</el-dropdown-item>
                    <el-dropdown-item disabled>审核</el-dropdown-item>
                    <el-dropdown-item divided>回复</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
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
// 模拟请求放回数据
const getList = (query = {}) => {
  const data = [
    {
      id: '1001',
      image: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
      owner: '张三疯',
      startDate: '2018-06-24 20:35',
      title: 'Alipay',
      detail: '那是一种内在的东西， 他们到达不了，也无法触及的',
    },
    {
      id: '1002',
      image: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
      owner: '周星星',
      startDate: '2018-06-24 20:35',
      title: 'Angular',
      detail: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
    },
    {
      id: '1003',
      image: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
      owner: '林东东',
      startDate: '2018-06-24 20:35',
      title: 'Ant Design',
      detail: '生命就像一盒巧克力，结果往往出人意料',
    },
    {
      id: '1004',
      image: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
      owner: '付小小',
      startDate: '2018-06-24 20:35',
      title: 'Ant Design Pro',
      detail: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
    },
    {
      id: '1005',
      image: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
      owner: '张雪松',
      startDate: '2018-06-24 20:35',
      title: 'Bootstrap',
      detail: '那时候我只会想自己想要什么，从不想自己拥有什么',
    },
    {
      id: '1006',
      image: 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png',
      owner: '王少',
      startDate: '2018-06-24 20:35',
      title: 'Angular',
      detail: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
    },
    {
      id: '1007',
      image: 'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png',
      owner: '卿文卡',
      startDate: '2018-06-24 20:35',
      title: 'Vue',
      detail: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
    },
    {
      id: '1008',
      image: 'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png',
      owner: '付小小',
      startDate: '2018-06-24 20:35',
      title: 'Webpack',
      detail: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
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

// 查询数据的默认值
const defaults = {
  status: '1',
  page: 1,
};

export default {
  data() {
    return {
      query: {
        status: defaults.status,
        search: '',
      },
      queryOptions: {
        status: [
          { name: '全部', label: '1' },
          { name: '进行中', label: '2' },
          { name: '等待中', label: '3' },
        ],
      },
      page: defaults.page,
      size: 10,
      total: 0,
      pagination: {
        pageSizes: [10, 20, 30, 40],
        layout: 'total, sizes, prev, pager, next, jumper',
      },
      list: [],
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
      console.log('handleEdit =>>', index, row);
    },
    handleDel(index, row) {
      console.log('handleDel =>>', index, row);
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

<style lang="scss" scoped>
.list-summay {
  position: relative;
  text-align: center;

  > span {
    color: rgba(0,0,0,.45);
    display: inline-block;
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 4px;
  }

  > p {
    color: rgba(0,0,0,.85);
    font-size: 24px;
    line-height: 32px;
    margin: 0;
  }

  > em {
    background-color: #e8e8e8;
    position: absolute;
    height: 56px;
    width: 1px;
    top: 0;
    right: 0;
  }
}
@media screen and (max-width: 768px) {
  .list-summay {
    padding-top: 8px;
    padding-bottom: 8px;

    > em {
      display: none;
    }
  }
}

.list-item-meta {
  display: flex;

  &-image {
    width: 54px;
    height: 54px;
    min-width: 0;
    overflow: hidden;
    margin-right: 20px;

    img {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
  }
  &-content {
    flex: 1;
  }

  &-title {
    color: rgba(0,0,0,.65);
    margin-bottom: 4px;
    font-size: 14px;
    line-height: 22px;
  }

  &-description {
    font-size: 13px;
    line-height: 1.5;
    opacity: 0.8;
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
.list-item-extra {
  > span,
  > p {
    color: rgba(0,0,0,.45);
    vertical-align: middle;
    font-size: 13px;
  }
  > p {
    margin-top: 4px;
    margin-bottom: 0;
    line-height: 22px;
  }
}

.query-filter,
.query-search {
  display: inline-block;
}
.query-search {
  width: 240px;
}


@media screen and (max-width: 769px) {
  .query-search {
    display: block;
    margin-top: 8px;
  }
}
@media screen and (max-width: 361px) {
  .query-search {
    width: 190px;
  }
}
</style>
