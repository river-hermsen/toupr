<template>
  <div id="dashboard" class="columns">
    <div class="column is-2 is-offset-1 side-menu">
      <!-- <b-button @click="handleLogOut">Log out</b-button> -->
    </div>
    <div class="column is-6 is-offset-1 content-dashboard"></div>
  </div>
</template>

<style lang="scss" scoped>
#dashboard {
  margin-top: 2rem;
}

.side-menu {
  // height: 400px;
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.content-dashboard {
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
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
