import Vue from 'vue'
import Router from 'vue-router'
import Feedbacks from './views/Feedbacks.vue'
import Positivos from './views/Positivos.vue'
import Negativos from './views/Negativos.vue'
import Resolvidos from './views/Resolvidos.vue'
import Estatisticas from './views/Estatisticas.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/feedbacks',
      name: 'feedbacks',
      component: Feedbacks
    },
    {
      path: '/positivos',
      name: 'positivos',
      component: Positivos
    },
    {
    path: '/negativos',
    name: 'negativos',
    component: Negativos
    },
    {
    path: '/resolvidos',
    name: 'resolvidos',
    component: Resolvidos
    },
    {
    path: '/estatisticas',
    name: 'estatisticas',
    component: Estatisticas
    }
  ]
})
