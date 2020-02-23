<template>
  <div>
    <el-button
      type="success"
      size="medium"
      :disabled="disabled"
      v-if="status === 0"
      @click="audit(1)">通过</el-button>
    <el-button
      type="warning"
      size="medium"
      :disabled="disabled"
      v-if="status === 0"
      @click="prompt">不通过</el-button>
    <el-button
      type="primary"
      size="medium"
      :disabled="disabled"
      v-if="status !== 0"
      @click="audit(0)">重审</el-button>
    <el-button
      type="danger"
      size="medium"
      :disabled="disabled"
      @click="openDialog">删除</el-button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PublicWelfareOperator',
  props: {
    id: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      disabled: false,
    };
  },
  methods: {
    audit(status, reason = '') {
      this.disabled = true;
      axios.post('/api/publicWelfare/audit', {
        status,
        id: this.id,
        reason,
      }).then((result) => {
        const { code } = result.data;
        if (code === 0) {
          this.$emit('audit', { id: this.id, status, reason });
          this.$message({ type: 'success', message: '操作成功！' });
          return;
        }
        this.$message({ type: 'error', message: '操作失败！' });
      }).finally(() => {
        this.disabled = false;
      });
    },
    prompt() {
      this.$prompt('原因:', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'textarea',
        inputValidator: (val) => {
          if (val.trim().length === 0) return '数据不符合要求！';
          return true;
        },
      }).then(({ value }) => {
        this.audit(2, value.trim());
      });
    },
    singleDelete() {
      if (this.disabled) return Promise.resolve();
      this.disabled = true;
      return axios.post('/api/publicWelfare/delete', {
        ids: [this.id],
      }).then((result) => {
        if (result.data.code !== 0) {
          this.$message.error('删除失败！');
          return;
        }
        this.$message.success('删除成功！');
        this.$emit('single-delete');
      }).finally(() => {
        this.disabled = false;
      });
    },
    openDialog() {
      this.$emit('open-dialog', this.singleDelete);
    },
  },
};
</script>