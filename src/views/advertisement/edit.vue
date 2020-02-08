<template>
  <custom-mask>
    <div class="advertisement-edit-container">
      <span class="icon" @click="close">
        <i class="el-icon-close"></i>
      </span>
      <advertisement-form
        ref="form"
        :id="target.id"
        :status="!!target.status"
        :outside_link="target.outside_link"
        :path="target.path"
        @submit="submit"
      />
    </div>
  </custom-mask>
</template>

<script>
import axios from 'axios';
import AdvertisementForm from './form.vue';
import CustomMask from '@/components/CustomMask/index.vue';
import { equal } from '@/utils/common';

export default {
  name: 'AdvertisementEdit',
  props: {
    target: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    AdvertisementForm,
    CustomMask,
  },
  methods: {
    submit(payload) {
      if (equal(payload, this.target)) {
        this.$refs.form.cancel();
        this.$message.success('提交成功！');
        this.$emit('submit', payload);
        return;
      }
      axios.post('/api/advertisement/edit', {
        id: this.target.id,
        ...payload,
      }, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }).then((res) => {
        const { code } = res.data;
        if (code === 0) {
          this.$emit('submit', payload);
          this.$message.success('提交成功！');
          return;
        }
        this.$message.error('提交失败！');
      }).finally(() => {
        this.$refs.form.cancel();
      });
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
  .advertisement-edit-container {
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 430px;
    padding: 40px 10px 0 10px;
    transform: translate(-50%, -50%);
    border-radius: 4px;
    background-color: #fff;

    .icon {
      position: absolute;
      right: 10px;
      top: 10px;
      font-size: 22px;
      color: #606266;
      line-height: 1;
      @include expand;
    }
  }
</style>

<style lang="scss" scoped>
  @media screen and (max-width: $dividingLine) {
    .advertisement-edit-container {
      width: 90%;
    }
  }
</style>