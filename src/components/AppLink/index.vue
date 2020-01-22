<template>
  <component :is="link" :url="to">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate';
import OutsideLink from '@/components/OutsideLink/index.vue';
import InsideLink from '@/components/InsideLink/index.vue';

export default {
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  components: {
    OutsideLink,
    InsideLink,
  },
  computed: {
    link() {
      if (isExternal(this.to)) return 'OutsideLink';
      return 'InsideLink';
    },
  },
};
</script>
