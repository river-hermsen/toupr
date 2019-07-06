import Vue from 'vue';
import Router from 'vue-router';
import * as firebase from 'firebase/app';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Login from './views/auth/Login.vue';
import SignUp from './views/auth/SignUp.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    }
  ]
});

router.beforeEach((to, from, next) => {
  // let isLoggedin = Boolean;
  if (to.meta.authRequired) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('Logged In');

        next();
        return true;
      }
      console.log('Not logged In');
      next('/login');
      return false;
    });
  } else {
    next();
  }
});

export default router;
