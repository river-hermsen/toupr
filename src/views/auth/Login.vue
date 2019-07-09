<template>
  <div class="container">
    <div>
      <b-field label="Email" type="is-danger" message="This email is invalid">
        <b-input type="email" value="john@" maxlength="30"></b-input>
      </b-field>
    </div>
    <div>
      <b-field label="Password">
        <b-input type="password" value="iwantmytreasure" password-reveal></b-input>
      </b-field>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
export default {};
</script>
