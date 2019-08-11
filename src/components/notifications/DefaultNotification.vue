<template>
  <div
    :class="`ubi-notify-notification ${notificationType}`"
    @click="$emit('remove', notification.id)"
  >
    <div class="ubi-notify-notification-heading" v-if="notification.heading">
      <p>{{ notification.heading }}</p>
    </div>

    <div class="ubi-notify-notification-body">
      <p>{{ notification.body }}</p>
    </div>
  </div>
</template>

<script>
import Notification from "./Notification";

export default {
  name: "DefaultNotification",
  extends: Notification,
  computed: {
    notificationType() {
      return `ubi-notify-notification-${this.notification.type}`;
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/scss/DefaultNotification.scss";
</style>
