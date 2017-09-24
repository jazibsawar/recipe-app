import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './vuex/store'
import App from './App.vue'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate';
import wysiwyg from "vue-wysiwyg";
import RecipeList from './components/RecipeList.vue'
import RecipeSingle from './components/RecipeSingle.vue'
import './stylus/main.styl'

Vue.use(VueRouter)
Vue.use(Vuetify)
Vue.use(VeeValidate)
Vue.use(wysiwyg,{
  hideModules: { bold: true, table: true, image: true }
})

const routes = [
  { name: 'home', path: '/', component: RecipeList },
  { name: 'recipes', path: '/recipes', component: RecipeList },
  { name: 'recipe', path: '/recipe/:id', component: RecipeSingle }
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
