<template>
  <div class="advertisement-upload-container">
    <el-form label-width="60px">
      <el-form-item label="图片" required>
        <el-upload
          action="/api/upload/advertisement"
          name="advertisement"
          :show-file-list="false"
          :before-upload="beforeUpload"
          :on-success="success"
          :on-error="error"
          :accept="accept"
          :data="{ operate: 'save' }"
          multiple
          drag
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/jpeg/png类型的图片，单张图片大小不得超过5MB！</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <ul class="list">
          <li class="avatar-container" v-for="item in fileList" :key="item.uid">
            <custom-preview
              :path="item.path"
              :imageUrl="item.imageUrl"
              @load="load(item.imageUrl)"/>
            <span class="status" v-show="item.status !== -1" :class="item.status === 0 ? 'success' : 'error'">
              <i :class="`el-icon-${item.status === 0 ? 'check' : 'close' }`"></i>
            </span>
          </li>
        </ul>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import CustomPreview from '@/components/CustomPreview/index.vue';
import uploadMixin from '@/mixins/upload';

export default {
  name: 'AdvertisementForm',
  mixins: [uploadMixin],
  data() {
    return {
      maxUploadCount: 5,
    };
  },
  components: {
    CustomPreview,
  },
};
</script>

<style lang="scss" scoped>
  .advertisement-upload-container {
    padding: 10px;
    background-color: $appMainBg;
    .list {
      display: flex;
      flex-wrap: wrap;
      .avatar-container {
        position: relative;
        width: 350px;
        height: 130px;
        margin-right: 10px;
        margin-bottom: 10px;
        overflow: hidden;
        .status {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          position: absolute;
          right: -15px;
          top: -6px;
          width: 40px;
          height: 24px;
          color: #fff;
          transform: rotate(45deg);
          box-shadow: 0 0 1px 1px rgba(0, 0, 0, .2);

          &.success {
            background-color: #13ce66;
          }

          &.error {
            background-color: #f56c6c;
          }

          i {
            font-size: 12px;
            font-weight: 700;
            transform: rotate(-45deg);
          }
        }
      }
    }
    .el-upload__tip {
      margin-top: 0;
      line-height: 1.5;
    }
  }
</style>

<style lang="scss" scoped>
  @media screen and (max-width: $dividingLine) {
    .advertisement-upload-container {
      .list {
        .avatar-container {
          margin-right: 0;
          width: 100%;
          height: auto;
        }
      }
      .el-upload__tip {
        width: px2rem(280);
      }
    }
  }
</style>

<style lang="scss">
  .advertisement-upload-container {
    .mask-content-container {
      width: 700px;
    }
  }

  @media screen and (max-width: $dividingLine) {
    .advertisement-upload-container {
      .mask-content-container {
        width: 90%;
      }
      .el-upload-dragger {
        width: px2rem(280);
      }
    }
  }
</style>