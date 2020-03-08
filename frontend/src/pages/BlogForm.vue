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
                  @input.native="changeLanguages"
                />
                <q-btn round color="primary" icon="mic" @click="startRecordingAudio()" />
                <q-btn round v-if="recording" color="primary" icon="stop" id="stopRecording" />

                <q-input
                  @input="handleInput(false)"
                  square
                  filled
                  clearable
                  v-model="content.original"
                  type="textarea"
                  label="Content"
                />
                <q-input type="hidden" v-model="idPost" />
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
                  @input.native="changeLanguages"
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
      idPost: "",
      title: {
        original: "",
        translated: ""
      },
      content: {
        original: "",
        translated: ""
      },
      recording: "",
      chunks: []
    };
  },
  async created() {
    this.$axios
      .get(`${process.env.JAVA_ENDPOINT}/all`)
      .then()
      .catch(error => {
        if (error.response.status === 401) {
          this.$router.push("/login");
        }
      });
    const idPost = this.$route.params.id;
    const languages = await this.loadLanguages(post);
    const post = await this.getPost(idPost);

    if (post) {
      this.idPost = idPost;
      this.setPost(post, languages);
    }
    this.languages = languages;
  },
  methods: {
    async changeLanguages() {
      console.log("Changing");
      await this.handleInput(false);
      await this.handleInput(true);
    },
    setPost(post, languages) {
      this.title.translated = post.translatedTitle;
      this.title.original = post.title;
      this.content.translated = post.translatedContent;
      this.content.original = post.content;
      const labels = {
        dst: languages.find(({ value }) => value === post.originalLanguage),
        trs: languages.find(({ value }) => value === post.translatedLanguage)
      };
      this.dstLanguage = {
        label: labels.dst.label,
        value: post.originalLanguage
      };
      this.translatedLanguage = {
        label: labels.trs.label,
        value: post.translatedLanguage
      };
    },
    async loadLanguages() {
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
      if (!id) return null;
      try {
        const response = await this.$axios.get(
          `${process.env.JAVA_ENDPOINT}/get/${id}`
        );
        return response.data;
      } catch (error) {
        return null;
      }
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
      } catch (error) {
        return "";
      }
    },

    async handleInput(isTitle) {
      const textToTranslate = isTitle
        ? this.title.original
        : this.content.original;
      if (!this.canTranslate()) {
        return this.setText(textToTranslate, isTitle);
      }
      const text = await this.translate(textToTranslate);
      this.setText(text, isTitle);
    },

    canTranslate() {
      return (
        this.translatedLanguage.value &&
        this.dstLanguage.value &&
        this.translatedLanguage.value !== this.dstLanguage.value
      );
    },

    setText(text, isTitle) {
      if (isTitle) {
        this.title.translated = text;
      } else {
        this.content.translated = text;
      }
    },

    async changeLanguages() {},
    send() {
      const title = this.title.original;
      const content = this.content.original;
      const originalLanguage = this.dstLanguage.value;

      const translatedTitle = this.title.translated;
      const translatedContent = this.content.translated;
      const translatedLanguage = this.translatedLanguage.value;
      const idPost = this.idPost;
      const data = {
        title,
        content,
        translatedContent,
        translatedLanguage,
        translatedTitle,
        originalLanguage
      };
      this.errors = [];
      if (idPost) data.idPost = idPost;
      this.$axios
        .post(`${process.env.JAVA_ENDPOINT}/save`, data)
        .then(() => {
          this.$router.replace("/blogger");
        })
        .catch(error => {
          this.errors.push(err.response.data);
        });
    },
    async startRecordingAudio() {
      console.log("Grabando...");
      this.recording = true;
      let userMedia = navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      });

      userMedia.then(mediaStream => {
        let mediaRecorder = new MediaRecorder(mediaStream);
        mediaRecorder.start();

        document.querySelector("#stopRecording").onclick = () => {
          mediaRecorder.stop();
        };

        (mediaRecorder.onstop = async () => {
          let audio = document.createElement("audio");
          audio.controls = true;
          const blob = new Blob(this.chunks, {
            type: "audio/ogg; codecs=opus"
          });

          let formData = new FormData();

          formData.append("arxiu", blob);
          formData.append("MethodName", "transcribe_sync");
          formData.append("params", "{}");

          let audioTranscripcion = await fetch(
            "http://server247.cfgs.esliceu.net/bloggeri18n/blogger.php",
            {
              method: "POST",
              body: formData
            }
          );
          let audioTranscripcionJSON = await audioTranscripcion.json();

          if (audioTranscripcionJSON[0].confianca > 0.7) {
            alert("Traduccion por voz realizada.");
            const transcripcion = audioTranscripcionJSON[0].transcripcio;
            const texto = await this.translate(transcripcion);
            this.content.translated = texto;
            this.content.original = transcripcion;
          }
        }),
          (mediaRecorder.ondataavailable = e => {
            this.chunks.push(e.data);
          });
      }),
        userMedia.catch(function(err) {
          console.log(err.name);
        });
    }
  }
};
</script>