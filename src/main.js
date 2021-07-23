import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/sass/index.sass'

import App from './App.vue'
import router from './router'
import store from './store'
import './axios'
import axios from 'axios'
import modal from 'vue-js-modal'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import UUID from 'vue-uuid'

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue)
Vue.use(UUID)
Vue.use(modal, { dialog: true, dynamic: true })

Vue.config.productionTip = false

const lang = localStorage.getItem('lang') || 'de'
axios.defaults.headers['Accept-Language'] = lang

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
