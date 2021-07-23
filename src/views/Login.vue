<template>
<div>
 <div>
   <p  v-show="error" style="color: red">{{ error }}</p>
    <form @submit.prevent="submit">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
    <input v-model="email" type="email" class="form-control" placeholder="Email" required>
    <input v-model="password" type="password" class="form-control" placeholder="Password" required>
    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
  </form>
  </div>
</div>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  // computed: {
  //   ...mapState({
  //       showLoading: state => state.showLoading,
  //   })
  // },
  methods: {
    submit() {
      this.$store.commit('LOADER', true)
      axios.post('login', {
        email: this.email,
        password: this.password
      })
        .then(
          res => {
            this.$store.commit('LOADER', false)
            console.log(res.data.user.type)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('id', res.data.user.id)
            // localStorage.setItem('role', res.data.user.role)
            this.$store.dispatch('user', res.data.user)
            console.log(localStorage.getItem('id'))
            if (res.data.user.type === 'sitter') {
              this.$router.push('/')
            } else {
              this.$router.push('/users')
            }
          }
        ).catch(
          err => {
            console.log(err)
            this.$store.commit('LOADER', false)
            this.error = 'Unauthorized'
          }
        )
    }
  }

}
</script>
