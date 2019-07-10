<template>
  <div id="dashboard">
    <div class="columns">
      <div class="column is-3 side-menu">
        <div class="info-account">
          <img src="../assets/logo-icons/default-avatar.svg" class="avatar image is-48x48" />
          <h4 class="welcome-title">Welkom!</h4>
          <br />
          <h5 class="welcome-what-title">Ouder</h5>
        </div>
        <div class="menu-items">
          <div
            class="item border-left"
            @click="currentTab = 'MijnStudenten'"
            :class="currentTab === 'MijnStudenten' ? 'active-border-left' : null"
          >
            <img src="../assets/logo-icons/001-home-icon-silhouette.svg" class="image is-16x16" />
            <span class="text">Mijn Studenten</span>
          </div>
          <div
            class="item border-left"
            @click="currentTab = 'Agenda'"
            :class="currentTab === 'Agenda' ? 'active-border-left' : null"
          >
            <img src="../assets/logo-icons/003-calendar.svg" class="image is-16x16" />
            <span class="text">Agenda</span>
          </div>
          <div
            class="item border-left"
            @click="currentTab = 'SessieHistorie'"
            :class="currentTab === 'SessieHistorie' ? 'active-border-left' : null"
          >
            <img src="../assets/logo-icons/005-history-clock-button.svg" class="image is-16x16" />
            <span class="text">Sessiehistorie</span>
          </div>
          <div
            class="item border-left"
            @click="currentTab = 'AccountGegevens'"
            :class="currentTab === 'AccountGegevens' ? 'active-border-left' : null"
          >
            <img src="../assets/logo-icons/004-man-user.svg" class="image is-16x16" />
            <span class="text">Accountgegevens</span>
          </div>
          <div class="item item-logout" @click="handleLogOut()">
            <img src="../assets/logo-icons/006-logout.svg" class="image is-16x16" />
            <span class="text">Uitloggen</span>
          </div>
        </div>
      </div>
      <div class="column is-9 content-dashboard">
        <MijnStudenten v-if="currentTab === 'MijnStudenten'" />
        <Agenda v-if="currentTab === 'Agenda'" />
        <SessieHistorie v-if="currentTab === 'SessieHistorie'" />
        <AccountGegevens v-if="currentTab === 'AccountGegevens'" class="content-card" />
      </div>
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
  padding: 0rem;
}

.content-card {
  background-color: #fff;
  box-shadow: 0px 0px 30px -21px rgba(0, 0, 0, 0.75);
}
.content-dashboard {
  // background-color: #fff;
  // box-shadow: 0px 0px 30px -21px rgba(0, 0, 0, 0.75);
}

.info-account {
  padding: 1.5rem 0rem 1rem 1rem;
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
  padding-top: 1rem;
  .active-border-left {
    border-left: 5px solid #52d3aa;
  }
  .border-left:hover {
    border-left: 5px solid #52d3aa;
  }
  .item {
    cursor: pointer;
    height: 4rem;
    display: inline-flex;
    align-items: center;
    width: 100%;
    padding-left: 2rem;
    .image {
      opacity: 0.6;
      float: left;
    }
    .text {
      margin-left: 20px;
      height: 16px;
      display: inline-flex;
      font-size: 0.9rem;
      align-items: center;
    }
  }
  .item-logout {
    margin-top: 1.5rem;
  }
}
</style>

<script>
import firebase from 'firebase';
import MijnStudenten from '../components/dashboard/MijnStudenten.vue';
import Agenda from '../components/dashboard/Agenda.vue';
import SessieHistorie from '../components/dashboard/SessieHistorie.vue';
import AccountGegevens from '../components/dashboard/AccountGegevens.vue';

export default {
  data() {
    return {
      currentTab: 'MijnStudenten',
    };
  },
  components: {
    MijnStudenten,
    Agenda,
    SessieHistorie,
    AccountGegevens,
  },
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
