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
      store.commit('addUserData', user);
      if (!store.state.userInfo) {
        const { db } = store.state;
        const { uid } = store.state.userData;
        const docRef = db.collection('users').doc(uid);
        docRef.get().then((doc) => {
          console.log('Refreshed user info.');
          const userInfo = doc.data();
          store.commit('addUserInfo', userInfo);
        }).then(() => {
          if (to.meta.requiredAuth === false) {
            next('/dashboard');
          } else {
            next();
          }
        });
      } else if (to.meta.requiredAuth === false) {
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
