<template>
  <div class="admin-menus">
    <el-card shadow="hover" class="card-bottom card-header-border-none">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">菜单列表</h3>
        <div class="card-header-extra">
          <el-button
            type="primary"
            size="medium"
            @click="handleCreateMenu('createTop')"
          >添加菜单</el-button>
        </div>
      </div>
      <tree-table
        :data="menus"
        v-loading="loading"
        border
        expandAll
        :firstColumn="{
          prop: 'name',
          label: '名称',
          align: 'left',
          headerAlign: 'center',
          minWidth: 200,
        }"
      >
        <el-table-column
          prop="unique"
          label="唯一标识"
          align="center"
          min-width="120"
        ></el-table-column>

        <el-table-column
          prop="roles"
          label="可访问角色"
          align="center"
          min-width="300"
        >
          <template slot-scope="scope">
            <div
              class="roles-list"
              v-if="scope.row.roles && scope.row.roles.length > 0"
            >
              <el-tag size="small" v-for="role in scope.row.roles" :key="role">
                {{role || '-'}}
              </el-tag>
            </div>
            <span v-else>-</span>
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          align="center"
          width="230"
        >
          <template slot-scope="scope">
            <el-button
              type="default"
              size="mini"
              @click="handleEditMenu(scope.row)"
            >编辑</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="handleCreateMenu('createItem', scope.row)"
            >添加</el-button>
            <el-button
              type="danger"
              size="mini"
              @click="handleDel(scope.row)"
            >删除</el-button>
            <!-- <el-button
              type="text"
              size="mini"
              @click="handleExtra(scope.row)"
            >额外规则</el-button> -->
          </template>
        </el-table-column>
      </tree-table>
    </el-card>

    <!-- 添加、编辑菜单弹窗 -->
    <el-dialog
      :title="menuActionTypeName"
      :visible.sync="menuDialogVisible"
      center
      width="85%"
      class="dialog-full"
    >
      <el-form
        status-icon
        :model="menuForm"
        :rules="menuRules"
        ref="menuForm"
        label-width="100px"
        label-position="top"
        class="form-label-min"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="menuForm.name"></el-input>
        </el-form-item>

        <el-form-item label="唯一标识" prop="unique">
          <el-input v-model="menuForm.unique"></el-input>
        </el-form-item>

        <el-form-item label="父级" prop="parentId">
          <el-select
            disabled
            v-model="menuForm.parentId"
            placeholder="选择父级"
            style="width: 100%;"
          >
            <el-option
              v-for="option in menuParentOptions"
              :key="option.id"
              :value="option.id"
              :label="option.name"
            >
              <span>{{option.name}}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="可访问角色" prop="roles">
          <el-select
            v-model="menuForm.roles"
            placeholder="选择访问角色"
            clearable
            multiple
            style="width: 100%;"
          >
            <el-option
              v-for="role in roles"
              :key="role.id"
              :value="role.value"
              :label="role.name"
            >
              <span>{{role.name}}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            :loading="menuSubmitting"
            @click="submitMenuForm('menuForm')"
          >确认提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import TreeTable from '@/components/TreeTable';
import { treeify } from '@/utils/tree';
import { getRoles } from '@/api/admin-menus/roles';
import { getMenus, createAndEditMenu, delMenu } from '@/api/admin-menus/menus';

// 顶级菜单选项
const topParent = {
  id: '0',
  name: '作为顶级菜单',
};

