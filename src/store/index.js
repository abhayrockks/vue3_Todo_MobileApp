import { createStore } from 'vuex'

export default createStore({
  state: {
    favourites: [],
    totalList: []
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
  },
  actions: {
    addToFavourite({ commit }, payload) {
      commit('add_favourite', payload)
    },
    addToTotal({ commit }, payload) {
      commit('add_total', payload)
    },
    updateFavourites({ commit }, payload) {
      commit('update_favourite', payload)
    },
  },
  modules: {
  }
})
