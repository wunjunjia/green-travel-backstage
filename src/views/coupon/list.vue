<template>
  <div class="coupon-list-container">
    <div class="header">
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
      <el-table-column label="积分" prop="integral"></el-table-column>
      <el-table-column label="天数" prop="day"></el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        min-width="300px"
      >
        <template slot-scope="scope">
          <div class="multipart-line-3">{{ scope.row.description }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280px">
        <template slot-scope="scope">
          <el-button size="medium" type="success" @click="openPreview(scope.row)">预览</el-button>
          <el-button
            type="primary"
            size="medium"
            :disabled="disabled"
            @click="openEdit(scope.row)">编辑</el-button>
          <single-delete
            :id="scope.row.id"
            url="/api/coupon/delete"
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
      <coupon-edit
        v-show="edit"
        :target="target"
        @close="closeEdit"
        @submit="submit"
      />
    </transition>
    <transition name="fade">
      <coupon-preview
        v-show="preview"
        :target="target"
        @close="closePreview"
      />
    </transition>
  </div>
</template>

<script>
import axios from 'axios';
import listMixin from '@/mixins/list';
import CustomPagination from '@/components/CustomPagination/index.vue';
import CustomDialog from '@/components/CustomDialog/index.vue';
import SingleDelete from '@/components/SingleDelete/index.vue';
import CouponEdit from './edit.vue';
import CouponPreview from './preview.vue';

export default {
  name: 'CouponList',
  mixins: [listMixin],
  data() {
    return {
      character: 'coupon',
      url: {
        data: '/api/coupon/list',
        total: '/api/coupon/total',
      },
      condition: {},
      currentPage: 1,
      pageSize: 6,
      preview: false,
      handler: () => {},
    };
  },
  components: {
    CustomPagination,
    CustomDialog,
    SingleDelete,
    CouponEdit,
    CouponPreview,
  },
  methods: {
    batchDelete() {
      return axios.post('/api/coupon/delete', {
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
        description,
        integral,
        day,
      } = payload;
      this.target.description = description;
      this.target.integral = integral;
      this.target.day = day;
      this.closeEdit();
    },
    openPreview(target) {
      this.target = target;
      this.preview = true;
    },
    closePreview() {
      this.preview = false;
    },
  },
};
</script>

<style lang="scss" scoped>
  .coupon-list-container {
    padding: 10px;
    .multipart-line-3 {
      @include multipartLine(3);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }
  }
</style>