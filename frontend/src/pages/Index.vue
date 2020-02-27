<template>
  <q-page class>
    <q-drawer side="left" bordered>
      <!-- drawer content -->
      <q-input label="Search" v-model="text" @input="filterPosts" class="q-ma-sm" />
      <q-scroll-area class="fit">
        <q-list v-for="(post, index) in postsCopy" :key="post.idPost">
          <Post :post="post" :index="index" @click.native="setPost(post)" class="q-ma-sm" />
          <q-separator />
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <div>
      <div class="text-center">
        <div v-if="!postsCopy.length">
          <h2>
            No posts available
            <q-btn
              color="blue"
              size="lg"
              class="full-width"
              label="Create a new Post!"
              @click="call('create')"
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
      posts: [
        {
          title: "Hello",
          idPost: 1,
          translatedLanguage: "Spanish",
          originalLanguage: "English",
          createdAt: new Date(),
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed ipsum lacinia, tincidunt turpis id, faucibus neque. Fusce tincidunt in libero vel ornare. Aliquam id turpis pretium, venenatis tortor ut, accumsan metus. Proin dapibus laoreet nibh, et hendrerit risus dapibus ut. In nulla libero, luctus non maximus at, facilisis vel justo. Ut massa urna, hendrerit sit amet sollicitudin non, efficitur vel nulla. Sed sed tortor vel ex tempus scelerisque. Praesent id rutrum massa, non laoreet urna. Vivamus vel sapien nec arcu finibus ullamcorper. Sed eu venenatis turpis. Nullam at enim volutpat, facilisis dolor sit amet, interdum nulla. Sed eget quam vitae felis cursus feugiat quis sed urna. Aenean commodo, metus non pretium posuere, nisi nisi pellentesque lectus, in dapibus urna felis a nisl. Donec facilisis tellus ac feugiat feugiat. Phasellus et sollicitudin massa, ac viverra lorem. Suspendisse vel tristique dolor.

Nunc imperdiet urna fringilla enim mattis ullamcorper id at neque. Aliquam nibh est, efficitur sit amet massa at, varius congue orci. Fusce rutrum purus semper lectus molestie, non scelerisque metus tincidunt. Vestibulum bibendum iaculis mollis. Nulla facilisi. Fusce at varius sapien. Duis vulputate viverra venenatis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nunc quis lorem enim. Suspendisse scelerisque a massa eget dictum. Nam pretium molestie dictum. In hac habitasse platea dictumst. Aenean ut tortor vel enim accumsan fermentum.

Nullam eget scelerisque nisl, a pharetra sem. Curabitur placerat consectetur justo, vel eleifend nibh lobortis id. Mauris efficitur consequat magna, id convallis sapien varius et. Phasellus aliquet a eros et semper. Aliquam volutpat, nisl in tincidunt ornare, nisi turpis venenatis risus, ut consequat magna quam ac quam. Phasellus consectetur nisi nec metus vehicula laoreet. Quisque non purus a purus auctor volutpat. Nullam placerat augue quis risus dictum, in feugiat ligula facilisis. Quisque dignissim interdum fringilla.

Etiam vehicula ligula ante, vitae dignissim enim varius ac. Curabitur et elit eu lorem lacinia venenatis rutrum porttitor elit. Integer velit nulla, maximus at tincidunt mollis, porttitor non enim. Duis varius ullamcorper massa, id luctus odio maximus et. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc sit amet viverra ipsum. Etiam ullamcorper eget velit sed vehicula. Proin vitae vehicula nisl. Duis dignissim laoreet justo, a egestas risus interdum vel. Mauris quis urna quam. Sed faucibus sollicitudin viverra. Vivamus sed mauris in diam euismod egestas.

Curabitur gravida odio nec laoreet pellentesque. Suspendisse potenti. In ex purus, scelerisque in elit vitae, molestie fringilla tellus. Praesent accumsan tincidunt molestie. Pellentesque ut enim rhoncus, faucibus leo quis, mattis erat. Quisque accumsan sem vel dui pretium ultricies. Ut eget ex magna. Aenean ac elit vehicula, porttitor purus quis, imperdiet ligula.`
        },
        {
          title: "Hello World",
          idPost: 2,
          translatedLanguage: "Spanish",
          originalLanguage: "English",
          createdAt: new Date(),
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed ipsum lacinia, tincidunt turpis id, faucibus neque. Fusce tincidunt in libero vel ornare. Aliquam id turpis pretium, venenatis tortor ut, accumsan metus. Proin dapibus laoreet nibh, et hendrerit risus dapibus ut. In nulla libero, luctus non maximus at, facilisis vel justo. Ut massa urna, hendrerit sit amet sollicitudin non, efficitur vel nulla. Sed sed tortor vel ex tempus scelerisque. Praesent id rutrum massa, non laoreet urna. Vivamus vel sapien nec arcu finibus ullamcorper. Sed eu venenatis turpis. Nullam at enim volutpat, facilisis dolor sit amet, interdum nulla. Sed eget quam vitae felis cursus feugiat quis sed urna. Aenean commodo, metus non pretium posuere, nisi nisi pellentesque lectus, in dapibus urna felis a nisl. Donec facilisis tellus ac feugiat feugiat. Phasellus et sollicitudin massa, ac viverra lorem. Suspendisse vel tristique dolor.

Nunc imperdiet urna fringilla enim mattis ullamcorper id at neque. Aliquam nibh est, efficitur sit amet massa at, varius congue orci. Fusce rutrum purus semper lectus molestie, non scelerisque metus tincidunt. Vestibulum bibendum iaculis mollis. Nulla facilisi. Fusce at varius sapien. Duis vulputate viverra venenatis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nunc quis lorem enim. Suspendisse scelerisque a massa eget dictum. Nam pretium molestie dictum. In hac habitasse platea dictumst. Aenean ut tortor vel enim accumsan fermentum.

Nullam eget scelerisque nisl, a pharetra sem. Curabitur placerat consectetur justo, vel eleifend nibh lobortis id. Mauris efficitur consequat magna, id convallis sapien varius et. Phasellus aliquet a eros et semper. Aliquam volutpat, nisl in tincidunt ornare, nisi turpis venenatis risus, ut consequat magna quam ac quam. Phasellus consectetur nisi nec metus vehicula laoreet. Quisque non purus a purus auctor volutpat. Nullam placerat augue quis risus dictum, in feugiat ligula facilisis. Quisque dignissim interdum fringilla.

Etiam vehicula ligula ante, vitae dignissim enim varius ac. Curabitur et elit eu lorem lacinia venenatis rutrum porttitor elit. Integer velit nulla, maximus at tincidunt mollis, porttitor non enim. Duis varius ullamcorper massa, id luctus odio maximus et. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc sit amet viverra ipsum. Etiam ullamcorper eget velit sed vehicula. Proin vitae vehicula nisl. Duis dignissim laoreet justo, a egestas risus interdum vel. Mauris quis urna quam. Sed faucibus sollicitudin viverra. Vivamus sed mauris in diam euismod egestas.

Curabitur gravida odio nec laoreet pellentesque. Suspendisse potenti. In ex purus, scelerisque in elit vitae, molestie fringilla tellus. Praesent accumsan tincidunt molestie. Pellentesque ut enim rhoncus, faucibus leo quis, mattis erat. Quisque accumsan sem vel dui pretium ultricies. Ut eget ex magna. Aenean ac elit vehicula, porttitor purus quis, imperdiet ligula.`
        }
      ],
      postsCopy: [
        {
          title: "Hello",
          idPost: 1,
          translatedLanguage: "Spanish",
          originalLanguage: "English",
          createdAt: new Date(),
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed ipsum lacinia, tincidunt turpis id, faucibus neque. Fusce tincidunt in libero vel ornare. Aliquam id turpis pretium, venenatis tortor ut, accumsan metus. Proin dapibus laoreet nibh, et hendrerit risus dapibus ut. In nulla libero, luctus non maximus at, facilisis vel justo. Ut massa urna, hendrerit sit amet sollicitudin non, efficitur vel nulla. Sed sed tortor vel ex tempus scelerisque. Praesent id rutrum massa, non laoreet urna. Vivamus vel sapien nec arcu finibus ullamcorper. Sed eu venenatis turpis. Nullam at enim volutpat, facilisis dolor sit amet, interdum nulla. Sed eget quam vitae felis cursus feugiat quis sed urna. Aenean commodo, metus non pretium posuere, nisi nisi pellentesque lectus, in dapibus urna felis a nisl. Donec facilisis tellus ac feugiat feugiat. Phasellus et sollicitudin massa, ac viverra lorem. Suspendisse vel tristique dolor.

Nunc imperdiet urna fringilla enim mattis ullamcorper id at neque. Aliquam nibh est, efficitur sit amet massa at, varius congue orci. Fusce rutrum purus semper lectus molestie, non scelerisque metus tincidunt. Vestibulum bibendum iaculis mollis. Nulla facilisi. Fusce at varius sapien. Duis vulputate viverra venenatis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nunc quis lorem enim. Suspendisse scelerisque a massa eget dictum. Nam pretium molestie dictum. In hac habitasse platea dictumst. Aenean ut tortor vel enim accumsan fermentum.

Nullam eget scelerisque nisl, a pharetra sem. Curabitur placerat consectetur justo, vel eleifend nibh lobortis id. Mauris efficitur consequat magna, id convallis sapien varius et. Phasellus aliquet a eros et semper. Aliquam volutpat, nisl in tincidunt ornare, nisi turpis venenatis risus, ut consequat magna quam ac quam. Phasellus consectetur nisi nec metus vehicula laoreet. Quisque non purus a purus auctor volutpat. Nullam placerat augue quis risus dictum, in feugiat ligula facilisis. Quisque dignissim interdum fringilla.

Etiam vehicula ligula ante, vitae dignissim enim varius ac. Curabitur et elit eu lorem lacinia venenatis rutrum porttitor elit. Integer velit nulla, maximus at tincidunt mollis, porttitor non enim. Duis varius ullamcorper massa, id luctus odio maximus et. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc sit amet viverra ipsum. Etiam ullamcorper eget velit sed vehicula. Proin vitae vehicula nisl. Duis dignissim laoreet justo, a egestas risus interdum vel. Mauris quis urna quam. Sed faucibus sollicitudin viverra. Vivamus sed mauris in diam euismod egestas.

Curabitur gravida odio nec laoreet pellentesque. Suspendisse potenti. In ex purus, scelerisque in elit vitae, molestie fringilla tellus. Praesent accumsan tincidunt molestie. Pellentesque ut enim rhoncus, faucibus leo quis, mattis erat. Quisque accumsan sem vel dui pretium ultricies. Ut eget ex magna. Aenean ac elit vehicula, porttitor purus quis, imperdiet ligula.`
        },
        {
          title: "Hello World",
          idPost: 2,
          translatedLanguage: "Spanish",
          originalLanguage: "English",
          createdAt: new Date(),
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed ipsum lacinia, tincidunt turpis id, faucibus neque. Fusce tincidunt in libero vel ornare. Aliquam id turpis pretium, venenatis tortor ut, accumsan metus. Proin dapibus laoreet nibh, et hendrerit risus dapibus ut. In nulla libero, luctus non maximus at, facilisis vel justo. Ut massa urna, hendrerit sit amet sollicitudin non, efficitur vel nulla. Sed sed tortor vel ex tempus scelerisque. Praesent id rutrum massa, non laoreet urna. Vivamus vel sapien nec arcu finibus ullamcorper. Sed eu venenatis turpis. Nullam at enim volutpat, facilisis dolor sit amet, interdum nulla. Sed eget quam vitae felis cursus feugiat quis sed urna. Aenean commodo, metus non pretium posuere, nisi nisi pellentesque lectus, in dapibus urna felis a nisl. Donec facilisis tellus ac feugiat feugiat. Phasellus et sollicitudin massa, ac viverra lorem. Suspendisse vel tristique dolor.

Nunc imperdiet urna fringilla enim mattis ullamcorper id at neque. Aliquam nibh est, efficitur sit amet massa at, varius congue orci. Fusce rutrum purus semper lectus molestie, non scelerisque metus tincidunt. Vestibulum bibendum iaculis mollis. Nulla facilisi. Fusce at varius sapien. Duis vulputate viverra venenatis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nunc quis lorem enim. Suspendisse scelerisque a massa eget dictum. Nam pretium molestie dictum. In hac habitasse platea dictumst. Aenean ut tortor vel enim accumsan fermentum.

Nullam eget scelerisque nisl, a pharetra sem. Curabitur placerat consectetur justo, vel eleifend nibh lobortis id. Mauris efficitur consequat magna, id convallis sapien varius et. Phasellus aliquet a eros et semper. Aliquam volutpat, nisl in tincidunt ornare, nisi turpis venenatis risus, ut consequat magna quam ac quam. Phasellus consectetur nisi nec metus vehicula laoreet. Quisque non purus a purus auctor volutpat. Nullam placerat augue quis risus dictum, in feugiat ligula facilisis. Quisque dignissim interdum fringilla.

Etiam vehicula ligula ante, vitae dignissim enim varius ac. Curabitur et elit eu lorem lacinia venenatis rutrum porttitor elit. Integer velit nulla, maximus at tincidunt mollis, porttitor non enim. Duis varius ullamcorper massa, id luctus odio maximus et. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc sit amet viverra ipsum. Etiam ullamcorper eget velit sed vehicula. Proin vitae vehicula nisl. Duis dignissim laoreet justo, a egestas risus interdum vel. Mauris quis urna quam. Sed faucibus sollicitudin viverra. Vivamus sed mauris in diam euismod egestas.

Curabitur gravida odio nec laoreet pellentesque. Suspendisse potenti. In ex purus, scelerisque in elit vitae, molestie fringilla tellus. Praesent accumsan tincidunt molestie. Pellentesque ut enim rhoncus, faucibus leo quis, mattis erat. Quisque accumsan sem vel dui pretium ultricies. Ut eget ex magna. Aenean ac elit vehicula, porttitor purus quis, imperdiet ligula.`
        }
      ],
      text: "",
      selectedPost: null
    };
  },
  methods: {
    call(route) {
      this.$router.replace(`/blogger/${route}`);
    },
    filterPosts() {
      const regex = new RegExp(this.text, "gi");
      this.postsCopy = this.posts.filter(({ title }) => title.match(regex));
    },
    setPost(post) {
      this.selectedPost = post;
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
