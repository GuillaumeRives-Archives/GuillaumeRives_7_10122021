<template>
   <main class="d-flex flex-column">
      <Menu class="modal-blur" />
      <MenuSpacer />
      <section class="container-fluid text-center p-4 cta modal-blur">
         <p class="fst-italic link-primary">
            Explorez le contenu multimédia partagé par vos collègue dans cette galerie, n'hésitez pas à ouvrir une carte pour en savoir plus !
         </p>
         <div>
            <p class="link-primary fw-bold">Une image vaut mieux que milles mots ? Alors n'hésitez plus !</p>
            <button class="btn btn-primary fw-bold" data-bs-toggle="modal" data-bs-target="#SendMedia">Partagez une image !</button>
         </div>
      </section>
      <SendMedia :id="'SendMedia'" />
      <section v-if="Global.isLoading" class="m-auto modal-blur">
         <Loader />
      </section>
      <section v-else class="flex-fill modal-blur">
         <div v-if="Posts.length" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 g-4 mt-1 justify-content-center m-auto">
            <PostPreview
               v-for="post in Posts"
               :key="post.id"
               :title="post.title"
               :image="post.image"
               :likes="nbLikes(post.Likes)"
               :author="post.User.name"
               :avatar="post.User.avatar"
               :id="post.id"
            />
         </div>
         <div v-else class="d-flex flex-column justify-content-center error-container">
            <ErrorBlock :title="'Oh non !'" :message="'Il semblerait qu\'il n\'y ait pas encore de post !'" :emoji="'😟'" :enableCta="false" />
         </div>
      </section>
      <Footer class="modal-blur" />
   </main>
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
   .error-container {
      height: 100%;
   }
</style>

<script>
   import Menu from "../components/menus/Menu.vue";
   import MenuSpacer from "../components/menus/MenuSpacer.vue";
   import SendMedia from "../components/forms/SendMedia.vue";
   import Loader from "../components/utils/loader.vue";
   import ErrorBlock from "../components/utils/errorBlock.vue";
   import PostPreview from "../components/pages/home/PostPreview.vue";
   import Footer from "../components/menus/Footer.vue";

   import { mapActions } from "vuex";

   export default {
      name: "Home",
      components: { Menu, MenuSpacer, SendMedia, Loader, ErrorBlock, PostPreview, Footer },
      created() {
         this.fetchPosts();
      },

      computed: {
         Global() {
            return this.$store.state.global;
         },
         Posts() {
            return this.$store.state.allPosts;
         },
      },

      methods: {
         ...mapActions(["getAllPosts"]),
         //Récupération de tous les posts pour leur affichage sur la page d'accueil
         fetchPosts() {
            this.getAllPosts();
         },

         //Récupère le nombre de likes
         nbLikes(likes) {
            let count = 0;
            likes.forEach((like) => {
               like.likeState ? count++ : null;
            });
            return count;
         },
      },
   };
</script>
