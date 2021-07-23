<template>
  <div>
    <fieldset>
      <label>Please enter a title</label>
      <input type="text" v-model="title"> <br/>
      <b>Start:</b>  {{ selectInfo.startStr }} <br/>
      <b>End:</b>  {{ selectInfo.endStr }} <br/>
    </fieldset>
    <fieldset>
        <button @click="handleSubmit">Submit</button>
        <!-- <button @click="handleSubmit">Repeat</button> -->
    </fieldset>
  </div>
</template>

<script>
import { formatDateForDb, createEventId } from '@/utils/helpers.js'
import moment from 'moment'
import axios from 'axios'

export default {
  data: () => ({
    title: '',
    calendarForDb: {},
    calendar: {}
  }),
  props: {
    selectInfo: {
      type: Object,
      default: () => {}
    },
    id_user: {
      type: String
    },
    id_parent: {
      type: String
    }
  },
  methods: {
    handleSubmit() {
      let idEventNotRepeated = createEventId()
      let calendarApi = this.selectInfo.view.calendar
      if (this.title) {
        this.calendarForDb = {
          id: idEventNotRepeated,
          title: this.title,
          start: (this.selectInfo.startStr).slice(0, 19),
          end: ((this.selectInfo.endStr).slice(0, 19)),
          constraint: 'availableForMeeting',
          block: true,
          color: 'green',
          dayMaxEvents: true,
          startTime: '',
          endTime: '',
          startRecur: '',
          endRecur: '',
          user_id: this.id_user,
          parent_id: this.id_parent,
          selectable: false,
          editable: false,
          overlap: false
        },
        this.calendar = {
          id: idEventNotRepeated,
          title: this.title,
          start: this.selectInfo.startStr,
          end: this.selectInfo.endStr,
          constraint: 'availableForMeeting',
          rendering: 'background',
          block: true,
          color: 'green', // overridder lai mau
          startTime: '',
          endTime: '',
          startRecur: '',
          endRecur: '',
          user_id: this.id_user,
          parent_id: this.id_parent,
          selectable: false,
          editable: false,
          overlap: false
        }
        this.$store.commit('LOADER', true)
        console.log(localStorage.getItem('token'))
        this.calendarForDb.startRecur = formatDateForDb(new Date(new Date((this.selectInfo.startStr).slice(0, 10)).getTime() + 0 * 1000 * 60 * 60 * 24))
        this.calendarForDb.endRecur = formatDateForDb(new Date(new Date((this.selectInfo.startStr).slice(0, 10)).getTime() + 1 * 1000 * 60 * 60 * 24))
        this.calendarForDb.startTime = moment(this.selectInfo.start).format('HH:mm')
        this.calendarForDb.endTime = moment(this.selectInfo.end).format('HH:mm')
        this.calendar.startRecur = formatDateForDb(new Date(new Date((this.selectInfo.startStr).slice(0, 10)).getTime() + 0 * 1000 * 60 * 60 * 24))
        this.calendar.endRecur = formatDateForDb(new Date(new Date((this.selectInfo.startStr).slice(0, 10)).getTime() + 1 * 1000 * 60 * 60 * 24))
        this.calendar.startTime = moment(this.selectInfo.start).format('HH:mm')
        this.calendar.endTime = moment(this.selectInfo.end).format('HH:mm')
        calendarApi.addEvent(this.calendar)
        // this.$store.dispatch("addCalendar", this.calendarForDb)
        this.addCalendar(this.calendarForDb)
        console.log(localStorage.getItem('id'))
        this.$store.commit('LOADER', false)
      }
    },
    addCalendar(calendar) {
      // Khởi tạo
      var objCalendar = {}
      objCalendar.id = calendar.id
      objCalendar.user_id = calendar.user_id
      objCalendar.title = calendar.title
      objCalendar.start = calendar.start
      objCalendar.end = calendar.end
      objCalendar.start_recur = calendar.startRecur
      objCalendar.end_recur = calendar.endRecur
      objCalendar.start_time = calendar.startTime
      objCalendar.end_time = calendar.endTime
      objCalendar.color = calendar.color
      objCalendar.overlap = calendar.overlap
      objCalendar.selectable = calendar.selectable
      objCalendar.editable = calendar.editable
      objCalendar.parent_id = calendar.parent_id
      console.log(objCalendar)

      axios.post('http://127.0.0.1:8000/api/calendars', objCalendar, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
    }
  }
}

</script>

<style>

</style>
