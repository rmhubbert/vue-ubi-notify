const uri = window.location.search.substring(1);
const params = new URLSearchParams(uri);
let cssFramework = "default";
if (params.get("css")) cssFramework = params.get("css");

import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

import UbiNotify from "./index.js";

const config = {
  name: "config",
  cssFramework: cssFramework
};

const config2 = {
  name: "config2",
  width: "20vw",
  reverse: true,
  position: "bottom right",
  duration: 5000,
  parentNode: "content-wrapper",
  cssFramework: cssFramework
};

Vue.use(UbiNotify, [config2]);

new Vue({
  render: h => h(App)
}).$mount("#app");
