import UbiAnimateSlideLeave from "./ubianimateSlideLeave.js";
import UbiAnimateBounceLeave from "./ubianimateBounceLeave.js";
import UbiAnimateGrowLeave from "./ubianimateGrowLeave.js";

let UbiAnimateLeave = [
  // Fade
  {
    id: "animate fade out",
    name: "Fade out"
  },
  {
    id: "animate fade out shake",
    name: "Fade out with a shake"
  },
  {
    id: "animate fade out shake horizontally",
    name: "Fade out with a horizontal shake"
  },
  {
    id: "animate fade out shake vertically",
    name: "Fade out with a vertical shake"
  },
  {
    id: "animate fade out pulsate",
    name: "Fade out with a pulse"
  },
  {
    id: "animate fade out wave",
    name: "Fade out with a wave"
  },
  {
    id: "animate fade out flash",
    name: "Fade out with a flash"
  }
];

UbiAnimateLeave = UbiAnimateLeave.concat(
  UbiAnimateSlideLeave,
  UbiAnimateBounceLeave,
  UbiAnimateGrowLeave
);
export default UbiAnimateLeave;
