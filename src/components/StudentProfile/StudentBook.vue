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
          <select v-model="sessionTime" :disabled="!datePicker">
            <option disabled value>Hoelaat?</option>
            <option ref="firstSessionSelect">16:00 - 18:00</option>
            <option ref="secondSessionSelect">18:30 - 20:30</option>
          </select>
        </div>
        <b-button
          type="is-primary"
          class="student-book-continue-btn"
          @click="handleStudentBook()"
          :disabled="isNotDisabled"
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
    .date-picker-input {
      :nth-child(5) {
        cursor: pointer;
      }
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
      allNotAvailableDefaultDays: [],
      allNotAvailableCustomDays: [],
      sessionTime: '',
      localeNames: {
        week: [
          'Maandag',
          'Dinsdag',
          'Woensdag',
          'Donderdag',
          'Vrijdag',
          'Zaterdag',
          'Zondag',
        ],
        months: [
          'Januari',
          'Februari',
          'Maart',
          'April',
          'Mei',
          'Juni',
          'Juli',
          'Augustus',
          'Oktober',
          'November',
          'December',
        ],
      },
    };
  },
  mounted() {
    const { db } = this.$store.state;
    // Get availability of students
    db.collection('availabilityStudents')
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        // Make days unselectable if both sessions are false for default days.
        const data = doc.data();
        Object.keys(data.default).forEach((key) => {
          const day = data.default[key];
          if (!day.firstSession && !day.secondSession) {
            this.unselectableDaysOfWeekDatePicker.push(day.dayOfWeek);
          }
          this.allNotAvailableDefaultDays.push(day);
        });
        return data;
      })
      .then((data) => {
        // Make days unselectable if both sessions are false for custom days.
        data.customNotAvailable.forEach((dateSession) => {
          if (!dateSession.firstSession && !dateSession.secondSession) {
            const dateUnselectable = new Date(dateSession.date.seconds * 1000);
            this.unselectableDatesDatePicker.push(dateUnselectable);
          }
          this.allNotAvailableCustomDays.push(dateSession);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    checkTimeOnDate() {
      const date = this.datePicker;
      // Check on custom days
      const isOnCustomDate = this.allNotAvailableCustomDays.find(
        (day, index) => {
          // Convert from date object to unix date to compare to timestamp
          const unixTimeDatePicker = Math.round(
            new Date(date).getTime() / 1000,
          );
          if (day.date.seconds === unixTimeDatePicker) {
            return index;
          }
          return undefined;
        },
      );
      if (isOnCustomDate) {
        // If there is an custom not available on selected date
        this.$refs.firstSessionSelect.disabled = false;
        this.$refs.secondSessionSelect.disabled = false;
        if (!isOnCustomDate.firstSession) {
          this.$refs.firstSessionSelect.disabled = true;
        } else if (!isOnCustomDate.secondSession) {
          this.$refs.secondSessionSelect.disabled = true;
        }
      } else {
        // If there is NOT an custom not available on selected date

        // Check on default days
        const availableTimeDefault = this.allNotAvailableDefaultDays.find(
          day => day.dayOfWeek === date.getDay(),
        );
        this.$refs.firstSessionSelect.disabled = false;
        this.$refs.secondSessionSelect.disabled = false;
        if (!availableTimeDefault.firstSession) {
          this.$refs.firstSessionSelect.disabled = true;
        } else if (!availableTimeDefault.secondSession) {
          this.$refs.secondSessionSelect.disabled = true;
        }
      }
    },
    handleStudentBook() {
      const store = this.$store;
      console.log(store.state);
      if (store.state.isLoggedIn) {
        if (store.state.userInfo.completedProfile.is) {
          // If authenticated and if profile is completed
          // Check if both values are not empty
          if (this.datePicker !== '' && this.sessionTime !== '') {
            // this.$router.push(`/book/${this.$route.params.id}`);
            this.$dialog.confirm({
              title: `Boeking bevestigen met ${this.student.name.fname} ${this.student.name.lname}`,
              message: `Op <b>${this.formatDate(this.datePicker)}</b> om <b>${
                this.sessionTime
              }</b>`,
              onConfirm: () => {},
            });
          }
        } else {
          // If authenticated but profile is not yet completed
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
    formatDate(date) {
      // For example format to: Maandag 17 Oktober 2019
      const dateObj = new Date(date);

      const dayOfWeek = this.localeNames.week[dateObj.getDay()];
      const dateOfMonth = dateObj.getDate();
      const month = this.localeNames.months[dateObj.getMonth()];
      const year = dateObj.getFullYear();

      return `${dayOfWeek} ${dateOfMonth} ${month} ${year}`;
    },
  },
  computed: {
    isNotDisabled() {
      // Check if something has been entered in the required inputs to let user continue booking
      if (this.datePicker !== null && this.sessionTime !== '') {
        return false;
      }
      return true;
    },
  },
  watch: {
    datePicker() {
      this.checkTimeOnDate();
      this.sessionTime = '';
    },
  },
};
</script>
