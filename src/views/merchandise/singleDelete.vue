<template>
  <el-button
    type="danger"
    size="medium"
    :loading="loading"
    :disabled="loading"
    @click="openDialog">删除</el-button>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MerchandiseSingleDelete',
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    openDialog() {
      this.$emit('open-dialog', this.singleDelete);
    },
    singleDelete() {
      if (this.loading) return Promise.resolve();
      this.loading = true;
      return axios.post('/api/merchandise/delete', {
        ids: [this.id],
      }).then((result) => {
        if (result.data.code !== 0) {
          this.$message.error('删除失败！');
          return;
        }
        this.$message.success('删除成功！');
        this.$emit('single-delete');
      }).finally(() => {
        this.loading = false;
      });
    },
  },
};
</script>