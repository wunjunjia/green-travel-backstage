<template>
  <el-form
    :model="formData"
    :rules="rules"
    ref="form"
    label-width="80px"
    status-icon
  >
    <el-form-item label="标题" prop="title">
      <el-input v-model="formData.title"></el-input>
    </el-form-item>
    <el-form-item :label="formData.type === 0 ? '里程/km' : '次数'" prop="aim">
      <el-input v-model="formData.aim"></el-input>
    </el-form-item>
    <el-form-item label="类型" required>
      <el-radio v-model="formData.type" :label="0">骑行</el-radio>
      <el-radio v-model="formData.type" :label="1">公交</el-radio>
      <el-radio v-model="formData.type" :label="2">地铁</el-radio>
      <el-radio v-model="formData.type" :label="3">高铁</el-radio>
    </el-form-item>
    <el-form-item label="任务要求" prop="description">
      <el-input
        type="textarea"
        v-model="formData.description"
        maxlength="100"
        show-word-limit
        resize="none"
        rows="3"
        @blur="trim('description')"
      ></el-input>
    </el-form-item>
    <el-form-item label="成长值" prop="growth">
      <el-input v-model="formData.growth"></el-input>
    </el-form-item>
    <el-form-item label="碳积分" prop="integral">
      <el-input v-model="formData.integral"></el-input>
    </el-form-item>
    <el-form-item label="优惠卷" prop="coupons">
      <el-select
        v-model="formData.coupons"
        placeholder="请选择"
        multiple>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="loading" @click="submit">提交</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios';
import formMixin from '@/mixins/form';

export default {
  name: 'TaskForm',
  mixins: [formMixin],
  props: {
    id: {
      type: Number,
      default: -1,
    },
    title: {
      type: String,
      default: '今日骑行',
    },
    aim: {
      type: Number,
      default: 3,
    },
    type: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: '当天骑行里程达到三公里以上即可领取奖励！',
    },
    integral: {
      type: Number,
      default: 10,
    },
    growth: {
      type: Number,
      default: 10,
    },
    coupons: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      formData: {
        description: '',
        title: '',
        aim: '',
        type: 0,
        integral: '',
        growth: '',
        coupons: [],
      },
      rules: {
        aim: [
          { required: true, message: '不能为空' },
          { pattern: /^[1-9][0-9]{0,4}$/, message: '不符合要求' },
        ],
        integral: [
          { required: true, message: '不能为空' },
          { pattern: /^[1-9][0-9]{0,4}$/, message: '不符合要求' },
        ],
        growth: [
          { required: true, message: '不能为空' },
          { pattern: /^[1-9][0-9]{0,4}$/, message: '不符合要求' },
        ],
        title: [
          { required: true, message: '不能为空' },
        ],
        description: [
          { required: true, message: '不能为空' },
        ],
      },
      loading: false,
      options: [],
    };
  },
  watch: {
    id() {
      this.init();
    },
    coupons(value) {
      this.formData.coupons = value;
    },
  },
  methods: {
    init() {
      this.formData.aim = this.aim;
      this.formData.title = this.title;
      this.formData.description = this.description;
      this.formData.integral = this.integral;
      this.formData.growth = this.growth;
      this.formData.type = this.type;
      this.formData.coupons = this.coupons;
    },
    cancel() {
      this.loading = false;
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (!valid || this.loading) return;
        this.loading = true;
        this.$emit('submit', {
          title: this.formData.title,
          aim: parseInt(this.formData.aim, 10),
          type: this.formData.type,
          description: this.formData.description,
          integral: parseInt(this.formData.integral, 10),
          growth: parseInt(this.formData.growth, 10),
          coupons: this.formData.coupons,
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
    axios.get('/api/coupon/all')
      .then((result) => {
        const { code, data } = result.data;
        if (code === 0) {
          this.options = data.map(item => ({
            label: `${item.integral}积分优惠卷`,
            value: item.id,
          }));
          return;
        }
        this.$message.error('获取数据失败！');
      });
  },
};
</script>