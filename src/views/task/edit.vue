<template>
  <custom-mask>
    <div class="task-edit-container">
      <span class="icon" @click="close">
        <i class="el-icon-close"></i>
      </span>
      <task-form
        ref="form"
        :id="target.id"
        :title="target.title"
        :aim="target.aim"
        :type="target.type"
        :description="target.description"
        :integral="target.integral"
        :growth="target.growth"
        :coupons="target.coupons ? target.coupons.map(item => item.id) : []"
        @submit="submit"
      />
    </div>
  </custom-mask>
</template>

<script>
import axios from 'axios';
import TaskForm from './form.vue';
import CustomMask from '@/components/CustomMask/index.vue';

export default {
  name: 'MerchandiseEdit',
  props: {
    target: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    TaskForm,
    CustomMask,
  },
  methods: {
    submit(payload) {
      axios.post('/api/task/edit', {
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
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
  .task-edit-container {
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
      line-height: 1;
      @include expand;
    }
  }
</style>

<style lang="scss" scoped>
  @media screen and (max-width: $dividingLine) {
    .task-edit-container {
      width: 90%;
    }
  }
</style>