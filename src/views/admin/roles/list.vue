<template>
  <div class="admin-roles">
    <el-card shadow="hover" class="card-bottom card-header-border-none">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">角色列表</h3>
        <div class="card-header-extra">
          <router-link :to="{path: '/admin/roles/create'}">
            <el-button type="primary" size="medium">添加角色</el-button>
          </router-link>
        </div>
      </div>

      <div class="table-list">
        <div class="table-list-wrapper">
          <el-table
            :data="roles"
            border
            style="width: 100%"
            v-loading="loading"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
              align="center"
            ></el-table-column>

            <el-table-column
              prop="name"
              label="名称"
              min-width="180"
              align="center"
            >
              <template slot-scope="scope">{{scope.row.name || '-'}}</template>
            </el-table-column>

            <el-table-column
              label="状态"
              min-width="100"
              align="center"
            >
              <template slot-scope="scope">
                <status
                  v-if="scope.row.status"
                  type="dot"
                  :status="scope.row.status | formatStatus"
                  :text="scope.row.status | formatStatusText"
                ></status>
                <span v-else>-</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="create_at"
              label="添加时间"
              min-width="200"
              align="center"
            >
              <template slot-scope="scope">
                {{scope.row.created_at | formatDateWithMoment}}
              </template>
            </el-table-column>

            <el-table-column
              fixed="right"
              label="操作"
              width="100"
              align="center"
            >
              <template slot-scope="scope">
                <router-link
                  class="action-inline"
                  :to="{path: `/admin/roles/edit/${scope.row.id}`}"
                >
                  <el-button type="text" size="small">编辑</el-button>
                </router-link>
                <el-button
                  class="action-inline"
                  @click="handleDel(scope.row)"
                  type="text"
                  size="small"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="list-footer">
            <div class="list-footer-left">
              <el-button
                size="small"
                :disabled="selectionCount === 0"
                @click="handleMultiDel"
              >删除</el-button>
            </div>
            <div class="list-footer-right"></div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import Status from '@/components/Status';
import { getRoles, delRoles } from '@/api/admin/roles';

export default {
  data() {
    return {
      loading: false,
      roles: [],
      multipleSelection: [],
    };
  },
  computed: {
    selectionCount() {
      return this.multipleSelection.length;
    },
  },
  components: {
    Status,
  },
  filters: {
    formatStatus(code) {
      const status = {
        0: 'error',
        1: 'success',
      };
      return status[code] || 'default';
    },
    formatStatusText(code) {
      const statusText = {
        0: '无效',
        1: '有效',
      };
      return statusText[code] || '-';
    },
  },
  created() {
    this.getRoles();
  },
  methods: {
    // 获取角色列表
    async getRoles() {
      this.loading = true;
      try {
        const res = await getRoles();
        this.loading = false;
        if (!res.success) {
          this.$message.error(res.message || '数据加载失败，请重试');
        } else {
          this.roles = res.data;
        }
      } catch (error) {
        console.log('getRoles error =>>', error);
        this.loading = false;
      }
    },
    // 处理删除角色
    async dealDelRoles(roles) {
      if (roles.length === 0) {
        return;
      }

      // 确认弹窗
      const confirmResult = await this.$confirm('此操作将永久删除角色, 是否继续?', '提示', {
        type: 'warning',
      }).catch((error) => {
        if (error === 'cancel') {
          this.$message.info('已取消删除操作');
        }
      });
      if (confirmResult !== 'confirm') {
        return;
      }

      const fullLoading = this.$loading({
        lock: true,
        text: '删除中，请稍等',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });

      try {
        const res = await delRoles(roles);
        fullLoading.close();
        if (!res.success) {
          this.$message.error(res.message || '删除失败，请重试');
        } else {
          this.$message.success('删除成功');
          this.getRoles();
        }
      } catch (error) {
        console.log('delRoles error =>>', error);
        fullLoading.close();
        this.$message.error('删除失败，请重试');
      }
    },
    // 删除角色
    handleDel(role) {
      const roles = [role.id];
      this.dealDelRoles(roles);
    },
    // 批量删除角色
    handleMultiDel() {
      const roles = this.multipleSelection.map(role => role.id);
      this.dealDelRoles(roles);
    },
    // 表格勾选多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>
