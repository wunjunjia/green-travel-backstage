<template>
  <div class="public-welfare-list-container">
    <div class="header">
      <public-welfare-search @submit="search"/>
      <el-button
        type="danger"
        size="medium"
        :disabled="disabled || list.length === 0"
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
            <el-form-item label="标题">{{ scope.row.title }}</el-form-item>
            <el-form-item label="描述">
              <p class="description">{{ scope.row.description }}</p>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="用户名称" prop="name"></el-table-column>
      <el-table-column label="标题" prop="name" min-width="100px">
        <template slot-scope="scope">
          <div class="multipart-line-3">{{ scope.row.title }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="integral"
        label="积分"
        :formatter="row => integralFormatter(row.integral)"
      >
      </el-table-column>
      <el-table-column
        label="创建日期"
        prop="create_time"
        :formatter="row => dateFormatter(row.create_time)"
        min-width="140px"></el-table-column>
      <el-table-column
        label="截止日期"
        prop="end_time"
        :formatter="row => dateFormatter(row.end_time)"
        min-width="140px"></el-table-column>
      <el-table-column label="图片" min-width="170px">
        <template slot-scope="scope">
          <div class="avatar-container">
            <custom-preview :path="scope.row.path" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-popover
            trigger="hover"
            placement="bottom"
            :disabled="scope.row.status !== 2">
            <p>{{ scope.row.reason }}</p>
            <el-tag slot="reference" :type="status(scope.row.status).type" class="tag">
              {{ status(scope.row.status).text }}
            </el-tag>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280px">
        <template slot-scope="scope">
          <public-welfare-operator
            :id="scope.row.id"
            :status="scope.row.status"
            @audit="audit"
            @single-delete="singleDelete"
            @open-dialog="openDialog" />
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
      title="确定删除？"
      @close="closeDialog"
      @determine="handler" />
  </div>
</template>

<script>
import axios from 'axios';
import cache from '@/cache';
import listMixin from '@/mixins/list';
import CustomPreview from '@/components/CustomPreview/index.vue';
import CustomPagination from '@/components/CustomPagination/index.vue';
import CustomDialog from '@/components/CustomDialog/index.vue';
import PublicWelfareOperator from './operator.vue';
import PublicWelfareSearch from './search.vue';

export default {
  name: 'PublicWelfare',
  mixins: [listMixin],
  data() {
    return {
      character: 'publicWelfare',
      url: {
        data: '/api/publicWelfare/list',
        total: '/api/publicWelfare/total',
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
    CustomPreview,
    CustomPagination,
    CustomDialog,
    PublicWelfareSearch,
    PublicWelfareOperator,
  },
  methods: {
    status(value) {
      if (value === 0) return { text: '待审核', type: 'primary' };
      if (value === 1) return { text: '已通过', type: 'success' };
      if (value === 2) return { text: '未通过', type: 'warning' };
      return {};
    },
    search(payload) {
      const { name } = payload;
      this.condition.name = name;
      this.currentPage = 1;
      cache.set(this.character, {});
      this.getData();
      this.getTotal();
    },
    batchDelete() {
      return axios.post('/api/publicWelfare/delete', {
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
    audit({ id, status, reason }) {
      const target = this.list.find(item => item.id === id);
      target.status = status;
      target.reason = reason;
    },
  },
};
</script>

<style lang="scss" scoped>
.public-welfare-list-container {
  padding: 10px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }
  .multipart-line-3 {
    @include multipartLine(3);
  }
  .avatar-container {
    width: 150px;
    height: 56px;
  }
  .el-form-item {
    margin-bottom: 4px;
  }
  .description {
    line-height: 2;
  }
}
</style>

<style lang="scss">
.public-welfare-list-container {
  .mask-content-container {
    width: 700px;
    @media screen and (max-width: $dividingLine) {
      width: 90%;
    }
  }
}
</style>