<template>
  <el-row class="mainhead" type="flex" align="middle">
    <el-col class="left" :span="12">
      <i class="el-icon-s-unfold"></i>
      <span>江苏传智播客教育科技股份有限公司</span>
      </el-col>
    <el-col class="right" :span="12" style="float:right" >
      <el-row style="float:right"  type="flex" align="middle">
        <img :src="usermes.photo?usermes.photo:bianImmg" alt="">
        <el-dropdown trigger="click" @command='xianshi'>
          <span>{{usermes.name}}</span>
          <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command='personmes'>个人信息</el-dropdown-item>
        <el-dropdown-item command='gitaddress'>git地址</el-dropdown-item>
        <el-dropdown-item command='weixin'>微信号</el-dropdown-item>
        <el-dropdown-item divided command='tuichu'>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      usermes: {},
      bianImmg: require('../../assets/img/avatar.jpg')
    }
  },
  created () {
    this.getuserinfo()
    eventBus.$on('updateUserInfo', () => {
      this.getuserinfo()
    })
  },
  methods: {
    getuserinfo () {
      this.$axios({
        url: '/user/profile'

      }).then(res => {
        this.usermes = res.data
      })
    },
    xianshi (command) {
      if (command === 'personmes') {
        this.$router.push('/home/usermssage')
      } else if (command === 'gitaddress') {
        window.location.href = 'https://github.com/'
      } else if (command === 'weixin') {

      } else {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang='less' scoped>
 .mainhead {
   height: 60px;

   .left {
     font-size: 20px;
     span {
       font-size: 16px;
       margin-left: 10px;
     }
   }
   .right {
line-height: 60px;
     img {
       width: 30px;
       height: 30px;
       border-radius: 50%;
       margin-right: 10px;
     }
   }
 }
</style>
