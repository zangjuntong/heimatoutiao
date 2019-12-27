import silderht from './home/rightsilde'
import headerr from './headers/heades'
import breadcrum from './common/mianbao'
import { quillEditor } from 'vue-quill-editor'
import coverImage from './publish/cover-image'
import selectimg from './publish/imgtan'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  install (Vue) {
    Vue.component('silde-right', silderht)
    Vue.component('header-meau', headerr)
    Vue.component('bread-crum', breadcrum)
    Vue.component('quill-editor', quillEditor)
    Vue.component('cover-image', coverImage)
    Vue.component('select-image', selectimg)
  }
}
