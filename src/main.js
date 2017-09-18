import Vue from 'vue'
import store from './vuex/store'
import App from './App.vue'
import Vuetify from 'vuetify'
import './stylus/main.styl'

Vue.use(Vuetify)

new Vue({
  store: store,
  el: '#app',
  render: h => h(App)
})
