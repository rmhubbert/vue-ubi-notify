<template>
  <div>{{ body }}</div>
</template>

<script>
export default {
  name: "NotificationGenerator",

  props: {
    body: {
      type: String,
      required: false,
      default: null
    },
    heading: {
      type: String,
      required: false,
      default: null
    }
  },

  mounted() {
    if (this.body) {
      this.$notify(this.body, this.heading);
    }
  }
};
</script>
