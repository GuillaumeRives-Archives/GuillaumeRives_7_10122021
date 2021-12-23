<template>
  <div>
    <main class="d-flex flex-column">
      <Menu />
      <MenuSpacer />
      <section class="container-fluid text-center p-4 cta">
          <p class="fst-italic link-primary">
            Explorez le contenu multimédia partagé par vos collègue dans cette galerie, n'hésitez pas à ouvrir une carte pour en savoir plus !
          </p>
          <div>
            <p class="link-primary fw-bold">Une image vaut mieux que milles mots ? Alors n'hésitez plus !</p>
            <button class="btn btn-primary fw-bold">
              Partagez une image !
            </button>
          </div>
      </section>
      <div v-if="posts.length" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 g-4 mt-1 justify-content-center m-auto">
        <PostPreview v-for="post in posts" :key="post.id"
        :title="post.title"
        :image="post.image"
        :likes="post.Likes.length"
        :author="post.User.name"
        :avatar="post.User.avatar"
        :id="post.id" />
      </div>
      <Footer />
    </main>
  </div>
</template>

<style lang="scss">
main {
  height: 100vh;
}
.cta {
  background: lighten(#fd2d01, 45);
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid darken(rgba(#fd2d01, 0.2), 5);
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
import MenuSpacer from "../components/MenuSpacer.vue";
import PostPreview from "../components/PostPreview.vue";
import Footer from "../components/Footer.vue";
export default {
  name: "Home",
  components: { Menu, MenuSpacer, PostPreview, Footer },
  data: function () {
    return {
      posts: [],
    };
  },

  mounted() {
    this.fetchPosts();
  },

  methods: {
    //Récupération de tous les posts pour leur affichage sur la page d'accueil
    fetchPosts() {
      DB.get("posts").then((response) => {
        this.posts = response.data;
      });
    },
  },
};
</script>