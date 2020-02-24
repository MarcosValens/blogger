<template>
  <q-page class="flex flex-center">
    
    <div class="q-pa-md">
      <q-list bordered>
        <q-item v-ripple v-for="post in posts" :key="post.id">
          <q-item-section>
            <q-item-label>{{ post.title }}</q-item-label>
            <q-item-label caption>Written on {{ post.origLanguage }}. Translated to {{ post.dstLanguage }}</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-chip icon="edit" clickable="true">Edit post</q-chip>
          </q-item-section>
          <q-item-section>
            <q-chip icon="delete_forever" clickable="true">Delete post</q-chip>
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
  props: {
    posts: {
      type: Array,
      default: () => [
        {
          id: 1,
          title: "Title number 1",
          origLanguage: "Spanish",
          dstLanguage: "Afrikaans"
        },
        {
          id: 2,
          title: "Title number 2",
          origLanguage: "English",
          dstLanguage: "Russian"
        },
        {
          id: 3,
          title: "Title number 3",
          origLanguage: "Catalan",
          dstLanguage: "Nibberian"
        }
      ]
    },
    user: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    onLoad(index, done) {}
  }
};
</script>
