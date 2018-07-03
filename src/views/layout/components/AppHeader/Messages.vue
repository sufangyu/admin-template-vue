<template>
  <div class="tabs-message" v-loading="loading">
    <el-tabs :stretch="true" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="`通知${notices.count !== 0 ? `(${notices.count})` : ''}`" name="notices">
        <div class="tabs-message-list">
          <div class="tabs-message-list-container" v-if="notices.count !== 0">
            <div class="item">
              <div class="item-img"><img src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png" alt=""></div>
              <div class="item-content">
                <div class="item-title">
                  <h4>你收到了 14 份新周报</h4>
                  <div class="extra"></div>
                </div>
                <div class="item-description">你收到了 14 份新周报</div>
                <div class="item-datetime">1 年前</div>
              </div>
            </div>
            <div class="item">
              <div class="item-img"><img src="https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png" alt=""></div>
              <div class="item-content">
                <div class="item-title">
                  <h4>你推荐的 曲妮妮 已通过第三轮面试</h4>
                  <div class="extra"></div>
                </div>
                <div class="item-description">你收到了 14 份新周报</div>
                <div class="item-datetime">1 年前</div>
              </div>
            </div>
            <div class="item">
              <div class="item-img"><img src="https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png" alt=""></div>
              <div class="item-content">
                <div class="item-title">
                  <h4>左侧图标用于区分不同的类型</h4>
                  <div class="extra"></div>
                </div>
                <div class="item-description">你收到了 14 份新周报</div>
                <div class="item-datetime">1 年前</div>
              </div>
            </div>
            <div class="item">
              <div class="item-img"><img src="https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png" alt=""></div>
              <div class="item-content">
                <div class="item-title">
                  <h4>你收到了 14 份新周报</h4>
                  <div class="extra"></div>
                </div>
                <div class="item-description">你收到了 14 份新周报</div>
                <div class="item-datetime">1 年前</div>
              </div>
            </div>
            <div class="item">
              <div class="item-img"><img src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png" alt=""></div>
              <div class="item-content">
                <div class="item-title">
                  <h4>你收到了 14 份新周报</h4>
                  <div class="extra"></div>
                </div>
                <div class="item-description">你收到了 14 份新周报</div>
                <div class="item-datetime">1 年前</div>
              </div>
            </div>
          </div>
          <div class="tabs-message-list-empty" v-else>
            <icon-svg name="bell"></icon-svg>
            <div>你已查看所有通知</div>
          </div>
          <div class="tabs-message-list-clear" @click="clear('notices')">清空通知</div>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="`消息${infos.count !== 0 ? `(${infos.count})` : ''}`" name="infos">
        <div class="tabs-message-list">
          <div class="tabs-message-list-container" v-if="infos.count !== 0">
            <div class="item" v-for="item in infos" :key="item.id">
              <div class="item-img"><img src="https://avatars1.githubusercontent.com/u/1852629?s=460&v=4" alt=""></div>
              <div class="item-content">
                <div class="item-title">
                  <h4>曲丽丽 评论了你</h4>
                  <div class="extra"></div>
                </div>
                <div class="item-description">这里是描述信息描述信息，描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息</div>
                <div class="item-datetime">1 年前</div>
              </div>
            </div>
          </div>
          <div class="tabs-message-list-empty" v-else>
            <icon-svg name="info"></icon-svg>
            <div>你已查看所有信息</div>
          </div>
          <div class="tabs-message-list-clear" @click="clear('infos')">清空消息</div>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="`待办${todos.count !== 0 ? `(${todos.count})` : ''}`" name="todos">
        <div class="tabs-message-list">
          <div class="tabs-message-list-container" v-if="todos.count !== 0">
            <div class="item">
              <div class="item-content">
                <div class="item-title">
                  <h4>任务名称</h4>
                  <div class="extra"><el-tag type="info" size="mini">未开始</el-tag></div>
                </div>
                <div class="item-description">任务需要在 2017-01-12 20:00 前启动</div>
              </div>
            </div>
            <div class="item">
              <div class="item-content">
                <div class="item-title">
                  <h4>第三方紧急代码变更</h4>
                  <div class="extra"><el-tag type="warning" size="mini">马上到期</el-tag></div>
                </div>
                <div class="item-description">冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务</div>
              </div>
            </div>
            <div class="item">
              <div class="item-content">
                <div class="item-title">
                  <h4>信息安全考试</h4>
                  <div class="extra"><el-tag type="success" size="mini">已耗时 8 天</el-tag></div>
                </div>
                <div class="item-description">指派竹尔于 2017-01-09 前完成更新并发布</div>
              </div>
            </div>
            <div class="item">
              <div class="item-content">
                <div class="item-title">
                  <h4>ABCD 版本发布</h4>
                  <div class="extra"><el-tag size="mini">进行中</el-tag></div>
                </div>
                <div class="item-description">冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务</div>
              </div>
            </div>
          </div>
          <div class="tabs-message-list-empty" v-else>
            <icon-svg name="todo"></icon-svg>
            <div>你已查看所有待办</div>
          </div>
          <div class="tabs-message-list-clear" @click="clear('todos')">清空待办</div>
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
        list: [],
        count: 0,
      },
      infos: {
        list: [],
        count: 0,
      },
      todos: {
        list: [],
        count: 10,
      },
    };
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
        console.log('getMessages');
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
        }
      } catch (error) {
        this.loading = false;
        console.log('getMessages catch error =>>', error);
      }
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    /*
     * 清空数据
     */
    clear(type) {
      if (this[type].list.length === 0) {
        return;
      }

      this[type].list = [];
      this[type].count = 0;
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
    padding: 50px 0;
    color: rgba(0,0,0,0.45);

    .icon-svg {
      font-size: 50px;
    // color: rgba(0,0,0,.35);
      margin-bottom: 15px;
    }
  }

  &-container {
    max-height: 380px;
    overflow-y: auto;

    .item {
      display: flex;
      padding: 10px 10px;
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
        margin-bottom: 4px;
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
        margin-top: 4px;
        line-height: 1.1;
        color: rgba(0,0,0,.45);
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
