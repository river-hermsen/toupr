import Vue from 'vue';
import firebase from 'firebase';
import Buefy from 'buefy';
import VeeValidate, { Validator } from 'vee-validate';
import nl from 'vee-validate/dist/locale/nl';
import App from './App.vue';
import router from './router/index';
import store from './store';
import './registerServiceWorker';
// eslint-disable-next-line
import fireBaseConfig from './config/fireBaseConfig.js';

// Init VeeValidate
Validator.localize({ nl });
Vue.use(VeeValidate, { locale: 'nl', events: 'blur' });

// Init Buefy
Vue.use(Buefy);

// Init firebase
firebase.initializeApp(fireBaseConfig);
store.commit('addFireStoreDb', firebase.firestore());

// Init vue app
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
