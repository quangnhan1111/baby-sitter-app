import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Users from './views/Users.vue'
import Calendar from './views/Calendar.vue'
import Agenda from './views/Agenda.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Error from './views/Error.vue'
import Nav from './components/Nav.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar
    },
    {
      path: '/users/:id',
      name: 'Agenda',
      component: Agenda
    },
    {
      path: '/login',
      name:Login,
      component: Login
    },
    {
      path: '/register',
      name:Register,
      component: Register
    },
    {
      path: '/error',
      name: Error,
      component: Error
    },
  ]
})
