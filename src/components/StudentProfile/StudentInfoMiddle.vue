<template>
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
                  <b-icon icon="check" v-if="student.verified.perks.vog" class="has-text-primary"></b-icon>
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
                    :class="{ 'has-text-grey': !student.availability.thisWeek.monday.firstSession && !student.availability.thisWeek.monday.secondSession }"
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
        <div class="student-bio">
          <h2 class="title">Aanpak</h2>
          <div>
            <p>{{student.bio.aanpak}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.student-info-middle {
  margin-top: 2.5rem;
  border-bottom: 1px solid #ebebeb;
  padding-bottom: 1.5rem;
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
  .student-bio {
    h2 {
      margin-bottom: 0.75rem;
    }
  }
}
</style>

<script>
export default {
  props: ['student'],
};
</script>
