import Vuex from 'vuex';
import vietify_drf_forms_store from './store/index';

import CForm from './components/CForm';
import CField from './components/CField';
import CCheckbox from './components/CCheckbox';
import CDatePicker from './components/CDatePicker';
import CDateTimePicker from './components/CDateTimePicker';
import CSelect from './components/CSelect';
import CTextarea from './components/CTextarea';
import CTextField from './components/CTextField';

const PLUGIN_NAME = 'vietify-drf-forms';

const install = (Vue, options = {}) => {
  Vue.component('c-form', CForm);
  Vue.component('c-field', CField);
  Vue.component('c-checkbox', CCheckbox);
  Vue.component('c-date-picker', CDatePicker);
  Vue.component('c-date-time-picker', CDateTimePicker);
  Vue.component('c-select', CSelect);
  Vue.component('c-textarea', CTextarea);
  Vue.component('c-text-field', CTextField);

  let {store} = options;
  if (store) {
    // если передали store - регистрируем в нем свой модуль
    store.registerModule(PLUGIN_NAME, vietify_drf_forms_store, {preserveState: false});
  } else {
    // не передали, для начала проверим, установлен ли Vuex в Vue
    if (!new Vue({store: {}}).$store) {
      // и если нет, установим
      Vue.use(Vuex);
    }
    // и создадим новый store с единственным модулем - нашим
    store = new Vuex.Store({
      modules: {
        [PLUGIN_NAME]: vietify_drf_forms_store
      }
    });
  }
  // // немного упростим себе жизнь, чтоб не писать каждый раз наш нэймспейс
  // // если что-то не используется, то можно убрать
  // const boundStore = {
  //   state: store.state[PLUGIN_NAME],
  //   getters: store.getters[PLUGIN_NAME],
  //   commit(mutation, payload, options) {
  //     return store.commit(`${PLUGIN_NAME}/${mutation}`, payload, options);
  //   },
  //   dispatch(action, payload, options) {
  //     return store.dispatch(`${PLUGIN_NAME}/${action}`, payload, options);
  //   },
  //   watch(fn, cb, options) {
  //     return store.watch((state, getters) => fn(state[PLUGIN_NAME], getters[PLUGIN_NAME]), cb,
  //         options);
  //   }
  // };
};

export default install;
