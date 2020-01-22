<template>
  <div>
    <label for="upload">
      <div class="upload-card">
        <i class="el-icon-plus"></i>
      </div>
    </label>
    <input @change="changeHandler" type="file" id="upload" name="merchandise" class="upload-input" multiple />
    <div class="preview-container">
      <div class="photo-wrapper" v-for="(item, index) in files" :key="index">
        <img class="photo" @load="loadHandler(item.src)" :src="item.src" alt="photo">
        <span class="status" v-show="item.status">
          <i class="el-icon-check"></i>
        </span>
        <div class="operate-container">
          <i @click="preview(item)" class="el-icon-zoom-in"></i>
        </div>
      </div>
      <transition name="preview">
        <div class="mask" v-if="show">
          <div class="wrapper">
            <img class="photo" @load="loadHandler(target)" :src="target" alt="photo">
            <i @click="preview" class="el-icon-close"></i>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PhotoUpload',
  props: {
    count: {
      type: Number,
      default: 1,
    },
    size: {
      type: Number,
      default: 1024 * 10 * 5,
    },
  },
  data() {
    return {
      files: [],
      target: null,
      show: false,
    };
  },
  methods: {
    send() {
      for (let i = 0; i < this.files.length; i += 1) {
        const fd = new FormData();
        fd.append('merchandise', this.files[i].data);
        axios.post('/api/upload', fd, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(() => {
            this.files[i].status = true;
          });
      }
    },
    changeHandler() {
      const uploadInput = document.querySelector('.upload-input');
      let files = Array.from(uploadInput.files);
      if (files.length === 0) return;
      files = files.filter(file => file.size < this.size);
      if (files.length !== uploadInput.files.length) this.$message.error(`图片大小不能超过${this.size}kb！`);
      if (files.length === 0) return;
      if (files.length > this.count) {
        this.$message.warning(`最多同时上传${this.count}张图片！`);
        files = files.slice(0, this.count);
      }
      this.files = files.map(file => ({ data: file, status: false, src: window.URL.createObjectURL(file) }));
      this.send();
    },
    loadHandler(src) {
      window.URL.revokeObjectURL(src);
    },
    preview(file) {
      this.show = !this.show;
      if (this.show) this.target = window.URL.createObjectURL(file.data);
    },
  },
};
</script>

<style lang="scss" scoped>
  .upload-card {
    width: 148px;
    height: 148px;
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    cursor: pointer;
    line-height: 148px;
    text-align: center;
    color: #8c939d;

    &:hover {
      border-color: #409eff;
      color: #409eff;
    }
  }

  .upload-input {
    display: none;
  }

  .preview-container {
    padding-top: 10px;
    display: flex;
    flex-wrap: wrap;

    .photo-wrapper {
      position: relative;
      width: 148px;
      height: 148px;
      color: #fff;
      border-radius: 6px;
      margin-right: 10px;
      margin-bottom: 10px;
      overflow: hidden;

      .photo {
        display: block;
        width: 100%;
        height: 100%;
      }

      .status {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        position: absolute;
        width: 40px;
        height: 24px;
        right: -15px;
        top: -6px;
        background-color: #13ce66;
        text-align: center;
        transform: rotate(45deg);
        box-shadow: 0 0 1pc 1px rgba(0,0,0,.2);

        i {
          font-size: 12px;
          font-weight: 700;
          transform: rotate(-45deg);
        }
      }

      .operate-container {
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        line-height: 138px;
        text-align: center;
        border-radius: 6px;
        background-color: rgba(0,0,0,.5);
        transition: opacity .3s;

        i {
          font-size: 22px;
        }
      }

      &:hover {
        .operate-container {
          opacity: 1;
        }
      }
    }

    .mask {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, .3);
      z-index: 1000;

      .wrapper {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 50%;
        max-width: 414px;
        padding: 40px 10px 20px 10px;
        background-color: #fff;
      }

      .photo {
        display: block;
        width: 100%;
      }

      i {
        position: absolute;
        top: 10px;
        right: 10px;
        color: #909399;
        font-size: 18px;
        cursor: pointer;
      }
    }
  }

  .preview-enter, .preview-leave-to {
    opacity: 0;
  }

  .preview-enter-to, .preview-leave {
    opacity: 1;
  }

  .preview-enter-active, .preview-leave-active {
    transition: opacity .3s;
  }
</style>