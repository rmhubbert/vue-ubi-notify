<template>
  <main id="content">
    <h1 class="title">UbiNotify</h1>
    <p>
      Lightweight. Easy to use. Highly configurable.
    </p>
    <p>
      Out of the box compatibility with<br />Boostrap, Bulma, Semantic UI &amp;
      Materialize<br />CSS Frameworks.
    </p>
    <p>A fully responsive notification plugin for Vue2+.</p>
    <div id="form-wrapper">
      <form @submit.prevent="sendNotification">
        <div class="ubi-container">
          <div class="position-select-wrapper">
            <label for="positionSelect" :class="labelClass">Position</label>
            <div class="control">
              <div :class="selectWrapperClass">
                <select
                  id="positionSelect"
                  v-model="position"
                  :class="selectClass"
                  @change="reloadPage"
                >
                  <option
                    v-for="pos in positions"
                    :key="pos"
                    :value="pos.toLowerCase()"
                    :selected="type == pos.toLowerCase()"
                    >{{ pos }}</option
                  >
                </select>
              </div>
            </div>
          </div>
          <div class="type-select-wrapper">
            <label for="typeSelect" :class="labelClass"
              >Notification Type</label
            >
            <div class="control">
              <div :class="selectWrapperClass">
                <select id="typeSelect" v-model="type" :class="selectClass">
                  <option
                    v-for="t in types"
                    :key="t"
                    :value="t.toLowerCase()"
                    :selected="type == t.toLowerCase()"
                    >{{ t }}</option
                  >
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="ubi-container">
          <div class="css-select-wrapper">
            <label for="cssSelect" :class="labelClass">CSS Framework</label>
            <div class="control">
              <div :class="selectWrapperClass">
                <select
                  id="cssSelect"
                  v-model="cssFramework"
                  @change="reloadPage"
                  :class="selectClass"
                >
                  <option
                    v-for="css in cssFrameworks"
                    :key="css.id"
                    :value="css.id"
                    :selected="cssFramework == css.id"
                    >{{ css.name }}</option
                  >
                </select>
              </div>
            </div>
          </div>

          <div class="css-select-wrapper">
            <label for="iconSelect" :class="labelClass">Icon Library</label>
            <div class="control">
              <div :class="selectWrapperClass">
                <select
                  id="iconSelect"
                  v-model="iconLibrary"
                  @change="reloadPage"
                  :class="selectClass"
                >
                  <option
                    v-for="icon in icons"
                    :key="icon.id"
                    :value="icon.id"
                    :selected="iconLibrary == icon.id"
                    >{{ icon.name }}</option
                  >
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="ubi-container">
          <div class="animation-library-select-wrapper">
            <label for="animationLibrarySelect" :class="labelClass"
              >Animation Library</label
            >
            <div class="control">
              <div :class="selectWrapperClass">
                <select
                  id="animationLibrarySelect"
                  v-model="animationLibrary"
                  @change="reloadPage"
                  :class="selectClass"
                >
                  <option
                    v-for="al in animationLibraries"
                    :key="al.id"
                    :value="al.id"
                    :selected="animationLibrary == al.id"
                    >{{ al.name }}</option
                  >
                </select>
              </div>
            </div>
          </div>

          <div class="animation-select-wrapper">
            <label for="enterAnimationSelect" :class="labelClass"
              >Entry Animation</label
            >
            <div class="control">
              <div :class="selectWrapperClass">
                <select
                  id="enterAnimationSelect"
                  v-model="animationEnter"
                  @change="reloadPage"
                  :class="selectClass"
                  v-for="anim in animationLibraries"
                  :key="anim.id"
                  v-show="animationLibrary === anim.id"
                >
                  <option
                    v-for="enterAnimation in anim.enter"
                    :key="enterAnimation.id"
                    :value="enterAnimation.cssClass"
                    :selected="enterAnimation == enterAnimation.id"
                    >{{ enterAnimation.name }}</option
                  >
                </select>
              </div>
            </div>
          </div>

          <div class="animation-select-wrapper">
            <label for="leaveAnimationSelect" :class="labelClass"
              >Exit Animation</label
            >
            <div class="control">
              <div :class="selectWrapperClass">
                <select
                  id="leaveAnimationSelect"
                  v-model="animationLeave"
                  @change="reloadPage"
                  :class="selectClass"
                  v-for="anim in animationLibraries"
                  :key="anim.id"
                  v-show="animationLibrary === anim.id"
                >
                  <option
                    v-for="leaveAnimation in anim.leave"
                    :key="leaveAnimation.id"
                    :value="leaveAnimation.cssClass"
                    :selected="leaveAnimation == leaveAnimation.id"
                    >{{ leaveAnimation.name }}</option
                  >
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="ubi-container-centered">
          <button @click.prevent="sendNotification" :class="buttonClass">
            UbiNotify!
          </button>
        </div>
      </form>
    </div>

    <div class="code-wrapper">
      <p>
        We've made you a specially compiled config based on your selections
        above. Feel free to have a play around until you find a configuration
        you like. It'll automatically update here for you to copy.
      </p>
      <pre>
