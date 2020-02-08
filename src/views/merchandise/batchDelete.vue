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
import axios from 'axios';

export default {
  name: 'MerchandiseBatchDelete',
  props: {
    ids: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
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
      this.$emit('open-dialog', this.batchDelete);
    },
    batchDelete() {
      this.loading = true;
      axios.post('/api/merchandise/delete', {
        ids: this.ids,
      }, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      })
        .then((result) => {
          const { code } = result.data;
          if (code !== 0) {
            this.$message.error('删除失败！');
            return;
          }
          this.$message.success('删除成功！');
          this.$emit('batch-delete');
        }).finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>