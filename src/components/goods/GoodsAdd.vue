<template>
  <div class="add_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goods' }">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert
        title="请按照步骤录入商品信息"
        type="info"
        center
        show-icon>
      </el-alert>
      <el-steps style="margin: 15px 0" align-center :active="active" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
      </el-steps>
      <el-tabs :before-leave="changeTabBefore" tab-position="left" >
        <el-tab-pane label="基本信息">
          <el-form ref="form" :model="form" :rules="rules" label-width="200px" autocomplete="off">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="form.goods_name" style="width: 400px"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cate">
              <el-cascader
                clearable
                v-model="selectedValues"
                :options="categoryList"
                :props="{ value: 'cat_id', label: 'cat_name' }"
                expandTrigger="hover"
                @change="handleChange">
              </el-cascader>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="form.goods_price" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="form.goods_number" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="form.goods_weight" style="width: 200px"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数">商品参数</el-tab-pane>
        <el-tab-pane label="商品属性">商品属性</el-tab-pane>
        <el-tab-pane label="商品图片">商品图片</el-tab-pane>
        <el-tab-pane label="商品内容">商品内容</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import mixin from './GoodsAddMixin.js'
export default {
  mixins: [mixin]
}
</script>
<style scoped>
</style>