import UbiNotify from "vue-ubi-notify";

const UbiNotifyConfig = { 
  name: "CHANGE_THIS_TO_A_UNIQUE_NAME", 
  position: "{{ position }}",
  reverse: {{ compReverse }},{{ compCssFramework }}{{ compIconLibrary
        }}{{ compAnimationEnter }}{{ compAnimationLeave }}
}

Vue.use(UbiNotify, UbiNotifyConfig);
</pre
      >
    </div>
  </main>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      types: ["Default", "Primary", "Info", "Success", "Danger", "Warning"],
      type: "default",
      positions: [
        "Top Left",
        "Top Center",
        "Top Right",
        "Bottom Left",
        "Bottom Center",
        "Bottom Right"
      ],
      position: "top right",
      icons: [
        {
          id: "none",
          name: "None"
        },
        {
          id: "font-awesome",
          name: "Font Awesome"
        },
        {
          id: "google-material",
          name: "Google Material"
        },
        {
          id: "ionicons",
          name: "Ionicons"
        },
        {
          id: "typicons",
          name: "Typicons"
        }
      ],
      iconLibrary: "",
      quotes: [],
      cssFrameworks: [
        {
          name: "UbiNotify default",
          id: "default",
          url:
            location.protocol +
            "//" +
            location.host +
            location.pathname +
            "css/default.css"
        },
        {
          name: "Bulma",
          id: "bulma",
          url:
            "https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"
        },
        {
          name: "Bootstrap",
          id: "bootstrap",
          url:
            "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        }
      ],
      cssFramework: "UbiNotify default style",
      animationLibraries: [
        {
          id: "default",
          name: "UbiNotify default",
          url:
            location.protocol +
            "//" +
            location.host +
            location.pathname +
            "css/default.css",
          enter: [
            {
              id: "fade-in",
              name: "Fade in",
              cssClass: "ubi-notify-transition-fade-in"
            }
          ],
          leave: [
            {
              id: "fade-out",
              name: "Fade out",
              cssClass: "ubi-notify-transition-fade-out"
            }
          ]
        },
        {
          id: "animate.css",
          name: "Animate.css",
          url:
            "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css",
          enter: [
            {
              id: "fade-in",
              name: "Fade in",
              cssClass: "animated fadeIn"
            },
            {
              id: "bounce-in-right",
              name: "Bounce in right",
              cssClass: "animated bounceInRight"
            },
            {
              id: "bounce-in-left",
              name: "Bounce in left",
              cssClass: "animated bounceInLeft"
            },
            {
              id: "bounce-in-down",
              name: "Bounce in down",
              cssClass: "animated bounceInDown"
            },
            {
              id: "bounce-in-up",
              name: "Bounce in up",
              cssClass: "animated bounceInUp"
            }
          ],
          leave: [
            {
              id: "fade-out",
              name: "Fade out",
              cssClass: "animated fadeOut"
            },
            {
              id: "bounce-out-right",
              name: "Bounce out right",
              cssClass: "animated bounceOutRight"
            },
            {
              id: "bounce-out-left",
              name: "Bounce out left",
              cssClass: "animated bounceOutLeft"
            },
            {
              id: "bounce-out-down",
              name: "Bounce out down",
              cssClass: "animated bounceOutDown"
            },
            {
              id: "bounce-out-up",
              name: "Bounce out up",
              cssClass: "animated bounceOutUp"
            }
          ]
        }
      ],
      animationLibrary: "default",
      animationEnter: "",
      animationLeave: ""
    };
  },

  computed: {
    buttonClass() {
      if (this.cssFramework === "default")
        return "ubi-notify-button ubi-notify-primary";
      else if (this.cssFramework === "bulma") return "button is-primary";
      else if (this.cssFramework === "bootstrap") return "btn btn-primary";
      return "";
    },

    selectClass() {
      if (this.cssFramework === "default")
        return "ubi-notify-select ubi-notify-primary";
      else if (this.cssFramework === "bulma") return "";
      else if (this.cssFramework === "bootstrap") return "custom-select";
      return "";
    },

    selectWrapperClass() {
      if (this.cssFramework === "default") return "ubi-notify-select-wrapper";
      else if (this.cssFramework === "bulma")
        return "select is-primary is-fullwidth";
      else if (this.cssFramework === "bootstrap") return "";
      return "";
    },

    labelClass() {
      if (this.cssFramework === "default") return "ubi-notify-label";
      else if (this.cssFramework === "bulma") return "label";
      else if (this.cssFramework === "bootstrap") return "";
      return "";
    },

    compReverse() {
      let reverse = false;
      if (
        this.position === "bottom right" ||
        this.position === "bottom center" ||
        this.position === "bottom left"
      ) {
        reverse = true;
      }
      return reverse;
    },

    compIconLibrary() {
      if (this.iconLibrary !== "" && this.iconLibrary !== "none") {
        return `
  iconLibrary: "${this.iconLibrary}",`;
      }
      return "";
    },

    compAnimationEnter() {
      if (this.animationEnter !== "" && this.animationEnter !== "none") {
        return `
  transitionEnterActiveClass: "${this.animationEnter}",`;
      }
      return "";
    },

    compAnimationLeave() {
      if (this.animationLeave !== "" && this.animationLeave !== "none") {
        return `
  transitionLeaveActiveClass: "${this.animationLeave}",`;
      }
      return "";
    },

    compCssFramework() {
      if (this.cssFramework !== "" && this.cssFramework !== "default") {
        return `
  cssFramework: "${this.cssFramework}",`;
      }
      return "";
    }
  },

  methods: {
    sendNotification() {
      const quote = this.quotes.pop();
      this.$notify(quote.quote, quote.author, this.getNotificationType());
    },

    getNotificationType() {
      return this.type;
    },

    reloadPage() {
      let loc = `${window.location.pathname}?css=${this.cssFramework}&type=${this.type}&position=${this.position}`;
      loc += `&icon=${this.iconLibrary}&animlib=${this.animationLibrary}`;
      loc += `&animEnter=${this.animationEnter}&animLeave=${this.animationLeave}`;
      window.location.assign(loc);
      //document.getElementById("remote-style").href = this.styleSheet;
    }
  },

  created() {
    let uri = window.location.search.substring(1);
    let params = new URLSearchParams(uri);
    if (params.get("css")) this.cssFramework = params.get("css");
    else this.cssFramework = "default";
    if (params.get("type")) this.type = params.get("type");
    else this.type = "default";
    if (params.get("position")) this.position = params.get("position");
    else this.position = "top right";
    if (params.get("icon")) this.iconLibrary = params.get("icon");
    else this.iconLibrary = "none";
    if (params.get("animlib")) this.animationLibrary = params.get("animlib");
    else this.animationLibrary = "default";
    if (params.get("animEnter")) this.animationEnter = params.get("animEnter");
    else this.animationEnter = "fade-in";
    if (params.get("animLeave")) this.animationLeave = params.get("animLeave");
    else this.animationLeave = "fade-out";

    const framework = this.cssFrameworks.filter(framework => {
      return framework.id === this.cssFramework;
    });

    document.getElementById("remote-style").href = framework[0].url;

    const animLib = this.animationLibraries.filter(lib => {
      return lib.id === this.animationLibrary;
    });

    document.getElementById("remote-animation").href = animLib[0].url;

    // get some quotes for the notification content
    window.axios
      .get("http://quotes.stormconsultancy.co.uk/quotes.json")
      .then(response => {
        this.quotes = response.data;
        this.quotes.sort(() => Math.random() - 0.5);
      })
      .catch(errors => {
        console.log(errors);
      });
  }
};
</script>

