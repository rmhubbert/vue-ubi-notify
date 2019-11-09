import UbiAnimateSlideEnter from "./ubianimateSlideEnter.js";
import UbiAnimateBounceEnter from "./ubianimateBounceEnter.js";
import UbiAnimateGrowEnter from "./ubianimateGrowEnter.js";

let UbiAnimateEnter = [
  // Fade
  {
    id: "animate fade in",
    name: "Fade in"
  },
  {
    id: "animate fade in shake",
    name: "Fade in with a shake"
  },
  {
    id: "animate fade in shake horizontally",
    name: "Fade in with a horizontal shake"
  },
  {
    id: "animate fade in shake vertically",
    name: "Fade in with a vertical shake"
  },
  {
    id: "animate fade in pulsate",
    name: "Fade in with a pulse"
  },
  {
    id: "animate fade in wave",
    name: "Fade in with a wave"
  },
  {
    id: "animate fade in flash",
    name: "Fade in with a flash"
  }
];

UbiAnimateEnter = UbiAnimateEnter.concat(
  UbiAnimateSlideEnter,
  UbiAnimateBounceEnter,
  UbiAnimateGrowEnter
);
export default UbiAnimateEnter;
