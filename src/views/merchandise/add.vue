<template>
  <div class="merchandise-add-container">
    <merchandise-form ref="form" @submit="submit"/>
  </div>
</template>

<script>
import axios from 'axios';
import { getDate } from '@/utils/date';
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
      } = payload;
      axios.post('/api/merchandise/save', {
        name,
        description,
        integral: parseFloat(integral),
        path,
        create_time: getDate(),
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
    box-sizing: border-box;
    width: 80%;
    padding: 20px;

    @media screen and (max-width: $dividingLine){
      width: 100%;
      padding: px2rem(10);
    }
  }
</style>