<style lang="css">
html,
body {
  min-height: 100%;
  font-family: Rubik, "Helvetica Neue", Helvetica, Arial, sans-serif;
}

html {

}

#content-wrapper {
  max-width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' width='80' height='80'%3E%3Cpath fill='%23f2f2f2' fill-opacity='0.65' d='M14 16H9v-2h5V9.87a4 4 0 1 1 2 0V14h5v2h-5v15.95A10 10 0 0 0 23.66 27l-3.46-2 8.2-2.2-2.9 5a12 12 0 0 1-21 0l-2.89-5 8.2 2.2-3.47 2A10 10 0 0 0 14 31.95V16zm40 40h-5v-2h5v-4.13a4 4 0 1 1 2 0V54h5v2h-5v15.95A10 10 0 0 0 63.66 67l-3.47-2 8.2-2.2-2.88 5a12 12 0 0 1-21.02 0l-2.88-5 8.2 2.2-3.47 2A10 10 0 0 0 54 71.95V56zm-39 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm40-40a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM15 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm40 40a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'%3E%3C/path%3E%3C/svg%3E");
}

#content {
  width: 50%;
  text-align: center;
  line-height: 1.5em;
  font-size: 1rem;
}

.ubi-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.ubi-container > div {
  flex-grow: 1;
  margin: 0 1rem;
}

