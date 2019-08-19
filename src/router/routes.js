// Import Vue views
import Home from '../views/Home.vue';
import Login from '../views/auth/Login.vue';
import SignUp from '../views/auth/SignUp.vue';
import ForStudents from '../views/ForStudents.vue';
import Search from '../views/Search.vue';
import OutsidePostalCode from '../views/OutsidePostalCode.vue';
// import Dashboard from '../views/Dashboard.vue';

// Export routes for vue router
export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiredAuth: false,
    },
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    meta: {
      requiredAuth: false,
    },
  },
  {
    path: '/studenten',
    name: 'ForStudents',
    component: ForStudents,
  },
  {
    path: '/zoeken',
    name: 'Search',
    component: Search,
  },
  {
    path: '/buitenpostcode',
    name: 'BuitenPostcode',
    component: OutsidePostalCode,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    meta: {
      requiredAuth: true,
    },
  },
  {
    path: '/testdashboard',
    name: 'TestDashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/TestDashboard.vue'),
    meta: {
      requiredAuth: true,
    },
  },

  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Test.vue'),
  },
];
