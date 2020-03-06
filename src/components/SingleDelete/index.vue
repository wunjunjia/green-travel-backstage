<template>
  <el-button
    type="danger"
    size="medium"
    :loading="loading"
    @click="openDialog">删除</el-button>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SingleDelete',
  props: {
    id: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
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
      if (this.loading) return;
      this.$emit('open-dialog', this.singleDelete);
    },
    singleDelete() {
      this.loading = true;
      return axios.post(this.url, {
        ids: [this.id],
      }, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
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