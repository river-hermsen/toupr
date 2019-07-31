<template>
  <div>
    <b-button @click="getStudent">Test 1</b-button>
    <b-button @click="addStudent">Test 2</b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    getStudent() {
      const { db } = this.$store.state;
      const docRef = db.collection('students').doc('8fhvG4ItXFr5BbEGRv6K');
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log(doc.data());
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        });
    },
    addStudent() {
      //   const { db } = this.$store.state;
      //   db.collection('students')
      //     .doc()
      //     .set({
      //       email: res.user.email,
      //       emailVerified: res.user.emailVerified,
      //       phoneNumber: res.user.phoneNumber,
      //       photoURL: res.user.photoURL,
      //       creationTime: res.user.metadata.creationTime,
      //     })
      //     .then(() => {
      //       console.log('Document successfully written!');
      //     })
      //     .catch(() => {
      //       // console.error('Error writing document: ', error);
      //     });
    },
  },
};
</script>
