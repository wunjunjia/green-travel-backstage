<template>
  <el-dialog
    :visible="visible"
    :show-close="false"
    width="320px"
    center>
    <p class="dialog-title" style="margin: 0; color: #333; font-size: 16px; text-align: center;">{{ title }}</p>
    <span slot="footer">
      <el-button type="primary" @click="close">取消</el-button>
      <el-button type="danger" @click="determine">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'CustomDialog',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '确定删除？',
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    determine() {
      this.$emit('determine');
    },
  },
};
</script>