<template>
  <div>
    <el-submenu v-if="item.children" :index="item.path" >
      <template slot="title">
        <i v-if="item.icon" class="iconfont" :class="item.icon"></i>
        <span slot="title">{{ item.name }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
      />
    </el-submenu>
    <el-menu-item v-else :index="item.path">
      <i v-if="item.icon" class="iconfont" :class="item.icon"></i>
      <span slot="title">{{ item.name }}</span>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>
