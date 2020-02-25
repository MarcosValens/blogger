<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-cyan">
      <q-toolbar class="glossy">
        <q-toolbar-title>Blogger</q-toolbar-title>
        <q-tabs v-model="tabs">
          <q-tab name="createPost" label="Crear post" @click="redirect('create')"/>
          <q-tab name="calories" label="Calculadora de calorías"/>
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink';

export default {
  name: 'MainLayout',
  props: {
    tabs: Array
  },
  components: {
    EssentialLink,
  },

  data() {
    return {
    };
  },
  methods: {
    redirect(path) {
      this.$router.push('/blogger/'+path);
    }
  }
};
</script>
