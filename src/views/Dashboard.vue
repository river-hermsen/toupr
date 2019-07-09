<template>
  <div id="dashboard">
    <div class="columns">
      <div class="column is-3 side-menu">
        <div>
          <img src="../assets/logo-icons/default-avatar.svg" class="avatar image is-48x48" />
          <h4 class="welcome-title">Welkom!</h4>
          <br />
          <h5 class="welcome-what-title">Ouder</h5>
        </div>
        <div class="menu-items">
          <div class="item">
            <img src="../assets/logo-icons/002-students-cap.svg" class="image is-32x32" />
            <span class="text">Mijn Studenten</span>
          </div>
        </div>
      </div>
      <div class="column is-9 content-dashboard"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#dashboard {
  max-width: 900px;
  margin: 0 auto;
  margin-top: 2rem;
}

.side-menu {
  background-color: #fff;
  margin-right: 40px;
  box-shadow: 0px 0px 30px -21px rgba(0, 0, 0, 0.75);
}

.content-dashboard {
  background-color: #fff;
  box-shadow: 0px 0px 30px -21px rgba(0, 0, 0, 0.75);
}

.avatar {
  float: left;
  margin-left: 1rem;
}

.welcome-title {
  font-size: 0.9rem;
  display: inline;
  padding: 1.3rem;
}

.welcome-what-title {
  font-size: 0.8rem;
  padding: 1.3rem;
  display: inline;
}

.menu-items {
  margin: 1rem;
  padding-top: 1rem;
  .item {
    .image {
      opacity: 0.6;
      float: left;
    }
    .text {
      margin-left: 20px;
      height: 32px;
      display: inline-flex;
      font-size: 0.9rem;
      align-items: center;
    }
  }
}
</style>

<script>
import firebase from 'firebase';

export default {
  methods: {
    handleLogOut() {
      firebase
        .auth()
        .signOut()
        .then((res) => {
          // Sign-out successful.
          console.log(res);
          this.$store.commit('changeLoginState', false);
          this.$router.push('/');
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        });
    },
  },
};
</script>
