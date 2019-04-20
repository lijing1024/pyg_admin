<template>
  <div class="container">
    <div class="login_box">
      <img src="../assets/images/logo.png" alt="logo">
      <el-form :model="form" :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-account" placeholder="请输入用户名" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input  type="password" prefix-icon="iconfont icon-eye-slash" placeholder="请输入密码" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit()">登录</el-button>
          <el-button>重置</el-button>
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
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '密码长度在6到18之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit () {
      // 验证表单
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          const {data: {data, meta}} = await this.$axios.post('login', this.form)
          if (meta.status !== 200) return this.$message.error(meta.msg || '登录失败')
          // 登录成功后需要保存token到sessionStorage,再跳转到首页
          sessionStorage.setItem('token', data.token)
          this.$router.push('/home')
        }
      })
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
