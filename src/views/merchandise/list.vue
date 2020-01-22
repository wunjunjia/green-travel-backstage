<template>
  <div class="container">
    <el-table
      :data="merchandiseList"
    >
      <el-table-column prop="name" label="名称">
        <template slot-scope="scope">
          <div class="multipart-line">{{ scope.row.name }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="integral"
        label="积分"
        :formatter="formatter"
      >
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" :width="300">
            <p>{{ scope.row.description }}</p>
            <div slot="reference" class="multipart-line">{{ scope.row.description }}</div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img class="picture" :src="scope.row.path" alt="picture">
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MerchandiseList',
  data() {
    return {
      merchandiseList: [
        {
          id: 5,
          name: '项链',
          integral: 10,
          path: '/upload/merchandise/2020-01-22/44741801227986966.jpeg',
          description: '好看的项链好看的项链好看的项链好看的项链好看的项链好看的项链好看的项链好看的项链好看的项链好看的项链好看的项链',
        },
      ],
    };
  },
  methods: {
    formatter(row) {
      return parseFloat(row.integral).toFixed(2);
    },
  },
  mounted() {
    axios.get('/api/merchandise/list')
      .then((res) => {
        this.merchandiseList = res.data.data;
      });
  },
};
</script>

<style lang="scss" scoped>
  .container {
    padding: px2rem(10);

    .multipart-line {
      width: 100%;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    .picture {
      display: block;
      width: px2rem(48);
      height: px2rem(48);
    }
  }
</style>