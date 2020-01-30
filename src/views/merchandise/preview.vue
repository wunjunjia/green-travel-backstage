<template>
  <div class="preview-container">
    <slot />
    <div class="operation-container">
      <span @click="toggle">
        <i class="el-icon-zoom-in"></i>
      </span>
    </div>
    <transition name="fade">
      <custom-mask v-show="preview">
        <div class="content-contaienr">
          <span class="icon">
            <i @click="toggle" class="el-icon-close"></i>
          </span>
          <img :src="path" alt="avatar">
        </div>
      </custom-mask>
    </transition>
  </div>
</template>

<script>
import CustomMask from './mask.vue';

export default {
  name: 'Preview',
  props: {
    path: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      preview: false,
    };
  },
  components: {
    CustomMask,
  },
  methods: {
    toggle() {
      this.preview = !this.preview;
    },
  },
};
</script>

<style lang="scss" scoped>
  .preview-container {
    position: relative;
    display: inline-block;

    .operation-container {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      opacity: 0;
      background-color: rgba(0,0,0,.5);
      transition: opacity .3s;
      color: #fff;
      font-size: px2rem(18);
    }

    &:hover {
      .operation-container {
        opacity: 1;
      }
    }

    .content-contaienr {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50%;
      padding: px2rem(40) px2rem(20) px2rem(20) px2rem(20);
      background-color: #fff;

      .icon {
        position: absolute;
        top: px2rem(10);
        right: px2rem(20);
        color: #909399;
        font-size: px2rem(22);
      }

      >img {
        display: block;
        width: 100%;
      }

      @media screen and (max-width: 750px) {
        width: 90%;
      }
    }
  }
</style>