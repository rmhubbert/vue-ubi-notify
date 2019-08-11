/*
const uri = window.location.search.substring(1);
const params = new URLSearchParams(uri);
let cssFramework = "default";
if (params.get("css")) cssFramework = params.get("css");
let position = "top right";
if (params.get("position")) position = params.get("position");
let animEnter = "";
if (params.get("animEnter")) animEnter = params.get("animEnter");
let animLeave = "";
if (params.get("animLeave")) animLeave = params.get("animLeave");
let reverse = false;
if (
  position === "bottom right" ||
  position === "bottom center" ||
  position === "bottom left"
) {
  reverse = true;
}

const config = {
  name: "config",
  reverse: reverse,
  position: position,
  duration: 7000,
  parentNode: "content-wrapper",
  cssFramework: cssFramework,
  transitionEnterActiveClass: animEnter,
  transitionLeaveActiveClass: animLeave
};
*/

window.axios = require("axios");

import Vue from "vue";
import Demo from "./demo/Demo.vue";

Vue.config.productionTip = false;

import UbiNotify from "./index.js";
Vue.use(UbiNotify);

new Vue({
  render: h => h(Demo)
}).$mount("#app");
