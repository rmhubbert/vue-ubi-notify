<script>
export default {
  methods: {
    sleep(duration) {
      return new Promise(resolve => setTimeout(resolve, duration));
    },

    async sleepThenCall(duration, callback, $args = []) {
      await this.sleep(parseInt(duration));
      callback.apply(this, $args);
    }
  }
};
</script>
