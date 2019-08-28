<template>
  <div>
    <div id="content-wrapper">
      <main id="content">
        <h1 class="title">Vue-UbiNotify</h1>

        <div id="form-wrapper">
          <form @submit.prevent="sendNotification">
            <div class="ubi-container">
              <DemoSelect
                v-model="notificationPosition"
                :cssFramework="cssFramework"
                :options="notificationPositions"
                label="Position"
              >
                ></DemoSelect
              >

              <DemoSelect
                v-model="notificationDuration"
                :cssFramework="cssFramework"
                :options="notificationDurations"
                label="Duration"
              >
                ></DemoSelect
              >

              <DemoSelect
                v-model="notificationType"
                :cssFramework="cssFramework"
                :options="notificationTypes"
                label="Default Type"
              >
                ></DemoSelect
              >
            </div>

            <div class="ubi-container">
              <DemoSelect
                v-model="stackFromTop"
                :cssFramework="cssFramework"
                :options="stackFromTopOptions"
                label="Insert into stack from"
              >
                ></DemoSelect
              >

              <DemoSelect
                v-model="canBeRemoved"
                :cssFramework="cssFramework"
                :options="canBeRemovedOptions"
                label="User can dismiss"
              >
                ></DemoSelect
              >
            </div>

            <div class="ubi-container">
              <DemoSelect
                v-model="cssFramework"
                :cssFramework="cssFramework"
                :options="cssFrameworks"
                label="CSS Framework"
                @change="swapCssFramework"
              >
                ></DemoSelect
              >

              <DemoSelect
                v-model="iconLibrary"
                :cssFramework="cssFramework"
                :options="iconLibraries"
                label="Icon Library"
              >
                ></DemoSelect
              >

              <DemoSelect
                v-model="animationLibrary"
                :cssFramework="cssFramework"
                :options="animationLibraries"
                label="Animation Library"
                @change="swapAnimationLibrary"
              >
                ></DemoSelect
              >
            </div>

            <div class="ubi-container">
              <DemoSelect
                v-model="animationEnter"
                :cssFramework="cssFramework"
                :options="activeEnterAnimationLibrary"
                label="Entrance Animation"
              >
                ></DemoSelect
              >

              <DemoSelect
                v-model="animationLeave"
                :cssFramework="cssFramework"
                :options="activeLeaveAnimationLibrary"
                label="Exit Animation"
              >
                ></DemoSelect
              >

              <DemoSelect
                v-model="animationTransitionDuration"
                :cssFramework="cssFramework"
                :options="animationTransitionDurations"
                label="Stacking Insert Duration"
              >
                ></DemoSelect
              >
            </div>

            <div class="ubi-container-centered">
              <DemoButton
                @click.prevent="sendNotification"
                :cssFramework="cssFramework"
                >UbiNotify!</DemoButton
              >
            </div>
          </form>
        </div>

        <div class="ubi-container">
          <UbiConfigViewer :config="config">
            <!-- prettier-ignore -->
            <template v-slot:before>
import UbiNotify from "vue-ubi-notify"; 

const UbiNotifyConfig = </template>
            <!-- prettier-ignore -->
            <template v-slot:after>

Vue.use(UbiNotify, UbiNotifyConfig);
            </template>
          </UbiConfigViewer>
        </div>
      </main>
    </div>
    <UbiNotify v-bind="config"></UbiNotify>
  </div>
</template>

<script>
import UbiNotify from "../components/UbiNotify";
import Utils from "../utils";
import DefaultConfig from "../configs/Default";
import DemoSelect from "./components/DemoSelect";
import DemoButton from "./components/DemoButton";
import UbiConfigViewer from "./components/UbiConfigViewer";
import Quotes from "./data/quotes";
import CssFrameworks from "./data/cssFrameworks";
import IconLibraries from "./data/iconLibraries";
import AnimationLibraries from "./data/animationLibraries";
import NotificationTypes from "./data/notificationTypes";
import NotificationPositions from "./data/notificationPositions";
import NotificationDurations from "./data/notificationDurations";
import AnimationTransitionDurations from "./data/animationTransitionDuration";
import StackFromTopOptions from "./data/stackFromTop.js";
import CanBeRemovedOptions from "./data/canBeRemoved.js";

