<template>
  <div class="admin-roles">
    <el-card shadow="hover" class="card-bottom card-header-border-none">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">角色信息</h3>
        <!-- <div class="card-header-extra">
          <el-button type="primary" size="medium" :loading="submintting">保存</el-button>
        </div> -->
      </div>

      <el-form
        :model="roleForm"
        status-icon
        :rules="rules"
        ref="roleForm"
        label-width="60px"
        class="form"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model.number="roleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="roleForm.status">
            <el-radio-button label="1">有效</el-radio-button>
            <el-radio-button label="0">无效</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            :loading="submintting"
            @click="submitForm('roleForm')"
          >确定提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="hover" class="card-bottom card-header-border-none">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">角色权限</h3>
      </div>
      <el-tree
        class="roles-tree"
        :data="menus"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="rolesTree"
        v-loading="loading"
        :props="{
          label: 'name',
          children: 'children',
        }"
      >
        <div class="roles-tree-node" slot-scope="{ node, data }">
          <h3 class="node-name">{{ node.label }}</h3>
          <div class="extra-rules" v-if="data.extraRules && data.extraRules.length > 0">
            <span class="extra-rules-title">└─ 特殊控制</span>
            <el-checkbox-group
              v-model="data.extraRulesCheckedValues"
              @change="handleExtraRulesChange(data.id, data.name, $event)"
            >
              <el-checkbox
                v-for="rule in data.extraRules"
                :key="rule.value"
                :label="rule.value"
              >{{rule.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </el-tree>
    </el-card>
  </div>
</template>

<script>
import { treeify } from '@/utils/tree';
import { createRole } from '@/api/admin/roles';
import { getMenus } from '@/api/admin/menus';

export default {
  data() {
    return {
      submintting: false,
      roleForm: {
        name: '',
        status: '1', // 0: 无效; 1: 有效
        menus: [],
      },

      rules: {
        name: [{ required: true, message: '角色名称不能为空' }],
        status: [{ required: true, message: '选择角色状态' }],
      },

      loading: false,
      menus: [],
    };
  },
  created() {
    this.getMenus();
  },
  methods: {
    // 获取权限勾选项
    getCheckedNodes() {
      return this.$refs.rolesTree.getCheckedNodes();
    },
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
            // 勾选的额外规则
            item.extraRulesCheckedValues = [];
            return item;
          });
          this.menus = treeify(res.data);
        }
      } catch (error) {
        this.loading = false;
        console.log('getMenus error', error);
      }
    },
    // 勾选额外规则
    // 判断额外规则所在页面是否勾选
    handleExtraRulesChange(menuId, menuName, extraRulesCheckedValues) {
      if (extraRulesCheckedValues.length > 0) {
        const checkedMenu = this.$refs.rolesTree.getCheckedKeys().includes(menuId);
        // 所在页面未勾选, 提示
        if (!checkedMenu) {
          console.warn('The page unchecked!');
          this.$message.warning(`“${menuName}”页面未勾选`);
        }
      }
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const menus = this.getCheckedNodes();
          // 提交前处理未选择角色权限
          let confirmRes;
          if (menus.length === 0) {
            confirmRes = await this.$confirm(
              '未选择角色权限, 是否继续提交?', '提示',
              {
                type: 'warning',
              },
            ).catch((error) => {
              if (error === 'cancel') {
                this.$message.info('已取消提交');
              }
            });
          } else {
            confirmRes = 'confirm';
          }
          // 未选择角色权限时, 取消提交
          if (confirmRes !== 'confirm') {
            return;
          }

          // 处理勾选的额外规则
          menus.forEach((menu) => {
            menu.extraRulesChecked = [];
            if (menu.extraRulesCheckedValues.length > 0) {
              menu.extraRulesChecked = menu.extraRulesCheckedValues.map((value) => {
                const ruleCheckedArr = menu.extraRules.filter(item => item.value === value);
                return ruleCheckedArr[0];
              });
            }
            delete menu.extraRules;
            delete menu.extraRulesShow;
            delete menu.children;
          });

          this.roleForm.menus = menus;
          this.submintting = true;

          try {
            const res = await createRole(this.roleForm);
            this.submintting = false;
            if (!res.success) {
              this.$message.error(res.message || '添加失败，请重试');
            } else {
              this.$message.success({
                message: '添加成功',
                onClose: () => {
                  this.$router.replace('/admin/roles/list');
                },
              });
            }
          } catch (error) {
            this.submintting = false;
            console.log('createRole error =>>', error);
          }
        }
      });
    },
  },
};
</script>

<style lang="scss">
.roles-tree {

  .el-tree-node__content {
    height: auto;
    position: relative;
    display: flex;
    align-items: flex-start;
    padding: 2px 0;

    > .el-checkbox {
      position: relative;
      top: 4px;
    }
  }

  .node-name {
    height: 26px;
    line-height: 26px;
    font-weight: 400;
  }

  .extra-rules {
    padding: 5px 0 8px;
    position: relative;
    padding-left: 85px;
    color: #999;
    font-size: 13px;

    .extra-rules-title {
      position: absolute;
      left: 0;
      top: 5px;
    }

    .el-checkbox {
      color: #999;
      font-size: 13px;
    }
  }

}
</style>
