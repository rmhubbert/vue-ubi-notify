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
    clickToRemove: {
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
    }
  }
};
</script>

<style lang="css"></style>
