<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" @click="addData">
      <q-infinite-scroll @load="onLoad" :offset="50">
        <div v-for="(post, index) in posts" :key="index" class="caption">{{post}}</div>
        <template v-if="loading">
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "AllPosts",
  props: {
    posts: {
      type: Array,
      default: () => ["Test", "Test 2", "Test 3", "Test4"]
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
<<<<<<< HEAD
    onLoad(index, done) {},
    addData() {
      this.loading = true;
      setTimeout(_ => {
        this.posts.push("Post x");
        this.loading = false;
      }, 1000);
=======
    onLoad(index, done) {
      setTimeout(() => {
        if (this.posts) {
          this.posts.push("Test", "Test 2", "Test 3", "Test4");
          done();
        }
      }, 2000);
>>>>>>> 669be0ed78022d7a831ef1881f4dce6dd0bad3f1
    }
  }
};
</script>
