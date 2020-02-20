<template>
  <el-button
    type="danger"
    size="medium"
    :loading="loading"
    @click="openDialog">删除</el-button>
</template>

<script>
export default {
  name: 'ConversionSingleDelete',
  props: {
    id: {
      type: Number,
      required: true,
    },
    singleDelete: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    openDialog() {
      this.$emit('open-dialog', this.delete);
    },
    async delete() {
      this.loading = true;
      await this.singleDelete();
      this.loading = false;
    },
  },
};
</script>