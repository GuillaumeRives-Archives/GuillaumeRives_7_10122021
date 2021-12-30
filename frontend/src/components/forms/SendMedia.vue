<template>
   <div class="modal" :id="id" tabindex="-1" data-bs-backdrop="static" :aria-labelledby="id + 'Label'" aria-hidden="true">
      <div class="modal-dialog">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title" :id="id + 'Label'">Partagez du contenu !</h5>
               <button v-if="!Global.isLoading" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form>
               <div class="modal-body">
                  <input v-model="title" class="form-control" placeholder="Titre" type="text" name="mediaTitle" required />
                  <input ref="mediaFile" class="form-control mt-3" placeholder="Votre image" type="file" name="mediaFile" required />
                  <textarea v-model="description" class="form-control mt-3" name="mediaDescription" placeholder="Description" cols="30" rows="5" required></textarea>
                  <div v-if="Server.serverResponseMessage !== ''" class="alert mt-3 mb-0" :class="Server.serverResponseType">
                     <i class="bi bi-exclamation-triangle-fill"></i> {{ Server.serverResponseMessage }}
                  </div>
                  <div v-if="Global.isLoading" class="text-center mt-3">
                     <Loader />
                  </div>
               </div>
               <div class="modal-footer" v-if="!Global.isLoading">
                  <button @click.prevent="create" type="submit" class="btn btn-primary">Partagez !</button>
               </div>
            </form>
         </div>
      </div>
   </div>
</template>

<style lang="scss">
   .modal {
      backdrop-filter: blur(50px);
   }
</style>

<script>
   import Loader from "../../components/utils/miniLoader.vue";
   import { mapActions, mapMutations } from "vuex";
   import { Modal } from "bootstrap";

   export default {
      props: ["id"],
      components: { Loader },
      data() {
         return {
            title: null,
            description: null,
         };
      },

      updated() {
         if (this.Store.createdPost) {
            this.redirectToPost(this.Store.createdPost);
         }
      },

      computed: {
         Global() {
            return this.$store.state.global;
         },
         Store() {
            return this.$store.state;
         },
         Server() {
            return this.$store.state.server;
         },
         PostView() {
            return this.$store.state.postView;
         },
      },

      methods: {
         ...mapActions(["createPost"]),
         ...mapMutations(["updateServerResponse", "resetCreatedPost"]),
         create() {
            let data = {
               file: this.$refs.mediaFile.files[0],
               title: this.title,
               description: this.description,
            };
            this.createPost(data);
            let message = {
               type: "alert-success",
               message: `Votre partage a bien été publié ! Veuillez patienter le temps que nous vous redirigions...`,
            };
            this.updateServerResponse(message);
         },

         redirectToPost(id) {
            this.resetCreatedPost();
            let form = document.getElementById(this.$props.id);
            let formModal = Modal.getInstance(form);
            formModal.hide();
            this.updateServerResponse({ type: "", message: "" });
            this.$router.push(`/post/${id}`);
         },
      },
   };
</script>
