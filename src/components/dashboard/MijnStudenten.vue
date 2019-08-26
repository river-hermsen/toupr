<template>
  <div>
    <div>
      <h1 class="header-title">
        Jouw vaak geboekte
        <span class="text-primary">Toupr</span> studenten.
      </h1>
    </div>
    <div class="frequent-booked-students columns">
      <div
        v-for="student in students"
        :key="student.name.fname + ' ' + student.name.lname"
        class="column is-6 student"
      >
        <div class>
          <div
            v-bind:style="{ backgroundImage: 'url(' + student.photoURL + ')'}"
            class="student-image"
          ></div>
          <div class="student-info">
            <div class="student-header-info">
              <h3 class="is-size-4 student-name">{{student.name.fname}} {{student.name.lname}}</h3>
              <h5 class="student-amount-booked">{{student.amountBooked}}x geboekt door jouw.</h5>
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
}

.frequent-booked-students {
  margin-top: 1.2rem;
  .student {
    border: 1px solid #ebebeb;
    border-radius: 5px;
    -webkit-box-shadow: 1px 0 2px 0 rgba(0, 0, 0, 0.06);
    box-shadow: 1px 0 2px 0 rgba(0, 0, 0, 0.06);
    margin: 10px;
    padding: 0px;
    .student-image {
      width: 150px;
      height: 149px;
      float: left;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
    .student-info {
      padding: 0.6rem;
      .student-header-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .student-name {
        padding-left: 10px;
      }
      .student-amount-booked {
      }
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      students: [],
    };
  },
  beforeMount() {
    const { db } = this.$store.state;
    db.collection('sessions')
      .where('userID', '==', this.$store.state.userData.uid)
      .get()
      .then((docs) => {
        const docsData = [];
        const amountBookedArr = [];
        docs.forEach((doc) => {
          docsData.push(doc.data());
        });
        docsData.forEach((doc) => {
          if (
            amountBookedArr.filter(e => e.studentID === doc.studentID)
              .length === 0
          ) {
            const value = doc.studentID;
            const amountBooked = docsData.filter(v => v.studentID === value)
              .length;
            amountBookedArr.push({
              amountBooked,
              studentID: doc.studentID,
            });
          }
        });
        // eslint-disable-next-line
        amountBookedArr.sort((a, b) => a.amountBooked > b.amountBooked ? 1 : -1,);
        amountBookedArr.reverse();
        return amountBookedArr;
      })
      .then((amountBookedArr) => {
        amountBookedArr.forEach((doc) => {
          db.collection('students')
            .doc(doc.studentID)
            .get()
            .then((student) => {
              const studentData = student.data();
              studentData.amountBooked = doc.amountBooked;
              this.students.push(studentData);
            });
        });
      });
  },
};
</script>
