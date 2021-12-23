<template>
  <a class="col" :href="`post/${id}`">
    <div class="card card-effect">
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

<style lang="scss">
.card {
  border-radius: 10px !important;
  border: none !important;

  & > img {
    border-radius: 10px 10px 14px 14px;
    object-fit: cover;
  }

  & .card-info {
    position: absolute;
    background: rgba(#000, 0.4);
    backdrop-filter: blur(10px);
    text-overflow: ellipsis;
    width: 100%;
    height: 32px;
    line-height: 32px;
    bottom: 0;
    border-radius: 0 0 10px 10px;
  }

  & .likes-container {
    position: absolute;
    top: 0;
    right: 0;
    padding: 2px 8px;
    background: rgba(#000, 0.4);
    backdrop-filter: blur(10px);
    border-radius: 0 10px 0 10px;
    color: white;
  }

  & .author-container {
    position: absolute;
    top: 0;
    left: 0;
    color: white;
    padding: 8px;
    text-shadow: 0 0 8px rgba(0, 0, 0, 1);

    & .avatar {
      border-radius: 20px;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
    }
  }
}
.card-effect {
  position: relative;
  top: 0;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  &:hover {
    top: 15px;
    box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.5);
  }
}
</style>

<script>
export default {
  props: ["title", "image", "likes", "author", "avatar", "id"],
};
</script>