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
          :accept="accept"
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
import uploadMixin from '@/mixins/upload';

export default {
  name: 'MerchandiseForm',
  mixins: [formMixin, uploadMixin],
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
    path: {
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
      maxUploadCount: 1,
    };
  },
  watch: {
    id() {
      this.init();
    },
  },
  computed: {
    imageUrl() {
      return this.fileList[0].imageUrl;
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.id === -1) {
        this.fileList = [{ imageUrl: '', path: '' }];
        return;
      }
      this.formData.name = this.name;
      this.formData.description = this.description;
      this.formData.integral = this.integral;
      this.fileList = [{
        path: this.path,
        imageUrl: this.path,
      }];
    },
    cancel() {
      this.loading = false;
    },
    submit() {
      if (this.fileList[0].path === '') {
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
          path: this.fileList[0].path,
        });
      });
    },
    reset() {
      this.init();
      if (this.id === -1) this.$refs.form.resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
  .upload-container {
    position: relative;
    width: 180px;
    height: 180px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    font-size: 26px;
    color: #8c939d;
    line-height: 180px;
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
    width: 180px;
    height: 180px;
    border-radius: 6px;
  }
</style>

<style lang="scss" scoped>
  @media screen and (max-width: $dividingLine) {
    .upload-container {
      width: px2rem(148);
      height: px2rem(148);
      border-radius: px2rem(6);
      font-size: px2rem(28);
      line-height: px2rem(148);
    }

    .avatar {
      width: px2rem(148);
      height: px2rem(148);
      border-radius: px2rem(6);
    }
  }
</style>