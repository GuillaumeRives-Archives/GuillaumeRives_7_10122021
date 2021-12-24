<template>
   <footer class="d-flex justify-content-around align-items-center mt-3">
      <router-link to="/" class="link-primary">© {{ date }} Groupomania</router-link>
      <router-link to="/" class="link-primary"> {{ postsCount }} partages</router-link>
   </footer>
</template>

<style lang="scss">
   footer {
      height: 90px;
      background: linear-gradient(rgba(#fd2d01, 0) 50%, rgba(#fd2d01, 0.2) 100%);
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

   export default {
      data: function () {
         return {
            postsCount: 0,
         };
      },
      computed: {
         date: function () {
            const date = new Date();
            return date.getFullYear();
         },
      },

      mounted() {
         this.fetchPosts();
      },

      methods: {
         //Récupération de tous les posts pour leur affichage sur la page d'accueil
         fetchPosts() {
            DB.get("posts").then((response) => {
               this.postsCount = response.data.length;
            });
         },
      },
   };
</script>
