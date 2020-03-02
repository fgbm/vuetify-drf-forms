import Vue from 'vue'
import vuetify from './plugins/vuetify' // path to vuetify export
import store from './plugins/vuex'
import App from './App'

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