export default {
  name: "",
  components: {
    UbiNotify,
    DemoSelect,
    DemoButton,
    UbiConfigViewer
  },
  data() {
    return {
      quotes: [],
      demoName: "CHANGE_THIS_TO_A_UNIQUE_STRING",
      notificationPositions: NotificationPositions,
      notificationPosition: DefaultConfig.position,
      notificationDurations: NotificationDurations,
      notificationDuration: DefaultConfig.duration,
      notificationTypes: NotificationTypes,
      notificationType: DefaultConfig.notification.defaultType,
      cssFrameworks: CssFrameworks,
      cssFramework: DefaultConfig.cssFramework,
      iconLibraries: IconLibraries,
      iconLibrary: "none",
      animationLibraries: AnimationLibraries,
      animationLibrary: "default",
      animationEnter: DefaultConfig.animation.enterActive,
      animationLeave: DefaultConfig.animation.leaveActive,
      animationTransitionDurations: AnimationTransitionDurations,
      animationTransitionDuration: DefaultConfig.animation.move,
      stackFromTopOptions: StackFromTopOptions,
      stackFromTop: DefaultConfig.stackFromTop,
      canBeRemovedOptions: CanBeRemovedOptions,
      canBeRemoved: DefaultConfig.notification.canBeRemoved
    };
  },
  computed: {
    config() {
      const conf = {};
      conf.name = this.demoName;
      conf.position = this.notificationPosition;
      conf.duration = parseInt(this.notificationDuration);
      conf.stackFromTop = Utils.toBool(this.stackFromTop);
      conf.cssFramework = this.cssFramework;

      const animationConf = {};
      animationConf.enterActive = this.animationEnter;
      animationConf.leaveActive = this.animationLeave;
      animationConf.move = this.animationTransitionDuration;
      conf.animation = animationConf;

      const notificationConf = {};
      notificationConf.canBeRemoved = Utils.toBool(this.canBeRemoved);
      notificationConf.defaultType = this.notificationType;
      if (this.iconLibrary !== "none") {
        notificationConf.iconLibrary = this.iconLibrary;
      }
      conf.notification = notificationConf;

      return conf;
    },

    activeEnterAnimationLibrary() {
      return this.activeAnimationLibrary.enterAnimations;
    },

    activeLeaveAnimationLibrary() {
      return this.activeAnimationLibrary.leaveAnimations;
    },

    activeAnimationLibrary() {
      return this.animationLibraries.find(lib => {
        return lib.id === this.animationLibrary;
      });
    }
  },

  methods: {
    sendNotification() {
      if (this.quotes.length <= 1) this.initQuotes();
      const quote = this.quotes.pop();
      this.$notify(
        quote.quote,
        quote.author,
        this.notificationType,
        this.demoName
      );
    },

    swapCssFramework() {
      const framework = this.cssFrameworks.find(framework => {
        return framework.id === this.cssFramework;
      });
      document.getElementById("remote-style").href = framework.url;
    },

    swapAnimationLibrary() {
      const animLib = this.animationLibraries.find(lib => {
        return lib.id === this.animationLibrary;
      });
      document.getElementById("remote-animation").href = animLib.url;
      this.animationEnter = animLib.enterAnimations[0].id;
      this.animationLeave = animLib.leaveAnimations[0].id;
    },

    initQuotes() {
      this.quotes = Quotes.slice(); // We want a copy, not a reference
      this.quotes.sort(() => Math.random() - 0.5);
    }
  },

  created() {
    this.initQuotes();
  }
};
</script>

<style lang="scss">
@import "./assets/scss/demo.scss";
</style>
