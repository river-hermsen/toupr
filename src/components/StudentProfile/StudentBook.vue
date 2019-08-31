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
          :unselectable-dates="[new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 5)]"
          :unselectable-days-of-week="unselectableDaysOfWeekDatePicker"
          :mobile-native="false"
          v-model="datePicker"
          ref="datePickerEl"
          class="date-picker-input"
          placeholder="Datum"
          icon="calendar-today"
        ></b-datepicker>
        <div class="student-book-howOften select">
          <select v-model="howOften">
            <option disabled value>Hoe vaak?</option>
            <option>Eenmalig</option>
            <option>Wekelijks</option>
          </select>
        </div>
        <div class="student-book-sessionTime select">
          <select v-model="sessionTime">
            <option disabled value>Hoelaat?</option>
            <option>Maakt niet uit</option>
            <option>16:00 - 18:00</option>
            <option>18:30 - 20:30</option>
          </select>
        </div>
        <b-button type="is-primary" class="student-book-continue-btn">Veder</b-button>
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
</style>

<script>
export default {
  props: ['student'],
  data() {
    return {
      datePicker: null,
      unselectableDatesDatePicker: [],
      unselectableDaysOfWeekDatePicker: [],
      unselectableDates: [],
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
        console.log(doc.data());
        const data = doc.data();
        console.log(data.default);
        Object.keys(data.default).forEach((key) => {
          console.log(key, data.default[key]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    // getWeekNumber(d) {
    //   d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    //   d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    //   const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    //   const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    //   return [d.getUTCFullYear(), weekNo];
    // },
  },
};
</script>
