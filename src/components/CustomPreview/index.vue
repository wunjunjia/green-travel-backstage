<template>
  <div class="custom-preview-container">
    <custom-image
      :url="imageUrl !== '' ? imageUrl : path"
      @load="load">
    </custom-image>
    <div class="operation-container">
      <span v-if="detail" class="icon" @click="detailHandler">
        <i class="el-icon-document"></i>
      </span>
      <span v-if="edit" class="icon mg-r" @click="editHandler">
        <i class="el-icon-edit"></i>
      </span>
      <span v-if="search" class="icon" @click="toggle">
        <i class="el-icon-zoom-in"></i>
      </span>
      <span v-if="remove" class="icon mg-l" @click="removeHandler">
        <i class="el-icon-delete"></i>
      </span>
      <span v-if="link" class="icon mg-l" @click="linkHandler">
        <i class="el-icon-share"></i>
      </span>
    </div>
    <transition name="fade">
      <custom-mask v-show="preview" @click="toggle">
        <div class="mask-content-container">
          <span class="icon" @click="toggle">
            <i class="el-icon-close"></i>
          </span>
          <custom-image :url="path" />
        </div>
      </custom-mask>
    </transition>
  </div>
</template>

<script>
import CustomMask from '@/components/CustomMask/index.vue';
import CustomImage from '@/components/CustomImage/index.vue';
import paste from '@/utils/clipboard';

export default {
  name: 'CustomPreview',
  props: {
    path: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    search: {
      type: Boolean,
      default: true,
    },
    edit: {
      type: Boolean,
      default: false,
    },
    remove: {
      type: Boolean,
      default: false,
    },
    detail: {
      type: Boolean,
      default: false,
    },
    link: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      preview: false,
    };
  },
  components: {
    CustomMask,
    CustomImage,
  },
  methods: {
    toggle() {
      this.preview = !this.preview;
    },
    editHandler() {
      this.$emit('edit');
    },
    removeHandler() {
      this.$emit('remove');
    },
    detailHandler() {
      this.$emit('detail');
    },
    linkHandler(e) {
      paste(this.link, e);
    },
    load() {
      this.$emit('load');
    },
  },
};
</script>

<style lang="scss" scoped>
  .custom-preview-container {
    position: relative;
    width: 100%;
    height: 100%;

    .operation-container {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      opacity: 0;
      background-color: rgba(0,0,0,.5);
      transition: opacity .3s;
      color: #fff;
      font-size: 22px;

      .icon {
        &.mg-r {
          margin-right: 10px;
        }
        &.mg-l {
          margin-left: 10px;
        }
      }
    }

    &:hover {
      .operation-container {
        opacity: 1;
      }
    }

    .mask-content-container {
      box-sizing: border-box;
      position: absolute;
      top: 50%;
      left: 50%;
      padding: 40px 20px 20px 20px;
      background-color: #fff;
      transform: translate(-50%, -50%);
      border-radius: 6px;

      .icon {
        position: absolute;
        top: 10px;
        right: 20px;
        color: #909399;
        font-size: 22px;
      }
    }
  }

  span.icon {
    position: relative;
    line-height: 1;
    @include expand;
  }
</style>

<style lang="scss" scoped>
  @media screen and (max-width: $dividingLine) {
    .custom-preview-container {
      .mask-content-container {
        padding: px2rem(40) px2rem(10) px2rem(10) px2rem(10);
        .icon {
          right: px2rem(10);
        }
      }
    }
  }
</style>