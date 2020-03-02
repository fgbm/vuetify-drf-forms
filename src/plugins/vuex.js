import Vue from 'vue';
import Vuex from 'vuex';
import {state, getters, actions, mutations} from '@/store/vuetify_drf_forms';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    vuetify_drf_forms: {
      namespaced: true,
      state: state,
      getters: getters,
      actions: actions,
      mutations: mutations
    }
  }
});
