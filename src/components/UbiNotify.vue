<template>
  <div :class="compCssClass" :style="inlineCss" ref="root">
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
      count: 0,
      useInlineCss: false,
      inlineCss: ""
    };
  },

  computed: {
    compCssClass() {
      if (this.useInlinePosition) return `ubi-notify-root`;
      const position = this.position.replace(" ", "-");
      return `ubi-notify-root ubi-notify-root-${position}`;
    },

    useInlinePosition() {
      return (
        this.position.search(":") !== -1 ||
        this.position.toLowerCase().search("center") !== -1
      );
    },

    useInlineWidth() {
      return this.width !== "";
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

    calcInlineCss() {
      let css = "";
      if (this.useInlinePosition) {
        css += this.calcPosition() + " ";
      }
      if (this.useInlineWidth) css += `width: ${this.width};`;
      this.inlineCss = css;
      console.log(css);
    },

    calcPosition() {
      const words = this.position.toLowerCase().split(" ");
      let positionStyle = "";
      words.forEach((word, index) => {
        if (["top", "bottom", "left", "right"].indexOf(word) != -1) {
          positionStyle += `${word}: 0; `;
        } else if (word === "center") {
          if (index === 0) {
            // vertically center
            let height = null;
            if (this.useInlineheight) height = this.height;
            else height = getComputedStyle(this.$refs["root"]).height;
            const numericHeight = parseFloat(height.match(/[\d.]+/));
            const heightType = height.replace(/[\d.]+/, "");
            const marginTop = `-${numericHeight / 2}${heightType}`;
            positionStyle += `top: 50%; margin-top:${marginTop}; `;
          } else if (index === 1) {
            // horizontally center
            let width = null;
            if (this.useInlineWidth) width = this.width;
            else width = getComputedStyle(this.$refs["root"]).width;
            const numericWidth = parseFloat(width.match(/[\d.]+/));
            const widthType = width.replace(/[\d.]+/, "");
            const marginLeft = `-${numericWidth / 2}${widthType}`;
            positionStyle += `left: 50%; margin-left:${marginLeft}; `;
          }
        }
      });
      return positionStyle;
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
  width: 15vw;
}

.ubi-notify-root-top-left {
  top: 0;
  left: 0;
}
.ubi-notify-root-top-right {
  top: 0;
  right: 0;
}
.ubi-notify-root-bottom-left {
  bottom: 0;
  left: 0;
}
.ubi-notify-root-bottom-right {
  bottom: 0;
  right: 0;
}
</style>
