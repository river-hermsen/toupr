<template>
  <div class="search-content">
    <b-modal :active.sync="isInfoModalActive">
      <div class="modal-content">
        <div>
          <h2>Voorwaarden herhaalboekingen.</h2>
        </div>
        <div>
          <h4>Wat houden de herhaalboekingen in?</h4>
          <p>
            Een herhaalboeking houdt in dat de Toupr student één of meerdere keren per week langskomt.
            Je hebt elke keer dezelfde Toupr student,
            mocht je om welke reden dan ook van Toupr student willen wisselen, is dat altijd mogelijk.
          </p>
          <br />
          <h4>Kan ik de datum en/of tijd van mijn afspraak wijzigen?</h4>
          <p>Ja zeker! Dit kan je met de Toupr student zelf overeenkomen.</p>
          <br />

          <h4>Wat zijn de annuleringsvoorwaarden?</h4>
          <p>
            Je kunt een individuele sessies kosteloos afzeggen tot 48 uur voor aanvang.
            Wanneer je een afspraak korter dan 48 uur voor aanvang van de sessie annuleert, worden annuleringskosten ter waarde van één uur in rekening gebracht.
            Wanner je een afspraak korter dan 24 uur voor aanvang van de sessie annuleert, dan worden de kosten van de volledige sessie in rekening gebracht.
          </p>
        </div>
      </div>
    </b-modal>
    <div class="columns">
      <div class="side-content column is-3">
        <div class="weekly-card">
          <div class="weekly-card-header">
            <span>Wekelijks</span>
            <div @click="isInfoModalActive = true">
              <b-icon icon="information"></b-icon>
            </div>
          </div>
          <div class="weekly-card-content">
            <div class="ticks-container">
              <b-icon icon="check" type="is-primary"></b-icon>
              <span>Telkens dezelfde student.</span>
            </div>
            <div class="ticks-container">
              <b-icon icon="check" type="is-primary"></b-icon>
              <span>Altijd opzegbaar.</span>
            </div>
            <div class="ticks-container">
              <b-icon icon="check" type="is-primary"></b-icon>
              <span>Geen gedoe.</span>
            </div>
          </div>
        </div>
        <div class="call-more-info">
          <p>
            <b>Meer informatie nodig?</b>
            Laat je telefoonnummer achter en we bellen je binnen een dag terug!
          </p>
          <b-field
            :class="{ 'is-danger': errors.has('Telefoonnummer') }"
            :message="errors.first('Telefoonnummer')"
            :type="{'is-danger': errors.has('Telefoonnummer')}"
          >
            <b-input
              class="call-input"
              v-model="phoneNumber"
              v-validate="'required|numeric|min :10'"
              data-vv-name="Telefoonnummer"
              placeholder="Telefoonnummer"
            ></b-input>
          </b-field>
          <b-button class="call-submit-btn" @click="submitCallMoreInfo">Bel mij terug</b-button>
        </div>
      </div>
      <div class="main-content">
        <div class="header-content">
          <div class="recommended">
            <h2>Aanbevolen voor jou</h2>
          </div>
          <div class="input-header-container">
            <b-datepicker
              :focused-date="new Date()"
              :first-day-of-week="1"
              :min-date="new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2)"
              :max-date="new Date(new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate())"
              v-model="searchInfo.datePicker"
              ref="datePickerEl"
              class="date-picker-input"
              placeholder="Datum"
              icon="calendar-today"
            ></b-datepicker>
            <div class="select how-often-input">
              <select v-model="searchInfo.howOften">
                <option disabled value>Hoe vaak?</option>
                <option>Eenmalig</option>
                <option>Wekelijks</option>
              </select>
            </div>
            <div class="select">
              <select v-model="searchInfo.period">
                <option disabled value>Hoelaat?</option>
                <option>Maakt niet uit</option>
                <option>16:00 - 18:00</option>
                <option>18:30 - 20:30</option>
              </select>
            </div>
          </div>
        </div>
        <div class="students-content" ref="studentsContent">
          <!-- <b-loading :is-full-page="loader.isFullPage" :active.sync="loader.isLoading"></b-loading> -->
          <h3
            v-if="noResultsFound"
            class="is-size-5 no-results-found"
          >Er zijn geen resultaten gevonden met uw zoekcriteria</h3>
          <div class="wrapper" v-if="isLoadingResults">
            <div
              class="card-loader card-loader--tabs"
              v-for="loader in amountOfLoaders"
              :key="loader"
            >
              <div class="card-loader-image"></div>
              <div class="card-loader-name"></div>
            </div>
          </div>
          <div class="student-container" v-for="student in students" :key="student.id">
            <div class="columns student-columns">
              <div
                class="column is-3 student-image"
                :style="{backgroundImage: 'url(' + student.photoURL + ')'}"
              ></div>
              <div class="column is-7 student-info">
                <div class="columns student-name-price">
                  <h4 class="column is-8 is-size-4 student-name">{{student.name.fname}}</h4>
                  <h5 class="column is-4 student-price">
                    <span class="is-size-6">€ {{student.price}}</span>
                    <span class="is-size-7">&ensp;per uur</span>
                  </h5>
                </div>
                <div class="columns">
                  <div class="column is-12 student-rating">
                    <div class="student-stars">
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
                </div>
                <div class="columns">
                  <div class="column is-12 student-short-bio">
                    <p>
                      {{student.bio.short.length > 68 ? student.bio.short.substring(0, 68) + '...' : student.bio.short.length}}
                      <router-link
                        :to="'/student/' + student.id"
                        v-if="student.bio.short.length > 68"
                        class="student-short-bio-read-more"
                      >Lees meer</router-link>
                    </p>
                  </div>
                </div>
                <div class="columns">
                  <div class="column is-12 student-icons">
                    <b-tooltip
                      label="Geverifieerde Toupr Student"
                      type="is-light"
                      position="is-bottom"
                    >
                      <b-icon icon="shield-check"></b-icon>
                    </b-tooltip>
                  </div>
                </div>
              </div>
              <router-link
                tag="div"
                :to="'/student/' + student.id"
                class="column is-2 student-select"
              >
                <h3>Bekijk het profiel van {{student.name.fname}}</h3>
                <div class="student-select-icon">
                  <b-icon icon="arrow-right"></b-icon>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-content {
  max-width: 1250px;
  margin: 2rem auto;
}

