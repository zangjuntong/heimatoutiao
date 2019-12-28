<template>
  <el-card>
      <bread-crum slot="header">
    <template slot="title">账户信息</template>
    </bread-crum>
    <el-form ref="myform" :model="formData" :rules='rules' style="margin-left:100px" label-width="100px">
          <el-form-item prop='name' label="用户名">
              <el-input v-model="formData.name" style="width:40%"></el-input>
          </el-form-item>
           <el-form-item prop='intro' label="简介">
               <el-input v-model="formData.intro" style="width:40%"></el-input>
           </el-form-item>
           <el-form-item prop='email' label="邮箱">
               <el-input v-model="formData.email"  style="width:40%"></el-input>
           </el-form-item>
           <el-form-item label="手机号">
               <el-input v-model="formData.mobile"  disabled style="width:40%"></el-input>
           </el-form-item>
           <el-form-item>
               <el-button @click="saveuserinfo" type="primary">保存信息</el-button>
           </el-form-item>
      </el-form>
      <!-- 上传组件 -->
      <el-upload class="head-upload" :http-request="uploadImg" action="" :show-file-list="false">
          <img :src="formData.photo?formData.photo:defaultImg" alt="">
      </el-upload>
  </el-card>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      formData: {
        name: '', // 用户名
        intro: '', // 简介
        photo: '', // 头像
        email: '', // 邮箱
        mobile: ''
      },
      defaultImg: require('../../assets/img/111.jpg'),
      rules: { name: [{ required: true, message: '用户名不能为空' }, { min: 1, max: 7, message: '用户名长度为1到7个字符之间' }],
        email: [{ required: true, message: '邮箱不能为空' }, {
          pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
          message: '邮箱格式不正确'
        }] }
    }
  },
  methods: {
    uploadImg (params) {
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(res => {
        this.formData.photo = res.data.photo
        eventBus.$emit('updateUserInfo')
      })
    },
    saveuserinfo () {
      this.$refs.myform.validate().then(res => {
        this.$axios({
          url: '/user/profile',
          method: 'patch',
          data: this.formData
        }).then(res => {
          this.$message({
            type: 'success',
            message: '保存用户信息成功'
          })
          eventBus.$emit('updateUserInfo')
        })
      })
    },
    //   获取用户个人信息
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang='less' scoped>
.head-upload {
   position: absolute;
   right: 300px;
   top:200px;
    img {
       width: 200px;
       height: 200px;
        border-radius: 50%;
    }
}
</style>
