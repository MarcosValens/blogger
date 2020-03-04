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
      <div class="row">
        <div class="col q-ma-md">
          <h2>Original content</h2>
          <q-card square bordered class="shadow-1 ">
            <q-card-section>
              <q-form class="q-gutter-md">
                <q-input square filled clearable v-model="title" type="text" label="Title" />
                <q-input square filled clearable v-model="content" type="textarea" label="Content" />
              </q-form>

              <q-card-actions>
                <q-btn color="blue" size="lg" class="full-width" label="Submit" @click="send" />
              </q-card-actions>
            </q-card-section>
          </q-card>
        </div>
        <div class="col q-ma-md">
          <h2>Traduction</h2>
          <q-card square bordered class="shadow-1">
            <q-card-section>
              <q-form class="q-gutter-md">
                <q-input square filled clearable v-model="title" type="text" label="Title" />
                <q-input square filled clearable v-model="content" type="textarea" label="Content" />
              </q-form>

              <q-card-actions>
                <q-btn color="blue" size="lg" class="full-width" label="Submit" @click="send" />
              </q-card-actions>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
.title {
  text-align: center;
  color: #1976d2;
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
      errors: [],
      title: "",
      content: ""
    };
  },
  async created() {
    const idPost = this.$route.params.id;
    if (idPost !== undefined) {
      await this.loadPost(idPost);
    }
  },
  methods: {
    async loadPost(id) {},
    send() {
      /*
     idPost, published, url, title, translatedTitle, content,
      translatedTitle, originalLanguage, translatedLanguage
user*/
      const { title, content } = this;
      const translatedContent = content;
      const translatedLanguage = "es";
      const translatedTitle = title;
      const originalLanguage = translatedLanguage;
      const published = new Date();
      const url = "";
      const user = "marcosvalens@gmail.com";
      // TODO: Change this!
      const javaUrl = "http://172.16.3.75:8080/posts/save";
      const data = {
        title,
        content,
        translatedContent,
        translatedLanguage,
        translatedTitle,
        originalLanguage,
        published,
        url,
        user
      };
      this.errors = [];
      this.$axios
        .post(`${javaUrl}`, data)
        .then(err => {
          this.$router.replace("/blogger/all");
        })
        .catch(err => {
          this.errors.push(err.response.data);
        });
    }
  }
};
</script>