<template>
   <main class="d-flex flex-column">
      <Menu class="modal-blur" />
      <MenuSpacer />
      <DeleteAccount :id="'DeleteAccountModal'" />
      <section class="m-auto modal-blur">
         <div v-if="Global.isLoading">
            <Loader />
         </div>
         <div v-else class="container text-center">
            <img class="m-3 avatar shadow" :src="Profile.avatar" alt="Votre image de profil" width="100" height="100" />
            <h1>Bonjour, {{ Profile.username }}</h1>
            <span class="badge bg-danger fs-6 mt-3" v-if="Profile.admin">Administrateur</span>
            <p class="link-primary fst-italic mb-4 mt-4">
               C'est ici que vous avez la possibilité de démontrer à vos collègues votre originalité en changeant votre image de profil et votre pseudonyme !
            </p>
            <div class="row g-3">
               <div class="col-12 col-lg-6">
                  <section class="border rounded shadow-sm p-3 bg-white">
                     <h5 class="link-primary">Modifiez votre image de profil</h5>
                     <p>Votre image de profil ne vous plait plus ? Changez-en !</p>
                     <form>
                        <div class="input-group mt-3 mb-3">
                           <input ref="mediaFile" class="form-control" placeholder="Votre image" type="file" name="mediaFile" required />
                           <button @click.prevent="updateAvatar" type="submit" class="btn btn-primary">Mettre à jour</button>
                        </div>
                     </form>
                     <p class="text-muted fst-italic">Votre image de profil doit être au formats .jpg et .png, elle sera automatiquement retaillée à 100 pixels.</p>
                     <div v-if="avatarMessage !== ''" class="alert alert-warning mt-3 mb-0"><i class="bi bi-exclamation-triangle-fill"></i> {{ avatarMessage }}</div>
                  </section>
               </div>
               <div class="col-12 col-lg-6">
                  <section class="border rounded shadow-sm p-3 bg-white">
                     <h5 class="link-primary">Modifiez votre pseudonyme</h5>
                     <p>Modifiez votre pseudonyme dans cette section !</p>
                     <form action="#">
                        <div class="input-group mt-3 mb-3">
                           <input ref="username" class="form-control" placeholder="Votre pseudonyme" type="text" name="username" required />
                           <button @click.prevent="updateUsername" type="submit" class="btn btn-primary">Mettre à jour</button>
                        </div>
                     </form>
                     <p class="text-muted fst-italic">
                        Votre pseudo doit respecter <router-link to="/" class="link-primary link">la charte de l'entreprise</router-link> et doit contenir au moins 3
                        caractères.
                     </p>
                     <div v-if="nickNameMessage !== ''" class="alert alert-warning mt-3 mb-0"><i class="bi bi-exclamation-triangle-fill"></i> {{ nickNameMessage }}</div>
                  </section>
               </div>
               <div class="col-12">
                  <section class="border rounded shadow-sm p-3 bg-white">
                     <h5 class="link-primary">Pour votre sécurité</h5>
                     <p class="fst-italic mb-4">
                        Pour votre sécurité, il est conseillé de changer de mot de passe régulièrement. Si vous ne souhaitez plus faire partie de notre communauté, vous avez
                        en outre la possibilité d'éffacer toutes vos données de nos services.
                     </p>
                     <div class="col-12 col-md-6 col-lg-4 m-auto mb-5">
                        <h6 class="link-primary">Changer de mot de passe</h6>
                        <form>
                           <input class="form-control mt-2" placeholder="Votre ancien mot de passe" type="password" ref="oldPassword" required />
                           <input class="form-control mt-2" placeholder="Votre nouveau mot de passe" type="password" ref="newPassword" required />
                           <input class="form-control mt-2" placeholder="Validez votre nouveau mot de passe" type="password" ref="newPasswordCheck" required />
                           <button @click.prevent="updatePassword" type="submit" class="btn btn-primary mt-2">Mettre à jour</button>
                        </form>
                        <div v-if="Server.serverResponseMessage !== ''" class="alert mt-4 mb-0" :class="Server.serverResponseType">
                           <i class="bi bi-exclamation-triangle-fill"></i> {{ Server.serverResponseMessage }}
                        </div>
                     </div>
                     <div class="col-12 m-auto mt-4 alert alert-danger pt-1">
                        <i class="bi bi-exclamation-triangle-fill fs-2 text-danger"></i>
                        <h6 class="text-danger">ZONE DANGEREUSE !</h6>
                        <p class="text-danger">
                           Attention ! Si vous choisissez de supprimer toutes vos données, ce processus sera irréversible et nous ne pourrons pas les récupérer !
                        </p>
                        <button type="submit" class="btn btn-danger mt-2" data-bs-toggle="modal" data-bs-target="#DeleteAccountModal">
                           Supprimer mon compte et toutes ses données
                        </button>
                     </div>
                  </section>
               </div>
            </div>
         </div>
      </section>
      <Footer />
   </main>
</template>

<style lang="scss">
   .avatar {
      border-radius: 25px;
   }
</style>

<script>
   import Menu from "../components/menus/Menu.vue";
   import MenuSpacer from "../components/menus/MenuSpacer.vue";
   import DeleteAccount from "../components/forms/DeleteAccount.vue";
   import Loader from "../components/utils/loader.vue";
   import Footer from "../components/menus/Footer.vue";
   import { mapActions, mapMutations } from "vuex";

   export default {
      name: "Home",
      components: { Menu, MenuSpacer, DeleteAccount, Loader, Footer },
      data() {
         return {
            avatarMessage: "",
            nickNameMessage: "",
            passwordMessage: "",
         };
      },
      computed: {
         Profile() {
            return this.$store.state.profile;
         },
         Global() {
            return this.$store.state.global;
         },
         Server() {
            return this.$store.state.server;
         },
      },
      methods: {
         ...mapActions(["getUserInfo", "updateProfilePic", "updateProfileName", "updateProfilePassword"]),
         ...mapMutations(["updateServerResponse"]),
         updateAvatar() {
            let data = {
               file: this.$refs.mediaFile.files[0],
            };
            if (data.file) {
               this.updateProfilePic(data);
               this.avatarMessage = "";
            } else {
               this.avatarMessage = "Veuillez sélectionner un fichier !";
            }
         },

         updateUsername() {
            let payload = {
               name: this.$refs.username.value,
            };
            if (payload.name) {
               if (payload.name.match(/^[\w\W]{3,24}$/)) {
                  this.updateProfileName(payload);
                  this.nickNameMessage = "";
               } else {
                  this.nickNameMessage = "Votre nom d'utilisateur doit comporter entre 3 et 32 caractères !";
               }
            } else {
               this.nickNameMessage = "Veuillez entrer un nom d'utilisateur !";
            }
         },

         updatePassword() {
            let payload = {
               currPassword: this.$refs.oldPassword.value,
               newPassword: this.$refs.newPassword.value,
            };
            if (!payload.currPassword == "") {
               if (this.$refs.newPasswordCheck.value === payload.newPassword) {
                  this.updateProfilePassword(payload);
               } else {
                  let message = {
                     type: "alert-warning",
                     message: "Veuillez renseigner deux mots de passe identiques !",
                  };
                  this.updateServerResponse(message);
               }
            } else {
               let message = {
                  type: "alert-warning",
                  message: "Veuillez renseigner votre ancien mot de passe !",
               };
               this.updateServerResponse(message);
            }
         },
      },
      created() {
         this.getUserInfo();
         let message = {
            type: "",
            message: "",
         };
         this.updateServerResponse(message);
      },
   };
</script>
