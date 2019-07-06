<template>
  <div id="app">
    <navBar />
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/login">Login</router-link>|
      <router-link to="/signup">Sign Up</router-link>
      <el-button v-on:click="handleSignOut">Sign Out</el-button>
    </div>-->
    <div id="content">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<style lang="scss">
// Import Bulma's core
@import '~bulma/sass/utilities/_all';

// Set your colors
$primary: #52d3aa;
$primary-invert: findColorInvert($primary);
$twitter: #4099ff;
$twitter-invert: findColorInvert($twitter);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
  'white': (
    $white,
    $black
  ),
  'black': (
    $black,
    $white
  ),
  'light': (
    $light,
    $light-invert
  ),
  'dark': (
    $dark,
    $dark-invert
  ),
  'primary': (
    $primary,
    $primary-invert
  ),
  'info': (
    $info,
    $info-invert
  ),
  'success': (
    $success,
    $success-invert
  ),
  'warning': (
    $warning,
    $warning-invert
  ),
  'danger': (
    $danger,
    $danger-invert
  ),
  'twitter': (
    $twitter,
    $twitter-invert
  )
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

.button {
  .is-primary {
    color: white;
  }
}

// Import Bulma and Buefy styles
@import '~bulma';
@import '~buefy/src/scss/buefy';

.button.is-primary {
  color: white;
}

.button.is-primary:hover,
.button.is-primary:active,
.button.is-primary:focus {
  color: white !important;
}
</style>


<style lang="scss">
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#content {
  padding-top: 5rem;
  min-height: calc(100vh - 4rem);
}

@media only screen and (max-width: 1024px) {
  #content {
    padding-top: 3.25rem;
  }
}
</style>

<script>
import firebase from 'firebase';
import navBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
export default {
  components: {
    navBar,
    Footer
  },
  methods: {
    handleSignOut() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          console.log('Sign out sucess');
        })
        .catch(function(error) {
          console.log('Sign out no sucess');
        });
    }
  }
};
</script>