.modal-content {
  background-color: white;
  max-width: 700px;
  padding: 1.5rem;
  h2 {
    font-size: 1.8rem;
    border-bottom: 2px solid #c0bfbf;
    padding-bottom: 0.4rem;
    margin-bottom: 0.9rem;

    font-weight: 600;
  }
  h4 {
    font-size: 1.1rem;
    font-weight: 500;
  }
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
        margin-left: 0.2rem;
        padding-right: 0.4rem;
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
  }
  .call-submit-btn {
    background-color: #ff6c5c;
    color: white;
    width: 100%;
  }
}

.main-content {
  margin: 0 2rem;
  padding: 0.75rem;
  width: 100%;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .recommended {
    h2 {
      display: inline;
      font-size: 1.8rem;
      font-weight: 700;
    }
  }
  .input-header-container {
    display: flex;
    width: auto;
    justify-content: flex-end;
    select {
      width: 9rem;
    }
    .date-picker-input {
      width: 9rem;
      margin-right: 1rem;
      input {
        cursor: pointer;
      }
    }
    .how-often-input {
      margin-right: 1rem;
    }
  }
}

.students-content {
  .no-results-found {
    margin-top: 1.2rem;
  }
  .wrapper {
    width: 100%;
  }
  .card-loader {
    background-color: #fff;
    box-shadow: 1px 0 2px 0 rgba(0, 0, 0, 0.06);
    border: 1px solid #ebebeb;
    border-radius: 5px;
    position: relative;
    margin-bottom: 1.2rem;
    height: 190px;
    overflow: hidden;
    &:only-child {
      margin-top: 0;
    }
    .card-loader-image {
      width: 190px;
      height: 189px;
      float: left;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      background-color: #ededed;
    }
    .card-loader-name {
      width: 250px;
      height: 35px;
      display: inline-block;
      background-color: #ededed;
      margin: 0.75rem;
    }
    &:after {
      content: "";
      background-color: #333;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      animation-duration: 0.6s;
      animation-iteration-count: infinite;
      animation-name: loader-animate;
      animation-timing-function: linear;
      background: -webkit-linear-gradient(
        left,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.6) 30%,
        rgba(255, 255, 255, 0) 81%
      );
      background: -o-linear-gradient(
        left,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.6) 30%,
        rgba(255, 255, 255, 0) 81%
      );
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.6) 30%,
        rgba(255, 255, 255, 0) 81%
      );
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#00ffffff',GradientType=1 );
    }
  }

  // Loader animation
  @keyframes loader-animate {
    0% {
      transform: translate3d(-100%, 0, 0);
    }
    100% {
      transform: translate3d(100%, 0, 0);
    }
  }
  .student-container {
    border-radius: 5px;
    background-color: white;
    height: 190px;
    max-width: 100%;
    margin-top: 1.2rem;
    box-shadow: 1px 0 2px 0 rgba(0, 0, 0, 0.06);
    border-top: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
    .student-columns {
      margin: 0px;
    }
    .student-image {
      background-image: url("https://toupr.nl/photo_student_uploads/profile61.png");
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      width: 190px;
      height: 189px;
      background-size: auto;
      background-repeat: no-repeat;
      background-size: 300px auto;
      background-position: center;
      background-size: cover;
    }
    .student-info {
      .student-name {
        padding-bottom: 0.1rem;
        margin-left: 0.3rem;
        font-weight: 600;
      }
      .student-price {
        display: flex;
        align-items: center;
      }
      .student-price > :first-child {
        font-weight: 600;
      }
      .student-rating {
        padding-top: 0rem;
        padding-left: 1rem;
        .student-stars {
          display: contents;
          color: #52d3aa;
        }
        .student-amount-reviews {
          display: contents;
        }
      }
      .student-short-bio {
        padding-top: 0rem;
        padding-bottom: 0rem;
        padding-left: 1rem;
        .student-short-bio-read-more {
          color: #52d3aa;
          margin-left: 0.3rem;
        }
      }
      .student-icons {
        padding-left: 1rem;
      }
    }
    .student-select {
      border-left: 1px solid #ebebeb;
      background-color: white;
      width: 20%;
      padding-top: 7%;
      border-right: 1px solid #ebebeb;
      border-top: 1px solid #ebebeb;
      border-bottom: 1px solid #ebebeb;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      cursor: pointer;
      h3 {
        text-align: center;
      }
      .student-select-icon {
        display: flex;
        justify-content: center;
        transform: translate(0px, 0px);
        transition: transform ease-in-out 0.4s;
      }
      &:hover {
        border-top-right-radius: 5px;
        border-right: 1px solid #52d3aa;
        border-bottom: 1px solid #52d3aa;
        border-top: 1px solid #52d3aa;
        border-left: 1px solid #52d3aa;
        border-bottom-right-radius: 5px;
        color: #52d3aa;
        .student-info {
          background-color: hsla(160.93023255813952, 59.45%, 57.45%, 0.06);
        }
        .student-select-icon {
          transform: translate(10px, 0px);
          transition: transform ease-in-out 0.4s;
        }
      }
    }
    &:hover {
      background-color: hsla(160.93023255813952, 59.45%, 57.45%, 0.06);
    }
  }
}

