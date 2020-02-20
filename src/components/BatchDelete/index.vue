<template>
  <div>
    <el-button
      type="danger"
      size="medium"
      :loading="loading"
      :disabled="disabled"
      @click="openDialog"
    >批量删除</el-button>
  </div>
</template>

<script>
export default {
  name: 'BatchDelete',
  props: {
    ids: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    batchDelete: {
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
      if (this.ids.length === 0) return;
      this.$emit('open-dialog', this.delete);
    },
    async delete() {
      if (this.loading) return;
      this.loading = true;
      await this.batchDelete();
      this.loading = false;
    },
  },
};
</script>