import { debounce } from '@/utils/common';

const { body } = document;
// const WIDTH = 992;
const WIDTH = 751;

export default {
  data() {
    return {
      resizeHandler: debounce(() => {
        const flag = this.mobile();
        this.$store.dispatch('app/toggleDevice', flag ? 'mobile' : 'desktop', { withoutAnimation: true });
      }),
    };
  },
  watch: {
    $route() {
      if (this.device === 'mobile') this.$store.dispatch('app/toggleSideBar');
    },
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler);
  },
  mounted() {
    const flag = this.mobile();
    if (flag) this.$store.dispatch('app/toggleDevice', 'mobile');
  },
  methods: {
    mobile() {
      const rect = body.getBoundingClientRect();
      return rect.width - 1 < WIDTH;
    },
  },
};