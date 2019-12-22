<template>
  <el-container>
    <el-aside style="min-height: 100vh; width:200px; background-color: #323745;">
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
