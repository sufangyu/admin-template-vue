<template>
  <div class="chart-demo">

    <el-card shadow="hover" class="el-card card-bottom card-header-border-none is-hover-shadow">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">基础示例</h3>
      </div>
      <ve-bar :data="chartData"></ve-bar>
    </el-card>

    <el-card shadow="hover" class="el-card card-bottom card-header-border-none is-hover-shadow">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">设置显示的指标维度</h3>
      </div>
      <ve-bar :data="chartData" :settings="chartSettings"></ve-bar>
    </el-card>

    <el-card shadow="hover" class="el-card card-bottom card-header-border-none is-hover-shadow">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">排序条形图</h3>
      </div>
      <ve-bar :data="chartData" :settings="chartSettings2"></ve-bar>
    </el-card>

    <el-card shadow="hover" class="el-card card-bottom card-header-border-none is-hover-shadow">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">条形轴配置双y轴</h3>
      </div>
      <ve-bar :data="chartData2" :settings="chartSettings3"></ve-bar>
    </el-card>

    <el-card shadow="hover" class="el-card card-bottom card-header-border-none is-hover-shadow">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">设置legend别名</h3>
      </div>
      <ve-bar :data="chartData3" :settings="chartSettings4"></ve-bar>
    </el-card>

    <el-card shadow="hover" class="el-card card-bottom card-header-border-none is-hover-shadow">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">堆叠条形图</h3>
      </div>
      <ve-bar :data="chartData" :settings="chartSettings5"></ve-bar>
    </el-card>

    <el-card shadow="hover" class="el-card card-bottom card-header-border-none is-hover-shadow">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">设置纵轴为连续的数值轴</h3>
      </div>
      <ve-bar :data="chartData4" :settings="chartSettings6"></ve-bar>
    </el-card>

  </div>
</template>

<script>
/* eslint-disable quote-props */
export default {
  data() {
    this.chartSettings = {
      metrics: ['访问用户'], // 指标. 默认columns第二项起为指标
      dimension: ['日期'], // 维度. 默认columns第一项为维度
    };

    this.chartSettings2 = {
      metrics: ['访问用户'],
      dataOrder: {
        label: '访问用户',
        order: 'desc',
      },
    };

    // 条形轴配置双y轴
    this.chartSettings3 = {
      xAxisType: ['KMB', 'KMB'],
      xAxisName: ['下单用户', '访问用户'],
      axisSite: {
        top: ['访问用户'],
      },
    };

    // 设置别名
    this.chartSettings4 = {
      labelMap: {
        'PV': '访问用户',
        'Order': '下单用户',
      },
      legendName: {
        '访问用户': '访问用户 total: 10000',
      },
    };

    // 堆叠条形图
    this.chartSettings5 = {
      stack: {
        '用户': ['访问用户', '下单用户'],
      },
    };

    // 设置纵轴为连续的数值轴
    this.chartSettings6 = {
      yAxisType: 'value',
    };

    return {
      chartData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
          { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
          { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
          { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
          { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
          { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 },
        ],
      },

      chartData2: {
        columns: ['日期', '访问用户', '下单用户'],
        rows: [
          { '日期': '1/1', '访问用户': 1393, '下单用户': 1093 },
          { '日期': '1/2', '访问用户': 3530, '下单用户': 3230 },
          { '日期': '1/3', '访问用户': 2923, '下单用户': 2623 },
          { '日期': '1/4', '访问用户': 1723, '下单用户': 1423 },
          { '日期': '1/5', '访问用户': 3792, '下单用户': 3492 },
          { '日期': '1/6', '访问用户': 4593, '下单用户': 4293 },
        ],
      },

      chartData3: {
        columns: ['date', 'PV', 'Order', 'OrderRate'],
        rows: [
          { 'date': '1/1', 'PV': 1393, 'Order': 1093, 'OrderRate': 0.32 },
          { 'date': '1/2', 'PV': 3530, 'Order': 3230, 'OrderRate': 0.26 },
          { 'date': '1/3', 'PV': 2923, 'Order': 2623, 'OrderRate': 0.76 },
          { 'date': '1/4', 'PV': 1723, 'Order': 1423, 'OrderRate': 0.49 },
          { 'date': '1/5', 'PV': 3792, 'Order': 3492, 'OrderRate': 0.323 },
          { 'date': '1/6', 'PV': 4593, 'Order': 4293, 'OrderRate': 0.78 },
        ],
      },

      chartData4: {
        columns: ['日期', '访问用户'],
        rows: [
          { '日期': 1, '访问用户': 1393 },
          { '日期': 2, '访问用户': 3530 },
          { '日期': 5, '访问用户': 2923 },
          { '日期': 10, '访问用户': 1723 },
          { '日期': 15, '访问用户': 3792 },
          { '日期': 20, '访问用户': 4593 },
        ],
      },
    };
  },
};
</script>
