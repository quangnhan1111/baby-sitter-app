<template>
  <div>
    <fieldset>
      <label>Please enter a title</label>
      <input type="text" v-model="title"> <br/>
      <b>Start:</b>  {{ selectInfo.startStr }} <br/>
      <b>End:</b>  {{ selectInfo.endStr }} <br/>
    </fieldset>
    <div>
        <b-form-checkbox
        v-model="status"
        name="checkbox-1"
        value="repeat"
        unchecked-value="not_repeat"
        >
        repeat all day in week
        </b-form-checkbox>
    </div>
    <fieldset>
        <button @click="handleSubmit">Submit</button>
        <!-- <button @click="handleSubmit">Repeat</button> -->
    </fieldset>
  </div>
</template>

<script>
import { formatDateForDb, createEventId } from '@/utils/helpers.js'
// import { createEventId } from '../../event-utils'
import moment from 'moment'
import axios from 'axios'

export default {
  data: () => ({
    title: '',
    calendarForDb: {},
    calendar: {},
    status: 'not_repeat'
  }),
  props: {
    selectInfo: {
      type: Object,
      default: () => {}
    }
  },
  // async created() {
  //   await this.$store.dispatch("fetchCalendar", this.event.id)
  //   // console.log(this.$store.state.event)
  // },
  methods: {
    handleSubmit() {
      // alert(this.selectInfo.startStr + '---' + moment().day(new Date().getDay()).format())
      let idEventNotRepeated = createEventId()
      let calendarApi = this.selectInfo.view.calendar
      if (this.title) {
        this.calendarForDb = {
          id: idEventNotRepeated,
          title: this.title,
          start: (this.selectInfo.startStr).slice(0, 19),
          end: ((this.selectInfo.endStr).slice(0, 19)),
          // constraint: 'availableForMeeting',
          // block: true,
          color: '#BABBBF',
          dayMaxEvents: true,
          startTime: '',
          endTime: '',
          startRecur: '',
          endRecur: '',
          user_id: localStorage.getItem('id'),
          // parent_id: '',: default: null
          selectable: true,
          editable: true,
          overlap: true
        },
        this.calendar = {
          id: idEventNotRepeated,
          title: this.title,
          start: this.selectInfo.startStr,
          end: this.selectInfo.endStr,
          // constraint: 'availableForMeeting',
          // rendering: 'background',
          // block: true,
          color: '#BABBBF', // overridder lai mau
          startTime: '',
          endTime: '',
          startRecur: '',
          endRecur: '',
          user_id: localStorage.getItem('id'),
          // parent_id: '',: default: null
          selectable: true,
          editable: true,
          overlap: true
        }
        // eslint-disable-next-line eqeqeq
        if (this.status == 'not_repeat') {
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
          return
        }
        let day = (this.selectInfo.startStr).slice(0, 10)
        let len = 1 + (new Date(moment().add(4, 'week').subtract(0, 'day').format().slice(0, 10)).getTime() - new Date(day).getTime()) / (1000 * 24 * 60 * 60)
        for (let index = 0; index < len; index++) {
          let idForEventRepeat = createEventId()
          let cal = {
            id: idForEventRepeat,
            title: this.title,
            start: this.selectInfo.startStr,
            end: this.selectInfo.endStr,
            color: '#BABBBF', // overridder lai mau
            startTime: '',
            endTime: '',
            startRecur: '',
            endRecur: '',
            user_id: localStorage.getItem('id'),
            // parent_id: '',: default: null
            selectable: true,
            editable: true,
            overlap: false
          }
          let calDb = {
            id: idForEventRepeat,
            title: this.title,
            start: (this.selectInfo.startStr).slice(0, 19),
            end: ((this.selectInfo.endStr).slice(0, 19)),
            color: '#BABBBF', // overridder lai mau
            startTime: '',
            endTime: '',
            startRecur: '',
            endRecur: '',
            user_id: localStorage.getItem('id'),
            // parent_id: '',: default: null
            selectable: true,
            editable: true,
            overlap: false
          }

          cal.startRecur = formatDateForDb(new Date(new Date(day).getTime() + index * 1000 * 60 * 60 * 24))
          cal.endRecur = formatDateForDb(new Date(new Date(day).getTime() + (1 + index) * 1000 * 60 * 60 * 24))
          calDb.startRecur = formatDateForDb(new Date(new Date(day).getTime() + index * 1000 * 60 * 60 * 24))
          calDb.endRecur = formatDateForDb(new Date(new Date(day).getTime() + (1 + index) * 1000 * 60 * 60 * 24))
          cal.startTime = moment(this.selectInfo.start).format('HH:mm')
          cal.endTime = moment(this.selectInfo.end).format('HH:mm')
          calDb.startTime = moment(this.selectInfo.start).format('HH:mm')
          calDb.endTime = moment(this.selectInfo.end).format('HH:mm')
          console.log(calDb)
          this.$store.commit('LOADER', true)
          calendarApi.addEvent(cal)
          // this.$store.dispatch("addCalendar", calDb)
          this.addCalendar(calDb)
          this.$store.commit('LOADER', false)
        }
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
      objCalendar.editable = calendar.editable
      objCalendar.selectable = calendar.selectable
      objCalendar.parent_id = null
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
