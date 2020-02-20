<template>
  <el-form
    :model="formData"
    :rules="rules"
    ref="form"
    label-width="60px"
    status-icon
  >
    <el-form-item label="图片" required>
      <el-upload
        action="/api/upload/advertisement"
        name="advertisement"
        :show-file-list="false"
        :before-upload="beforeUpload"
        :on-success="success"
        :on-error="error"
        :accept="accept"
        class="upload-container"
      >
        <div class="avatar-container">
          <custom-image :url="imageUrl" @load="load(imageUrl)" />
        </div>
      </el-upload>
    </el-form-item>
    <el-form-item label="外链" prop="outside_link">
      <el-input
        type="textarea"
        v-model="formData.outside_link"
        clearable
        show-word-limit
        maxlength="600"
        resize="none"
        rows="5"
        @blur="trim('outside_link')"
      ></el-input>
    </el-form-item>
    <el-form-item label="状态" required>
      <el-switch
        v-model="formData.status"
        active-color="#13ce66"
        inactive-color="#ff4949">
      </el-switch>
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
  name: 'AdvertisementForm',
  mixins: [formMixin, uploadMixin],
  props: {
    id: {
      type: Number,
      default: -1,
    },
    path: {
      type: String,
      default: '',
    },
    outside_link: {
      type: String,
      default: '',
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formData: {
        status: false,
        outside_link: '',
      },
      rules: {
        outside_link: [
          { required: true, message: '不能为空' },
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
        this.fileList = [{ imageUrl: '', path: '' }];
        return;
      }
      this.fileList = [{
        path: this.path,
        imageUrl: this.path,
      }];
      this.formData.status = this.status;
      this.formData.outside_link = this.outside_link;
      // this.$refs.form.clearValidate('outside_link');
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
          status: this.formData.status ? 1 : 0,
          outside_link: this.formData.outside_link,
          path: this.fileList[0].path,
        });
      });
    },
    reset() {
      this.init();
    },
  },
};
</script>

<style lang="scss" scoped>
  .upload-container {
    display: flex;
    .avatar-container {
      width: 100%;
    }
  }
  .el-form-item {
    margin-bottom: 10px;
  }
</style>