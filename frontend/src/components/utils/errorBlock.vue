<template>
   <div class="text-center">
      <span class="fs-1">{{ emoji }}</span>
      <h2 class="link-primary fs-1">{{ title }}</h2>
      <p class="fs-5">{{ message }}</p>
      <router-link v-if="enableCta" :to="ctaDest" class="btn btn-primary">{{ ctaTitle }}</router-link>
   </div>
</template>

<script>
   export default {
      props: ["title", "emoji", "message", "enableCta", "ctaTitle", "ctaDest"],
   };
</script>
