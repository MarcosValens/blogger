<template>
  <q-page class="flex flex-center">
    <q-input v-model="email" label="E-mail"/>
    <q-input v-model="password" type="password" label="password"/>

  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data(){
    return {
        email:'',
        password:''
    }
  }
};
</script>
