<template>
  <div id="home">
    <div class="header">
      <div class="header-text">
        <h1 class="header-title">
          Samen werken is
          <br class="only-show-desktop" />elkaar versterken.
        </h1>
        <h3 class="header-sub-title">
          Scholier en student samen aan de slag.
          <br class="only-show-desktop" />Allebei bezig met hun eigen werk.
          <br class="only-show-desktop" />Samen doorzetten en samen scherp blijven.
          <br class="only-show-desktop" />
        </h3>
      </div>
      <div class="columns">
        <div class="column is-11-touch is-9-tablet is-6-desktop is-5-fullhd input-header">
          <h3 class="title">Kijk of we al bij jou in de buurt zijn.</h3>
          <div class="outer columns">
            <b-field
              class="field column is-9"
              :class="{ 'is-danger': errors.has('postcode') }"
              :message="errors.first('postcode')"
              :type="{'is-danger': errors.has('postcode')}"
            >
              <b-input
                name="postcode"
                placeholder="Postcode"
                v-model.trim="postcode"
                @keyup.native.enter="handleSearch"
                v-validate="{ required: true, max: 6, min:6, regex: /[^\s]+/ }"
              ></b-input>
            </b-field>
            <b-button type="input-button is-primary column is-3" @click="handleSearch">Zoeken</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-text {
  text-align: center;
  .header-title {
    padding: 3rem 1rem 0rem 1rem;
    color: #52d3aa;
    font-weight: 500;
    font-size: 5rem;
  }
  .header-sub-title {
    margin: 2rem;
    padding-top: 2rem;
    font-size: 1.4rem;
  }
}

@media screen and (max-width: 1024px) {
  .header-text .header-title {
    font-weight: 500;
    font-size: 2.5rem;
  }
  .header-text .header-sub-title {
    font-size: 1.2rem;
  }
}

.input-header {
  box-shadow: 0 0 40px 3px rgba(0, 0, 0, 0.18);
  margin: 4rem auto;
  height: 170px;
  .title {
    color: #07265d;
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.6rem;
    padding-bottom: 0rem;
  }
  .outer {
    margin: 0rem 1rem 1rem 1rem;
  }
  .input-button {
    padding: 0px;
    margin-top: 12px;
  }
}
</style>


<script>
export default {
  data() {
    return {
      postcode: null,
    };
  },
  methods: {
    handleSearch() {
      // Check if postcode is valid
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$router.push({
            path: 'zoeken',
            query: { postcode: this.postcode },
          });
        }
      });
    },
  },
};
</script>
