<template>
  <div class="labs-tree-demo">
    <el-card shadow="hover" class="card-bottom card-header-border-none">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">数组转树结构</h3>
      </div>
      <div>
        <el-tree
          :data="listTree"
          show-checkbox
          default-expand-all
          node-key="id"
          :props="{
            children: 'children',
            label: 'name',
          }"
        ></el-tree>
        <div style="margin-top: 25px;">
          <el-button size="small" @click="treeify">转换树结构</el-button>
        </div>
      </div>
    </el-card>

    <el-card shadow="hover" class="card-bottom card-header-border-none">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">树结构转数组</h3>
      </div>
      <div>
        <el-table
          :data="listArr"
          style="width: 100%"
          border
        >
          <el-table-column
            prop="name"
            label="名称"
            min-width="120"
            header-align="center"
          ></el-table-column>

          <el-table-column
            prop="unique"
            label="唯一标识"
            min-width="120"
            align="center"
          ></el-table-column>

          <el-table-column
            prop="parentId"
            label="父级"
            min-width="250"
            align="center"
          ></el-table-column>

          <el-table-column
            prop="level"
            label="层级"
            width="80"
            align="center"
          ></el-table-column>
        </el-table>
        <div style="margin-top: 25px;">
          <el-button size="small" @click="arrayify">转换数组</el-button>
        </div>
      </div>
    </el-card>

    <el-card shadow="hover" class="card-bottom card-header-border-none">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">树结构转数组 - 改属性</h3>
      </div>
      <div>
        <el-table
          :data="listArr2"
          style="width: 100%"
          border
        >
          <el-table-column
            prop="title"
            label="名称"
            min-width="120"
            header-align="center"
          ></el-table-column>

          <el-table-column
            prop="uniqueKey"
            label="唯一标识"
            min-width="120"
            align="center"
          ></el-table-column>

          <el-table-column
            prop="parentId"
            label="父级"
            min-width="250"
            align="center"
          ></el-table-column>

          <el-table-column
            prop="lev"
            label="层级"
            width="80"
            align="center"
          ></el-table-column>
        </el-table>
        <div style="margin-top: 25px;">
          <el-button size="small" @click="arrayifyMap">转换数组</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { treeify, arrayify } from '@/utils/tree';

export default {
  data() {
    return {
      list: [
        {
          id: '53f8e8d0-889b-11e8-bad9-017274fc3c9b',
          name: '首页',
          parentId: '0',
          unique: 'home',
          created_at: '2018-07-16T01:55:34.494Z',
        },
        {
          id: 'f5f08850-889b-11e8-bad9-017274fc3c9b',
          name: '系统管理',
          parentId: '0',
          unique: 'admin',
          created_at: '2018-07-16T02:00:06.229Z',
        },
        {
          id: 'ffa25fe0-889b-11e8-bad9-017274fc3c9b',
          name: '用户管理',
          parentId: 'f5f08850-889b-11e8-bad9-017274fc3c9b',
          unique: 'user',
          created_at: '2018-07-16T02:00:22.494Z',
        },
        {
          id: '27b63b50-889c-11e8-bad9-017274fc3c9b',
          name: '权限角色',
          parentId: 'f5f08850-889b-11e8-bad9-017274fc3c9b',
          unique: 'permssion',
          created_at: '2018-07-16T02:01:29.733Z',
        },
        {
          id: '27b63b50-889c-11e8-bad9-017274fcasd',
          name: '权限角色 - 1',
          parentId: '27b63b50-889c-11e8-bad9-017274fc3c9b',
          unique: 'permssion',
          created_at: '2018-07-16T02:01:29.733Z',
        },
        {
          id: '27b63b50-889c-11e8-bad9-017274fqweqwe',
          name: '权限角色 - 2',
          parentId: '27b63b50-889c-11e8-bad9-017274fc3c9b',
          unique: 'permssion',
          created_at: '2018-07-16T02:01:29.733Z',
        },
        {
          id: '309b25f0-889c-11e8-bad9-017274fc3c9b',
          name: '权限菜单',
          parentId: 'f5f08850-889b-11e8-bad9-017274fc3c9b',
          unique: 'menu',
          created_at: '2018-07-16T02:01:44.655Z',
        },
      ],
      listArr: [],
      listArr2: [],
      listTree: [],
    };
  },
  methods: {
    treeify() {
      this.listTree = treeify(this.list);
    },
    arrayify() {
      if (this.listTree.length === 0) {
        this.$message.info('先转换树结构');
        return;
      }

      this.listArr = arrayify(this.listTree);
    },
    arrayifyMap() {
      if (this.listTree.length === 0) {
        this.$message.info('先转换树结构');
        return;
      }

      this.listArr2 = arrayify(this.listTree, 'children', 1, {
        name: 'title',
        unique: 'uniqueKey',
        level: 'lev',
      });
    },
  },
};
</script>
