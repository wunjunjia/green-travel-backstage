<template>
  <div class="coupon-list-container">
    <div class="header">
      <task-search @submit="search" />
      <el-button
        type="danger"
        size="medium"
        :disabled="disabled || list.length === 0 || ids.length === 0"
        @click="openDialog(batchDelete)">批量删除</el-button>
    </div>
    <el-table
      :data="list"
      @selection-change="select"
      v-loading="loading"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">
          <span class="emoji">{{ emoji[scope.row.type] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="目标">
        <template slot-scope="scope">
          {{ `${scope.row.aim}${scope.row.type === 0 ? 'km' : '次'}` }}
        </template>
      </el-table-column>
      <el-table-column label="积分" prop="integral"></el-table-column>
      <el-table-column label="成长值" prop="growth"></el-table-column>
      <el-table-column
        prop="description"
        label="任务要求"
        min-width="300px"
      >
        <template slot-scope="scope">
          <div class="multipart-line-2">{{ scope.row.description }}</div>
        </template>
      </el-table-column>
      <el-table-column label="优惠卷">
        <template slot-scope="scope">
          <el-button size="medium" type="success" @click="openView(scope.row)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220px">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="medium"
            :disabled="disabled"
            @click="beforeOpenEdit(scope.row)">编辑</el-button>
          <single-delete
            :id="scope.row.id"
            url="/api/task/delete"
            @single-delete="singleDelete"
            @open-dialog="openDialog"
          />
        </template>
      </el-table-column>
    </el-table>
    <custom-pagination
      :currentPage="currentPage"
      :pageSize="pageSize"
      :total="total"
      @pageChange="pageChange" />
    <custom-dialog
      :visible="dialog"
      @close="closeDialog"
      @determine="handler" />
    <transition name="fade">
      <task-edit
        v-show="edit"
        :target="target"
        @close="closeEdit"
        @submit="submit"
      />
    </transition>
    <transition name="fade">
      <coupon-list
        v-show="view"
        :coupons="target.coupons"
        @close="closeView"
      />
    </transition>
  </div>
</template>

<script>
import axios from 'axios';
import cache from '@/cache';
import listMixin from '@/mixins/list';
import CustomPagination from '@/components/CustomPagination/index.vue';
import CustomDialog from '@/components/CustomDialog/index.vue';
import SingleDelete from '@/components/SingleDelete/index.vue';
import TaskEdit from './edit.vue';
import TaskSearch from './search.vue';
import CouponList from './couponList.vue';

export default {
  name: 'TaskList',
  mixins: [listMixin],
  data() {
    return {
      character: 'task',
      url: {
        data: '/api/task/list',
        total: '/api/task/total',
      },
      condition: {
        type: -1,
      },
      currentPage: 1,
      pageSize: 6,
      view: false,
      handler: () => {},
      emoji: ['🚴', '🚌', '🚊', '🚈'],
    };
  },
  components: {
    CustomPagination,
    CustomDialog,
    SingleDelete,
    TaskEdit,
    TaskSearch,
    CouponList,
  },
  methods: {
    couponsData(target) {
      if (target.coupons.length === 0) {
        axios.get('/api/task/coupons', {
          params: {
            id: target.id,
          },
        }).then((result) => {
          const { code, data } = result.data;
          if (code === 0) {
            const task = this.list.find(item => item.id === target.id);
            task.coupons = data;
            return;
          }
          this.$message.error('请求数据失败！');
        });
      }
    },
    search(type) {
      this.condition.type = type;
      this.currentPage = 1;
      cache.set(this.character, {});
      this.getData();
      this.getTotal();
    },
    batchDelete() {
      return axios.post('/api/task/delete', {
        ids: this.ids,
      })
        .then((result) => {
          const { code } = result.data;
          if (code !== 0) {
            this.$message.error('删除失败！');
            return;
          }
          this.$message.success('删除成功！');
          if (this.currentPage !== 1 && this.currentPage === this.pageCount && this.ids.length === this.list.length) this.currentPage -= 1;
          this.total -= this.ids.length;
          this.core();
          this.ids = [];
        });
    },
    submit(payload) {
      const {
        title,
        aim,
        type,
        description,
        integral,
        growth,
      } = payload;
      this.target.title = title;
      this.target.aim = aim;
      this.target.type = type;
      this.target.description = description;
      this.target.integral = integral;
      this.target.growth = growth;
      this.target.coupons = [];
      this.closeEdit();
    },
    openView(target) {
      this.couponsData(target);
      this.target = target;
      this.view = true;
    },
    closeView() {
      this.view = false;
    },
    beforeOpenEdit(target) {
      this.couponsData(target);
      this.openEdit(target);
    },
  },
};
</script>

<style lang="scss" scoped>
  .coupon-list-container {
    padding: 10px;
    .multipart-line-2 {
      @include multipartLine(2);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }
    .emoji {
      font-size: 24px;
    }
  }
</style>