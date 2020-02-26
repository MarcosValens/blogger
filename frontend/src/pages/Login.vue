<template>
  <q-page>
    <div>
      <div id="loginTitle">
        <h3>Login</h3>
      </div>
      <div v-if="errors.length" class="card">
        <q-banner
          inline-actions
          class="text-white bg-red"
          v-for="(error, key) in errors"
          :key="key"
        >{{ error }}</q-banner>
      </div>
      <div id="loginCard" class="card">
        <q-card square bordered class="shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input square filled clearable v-model="email" type="email" label="email" />
              <q-input square filled clearable v-model="password" type="password" label="password" />
            </q-form>
            <q-card-actions>
              <q-btn color="blue" size="lg" class="full-width" label="Login" @click="login" />
            </q-card-actions>
            <q-card-actions>
              <!-- TODO: Remove hardcoded endpoint -->
              <q-btn color="blue" size="lg" class="full-width" label="Login with google" type="a" href="http://localhost:9999/users/loginGoogle" />
            </q-card-actions>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
#loginTitle {
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
import {openURL} from "quasar";
const codes = {
  400: "Resource not found",
  401: "Failed to login. Check your credentials",
  500: "Server error"
};
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    login() {
      this.errors = [];
      this.$axios
        .post("http://localhost:9999/users/login", {
          email: this.email,
          password: this.password
        })
        .then(response => {
          this.$router.push("/blogger/all");
        })
        .catch(err => {
          if (!err.response) {
            this.errors.push("Unknown error");
          } else {
            this.errors.push(codes[err.response.status]);
          }
        });
    },
    _perform(token) {}
  }
};
</script>
