<template>
  <div>
    <Menu />
    <div v-if="posts.length" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 g-4 mt-5 justify-content-center m-auto">
      <PostPreview v-for="post in posts" :key="post.id"
      :title="post.title"
      :image="post.image"
      :likes="post.Likes.length"
      :author="post.author.name"
      :avatar="post.author.avatar"
      :id="post.id" />
    </div>
  </div>
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
</style>

<script>
const usertoken = localStorage.getItem("token");
const Axios = require("axios");
const DB = Axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    authorization: `Bearer ${usertoken}`,
  },
});

import Menu from "../components/Menu.vue";
import PostPreview from "../components/PostPreview.vue";

export default {
  name: "Home",
  components: { Menu, PostPreview },
  data: function () {
    return {
      posts: [],
    };
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      DB.get("posts").then((response) => {
        let data = response.data;
        let requests = [];
        data.forEach((post) => {
          let author = {};
          requests.push(
            DB.post("user", { userId: post.UserId }).then((response) => {
              author.name = response.data.name;
              author.avatar = response.data.avatar;
              post["author"] = author;
            })
          );
        });
        Promise.all(requests).then(() => {
          this.posts = data;
        });
      });
    },
  },
};
</script>