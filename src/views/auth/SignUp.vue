<template>
  <div class="container">
    <div class="signup-form-container">
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
        <b-input
          type="password"
          v-model="password"
          v-validate="'required|length:5'"
          :class="{'is-danger': errors.has('password')}"
        ></b-input>
      </b-field>
      <b-field label="Confirm password">
        <b-input type="password" value="examplepass" v-model="passwordConfirm"></b-input>
      </b-field>
      <b-button type="is-primary" @click="handleSignUp">Sign Up</b-button>
    </div>
  </div>
</template>

<style>
.signup-form-container {
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
      password: null,
      passwordConfirm: null
    };
  },
  methods: {
    handleSignUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(res => {
          console.log('Created user sucess');

          console.log(res);
        })
        .catch(function(error) {
          console.log('error creating user');
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
