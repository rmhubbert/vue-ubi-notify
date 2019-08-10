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
                  <option value="top left" :selected="type == 'top left'"
                    >Top Left</option
                  >
                  <option value="top center" :selected="type == 'top center'"
                    >Top Center</option
                  >
                  <option value="top right" :selected="type == 'top right'"
                    >Top Right</option
                  >
                  <option value="bottom left" :selected="type == 'bottom left'"
                    >Bottom Left</option
                  >
                  <option
                    value="bottom right"
                    :selected="type == 'bottom right'"
                    >Bottom Right</option
                  >
                  <option
                    value="bottom center"
                    :selected="type == 'bottom center'"
                    >Bottom Center</option
                  >
                </select>
              </div>
            </div>
          </div>
          <div class="type-select-wrapper">
            <label for="typeSelect" :class="labelClass">Type</label>
            <div class="control">
              <div :class="selectWrapperClass">
                <select id="typeSelect" v-model="type" :class="selectClass">
                  <option value="default" :selected="type == 'default'"
                    >Default</option
                  >
                  <option value="primary" :selected="type == 'primary'"
                    >Primary</option
                  >
                  <option value="info" :selected="type == 'info'">Info</option>
                  <option value="success" :selected="type == 'success'"
                    >Success</option
                  >
                  <option value="danger" :selected="type == 'danger'"
                    >Danger</option
                  >
                  <option value="warning" :selected="type == 'warning'"
                    >Warning</option
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
                  <option value="default" :selected="cssFramework == 'default'"
                    >UbiNotify default</option
                  >
                  <option value="bulma" :selected="cssFramework == 'bulma'"
                    >Bulma</option
                  >
                  <option
                    value="bootstrap"
                    :selected="cssFramework == 'bootstrap'"
                    >Bootstrap</option
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
  </main>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      heading: "Hello!",
      body: "Here is your message",
      currentIndex: 4,
      cssFramework: "default",
      type: "default",
      position: "top right",
      quotes: [],
      cssFrameworkUrls: [
        {
          name: "default",
          url:
            location.protocol +
            "//" +
            location.host +
            location.pathname +
            "css/default.css"
        },
        {
          name: "bulma",
          url:
            "https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"
        },
        {
          name: "bootstrap",
          url:
            "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        }
      ]
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
      else if (this.cssFramework === "bulma") return "select is-primary";
      else if (this.cssFramework === "bootstrap") return "";
      return "";
    },

    labelClass() {
      if (this.cssFramework === "default") return "ubi-notify-label";
      else if (this.cssFramework === "bulma") return "label";
      else if (this.cssFramework === "bootstrap") return "";
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
      window.location.assign(
        `${window.location.pathname}?css=${this.cssFramework}&type=${this.type}&position=${this.position}`
      );
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

    const framework = this.cssFrameworkUrls.filter(framework => {
      return framework.name === this.cssFramework;
    });

    document.getElementById("remote-style").href = framework[0].url;

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
  max-width: 100%;
  overflow: hidden;
}

#content-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' width='80' height='80'%3E%3Cpath fill='%23f2f2f2' fill-opacity='0.65' d='M14 16H9v-2h5V9.87a4 4 0 1 1 2 0V14h5v2h-5v15.95A10 10 0 0 0 23.66 27l-3.46-2 8.2-2.2-2.9 5a12 12 0 0 1-21 0l-2.89-5 8.2 2.2-3.47 2A10 10 0 0 0 14 31.95V16zm40 40h-5v-2h5v-4.13a4 4 0 1 1 2 0V54h5v2h-5v15.95A10 10 0 0 0 63.66 67l-3.47-2 8.2-2.2-2.88 5a12 12 0 0 1-21.02 0l-2.88-5 8.2 2.2-3.47 2A10 10 0 0 0 54 71.95V56zm-39 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm40-40a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM15 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm40 40a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'%3E%3C/path%3E%3C/svg%3E");
}

#content {
  width: 40%;
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
  width: 70%;
  margin: 3rem auto 0 auto;
  text-align: left;
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
}
</style>
