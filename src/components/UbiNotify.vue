<template>
  <div :class="cssClass" :style="inlineCss" ref="root">
    <transition-group
      appear
      :name="animation.name"
      :enter-class="animation.enter"
      :enter-active-class="animation.enterActive"
      :enter-to-class="animation.enterTo"
      :leave-class="animation.leave"
      :leave-active-class="animation.leaveActive"
      :leave-to-class="animation.leaveTo"
      :move-class="animation.move"
      tag="div"
    >
      <div v-for="notify in notifications" :key="notify.id">
        <component
          :is="notificationComponent()"
          v-bind="notification"
          :notification="notify"
          @remove="manuallyRemoveNotification"
          :css="css"
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
    css: {
      type: Object,
      required: false,
      default() {
        return DefaultConfig.css;
      }
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
    animation: {
      type: Object,
      required: false,
      default() {
        return DefaultConfig.animation;
      }
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
          type: type ? type : this.notification.defaultType,
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
