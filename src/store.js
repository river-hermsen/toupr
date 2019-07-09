import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: undefined,
  },
  mutations: {
    changeLoginState(state, val) {
      state.isLoggedIn = val;
      console.log(val);
    },
  },
});
