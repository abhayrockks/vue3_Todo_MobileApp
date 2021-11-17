import { createStore } from 'vuex'

export default createStore({
  state: {
    favourites: [],
    totalList: [],
    completedList: []
  },
  mutations: {
    add_favourite: (state, data) => {
      state.favourites.push(data);
    },
    add_total: (state, data) => {
      state.totalList = data;
    },
    update_favourite: (state, data) => {
      state.favourites = data;
    },
    remove_from_favourite: (state, data) => {
      const filterdfavourites = state.favourites.filter((el) => el !== data);
      state.favourites = filterdfavourites;
    },
    add_completed: (state, data) => {
      state.completedList = data;
    },
  },
  actions: {
    addToFavourite({ commit }, payload) {
      commit('add_favourite', payload)
    },
    removeFromFavourite({ commit }, payload) {
      commit('remove_from_favourite', payload)
    },
    addToTotal({ commit }, payload) {
      commit('add_total', payload)
    },
    updateFavourites({ commit }, payload) {
      commit('update_favourite', payload)
    },
    addTocomplete({ commit }, payload) {
      commit('add_completed', payload)
    },
  },
  modules: {
  }
})
