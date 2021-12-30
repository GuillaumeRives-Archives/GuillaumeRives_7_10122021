<template>
   <div class="modal" :id="id" tabindex="-1" :aria-labelledby="id + 'Label'" aria-hidden="true">
      <div class="modal-dialog">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title" :id="id + 'Label'">Partagez du contenu !</h5>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form>
               <div class="modal-body">
                  <input v-model="Post.title" class="form-control" placeholder="Titre" type="text" name="mediaTitle" required />
                  <textarea v-model="Post.description" class="form-control mt-3" name="mediaDescription" placeholder="Description" cols="30" rows="5" required></textarea>
                  <div v-if="Server.serverResponseMessage !== ''" class="alert mt-3 mb-0" :class="Server.serverResponseType">
                     <i class="bi bi-exclamation-triangle-fill"></i> {{ Server.serverResponseMessage }}
                  </div>
               </div>
               <div class="modal-footer">
                  <button @click.prevent="update" type="submit" class="btn btn-primary">Partagez !</button>
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
   import { mapActions, mapMutations } from "vuex";
   import { Modal } from "bootstrap";

   export default {
      props: ["id"],
      data() {
         return {
            interval: null,
         };
      },
      computed: {
         Global() {
            return this.$store.state.global;
         },
         Server() {
            return this.$store.state.server;
         },
         Post() {
            return this.$store.state.postView.post;
         },
      },
      methods: {
         ...mapActions(["updatePost"]),
         ...mapMutations(["decreaseTimeToRedirect", "updateServerResponse"]),
         //Envoie une requête d'update d'un post au store
         update() {
            const payload = {
               id: this.Post.id,
               title: this.Post.title,
               description: this.Post.description,
            };
            this.updatePost(payload);
            setTimeout(() => this.redirectToPost(this.$route.params.id), this.Global.timeToRedirection * 1000);
            this.interval = setInterval(() => this.changeAlertTimeToRedirection(), 1000);
         },

         changeAlertTimeToRedirection() {
            this.decreaseTimeToRedirect();
            let data = {
               type: "alert-success",
               message: `Votre partage a bien été publié ! Vous serez redirigé(e) dans ${this.Global.timeToRedirection} secondes.`,
            };
            this.updateServerResponse(data);
         },

         redirectToPost(id) {
            clearInterval(this.interval);
            let form = document.getElementById(this.$props.id);
            let formModal = Modal.getInstance(form);
            formModal.hide();
            this.updateServerResponse({ type: "", message: "" });
            this.$router.push(`/post/${id}`);
         },
      },
   };
</script>
