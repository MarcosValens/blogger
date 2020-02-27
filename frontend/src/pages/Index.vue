<template>
  <q-page class="flex">
    <q-drawer show-if-above side="left" bordered>
      <!-- drawer content -->
    </q-drawer>
    <div class="q-pa-md flex-center">
      <q-input label="Search" v-model="text" @input="filterPosts" class="q-mb-lg" />

      <div v-if="!postsCopy.length">
        <h1>
          No posts available
          <q-btn
            color="blue"
            size="lg"
            class="full-width"
            label="Create a new Post!"
            @click="call('create')"
          />
        </h1>
      </div>
      <div v-if="postsCopy.length">
        <q-list bordered>
          <div v-for="(post, index) in postsCopy" :key="post.idPost">
            <Post :post="post" :index="index"></Post>
          </div>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import Post from "./../components/Post";
// Post content to display: Title, orig language, translated language, edit / delete button
export default {
  name: "AllPosts",
  components: {
    Post
  },
  data() {
    return {
      posts: [
        {
          title: "Hello",
          idPost: 1,
          translatedLanguage: "Spanish",
          originalLanguage: "English",
          createdAt: new Date()
        }
      ],
      postsCopy: [
        {
          title: "Hello",
          idPost: 1,
          translatedLanguage: "Spanish",
          originalLanguage: "English",
          createdAt: new Date()
        }
      ],
      text: ""
    };
  },
  methods: {
    call(route) {
      this.$router.replace(`/blogger/${route}`);
    },
    filterPosts() {
      const regex = new RegExp(this.text, "gi");
      this.postsCopy = this.posts.filter(({ title }) => 
        title.match(regex)
      );
    }
  },
  created() {
    const url = "http://172.16.3.75:8080/posts/all";
    this.$axios.get(url).then(({ data }) => {
      console.log(data[0]);
      this.posts = data;
      this.postsCopy = this.posts;
    });
  }
};
</script>
