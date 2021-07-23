import axios from 'axios'

export default {
  // addPet: ({ commit }, payload) => {
  //   commit('appendPet', payload)
  // },
  getUsers({ commit }) {
    axios.get('http://127.0.0.1:8000/api/users', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => {
        console.log(response.data.data)
        commit('SET_USERS', response.data.data)
      })
  },
  user(context, user) {
    context.commit('user', user)
  },

  async fetchCalendars({ commit }, id) {
    await axios.get(`http://127.0.0.1:8000/api/calendars/getCalendarsByUser/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => {
        commit('SET_EVENT', response.data)
        console.log(response.data)
        // return response.data
      }).catch(
        err => {
          console.log(err)
        }
      )
  },

  addCalendar({ commit }, calendar) {
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
    console.log(objCalendar)

    axios.post('http://127.0.0.1:8000/api/calendars', objCalendar, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(
        res => {
          console.log(res)
          commit('ADD_EVENT', res)
        // const data = res
        // this.currentEvents = [...this.currentEvents, data]
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
  },

  deleteCalendar({ commit }, id) {
    axios.delete(`http://127.0.0.1:8000/api/calendars/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
  },

  async fetchCalendar({ commit }, id) {
    await axios.get(`http://127.0.0.1:8000/api/calendars/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(
        res => {
        // console.log(res.data)
          commit('FIND_EVENT', res.data)
        // this.eventUpdated = res.data
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
  },

  //   updateEvent({ commit }, id, event) {
  //     console.log(event)

  //     axios.put(`http://127.0.0.1:8000/api/calendars/${id}`, event , {
  //         headers: {
  //           Authorization: 'Bearer ' + localStorage.getItem('token')
  //         }
  //     })
  //     .then(
  //       res => {
  //         console.log(res)
  //         commit('UPDATE_EVENT', res.data)
  //         // this.$router.push('/calendar')
  //         // const data = await res.json()
  //         // // console.log(id)
  //         // this.tasks = this.tasks.map((task) =>
  //         // task.id === id ? { ...task, reminder: data.reminder } : task
  //         // )
  //       }
  //     ).catch(
  //       err => {
  //         console.log(err)
  //       }
  //     )
  // },

  updateEvent({ commit }, payload) {
    payload.event = {
      ...payload.event,
      status: 1,
      color: '#BABBBF',
      editable: false,
      selectable: false,
      className: ['user_block', 'bday_block']
    }
    axios.put(`http://127.0.0.1:8000/api/calendars/${payload.id}`, payload.event, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(
        res => {
          console.log(res.data)
          commit('UPDATE_EVENT', res.data)
        // this.eventUpdated = res.data
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
  }

}
