import Cookies from 'js-cookie';

const initState = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false,
  },
  device: 'desktop',
};

const mutations = {
  TOGGLE_SIDEBAR: (state, withoutAnimation) => {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = withoutAnimation;
    if (state.sidebar.opened) Cookies.set('sidebarStatus', 1);
    else Cookies.set('sidebarStatus', 0);
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0);
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = withoutAnimation;
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device;
    state.sidebar.withoutAnimation = true;
  },
};

const actions = {
  toggleSideBar({ commit }, { withoutAnimation = false } = {}) {
    commit('TOGGLE_SIDEBAR', withoutAnimation);
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation);
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device);
  },
};

export default {
  namespaced: true,
  state: initState,
  mutations,
  actions,
};