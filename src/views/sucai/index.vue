<template>
  <el-card v-loading="loading" class="zong">
    <bread-crum slot="header">
      <template slot="title">素材管理</template>
    </bread-crum>
    <el-row type='flex' justify='end' class="shangchuan">
      <el-upload action='' :http-request="uploadImg" :show-file-list="false">
      <el-button size='small' type='primary'>上传图片</el-button>
    </el-upload>
    </el-row>

    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部图片" name="all">
        <div class="quan">
          <el-card class="hang" v-for="(item,index) in list" :key="item.id">
            <img @click="opendialog(index)" :src="item.url" alt />
            <el-row class="iconshan" type="flex" align="middle" justify="space-around">
              <i @click="shoucang(item)" :style="{color:item.is_collected?'red':'#000'}" class="el-icon-star-on"></i>
              <i @click="delpic(item.id)" class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏图片" name="collect">
        <div class="quan">
          <el-card class="hang" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
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
    <el-dialog
     @close="dialogVisible= false"
      :visible="dialogVisible"
      width="60%"
      @opened='openEnd'
      >
      <el-carousel ref='mycarousel' type="card" height="400px">
        <el-carousel-item v-for="item in list" :key="item.id">
          <img style="width:100%;height:100%;" :src="item.url" alt="">
        </el-carousel-item>
      </el-carousel>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false,
      loading: false,
      activeName: 'all',
      list: [],
      page: {
        total: 0,
        pageSize: 8,
        currpage: 1
      },
      clickindex: -1
    }
  },
  methods: {
    openEnd () {
      this.$refs.mycarousel.setActiveItem(this.clickindex)
    },
    opendialog (index) {
      this.dialogVisible = true
      this.clickindex = index
    },
    delpic (id) {
      this.$confirm('你确定要删除此图片吗？').then(() => {
        this.$axios({
          method: 'delete',
          url: `/user/images/${id}`
        }).then(() => {
          this.getpicture()
        })
      })
    },
    shoucang (item) {
      this.$axios({
        method: 'put',
        url: `/user/images/${item.id}`,
        data: {
          collect: !item.is_collected
        }
      }).then(res => {
        this.getpicture()
      })
    },
    uploadImg (params) {
      this.loading = true
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        method: 'post',
        url: '/user/images',
        data
      }).then(res => {
        this.loading = false
        this.getpicture()
      })
    },
    pagechange (newpage) {
      this.page.currpage = newpage
      this.getpicture()
    },
    changeTab () {
      this.page.currpage = 1
      this.getpicture()
    },
    getpicture () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect',
          page: this.page.currpage,
          per_page: this.page.pageSize
        }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    }
  },
  created () {
    this.getpicture()
  }
}
</script>

<style lang='less' scoped>
.zong {
  position: relative;
}
.shangchuan {
  position: absolute;
  right: 20px;
  z-index: 1;
}
.quan {
  display: flex;
  flex-wrap: wrap;
  .hang {
    width: 200px;
    height: 230px;
    margin: 30px 30px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .iconshan {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      font-size: 20px;
      height: 40px;
      background-color: #f4f5f6;
    }
  }
}
</style>
