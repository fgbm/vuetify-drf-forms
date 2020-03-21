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

export default getters;
