<template>
  <custom-mask @click="close">
    <div class="merchandise-detail-container">
      <el-card :body-style="{ padding: '0px' }">
        <custom-image :url="target.path" border-radius="0px" />
        <div class="content">
          <p class="name">{{ target.name }}</p>
          <p class="description">{{ target.description }}</p>
          <div class="integral-container">
            <div class="integral">
              <i class="icon icon-tubiao311 iconfont"></i>
              <span class="pre-integral">{{ target.integral | preIntegral }}</span>
              <span class="last-integral">{{ target.integral | lastIntegral }}</span>
            </div>
            <el-tag :type="target.status === 0 ? 'danger' : 'success'" size="medium">
              {{ target.status === 0 ? '已下架' : '已上架' }}
            </el-tag>
          </div>
        </div>
        <span class="close" @click="close">
          <i class="el-icon-close"></i>
        </span>
      </el-card>
    </div>
  </custom-mask>
</template>

<script>
import CustomMask from '@/components/CustomMask/index.vue';
import CustomImage from '@/components/CustomImage/index.vue';

export default {
  name: 'MerchandiseDetail',
  props: {
    target: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    CustomMask,
    CustomImage,
  },
  filters: {
    preIntegral(integral) {
      return parseInt(integral, 10);
    },
    lastIntegral(integral) {
      const [, decimal] = `${integral}`.split('.');
      return decimal ? `.${decimal}` : '';
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
  .merchandise-detail-container {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 360px;
    transform: translate(-50%, -50%);
    .content {
      padding: 10px;
      .name {
        color: #222;
        font-size: 16px;
        margin-bottom: 8px;
      }
      .description {
        color: #999;
        font-size: 12px;
        line-height: 1.5;
        margin-bottom: 4px;
      }
      .integral-container {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      }
      .integral {
        display: flex;
        align-items: flex-end;
        color: #f42;
        .icon {
          font-size: px2rem(14);
          margin-right: px2rem(2);
          line-height: 1.5;
        }
        .pre-integral {
          font-size: px2rem(36);
          font-weight: 700;
          line-height: 1;
        }
        .last-integral {
          font-size: px2rem(14);
          font-weight: 700;
          line-height: 1.5;
        }
      }
    }
    .close {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 34px;
      height: 34px;
      text-align: center;
      background-color: #fff;
      border-radius: 50%;
      i {
        color: #222;
        font-size: 16px;
        font-weight: 700;
        line-height: 34px;
      }
    }
  }
</style>

<style lang="scss" scoped>
  @media screen and (max-width: $dividingLine) {
    .merchandise-detail-container {
      width: 80%;
    }
  }
</style>