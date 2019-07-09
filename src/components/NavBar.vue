<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        <img src="../assets/logo-icons/logo-toupr.png" class="navbar-logo-img" />
      </router-link>
      <div class="navbar-burger-button" @click="openMobileMenu">
        <div class="stripe-burger" ref="stripeBurgerTop"></div>
        <div class="stripe-burger" ref="stripeBurgerMiddle"></div>
        <div class="stripe-burger" ref="stripeBurgerBottom"></div>
      </div>
    </div>

    <div class="navbar-menu">
      <div class="navbar-start"></div>
      <div class="navbar-end">
        <router-link
          to="/studenten"
          class="navbar-item navbar-item-text navbar-item-end-text"
          v-if="!isLoggedIn"
        >Voor studenten</router-link>
        <div class="navbar-end-buttons navbar-item">
          <div class="buttons">
            <router-link to="/login" class="router-link-button" v-if="!isLoggedIn">
              <b-button type="is-primary">Log in</b-button>
            </router-link>
            <router-link to="signup" class="router-link-button" v-if="!isLoggedIn">
              <b-button type="is-primary" outlined>Sign up</b-button>
            </router-link>
            <router-link to="dashboard" class="router-link-button" v-if="isLoggedIn">
              <b-button type="is-primary" outlined>Mijn Dashboard</b-button>
            </router-link>
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
  mounted() {
    console.log(this);
  },
  methods: {
    openMobileMenu() {
      this.showingBurgerMenu = !this.showingBurgerMenu;
      this.$refs.stripeBurgerTop.classList.toggle(
        'stripe-burger-top-animation',
      );
      this.$refs.stripeBurgerMiddle.classList.toggle(
        'stripe-burger-middle-animation',
      );
      this.$refs.stripeBurgerBottom.classList.toggle(
        'stripe-burger-bottom-animation',
      );
      console.log(this.$refs.stripeBurgerTop);
    },
    // handleLogOut() {
    //   firebase
    //     .auth()
    //     .signOut()
    //     .then((res) => {
    //       // Sign-out successful.
    //       console.log(res);
    //       this.$store.commit('changeLoginState', false);
    //     })
    //     .catch((error) => {
    //       // An error happened.
    //       console.log(error);
    //     });
    // },
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
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
.router-link-button {
  padding: 1rem;
}
.router-link-exact-active {
  border-bottom: 2px solid #52d3aa;
}
.navbar-item-end-text {
  border-right: 1px solid #ebebeb;
}
.navbar-logo-img {
  margin-left: 1.3rem;
}
.navbar-item img {
  max-width: 120px;
  max-height: 49px;
}
.navbar-burger-button {
  margin: auto 1rem auto auto;
  height: 100%;
}
.stripe-burger {
  margin: 7px;
  height: 2px;
  width: 33px;
  background-color: #52d3aa;
  transition: all 0.5s ease;
}
.stripe-burger-top-animation {
  transform: rotateZ(-45deg) translateY(13px);
}
.stripe-burger-middle-animation {
  transform: translateX(90px);
  opacity: 0;
}
.stripe-burger-bottom-animation {
  transform: rotateZ(45deg) translateY(-13px);
}
@media only screen and (min-width: 1024px) {
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
  .navbar-item img {
    max-height: 2.5rem;
    margin-left: 0rem;
  }
}
</style>
