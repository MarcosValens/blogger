<template>
  <q-page class>
    <div class="row">
      <div class="col-4">
        <q-input label="Search" v-model="text" @input="filterPosts" class="q-ma-sm" />
        <q-scroll-area class="fit window-height">
          <q-list v-for="(post, index) in postsCopy" :key="post.idPost">
            <Post :post="post" :index="index" @click.native="setPost(post)" class="q-ma-sm" />
            <q-separator />
          </q-list>
        </q-scroll-area>
      </div>
      <div class="col-8 text-center">
        <div v-if="!postsCopy.length">
          <h2>
            No posts available
            <q-btn
              color="blue"
              size="lg"
              class="full-width"
              label="Create a new Post!"
              to="/blogger/create"
            />
          </h2>
        </div>
        <div v-else-if="!selectedPost" class="text-center">
          <h2>No post selected</h2>
        </div>
        <div v-else>
          <PostDisplay :post="selectedPost" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import Post from "./../components/Post";
import PostDisplay from "./../components/PostDisplay";
// Post content to display: Title, orig language, translated language, edit / delete button
export default {
  name: "AllPosts",
  components: {
    Post,
    PostDisplay
  },
  data() {
    return {
      posts: [],
      postsCopy: [],
      text: "",
      selectedPost: null,
      languages: []
    };
  },
  methods: {
    filterPosts() {
      const regex = new RegExp(this.text, "gi");
      this.postsCopy = this.posts.filter(({ title }) => title.match(regex));
    },
    setPost(post) {
      this.selectedPost = post;
    }
  },
  async created() {
    this.$axios.get(`${process.env.JAVA_ENDPOINT}/all`).then().catch(error => {
      if (error.response.status === 401) {
        this.$router.push("/login")
      }
    })
    const url = `${process.env.JAVA_ENDPOINT}/userPosts`;
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
    this.$axios
      .get(url)
      .then(({ data }) => {
        this.posts = data.map(post => {
          post.originalLanguage = languages.find(
            ({ code }) => code === post.originalLanguage
          ).name;
          post.translatedLanguage = languages.find(
            ({ code }) => code === post.translatedLanguage
          ).name;
          return post;
        });
        this.postsCopy = this.posts;
      });
  },
  mounted() {
    const token = this.$router.currentRoute.query.token;
    if (token) {
      localStorage.setItem("token", token);
    }
  }
};
</script>
