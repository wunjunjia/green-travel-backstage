<template>
  <div class="merchandise-edit-container">
    <div class="wrapper">
      <span class="close" @click="close">
        <i class="el-icon-close"></i>
      </span>
      <div class="content">
        <merchandise-form
          ref="form"
          :id="target.id"
          :name="target.name"
          :description="target.description"
          :integral="String(target.integral)"
          :oldPath="target.path"
          @submit="submit"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import MerchandiseForm from './form.vue';

export default {
  name: 'MerchandiseEdit',
  props: {
    target: {
      type: Object,
      default: () => ({}),
    },
    close: {
      type: Function,
      default: () => {},
    },
  },
  components: {
    MerchandiseForm,
  },
  methods: {
    submit(payload) {
      const equal = Object.keys(payload).some(key => payload[key] !== this.target[key]);
      if (!equal) {
        this.$refs.form.cancel();
        this.$message.success('提交成功！');
        this.$emit('submit', payload);
        return;
      }
      axios.post('/api/merchandise/edit', {
        id: this.target.id,
        ...payload,
      }, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
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
  },
};
</script>

<style lang="scss" scoped>
  .merchandise-edit-container {
    @include mask;

    .wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
      padding-top: px2rem(40);
      border-radius: px2rem(4);
      background-color: #fff;

      @media screen and (min-width: 750px) {
        width: 50%;
      }

      .close {
        position: absolute;
        right: px2rem(10);
        top: px2rem(10);
        font-size: px2rem(22);
        color: #606266;
        @include expand;
      }

      .content {
        width: 96%;
      }
    }
  }
</style>