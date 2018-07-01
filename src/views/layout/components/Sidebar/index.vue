<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <div class="logo">
      <router-link :to="{path: '/'}">
        <img src="@/assets/logo.png" alt="" />
        <h1>Admin Template</h1>
      </router-link>
    </div>
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      unique-opened
      background-color="#50314F"
      text-color="#b3b3b3"
      active-text-color="#fff"
    >
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex';
import SidebarItem from './SidebarItem';

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar',
    ]),
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
};
</script>

<style lang="scss">
@import '../../../../styles/var.scss';

.app-layout-sidebar {
  width: $sidebar-width !important;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  transition: width 0.28s;
  box-shadow: 2px 0 6px rgba(0,21,41,.35);

  .logo {
    position: relative;
    height: $app-header-height;
    line-height: $app-header-height;
    transition: all .3s;
    background: #472c46;
    overflow: hidden;
    text-align: center;

    img,
    h1 {
      display: inline-block;
      vertical-align: middle;
    }

    img {
      width: 26px;
      height: 26px;
    }

    h1 {
      color: #fff;
      font-size: 20px;
      margin: 0 0 0 12px;
      font-family: "Myriad Pro","Helvetica Neue",Arial,Helvetica,sans-serif;
      font-weight: 400;
    }
  }

  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
  }
  .scrollbar-wrapper {
    height: calc(100% + 15px);

    .el-scrollbar__view {
      height: 100%;
    }
  }
  .is-horizontal {
    display: none;
  }
  a {
    display: inline-block;
    width: 100%;
    overflow: hidden;
  }
  .icon-svg {
    margin-right: 5px;
    vertical-align: middle;
  }
  .el-menu {
    border: none;
    height: calc(100% - 64px);
    width: 100% !important;
  }

  .el-submenu .el-menu,
  .el-submenu .el-menu-item {
    background-color: #382237 !important;
  }
  .el-submenu .el-menu {
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .el-submenu.is-active > .el-submenu__title {
    border-bottom: none;
    color: #fff !important;
  }

  // 嵌套菜单
  .nest-menu {
    .el-submenu__title {
      background-color: transparent !important;
    }
  }
}


// 隐藏
.hide-sidebar {
  .app-layout-sidebar {
    width: $sidebar-width-min !important;
  }
  .app-layout-main {
    margin-left: $sidebar-width-min;
  }
  .submenu-title-no-dropdown {
    // padding-left: 10px !important;
    position: relative;

    .el-tooltip {

      .icon-svg {
        margin-left: 11px;
      }
    }
  }
  .el-submenu {
    overflow: hidden;

    & > .el-submenu__title {
      font-size: 16px;

      .icon-svg {
        margin-left: 11px;
      }

      .el-submenu__icon-arrow {
        display: none;
      }
    }
  }
  .el-menu--collapse {
    .el-submenu {
      & > .el-submenu__title {
        & > span {
          height: 0;
          width: 0;
          overflow: hidden;
          visibility: hidden;
          display: inline-block;
        }
      }
    }
  }
}


// 适配移动端
.mobile {
  .app-layout-sidebar {
    transition: transform .28s;
    width: $sidebar-width  !important;
     box-shadow: none;
  }

  .app-layout-main {
    margin-left: 0px;
  }

  &.hide-sidebar {
    .logo h1 {
      display: none;
    }
    .app-layout-sidebar {
      transition-duration: 0.3s;
      transform: translate3d(-$sidebar-width, 0, 0);
    }
  }
}

// 切换状态没有运动效果
.without-animation {
  .app-layout-main,
  .app-layout-sidebar {
    transition: none;
  }
}
</style>
