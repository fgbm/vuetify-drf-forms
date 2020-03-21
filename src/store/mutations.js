import {checkEndpoint} from './helpers';

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
      ...state[endpoint],
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

export default mutations;
