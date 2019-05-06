<template>
  <div class="params_container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert title="注：只有第三级分类才可以设置参数" type="warning" show-icon></el-alert>
      <el-form style="margin: 15px 0">
        <el-form-item label="选择商品分类：">
          <el-cascader
            expand-trigger="hover"
            :props="{value: 'cat_id', label: 'cat_name'}"
            :options="parentCate"
            v-model="selectedVal"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
      </el-form>
      <!-- Tab栏切换 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button @click="showAddDialog()" type="success" :disabled="disabled">添加动态参数</el-button>
          <el-table
          :data="manyAttrs">
            <el-table-column type="expand" width="100px">
              <template slot-scope="scope">
                <el-tag v-for="(item, i) in scope.row.attr_vals.split(',')" :key="i">{{item}}</el-tag>
                <el-tag>添加+</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="属性名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作" width="120px">
              <template>
                <el-button-group>
                  <el-button icon="el-icon-edit" round></el-button>
                  <el-button icon="el-icon-delete" round></el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态参数" name="only">
          <el-button @click="showAddDialog()" type="success" :disabled="disabled">添加静态参数</el-button>
          <el-table :data="onlyAttrs">
            <el-table-column type="index" width="100px" align="center"></el-table-column>
            <el-table-column label="属性名称" prop="attr_name"></el-table-column>
            <el-table-column label="属性值">
              <template slot-scope="scope">
                <el-tag size="normal" style="width:300px;">{{scope.row.attr_vals}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button-group>
                  <el-button icon="el-icon-edit"></el-button>
                  <el-button icon="el-icon-delete"></el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 添加参数对话框 -->
    <el-dialog :title="activeName==='many'?'添加动态参数':'添加静态参数'" width="400px" :visible.sync="addDialogVisiable">
      <el-form :model="addForm" ref="addForm" :rules="addRules" label-width="80px">
        <el-form-item label="参数名称" prop="attr_name">
          <el-input v-model="addForm.attr_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisiable = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import mixin from './ParamsMixin'
export default {
  mixins: [mixin]
}
</script>
<style scoped>
.el-tag {
  margin: 5px;
}
</style>
