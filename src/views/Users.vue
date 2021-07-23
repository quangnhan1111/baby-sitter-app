<template>
  <div>
    <h3 v-if="!user"> You are not logging </h3>
    <h3 v-if="user && user.type === 'sitter'"> You are not authorized </h3>
    <UserTable
      v-if="user && user.type === 'parent'"
      :users="users"
    />
  </div>
</template>
<script>
import UserTable from '@/components/UserTable.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    UserTable
  },
  computed: {
    ...mapGetters(['user']),
    gettersusers() {
      return this.$store.getters.allUsers
    },
    users() {
      return this.$store.state.users
    }
  },
  mounted() {
    this.$store.dispatch('getUsers')
  }
}
</script>
