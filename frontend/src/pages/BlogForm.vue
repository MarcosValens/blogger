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
          <q-card square bordered class="shadow-1">
            <q-card-section>
              <q-form class="q-gutter-md">
                <q-input
                  @input="handleInput(true)"
                  square
                  filled
                  clearable
                  v-model="title.original"
                  type="text"
                  label="Title"
                />
                <q-select
                  rounded
                  v-model="dstLanguage"
                  :options="languages"
                  label="Original language"
                  @change="changeLanguages"
                />
                <q-input
                  @input="handleInput(false)"
                  square
                  filled
                  clearable
                  v-model="content.original"
                  type="textarea"
                  label="Content"
                />
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
                <q-input
                  readonly
                  square
                  filled
                  clearable
                  v-model="title.translated"
                  type="text"
                  label="Title"
                />
                <q-select
                  rounded
                  v-model="translatedLanguage"
                  :options="languages"
                  label="Translation language"
                  @change="changeLanguages"
                />
                <q-input
                  readonly
                  square
                  filled
                  clearable
                  v-model="content.translated"
                  type="textarea"
                  label="Content"
                />
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
      dstLanguage: "",
      translatedLanguage: "",
      languages: [],
      cancel: null,
      title: {
        original: "",
        translated: ""
      },
      content: {
        original: "",
        translated: ""
      }
    };
  },
  async created() {
    const idPost = this.$route.params.id;
    const post = await this.getPost(idPost);
    const languages = await this.loadLanguages(post);
    this.languages = languages;
  },
  methods: {
    async loadLanguages(post) {
      const languages = await fetch(process.env.ESLICEU_URL, {
        method: "POST",
        body: JSON.stringify({
          MethodName: "languages",
          params: ""
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(r => r.json());
      const mapped = languages.map(language => {
        return { label: language.name, value: language.code };
      });
      return mapped;
    },
    async getPost(id) {
      return null;
    },

    async translate(text) {
      if (this.cancel) {
        this.cancel();
      }
      const CancelToken = this.$axios.CancelToken;
      const source = CancelToken.source();
      try {
        const translation = await this.$axios.post(
          process.env.ESLICEU_URL,
          {
            MethodName: "translate",
            params: {
              source: this.dstLanguage.value,
              target: this.translatedLanguage.value,
              text
            }
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            cancelToken: new CancelToken(token => (this.cancel = token))
          }
        );
        return translation.data;
      } catch (e) {
        return "";
      }
    },

    async handleInput(isTitle) {
      const textToTranslate = isTitle
        ? this.title.original
        : this.content.original;
      const text = await this.translate(textToTranslate);
      if (isTitle) {
        this.title.translated = text;
      } else {
        this.content.translated = text;
      }
    },

    async changeLanguages() {},
    send() {
      /*
     idPost, published, url, title, translatedTitle, content,
      translatedTitle, originalLanguage, translatedLanguage
user*/
      const title = this.title.original;
      const content = this.content.original;
      const originalLanguage = this.dstLanguage.value;

      const translatedTitle = this.title.translated;
      const translatedContent = this.content.translated;
      const translatedLanguage = this.translatedLanguage.value;

      const data = {
        title,
        content,
        translatedContent,
        translatedLanguage,
        translatedTitle,
        originalLanguage
      };
      console.log(data);
      this.errors = [];

      this.$axios
        .post(`${process.env.JAVA_ENDPOINT}/save`, data)
        .then(err => {
          this.$router.replace("/blogger");
        })
        .catch(err => {
          this.errors.push(err.response.data);
        });
    }
  }
};
</script>