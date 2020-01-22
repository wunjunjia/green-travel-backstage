<template>
  <div class="container">
    <el-form
      :model="formData"
      :rules="rules"
      ref="form"
      label-width="100px"
      class="form"
      status-icon
    >
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="formData.name" @input="trim('name')"></el-input>
      </el-form-item>
      <el-form-item label="碳积分" prop="integral">
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
          @blur="trim('desc')"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品名称" required>
        <el-upload
          action="/api/upload"
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
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MerchandiseAdd',
  data() {
    return {
      formData: {
        name: '',
        desc: '',
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
          { pattern: /(^[1-9][0-9]{0,4}(\.[0-9]{1,2})?$)|(^0?\.[0-9]{1,2}$)/, message: '数值不符合要求' },
        ],
        description: [
          {
            required: true,
            message: '不能为空',
            whitespace: true,
          },
        ],
      },
      imageUrl: '',
      whiteList: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
      size: 1024 * 1024 * 5,
      path: '',
    };
  },
  methods: {
    submit() {
      if (this.path === '') this.$message.error('请选择一张图片！');
      this.$refs.form.validate((valid) => {
        if (valid && this.path !== '') {
          axios.post('/api/merchandise/save', {
            name: this.formData.name,
            description: this.formData.description,
            path: this.path,
            integral: parseFloat(this.formData.integral),
          }, {
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
            },
          }).then((res) => {
            const { code } = res.data;
            if (code === 0) this.$message.success('提交成功！');
            else this.$message.error('提交失败！');
          });
        }
      });
    },
    reset() {
      this.imageUrl = '';
      this.path = '';
      this.$refs.form.resetFields();
    },
    trim(field) {
      this.formData[field] = this.formData[field].trim();
    },
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
  },
};
</script>

<style lang="scss" scoped>
  .container {
    padding: px2rem(10);

    @media screen and (min-width: 750px){
      width: 80%;
    }

    .upload-container {
      font-size: px2rem(28);
      color: #8c939d;
      width: px2rem(148);
      height: px2rem(148);
      line-height: px2rem(148);
      text-align: center;
      border: 1px dashed #d9d9d9;
      border-radius: px2rem(6);
      cursor: pointer;
      position: relative;
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
  }
</style>