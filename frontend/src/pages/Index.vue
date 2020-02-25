<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <q-list bordered>
        <q-item v-ripple v-for="(post, index) in posts" :key="post.idPost">
          <q-item-section>
            <q-item-label>{{ post.title }}</q-item-label>
            <q-item-label
              caption
            >Written on {{ post.originalLanguage }}. Translated to {{ post.translatedLanguage }}</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-chip icon="edit" clickable>Edit post</q-chip>
          </q-item-section>
          <q-item-section>
            <q-chip icon="delete_forever" clickable @click="remove(post.idPost, index)">Delete post </q-chip>
            
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
// Post content to display: Title, orig language, translated language, edit / delete button
export default {
  name: "AllPosts",
  data() {
    return {
      posts: [],
      removePost: false
    };
  },
  created() {
    const url = "http://172.16.3.75:8080/posts/all";
    this.$axios.get(url).then(({ data }) => {
      console.log(data[0]);
      this.posts = data;
    });
  },
  methods: {
    remove(id, index) {
      const url = "http://172.16.3.75:8080/posts/deletePost/";
      // TODO: Make this be a dialog
      const toDelete = confirm("Are you sure you want to delete the post?");
      if (toDelete) {
        this.$axios.get(`${url}${id}`).then(data => {
          this.posts.splice(index, 1);
        }).catch(console.log);
      }
    }
  }
};
</script>
