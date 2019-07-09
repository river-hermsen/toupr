import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';
import routes from './routes';

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
      console.log('User is signed in');

      console.log(user);

      // ...
    } else {
      console.log('User is not signed in');

      // User is signed out.
      // ...
    }
    next();
  });
});

export default router;
