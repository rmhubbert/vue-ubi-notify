import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

import UbiNotify from "./index.js";

const config = {
  name: "config"
};

const config2 = {
  name: "config2",
  width: "20vw",
  reverse: true,
  position: "bottom right",
  duration: 10000,
  parentNode: "content-wrapper"
};

Vue.use(UbiNotify, [config, config2]);

new Vue({
  render: h => h(App)
}).$mount("#app");
