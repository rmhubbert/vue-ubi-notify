<template>
  <div :style="wrapperStyle">
    <transition-group appear :name="transitionName" tag="div">
      <div v-for="notification in notifications" :key="notification.id">
        <div style="background-color: #ccc;">
          <p>{{ notification.heading }}</p>
          <p>{{ notification.body }}</p>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import DefaultConfig from "../configs/Default.js";
import Util from "../utils";
import UbiSleep from "../mixins/UbiSleep.js";

export default {
  name: "UbiNotify",
  components: {},
  mixins: [UbiSleep],
  props: {
    name: {
      type: String,
      required: false,
      default: DefaultConfig.name
    },

    position: {
      type: String,
      required: false,
      default: DefaultConfig.position
    },

    width: {
      type: String,
      required: false,
      default: DefaultConfig.width
    },

    duration: {
      type: Number,
      required: false,
      default: DefaultConfig.duration
    },

    reverse: {
      type: Boolean,
      required: false,
      default: DefaultConfig.reverse
    },

    clickToRemove: {
      type: Boolean,
      required: false,
      default: DefaultConfig.clickToRemove
    },

    defaultNotificationType: {
      type: String,
      required: false,
      default: DefaultConfig.defaultNotificationType
    },

    transitionName: {
      type: String,
      required: false,
      default: DefaultConfig.transitionName
    }
  },

  data() {
    return {
      notifications: [],
      count: 0
    };
  },

  computed: {
    wrapperStyle() {
      return `position: absolute; ${this.calculatePosition} width: ${this.width};`;
    },

    calculatePosition() {
      return Util.getCSSPosition(this.position, this.width);
    }
  },

  methods: {
    addNotification(body, heading = null, type = null, duration = null) {
      body = body.trim();
      if (body !== "") {
        const notification = {
          id: this.count++,
          heading: heading,
          body: body,
          type: type ? type : this.defaultNotificationType,
          duration: duration ? duration : this.duration
        };
        this.reverse
          ? this.notifications.push(notification)
          : this.notifications.unshift(notification);
        this.sleepThenCall(notification.duration, this.removeNotification, [
          notification.id
        ]);
      }
    },

    removeNotification(id) {
      this.notifications = this.notifications.filter(
        notification => notification.id != id
      );
    },

    manuallyRemoveNotification(id) {
      if (this.clickToRemove) this.removeNotification(id);
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/ubi-notify.scss";
</style>
