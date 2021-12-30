<template>
   <main class="d-flex flex-column">
      <Menu />
      <MenuSpacer />
      <section class="m-auto">
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
                        Votre pseudo doit respecter <router-link to="/" class="link-primary link">la charte de l'entreprise</router-link> et doit contenir au moins 8
                        caractères.
                     </p>
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
                           <input class="form-control mt-2" placeholder="Votre ancien mot de passe" type="password" name="oldPassword" required />
                           <input class="form-control mt-2" placeholder="Votre nouveau mot de passe" type="password" name="newPassword" required />
                           <input class="form-control mt-2" placeholder="Validez votre nouveau mot de passe" type="password" name="newPasswordCheck" required />
                           <button @click="updatePassword" type="submit" class="btn btn-primary mt-2">Mettre à jour</button>
                        </form>
                     </div>
                     <div class="col-12 m-auto mt-4 alert alert-danger pt-1">
                        <i class="bi bi-exclamation-triangle-fill fs-2 text-danger"></i>
                        <h6 class="text-danger">ZONE DANGEREUSE !</h6>
                        <p class="text-danger">
                           Attention ! Si vous choisissez de supprimer toutes vos données, ce processus sera irréversible et nous ne pourrons pas les récupérer !
                        </p>
                        <button @click="deleteProfile" type="submit" class="btn btn-danger mt-2">Supprimer mon compte et toutes ses données</button>
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
   import Loader from "../components/utils/loader.vue";
   import Footer from "../components/menus/Footer.vue";
   import { mapActions } from "vuex";

   export default {
      name: "Home",
      components: { Menu, MenuSpacer, Loader, Footer },
      computed: {
         Profile() {
            return this.$store.state.profile;
         },
         Global() {
            return this.$store.state.global;
         },
      },
      methods: {
         ...mapActions(["getUserInfo", "updateProfilePic", "updateProfileName"]),
         updateAvatar() {
            let data = {
               file: this.$refs.mediaFile.files[0],
            };
            this.updateProfilePic(data);
         },

         updateUsername() {
            let payload = {
               name: this.$refs.username.value,
            };
            this.updateProfileName(payload);
         },
      },
      created() {
         this.getUserInfo();
      },
   };
</script>
