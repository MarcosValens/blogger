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
      console.log(index)
      // TODO: Make this be a dialog
      const toDelete = confirm("Are you sure you want to delete the post?");
      if (toDelete) {
        this.$axios
          .post(`${process.env.JAVA_ENDPOINT}/deletePost/${id}`)
          .then(data => {
            this.$router.go();
          })
          .catch(err => {
            alert("Could not delete post")
          });
      }
    }
  }
};
</script>
