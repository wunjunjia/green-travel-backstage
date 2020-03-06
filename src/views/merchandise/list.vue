<template>
  <div class="merchandise-list-container">
    <div class="header">
      <merchandise-search @submit="search"/>
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
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-width="60px" label-position="left">
            <el-form-item label="名称">{{ scope.row.name }}</el-form-item>
            <el-form-item label="描述">{{ scope.row.description }}</el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="名称" prop="name" min-width="100px">
        <template slot-scope="scope">
          <div class="multipart-line-3">{{ scope.row.name }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="integral"
        label="积分"
        :formatter="row => integralFormatter(row.integral)"
      >
      </el-table-column>
      <el-table-column
        prop="stock"
        label="库存"
      >
      </el-table-column>
      <el-table-column
        label="状态"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === 0 ? 'danger' : 'success'" size="medium">
            {{ scope.row.status === 0 ? '已下架' : '已上架' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        min-width="300px"
      >
        <template slot-scope="scope">
          <div class="multipart-line-3">{{ scope.row.description }}</div>
        </template>
      </el-table-column>
      <el-table-column label="图片" width="76px">
        <template slot-scope="scope">
          <div class="avatar-container">
            <custom-preview :path="scope.row.path" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="medium"
            :disabled="disabled"
            @click="openEdit(scope.row)">编辑</el-button>
          <single-delete
            :id="scope.row.id"
            url="/api/merchandise/delete"
            @open-dialog="openDialog"
            @single-delete="singleDelete"
          />
        </template>
      </el-table-column>
    </el-table>
    <transition name="fade">
      <merchandise-edit
        v-show="edit"
        :target="target"
        @close="closeEdit"
        @submit="submit"
      />
    </transition>
    <custom-pagination
      :currentPage="currentPage"
      :pageSize="pageSize"
      :total="total"
      @pageChange="pageChange" />
    <custom-dialog
      :visible="dialog"
      @close="closeDialog"
      @determine="handler" />
  </div>
</template>

<script>
import axios from 'axios';
import SingleDelete from '@/components/SingleDelete/index.vue';
import MerchandiseEdit from './edit.vue';
import MerchandiseSearch from './search.vue';
import CustomPreview from '@/components/CustomPreview/index.vue';
import CustomPagination from '@/components/CustomPagination/index.vue';
import CustomDialog from '@/components/CustomDialog/index.vue';
import cache from '@/cache';
import listMixin from '@/mixins/list';

export default {
  name: 'MerchandiseList',
  mixins: [listMixin],
  data() {
    return {
      character: 'merchandise',
      url: {
        data: '/api/merchandise/list',
        total: '/api/merchandise/total',
      },
      condition: {
        name: '',
      },
      currentPage: 1,
      pageSize: 6,
      handler: () => {},
    };
  },
  components: {
    MerchandiseEdit,
    MerchandiseSearch,
    SingleDelete,
    CustomPreview,
    CustomPagination,
    CustomDialog,
  },
  methods: {
    batchDelete() {
      return axios.post('/api/merchandise/delete', {
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
        name,
        description,
        integral,
        status,
        path,
        stock,
      } = payload;
      this.target.name = name;
      this.target.description = description;
      this.target.integral = integral;
      this.target.status = status;
      this.target.stock = stock;
      this.target.path = path;
      this.closeEdit();
    },
    search(payload) {
      const { name } = payload;
      this.condition.name = name;
      this.currentPage = 1;
      cache.set(this.character, {});
      this.getData();
      this.getTotal();
    },
  },
  beforeDestroy() {
    const { name } = this.condition;
    if (name !== '') cache.set(this.character, {});
  },
};
</script>

<style lang="scss" scoped>
  .merchandise-list-container {
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
    .avatar-container {
      width: 56px;
      height: 56px;
    }
    .el-form-item {
      margin-bottom: 4px;
    }
  }
</style>

<style lang="scss">
  .merchandise-list-container {
    .mask-content-container {
      width: 500px;
      @media screen and (max-width: $dividingLine) {
        width: 90%;
      }
    }
  }
</style>