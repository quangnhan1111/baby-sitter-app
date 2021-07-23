export default {
  // appendPet: (state, { species, pet }) => {
  //   state[species].push(pet)
  // }
  SET_USERS(state, users) {
    state.users = users
  },
  user(state, user) {
    state.user = user
  },
  LOADER(state, payload) {
    state.showLoading = payload
  },
  SET_EVENT(state, payload) {
    state.events = payload
  },

  ADD_EVENT: (state, event) => {
    state.events.push(event)
  },

  DELETE_EVENT: (state, event) => {
    state.events.remove(event)
  },

  FIND_EVENT: (state, event) => {
    state.event = event
  },

  // UPDATE_EVENT: (state, {id, title, start, end}) => {
  //   let index = state.events.findIndex(_event => _event.id == id)
  //
  //   state.events[index].title = title;
  //   state.events[index].start = start;
  //   state.events[index].end = end;
  // },

  UPDATE_EVENT: (state, event) => {
    console.log(state.events)
    // let index = state.events.findIndex(_event => _event.id == event.id)

    // state.events[index].title = title;
    // state.events[index].start = start;
    // state.events[index].end = end;
    // console.log(index)
  }
}
