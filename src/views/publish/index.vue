<template>
  <el-card v-loading='loading'>
    <bread-crum slot="header">
    <template slot="title">发布文章</template>
    </bread-crum>
    <el-form ref='punlishform' :model='formDate' :rules='publishrules' style="margin-left:50px" label-width='100px'>
      <el-form-item prop='title' label='标题'>
        <el-input v-model="formDate.title" style="width:60%"></el-input>
      </el-form-item>
      <el-form-item prop='content' label='内容'>
        <quill-editor v-model="formDate.content" style="height:300px"></quill-editor>
      </el-form-item>
      <el-form-item  style="margin-top:120px" prop='cover' label='封面'>
        <el-radio-group @change='changeype' v-model="formDate.cover.type">
          <el-radio :label='1'>单图</el-radio>
          <el-radio :label='3'>三图</el-radio>
          <el-radio :label='0'>无图</el-radio>
          <el-radio :label='-1'>自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <cover-image :list='formDate.cover.images'></cover-image>
      <el-form-item prop='channel_id' label='频道'>
        <el-select v-model="formDate.channel_id" placeholder="请选择">
            <el-option
            v-for="item in channel"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item >
        <el-button @click="publishartical(false)" type='primary'>发布</el-button>
        <el-button @click="publishartical(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      channel: [],
      formDate: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      publishrules: {
        title: [{ required: true, message: '文章标题不能为空' }, {
          min: 5,
          max: 30,
          message: '标题的长度在5到30个字符之间'
        }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '文章频道不能为空' }]
      }
    }
  },
  methods: {
    getpindao () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channel = res.data.channels
      })
    },
    publishartical (draft) {
      this.$refs.punlishform.validate(isOk => {
        if (isOk) {
          let { articalId } = this.$route.params
          this.$axios({
            url: articalId ? `/articles/${articalId}` : '/articles',
            method: articalId ? 'put' : 'post',
            params: { draft },
            data: this.formDate
          }).then(res => {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            this.$router.push('/home/articles')
          })
        }
      })
    },
    xiugaiid (articalId) {
      this.loading = true
      this.$axios({
        url: `/articles/${articalId}`
      }).then(res => {
        this.loading = false
        this.formDate = res.data
      })
    },
    changeype () {
      if (this.formDate.cover.type === 0 || this.formDate.cover.type === -1) {
        this.formDate.cover.images = []
      } else if (this.formDate.cover.type === 1) {
        this.formDate.cover.images = ['']
      } else if (this.formDate.cover.type === 3) {
        this.formDate.cover.images = ['', '', '']
      }
    }
  },
  watch: {
    // 'formDate.cover.type': function () {
    //   if (this.formDate.cover.type === 0 || this.formDate.cover.type === -1) {
    //     this.formDate.cover.images = []
    //   } else if (this.formDate.cover.type === 1) {
    //     this.formDate.cover.images = ['']
    //   } else if (this.formDate.cover.type === 3) {
    //     this.formDate.cover.images = ['', '', '']
    //   }
    // },
    $route: function (to, from) {
      // debugger
      // console.log(to, from)
      if (to.params.articalId) {

      } else {
        this.formDate = {
          title: '',
          content: '',
          cover: {
            type: 0,
            images: []
          },
          channel_id: null
        }
      }
    }
  },

  created () {
    this.getpindao()
    let { articalId } = this.$route.params
    articalId && this.xiugaiid(articalId)
  }
}
</script>

<style>

</style>
