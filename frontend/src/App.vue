<template>
  <router-view />
</template>



<style lang="scss">
html,
body,
#app {
  background: rgba(250, 250, 250, 1);
}
</style>

<script>
export default {
  beforeMount() {
    if (!localStorage.getItem("token")) {
      this.$router.push("Authenticate");
    }
  },
};
</script>