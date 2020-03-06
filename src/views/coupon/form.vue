<template>
  <el-form
    :model="formData"
    :rules="rules"
    ref="form"
    label-width="80px"
    status-icon
  >
    <el-form-item label="积分" prop="integral">
      <el-input v-model="formData.integral"></el-input>
    </el-form-item>
    <el-form-item label="天数" prop="day">
      <el-input v-model="formData.day"></el-input>
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input
        type="textarea"
        v-model="formData.description"
        clearable
        maxlength="200"
        show-word-limit
        resize="none"
        rows="5"
        @blur="trim('description')"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="loading" @click="submit">提交</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import formMixin from '@/mixins/form';

export default {
  name: 'CouponForm',
  mixins: [formMixin],
  props: {
    id: {
      type: Number,
      default: -1,
    },
    integral: {
      type: Number,
      default: 10,
    },
    day: {
      type: Number,
      default: 1,
    },
    description: {
      type: String,
      default: '此优惠卷可以在积分商城兑换商品时减免10积分。请亲留意有效时间，不然过期就无法使用了哟！',
    },
  },
  data() {
    return {
      formData: {
        description: '',
        integral: '',
        day: '',
      },
      rules: {
        integral: [
          { required: true, message: '不能为空' },
          { pattern: /^[1-9][0-9]{0,4}$/, message: '不符合要求' },
        ],
        day: [
          { required: true, message: '不能为空' },
          { pattern: /^[1-9][0-9]{0,4}$/, message: '不符合要求' },
        ],
        description: [
          {
            required: true,
            message: '不能为空',
            whitespace: true,
          },
        ],
      },
      loading: false,
    };
  },
  watch: {
    id() {
      this.init();
    },
  },
  methods: {
    init() {
      this.formData.integral = this.integral;
      this.formData.day = this.day;
      this.formData.description = this.description;
    },
    cancel() {
      this.loading = false;
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (!valid || this.loading) return;
        this.loading = true;
        this.$emit('submit', {
          description: this.formData.description,
          integral: this.formData.integral,
          day: this.formData.day,
        });
      });
    },
    reset() {
      this.init();
      if (this.id === -1) this.$refs.form.resetFields();
    },
  },
  mounted() {
    this.init();
  },
};
</script>