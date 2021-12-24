import { createApp } from "vue";
import App from "./App.vue";
import Router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

createApp(App).use(Router).mount("#app");
