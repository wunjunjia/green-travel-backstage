import axios from 'axios';
import router from '@/router';
import { SAVE, CLEAR } from './mutation-types';

const initState = {
  data: null,
};

const actions = {
  save({ commit }, payload) {
    commit(SAVE, payload);
  },
  clear({ commit }) {
    axios.get('/api/logout')
      .then(() => {
        commit(CLEAR);
        router.push('/login');
      });
  },
};

const mutations = {
  [SAVE](state, payload) {
    state.data = payload;
  },
  [CLEAR](state) {
    state.data = null;
  },
};

export default {
  namespaced: true,
  state: initState,
  mutations,
  actions,
};