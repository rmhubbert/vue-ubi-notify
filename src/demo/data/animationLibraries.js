import UbiAnimateEnter from "./animations/ubianimateEnter.js";
import UbiAnimateLeave from "./animations/ubianimateLeave.js";
import AnimateCssEnter from "./animations/animateCssEnter.js";
import AnimateCssLeave from "./animations/animateCssLeave.js";

export default [
  {
    id: "ubianimate",
    name: "UbiAnimate",
    url: "",
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
