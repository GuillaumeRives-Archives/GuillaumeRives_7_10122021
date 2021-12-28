<template>
   <router-view />
</template>

<style lang="scss">
   html,
   body,
   #app {
      .link-primary {
         color: #fd2d01;
      }
      .btn-primary {
         background-color: #fd2d01;
         border: #fd2d01;

         &:hover {
            background-color: lighten(#fd2d01, 10);
         }

         &:focus {
            border-color: rgba(#fd2d01, 0.5);
            box-shadow: 0 0 0 4px rgba(#fd2d01, 0.4);
            outline: 0 none;
         }
      }

      //Modification de la couleur du focus par défaut de bootstrap
      textarea:focus,
      input[type="text"]:focus,
      input[type="password"]:focus,
      input[type="datetime"]:focus,
      input[type="datetime-local"]:focus,
      input[type="date"]:focus,
      input[type="month"]:focus,
      input[type="time"]:focus,
      input[type="week"]:focus,
      input[type="number"]:focus,
      input[type="email"]:focus,
      input[type="url"]:focus,
      input[type="search"]:focus,
      input[type="tel"]:focus,
      input[type="color"]:focus,
      input[type="file"]:focus,
      .uneditable-input:focus {
         border-color: rgba(#fd2d01, 0.5);
         box-shadow: 0 0 0 4px rgba(#fd2d01, 0.4);
         outline: 0 none;
      }
   }
</style>
