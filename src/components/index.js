import silderht from './home/rightsilde'
import headerr from './headers/heades'
import breadcrum from './common/mianbao'
export default {
  install (Vue) {
    Vue.component('silde-right', silderht)
    Vue.component('header-meau', headerr)
    Vue.component('bread-crum', breadcrum)
  }
}
