<template>
  <div>
    <label v-if="label !== ''" :class="labelClass">{{ label }}</label>
    <div class="control">
      <div :class="wrapperClass">
        <select
          id="positionSelect"
          :value="value"
          @change="input"
          v-on="listeners"
          :class="selectClass"
        >
          <option
            v-for="option in options"
            :key="option.id"
            :value="option.id"
            :selected="option.id === value"
          >{{ option.name }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DemoSelect",
  components: {},
  mixins: [],
  props: {
    value: {
      type: [String, Number, Boolean],
      required: true
    },

    cssFramework: {
      type: String,
      required: true
    },

    options: {
      type: Array,
      required: true
    },

    label: {
      type: String,
      required: false,
      default: ""
    }
  },
  data() {
    return {};
  },

  computed: {
    listeners() {
      const { input, ...listeners } = this.$listeners;
      return listeners;
    },

    selectClass() {
      if (this.cssFramework === "default")
        return "ubi-notify-select ubi-notify-primary";
      else if (this.cssFramework === "bulma") return "";
      else if (this.cssFramework === "bootstrap") return "custom-select";
      else if (this.cssFramework === "materialize") return "browser-default";
      else if (this.cssFramework === "semantic ui") return "semui";
      else if (this.cssFramework === "tailwind") return "tailwind";
      return "";
    },

    wrapperClass() {
      if (this.cssFramework === "default") return "ubi-notify-select-wrapper";
      else if (this.cssFramework === "bulma")
        return "select is-primary is-fullwidth";
      else if (this.cssFramework === "bootstrap") return "";
      else if (this.cssFramework === "semantic ui") return "ui form";
      else if (this.cssFramework === "tailwind") return "tailwind";
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
    input(event) {
      this.$emit("input", event.target.value);
    }
  }
};
</script>

<style lang="css"></style>
