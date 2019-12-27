<template>
  <div class="fengmian">
    <div @click="opendialog(index)" class="coverimg" v-for="(item,index) in list" :key="index">
      <img :src="item?item:imgagesitem" alt="">
    </div>
    <el-dialog
      :visible="dialogVisible"
      @close='closedialog'
      width="60%"
     >
      <select-image @selectimg='recieves'></select-image>

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
      dialogVisible: false,
      selectindex: -1
    }
  },
  methods: {
    recieves (url) {
      this.$emit('selectimg', url, this.selectindex)
      this.closedialog()
    },
    opendialog (index) {
      this.dialogVisible = true
      this.selectindex = index
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
