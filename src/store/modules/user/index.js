import axios from 'axios';
import router from '@/router';
import { SAVE, CLEAR } from './mutation-types';

const initState = {
  id: -1,
  name: '',
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
  [SAVE](state, { id, name }) {
    state.id = id;
    state.name = name;
  },
  [CLEAR](state) {
    state.id = -1;
    state.name = '';
  },
};

export default {
  namespaced: true,
  state: initState,
  mutations,
  actions,
};