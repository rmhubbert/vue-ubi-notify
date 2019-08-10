export default {
  name: "default",
  cssFramework: "default",
  position: "top right",
  width: "",
  parentNode: null,
  duration: 5000,
  reverse: false,
  defaultNotificationType: "standard",
  transitionName: "ubi-notify-transition",
  notification: {
    clickToRemove: true,
    showProgressBar: false,
    progressBar: {
      type: "css",
      updateInterval: 10
    }
  }
};
