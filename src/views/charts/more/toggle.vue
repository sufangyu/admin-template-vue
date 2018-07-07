<template>
  <div class="chart-demo">

    <el-card shadow="hover" class="el-card card-bottom card-header-border-none is-hover-shadow">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">示例</h3>
      </div>
      <p>为了方便使用一份数据即可生成不同的表格，可以使用 ve-chart 组件，切换图表类型则只需要改变settings即可。</p>
      <div style="margin-top: 25px;">
        <ve-chart :data="chartData" :settings="chartSettings"></ve-chart>
        <p style="text-align: center;">
          <el-button type="primary" @click="changeType">切换图表类型 - {{typeArr[index]}}</el-button>
        </p>
      </div>
    </el-card>

  </div>
</template>

<script>
/* eslint-disable quote-props */
export default {
  data() {
    this.typeArr = ['line', 'histogram', 'pie'];
    this.index = 0;

    return {
      chartSettings: {
        type: this.typeArr[this.index],
      },
      chartData: {
        columns: ['日期', '访问用户'],
        rows: [
          { '日期': '1月1日', '访问用户': 1523 },
          { '日期': '1月2日', '访问用户': 1223 },
          { '日期': '1月3日', '访问用户': 2123 },
          { '日期': '1月4日', '访问用户': 4123 },
          { '日期': '1月5日', '访问用户': 3123 },
          { '日期': '1月6日', '访问用户': 7123 },
        ],
      },
    };
  },
  methods: {
    changeType() {
      this.index += 1;
      this.index = this.index % this.typeArr.length;
      this.chartSettings = {
        type: this.typeArr[this.index],
      };
    },
  },
};
</script>
