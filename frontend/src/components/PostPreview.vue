<template>
  <a :href="`post/${id}`">
    <div class="card m-2 shadow">
      <img :src="image" :alt="title">
      <span class="author-container">
        <img class="avatar" :src="avatar" :alt="author" width="40" height="40"> {{author}}
      </span>
      <span class="likes-container">
        <i class="bi bi-heart-fill"></i> {{likes}}
      </span>
      <div class="text-white card-info">
        <div class="card-title text-center">{{title}}</div>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  props: ["title", "image", "likes", "author", "avatar", "id"],
};
</script>