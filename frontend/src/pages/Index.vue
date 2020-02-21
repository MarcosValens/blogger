<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <q-infinite-scroll @load="onLoad" :offset="50">
        <div v-for="(post, index) in posts" :key="index" class="caption">{{post}}</div>
        <template v-slot:loading>
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
    }
  },
  methods: {
    onLoad(index, done) {
      etTimeout(() => {
        if (this.posts) {
          this.posts.push("Test", "Test 2", "Test 3", "Test4");
          done();
        }
      }, 2000);
    }
  }
};
</script>
