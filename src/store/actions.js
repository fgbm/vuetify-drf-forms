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
  deleteRecord({commit, state}, endpoint) {
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

export default actions;
