<template>
  <div class="tabs-message" v-loading="loading">
    <el-tabs :stretch="true" v-model="activeName">
      <el-tab-pane :label="`通知${notices.count !== 0 ? `(${notices.count})` : ''}`" name="notices">
        <div class="tabs-message-list" v-if="notices.count !== 0">
          <div class="tabs-message-list-container">
            <div class="item" v-for="item in notices.list" :key="item.id">
              <div class="item-img">
                <img :src="item.avatar" alt="" />
              </div>
              <div class="item-content">
                <div class="item-title">
                  <h4>{{item.title}}</h4>
                  <div class="extra"></div>
                </div>
                <div class="item-description">{{item.detail}}</div>
                <div class="item-datetime">{{item.created_at}}</div>
              </div>
            </div>
          </div>
          <div class="tabs-message-list-clear" @click="clear('notices')">清空通知</div>
        </div>

        <div class="tabs-message-list-empty" v-else>
          <icon-svg name="notice"></icon-svg>
          <div>你已查看所有通知</div>
        </div>
      </el-tab-pane>

      <el-tab-pane :label="`消息${infos.count !== 0 ? `(${infos.count})` : ''}`" name="infos">
        <div class="tabs-message-list" v-if="infos.count !== 0">
          <div class="tabs-message-list-container">
            <div class="item" v-for="item in infos.list" :key="item.id">
              <div class="item-img"><img :src="item.avatar" alt=""></div>
              <div class="item-content">
                <div class="item-title">
                  <h4>{{item.title}}</h4>
                  <div class="extra"></div>
                </div>
                <div class="item-description">{{item.detail}}</div>
                <div class="item-datetime">{{item.created_at}}</div>
              </div>
            </div>
          </div>
          <div class="tabs-message-list-clear" @click="clear('infos')">清空消息</div>
        </div>

        <div class="tabs-message-list-empty" v-else>
          <icon-svg name="info"></icon-svg>
          <div>你已查看所有信息</div>
        </div>
      </el-tab-pane>

      <el-tab-pane :label="`待办${todos.count !== 0 ? `(${todos.count})` : ''}`" name="todos">
        <div class="tabs-message-list" v-if="todos.count !== 0">
          <div class="tabs-message-list-container">
            <div class="item" v-for="item in todos.list" :key="item.id">
              <div class="item-content">
                <div class="item-title">
                  <h4>{{item.title}}</h4>
                  <div class="extra">
                    <el-tag
                      :type="item.status | filterStatusType"
                      size="mini"
                    >
                      {{item.status | filterStatusText}}
                    </el-tag>
                  </div>
                </div>
                <div class="item-description">{{item.detail}}</div>
              </div>
            </div>
          </div>
          <div class="tabs-message-list-clear" @click="clear('todos')">清空待办</div>
        </div>
        <div class="tabs-message-list-empty" v-else>
          <icon-svg name="todo"></icon-svg>
          <div>你已查看所有待办</div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getUnreadMesages } from '@/api/global';

export default {
  props: {
    actived: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      firstActived: false, // 是否首次激活
      loading: false,
      activeName: 'notices',
      notices: {
        name: '通知',
        list: [],
        count: 0,
      },
      infos: {
        name: '信息',
        list: [],
        count: 0,
      },
      todos: {
        name: '待办',
        list: [],
        count: 10,
      },
    };
  },
  computed: {
    unreadCount() {
      return this.notices.count + this.infos.count + this.todos.count;
    },
  },
  filters: {
    filterStatusType(code) {
      const statusTypes = {
        1: 'info',
        2: 'success',
        3: 'warning',
        4: '',
      };
      return statusTypes[code] || '';
    },
    filterStatusText(code) {
      const statusTexts = {
        1: '未开始',
        2: '马上到期',
        3: '已延期',
        4: '进行中',
      };
      return statusTexts[code] || '未开始';
    },
  },
  methods: {
    async getMessages() {
      if (this.loading) {
        return;
      }

      // 解决首次打开时, tab 没有高亮第一项
      if (!this.firstActived) {
        this.activeName = 'notices';
        this.firstActived = true;
      }

      this.loading = true;
      try {
        const res = await getUnreadMesages();
        this.loading = false;
        console.log(res);
        if (res.success) {
          const { notices, infos, todos } = res.data;
          this.notices.list = notices;
          this.notices.count = notices.length;
          this.infos.list = infos;
          this.infos.count = infos.length;
          this.todos.list = todos;
          this.todos.count = todos.length;

          this.$emit('syncUnreadCount', this.unreadCount);
        }
      } catch (error) {
        this.loading = false;
        console.log('getMessages catch error =>>', error);
      }
    },
    /*
     * 清空数据
     */
    clear(type) {
      if (this[type].list.length === 0) {
        return;
      }

      const clearMap = this[type].list.map(item => item.id);
      console.log('clear messages =>>', clearMap);
      this.$message.success(`清空了${this[type].name}`);

      this[type].list = [];
      this[type].count = 0;

      this.$emit('syncUnreadCount', this.unreadCount);
    },
  },
};
</script>

<style lang="scss">
.tabs-message {
  margin: -12px;

  .el-loading-mask {
    background-color: rgba(255,255,255,0.65);
  }

  .el-tabs__header {
    margin-bottom: 5px;
  }
}
.tabs-message-list {

  &-clear {
    height: 46px;
    line-height: 46px;
    text-align: center;
    color: rgba(0,0,0,.65);
    border-radius: 0 0 4px 4px;
    border-top: 1px solid #e8e8e8;
    transition: all .3s;
    cursor: pointer;

    &:hover {
      color: #409EFF;
    }
  }

  &-empty {
    text-align: center;
    padding: 70px 0 80px;
    color: rgba(0,0,0,0.45);

    .icon-svg {
      font-size: 42px;
      opacity: 0.5;
      margin-bottom: 20px;
    }
  }

  &-container {
    max-height: 380px;
    overflow-y: auto;

    .item {
      display: flex;
      padding: 15px 15px;
      transition: 0.3s all;

      &:not(:last-child) {
        border-bottom: 1px solid #e8e8e8;
      }

      &:hover {
        cursor: pointer;
        background-color: rgba(0,0,0,.095);
      }

      &-img {
        width: 32px;
        height: 32px;
        margin-right: 16px;
        border-radius: 100%;
        background-color: rgba(0,0,0,.035);

        img {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 100%;
        }
      }

      &-content {
        flex: 1;
        min-width: 1px;
        color: rgba(0,0,0,.65);
      }

      &-title {
        margin-bottom: 8px;
        font-size: 14px;
        line-height: 1.1;
        display: flex;
        align-items: center;

        h4 {
          font-weight: 400;
          flex: 1;
        }
      }

      &-datetime {
        font-size: 12px;
        margin-top: 8px;
        line-height: 1.1;
        color: rgba(0,0,0,.35);
      }

      &-description {
        font-size: 12px;
        line-height: 1.5;
        color: rgba(0,0,0,.45);
      }

    }
  }
}
</style>