.ubi-container-centered {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

h1.title {
  font-size: 4rem;
  font-weight: normal;
  letter-spacing: 0.2rem;
}

p {
  font-weight: normal;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}

#form-wrapper {
  margin: 3rem auto 0 auto;
  text-align: left;
}

.code-wrapper {
  text-align: left;
  margin: 2rem 0;
}

pre {
  display: block;
  white-space: pre-wrap;
  background-color: hsla(0, 0%, 90%, 0.3);
  margin: 2rem 0;
  padding: 1rem;
  border-radius: 1rem;
}

form {
  font-size: 1.2rem;
}

label, button {
  font-size: 1rem;
  letter-spacing: 0.05rem;
}

.ubi-notify-select-wrapper, .control {
  margin: 0 auto 2rem auto;

}

.custom-select {
  width: 100%;
}

select.ubi-notify-select {
  display: block;
  font-size: 1rem;
  font-family: sans-serif;
  font-weight: normal;
  color: #444;
  line-height: 1.3;
  padding: .6em 1.4em .5em .8em;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0.6rem 0 0 0;
  border: 1px solid #ccc;
  box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
  border-radius: .5em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
    linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
  background-repeat: no-repeat, repeat;
  background-position: right .7em top 50%, 0 0;
  background-size: .65em auto, 100%;
  letter-spacing: 0.12em;
}

button.ubi-notify-button {
  padding: 0.5rem 2rem;
  font-size: 1rem;
  background-color: #aaa;
  border-radius: 0.5em;
  cursor: pointer;
  box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
  background-image: linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
  background-repeat: no-repeat, no-repeat;
  letter-spacing: 0.12em
}

.notification, .toast {
  margin: 1rem;
}

.ubi-notify-bulma.notification {
  padding: 0.7rem;
}

.ubi-notify-bulma p.title {
  font-size: 1rem;
  margin: 0;
}

.ubi-notify-bulma p.content {
  font-size: 0.9rem;
  margin-top: 0.2rem;
  margin-bottom: 0;
}
</style>
