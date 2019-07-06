import firebase from 'firebase';
import Vue from 'vue';
import Buefy from 'buefy';
import VeeValidate from 'vee-validate';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import fireBaseConfig from './config/fireBaseConfig';

Vue.use(VeeValidate, {
  events: ''
});
// import 'buefy/dist/buefy.css';

Vue.use(Buefy);

Vue.config.productionTip = false;
firebase.initializeApp(fireBaseConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
