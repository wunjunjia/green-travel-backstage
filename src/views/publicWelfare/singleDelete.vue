<template>
  <el-button
    type="danger"
    size="medium"
    :disabled="disabled"
    @click="openDialog">删除</el-button>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PublicWelfareSingleDelete',
  props: {
    id: {
      type: Number,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    openDialog() {
      this.$emit('open-dialog', this.singleDelete);
    },
    singleDelete() {
      return axios.post('/api/publicWelfare/delete', {
        ids: [this.id],
      }).then((result) => {
        if (result.data.code !== 0) {
          this.$message.error('删除失败！');
          return;
        }
        this.$message.success('删除成功！');
        this.$emit('single-delete');
      });
    },
  },
};
</script>