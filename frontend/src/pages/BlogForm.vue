<template>
  <q-page>
    <div>
      <div class="title">
        <h3>Form</h3>
      </div>
      <div v-if="errors.length" class="card">
        <q-banner
          inline-actions
          class="text-white bg-red"
          v-for="(error, key) in errors"
          :key="key"
        >{{ error }}</q-banner>
      </div>
      <div class="card">
        <q-card square bordered class="shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input square filled clearable v-model="email" type="email" label="email" />
              <q-input square filled clearable v-model="password" type="password" label="password" />
            </q-form>
            
            <q-card-actions>
              <q-btn color="blue" size="lg" class="full-width" label="Submit" @click="send" />
            </q-card-actions>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
.title {
  text-align: center;
  color: #1976d2;
}

.card {
  margin-left: 38%;
  margin-top: 5%;
  height: 10%;
  width: 30%;
}

.q-gutter-md {
  margin-bottom: 5%;
}
</style>

<script>
    export default {
        name: "Form",
        props: [],
        data() {
            return {

            };
        },
        methods: {
            send() {
                console.log("Sending something...")
            }
        }
    }
</script>