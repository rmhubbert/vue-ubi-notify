import DefaultEnter from "./animations/defaultEnter.js";
import DefaultLeave from "./animations/defaultLeave.js";
import UbiAnimateEnter from "./animations/ubianimateEnter.js";
import UbiAnimateLeave from "./animations/ubianimateLeave.js";
import AnimateCssEnter from "./animations/animateCssEnter.js";
import AnimateCssLeave from "./animations/animateCssLeave.js";

export default [
  {
    id: "default",
    name: "Default",
    url: "",
    enterAnimations: DefaultEnter,
    leaveAnimations: DefaultLeave
  },
  {
    id: "ubianimate",
    name: "UbiAnimate",
    url:
      "https://cdn.jsdelivr.net/npm/ubi-animate@0.2.1/dist/ubianimate.min.css",
    enterAnimations: UbiAnimateEnter,
    leaveAnimations: UbiAnimateLeave
  },
  {
    id: "animate.css",
    name: "Animate.css",
    url:
      "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css",
    enterAnimations: AnimateCssEnter,
    leaveAnimations: AnimateCssLeave
  }
];
