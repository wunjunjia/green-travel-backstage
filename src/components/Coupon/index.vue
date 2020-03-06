<template>
  <div class="coupon-container">
    <div class="primary">
      <div class="left">
        <p class="integral-container">
          <i class="icon icon-tubiao311 iconfont"></i>
          <span class="integral">{{ integral }}</span>
        </p>
        <p class="text">优惠卷</p>
      </div>
      <div class="middle">
        <p class="title">{{ integral }}积分抵用卷</p>
        <p class="overdue">有效期至: {{ overdue }}</p>
        <p class="rule" @click="toggle">使用规则 <i class="icon" :class="`el-icon-arrow-${ collapsed ? 'up' : 'down' }`"></i></p>
      </div>
      <div class="right">
        <div class="use">立即使用</div>
      </div>
    </div>
    <div class="secondary" v-show="collapsed">
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Coupon',
  props: {
    integral: {
      type: Number,
      default: 0,
    },
    day: {
      type: Number,
      default: 1,
    },
    description: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      collapsed: false,
    };
  },
  computed: {
    overdue() {
      return moment(new Date(Date.now() + this.day * 24 * 60 * 60 * 1000)).format('YYYY-MM-DD');
    },
  },
  methods: {
    toggle() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>

<style lang="scss" scoped>
.coupon-container {
  border-radius: 10px;
  overflow: hidden;
  .primary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    background-color: #fff;
    padding: 10px;
    height: 80px;
  }
  .secondary {
    box-sizing: border-box;
    background-image: linear-gradient(to bottom, #FBFBFB, #FFFFFF);
    padding: 10px;
    color: #9E9E9E;
    font-size: 12px;
    line-height: 1.4;
  }
  .left {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex-basis: 20%;
    .text {
      margin-top: 4px;
      color: #DF6E34;
      font-size: 12px;
    }
    .integral-container {
      color: #EF6136;
      .icon {
        font-size: 12px;
      }
      .integral {
        font-weight: 700;
        font-size: 26px;
      }
    }
  }
  .middle {
    flex-basis: 50%;
    .title {
      color: #222;
      font-weight: 700;
      font-size: 14px;
      margin-bottom: 8px;
    }
    .overdue {
      color: #62615F;
      font-size: 12px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .rule {
      display: flex;
      align-items: center;
      color: #999;
      height: 14px;
      font-size: 12px;
      .icon {
        margin-left: 4px;
      }
    }
  }
  .right {
    flex-basis: 30%;
    .use {
      box-sizing: border-box;
      width: 90%;
      padding: 6px;
      border-radius: 20px;
      background-image: linear-gradient(to right, #F1803D, #EE5948);
      color: #fff;
      text-align: center;
      font-size: 14px;
    }
  }
}
</style>