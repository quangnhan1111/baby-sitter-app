<template>
  <div>
    <h1>List Users</h1>
    <b-table striped hover :items="users">
      <template slot="id" slot-scope="data">
        <router-link :to="`/users/${data.item.id}`">
          {{ data.value }}
        </router-link>
      </template>
    </b-table>
  </div>
</template>
<script>
export default {
  props: {
    users: {
      type: Array,
      default: () => []
    }
  },
  created() {
    console.log(this.users)
  }
}
</script>
