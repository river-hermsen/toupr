
<template>
  <div ref="agendaEl">
    <b-loading :is-full-page="false" :active.sync="isLoading"></b-loading>
    <div>
      <h1 class="header-title">
        Aankomende
        <span class="text-primary">Toupr</span> sessies.
      </h1>
    </div>
    <div class="columns">
      <div class="column is-5">
        <b-datepicker
          v-model="date"
          inline
          :events="sessions"
          :min-date="minDatePicker"
          :max-date="maxDatePicker"
        ></b-datepicker>
      </div>
      <div class="column is-7">
        <h1
          class="is-size-5"
          v-if="Object.keys(currentSession).length == 0"
        >Selecteer de datum van je sessie om die te bekijken.</h1>
        <div class="card" v-if="!Object.keys(currentSession).length == 0">
          <header class="card-header">
            <p
              class="card-header-title"
              v-if="currentSelectDatePicker.isFound"
            >Jouw sessie op {{formatDate(currentSelectDatePicker.date)}}</p>
            <p
              class="card-header-title"
              v-if="!currentSelectDatePicker.isFound"
            >Geen sessie gevonden op {{formatDate(currentSelectDatePicker.date)}}</p>
          </header>
          <div class="card-content">
            <div class="content">
              <div v-if="currentSelectDatePicker.isFound">
                <span>
                  Datum:
                  <b>{{formatDate(currentSession.date)}}</b>
                </span>
                <br />
                <span>
                  Tijd:
                  <b>{{currentSession.date.getHours() }}:{{( /* eslint-disable */ currentSession.date.getMinutes() < 10 ?'0':'') + currentSession.date.getMinutes()}}</b>
                </span>
                <br />
                <span>
                  Student:
                  <router-link :to="'/student/' + currentSession.studentID">
                    <b>{{currentSession.studentInfo.name.fname + ' ' + currentSession.studentInfo.name.lname}}</b>
                  </router-link>
                </span>
                <br />
                <span>
                  Status:
                  <span
                    :class="{ 'session-is-accepted' : currentSession.acceptedSession, 'session-is-not-accepted' : !currentSession.acceptedSession}"
                  >{{ currentSession.acceptedSession ? 'De student heeft deze sessie geaccepteerd' : 'De student heeft deze sessie (nog) niet geaccepteerd'}}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-title {
  font-size: 1.4rem;
  margin-bottom: 2rem;
}

.session-is-accepted {
  color: #23d160;
}

.session-is-not-accepted {
  color: #ff3860;
}
</style>

<script>
export default {
  data() {
    return {
      isLoading: true,
      date: new Date(),
      currentDate: new Date().setHours(0),
      minDatePicker: null,
      maxDatePicker: null,
      currentSelectDatePicker: {
        date: new Date(),
        isFound: false,
      },
      currentSession: {},
      sessions: [],
    };
  },
  created() {
    const dMin = new Date();
    dMin.setDate(new Date().getDate() - 1);
    this.minDatePicker = dMin;
    const dMax = new Date();
    dMax.setDate(new Date().getDate() + 60);
    this.maxDatePicker = dMax;
  },
  mounted() {
    /* eslint-disable */
    const { db } = this.$store.state;
    const { uid } = this.$store.state.userData;
    let sessionsRef = db.collection("sessions");
    let queryRef = sessionsRef
      .where("userID", "==", uid)
      .get()
      .then(snapshot => {
        snapshot.docs.map(doc => {
          const dateTime = new Date(doc.data().dateTime.seconds * 1000);
          const studentID = doc.data().studentID;
          const acceptedSession = doc.data().accepted;
          var type = "";
          if (doc.data().accepted) {
            type = "is-success";
          } else {
            type = "is-danger";
          }

          const docRef = db.collection("students").doc(studentID);
          docRef.get().then(doc => {
            const studentInfo = doc.data();
            this.sessions.push({
              acceptedSession: acceptedSession,
              date: dateTime,
              type: type,
              studentID: studentID,
              studentInfo: studentInfo
            });
          });
        });
      })
      .then(() => {
        this.isLoading = false;
      })
      .catch(err => console.log(err));
  },
  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr);
      const monthNames = [
        "Januari",
        "Februari",
        "Maart",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Augustus",
        "September",
        "Oktober",
        "November",
        "December"
      ];
      const day = date.getDate();
      const monthIndex = date.getMonth();
      return `${day} ${monthNames[monthIndex]}`;
    },
    formatDateToTime(dateStr) {
      const date = new Date(dateStr);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      return `${hours}:${minutes}`;
    }
  },
  watch: {
    date(newVal, oldVal) {
      const onSameDate =
        this.sessions.filter(
          e =>
            e.date.getDate() === newVal.getDate() &&
            e.date.getMonth() === newVal.getMonth()
        ).length > 0;
      if (onSameDate) {
        this.currentSelectDatePicker.date = newVal;
        this.currentSession = this.sessions.find(
          session =>
            session.date.getDate() === newVal.getDate() &&
            session.date.getMonth() === newVal.getMonth()
        );
        this.currentSelectDatePicker.isFound = true;
      } else {
        this.currentSelectDatePicker.date = newVal;
        this.currentSelectDatePicker.isFound = false;
      }
    }
  }
};
</script>
