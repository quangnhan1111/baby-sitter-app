<template>
<div>
  <p  v-show="error" style="color: red">{{ error }}</p>
   <form @submit.prevent="submit">
    <h1 class="h3 mb-3 fw-normal">Please register</h1>
    <input v-model="name" class="form-control" placeholder="Name" required>
    <input v-model="email" type="email" class="form-control" placeholder="Email" required>
    <input v-model="date_of_birth" class="form-control" placeholder="Date_of_birth" required>
    <input v-model="address" class="form-control" placeholder="Address" required>
     <input v-model="phone" class="form-control" placeholder="Phone" required>
    <input v-model="password" type="password" class="form-control" placeholder="Password" required>
    <input v-model="password_confirmation" type="password" class="form-control" placeholder="Password Confirmation" required>
     <div>
       <b-form-radio-group
         v-model="selected"
         :options="options"
         class="mb-3"
         value-field="item"
         text-field="name"
         disabled-field="notEnabled"
       ></b-form-radio-group>
     </div>
    <button class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
  </form>
</div>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      date_of_birth: '',
      password: '',
      password_confirmation: '',
      address: '',
      phone: '',
      type: '',
      error: '',
      selected: 'sitter',
      options: [
        { item: 'sitter', name: 'sitter' },
        { item: 'parent', name: 'parent' }
      ]
    }
  },
  methods: {
    submit() {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
        date_of_birth: this.date_of_birth,
        phone: this.phone,
        address: this.address,
        type: this.selected
      }
      this.$store.commit('LOADER', true)
      axios.post('register', data)
        .then(
          res => {
          // console.log(res.data.user.id)
            this.$store.commit('LOADER', false)
            if (res.data.user.id) {
              this.$router.push('/login')
            }
          }
        ).catch(
          error => {
            console.log(error)
            this.error = 'Unprocessable Entity'
            this.$store.commit('LOADER', false)
          // this.$router.push('/error');
          }
        )
    }
  }
}
</script>
