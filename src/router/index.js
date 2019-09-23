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
      store.commit('changeLoginState', true);
      store.commit('addUserData', user);

      if (store.state.userInfo) {
        // If userInfo does exsits in VUEX
        const { userInfo } = store.state;

        // if (to.name !== 'CompleteProfile' && userInfo.completedProfile.is === false) {
        //   // Redirect to /completeprofile if its not already there and if profile is not completed
        //   next('/completeprofile');
        // } else {
        //   next();
        // }
        next();
      } else {
        // If userInfo does NOT exsits in VUEX

        // Start getting userInfo from Firestore
        const { db } = store.state;
        const { uid } = store.state.userData;
        const docRef = db.collection('users').doc(uid);
        docRef.get().then((doc) => {
          const userInfo = doc.data();
          // Add userInfo to VUEX
          store.commit('addUserInfo', userInfo);
          return userInfo;
        }).then((userInfo) => {
          // if (to.name !== 'CompleteProfile' && userInfo.completedProfile.is === false) {
          //   // Redirect to /completeprofile if its not already there and if profile is not completed
          //   next('/completeprofile');
          // } else {
          //   next();
          // }
          next();
        });
      }
    } else {
      // User is signed out.
      store.commit('changeLoginState', false);
      if (to.meta.requiredAuth) {
        // Redirect to login if Authentication is required on this view
        next('/login');
      } else {
        next();
      }
    }
  });
});

export default router;
