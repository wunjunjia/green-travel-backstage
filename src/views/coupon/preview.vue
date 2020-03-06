<template>
  <custom-mask @click="close">
    <div class="coupon-preview-container">
      <coupon
        :integral="target.integral"
        :day="target.day"
        :description="target.description"/>
    </div>
  </custom-mask>
</template>

<script>
import CustomMask from '@/components/CustomMask/index.vue';
import Coupon from '@/components/Coupon/index.vue';

export default {
  name: 'CouponPreview',
  props: {
    target: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    CustomMask,
    Coupon,
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
  .coupon-preview-container {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 380px;
    transform: translate(-50%, -50%);
  }
</style>

<style lang="scss" scoped>
  @media screen and (max-width: $dividingLine) {
    .coupon-preview-container {
      width: 90%;
    }
  }
</style>