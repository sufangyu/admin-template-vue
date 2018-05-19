<template>
  <div class="tags-view-container">
    <!-- <div class='tags-view-wrapper' ref='scrollPane'> -->
    <!-- swiper -->
    <swiper
      class="tags-view-wrapper"
      :options="swiperOption"
    >
      <swiper-slide v-for="tag in Array.from(visitedViews)" :key="tag.path">
        <router-link
          ref='tag'
          class="tags-view-item"
          :class="isActive(tag)?'active':''"
          :to="tag.path" :key="tag.path" @contextmenu.prevent.native="openMenu(tag, $event)"
        >
          {{tag.title}}
          <span class='el-icon-close' @click.prevent.stop='closeSelectedTag(tag)' title="关闭"></span>
        </router-link>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>

    <!-- </div> -->
    <ul class='contextmenu' v-show="visible" :style="{left:left+'px', top:top+'px'}">
      <li @click="closeSelectedTag(selectedTag)">{{'关闭当前选项卡'}}</li>
      <li @click="closeOthersTags">{{'关闭其他选项卡'}}</li>
      <li @click="closeAllTags">{{'关闭所有选项卡'}}</li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable no-restricted-syntax */
import ScrollPane from '@/components/ScrollPane';

export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      swiperOption: {
        slidesPerView: 'auto',
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
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
      this.moveToCurrentTag();
    },
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
  },
  methods: {
    generateRoute() {
      if (this.$route.name) {
        return this.$route;
      }
      return false;
    },
    isActive(route) {
      return route.path === this.$route.path || route.name === this.$route.name;
    },
    addViewTags() {
      const route = this.generateRoute();
      if (!route) {
        return false;
      }
      return this.$store.dispatch('addVisitedViews', route);
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag;
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag.$el);
            break;
          }
        }
      });
    },
    closeSelectedTag(view) {
      this.$store.dispatch('delVisitedViews', view).then((views) => {
        if (this.isActive(view)) {
          const latestView = views.slice(-1)[0];
          if (latestView) {
            this.$router.push(latestView.path);
          } else {
            this.$router.push('/');
          }
        }
      });
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag.path);
      this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag();
      });
    },
    closeAllTags() {
      this.$store.dispatch('delAllViews');
      this.$router.push('/');
    },
    openMenu(tag, e) {
      this.visible = true;
      this.selectedTag = tag;
      this.left = e.clientX;
      this.top = e.clientY;
    },
    closeMenu() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss">
$tagsViewHeight    : 40px;
$borderColorDefault: #e2e2e2;
$borderColorActive : #fff;

.tags-view-container {
  background: #fff;
  height: $tagsViewHeight;
  border-bottom: 1px solid $borderColorDefault;
  margin-bottom: -1px;

  .tags-view-wrapper {
    height: $tagsViewHeight;
    // -webkit-overflow-scrolling: touch;
    // overflow-x: auto;
    // overflow-y: hidden;
    // white-space: nowrap;

    .swiper-slide {
      flex-shrink: 1;
    }

    .tags-view-item {
      display: inline-block;
      position: relative;
      height: $tagsViewHeight;
      line-height: $tagsViewHeight;
      color: #999;
      background: #fff;
      padding: 0 15px;
      font-size: 14px;
      border-bottom: 1px solid #e2e2e2;
      white-space: nowrap;

      &.active {
        font-weight: 400;
        color: #24292e;
        border-bottom: 1px solid $borderColorActive;

        &::after {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: $tagsViewHeight + 1px;
          border-left: 1px solid $borderColorDefault;
          border-right: 1px solid $borderColorDefault;
          border-bottom-color: $borderColorActive;
          box-sizing: border-box;
          pointer-events: none;
          border-radius: 2px 2px 0 0;
        }
      }

      .el-icon-close {
        width: 16px;
        height: 16px;
        border-radius: 2px;
        text-align: center;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        transform-origin: 100% 50%;
        margin-left: 2px;

        &:before {
          display: inline-block;
          transform: scale(.9);
          vertical-align: -1px;
        }
        &:hover {
          border-radius: 2px;
          background-color: #FF5722;
          color: #fff
        }
      }
    }

  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

