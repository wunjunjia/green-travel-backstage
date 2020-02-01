<template>
  <div class="merchandise-list-container" :class="classObj">
    <div class="header">
      <merchandise-search @submit="search"/>
      <merchandise-batch-delete
        :ids="ids"
        :disabled="merchandiseList.length === 0"
        @batch-delete="batchDelete"
        @open-dialog="openDialog"
      />
    </div>
    <el-table
      :data="merchandiseList"
      @selection-change="select"
      v-loading="loading"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-width="80px" label-position="left" class="form">
            <el-form-item label="名称">
              <span>{{ scope.row.name }}</span>
            </el-form-item>
            <el-form-item label="积分">
              <span>{{ scope.row.integral }}</span>
            </el-form-item>
            <el-form-item label="日期">
              <span>{{ scope.row.date | dateFormatter }}</span>
            </el-form-item>
            <el-form-item label="描述">
              <span>{{ scope.row.description }}</span>
            </el-form-item>
            <el-form-item label="图片">
              <img class="avatar" :src="scope.row.path" alt="avatar">
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称">
        <template slot-scope="scope">
          <div class="multipart-line">{{ scope.row.name }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="integral"
        label="积分"
        :formatter="integralFormatter"
      >
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        :formatter="dateFormatter"
      >
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
      >
        <template slot-scope="scope">
          <div class="multipart-line">{{ scope.row.description }}</div>
        </template>
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <div style="display: flex">
            <preview :path="scope.row.path">
              <img class="avatar" :src="scope.row.path" alt="avatar">
            </preview>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="medium"
            @click="open(scope.row)">编辑</el-button>
          <merchandise-single-delete
            :id="merchandiseList[scope.$index].id"
            @open-dialog="openDialog"
            @single-delete="singleDelete"
          />
        </template>
      </el-table-column>
    </el-table>
    <transition name="fade">
      <merchandise-edit
        v-show="edit"
        :close="close"
        :target="target"
        @submit="submit"
      />
    </transition>
    <div class="pagination-container">
      <el-pagination
        background
        layout="prev, pager, next"
        :pager-count="5"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @current-change="change"
        >
      </el-pagination>
    </div>
    <el-dialog
      :visible="visible"
      :show-close="false"
      width="320px"
      center>
      <p class="dialog-title">确定删除?</p>
      <span slot="footer">
        <el-button type="primary" @click="closeDialog">取消</el-button>
        <el-button type="danger" @click="handler">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import { mapState } from 'vuex';
import MerchandiseEdit from './edit.vue';
import MerchandiseSearch from './search.vue';
import MerchandiseSingleDelete from './singleDelete.vue';
import MerchandiseBatchDelete from './batchDelete.vue';
import Preview from '@/components/Preview/index.vue';
import cache from '@/caches/merchandise';

export default {
  name: 'MerchandiseList',
  data() {
    return {
      loading: false,
      edit: false,
      visible: false,
      target: {},
      condition: {
        name: '',
      },
      merchandiseList: [],
      currentPage: 1,
      pageSize: 6,
      total: 0,
      ids: [],
      handler: () => {},
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.total / this.pageSize);
    },
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
  components: {
    MerchandiseEdit,
    MerchandiseSearch,
    MerchandiseSingleDelete,
    MerchandiseBatchDelete,
    Preview,
  },
  methods: {
    integralFormatter(row) {
      return parseFloat(row.integral).toFixed(2);
    },
    dateFormatter(row) {
      return moment(row.date).format('YYYY-MM-DD');
    },
    core() {
      if (!cache.has('merchandise')) cache.set('merchandise', {});
      const merchandise = cache.get('merchandise');
      const keys = Object.keys(merchandise)
        .map(item => +item)
        .sort((a, b) => a - b);
      if (keys.length === 0) {
        this.getData();
        return;
      }
      for (let i = keys.findIndex(item => item === this.currentPage); i < keys.length; i += 1) {
        delete merchandise[keys[i]];
      }
      this.getData();
    },
    singleDelete() {
      const { pageCount } = this;
      this.total -= 1;
      if (this.currentPage !== 1 && this.currentPage === pageCount && this.merchandiseList.length === 1) this.currentPage -= 1;
      this.core();
    },
    batchDelete() {
      const { pageCount } = this;
      this.total -= this.ids.length;
      if (this.currentPage !== 1 && this.currentPage === pageCount && this.ids.length === this.merchandiseList.length) this.currentPage -= 1;
      this.core();
      this.ids = [];
    },
    open(target) {
      this.target = target;
      this.edit = true;
    },
    close() {
      this.edit = false;
    },
    openDialog(handler) {
      this.handler = () => {
        this.closeDialog();
        handler();
      };
      this.visible = true;
    },
    closeDialog() {
      this.visible = false;
    },
    submit(payload) {
      this.target.name = payload.name;
      this.target.description = payload.description;
      this.target.integral = payload.integral;
      this.target.path = payload.path;
      this.close();
    },
    select(selection) {
      this.ids = selection.map(item => item.id);
    },
    search(payload) {
      this.condition = payload;
      this.currentPage = 1;
      cache.reset();
      this.getData();
      this.getTotal();
    },
    change(currentPage) {
      this.currentPage = currentPage;
      this.getData();
    },
    getTotal() {
      axios.get('/api/merchandise/total', {
        params: this.condition,
      })
        .then((result) => {
          const { data, code } = result.data;
          if (code === 0) {
            this.total = data;
            return;
          }
          this.$message.error('请求数据失败！');
        });
    },
    getData() {
      if (!cache.has('merchandise')) cache.set('merchandise', {});
      const merchandise = cache.get('merchandise');
      if (merchandise[this.currentPage]) {
        this.merchandiseList = merchandise[this.currentPage];
        return;
      }
      this.loading = true;
      axios.get('/api/merchandise/list', {
        params: {
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          ...this.condition,
        },
      }).then((result) => {
        const { data, code } = result.data;
        if (code === 0) {
          this.merchandiseList = data;
          merchandise[this.currentPage] = data;
          return;
        }
        this.$message.error('请求数据失败！');
      }).finally(() => {
        this.loading = false;
      });
    },
  },
  filters: {
    dateFormatter(value) {
      return moment(value).format('YYYY-MM-DD');
    },
  },
  mounted() {
    this.getData();
    this.getTotal();
  },
  beforeDestroy() {
    if (this.condition.name !== '') cache.reset();
  },
};
</script>

<style lang="scss" scoped>
  .merchandise-list-container {
    padding: 20px;
    background-color: $appMainBg;

    .multipart-line {
      width: 100%;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }

    .avatar {
      width: 56px;
      height: 56px;
    }

    .dialog-title {
      margin: 0;
      color: #333;
      font-size: 14px;
      text-align: center;
    }

    .el-form-item {
      margin-bottom: px2rem(4);
    }

    .pagination-container {
      position: fixed;
      left: #{$openSideBarWidth}px;
      bottom: 20px;
      width: calc(100% - #{$openSideBarWidth}px);
      text-align: center;
      transition: all .28s;
    }

    &.hideSidebar {
      .pagination-container {
        left: #{$collapseSideBarWidth}px;
        width: calc(100% - #{$collapseSideBarWidth}px);
      }
    }

    &.withoutAnimation {
      .pagination-container {
        transition: none;
      }
    }
  }
</style>

<style lang="scss" scoped>
  @media screen and (max-width: $dividingLine) {
    .merchandise-list-container {
      padding: px2rem(10);

      .header {
        margin-bottom: px2rem(10);
      }

      .avatar {
        width: px2rem(56);
        height: px2rem(56);
      }

      .dialog-title {
        font-size: px2rem(14);
      }

      .pagination-container {
        left: 0;
        bottom: px2rem(20);
        width: 100%;
      }

      &.hideSidebar {
        .pagination-container {
          left: 0;
          width: 100%;
        }
      }
    }
  }
</style>