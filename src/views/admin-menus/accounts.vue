<template>
  <div class="admin-accounts">
    <el-card shadow="hover" class="card-bottom card-header-border-none">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">查询条件</h3>
      </div>

      <div class="list-query">
        <el-form
          class="list-query-form"
          ref="queryForm"
          :inline="true"
          label-width="70px"
          :model="query"
        >
          <el-form-item label="关键词" prop="value">
            <el-input
              class="input-with-select"
              placeholder="关键词"
              v-model="query.value"
            >
              <el-select
                placeholder="选择类型"
                slot="prepend"
                v-model="query.type"
              >
                <el-option
                  v-for="item in queryOptions.type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="帐号状态" prop="status">
            <el-select
              placeholder="选择状态"
              v-model="query.status"
            >
              <el-option
                v-for="item in queryOptions.status"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="form-buttons">
            <el-button
              type="primary"
              :loading="loading"
              @click="submitQueryForm('queryForm')"
            >查询</el-button>
            <el-button @click="resetQueryForm('queryForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card shadow="hover" class="card-bottom card-header-border-none">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">用户列表</h3>
        <div class="card-header-right"></div>
      </div>

      <div class="list-operator">
        <el-button
          size="small"
          icon="el-icon-plus"
          type="primary"
          @click="handleCreate"
        >添加用户</el-button>
        <el-button size="small" :disabled="selectionCount === 0">禁用</el-button>
        <el-dropdown placement="bottom">
          <el-button size="small" :disabled="selectionCount === 0">
            更多操作
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>批量禁用</el-dropdown-item>
            <el-dropdown-item>批量启用</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="table-list">
        <div class="table-list-alert">
          <el-alert
            type="info"
            show-icon
            :closable="false"
            title=""
          >
            <div class="alert-content">
              已选择<strong>{{selectionCount}}</strong>项
              <span class="action-line" @click="toggleSelection()">清空</span>
            </div>
          </el-alert>
        </div>

        <div class="table-list-wrapper">
          <el-table
            style="width: 100%"
            ref="multipleTable"
            border
            :data="accounts"
            v-loading="loading"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
              align="center"
            >
            </el-table-column>

            <el-table-column
              prop="username"
              label="用户名"
              min-width="120"
              align="center"
            >
              <template slot-scope="scope">{{scope.row.username || '-'}}</template>
            </el-table-column>

            <el-table-column
              prop="nickname"
              label="名称"
              min-width="120"
              align="center"
            >
              <template slot-scope="scope">{{scope.row.nickname || '-'}}</template>
            </el-table-column>

            <el-table-column
              prop="roleName"
              label="权限角色"
              min-width="120"
              align="center"
            >
              <template slot-scope="scope">
                <div
                  class="roles-list"
                  v-if="scope.row.roles && scope.row.roles.length > 0"
                >
                  <el-tag size="small" v-for="role in scope.row.rolesShow" :key="role.value">
                    {{role.name || role.value || '-'}}
                  </el-tag>
                </div>
                <span v-if="!scope.row.roles || scope.row.roles.length === 0">-</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="status"
              label="状态"
              min-width="80"
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
              label="操作"
              width="260"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.row)"
                >编辑</el-button>
                <el-button
                  size="mini"
                  @click="handleResetPassword(scope.row)"
                >重置密码</el-button>
                <el-button
                  v-if="scope.row.status === '0'"
                  size="mini"
                  type="warning"
                  @click="handleSetStatus(scope.row, '1')"
                >启用</el-button>
                <el-button
                  v-if="scope.row.status === '1'"
                  size="mini"
                  type="danger"
                  @click="handleSetStatus(scope.row, '0')"
                >禁用</el-button>
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
            <div class="list-footer-right">
              <el-pagination
                background
                :total="total"
                :current-page="page"
                :page-size="size"
                :layout="pagination.layout"
                :page-sizes="pagination.pageSizes"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
              >
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 添加、编辑用户弹窗 -->
    <el-dialog
      :title="actionTypeName"
      :visible.sync="dialogVisible"
      @close="resetAccountDialogForm('accountForm')"
      center
      width="85%"
      class="dialog-full"
    >
      <el-form
        status-icon
        :model="accountForm"
        :rules="rules"
        ref="accountForm"
        label-width="100px"
        label-position="top"
        class="form-label-min"
      >
        <el-form-item label="用户名" prop="username">
          <el-input :disabled="actionType === 'edit'" v-model="accountForm.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="accountForm.password"></el-input>
        </el-form-item>

        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="accountForm.nickname"></el-input>
        </el-form-item>

        <el-form-item label="超级管理员" prop="delivery">
          <el-switch v-model="accountForm.isSuperAdmin"></el-switch>
        </el-form-item>

        <el-form-item label="角色" prop="role">
          <el-select
            v-model="accountForm.roles"
            clearable
            multiple
            :multiple-limit="1"
            placeholder="选择权限角色"
            style="width: 100%;"
          >
            <el-option
              v-for="option in roles"
              :key="option.id"
              :value="option.value"
              :label="option.name"
            >
              <span>{{option.name}}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select v-model="accountForm.status" placeholder="选择状态" style="width: 100%;">
            <el-option label="无效" value="0"></el-option>
            <el-option label="有效" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            :loading="submitting"
            @click="submitUserForm('accountForm')"
          >确认提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 重置密码弹窗 -->
    <el-dialog
      title="重置密码"
      :visible.sync="passwordDialogVisible"
      @close="resetPasswordDialogForm('passwordForm')"
      center
      width="85%"
      class="dialog-full"
    >
      <el-form
        status-icon
        :model="passwordForm"
        :rules="passwordRules"
        ref="passwordForm"
        label-width="100px"
        label-position="top"
        class="form-label-min"
      >
        <el-form-item label="新密码" prop="password">
          <el-input v-model="passwordForm.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            :loading="passwordSubmitting"
            @click="submitPasswordForm('passwordForm')"
          >确认提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Status from '@/components/Status';
