<template>
  <div
    class="sidebar-container"
    :class="{ 'sidebar-logo': sidebarLogo }"
  >
    <logo v-if="sidebarLogo" :collapse="!opened"/>
    <el-scrollbar class="scrollbar">
      <el-menu
        class="menu"
        :default-active="activeMenu"
        :collapse="!opened"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :unique-opened="false"
        :collapse-transition="false"
        :router="true"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Logo from './Logo.vue';
import SidebarItem from './SidebarItem.vue';
import variables from '@/assets/sass/var.scss';
import routes from '@/config/router-config';
import { filterRoutes } from '@/utils/router';

export default {
  name: 'Sidebar',
  data() {
    return {
      collapse: false,
      routes: filterRoutes(routes),
    };
  },
  components: {
    Logo,
    SidebarItem,
  },
  computed: {
    activeMenu() {
      return this.$route.path;
    },
    variables() {
      return variables;
    },
    ...mapState('app', {
      opened: state => state.sidebar.opened,
    }),
    ...mapState('settings', {
      sidebarLogo: state => state.sidebarLogo,
    }),
  },
};
</script>