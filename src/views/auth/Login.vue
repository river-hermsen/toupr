<template>
  <div class="container-login">
    <div>
      <b-field
        label="Email"
        :class="{ 'is-danger': errors.has('Email') }"
        :message="errors.first('Email')"
        :type="{'is-danger': errors.has('Email')}"
      >
        <b-input
          data-vv-name="Email"
          type="email"
          placeholder="Email"
          v-validate="'required|email'"
          v-model="email"
        ></b-input>
      </b-field>
    </div>
    <div>
      <b-field
        label="Password"
        :class="{ 'is-danger': errors.has('Wachtwoord') }"
        :message="errors.first('Wachtwoord')"
        :type="{'is-danger': errors.has('Wachtwoord')}"
      >
        <b-input
          data-vv-name="Wachtwoord"
          type="password"
          placeholder="Password"
          v-validate="'required'"
          v-model="password"
        ></b-input>
      </b-field>
    </div>
    <div class="password-button-container">
      <router-link to="/wachtwoordvergeten" class="link-password">Wachtwoord vergeten?</router-link>
      <b-button type="is-primary" class="login-button-container" @click="handleLogin">Login</b-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-login {
  box-shadow: 0 0 40px 3px rgba(0, 0, 0, 0.05);
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
}
.password-button-container {
  margin-top: 1.2rem;
  height: 30px;
}
.link-password {
  float: left;
}

.login-button-container {
  float: right;
}
</style>

<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    handleLogin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((res) => {
          this.$router.push('/');
          console.log(res);
        })
        .catch((error) => {
          console.log(error);

          // Handle Errors here.
          // let errorCode = error.code;
          // let errorMessage = error.message;
          // ...
        });
    },
  },
};
</script>
