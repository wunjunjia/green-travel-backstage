<template>
  <div class="conversion-list-container">
    <div class="header">
      <conversion-search @submit="search"/>
      <batch-delete
        :ids="ids"
        :disabled="list.length === 0"
        :batchDelete="batchDelete"
        @open-dialog="openDialog"
      />
    </div>
    <el-table
      :data="list"
      @selection-change="select"
      v-loading="loading"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="编号" prop="serial_number" width="300px"></el-table-column>
      <el-table-column label="用户名称" prop="u_name"></el-table-column>
      <el-table-column label="数量" prop="quantity"></el-table-column>
      <el-table-column
        label="日期"
        prop="create_time"
        :formatter="dateFormatter"
        width="200px"></el-table-column>
      <el-table-column label="商品图片">
        <template slot-scope="scope">
          <div class="avatar-container">
            <custom-preview
              :path="scope.row.m_path"
              :search="false"
              :detail="true"
              @detail="openDetail(scope.row)"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120px">
        <template slot-scope="scope">
          <conversion-single-delete
            :id="scope.row.id"
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
      @determine="handler"/>
    <transition name="fade">
      <merchandise-detail
        v-show="detail"
        :target="target"
        @close="closeDetail"
      />
    </transition>
  </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
import CustomPreview from '@/components/CustomPreview/index.vue';
import CustomPagination from '@/components/CustomPagination/index.vue';
import CustomDialog from '@/components/CustomDialog/index.vue';
import BatchDelete from '@/components/BatchDelete/index.vue';
import cache from '@/cache';
import listMixin from '@/mixins/list';
import ConversionSearch from './search.vue';
import ConversionSingleDelete from './singleDelete.vue';
import MerchandiseDetail from './detail.vue';

export default {
  name: 'ConversionList',
  mixins: [listMixin],
  data() {
    return {
      character: 'conversion',
      url: {
        data: '/api/conversion/list',
        total: '/api/conversion/total',
      },
      condition: {
        name: '',
      },
      currentPage: 1,
      pageSize: 6,
      detail: false,
      handler: () => {},
    };
  },
  components: {
    CustomPreview,
    CustomPagination,
    CustomDialog,
    ConversionSearch,
    BatchDelete,
    ConversionSingleDelete,
    MerchandiseDetail,
  },
  methods: {
    dateFormatter(row) {
      return moment(row.create_time).format('YYYY-MM-DD HH:mm:ss');
    },
    select(selection) {
      this.ids = selection.map(item => item.id);
    },
    search(payload) {
      const { name } = payload;
      this.condition.name = name;
      this.currentPage = 1;
      cache.set('conversion', {});
      this.getData();
      this.getTotal();
    },
    openDialog(handler) {
      this.handler = () => {
        this.closeDialog();
        handler();
      };
      this.dialog = true;
    },
    singleDelete() {
      if (this.currentPage !== 1 && this.currentPage === this.pageCount && this.list.length === 1) this.currentPage -= 1;
      this.total -= 1;
      this.core();
    },
    batchDelete() {
      return axios.post('/api/conversion/delete', {
        ids: this.ids,
      }, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
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
    openDetail(target) {
      this.target = {
        path: target.m_path,
        status: target.m_status,
        stock: target.m_stock,
        name: target.m_name,
        integral: target.m_integral,
        description: target.m_description,
      };
      this.detail = true;
    },
    closeDetail() {
      this.detail = false;
    },
  },
  beforeDestroy() {
    const { name } = this.condition;
    if (name !== '') cache.set(this.character, {});
  },
};
</script>

<style lang="scss" scoped>
  .conversion-list-container {
    padding: 10px;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }
    .avatar-container {
      width: 56px;
      height: 56px;
    }
  }
</style>

<style lang="scss">
  .conversion-list-container {
    .mask-content-container {
      width: 500px;
      @media screen and (max-width: $dividingLine) {
        width: 90%;
      }
    }
  }
</style>