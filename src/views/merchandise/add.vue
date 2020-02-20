<template>
  <div class="merchandise-add-container">
    <el-row>
      <el-col :xs="24" :sm="18" :md="12">
        <merchandise-form ref="form" @submit="submit"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import MerchandiseForm from './form.vue';

export default {
  name: 'MerchandiseAdd',
  components: {
    MerchandiseForm,
  },
  methods: {
    submit(payload) {
      const {
        name,
        description,
        integral,
        path,
        status,
        stock,
      } = payload;
      axios.post('/api/merchandise/save', {
        name,
        description,
        integral: parseFloat(integral),
        status,
        stock,
        path,
        create_time: moment().format('YYYY-MM-DD'),
      }, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
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
  .merchandise-add-container {
    padding: 10px;
  }
</style>