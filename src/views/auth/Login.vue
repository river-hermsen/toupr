<template>
  <div class="container">
    <div class="login-form-container">
      <b-field label="Email">
        <b-input
          type="email"
          v-model="email"
          v-validate="'required|email'"
          placeholder="Enter email"
          :class="{ 'is-danger': errors.has('email') }"
        ></b-input>
      </b-field>

      <b-field label="Password">
        <b-input type="password" value="examplepass" v-model="password"></b-input>
      </b-field>
      <b-button type="is-primary" v-on:click="handleLogin">Login</b-button>
    </div>
  </div>
</template>

<style>
.login-form-container {
  max-width: 800px;
  margin: 0 auto;
  margin-top: 2rem;
}
</style>


<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    handleLogin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(res => {
          console.log('Logged in user sucess');

          console.log(res);
        })
        .catch(function(error) {
          console.log('error logging in');
          console.log(error);

          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
    }
  }
};
</script>
