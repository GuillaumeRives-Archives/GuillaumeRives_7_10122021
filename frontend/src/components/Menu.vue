<template>
  <header class="navbar navbar-expand-sm navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img src="../assets/images/icon.svg" alt="Groupomania Logo" height="30"> Groupomania
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarContent" class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'Home' }" :class="{active: $route.name==='Home'}">
              <i class="bi bi-images"></i> Explorez
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'Profile'}" :class="{active: $route.name==='Profile'}">
              <i class="bi bi-person-fill"></i> Mon profil
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" to="Authenticate" @click="logout()">
              <i class="bi bi-door-open-fill"></i> Se déconnecter
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

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