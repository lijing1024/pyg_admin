<template>
  <div class="welcome_container">
    <p>欢迎来到品优购后台管理系统</p>
  </div>
</template>
<script>
export default {
  name: 'Welcome'
}
</script>
<style>
  .welcome_container{
    position: relative;
    width: 100%;
    height: 100%;
  }
  .welcome_container p{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -300%);
    font-size: 28px;
  }
</style>
