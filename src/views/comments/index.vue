<template>
<el-card v-loading="loading">
  <bread-crum slot="header">
  <template slot="title">
    评论管理
  </template>
  </bread-crum>
  <el-table :data="list" style="width: 100%">
      <el-table-column prop="title" label="标题" width="600"></el-table-column>
      <el-table-column :formatter="formater" prop="comment_status" label="评论状态" ></el-table-column>
      <el-table-column  prop="total_comment_count" label="总评论数" ></el-table-column>
      <el-table-column  prop="fans_comment_count" label="粉丝评论数" ></el-table-column>
      <el-table-column   label="操作" >
        <template slot-scope="obj">
          <el-button size='small' type="text">修改</el-button>
          <el-button size='small' @click="openorclostatus(obj.row)" type="text">{{obj.row.comment_status?"关闭":"打开"}}评论</el-button>
        </template>

      </el-table-column>

    </el-table>
    <el-row type='flex' justify='center' align="middle" style="height:80px">
      <el-pagination
  :page-size='page.pageSize'
  :current-page='currentPage'
  background
  layout="prev, pager, next"
  @current-change='pagechange'
  :total="page.total">
</el-pagination>
    </el-row>

</el-card>

</template>

<script>
export default {
  data () {
    return {
      list: [],
      loading: false,
      page: {
        total: '0',
        pageSize: '10',
        currentPage: '1'
      }

    }
  },
  methods: {
    pagechange (newpage) {
      this.page.currentPage = newpage
      this.getMessage()
    },
    getMessage () {
      this.loading = true
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
        this.loading = false
      })
    },
    formater (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    openorclostatus (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您是否要${mess}评论？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          url: '/comments/status',
          method: 'put',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status }
        }).then(res => {
          this.getMessage()
        })
      })
    }

  },
  created () {
    this.getMessage()
  }
}
</script>

<style>

</style>
