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
          <div class="student-container" v-for="student in students" :key="student.id">
            <div class="columns student-columns">
              <div
                class="column is-3 student-image"
                :style="{backgroundImage: 'url(' + student.photoURL + ')'}"
              ></div>
              <div class="column is-7">
                <div class="columns">
                  <h4 class="column is-8 is-size-4 student-name">{{student.name.fname}}</h4>
                  <h5 class="column is-4 student-price">
                    <span class="is-size-6">€ {{student.price}}</span>
                    <span class="is-size-7">&ensp;per uur</span>
                  </h5>
                </div>
              </div>
              <div class="column is-2 student-select"></div>
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
  .student-container {
    border-radius: 5px;
    background-color: white;
    height: 190px;
    max-width: 100%;
    border: 1px solid #ebebeb;
    margin-top: 1.2rem;
    cursor: pointer;
    box-shadow: 1px 0 2px 0 rgba(0, 0, 0, 0.06);
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
    .student-name {
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
    .student-select {
      border-left: 1px solid #ebebeb;
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
    };
  },
  mounted() {
    console.log(this);
    const postalCode = this.$route.query.postcode;
    if (!postalCode || postalCode === '') {
      this.$router.push('/');
    } else {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${postalCode}&key=AIzaSyCpwMe7tW66lpnDogJ3QkE_0T3muucADnY`,
        )
        .then((res) => {
          console.log(res);
          if (res.data.status === 'OK') {
            if (
              res.data.results[0].address_components[2].short_name
              === 'Amsterdam'
            ) {
              console.log('In amsterdam');
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
          .then((res) => {
            this.$toast.open({
              message: 'We bellen je binnen een dag terug!',
              type: 'is-success',
            });
            console.log(res);
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
      db.collection('students')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const studentData = doc.data();
            studentData.id = doc.ref.id;
            this.students.push(studentData);
          });
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
        console.log('query changed');
        console.log(this);

        this.getStudents();
      },
      deep: true,
    },
  },
};
</script>
