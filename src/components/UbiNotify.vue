<template>
  <div :class="cssClass" :style="inlineCss" ref="root">
    <transition-group
      appear
      :name="transitionName"
      :enter-class="transitionEnterClass"
      :enter-active-class="transitionEnterActiveClass"
      :enter-to-class="transitionEnterToClass"
      :leave-class="transitionLeaveClass"
      :leave-active-class="transitionLeaveActiveClass"
      :leave-to-class="transitionLeaveToClass"
      :move-class="transitionMoveClass"
      tag="div"
    >
      <div v-for="notify in notifications" :key="notify.id">
        <component
          :is="notificationComponent()"
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
    stackFromTop: {
      type: Boolean,
      required: false,
      default: DefaultConfig.stackFromTop
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
    },
    transitionEnterClass: {
      type: String,
      required: false,
      default: DefaultConfig.transitionEnterClass
    },
    transitionEnterActiveClass: {
      type: String,
      required: false,
      default: DefaultConfig.transitionEnterActiveClass
    },
    transitionEnterToClass: {
      type: String,
      required: false,
      default: DefaultConfig.transitionEnterToClass
    },
    transitionLeaveClass: {
      type: String,
      required: false,
      default: DefaultConfig.transitionLeaveClass
    },
    transitionLeaveActiveClass: {
      type: String,
      required: false,
      default: DefaultConfig.transitionLeaveActiveClass
    },
    transitionLeaveToClass: {
      type: String,
      required: false,
      default: DefaultConfig.transitionLeaveToClass
    },
    transitionMoveClass: {
      type: String,
      required: false,
      default: DefaultConfig.transitionMoveClass
    }
  },

  data() {
    return {
      notifications: [],
      count: 0,
      useInlineCss: false,
      componentImportPath: "./notifications/"
    };
  },

  computed: {},

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
        this.stackFromTop
          ? this.notifications.unshift(notification)
          : this.notifications.push(notification);
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
      this.removeNotification(id);
    },

    notificationComponent() {
      return this.getComponent(
        `${Utils.toPascalCase(this.cssFramework)}Notification`
      );
    },

    onResize() {
      this.calcInlineCss();
    }
  },

  created() {
    this.$UbiNotifyRegister(this);
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

<style lang="scss">
@import "../assets/scss/Global.scss";
@import "../assets/scss/GlobalAnimations.scss";
</style>
