import { createApp } from "vue";
import App from "./App.vue";
import Router from "./router/index.js";
import Store from "./store/index.js";
import "./index.css";
import "./styles/style.scss";
import "./iconfont/iconfont.js";
createApp(App).use(Router).use(Store).mount("#app");
