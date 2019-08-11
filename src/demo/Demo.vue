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
                :cssFramework="this.cssFramework"
                :options="this.notificationPositions"
                label="Position"
              >
                ></DemoSelect
              >

              <DemoSelect
                v-model="notificationDuration"
                :cssFramework="this.cssFramework"
                :options="this.notificationDurations"
                label="Duration"
              >
                ></DemoSelect
              >

              <DemoSelect
                v-model="notificationType"
                :cssFramework="this.cssFramework"
                :options="this.notificationTypes"
                label="Type"
              >
                ></DemoSelect
              >
            </div>

            <div class="ubi-container">
              <DemoSelect
                v-model="cssFramework"
                :cssFramework="this.cssFramework"
                :options="this.cssFrameworks"
                label="CSS Framework"
                @change="swapCssFramework"
              >
                ></DemoSelect
              >

              <DemoSelect
                v-model="iconLibrary"
                :cssFramework="this.cssFramework"
                :options="this.iconLibraries"
                label="Icon Library"
              >
                ></DemoSelect
              >

              <DemoSelect
                v-model="animationLibrary"
                :cssFramework="this.cssFramework"
                :options="this.animationLibraries"
                label="Animation Library"
                @change="swapAnimationLibrary"
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
import DefaultConfig from "../configs/Default";
import DemoSelect from "./components/DemoSelect";
import DemoButton from "./components/DemoButton";
import UbiConfigViewer from "./components/UbiConfigViewer";
import CssFrameworks from "./data/cssFrameworks";
import IconLibraries from "./data/iconLibraries";
import AnimationLibraries from "./data/animationLibraries";
import NotificationTypes from "./data/notificationTypes";
import NotificationPositions from "./data/notificationPositions";
import NotificationDurations from "./data/notificationDurations";

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
      notificationDuration: 5000,
      notificationTypes: NotificationTypes,
      notificationType: "default",
      cssFrameworks: CssFrameworks,
      cssFramework: "default",
      iconLibraries: IconLibraries,
      iconLibrary: "none",
      animationLibraries: AnimationLibraries,
      animationLibrary: "ubianimate"
    };
  },
  computed: {
    config() {
      const conf = {};
      conf.name = this.demoName;
      conf.position = this.notificationPosition;
      conf.duration = parseInt(this.notificationDuration);
      conf.cssFramework = this.cssFramework;
      conf.animationLibrary = this.animationLibrary;
      if (this.iconLibrary !== "none") conf.iconLibrary = this.iconLibrary;

      return conf;
    }
  },

  methods: {
    sendNotification() {
      const quote = this.quotes.pop();
      this.$notify(
        quote.quote,
        quote.author,
        this.notificationType,
        this.demoName
      );
    },

    loadQuotes() {
      window.axios
        .get("http://quotes.stormconsultancy.co.uk/quotes.json")
        .then(response => {
          this.quotes = response.data;
          this.quotes.sort(() => Math.random() - 0.5);
        })
        .catch(errors => {
          console.log(errors);
        });
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
    }
  },

  created() {
    this.loadQuotes();
  }
};
</script>

<style lang="scss">
@import "./assets/scss/demo.scss";
</style>
