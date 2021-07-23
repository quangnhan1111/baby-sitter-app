<template>
<div>
  <h3 v-if="user"> Hello {{ user.name }}</h3>
  <h3 v-if="!user"> You are not logging </h3>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapGetters(['user'])
  }
}
</script>
