<template>
  <el-form
    :inline="true"
    :model="formData"
    @submit.native.prevent
  >
    <el-form-item>
      <el-input
        v-model="formData.name"
        placeholder="商品名称"
        @input="input"
        ></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import formMixin from '@/mixins/form';
import { debounce } from '@/utils/common';

export default {
  name: 'MerchandiseSearch',
  mixins: [formMixin],
  data() {
    return {
      formData: {
        name: '',
      },
      input: debounce(() => {
        this.trim('name');
        this.submit();
      }),
    };
  },
  methods: {
    submit() {
      this.$emit('submit', {
        name: this.formData.name,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .el-form-item {
    margin-top: 4px;
    margin-bottom: 4px;
  }
</style>