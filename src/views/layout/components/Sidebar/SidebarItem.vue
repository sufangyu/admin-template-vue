<template>
  <!-- eslint-disable max-len -->
  <div class="menu-wrapper">
    <template v-for="item in routes" v-if="!item.hidden && item.children">
      <router-link
        v-if="hasOneShowingChildren(item.children) && !item.children[0].children && !item.alwaysShow"
        :to="item.path + '/' + item.children[0].path"
        :key="item.children[0].name"
      >
        <el-menu-item :index="item.path + '/' + item.children[0].path" :class="{'submenu-title-no-dropdown':!isNest}">
          <icon-svg v-if="item.children[0].meta && item.children[0].meta.icon" :name="item.children[0].meta.icon"></icon-svg>
          <span v-if="item.children[0].meta && item.children[0].meta.title" slot="title">
            {{item.children[0].meta.title}}
          </span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.name || item.path" :key="item.name">
        <template slot="title">
          <icon-svg v-if="item.meta && item.meta.icon" :name="item.meta.icon"></icon-svg>
          <span v-if="item.meta && item.meta.title" slot="title">
            {{item.meta.title}}
          </span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item
            :is-nest="true"
            class="nest-menu"
            v-if="child.children && child.children.length > 0" :routes="[child]" :key="child.path"
          >
          </sidebar-item>
          <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
            <el-menu-item :index="item.path+'/'+child.path">
              <icon-svg v-if="child.meta&&child.meta.icon" :name="child.meta.icon"></icon-svg>
              <span v-if="child.meta && child.meta.title" slot="title">
                {{child.meta.title}}
              </span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

    </template>
  </div>
</template>

<script>
import IconSvg from '@/components/IconSvg';

export default {
  name: 'sidebarItem',
  props: {
    routes: {
      type: Array,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    IconSvg,
  },
  methods: {
    hasOneShowingChildren(children) {
      const showingChildren = children.filter((item) => {
        const isShow = !item.hidden;
        return isShow;
      });
      if (showingChildren.length === 1) {
        return true;
      }
      return false;
    },
  },
};
</script>
