<template>
  <div id="studentProfile" class="columns" v-if="!isLoading">
    <div class="column is-9">
      <div class="student-info">
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
                  <span
                    class="student-icons-text student-icons-text-reviews"
                  >100% positieve beoordelingen</span>
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
        <div class="student-info-middle">
          <div class="columns">
            <div class="column is-4 is-12-mobile">
              <div class="columns is-multiline">
                <div class="column is-12 is-6-mobile">
                  <div class="student-perks-container">
                    <div class="student-perks-header">
                      <h4>Geverifieerde student</h4>
                    </div>
                    <div>
                      <div class="student-perk">
                        <b-icon
                          icon="check"
                          v-if="student.verified.perks.vog"
                          class="has-text-primary"
                        ></b-icon>
                        <b-icon icon="minus" class="has-text-danger" v-else></b-icon>
                        <span class="student-perk-text">VOG</span>
                      </div>
                      <div class="student-perk">
                        <b-icon
                          icon="check"
                          v-if="student.verified.perks.offlineId"
                          class="has-text-primary"
                        ></b-icon>
                        <b-icon icon="minus" class="has-text-danger" v-else></b-icon>
                        <span class="student-perk-text">Offline ID</span>
                      </div>
                      <div class="student-perk">
                        <b-icon
                          icon="check"
                          v-if="student.verified.perks.bankingData"
                          class="has-text-primary"
                        ></b-icon>
                        <b-icon icon="minus" class="has-text-danger" v-else></b-icon>
                        <span class="student-perk-text">Bank Gegevens</span>
                      </div>
                      <div class="student-perk">
                        <b-icon
                          icon="check"
                          v-if="student.verified.perks.bankingData"
                          class="has-text-primary"
                        ></b-icon>
                        <b-icon icon="minus" class="has-text-danger" v-else></b-icon>
                        <span class="student-perk-text">{{student.studentInfo.studyInfo.level}}</span>
                      </div>
                      <div class="student-perk">
                        <b-icon
                          icon="check"
                          v-if="student.verified.perks.socialMedia"
                          class="has-text-primary"
                        ></b-icon>
                        <b-icon icon="minus" class="has-text-danger" v-else></b-icon>
                        <span class="student-perk-text">Sociale Media</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="column is-12 is-6-mobile">
                  <div class="student-perks-container">
                    <div class="student-perks-header">
                      <h4>Reactietijd</h4>
                    </div>
                    <div>Binnen één dag</div>
                  </div>
                </div>
                <div class="column is-12">
                  <div class="student-perks-container">
                    <div class="student-perks-header">
                      <h4>Beschikbaarheid</h4>
                    </div>
                    <div class="student-perks-availability-container">
                      <div>
                        <div
                          :class="{ 'has-text-grey	': !student.availability.thisWeek.monday.firstSession && !student.availability.thisWeek.monday.secondSession }"
                        >
                          <span class="student-perks-availability-days">Maandag</span>
                          <span class="student-perks-availability-time">
                            <span
                              v-if="student.availability.thisWeek.monday.firstSession && student.availability.thisWeek.monday.secondSession"
                            >16:00 - 20:30</span>
                            <span
                              v-else-if="student.availability.thisWeek.monday.firstSession"
                            >16:00 - 18:00</span>
                            <span
                              v-else-if="student.availability.thisWeek.monday.secondSession"
                            >16:00 - 18:00</span>
                            <span v-else>-</span>
                          </span>
                        </div>
                        <div
                          :class="{ 'has-text-grey': !student.availability.thisWeek.tuesday.firstSession && !student.availability.thisWeek.tuesday.secondSession }"
                        >
                          <span class="student-perks-availability-days">Dinsdag</span>
                          <span class="student-perks-availability-time">
                            <span
                              v-if="student.availability.thisWeek.tuesday.firstSession && student.availability.thisWeek.tuesday.secondSession"
                            >16:00 - 20:30</span>
                            <span
                              v-else-if="student.availability.thisWeek.tuesday.firstSession"
                            >16:00 - 18:00</span>
                            <span
                              v-else-if="student.availability.thisWeek.tuesday.secondSession"
                            >16:00 - 18:00</span>
                            <span v-else>-</span>
                          </span>
                        </div>
                        <div
                          :class="{ 'has-text-grey': !student.availability.thisWeek.wednesday.firstSession && !student.availability.thisWeek.wednesday.secondSession }"
                        >
                          <span class="student-perks-availability-days">Woensdag</span>
                          <span class="student-perks-availability-time">
                            <span
                              v-if="student.availability.thisWeek.wednesday.firstSession && student.availability.thisWeek.wednesday.secondSession"
                            >16:00 - 20:30</span>
                            <span
                              v-else-if="student.availability.thisWeek.wednesday.firstSession"
                            >16:00 - 18:00</span>
                            <span
                              v-else-if="student.availability.thisWeek.wednesday.secondSession"
                            >16:00 - 18:00</span>
                            <span v-else>-</span>
                          </span>
                        </div>
                        <div
                          :class="{ 'has-text-grey': !student.availability.thisWeek.thursday.firstSession && !student.availability.thisWeek.thursday.secondSession }"
                        >
                          <span class="student-perks-availability-days">Donderdag</span>
                          <span class="student-perks-availability-time">
                            <span
                              v-if="student.availability.thisWeek.thursday.firstSession && student.availability.thisWeek.thursday.secondSession"
                            >16:00 - 20:30</span>
                            <span
                              v-else-if="student.availability.thisWeek.thursday.firstSession"
                            >16:00 - 18:00</span>
                            <span
                              v-else-if="student.availability.thisWeek.thursday.secondSession"
                            >16:00 - 18:00</span>
                            <span v-else>-</span>
                          </span>
                        </div>
                        <div
                          :class="{ 'has-text-grey': !student.availability.thisWeek.friday.firstSession && !student.availability.thisWeek.friday.secondSession }"
                        >
                          <span class="student-perks-availability-days">Vrijdag</span>
                          <span class="student-perks-availability-time">
                            <span
                              v-if="student.availability.thisWeek.friday.firstSession && student.availability.thisWeek.friday.secondSession"
                            >16:00 - 20:30</span>
                            <span
                              v-else-if="student.availability.thisWeek.friday.firstSession"
                            >16:00 - 18:00</span>
                            <span
                              v-else-if="student.availability.thisWeek.friday.secondSession"
                            >16:00 - 18:00</span>
                            <span v-else>-</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-8">
              <div>
                <h2>Aanpak</h2>
              </div>
            </div>
          </div>
        </div>
        <div class="student-info-bottom"></div>
      </div>
    </div>
    <div class="column is-3">
      <div class="book-student"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#studentProfile {
  max-width: 1250px;
  margin: 2rem auto;
}
.student-info {
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
  .student-info-middle {
    margin-top: 2.5rem;
    .student-perks-container {
      .student-perks-header {
        width: fit-content;
        min-width: 15rem;
        padding-bottom: 0.2rem;
        border-bottom: 1px solid #ebebeb;
        margin-bottom: 0.4rem;
        h4 {
          font-weight: 500;
        }
      }
      .student-perk {
        display: flex;
        align-items: center;
        .student-perk-text {
          margin-left: 0.4rem;
        }
      }
      .student-perks-availability-container {
        width: 15rem;
        .student-perks-availability-time {
          float: right;
        }
      }
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      isLoading: true,
      student: {},
    };
  },
  beforeCreate() {
    console.log(this.$route.params.id);

    const { db } = this.$store.state;
    db.collection('students')
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        this.student = doc.data();
        this.isLoading = false;
        console.log(doc.data());
        console.log(this.student.availability.thisWeek.monday.firstSesion);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
