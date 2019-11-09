<template>
  <div :class="getCss('Message')" @click="remove()">
    <div :class="getCss('Heading')" v-if="notification.heading">{{ notification.heading }}</div>

    <div :class="getCss('Body')">{{ notification.body }}</div>
  </div>
</template>

<script>
import Notification from "./Notification";

export default {
  name: "TailwindNotification",
  extends: Notification,
  methods: {
    getCss(classType) {
      return this.css[`${this.notification.type}${classType}`];
    }
  }
};
</script>

<style lang="scss">
</style>
