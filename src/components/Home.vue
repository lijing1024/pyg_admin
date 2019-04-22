<template>
  <el-container class="home_container">
    <el-header class="home_header">
      <el-button @click="toggleMenu()" icon="iconfont icon-menu" size="mini" circle></el-button>
      <span class="title">品优购后台管理系统</span>
      <el-button class="exit" type="danger" round @click="logout()">退出</el-button>
    </el-header>
    <el-container>
      <el-aside class="home_aside" :width="iscollapse?'65px':'180px'">
        <el-menu
          unique-opened
          router
          :collapse="iscollapse"
          :collapse-transition="false"
          style="border:none;margin-top:5px"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b">
          <!-- 一级导航 -->
          <el-submenu v-for="(item, i) in menus" :key="item.id" :index="item.id+''">
            <template slot="title">
              <i :class="['iconfont', iconList[i]]"></i>
              <span>&nbsp;{{item.authName}}</span>
            </template>
            <!-- 二级导航 -->
            <!-- 启动router模式,index即为跳转路径 -->
            <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.path" >
              <i class="el-icon-menu"></i>
              <span>{{subItem.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="home_main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {
      iscollapse: false,
      menus: [],
      children: [],
      iconList: ['icon-account', 'icon-cog', 'icon-shoppingcart', 'icon-file', 'icon-chart-area']
    }
  },
  methods: {
    // 折叠or展开导航菜单
    toggleMenu () {
      this.iscollapse = !this.iscollapse
    },
    // 获取菜单数据
    async loadData () {
      const {data: {data, meta}} = await this.$axios.get('menus')
      if (meta.status !== 200) return this.$message.error('获取菜单信息失败')
      // 成功获取菜单列表数据
      this.menus = data
    },
    // 退出登录
    logout () {
      sessionStorage.removeItem('token')
      this.$router.push('/login')
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>
<style>
  .home_container{
    height: 100%;
  }
  .home_header{
    background-color: #373D41;
    line-height: 60px;
  }
  .home_header .exit{
    float: right;
    margin-top: 15px;
  }
  .home_header .title{
    color: #fff;
    margin-left: 10px;
    font-size: 18px;
  }
  .home_aside{
    background-color: #333744;
  }
  .home_main{
    background-color: #EAEDF1;
  }
</style>
