<template>
  <el-container>
    <el-aside style="width:200px">
      <silde-right></silde-right>
    </el-aside>
    <el-container>
      <el-header>
        <header-meau></header-meau>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

export default {

}
</script>

<style>

</style>
