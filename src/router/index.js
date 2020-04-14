import Vue from 'vue'
import Router from 'vue-router'
import form from '@/components/form'
import login from '@/components/LoginComponent'
import main from '@/components/mainComponent'
import createForm from '@/components/createFormComponent'
import myforms from '@/components/myforms'
import callback from '@/components/Callback'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
  	{
      path: '/',
      name: 'main',
      component: main
    },
    {
      path: '/form/:id',
      name: 'form',
      component: form
    },
    {
      path: '/createForm',
      name: 'createForm',
      component: createForm
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/myforms',
      name: 'myforms',
      component: myforms
    },
    {
      path: '/callback',
      name: 'callback',
      component: callback
    }
  ]
})