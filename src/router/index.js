import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';
import routes from './routes';
import store from '../store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      // console.log('User is signed in');
      store.commit('changeLoginState', true);
      store.commit('addUserInfoData', user);
      next();
      if (to.meta.requiredAuth === false) {
        next('/dashboard');
      } else {
        next();
      }
    } else {
      // User is signed out.
      // console.log('User is not signed in');
      store.commit('changeLoginState', false);
      if (to.meta.requiredAuth) {
        next('/login');
      } else {
        next();
      }
    }
  });
});

export default router;
