import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './vuex/store'
import App from './App.vue'
import Vuetify from 'vuetify'
import RecipeList from './components/RecipeList.vue'
import RecipeSingle from './components/RecipeSingle.vue'
import './stylus/main.styl'

Vue.use(VueRouter)
Vue.use(Vuetify)

const routes = [
  { path: '/', component: RecipeList },
  { path: '/recipes', component: RecipeList },
  { path: '/recipe', component: RecipeSingle }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  store,
  el: '#app',
  router,
  render: h => h(App)
})
