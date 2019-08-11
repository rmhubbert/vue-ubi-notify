<template>
  <div :class="`ubi-notify-materialize toast`" @click="remove()">
    <div class="toast-header" v-if="notification.heading">
      {{ notification.heading }}
    </div>

    <div class="toast-content">
      {{ notification.body }}
    </div>
  </div>
</template>

<script>
import Notification from "./Notification";

export default {
  name: "MaterializeNotification",
  extends: Notification,
  computed: {
    notificationType() {
      let cssClass = "";
      switch (this.notification.type) {
        case "primary":
          cssClass = "teal";
          break;
        case "info":
          cssClass = "blue";
          break;
        case "success":
          cssClass = "green";
          break;
        case "danger":
          cssClass = "red";
          break;
        case "warning":
          cssClass = "yellow";
          break;
      }
      return cssClass;
    }
  }
};
</script>

<style lang="css">
.toast {
  position: inherit;
  align-items: left;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
}
.toast > div {
  width: 100%;
}
</style>
