<template>
  <a :href="url" target="_blank" rel="noopener">
    <slot/>
  </a>
</template>

<script>
export default {
  name: 'OutsideLink',
  props: {
    url: {
      type: String,
      required: true,
    },
  },
};
</script>