<template>
  <article :class="`ubi-notify-bulma notification ${notificationType}`">
    <button
      class="delete"
      @click="$emit('remove', notification.id)"
      v-show="this.clickToRemove"
    ></button>
    <p class="title" v-if="notification.heading">
      {{ notification.heading }}
    </p>

    <p class="content">
      {{ notification.body }}
    </p>
  </article>
</template>

<script>
import Notification from "./Notification";

export default {
  name: "BulmaNotification",
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

<style lang="css"></style>
