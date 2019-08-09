<script>
export default {
  data() {
    return {
      componentImportPath: "./"
    };
  },

  methods: {
    componentIsLoaded(componentName) {
      return Object.values(this.$options.components).filter(
        component =>
          component.name.toLowerCase() === componentName.toLowerCase()
      ).length;
    },

    importComponent(
      componentName,
      componentPath = this.componentImportPath,
      componentFileName = null
    ) {
      if (!componentFileName) componentFileName = componentName;
      console.log(`${componentPath}${componentFileName}`);
      if (this.componentIsLoaded(componentName)) return true;
      const component = require(`${componentPath}${componentFileName}`).default;

      if (component) {
        this.$options.components[componentName] = component;
        return true;
      }

      return false;
    },

    getComponent(
      componentName,
      componentPath = this.componentImportPath,
      componentFileName = null,
      iterate = true
    ) {
      if (this.componentIsLoaded(componentName)) {
        return this.$options.components[componentName];
      } else if (iterate) {
        this.importComponent(componentName, componentPath, componentFileName);
        return this.getComponent(
          componentName,
          componentPath,
          componentFileName,
          false
        );
      }
      return false;
    }
  }
};
</script>
