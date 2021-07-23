<template>
<div>
  <div class='app'>
    <div class='app__sidebar'>
      <div class='app__sidebar__section'>
        <label>
          <input
            type='checkbox'
            :checked='calendarOptions.weekends'
            @change='handleWeekendsToggle'
          />
          toggle weekends
        </label>
      </div>
    </div>
    <div class='app__main'>
        <FullCalendar :options="calendarOptions" />
    </div>
</div>
</div>
</template>
<script>
import FullCalendar from '@fullcalendar/vue'
import DayGridPlugin from '@fullcalendar/daygrid'
import TimeGridPlugin from '@fullcalendar/timegrid'
import InteractionPlugin from '@fullcalendar/interaction'
import rrulePlugin from '@fullcalendar/rrule'
import momentPlugin from '@fullcalendar/moment'
import ListPlugin from '@fullcalendar/list'
import moment from 'moment'
import EventModal from '@/components/EventModal.vue'
import EventModalForSelect from '@/components/EventModalForSelect.vue'
import axios from 'axios'

export default {
  name: 'Calendar',
  components: {
    FullCalendar,
    EventModal,
    EventModalForSelect
  },
  data() {
    return {
      calendarOptions: {
        plugins: [ momentPlugin, rrulePlugin, DayGridPlugin, InteractionPlugin, TimeGridPlugin, ListPlugin ],
        initialView: 'timeGridWeek',
        selectable: true,
        navLinks: true,
        editable: true,
        droppable: true,
        eventResizableFromStart: true,
        selectMirror: true,
        weekends: true,
        selectOverlap: function(event) {
          return false
        },
        eventOverlap: function(event) {
          return false
        },
        selectConstraint: 'businessHours',
        eventConstraint: 'businessHours',
        businessHours: [
          {
            daysOfWeek: [0, 1, 2, 3, 4, 5, 6], // Monday, Tuesday, Wednesday
            startTime: '05:00', // 8am
            endTime: '22:00' // 6pm
          }
        ],
        // eventColor: 'green',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek'
        },
        events: [],
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventResize: this.handleEventResize,
        eventDrop: this.handleEventDrog,
        eventsSet: this.handleEvents,
        validRange: {
          start: moment().day(new Date().getDay()).utc().format(),
          end: moment().add(4, 'week').subtract(0, 'day').utc().format()

        }
      },
      currentEvents: [],
      calendarForDb: {},
      calendar: {},
      objCal: {}
    }
  },
  // computed: {
  //   ...mapActions(['fetchCalendars']),
  //   // console.log(this.$store.dispatch("fetchCalendars", localStorage.getItem('id')))
  // },
  created() {
    // await this.$store.dispatch("fetchCalendars", localStorage.getItem('id'))
    this.fetchCalendars(localStorage.getItem('id'))
  },
  methods: {
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
    },
    handleDateSelect(selectInfo) {
      this.$modal.show(EventModalForSelect, {
        selectInfo: selectInfo
      })
    },
    handleEventClick(clickInfo) {
      console.log(clickInfo.event)
      this.$modal.show(EventModal, {
        event: clickInfo.event
      })
    },
    async handleEventDrog(clickInfo) {
      // await this.$store.dispatch("fetchCalendar", clickInfo.event.id)
      if (clickInfo.event.backgroundColor != 'green') {
        await this.fetchCalendar(clickInfo.event.id)
        this.$store.commit('LOADER', true)
        // this.objCal = this.$store.state.event
        this.objCal = {
          ...this.objCal,
          start: clickInfo.event.startStr.slice(0, 19),
          end: clickInfo.event.endStr.slice(0, 19),
          start_time: clickInfo.event.startStr.slice(0, 19),
          end_time: clickInfo.event.endStr.slice(0, 19)
        }
        this.updateEvent(clickInfo.event.id)
        // for calendar view
        // var event = calendarApi.getEventById(this.objCal.id)
        // event.setProp('start', clickInfo.event.startStr.slice(0, 19))
        // event.setProp('end', clickInfo.event.startStr.slice(0, 19))
        // event.setProp('start_time', clickInfo.event.startStr.slice(0, 19))
        // event.setProp('end_time', clickInfo.event.startStr.slice(0, 19))
      }
      this.$store.commit('LOADER', false)
    },
    async handleEventResize(clickInfo) {
      // await this.$store.dispatch("fetchCalendar", clickInfo.event.id)
      if (clickInfo.event.backgroundColor != 'green') {
        await this.fetchCalendar(clickInfo.event.id)
        this.$store.commit('LOADER', true)
        console.log(this.objCal)
        this.objCal = {
          ...this.objCal,
          start: clickInfo.event.startStr.slice(0, 19),
          end: clickInfo.event.endStr.slice(0, 19),
          start_time: clickInfo.event.startStr.slice(0, 19),
          end_time: clickInfo.event.endStr.slice(0, 19)
        }
        console.log(clickInfo.event.id)
        this.updateEvent(clickInfo.event.id)
      }
      this.$store.commit('LOADER', false)
    },
    handleEvents(events) {
      this.currentEvents = events
    },

    updateEvent(id) {
      axios.put(`http://127.0.0.1:8000/api/calendars/${id}`, this.objCal, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
    },

    fetchCalendars(id) {
      axios.get(`http://127.0.0.1:8000/api/calendars/getCalendarsByUser/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then(response => {
          // commit('SET_EVENT', response.data)
          console.log(response.data)
          this.currentEvents = response.data
          this.calendarOptions.events = this.currentEvents.data
          // console.log(this.calendarOptions)
          // return response.data
        }).catch(
          err => {
            console.log(err)
          }
        )
    },

    async fetchCalendar(id) {
      await axios.get(`http://127.0.0.1:8000/api/calendars/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then(
          res => {
          // commit('FIND_EVENT', res.data)
          //   console.log(res.data)
            this.objCal = res.data
          }
        ).catch(
          err => {
            console.log(err)
          }
        )
    }

  }

}
</script>

<style lang='scss'>

h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b { /* used for event dates/times */
  margin-right: 3px;
}

.app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
  @at-root #{&}__sidebar {
      width: 300px;
      line-height: 1.5;
      background: #eaf9ff;
      border-right: 1px solid #d3e2e8;
      @at-root #{&}__section {
        padding: 2em;
      }
  }
  @at-root #{&}__main {
      flex-grow: 1;
      padding: 3em;
  }
}

.fc { /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}

</style>
