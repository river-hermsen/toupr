<template>
  <div class="container-login">
    <h3 class="title">Inloggen</h3>
    <b-message type="is-danger" v-if="errorLogin.is">{{errorLogin.msg}}</b-message>
    <div>
      <b-button @click="handleGoogleLogin()" class="google-login-btn">
        <img src="../../assets/logo-icons/google-logo.png" class="google-login-img" />Login met Google
      </b-button>
    </div>
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
        label="Wachtwoord"
        :class="{ 'is-danger': errors.has('Wachtwoord') }"
        :message="errors.first('Wachtwoord')"
        :type="{'is-danger': errors.has('Wachtwoord')}"
      >
        <b-input
          data-vv-name="Wachtwoord"
          type="password"
          placeholder="Wachtwoord"
          v-validate="'required'"
          v-model="password"
        ></b-input>
      </b-field>
    </div>
    <div class="password-button-container">
      <router-link to="/wachtwoordvergeten" class="link-password">Wachtwoord vergeten?</router-link>
      <b-button
        type="is-primary"
        class="login-button-container"
        @click="handleLogin"
        ref="loginBtn"
      >Login</b-button>
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
.title {
  font-size: 2.25rem;
}

.message {
  font-size: 0.9rem;
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
  width: 6rem;
}
.google-login-btn {
  margin-bottom: 1.2rem;
  :first-child {
    display: flex;
    align-items: center;
  }
  .google-login-img {
    width: 1.6rem;
    margin-left: -0.2rem;
    margin-right: 0.2rem;
  }
}
</style>

<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      email: null,
      password: null,
      isLoading: false,
      errorLogin: {
        is: false,
        msg: '',
      },
    };
  },
  methods: {
    handleLogin() {
      // Get button from $refs
      const { loginBtn } = this.$refs;

      // Make button loading
      loginBtn.$el.classList.add('is-loading');
      loginBtn.$el.innerHTML = '';

      // Check for errors in input
      this.$validator
        .validateAll()
        .then((result) => {
          if (!result) {
            // If there are errors in input
            // Remove loading button
            loginBtn.$el.classList.remove('is-loading');
            loginBtn.$el.innerHTML = 'Login';
            return;
          }
          // Login with input cred
          firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then(() => {
              // Login success
              this.$router.push('/');
            })
            .catch((error) => {
              // Login error
              // Remove loading button
              loginBtn.$el.classList.remove('is-loading');
              loginBtn.$el.innerHTML = 'Login';
              if (error.code === 'auth/user-not-found') {
                this.errorLogin = {};
                this.errorLogin.is = true;
                // eslint-disable-next-line
                this.errorLogin.msg =
                  'Er is geen account met dat e-mail adres bij ons bekent';
              } else if (error.code === 'auth/wrong-password') {
                this.errorLogin = {};
                this.errorLogin.is = true;
                // eslint-disable-next-line
                this.errorLogin.msg = "Het wachtwoord is verkeerd.";
              } else {
                this.errorLogin = {};
                this.errorLogin.is = true;
                // eslint-disable-next-line
                this.errorLogin.msg = "Er is een onbekende fout opgetreden.";
              }
              console.log(error.code);
            });
        })
        .catch(() => {
          // Failed
        });
    },
    handleGoogleLogin() {
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = result.credential.accessToken;
          // The signed-in user info.
          const { user } = result;
          console.log('sucess');
          this.$router.push('/');
          console.log(user);
        })
        .catch((error) => {
          // Handle Errors here.
          console.log('fail');
          console.log(error);

          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const { email } = error;
          // The firebase.auth.AuthCredential type that was used.
          const { credential } = error;
          // ...
        });
    },
  },
};
</script>
