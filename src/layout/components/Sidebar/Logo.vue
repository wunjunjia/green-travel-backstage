<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 v-else class="sidebar-title">{{ title }} </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      title: 'Green Travel Backstage',
      logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png',
    };
  },
};
</script>

<style lang="scss" scoped>
  .sidebarLogoFade-enter-active {
    transition: opacity 1.5s;
  }

  .sidebarLogoFade-enter,
  .sidebarLogoFade-leave-to {
    opacity: 0;
  }

  .sidebar-logo-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: $sidebarLogoBg;
    text-align: center;
    overflow: hidden;

    .sidebar-logo-link {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;

      .sidebar-logo {
        width: 32px;
        height: 32px;
        margin-right: 12px;
      }

      .sidebar-title {
        color: #fff;
        font-weight: 600;
        font-size: 14px;
        font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      }
    }

    &.collapse {
      .sidebar-logo {
        margin-right: 0;
      }
    }
  }

  @media screen and (max-width: $dividingLine) {
    .sidebar-logo-container {
      height: px2rem(50);
      line-height: px2rem(50);

      .sidebar-logo-link {

        .sidebar-logo {
          width: px2rem(32);
          height: px2rem(32);
          margin-right: px2rem(12);
        }

        .sidebar-title {
          font-size: px2rem(14);
        }
      }
    }
  }
</style>
