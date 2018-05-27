<template>
  <div class="app-layou-header">
    <header class="header">
      <router-link to="/" class="logo" v-if="device === 'mobile'">
        <img src="@/assets/logo.png" alt="" />
      </router-link>
      <div class="divider divider-vertical" v-if="device === 'mobile'"></div>
      <hamburger
        class="action hamburger"
        :toggleClick="toggleSidebar"
        :isActive="sidebar.opened"
      />
      <div class="header-right">
        <el-tooltip effect="dark" content="使用文档" placement="bottom">
          <a href="https://www.baidu.com" target="_blank" class="action">
            <icon-svg name="help" />
          </a>
        </el-tooltip>
        <div class="action">
          <el-popover
            placement="bottom"
            width="320"
            trigger="click"
          >
            <div class="">
              <h3>我是标题</h3>
              <p>这是一段内容,这是一段内容,这是一段内容,这是一段内容。</p>
            </div>
            <el-badge slot="reference" :value="15" :max="99">
              <icon-svg name="bell" />
            </el-badge>
          </el-popover>
        </div>
        <div class="action">
          <el-dropdown class="account" trigger="hover" placement="top">
            <div class="account-content">
              <icon-svg class="avatar" name="user" />
              <span class="name">{{account.name}}</span>
            </div>
            <el-dropdown-menu slot="dropdown" placement="bottom-end">
              <el-dropdown-item>
                <router-link to="/account/id">{{'基本资料'}}</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/password">{{'修改密码'}}</router-link>
              </el-dropdown-item>
              <el-dropdown-item disabled>
                <router-link to="/">{{'账户设置'}}</router-link>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <span @click="logout" style="display:block;">{{'退出登录'}}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import IconSvg from '@/components/IconSvg';
import Hamburger from './Hamburger';

export default {
  name: 'appHeader',
  components: {
    IconSvg,
    Hamburger,
  },
  computed: {
    ...mapGetters([
      'device',
      'sidebar',
      'account',
    ]),
  },
  methods: {
    toggleSidebar() {
      this.$store.dispatch('toggleSidebar');
    },
    logout() {
      this.$store.dispatch('logOut').then(() => {
        // 退出后, 重新实例化 VUE 路由器对象以避免 bug
        location.reload();
      });
    },
  },
};
</script>

<style lang="scss">
@import '../../../../styles/var.scss';

.app-layou-header {
  position: relative;
  z-index: 100;
  background-color: #fff;

  .header {
    height: $app-header-height;
    line-height: $app-header-height;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    display: flex;
    align-items: center;

    .el-badge {
      line-height: normal;
    }

    .action {
      padding: 0 12px;
      display: inline-block;
      cursor: pointer;
      vertical-align: middle;
      font-size: 24px;
      transition: background-color 0.25s;

      &:hover {
        background-color: #e6f7ff;
      }
    }

    .logo {
      height: $app-header-height;
      display: inline-block;
      padding: 0 18px 0 24px;
      cursor: pointer;
      font-size: 0;

      img {
        width: 26px;
        height: 26px;
        vertical-align: middle;
      }
    }

    .divider {
      font-family: "Segoe UI",Roboto,"PingFang SC","Microsoft YaHei",Helvetica,Arial,sans-serif;
      font-size: 14px;
      line-height: 1.5;
      color: rgba(0,0,0,.65);
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      list-style: none;
      background: #e8e8e8;

      &-vertical {
        margin: 0 8px;
        display: inline-block;
        height: 0.9em;
        width: 1px;
        vertical-align: middle;
        position: relative;
        top: -0.1em;
      }
    }

    .hamburger {
      font-size: 28px;
      transform-origin: 50% 50%;
      padding: 0 18px;
      color: rgba(0, 0, 0, 0.6);
    }

    .header-right {
      position: absolute;
      right: 20px;
      top: 0;
      height: 100%;
      color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;

      .action {
        font-size: 22px;
      }
    }

    .account {
      height: $app-header-height;
      display: flex;

      &-content {
        cursor: pointer;
        position: relative;
        font-size: 22px;
        top: -1px;
        color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;

        .name {
          font-size: 14px;
          margin-left: 8px;
        }
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .app-layou-header {

    .header {
      .hamburger {
        padding: 0 9px 0 13px;
      }
      .account-content {
        .name {
          display: none;
         }
      }
    }

  }
}
</style>