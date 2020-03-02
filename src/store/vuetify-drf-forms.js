import Vue from 'vue';

const state = () => {
  return {};
};

function checkEndpoint(state, endpoint) {
  if (!(endpoint in state)) {
    Vue.set(state, endpoint, {});
  }
}

const mutations = {
  setRecordField(state, {endpoint, field, value}) {
    checkEndpoint(state, endpoint);
    if ('record' in state[endpoint]) {
      let new_record = {...state[endpoint].record};
      new_record[field] = value;
      state[endpoint] = {...state[endpoint], record: new_record};
    }
  },
  setRecord(state, {endpoint, record}) {
    checkEndpoint(state, endpoint);
    state[endpoint] = {...state[endpoint], record: record};
  },
  setErrors(state, {endpoint, errors}) {
    checkEndpoint(state, endpoint);
    state[endpoint] = {...state[endpoint], errors: errors};

  },
  setSuccess(state, endpoint) {
    checkEndpoint(state, endpoint);
    state[endpoint] = {...state[endpoint], success: true};

  },
  setNotSuccess(state, endpoint) {
    checkEndpoint(state, endpoint);
    state[endpoint] = {...state[endpoint], success: false};

  },
  cleanRecord(state, endpoint) {
    checkEndpoint(state, endpoint);
    state[endpoint] = {
      record: {},
      errors: {},
      options: {}
    };
  },
  setOptions(state, {endpoint, options}) {
    checkEndpoint(state, endpoint);

    // Проеряем наличие нужных нам полей
    let _options = {};
    for (let index in options) {
      if (Object.prototype.hasOwnProperty.call(options, index)) {
        let item = options[index];
        if (
            'type' in item &&
            'read_only' in item &&
            !item.read_only &&
            'record' in state[endpoint] &&
            !(item.key in state[endpoint].record)
        ) {
          state[endpoint].record[item.key] = null;
        }
        _options[item.key] = item;
      }
    }

    state[endpoint] = {...state[endpoint], options: _options};
  }
};

const getters = {
  getVuetifyField: (state) => ({endpoint, field}) => {
    let props = {};
    if (endpoint in state && 'errors' in state[endpoint] && 'options' in state[endpoint]) {
      let errors = state[endpoint].errors;
      let options = state[endpoint].options;

      if (field in errors) {
        props['error'] = true;
        props['error-count'] = errors[field].length;
        props['error-messages'] = errors[field];

      } else {
        props['error'] = false;
        props['error-count'] = 0;
        props['error-messages'] = [];
      }

      if (field in options) {
        let field_options = options[field];

        if ('ui' in field_options && 'label' in field_options.ui) {
          props['label'] = field_options.ui.label;
        }
        if ('ui' in field_options && 'help' in field_options.ui) {
          props['placeholder'] = field_options.ui.help;
        }
        if ('validation' in field_options && 'max' in field_options.validation) {
          props['counter'] = field_options.validation.max;
        }
        if ('type' in field_options) {
          if (field_options.type === 'select' && 'choices' in field_options) {
            props['items'] = field_options.choices;
            props['item-text'] = 'label';
            props['item-value'] = 'value';
          }
        }
      }
      return props;
    }
  },
  getRecord: (state) => (endpoint) => {
    if (endpoint in state) {
      if (!('record' in state[endpoint])) state[endpoint].record = {};

      let o = state[endpoint].record;
      let newObj = {};
      Object.keys(o).filter(prop => o[prop] !== null).forEach(prop => newObj[prop] = o[prop]);
      return newObj;
    } else {
      return null;
    }
  },
  getOptions: (state) => (endpoint) => {
    if (endpoint in state) {
      if (!('options' in state[endpoint])) state[endpoint].options = {};
      return state[endpoint].options;
    } else {
      return {};
    }
  },
  isSuccess: (state) => (endpoint) => {
    if (endpoint in state && 'success' in state[endpoint]) {
      return state[endpoint].success;
    } else {
      return false;
    }
  }
};

const actions = {
  fetchRecordById({commit}, {endpoint, id}) {
    this.$axios.get(`${endpoint}${id}/`).then((json) => {
      commit('setRecord', {endpoint, record: json.data});
    });
    commit('setNotSuccess', endpoint);
  },
  deleteRecordById({commit}, {endpoint, id}) {
    this.$axios.delete(`${endpoint}${id}/`).then(() => {
      commit('setErrors', {endpoint, errors: []});
      commit('setSuccess', endpoint);
    }).catch(({response}) => commit('setErrors', {endpoint, errors: response.data}));
  },
  deleteRecord({commit}, endpoint) {
    if (endpoint in state && 'record' in state[endpoint]) {
      this.$axios.delete(`${endpoint}${state[endpoint].record.id}/`).then(() => {
        commit('setErrors', {endpoint, errors: []});
        commit('setSuccess', endpoint);
        commit('cleanRecord', endpoint);
      }).catch(({response}) => commit('setErrors', {endpoint, errors: response.data}));
    }
  },
  saveRecord({commit, state, getters}, endpoint) {
    if (endpoint in state && 'record' in state[endpoint]) {
      if ('id' in state[endpoint].record) {
        // Обновление записи
        return this.$axios.patch(endpoint + state[endpoint].record.id + '/',
            getters.getRecord(endpoint)).then(() => {
          commit('setErrors', {endpoint, errors: []});
          commit('setSuccess', endpoint);
        }).catch(({response}) => commit('setErrors', {endpoint, errors: response.data}));
      } else {
        // Создание записи
        return this.$axios.post(endpoint, getters.getRecord(endpoint)).then((json) => {
          commit('setErrors', {endpoint, errors: []});
          commit('setSuccess', endpoint);
          commit('setRecord', {endpoint, record: json.data});
        }).catch((error) => {
          commit('setErrors', {endpoint, errors: error.response.data});
        });
      }
    }
  },
  // Сбор данных о полях из запроса OPTIONS
  fetchCreateOptions({commit, state}, endpoint) {
    if (endpoint in state) {
      this.$axios.options(endpoint).then(({data}) => {
        commit('setOptions', {endpoint, options: data});
      });
    }
  },

  defaults({commit, dispatch}, endpoint) {
    commit('cleanRecord', endpoint);
    dispatch('fetchCreateOptions', endpoint);
    commit('setNotSuccess', endpoint);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
