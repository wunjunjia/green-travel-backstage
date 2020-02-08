<template>
  <div class="advertisement-list-container">
    <div class="header">
      <advertisement-search @submit="search"/>
    </div>
    <div class="empty" v-if="list.length === 0">暂无数据</div>
    <ul v-else class="list">
      <li class="card-container" v-for="item in list" :key="item.id">
        <el-card shadow="hover" :body-style="{ padding: 0 }">
          <div class="avatar-container">
            <custom-preview
              :path="item.path"
              :edit="true"
              :remove="true"
              :link="item.outside_link"
              @edit="openEdit(item)"
              @remove="openDialog(item.id)" />
          </div>
          <div class="content">
            <el-tag :type="item.status === 0 ? 'danger' : 'success'" size="medium">
              {{ item.status === 0 ? '停用' : '启用' }}
            </el-tag>
            <span class="date">{{ item.create_time| dateFormatter }}</span>
          </div>
        </el-card>
      </li>
    </ul>
    <custom-pagination
      :currentPage="currentPage"
      :pageSize="pageSize"
      :total="total"
      @pageChange="pageChange" />
    <transition name="fade">
      <advertisement-edit
        v-show="edit"
        :target="target"
        @close="closeEdit"
        @submit="submit"
      />
    </transition>
    <custom-dialog
      :visible="dialog"
      @close="closeDialog"
      @determine="remove"/>
  </div>
</template>

<script>
import axios from 'axios';
import cache from '@/cache';
import listMixin from '@/mixins/list';
import CustomPreview from '@/components/CustomPreview/index.vue';
import CustomDialog from '@/components/CustomDialog/index.vue';
import AdvertisementEdit from './edit.vue';
import CustomPagination from '@/components/CustomPagination/index.vue';
import AdvertisementSearch from './search.vue';

export default {
  name: 'AdvertisementList',
  mixins: [listMixin],
  data() {
    return {
      character: 'advertisement',
      url: {
        data: '/api/advertisement/list',
        total: '/api/advertisement/total',
        remove: '/api/advertisement/delete',
      },
      currentPage: 1,
      pageSize: 10,
      condition: {
        create_time: {
          max: '',
          min: '',
        },
        status: -1,
      },
    };
  },
  components: {
    CustomPreview,
    CustomDialog,
    CustomPagination,
    AdvertisementEdit,
    AdvertisementSearch,
  },
  methods: {
    openDialog(id) {
      this.id = id;
      this.dialog = true;
    },
    remove() {
      axios.post(this.url.remove, {
        ids: [this.id],
      }, {
        'Content-Type': 'application/json; charset=UTF-8',
      }).then((result) => {
        const { code } = result.data;
        if (code !== 0) {
          this.$message.error('删除失败！');
          return;
        }
        this.$message.success('删除成功！');
        if (this.currentPage !== 1 && this.currentPage === this.pageCount && this.list.length === 1) this.currentPage -= 1;
        this.total -= 1;
        this.core();
      });
    },
    submit(payload) {
      this.target.outside_link = payload.outside_link;
      this.target.status = payload.status;
      this.target.path = payload.path;
      this.closeEdit();
    },
    search(payload) {
      const { status, create_time: { min, max } } = payload;
      this.condition.status = status;
      this.condition.create_time.min = min;
      this.condition.create_time.max = max;
      this.currentPage = 1;
      cache.set(this.character, {});
      this.getData();
      this.getTotal();
    },
  },
  beforeDestroy() {
    const { create_time: { max, min }, status } = this.condition;
    if (max !== '' || min !== '' || status !== -1) cache.set(this.character, {});
  },
};
</script>

<style lang="scss" scoped>
  .advertisement-list-container {
    padding: 10px;
    background-color: $appMainBg;
    .empty {
      width: 100%;
      height: 60px;
      line-height: 60px;
      text-align: center;
      font-size: 14px;
      color: #909399;
      background-color: #fff;
    }
    .header {
      margin-bottom: 10px;
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      .card-container {
        margin-bottom: 10px;
        margin-right: 10px;
        .avatar-container {
          width: 320px;
          height: 120px;
        }
        .content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          .date {
            font-size: 14px;
            color: #999;
          }
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  @media screen and (max-width: $dividingLine) {
    .advertisement-list-container {
      .list {
        .card-container {
          width: 100%;
          margin-right: 0;
          .avatar-container {
            width: 100%;
            height: auto;
          }
        }
      }
    }
  }
</style>

<style lang="scss">
  .advertisement-list-container {
    .mask-content-container {
      width: 700px;
      @media screen and (max-width: $dividingLine) {
        width: 90%;
      }
    }
  }
</style>