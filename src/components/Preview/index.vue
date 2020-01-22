<template>
  <div class="preview-container">
    <img @load="load" :src="src" alt="picture">
    <span class="status">
      <i class="el-icon-check"></i>
    </span>
    <div class="operate-container" @click.prevent="preview">
      <i class="el-icon-zoom-in"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Preview',
  props: {
    src: {
      type: String,
      default: '',
    },
  },
  methods: {
    load() {
      if (this.src !== '') window.URL.revokeObjectURL(this.src);
    },
    preview() {
      this.show = !this.show;
      this.$emit('preview');
    },
  },
};
</script>

<style lang="scss" scoped>
  .preview-container {
    position: relative;
    width: px2rem(148);
    height: px2rem(148);
    overflow: hidden;
    color: #fff;

    >img {
      display: inline-block;
      width: 100%;
      height: 100%;
      border-radius: px2rem(6);
      cursor: pointer;
    }

    .status {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      position: absolute;
      width: px2rem(40);
      height: px2rem(24);
      right: px2rem(-15);
      top: px2rem(-6);
      background-color: #13ce66;
      text-align: center;
      transform: rotate(45deg);
      box-shadow: 0 0 1pc 1px rgba(0,0,0,.2);

      i {
        font-size: px2rem(12);
        font-weight: 700;
        transform: rotate(-45deg);
      }
    }

    .operate-container {
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      line-height: px2rem(148);
      text-align: center;
      border-radius: px2rem(6);
      background-color: rgba(0,0,0,.5);
      transition: opacity .3s;

      i {
        font-size: px2rem(22);
      }
    }

    &:hover {
      .operate-container {
        opacity: 1;
      }
    }
  }
</style>