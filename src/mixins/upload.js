export default {
  data() {
    return {
      whiteList: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
      size: 1024 * 1024 * 5,
      fileList: [],
    };
  },
  computed: {
    accept() {
      return this.whiteList.join(',');
    },
  },
  methods: {
    clear() {
      if (this.fileList.length > this.maxUploadCount) this.fileList.pop();
    },
    beforeUpload(file) {
      if (!this.whiteList.includes(file.type)) {
        this.$message.warning('上传头像图片格式不正确!');
        return false;
      }
      if (file.size > this.size) {
        this.$message.warning('上传图片大小不能超过 5MB!');
        return false;
      }
      this.fileList.unshift({
        uid: file.uid,
        imageUrl: URL.createObjectURL(file),
        path: '',
        status: -1,
      });
      return true;
    },
    success(res, file) {
      const { code, path } = res;
      const target = this.fileList.find(item => item.uid === file.uid);
      if (code !== 0) {
        this.$message.error('图片上传失败！');
        target.status = 1;
      } else {
        // this.$message.success('图片上传成功！');
        target.path = path;
        target.status = 0;
      }
      this.clear();
    },
    error(err, file) {
      this.$message.error('图片上传失败！');
      const target = this.fileList.find(item => item.uid === file.uid);
      target.status = 1;
      this.clear();
    },
    load(imageUrl) {
      URL.revokeObjectURL(imageUrl);
    },
  },
};