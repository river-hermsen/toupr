// Import Vue views
import Home from '../views/Home.vue';
import Login from '../views/auth/Login.vue';
import Search from '../views/Search.vue';
import NotFound from '../views/404.vue';
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
    path: '/wachtwoordvergeten',
    name: 'ForgotPassword',
    component: () => import(/* webpackChunkName: "ForgotPassword" */ '../views/auth/ForgotPassword.vue'),
    meta: {
      requiredAuth: false,
    },
  },
  {
    path: '/aanmelden',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "SignUp" */ '../views/auth/SignUp.vue'),
    meta: {
      requiredAuth: false,
    },
  },
  {
    path: '/studenten',
    name: 'ForStudents',
    component: () => import(/* webpackChunkName: "ForStudents" */ '../views/ForStudents.vue'),
  },
  {
    path: '/zoeken',
    name: 'Search',
    component: Search,
  },
  {
    path: '/student/:id',
    name: 'StudentProfile',
    component: () => import(/* webpackChunkName: "StudentProfile" */ '../views/StudentProfile.vue'),
  },
  {
    path: '/buitenpostcode',
    name: 'BuitenPostcode',
    component: () => import(/* webpackChunkName: "BuitenPostcode" */ '../views/OutsidePostalCode.vue'),
  },
  {
    path: '/olddashboard',
    name: 'OldDashboard',
    component: () => import(/* webpackChunkName: "OldDashboard" */ '../views/OldDashboard.vue'),
    meta: {
      requiredAuth: true,
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard.vue'),
    meta: {
      requiredAuth: true,
    },
  },
  {
    path: '/completeprofile',
    name: 'CompleteProfile',
    component: () => import(/* webpackChunkName: "CompleteProfile" */ '../views/CompleteProfile.vue'),
    meta: {
      requiredAuth: true,
    },
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "Test" */ '../views/Test.vue'),
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '*',
    redirect: '/404',
  },
];
