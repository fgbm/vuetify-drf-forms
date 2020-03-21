import Vue from 'vue';
import Vuex from 'vuex';
import DRFStore from '../store/index';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    vuetify_drf_forms: DRFStore
  }
});
