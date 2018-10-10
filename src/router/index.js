import Vue from 'vue'
import Router from 'vue-router'
import form from '@/components/form'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/form/:id',
      name: 'form',
      component: form
    }
  ]
})