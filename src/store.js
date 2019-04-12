import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    windowInfo: {
      width: window.innerWidth,
      height: window.innerHeight
    }
  },
  mutations: {},
  actions: {}
});
