<template>
  <div>
    <div>
      <h1 class="header-title">
        Afgelopen
        <span class="text-primary">Toupr</span> sessies.
      </h1>
    </div>
    <div class="session-history-container">
      <b-table :data="sessions" :loading="isLoadingData">
        <template slot-scope="props">
          <b-table-column field="studentName" label="Naam student">
            <router-link
              :to="'/student/' + props.row.studentID"
            >{{ props.row.studentname.fname + ' ' + props.row.studentname.lname }}</router-link>
          </b-table-column>

          <b-table-column
            field="date"
            label="Date"
            centered
          >{{ new Date(props.row.date).toLocaleDateString() }}</b-table-column>

          <b-table-column
            field="time"
            label="Tijd"
          >{{ props.row.date.getHours() }}:{{( /* eslint-disable */ props.row.date.getMinutes() < 10 ?'0':'') + props.row.date.getMinutes()}}</b-table-column>
        </template>

        <template slot="empty" v-if="isEmpty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p>
                <b-icon icon="emoticon-sad" size="is-large"></b-icon>
              </p>
              <p>Nothing here.</p>
            </div>
          </section>
        </template>
      </b-table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-title {
  font-size: 1.4rem;
}

.session-history-container {
  margin-top: 1.4em;
}
</style>

<script>
export default {
  data() {
    return {
      isLoadingData: true,
      isEmpty: false,
      columns: [
        {
          field: 'studentname',
          label: 'Naam student',
        },
        {
          field: 'date',
          label: 'Datum',
        },
        {
          field: 'time',
          label: 'Tijd',
        },
      ],
      sessions: [],
    };
  },
  created() {
    /* eslint-disable */
    const { db } = this.$store.state;
    const { uid } = this.$store.state.userData;
    let sessionsRef = db.collection("sessions");
    let queryRef = sessionsRef
      .where("userID", "==", uid)
      .where("dateTime", "<", new Date())
      .get()
      .then(snapshot => {
        if (snapshot.size <= 0) {
          this.isEmpty = true;
          this.isLoadingData = false;
        } else {
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
                studentID: studentID,
                studentname: studentInfo.name
              });
              this.isLoadingData = false;
            });
          });
        }
      })
      .then(() => {
        this.isLoading = false;
      });
    // .catch(err => console.log(err));
  }
};
</script>
