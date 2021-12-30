<template>
   <main class="d-flex flex-column">
      <Menu />
      <MenuSpacer />
      <Loader class="m-auto" v-if="Global.isLoading" />
      <section v-else class="flex-fill container">
         <ErrorBlock
            v-if="!Post"
            class="m-auto"
            :title="'Oh non !'"
            :message="'Il semblerait que ce post n\'existe pas !'"
            :emoji="'😟'"
            :enableCta="true"
            :ctaDest="'/'"
            :ctaTitle="'Explorez le contenu de la communauté !'"
         />
         <span class="recall-container">
            <img class="recall-background" :src="Post.image" :alt="Post.title" />
            <div class="recall-filter"></div>
         </span>
         <div v-if="Post" class="m-auto col col-sm-10 col-md-7 col-lg-6 col-xl-5 col-xxl-4">
            <article v-if="Post" class="post shadow-lg p-3 mt-4">
               <div class="d-flex align-items-center justify-content-between mt-2">
                  <span class="text-start fs-5"><img class="avatar" :src="Post.User.avatar" :alt="Post.User.name" width="48" height="48" /> {{ Post.User.name }}</span>
                  <span class="text-muted fst-italic text-end mb-1">{{ PostView.postCreationDate }}</span>
               </div>
               <img class="mt-3 w-100" :src="Post.image" :alt="Post.title" />
               <div class="d-flex flex-column">
                  <div class="d-flex align-items-center justify-content-between mt-2 mb-2">
                     <h1 class="fs-4">{{ Post.title }}</h1>
                     <span class="d-flex align-items-center justify-content-between">
                        <a href="" @click.prevent="" target="_blank"><i class="bi bi-heart-fill liked fs-5"></i></a>
                        <span class="nb-likes ms-1">{{ Post.Likes.length }}</span>
                     </span>
                  </div>
                  <p class="description">{{ Post.description }}</p>
                  <span v-if="Viewer.userId === Post.User.id || Viewer.isadmin" class="d-flex align-items-center justify-content-end tools">
                     <i class="bi bi-pencil-square me-2 fs-5" title="Modifier" data-bs-toggle="modal" data-bs-target="#UpdateMedia"></i>
                     <i class="bi bi-trash-fill fs-5" title="Supprimer" data-bs-toggle="modal" data-bs-target="#DeleteMedia"></i>
                  </span>
               </div>
            </article>
         </div>
      </section>
      <UpdateMedia v-if="!Global.isLoading" :id="'UpdateMedia'" />
      <DeleteMedia v-if="!Global.isLoading" :id="'DeleteMedia'" />
      <Footer />
   </main>
</template>

<style lang="scss">
   .recall-container {
      position: fixed;
      z-index: 0;
      top: 60px;
      left: 0;
      width: 100%;
      height: 350px;
      & > .recall-background {
         position: relative;
         z-index: 1;
         width: 100%;
         height: 100%;
         object-fit: cover;
      }
      & > .recall-filter {
         position: relative;
         z-index: 2;
         top: -350px;
         width: 100%;
         height: 100%;
         backdrop-filter: blur(20px);
         background: linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 90%);
      }
   }

   .post {
      position: relative;
      z-index: 3;
      text-align: center;
      background: white;
      border-radius: 10px;
      margin-top: 50px;
      & > img {
         border-radius: 10px;
      }
   }

   .liked {
      color: red;
   }

   .tools > i {
      color: gray;
      &:hover {
         cursor: pointer;
         color: #fd2d01;
      }
   }

   .avatar {
      border-radius: 24px;
   }

   .description {
      text-align: justify;
   }
</style>

<script>
   import Menu from "../components/menus/Menu.vue";
   import MenuSpacer from "../components/menus/MenuSpacer.vue";
   import Loader from "../components/utils/loader.vue";
   import ErrorBlock from "../components/utils/errorBlock.vue";
   import UpdateMedia from "../components/forms/UpdateMedia.vue";
   import DeleteMedia from "../components/forms/DeleteMedia.vue";
   import Footer from "../components/menus/Footer.vue";
   import { mapActions } from "vuex";

   export default {
      name: "Post",
      components: { Menu, MenuSpacer, Loader, ErrorBlock, UpdateMedia, DeleteMedia, Footer },
      methods: mapActions(["loadPost"]),
      computed: {
         Global() {
            return this.$store.state.global;
         },
         PostView() {
            return this.$store.state.postView;
         },
         Post() {
            return this.$store.state.postView.post;
         },
         Viewer() {
            return this.$store.state.postView.viewer;
         },
      },
      created() {
         this.loadPost(this.$route.params.id);
      },
   };
</script>
