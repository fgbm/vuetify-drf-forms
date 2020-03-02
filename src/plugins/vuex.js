import Vue from 'vue';
import Vuex from 'vuex';
import DRFStore from '../store/vuetify-drf-forms';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    vuetify_drf_forms: DRFStore
  }
});
