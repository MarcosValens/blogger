<template>
  <q-layout view="hHh lpR fFf">
    <h1>Blogger</h1>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<style scoped>
  h1 {
    text-align: center;
    color: #1976D2;
  }

  * {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    background-color: #dfe6e9;
  }

</style>
<script>
  export default {
    name: 'LoginLayout',
    data() {
      return {};
    },
  };

</script>
