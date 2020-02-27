<template>
  <q-item v-ripple>
    <q-item-section>
      <q-item-label>{{ post.title }}</q-item-label>
      <q-item-label caption>
          Written on {{ post.originalLanguage }}. 
          Translated to {{ post.translatedLanguage }}.
          Created at {{ post.createdAt }} </q-item-label>
    
    </q-item-section>
    <q-item-section>
      <q-chip icon="edit" clickable>Edit post</q-chip>
    </q-item-section>
    <q-item-section>
      <q-chip icon="delete_forever" clickable @click="remove(post.idPost, index)">Delete post</q-chip>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "Post",
  props: {
    post: {
      type: Object,
      required: true
    },

    index: {
      type: Number,
      required: true
    }

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
