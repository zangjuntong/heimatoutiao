<template>
  <div class="main">
    <el-card class="login-card">
      <div class="login-img">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <el-form ref="myform" :model="loginForm" :rules="loginrules">
        <el-form-item prop="mobile">
        <el-input v-model="loginForm.mobile" placeholder='请输入手机号'></el-input>
      </el-form-item>
       <el-form-item prop="code">
        <el-input v-model="loginForm.code" style="width:65%" placeholder='请输入验证码'></el-input>
      <el-button plain style="float:right">发送验证码</el-button>
      </el-form-item>
      <el-form-item prop="checkbox">
         <el-checkbox v-model="loginForm.checkbox">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitLogin" style="width:100%" type="primary">登录</el-button>
      </el-form-item>

      </el-form>

    </el-card>
  </div>
</template>

<script>
// import { log } from 'util'
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: '',
        checkbox: false
      },
      loginrules: {
        mobile: [{ required: true, message: '请输入手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确' }],
        code: [{ required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码不正确' }],
        checkbox: [{ validator: function (rule, value, callback) {
          if (value) {
            callback()
          } else {
            callback(new Error('请选择已同意'))
          }
        } }]
      }
    }
  },
  methods: {
    submitLogin () {
      this.$refs.myform.validate((isok) => {
        if (isok) {
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.loginForm
          }).then(result => {
            let tokens = result.data.data.token
            window.localStorage.setItem('user-token', tokens)
            this.$router.push('/')
          }).catch(() => {
            this.$message({
              message: '账号或密码不正确',
              type: 'warning'
            })
          })
        }
      })
    }
  }
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
      height: 350px;
      opacity: 0.7;
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
