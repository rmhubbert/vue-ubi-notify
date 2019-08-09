<template>
  <main id="content">
    <h1>UbiNotify</h1>
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
        <button @click.prevent="sendNotification">UbiNotify Me!</button>
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
      types: ["primary", "secondary", "success", "failure", "warning"],
      currentIndex: 4
    };
  },

  methods: {
    sendNotification() {
      this.$notify(this.body, this.heading, this.getNotificationType());
    },

    getNotificationType() {
      if (this.currentIndex >= 4) {
        this.currentIndex = 0;
      } else {
        this.currentIndex++;
      }
      return this.types[this.currentIndex];
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Rubik:300,400,500,700&display=swap");

$border-color: #ccc;
$border-radius: 1rem;
$box-shadow: 1px 5px 7px 0px rgba(0, 0, 0, 0.1);

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
}

h1 {
  font-size: 4rem;
  font-weight: normal;
  letter-spacing: 0.2rem;
}

p {
  font-weight: normal;
  letter-spacing: 0.07em;
}

#form-wrapper {
  width: 100%;
  text-align: center;
  margin: 3rem auto 0 auto;
}

form {
  text-align: center;
  font-size: 1.2rem;
}

input {
  display: inline-block;
  border: none;
  border: 1px solid $border-color;
  border-radius: $border-radius;
  padding: 0.5rem;
  margin: 0 1rem 2rem 1rem;
  text-align: center;
  width: 40%;
  box-shadow: $box-shadow;
}

button {
  padding: 0.5rem 2rem;
  background-color: #ccc;
  border-radius: $border-radius;
  cursor: pointer;
  box-shadow: $box-shadow;
  background-image: linear-gradient(#f2f2f2, #e6e6e6);
  letter-spacing: 0.12em;
}
</style>
