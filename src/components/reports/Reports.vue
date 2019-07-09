<template>
  <div class="reports_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div ref="box"  class="box"></div>
    </el-card>
  </div>
</template>
<script>
import mixin from './ReportsMixin.js'
export default {
  mixins: [mixin]
}
</script>
<style scoped>
  .box {
    width: 600px;
    height: 500px;
  }
</style>
