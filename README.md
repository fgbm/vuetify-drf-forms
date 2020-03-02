# vuetify_drf_forms

### plugins/vuetify_drf_forms.js
```javascript
import Vue from 'vue';
import VuetifyDRF from 'vuetify-drf-forms';

export default ({store}) => {
  Vue.use(VuetifyDRF, {store});
};
```

### nuxt.config.js
```javascript
...
plugins: [
  ...
  {src: '~plugins/vuetify_drf_forms', mode: 'client'}
],
```

### Использование формы
```javascript
import CForm from 'vuetify-drf-forms/src/components/CForm.vue';
const endpoint = 'API ENDPOINT';
export default {
  mixins: [CForm],
  data() {
    return {
      endpoint,
      ...
    }
  ...
}
```
