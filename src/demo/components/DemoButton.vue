<template>
  <button :class="buttonClass">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "DemoButton",
  props: {
    cssFramework: {
      type: String,
      required: true
    }
  },

  computed: {
    buttonClass() {
      if (this.cssFramework === "default")
        return "ubi-notify-button ubi-notify-primary";
      else if (this.cssFramework === "bulma") return "button is-primary";
      else if (this.cssFramework === "bootstrap") return "btn btn-primary";
      else if (this.cssFramework === "semantic ui") return "ui primary button";
      else if (this.cssFramework === "tailwind") return "tailwind";
      else if (this.cssFramework === "materialize")
        return "waves-effect waves-light btn";
      return "";
    }
  }
};
</script>

<style lang="scss"></style>
