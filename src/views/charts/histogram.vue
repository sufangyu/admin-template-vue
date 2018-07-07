<template>
  <div class="chart-demo">

    <el-card shadow="hover" class="card-bottom">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">基础示例</h3>
      </div>
      <ve-histogram :data="chartData"></ve-histogram>
    </el-card>

    <el-card shadow="hover" class="card-bottom">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">设置显示的指标维度</h3>
      </div>
      <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
    </el-card>

    <el-card shadow="hover" class="card-bottom">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">柱状图+折线图</h3>
      </div>
      <ve-histogram :data="chartData" :settings="chartSettings2"></ve-histogram>
    </el-card>

    <el-card shadow="hover" class="card-bottom">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">堆叠柱状图</h3>
      </div>
      <ve-histogram :data="chartData" :settings="chartSettings3"></ve-histogram>
    </el-card>

    <el-card shadow="hover" class="card-bottom">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">默认显示柱状图数据</h3>
      </div>
      <ve-histogram :data="chartData" :extend="extend"></ve-histogram>
    </el-card>

    <el-card shadow="hover" class="card-bottom">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">设置别名</h3>
      </div>
      <ve-histogram :data="chartData2" :settings="chartSettings4"></ve-histogram>
    </el-card>

    <el-card shadow="hover" class="card-bottom">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">设置横轴为连续的数值轴</h3>
      </div>
      <ve-histogram :data="chartData3" :settings="chartSettings5"></ve-histogram>
    </el-card>

  </div>
</template>

<script>
/* eslint-disable quote-props */
export default {
  data() {
    this.chartSettings = {
      metrics: ['访问用户', '下单用户'], // 指标. 默认columns第二项起为指标
      dimension: ['日期'], // 维度. 默认columns第一项为维度
    };

    // 柱状图+折线图
    this.chartSettings2 = {
      showLine: ['下单用户'],
    };

    // 堆叠柱状图
    this.chartSettings3 = {
      stack: { '用户情况': ['访问用户', '下单用户'] },
    };

    // 默认显示柱状图数据
    this.extend = {
      series: {
        label: { show: true, position: 'top' },
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

    // 设置横轴为连续的数值轴
    this.chartSettings5 = {
      xAxisType: 'value',
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

      chartData3: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { '日期': 1, '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
          { '日期': 2, '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
          { '日期': 5, '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
          { '日期': 10, '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
          { '日期': 20, '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
          { '日期': 22, '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 },
        ],
      },
    };
  },
};
</script>
