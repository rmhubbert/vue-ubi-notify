export default {
  name: "tE60Se3iNhX0SVmWVREf",
  cssFramework: "default",
  position: "top right",
  width: "",
  parentNode: null,
  duration: 5000,
  stackFromTop: true,

  animation: {
    name: "ubi-notify-transition",
    enter: "ubi-notify-transition-enter",
    enterActive: "ubi-notify-transition-fade-in",
    enterTo: "ubi-notify-transition-enter-to",
    leave: "ubi-notify-transition-leave",
    leaveActive: "ubi-notify-transition-fade-out",
    leaveTo: "ubi-notify-transition-leave-to",
    move: "ubi-notify-transition-move-7"
  },

  notification: {
    defaultType: "default",
    canBeRemoved: true,
    iconLibrary: "none",
    icons: {
      default: "",
      primary: "",
      info: "",
      success: "",
      warning: "",
      danger: ""
    }
  },

  css: {
    defaultMessage: "",
    defaultHeading: "",
    defaultBody: "",
    primaryMessage: "",
    primaryHeading: "",
    primaryBody: "",
    infoMessage: "",
    infoHeading: "",
    infoBody: "",
    successMessage: "",
    successHeading: "",
    successBody: "",
    warningMessage: "",
    warningHeading: "",
    warningBody: "",
    dangerMessage: "",
    dangerHeading: "",
    dangerBody: ""
  }
};
