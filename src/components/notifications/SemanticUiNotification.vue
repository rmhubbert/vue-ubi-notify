<template>
  <div :class="`ubi-notify-semantic-ui`">
    <div :class="`ui message ${notificationType}`">
      <i class="close icon" @click="remove()" v-show="this.canBeRemoved"></i>
      <div class="header" v-if="notification.heading">
        {{ notification.heading }}
      </div>

      <div class="content">
        {{ notification.body }}
      </div>
    </div>
  </div>
</template>

<script>
import Notification from "./Notification";

export default {
  name: "SemanticUiNotification",
  extends: Notification,
  computed: {
    notificationType() {
      let cssClass = "";
      switch (this.notification.type) {
        case "primary":
          cssClass = "is-primary";
          break;
        case "info":
          cssClass = "is-info";
          break;
        case "success":
          cssClass = "is-success";
          break;
        case "danger":
          cssClass = "is-danger";
          break;
        case "warning":
          cssClass = "is-warning";
          break;
      }
      return cssClass;
    }
  }
};
</script>

<style lang="scss">
$red: #b03060;
$orange: #fe9a76;
$yellow: #ffd700;
$olive: #32cd32;
$green: #016936;
$teal: #008080;
$blue: #0e6eb8;
$violet: #ee82ee;
$purple: #b413ec;
$pink: #ff1493;
$brown: #a52a2a;
$grey: #a0a0a0;
$black: #000000;
$primarycolor: $pink;
$secondarycolor: $grey;

.is-primary .ui.message {
  background-color: $primarycolor;
}

.is-info {
  background-color: $blue;
}

.is-success {
  background-color: $green;
}

.is-danger {
  background-color: $red;
}

.is-primary {
  background-color: $yellow;
}
</style>
