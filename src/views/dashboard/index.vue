<template>
  <div class="dashboard-container">
    <component :is="currentRoleComp"></component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import adminDashboard from './admin';
import editorDashboard from './editor';
import unmatchDashboard from './unmatch';

export default {
  name: 'dashboard',
  components: { adminDashboard, editorDashboard, unmatchDashboard },
  data() {
    return {
      currentRoleComp: 'unmatchDashboard',
    };
  },
  computed: {
    ...mapGetters([
      'roles',
    ]),
  },
  created() {
    const roleDashboards = {
      admin: 'adminDashboard',
      editor: 'editorDashboard',
    };

    // 循环帐号角色, 匹配角色对应的首页组件
    let currentRoleComp = '';
    for (let i = 0; i < this.roles.length; i += 1) {
      const role = this.roles[i];
      if (roleDashboards[role]) {
        currentRoleComp = roleDashboards[role];
        break;
      }
    }

    this.currentRoleComp = currentRoleComp || 'unmatchDashboard';
  },
};
</script>
