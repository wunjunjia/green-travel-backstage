<template>
  <el-image
    class="custom-image-container"
    :src="url"
    :fit="fit"
    @load="load">
    <div slot="error" class="image-error">
      <i class="el-icon-picture-outline"></i>
    </div>
  </el-image>
</template>

<script>
export default {
  name: 'CustomImage',
  props: {
    url: {
      type: String,
      default: '',
    },
    fit: {
      type: String,
      default: 'cover',
    },
  },
  methods: {
    load() {
      this.$emit('load');
    },
  },
};
</script>

<style lang="scss">
  .custom-image-container {
    display: flex;
    width: 100%;
    height: 100%;
    border-radius: 4px;

    .image-error {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      min-height: 40px;
      font-size: 24px;
      color: #C0C4CC;
    }
  }
</style>