.select::after {
  border-color: #52d3aa !important;
}
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loader: {
        isFullPage: false,
        isLoading: true,
      },
      isInfoModalActive: false,
      phoneNumber: null,
      coordinates: {
        lat: null,
        lon: null,
      },
      searchInfo: {
        datePicker: null,
        howOften: '',
        period: '',
      },
      students: [],
      noResultsFound: true,
      isLoadingResults: true,
      amountOfLoaders: 4,
    };
  },
  mounted() {
    const { datePickerEl } = this.$refs;
    // datePickerEl.toggle();
    const postalCode = this.$route.query.postcode;
    if (!postalCode || postalCode === '') {
      this.$router.push('/');
    } else {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${postalCode}&key=AIzaSyCpwMe7tW66lpnDogJ3QkE_0T3muucADnY`,
        )
        .then((res) => {
          if (res.data.status === 'OK') {
            if (
              res.data.results[0].address_components[2].short_name
              === 'Amsterdam'
            ) {
              this.coordinates.lat = res.data.results[0].geometry.location.lat;
              this.coordinates.lon = res.data.results[0].geometry.location.lng;
              // Get students
              this.getStudents();
            } else {
              this.$router.push(`buitenpostcode?postcode=${postalCode}`);
            }
          } else {
            this.$toast.open({
              duration: 5000,
              message:
                'We kunnen jouw postcode helaas niet vinden. Probeer het opnieuw.',
              type: 'is-danger',
            });
          }
        });
    }
  },
  methods: {
    submitCallMoreInfo() {
      this.$validator.validateAll().then((result) => {
        if (!result) {
          // If there are errors in input
          // Remove loading button
          return;
        }

        const { db } = this.$store.state;

        db.collection('callBack')
          .doc()
          .set({
            phoneNumber: this.phoneNumber,
            creationTime: new Date(),
          })
          .then(() => {
            this.$toast.open({
              message: 'We bellen je binnen een dag terug!',
              type: 'is-success',
            });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    selectMonth(option) {
      if (option) {
        this.date = new Date(this.date);
        this.date.setMonth(option.value);
      }
    },
    getStudents() {
      // Getting students
      const { db } = this.$store.state;
      const dayOfWeek = new Date(this.searchInfo.datePicker).getDay();
      db.collection('students')
        // .where('availableDayOfWeek', 'array-contains', dayOfWeek)
        .get()
        .then((querySnapshot) => {
          this.students = [];
          if (querySnapshot.docs.length !== 0) {
            this.noResultsFound = false;
            querySnapshot.forEach((doc) => {
              console.log(doc.data());
              const studentData = doc.data();
              studentData.id = doc.ref.id;
              this.students.push(studentData);
              this.isLoadingResults = false;
            });
          } else {
            this.noResultsFound = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    searchQuery() {
      return this.searchInfo;
    },
  },
  watch: {
    searchQuery: {
      handler() {
        this.getStudents();
      },
      deep: true,
    },
  },
};
</script>
