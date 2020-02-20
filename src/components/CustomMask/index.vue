<template>
  <div class="mask-container" @click.self="handle">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'CustomMask',
  methods: {
    handle() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" scoped>
  .mask-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1998;
    background-color: rgba(0, 0, 0, .5);
  }
</style>