import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    db: undefined,
    isLoggedIn: undefined,
    userInfo: {},
  },
  mutations: {
    changeLoginState(state, val) {
      state.isLoggedIn = val;
    },
    addUserInfoData(state, userInfoData) {
      state.userInfo = userInfoData;
    },
    addFireStoreDb(state, db) {
      state.db = db;
    },
  },
});
