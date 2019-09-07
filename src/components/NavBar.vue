<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item navbar-logo-container">
        <img src="../assets/logo-icons/logo-toupr.png" class="navbar-logo-img" />
      </router-link>
      <!-- <div class="navbar-burger burger" @click="openCloseMobileMenu" ref="burgerMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>-->
      <div class="burger-container">
        <div class="menu-icon" @click="openFullWidthNav()">
          <span class="menu-icon__line menu-icon__line-left"></span>
          <span class="menu-icon__line"></span>
          <span class="menu-icon__line menu-icon__line-right"></span>
        </div>
      </div>

      <div class="mobile-nav" id="mobileNav">
        <div class="mobile-nav__content">
          <ul class="mobile-nav__list visibility-hidden" id="mobileNavList">
            <!-- <li class="nav__list-item">Home</li>
            <li class="nav__list-item">About</li>
            <li class="nav__list-item">Projects</li>
            <li class="nav__list-item">Contact</li>-->
            <router-link
              to="/login"
              class="router-link-nav-bar link-nav-bar mobile-nav__list-item"
              v-if="isLoggedIn === false"
              tag="li"
            >Log in</router-link>
            <router-link
              to="/aanmelden"
              class="router-link-nav-bar link-nav-bar mobile-nav__list-item"
              v-if="isLoggedIn === false"
              tag="li"
            >Aanmelden</router-link>
            <router-link
              to="/dashboard"
              class="router-link-nav-bar link-nav-bar mobile-nav__list-item"
              v-if="isLoggedIn === true"
              tag="li"
            >Mijn Dashboard</router-link>
          </ul>
        </div>
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
              to="/aanmelden"
              class="router-link-nav-bar link-nav-bar"
              v-if="isLoggedIn === false"
              tag="span"
            >Aanmelden</router-link>
            <router-link
              to="/dashboard"
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

<style lang="scss" scoped>
$background--color: #1e2023;
$icon--color: #1e2023;
$font--color: #000000;
$font--color--active: #000000;
$font--primary: "Fira Sans", sans-serif;
$transition--length: 0.8;
$break-mobile: 768px;

.burger-container {
  margin-left: auto;
  display: flex;
  align-items: center;
  margin-right: 20px;
  @media screen and (min-width: $break-mobile) {
    display: none;
  }
}

//default state
.menu-icon {
  $size--width: 30px;
  height: 16px;
  width: $size--width;
  z-index: 2;
  cursor: pointer;
  &__line {
    height: 2px;
    width: $size--width;
    display: block;
    background-color: $font--color;
    margin-bottom: 4px;
    transition: transform 0.2s ease, background-color 0.5s ease;
  }
  // &__line-left {
  //   width: $size--width / 2;
  // }
  // &__line-right {
  //   width: $size--width / 2;
  //   float: right;
  // }
}

.mobile-nav {
  $width: 100vw;
  $height: 100vh;
  $font--size--calc: calc(2vw + 10px);
  $transition--easing: cubic-bezier(0.77, 0, 0.175, 1);
  position: fixed;
  z-index: 1;
  &:before,
  &:after {
    content: "";
    position: fixed;
    width: $width;
    height: $height;
    background: rgba(#eaeaea, 0.2);
    z-index: -1;
    transition: transform $transition--easing $transition--length + s;
    transform: translateX(0%) translateY(-100%);
  }
  &:after {
    background: rgba(#ffffff, 1);
    transition-delay: 0s;
  }
  &:before {
    transition-delay: 0.1s;
  }
  &__content {
    position: fixed;
    top: 50%;
    transform: translate(0%, -50%);
    width: 100%;
    text-align: center;
    font-size: $font--size--calc;
    font-weight: 200;
    cursor: pointer;
    @media screen and (min-width: $break-mobile) {
      display: none;
    }
  }
  &__list-item {
    position: relative;
    display: inline-block;
    transition-delay: $transition--length + s;
    opacity: 0;
    transform: translate(0%, 100%);
    transition: opacity 0.2s ease, transform 0.2s ease;
    margin-right: 25px;
    &:before {
      content: "";
      position: absolute;
      background: $font--color--active;
      width: 20px;
      height: 1px;
      top: 100%;
      transform: translate(0%, 0%);
      transition: all 0.3s ease;
      z-index: -1;
    }
    &.router-link-exact-active {
      color: #52d3aa;
    }
    &.router-link-exact-active:before {
      content: "";
      position: absolute;
      background: #52d3aa;
      width: 100%;
      height: 1px;
      top: 100%;
      transform: translate(0%, 0%);
      transition: all 0.2s ease;
      z-index: -1;
    }
    &:hover {
      &:before {
        width: 100%;
      }
    }
  }
}
@media only screen and (min-width: 1024px) {
  .menu-icon {
    visibility: hidden;
  }
}

//active state
body.mobile-nav-active {
  $menu--items--count: 2;
  .menu-icon {
    &__line {
      background-color: #000;
      transform: translateX(0px) rotate(-45deg);
    }
    &__line-left {
      transform: translateX(0px) translateY(6px) rotate(45deg);
    }
    &__line-right {
      visibility: hidden;
    }
  }
  .mobile-nav {
    visibility: visible;
    &:before,
    &:after {
      transform: translateX(0%) translateY(0%);
    }
    &:after {
      transition-delay: 0.1s;
    }
    &:before {
      transition-delay: 0s;
    }
    &__list-item {
      opacity: 1;
      transform: translateX(0%);
      transition: opacity 0.2s ease, transform 0.2s ease, color 0.2s ease;
      @for $i from 0 through $menu--items--count {
        &:nth-child(#{$i}) {
          transition-delay: $transition--length * $i / 8 + 0.5 + s;
        }
      }
    }
  }
}
</style>

<script>
// import firebase from 'firebase';

export default {
  data() {
    return {
      showingBurgerMenu: false,
      bodyEl: document.querySelector('body'),
      mobileNavEl: document.getElementById('mobileNav'),
    };
  },
  methods: {
    openFullWidthNav() {
      this.bodyEl.classList.toggle('mobile-nav-active');
      document
        .getElementById('mobileNavList')
        .classList.toggle('visibility-hidden');
    },
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
    isChangedRoute() {
      this.bodyEl.classList.remove('mobile-nav-active');
      document
        .getElementById('mobileNavList')
        .classList.add('visibility-hidden');
    },
  },
};
</script>


<style lang="scss" scoped>
.visibility-hidden {
  visibility: hidden;
}

nav {
  position: fixed;
  width: 100vw;
  border-bottom: 1px solid #ebebeb;
  height: 5rem;
  font-size: 1.2rem;
}
.navbar-menu {
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
}

.navbar-logo-container {
  img {
    max-height: 2.75rem;
  }
}

.navbar-item {
  padding: 0.5rem 1.5rem 0.5rem 1rem;
}

.navbar-brand {
  max-height: 3.25rem;
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
