<template>
  <router-link :to="url">
    <slot/>
  </router-link>
</template>

<script>
export default {
  name: 'InsideLink',
  props: {
    url: {
      type: String,
      required: true,
    },
  },
};
</script>