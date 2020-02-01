<template>
  <div :class="classObj" class="layout-container">
    <div v-if="device==='mobile' && sidebar.opened" class="drawer-bg" @click="toggleSideBar" />
    <sidebar/>
    <div class="main-container" :class="{ 'fixed-header': fixedHeader }">
      <navbar />
      <app-main />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ResizeMixin from './mixin';
import Sidebar from './components/Sidebar/index.vue';
import Navbar from './components/Navbar.vue';
import AppMain from './components/AppMain.vue';

export default {
  name: 'Layout',
  mixins: [ResizeMixin],
  components: {
    Sidebar,
    Navbar,
    AppMain,
  },
  computed: {
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile',
      };
    },
    ...mapState('app', {
      sidebar: state => state.sidebar,
      device: state => state.device,
    }),
    ...mapState('settings', {
      fixedHeader: state => state.fixedHeader,
    }),
  },
  methods: {
    ...mapActions('app', ['toggleSideBar']),
  },
};
</script>