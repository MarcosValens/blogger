<template>
  <div>
    <div class="row">
      <div class="col">
        <h2 class="text-center">{{ post.title }}</h2>
      </div>
    </div>
    <q-separator />

    <div class="row text-center">
      <div class="col">
        <h6>The post was originally written in: {{ post.originalLanguage }}</h6>
      </div>
      <q-separator vertical />
      <div class="col">
        <h6>The post was translated to: {{ post.translatedLanguage }}</h6>
      </div>
    </div>
    <q-separator />
    <div class="row">
      <div class="col">
        <p class="q-ma-md text-justify">{{ post.content }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col q-ma-md text-weight-light text-center">
        <p>Created at: {{ post.published | format }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Post",
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  filters: {
    format([year, month, day, hours, minutes, seconds]) {
      return `${year}/${month}/${day} - ${hours}:${minutes}:${seconds}`
    }
  }
};
</script>
