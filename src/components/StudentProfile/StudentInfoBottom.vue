<template>
  <div class="student-info-bottom">
    <div class="student-reviews-container">
      <div class="student-reviews-header">
        <h1 class="is-size-2 title">Beoordelingen van {{student.name.fname}}</h1>
        <span>Al onze beoordelingen zijn verzameld door ons en zijn 100% betrouwbaar. Ze komen overeen met echte ervaringen van leerlingen van de student</span>
      </div>
      <div class="student-reviews-content">
        <div
          v-for="review in student.reviews.reviews"
          :key="review.index"
          class="student-review-container"
        >
          <div class="student-review-info">
            <div class="student-review-img-container">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/toupr-35ecc.appspot.com/o/meta%2Ftouprteam.png?alt=media&token=1eb7768c-537f-4689-868f-1eb6009aed4b"
                alt="Toupr team logo"
              />
            </div>
            <div class="student-review-name-container">
              <span class="student-review-name">{{review.name}}</span>
              <div class="student-review-rating">
                <b-icon icon="star" v-if="review.rating >= 1" size="is-small"></b-icon>
                <b-icon icon="star-outline" v-else></b-icon>
                <b-icon icon="star" v-if="review.rating >= 2" size="is-small"></b-icon>
                <b-icon icon="star-outline" v-else></b-icon>
                <b-icon icon="star" v-if="review.rating >= 3" size="is-small"></b-icon>
                <b-icon icon="star-outline" v-else></b-icon>
                <b-icon icon="star" v-if="review.rating >= 4" size="is-small"></b-icon>
                <b-icon icon="star-outline" v-else></b-icon>
                <b-icon icon="star" v-if="review.rating >= 5" size="is-small"></b-icon>
                <b-icon icon="star-outline" v-else></b-icon>
              </div>
              <div>{{formatTimeStampToMonthYear(review.createdAt)}}</div>
            </div>
            <div class="student-review-thumb-container has-text-primary">
              <b-tooltip
                label="Deze beoordeling is een aanbeveling en dus geen review van een gebruiker van Toupr."
                type="is-light"
                position="is-left"
                multilined
              >
                <b-icon icon="thumb-up-outline"></b-icon>
              </b-tooltip>
            </div>
          </div>
          <div class="student-review-text">{{review.review}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.student-info-bottom {
  .student-reviews-container {
    padding-top: 1.5rem;
    .student-reviews-header {
      border-bottom: 1px solid #ebebeb;
      padding-bottom: 1.5rem;

      h1 {
        margin-bottom: 0.5rem;
      }
    }
    .student-review-container {
      border-bottom: 1px solid #ebebeb;
      padding: 1.5rem 0rem 1.5rem 0rem;
      .student-review-info {
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;
        .student-review-img-container {
          img {
            width: 52px;
            padding: 0.3rem;
          }
        }
        .student-review-name-container {
          margin-left: 0.5rem;
          .student-review-name {
            font-weight: 600;
            float: left;
          }
          .student-review-rating {
            float: left;
            margin-left: 0.5rem;
            color: #ffb502;
          }
        }
        .student-review-thumb-container {
          margin-left: auto;
        }
      }
    }
  }
}
</style>

<script>
export default {
  props: ['student'],
  data() {
    return {
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
    };
  },
  methods: {
    formatTimeStampToMonthYear(TimeStamp) {
      const jsDate = new Date(TimeStamp.seconds * 1000);
      const year = jsDate.getFullYear();
      const month = this.months[jsDate.getMonth()];
      const formatted = `${month} ${year}`;
      return formatted;
    },
  },
};
</script>
