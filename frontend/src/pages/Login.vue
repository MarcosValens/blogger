<template>
  <q-page>
    <div>
      <div id="loginTitle">
        <h3>Login</h3>
      </div>
      <div id="loginCard">
        <q-card square bordered class="shadow-1">
            <q-card-section>
              <q-form class="q-gutter-md" >
                  <q-input square filled clearable v-model="email" type="email" label="email" />
                  <q-input square filled clearable v-model="password" type="password" label="password" />
              </q-form>
              <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure" filled></GoogleLogin>
              <q-card-actions>
                <q-btn color="blue" size="lg" class="full-width" label="Login" />
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
    color: #1976D2;
  }

  #loginCard {
    margin-left: 38%;
    margin-top: 5%;
    height: 10%;
    width: 30%;
  }

  .q-gutter-md{
    margin-bottom: 5%;
  }

</style>
<script>
import GoogleLogin from 'vue-google-login';

export default {
  name: 'Login',
  data(){
    return {
        params: {
          client_id: "923106540137-eqtlkb3qvhll0bhj65s3a1nv3fs1ev81.apps.googleusercontent.com"
        },
         renderParams: {
                    width: 200,
                    height: 50,
                    longtitle: false,
                    theme: 'dark',
        },
        email:'',
        password:''
    }
  },
  components: {
    GoogleLogin
  },
  methods: {
        onSuccess(googleUser) {
            console.log(googleUser);
            console.log(GoogleLogin);
            document.querySelector("#logout").style.display = 'unset';
            // This only gets the user information: id, name, imageUrl and email
            console.log(googleUser.getBasicProfile());
        },

        onFailure(error){
          console.log(error);
        }
    }
};
</script>
