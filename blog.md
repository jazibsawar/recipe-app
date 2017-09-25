# How to build recipe app in vue.js & vuex using cosmicjs #

In this tutorial, I'm going to show you how to create a elegant **Recipe App** using [Vue2](https://vuejs.org/), [Vuex](https://vuex.vuejs.org/en/), [Vuetify](https://vuetifyjs.com/) and [Cosmicjs](http://cosmicjs.com/). It is hosted on the Cosmic JS App Server. For the sake of understanding how to consume Restful API’s, this tutorial will show how to make AJAX (XHR) requests to the Cosmic JS API in order to retrieve, add, update, and delete data/media in our Cosmic JS buckets. Let's get started.

[Download the GitHub repo.!](https://github.com/jazibsawar/recipe-app/)

[Check out the demo.!](https://jazibsawar.github.io/recipe-app/)

## Prerequisites ##

You’ll need Node JS and npm. Make sure you already have them before you start.

## Getting Started ##

### Doing everything using the existing git repo ###

First of all, you have to be sure you have node > 6.x installed, than run the following commands:

```javascript
npm install -g vue-cli
git clone https://github.com/jazibsawar/recipe-app/
cd recipe-app
npm install
npm run dev
```

Browser window will open automatically once you'll run the last command.

`package.json` will look like this.

```javascript
{
  "name": "recipe-app",
  "description": "A Vue.js project",
  "version": "1.0.0",
  "author": "Jazib Sawar <jazibsawar@gmail.com>",
  "private": true,
  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack-dev-server --open --inline --hot",
    "build": "cross-env NODE_ENV=production webpack --progress --hide-modules"
  },
  "dependencies": {
    "cosmicjs": "^2.4.11",
    "js-beautify": "^1.6.14",
    "lodash": "^4.17.4",
    "vee-validate": "^2.0.0-rc.17",
    "vue": "^2.4.2",
    "vue-router": "^2.7.0",
    "vue-wysiwyg": "^1.2.6",
    "vuetify": "^0.15.7",
    "vuex": "^2.4.0"
  },
  "devDependencies": {
    "babel-core": "^6.0.0",
    "babel-loader": "^6.0.0",
    "babel-plugin-add-filehash": "^6.9.4",
    "babel-plugin-transform-imports": "^1.4.1",
    "babel-preset-env": "^1.5.1",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-stage-2": "^6.24.1",
    "cross-env": "^3.0.0",
    "css-loader": "^0.25.0",
    "file-loader": "^0.9.0",
    "node-sass": "^4.5.0",
    "sass-loader": "^5.0.1",
    "style-loader": "^0.13.1",
    "stylus": "^0.54.5",
    "stylus-loader": "^3.0.1",
    "vue-loader": "^12.1.0",
    "vue-template-compiler": "^2.4.2",
    "webpack": "^2.6.1",
    "webpack-dev-server": "^2.4.5"
  }
}
```

### What we're installing and why ###

1. We're going to use **vue** and **vuex** libraries to create components and manage state.

2. We're using **vue-router** package to navigate between our components.

3. We're using **vuetify** package to create beautiful layouts using vue components.

4. We're going to use **cosmicjs** library to handle our requests to our Cosmic JS bucket.

5. **vue-wysiwyg** is used for editor & **vee-validate** is used for form validation.

## Building our app ##

Now we will set up our index.html in our root directory where we will change the favicon and you can add meta tags also.

Below is the index.html file. Only code block important here is to include the build script **<script src="./dist/build.js"></script>** at the end of body tag and create a element **<div id="app"></div>** where **vue** will bootstrap your application.

```javascript
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Recipes App</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet" type="text/css">
    <link href='./public/font-awesome-4.7.0/css/font-awesome.min.css' rel="stylesheet" type="text/css">
    <link rel="icon" type="image/png" href="./public/favicon-32x32.png" sizes="32x32">
  </head>
  <body>
    <div id="app"></div>
    <script src="./dist/build.js"></script>
  </body>
</html>
```

### Setup main.js ###

As you may know **main.js** is main file that creates vue instance and render the first component.

```javascript
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
  routes
});

new Vue({
  store,
  el: '#app',
  router,
  render: h => h(App),
  beforeMount: function(){
    this.$store.dispatch("getRecipes");
  }
})

```

In first few lines I imported all the packages and components into the app. `Vue.use()` inject our package into vue so that we can use it. `Vue.use(VueRouter)` is including router in our app. Which will provide navigation for the app.

#### Routing ####

```javascript
const routes = [
  { name: 'home', path: '/', component: RecipeList },
  { name: 'recipes', path: '/recipes', component: RecipeList },
  { name: 'recipe', path: '/recipe/:id', component: RecipeSingle }
];
```

These are our possible routes. Home and Recipes are for showing list of recipes. And `/recpie/:id` will show the recipe.

#### Vue Instance ####

```javascript
new Vue({
  store,
  el: '#app',
  router,
  render: h => h(App),
  beforeMount: function(){
    this.$store.dispatch("getRecipes");
  }
})
```

Here Vue instance is created. `el: '#app'` is the id of the element from index.html where vue will be injecting the app. `store` is vuex store. I will talk about vuex later. `router` is injecting router object. `render: h => h(App)` is telling app to inject App component first in the App.

### Setup App.vue ###

`\src\App.js` is the first component that will render. I used vuetify components for UI and provided stylus for css. You can check their documentation [here](https://vuetifyjs.com/vuetify/quick-start). Most important code block here to include router view in the template `<router-view></router-view>`. This piece of code will render the router and respective components based on routes.

## Vuex ##

Moving ahead first I discuss about Vuex and why we should use that. You can obviously use simple state and props for smaller applications. But for large applications we must use some kind of state management like redux in React. Vuex is maintained by vue team and it is widely used. Today we will that. Below is the Vuex flow diagram that I will explain.

![Vuex Concept Flow](https://raw.githubusercontent.com/vuejs/vuex/dev/docs/en/images/vuex.png)

There are four main concepts in vuex.

- State

- Actions

- Mutations

- Getters

**State** is where our whole application state/data will be store. So how it will work? For example, you are using this store in you component and want to change some state value. You have to dispatch an **action**. Then **action** will commit the **mutation** and it will change the state. So why action is needed, we can change state directly in mutation. Action is very important. We need actions when we have to call any async function and then on its success change the state. In case of API we consume request in actions and commit mutation to change state. It is very simple but very import to follow.

**Getters** are simple getter function to get value of state in components. If you need one state value in different components so it is better to create getter for it and use that getter in component as computed property.

It is convention to create vuex folder and then create store.js in it. So I did the same and created `src/vuex/store.js`. Below is the store.js code:

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import Request from '../common/request'
import _ from 'lodash';

Vue.use(Vuex)

// the root, initial state object
const state = {
    recipes: [
    ],
    status: {
        loading: false,
        success: false,
        error: false
    },
    categories: [
        "Dessert",
        "Meal"
    ],
    recipe: {
        metadata:{
            feature_image: {
            },
            ingredients:[]
        }
    },
    editForm: false,
    editting: false,
    pagination: {
        page: 1,
        limit: 12,
        total: 0
    }
}

// define the possible getters that can be applied to our state
const getters = {
    recipes(state){
        return state.recipes;
    },
    recipe(state){
        return (keyword) => _.find(state.recipes,['_id', keyword]);
    },
    recipeModel(state){
        return state.recipe;
    },
    loading(state){
        return state.status.loading;
    },
    editForm(state){
        return state.editForm;
    },
    categories(state){
        return state.categories;
    },
    editting(state){
        return state.editting;
    },
    pagination(state){
        return state.pagination;
    },
    page(state){
        return state.pagination.page;
    }
}

// define the possible mutations that can be applied to our state
const mutations = {
    SET_TOTAL(state,payload){
        state.pagination.total = Math.ceil(payload / state.pagination.limit);
    },
    SET_RECIPES(state,payload){
        state.recipes = payload;
    },
    SET_RECIPE(state,payload){
        state.recipe = payload;
    },
    ADD_RECIPE(state,payload){
        state.recipes.unshift(payload);
    },
    EDIT_RECIPE(state,payload){
        state.recipes = _.unionBy([payload],state.recipes,'_id');
    },
    DELETE_RECIPE(state,payload){
        _.remove(state.recipes, function (recipe) {
            return recipe._id === payload._id
        });
    },
    LOADING(state){
        state.status = {
            loading: true,
            success: false,
            error: false
        };
    },
    SUCCESS(state){
        state.status = {
            loading: false,
            success: true,
            error: false
        };
    },
    ERROR(state,payload){
        state.status = {
            loading: false,
            success: false,
            error: payload
        };
    },
    CLEAR_ERROR(state){
        state.status = {
            loading: false,
            success: false,
            error: false
        };
    },
    TOGGLE_EDITFORM(state,payload){
        state.editForm = payload;
    },
    ADD_INGREDIANT_RECIPE(state,payload){
        state.recipe.metadata.ingredients.push({
            ingredient: payload
        });
    },
    REMOVE_INGREDIANT_RECIPE(state,payload){
        state.recipe.metadata.ingredients.splice(payload, 1);
    },
    SET_RECIPE_IMAGE(state,payload){
        state.recipe.metadata.feature_image.url = payload;
    },
    SET_RECIPE_FILE(state,payload){
        state.recipe.metadata.feature_image.file = payload;
    },
    TOGGLE_EDITTING(state){
        state.editting = !state.editting;
    },
    SET_RECIPE_DEFAULT(state){
        state.recipe = {
            metadata:{
                feature_image: {
                },
                ingredients:[]
            }
        };
    },
    PAGINATE(state,payload){
        state.pagination.page = payload;
    }
}


// define the possible actions that can be applied to our state
const actions = {
    getRecipes(context){
        context.commit('LOADING');
        Request.getRecipes(context.getters.pagination).then(res => {
            context.commit('SET_RECIPES',res.objects.all || []);
            context.commit('SET_TOTAL',res.total || 0);
            context.commit('SUCCESS');
        })
        .catch(e => {
            context.commit('ERROR',e);
        });
    },
    setRecipe(context,payload){
        context.commit('SET_RECIPE',_.cloneDeep(payload));
    },
    setRecipeDefault(context){
        context.commit('SET_RECIPE_DEFAULT');
    },
    addRecipe(context,payload){
        context.commit('LOADING');
        Request.addRecipe(payload).then(recipe => {
            context.commit('ADD_RECIPE',recipe);
            context.commit('SET_RECIPE_DEFAULT');
            context.commit('TOGGLE_EDITFORM',false);
            context.commit('SUCCESS');
        })
        .catch(e => {
            context.commit('ERROR',e);
        });
    },
    editRecipe(context,payload){
        context.commit('LOADING');
        Request.editRecipe(payload).then(recipe => {
            context.commit('EDIT_RECIPE',recipe);
            context.commit('SET_RECIPE_DEFAULT');
            context.commit('TOGGLE_EDITTING');
            context.commit('TOGGLE_EDITFORM',false);
            context.commit('SUCCESS');
        })
        .catch(e => {
            context.commit('ERROR',e);
        });
    },
    deleteRecipe(context,payload){
        context.commit('LOADING');
        Request.deleteRecipe(payload).then((res) => {
            if(res.status == 200){
                context.commit('DELETE_RECIPE',payload);
                context.commit('SUCCESS');
            }
            else{
                context.commit('ERROR',res);
            }
        })
        .then((e) => {
            context.commit('ERROR',e);
        });
    },
    clearError(context){
        context.commit('CLEAR_ERROR');
    },
    setEditForm(context,payload){
        context.commit('TOGGLE_EDITFORM',payload);
    },
    addIngrediantInRecipe(context,payload){
        context.commit('ADD_INGREDIANT_RECIPE',payload);
    },
    removeIngrediantInRecipe(context,payload){
        context.commit('REMOVE_INGREDIANT_RECIPE',payload);
    },
    setRecipeImage(context,payload){
        context.commit('SET_RECIPE_IMAGE',payload);
    },
    setRecipeFile(context,payload){
        context.commit('SET_RECIPE_FILE',payload);
    },
    toggleEditting(context){
        context.commit('TOGGLE_EDITTING');
    },
    paginate(context,payload){
            context.commit('PAGINATE',payload);
            context.dispatch('getRecipes');
    }
}

// create the Vuex instance by combining the state and mutations objects
// then export the Vuex store for use by our components
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
```

## Config ##

`src/config/config.js` is the file to store the basic configuration to access cosmicjs bucket data using their api or npm package.

```javascript
const config = {
    bucket: {
        slug: YOUR_BUCKET_SLUG,
        read_key: YOUR_BUCKET_READ_KEY,
        write_key: YOUR_BUCKET_READ_KEY
    },
    object_type: OBJECT_TYPE,
    image_folder: FOLDER_SLUG
};
export default config;
```

## Commons ##

In `src/common/` I created three .js files inorder to structre my code and make it scalable. `src/common/request.js` file will use `src/common/Cosmic.js` package and make requests to provided endpoints and return Promises. `src/common/paramMapping.js` will create a request object in case of add and edit.

In `src/common/Cosmic.js` I extended the cosmic-js package as it was missing `deleteMedia` and sort functionality in `getObjectsByType` functions.

`Note: I created a PR I hope it will be added out of the box in cosmic-js package.`

Cosmic.js extended code is below.

```javascript
import Cosmic from 'cosmicjs';
var api_url = 'https://api.cosmicjs.com';
var api_version = 'v1';

Cosmic.getObjectsByType = function(config, object, callback){
  var endpoint = api_url + '/' + api_version + '/' + config.bucket.slug + '/object-type/' + object.type_slug + '?read_key=' + config.bucket.read_key;
  if (object.limit) endpoint += '&limit=' + object.limit;
  if (object.skip) endpoint +=  '&skip=' + object.skip;
  if (object.locale) endpoint += '&locale=' + object.locale;
  if (object.sort) endpoint += '&sort=' + object.sort;
  fetch(endpoint)
  .then(function(response){
    if (response.status >= 400) {
      var err = {
        "message" : "There was an error with this request."
      }
      return callback(err, false);
    }
    return response.json()
  })
  .then(function(response){
    // Constructor
    var cosmic = {};
    var objects = response.objects;
    cosmic.objects = {};
    cosmic.objects.all = objects;
    cosmic.object = _.map(objects, keyMetafields);
    cosmic.object = _.keyBy(cosmic.object, "slug");
    cosmic.total = response.total;
    return callback(false, cosmic);
  });
};

Cosmic.deleteMedia = function(config, object, callback){
    var endpoint = api_url + '/' + api_version + '/' + config.bucket.slug + '/media/' + object.media_id;
    fetch(endpoint, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(object)
    })
    .then(function(response){
      if (response.status >= 400) {
        var err = {
          'message': 'There was an error with this request.'
        }
        return callback(err, false);
      }
      return response.json()
    })
    .then(function(response){
      return callback(false, response);
    });
};

function keyMetafields(object){
  var metafields = object.metafields;
  if(metafields){
    object.metafield = _.keyBy(metafields, 'key');
  }
  return object;
}

export default Cosmic;
```

## Components ##

In this application I created following components.

- RecipeList.vue

- RecipeSingle.vue

- RecipeForm.vue

### RecipeList.vue ###

RecipeList.vue is the main component. It will show the list of recipes in card view. Again I used vuetify components. It provides add, edit, delete and pagination functionality too. For edit & add I have used Modal/Dialog to open the form. That is present in `RecipeForm.vue` component.

```javascript
import {mapActions,mapGetters} from 'vuex';
```

This will map getter of vuex store to computed property of Vue and map actions to methods.

```javascript
<template>
    <div>
        <v-container fill-height class="noRecipes" v-if="recipes.length == 0 && !loading">
            <v-layout row wrap align-center>
                <v-flex class="text-xs-center">
                    <h4>There is no recipe please add one!</h4>
                    <v-btn light large class="amber" @click="openAddForm" :disabled="loading">Add Recipe</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container grid-list-lg text-xs-center>
            <v-layout row wrap v-if="recipes.length > 0">
                <v-flex md4 sm6 xs12 v-for="(recipe, index) in recipes" :key="index">
                    <v-card>
                        <router-link :to="{name:'recipe', params:{id:recipe._id}}">
                            <v-card-media :src="recipe.metadata.feature_image.url" height="200px">
                            </v-card-media>
                        </router-link>
                        <v-card-title primary-title>
                            <div>
                                <h3 class="headline mb-0">
                                    <router-link :to="{name:'recipe', params:{id:recipe._id}}">
                                        {{recipe.title}}
                                    </router-link>
                                </h3>
                                <div>{{recipe.metadata.author}}</div>
                            </div>
                        </v-card-title>
                        <v-card-actions class="white">
                            <v-spacer></v-spacer>
                            <v-btn icon :disabled="loading" @click="openEditForm(recipe)">
                                <v-icon class="blue--text">edit</v-icon>
                            </v-btn>
                            <v-btn icon :disabled="loading" @click="deleteRecipe(recipe)">
                                <v-icon class="red--text">delete</v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-flex>
                <v-btn fixed light fab bottom right class="amber darken-2" @click="openAddForm" :disabled="loading" >
                    <v-icon>add</v-icon>
                </v-btn>
            </v-layout>
            <div class="text-xs-center recipes-pagination" v-if="recipes.length > 0">
                <v-pagination :disabled="loading" :length="pagination.total" v-model="pagination.page" :total-visible="5" circle></v-pagination>
            </div>
            <recipe-form></recipe-form>
            <v-snackbar :timeout="2000" success v-model="success">
                Request done successfully!
            </v-snackbar>
            <v-snackbar :timeout="3000" error v-model="error">
                There was an error during request!
            </v-snackbar>
        </v-container>
    </div>
</template>

<script>
    import {mapActions,mapGetters} from 'vuex';
    import RecipeForm from './RecipeForm.vue';
    export default {
        components:{
            'recipe-form': RecipeForm
        },
        computed: {
            success: {
                get: function(){
                    return this.$store.state.status.success;
                },
                set: function(value){
                    this.$store.dispatch('clearError');
                }
            },
            error: {
                get: function(){
                    return this.$store.state.status.error;
                },
                set: function(value){
                    this.$store.dispatch('clearError');
                }
            },
            ...mapGetters([
                'recipes','pagination','loading','editForm','page'
            ])
        },
        watch: {
            page: 'getRecipes'
        },
        methods:{
            openAddForm(){
                this.$store.dispatch('setRecipeDefault');
                this.$store.dispatch('setEditForm',true);
            },
            openEditForm(recipe){
                this.$store.dispatch('setRecipe',recipe);
                this.$store.dispatch('toggleEditting');
                this.$store.dispatch('setEditForm',true);
            },
            deleteRecipe(recipe){
                this.$store.dispatch('deleteRecipe',recipe);
            },
            getRecipes(){
                this.$store.dispatch('getRecipes');
            }
        }
    }
</script>

<style lang="stylus" scoped>
  #keep
    .card__title
      display: block

    .headline
        a
            color: rgba(0,0,0,0.87)
            text-decoration: none
    .v-spinner
        text-align: center
    .noRecipes
        position: absolute
        right: 0
        left: 0
        text-align: center
        height: auto
        top: 60px
        bottom: 0
    .recipes-pagination
        margin-top: 80px
    .pagination >>> li > a.pagination__item--active
        background: #FFC107
        color: #000
        font-weight: bold
</style>

```

### RecipeForm.vue ###

RecipeForm.vue is used to submit the form and do the basic validation.

```javascript
<template>
  <v-layout row justify-center>
    <v-dialog v-model="editForm" scrollable persistent width="50vw">
        <v-card>
          <v-card-title>
            <span class="headline">{{ editting ? 'Edit ' : 'Add ' }}Recipe</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 70vh;">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="recipeModel.title" label="Title" :error-messages="errors.collect('title')" v-validate="'required'" data-vv-name="title" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <div class="input-group input-group--dirty">
                    <label>Content</label>
                    <wysiwyg v-model="recipeModel.content" />
                  </div>
                </v-flex>
                <v-flex xs12 class="mb-2">
                  <div class="input-group input-group--dirty">
                    <label class="ingredients_list_label">Ingredients</label>
                    <ul class="ingredients_list">
                      <li v-for="(item,index) in recipeModel.metadata.ingredients" :key="index">
                        {{item.ingredient}}
                        <v-btn fab dark small error @click="removeIngrediant(index)" class="btn_remove_ingredient">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                      </li>
                    </ul>
                  </div>
                </v-flex>
                <v-flex xs10 class="mb-3">
                  <v-text-field ref="addIngredientRef" label="Ingredient"></v-text-field>
                </v-flex>
                <v-flex xs2 class="mb-3">
                  <v-btn warning fab small dark @click="addIngrediant($refs.addIngredientRef)">
                    <v-icon>add</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="recipeModel.metadata.author" label="Author" :error-messages="errors.collect('author')" v-validate="'required'" data-vv-name="author" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="recipeModel.metadata.preparation_time" label="Preparation Time (in minutes)" :error-messages="errors.collect('preparation')" v-validate="'required|numeric'" data-vv-name="preparation" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="recipeModel.metadata.cook_time" label="Cook Time (in minutes)" :error-messages="errors.collect('cook')" v-validate="'required|numeric'" data-vv-name="cook" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="recipeModel.metadata.servings" label="Servings (person)" :error-messages="errors.collect('servings')" v-validate="'required|numeric'" data-vv-name="servings" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-select
                    v-bind:items="categories"
                    v-model="recipeModel.metadata.category"
                    label="Choose Category:"
                    :error-messages="errors.collect('category')"
                    v-validate="'required'"
                    data-vv-name="category"
                    required
                  ></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="recipeModel.metadata.youtube_id" label="Youtube ID" :error-messages="errors.collect('youtube')" v-validate="'required'" data-vv-name="youtube" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <img class="upload_image" :src="recipeModel.metadata.feature_image.url" v-if="!!recipeModel.metadata.feature_image.url" />
                  <form enctype="multipart/form-data" novalidate>
                    <input type="file" @change="onFileChange" accept="image/*" data-vv-name="image" v-validate="'required|mimes:image/*'" required />
                    <div class="input-group fileUploadError">
                      <div class="input-group__error" v-show="errors.has('image') && !editting">
                        {{ errors.first('image') }}
                      </div>
                    </div>
                  </form>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn error dark @click="closeDialog" :disabled="loading">Close</v-btn>
            <v-btn :loading="loading" :disabled="loading" primary dark @click="saveRecipe(recipeModel)">Save</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters([
      'editForm', 'recipeModel','categories','editting','loading'
    ])
  },
  methods: {
    closeDialog() {
      this.$validator.reset();
      this.$store.dispatch('setRecipeDefault');
      this.$store.dispatch('setEditForm', false);
    },
    saveRecipe(recipe) {
      this.$validator.validateAll();
      if(this.$store.state.editting){
        if( (!this.errors.any()) || (this.errors.count() == 1 && this.errors.has('image'))) {
          this.$store.dispatch('editRecipe', recipe);
        }
      }
      else
      {
        if(!this.errors.any()){
          this.$store.dispatch('addRecipe', recipe);
        }
      }
    },
    addIngrediant(item){
      if(item.$refs.input.value){
        this.$store.dispatch('addIngrediantInRecipe', item.$refs.input.value);
      }
    },
    removeIngrediant(id){
      this.$store.dispatch('removeIngrediantInRecipe', id);
    },
    onFileChange(e){
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length){
          this.$store.dispatch('setRecipeImage', '');
          this.$store.dispatch('setRecipeFile', '');
          return;
        }
        var image = new Image();
        var reader = new FileReader();

        reader.onload = (e) => {
          this.$store.dispatch('setRecipeImage', e.target.result);
          this.$store.dispatch('setRecipeFile', files[0]);
        };
        reader.readAsDataURL(files[0]);
    }
  }
}
</script>
<style lang="stylus" scoped>
  .ingredients_list_label
    width: 100%
  .ingredients_list
    width: 100%
    li
      position: relative
      padding: 2px 40px 2px 0 
  .btn_remove_ingredient
    position: absolute
    right: 10px
    width: 20px
    height: 20px
    margin: 0 !important
    i.icon
      font-size: 14px
  .upload_image
    width: 200px
  .fileUploadError
    padding: 2px 0 0
  .application .theme--dark.btn.primary.btn--disabled:not(.btn--icon):not(.btn--flat)
    background-color: #1976d2 !important
    border-color: #1976d2 !important
  .application .theme--dark.btn.error.btn--disabled:not(.btn--icon):not(.btn--flat)
    background-color: #ff5252 !important
    border-color: #ff5252 !important
