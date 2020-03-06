<template>
  <div class="navbar">
    <span class="hamburger-container" @click="toggleSideBar">
      <i class="icon" :class="`el-icon-${ opened ? 's-fold' : 's-unfold' }`"></i>
    </span>
    <el-breadcrumb class="breadcrumb-container" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
          <span v-if="index === breadcrumbs.length - 1">{{ item.meta.title }}</span>
          <router-link v-else :to="item.path">{{ item.meta.title }}</router-link>
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
      this.breadcrumbs = this.$route.matched.filter(item => item.meta.title);
      if (this.breadcrumbs[0].meta.title !== 'Dashboard') this.breadcrumbs.unshift({ path: '/dashboard', meta: { title: 'Dashboard' } });
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
    height: #{$navbarHeight}px;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    transition: left 0.28s;

    .hamburger-container {
      width: 50px;
      height: 100%;
      text-align: center;
      line-height: 50px;
      font-size: 22px;
      color: #222;
      transition: background-color .3s;

      &:hover {
        cursor: pointer;
        background: rgba(0, 0, 0, .025);
      }
    }

    .breadcrumb-container {
      flex: 1;
      font-size: 16px;
      margin-left: 8px;

      span {
        color: #97a8be;
      }
    }

    .avatar {
      display: inline-block;
      height: 40px;
      width: 40px;
      margin-right: 4px;
      border-radius: 5px;
    }
  }

  @media screen and (max-width: $dividingLine) {
    .navbar {
      height: px2rem(50);

      .hamburger-container {
        width: px2rem(50);
        height: px2rem(50);
        line-height: px2rem(50);
        font-size: px2rem(22);
      }

      .breadcrumb-container {
        font-size: px2rem(14);
        margin-left: px2rem(8);
      }

      .avatar {
        display: inline-block;
        height: px2rem(40);
        width: px2rem(40);
        margin-right: px2rem(4);
        border-radius: px2rem(5);
      }
    }
  }
</style>