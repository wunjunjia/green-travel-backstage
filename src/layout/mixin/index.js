const { body } = document;
const WIDTH = 992;

function throttle(fn, delay = 300) {
  let flag = false;
  return () => {
    if (flag) return;
    flag = true;
    const timer = setTimeout(() => {
      clearTimeout(timer);
      flag = false;
      fn();
    }, delay);
  };
}

export default {
  data() {
    return {
      resizeHandler: throttle(() => {
        const flag = this.mobile();
        this.$store.dispatch('app/toggleDevice', flag ? 'mobile' : 'desktop');
        if (flag) this.$store.dispatch('app/closeSideBar', { withoutAnimation: true });
      }),
    };
  },
  watch: {
    $route() {
      if (this.device === 'mobile' && this.sidebar.opened) {
        this.$store.dispatch('app/closeSideBar', { withoutAnimation: false });
      }
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
    if (flag) {
      this.$store.dispatch('app/toggleDevice', 'mobile');
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: true });
    }
  },
  methods: {
    mobile() {
      const rect = body.getBoundingClientRect();
      return rect.width - 1 < WIDTH;
    },
  },
};