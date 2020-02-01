<template>
  <div class="root">
    <div class="particle-animation-container">
      <canvas class="particle-animation"></canvas>
    </div>
    <div class="login-container">
      <h1 class="title">亲，您还没登录哟！</h1>
      <a href="/api/login">
        <i class="icon iconfont icon-github1"></i>
      </a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { ParticleAnimation } from '@/lib';

export default {
  name: 'Login',
  data() {
    return {
      particleAnimation: null,
    };
  },
  computed: {
    ...mapState('user', {
      user: state => state.data,
    }),
  },
  mounted() {
    if (this.user) {
      this.$router.replace('/');
      return;
    }
    this.particleAnimation = new ParticleAnimation({
      el: document.querySelector('.particle-animation'),
      shape: 'heart',
    });
  },
  beforeDestroy() {
    if (this.particleAnimation) this.particleAnimation.destroy();
  },
};
</script>

<style lang="scss" scoped>
  .root {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .particle-animation-container {
    position: fixed;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(135deg,#79f1a4, #0e6fc6);
    z-index: -1;
  }

  .login-container {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 60%;
    margin: auto;
    color: #fff;
    text-align: center;

    >.title {
      font-size: px2rem(48);
      margin-bottom: px2rem(40);
    }

    .icon {
      color: #fff;
      font-size: px2rem(80);
    }
  }
</style>