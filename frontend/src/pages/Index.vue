<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <div v-if="!posts.length">
              
        <h1>No posts available <q-btn color="blue" size="lg" 
          class="full-width" label="Create a new Post!" @click="call('create')" /></h1>
      </div>
      <q-list bordered v-if="posts.length">
        <div v-for="(post, index) in posts" :key="post.idPost">
          <Post :post="post" :index="index"></Post>
        </div>
        
      </q-list>
    </div>
  </q-page>
</template>

<script>
import Post from './../components/Post';
// Post content to display: Title, orig language, translated language, edit / delete button
export default {
  name: "AllPosts",
  components: {
    Post
  },
  data() {
    return {
      posts: [
        {title: "Hello",
        idPost: 1,
        translatedLanguage: "Spanish",
        originalLanguage: "English"}
      ]
    };
  },
  methods: {
    call(route) {
      this.$router.replace(`/blogger/${route}`)
    }

  },
  created() {
    const url = "http://172.16.3.75:8080/posts/all";
    this.$axios.get(url).then(({ data }) => {
      console.log(data[0]);
      this.posts = data;
    });
  }
};
</script>
