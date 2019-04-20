<template>
  <div class="container">
    <div class="login_box">
      <img src="../assets/images/logo.png" alt="logo">
      <el-form :model="form">
        <el-form-item>
            <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input placeholder="请输入密码" v-model="form.password"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  }
}
</script>
<style>
  .container{
      position: relative;
      width: 100%;
      height: 100%;
      background: linear-gradient(30deg,#fff, #659097);
  }
  .container .login_box{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -60%);
      width: 400px;
      height: 250px;
      padding: 0 15px;
      background: linear-gradient(210deg,#fff, rgb(162, 201, 201));
      box-shadow: 0 0 10px #fff;
  }
  .container .login_box img {
      display: block;
      margin:15px auto;
  }
</style>
