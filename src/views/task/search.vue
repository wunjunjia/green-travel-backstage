<template>
  <el-form
    :inline="true"
    :model="formData"
    @submit.native.prevent
  >
    <el-form-item>
      <el-select v-model="formData.type" placeholder="类型">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        size="medium"
        @click="submit">查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'TaskSearch',
  data() {
    return {
      formData: {
        type: -1,
      },
      options: [{
        value: -1,
        label: '全部',
      }, {
        value: 0,
        label: '骑行',
      }, {
        value: 1,
        label: '公交',
      }, {
        value: 2,
        label: '地铁',
      }, {
        value: 3,
        label: '高铁',
      }],
    };
  },
  methods: {
    submit() {
      this.$emit('submit', this.formData.type);
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