import { getRoles } from '@/api/admin-menus/roles';
import { getAccounts, createAndEditAccount, delAccounts, updateAccount } from '@/api/admin/accounts';

export default {
  data() {
    return {
      query: {
        type: '', // 查询类型
        value: '', // 关键词
        status: '', // 状态
      },
      queryOptions: {
        type: [
          { label: '登录帐号', value: '1' },
          { label: '用户名称', value: '2' },
        ],
        status: [
          { label: '无效', value: '1' },
          { label: '有效', value: '2' },
        ],
      },
      page: 1,
      size: 10,
      total: 0,
      pagination: {
        pageSizes: [10, 20, 30, 40],
        layout: 'total, sizes, prev, pager, next, jumper',
      },
      accounts: [],
      multipleSelection: [],
      loading: false,
      // 添加、编辑用户
      submitting: false,
      actionType: 'create', // create: 添加; edit: 编辑
      dialogVisible: false,
      roles: [],

      accountForm: {
        id: '',
        username: '',
        password: '',
        nickname: '',
        isSuperAdmin: false,
        status: '1',
        role: '',
        roleName: '',
        roles: [],
        rolesShow: [],
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空' },
        ],
        password: [
          { required: true, message: '密码不能为空' },
        ],
        nickname: [
          { required: true, message: '昵称不能为空' },
        ],
        roles: [
          { required: true, message: '选择用户角色' },
        ],
        status: [
          { required: true, message: '选择用户状态' },
        ],
      },

      // 重置密码
      passwordSubmitting: false,
      passwordDialogVisible: false,
      passwordForm: {
        id: '',
        password: '',
        account: {},
      },
      passwordRules: {
        password: [
          { required: true, message: '新密码不能为空' },
        ],
      },
    };
  },
  computed: {
    selectionCount() {
      return this.multipleSelection.length;
    },
    // 弹窗操作类型标题
    actionTypeName() {
      const actions = {
        create: '添加账户',
        edit: '编辑账户',
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
    Promise.all([this.getRoles(), this.getAccounts()]);
  },
  methods: {
    // 处理删除账户
    async dealDelAccounts(accounts) {
      if (accounts.length === 0) {
        return;
      }

      // 确认弹窗
      const confirmResult = await this.$confirm('此操作将永久删除账户, 是否继续?', '提示', {
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
        const res = await delAccounts(accounts);
        fullLoading.close();
        if (!res.success) {
          this.$message.error(res.message || '删除失败，请重试');
        } else {
          this.$message.success('删除成功');
          this.getAccounts();
        }
      } catch (error) {
        console.log('delUsers error =>>', error);
        fullLoading.close();
        this.$message.error('删除失败，请重试');
      }
    },
    // 获取角色列表
    async getRoles() {
      try {
        const res = await getRoles();
        if (!res.success) {
          this.$message.error(res.message || '加载权限角色失败，请重试');
        } else {
          this.roles = res.data;
        }
      } catch (error) {
        console.log('getRoles error =>>', error);
      }
    },
    // 获取用户列表
    async getAccounts() {
      const query = {
        ...this.query,
        page: this.page,
        size: this.size,
      };

      this.loading = true;
      try {
        const res = await getAccounts(query);
        this.loading = false;
        if (!res.success) {
          this.$message.error(res.message || '数据加载失败，请重试');
        } else {
          this.accounts = res.data.list;
          if (res.data.pagination) {
            console.log('set pagination');
          }
        }
      } catch (error) {
        this.loading = false;
        console.error('getAccounts errro =>>', error);
      }
    },
    // 添加账户
    handleCreate() {
      this.actionType = 'create';
      this.dialogVisible = true;
      // 表单重置初始值并移除校验结果
    },
    // 批量删除用户
    handleMultiDel() {
      const accounts = this.multipleSelection.map(role => role.id);
      this.dealDelAccounts(accounts);
    },
    // 编辑用户
    handleEdit(account) {
      const { id, username, password, nickname, status = '1', isSuperAdmin, role, roleName, roles = [], rolesShow = [] } = account;
      this.accountForm = {
        id,
        username,
        password,
        nickname,
        isSuperAdmin,
        status,
        role,
        roleName,
        roles,
        rolesShow,
      };
      this.actionType = 'edit';
      this.dialogVisible = true;
    },
    // 重置密码
    handleResetPassword(account) {
      this.passwordForm.account = account;
      this.passwordForm.id = account.id;
      this.passwordDialogVisible = true;
    },
    // 设置状态
    async handleSetStatus(account, status = '1') {
      try {
        const info = {
          status,
        };
        const res = await updateAccount(account.id, info);
        console.log(res);
        if (!res.success) {
          this.$message.error(res.message || '修改失败，请重试');
        } else {
          this.$message.success('修改成功');
          // 更新用户的当前状态
          account.status = status;
        }
      } catch (error) {
        console.log('handleSetStatus error =>>', error);
      }
    },
    // 表格勾选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 设置 pagination size
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page = 1;
      this.size = val;
      this.getAccounts();
    },
    // 设置 pagination page
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.getAccounts();
    },
    // 重置查询
    resetQueryForm(formName) {
      if (this.loading) {
        return;
      }
      this.$refs[formName].resetFields();
      this.getAccounts();
    },
    // 初始化 添加/编辑弹窗表单数据
    resetAccountDialogForm(formName) {
      this.accountForm = {
        id: '',
        username: '',
        password: '',
        nickname: '',
        status: '1',
        isSuperAdmin: false,
        role: '',
        roleName: '',
        roles: [],
        rolesShow: [],
      };
      this.$refs[formName].resetFields();
    },
    // 初始化 重置密码弹窗表单数据
    resetPasswordDialogForm(formName) {
      this.passwordForm = {
        id: '',
        password: '',
        account: {},
      };
      this.$refs[formName].resetFields();
    },
    // 查询
    submitQueryForm() {
      this.page = 1;
      this.getAccounts();
    },
    // 重置密码
    submitPasswordForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            this.passwordSubmitting = true;
            const { id, password } = this.passwordForm;
            const info = {
              password,
            };
            const res = await updateAccount(id, info);
            this.passwordSubmitting = false;
            if (!res.success) {
              this.$message.error(res.message || '重置密码失败，请重试');
            } else {
              this.$message.success('重置密码成功');
              this.passwordDialogVisible = false;
              // 更新账号的密码
              this.passwordForm.account.password = password;
            }
          } catch (error) {
            this.passwordSubmitting = false;
            console.log('submitPasswordForm error =>>', error);
          }
        }
      });
    },
    // 添加、编辑用户
    submitUserForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            this.submitting = true;
            // 获取用于列表显示的权限角色列表
            /* eslint-disable */
            this.accountForm.rolesShow = this.roles.filter((role) => {
              return this.accountForm.roles.includes(role.value);
            });
            /* eslint-disable */
            const data = { ...this.accountForm };
            // 如果是添加菜单, 删除对象 id
            if (this.actionType !== 'edit') {
              delete data.id;
            }

            const res = await createAndEditAccount(data);
            this.submitting = false;
            if (!res.success) {
              const errorMsg = this.actionType !== 'edit' ? '添加失败，请重试' : '编辑失败，请重试';
              this.$message.error(res.message || errorMsg);
            } else {
              const successMsg = this.actionType !== 'edit' ? '添加成功' : '编辑成功';
              this.$message.success(successMsg);
              // 隐藏弹窗
              this.dialogVisible = false;
              // 重新加载列表数据
              this.getAccounts();
            }
          } catch (error) {
            this.submitting = false;
            console.log('submitUserForm error =>>', error);
          }
        }
      });
    },
    // 选择指定表格数据
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
  },
};
</script>

<style lang="scss">
.admin-accounts {
  .list-query-form {
    .input-with-select .el-select .el-input {
      width: 100px;
    }
    .el-input--suffix .el-input__inner {
      padding-left: 10px;
    }
  }

  .roles-list {
    text-align: center;

    .el-tag {
      margin: 0 5px;
    }
  }
}
</style>

