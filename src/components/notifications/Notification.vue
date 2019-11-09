<template>
  <div>Base notification</div>
</template>

<script>
export default {
  name: "DefaultNotification",
  props: {
    notification: {
      type: Object,
      required: true
    },
    defaultType: {
      type: String,
      required: false,
      default: "default"
    },
    canBeRemoved: {
      type: Boolean,
      required: false,
      default: true
    },
    iconLibrary: {
      type: String,
      required: false,
      default: "none"
    },
    icons: {
      type: Object,
      required: false
    },
    css: {
      type: Object,
      required: true
    }
  },

  methods: {
    remove() {
      if (this.canBeRemoved) this.$emit("remove", this.notification.id);
    }
  }
};
</script>

<style lang="css"></style>
