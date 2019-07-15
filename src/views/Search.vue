<template>
  <div class="search-content">
    <div class="columns">
      <div class="side-content column is-3">
        <div class="weekly-card">
          <div class="weekly-card-header">
            <span>Wekelijks</span>
            <img src="../assets/logo-icons/info.svg" />
          </div>
          <div class="weekly-card-content">
            <div class="ticks-container">
              <img src="../assets/logo-icons/tick.png" />
              <span>Telkens dezelfde student.</span>
            </div>
            <div class="ticks-container">
              <img src="../assets/logo-icons/tick.png" />
              <span>Altijd opzegbaar.</span>
            </div>
            <div class="ticks-container">
              <img src="../assets/logo-icons/tick.png" />
              <span>Geen gedoe.</span>
            </div>
          </div>
        </div>
        <div class="call-more-info">
          <p>
            <b>Meer informatie nodig?</b>
            Laat je telefoonnummer achter en we bellen je binnen een dag terug!
          </p>
          <b-input class="call-input" v-model="phoneNumber" placeholder="Telefoonnummer"></b-input>
          <b-button class="call-submit-btn" @click="submitCallMoreInfo">Bel mij terug</b-button>
        </div>
      </div>
      <div class="main-content"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-content {
  max-width: 1200px;
  margin: 2rem auto;
}

.weekly-card {
  border: 1px solid #ebebeb;
  border-radius: 5px;
  .weekly-card-header {
    background-color: #52d3aa;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    color: #fff;
    padding: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 500;
    img {
      width: 1.3rem;
    }
  }
  .weekly-card-content {
    background-color: #fff;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    .ticks-container {
      padding: 0.8rem;
      display: flex;
      align-items: center;
      img {
        width: 1.6rem;
      }
      span {
        font-size: 0.9rem;
        margin-left: 1rem;
      }
    }
    .ticks-container:first-child {
      padding-top: 1.2rem;
    }
  }
}

.call-more-info {
  background-color: #fff;
  padding: 0.8rem;
  margin-top: 1.6rem;
  border: 1px solid #ebebeb;
  border-radius: 5px;
  .call-input {
    margin-top: 0.8rem;
    margin-bottom: 0.8rem;
  }
  .call-submit-btn {
    background-color: #ff6c5c;
    color: white;
    width: 100%;
  }
}
</style>

<script>
export default {
  data() {
    return {
      phoneNumber: null,
    };
  },
  methods: {
    submitCallMoreInfo() {},
  },
};
</script>
