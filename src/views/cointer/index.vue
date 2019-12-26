<template>
<div>
  <el-card>
    <bread-crum slot="header">
    <template slot="title">内容列表</template>
    </bread-crum>
    <el-form style="padding-left:50px">
      <el-form-item label="文章状态 :">
        <el-radio-group @change="changezhuangtai" v-model="select.selectValue">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表 :">
        <el-select @change="changezhuangtai" v-model="select.channel_id" placeholder="请选择">
          <el-option
            v-for="item in channel"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择 :">
         <el-date-picker
         @change="changezhuangtai"
         value-format="yyyy-MM-dd"
      v-model="select.time"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card class="main">
    <div class="header">
      共找到{{page.total}}条符合条件的内容
    </div>
    <div class="lie" v-for="item in list" :key='item.id.toString()'>
      <div class="left">
        <img :src="item.cover.images.length ? item.cover.images[0] : defaltimg" alt="">
        <div class="mid">
          <span>{{item.title}}</span>
          <el-tag :type="item.status | filtercolor" class="tag">{{item.status | filtersStatus}}</el-tag >
          <span class="date">{{item.pubdate}}</span>
        </div>
      </div>
      <div class="right">
        <span><i class="el-icon-edit"></i>修改</span>
        <span @click="delartical(item.id)"><i class="el-icon-delete"></i>删除</span>
      </div>
    </div>
  <el-row type='flex' justify='center' style="height:60px" align='middle'>
    <el-pagination
        :page-size="page.pageSize"
        :current-page="page.currpage"
        background
        layout="prev, pager, next"
        @current-change="pagechange"
        :total="page.total">
</el-pagination>
  </el-row>
  </el-card>
</div>

</template>

<script>
export default {
  data () {
    return {
      select: {
        selectValue: 5,
        channel_id: null,
        time: []
      },
      channel: [],
      list: [],
      defaltimg: require('../../assets/img/111.jpg'),
      page: {
        total: 0,
        pageSize: 10,
        currpage: 1
      }
    }
  },
  filters: {
    filtersStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    filtercolor (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  methods: {
    delartical (id) {
      this.$confirm('你是否确认删除？').then(() => {
        this.$axios({
          url: `/articles/${id.toString()}`,
          method: 'delete'
        }).then(res => {
          this.$message({
            type: 'syccess',
            message: '删除成功'
          })
          this.getgong()
        })
      })
    },
    pagechange (newpage) {
      this.page.currpage = newpage
      this.getgong()
    },
    changezhuangtai () {
      this.page.currpage = 1
      this.getgong()
    },
    getgong () {
      let params = {
        page: this.page.currpage,
        per_page: this.page.pageSize,
        status: this.select.selectValue === 5 ? null : this.select.selectValue,
        channel_id: this.select.channel_id,
        begin_pubdate: this.select.time.length ? this.select.time[0] : null,
        end_pubdate: this.select.time.length > 1 ? this.select.time[1] : null
      }
      this.getarticles(params)
    },
    getpindao () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channel = res.data.channels
      })
    },
    getarticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    }
  },
  created () {
    this.getpindao()
    this.getarticles({ page: 1, per_page: 10 })
  }
}
</script>

<style lang='less' scroped>
  .main {
    margin-top: 20px;
    .header {
      border-bottom: 1px dashed #ccc;
      padding-bottom: 20px;
    }
    .lie {
      display: flex;
        justify-content: space-between;
        padding: 20px 0;
        border-bottom: 1px solid #f2f3f5;
      .left {
        display: flex;
        img {
          width: 180px;
          height: 100px;
          border-radius: 4px;
        }
        .mid {
          margin-left: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          height: 100px;
          .tag {
            text-align: center;
            width:60px;
          }
          .date {
            color:#999;
            font-size: 12px;
          }
        }
      }
      .right {
        span {
          font-size: 14px;
          margin-right: 8px;
          cursor: pointer;
        }
      }
    }
  }
</style>
