import Vue from 'vue';
import firebase from 'firebase';
import Buefy from 'buefy';
import VeeValidate from 'vee-validate';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
// eslint-disable-next-line
import fireBaseConfig from './config/fireBaseConfig.js';

Vue.use(VeeValidate, {
  events: '',
});
Vue.config.productionTip = false;
Vue.use(Buefy);

Vue.config.productionTip = false;
firebase.initializeApp(fireBaseConfig);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
