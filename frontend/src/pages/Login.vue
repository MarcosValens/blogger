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
            <GoogleLogin
              :params="params"
              :renderParams="renderParams"
              :onSuccess="onSuccess"
              :onFailure="onFailure"
              filled
            ></GoogleLogin>
            <q-card-actions>
              <q-btn color="blue" size="lg" class="full-width" label="Login" @click="login" />
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
import GoogleLogin from "vue-google-login";
const codes = {
  400: "Resource not found",
  401: "Failed to login. Check your credentials",
  500: "Server error"
};
export default {
  name: "Login",
  data() {
    return {
      params: {
        client_id:
          "923106540137-eqtlkb3qvhll0bhj65s3a1nv3fs1ev81.apps.googleusercontent.com"
      },
      renderParams: {
        width: 335,
        height: 55,
        longtitle: false,
        theme: "dark"
      },
      email: "",
      password: "",
      errors: []
    };
  },
  components: {
    GoogleLogin
  },
  methods: {
    onSuccess(googleUser) {
      this.errors = [];
      console.log(googleUser);

      // This only gets the user information: id, name, imageUrl and email
      console.log(googleUser.getBasicProfile());
    },

    onFailure(error) {
      console.log(error);
    },

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
