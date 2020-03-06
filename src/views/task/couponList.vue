<template>
  <custom-mask @click="close">
    <div class="coupon-list-container">
      <ul class="coupon-list">
        <li class="item" v-for="item in coupons" :key="item.id">
          <coupon
            :integral="item.integral"
            :day="item.day"
            :description="item.description" />
        </li>
      </ul>
      <p class="empty" v-if="coupons.length === 0">暂无数据</p>
    </div>
  </custom-mask>
</template>

<script>
import CustomMask from '@/components/CustomMask/index.vue';
import Coupon from '@/components/Coupon/index.vue';

export default {
  name: 'CouponList',
  props: {
    coupons: {
      type: Array,
      default: () => ([]),
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
  .coupon-list-container {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    padding: 10px;
    transform: translate(-50%, -50%);
    background-color: #fafafc;
    border-radius: 4px;
    .item {
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .empty {
    text-align: center;
    font-size: 14px;
    color: #999;
  }
</style>

<style lang="scss" scoped>
  @media screen and (max-width: $dividingLine) {
    .coupon-list-container {
      width: 90%;
    }
  }
</style>