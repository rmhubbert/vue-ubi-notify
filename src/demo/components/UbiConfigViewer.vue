<template>
  <!-- prettier-ignore -->
  <pre>
  <slot name="before"></slot>{{ configString }}<slot name="after"></slot>
  </pre>
</template>

<script>
export default {
  name: "UbiConfigViewer",
  props: {
    config: {
      type: Object,
      required: true
    }
  },

  data() {
    return {};
  },

  computed: {
    configString() {
      return this.parseConfig();
    }
  },

  methods: {
    parseConfigObject(configObject, tabMultiplier = 1) {
      let configString = `{\n`;
      Object.keys(configObject).forEach(key => {
        if (
          typeof configObject[key] === "object" &&
          configObject[key].constructor === Object
        ) {
          configString += `${this.getTabs(tabMultiplier)}${key}: `;
          configString += this.parseConfigObject(
            configObject[key],
            tabMultiplier + 1
          );
          configString += `${this.getTabs(tabMultiplier)}\n`;
        } else {
          configString += `${this.getTabs(
            tabMultiplier
          )}${key}: ${this.formatEntry(configObject[key])},\n`;
        }
      });
      configString += `${this.getTabs(tabMultiplier - 1)}}`;
      if (tabMultiplier > 1) configString += `,`;
      return configString;
    },

    formatEntry(entry) {
      if (typeof entry === "string") return `"${entry}"`;
      return entry;
    },

    getTabs(multiplier) {
      let tabs = "";
      for (let i = 0; i < multiplier; i++) {
        tabs += `    `;
      }
      return tabs;
    },

    parseConfig() {
      return this.parseConfigObject(this.config);
    }
  }
};
</script>

<style lang="css"></style>
