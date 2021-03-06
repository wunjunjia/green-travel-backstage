import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import settings from './modules/settings';
import user from './modules/user/index';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    settings,
    user,
  },
});
