<template>
  <el-form
    :inline="true"
    :model="formData"
    @submit.native.prevent
  >
    <el-form-item>
      <el-select v-model="formData.status" placeholder="状态">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-date-picker
        v-model="formData.create_time.min"
        type="date"
        placeholder="起始日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-date-picker
        v-model="formData.create_time.max"
        type="date"
        placeholder="结束日期">
      </el-date-picker>
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
import moment from 'moment';

export default {
  name: 'AdvertisementSearch',
  data() {
    return {
      formData: {
        status: -1,
        create_time: {
          min: '',
          max: '',
        },
      },
      options: [{
        value: -1,
        label: '全部',
      }, {
        value: 0,
        label: '停用',
      }, {
        value: 1,
        label: '启用',
      }],
    };
  },
  methods: {
    submit() {
      const { status, create_time: { min, max } } = this.formData;
      if (min && max && min > max) {
        this.formData.create_time.min = max;
        this.formData.create_time.max = min;
      }
      this.$emit('submit', {
        status,
        create_time: {
          min: min ? moment(this.formData.create_time.min).format('YYYY-MM-DD') : '',
          max: max ? moment(this.formData.create_time.max).format('YYYY-MM-DD') : '',
        },
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