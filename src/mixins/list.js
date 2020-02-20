import axios from 'axios';
import cache from '@/cache';

export default {
  data() {
    return {
      loading: false,
      edit: false,
      dialog: false,
      target: {},
      list: [],
      total: 0,
      ids: [],
      id: -1,
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.total / this.pageSize);
    },
  },
  methods: {
    getTotal() {
      axios.get(this.url.total, {
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
      if (!cache.has(this.character)) cache.set(this.character, {});
      const character = cache.get(this.character);
      if (character[this.currentPage]) {
        this.list = character[this.currentPage];
        return;
      }
      this.loading = true;
      axios.get(this.url.data, {
        params: {
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          ...this.condition,
        },
      }).then((result) => {
        const { data, code } = result.data;
        if (code === 0) {
          this.list = data;
          character[this.currentPage] = data;
          return;
        }
        this.$message.error('请求数据失败！');
      }).finally(() => {
        this.loading = false;
      });
    },
    closeDialog() {
      this.dialog = false;
    },
    openEdit(target) {
      this.target = target;
      this.edit = true;
    },
    closeEdit() {
      this.edit = false;
    },
    core() {
      this.closeDialog();
      if (!cache.has(this.character)) cache.set(this.character, {});
      const character = cache.get(this.character);
      const keys = Object.keys(character)
        .map(item => +item)
        .sort((a, b) => a - b);
      if (keys.length === 0) {
        this.getData();
        return;
      }
      for (let i = keys.findIndex(item => item === this.currentPage); i < keys.length; i += 1) {
        delete character[keys[i]];
      }
      this.getData();
    },
    pageChange(currentPage) {
      this.currentPage = currentPage;
      this.getData();
    },
  },
  mounted() {
    this.getTotal();
    this.getData();
  },
};