<template>
<div>
  <Loader v-if="showLoading"/>
  <div id="app">
    <Nav/>
    <b-container>
      <router-view/>
    </b-container>
  </div>
</div>
</template>
<script>
import { mapState } from 'vuex'
import Nav from './components/Nav.vue'
import Loader from './components/_loader'

export default {
  name: 'App',
  components: { Nav, Loader },
  computed: {
    ...mapState({
      showLoading: state => state.showLoading
    })
  }
}
</script>

<style lang="scss">
// Để hiển thì các thành phần mà chúng ta đã thiết đặt routes ta dùng thẻ <router-view> tại nơi chúng ta muốn hiển thị.
//  Thẻ <router-link> giống như thẻ <a> vậy đó. Mở file App.vue
// Vue Router có hai chế độ cho URL đó là ở dạng hash mode (mặc định) và history:

// Hash Mode: mô phỏng URL ở dạng hash (#)
// History: dạng rất quen thuộc khi đường dẫn tới các path bằng '/' Để thay đổi sang history mode ta chỉ cần thêm vào VueRouter:
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
