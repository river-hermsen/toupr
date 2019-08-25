<template>
  <div id="app" ref="element">
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
@import url("https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700&display=swap");
// Import material dsign i
@import url("//cdn.materialdesignicons.com/3.8.95/css/materialdesignicons.min.css");
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

.label {
  font-weight: 300;
}

@media screen and (max-width: 1024px) {
  .only-show-desktop {
    display: none;
  }
}

.loading-overlay {
  z-index: 99;
  .loading-icon {
    z-index: 99;
  }
}
</style>

<script>
// eslint-disable-next-line
import { Loading } from "buefy";
import navBar from './components/NavBar.vue';

export default {
  data() {
    return {
      isFullPage: true,
    };
  },
  components: {
    navBar,
  },
  beforeCreate() {
    const loadingComponent = this.$loading.open({
      container: null,
    });
    this.loadingComponent = loadingComponent;
  },
  mounted() {
    this.loadingComponent.close();
  },
};
</script>
