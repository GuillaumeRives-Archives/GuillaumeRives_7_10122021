<template>
   <header class="navbar navbar-expand-sm navbar-dark fixed-top">
      <div class="container-fluid">
         <router-link class="navbar-brand" to="/">
            <img src="../../assets/images/icon.svg" alt="Groupomania Logo" height="30" />
            Groupomania
         </router-link>
         <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
         >
            <span class="navbar-toggler-icon"></span>
         </button>
         <div id="navbarContent" class="collapse navbar-collapse">
            <ul class="navbar-nav">
               <li class="nav-item">
                  <router-link class="nav-link" :to="{ name: 'Home' }" :class="{ active: $route.name === 'Home' }"><i class="bi bi-card-image"></i> Explorez </router-link>
               </li>
               <li class="nav-item">
                  <router-link class="nav-link" :to="{ name: 'Profile' }" :class="{ active: $route.name === 'Profile' }"><i class="bi bi-person"></i> Mon profil </router-link>
               </li>

               <li class="nav-item">
                  <router-link class="nav-link" to="Authenticate" @click="logout()"><i class="bi bi-toggle-off"></i> Se déconnecter</router-link>
               </li>
            </ul>
         </div>
      </div>
   </header>
</template>

<style lang="scss">
   header {
      background: rgba(#fd2d01, 0.8);
      box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid darken(rgba(#fd2d01, 0.3), 5);
   }
</style>

<script>
   export default {
      beforeMount() {
         if (!localStorage.getItem("token")) {
            this.$router.push("Authenticate");
         }
      },
      methods: {
         logout() {
            localStorage.clear();
         },
      },
   };
</script>
