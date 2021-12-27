<template>
  <div>
    <b-card no-body>
      <b-card-body
        id="nav-scroller"
        ref="content"
        style="position:relative; height:300px; overflow-y:scroll;"
      >
        <fieldset v-if="event">
          <legend>Details</legend>
          <b>ID:</b>  {{ event.id }} <br/>
          <b>Title:</b>  {{ event.title }} <br/>
          <b>Start:</b>  {{ event.start }} <br/>
          <b>End:</b>  {{ event.end }} <br/>
        </fieldset>
        <fieldset v-if="parentBooking" >
          <legend>Parent Infomation</legend>
          <b>Name:</b>  {{ parentBooking.name }} <br/>
          <b>Phone:</b>  {{ parentBooking.phone }} <br/>
          <b>Email:</b>  {{ parentBooking.email }} <br/>
          <b>Address:</b>  {{ parentBooking.address }} <br/>
          <b>Role:</b>  {{ parentBooking.type }} <br/>
        </fieldset>
        <fieldset v-if="(event.backgroundColor != 'green' && user.type == 'sitter') ||
        (event.backgroundColor == 'green' && user.type == 'parent' && parentBooking.id == idCurrentUser)">
          <legend>Edit</legend>
          <b-form-input type="text" v-model="title"></b-form-input>
          <div>
            <b-button pill variant="outline-secondary" @click="handleSubmit">Save</b-button>
            <b-button pill variant="outline-danger" @click="handleDelete">Delete</b-button>
          </div>
        </fieldset>

      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios'
import { formatDate } from '@/utils/helpers.js'

export default {
  data: () => ({
    title: '',
    start: {},
    end: {},
    eventUpdated: {},
    user: {},
    parentBooking: {},
    idCurrentUser: ''
  }),
  props: {
    event: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    this.title = this.event.title
    this.start = formatDate(this.event.start)
    this.end = formatDate(this.event.end)
  },
  created() {
    // this.$store.dispatch("fetchCalendar", this.event.id)
    console.log(this.$store.state.user)
    this.user = this.$store.state.user
    // console.log(this.user)
    this.idCurrentUser = localStorage.getItem('id')
    this.fetchCalendar(this.event.id)
  },
  methods: {
    handleDelete() {
      if (confirm(`Are you sure you want to delete the event '${this.title}'`)) {
        this.$store.commit('LOADER', true)
        this.event.remove()
        // alert('Great. Now, update your database...')
        // this.$store.dispatch("deleteCalendar", this.event.id)
        this.deleteCalendar(this.event.id)
        this.$store.commit('LOADER', false)
      }
    },
    handleSubmit() {
      this.$store.commit('LOADER', true)
      this.eventUpdated = {
        ...this.eventUpdated,
        title: this.title,
        start: this.start,
        end: this.end
      }
      // console.log(this.eventUpdated)
      this.updateEvent(this.event.id)
      this.event.setProp('title', this.title)
      // this.$store.dispatch('updateEvent', this.event.id, this.$store.state.event)
      this.$store.commit('LOADER', false)
    },
    updateEvent(id) {
      axios.put(`http://127.0.0.1:8000/api/calendars/${id}`, this.eventUpdated, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
    },

    deleteCalendar(id) {
      axios.delete(`http://127.0.0.1:8000/api/calendars/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
    },

    fetchCalendar(id) {
      axios.get(`http://127.0.0.1:8000/api/calendars/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then(
          res => {
          // console.log(res.data)
          // commit('FIND_EVENT', res.data)
            this.eventUpdated = res.data
            this.fetchUser(res.data.parent_id)
          }
        ).catch(
          err => {
            console.log(err)
          }
        )
    },

    fetchUser(id) {
      axios.get(`http://127.0.0.1:8000/api/users/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then(
          res => {
            this.parentBooking = res.data// tim keim ra parent dua vao this.eventUpdated.parent_id
            console.log(this.parentBooking)
          }
        ).catch(
        // eslint-disable-next-line handle-callback-err
          err => {
            // console.log(err)
            this.parentBooking = null
          }
        )
    }
  }
}
</script>

<style>
</style>
