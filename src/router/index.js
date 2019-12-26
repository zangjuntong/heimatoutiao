import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'
import contentine from '../views/home/containmain'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [{
      path: '',
      component: contentine
    }, {
      path: 'comment',
      component: () => import('../views/comments')
    }, {
      path: 'material',
      component: () => import('../views/sucai')
    }, {
      path: 'articles',
      component: () => import('../views/cointer')
    }, {
      path: 'publish',
      component: () => import('../views/publish')
    }]
  }, {
    path: '/login',
    component: Login
  }
// {
//   path: '/about',
//   name: 'about',
//   // route level code-splitting
//   // this generates a separate chunk (about.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   component: () =>
//             import(/* webpackChunkName: "about" */ '../views/About.vue')
// }
]

const router = new VueRouter({
  routes
})

export default router
