<template>
  <q-item v-ripple>
    <q-item-section>
      <q-item-label>{{ post.title }}</q-item-label>
      <q-item-label caption>Created at {{ post.createdAt }}</q-item-label>
    </q-item-section>
    <q-item-section>
      <q-btn clickable :to="route" label="Edit" color="blue" class="q-mb-sm">
        <q-icon name="edit" />
      </q-btn>

      <q-btn clickable @click="remove(post.idPost, index)" label="Delete" color="red">
        <q-icon name="delete_forever" />
      </q-btn>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "Post",
  data() {
    return {
      route: `/blogger/update/${this.post.idPost}`
    }
  },
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
        this.$axios
          .get(`${url}${id}`)
          .then(data => {
            this.posts.splice(index, 1);
          })
          .catch(console.log);
      }
    }
  }
};
</script>
