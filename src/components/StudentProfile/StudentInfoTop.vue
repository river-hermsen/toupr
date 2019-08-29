<template>
  <div class="student-info-top columns">
    <div class="student-image column is-4">
      <img :src="student.photoURL" alt />
    </div>
    <div class="student-info-detailed column is-8">
      <div class="columns">
        <div class="column is-7">
          <div>
            <h1 class="title is-size-2">{{student.name.fname}} {{student.name.lname}}</h1>
          </div>
          <div class="student-rating-container">
            <div class="student-rating">
              <b-icon icon="star" v-if="student.reviews.rating >= 1"></b-icon>
              <b-icon icon="star-outline" v-else></b-icon>
              <b-icon icon="star" v-if="student.reviews.rating >= 2"></b-icon>
              <b-icon icon="star-outline" v-else></b-icon>
              <b-icon icon="star" v-if="student.reviews.rating >= 3"></b-icon>
              <b-icon icon="star-outline" v-else></b-icon>
              <b-icon icon="star" v-if="student.reviews.rating >= 4"></b-icon>
              <b-icon icon="star-outline" v-else></b-icon>
              <b-icon icon="star" v-if="student.reviews.rating >= 5"></b-icon>
              <b-icon icon="star-outline" v-else></b-icon>
            </div>
            <div class="student-amount-reviews">
              (
              <span>{{/* eslint-disable */ student.reviews.reviews.length <5 ? '<5' : student.reviews.reviews.length}}</span> beoordelingen)
            </div>
          </div>
          <div class="student-member-since">
            <span>Lid sinds {{new Date(student.dateSignUp.seconds*1000).getFullYear()}}-{{new Date(student.dateSignUp.seconds*1000).getMonth()}}</span>
          </div>
        </div>
        <div class="column is-5">
          <div class="student-icons-container">
            <b-icon icon="medal"></b-icon>
            <span class="has-text-primary student-icons-text">Super Toupr</span>
            <b-tooltip
              label="Deze Toupr student is een Super Toupr omdat hij/zij erg ervaren is en consistent is in het krijgen van hoge ratings en reviews. Toupr studenten zijn onafhankelijk en deze rating helpt jou om een beter geïnformeerde keuze te kunnen maken tussen de studenten."
              type="is-light"
              position="is-bottom"
              multilined
            >
              <b-icon icon="information-outline" size="is-small"></b-icon>
            </b-tooltip>
          </div>
          <div class="student-icons-container">
            <b-icon icon="checkbox-marked-circle"></b-icon>
            <span class="student-icons-text">16 uur geboekt</span>
          </div>
          <div class="student-icons-container">
            <b-icon icon="star"></b-icon>
            <span class="student-icons-text student-icons-text-reviews">100% positieve beoordelingen</span>
            <b-tooltip
              label="Hoevaak een Toupr student een positieve review heeft ontvangen gebaseerd op alle reviews. Toupr studenten zijn onafhankelijk en deze rating helpt jou om een beter geïnformeerde keuze te kunnen maken tussen de studenten."
              type="is-light"
              position="is-bottom"
              multilined
            >
              <b-icon icon="information-outline" size="is-small"></b-icon>
            </b-tooltip>
          </div>
          <div class="student-icons-container">
            <b-icon icon="shield-check"></b-icon>
            <span class="student-icons-text">100% betrouwbaar</span>
            <b-tooltip
              label="Hoevaak de Toupr student zijn afspraken na komt en op tijd is.  Toupr studenten zijn onafhankelijk en deze rating helpt jou om een beter geïnformeerde keuze te kunnen maken tussen de studenten."
              type="is-light"
              position="is-bottom"
              multilined
            >
              <b-icon icon="information-outline" size="is-small"></b-icon>
            </b-tooltip>
          </div>
        </div>
      </div>
      <div>
        <div class="student-recommendation-by-toupr">
          <div class="student-recommendation-toupr-team">
            <span>Toupr team</span>
          </div>
          <div class="student-recommendation">
            <p>"{{student.reviews.teamRecommendation}}"</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.student-info-top {
  border-bottom: 1px solid #ebebeb;
  padding-bottom: 1.5rem;
  display: flex;
  .student-image {
    img {
      border-radius: 5px;
      width: 310px;
      object-fit: contain;
    }
  }
  .student-info-detailed {
    padding: 1.5rem;
    padding-top: 2rem;
    .student-rating-container {
      color: #ffb502;
      padding-top: 0.5rem;
      display: flex;
    }
    .student-member-since {
      span {
        font-weight: 200;
        font-size: 0.95rem;
      }
    }
    .student-icons-container {
      display: flex;
      align-items: center;
      .student-icons-text {
        margin: 0rem 0.5rem 0rem 0.5rem;
      }
      .student-icons-text-reviews {
        width: min-content;
      }
    }
    .student-recommendation-by-toupr {
      border: 1px solid #ebebeb;
      border-radius: 5px;
      margin: 2rem;
      padding: 1rem;
      display: flex;
      .student-recommendation-toupr-team {
        float: left;
        width: 35%;
        font-weight: 800;
      }
      .student-recommendation {
        font-style: italic;
      }
    }
  }
}
</style>

<script>
export default {
  props: ['student'],
};
</script>
