<template>
  <div class="container-signup">
    <h3 class="title">Aanmelden</h3>
    <b-message type="is-danger" v-if="errorLogin.is">{{errorLogin.msg}}</b-message>
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
        label="Wachtwoord "
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
      <div>
        <b-field
          label="Wachtwoord bevestigen"
          :class="{ 'is-danger': errors.has('Wachtwoord bevestigen') }"
          :message="errors.first('Wachtwoord bevestigen')"
          :type="{'is-danger': errors.has('Wachtwoord bevestigen')}"
        >
          <b-input
            data-vv-name="Wachtwoord bevestigen"
            type="password"
            placeholder="Wachtwoord bevestigen"
            v-validate="{ is: password, required: true}"
            v-model="passwordConf"
          ></b-input>
        </b-field>
      </div>
    </div>
    <div class="password-button-container">
      <b-button
        type="is-primary"
        class="signup-button-container"
        :class="{ 'is-loading': isLoading }"
        @click="handleSignUp"
        ref="signUpBtn"
      >Aanmelden</b-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-signup {
  box-shadow: 0 0 40px 3px rgba(0, 0, 0, 0.05);
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
}
.title {
  font-size: 2.25rem;
}

.password-button-container {
  margin-top: 1.2rem;
  height: 30px;
}
.link-password {
  float: left;
}

.signup-button-container {
  float: right;
  width: 8rem;
}
</style>

<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      email: null,
      password: null,
      passwordConf: null,
      isLoading: false,
      errorLogin: {
        is: false,
        msg: '',
      },
    };
  },
  methods: {
    handleSignUp() {
      // Get btn from view
      const { signUpBtn } = this.$refs;

      // Make button loading
      signUpBtn.$el.classList.add('is-loading');
      signUpBtn.$el.innerHTML = '';

      this.$validator.validateAll().then((result) => {
        if (!result) {
          // Errors in input
          // Remove loading button
          signUpBtn.$el.classList.remove('is-loading');
          signUpBtn.$el.innerHTML = 'Aanmelden';
          return;
        }
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((res) => {
            // SignUp success
            console.log('Sucessfully signed up');
            // console.log(res);
            // const db = firebase.firestore();
            const { db } = this.$store.state;
            db.collection('users')
              .doc(res.user.uid)
              .set({
                email: res.user.email,
                emailVerified: res.user.emailVerified,
                phoneNumber: res.user.phoneNumber,
                photoURL: res.user.photoURL,
                creationTime: res.user.metadata.creationTime,
              })
              .then(() => {
                console.log('Document successfully written!');
              })
              .catch(() => {
                // console.error('Error writing document: ', error);
              });
          })
          .catch((error) => {
            // SignUp error
            // Remove loading button
            signUpBtn.$el.classList.remove('is-loading');
            signUpBtn.$el.innerHTML = 'Aanmelden';
            this.errorLogin = {};
            if (error.code === 'auth/email-already-in-use') {
              this.errorLogin.is = true;
              this.errorLogin.msg = 'Dat e-mail adres is al bekend bij ons.';
            } else if (error.code === 'auth/weak-password') {
              this.errorLogin.is = true;
              // eslint-disable-next-line
              this.errorLogin.msg =
                'Wachtwoord moet minsten 6 tekens bevatten.';
            } else {
              this.errorLogin.is = true;
              // eslint-disable-next-line
              this.errorLogin.msg = "Er is een onbekende fout opgetreden.";
            }
          });
      });
    },
  },
};
</script>