</style>
```

### RecipeSingle.vue ###

RecipeSingle.vue is rendering single recipe.

```javascript
<template>
    <div id="recipe_single">
        <div v-if="recipe">
            <v-breadcrumbs icons divider="chevron_right">
                <v-breadcrumbs-item replace :to="{name: 'recipes'}">
                    Home
                </v-breadcrumbs-item>
                <v-breadcrumbs-item disabled>
                    {{ recipe.title }}
                </v-breadcrumbs-item>
                <v-spacer></v-spacer>
                <v-btn primary light class="amber" replace :to="{name: 'recipes'}">Back</v-btn>
            </v-breadcrumbs>
        </div>
        <v-container fluid grid-list-lg>
            <v-layout row wrap>
                <v-flex md10 xs12 offset-md1 v-if="recipe">
                    <v-layout row wrap>
                        <v-flex xs12 sm6 md4>
                            <v-card>
                                <v-card-media :src="recipe.metadata.feature_image.url" height="300px">
                                </v-card-media>
                            </v-card>
                        </v-flex>
                        <v-flex xs12 sm6 md8 class="recipe_info">
                            <h1 class="headline mb-0">
                                {{recipe.title}}
                            </h1>
                            <ul class="recipe_meta">
                                <li><p><strong>PUBLISHED BY</strong>{{recipe.metadata.author}}</p></li>
                                <li><p><strong>PREPARATION</strong>{{recipe.metadata.preparation_time}} {{ recipe.metadata.preparation_time > 1 ? 'minutes' : 'minute' }}</p></li>
                                <li><p><strong>COOK TIME</strong>{{recipe.metadata.cook_time}} {{ recipe.metadata.cook_time > 1 ? 'minutes' : 'minute' }}</p></li>
                                <li><p><strong>SERVINGS</strong>{{recipe.metadata.servings}} {{ recipe.metadata.servings > 1 ? 'persons' : 'person' }}</p></li>
                                <li><p><strong>Category</strong><v-chip class="amber dark--text">{{recipe.metadata.category}}</v-chip></p></li>
                            </ul>
                        </v-flex>
                    </v-layout>
                    <p class="mt-3"></p>
                    <v-layout row wrap class="recipe_content_wrap">
                        <v-flex xs12 md8 offset-md2>
                            <div class="video-responsive">
                                <iframe width="560" height="315" :src="'https://www.youtube.com/embed/'+recipe.metadata.youtube_id" frameborder="0" allowfullscreen></iframe>
                            </div>
                        </v-flex>
                    </v-layout>
                    <p class="mt-5"></p>
                    <v-card class="white">
                        <v-layout row wrap class="recipe_content_wrap">
                            <v-flex xs12 md6 order-md2>
                                <h1 class="headline mb-0">
                                    Ingredients:
                                </h1>
                                <v-list avatar>
                                    <v-list-tile v-for="(item, index) in recipe.metadata.ingredients" :key="index">
                                        <v-list-tile-avatar>
                                            <v-icon class="amber--text text--darken-2">fa-circle</v-icon>
                                        </v-list-tile-avatar>
                                        <v-list-tile-content>
                                            <v-list-tile-title>{{item.ingredient}}</v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                </v-list>
                            </v-flex>
                            <v-flex xs12 md6>
                                <h1 class="headline mb-0">
                                    Preparation:
                                </h1>
                                <p v-html="recipe.content" class="recipe_content"></p>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import {mapActions,mapGetters} from 'vuex'
    export default {
        computed: {
            recipe(){
                return this.$store.getters.recipe(this.$route.params.id)
            }
        },
        methods:{

        }
    }
</script>

<style lang="stylus">
  #recipe_single
    .headline
        font-size: 32px !important
        padding-top: 15px
    .recipe_meta
        padding-top: 30px
        padding-left: 15px
        list-style: none
        strong
            margin-right: 10px
    .recipe_content_wrap
        padding: 10px 20px
    .recipe_content
        padding-top: 15px
        padding-left: 10px
    .list
        > li
            height: 30px
    .icon
        font-size: 16px
    .video-responsive
        overflow:hidden
        padding-bottom:56.25%
        position:relative
        height:0
    .video-responsive iframe
        left:0
        top:0
        height:100%
        width:100%
        position:absolute
    .breadcrumbs
        li:first-child
            a
                color: #FFC107
        li:nth-child(2):after
            content: ''
</style>
```

## Conclusion ##

So, this is an app where every scenario of Cosmic RESTful API using cosmic npm package vue & vuex is covered. I hope you like the tutorial.
