<template>
  <div class="student-info-bottom">
    <div class="student-reviews-container">
      <div class="student-reviews-header">
        <h1 class="is-size-2 title">Beoordelingen van {{student.name.fname}}</h1>
        <span>Al onze beoordelingen zijn verzameld door ons en zijn 100% betrouwbaar. Ze komen overeen met echte ervaringen van leerlingen van de student</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.student-info-bottom {
  .student-reviews-container {
    padding-top: 1.5rem;
  }
}
</style>

<script>
export default {
  props: ['student'],
};
</script>
