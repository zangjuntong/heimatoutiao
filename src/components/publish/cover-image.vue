<template>
  <div class="fengmian">
    <div @click="opendialog" class="coverimg" v-for="(item,index) in list" :key="index">
      <img :src="item?item:imgagesitem" alt="">
    </div>
    <el-dialog
      title="选择封面图片"
      :visible="dialogVisible"
      @close='closedialog'
      width="30%"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
</el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      imgagesitem: require('../../assets/img/pic_bg.png'),
      dialogVisible: false
    }
  },
  methods: {
    opendialog () {
      this.dialogVisible = true
    },
    closedialog () {
      this.dialogVisible = false
    }
  }

}
</script>

<style lang='less' scoped>
.fengmian {
  margin:20px 100px;
   display: flex;
  .coverimg {
    width: 250px;
    height: 250px;
  border: 1px solid #ccc;
  padding: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
