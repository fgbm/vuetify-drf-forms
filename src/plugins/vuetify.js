import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import CForm from '../index';
import CField from '../index';
import CDatePicker from '../index';
import CCheckbox from '../index';
import CSelect from '../index';
import CTextarea from '../index';
import CTextField from '../index';

Vue.use(Vuetify);
Vue.use(CForm);
Vue.use(CField);
Vue.use(CCheckbox);
Vue.use(CSelect);
Vue.use(CTextarea);
Vue.use(CTextField);
Vue.use(CDatePicker);

export default new Vuetify({
  theme: {
    dark: true
  }
});
