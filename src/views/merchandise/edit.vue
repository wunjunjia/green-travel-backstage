<template>
  <custom-mask>
    <div class="merchandise-edit-container">
      <span class="icon" @click="close">
        <i class="el-icon-close"></i>
      </span>
      <merchandise-form
        ref="form"
        :id="target.id"
        :name="target.name"
        :description="target.description"
        :integral="String(target.integral)"
        :path="target.path"
        @submit="submit"
      />
    </div>
  </custom-mask>
</template>

<script>
import axios from 'axios';
import MerchandiseForm from './form.vue';
import CustomMask from '@/components/CustomMask/index.vue';

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
    CustomMask,
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
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 500px;
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
    }
  }
</style>

<style lang="scss" scoped>
  @media screen and (max-width: $dividingLine) {
    .merchandise-edit-container {
      width: 90%;
      padding: px2rem(40) px2rem(10) 0 px2rem(10);
      border-radius: px2rem(4);

      .icon {
        right: px2rem(10);
        top: px2rem(10);
        font-size: px2rem(22);
      }
    }
  }
</style>