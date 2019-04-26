<template>
  <div class="cate_container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button type="primary" plain>添加分类</el-button>
      <!-- 树状表格 -->
      <el-table
        :data="categoriesList"
        :indent="50"
        style="width: 100%;"
        row-key="cat_id">
        <el-table-column prop="cat_name" label="分类名称"></el-table-column>
        <el-table-column prop="cat_deleted" label="是否有效">
          <template slot-scope="scope">
            <i v-if="!scope.row.cat_deleted" class="el-icon-success" style="color:green;"></i>
            <i v-else class="el-icon-error" style="color:red;"></i>
          </template>
        </el-table-column>
        <el-table-column label="等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.cat_level === 0">一级分类</el-tag>
            <el-tag v-if="scope.row.cat_level === 1" type="success">二级分类</el-tag>
            <el-tag v-if="scope.row.cat_level === 2" type="warning">三级分类</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button-group>
              <el-button class="el-icon-edit" round></el-button>
              <el-button class="el-icon-delete" round></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import mixin from './CategoriesMixin'
export default {
  mixins: [mixin]
}
</script>
<style scoped>

</style>
