<template>
  <div class="student-book">
    <div class="student-book-top">
      <div class="student-price">
        <span class="student-price-text">€{{student.price}}</span>
        <span class="student-price-hour">&nbsp;Per uur</span>
      </div>
      <div class="student-rating">
        <div class="student-rating-stars">
          <b-icon icon="star" v-if="student.reviews.rating >= 1" size="is-small"></b-icon>
          <b-icon icon="star-outline" v-else></b-icon>
          <b-icon icon="star" v-if="student.reviews.rating >= 2" size="is-small"></b-icon>
          <b-icon icon="star-outline" v-else></b-icon>
          <b-icon icon="star" v-if="student.reviews.rating >= 3" size="is-small"></b-icon>
          <b-icon icon="star-outline" v-else></b-icon>
          <b-icon icon="star" v-if="student.reviews.rating >= 4" size="is-small"></b-icon>
          <b-icon icon="star-outline" v-else></b-icon>
          <b-icon icon="star" v-if="student.reviews.rating >= 5" size="is-small"></b-icon>
          <b-icon icon="star-outline" v-else></b-icon>
        </div>
        <div class="student-rating-amount-reviews">
          <span>({{/* eslint-disable */ student.reviews.reviews.length <5 ? '<5' : student.reviews.reviews.length}} beoordelingen)</span>
        </div>
      </div>
    </div>
    <div class="student-book-middle">
      <div class="student-book-dateTime">
        <span class="student-book-dateTime-text">Datum en tijd</span>
        <b-datepicker
          :focused-date="new Date()"
          :first-day-of-week="1"
          :min-date="new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2)"
          :max-date="new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 30)"
          :unselectable-dates="unselectableDatesDatePicker"
          :unselectable-days-of-week="unselectableDaysOfWeekDatePicker"
          :mobile-native="false"
          v-model="datePicker"
          ref="datePickerEl"
          class="date-picker-input"
          placeholder="Datum"
          icon="calendar-today"
        ></b-datepicker>
        <div class="student-book-sessionTime select">
          <select v-model="sessionTime">
            <option disabled value>Hoelaat?</option>
            <option ref="firstSessionSelect">16:00 - 18:00</option>
            <option ref="secondSessionSelect">18:30 - 20:30</option>
          </select>
        </div>
        <b-button
          type="is-primary"
          class="student-book-continue-btn"
          @click="handleStudentBook()"
        >Veder</b-button>
        <span class="student-book-no-bill-text">Er wordt nog niets in rekening gebracht.</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.student-book {
  border: 1px solid #ebebeb;
  border-radius: 5px;
  padding: 1rem;
  .student-book-top {
    border-bottom: 1px solid #ebebeb;
    .student-price {
      margin-bottom: 0.8rem;
      .student-price-text {
        font-weight: 700;
        font-size: 1.1rem;
      }
      .student-price-hour {
        font-size: 0.95rem;
      }
    }
    .student-rating {
      display: flex;
      align-items: center;
      color: #ffb502;
      margin-bottom: 0.8rem;
      .student-rating-amount-reviews {
        font-size: 0.9rem;
      }
    }
  }
  .student-book-middle {
    margin-top: 0.8rem;
    .student-book-dateTime-text {
      font-size: 0.85rem;
    }
    div {
      margin-bottom: 0.8rem;
    }
    .select {
      width: 100%;
      select {
        width: 100%;
      }
    }
    .student-book-continue-btn {
      width: 100%;
    }
    .student-book-no-bill-text {
      justify-content: center;
      display: flex;
      font-size: 0.8rem;
      margin-top: 0.3rem;
    }
  }
}
</style>

<style lang="scss">
.dropdown.is-mobile-modal .dropdown-menu {
  position: absolute;
}

.select select option:disabled {
  color: #d3d3d3;
}
</style>

<script>
export default {
  props: ['student'],
  data() {
    return {
      datePicker: null,
      unselectableDatesDatePicker: [],
      unselectableDaysOfWeekDatePicker: [0, 6],
      unselectableDates: [],
      allSpecialDefaultDays: [],
      allSpecialCustomDays: [],
      howOften: '',
      sessionTime: '',
    };
  },
  mounted() {
    const { db } = this.$store.state;
    db.collection('availabilityStudents')
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        const data = doc.data();
        Object.keys(data.default).forEach((key) => {
          const day = data.default[key];
          if (!day.firstSession && !day.secondSession) {
            this.unselectableDaysOfWeekDatePicker.push(day.dayOfWeek);
          }
          this.allSpecialDefaultDays.push(day);
        });
        return data;
      })
      .then((data) => {
        data.customNotAvailable.forEach((dateSession) => {
          if (!dateSession.firstSession && !dateSession.secondSession) {
            const dateUnselectable = new Date(dateSession.date.seconds * 1000);
            this.unselectableDatesDatePicker.push(dateUnselectable);
          }
          this.allSpecialCustomDays.push(dateSession);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    checkTimeOnDate() {
      const date = this.datePicker;
      // Check on default days
      const availableTimeDefault = this.allSpecialDefaultDays.find(
        day => day.dayOfWeek === date.getDay(),
      );
      this.$refs.firstSessionSelect.disabled = false;
      this.$refs.secondSessionSelect.disabled = false;
      if (!availableTimeDefault.firstSession) {
        this.$refs.firstSessionSelect.disabled = true;
      } else if (!availableTimeDefault.secondSession) {
        this.$refs.secondSessionSelect.disabled = true;
      }
      // Check on custom days
      const availableTimeCustom = this.allSpecialCustomDays.find((day) => {
        console.log(new Date(day.date.seconds * 1000));
        console.log(new Date(date));
        if (new Date(day.date.seconds * 1000) === new Date(date)) {
          console.log('true');
        }
      });
      // console.log(availableTimeCustom);
    },
    handleStudentBook() {
      const store = this.$store;
      console.log(store.state);
      if (store.state.isLoggedIn) {
        if (store.state.userInfo.completedProfile.is) {
          this.$router.push('/bookstudent');
        } else {
          this.$router.push('/completeprofile');
        }
      } else {
        this.$router.push('/login');
        this.$toast.open({
          duration: 9000,
          message:
            'Je moet eerst een account en een volledig profiel hebben om studenten te boeken.',
          position: 'is-top',
          type: 'is-warning',
        });
      }
    },
  },
  watch: {
    datePicker() {
      this.checkTimeOnDate();
    },
  },
};
</script>
