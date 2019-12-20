<template>
  <el-container>
    <el-aside style="width:200px">
      <silde-right></silde-right>
    </el-aside>
    <el-container>
      <el-header>
        <header-meau></header-meau>
      </el-header>
      <el-main>身体</el-main>
    </el-container>
  </el-container>
</template>

<script>
import silderht from '../../components/home/rightsilde'
import headerr from '../../components/headers/heades'
export default {
  components: {
    'silde-right': silderht,
    'header-meau': headerr
  }
}
</script>

<style>

</style>
