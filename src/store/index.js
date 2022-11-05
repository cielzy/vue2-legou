import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: 0,

    goodsId: 0,
    cityInfo: {}
  },
  getters: {},
  mutations: {
    savaID(state, id) {
      state.id = id
    },

    saveGoodsId(state, id) {
      state.goodsId = id
    },
    saveCityInfo(state, city) {
      state.cityInfo = city
    }
  },
  actions: {},
  modules: {}
})
