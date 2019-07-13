import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    db: undefined,
    isLoggedIn: undefined,
    userInfo: {},
    userData: {},
  },
  mutations: {
    changeLoginState(state, val) {
      state.isLoggedIn = val;
    },
    addUserData(state, userData) {
      state.userData = userData;
    },
    addFireStoreDb(state, db) {
      state.db = db;
    },
  },
});
