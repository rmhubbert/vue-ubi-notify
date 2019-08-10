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
    showProgressBar: {
      type: Boolean,
      required: false,
      default: false
    },
    progressBar: {
      type: Object,
      required: false,
      default() {
        return {};
      }
    }
  }
};
</script>

<style lang="css"></style>
