<template>
  <div class="good_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入搜索内容" v-model="reqParams.query">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="18">
          <el-button type="primary"  plain>添加商品</el-button>
        </el-col>
      </el-row>
      <el-table :data="goodsList">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="商品名称" width="300px" prop="goods_name"></el-table-column>
        <el-table-column label="价格" prop="goods_price"></el-table-column>
        <el-table-column label="重量" prop="goods_weight"></el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" circle></el-button>
            <el-button icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import mixin from './GoodsMixin.js'
export default {
  mixins: [mixin]
}
</script>
<style scoped>

</style>
