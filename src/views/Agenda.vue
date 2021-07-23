<template>
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
import axios from 'axios'
import EventModalForParentSelect from '@/components/EventModalForParentSelect'
import EventModal from '@/components/EventModal'

export default {
  name: 'Agenda',
  data() {
    return {
      calendarOptions: {
        plugins: [ momentPlugin, rrulePlugin, DayGridPlugin, InteractionPlugin, TimeGridPlugin, ListPlugin ],
        navLinks: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        selectable: true,
        editable: true,
        eventStartEditable: true,
        droppable: true,
        eventAllow: function (dropLocation, draggedEvent) {
          return false
        },
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
        // selectAllow: this.handleSelectAllow,
        // dayCellDidMount: this.handlDayRender,
        initialView: 'timeGridWeek',
        eventColor: 'green',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek'
        },
        events: [],
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        validRange: {
          start: moment().day(new Date().getDay()).utc().format(),
          end: moment().add(4, 'week').subtract(0, 'day').utc().format()
        }
      },
      currentEvents: [],
      calendarForDb: {},
      calendar: {},
      objCal: {},
      eventUpdated: {}
    }
  },
  components: {
    FullCalendar,
    EventModalForParentSelect,
    EventModal
  },
  created() {
    // await this.$store.dispatch("fetchCalendars", localStorage.getItem('id'))
    // console.log(this.$route.params.id)
    this.fetchCalendars(this.$route.params.id)
  },
  methods: {
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
    },

    handleDateSelect(selectInfo) {
      this.$modal.show(EventModalForParentSelect, {
        selectInfo: selectInfo,
        id_user: this.$route.params.id,
        id_parent: localStorage.getItem('id')
      })
    },

    handleEventClick(clickInfo) {
      console.log(clickInfo.event)
      this.$modal.show(EventModal, {
        event: clickInfo.event
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
        }).catch(
          err => {
            console.log(err)
          }
        )
    },

    fetchCalendar(id) {
      axios.get(`http://127.0.0.1:8000/api/calendars/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then(
          res => {
            this.eventUpdated = res.data
          }
        ).catch(
          err => {
            console.log(err)
          }
        )
    },

    updateEvent(payload) {
      payload.event = {
        ...payload.event,
        status: 1,
        color: '#BABBBF',
        editable: false,
        selectable: false
        // className : ["user_block", "bday_block"]
      }
      axios.put(`http://127.0.0.1:8000/api/calendars/${payload.id}`, payload.event, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then(
          res => {
            console.log(res.data)
            // commit('UPDATE_EVENT', res.data)
            // this.eventUpdated = res.data
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
