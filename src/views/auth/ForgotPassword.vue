<template>
  <div class="container-pwd-forgot">
    <h3 class="title">Wachtwoord vergeten</h3>
    <h5
      class="subtitle is-size-6"
    >We versturen een email naar je email adres met een link om je wachtwoord te resetten.</h5>
    <b-message type="is-danger" v-if="errorPwdReset.is">{{errorPwdReset.msg}}</b-message>
    <div>
      <b-field
        label="Email"
        :class="{ 'is-danger': errors.has('Email') }"
        :message="errors.first('Email')"
        :type="{'is-danger': errors.has('Email')}"
      >
        <b-input
          data-vv-name="Email"
          name="email"
          type="email"
          placeholder="Email"
          v-validate="'required|email'"
          v-model="email"
        ></b-input>
      </b-field>
    </div>
    <div class="password-button-container">
      <b-button
        type="is-primary"
        class="login-button-container"
        @click="handleForgotPassword"
        ref="resetBtn"
      >Wachtwoord resetten</b-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-pwd-forgot {
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
  width: 12rem;
}
</style>

<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      email: null,
      isLoading: false,
      errorPwdReset: {
        is: false,
        msg: '',
      },
    };
  },
  methods: {
    handleForgotPassword() {
      // Get button from $refs
      const { resetBtn } = this.$refs;
      // Make button loading
      resetBtn.$el.classList.add('is-loading');
      resetBtn.$el.innerHTML = '';
      this.$validator.validateAll().then((result) => {
        if (!result) {
          // If there are errors in input
          // Remove loading button
          resetBtn.$el.classList.remove('is-loading');
          resetBtn.$el.innerHTML = 'Wachtwoord resetten';
          return;
        }
        // Send reset pwd email
        firebase
          .auth()
          .sendPasswordResetEmail(this.email)
          .then(() => {
            // Password reset email sent.
            resetBtn.$el.classList.remove('is-loading');
            resetBtn.$el.innerHTML = 'Wachtwoord resetten';
            this.$toast.open({
              duration: 7000,
              message: `Er is een email verstuur naar ${this.email} om je wachtwoord te resetten.`,
              type: 'is-success',
            });
            this.$router.push('/login');
          })
          .catch((error) => {
            // Pwd reset error
            // Remove loading button
            resetBtn.$el.classList.remove('is-loading');
            resetBtn.$el.innerHTML = 'Wachtwoord resetten';
            if (error.code === 'auth/user-not-found') {
              this.errorPwdReset = {};
              this.errorPwdReset.is = true;
              // eslint-disable-next-line
              this.errorPwdReset.msg =
                'Er is geen account met dat e-mail adres bij ons bekent';
            } else {
              this.errorPwdReset = {};
              this.errorPwdReset.is = true;
              // eslint-disable-next-line
              this.errorPwdReset.msg = "Er is een onbekende fout opgetreden.";
            }
            console.log(error);
          });
      });
    },
  },
};
</script>
