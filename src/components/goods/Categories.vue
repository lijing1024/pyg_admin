<template>
  <div class="cate_container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button type="primary" plain @click="showAddDialog()">添加分类</el-button>
      <!-- 分类列表-树状表格 -->
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
              <el-button class="el-icon-delete" @click="delCate()" round></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页按钮 -->
      <div class="pager_container">
        <el-pagination
          @current-change="changePager"
          :page-size="reqParam.pagesize"
          background
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </el-card>
    <!-- 添加分类对话框 -->
    <el-dialog title="添加分类" width="400px" :visible.sync="addDialogVisible">
      <el-form :model="addForm" ref="addForm" :rules="addRules" label-width="80px" autocomplete="off">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <!-- 级联选择器显示嵌套分类信息 -->
          <!-- 动态渲染数据时需要通过props属性来指定 -->
          <!-- change-on-select是否允许选中任意一级的选项,默认为false -->
          <el-cascader
            change-on-select
            clearable
            :props="{value:'cat_id',label:'cat_name'}"
            style="width:100%"
            expand-trigger="hover"
            :options="parentCate"
            v-model="selectedVal"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate()">确 定</el-button>
      </div>
    </el-dialog>
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
