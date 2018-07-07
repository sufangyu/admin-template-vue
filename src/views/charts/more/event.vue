<template>
  <div class="chart-demo">

    <el-card shadow="hover" class="el-card card-bottom card-header-border-none is-hover-shadow">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">示例</h3>
      </div>
      <p>绑定事件通过传递一个事件名称和对应回调函数的对象实现，回调函数内的参数是 echarts 模块，可以据此做相应的处理。</p>
      <div style="margin-top: 25px;">
        <p>被点击日期：{{name}}</p>
        <ve-pie
          :data="chartData"
          :settings="chartSettings"
          :events="chartEvents"
        ></ve-pie>
      </div>
    </el-card>

  </div>
</template>

<script>
/* eslint-disable quote-props */
export default {
  data() {
    this.chartSettings = {
      selectedMode: 'single',
      hoverAnimation: false,
    };
    this.chartEvents = {
      click: (e) => {
        console.log(e);
        this.name = e.name;
      },
    };

    return {
      name: '',
      chartData: {
        columns: ['日期', '访问用户'],
        rows: [
          { '日期': '1/1', '访问用户': 1393 },
          { '日期': '1/2', '访问用户': 3530 },
          { '日期': '1/3', '访问用户': 2923 },
          { '日期': '1/4', '访问用户': 1723 },
          { '日期': '1/5', '访问用户': 3792 },
          { '日期': '1/6', '访问用户': 4593 },
        ],
      },
    };
  },
};
</script>
