<template>
  <div class="users_container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索&添加新用户 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入搜索关键字" v-model="serchVal">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="16">
          <el-button type="primary" plain @click="addUser()">添加新用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户数据列表 -->
      <el-table :data="userList" style="width: 100%" stripe fit>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ccc">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button-group>
              <el-button type="plain" icon="el-icon-edit" round></el-button>
              <el-button type="plain" icon="el-icon-delete"></el-button>
              <el-button type="plain" icon="el-icon-setting" round></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页按钮 -->
      <div class="pager_container">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'Users',
  data () {
    return {
      // 搜索框动态数据绑定
      serchVal: '',
      userList: [],
      // 获取用户列表时的get请求的传参
      reqParam: {
        query: '',
        pagenum: 1,
        pagesize: 10
      }
    }
  },
  methods: {
    // 请求数据
    async loadData () {
      const {data: {data, meta}} = await this.$axios.get('users', {params: this.reqParam})
      if (meta.status !== 200) return this.$message.error('获取用户数据失败')
      this.userList = data.users
    }
    // 添加新用户
  },
  mounted () {
    this.loadData()
  }
}
</script>
<style>
</style>
