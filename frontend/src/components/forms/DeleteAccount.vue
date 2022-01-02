<template>
   <div class="modal fade" :id="id" tabindex="-1">
      <div class="modal-dialog">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title">Veuillez confirmer</h5>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
               <p>Etes-vous vraiment sûr(e) de vouloir supprimer votre compte ?</p>
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
               <button type="button" class="btn btn-primary" @click="deleteAccount">Valider</button>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
   import { mapActions } from "vuex";
   import { Modal } from "bootstrap";

   export default {
      props: ["id"],
      methods: {
         ...mapActions(["deleteProfile"]),
         //Envoie une requête d'update d'un post au store
         deleteAccount() {
            let form = document.getElementById(this.$props.id);
            let formModal = Modal.getInstance(form);
            formModal.hide();
            this.deleteProfile();
         },
      },
   };
</script>
