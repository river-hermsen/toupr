// Import Vue views
import Home from '../views/Home.vue';
import Login from '../views/auth/Login.vue';
import SignUp from '../views/auth/SignUp.vue';
import ForStudents from '../views/ForStudents.vue';
import Search from '../views/Search.vue';
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
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
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
];
