<template>
  <el-form
      :model="formData"
      :rules="rules"
      ref="form"
      label-width="100px"
      status-icon
    >
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="formData.name" @blur="trim('name')"></el-input>
      </el-form-item>
      <el-form-item label="碳积分" prop="integral" @blur="trim('integral')">
        <el-input v-model="formData.integral"></el-input>
      </el-form-item>
      <el-form-item label="商品描述" prop="description">
        <el-input
          type="textarea"
          v-model="formData.description"
          clearable
          maxlength="300"
          show-word-limit
          resize="none"
          rows="5"
          @blur="trim('description')"
        ></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          action="/api/upload/merchandise"
          name="merchandise"
          :show-file-list="false"
          :before-upload="beforeUpload"
          :on-success="success"
          :on-error="error"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" @load="load">
          <div v-else class="upload-container">
            <i class="el-icon-plus"></i>
          </div>
        </el-upload>
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
  name: 'MerchandiseForm',
  mixins: [formMixin],
  props: {
    id: {
      type: Number,
      default: -1,
    },
    name: {
      type: String,
      default: '',
    },
    integral: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    oldPath: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      formData: {
        name: '',
        description: '',
        integral: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: '不能为空',
            whitespace: true,
          },
        ],
        integral: [
          { required: true, message: '不能为空' },
          { pattern: /(^[1-9][0-9]{0,4}(\.[0-9]{1,2})?$)|(^0?\.[0-9]{1,2}$)/, message: '不符合要求' },
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
      imageUrl: '',
      whiteList: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
      size: 1024 * 1024 * 5,
      path: '',
    };
  },
  watch: {
    id() {
      this.formData.name = this.name;
      this.formData.description = this.description;
      this.formData.integral = this.integral;
      this.path = this.oldPath;
      this.imageUrl = this.oldPath;
    },
  },
  methods: {
    beforeUpload(file) {
      if (this.whiteList.indexOf(file.type) === -1) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
        return false;
      }
      if (file.size > this.size) {
        this.$message.error('上传头像图片大小不能超过 5MB!');
        return false;
      }
      return true;
    },
    success(res, file) {
      this.path = res;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    error() {
      this.$message.error('图片上传失败！');
    },
    load() {
      URL.revokeObjectURL(this.imageUrl);
    },
    cancel() {
      this.loading = false;
    },
    submit() {
      if (this.path === '') {
        this.$message.error('请选择一张图片！');
        return;
      }
      this.$refs.form.validate((valid) => {
        if (!valid) return;
        this.loading = true;
        this.$emit('submit', {
          name: this.formData.name,
          description: this.formData.description,
          integral: parseFloat(this.formData.integral),
          path: this.path,
        });
      });
    },
    reset() {
      this.imageUrl = '';
      this.path = '';
      this.$refs.form.resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
  .upload-container {
    position: relative;
    width: px2rem(148);
    height: px2rem(148);
    border: 1px dashed #d9d9d9;
    border-radius: px2rem(6);
    font-size: px2rem(28);
    color: #8c939d;
    line-height: px2rem(148);
    text-align: center;
    cursor: pointer;
    overflow: hidden;
    background-color: #fbfdff;

    &:hover {
      border-color: #409EFF;
      color: #409eff;
    }
  }

  .avatar {
    display: block;
    width: px2rem(148);
    height: px2rem(148);
    border-radius: px2rem(6);
  }
</style>