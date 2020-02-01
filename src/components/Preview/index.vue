<template>
  <div class="preview-container">
    <slot />
    <div class="operation-container">
      <span class="icon" @click="toggle">
        <i class="el-icon-zoom-in"></i>
      </span>
    </div>
    <transition name="fade">
      <custom-mask v-show="preview">
        <div class="mask-content">
          <span class="icon" @click="toggle">
            <i class="el-icon-close"></i>
          </span>
          <img :src="path">
        </div>
      </custom-mask>
    </transition>
  </div>
</template>

<script>
import CustomMask from '@/components/CustomMask/index.vue';

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
    display: block;
    height: 100%;

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
      font-size: 22px;
    }

    &:hover {
      .operation-container {
        opacity: 1;
      }
    }

    .mask-content {
      box-sizing: border-box;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 500px;
      padding: 40px 20px 20px 20px;
      background-color: #fff;
      transform: translate(-50%, -50%);

      .icon {
        position: absolute;
        top: 10px;
        right: 20px;
        color: #909399;
        font-size: 22px;
      }
    }
  }
</style>

<style lang="scss" scoped>
  @media screen and (max-width: $dividingLine) {
    .preview-container {
      .operation-container {
        font-size: px2rem(18);
      }

      .mask-content {
        width: 90%;
        padding: px2rem(40) px2rem(10) px2rem(10) px2rem(10);

        .icon {
          top: px2rem(10);
          right: px2rem(10);
          font-size: px2rem(22);
        }
      }
    }
  }
</style>