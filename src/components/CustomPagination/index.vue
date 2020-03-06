<template>
  <div class="pagination-container" :class="classObj">
    <el-pagination
      background
      layout="prev, pager, next"
      :pager-count="5"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      @current-change="pageChange" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'CustomPagination',
  props: {
    pageSize: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        mobile: this.device === 'mobile',
        withoutAnimation: this.sidebar.withoutAnimation,
      };
    },
    ...mapState('app', {
      sidebar: state => state.sidebar,
      device: state => state.device,
    }),
  },
  methods: {
    pageChange(currentPage) {
      this.$emit('pageChange', currentPage);
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination-container {
  position: fixed;
  left: #{$openSideBarWidth}px;
  bottom: 20px;
  width: calc(100% - #{$openSideBarWidth}px);
  text-align: center;
  transition: all .28s;
  &.hideSidebar {
    left: #{$collapseSideBarWidth}px;
    width: calc(100% - #{$collapseSideBarWidth}px);
  }
  &.withoutAnimation {
    transition: none;
  }
}
@media screen and (max-width: $dividingLine) {
  .pagination-container {
    left: 0;
    width: 100%;
    &.hideSidebar {
      left: 0;
      width: 100%;
    }
  }
}
</style>