<template>
  <div :class="compCssClass" :style="inlineCss" ref="root">
    <transition-group appear :name="transitionName" tag="div">
      <div v-for="notify in notifications" :key="notify.id">
        <component
          :is="notificationComponent"
          v-bind="notification"
          :notification="notify"
          @remove="manuallyRemoveNotification"
        />
      </div>
    </transition-group>
  </div>
</template>

<script>
import DefaultConfig from "../configs/Default.js";
import UbiSleep from "./mixins/UbiSleep";
import UbiNotifyCss from "./mixins/UbiNotifyCss";
import DynamicComponentImporter from "./DynamicComponentImporter";
import Utils from "../utils";

export default {
  name: "UbiNotify",
  components: {},
  mixins: [UbiSleep, UbiNotifyCss, DynamicComponentImporter],
  props: {
    name: {
      type: String,
      required: false,
      default: DefaultConfig.name
    },

    cssFramework: {
      type: String,
      required: false,
      default: DefaultConfig.cssFramework
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
    },

    notification: {
      type: Object,
      required: false,
      default() {
        return DefaultConfig.notification;
      }
    }
  },

  data() {
    return {
      notifications: [],
      count: 0,
      useInlineCss: false,
      inlineCss: "",
      componentImportPath: "./"
    };
  },

  computed: {
    notificationComponent() {
      const notificationComponentName = `${Utils.toPascalCase(
        this.cssFramework
      )}Notification`;
      return this.getComponent(
        notificationComponentName,
        this.componentImportPath,
        notificationComponentName + ".vue"
      );
      //return notificationComponentName;
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
    },

    onResize() {
      this.calcInlineCss();
    }
  },

  mounted() {
    this.calcInlineCss();
    window.addEventListener("resize", this.onResize);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  }
};
</script>

<style lang="css">
.ubi-notify-root {
  position: absolute;
}

.ubi-notify-root-top-left, .ubi-notify-root-left-top {
  top: 0;
  left: 0;
}
.ubi-notify-root-top-right, .ubi-notify-root-right-top {
  top: 0;
  right: 0;
}
.ubi-notify-root-bottom-left, .ubi-notify-root-left-bottom {
  bottom: 0;
  left: 0;
}
.ubi-notify-root-bottom-right, .ubi-notify-root-right-bottom {
  bottom: 0;
  right: 0;
}
</style>
