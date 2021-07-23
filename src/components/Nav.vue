<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">Home</router-link>
      <router-link v-if="user && user.type === 'sitter'" to="/calendar" class="navbar-brand">Calendar</router-link>
      <router-link v-if="user && user.type === 'parent'" to="/users" class="navbar-brand">List Users</router-link>
      <div>
        <select class ="custom-select" v-model="lang" @change="handleChange($event)">
          <option value="en">English</option>
          <option value="vi">VietNam</option>
        </select>
        <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="!user">
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link">Register</router-link>
          </li>
        </ul>
        <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="user">
          <li class="nav-item">
            <a href="javascript:void(0)" class="nav-link" @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Nav',
  data: function () {
    const lang = localStorage.getItem('lang') || 'de'
    // eslint-disable-next-line standard/object-curly-even-spacing
    return { lang: lang }
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$store.dispatch('user', null)
      this.$router.push('/')
    },
    handleChange(event) {
      localStorage.setItem('lang', event.target.value)
      window.location.reload()
    }
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>
