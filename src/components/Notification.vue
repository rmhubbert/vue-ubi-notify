<template>
  <div
    :class="`ubi-notify-notification ${notificationType}`"
    @click="$emit('remove', notification.id)"
  >
    <div class="ubi-notify-notification-heading" v-if="notification.heading">
      {{ notification.heading }}
    </div>

    <div class="ubi-notify-notification-body">
      {{ notification.body }}
    </div>
  </div>
</template>

<script>
export default {
  name: "DefaultNotification",
  components: {},
  mixins: [],
  props: {
    notification: {
      type: Object,
      required: true
    },
    showProgressBar: {
      type: Boolean,
      required: false,
      default: false
    },
    progressBar: {
      type: Object,
      required: false,
      default() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    notificationType() {
      return `ubi-notify-notification-${this.notification.type}`;
    }
  }
};
</script>

<style lang="css"></style>
