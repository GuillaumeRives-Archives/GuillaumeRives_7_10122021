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
                  <input v-model="mediaTitle" class="form-control" placeholder="Titre" type="text" name="mediaTitle" required />
                  <input ref="mediaFile" class="form-control mt-3" placeholder="Votre image" type="file" name="mediaFile" required />
                  <textarea v-model="mediaDescription" class="form-control mt-3" name="mediaDescription" cols="30" rows="5" required></textarea>
                  <div v-if="serverResponse !== ''" class="alert mt-3 mb-0" :class="serverResponseType">
                     <i class="bi bi-exclamation-triangle-fill"></i> {{ serverResponse }}
                  </div>
               </div>
               <div class="modal-footer">
                  <button @click.prevent="sendPost" type="submit" class="btn btn-primary">Partagez !</button>
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
   let usertoken = null;
   let DB = null;
   const Axios = require("axios");

   export default {
      props: ["id"],
      data() {
         return {
            mediaTitle: "",
            mediaFile: null,
            mediaDescription: "",
            serverResponse: "",
            serverResponseType: "",
            timeToRedirection: 5,
         };
      },

      beforeCreate() {
         usertoken = localStorage.getItem("token");
         DB = Axios.create({
            baseURL: "http://localhost:3000/api/",
            headers: {
               authorization: `Bearer ${usertoken}`,
            },
         });
      },

      methods: {
         sendPost() {
            this.mediaFile = this.$refs.mediaFile.files[0];
            const data = new FormData();
            data.append("title", this.mediaTitle);
            data.append("description", this.mediaDescription);
            data.append("image", this.mediaFile);
            DB.post("posts/create", data)
               .then((response) => {
                  this.serverResponseType = "alert-success";
                  this.serverResponse = `Votre partage a bien été publié ! Vous serez redirigé(e) dans ${this.timeToRedirection} secondes.`;
                  setTimeout(() => this.redirectToPost(response.data.postId), this.timeToRedirection * 1000);
                  setInterval(() => this.changeAlertTimeToRedirection(), 1000);
               })
               .catch(() => {
                  this.serverResponseType = "alert-danger";
                  this.serverResponse = "Un problème est survenu lors du traitement de votre requête !";
               });
         },
         changeAlertTimeToRedirection() {
            this.timeToRedirection--;
            this.serverResponse = `Votre partage a bien été publié ! Vous serez redirigé(e) dans ${this.timeToRedirection} secondes.`;
         },
         redirectToPost(id) {
            let postForm = document.getElementById(this.$props.id);
            postForm.remove();
            let postFormBackdrop = document.getElementsByClassName("modal-backdrop");
            postFormBackdrop[0].remove();
            this.$router.push(`/post/${id}`);
         },
      },
   };
</script>
