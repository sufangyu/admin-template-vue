<template>
  <div>
    <el-card shadow="hover" class="card-bottom card-header-border-none">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">树形表格</h3>
      </div>
      <tree-table :data="data1"
        border
        :firstColumn="{
          prop: 'event',
          label: '事件',
          align: 'left',
          headerAlign: 'center',
          minWidth: 200,
        }"
      >
        <el-table-column
          prop="id"
          label="ID"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="timeLine"
          label="时间线"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="comment"
          label="备注"
          align="center"
        ></el-table-column>
      </tree-table>
    </el-card>

    <el-card shadow="hover" class="card-bottom card-header-border-none">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">通过 columns 设置</h3>
      </div>
      <tree-table :data="data2" :columns="columns" border></tree-table>
    </el-card>
  </div>
</template>

<script>
import TreeTable from '@/components/TreeTable';

export default {
  components: {
    TreeTable,
  },
  data() {
    const treeData = [
      {
        id: 0,
        event: '事件1',
        timeLine: 50,
        comment: '无',
      },
      {
        id: 1,
        event: '事件1',
        timeLine: 100,
        comment: '无',
        children: [
          {
            id: 2,
            event: '事件2',
            timeLine: 10,
            comment: '无',
          },
          {
            id: 3,
            event: '事件3',
            timeLine: 90,
            comment: '无',
            children: [
              {
                id: 4,
                event: '事件4',
                timeLine: 5,
                comment: '无',
              },
              {
                id: 5,
                event: '事件5',
                timeLine: 10,
                comment: '无',
              },
              {
                id: 6,
                event: '事件6',
                timeLine: 75,
                comment: '无',
                children: [
                  {
                    id: 7,
                    event: '事件7',
                    timeLine: 50,
                    comment: '无',
                    children: [
                      {
                        id: 71,
                        event: '事件71',
                        timeLine: 25,
                        comment: 'xx',
                      },
                      {
                        id: 72,
                        event: '事件72',
                        timeLine: 5,
                        comment: 'xx',
                      },
                      {
                        id: 73,
                        event: '事件73',
                        timeLine: 20,
                        comment: 'xx',
                      },
                    ],
                  },
                  {
                    id: 8,
                    event: '事件8',
                    timeLine: 25,
                    comment: '无',
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    const treeData1 = treeData.concat([]);
    const treeData2 = treeData.concat([]);

    return {
      data1: treeData1,
      data2: treeData2,
      columns: [
        {
          text: '事件',
          value: 'event',
          minWidth: 200,
          headerAlign: 'center',
          align: 'left',
        },
        {
          text: 'ID',
          value: 'id',
          align: 'center',
        },
        {
          text: '时间线',
          value: 'timeLine',
          align: 'center',
        },
        {
          text: '备注',
          value: 'comment',
          align: 'center',
        },
      ],
    };
  },
};
</script>
