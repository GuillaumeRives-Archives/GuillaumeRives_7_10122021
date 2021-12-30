import { createApp } from "vue";
import App from "./App.vue";
import Router from "./router";
import Store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap";

createApp(App).use(Router).use(Store).mount("#app");
