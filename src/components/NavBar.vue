<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item navbar-logo-container">
        <img src="../assets/logo-icons/logo-toupr.png" class="navbar-logo-img" />
      </router-link>
      <div class="navbar-burger burger" @click="openCloseMobileMenu" ref="burgerMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div class="navbar-menu" ref="navBar" :class="{'is-active': showingBurgerMenu}">
      <div class="navbar-start"></div>
      <div class="navbar-end">
        <div class="studenten-nav-bar-container">
          <router-link
            to="/studenten"
            class="navbar-item navbar-item-end-text link-nav-bar link-studenten-nav-bar"
            v-if="isLoggedIn === false"
            tag="span"
          >Voor studenten</router-link>
        </div>
        <div class="navbar-end-buttons navbar-item">
          <div class>
            <router-link
              to="/login"
              class="router-link-nav-bar link-nav-bar"
              v-if="isLoggedIn === false"
              tag="span"
            >Log in</router-link>
            <router-link
              to="signup"
              class="router-link-nav-bar link-nav-bar"
              v-if="isLoggedIn === false"
              tag="span"
            >Aanmelden</router-link>
            <router-link
              to="testdashboard"
              class="router-link-nav-bar link-nav-bar"
              v-if="isLoggedIn === true"
              tag="span"
            >Mijn Dashboard</router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
// import firebase from 'firebase';

export default {
  data() {
    return {
      showingBurgerMenu: false,
    };
  },
  methods: {
    openCloseMobileMenu() {
      const burger = this.$refs.burgerMenu;
      const nav = this.$refs.navBar;
      burger.classList.toggle('is-active');
      nav.classList.toggle('is-active');
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    isChangedRoute() {
      return this.$route.path;
    },
  },
  watch: {
    // eslint-disable-next-line
    isChangedRoute: function() {
      const burger = this.$refs.burgerMenu;
      const nav = this.$refs.navBar;
      burger.classList.remove('is-active');
      nav.classList.remove('is-active');
    },
  },
};
</script>


<style lang="scss" scoped>
.display-none {
  display: none;
}

nav {
  position: fixed;
  width: 100vw;
  border-bottom: 1px solid #ebebeb;
  height: 5rem;
  font-size: 1.2rem;
}

.navbar-item {
  padding: 0.5rem 1.5rem 0.5rem 1rem;
}

.navbar-brand {
  max-height: 3.25rem;
}

.router-link-nav-bar {
  margin: 1rem;
}

.link-nav-bar {
  cursor: pointer;
  color: #8792a5;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  padding-bottom: 0.18rem;
}

.link-nav-bar:hover {
  padding-bottom: 0.18rem;
  border-bottom: 2px solid #52d3aa;
}

.link-nav-bar:hover:active {
  padding-bottom: 0.18rem;
}

.studenten-nav-bar-container {
  align-items: center;
  display: flex;
  border-right: 1px solid #ebebeb;
}

.link-studenten-nav-bar {
  margin-right: 1.8rem;
  color: inherit;
}

.router-link-exact-active {
  border-bottom: 2px solid #52d3aa;
}
.navbar-logo-img {
  margin-left: 1.3rem;
}
.navbar-item img {
  max-width: 120px;
  max-height: 49px;
}
.navbar-burger {
  margin-right: 0.3rem;
}

@media only screen and (min-width: 1024px) {
  .navbar-logo-container {
    height: 5rem;
  }
  .navbar-item-text:hover {
    border-bottom: 1px solid #52d3aa;
  }
  .stripe-burger {
    display: none;
  }
}
@media only screen and (max-width: 1024px) {
  nav {
    height: 3.25rem;
  }
  .navbar-menu.is-active {
    padding-bottom: 1rem;
  }
  .navbar-item img {
    max-height: 2.1rem;
    margin-left: 0rem;
  }
  .studenten-nav-bar-container {
    padding: 0.5rem 0.75rem;
  }
  .link-studenten-nav-bar {
    margin-left: 1rem;
    padding-left: 0.75rem;
  }
}
</style>
