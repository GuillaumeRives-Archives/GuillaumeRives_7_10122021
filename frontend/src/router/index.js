import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Post from "../views/Post.vue";
import Profile from "../views/Profile.vue";
import Authenticate from "../views/Authenticate.vue";

const routes = [
   {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
         title: "Accueil",
      },
   },
   {
      path: "/post/:id",
      name: "Post",
      component: Post,
      meta: {
         title: "Post",
      },
   },
   {
      path: "/profile",
      name: "Profile",
      component: Profile,
      meta: {
         title: "Votre profil",
      },
   },
   {
      path: "/authenticate",
      name: "Authenticate",
      component: Authenticate,
      meta: {
         title: "Identifiez-vous",
      },
   },
];

const router = createRouter({
   history: createWebHistory(),
   routes,
});

router.afterEach((to) => {
   document.title = to.meta.title;
});

export default router;
