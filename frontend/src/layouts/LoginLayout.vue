<template>
  <q-layout view="hHh lpR fFf">
      <h1>Login</h1>
    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>
<style scoped>
    h1{
        text-align: center;
    }
</style>
<script>
export default {
    name: 'LoginLayout',
  data () {
    return {
    };
  },
};
</script>