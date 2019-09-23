<template>
  <div id="completeProfileContainer">
    <div class="header-container">
      <h1 class="is-size-1 title">Je profiel invullen</h1>
      <h3
        class="is-size-5 subtitle"
      >Je moet eerst je profiel volledig invullen voordat je een student kan boeken.</h3>
    </div>
    <div>
      <div class="steps-container">
        <b-steps type="is-success" :has-navigation="false" :clickable="true" v-model="stepIndex">
          <b-step-item label="Naam & Adres" icon="home">
            <div class="columns is-multiline step-content">
              <div class="column is-12 step-header-divider">
                <h3 class="is-size-5 title">Naam</h3>
              </div>
              <div class="column is-4">
                <b-field label="Voornaam">
                  <b-input v-model="userInfo.fNaam" placeholder="Je voornaam"></b-input>
                </b-field>
              </div>
              <div class="column is-8">
                <b-field label="Achternaam">
                  <b-input v-model="userInfo.lNaam" placeholder="Je achternaam"></b-input>
                </b-field>
              </div>
              <div class="divider"></div>
              <div class="column is-12 step-header-divider">
                <h3 class="is-size-5 title">Adres</h3>
              </div>
              <div class="column is-6">
                <b-field label="Adres">
                  <b-input v-model="userInfo.adresInfo.adres" placeholder="Keizersgracht 101"></b-input>
                </b-field>
              </div>
              <div class="column is-3">
                <b-field label="Plaats">
                  <b-input v-model="userInfo.adresInfo.plaats" placeholder="Amsterdam"></b-input>
                </b-field>
              </div>
              <div class="column is-3">
                <b-field label="Postcode">
                  <b-input v-model="userInfo.adresInfo.postcode" placeholder="1010LM"></b-input>
                </b-field>
              </div>
              <div class="column is-2 is-offset-10">
                <b-button
                  type="is-primary"
                  class="step-continue-btn"
                  @click="stepContinue()"
                >Volgende</b-button>
              </div>
            </div>
          </b-step-item>
          <b-step-item label="Scholier" icon="school">
            <div class="columns is-multiline step-content">
              <div class="column is-12 step-header-divider">
                <h3 class="is-size-5 title">Scholier</h3>
              </div>
              <div class="column is-4">
                <b-field label="Voornaam scholier">
                  <b-input v-model="userInfo.scholier.fNaam" placeholder="Voornaam scholier"></b-input>
                </b-field>
              </div>
              <div class="column is-8">
                <b-field label="Achternaam scholier">
                  <b-input v-model="userInfo.scholier.lNaam" placeholder="Achternaam scholier"></b-input>
                </b-field>
              </div>
              <b-field label="Schoolniveau scholier" class="column is-9">
                <b-select placeholder="Schoolniveau" expanded v-model="userInfo.scholier.niveau">
                  <option>VMBO-T</option>
                  <option>HAVO</option>
                  <option>HAVO/VWO</option>
                  <option>VWO</option>
                  <option>GYMNASIUM</option>
                  <option>OVERIG</option>
                </b-select>
              </b-field>
              <b-field label="Leeftijd scholier" class="column is-3">
                <b-input class="age-input" v-model="userInfo.scholier.leeftijd" placeholder="XX"></b-input>
              </b-field>

              <div class="column is-2">
                <b-button type="is-primary" class="step-continue-btn" @click="stepBack()">Vorige</b-button>
              </div>
              <div class="column is-2 is-offset-8">
                <b-button
                  type="is-primary"
                  class="step-continue-btn"
                  @click="stepContinue()"
                >Volgende</b-button>
              </div>
            </div>
          </b-step-item>
          <b-step-item label="Contact" icon="cellphone-android">
            <div class="columns is-multiline step-content">
              <div class="column is-12 step-header-divider">
                <h3 class="is-size-5 title">Contact info</h3>
              </div>
              <div class="column is-12">
                <b-field label="Email">
                  <b-input v-model="userInfo.email" placeholder="voorbeeld@gmail.com"></b-input>
                </b-field>
              </div>
              <div class="column is-12">
                <b-field label="Telfoonnummer">
                  <b-input v-model="userInfo.phoneNumber" placeholder="06 12345678"></b-input>
                </b-field>
              </div>
              <div class="column is-2">
                <b-button type="is-primary" class="step-continue-btn" @click="stepBack()">Vorige</b-button>
              </div>
              <div class="column is-2 is-offset-8">
                <b-button
                  type="is-primary"
                  class="step-continue-btn"
                  @click="finishSteps()"
                >Voltooien</b-button>
              </div>
            </div>
          </b-step-item>
        </b-steps>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#completeProfileContainer {
  max-width: 1000px;
  margin: 2rem auto;
  .header-container {
    text-align: center;
    padding-bottom: 1.5rem;
  }
  .steps-container {
    margin-top: 2rem;
  }
  .step-content {
    max-width: 800px;
    margin: 2rem auto;
    .step-header-divider {
      padding-bottom: 0px;
    }
    .step-continue-btn {
      width: 100%;
    }
  }
}
.divider {
  width: 95%;
  margin: 1.25rem auto;
  border-bottom: 1px solid #ebebeb;
}
</style>

<script>
export default {
  data() {
    return {
      stepIndex: 0,
      userInfo: {
        fNaam: '',
        lNaam: '',
        email: '',
        phoneNumber: '',
        adresInfo: {
          adres: '',
          plaats: '',
          postcode: '',
        },
        scholier: {
          fNaam: '',
          lNaam: '',
          leeftijd: '',
          niveau: '',
        },
      },
    };
  },
  beforeMount() {
    // Quick fix to make vue data non reactive and only store data in Vuex when needed.
    const store = this.$store;
    this.userInfo = JSON.parse(JSON.stringify(store.getters.getUserInfo));
    console.log(this.userInfo);
    if (!this.userInfo.adresInfo) {
      this.userInfo.adresInfo = {
        adres: '',
        postcode: '',
        plaats: '',
      };
    }
    if (!this.userInfo.scholier) {
      this.userInfo.scholier = {
        leeftijd: '',
        niveau: '',
      };
    }
    this.isLoading = false;
  },
  methods: {
    stepContinue() {
      this.stepIndex = this.stepIndex + 1;
    },
    stepBack() {
      this.stepIndex = this.stepIndex - 1;
    },
    finishSteps() {
      this.isLoading = true;
      const { db } = this.$store.state;
      db.collection('users')
        .doc(this.uid)
        .update({
          fNaam: this.userInfo.fNaam,
          lNaam: this.userInfo.lNaam,
          email: this.userInfo.email,
          phoneNumber: this.userInfo.phoneNumber,
          scholier: this.userInfo.scholier,
          adresInfo: this.userInfo.adresInfo,
        })
        .then(() => {
          // Quick fix to make vue data non reactive
          this.$store.commit('addUserInfo', this.userInfo);
        })
        .then(() => {
          this.isLoading = false;
          this.$toast.open({
            message:
              'Je profiel is successvol geüpdate, je kan nu een student boeken!',
            type: 'is-success',
          });
          this.$router.go(-1);
        })
        .catch((error) => {
          this.$toast.open({
            message: 'Er is iets fout gegaan probeer het opnieuw.',
            type: 'is-danger',
          });
        });
    },
  },
};
</script>
