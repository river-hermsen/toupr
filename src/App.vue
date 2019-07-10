<template>
  <div id="app">
    <navBar />
    <div id="content">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";
// Import font
@import url("https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap");

// Set your colors
$primary: #52d3aa;

// Font settings
$family-primary: "Poppins", sans-serif;

// Custom css to change buefy framework
.button {
  .is-primary {
    color: white;
  }
}
// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
.button.is-primary {
  color: white;
}
.button.is-primary:hover,
.button.is-primary:active,
.button.is-primary:focus {
  color: white !important;
}
// Custom css for App.vue
#content {
  padding-top: 5rem;
  min-height: calc(100vh - 4rem);
  background-color: #fafafa;
}
@media only screen and (max-width: 1024px) {
  #content {
    padding-top: 3.25rem;
  }
}

// Custom classes for all Vue views or components
.text-primary {
  color: $primary;
}

@media screen and (max-width: 1024px) {
  .only-show-desktop {
    display: none;
  }
}
</style>

<script>
import navBar from './components/NavBar.vue';

export default {
  components: {
    navBar,
  },
};
</script>