export default {
  components: {
    TreeTable,
  },
  data() {
    return {
      roles: [],
      loading: false,
      menusTmp: [],
      menus: [],
      menuActionType: 'createTop', // createTop: 添加顶级菜单; createItem: 添加子菜单; edit: 编辑
      menuDialogVisible: false,
      menuForm: {
        id: '',
        name: '',
        unique: '',
        parentId: '0',
        roles: [],
      },
      menuParentOptions: [topParent],
      menuSubmitting: false,
      menuRules: {
        name: [{ required: true, message: '名称不能为空' }],
        unique: [{ required: true, message: '唯一标识不能为空' }],
        parentId: [{ required: true, message: '父级不能为空' }],
      },
    };
  },
  computed: {
    menuActionTypeName() {
      const actions = {
        createTop: '添加菜单',
        createItem: '添加菜单',
        edit: '编辑菜单',
      };

      return actions[this.menuActionType];
    },
  },
  created() {
    Promise.all([this.getMenus(), this.getRoles()]);
  },
  methods: {
    // 获取菜单列表
    async getMenus() {
      this.loading = true;
      try {
        const res = await getMenus();
        this.loading = false;
        if (!res.success) {
          this.$message.error(res.message || '数据加载失败，请重试');
        } else {
          this.menusTmp = res.data;
          this.menus = treeify(res.data);
        }
      } catch (error) {
        this.loading = false;
        console.log('getMenus error', error);
      }
    },
    // 获取角色列表
    async getRoles() {
      try {
        const res = await getRoles();
        if (!res.success) {
          this.$message.error(res.message || '数据加载失败，请重试');
        } else {
          this.roles = res.data;
        }
      } catch (error) {
        console.log('getRoles error =>>', error);
      }
    },
    // 添加菜单
    handleCreateMenu(type = 'createTop', menu = {}) {
      this.menuActionType = type;
      this.menuDialogVisible = true;
      // 重置添加、编辑数据
      this.menuForm = {
        id: '',
        name: '',
        unique: '',
        parentId: '0',
        roles: [],
      };

      if (type === 'createTop') {
        // 添加顶部菜单
        this.menuParentOptions = [topParent];
      } else if (type === 'createItem') {
        // 添加子菜单
        this.menuParentOptions = [{
          id: menu.id,
          name: menu.name,
        }];
        this.menuForm.parentId = menu.id;
      }
    },
    // 删除菜单
    async handleDel(menu) {
      if (!menu.id || menu.id === '') {
        console.warn('Miss delete menu\'s id!');
        return;
      }

      const confirmResult = await this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
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
        const res = await delMenu(menu.id);
        fullLoading.close();
        if (!res.success) {
          this.$message.error(res.message || '删除失败，请重试');
        } else {
          this.$message.success('删除成功');
          this.getMenus();
        }
      } catch (error) {
        console.log('handleDel error =>>', error);
        fullLoading.close();
        this.$message.error('删除失败，请重试');
      }
    },
    // 编辑菜单
    handleEditMenu(menu) {
      const { id, name, unique, parentId, roles } = menu;
      this.menuActionType = 'edit';
      this.menuDialogVisible = true;

      this.menuForm = {
        id,
        name,
        unique,
        parentId,
        roles,
      };

      const parents = this.menusTmp.filter(item => item.id === parentId);
      if (parents.length > 0) {
        this.menuParentOptions = [{
          id: parents[0].id,
          name: parents[0].name,
        }];
      } else {
        this.menuParentOptions = [topParent];
      }
    },
    // 添加、编辑菜单
    submitMenuForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            this.menuSubmitting = true;
            const data = { ...this.menuForm };
            // 如果是添加菜单, 删除对象 id
            if (this.menuActionType !== 'edit') {
              delete data.id;
            }

            const res = await createAndEditMenu(data);
            this.menuSubmitting = false;
            if (!res.success) {
              const errorMsg = this.menuActionType !== 'edit' ? '添加失败，请重试' : '编辑失败，请重试';
              this.$message.error(res.message || errorMsg);
            } else {
              const successMsg = this.menuActionType !== 'edit' ? '添加成功' : '编辑成功';
              this.$message.success(successMsg);
              // 隐藏弹窗
              this.menuDialogVisible = false;
              // 重新加载列表数据
              this.getMenus();
            }
          } catch (error) {
            this.menuSubmitting = false;
            console.log('submitMenuForm error =>>', error);
          }
        }
      });
    },
  },
};
</script>

<style lang="scss">
.admin-menus {
  .form-extra-rule {
    display: flex;
    align-items: center;

    .spe-line {
      display: inline-block;
      width: 50px;
      text-align: center;
      font-weight: 600;
    }

    .el-button {
      margin-left: 15px;
    }
  }

  .roles-list {
    text-align: left;

    .el-tag {
      margin: 0 5px;
    }
  }
}
</style>
