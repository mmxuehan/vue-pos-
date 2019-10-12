import Vue from 'vue'
import Router from 'vue-router'
import pos from '@/components/page/pos'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: pos
    }
  ]
})
