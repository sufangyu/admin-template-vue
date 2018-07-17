<template>
  <div class="admin-menu">
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
          prop="extraRulesShow"
          label="额外规则"
          align="center"
          min-width="300"
        >
          <template slot-scope="scope">
            <div
              class="rule-list"
              v-if="scope.row.extraRulesShow && scope.row.extraRulesShow.length > 0"
            >
              <el-tag size="small" v-for="rule in scope.row.extraRulesShow" :key="rule.value">
                {{rule.name || rule.value || '-'}}
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

    <!-- 添加菜单弹窗 -->
    <el-dialog
      :title="menuActionTypeName"
      :visible.sync="menuDialogVisible"
      width="85%"
      center
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
          <el-input v-model.number="menuForm.name"></el-input>
        </el-form-item>

        <el-form-item label="唯一标识" prop="unique">
          <el-input v-model.number="menuForm.unique"></el-input>
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

        <el-form-item
          v-for="(rule, index) in menuForm.extraRules"
          :label="`额外规则 ${index + 1}`"
          :key="rule.key"
          :prop="`extraRules.${index}.value`"
        >
          <div class="form-extra-rule">
            <el-input v-model.lazy="rule.name" placeholder="规则名称"></el-input>
            <span class="spe-line">:</span>
            <el-input v-model.lazy="rule.value" placeholder="规则值"></el-input>
            <el-button
              v-if="index === 0"
              type="primary"
              @click.prevent="handleCreateRule()"
            >新增</el-button>
            <el-button
              v-else
              @click.prevent="handleDelRule(rule)"
            >删除</el-button>
          </div>
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
import { getMenus, createAndEditMenu, delMenu } from '@/api/admin/menu';

// 顶级菜单选项
const topParent = {
  id: '0',
  name: '作为顶级菜单',
};
// 默认额外规则
const defaultExtraRules = [
  { name: '', value: '' },
];

export default {
  components: {
    TreeTable,
  },
  data() {
    return {
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
        extraRules: defaultExtraRules,
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
    this.getMenus();
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
          res.data.map((item) => {
            // 数组单项对象深拷贝, 解决编辑额外规则同步到列表中显示;
            if (item.extraRules) {
              item.extraRulesShow = item.extraRules.map(rule => ({ ...rule }));
            } else {
              item.extraRulesShow = [];
            }
            return item;
          });
          this.menusTmp = res.data;
          this.menus = treeify(res.data);
        }
      } catch (error) {
        this.loading = false;
        console.log('getMenus error', error);
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
        extraRules: [...defaultExtraRules],
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
    // 添加规则
    handleCreateRule() {
      this.menuForm.extraRules.push({
        name: '',
        value: '',
      });
    },
    // 删除规则
    handleDelRule(rule) {
      const index = this.menuForm.extraRules.indexOf(rule);
      console.log(index);
      if (index !== -1) {
        this.menuForm.extraRules.splice(index, 1);
      }
    },
    // 删除菜单
    async handleDel(menu) {
      if (!menu.id || menu.id === '') {
        console.warn('miss delete menu\'s id!');
        return;
      }

      try {
        const confirmResult = await this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
          type: 'warning',
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
      } catch (error) {
        console.log('handleDel error =>>', error);
        if (error === 'cancel') {
          this.$message.info('已取消删除操作');
        }
      }
    },
    // 编辑菜单
    handleEditMenu(menu) {
      const { id, name, unique, parentId, extraRulesShow } = menu;
      this.menuActionType = 'edit';
      this.menuDialogVisible = true;

      // 重置 额外规则设置. 解决显示之前编辑未提交的数据
      const extraRules = extraRulesShow.map(rule => ({ ...rule }));

      this.menuForm = {
        id,
        name,
        unique,
        parentId,
        extraRules,
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

            // 处理额外规则. 过滤空项额外规则
            if (data.extraRules.length > 0) {
              data.extraRules = data.extraRules.filter(rule => rule.name !== '' && rule.value !== '');
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
              // 重置额外规则
              this.$set(this.menuForm, 'extraRules', defaultExtraRules);
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
.admin-menu {
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

  .rule-list {
    text-align: left;

    .el-tag {
      margin: 0 5px;
    }
  }
}
</style>
