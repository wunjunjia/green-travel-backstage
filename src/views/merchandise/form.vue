<template>
  <el-form
    :model="formData"
    :rules="rules"
    ref="form"
    label-width="80px"
    status-icon
  >
    <el-form-item label="名称" prop="name">
      <el-input v-model="formData.name" @blur="trim('name')"></el-input>
    </el-form-item>
    <el-form-item label="碳积分" prop="integral" @blur="trim('integral')">
      <el-input v-model="formData.integral"></el-input>
    </el-form-item>
    <el-form-item label="库存" prop="stock" @blur="trim('stock')">
      <el-input v-model="formData.stock"></el-input>
    </el-form-item>
    <el-form-item label="状态" required>
      <el-switch
        v-model="formData.status"
        active-color="#13ce66"
        inactive-color="#ff4949">
      </el-switch>
    </el-form-item>
    <el-form-item label="描述" prop="description">
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
    <!--
      action="http://localhost:8080/green_travel/api/pictureUtil.action"
      name="image"
      action="/api/upload/merchandise"
      name="merchandise"
    -->
    <el-form-item label="图片" required>
      <el-upload
        action="/api/upload/merchandise"
        name="merchandise"
        :data="{ name: 'merchandise' }"
        :show-file-list="false"
        :before-upload="beforeUpload"
        :on-success="success"
        :on-error="error"
        :accept="accept"
        class="upload-container"
      >
        <div v-if="imageUrl" class="avatar-container">
          <custom-image :url="imageUrl" @load="load(imageUrl)" />
        </div>
        <div v-else class="content-container">
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
import CustomImage from '@/components/CustomImage/index.vue';

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
    stock: {
      type: String,
      default: '',
    },
    status: {
      type: Boolean,
      default: true,
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
        stock: '',
        status: true,
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
        stock: [
          { required: true, message: '不能为空' },
          { pattern: /^(0|[1-9][0-9]{0,4})$/, message: '不符合要求' },
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
  components: {
    CustomImage,
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
        this.formData.status = true;
        this.fileList = [{ imageUrl: '', path: '' }];
        return;
      }
      this.formData.name = this.name;
      this.formData.description = this.description;
      this.formData.integral = this.integral;
      this.formData.status = this.status;
      this.formData.stock = this.stock;
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
        if (!valid || this.loading) return;
        this.loading = true;
        this.$emit('submit', {
          name: this.formData.name,
          description: this.formData.description,
          status: this.formData.status ? 1 : 0,
          stock: parseInt(this.formData.stock, 10),
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
    display: flex;
      .content-container {
        position: relative;
        width: 160px;
        height: 160px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        font-size: 26px;
        color: #8c939d;
        line-height: 160px;
        text-align: center;
        cursor: pointer;
        overflow: hidden;
        background-color: #fbfdff;

        &:hover {
          border-color: #409EFF;
          color: #409eff;
        }
    }
    .avatar-container {
      width: 160px;
      height: 160px;
    }
  }
</style>