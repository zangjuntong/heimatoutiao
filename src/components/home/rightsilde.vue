<template>
<div class="silde">
  <div class="tu">
    <img src="../../assets/img/logo_admin.png" alt="">
  </div>
  <el-menu background-color=" #353b4e" text-color="#adafb5" active-text-color="#ffd04b" :router='true'>
    <el-menu-item>
     <span slot="title" index='/'>首页</span>
    </el-menu-item>
    <el-submenu index="1">
       <template slot="title">
          <span>内容管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home/publish">发布文章</el-menu-item>
          <el-menu-item index="/home/articles">内容列表</el-menu-item>
          <el-menu-item index="/home/comment">评论列表</el-menu-item>
          <el-menu-item index="/home/material">素材管理</el-menu-item>
        </el-menu-item-group>
    </el-submenu>
     <el-submenu index="2">
       <template slot="title">
          <span>粉丝管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home/pictures">图文数据</el-menu-item>
          <el-menu-item index="/home/fansgai">粉丝概况</el-menu-item>
          <el-menu-item index="/home/fanspictures">粉丝画像</el-menu-item>
          <el-menu-item index="/home/fanslist">粉丝列表</el-menu-item>
        </el-menu-item-group>
    </el-submenu>
    <el-menu-item>
     <span slot="title" index="usermssage">账户信息</span>
    </el-menu-item>
  </el-menu>

</div>

</template>

<script>
export default {

}
</script>

<style  lang='less' scoped>
.silde {
  height: 100vh;
  background-color: #323745;
  width: 200px;
  .el-menu {
    border-right: none
  }
  .tu {
    background-color: #2e2f32;

    text-align: center;
  padding: 12px 0;
    img {
      height: 30px;
    }
  }
}
</style>
