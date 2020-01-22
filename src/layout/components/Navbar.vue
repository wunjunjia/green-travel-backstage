<template>
  <div class="navbar">
    <span class="hamburger-container" @click="toggleSideBar">
      <i class="icon" :class="`el-icon-${ opened ? 's-fold' : 's-unfold' }`"></i>
    </span>
    <el-breadcrumb class="breadcrumb-container" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
          <span v-if="index === breadcrumbs.length-1">{{ item.name }}</span>
          <router-link v-else :to="item.path">{{ item.name }}</router-link>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <img class="avatar" src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" alt="avatar">
        <i class="el-icon-caret-bottom"/>
      </span>
      <el-dropdown-menu slot="dropdown">
        <div @click="logout">
          <el-dropdown-item>退出</el-dropdown-item>
        </div>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Navbar',
  data() {
    return {
      breadcrumbs: [],
    };
  },
  watch: {
    $route() {
      this.initBreadcrumbs();
    },
  },
  computed: {
    avatar() {
      if (this.user) return this.user.avatar_url.replace('avatars0', 'avatars3');
      return '';
    },
    ...mapState('app', {
      opened: state => state.sidebar.opened,
    }),
    ...mapState('user', {
      user: state => state.data,
    }),
  },
  methods: {
    logout() {
      this.clear();
    },
    initBreadcrumbs() {
      this.breadcrumbs = this.$route.matched.filter(item => item.name);
      if (this.breadcrumbs[0].name !== 'Dashboard') this.breadcrumbs.unshift({ path: '/dashboard', name: 'Dashboard' });
    },
    ...mapActions('app', ['toggleSideBar']),
    ...mapActions('user', ['clear']),
  },
  mounted() {
    this.initBreadcrumbs();
  },
};
</script>

<style lang="scss" scoped>
  .navbar {
    display: flex;
    align-items: center;
    height: px2rem(50);
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    transition: left 0.28s;

    .hamburger-container {
      width: px2rem(50);
      height: px2rem(50);
      text-align: center;
      line-height: px2rem(50);
      font-size: px2rem(22);
      color: #222;
      transition: background-color .3s;

      &:hover {
        cursor: pointer;
        background: rgba(0, 0, 0, .025);
      }
    }

    .breadcrumb-container {
      flex: 1;
      font-size: px2rem(14);
      line-height: px2rem(50);
      margin-left: px2rem(8);

      span {
        color: #97a8be;
      }
    }

    .avatar {
      height: px2rem(40);
      width: px2rem(40);
      margin-right: px2rem(4);
      border-radius: px2rem(5);
    }
  }
</style>