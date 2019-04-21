<template>
  <el-container class="home_container">
    <el-header class="home_header">
      <el-button @click="toggleMenu()" icon="iconfont icon-menu" size="mini" circle></el-button>
      <span class="title">品优购后台管理系统</span>
      <el-button class="exit" type="danger" round>退出</el-button>
    </el-header>
    <el-container>
      <el-aside class="home_aside" :width="iscollapse?'65px':'180px'">
        <el-menu
          unique-opened
          @open="handleOpen"
          @close="handleClose"
          :collapse="iscollapse"
          :collapse-transition="false"
          style="border:none;margin-top:5px"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu v-for="(val, key) in menus" :key="val.id" :index="key+''">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{val.authName}}</span>
            </template>
            <el-menu-item :index="key +'-'+ (index+1)" v-for="(item, index) in val.children" :key="item.id">{{item.authName}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="home_main">欢迎来到品优购后台管理系统</el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: 'Home',
  data(){
    return {
      iscollapse: false,
      menus: [],
      children: []
    }
  },
  methods: {
    // 折叠or展开导航菜单
    toggleMenu () {
      this.collapse=!this.collapse
    },
    // 获取菜单数据
    loadData () {
      this.$axios.get('menus')
        .then(res => {
          this.menus = res.data.data
          this.children = res.data.data.children
        })
    },
    handleOpen (key) {
      console.log(key)
    },
    handleClose (key) {
      console.log(key)
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
    font-size: 24px;
  }
</style>
