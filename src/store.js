import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    db: undefined,
    isLoggedIn: undefined,
    userData: {},
    userInfo: null,
  },
  mutations: {
    changeLoginState(state, val) {
      state.isLoggedIn = val;
    },
    addUserData(state, userData) {
      state.userData = userData;
    },
    addUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    addFireStoreDb(state, db) {
      state.db = db;
    },
  },
});
