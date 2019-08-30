<template>
  <div id="studentProfile" class="columns" v-if="!isLoading">
    <div class="column is-9">
      <div class="student-info">
        <StudentProfileTop :student="student" />
        <StudentProfileMiddle :student="student" />
        <StudentProfileBottom :student="student" />
      </div>
    </div>
    <div class="column is-3">
      <StudentBook :student="student" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#studentProfile {
  max-width: 1250px;
  margin: 2rem auto;
}
</style>

<script>
import StudentProfileTop from '../components/StudentProfile/StudentInfoTop.vue';
import StudentProfileMiddle from '../components/StudentProfile/StudentInfoMiddle.vue';
import StudentProfileBottom from '../components/StudentProfile/StudentInfoBottom.vue';
import StudentBook from '../components/StudentProfile/StudentBook.vue';

export default {
  data() {
    return {
      isLoading: true,
      student: {},
    };
  },
  components: {
    StudentProfileTop,
    StudentProfileMiddle,
    StudentProfileBottom,
    StudentBook,
  },
  beforeCreate() {
    /* eslint-disable */
    const { db } = this.$store.state;
    db.collection("students")
      .doc(this.$route.params.id)
      .get()
      .then(doc => {
        this.student = doc.data();
        this.isLoading = false;
        console.log(doc.data());
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
