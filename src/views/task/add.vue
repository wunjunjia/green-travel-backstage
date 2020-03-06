<template>
  <div class="task-add-container">
    <el-row>
      <el-col :xs="24" :sm="18" :md="12">
        <coupon-form ref="form" @submit="submit"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';
import CouponForm from './form.vue';

export default {
  name: 'TaskAdd',
  components: {
    CouponForm,
  },
  methods: {
    submit(payload) {
      axios.post('/api/task/save', payload).then((res) => {
        const { code } = res.data;
        if (code === 0) this.$message.success('提交成功！');
        else this.$message.error('提交失败！');
      }).finally(() => {
        this.$refs.form.cancel();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .task-add-container {
    padding: 10px;
  }
</style>