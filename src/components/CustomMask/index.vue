<template>
  <div
    :style="{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1998,
      backgroundColor: 'rgba(0, 0, 0, .5)',
    }"
    @click.self="handle">
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