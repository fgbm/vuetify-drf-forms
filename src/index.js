import CForm from '@/components/CForm'
import CField from '@/components/CField'
import CCheckbox from '@/components/CCheckbox';
import CDatePicker from '@/components/CDatePicker';
import CSelect from '@/components/CSelect';
import CTextarea from '@/components/CTextarea';
import CTextField from '@/components/CTextField';

const install = Vue => {
  Vue.component('c-form', CForm)
  Vue.component('c-field', CField)
  Vue.component('c-checkbox', CCheckbox)
  Vue.component('c-date-picker', CDatePicker)
  Vue.component('c-select', CSelect)
  Vue.component('c-textarea', CTextarea)
  Vue.component('c-text-field', CTextField)
}

export default install
