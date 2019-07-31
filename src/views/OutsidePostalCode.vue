<template>
  <div class="container">
    <div class="header">
      <h4 class="is-size-4">Helaas zijn we nog niet actief in jouw buurt.</h4>
      <p>Laat je gegevens achter en wij zullen zo snel mogelijk contact opnemen zodra er studenten bij jou in de buurt zijn.</p>
    </div>
    <div class="content columns is-multiline">
      <b-field
        label="Email"
        class="column is-9"
        :class="{ 'is-danger': errors.has('Email') }"
        :message="errors.first('Email')"
        :type="{'is-danger': errors.has('Email')}"
      >
        <b-input
          v-model="email"
          name="email"
          data-vv-name="Email"
          type="text"
          placeholder="example@example.com"
          v-validate="'required|email'"
        ></b-input>
      </b-field>
      <b-field
        label="Postcode"
        class="column is-3"
        :class="{ 'is-danger': errors.has('Postcode') }"
        :message="errors.first('Postcode')"
        :type="{'is-danger': errors.has('Postcode')}"
      >
        <b-input
          v-model="postalcode"
          data-vv-name="Postcode"
          name="postcode"
          type="text"
          placeholder="1015TM"
          v-validate="'required|max:6|min:6'"
        ></b-input>
      </b-field>
      <div class="column is-3 is-offset-9">
        <b-button type="is-primary" @click="submitForm" ref="submitBtn">Versturen</b-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  background-color: #fff;
  max-width: 830px;
  box-shadow: 0 0 40px 3px rgba(0, 0, 0, 0.05);
  margin-top: 2rem;
  padding: 2rem;
  .header {
    h4 {
      color: #000;
    }
    p {
      font-weight: 300;
    }
  }
  .content {
    margin-top: 1rem;
    button {
      width: 100%;
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
      email: '',
      postalcode: this.$route.query.postcode ? this.$route.query.postcode : '',
    };
  },
  methods: {
    submitForm() {
      // Get button from $refs
      const { submitBtn } = this.$refs;

      // Make button loading
      submitBtn.$el.classList.add('is-loading');
      submitBtn.$el.innerHTML = '';

      // Check if form is valid
      this.$validator.validateAll().then((result) => {
        if (!result) {
          // If there are errors in input
          // Remove loading button
          submitBtn.$el.classList.remove('is-loading');
          submitBtn.$el.innerHTML = 'Versturen';
          return;
        }
        // Set entry in notActiveNeighborhood
        const { db } = this.$store.state;
        db.collection('notActiveNeighborhood')
          .doc()
          .set({
            email: this.email,
            postcode: this.postalcode,
          })
          .then(() => {
            this.$toast.open({
              duration: 6000,
              message:
                'Dankjewel! We zullen zo snel mogelijk contact met u opnemen zodra we in uw buurt actief zijn.',
              type: 'is-success',
            });
            this.$router.push({
              path: '/',
              query: { postcode: this.postcode },
            });
          })
          .catch(() => {
            this.$toast.open({
              message: 'Er is iets fout gegaan. Probeer het opnieuw.',
              type: 'is-danger',
            });
          });
      });
    },
  },
};
</script>
