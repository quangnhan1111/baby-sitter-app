Cấu trúc file:
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

vs:
computed: {
    ...mapState({
      showLoading: state => state.showLoading
    })
  }
  
-this.$route.params.id
-this.$router.push('/')
-<router-link to="/" class="navbar-brand">Home</router-link>: chuyển đường link 
-axios.js: chứa baseURL và  headers 

-VUEX:Xem cách quản lí trong code!!!




1)Login:
-Áp dụng  this.$store.commit('LOADER', true) 

submit() {
      this.$store.commit('LOADER', true)
      axios.post('login', {
        email: this.email,
        password: this.password
      })
        .then(
          res => {
            this.$store.commit('LOADER', false)
            ........
          }
        ).catch(
          err => {
            this.$store.commit('LOADER', false)
            this.error = 'Unauthorized'
          }
        )
    }
2)Register:
-Áp dụng  this.$store.commit('LOADER', true) tương tự.

3)Các Event:
a)Đối với role parent được chon :
-fetchCalendars(id): Lấy ra tất cả các event của babysiter được 
-Các sự kiện:
 select: this.handleDateSelect,
 eventClick: this.handleEventClick,
 eventsSet: this.handleEvents,
 ==>
 
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
    
  handleEvents(events) {
      this.currentEvents = events
    },
    
==>Show Modal: xem chi tiet trong code.

b)Đối với role babysiter:

select: this.handleDateSelect,
eventClick: this.handleEventClick,
eventResize: this.handleEventResize,
eventDrop: this.handleEventDrog,
eventsSet: this.handleEvents,


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
      if (clickInfo.event.backgroundColor !== 'green') {
        await this.fetchCalendar(clickInfo.event.id)
        this.$store.commit('LOADER', true)
        this.objCal = {
          ...this.objCal,
          start: clickInfo.event.startStr.slice(0, 19),
          end: clickInfo.event.endStr.slice(0, 19),
          start_time: clickInfo.event.startStr.slice(0, 19),
          end_time: clickInfo.event.endStr.slice(0, 19)
        }
        this.updateEvent(clickInfo.event.id)
      }
      this.$store.commit('LOADER', false)
    },
    
 
async handleEventResize(clickInfo) {
      if (clickInfo.event.backgroundColor !== 'green') {
        await this.fetchCalendar(clickInfo.event.id)
        this.$store.commit('LOADER', true)
        this.objCal = {
          ...this.objCal,
          start: clickInfo.event.startStr.slice(0, 19),
          end: clickInfo.event.endStr.slice(0, 19),
          start_time: clickInfo.event.startStr.slice(0, 19),
          end_time: clickInfo.event.endStr.slice(0, 19)
        }
        this.updateEvent(clickInfo.event.id)
      }
      this.$store.commit('LOADER', false)
    },
    
    
    
 handleEvents(events) {
      this.currentEvents = events
    },
==>Show Modal: xem chi tiet trong code.





Tham Khảo:
https://www.youtube.com/watch?v=A-ESlbM-XzE&t=1233s
https://www.youtube.com/watch?v=2NOsjTT1b_k&t=432s
https://loading.io/css/
Add the Loading Spinner Component and use it with the help of store: https://www.youtube.com/watch?v=pGKSBO9tAUo
