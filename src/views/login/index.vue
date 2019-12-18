<template>
  <div class="main">
    <el-card class="login-card">
      <div class="login-img">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <el-form>
        <el-form-item>
        <el-input placeholder='请输入手机号'></el-input>
      </el-form-item>
       <el-form-item>
        <el-input style="width:65%" placeholder='请输入验证码'></el-input>
      <el-button plain style="float:right">发送验证码</el-button>
      </el-form-item>
      <el-button style="width:100%" type="primary">主要按钮</el-button>
      </el-form>

    </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
 .main {
   background-image: url('../../assets/img/222.jpg');
   height: 100vh;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-card {
      width: 450px;
      height: 300px;
      opacity: 0.5;
      .login-img {
        text-align: center;
        margin-bottom: 30px;
        img {
          width: 180px;
        }
      }
    }
 }
</style>
