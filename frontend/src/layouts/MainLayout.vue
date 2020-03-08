<template>
  <q-layout view="hHh LpR fff">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="glossy">
        <q-toolbar-title>Blogger</q-toolbar-title>
        <q-tabs align="left">
          <q-route-tab to="/blogger" label="Home" />
          <q-route-tab to="/blogger/create" label="Create a post" />
          <q-route-tab to="/blogger/calorieCalculator" label="Calorie calculator" />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container >
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout"
};
</script>
