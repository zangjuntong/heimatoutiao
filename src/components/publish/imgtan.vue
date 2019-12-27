<template>
  <div > <el-tabs v-model="activeName" >
    <el-tab-pane label="素材库" name="sucaiku">
       <div class="imglist">
      <el-card class="card-img" v-for='item in list' :key="item.id">
        <img @click="clickImg(item.url)" :src="item.url" alt="">
      </el-card>
    </div>
     <el-row type="flex" justify="center">
      <el-pagination
        :page-size="page.pageSize"
        :current-page="page.currpage"
        background
        layout="prev, pager, next"
        @current-change="pagechange"
        :total="page.total"
      ></el-pagination>
    </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="uploadimg">
      <el-upload action='' :http-request='uploadimgs' :show-file-list='false' class="upload-img">
        <i class="el-icon-plus"></i>
      </el-upload>
    </el-tab-pane>
  </el-tabs>

  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'sucaiku',
      list: [],
      page: {
        total: 0,
        pageSize: 8,
        currpage: 1
      }
    }
  },
  methods: {
    uploadimgs (params) {
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        method: 'post',
        url: '/user/images',
        data
      }).then(res => {
        this.$emit('selectimg', res.data.url)
      })
    },
    clickImg (url) {
      this.$emit('selectimg', url)
    },
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: { collect: false,
          page: this.page.currpage,
          per_page: this.page.pageSize }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    },
    pagechange (newpage) {
      this.page.currpage = newpage
      this.getAllImg()
    }
  },
  created () {
    this.getAllImg()
  }
}
</script>

<style lang='less' scoped>
.imglist {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .card-img {
    width: 180px;
    height: 150px;
    margin: 20px 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.upload-img {
   display: flex;
  justify-content: center;
  i {
    font-size: 50px;
    padding: 50px;
    border:1px dashed #ccc;
  }
}
</style>
