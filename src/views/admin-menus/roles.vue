<template>
  <div class="admin-roles">
    <el-card shadow="hover" class="card-bottom card-header-border-none">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">角色列表</h3>
        <div class="card-header-extra">
          <el-button
            type="primary"
            size="medium"
            @click="handleCreate"
          >添加角色</el-button>
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
              prop="value"
              label="标识"
              min-width="150"
              align="center"
            >
              <template slot-scope="scope">{{scope.row.value || '-'}}</template>
            </el-table-column>

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
                <el-button
                  type="text"
                  size="small"
                  @click="handleEdit(scope.row)"
                >编辑</el-button>
                <el-button
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

    <!-- 添加、编辑角色弹窗 -->
    <el-dialog
      :title="actionTypeName"
      :visible.sync="dialogVisible"
      @close="resetRoleDialogForm('roleForm')"
      center
      width="85%"
      class="dialog-full"
    >
      <el-form
        status-icon
        :model="roleForm"
        :rules="rules"
        ref="roleForm"
        label-width="100px"
        label-position="top"
        class="form-label-min"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="roleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="标识" prop="value">
          <el-input v-model="roleForm.value"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select v-model="roleForm.status" placeholder="选择状态" style="width: 100%;">
            <el-option label="无效" value="0"></el-option>
            <el-option label="有效" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            :loading="submitting"
            @click="submitForm('roleForm')"
          >确认提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Status from '@/components/Status';
import { getRoles, delRoles, createAndEditRoles } from '@/api/admin-menus/roles';

export default {
  data() {
    return {
      loading: false,
      roles: [],
      multipleSelection: [],

      actionType: 'create', // create: 添加; edit: 编辑
      dialogVisible: false,
      roleForm: {
        id: '',
        name: '',
        value: '',
        status: '1',
      },
      submitting: false,
      rules: {
        name: [{ required: true, message: '角色名称不能为空' }],
      },
    };
  },
  computed: {
    selectionCount() {
      return this.multipleSelection.length;
    },
    actionTypeName() {
      const actions = {
        create: '添加角色',
        edit: '编辑角色',
      };

      return actions[this.actionType];
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
    // 添加角色
    handleCreate() {
      this.actionType = 'create';
      this.dialogVisible = true;
    },
    // 删除角色
    handleDel(role) {
      const roles = [role.id];
      this.dealDelRoles(roles);
    },
    // 编辑角色
    handleEdit(role) {
      this.roleForm = {
        id: role.id,
        name: role.name,
        value: role.value,
        status: role.status,
      };

      this.actionType = 'edit';
      this.dialogVisible = true;
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
    // 初始化 重置密码弹窗表单数据
    resetRoleDialogForm(formName) {
      this.roleForm = {
        id: '',
        name: '',
        value: '',
        status: '1',
      };
      this.$refs[formName].resetFields();
    },
    // 添加、编辑角色
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            this.submitting = true;
            const data = { ...this.roleForm };
            // 如果是添加菜单, 删除对象 id
            if (this.actionType !== 'edit') {
              delete data.id;
            }

            const res = await createAndEditRoles(data);
            this.submitting = false;
            if (!res.success) {
              const errorMsg = this.actionType !== 'edit' ? '添加失败，请重试' : '编辑失败，请重试';
              this.$message.error(res.message || errorMsg);
            } else {
              const successMsg = this.actionType !== 'edit' ? '添加成功' : '编辑成功';
              this.$message.success(successMsg);
              // 重新加载列表数据
              this.getRoles();
              // 隐藏弹窗
              this.dialogVisible = false;
            }
          } catch (error) {
            this.submitting = false;
            console.log('submiForm error =>>', error);
          }
        }
      });
    },
  },
};
</script>
