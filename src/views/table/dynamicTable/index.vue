<template>
  <div class="table-demo">

    <el-card shadow="hover" class="card-bottom card-header-border-none">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">固定表头, 按照表头顺序排序</h3>
      </div>
      <fixed-thead></fixed-thead>
    </el-card>

    <el-card shadow="hover" class="card-bottom card-header-border-none">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">不固定表头, 按照点击顺序排序</h3>
      </div>
      <unfixed-thead></unfixed-thead>
    </el-card>

  </div>
</template>

<script>
import fixedThead from './fixedThead';
import unfixedThead from './unfixedThead';

export default {
  components: {
    fixedThead,
    unfixedThead,
  },
};
</script>
