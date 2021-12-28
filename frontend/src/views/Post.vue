<template>
   <div>{{ postId }}</div>
</template>

<script>
   export default {
      data() {
         return {
            postId: null,
         };
      },
      mounted() {
         this.postId = this.$route.params.id;
      },
   };
</script>
