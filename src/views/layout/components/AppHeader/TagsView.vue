<template>
  <div class="tags-view-container">
    <scroll-pane class="tags-view-wrapper" ref="scrollPane">
      <router-link
        class="tags-view-item"
        :class="isActive(tag) ? 'active' : ''"
        ref="tag"
        v-for="tag in Array.from(visitedViews)"
        :to="tag"
        :key="tag.path"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        <icon-svg name="home" v-if="tag.name === homeRoute.name"></icon-svg>
        <template v-else>
          {{tag.title}}
          <span
            v-if="tag.name !== homeRoute.name"
            class="el-icon-close tags-close-button"
            @click.prevent.stop="closeSelectedTag(tag)"
            title="关闭"
          ></span>
        </template>
      </router-link>
    </scroll-pane>

    <div class="tags-view-tools">
      <span class="tools-shadow"></span>
      <div class="tags-view-tool" @click="openMenuByTool">
        <icon-svg name="tags"></icon-svg>
      </div>
    </div>

    <!-- tag contextmenu -->
    <ul
      class='contextmenu'
      v-show="visible"
      ref="contextmenu"
      :style="{
        left: left,
        top: top,
        right: right,
      }"
    >
      <li
        v-if="selectedTag.name !== homeRoute.name"
        @click="closeSelectedTag(selectedTag)"
      >关闭标签页</li>
      <li @click="closeOthersTags">关闭其他标签页</li>
      <li @click="closeAllTags">关闭全部标签页</li>
    </ul>
  </div>
</template>

<script>
import config from '@/config';
import ScrollPane from '@/components/ScrollPane';

export default {
  components: {
    ScrollPane,
  },
  data() {
    return {
      visible: false,
      top: '0',
      left: '0',
      right: 'auto',
      homeRoute: config.HOME_ROUTE,
      selectedTag: config.HOME_ROUTE,
    };
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews;
    },
  },
  watch: {
    $route() {
      this.addViewTags();
      this.getSelectedTag();
      // 滚动到当前 tag
      this.moveToCurrentTag();
    },
    // 监听右键菜单状态
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu);
      } else {
        document.body.removeEventListener('click', this.closeMenu);
      }
    },
  },
  mounted() {
    this.addViewTags();
    this.getSelectedTag();
  },
  methods: {
    addViewTags() {
      const route = this.generateRoute();
      if (!route) {
        return;
      }
      this.$store.dispatch('addVisitedViews', route);
    },
    // 关闭全部标签页
    closeAllTags() {
      this.$store.dispatch('delAllViews');
      this.$router.push('/');
    },
    // 关闭选中的以外其他标签页
    async closeOthersTags() {
      this.$router.push(this.selectedTag);
      await this.$store.dispatch('delOthersViews', this.selectedTag);
      this.moveToCurrentTag();
    },
    // 关闭选中的标签页
    async closeSelectedTag(view) {
      const views = await this.$store.dispatch('delVisitedViews', view);
      if (this.isActive(view)) {
        // 如果当前关闭的是 actived 便签页,
        // 则激活标签页数组最后一项, 不存在最后一项则激活首页
        const latestView = views.slice(-1)[0];
        if (latestView) {
          this.$router.push(latestView);
        } else {
          this.$router.push('/');
        }
      }
    },
    // 关闭右键菜单
    closeMenu() {
      this.visible = false;
    },
    // 获取当前选中的 tag
    getSelectedTag() {
      const selectedTag = this.visitedViews.find(v => v.path === this.$route.path);
      this.selectedTag = selectedTag;
    },
    // 生成当前路由
    generateRoute() {
      if (this.$route.name) {
        return this.$route;
      }
      return false;
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag;
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag.$el);
            break;
          }
        }
      });
    },
    // 显示右键菜单
    openMenu(tag, e) {
      this.visible = true;
      this.selectedTag = tag;

      this.$nextTick(() => {
        const winWidth = window.innerWidth;
        const contextmenuWidth = this.$refs.contextmenu.getBoundingClientRect().width;
        const top = e.offsetY;

        if (winWidth - e.clientX <= contextmenuWidth) {
          // 最右边, 不够位置放置整个右键菜单
          this.left = 'auto';
          this.top = `${top}px`;
          this.right = '0';
        } else {
          // container margin left
          const offsetLeft = this.$el.getBoundingClientRect().left;
          // 15: margin right
          const left = (e.clientX - offsetLeft) + 15;
          this.left = `${left}px`;
          this.top = `${top}px`;
          this.right = 'auto';
        }
      });
    },
    openMenuByTool() {
      this.visible = true;
      this.left = 'auto';
      this.right = '0';
      this.top = '40px';
    },
    // 是否是当前路由
    isActive(route) {
      return route.path === this.$route.path;
    },
  },
};
</script>

<style lang="scss">
@import '../../../../styles/var.scss';
$tools-width: 50px;

.tags-view-container {
  position: relative;
  padding-right: $tools-width;

  .tags-view-wrapper {
    background: #fff;
    height: $app-header-tagsview;

    &::before {
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      background-color: rgba(0, 0, 0, 0.035);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    }

    .tags-close-button {
      position: relative;
      right: -2px;
      margin-left: 3px;
    }

    .tags-view-item {
      display: inline-block;
      position: relative;
      height: $app-header-tagsview;
      line-height: $app-header-tagsview;
      color: #808080;
      background: #fff;
      padding: 0 16px;
      font-size: 14px;
      transition: background-color 0.3s linear;

      &:first-child {
        padding: 0 20px;
        font-size: 16px;
      }

      &:hover {
        background-color: #f6f6f6;
      }

      &::before {
        content: "";
        background-color: rgba(0, 0, 0, 0.035);
        display: block;
        width: 100%;
        height: 1px;
        position: absolute;
        left: 0;
        top: 0;
      }

      &::after {
        content: "";
        display: block;
        width: 1px;
        height: $app-header-tagsview;
        background-color: #f6f6f6;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
      }

      &.active {
        background-color: #f6f6f6;
        color: #409EFF;
        border-color: #409EFF;

        &::before {
          content: "";
          background: #409EFF;
          display: block;
          width: 100%;
          height: 2px;
          position: absolute;
          left: 0;
          top: 0;
        }
      }

      .el-icon-close {
        position: relative;
        top: -1px;
        vertical-align: middle;
        font-size: 16px;
        border-radius: 50%;
        text-align: center;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        transform-origin: 100% 50%;

        &:before {
          transform: scale(0.8);
          display: inline-block;
        }
        &:hover {
          background-color: #409EFF;
          color: #fff;
        }
      }

    }
  }

  .tags-view-tools {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: $tools-width;
    height: $app-header-tagsview;
    box-sizing: border-box;
    cursor: pointer;

    &::before {
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      background-color: rgba(0, 0, 0, 0.035);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    }

    .tags-view-tool {
      width: $tools-width;
      height: $app-header-tagsview - 1px;
      position: relative;
      z-index: 1;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .tools-shadow {
      position: absolute;
      left: -15px;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 100%;
      overflow: hidden;
      // box-shadow: -3px 0 15px 3px rgba(0,0,0,.1);

      &::after {
        content: "";
        display: block;
        width: 15px;
        height: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        box-shadow: -3px 0 15px 3px rgba(0,0,0,.1);
      }
    }

    .icon-svg {
      font-size: 18px;
    }
  }


  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 4px 0;
    border-radius: 2px;
    font-size: 12px;
    font-weight: 400;
    color: #404004;
    box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, .35);

    li {
      margin: 0;
      padding: 10px 20px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
