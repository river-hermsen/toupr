<template>
  <div class="container">
    <div class="header">
      <h1 class="title is-size-2">Hoi{{fNaamComp ? ', ' + fNaamComp : ''}}</h1>
    </div>
    <div>
      <div class="tabs">
        <ul>
          <li @click="activeTab=0" v-bind:class="{ 'is-active': activeTab===0 ? true : false }">
            <a>
              <b-icon icon="book"></b-icon>
              <span>Mijn Studenten</span>
            </a>
          </li>
          <li @click="activeTab=1" v-bind:class="{ 'is-active': activeTab===1 ? true : false }">
            <a>
              <b-icon icon="calendar-month-outline"></b-icon>
              <span>Agenda</span>
            </a>
          </li>
          <li @click="activeTab=2" v-bind:class="{ 'is-active': activeTab===2 ? true : false }">
            <a>
              <b-icon icon="history"></b-icon>
              <span>Sessiehistorie</span>
            </a>
          </li>
          <li @click="activeTab=3" v-bind:class="{ 'is-active': activeTab===3 ? true : false }">
            <a>
              <b-icon icon="account"></b-icon>
              <span>Accountgegevens</span>
            </a>
          </li>
          <li class="log-out" @click="handleLogOut()">
            <a>
              <b-icon icon="exit-to-app"></b-icon>
              <span>Uitloggen</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="content-tabs">
        <MijnStudenten v-if="activeTab===0" />
        <Agenda v-if="activeTab===1" />
        <SessieHistorie v-if="activeTab===2" />
        <AccountGegevens v-if="activeTab===3" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  max-width: 900px;
  margin-top: 30px;
}
.title {
  margin-bottom: 1.2rem;
  padding: 0.5rem 1rem;
}
.tabs {
  width: 100%;
  li.is-active a {
    border-bottom-color: #52d3aa;
    color: #52d3aa;
  }
}
.content-tabs {
  padding: 0.5rem 1rem;
}
.log-out {
  margin-left: auto;
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
      activeTab: 0,
      fNaam: this.$store.state.userInfo.fNaam,
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
      this.$destroy();
      firebase
        .auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          this.$store.commit('changeLoginState', false);
          this.$router.push('/');
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        });
    },
  },
  computed: {
    fNaamComp() {
      return this.$store.state.userInfo.fNaam;
    },
  },
};
</script>
