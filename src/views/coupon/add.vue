<template>
  <div class="coupon-add-container">
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
  name: 'CouponAdd',
  components: {
    CouponForm,
  },
  methods: {
    submit(payload) {
      const {
        description,
        integral,
        day,
      } = payload;
      axios.post('/api/coupon/save', {
        description,
        integral,
        day,
      }).then((res) => {
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
  .coupon-add-container {
    padding: 10px;
  }
</style>