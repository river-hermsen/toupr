<template>
  <div class="account-container">
    <b-loading :is-full-page="false" :active.sync="isLoading"></b-loading>
    <div class="header-container">
      <h1 class="header-title">Accountgegevens</h1>
      <h3 class="header-sub-title">Op deze pagina kun je je gegevens wijzigen.</h3>
    </div>
    <div class="account-content">
      <div class="columns is-multiline inputs-container">
        <b-field label="Voornaam" class="column is-6">
          <b-input v-model="fNaam"></b-input>
        </b-field>
        <b-field label="Achternaam" class="column is-6">
          <b-input v-model="lNaam"></b-input>
        </b-field>
        <b-field label="Email" class="column is-6">
          <b-input v-model="email"></b-input>
        </b-field>
        <b-field label="Telefoonnummer" class="column is-6">
          <b-input v-model="phoneNumber"></b-input>
        </b-field>
      </div>
      <hr />
      <span class="section-info-text">Gegevens scholier:</span>
      <div class="columns inputs-container">
        <b-field label="Leeftijd" class="column is-3">
          <div class="age-input-container">
            <b-input v-model="scholier.leeftijd" class="age-input"></b-input>
            <span class="text-age">Jaar</span>
          </div>
        </b-field>
        <b-field label="Schoolniveau scholier" class="column is-9">
          <b-select placeholder="Schoolniveau" expanded v-model="scholier.niveau">
            <option>VMBO-T</option>
            <option>HAVO</option>
            <option>HAVO/VWO</option>
            <option>VWO</option>
            <option>GYMNASIUM</option>
            <option>OVERIG</option>
          </b-select>
        </b-field>
      </div>
      <hr />
      <span class="section-info-text">Adresgegevens:</span>
      <div class="columns is-multiline inputs-container">
        <b-field label="Adres" class="column is-6">
          <b-input v-model="adresInfo.adres"></b-input>
        </b-field>
        <b-field label="Postcode" class="column is-6">
          <b-input v-model="adresInfo.postcode"></b-input>
        </b-field>
        <b-field label="Plaats" class="column is-12">
          <b-input v-model="adresInfo.plaats"></b-input>
        </b-field>
      </div>
      <div class="save-changes-btn-container">
        <b-button
          type="is-primary"
          class="save-changes-btn"
          @click="saveChanges"
        >Wijzigingen opslaan</b-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.account-container {
  position: relative;
}

.loading-overlay {
  z-index: 99;
}

.header-title {
  font-size: 2rem;
}

.header-sub-title {
  font-size: 1.1rem;
}

.account-content {
  margin-top: 0.8rem;
}

.section-info-text {
  font-weight: 500;
}

.inputs-container {
  margin-top: 0.5rem;
}

.age-input {
  width: 2.5rem;
  display: inline-block;
}

.age-input-container {
  display: inline-flex;
  align-items: center;
  height: 2rem;
  .text-age {
    margin-left: 0.8rem;
  }
}

.save-changes-btn {
  float: right;
}

.save-changes-btn-container {
  margin-bottom: 3rem;
}
</style>

<script>
export default {
  data() {
    return {
      uid: this.$store.state.userData.uid,
      fNaam: null,
      lNaam: null,
      email: null,
      phoneNumber: null,
      scholier: {
        leeftijd: null,
        niveau: null,
      },
      adresInfo: {
        adres: null,
        postcode: null,
        plaats: null,
      },
      isLoading: true,
    };
  },
  created() {
    const { db } = this.$store.state;
    const docRef = db.collection('users').doc(this.uid);
    docRef.get().then((doc) => {
      console.log('Got user data');
      const userData = doc.data();
      this.fNaam = userData.fNaam;
      this.lNaam = userData.lNaam;
      this.email = userData.email;
      this.phoneNumber = userData.phoneNumber;
      this.scholier = userData.scholier;
      this.adresInfo = userData.adresInfo;
      this.isLoading = false;
    });
  },
  methods: {
    saveChanges() {
      this.isLoading = true;
      const { db } = this.$store.state;
      db.collection('users')
        .doc(this.uid)
        .update({
          fNaam: this.fNaam,
          lNaam: this.lNaam,
          email: this.email,
          phoneNumber: this.phoneNumber,
          scholier: this.scholier,
          adresInfo: this.adresInfo,
        })
        .then(() => {
          this.isLoading = false;
          this.$toast.open({
            message: 'Veranderingen opgeslagen!',
            type: 'is-success',
          });
          console.log('Document successfully written!');
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    },
  },
};
</script>
