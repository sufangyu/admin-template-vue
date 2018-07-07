<template>
  <div class="chart-demo">

    <el-card shadow="hover" class="el-card card-bottom card-header-border-none is-hover-shadow">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">基础示例</h3>
      </div>
      <ve-ring :data="chartData"></ve-ring>
    </el-card>

    <el-card shadow="hover" class="el-card card-bottom card-header-border-none is-hover-shadow">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">设置指标维度</h3>
      </div>
      <ve-ring :data="chartData" :settings="chartSettings"></ve-ring>
    </el-card>

    <el-card shadow="hover" class="el-card card-bottom card-header-border-none is-hover-shadow">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">玫瑰图</h3>
      </div>
      <ve-ring :data="chartData" :settings="chartSettings2"></ve-ring>
    </el-card>

    <el-card shadow="hover" class="el-card card-bottom card-header-border-none is-hover-shadow">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">限制显示条数饼图</h3>
      </div>
      <ve-ring :data="chartData" :settings="chartSettings3"></ve-ring>
    </el-card>

    <el-card shadow="hover" class="el-card card-bottom card-header-border-none is-hover-shadow">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">设置数据类型</h3>
      </div>
      <ve-ring :data="chartData" :settings="chartSettings4"></ve-ring>
    </el-card>

    <el-card shadow="hover" class="el-card card-bottom card-header-border-none is-hover-shadow">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">设置饼图半径边距</h3>
      </div>
      <ve-ring :data="chartData" :settings="chartSettings5"></ve-ring>
    </el-card>

  </div>
</template>

<script>
/* eslint-disable quote-props */
export default {
  data() {
    // 设置指标维度
    this.chartSettings = {
      dimension: '日期',
      metrics: '访问用户',
    };

    // 玫瑰图
    this.chartSettings2 = {
      roseType: 'radius',
    };

    // 限制显示条数饼图
    this.chartSettings3 = {
      limitShowNum: 5,
    };

    // 设置数据类型
    this.chartSettings4 = {
      dataType: 'percent',
    };

    // 设置饼图半径边距
    this.chartSettings5 = {
      radius: [10, 100],
      offsetY: 300,
    };

    return {
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
