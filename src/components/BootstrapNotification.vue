<template>
  <div :class="`ubi-notify-bootstrap toast show`">
    <div
      class="toast-header"
      v-show="notification.heading || this.clickToRemove"
    >
      <span
        :class="
          `bootstrap-notification-type-box
        ${notificationType}`
        "
      ></span>
      <span class="mr-auto" v-show="notification.heading">
        {{ notification.heading }}</span
      >
      <button
        type="button"
        class="ml-2 mb-1 close"
        data-dismiss="toast"
        aria-label="Close"
        @click="$emit('remove', notification.id)"
        v-show="this.clickToRemove"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <div class="toast-body">
      {{ notification.body }}
    </div>
  </div>
</template>

<script>
import Notification from "./Notification";

export default {
  name: "BootstrapNotification",
  extends: Notification,
  computed: {
    notificationType() {
      let cssClass = "";
      switch (this.notification.type) {
        case "primary":
          cssClass = "bg-primary";
          break;
        case "info":
          cssClass = "bg-info";
          break;
        case "success":
          cssClass = "bg-success";
          break;
        case "failure":
          cssClass = "bg-danger";
          break;
        case "warning":
          cssClass = "bg-warning";
          break;
      }
      return cssClass;
    }
  }
};
</script>

<style lang="css">
.bootstrap-notification-type-box {
  display: inline-block;
  height: 0.9rem;
  width: 0.9rem;
  border-radius: 0.2rem;
  margin-right: 0.3rem;
  vertical-align: center;
}
</style>
